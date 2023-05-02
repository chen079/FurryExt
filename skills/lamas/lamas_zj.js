skill={
    group:["lamas_zj_1"],
    trigger:{
        player:"phaseZhunbeiBegin",
    },
    direct:true,
    content:function(){
        "step 0"
        player.chooseTarget(get.prompt2(event.name),[1,Math.floor(game.players.length/2)],function(card,player,target){
            return target.countCards('he')>0;
        },function(target){
            return -get.attitude(_status.event.player,target);
        });
        "step 1"
        if(result.bool){
            result.targets.sortBySeat();
            player.logSkill(event.name,result.targets);
            event.targets=result.targets;
        }
        else{
            event.finish();
        }
        "step 2"
        if(event.targets.length){
            var target=event.targets.shift();
            event.current=target;
            player.choosePlayerCard(target,true);
        }
        else{
            event.finish();
        }
        "step 3"
        if(result.bool){
            player.addToExpansion(result.cards,event.current,'give').gaintag.add('lamas_zj');
            event.goto(2);
        }
    },
    intro:{
        content:"expansion",
        markcount:"expansion",
    },
    onremove:function(player){
        var cards=player.getExpansions('lamas_zj');
        if(cards.length) player.loseToDiscardpile(cards);
    },
    ai:{
        threaten:2,
    },
    global:"lamas_zj_2",
    subSkill:{
        1:{
            enable:"chooseToUse",
            filter:function(event,player){
                return player.getExpansions('lamas_zj').length>0&&event.filterCard({name:'sha',isCard:true},player,event);
            },
            chooseButton:{
                dialog:function(event,player){
                    return ui.create.dialog('战尽',player.getExpansions('lamas_zj'),'hidden');
                },
                backup:function(links,player){
                    return {
                        viewAs:{name:'sha',isCard:true},
                        filterCard:()=>false,
                        selectCard:-1,
                        card:links[0],
                        precontent:function(){
                            player.logSkill('lamas_zj');
                            player.loseToDiscardpile(lib.skill.lamas_zj_1_backup.card);
                            delete event.result.skill;
                        },
                    };
                },
                prompt:()=>'请选择【杀】的目标',
            },
            ai:{
                order:function(){
                    return get.order({name:'sha'})+0.6;
                },
                result:{
                    player:1,
                },
            },
        },
        2:{
            enable:"chooseToUse",
            viewAs:{
                name:"sha",
                isCard:true,
            },
            filter:function(event,player){
                return game.hasPlayer(function(current){
                    return current.hasSkill('lamas_zj_2')&&current.getExpansions('lamas_zj').length>=1&&event.filterTarget({name:'sha'},player,current);
                });
            },
            filterTarget:function(card,player,target){
                var bool=false;
                var players=ui.selected.targets.slice(0);
                for(var i=0;i<players.length;i++){
                    if(players[i].hasSkill('lamas_zj_2')&&players[i].getExpansions('lamas_zj').length>=1) bool=true;break;
                }
                if(!bool&&(!target.hasSkill('lamas_zj_2')||target.getExpansions('lamas_zj').length<1)) return false;
                return _status.event._backup.filterTarget.apply(this,arguments);
            },
            complexSelect:true,
            selectCard:-1,
            filterCard:function(){
                return false;
            },
            forceaudio:true,
            direct:true,
            prompt:"弃置一名有”战“的角色的一张“战”，然后视为对包含其在内的角色使用【杀】。",
            delay:false,
            log:false,
            precontent:function(){
                "step 0"
                var targets=event.result.targets.filter(function(current){
                    return current.getExpansions('lamas_zj').length>=1&&current.hasSkill('lamas_zj_2');
                });
                if(targets.length==1){
                    event.target=targets[0];
                    event.goto(2);
                }
                else if(targets.length>0){
                    player.chooseTarget(true,'选择弃置【战尽】牌的目标',function(card,player,target){
                        return _status.event.list.contains(target);
                    }).set('list',targets).set('ai',function(target){
                        var player=_status.event.player;
                        return get.attitude(player,target);
                    });
                }
                else{
                    event.finish();
                }
                "step 1"
                if(result.bool&&result.targets.length){
                    event.target=result.targets[0];
                }
                else{
                    event.finish();
                }
                "step 2"
                if(event.target){
                    if(event.target.getExpansions('lamas_zj').length==1){
                        event.directresult=event.target.getExpansions('lamas_zj').slice(0);
                    }
                    else{
                        player.chooseCardButton('移去一张“战”',1,event.target.getExpansions('lamas_zj'),true);
                    }
                }
                else{
                    event.finish();
                }
                "step 3"
                if(event.directresult||result.bool){
                    player.logSkill('lamas_zj_2',event.target);
                    var links=event.directresult||result.links;
                    target.loseToDiscardpile(links);
                }
            },
            ai:{
                order:function(){
                    return get.order({name:'sha'})+0.05;
                },
                yingbian:function(card,player,targets,viewer){
                    if(get.attitude(viewer,player)<=0) return 0;
                    var base=0,hit=false;
                    if(get.cardtag(card,'yingbian_hit')){
                        hit=true;
                        if(targets.filter(function(target){
                            return target.hasShan()&&get.attitude(viewer,target)<0&&get.damageEffect(target,player,viewer,get.nature(card))>0;
                        })) base+=5;
                    }
                    if(get.cardtag(card,'yingbian_all')){
                        if(game.hasPlayer(function(current){
                            return !targets.contains(current)&&lib.filter.targetEnabled2(card,player,current)&&get.effect(current,card,player,player)>0;
                        })) base+=5;
                    }
                    if(get.cardtag(card,'yingbian_damage')){
                        if(targets.filter(function(target){
                            return get.attitude(player,target)<0&&(hit||!target.mayHaveShan()||player.hasSkillTag('directHit_ai',true,{
                            target:target,
                            card:card,
                            },true))&&!target.hasSkillTag('filterDamage',null,{
                                player:player,
                                card:card,
                                jiu:true,
                            })
                        })) base+=5;
                    }
                    return base;
                },
                canLink:function(player,target,card){
                    if(!target.isLinked()&&!player.hasSkill('wutiesuolian_skill')) return false;
                    if(target.mayHaveShan()&&!player.hasSkillTag('directHit_ai',true,{
                        target:target,
                        card:card,
                    },true)) return false;
                    if(player.hasSkill('jueqing')||player.hasSkill('gangzhi')||target.hasSkill('gangzhi')) return false;
                    return true;
                },
                basic:{
                    useful:[5,3,1],
                    value:[5,3,1],
                },
                result:{
                    target:function(player,target,card,isLink){
                        var eff=function(){
                            if(!isLink&&player.hasSkill('jiu')){
                                if(!target.hasSkillTag('filterDamage',null,{
                                    player:player,
                                    card:card,
                                    jiu:true,
                                })){
                                    if(get.attitude(player,target)>0){
                                        return -7;
                                    }
                                    else{
                                        return -4;
                                    }
                                }
                                return -0.5;
                            }
                            return -1.5;
                        }();
                        if(!isLink&&target.mayHaveShan()&&!player.hasSkillTag('directHit_ai',true,{
                            target:target,
                            card:card,
                        },true)) return eff/1.2;
                        return eff;
                    },
                },
                tag:{
                    respond:1,
                    respondShan:1,
                    damage:function(card){
                        if(card.nature=='poison') return;
                        return 1;
                    },
                    natureDamage:function(card){
                        if(card.nature) return 1;
                    },
                    fireDamage:function(card,nature){
                        if(card.nature=='fire') return 1;
                    },
                    thunderDamage:function(card,nature){
                        if(card.nature=='thunder') return 1;
                    },
                    poisonDamage:function(card,nature){
                        if(card.nature=='poison') return 1;
                    },
                },
            },
        }
    }
}
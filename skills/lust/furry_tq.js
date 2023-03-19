skill={
    group:["lust_tq_1","lust_tq_2"],
    subSkill:{
        "1":{
            trigger:{
                player:"damageBegin3",
            },
            direct:true,
            prompt:"当你即将受到伤害时，你可以弃置一张♥或♣手牌，将伤害转移给一名其他角色。",
            filter:function(event,player){
        return player.countCards('h',{suit:'heart'})>0||player.countCards('h',{suit:'club'})>0&&event.num>0;
    },
            content:function(){
        "step 0"
        player.chooseCardTarget({
            filterCard:function(card,player){
                return get.suit(card)=='heart'||get.suit(card)=='club'&&lib.filter.cardDiscardable(card,player);
            },
            filterTarget:function(card,player,target){
                return player!=target;
            },
            ai1:function(card){
                return 10-get.value(card);
            },
            ai2:function(target){
                var att=get.attitude(_status.event.player,target);
                var trigger=_status.event.getTrigger();
                var da=0;
                if(_status.event.player.hp==1){
                    da=10;
                }
                if(trigger.num>1){
                    if(target.maxHp>5&&target.hp>1) return -att/10+da;
                    return -att+da;
                }
                var eff=get.damageEffect(target,trigger.source,target,trigger.nature);
                if(att==0) return 0.1+da;
                if(eff>=0&&trigger.num==1){
                    return att+da;
                }
                if(target.hp==target.maxHp) return -att+da;
                if(target.hp==1){
                    if(target.maxHp<=4&&!target.hasSkillTag('maixie')){
                        if(target.maxHp<=3){
                            return -att+da;
                        }
                        return -att/2+da;
                    }
                    return da;
                }
                if(target.hp==target.maxHp-1){
                    if(target.hp>2||target.hasSkillTag('maixie')) return att/5+da;
                    if(att>0) return 0.02+da;
                    return 0.05+da;
                }
                return att/2+da;
            },
            prompt:get.prompt2('lust_tq')
        });
        "step 1"
        if(result.bool){
            player.logSkill(event.name,result.targets);
            trigger.player=result.targets[0];
            player.discard(result.cards[0]);
        }
    },
            ai:{
                "maixie_defend":true,
                effect:{
                    target:function(card,player,target){
                if(player.hasSkillTag('jueqing',false,target)) return;
                if(get.tag(card,'damage')&&target.countCards('h')>1) return 0.7;
            },
                },
                threaten:function(player,target){
            if(target.countCards('h')==0) return 2;
        },
            },
            sub:true,
        },
        "2":{
            trigger:{
                target:"useCardToTarget",
            },
            prompt:"当你成为【杀】的目标时，你可以令一名有手牌的其他角色正面朝上交给你一张牌。若此牌不为【闪】，则该角色也成为此【杀】的额外目标。",
            direct:true,
            filter:function(event,player){
        return event.card.name=='sha';
    },
            content:function(){
        "step 0"
        player.chooseTarget(get.prompt2('lust_tq'),function(card,player,target){
            return target!=player&&!_status.event.targets.contains(target)&&_status.event.playerx.canUse('sha',target,false)&&target.countCards('h');
        }).set('ai',function(target){
            var trigger=_status.event.getTrigger();
            var player=_status.event.player;
            return get.effect(target,trigger.card,trigger.player,player)+0.1;
        }).set('targets',trigger.targets).set('playerx',trigger.player);
        "step 1"
        if(result.bool){
            var target=result.targets[0];
            player.logSkill('lust_tq',target);
            event.target=target;
            target.chooseCard('交给'+get.translation(player)+
            '一张牌，若此牌不为【闪】，则也成为此杀的额外目标',true).set('ai',function(card){
                return -get.value(card,player,'raw');
            }).set('sourcex',player);
            game.delay();
        }
        else{
            event.finish();
        }
        "step 2"
        if(result.bool){
            player.gain(result.cards,event.target,'give');
            if(get.name(result.cards[0])!='shan'){
                trigger.getParent().targets.push(event.target);
                trigger.getParent().triggeredTargets2.push(event.target);
                game.log(event.target,'成为了额外目标');
            }
            game.delay();
        }
    },
            ai:{
                expose:0.2,
                effect:{
                    target:function(card,player,target){
                if(card.name!='sha') return;
                var players=game.filterPlayer();
                if(get.attitude(player,target)<=0){
                    for(var i=0;i<players.length;i++){
                        var target2=players[i];
                        if(player!=target2&&target!=target2&&player.canUse(card,target2,false)&&
                            get.effect(target2,{name:'shacopy',nature:card.nature,suit:card.suit},player,target)>0&&
                            get.effect(target2,{name:'shacopy',nature:card.nature,suit:card.suit},player,player)<0){
                            if(target.hp==target.maxHp) return 0.3;
                            return 0.6;
                        }
                    }
                }
                else{
                    for(var i=0;i<players.length;i++){
                        var target2=players[i];
                        if(player!=target2&&target!=target2&&player.canUse(card,target2,false)&&
                            get.effect(target2,{name:'shacopy',nature:card.nature,suit:card.suit},player,player)>0){
                            if(player.canUse(card,target2)) return;
                            if(target.hp==target.maxHp) return [0,1];
                            return [0,0];
                        }
                    }
                }
            },
                },
            },
            sub:true,
        },
    },
}
skill={
    trigger:{
        player:"phaseBegin",
    },
    direct:true,
    content:function(){
        "step 0"
        player.draw(2);
        "step 1"
        event.cards=result;
        event.num=event.cards.length
        "step 2"
        player.chooseCardTarget({
            filterCard:function(card){
                return _status.event.getParent().cards.contains(card);
            },
            selectCard:[1,event.cards.length],
            filterTarget:function(card,player,target){
                return player!=target;
            },
            ai1:function(card){
                if(ui.selected.cards.length>0) return -1;
                if(card.name=='du') return 20;
                return (_status.event.player.countCards('h')-_status.event.player.hp);
            },
            ai2:function(target){
                var att=get.attitude(_status.event.player,target);
                if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
                    return 1-att;
                }
                return att-4;
            },
            prompt:'回合开始时，你摸'+get.translation(event.num)+'张牌然后分配给任意名角色，并将这些牌置于其武将牌上称为“协”'
        });
        "step 3"
        if(result.bool){
            player.line(result.targets,'green');
            result.targets[0].addTempSkill("fr_xieji",{player:"phaseEnd"});
            result.targets[0].addToExpansion(result.cards,'gain2').gaintag.add('fr_xieji')
            for(var i=0;i<result.cards.length;i++){
                event.cards.remove(result.cards[i]);
            }
            if(event.cards.length) event.goto(2);
        }else{
            if(event.cards.length){
                player.addTempSkill("fr_xieji",{player:"phaseEnd"})
                player.addToExpansion(event.cards,'gain2').gaintag.add('fr_xieji')
            }
        }
    },
    group:"ciyu_ss_sha",
    subSkill:{
        sha:{
            trigger:{
                global:"useCard2",
            },
            filter:function(event,player){
                if(!(event.card.name=='sha'||get.type(event.card,null,false)=='trick')) return false;
                if(event.player.getExpansions('fr_xieji').length==0) return false
                return true;
            },
            direct:true,
            content:function(){
                'step 0'
                var goon=false;
                var info=get.info(trigger.card);
                if(trigger.targets&&!info.multitarget){
                    var players=game.filterPlayer();
                    for(var i=0;i<players.length;i++){
                        if(lib.filter.targetEnabled2(trigger.card,trigger.player,players[i])&&!trigger.targets.contains(players[i])){
                            goon=true;break;
                        }
                    }
                }
                if(goon){
                    player.chooseTarget(get.prompt('ciyu_ss'),'素术：是否增加一名'+get.translation(trigger.card)+'的目标？',function(card,player,target){
                        var player=_status.event.source;
                        return !_status.event.targets.contains(target)&&lib.filter.targetEnabled2(_status.event.card,player,target)
                    }).set('ai',function(target){
                        var trigger=_status.event.getTrigger();
                        var player=_status.event.source;
                        return get.effect(target,trigger.card,player,_status.event.player);
                    }).set('targets',trigger.targets).set('card',trigger.card).set('source',trigger.player)
                }else{
                    if(!info.multitarget&&trigger.targets&&trigger.targets.length>1){
                        event.goto(3);
                    }else{
                        event.finish()
                    }
                }
                'step 1'
                if(result.bool){
                    if(!event.isMine()&&!event.isOnline()) game.delayx();
                    event.target=result.targets[0]
                    player.chooseCardButton('选择弃置1张“协”',trigger.player.getExpansions('fr_xieji'),true)
                }
                else{
                    event.finish();
                }
                'step 2'
                if(event.target){
                    trigger.player.loseToDiscardpile(result.links)
                    player.logSkill('ciyu_ss',event.target);
                    trigger.targets.add(event.target);
                }
                event.finish();
                'step 3'
                player.chooseTarget(get.prompt('ciyu_ss'),'素术：是否减少一名'+get.translation(trigger.card)+'的目标？',function(card,player,target){
                    var trigger=_status.event.getTrigger();
                    return trigger.targets.contains(target);
                }).set('ai',function(target){
                    var trigger=_status.event.getTrigger();
                    var player=_status.event.source;
                    return -get.effect(target,trigger.card,player,_status.event.player);
                }).set('targets',trigger.targets).set('card',trigger.card).set('source',trigger.player).setHiddenSkill(event.name);
                'step 4'
                if(result.bool){
                    event.targets=result.targets;
                    if(event.isMine()){
                        player.logSkill('ciyu_ss',event.targets);
                        event.finish();
                    }
                    for(var i=0;i<result.targets.length;i++){
                        trigger.targets.remove(result.targets[i]);
                    }
                    player.chooseCardButton('选择弃置1张“协”',trigger.player.getExpansions('fr_xieji'),true)
                    game.delay();
                }
                else{
                    event.finish();
                }
                'step 5'
                player.logSkill('ciyu_ss',event.targets);
                trigger.player.loseToDiscardpile(result.links)
            },
            sub:true,
        },
    },
}
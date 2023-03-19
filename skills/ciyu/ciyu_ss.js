skill={
    trigger:{
        player:"phaseBegin",
    },
    direct:true,
    content:function(){
        "step 0"
        player.draw(3);
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
                if(event.cards.length==1) return -1;
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
                var info=get.info(event.card)
                if(info.allowMultiple==false) return false;
                if(event.targets&&!info.multitarget){
                    if(game.hasPlayer(function(current){
                        return !event.targets.contains(current)&&lib.filter.targetEnabled2(event.card,event.player,current)&&lib.filter.targetInRange(event.card,event.player,current);
                    })){
                        return true;
                    }
                }
                return false;
            },
            direct:true,
            content:function(){
                'step 0'
                player.chooseTarget(get.prompt('ciyu_ss'),'为'+get.translation(trigger.card)+'增加一个目标',function(card,player,target){
                    var player=_status.event.source;
                    return !_status.event.targets.contains(target)&&lib.filter.targetEnabled2(_status.event.card,player,target)&&lib.filter.targetInRange(_status.event.card,player,target);
                }).set('ai',function(target){
                    var trigger=_status.event.getTrigger();
                    var player=_status.event.source;
                    return get.effect(target,trigger.card,player,_status.event.player);
                }).set('targets',trigger.targets).set('card',trigger.card).set('source',trigger.player).setHiddenSkill(event.name);
                'step 1'
                if(result.bool){
                    event.target=result.targets[0]
                    if(!event.isMine()&&!event.isOnline()) game.delayx();;
                }
                else{
                    event.finish();
                }
                'step 2'
                player.chooseCardButton('选择弃置1张“协”',trigger.player.getExpansions('fr_xieji'),true)
                "step 3"
                trigger.player.loseToDiscardpile(result.links)
                player.logSkill('ciyu_ss',event.target);
                trigger.targets.push(event.target);
            },
            sub:true,
        },
    },
}
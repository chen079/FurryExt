skill={
    trigger:{
        player:["damageEnd","recoverEnd","loseHpEnd","loseEnd","gainEnd"]
    },
    direct:true,
    unique:true,
    filter:function(event,player){
        if(player==_status.currentPhase) return false;
        if(event.name=='recover'){
            return game.hasPlayer(function(current){
                return current.hp!=current.maxHp&&current!=player;
            });
        }else if(event.name=='lose'){
            return game.hasPlayer(function(current){
                return current.hp.countCards('he')>0&&current!=player
            });
        }
        return event.num!=0
    },
    content:function(){
        "step 0"
        var str
        if(trigger.name=='damage'){
            str='令一名角色受到来自'+get.translation(trigger.source)+'的'+trigger.num+'点'+get.translation(trigger.nature)+'属性伤害'
        }else if(trigger.name=='recover'){
            str='令一名角色回复'+trigger.num+'点体力'
        }else if(trigger.name=='loseHp'){
            str='令一名角色流失'+trigger.num+'点体力'
        }else if(trigger.name=='gain'){
            str='令一名角色摸'+trigger.cards.length+'张牌'
        }else if(trigger.name=='lose'){
            str='令一名角色弃置'+trigger.cards.length+'张牌'
        }
        player.chooseTarget('请选择〖歃血〗的目标',1,false,function(card,player,target){
            if(event.name=='lose'){
                return target.countCards('he')>0&&target!=player
            }else if(event.name=='recover'){
                return target.hp!=target.maxHp&&target!=player
            }
            return target!=player
        }).set('ai',function(target){
            var player=_status.event.player
            var nature=_status.event.nature
            var judge=_status.event.judge
            if((judge=='recover')){
                return get.recoverEffect(target,player,player)
            }else if(judge=='gain'){
                return get.attitude(player,target)/Math.sqrt(2+target.countCards('h'))
            }else if(judge=='damage'){
                return get.damageEffect(target,target,player,nature)
            }else if(judge=='losHp'){
                return get.effect(target,{name:'losehp'},player,player)
            }else if(judge=='lose'){
                return get.effect(target,{name:'guohe_copy2'},player,player)
            }
        }).set('prompt2',str).set('nature',trigger.nature).set('judge',trigger.name)

        "step 1"
        if(result.bool){
            event.target=result.targets[0]
            if(trigger.name=='damage'){
                event.target.damage(trigger.num,trigger.nature,trigger.source)
            }else if(trigger.name=='lose'){
                event.target.chooseToDiscard('he',trigger.cards.length)
            }else if(trigger.name=='gain'){
                event.target.draw(trigger.cards.length)
            }else{
                event.target[trigger.name](trigger.num)
            }
        }
    }
}
skill={
    trigger:{
        player:["damageEnd","recoverEnd","loseHpEnd","loseEnd","gainEnd","turnOverEnd","linkEnd"]
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
                return current.countCards('he')>0&&current!=player
            });
        }
        return event.num!=0
    },
    content:function(){
        "step 0"
        var str
        if(trigger.name=='damage'){
            if(!trigger.nature){
                str='令一名角色受到来自'+get.translation(trigger.source)+'的'+trigger.num+'点伤害'
            }else{
                str='令一名角色受到来自'+get.translation(trigger.source)+'的'+trigger.num+'点'+get.translation(trigger.nature)+'属性伤害'
            }
        }else if(trigger.name=='recover'){
            str='令一名角色回复'+trigger.num+'点体力'
        }else if(trigger.name=='loseHp'){
            str='令一名角色流失'+trigger.num+'点体力'
        }else if(trigger.name=='gain'){
            str='令一名角色摸'+trigger.cards.length+'张牌'
        }else if(trigger.name=='lose'){
            str='令一名角色弃置'+trigger.cards.length+'张牌'
        }else if(trigger.name=='turnOver'){
            str='令一名角色翻面'
        }else if(trigger.name='link'){
            str='令一名角色横置'
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
            var att=get.attitude(player,target)
            if((judge=='recover')){
                return get.recoverEffect(target,player,player)
            }else if(judge=='gain'){
                return att/Math.sqrt(2+target.countCards('h'))
            }else if(judge=='damage'){
                return get.damageEffect(target,target,player,nature)
            }else if(judge=='losHp'){
                return get.effect(target,{name:'losehp'},player,player)
            }else if(judge=='lose'){
                return get.effect(target,{name:'guohe_copy2'},player,player)
            }else if(judge=='link'){
                return get.effect(target,{name:'tiesuo'},player,player)
            }else if(judge=='turnOver'){
                if(target.hasSkillTag('noturn')) return 0;
                return att*(target.isTurnedOver()?1:-1)
            }
            return -att
        }).set('prompt2',str).set('nature',trigger.nature).set('judge',trigger.name)

        "step 1"
        if(result.bool){
            event.target=result.targets[0]
            if(trigger.name=='damage'){
                event.target.damage(trigger.num,trigger.nature,trigger.source)
            }else if(trigger.name=='lose'){
                event.target.chooseToDiscard('he',trigger.cards.length,true)
            }else if(trigger.name=='gain'){
                event.target.draw(trigger.cards.length)
            }else if(trigger.name=='link'){
                event.target.link()
            }else if(trigger.name=='turnOver'){
                event.target.turnOver()
            }else{
                event.target[trigger.name](trigger.num)
            }
        }
    }
}
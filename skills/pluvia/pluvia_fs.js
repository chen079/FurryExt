skill={
    trigger:{
        source:"damageEnd"
    },
    filter:function(event,player){
        return event.player!=player
    },
    check:function(event,player){
        return get.attitude(player,event.player)>0
    },
    content:function(){
        "step 0"
        trigger.player.chooseCard('he','是否对'+get.translation(player)+'发动【复苏】？','交给'+get.translation(player)+'一张牌并回复一点体力').set('ai',function(card){
            var player=_status.event.player
            if(player.hp<=2){
                return 9-get.value(card)
            }else if(player.hp==player.maxHp){
                return 0
            }else{
                return 5-get.value(card)
            }
        })
        "step 1"
        if(result.bool){
            trigger.player.recover()
            player.gain(result.cards,trigger.player,'giveAuto')
        }
    }
}
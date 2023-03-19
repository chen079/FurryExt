skill={
    trigger:{
        source:"damageEnd"
    },
    forced:true,
    filter:function(event,player){
        return event.target!=player
    },
    content:function(){
        var cards=trigger.target.getCards('h','sha')
        player.gain(cards,'giveAuto')
    }
}
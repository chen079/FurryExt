skill={
    trigger:{
        global:'damageBefore'
    },
    filter:function(event,player){
        return event.player!=player&&event.num>0
    },
    content:function(){
        player.draw(trigger.num)
    },
}
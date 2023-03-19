skill={
    trigger:{
        global:"damageBefore"
    },
    filter:function(event,player){
        var target=event.player;
        return player.inRange(target)&&target!=player;
    },
    logTarget:function(event,player){
        return event.player
    },
    check:function(event,player){
        return get.attitude(player,event.player)>0
    },
    content:function(){
        "step 0"
        player.judge()
        "step 1"
        if(result.color=='red'){
            trigger.cancel()
            player.damage(trigger.source,trigger.nature)
            event.finish()
            return;
        }else{
            player.draw()
            trigger.player.draw()
            event.goto(0)
        }
    },
}
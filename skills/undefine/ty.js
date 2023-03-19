skill={
    locked:true,
    trigger:{
        source:"damageEnd",
        player:"damageEnd"
    },
    firstDo:true,
    filter:function(event,player){
        var target=(player==event.player)?event.source:event.player;
        return target.isAlive();
    },
    check:function(event,player){
        var target=(player==event.player)?event.source:event.player;
        return get.attitude(player,target)<0;
    },
    content:function(){
        "step 0"
        event.target=(player==trigger.player)?trigger.source:trigger.player
        event.targets=game.filterPlayer()
        event.targets.remove(player)
        event.targets.remove(event.target)
        event.targets.sortBySeat()
        "step 1"
        while(event.targets){
            var target=event.targets.shift()
            target.bolDamage(trigger.num,trigger.nature,event.target)
        }
    }
}
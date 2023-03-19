skill={
    locked:true,
    trigger:{
        player:"damageEnd",
    },
    firstDo:true,
    filter:function(event,player){
        return event.source.isAlive()
    },
    content:function(){
        "step 0"
        event.targets=game.filterPlayer()
        event.targets.remove(player)
        event.targets.remove(trigger.source)
        event.targets.sortBySeat()
        "step 1"
        while(event.targets){
            var target=event.targets.shift()
            target.bolDamage(trigger.num,trigger.nature,trigger.source)
        }
    },
}
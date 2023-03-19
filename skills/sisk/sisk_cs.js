skill={
    trigger:{
        player:["useCard","respond"],
    },
    check:function(event,player){
        return get.attitude(player,event.target)<=0;
    },
    logTarget:"target",
    filter:function(event,player){
        return event.card.name=='sha'&&player.storage.sisk_hz>2
    },
    content:function(){
        player.removeMark('sisk_hz',3)
        player.updateMark('sisk_hz')
        trigger.getParent().directHit.add(trigger.target)
        var id=trigger.target.playerid;
        var map=trigger.customArgs;
        if(!map[id]) map[id]={};
        if(!map[id].extraDamage) map[id].extraDamage=0;
        map[id].extraDamage++;
    },
    ai:{
        "directHit_ai":true,
    }
}
skill={
    audio:2,
    trigger:{
        player:"useCardToPlayered",
    },
    frequent:true,
    filter:function (event,player){
        if(get.type(event.card)=='equip') return false;
        if(event.getParent().triggeredTargets3.length>1) return false;
        return event.targets.length>0&&!player.countCards('h',{type:'basic',});
    },
    content:function (){
        player.draw(trigger.targets.length);
    },
    ai:{
        presha:true,
        pretao:true,
        threaten:1.8,
    },
}
skill={
    audio:2,
    forbid:["boss"],
    trigger:{
        player:"die",
    },
    forced:true,
    forceDie:true,
    skillAnimation:true,
    animationColor:"gray",
    filter:function(event){
        return event.source&&event.source.isIn();
    },
    content:function(){
        trigger.source.clearSkills();
        trigger.source.discard(trigger.source.getCards('he'))
        trigger.source.loseHp(trigger.source.hp)
    },
    logTarget:"source",
    ai:{
        threaten:function(player,target){
            if(target.hp==1) return 0.2;
            return 1.5;
        },
        effect:{
            target:function(card,player,target,current){
                if(!target.hasFriend()) return;
                if(target.hp<=1&&get.tag(card,'damage')) return [1,0,0,-2];
            },
        },
    },
}
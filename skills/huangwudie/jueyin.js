skill={
    shaRelated:true,
    audio:2,
    trigger:{
        player:"useCardToPlayered",
    },
    forced:true,
    filter:function(event,player){
        return event.card.name=='sha';
    },
    logTarget:"target",
    content:function(){
        "step 0"
        if(!trigger.target.hasSkill('baiban')){
            trigger.target.addTempSkill('baiban');
        }
    },
    ai:{
        ignoreSkill:true,
        skillTagFilter:function(player,tag,arg){
            if(tag=='directHit_ai'){
                return get.attitude(player,arg.target)<=0;
            }
            if(!arg||arg.isLink||!arg.card||arg.card.name!='sha') return false;
            if(!arg.target||get.attitude(player,arg.target)>=0) return false;
        },
        "directHit_ai":true,
    },
}
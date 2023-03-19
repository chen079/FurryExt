skill={
    audio:2,
    firstDo:true,
    trigger:{
        player:"useCard1",
    },
    forced:true,
    filter:function(event,player){
        return !event.audioed&&event.card.name=='sha'&&player.countUsed('sha',true)>1&&event.getParent().type=='phase';
    },
    content:function(){
        trigger.audioed=true;
    },
    mod:{
        cardUsable:function(card,player,num){
            if(card.name=='sha') return Infinity;
        },
    },
    ai:{
        "directHit_ai":true,
        unequip:true,
        skillTagFilter:function(player,tag,arg){
            if(!get.zhu(player,'shouyue')) return false;
            if(arg&&arg.name=='sha') return true;
            return false;
        },
    },
    group:"kesaya_ax_1",
    subSkill:{
        "1":{
            trigger:{
                player:"shaBegin",
            },
            forced:true,
            content:function(){
                trigger.directHit=true;
            },
            sub:true,
        },
    },
}
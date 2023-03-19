skill={
    mod:{
        targetInRange:function (card, player, target) {
            if(get.name(card)=='sha') return true;
        },
        cardUsable:function (card, player, num) {
            if(get.name(card)=='sha') return Infinity
        },
    },
    trigger:{
        source:"damageBegin1",
    },
    forced:true,
    filter:function(event){
        return event.card&&event.card.name=='sha'
    },
    content:function(){
        trigger.num++;
    },
    ai:{
        unequip:true,
        skillTagFilter:function(player,tag,arg){
            if(arg&&arg.name=='sha') return true;
            return false;
        },
    },
}
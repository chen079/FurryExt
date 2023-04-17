skill={
    sub:true,
    locked:false,
    mod:{
        aiOrder:function(player,card,num){
            if(typeof card=='object'&&player.isPhaseUsing()){
                var evt=player.getLastUsed(1);
                var evtb=player.getLastUsed(2)
                if(evt&&evt.card&&evtb&&evtb.card&&(evtb.card.number&&evt.card.number&&((get.number(evt.card,false)+get.number(evtb.card,false))%13)==get.number(card))){
                    return num+10;
                }
            }
        },
    },
    trigger:{
        player:"useCard",
    },
    mark:true,
    intro:{
        mark:function( dialog, storage, player){
            var evt=player.getLastUsed(1);
            var evtb=player.getLastUsed(2);
            dialog.addText('当你使用点数为'+(get.number(evt.card,false)+get.number(evtb.card,false))%13+'的牌时，你摸两张牌')
        }
    },
    frequent:true,
    filter:function(event,player){
        var evt=player.getLastUsed(1);
        if(!evt||!evt.card) return false;
        if(!player.isPhaseUsing()) return false;
        var evtb=player.getLastUsed(2);
        if(!evtb||!evtb.card) return false;
        var evt2=evt.getParent('phaseUse');
        if(!evt2||evt2.name!='phaseUse'||evt2.player!=player) return false;
        return typeof get.number(evt.card,false)=='number'&&typeof get.number(evtb.card,false)=='number'&&((get.number(evt.card,false)+get.number(evtb.card,false))%13)==get.number(event.card);
    },
    content:function(){
        player.draw(2);
    },
}
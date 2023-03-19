skill={
    mark:true,
    marktext:"协",
    onremove:function(player,skill){
        var cards=player.getExpansions(skill);
        if(cards.length) player.loseToDiscardpile(cards);
    },
    intro:{
        content:"expansion",
        markcount:"expansion",
    },
    trigger:{
        player:"phaseJieshuBegin",
    },
    direct:true,
    filter:function(event,player){
        return player.getExpansions('fr_xieji').length>0;
    },
    content:function(){
        var cards=player.getExpansions('fr_xieji');
        if(cards.length>0){
            player.gain(cards,'gain2');
        }
    },
}
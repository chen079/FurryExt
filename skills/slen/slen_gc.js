skill={
    trigger:{
        player:"loseAfter",
    },
    forced:true,
    filter:function(event,player){
        return _status.currentPhase!=player
    },
    content:function(){
        var target=_status.currentPhase;
        player.gainPlayerCard(target,'he',get.prompt('slen_gc',target)).set('logSkill',['slen_gc',target]);
    },
}
skill={
    forced:true,
    filter:function(event,player){
        return event.player.countMark('jiejie_zr_1')>3;
    },
    trigger:{
        global:"phaseBegin",
    },
    content:function(){
        trigger.player.loseHp(4)
        player.loseMaxHp(3)
        trigger.player.removeMark('jiejie_zr_1')
    },
}
skill={
    trigger:{
        global:"phaseAfter",
    },
    round:1,
    filter:function(event,player){
        return event.player!=player;
    },
    content:function(){
        "step 0"
        player.draw()
        player.logSkill('krif_zl'),
        game.broadcastAll(function(target1,target2){
            game.swapSeat(target1,target2);
        },player,trigger.player); 
        "step 1"
        trigger.player.insertPhase();
    },
}
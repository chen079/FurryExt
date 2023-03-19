skill={
    trigger:{
        global:"useCardToPlayered",
    },
    direct:true,
    filter:function (event, player) {
        if(event.targets.length!=1) return false;
        return player != _status.currentPhase&&event.player!=player&&player.countCards('h',function(card){
            return player.canUse(card, event.target)
        })>0
    },
    content:function(){
        'step 0'
        player.chooseToUse('是否使用一张牌，然后摸一张牌。',trigger.target);
        player.draw()
    }
}
skill={
    trigger:{
        global:"gainBegin",
        target:"useCardToTargeted",
    },
    filter:function(event,player){
        if(event.name=='gain'){
            if(player==event.player) return false;
            var evt=event.getl(player);
            return evt&&evt.cards2&&evt.cards2.length>0;
        }else{
            return event.card.name=='sha'&&event.player.isAlive();
        }
    },
    check:function(event,player){
        return get.attitude(player,event.player)<0&&player.hp>1
    },
    frequent:true,
    content:function(){
        'step 0'
        player.draw()
        'step 1'
        player.chooseToCompare(trigger.player);
        'step 2'
        if (result.bool) {
            trigger.cancel()
        }else{
            player.loseHp()
            trigger.player.loseHp()
            player.discardPlayerCard(target,'he',true);
        }
    }
}
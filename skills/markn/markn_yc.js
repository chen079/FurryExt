skill={
    enable:"phaseUse",
    usable:1,
    filter:function(event,player){
        return player.getExpansions('markn_yz').length>0&&player.countCards('h')>0;
    },
    filterTarget:function(event,player,target){
        return target!=player&&target.countCards('h')<=player.countCards('h')
    },
    content:function(){
        "step 0"
        player.chooseCardButton('选择弃置1张“视”',1,player.getExpansions('markn_yz'))
        "step 1"
        if(result.bool){
            player.loseToDiscardpile(result.links)
            player.swapHandcards(target);
        }else{
            event.finish()
            return;
        }
    },
    ai:{
        order:1,
        result:{
            player:function(player,target){
                var cards=player.getExpansions('markn_yz')
                if(cards.length<3) return 0;
                if(target.countCards('h')>0) return -Math.max(get.value(target.getCards('h'),player)-get.value(player.getCards('h'),player),0);
                return 0;
            },
        },
    },
}
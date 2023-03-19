skill={
    trigger:{
        target:"useCardToTargeted",
    },
    frequent:true,
    mark:true,
    onremove:function(player,skill){
        var cards=player.getExpansions(skill);
        if(cards.length) player.loseToDiscardpile(cards);
    },
    intro:{
        content:"expansion",
        markcount:"expansion",
    },
    filter:function(event,player){
        if(event.player==player) return false
        if(event.cards.length!=1||event.targets.length!=1) return false
        var list=[]
        var cards=player.getExpansions('knier_wh')
        if(cards.length==0) return true
        for(var i=0;i<cards.length;i++){
            if(!list||!list.contains(get.suit(cards[i]))){
                list.push(get.suit(cards[i]))
            }
        }
        if(!list.contains(get.suit(event.cards[0]))) return true
        return false
    },
    content:function(){
        "step 0"
        trigger.targets.remove(player);
        trigger.getParent().triggeredTargets2.remove(player);
        trigger.untrigger();
        "step 1"
        player.addToExpansion(trigger.cards,'gain2').gaintag.add('knier_wh')
    }
}
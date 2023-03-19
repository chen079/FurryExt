skill={
    trigger:{
        global:"damageBegin",
    },
    direct:true,
    filter:function(event,player){
        if(event.num<=0) return false;
        var cards=player.getExpansions('markn_yz')
        return player.countCards('h',{color:"red"})&&cards.length<5
    },
    content:function(){
        "step 0"
        player.chooseToDiscard(1,'h',{color:"red"},false).set("prompt","是否发动【驰援】").set("prompt2","一名角色受到伤害时，你可以弃置一张红色手牌，令此伤害-1")
        "step 1"
        if(result.bool){
            trigger.num=trigger.num-1
            var cards=player.getExpansions('markn_yz')
            if(cards.length<5){
            player.addToExpansion(get.cards(1),'gain2').gaintag.add('markn_yz');}
        }else{
            event.finish()
            return;
        }
    },
    group:"markn_cy_1",
    subSkill:{
        "1":{
            direct:true,
            trigger:{
                player:"damageEnd",
                source:"damageEnd"
            },
            content:function(){
                var cards=player.getExpansions('markn_yz')
                if(cards.length<5){
                player.addToExpansion(get.cards(1),'gain2').gaintag.add('markn_yz');}
            }
        }
    }
}
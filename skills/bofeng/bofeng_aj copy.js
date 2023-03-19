skill={
    trigger:{
        player:"useCardToBegin",
    },
    direct:true,
    shaRelated:true,
    filter:function (event, player) {
        return event.card.name == 'sha'
    },
    content:function(){
        "step 0"
        player.addTempSkill("fr_xieji",{player:"phaseAfter"})
        player.choosePlayerCard('h',trigger.target)
        "step 1"
        player.addToExpansion(result.cards,'gain2').gaintag.add('fr_xieji')
    },
    group:["bofeng_aj_damage"],
    subSkill:{
        damage:{
            trigger:{
                source:"damageBegin4",
            },
            filter:function(event,player){
                return player.getExpansions('fr_xieji').length>0
            },
            usable:1,
            prompt:"你可以弃置一张'协'令此次伤害+X",
            logTarget:"player",
            content:function(){
                "step 0"
                player.chooseCardButton('选择弃置X张“协”',[1,Infinity],player.getExpansions('fr_xieji'),true)
                "step 1"
                if(result.bool){
                    trigger.num+=result.links.length
                    player.loseToDiscardpile(result.links)
                }else{
                    event.finish()
                    return;
                }
            },
            sub:true,
        },
    },
}
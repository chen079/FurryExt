skill={
    group:"mudaya_wh_2",
    trigger:{
        player:"useCardToPlayered",
    },
    logTarget:"target",
    forced:true,
    filter:function (event, player) {
        if (event.target == player) return false;
        if (event.target.hasSkill("baiban") && event.target.hasSkill("mudaya_wh_1")) return false;
        return get.tag(event.card, 'damage');
    },
    content:function () {
        trigger.target.addTempSkill("baiban");
        trigger.target.addTempSkill("mudaya_wh_1");
    },
    subSkill:{
        "1":{
            charlotte:true,
            ai:{
                "unequip2":true,
            },
        },
        "2":{
            usable:1,
            forced:true,
            trigger:{
                source:"damageSource",
            },
            content:function () {
                "step 0"
                player.addTempSkill("mudaya_wh_3");
                "step 1"
                player.draw(2);
            },
        },
        "3":{
            mod:{
                cardUsable:function(card,player,num){
                    if(card.name=='sha') return num+1;
                },
                targetInRange:function(card){
                    if(card.name=='sha') return true;
                },
            },
        }
    }
}
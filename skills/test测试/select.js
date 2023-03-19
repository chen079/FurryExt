skill={
    trigger:{
        player:"useCard2",
    },
    filter:function(event,player){
        return event.card.name=='sha'&&player.countCards('he')>0
    },
    check:function(event,player){
        if(event.getParent(2).jiu==true) return false
    },
    content:function(){
        player.chooseToDiscard('你可以弃置一张牌并取消此【杀】的目标，然后该角色流失一点体力','he',true)
        trigger.cancel()
        for(var i=0;i<trigger.targets.length;i++){
            trigger.targets[i].loseHp()
        }
    },
    ai:{
        'directHit_ai':true,
        unequip:true
    }
}
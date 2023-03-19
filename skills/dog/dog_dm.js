skill={
    trigger:{
        player:"useCard",
    },
    direct:true,
    filter:function(event,player){
        if(player.storage.dog_zz_num<=0) return false
        if(!event.targets.length||!player.isPhaseUsing()) return false;
        var type=get.type(event.card,false);
        if(type!='basic'&&type!='trick') return false;
        return true
    },
    content:function(){
        'step 0'
        if(player!=game.me&&!player.isUnderControl()&&!player.isOnline()) game.delayx();
        player.chooseToDiscard('h',get.prompt('dog_dm'),'弃置一张牌，令'+get.translation(trigger.card)+'结算两次').set('ai',function(card){
            var trigger=_status.event.getTrigger();
            if(trigger.card.name=='tiesuo') return 0;
            return (7-get.value(card))*(get.effect(trigger.targets[0],trigger.card,player,player));
        }).logSkill='dog_dm';
        'step 1'
        if(result.bool){
            player.addTempSkill('dog_dm_buff','phaseUseAfter');
        }
        else event.finish();
    },
    subSkill:{
        buff:{
            trigger:{
                global:"useCardToTargeted",
            },
            forced:true,
            charlotte:true,
            popup:false,
            lastDo:true,
            filter:function(event,player){
                return (event.targets.length==event.parent.triggeredTargets4.length);
            },
            content:function(){
                trigger.getParent().targets=trigger.getParent().targets.concat(trigger.targets);
                trigger.getParent().triggeredTargets4=trigger.getParent().triggeredTargets4.concat(trigger.targets);
                player.removeSkill("dog_dm_buff")
                player.storage.dog_zz_num-=1
            },
            sub:true,
        },
    },
}
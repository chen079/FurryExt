skill={
    enable:'phaseUse',
    mulititarget:true,
    selectTarget:2,
    filter:function(event,player){
        return player.countCards('h')>0
    },
    filterTarget:function(card,player,target){
        if(!ui.selected.targets) return target!=player
        return true
    },
    position:'h',
    filterCard:true,
    selectCard:-1,
    content:function(){
        'step 0'
        targets[0].gain(cards)
        targets[0].addTempSkill('kamijia_sx_unuse',{player:'phaseAfter'})
        targets.storage.kamijia_sx_unuse=targets[1]
    },
    subSkill:{
        'unuse':{
            targetEnabled:function (card, player, target, now) {
                if (player.storage.kamijia_sx_unuse != target||target!=player) return false;
            },
        }
    }
}
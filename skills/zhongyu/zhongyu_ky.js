skill={
    enable:"phaseUse",
    usable:1,
    filter:function(event,player){
        return (player.getDamagedHp()+1)>0&&player.countCards('h')>0;
    },
    filterTarget:function(card,player,target){
        return player!=target
    },
    selectTarget:function(){
        return ui.selected.cards.length;
    },
    selectCard:function(){
        var player=_status.currentPhase;
        return [1,Math.min(game.players.length-1,player.getDamagedHp()+1)];
    },
    filterCard:true,
    position:'h',
    check:function(card){
        if(ui.selected.cards.length==0){
            return 8-get.value(card);
        }
        return 6-get.value(card);
    },
    content:function(){
        "step 0"
        target.damage('mad');
    },
    ai:{
        order:9,
        result:{
            target:function(player,target){
                return get.damageEffect(target,player,target,'mad');
            },
        },
        threaten:function(player,target){
            if(target.hp==1) return 2;
            if(target.hp==2) return 1.5;
            return 0.5;
        },
        maixie:true,
        effect:{
            target:function(card,player,target){
                if(get.tag(card,'damage')){
                    if(target.hp==target.maxHp) return [0,1];
                }
                if(get.tag(card,'recover')&&player.hp>=player.maxHp-1) return [0,0];
            },
        },
    },
}
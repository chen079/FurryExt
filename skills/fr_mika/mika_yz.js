skill={
    enable:"phaseUse",
    usable:1,
    filterCard:true,
    selectCard:1,
    discard:false,
    lose:false,
    delay:false,
    multitarget:true,
    content:function(){
        'step 0'
        targets[0].gain(cards,player,'give');
        'step 1'
        targets[0].useCard(cards,targets[1],false)
    },
    ai:{
        expose:0.4,
        order:4,
        result:{
            target:function(player,target){
            if(player.hasUnknown()) return 0;
            if(ui.selected.targets.length) return -1;
            return -0.5;
            },
        },
    },
}
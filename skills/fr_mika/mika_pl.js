skill={
    audio:2,
    unique:true,
    limited:true,
    enable:"phaseUse",
    animationColor:"thunder",
    skillAnimation:"epic",
    filter:function(event,player){
        return !player.storage.mika_pl
    },
    init:function(player){
        player.storage.mika_pl=false;
    },
    filterTarget:function(card,player,target){
        if(target==player) return false;
        return true;
    },
    filterCard:true,
    selectCard:-1,
    mark:true,
    discard:false,
    lose:false,
    delay:false,
    selectTarget:2,
    multitarget:true,
    content:function(){
        'step 0'
        player.awakenSkill('mika_pl');
        player.storage.mika_pl=true;
        targets[0].gain(cards,player,'give');
        'step 1'
        var list=targets[0].getCards('h')
        var card=list.shift()
        if(targets[1]&&targets[1].isIn()&&targets[0].canUse(card,targets[1],false)){
            targets[0].useCard(card,targets[1],false)
        }
        else{
            player.gain(card)
        }
        if(list.length){
            event.redo()
        }else{
            event.finish()
        }
    },
    intro:{
        content:"limited",
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
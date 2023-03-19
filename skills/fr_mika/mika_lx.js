skill={
    audio:2,
    trigger:{
        player:"phaseDrawBegin2",
    },
    forced:true,
    filter:function(event,player){
        return !event.numFixed;
    },
    content:function(){
        trigger.num+=game.countGroup();
    },
    group:"mika_lx_discard",
    subSkill:{
        discard:{
            audio:2,
            trigger:{
                player:"phaseDiscardBegin",
            },
            forced:true,
            content:function(){
                'step 0'
                player.chooseToDiscard(game.countGroup(),'he',true)
                'step 1'
                if(player.countCards('h')==0){
                    player.loseHp()
                }
                trigger.cancel()
            },
        }
    }
}
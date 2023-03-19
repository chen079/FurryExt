skill={
    trigger:{
        source:"damageBegin1"
    },
    filter:function(event,player){
        return event.getParent().name=='sha'&&player.getExpansions('fr_xieji').length>0
    },
    check:function (event,player){
        if(get.attitude(player,event.player)>=0) return false;
        if(event.player.hasSkillTag('filterDamage',null,{
            player:player,
            card:event.card,
        })) return false;
        return true;
        //return player.hasMark('xinfu_falu_spade')||get.color(ui.cardPile.firstChild)=='black';
    },
    usable:1,
    prompt:"你可以弃置X张'协'令此伤害+X",
    logTarget:"player",
    content:function(){
        "step 0"
        player.chooseCardButton('选择弃置X张“协”',[1,Infinity],player.getExpansions('fr_xieji'))
        "step 1"
        if(result.bool){
            trigger.num+=result.links.length
            player.loseToDiscardpile(result.links)
        }else{
            event.finish()
            return;
        }
    }
}
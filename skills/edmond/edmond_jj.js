skill={
    trigger:{
        player:"phaseJieshuBegin",
    },
    forced:true,
    filter:function(event,player){
        return player.storage.edmond_jz&&player.storage.edmond_jz[0].length>0;//=Math.max(1,player.getDamagedHp());
    },
    content:function(){
        "step 0"
        player.chooseControl("选项一","选项二",true).set("choiceList",["摸两张牌，并令原使用者依次对你使用所有的“战”，然后获得无法使用的“战”","流失一点体力，并对所有原使用者依次使用所有的“战”，然后弃置无法使用的“战”"])
        "step 1"
        if(result.index==0){
            player.draw(2)
            event.goto(3)
        }else{
            player.loseHp()
            event.goto(2)
        }
        "step 2"
        var list=player.storage.edmond_jz,card=list[0].shift(),source=list[1].shift();
        if(player.getExpansions('edmond_jz').contains(card)){
            if(source&&source.isIn()&&player.canUse(card,source,false)) player.useCard(card,source,false);
            else player.loseToDiscardpile(card);
        }
        if(list[0].length){
            event.redo()
        }else{
            event.finish()
        }
        "step 3"
        var list=player.storage.edmond_jz,card=list[0].shift(),source=list[1].shift();
        if(player.getExpansions('edmond_jz').contains(card)){
            if(source&&source.isIn()&&source.canUse(card,player,false)) source.useCard(card,player,false);
            else player.gain(card);
        }
        if(list[0].length){
            event.redo()
        }else{
            event.finish()
        }
    }
}
skill={
    audio:2,
    trigger:{
        target:"useCardToTarget",
    },
    forced:true,
    filter:function(event,player){
        return event.card.name!='jiu'&&event.card.name!='tao'&&event.getParent(2).name!='edmond_jj'&&
            event.targets.length==1&&event.card.isCard&&event.cards.length==1&&
            get.position(event.cards[0],true)=='o'&&event.card.name==event.cards[0].name&&event.player!=player&&
            (!player.storage.edmond_jz||player.storage.edmond_jz[0].length<=player.maxHp)
    },
    content:function(){
        trigger.targets.remove(player);
        trigger.getParent().triggeredTargets2.remove(player);
        trigger.untrigger();
        var card=trigger.cards[0];
        player.addToExpansion(card,'gain2').gaintag.add('edmond_jz');
        if(!player.storage.edmond_jz) player.storage.edmond_jz=[[],[]];
        player.storage.edmond_jz[0].push(card);
        player.storage.edmond_jz[1].push(trigger.player);
        game.delayx();
    },
    onremove:function(player,skill){
        var cards=player.getExpansions(skill);
        if(cards.length) player.loseToDiscardpile(cards);
        delete player.storage[skill];
    },
    intro:{
        markcount:function(storage){
            if(!storage) return 0;
            return storage[0].length;
        },
        mark:function(dialog,storage,player){
            if(!storage) return;
            dialog.addAuto(storage[0]);
            dialog.addText(get.translation(storage[1]));
        },
        onunmark:function(storage,player){
            player.storage.edmond_jz=[[],[]];
        },
    },
}
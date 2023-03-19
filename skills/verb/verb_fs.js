skill={
    trigger:{
        target:"useCardToTargeted",
    },
    filter:function(event,player){
        return event.player!=player&&player.countCards('h')<=player.getDamagedHp()
    },
    direct:true,
    content:function(){
        "step 0"
        event.cards=get.cards(3);
        player.chooseCardButton('发现：获得其中一张牌',event.cards).set('ai',function(button){
            return get.useful(button.link);
        });
        'step 1'
        if(result.bool){
            var card=result.links[0];
            card.fix();
            player.gain(card,'draw');
            game.log(player,'发现了','#y'+get.translation(card))
            event.cards.remove(card);
        }
        'step 2'
        while(event.cards.length){
            ui.cardPile.insertBefore(event.cards.pop(),ui.cardPile.childNodes[get.rand(0,ui.cardPile.childNodes.length)])
        }
        "step 3"
        game.updateRoundNumber()
    }
}
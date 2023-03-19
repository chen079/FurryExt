skill={
    trigger:{
        player:'damageAfter'
    },
    filter:function(event,player){
        return event.source&&event.source!=player
    },
    forced:true,
    content:function(){
        'step 0'
        player.draw()
        trigger.source.draw()
        'step 1'
        player.chooseCard(1,'h',true).set('prompt','请展示一张手牌').set('ai',function(card){
            return Math.random()
        })
        'step 2'
        if(result.bool){
            event.card1=result.cards[0]
            player.discardPlayerCard(trigger.source,'he',true);
        }else{
            event.finish()
        }
        'step 3'
        player.showCards(event.card1)
        if(get.color(event.card1)!=get.color(result.cards[0])){
            player.recover(trigger.num)
        }
    }
}
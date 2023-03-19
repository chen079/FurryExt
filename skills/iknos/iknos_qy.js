skill={
    forced:true,
    trigger:{
        player:'phaseJieshuBegin'
    },
    content:function(){
        var list = [];
        game.getPlayerHistory('cardMove', function (evt) {
            if (evt.name == 'lose') {
                if (evt.position == ui.discardPile) {
                    for (var i of evt.cards){
                        if(get.color(i)=='red') list.add(i);
                    }
                }
            }
            else {
                if (evt.name == 'cardsDiscard') {
                    for (var i of evt.cards){
                        if(get.color(i)=='red') list.add(i);
                    }
                }
            }
        });
        player.gain(list.slice(0,2),'gain2')
    }
}
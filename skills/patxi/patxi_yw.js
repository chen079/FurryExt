skill={
    trigger:{
        player:"phaseEnd"
    },
    silent:true,
    forced:true,
    content:function(){
        var cards=[];
        var card1=get.cardPile2(function(card){
            return get.color(card,false)=='red';
        });
        if(card1) cards.push(card1);
        var card2=get.cardPile2(function(card){
            return get.color(card,false)=='black';
        });
        if(card2) cards.push(card2);
        if(cards.length) player.gain(cards,'gain2');
    }
}
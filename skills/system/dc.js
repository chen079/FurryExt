skill={
    content:function(){
        'step 0'
        var cards=get.cards(num)
        event.cards=cards
        var next=player.chooseCardButton([1,Infinity],cards,'获得点数为等差数列的牌');
        next.set('ai',function(button){
            return get.value(button.link,_status.event.player);
        })
        next.set('filterButton',function(button){
            if(ui.selected.buttons.length<2) return true
            var arr=ui.selected.buttons.map(i=>get.number(i.link)).sort();
            var d=arr[1]-arr[0];
            var max=arr[arr.length-1];
            var min=arr[0];
            return [min-d,max+d].contains(get.number(button));
        });
        'step 1'
        if(result.bool){
            var cards = result.links;
            player.gain(cards,'draw')
            game.log(player, '筹算了', '#y' + get.translation(cards))
            event.cards.remove(cards);
        }
        'step 2'
        while (event.cards.length) {
            ui.cardPile.insertBefore(event.cards.pop(), ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length)])
        }
    }
}
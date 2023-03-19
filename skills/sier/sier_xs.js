skill={
    trigger:{
        player:"dying",
    },
    forced:true,
    forceDie:true,
    unique:true,
    juexingji:true,
    skillAnimation:true,
    animationColor:"metal",
    content:function(){
        "step 0"
        player.awakenSkill('sier_xs');
        player.gainMaxHp()
        player.recover(4)
        "step 1"
        var card = get.cardPile(function (card) {
            return get.suit(card) == 'heart';
        })
        if (card) player.gain(card);
        "step 2"
        var card = get.cardPile(function (card) {
            return get.suit(card) == 'club';
        })
        if (card) player.gain(card);
        "step 3"
        var card = get.cardPile(function (card) {
            return get.suit(card) == 'spade';
        })
        if (card) player.gain(card);
        "step 4"
        var card = get.cardPile(function (card) {
            return get.suit(card) == 'diamond';
        })
        if (card) player.gain(card);
    },
}
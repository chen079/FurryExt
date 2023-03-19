skill = {
    enable: "phaseUse",
    usable: 1,
    filterCard:true,
    selectCard:1,
    check:function(card){
        return 9-get.value(card)
    },
    position: "he",
    content: function () {
        'step 0'
        var list = lib.config.all.cards
        player.chooseControl(list).set('prompt','选择所属的卡牌包').set('ai',function(){
            return list.randomGet()
        });
        'step 1'
        var list = lib.cardPack[result.control];
        player.chooseButton([[list, 'vcard']]).set('ai', function (button) {
            return get.useful(button.link);
        }).set('prompt','选择所需的卡牌');
        'step 2'
        var name = result.links[0][2];
        event.nature = result.links[0][3];
        event.cardname = name;
        var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
        player.chooseControl(list).set('ai', function () {
            return list.randomGet();
        }).set('prompt','选择此牌的点数');
        'step 3'
        event.number = result.control;
        var list = ['diamond', 'spade', 'heart', 'club']
        player.chooseControl(list).set('ai', function () {
            return list.randomGet();
        }).set('prompt','选择此牌的花色');
        'step 4'
        event.suit = result.control;
        var fakecard = game.createCard(event.cardname, event.suit, event.number, event.nature);
        player.gain(fakecard, 'gain1', 'log');
    },
    sub: true,
    ai: {
        order: 8.2,
        result: {
            player: 3,
        },
    },
}
skill = {
    audio: true,
    fullskin: true,
    type: "trick",
    enable: true,
    selectTarget: -1,
    cardcolor: "red",
    toself: true,
    filterTarget: function (card, player, target) {
        return target == player;
    },
    modTarget: true,
    content: function () {
        'step 0'
        var list = lib.config.all.cards
        event.list = list
        var choiceList = []
        for (var i = 0; i < list.length; i++) {
            choiceList.push(get.translation(list[i] + '_card_config'))
        }
        target.chooseControl(choiceList).set('prompt', '选择所属的卡牌包');
        'step 1'
        var choice = event.list[result.index]
        var list = lib.cardPack[choice];
        target.chooseButton([[list, 'vcard']]).set('ai', function (button) {
            return Math.random();
        }).set('prompt', '选择所需的卡牌');
        'step 2'
        var name = result.links[0][2];
        event.nature = result.links[0][3];
        event.cardname = name;
        var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
        target.chooseControl(list).set('ai', function () {
            return list.randomGet();
        }).set('prompt', '选择此牌的点数');
        'step 3'
        event.number = result.control;
        var list = ['diamond', 'spade', 'heart', 'club']
        target.chooseControl(list).set('ai', function () {
            return list.randomGet();
        }).set('prompt', '选择此牌的花色');
        'step 4'
        event.suit = result.control;
        var fakecard = game.createCard(event.cardname, event.suit, event.number, event.nature);
        target.gain(fakecard, 'gain1', 'log');
    },
    ai: {
        basic: {
            order: 7.2,
            useful: 4.5,
            value: 9.2,
        },
        result: {
            target: 2,
        },
        tag: {
            draw: 1,
        },
    },
}
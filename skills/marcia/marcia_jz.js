skill={
    usable:1,
    enable:"phaseUse",
    filter:function (event, player) {
        return player.countCards('h') > 0
    },
    init:function (player) {
        if (!player.storage.marcia_jz_suit) player.storage.marcia_jz_suit = [];
    },
    filterCard:function (card, player, target) {
        var suit = get.suit(card);
        for (var i = 0; i < ui.selected.cards.length; i++) {
            if (get.suit(ui.selected.cards[i]) == suit) return false;
        }
        return true;
    },
    selectCard:[1,Infinity],
    check:function (card) {
        return 5 - get.value(card)
    },
    "prompt2":"你可以弃置任意数量的牌，然后本回合若你使用的牌的花色与你弃置过的花色相同，此牌不可被响应。",
    mark:true,
    intro:{
        content:function (storage, player, skill) {
            if (player.storage.marcia_jz_suit) { return "已记录花色：" + get.translation(player.storage.marcia_jz_suit) }
        },
        onunmark:true,
    },
    content:function () {
        "step 0"
        player.draw(cards.length)
        for (var i = 0; i < cards.length; i++) {
            if (!player.storage.marcia_jz_suit.contains(get.suit(cards[i]))) {
                player.storage.marcia_jz_suit.push(get.suit(cards[i]))
            }
        }
        "step 1"
        player.addTempSkill("marcia_jz_1")
    },
    ai:{
        order:7,
        result:{
            player:1,
        },
    },
    group:"marcia_jz_remove",
    subSkill:{
        "1":{
            trigger:{
                player:"useCard",
            },
            forced:true,
            filter:function (event, player) {
                return event.card.name == 'sha' && player.storage.marcia_jz_suit.contains(get.suit(event.card));
            },
            content:function () {
                trigger.directHit.addArray(game.players)
            },
            mod:{
                wuxieRespondable:function (card, player) {
                    if (player.storage.marcia_jz_suit.contains(get.suit(card))) return false;
                },
            },
            sub:true,
        },
        suit:{
            sub:true,
        },
        remove:{
            forced:true,
            popup:false,
            trigger:{
                player:"phaseAfter",
            },
            content:function () {
                player.storage.marcia_jz_suit = []
            },
            sub:true,
        },
    },
}
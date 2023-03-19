skill = {
    enable: "phaseUse",
    usable: "1",
    position: "h",
    filterCard: function (card) {
        var color = get.color(card);
        for (var i = 0; i < ui.selected.cards.length; i++) {
            if (get.color(ui.selected.cards[i]) != color) return false;
        }
        return true;
    },
    init: function (player, storage) {
        if (!player.storage.lint_nd) player.storage.lint_nd = ''
    },
    check: function (card) {
        if (get.color(ui.selected.cards[0]) == 'red') {
            return 7 - get.value(card)
        } else {
            return 5 - get.value(card)
        }
    },
    selectCard: [1, 5],
    complexCard: true,
    filterTarget: true,
    content: function () {
        player.storage.lint_nd = cards
        if (get.color(cards[0]) == 'red') {
            target.addTempSkill("lint_nd_gain", { player: "phaseUseEnd" })
            target.storage.lint_nd_gain = cards.length
            target.draw()
        }
        else {
            target.addTempSkill("lint_nd_lose", { player: "phaseUseEnd" })
            target.storage.lint_nd_lose = cards.length
            target.draw()
        }
    },
    ai: {
        order: 14,
        result: {
            target: function (player, target) {
                if (get.color(player.storage.lint_nd[0]) == 'black') return -player.storage.lint_nd.length;
                return player.storage.lint_nd.length
            },
        },
    },
    subSkill: {
        gain: {
            trigger: {
                player: ["loseAfter", "gainAfter"],
            },
            direct: true,
            locked: true,
            filter: function (event, player) {
                return player.countCards('h') < player.storage.lint_nd_gain;
            },
            content: function () {
                player.draw(player.storage.lint_nd_gain - player.countCards('h'));
            },
            sub: true,
        },
        lose: {
            trigger: {
                player: ["loseEnd", "gainEnd"],
            },
            direct: true,
            filter: function (event, player) {
                return player.countCards('h') > (5 - player.storage.lint_nd_lose);
            },
            content: function () {
                var num = player.countCards('h') - (5 - player.storage.lint_nd_lose)
                player.chooseToDiscard(num, 'he', true)
            },
            sub: true,
        },
    },
}
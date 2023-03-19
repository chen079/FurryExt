skill = {
    mod: {
        targetEnabled: function (card, player, target, now) {
            if (card.name == 'sha') return false;
        },
    },
    group: ["kesaya_wy_1", "kesaya_wy_2"],
    subSkill: {
        "1": {
            trigger: {
                player: "phaseDiscardBefore",
            },
            forced: true,
            content: function () {
                trigger.cancel();
            },
            sub: true,
        },
        "2": {
            trigger: {
                global: "useCard1",
            },
            audio: 2,
            forced: true,
            firstDo: true,
            filter: function (event, player) {
                var info = lib.card[event.card.name];
                if (event.player == player) return false;
                if (get.color(event.card) != 'black' || get.type(event.card) != 'trick') return false;
                return info.selectTarget && info.selectTarget == -1 && !info.toself;
            },
            content: function () { },
            mod: {
                targetEnabled: function (card) {
                    if ((get.type(card) == 'trick' || get.type(card) == 'delay') &&
                        get.color(card) == 'black') return false;
                },
            },
        }
    },
}
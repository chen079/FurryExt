skill = {
    marktext: "正",
    intro: {
        mark: function (dialog, storage, player) {
            dialog.addAuto(player.getCards('s', function (card) {
                return card.hasGaintag('sayisu_fj');
            }));
        },
        markcount: function (storage, player) {
            return player.getCards('s', function (card) {
                return card.hasGaintag('sayisu_fj');
            }).length;
        },
        onunmark: function (storage, player) {
            var cards = player.getCards('s', function (card) {
                return card.hasGaintag('sayisu_fj');
            });
            if (cards.length) {
                player.lose(cards, ui.discardPile);
                player.$throw(cards, 1000);
                game.log(cards, '进入了弃牌堆');
            }
        },
    },
    mod: {
        aiOrder: function (player, card, num) {
            if (get.itemtype(card) == 'card' && card.hasGaintag('sayisu_fj')) return num + 0.5;
        },
    },
    group: ["sayisu_fj_clear"],
    trigger: {
        player: "phaseZhunbeiBegin",
    },
    direct: true,
    content: function () {
        'step 0'
        player.chooseControl('1', '2', '3', '4', 'cancel2').set('prompt', get.prompt('sayisu_fj')).set('prompt2', '妄行：将X张牌置于武将牌上').set('ai', function () {
            var player = _status.event.player;
            if (player.maxHp > 3) return 3;
            return Math.min(3, player.countCards('he'));
        });
        'step 1'
        if (result.control != 'cancel2') {
            var num = result.index + 1, cards = get.cards(num);
            player.logSkill('sayisu_fj');
            player.addTempSkill('wangxing');
            player.addMark('wangxing', num, false);
            player.$gain2(cards, false);
            game.log(player, '将', cards, '放到了武将牌上');
            player.loseToSpecial(cards, 'sayisu_fj').visible = true;
        }
        else event.finish();
        'step 2'
        player.markSkill('sayisu_fj');
        game.delayx();
    },
    subSkill: {
        clear: {
            trigger: {
                player: "phaseBegin",
            },
            filter: function (event, player) {
                return player.countCards('s', function (card) {
                    return card.hasGaintag('sayisu_fj');
                });
            },
            forced: true,
            locked: false,
            content: function () {
                var cards = player.getCards('s', function (card) {
                    return card.hasGaintag('sayisu_fj');
                });
                player.lose(cards, ui.discardPile);
                player.$throw(cards, 1000);
                game.log(cards, '进入了弃牌堆');
                game.delayx();
            },
            sub: true,
        },
    },
}
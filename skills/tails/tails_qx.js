skill = {
    trigger: {
        global: 'phaseEnd'
    },
    filter: function (event, player) {
        var targets = [];
        game.countPlayer2(current => {
            var history = current.getHistory('useCard');
            if (!history.length) return false;
            for (var evt of history) {
                if (evt.card) {
                    targets.addArray(evt.targets);
                }
            }
        });
        return event.player != player && !targets.contains(player)
    },
    direct: true,
    content: function () {
        'step 0'
        player.draw()
        'step 1'
        player.chooseToDiscard(1, 'he', '是否弃置一张牌并进行一次打造').set('ai', function (card) {
            return 5 - get.value(card)
        })
        'step 2'
        if (result.bool) {
            event.suit = get.suit(result.cards[0])
            var namelist = ['cixiong', 'fangtian', 'guanshi', 'hanbing', 'qilin', 'qinggang', 'qinglong', 'zhangba', 'zhuge', 'rewrite_zhuge',
                "rewrite_bagua", "rewrite_baiyin", "rewrite_lanyinjia", "rewrite_renwang", "tengjia", 'guding', 'zhuque', "bagua", "baiyin", "lanyinjia", "renwang", "tengjia",
                'dilu', 'jueying', 'zhuahuang', 'chitu', 'dawan', 'zixin', 'hualiu', 'muniu', 'bintieshuangji', 'wuxinghelingshan', 'wutiesuolian', 'wushuangfangtianji', 'chixueqingfeng',
                'huxinjing', 'guilongzhanyuedao', 'heiguangkai', 'linglongshimandai', 'hongmianbaihuapao', 'qimenbagua', 'guofengyupao', 'zhaogujing', 'sanlve', 'tianjitu',
                'taigongyinfu', 'shufazijinguan', 'xuwangzhimian', 'fr_equip5_wxpp', 'fr_equip1_syzg']
            var choices = []
            for (var i = 0; i < namelist.length; i++) {
                choices.push(['equip', 8, namelist[i]])
            }
            player.chooseButton(['选择所需的卡牌', [choices, 'vcard']], true).set('ai', function (button) {
                return get.useful(button.link)
            })
        } else {
            event.finish()
        }
        'step 3'
        event.nature = result.links[0][3];
        event.cardname = result.links[0][2];
        player.chooseTarget(1, '令一名角色装备' + get.translation(event.cardname) + "【" + get.translation(event.suit) + "8】", true).set('ai', function (target) {
            var player = _status.event.player
            return get.attitude(player, target) > 0
        })
        'step 4'
        var card1 = game.createCard(event.cardname, event.suit, 8, event.nature);
        var target = result.targets[0]
        target.equip(card1);
        target.$draw(card1);
        game.delay();
    },
    group: 'tails_qx_1',
    subSkill: {
        1: {
            trigger: {
                player: "phaseZhunbeiBegin",
            },
            filter: function (event, player) {
                var bool1 = false
                for (var i of lib.suit) {
                    if (player.countCards('h', { suit: i }) > 1) bool1 = true;
                }
                var bool2 = false
                if (game.countPlayer(function (current) {
                    return current.countCards('e', function (card) {
                        return get.number(card) == 8
                    }) > 0
                }) > 0) bool2 = true
                return bool1 && player.countCards('he') > 0 && bool2
            },
            direct: true,
            content: function () {
                'step 0'
                player.chooseToDiscard(2, get.prompt2('tails_qx'), 'hs', function (card) {
                    if (ui.selected.cards.length) {
                        return get.suit(card) == get.suit(ui.selected.cards[0]);
                    }
                    var cards = player.getCards('hs');
                    for (var i = 0; i < cards.length; i++) {
                        if (card != cards[i]) {
                            if (get.suit(card) == get.suit(cards[i])) return true;
                        }
                    }
                    return false;
                }).set('complexCard', true).set('ai', function (card) {
                    var player = _status.event.player
                    return 6 - get.value(card) + game.countPlayer(function (current) {
                        return current != player && get.attitude(player, current) < 0 && current.countCards('e', function (card) {
                            return get.number(card) == 8
                        }) > 0
                    })
                })
                'step 1'
                if (result.bool) {
                    player.chooseTarget([1, Infinity], '销毁任意角色的任意张点数为8的装备牌，并造成等量伤害', function (card, player, target) {
                        return target.countCards('e', function (card) {
                            return get.number(card) == 8
                        }) > 0
                    }, true).set('ai', function (target) {
                        var player = _status.event.player
                        return get.attitude(player, target) < 0
                    })
                } else {
                    event.finish()
                }
                'step 2'
                event.targets = result.targets
                'step 3'
                event.target = event.targets.shift()
                var cards = event.target.getCards('e', function (card) {
                    return get.number(card) == 8
                })
                player.chooseCardButton([1, Infinity], cards, '销毁' + get.translation(event.target) + '的至少一张装备牌', true)
                'step 4'
                var cards = result.links
                for (var i = 0; i < cards.length; i++) {
                    cards[i]._destroy = '';
                }
                event.target.$throw(cards, 1000);
                event.target.lose(cards)._triggered = null;
                game.log(player, '销毁了', cards);
                event.target.damage(result.cards.length, player)
                'step 5'
                if (event.targets.length) {
                    event.goto(3)
                }
            }
        }
    }
}
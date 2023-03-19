skill = {
    zhuanhuanji: true,
    marktext: "☯",
    mark: true,
    init: function (player, storage, skill) {
        if (!player.storage.ham_cy) player.storage.ham_cy = false
    },
    intro: {
        content: function (storage) {
            return storage ? '出牌阶段结束时，你可以摸X张牌（X为你本回合造成的伤害数），直到你的下个回合开始：当你成为其他角色【杀】或伤害类锦囊牌的目标时，若此牌目标数大于1，你取消之；否则，你弃置该角色一张牌。' : '出牌阶段开始时，你可以展示其他角色的一张手牌，然后你可以将与展示牌不同花色的一张手牌当作【出其不意】对该角色使用（每种花色限一次），若【出其不意】未造成伤害，你结束本回合，否则你可以重复此流程。';
        },
    },
    group: ["ham_cy_positive", "ham_cy_nagtive"],
    subSkill: {
        positive: {
            trigger: {
                player: "phaseUseBegin"
            },
            direct: true,
            filter: function (event, player) {
                return !player.storage.ham_cy
            },
            direct: true,
            content: function () {
                "step 0"
                if (!player.storage.ham_cy) player.storage.ham_cy = false;
                player.storage.ham_cy = !player.storage.ham_cy;
                event.suit = []
                "step 1"
                player.chooseTarget(1, '展示一名其他角色的一张牌', function (card, player, target) {
                    return target != player
                }).set('ai', function (target) {
                    var player = _status.event.player
                    return -get.attitude(player, target)
                })
                "step 2"
                if (result.bool) {
                    event.target = result.targets[0]
                    event.card = event.target.getCards('h').randomGet();
                    event.target.showCards(event.card, get.translation(event.target) + '展示了' + get.translation(event.card))
                } else {
                    event.finish()
                }
                "step 3"
                var tempSuit = event.suit
                if (!event.suit.contains(get.suit(event.card))) {
                    tempSuit.push(get.suit(event.card))
                }
                if (player.canUse({ name: 'chuqibuyi', isCard: true }, event.target)) {
                    player.chooseCard(1, 'h', function (card, player) {
                        return !tempSuit.contains(get.suit(card))
                    }).set('prompt2', '将一张花色不为' + get.translation(tempSuit) + '的手牌当作【出其不意】对' + get.translation(event.target) + '使用')
                        .set('ai', function (card) {
                            var player = _status.event.player
                            if (get.attitude(player, event.target) > 0) {
                                return -1
                            } else {
                                return 7 - get.value(card)
                            }
                        })
                } else {
                    event.finish()
                }
                "step 4"
                if (result.bool) {
                    event.cardx = result.cards[0]
                    event.suit.push(get.suit(result.cards[0]))
                    event.related = player.useCard(result.cards, { name: 'chuqibuyi' }, target, false, 'ham_cy').card;
                    game.log(event.related)
                } else {
                    event.finish()
                }
                "step 5"
                if (!player.getHistory('sourceDamage', function (evt) {
                    var card = evt.card;
                    var evtx = evt.getParent('useCard');
                    return card && card.name == 'chuqibuyi' && evtx.card == card && evtx.card == event.related && evtx.getParent() == event;
                }).length) {
                    trigger.cancel()
                    var evt = _status.event.getParent('phaseUse');
                    if (evt && evt.name == 'phaseUse') {
                        evt.skipped = true;
                    }
                    var evt = _status.event.getParent('phase');
                    if (evt && evt.name == 'phase') {
                        evt.finish();
                    }
                    event.finish()
                } else {
                    event.goto(1)
                }
            },
        },
        nagtive: {
            trigger: {
                player: "phaseUseEnd"
            },
            filter: function (event, player) {
                return player.storage.ham_cy
            },
            direct: true,
            content: function () {
                if (!player.storage.ham_cy) player.storage.ham_cy = false;
                player.storage.ham_cy = !player.storage.ham_cy;
                var stat = player.getStat();
                if (stat.damage && stat.damage > 0) {
                    player.draw(stat.damage)
                }
                player.addTempSkill('ham_cy_1', { player: "phaseBegin" })
            }
        },
        1: {
            trigger: {
                target: "useCardToTargeted",
            },
            filter: function (event, player) {
                return (event.card.name == 'sha' || (get.type(event.card) == 'trick' && get.tag(event.card, 'damage'))) && event.targets;
            },
            direct: true,
            content: function () {
                if (trigger.targets.length > 1) {
                    trigger.getParent().excluded.add(player);
                } else if (trigger.targets.length == 1) {
                    player.discardPlayerCard(trigger.player, 'he', true)
                }
            }
        }
    }
}
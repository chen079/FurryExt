'use strict';
game.import('card', function (lib, game, ui, get, ai, _status) {
    var furryCard = {
        name: 'furryCard',//卡包命名
        connect: true,//卡包是否可以联机
        card: {
            'fr_card_yfss': {
                audio: true,
                fullskin: true,
                image: 'ext:福瑞拓展/image/card/fr_card_yfss.png',
                type: "trick",
                enable: true,
                selectTarget: -1,
                toself: true,
                position: 'h',
                filterTarget: function (card, player, target) {
                    return target == player && target.hujia < 5;
                },
                modTarget: true,
                content: function () {
                    'step 0'
                    event.cards = target.getCards('h')
                    target.discard(event.cards)
                    'step 1'
                    target.changeHujia(event.cards.length, 'gain', true);
                },
                ai: {
                    basic: {
                        order: 5.2,
                        useful: 3.5,
                        value: 5.2,
                    },
                    result: {
                        target: function (player, target) {
                            if ((target.countCards('h') + 1) > (5 - target.hujia)) return -((target.countCards('h') + 1) - (5 - target.hujia))
                            if (target.countCards('h', function (card) {
                                return get.value(card) > 7
                            }) > 0) return -2
                            if (target.hp > 2) return -1
                            if (target.countCards('h') == 1) return -1
                            return Math.sqrt(target.countCards('h')) - 1
                        },
                    },
                    tag: {
                        discard: 2,
                    },
                },
            },
            'fr_equip1_ar15': {
                fullskin: true,
                image: 'ext:福瑞拓展/image/card/fr_equip1_ar15.png',
                type: "equip",
                subtype: "equip1",
                distance: {
                    attackFrom: -8,
                },
                skills: ["ar15_skill"],
                enable: true,
                selectTarget: -1,
                filterTarget: function (card, player, target) {
                    return target == player;
                },
                modTarget: true,
                allowMultiple: false,
                content: function () {
                    if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
                },
                toself: true,
                ai: {
                    equipValue: 9,
                    basic: {
                        order: function (card, player) {
                            if (player && player.hasSkillTag('reverseEquip')) {
                                return 8.5 - get.equipValue(card, player) / 20;
                            } else {
                                return 8 + get.equipValue(card, player) / 20;
                            }
                        },
                        useful: 2,
                        equipValue: 9,
                        value: function (card, player, index, method) {
                            if (player.isDisabled(get.subtype(card))) return 0.01;
                            var value = 0;
                            var info = get.info(card);
                            var current = player.getEquip(info.subtype);
                            if (current && card != current) {
                                value = get.value(current, player);
                            }
                            var equipValue = info.ai.equipValue;
                            if (equipValue == undefined) {
                                equipValue = info.ai.basic.equipValue;
                            }
                            if (typeof equipValue == 'function') {
                                if (method == 'raw') return equipValue(card, player);
                                if (method == 'raw2') return equipValue(card, player) - value;
                                return Math.max(0.1, equipValue(card, player) - value);
                            }
                            if (typeof equipValue != 'number') equipValue = 0;
                            if (method == 'raw') return equipValue;
                            if (method == 'raw2') return equipValue - value;
                            return Math.max(0.1, equipValue - value);
                        },
                    },
                    result: {
                        target: function (player, target, card) {
                            return get.equipResult(player, target, card.name);
                        },
                    },
                },
            },
            'fr_equip1_shyl': {
                fullskin: true,
                image: 'ext:福瑞拓展/image/card/fr_equip1_shyl.png',
                type: "equip",
                subtype: "equip1",
                distance: {
                    attackFrom: -1,
                },
                ai: {
                    equipValue: function (card, player) {
                        return Math.min(2.5 + player.countCards('h', 'sha'), 4);
                    },
                    basic: {
                        equipValue: 3.5,
                        order: function (card, player) {
                            if (player && player.hasSkillTag('reverseEquip')) {
                                return 8.5 - get.equipValue(card, player) / 20;
                            } else {
                                return Math.min(7.2, 7 + get.equipValue(card, player) / 60);
                            }
                        },
                        useful: 2,
                        value: function (card, player, index, method) {
                            if (player.isDisabled(get.subtype(card))) return 0.01;
                            var value = 0;
                            var info = get.info(card);
                            var current = player.getEquip(info.subtype);
                            if (current && card != current) {
                                value = get.value(current, player);
                            }
                            var equipValue = info.ai.equipValue;
                            if (equipValue == undefined) {
                                equipValue = info.ai.basic.equipValue;
                            }
                            if (typeof equipValue == 'function') {
                                if (method == 'raw') return equipValue(card, player);
                                if (method == 'raw2') return equipValue(card, player) - value;
                                return Math.max(0.1, equipValue(card, player) - value);
                            }
                            if (typeof equipValue != 'number') equipValue = 0;
                            if (method == 'raw') return equipValue;
                            if (method == 'raw2') return equipValue - value;
                            return Math.max(0.1, equipValue - value);
                        },
                    },
                    result: {
                        target: function (player, target, card) {
                            return get.equipResult(player, target, card.name);
                        },
                    },
                },
                skills: ["shyl_skill"],
                enable: true,
                selectTarget: -1,
                filterTarget: function (card, player, target) {
                    return target == player;
                },
                modTarget: true,
                allowMultiple: false,
                content: function () {
                    if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
                },
                toself: true,
            },
            'fr_card_xzst': {
                fullskin: true,
                image: 'ext:福瑞拓展/image/card/fr_card_xzst.png',
                type: "trick",
                savable: function (card, player, target) {
                    return player != target
                },
                filterTarget: function (card, player, target) {
                    return target != player
                },
                global: "g_fr_card_xzst",
                content: function () {
                    'step 0'
                    var next = player.chooseControl()
                    next.set('choiceList', ['弃置一张手牌（不足则不弃）并令' + get.translation(target) + '摸两张牌。', '受到1点伤害并视为失去1点体力并令' + get.translation(target) + '回复1点体力。'])
                    next.set('ai', function () {
                        if (get.attitude(player, target) > 0) {
                            if (player.hp >= 2 && target.hp <= 1) return 1
                            if (player.countCards('h') > player.hp) return 0
                            if (player.hasSkillTag('maixie') && player.hp >= 2) return 1
                            if (player.countCards('h') == 0 && target.hp > 1) return 0
                        }
                        return 0
                    })
                    'step 1'
                    if (result.index == 0) {
                        player.chooseToDiscard(1, 'h', true)
                        target.draw(2)
                        event.finish()
                    } else {
                        target.recover()
                    }
                    'step 2'
                    if (!target.isDying()) {
                        player.damage()
                        player.fakeLoseHp()
                    }
                },
                ai: {
                    basic: {
                        order: 1,
                        useful: [6.5, 4, 3, 2],
                        value: [6.5, 4, 3, 2],
                    },
                    result: {
                        target: 2,
                        player: -0.5
                    },
                    tag: {
                        draw: 2,
                        loseCard: 1,
                        gain: 1,
                        recover: 1,
                        save: 1,
                    },
                },
                selectTarget: 1,
            },
            'fr_equip2_yyxl': {
                image: 'ext:福瑞拓展/image/card/fr_equip2_yyxl.png',
                fullskin: true,
                loseDelay: false,
                onLose: function () {
                    var next = game.createEvent('yyxl_draw');
                    event.next.remove(next);
                    var evt = event.getParent();
                    if (evt.getlx === false) evt = evt.getParent();
                    evt.after.push(next);
                    next.player = player;
                    next.setContent(function () {
                        if (player.isDamaged()) player.logSkill('yy_skill');
                        player.draw(2);
                    });
                },
                type: "equip",
                subtype: "equip2",
                skills: ["yy_skill"],
                ai: {
                    equipValue: function (card, player) {
                        return 7.5;
                    },
                    basic: {
                        equipValue: 7.5,
                        order: function (card, player) {
                            if (player && player.hasSkillTag('reverseEquip')) {
                                return 8.5 - get.equipValue(card, player) / 20;
                            }
                            else {
                                return 8 + get.equipValue(card, player) / 20;
                            }
                        },
                        useful: 2,
                        value: function (card, player, index, method) {
                            if (player.isDisabled(get.subtype(card))) return 0.01;
                            var value = 0;
                            var info = get.info(card);
                            var current = player.getEquip(info.subtype);
                            if (current && card != current) {
                                value = get.value(current, player);
                            }
                            var equipValue = info.ai.equipValue;
                            if (equipValue == undefined) {
                                equipValue = info.ai.basic.equipValue;
                            }
                            if (typeof equipValue == 'function') {
                                if (method == 'raw') return equipValue(card, player);
                                if (method == 'raw2') return equipValue(card, player) - value;
                                return Math.max(0.1, equipValue(card, player) - value);
                            }
                            if (typeof equipValue != 'number') equipValue = 0;
                            if (method == 'raw') return equipValue;
                            if (method == 'raw2') return equipValue - value;
                            return Math.max(0.1, equipValue - value);
                        },
                    },
                    result: {
                        target: function (player, target, card) {
                            return get.equipResult(player, target, card.name);
                        },
                    },
                },
                enable: true,
                selectTarget: -1,
                filterTarget: function (card, player, target) {
                    return target == player;
                },
                modTarget: true,
                allowMultiple: false,
                content: function () {
                    if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
                },
                toself: true,
            },
            "fr_equip1_mhlq": {
                image: 'ext:福瑞拓展/image/card/fr_equip1_mhlq.png',
                fullskin: true,
                type: "equip",
                subtype: "equip1",
                distance: {
                    attackFrom: -1,
                },
                ai: {
                    basic: {
                        equipValue: 3,
                        order: function (card, player) {
                            if (game.hasPlayer(function (current) {
                                return current.hujia > 0 && get.attitude(player, current) < 0
                            })) {
                                return 10 + get.equipValue(card, player) / 20;
                            }
                            if (player && player.hasSkillTag('reverseEquip')) {
                                return 8.5 - get.equipValue(card, player) / 20;
                            }
                            else {
                                return 8.5 + get.equipValue(card, player) / 20;
                            }
                        },
                        useful: 2,
                        value: function (card, player, index, method) {
                            if (player.isDisabled(get.subtype(card))) return 0.01;
                            var value = 0;
                            var info = get.info(card);
                            var current = player.getEquip(info.subtype);
                            if (current && card != current) {
                                value = get.value(current, player);
                            }
                            var equipValue = info.ai.equipValue;
                            if (equipValue == undefined) {
                                equipValue = info.ai.basic.equipValue;
                            }
                            if (typeof equipValue == 'function') {
                                if (method == 'raw') return equipValue(card, player);
                                if (method == 'raw2') return equipValue(card, player) - value;
                                return Math.max(0.1, equipValue(card, player) - value);
                            }
                            if (typeof equipValue != 'number') equipValue = 0;
                            if (method == 'raw') return equipValue;
                            if (method == 'raw2') return equipValue - value;
                            return Math.max(0.1, equipValue - value);
                        },
                    },
                    result: {
                        target: function (player, target, card) {
                            return get.equipResult(player, target, card.name)
                        },
                    },
                },
                skills: ["mhlq_skill"],
                enable: true,
                selectTarget: -1,
                filterTarget: function (card, player, target) {
                    return target == player;
                },
                modTarget: true,
                allowMultiple: false,
                content: function () {
                    if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
                },
                toself: true,
                fullimage: true,
            },
            'fr_card_chongci': {
                image: 'ext:福瑞拓展/image/card/fr_card_chongci.png',
                type: "db_atk",
                fullimage: true,
                derivation: "fr_tails",
            },
            'fr_card_zhuanyi': {
                image: 'ext:福瑞拓展/image/card/fr_card_zhuanyi.png',
                type: "db_atk",
                fullimage: true,
                derivation: "fr_tails",
            },
            'fr_card_scfm': {
                image: 'ext:福瑞拓展/image/card/fr_card_scfm.png',
                audio: true,
                fullskin: true,
                "yingbian_prompt": "当你使用此牌选择目标后，你可为此牌减少一个目标",
                "yingbian_tags": ["remove"],
                yingbian: function (event) {
                    event.yingbian_removeTarget = true;
                },
                reverseOrder: true,
                type: "trick",
                enable: true,
                cardcolor: "red",
                selectTarget: -1,
                filterTarget: true,
                content: function () {
                    target.draw()
                },
                ai: {
                    value: [8, 1],
                    useful: [6, 1],
                    result: {
                        target: 1,
                        player: 0.5
                    },
                    order: 1.2,
                },
                tag: {
                    multitarget: 1,
                    multineg: 1,
                    draw: 1,
                },
            },
            'fr_card_djlj': {
                image: 'ext:福瑞拓展/image/card/fr_card_djlj.png',
                audio: true,
                fullskin: true,
                type: "trick",
                enable: true,
                "yingbian_prompt": "当你使用此牌选择目标后，你可为此牌减少一个目标",
                "yingbian_tags": ["remove"],
                yingbian: function (event) {
                    event.yingbian_removeTarget = true;
                },
                cardcolor: "black",
                selectTarget: -1,
                filterTarget: function (card, player, target) {
                    return !target.hasSkill('card_djlj')
                },
                filter: function (event, player) {
                    return game.hasPlayer(function (current) {
                        return !current.hasSkill('card_djlj')
                    })
                },
                content: function () {
                    target.addTempSkill('card_djlj', { player: 'phaseAfter' })
                },
                ai: {
                    value: [7.5, 1],
                    useful: [5, 1],
                    result: {
                        target: function (player, target) {
                            if (target == _status.currentPhase) return 1
                            return -1
                        },
                    },
                    order: 7,
                },
                tag: {
                    multitarget: 1,
                    multineg: 1,
                },
            },
            "fr_card_zfxd": {
                image: 'ext:福瑞拓展/image/card/fr_card_zfxd.png',
                audio: true,
                fullskin: true,
                type: "trick",
                enable: true,
                singleCard: true,
                complexSelect: true,
                complexTarget: true,
                multicheck: function () {
                    return game.hasPlayer(function (current) {
                        return game.hasPlayer(function (current2) {
                            return current.inRange(current2)
                        })
                    });
                },
                filterTarget: function (card, player, target) {
                    return target.isAlive() && game.hasPlayer(function (current) {
                        return target != current && target.inRange(current)
                    });
                },
                filterAddedTarget: function (card, player, target, preTarget) {
                    return target != preTarget && preTarget.isIn() && target.isIn() && preTarget.inRange(target) && ui.selected.targets.length <= 1
                },
                recastable: true,
                content: function () {
                    'step 0'
                    if (!target || !event.addedTarget || !target.isIn() || !event.addedTarget.isIn()) {
                        event.finish()
                    }
                    var card1 = game.createCard('sha')
                    var card2 = game.createCard('shan')
                    event.cards = [card1, card2]
                    'step 1'
                    if (target && target.isIn()) {
                        var att = get.attitude(target, event.addedTarget)
                        target.chooseCardButton('选择其中一张牌', true, event.cards).set('ai', function (card) {
                            if (att > 0) {
                                switch (get.name(card)) {
                                    case 'shan': return 1;
                                    default: return 0;
                                }
                            } else {
                                switch (get.name(card)) {
                                    case 'sha': return 1;
                                    default: return 0;
                                }
                            }
                        });
                    } else {
                        event.finish()
                    }
                    'step 2'
                    if (event.addedTarget && event.addedTarget.isIn()) {
                        var att = get.attitude(event.addedTarget, target)
                        event.card1 = result.links[0];
                        event.addedTarget.chooseCardButton('选择其中一张牌', true, event.cards).set('ai', function (card) {
                            if (att > 0) {
                                switch (get.name(card)) {
                                    case 'shan': return 1;
                                    default: return 0;
                                }
                            } else {
                                switch (get.name(card)) {
                                    case 'sha': return 1;
                                    default: return 0;
                                }
                            }
                        });
                    } else {
                        event.finish()
                    }
                    'step 3'
                    event.card2 = result.links[0];
                    'step 4'
                    if (target && target.isIn()) target.showCards(event.card1)
                    if (event.addedTarget.isIn()) event.addedTarget.showCards(event.card2)
                    "step 5"
                    if (target && event.addedTarget && target.isIn() && event.addedTarget.isIn()) {
                        if (get.name(event.card1) == 'sha' && get.name(event.card2) == 'sha') {
                            target.loseHp()
                            event.addedTarget.loseHp()
                        } else if (get.name(event.card1) == 'shan' && get.name(event.card2) == 'shan') {
                            target.chooseToDiscard('he', true)
                            event.addedTarget.chooseToDiscard('he', true)
                        } else if (get.name(event.card1) == 'sha' && get.name(event.card2) == 'shan') {
                            target.draw(2)
                            event.addedTarget.damage(target)
                        } else if (get.name(event.card1) == 'shan' && get.name(event.card2) == 'sha') {
                            event.addedTarget.draw(2)
                            target.damage(event.addedTarget)
                        }
                    }
                },
                ai: {
                    wuxie: function (target, card, player, viewer) {
                        if (player == game.me && get.attitude(viewer, player) > 0) {
                            return 0;
                        }
                    },
                    basic: {
                        order: 5,
                        useful: 1,
                        value: 5.5,
                    },
                    result: {
                        target: -1.5,
                        player: function (player) {
                            if (game.players.length < 3) return 1
                            return 1.5;
                        },
                    },
                },
                tag: {
                    gain: 1,
                    loseHp: 1,
                    damage: 1,
                },
                selectTarget: 1,
            },
            "fr_card_cmhc": {
                image: 'ext:福瑞拓展/image/card/fr_card_cmhc.png',
                fullskin: true,
                type: "delay",
                filterTarget: function (card, player, target) {
                    return (lib.filter.judge(card, player, target));
                },
                judge: function (card) {
                    if (get.color(card) == 'red') return 2;
                    return -1;
                },
                "judge2": function (result) {
                    return result.bool
                },
                effect: function () {
                    'step 0'
                    if (result.bool) {
                        event.cards = get.cards(5)
                        player.chooseCardButton([1, Infinity], event.cards, '获得点数为等差数列的牌').set('ai', function (button) {
                            return get.value(button.link, _status.event.player);
                        }).set('filterButton', function (button) {
                            if (ui.selected.buttons.length < 2) return true
                            var arr = ui.selected.buttons.map(i => get.number(i.link)).sort();
                            var d = arr[1] - arr[0];
                            var max = arr[arr.length - 1];
                            var min = arr[0];
                            return [min - d, max + d].contains(get.number(button));
                        });
                    } else {
                        return event.finish()
                    }
                    'step 1'
                    if (result.bool) {
                        var cards = result.links
                        player.gain(cards, 'draw')
                        event.cards.remove(cards)
                    }
                    'step 2'
                    while (event.cards.length) {
                        ui.cardPile.insertBefore(event.cards.pop(), ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length)])
                    }
                    "step 3"
                    game.updateRoundNumber()
                },
                ai: {
                    basic: {
                        order: 1,
                        useful: 1,
                        value: 8,
                    },
                    result: {
                        target: 1
                    },
                },
                selectTarget: 1,
                enable: true,
                content: function () {
                    if (lib.filter.judge(card, player, target) && cards.length && get.position(cards[0], true) == 'o') target.addJudge(card, cards);
                },
                allowMultiple: false,
            },
            "fr_card_lltj": {
                image: 'ext:福瑞拓展/image/card/fr_card_lltj.png',
                audio: true,
                fullskin: true,
                type: "trick",
                enable: true,
                selectTarget: -1,
                toself: true,
                filterTarget: function (card, player, target) {
                    return target == player;
                },
                modTarget: true,
                content: function () {
                    'step 0'
                    event.cards = get.cards(3);
                    target.chooseCardButton(1, '发掘：获得其中' + get.cnNumber(1) + '张牌', true, event.cards).set('ai', function (button) {
                        return get.useful(button.link);
                    });
                    'step 1'
                    var cards = result.links;
                    target.gain(cards, 'draw');
                    game.log(target, '发掘了', '#y' + get.translation(cards))
                    event.cards.remove(cards);
                    'step 2'
                    while (event.cards.length) {
                        ui.cardPile.insertBefore(event.cards.pop(), ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length)])
                    }
                    "step 3"
                    game.updateRoundNumber()
                },
                ai: {
                    basic: {
                        order: 7.2,
                        useful: 3.5,
                        value: 6.2,
                    },
                    result: {
                        target: 1
                    },
                },
            },
            "fr_card_xysx": {
                image: 'ext:福瑞拓展/image/card/fr_card_xysx.png',
                audio: true,
                fullskin: true,
                type: "trick",
                enable: true,
                recastable: true,
                toself: true,
                selectTarget: -1,
                modTarget: true,
                filterTarget: function (card, player, target) {
                    return target == player;
                },
                content: function () {
                    for (var i in target.getStat().skill) {
                        if (target.hasSkill(i)) {
                            delete target.getStat().skill[i]
                        }
                    }
                    target.getStat().card = {}
                },
                ai: {
                    basic: {
                        useful: 3,
                        value: 8,
                    },
                    order: 0.5,
                    result: {
                        target: function (player, target) {
                            var num1 = 0;
                            if (target.getStat().allSkills > 0) num1 += target.getStat().allSkills;
                            if (target.getStat().card.sha > 0) num1++;
                            return num1;
                        },
                    },
                },
            },
            "fr_card_yxys": {
                image: 'ext:福瑞拓展/image/card/fr_card_yxys.png',
                audio: true,
                type: "trick",
                enable: true,
                filterTarget: function (card, player, target) {
                    return !target.hasSkill('card_sx')
                },
                selectTarget: 1,
                content: function () {
                    target.addSkill('card_sx')
                },
                ai: {
                    tag: {
                        norepeat: 1,
                    },
                    basic: {
                        order: 6,
                        useful: [2, 1],
                        value: 3,
                    },
                    result: {
                        target: function (player, target, storage) {
                            if (target.hasSkill('card_sx')) return 0
                            if (target.countCards('j', { name: 'lebu' }) || target.countCards('j', { name: 'bingliang' })) {
                                return 0
                            } else if (target.countCards('hs') == 0) {
                                return 0
                            }
                            return 1
                        },
                    },
                },
                fullskin: true,
            },
            "fr_card_zh": {
                image: 'ext:福瑞拓展/image/card/fr_card_zh.png',
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
                    if (get.mode() != 'guozhan') {
                        event.list.remove('zhenfa')
                        event.list.remove('guozhan')
                    }
                    'step 1'
                    if (!_status.auto && target.isUnderControl()) {
                        game.swapPlayerAuto(target);
                    }
                    event.videoId = lib.status.videoId++;
                    var list = event.list.slice(0)
                    var choiceList = ui.create.dialog('【召唤】：请选择一个卡牌包', 'forcebutton');
                    choiceList.videoId = event.videoId;
                    for (var i = 0; i < list.length; i++) {
                        var str = '<div class="popup text" style="width:calc(100% - 10px);text-align: center;display:inline-block">' + get.translation(list[i] + '_card_config') + '&nbsp&nbsp&nbsp&nbsp>>></div>';
                        var next = choiceList.add(str);
                        next.firstChild.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
                        next.firstChild.link = list[i];
                        for (var j in lib.element.button) {
                            next[j] = lib.element.button[j];
                        }
                        choiceList.buttons.add(next.firstChild);
                    }
                    event.dialog = choiceList
                    var next = target.chooseButton();
                    next.set('dialog', event.dialog);
                    next.set('ai', function (button) {
                        return Math.random()
                    })
                    next.set('forced', true)
                    'step 2'
                    if (target.isOnline2()) {
                        target.send('closeDialog', event.dialog);
                    }
                    event.dialog.close();
                    var list = []
                    var choice = result.links[0];
                    for (var i = 0; i < lib.cardPack[choice].length; i++) {
                        if (lib.cardPack[choice][i] == 'fr_card_zh' || lib.cardPack[choice][i] == 'gw_tunshi') continue
                        var name = lib.cardPack[choice][i]
                        var type = get.type(name)
                        list.push([type, '', name])
                    }
                    event.list = list
                    game.log(target, '选择了', get.translation(choice + '_card_config'))
                    'step 3'
                    target.chooseButton(['选择所需的卡牌', [event.list, 'vcard']], true).set('ai', function (button) {
                        return Math.random();
                    })
                    'step 4'
                    var name = result.links[0][2];
                    event.nature = result.links[0][3];
                    event.cardname = name;
                    var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
                    target.chooseControl(list).set('ai', function () {
                        return list.randomGet();
                    }).set('prompt', '选择此牌的点数');
                    'step 5'
                    event.number = result.control;
                    var list = ['diamond', 'spade', 'heart', 'club']
                    target.chooseControl(list).set('ai', function () {
                        return list.randomGet();
                    }).set('prompt', '选择此牌的花色');
                    'step 6'
                    event.suit = result.control;
                    var fakecard = game.createCard(event.cardname, event.suit, event.number, event.nature);
                    target.showCards(fakecard)
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
            },
            "fr_card_ttbl": {
                image: 'ext:福瑞拓展/image/card/fr_card_ttbl.png',
                type: "trick",
                fullskin: true,
                enable: true,
                filterTarget: function (card, player, target) {
                    return target != player && target.countGainableCards(player, 'hej') > 0;
                },
                filter: function (event, player) {
                    return player.countCards('h') > 0
                },
                content: function () {
                    'step 0'
                    player.chooseCard('h', true, 1, '交给' + get.translation(target) + '一张手牌');
                    'step 1'
                    if (result.bool) {
                        player.give(result.cards, target)
                    }
                    'step 2'
                    if (target.isIn() && target.countCards('hej') > 0) {
                        player.gainPlayerCard(target, 'hej', true, [1, 2]);
                    }
                },
                ai: {
                    order: 5,
                    tag: {
                        loseCard: 1,
                        gain: 0.5,
                    },
                    wuxie: function (target, card, player, viewer) {
                        if (get.attitude(player, target) > 0 && get.attitude(viewer, player) > 0) {
                            return 0;
                        }
                    },
                    result: {
                        target: function (player, target) {
                            if (target.countCards('h') == 0) return 0
                            if (get.attitude(player, target) <= 0) return ((target.countCards('he', function (card) {
                                return get.value(card, target) > 0 && card != target.getEquip('jinhe');
                            }) > 0) ? -0.3 : 0.3) * Math.sqrt(player.countCards('h'));
                            return ((target.countCards('ej', function (card) {
                                if (get.position(card) == 'e') return get.value(card, target) <= 0;
                                var cardj = card.viewAs ? { name: card.viewAs } : card;
                                return get.effect(target, cardj, target, player) < 0;
                            }) > 0) ? 1.5 : -0.3) * Math.sqrt(player.countCards('h'));
                        },
                    },
                },
                selectTarget: 1,
            },
            "fr_card_gzbj": {
                image: 'ext:福瑞拓展/image/card/fr_card_gzbj.png',
                audio: true,
                fullskin: true,
                type: "trick",
                enable: true,
                multiline: true,
                selectTarget: -1,
                multitarget: true,
                filterTarget: true,
                content: function () {
                    "step 0"
                    var global = game.players.slice(0)
                    event.num = 0
                    for (var i = 0; i < global.length; i++) {
                        event.num += global[i].countCards('h')
                    }
                    event.num = Math.floor(event.num / global.length)
                    "step 1"
                    event.targets = targets.slice(0).sortBySeat()
                    "step 2"
                    event.target = event.targets.shift()
                    var num = event.num - event.target.countCards('h')
                    if (num < 0) {
                        event.target.chooseToDiscard('h', -num, true)
                    } else if (num > 0) {
                        event.target.draw(num)
                    }
                    'step 3'
                    if (event.targets.length) event.goto(2)
                },
                ai: {
                    wuxie: function () {
                        if (Math.random() < 0.5) return 0;
                    },
                    basic: {
                        order: 3,
                        useful: 0.5,
                    },
                    result: {
                        player: function (player, target) {
                            var benefit = 0
                            var humful = 0
                            var good = game.filterPlayer(function (current) {
                                return get.attitude(player, current) > 0
                            })
                            var bad = game.filterPlayer(function (current) {
                                return get.attitude(player, current) < 0
                            })
                            for (var i = 0; i < good.length; i++) {
                                benefit += good[i].countCards('h')
                            }
                            benefit = Math.floor(benefit / (Math.max(1, good.length)))
                            for (var j = 0; j < bad.length; j++) {
                                humful += bad[j].countCards('h')
                            }
                            humful = Math.floor(humful / (Math.max(1, bad.length)))
                            return (benefit - humful)
                        },
                        target: function (player, target) {
                            if (player.hasUnknown(2)) {
                                return 0;
                            }
                            var global = game.players.slice(0)
                            var num = 0
                            for (var i = 0; i < global.length; i++) {
                                num += global[i].countCards('h')
                            }
                            num = Math.floor(num / global.length)
                            return num - target.countCards('h')
                        },
                    },
                    tag: {
                        multitarget: 1,
                    },
                },
            },
            "fr_equip5_wxpp": {
                image: 'ext:福瑞拓展/image/card/fr_equip5_wxpp.png',
                fullskin: true,
                type: "equip",
                subtype: "equip5",
                skills: ['wxpp_skill'],
                ai: {
                    equipValue: 7,
                    basic: {
                        order: function (card, player) {
                            if (player && player.hasSkillTag('reverseEquip')) {
                                return 8.5 - get.equipValue(card, player) / 20;
                            }
                            else {
                                return 8 + get.equipValue(card, player) / 20;
                            }
                        },
                        useful: 3,
                        equipValue: 3,
                        value: function (card, player, index, method) {
                            if (player.isDisabled(get.subtype(card))) return 0.01;
                            var value = 0;
                            var info = get.info(card);
                            var current = player.getEquip(info.subtype);
                            if (current && card != current) {
                                value = get.value(current, player);
                            }
                            var equipValue = info.ai.equipValue;
                            if (equipValue == undefined) {
                                equipValue = info.ai.basic.equipValue;
                            }
                            if (typeof equipValue == 'function') {
                                if (method == 'raw') return equipValue(card, player);
                                if (method == 'raw2') return equipValue(card, player) - value;
                                return Math.max(0.1, equipValue(card, player) - value);
                            }
                            if (typeof equipValue != 'number') equipValue = 0;
                            if (method == 'raw') return equipValue;
                            if (method == 'raw2') return equipValue - value;
                            return Math.max(0.1, equipValue - value);
                        },
                    },
                    result: {
                        target: function (player, target, card) {
                            return get.equipResult(player, target, card.name);
                        },
                    },
                },
                enable: true,
                selectTarget: -1,
                filterTarget: function (card, player, target) {
                    return target == player;
                },
                modTarget: true,
                allowMultiple: false,
                content: function () {
                    if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
                },
                toself: true,
            },
            "fr_equip1_syzg": {
                image: 'ext:福瑞拓展/image/card/fr_equip1_syzg.png',
                fullskin: true,
                type: "equip",
                subtype: "equip1",
                distance: {
                    attackFrom: -2,
                },
                ai: {
                    basic: {
                        equipValue: 3,
                        order: function (card, player) {
                            if (player && player.hasSkillTag('reverseEquip')) {
                                return 8.5 - get.equipValue(card, player) / 20;
                            }
                            else {
                                return 8 + get.equipValue(card, player) / 20;
                            }
                        },
                        useful: 3,
                        value: function (card, player, index, method) {
                            if (player.isDisabled(get.subtype(card))) return 0.01;
                            var value = 0;
                            var info = get.info(card);
                            var current = player.getEquip(info.subtype);
                            if (current && card != current) {
                                value = get.value(current, player);
                            }
                            var equipValue = info.ai.equipValue;
                            if (equipValue == undefined) {
                                equipValue = info.ai.basic.equipValue;
                            }
                            if (typeof equipValue == 'function') {
                                if (method == 'raw') return equipValue(card, player);
                                if (method == 'raw2') return equipValue(card, player) - value;
                                return Math.max(0.1, equipValue(card, player) - value);
                            }
                            if (typeof equipValue != 'number') equipValue = 0;
                            if (method == 'raw') return equipValue;
                            if (method == 'raw2') return equipValue - value;
                            return Math.max(0.1, equipValue - value);
                        },
                    },
                    result: {
                        target: function (player, target, card) {
                            return get.equipResult(player, target, card.name);
                        },
                    },
                },
                skills: ["sy_skill"],
                enable: true,
                selectTarget: -1,
                filterTarget: function (card, player, target) {
                    return target == player;
                },
                modTarget: true,
                allowMultiple: false,
                content: function () {
                    if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
                },
                toself: true,
                fullimage: true,
            },
            "fr_card_lyzq": {
                image: 'ext:福瑞拓展/image/card/fr_card_lyzq.png',
                audio: true,
                fullskin: true,
                type: "trick",
                enable: true,
                selectTarget: -1,
                cardcolor: "black",
                toself: true,
                filterTarget: function (card, player, target) {
                    return target == player;
                },
                modTarget: true,
                content: function () {
                    "step 0"
                    event.skills = [];
                    for (var i in lib.character) {
                        for (var j = 0; j < lib.character[i][3].length; j++) {
                            if (target.hasSkill(lib.character[i][3][j])) continue;
                            var info = lib.skill[lib.character[i][3][j]];
                            if (info && !(info.fixed || info.yunlvSkill || info.qianghua || info.unique || info.zhuSkill || info.charlotte || info.hiddenSkill || info.juexingji || info.limited || info.dutySkill || info.unique)) {
                                event.skills.add(lib.character[i][3][j]);
                            }
                        }
                    }
                    'step 1'
                    var choice = event.skills.randomGets(5)
                    player.chooseControl(choice).set('ai', function () {
                        return choice.randomGet()
                    }).set('prompt', get.prompt2("fr_card_lyzq"))
                        .set('choiceList', choice.map(i => '【' + get.translation(i) + '】:' + get.translation(i + '_info')))
                    'step 2'
                    if (result.control != 'cancel2') {
                        player.addTempSkill(result.control, { player: 'phaseAfter' })
                        game.log(player, '获得了技能', '#g【' + get.translation(result.control) + '】')
                    }
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
                        skill: 1,
                    },
                },
            },
            "fr_card_zhcz": {
                image: 'ext:福瑞拓展/image/card/fr_card_zhcz.png',
                audio: true,
                type: "trick",
                enable: true,
                filterTarget: function (card, player, target) {
                    if (player.countCards('h', { name: "fr_card_zhcz" }) == player.countCards('h')) return target != player
                    if (target.countCards('h') == 0) return false
                    return true
                },
                filter: function (event, player) {
                    return game.hasPlayer(function (current) {
                        return current.countCards('h') > 0
                    })
                },
                selectTarget: 1,
                content: function () {
                    'step 0'
                    var num = Math.ceil(target.countCards('h') / 2)
                    target.chooseCard(num, 'h', '展示' + get.cnNumber(num) + '张手牌', true).set('ai', function (card) {
                        return Math.random()
                    })
                    'step 1'
                    target.showCards(result.cards)
                    var handcards = target.getCards('h')
                    for (var i = 0; i < handcards.length; i++) {
                        if (handcards.contains(result.cards[i])) {
                            handcards.remove(result.cards[i])
                        }
                    }
                    event.cards = [result.cards, handcards]
                    'step 2'
                    player.chooseControl('重铸展示的手牌', '重铸未展示的手牌').set('ai', function () {
                        var value1 = 0
                        var value2 = 0
                        for (var i = 0; i < event.cards[0].length; i++) {
                            value1 += get.value(event.cards[0][i])
                        }
                        for (var j = 0; j < event.cards[1].length; j++) {
                            value2 += get.value(event.cards[1][j])
                        }
                        var player = _status.event.player
                        var target = _status.event.target
                        if (get.attitude(player, target) > 0) {
                            if (value1 > value2) {
                                return '重铸未展示的手牌'
                            } else {
                                return '重铸展示的手牌'
                            }
                        } else {
                            if (value1 > value2) {
                                return '重铸展示的手牌'
                            } else {
                                return '重铸未展示的手牌'
                            }
                        }
                    }).set('target', target)
                    'step 3'
                    var cards = event.cards[result.index];
                    for (var i = 0; i < cards.length; i++) {
                        var card = cards[i]
                        target.lose(card, ui.discardPile, 'visible');
                        target.$throw(card, 1000);
                        game.log(target, '将', card, '置入弃牌堆');
                        target.draw();
                        game.delay()
                    }
                },
                ai: {
                    basic: {
                        order: 7.2,
                        useful: 4.5,
                        value: 9.2,
                    },
                    result: {
                        target: function (player, target, storage) {
                            return 1
                        },
                    },
                },
                fullskin: true,
            },
        },
        skill: {
            "mhlq_skill": {
                equipSkill: true,
                direct: true,
                trigger: {
                    player: "useCardToPlayered",
                },
                filter: function (event, player) {
                    return event.card && event.card.name == 'sha';
                },
                content: function () {
                    'step 0'
                    trigger.target.addTempSkill('pojia')
                    trigger.target.storage.pojia = {
                        hujia: 0,
                        cards: []
                    }
                    'step 1'
                    trigger.target.storage.pojia.hujia += trigger.target.hujia
                    if (trigger.target.storage.pojia.hujia >= 10 && player == game.me) {
                        game.frAchi.addProgress('叠甲是没有前途的', 'game')
                    }
                    trigger.target.storage.pojia.cards.push(trigger.card)
                    'step 2'
                    if (trigger.target.hujia != 0) trigger.target.changeHujia(-trigger.target.hujia)
                    'step 3'
                    trigger.target.markSkill('pojia');
                },
                ai: {
                    skillTagFilter: function (player, tag, arg) {
                        if (arg && arg.name == 'sha') return true;
                        return false;
                    },
                    result: {
                        target: function (target, player, card) {
                            return -target.hujia / 5
                        },
                        player: 1,
                    }
                },
            },
            'pojia': {
                firstDo: true,
                init: function (player, skill) {
                    if (!player.storage[skill]) player.storage[skill] = {
                        hujia: 0,
                        cards: []
                    };
                },
                onremove: true,
                trigger: {
                    player: ["damage", "damageCancelled", "damageZero"],
                    source: ["damage", "damageCancelled", "damageZero"],
                    target: ["shaMiss", "useCardToExcluded", "useCardToEnd", "eventNeutralized"],
                    global: ["useCardEnd"],
                },
                charlotte: true,
                filter: function (event, player) {
                    return player.storage.pojia.cards && event.card && player.storage.pojia.cards.contains(event.card) && (event.name != 'damage' || event.notLink());
                },
                silent: true,
                forced: true,
                popup: false,
                priority: 12,
                content: function () {
                    player.storage.pojia.cards.remove(trigger.card);
                    if (!player.storage.pojia.cards.length) {
                        if (player.storage.pojia.hujia != 0) {
                            player.changeHujia(player.storage.pojia.hujia)
                            player.storage.pojia.hujia = 0
                        }
                        player.removeSkill('pojia')
                    }
                },
                marktext: "✖",
                intro: {
                    content: "当前护甲已失效",
                },
            },
            'shyl_skill': {
                equipSkill: true,
                audio: 2,
                trigger: {
                    player: "shaMiss",
                },
                filter: function (event, player) {
                    return event.targets.length == 1
                },
                usable: 1,
                check: function (event, player) {
                    return get.attitude(player, event.target) < 0;
                },
                logTarget: "target",
                content: function () {
                    player.useCard({ name: 'sha' }, trigger.target)
                },
            },
            'wxpp_skill': {
                enable: "phaseUse",
                equipSkill: true,
                direct: true,
                mark: true,
                firstDo: true,
                marktext: "忘弦",
                intro: {
                    name: '忘弦琵琶',
                    markcount: function (storage, player) {
                        var vioce = ['宫', '商', '角', '徵', '羽']
                        return vioce[player.storage.wxpp_skill - 1]
                    },
                    mark: function (dialog, storage, player) {
                        if (!player.storage.wxpp_skill) return
                        var str = ['摸牌阶段，你多摸两张牌', '出牌阶段，你可以额外使用一张【杀】', '你跳过你的下个弃牌阶段 ', '结束阶段，你摸两张牌 ', '回合结束时，你令一名其他角色技能失效直到其回合结束。']
                        dialog.addText(str[player.storage.wxpp_skill - 1]);
                    },
                },
                music: {
                    '1155665': "一闪一闪亮晶晶～",
                    '11556654433221': "满天都是小星星～",
                    '114514': "你是一个一个一个......",
                    '3345': "欢～乐～女～神～",
                    '33455432': "圣～洁～美～丽～",
                    '334554321123': "灿～烂～光～芒～",
                    '334554321123322': "照～～～大～地～",
                },
                music_achieve: ['11556654433221', '334554321123322'],
                content: function () {
                    'step 0'
                    event.index = []
                    'step 1'
                    player.chooseControl('宫', '商', '角', '清角', '徵', '羽', '变宫', 'cancel2').set('ai', () => 'cancel2');
                    'step 2'
                    event.index.push(result.index + 1);
                    switch (result.control) {
                        case '宫': game.frPlayAudio('gong'); break;
                        case '商': game.frPlayAudio('shang'); break;
                        case '角': game.frPlayAudio('jue'); break;
                        case '清角': game.frPlayAudio('qingjue'); break;
                        case '徵': game.frPlayAudio('zhi'); break;
                        case '羽': game.frPlayAudio('yu'); break;
                        case '变宫': game.frPlayAudio('biangong'); break;
                        default: event.finish();
                    }
                    'step 3'
                    for (var i in lib.skill.wxpp_skill.music) {
                        if (event.index.join('').lastIndexOf(i) === Math.max(event.index.length - i.length, 0)) {
                            player.$fullscreenpop(lib.skill.wxpp_skill.music[i], 'soil', false, true);
                            if (lib.skill.wxpp_skill.music_achieve.contains(i) && !game.frAchi.hasAchi('你会弹琴吗？', 'special')) {
                                game.frAchi.addProgress('你会弹琴吗？', 'special')
                            }
                        }
                    }
                    event.goto(1);
                },
                group: "wxpp_skill_wxpp",
                subSkill: {
                    wxpp: {
                        trigger: {
                            player: "phaseBegin"
                        },
                        direct: true,
                        charlotte: true,
                        content: function () {
                            'step 0'
                            var vioce = ['宫声', '商声', '角声', '徵声', '羽声']
                            player.storage.wxpp_skill = Math.floor(5 * Math.random()) + 1
                            player.markSkill('wxpp_skill')
                            game.log(player, '获得了', '#g' + vioce[player.storage.wxpp_skill - 1], '的效果')
                            var num = player.storage.wxpp_skill
                            if (num == 1) {
                                game.frPlayAudio('gong')
                                player.addTempSkill('wxpp_skill_gong')
                            } else if (num == 2) {
                                game.frPlayAudio('shang')
                                player.addTempSkill('wxpp_skill_shang')
                            } else if (num == 3) {
                                game.frPlayAudio('jue')
                                player.addTempSkill('wxpp_skill_jue')
                            } else if (num == 4) {
                                game.frPlayAudio('zhi')
                                player.addTempSkill('wxpp_skill_zhi')
                            } else if (num == 5) {
                                game.frPlayAudio('yu')
                                player.addTempSkill('wxpp_skill_yu')
                            }
                        },
                    },
                    gong: {
                        trigger: {
                            player: "phaseDrawBegin2",
                        },
                        charlotte: true,
                        equipSkill: true,
                        direct: true,
                        filter: function (event, player) {
                            return !event.numFixed;
                        },
                        onremove: function (player) {
                            player.unmarkSkill('wxpp_skill')
                        },
                        content: function () {
                            trigger.num += 2;
                        },
                        ai: {
                            threaten: 1.3,
                        },
                    },
                    shang: {
                        charlotte: true,
                        equipSkill: true,
                        onremove: function (player) {
                            player.unmarkSkill('wxpp_skill')
                        },
                        mod: {
                            cardUsable: function (card, player, num) {
                                if (card.name == 'sha') return num + 1;
                            },
                        },
                    },
                    jue: {
                        charlotte: true,
                        equipSkill: true,
                        trigger: {
                            player: "phaseDiscardBefore",
                        },
                        onremove: function (player) {
                            player.unmarkSkill('wxpp_skill')
                        },
                        direct: true,
                        content: function () {
                            trigger.cancel();
                        },
                    },
                    zhi: {
                        charlotte: true,
                        equipSkill: true,
                        trigger: {
                            player: "phaseJieshuBegin",
                        },
                        onremove: function (player) {
                            player.unmarkSkill('wxpp_skill')
                        },
                        frequent: true,
                        content: function () {
                            player.draw(2);
                        },
                    },
                    yu: {
                        charlotte: true,
                        equipSkill: true,
                        trigger: {
                            player: "phaseEnd"
                        },
                        onremove: function (player) {
                            player.unmarkSkill('wxpp_skill')
                        },
                        direct: true,
                        content: function () {
                            'step 0'
                            player.chooseTarget(1, '是否令一名角色的技能失效直到其回合结束', function (card, player, target) {
                                return target != player && !target.hasSkill('baiban')
                            }).set('ai', function (target) {
                                var player = _status.event.player
                                return -get.attitude(player, target)
                            })
                            'step 1'
                            if (result.bool) {
                                result.targets[0].addTempSkill('baiban', { player: "phaseEnd" })
                            }
                        }
                    }
                }
            },
            "ar15_skill": {
                trigger: {
                    player: "useCardToPlayered",
                },
                filter: function (event, player) {
                    return event.card.name == 'sha' && player.countCards('h') > 0
                },
                equipSkill: true,
                direct: true,
                content: function () {
                    'step 0'
                    player.chooseToDiscard('h', get.prompt2('ar15_skill')).set('ai', function (card) {
                        var player = _status.event.player
                        var att = get.attitude(player, trigger.target)
                        if (att > 0) return -1
                        if (player.inRange(trigger.target) && !trigger.target.inRange(player)) {
                            return 9 - get.value(card)
                        } else {
                            return 5 - get.value(card)
                        }
                    })
                    'step 1'
                    if (result.bool) {
                        event.cards1 = result.cards[0]
                        event.suit = get.suit(result.cards[0])
                        if (player.inRange(trigger.target) && !trigger.target.inRange(player)) {
                            event.youji = true
                            player.discardPlayerCard(trigger.target, 'h', '观看并弃置' + get.translation(trigger.target) + '一张手牌', true, 'visible')
                                .set('ai', function (card) {
                                    if (get.suit(card) == event.card) return get.value(card) + 50
                                    else return get.value(card)
                                })
                        } else {
                            event.youji = false
                            player.discardPlayerCard(trigger.target, 'h', true, '弃置' + get.translation(trigger.target) + '一张手牌').set('ai', function (button) {
                                if (!_status.event.att) return 0;
                                if (get.position(button.link) == 'e') {
                                    if (get.subtype(button.link) == 'equip2') return 2 * get.value(button.link);
                                    return get.value(button.link);
                                }
                                return 1;
                            }).set('logSkill', ['ar15_skill', trigger.target])
                        }
                    } else {
                        event.finish()
                    }
                    'step 2'
                    if (result.bool && result.links && result.links.length) {
                        event.cards2 = result.cards[0]
                    }
                    var evt = trigger.getParent();
                    var cards = []
                    if (event.cards1) cards.push(event.cards1)
                    if (event.cards2) cards.push(event.cards2)
                    var suits = cards.map(i => get.suit(i)).unique()
                    var target = trigger.target;
                    target.addTempSkill('ar15_skill_block');
                    if (!target.storage.ar15_skill_block) target.storage.ar15_skill_block = [];
                    target.storage.ar15_skill_block.push([evt.card, suits]);
                    if (event.youji && event.suit == get.suit(event.cards2)) {
                        if (typeof evt.baseDamage != 'number') evt.baseDamage = 1;
                        evt.baseDamage++;
                    }
                },
                ai: {
                    threaten: 3.5,
                    "directHit_ai": true,
                    halfneg: true,
                },
                subSkill: {
                    block: {
                        mod: {
                            cardEnabled: function (card, player) {
                                if (!player.storage.ar15_skill_block) return;
                                var suit = get.suit(card);
                                if (suit == 'none') return;
                                var evt = _status.event;
                                if (evt.name != 'chooseToUse') evt = evt.getParent('chooseToUse');
                                if (!evt || !evt.respondTo || evt.respondTo[1].name != 'sha') return;
                                for (var i of player.storage.ar15_skill_block) {
                                    if (i[1].contains(suit)) return false;
                                }
                            },
                        },
                        trigger: {
                            player: ["damageBefore", "damageCancelled", "damageZero"],
                            target: ["shaMiss", "useCardToExcluded", "useCardToEnd"],
                            global: ["useCardEnd"],
                        },
                        silent: true,
                        popup: false,
                        forced: true,
                        firstDo: true,
                        charlotte: true,
                        onremove: true,
                        filter: function (event, player) {
                            if (!event.card || !player.storage.ar15_skill_block) return false;
                            for (var i of player.storage.ar15_skill_block) {
                                if (i[0] == event.card) return true;
                            }
                            return false;
                        },
                        content: function () {
                            var storage = player.storage.ar15_skill_block;
                            for (var i = 0; i < storage.length; i++) {
                                if (storage[i][0] == trigger.card) {
                                    storage.splice(i--, 1);
                                }
                            }
                            if (!storage.length) player.removeSkill('ar15_skill_block');
                        },
                        sub: true,
                    },
                }
            },
            "sy_skill": {
                equipSkill: true,
                trigger: {
                    global: "damageEnd",
                },
                filter: function (event, player) {
                    return event.source && (event.player == player || player.inRange(event.player)) && event.source != player && player.countCards('h') > 1 && event.nature != 'ice'
                },
                direct: true,
                content: function () {
                    "step 0"
                    player.chooseCard('h', 2, '是否发动【霜月之弓】?'
                    ).set('filterCard', function (card, player) {
                        return lib.filter.cardDiscardable(card, player);
                    }).set('ai', function (card) {
                        var source = _status.event.source
                        if (get.attitude(_status.event.player, source) > 0) return 0
                        if (source.hp == 1) return 9 - get.value(card)
                        return 7 - get.value(card)
                    }).set('source', trigger.source).set('prompt2', '弃置两张牌并对' + get.translation(trigger.source) + '造成1点冰属性伤害')
                    "step 1"
                    if (result.bool) {
                        player.discard(result.cards)
                        trigger.source.damage(1, player, 'ice')
                    }
                },
                ai: {
                    order: 5,
                    result: {
                        player: function (player, target) {
                            return get.damageEffect(trigger.source, player, player);
                        },
                    },
                },
            },
            "card_sx": {
                audio: "ext:福瑞拓展:2",
                trigger: {
                    player: "phaseEnd",
                },
                lastDo: true,
                charlotte: true,
                forced: true,
                content: function () {
                    player.removeSkill('card_sx')
                    if (player.getStat().kill > 0) {
                        player.draw(3)
                        player.insertPhase();
                    }
                },
            },
            'yy_skill': {
                trigger: {
                    target: "useCardToPlayer",
                },
                forced: true,
                filter: function (event, player) {
                    return event.player != player && event.card.name == 'sha';
                },
                content: function () {
                    trigger.player.addTempSkill('fengyin', 'shaAfter')
                }
            },
            'card_djlj': {
                trigger: {
                    player: ["useCardAfter", "phaseDrawBegin"],
                },
                mark: true,
                intro: {
                    content: '锁定技，①摸牌阶段额定摸牌数-1，②每回合限四次，你使用牌结算完毕后，若此牌造成了伤害，摸一张牌。'
                },
                marktext: '断粮',
                silent: true,
                charlotte: true,
                filter: function (event, player) {
                    if (event.name == 'phaseDraw') return true;
                    return player.getHistory('sourceDamage', function (evt) {
                        return evt.card == event.card;
                    }).length > 0;
                },
                usable: 4,
                content: function () {
                    if (trigger.name == 'phaseDraw') trigger.num--;
                    else player.draw();
                },
                forced: true,
                popup: false,
            },
            'g_fr_card_xzst': {
                trigger: {
                    global: ["damageEnd"]
                },
                forceDie: true,
                direct: true,
                charlotte: true,
                filter: function (event, player) {
                    if (!event.player.isAlive()) return false;
                    if (!lib.filter.targetEnabled({ name: 'fr_card_xzst' }, player, event.player)) return false;
                    if (event._notrigger.contains(event.player)) return false;
                    return player.hasUsableCard('fr_card_xzst');
                },
                content: function () {
                    'step 0'
                    var next = player.chooseToUse(get.prompt('fr_card_xzst', trigger.player).replace(/发动/, '使用'), function (card, player) {
                        if (card.name != 'fr_card_xzst') return false;
                        return lib.filter.cardEnabled(card, player, 'forceEnable');
                    }, trigger.player, -1)
                    next.targetRequired = true;
                },
            }
        },
        translate: {
            //技能
            'ar15_skill': 'AR15',
            'ar15_skill_info': '你使用【杀】指定目标后，可以依次弃置你与其各一张手牌，其不能使用这些牌包含花色的【闪】响应此【杀】，' + get.introduce('youji') + '：你弃置其牌时观看其手牌，若弃置后两张牌花色相同，此【杀】伤害+1。',
            'shyl_skill': "死魂幽镰",
            'shyl_skill_info': '每回合限一次，当你的【杀】被【闪】抵消时，若此【杀】目标数为1，你可以视为对此【杀】的目标使用一张【杀】。',
            'mhlq_skill': '鸣鸿龙雀',
            'mhlq_skill_info': '锁定技，当你使用【杀】指定一名目标角色后，你令其失去所有护甲直到此【杀】被抵消或造成伤害（时机同青釭剑）。',
            'card_djlj': '弹尽粮绝',
            'card_djlj_info': '锁定技，①摸牌阶段额定摸牌数-1，②每回合限四次，你使用牌结算完毕后，若此牌造成了伤害，摸一张牌。',
            "card_sx": "嗜血",
            "card_sx_info": "你的回合结束时，你移除此技能，然后若本回合内你杀死过其他角色，你摸三张牌并执行一个额外的回合。",
            'yy_skill': '影夜项链',
            'yy_skill_info': '锁定技。①其他角色指定你为【杀】的目标时，你令该角色非锁定技失效直到此【杀】结算完毕。②当你失去装备区内的【影夜项链】时，你摸两张牌。',
            "sy_skill": "霜月之弓",
            "sy_skill_info": "当你或你攻击范围内的角色受到一名其他角色造成的非冰属性伤害后，你可以弃置两张牌，然后对伤害来源造成1点冰属性伤害。",
            "wxpp_skill": "演奏",
            "wxpp_skill_info": "出牌阶段，你可以演奏忘弦琵琶。回合开始时，你随机获得" + get.introduce('wuyin') + "的效果之一直到回合结束。",

            //卡牌
            'fr_card_yfss': '严防死守',
            'fr_card_yfss_info': '出牌阶段，对你使用。若目标护甲数小于5，其弃置所有手牌并获得等量护甲。',
            'fr_equip1_ar15': 'AR15',
            'fr_equip1_ar15_info': '你使用【杀】指定目标后，可以依次弃置你与其各一张手牌，其不能使用这些牌包含花色的【闪】响应此【杀】，' + get.introduce('youji') + '：你弃置其牌时观看其手牌，若弃置后两张牌花色相同，此【杀】伤害+1。',
            'fr_card_xzst': '雪中送炭',
            'fr_card_xzst_info': '其他角色受到伤害后，或处于濒死状态时，你对其使用，你选择一项：1.弃置一张手牌（不足则不弃）并令该角色摸两张牌，2.令该角色回复1点体力，然后若该角色脱离了濒死状态，你受到1点无来源伤害并视为失去1点体力。',
            'fr_equip2_yyxl': '影夜项链',
            'fr_equip2_yyxl_info': '锁定技。①其他角色指定你为【杀】的目标时，你令该角色非锁定技失效直到此【杀】结算完毕。②当你失去装备区内的【影夜项链】时，你摸两张牌。',
            'fr_equip1_mhlq': '鸣鸿龙雀',
            'fr_equip1_mhlq_info': '锁定技，当你使用【杀】指定一名目标角色后，你令其失去所有护甲直到此【杀】被抵消或造成伤害（时机同青釭剑）。',
            'pojia': '破甲',
            'fr_card_chongci': '冲刺',
            'fr_card_zhuanyi': '转移',
            'fr_card_scfm': '水草丰茂',
            'fr_card_scfm_info': '出牌阶段，对所有角色使用，目标角色摸一张牌。',
            'fr_card_djlj': '弹尽粮绝',
            'fr_card_djlj_info': '出牌阶段，对所有未获得此牌效果的角色使用，目标角色获得以下效果直到其回合结束：①摸牌阶段额定摸牌数-1，②每回合限四次，使用牌结算完毕后，若此牌造成了伤害，摸一张牌。',
            "fr_card_zfxd": '针锋相对',
            'fr_card_zfxd_info': "此牌可被重铸。出牌阶段，对一名角色使用。令其与你指定的另一名在其攻击范围内的角色各声明一张【杀】或【闪】；若二者都声明【杀】，二者各流失一点体力；若二者都声明【闪】，二者各弃置一张牌；否则，声明【杀】的角色摸两张牌并对声明【闪】的角色造成一点伤害。",
            "fr_card_cmhc": "筹谋划策",
            "fr_card_cmhc_info": "出牌阶段，对一名角色使用，若判定结果为红色，该角色进行一次“" + get.introduce('chouhua') + "”。",
            "fr_equip5_wxpp": "忘弦琵琶",
            "fr_equip5_wxpp_info": "出牌阶段，你可以演奏忘弦琵琶。回合开始时，你随机获得" + get.introduce('wuyin') + "的效果之一直到回合结束。",
            "fr_card_lltj": "浪里淘金",
            "fr_card_lltj_info": "出牌阶段对自己使用，你" + get.introduce('found') + "一张牌。",
            "fr_card_xysx": "修养生息",
            "fr_card_xysx_info": "此牌可被重铸。出牌阶段对自己使用，重置当前回合卡牌和主动技能使用次数。",
            "fr_card_ttbl": "投桃报李",
            "fr_card_ttbl_info": "出牌阶段，对一名角色使用，你交给其一张手牌，然后你获得该角色区域内至多两张牌。",
            "fr_card_yxys": "野性药水",
            "fr_card_yxys_info": "出牌阶段对一名角色使用，该角色获得技能〖嗜血〗。<li>〖嗜血〗：你的回合结束时，你移除此技能，然后若本回合内你杀死过其他角色，你摸三张牌并执行一个额外的回合。</li>",
            "fr_card_gzbj": "寡众不均",
            "fr_card_gzbj_info": "出牌阶段对所有角色使用，所有目标将手牌数调整至X（X为场上所有玩家手牌数的平均值并向下取整）。",
            "fr_equip1_syzg": "霜月之弓",
            "fr_equip1_syzg_info": "当你或你攻击范围内的角色受到一名其他角色造成的非冰属性伤害后，你可以弃置两张牌，然后对伤害来源造成1点冰属性伤害。",
            'fr_equip1_shyl': "死魂幽镰",
            'fr_equip1_shyl_info': '每回合限一次，当你的【杀】被【闪】抵消时，若此【杀】目标数为1，你可以视为对此【杀】的目标使用一张【杀】。',
            "fr_card_lyzq": "凌月之球",
            "fr_card_lyzq_info": "出牌阶段，对你使用。你从随机的五个技能中获得一个直到回合结束（觉醒技，限定技，主公技，隐匿技，使命技等特殊技能除外）。",
            "fr_card_zh": "召唤",
            "fr_card_zh_info": "出牌阶段，对你使用，目标声明一张牌并获得之（部分特殊牌除外且此牌洗牌后销毁）。",
            "fr_card_zhcz": "制衡掣肘",
            "fr_card_zhcz_info": "出牌阶段，对一名角色使用，该角色展示X张手牌（X为其手牌数的一半并向下取整），然后你选择一项：1.重铸其展示的所有牌，2.重铸其未展示的所有牌。",
        },
        list: [
            ['heart', '6', 'fr_card_yfss'],
            ['heart', '12', 'fr_card_yfss'],
            ['heart', '1', 'fr_equip1_ar15'],
            ['spade', '13', 'fr_equip1_shyl'],
            ['heart', '5', 'fr_card_xzst'],
            ['heart', '7', 'fr_card_xzst'],
            ['diamond', '13', 'fr_card_xzst'],
            ['diamond', '1', 'fr_card_xzst'],
            ['spade', '5', 'fr_card_zfxd'],
            ['club', '11', 'fr_card_zfxd'],
            ['heart', '11', 'fr_card_cmhc'],
            ['club', '1', 'fr_card_cmhc'],
            ["heart", "6", "fr_card_yxys"],
            ["diamond", "7", "fr_card_yxys"],
            ["club", "8", "fr_card_yxys"],
            ["diamond", "10", "fr_card_lyzq"],
            ["heart", "11", "fr_card_lyzq"],
            ["heart", "9", "fr_card_gzbj"],
            ['heart', '3', "fr_card_zhcz"],
            ['spade', '11', "fr_card_zhcz"],
            ['heart', '6', "fr_card_zh"],
            ['diamond', '8', "fr_card_zh"],
            ['diamond', '11', "fr_card_ttbl"],
            ['heart', '13', "fr_card_ttbl"],
            ['club', '7', "fr_card_xysx"],
            ['club', '4', "fr_card_djlj"],
            ['club', '3', "fr_card_djlj"],
            ['heart', '1', "fr_card_scfm"],
            ['heart', '9', "fr_card_scfm"],
            ['spade', '12', "fr_card_xysx"],
            ['spade', '5', "fr_card_lltj", null, ['gifts']],
            ['heart', '5', "fr_card_lltj", null, ['gifts']],
            ['club', '5', "fr_card_lltj", null, ['gifts']],
            ['diamond', '5', "fr_card_lltj", null, ['gifts']],
            ['heart', '5', "sha", "mad"],
            ['club', '7', "sha", "mad"],
            ['spade', '11', "sha", "mad"],
            ['diamond', '4', "sha", "mad"],
            ['heart', '6', "sha", "mad"],
            ['spade', '9', "sha", "mad"],
        ],
    }
    if (lib.config.achiReward && lib.config.achiReward.card.length != 0) {
        for (var i = 0; i < lib.config.achiReward.card.length; i++) {
            var card = lib.config.achiReward.card[i]
            furryCard.list.push(card)
        }
    }
    return furryCard;
});
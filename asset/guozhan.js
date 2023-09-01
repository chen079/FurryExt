game.import('character', function (lib, game, ui, get, ai, _status) {
    var furryGZPack = {
        name: 'furryGZPack',//武将包命名（必填）
        connect: true,//该武将包是否可以联机（必填）
        character: {
            gz_fr_yifeng: ['male', 'wei', 3, ['kref_gzyz'], []],
            gz_fr_yifa: ['female', 'wei', 3, ['yifa_xs'], []],
            gz_fr_whitewolf: ['male', 'jin', 4, ['whitewolf_wl'], []],
            gz_fr_blackwolf: ['male', 'jin', 4, ['blackwolf_cy'], []],
            gz_fr_bofeng: ['male', 'jin', 4, ['bofeng_aj'], []],
            gz_fr_ciyu: ['male', 'jin', 3, ['ciyu_ss'], []],
            gz_fr_wore: ['male', 'ye', 3, ['wore_gzhy'], []],
            gz_fr_tiers: ['female', 'qun', 3, ['tiers_qp', 'tiers_kh'], []],
            gz_fr_miya: ['male', 'shu', 3, ['miya_gzks', 'miya_gzhz'], []],
            db_gz_fr_krikt: ['male', 'shu', 3, ['krikt_gzly'], []],
            gz_fr_molis: ['female', 'wei', 3, ['molis_gzhs'], []],
            gz_fr_taber: ['male', 'wu', 4, ['taber_sj'], []],
            gz_fr_verb: ['male', 'wu', 4, ['verb_fs'], []],
            gz_fr_mika: ['male', 'wei', 4, ['mika_lx'], []],
            gz_fr_slen: ['male', 'wei', 3, ['slen_xj'], []],
            gz_fr_fox: ['male', 'shu', 3, ['fox_hm'], []],
            gz_fr_patxi: ['female', 'wu', 3, ['patxi_fs'], []],
            gz_fr_alas: ['male', 'shu', 4, ['olas_fh'], []],
            gz_fr_west: ['male', 'qun', 3, ['west_pz', 'west_jh'], []],
            gz_fr_dmoa: ['male', 'qun', 3, ['dmoa_sx'], []],
            gz_fr_adward: ['male', 'wei', 4, ['adward_yt'], []],
            gz_fr_yas_klin: ['male', 'jin', 3, ['yas_klin_js'], []],
            gz_fr_muliy: ['male', 'wu', 3, ['mliy_hx'], []],
            gz_fr_zhongyu: ['male', 'shu', 3, ['zhongyu_ky'], []],
            gz_fr_hynea: ['male', 'ye', 3, ['hynea_cg', 'hynea_ds'], []],
            gz_fr_horn: ['male', 'wei', 3, ['horn_gzll', 'horn_ql', /* 'fr_qianghua' */], []],
            gz_fr_kert: ["male", "shu", 4, ["kert_lp", "kert_jl"], []],
            gz_fr_lint: ["male", "shu", 4, ["lint_nd"], []],
            gz_fr_liya: ["female", "wei", 3, ["liya_sz", "liya_sj"], []],
            gz_fr_yada: ["male", "wei", 3, ["yada_by", "yada_fs"], []],
            gz_fr_skry: ["male", "wu", 3, ["skery_gzds", "skery_yj"], []],
            gz_fr_sam: ["male", "qun", 3, ["sam_bz"], []],
            fr_fengkn: ["male", "qun", 4, ["muli_cm", "muli_yl"], []],
            gz_fr_sheep: ["female", "ye", 3, ["sheep_gzjf"], []],
            gz_fr_bladewolf: ["male", "qun", 4, ["bladewolf_rh",], []],
        },
        perfectPair: {
            gz_fr_taber: ['gz_fr_verb'],
            gz_fr_yifeng: ['gz_fr_yifa'],
            gz_fr_whitewolf: ['gz_fr_blackwolf'],
            gz_fr_bofeng: ['gz_fr_ciyu'],
            gz_fr_wore: ['gz_fr_tiers'],
            gz_fr_miya: ['db_gz_fr_krikt'],
            gz_fr_sheep: ['gz_fr_bladewolf']
        },
        skill: {
            'sheep_gzjf': {
                enable: 'phaseUse',
                usable: 1,
                integrate: function (a, b) {
                    let f = '';
                    var x1 = Math.floor(20 * Math.random() - 10);
                    var x2 = Math.floor(20 * Math.random() - 10);
                    var x3 = Math.floor(20 * Math.random() - 10);
                    f = ((x1 == 1 ? '' : x1) == -1 ? '-' : x1) + 'x² ' + (x2 < 0 ? "" : "+") + ((x2 == 1 ? '' : x2) == -1 ? '-' : x2) + 'x ' + (x3 < 0 ? "" : "+") + ((x3 == 1 ? '' : x3) == -1 ? '-' : x3)
                    const A = ((x1 / 3) * Math.pow(b, 3) + (x2 / 2) * Math.pow(b, 2) + (x3 * b)) - ((x1 / 3) * Math.pow(a, 3) + (x2 / 2) * Math.pow(a, 2) + (x3 * a));
                    const error1 = A + ((Math.floor(Math.random() * 11) - 5) / 10) * A + 1;
                    const error2 = A + ((Math.floor(Math.random() * 21) - 10) / 100) * A + 2;
                    const error3 = A + ((Math.floor(Math.random() * 51) - 25) / 100) * A + 3;
                    return {
                        f: f,
                        results: [A, error1, error2, error3],
                    };
                },
                content: function () {
                    'step 0'
                    event.cards = get.cards(2)
                    player.showCards(event.cards);
                    player.discard(event.cards)
                    'step 1'
                    if (event.isMine()) {
                        var num1 = get.number(event.cards[0]), num2 = get.number(event.cards[1])
                        var cardnum = [num1, num2].sort((a, b) => {
                            return a - b;
                        });
                        event.result = lib.skill.sheep_gzjf.integrate(cardnum[0], cardnum[1])
                        event.choices = event.result.results.slice().sort(() => Math.random() - 0.5)
                        player.chooseControl()
                            .set('choiceList', event.choices).set('ai', function () {
                                return event.result.results[0]
                            }).set('prompt', '函数' + event.result.f + '在' + '[' + cardnum[0] + ',' + cardnum[1] + ']' + '上的积分结果为')
                    } else {
                        game.log(player, '计算正确')
                        event.cards = get.cards(3)
                        player.showCards(event.cards);
                        player.gain(event.cards, 'gain2');
                        player.chooseControl().set('choiceList', [
                            '将三张牌交给一名其他角色',
                            '弃置三张牌',
                        ]).set('ai', function () {
                            if (game.hasPlayer(function (current) {
                                return current != player && get.attitude(player, current) > 2;
                            })) return 0;
                            return 1;
                        });
                        event.goto(3)
                    }
                    'step 2'
                    if (event.choices[result.index] === event.result.results[0]) {
                        game.log(player, '计算正确')
                        event.cards = get.cards(3)
                        player.showCards(event.cards);
                        player.gain(event.cards, 'gain2');
                        player.chooseControl().set('choiceList', [
                            '将三张牌交给一名其他角色',
                            '弃置三张牌',
                        ]).set('ai', function () {
                            if (game.hasPlayer(function (current) {
                                return current != player && get.attitude(player, current) > 2;
                            })) return 0;
                            return 1;
                        });
                    } else {
                        game.log(player, '计算错误')
                        event.finish()
                    }
                    'step 3'
                    if (result.index == 0) {
                        player.chooseCardTarget({
                            position: 'he',
                            filterCard: true,
                            selectCard: 3,
                            filterTarget: function (card, player, target) {
                                return player != target;
                            },
                            ai1: function (card) {
                                return 1;
                            },
                            ai2: function (target) {
                                var att = get.attitude(_status.event.player, target);
                                return att;
                            },
                            prompt: '请选择要送人的卡牌',
                            forced: true,
                        });
                    }
                    else {
                        player.chooseToDiscard(3, true, 'he');
                        event.finish();
                    }
                    'step 4'
                    if (result.bool) {
                        var target = result.targets[0];
                        player.give(result.cards, target);
                    }
                },
                ai: {
                    order: 7.5,
                    result: {
                        player: 1,
                    },
                },
            },
            "skery_gzds": {
                trigger: {
                    source: "damageAfter",
                },
                filter: function (event, player) {
                    return event.card;
                },
                forced: true,
                content: function () {
                    var target = trigger.player;
                    target.addTempSkill('skery_ds_1', { player: 'phaseAfter' });
                    target.addTempSkill('skery_ds_2', { player: 'phaseAfter' })
                    target.addMark('skery_ds_1', trigger.num, false);
                },
                subSkill: {
                    "1": {
                        forced: true,
                        popup: false,
                        trigger: {
                            player: "phaseEnd",
                        },
                        onremove: true,
                        content: function () {
                            player.loseHp(player.countMark('skery_ds_1'));
                            game.log(player, '〖毒杀〗造成的体力失去为' + player.countMark('skery_ds_1'));
                            player.removeSkill('skery_ds_1');
                        },
                        marktext: "毒",
                        intro: {
                            content: "回合结束时，〖毒杀〗造成的体力失去为#",
                        },
                        sub: true,
                    },
                    "2": {
                        forced: true,
                        popup: false,
                        trigger: {
                            player: "useCard",
                        },
                        filter: function (event, player) {
                            return (event.card.name == 'tao' || event.card.name == 'jiu') && event.player.isPhaseUsing();
                        },
                        content: function () {
                            if (player.countMark('skery_ds_1') != 0) player.removeSkill('skery_ds_1')
                        },
                        sub: true,
                    },
                },
            },
            "krikt_gzly": {
                trigger: {
                    player: "useCardToTargeted",
                },
                filter: function (event, player) {
                    return event.card.name == 'sha' && player.canCompare(event.target)
                },
                check: function (event, player) {
                    return get.attitude(player, event.target) < 0;
                },
                content: function () {
                    "step 0"
                    player.chooseToCompare(trigger.target);
                    "step 1"
                    if (result.bool) {
                        trigger.target.chooseCard('交给' + get.translation(player) + '一张牌', 'he', true).set('ai', function (card) {
                            return 100 - get.value(card);
                        });
                        var card = get.color(result.player, player)
                        if (card == 'red') {
                            trigger.getParent().directHit.add(trigger.target)
                        } else if (card == 'black') {
                            var id = trigger.target.playerid;
                            var map = trigger.customArgs;
                            if (!map[id]) map[id] = {};
                            if (!map[id].extraDamage) map[id].extraDamage = 0;
                            map[id].extraDamage++;
                        }
                    } else {
                        event.finish()
                    }
                    "step 2"
                    if (result.cards) player.gain(result.cards, trigger.target, 'giveAuto');
                },
                ai: {
                    "directHit_ai": true,
                    skillTagFilter: function (player, tag, arg) {
                        if (player._krikt_gzly_temp) return false;
                        player._krikt_gzly_temp = true;
                        var bool = function () {
                            if (arg.card.name != 'sha' || get.attitude(player, arg.target) >= 0 || !arg.target.countCards('h')) return false;
                            if (arg.target.countCards('h') == 1 && (!arg.target.getEquip('bagua') || player.hasSkillTag('unequip', false, {
                                name: arg.card ? arg.card.name : null,
                                target: arg.target,
                                card: arg.card
                            }) || player.hasSkillTag('unequip_ai', false, {
                                name: arg.card ? arg.card.name : null,
                                target: arg.target,
                                card: arg.card
                            }))) return true;
                            return player.countCards('h', function (card) {
                                return card != arg.card && (!arg.card.cards || !arg.card.cards.contains(card)) && get.value(card) <= 4 && (get.number(card) >= (11 + arg.target.countCards('h') / 2) || get.suit(card, player) == 'heart');
                            }) > 0;
                        }();
                        delete player._krikt_gzly_temp;
                        return bool;
                    },
                    effect: {
                        target: function (card, player, target, current) {
                            if (card.name == 'sha' && current < 0) return 0.7;
                        },
                    },
                },
            },
            "miya_gzks": {
                trigger: {
                    source: "damageEnd",
                },
                forced: true,
                filter: function (event, player) {
                    return event.card && event.card.name == 'sha' && _status.currentPhase == player;
                },
                content: function () {
                    player.getStat().card.sha--;
                },
            },
            "miya_gzhz": {
                trigger: {
                    source: "damageBegin",
                },
                filter: function (event, player) {
                    return event.card && event.card.name == 'sha';
                },
                init: function (player) {
                    if (!player.storage.miya_gzhz) player.storage.miya_gzhz = 0
                },
                intro: {
                    content: function (storage, player, skill) { return '当前有' + storage + '个标记' },
                },
                mark: true,
                direct: true,
                content: function () {
                    player.draw();
                    trigger.num += player.storage.miya_gzhz
                    player.storage.miya_gzhz += 1
                    player.markSkill('miya_gzhz')
                },
                group: "miya_gzhz_one",
                subSkill: {
                    one: {
                        forced: true,
                        popup: false,
                        silent: true,
                        trigger: {
                            global: "phaseEnd",
                        },
                        content: function () {
                            player.storage.miya_gzhz = 0
                            player.updateMark('miya_gzhz')
                        },
                        sub: true,
                    },
                },
            },
            "kref_gzyz": {
                audio: "ext:福瑞拓展:2",
                preHidden: true,
                trigger: {
                    global: "damageEnd",
                },
                checkx: function (event, player) {
                    var att1 = get.attitude(player, event.player);
                    var att2 = get.attitude(player, event.source);
                    return att1 > 0 && att2 <= 0;
                },
                filter: function (event, player) {
                    return (event.source && event.player.classList.contains('dead') == false && player.countCards('he'));
                },
                direct: true,
                content: function () {
                    "step 0"
                    var next = player.chooseToDiscard('he', get.prompt2('kref_gzyz', trigger.player));
                    var check = lib.skill.kref_yz.checkx(trigger, player);
                    next.set('ai', function (card) {
                        if (_status.event.goon) return 8 - get.value(card);
                        return 0;
                    });
                    next.set('logSkill', 'kref_gzyz');
                    next.set('goon', check);
                    next.setHiddenSkill('kref_gzyz');
                    "step 1"
                    if (result.bool) {
                        trigger.player.judge();
                    }
                    else {
                        event.finish();
                    }
                    "step 2"
                    switch (result.color) {
                        case 'black': {
                            trigger.player.gain(trigger.cards, 'gain2');
                            trigger.player.gainPlayerCard(trigger.num, true, trigger.source, 'he');
                            trigger.player.draw(trigger.num);
                            break;
                        }
                        case 'red': {
                            trigger.player.recover();
                            trigger.player.link(false);
                            trigger.player.turnOver(false);
                            trigger.source.turnOver();
                            break;
                        }
                    }
                },
                ai: {
                    maixie: true,
                    "maixie_hp": true,
                    effect: {
                        target: function (card, player, target) {
                            if (player.hasSkillTag('jueqing', false, target)) return [1, -1];
                            if (get.tag(card, 'damage')) return [1, 0.55];
                        },
                    },
                },
            },
            "molis_gzhs": {
                trigger: {
                    player: "dying",
                },
                mark: false,
                skillAnimation: true,
                animationColor: "metal",
                getinfo: function (player) {
                    var js = player.getCards("j");
                    var js2 = [];
                    for (var k = 0; k < js.length; k++) {
                        var name = js[k].viewAs || js[k].name;
                        js2.push(name);
                    }
                    var isDisabled = [];
                    for (var j = 1; j < 7; j++) {
                        isDisabled.push(player.isDisabled(j));
                    }
                    var storage = {
                        player: player,
                        hs: player.getCards("h"),
                        es: player.getCards("e"),
                        isDisabled: isDisabled,
                        hp: player.hp,
                        maxHp: player.maxHp,
                        _disableJudge: player.storage._disableJudge,
                        isTurnedOver: player.isTurnedOver(),
                        isLinked: player.isLinked(),
                        js: js,
                        js2: js2,
                    };
                    return storage;
                },
                unique: true,
                limited: true,
                notemp: true,
                content: function () {
                    'step 0'
                    player.awakenSkill('molis_gzhs')
                    event.doing = player.storage.molis_gzhs
                    if (player.isDead()) player.revive(1);
                    'step 1'
                    player.hp = event.doing.hp
                    var hs = player.getCards('he');
                    if (hs.length) player.lose(hs)._triggered = null;
                    'step 2'
                    var hs = event.doing.hs
                    if (hs.length) player.directgain(hs);
                    'step 3'
                    var isDisabled = event.doing.isDisabled;
                    for (var i = 0; i < isDisabled.length; i++) {
                        if (isDisabled[i] == false && player.isDisabled(i + 1)) player.enableEquip(i + 1)._triggered = null;
                        if (isDisabled[i] == true && !player.isDisabled(i + 1)) player.disableEquip(i + 1)._triggered = null;
                    }
                    'step 4'
                    var es = event.doing.es;
                    if (es.length) player.directequip(es);
                    'step 5'
                    player.update();
                    'step 6'
                    game.animate.window(1);
                    var data = {};
                    for (var i = 0; i < game.players.length; i++) {
                        data[game.players[i].dataset.position] = {
                            h: get.cardsInfo(game.players[i].getCards('h')),
                            e: get.cardsInfo(game.players[i].getCards('e')),
                            j: get.cardsInfo(game.players[i].getCards('j'))
                        }
                    }
                    game.addVideo('skill', player, ['molis_gzhs', data]);
                    game.animate.window(2);
                    ui.updatehl();
                    "step 7"
                    game.updateRoundNumber();
                    player.mayChangeVice();
                },
                group: "molis_gzhs_recode",
                subSkill: {
                    recode: {
                        trigger: {
                            global: "phaseBegin"
                        },
                        unique: true,
                        popup: false,
                        preHidden: true,
                        silent: true,
                        forced: true,
                        charlotte: true,
                        fixed: true,
                        content: function () {
                            'step 0'
                            player.storage.molis_gzhs = lib.skill.molis_gzhs.getinfo(player)
                        }
                    }
                }
            },
            "wore_gzhy": {
                trigger: {
                    global: "roundStart",
                    player: "enterGame",
                },
                preHidden: true,
                mark: true,
                init: function (player) {
                    if (!player.storage.wore_gzhy) player.storage.wore_gzhy = []
                },
                forced: true,
                content: function () {
                    'step 0'
                    if (player.storage.wore_gzhy != []) {
                        for (var i = 0; i < player.storage.wore_gzhy.length; i++) {
                            player.removeSkill(player.storage.wore_gzhy[i])
                            player.storage.wore_gzhy.remove(player.storage.wore_gzhy[i])
                        }
                    }
                    var list = [];
                    if (get.mode() == 'guozhan') {
                        for (var i in lib.characterPack.mode_guozhan) {
                            if (game.hasPlayer(function (current) {
                                return current.name == i
                            })) {
                                continue
                            } else {
                                if (!lib.filter.characterDisabled(i) && !lib.filter.characterDisabled2(i)) {
                                    list.push(i);
                                }
                            }
                        }
                    } else {
                        for (var i in lib.character) {
                            if (!lib.filter.characterDisabled(i) && !lib.filter.characterDisabled2(i)) {
                                list.push(i);
                            }
                        }
                    }
                    list.remove('fr_wore');
                    list = list.randomGets(4)
                    var dialog = ui.create.dialog('请选择武将', 'hidden');
                    dialog.add([list.randomGets(list.length), 'character']);
                    player.chooseButton(dialog, true).ai = function (button) {
                        return get.rank(button.link, true);
                    };
                    'step 1'
                    var skills = lib.character[result.links[0]][3].slice(0);
                    for (var i = 0; i < skills.length; i++) {
                        player.addSkill(skills[i])
                    }
                    player.storage.wore_gzhy = skills
                }
            },
            'horn_gzll': {
                qianghua: true,
                usable: 1,
                enable: "phaseUse",
                filterTarget: function (card, player, target) {
                    return target != player
                },
                check: function (player, target) {
                    return get.attitude(player, target) < 0
                },
                intro: {
                    content: '你的回合结束时，若你于回合内未回复过体力，你翻面。'
                },
                content: function () {
                    'step 0'
                    target.loseHp()
                    player.recover()
                    'step 1'
                    if (player.storage.fr_qianghua) {
                        if (player.isHealthy()) {
                            player.draw(2)
                        } else {
                            target.turnOver()
                            target.draw(target.getDamagedHp())
                        }
                    }
                    if (player.storage.fr_qianghua) player.storage.fr_qianghua = false
                },
                ai: {
                    order: 9,
                    result: {
                        target: function (target, player, card) {
                            return get.effect(target, { name: 'losehp' }, player, player) - 5
                        },
                        player: function (player, target, card) {
                            return get.recoverEffect(player, player, player)
                        }
                    },
                    threaten: 2,
                    expose: 0.2,
                },
            },
        },
        translate: {
            //技能
            'sheep_gzjf': '机算',
            'sheep_gzjf_info': '出牌阶段限一次，你可以展示牌堆顶两张牌并弃置之，然后计算一个随机幂函数（最高二次幂）的积分（积分上限为其中较大的牌，下限为其中较小的牌），若你计算正确：你获得牌堆顶的三张牌，然后，你选择一项：1.交给一名其他角色三张牌；2.弃置三张牌。',
            "skery_gzds": "毒杀",
            "skery_gzds_info": "锁定技，当你造成伤害后，受到伤害的角色获得X点“毒”标记（X为此次伤害值）；若该角色在出牌阶段没有使用过【桃】或【酒】，则其于回合结束时失去Y点体力（Y为该角色“毒”标记的总数），并移除其所有“毒”标记。",
            'horn_gzll': "灵链",
            'horn_gzll_info': get.introduce('qianghua') + '，出牌阶段限一次，①你可以令一名其他角色失去1点体力，然后你回复1点体力。②强化：你可以令一名其他角色失去1点体力，然后你回复1点体力，然后若你未受伤，你摸两张牌，否则，该角色叠置并摸X张牌（X为该角色的已损体力值）。',
            "molis_gzhs": "回溯",
            "molis_gzhs_info": "限定技，当你进入濒死状态时，你可以弃置你区域内的所有牌并将你的体力上限、体力值、装备区、手牌区复原到本回合开始时的状态，然后你终止本回合并执行一个额外的回合，且你可以变更副将。",
            "krikt_gzly": "两仪",
            "krikt_gzly_info": "当你使用【杀】指定目标后，你可以与该角色拼点，若你赢：目标角色须交给你一张牌，然后若你的拼点牌为红色，此【杀】不可闪避，若你的拼点牌为黑色，此【杀】伤害+1。",
            "miya_gzks": "狂嗜",
            "miya_gzks_info": "锁定技，当你的【杀】造成伤害后，本回合出【杀】次数+1。",
            "miya_gzhz": "挥斩",
            "miya_gzhz_info": "当你的【杀】造成伤害后，你摸一张牌并获得1个“挥斩”标记，然后本回合内下一次因执行【杀】的效果造成的伤害+X（X为“挥斩”标记数量）。",
            "kref_gzyz": "月临",
            "kref_gzyz_info": "一名角色受到伤害后，你可以弃置一张牌并进行一次判定。若结果为黑色，该角色依次执行以下效果，①获得伤害来源的X张牌，②获得造成伤害的牌，③摸X张牌（X为此次伤害值）；若结果为红色，该角色依次执行以下效果，①回复一点体力，②复原武将牌，③伤害来源翻面。",
            "wore_gzhy": "万变",
            "wore_gzhy_info": "每轮游戏开始时，你从四名随机角色中选择一名角色并获得其所有技能，然后失去你获得的上一名角色的所有技能。",

            //武将
            'gz_fr_yifeng': "弈风",
            'gz_fr_yifa': "弈法",
            'gz_fr_whitewolf': "“白狼”",
            'gz_fr_blackwolf': "“黑狼”",
            'gz_fr_bofeng': "迟风",
            'gz_fr_ciyu': "迟雨",
            'gz_fr_wore': "沃尔",
            'gz_fr_tiers': "缇尔斯",
            'gz_fr_miya': "米亚",
            'db_gz_fr_krikt': "科里科特",
            'gz_fr_molis': "莫利斯",
            'gz_fr_taber': "塔贝尔",
            'gz_fr_verb': "韦贝尔",
            'gz_fr_mika': "米卡",
            'gz_fr_slen': "萨冷",
            'gz_fr_fox': "狐克斯",
            'gz_fr_patxi': "帕茨希",
            'gz_fr_alas': "奥拉斯",
            'gz_fr_west': "洛",
            'gz_fr_dmoa': "多默尔",
            'gz_fr_adward': "安德华",
            'gz_fr_yas_klin': "亚瑟&克林",
            'gz_fr_muliy': "穆里耶",
            'gz_fr_zhongyu': "忠与",
            'gz_fr_hynea': "哈尼亚",
            'gz_fr_horn': "霍恩",
            'gz_fr_kert': "柯尔特",
            'gz_fr_lint': "林特",
            'gz_fr_liya': "莉亚",
            'gz_fr_yada': "亚达",
            'gz_fr_skry': "斯克瑞",
            'gz_fr_sam': "山",
            'fr_fengkn': "冯·莱卡恩",
            'gz_fr_sheep': "西普",
            'gz_fr_bladewolf': "刃狼",
        }
    }
    for (var i in furryGZPack.character) {
        let str
        let index = i.indexOf("fr_")
        if (index !== -1) {
            str = i.slice(index);
        } else {
            str = i
        }
        if (lib.config.frLutou) furryGZPack.character[i][4].push('ext:福瑞拓展/image/skin/origin-lutou/' + str + '.png')
        else furryGZPack.character[i][4].push('ext:福瑞拓展/image/skin/origin-standard/' + str + '.jpg')
    }
    if(lib.config.mode=='guozhan'){
        return furryGZPack;
    }else{
        return {}
    }
})
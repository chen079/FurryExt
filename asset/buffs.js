window.furry.frImport(function (lib, game, ui, get, ai, _status) {
    //感谢时空枢纽拓展提供的代码参考
    //---------------------------------------定义Buff-----------------------------------------//
    //现在定义新的Buff时，在lib.FrBuff中请不要加前缀Fr_Buff_
    lib.FrBuff = {
        //言灵
        'yanling': {
            intro: {
                name: "言灵",
                content: "<li>一名角色的判定牌生效前，你可以打出一张牌代替之。<li>然后你移除1层「<font color=green>言灵</font>」",
            },
            forced: true,
            silent: true,
            charlotte: true,
            trigger: {
                global: "judge",
            },
            filter: function (event, player) {
                return player.countCards(get.mode() == 'guozhan' ? 'hes' : 'hs') > 0 && player.hasFrBuff('yanling');
            },
            priority: 3,
            content: function () {
                "step 0"
                player.chooseCard(get.translation(trigger.player) + '的' + (trigger.judgestr || '') + '判定为' +
                    get.translation(trigger.player.judging[0]) + '，' + get.prompt('Fr_Buff_yanling'), get.mode() == 'guozhan' ? 'hes' : 'hs', function (card) {
                        var player = _status.event.player;
                        var mod2 = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
                        if (mod2 != 'unchanged') return mod2;
                        var mod = game.checkMod(card, player, 'unchanged', 'cardRespondable', player);
                        if (mod != 'unchanged') return mod;
                        return true;
                    }).set('ai', function (card) {
                        var trigger = _status.event.getTrigger();
                        var player = _status.event.player;
                        var judging = _status.event.judging;
                        var result = trigger.judge(card) - trigger.judge(judging);
                        var attitude = get.attitude(player, trigger.player);
                        if (attitude == 0 || result == 0) return 0;
                        if (attitude > 0) {
                            return result - get.value(card) / 2;
                        }
                        else {
                            return -result - get.value(card) / 2;
                        }
                    }).set('judging', trigger.player.judging[0]);
                "step 1"
                if (result.bool) {
                    player.respond(result.cards, 'Fr_Buff_yanling', 'highlight', 'noOrdering');
                }
                else {
                    event.finish();
                }
                "step 2"
                if (result.bool) {
                    if (trigger.player.judging[0].clone) {
                        trigger.player.judging[0].clone.classList.remove('thrownhighlight');
                        game.broadcast(function (card) {
                            if (card.clone) {
                                card.clone.classList.remove('thrownhighlight');
                            }
                        }, trigger.player.judging[0]);
                        game.addVideo('deletenode', player, get.cardsInfo([trigger.player.judging[0].clone]));
                    }
                    game.cardsDiscard(trigger.player.judging[0]);
                    trigger.player.judging[0] = result.cards[0];
                    trigger.orderingCards.addArray(result.cards);
                    game.log(trigger.player, '的判定牌改为', result.cards[0]);
                    player.reduceFrBuff('yanling')
                    game.delay(2);
                }
            },
            ai: {
                rejudge: true,
                tag: {
                    rejudge: 1,
                },
            },
            FrBuffInfo: {
                naturalLose: true,
                buffRank: {
                    basic: [1, 0],
                    add: [0.5, 0],
                    random: [1, 0]
                },
                type: 'buff',
            },
        },
        //潮湿
        'chaoshi': {
            intro: {
                name: "潮湿",
                content: "<li>当你受到雷属性伤害时，此伤害+1；<li>当你受到火属性伤害时，此伤害-1；<li>然后你移除1层「<font color=blue>潮湿</font>」。",
            },
            forced: true,
            silent: true,
            charlotte: true,
            priority: 3,
            filter: function (event, player) {
                return event.hasNature('fire') || event.hasNature('thunder')
            },
            trigger: {
                player: "damageBegin3",
            },
            content: function () {
                if (trigger.hasNature('fire')) {
                    trigger.num--
                    game.log(player, '受到「<font color=blue>潮湿</font>」影响，此次火属性伤害-1')
                }
                if (trigger.hasNature('thunder')) {
                    trigger.num++
                    game.log(player, '受到「<font color=blue>潮湿</font>」影响，此次雷属性伤害+1')
                }
                player.reduceFrBuff('chaoshi')
            },
            ai: {
                nofire: true,
                effect: {
                    target: function (card, player, target, current) {
                        if (get.tag(card, 'fireDamage')) return 'zerotarget';
                    },
                },
            },
            FrBuffInfo: {
                naturalLose: true,
                buffRank: {
                    basic: [0, 1],
                    add: [0, 1.5]
                },
                type: 'none',
            },
        },
        //荆棘
        'jingji': {
            intro: {
                name: "荆棘",
                content: "<li>当你于一回合内使用第4-X张牌结算完毕后，你失去1点体力并移除1层「<font color=green>荆棘</font>」。",
            },
            forced: true,
            silent: true,
            charlotte: true,
            priority: 3,
            trigger: {
                player: "useCardAfter",
            },
            filter: function (event, player) {
                return player.hasFrBuff('jingji') && player.countUsed() == 4 - player.countFrBuffNum('jingji')
            },
            content: function () {
                player.loseHp()
                player.reduceFrBuff('jingji')
            },
            ai: {
                presha: true,
                pretao: true,
                nokeep: true,
            },
            mod: {
                aiOrder: function (player, card, num) {
                    if (typeof card == 'object' && 4 - player.countFrBuffNum('jingji') >= player.countUsed() + 1) return num - 10;
                },
            },
            FrBuffInfo: {
                naturalLose: true,
                buffRank: {
                    basic: [0, 1],
                    add: [0, 1.5]
                },
                type: 'debuff',
                limit: 3,
            },
        },
        //劣势
        "lieshi": {
            intro: {
                name: "劣势",
                content: "<li>当你使用牌时，若你有牌，交给一名其他目标角色一张牌，然后你移除1层「<font color=red>劣势</font>」。",
            },
            trigger: {
                player: "useCard1"
            },
            forced: true,
            charlotte: true,
            silent: true,
            priority: 3,
            filter: (event, player) => player.countCards('he') > 0 && game.hasPlayer(target => target != player && event.targets.contains(target)),
            content: function () {
                'step 0'
                player.chooseCardTarget({
                    position: 'he',
                    prompt: '交给不为你的一名目标角色一张牌',
                    forced: true,
                    selectTarget: 1,
                    selectCard: 1,
                    filterTarget: (card, player, target) => target != player && trigger.targets.contains(target),
                    ai1: function (card) {
                        return 10 - get.value(card);
                    },
                    ai2: function (target) {
                        var att = get.attitude(_status.event.player, target);
                        if (_status.event.du) {
                            if (target.hasSkillTag('nodu')) return 0.5;
                            return -att;
                        }
                        if (att > 0) {
                            if (_status.event.player != target) att += 2;
                            return att + Math.max(0, 5 - target.countCards('h'));
                        }
                        return att;
                    }
                })
                'step 1'
                if (result.bool) {
                    player.give(result.cards, result.targets[0], true)
                    player.reduceFrBuff('lieshi')
                }
            },
            FrBuffInfo: {
                naturalLose: true,
                buffRank: {
                    basic: [0, 2],
                    random: [0, 0.25],
                    randomPower: 1.5,
                },
                type: 'debuff',
                limit: 3,
                BuffReject: ["youshi"]
            },
        },
        "youshi": {
            intro: {
                name: "优势",
                content: "<li>当你使用牌时，可以令一名其他目标角色交给你一张牌。然后你移除1层「<font color=green>优势</font>」。",
            },
            trigger: {
                player: "useCard1"
            },
            forced: true,
            silent: true,
            charlotte: true,
            priority: 3,
            filter: (event, player) => game.hasPlayer(target => target != player && event.targets.contains(target) && target.countCards('he') > 0),
            content: function () {
                'step 0'
                player.chooseTarget('令一名不为你的目标角色交给你一张牌', 1)
                    .set('filterTarget', (card, player, target) => target != player && trigger.targets.contains(target) && target.countCards('he') > 0)
                    .set('ai', target => -get.attitude(player, target))
                'step 1'
                if (result.bool) {
                    event.target = result.targets[0]
                    event.target.chooseCard('he', true, '将一张牌交给' + get.translation(player) + '。');
                } else {
                    event.finish()
                }
                'step 2'
                if (result.bool) {
                    event.target.give(result.cards, player, true);
                    player.reduceFrBuff('youshi')
                }
            },
            FrBuffInfo: {
                naturalLose: true,
                buffRank: {
                    basic: [2, 0],
                    random: [0.25, 0],
                    randomPower: 1.5,
                },
                type: 'buff',
                limit: 3,
                BuffReject: ["lieshi"]
            },
        },
        //鼓舞
        "guwu": {
            intro: {
                name: "鼓舞",
                content: "<li>你摸牌时，20X%的几率摸牌数+1。<li>你造成伤害时，15X%的几率伤害值+1。",
            },
            trigger: {
                player: "drawBegin",
                source: "damageBegin",
            },
            forced: true,
            silent: true,
            charlotte: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff('guwu')
            },
            content: function () {
                var onrewrite = event.triggername;
                var num = player.countFrBuffNum('guwu');
                if (onrewrite == "drawBegin") {
                    if (Math.random() <= num * 0.2) {
                        game.log(player, '受「<font color=yellow>鼓舞</font>」影响，本次摸牌数+1');
                        trigger.num++;
                    }
                }
                if (onrewrite == "damageBegin") {
                    if (Math.random() <= num * 0.15) {
                        game.log(player, '受「<font color=yellow>鼓舞</font>」影响，本次造成的伤害值+1');
                        trigger.num++;
                    }
                }
            },
            FrBuffInfo: {
                naturalLose: true,
                buffRank: {
                    random: [0.25, 0],
                    randomPower: 1.5,
                },
                type: 'buff',
                limit: 5,
                BuffReject: ["dimi"],
            }
        },
        //低迷
        "dimi": {
            intro: {
                name: "低迷",
                content: "<li>你摸牌时，若摸牌数大于1，20X%的几率摸牌数-1。<li>你造成伤害时，15X%的几率伤害值-1。",
            },
            trigger: {
                player: "drawBegin",
                source: "damageBegin",
            },
            forced: true,
            silent: true,
            charlotte: true,
            priority: 3,
            filter: function (event, player, onrewrite) {
                if (!player.hasFrBuff('dimi')) return false;
                if (onrewrite == "drawBegin") return event.num > 1;
                return true;
            },
            content: function () {
                var onrewrite = event.triggername;
                var num = player.countFrBuffNum('dimi');
                if (onrewrite == "drawBegin") {
                    if (Math.random() <= num * 0.2) {
                        game.log(player, '受「<font color=blue>低迷</font>」影响，本次摸牌数-1');
                        trigger.num--;
                    }
                }
                if (onrewrite == "damageBegin") {
                    if (Math.random() <= num * 0.15) {
                        game.log(player, '受「<font color=blue>低迷</font>」影响，本次造成的伤害值-1');
                        trigger.num--;
                    }
                }
            },
            FrBuffInfo: {
                naturalLose: true,
                buffRank: {
                    random: [0, 0.25],
                    randomPower: 1.5,
                },
                type: 'debuff',
                limit: 5,
                BuffReject: ["guwu"]
            },
        },
        //恐慌
        "konghuang": {
            intro: {
                name: "恐慌",
                content: "<li>你的非锁定技在回合内失效，你不能对其他角色使用牌。",
            },
            init: function (player, skill) {
                player.addSkillBlocker(skill);
            },
            onremove: function (player, skill) {
                player.removeSkillBlocker(skill);
            },
            skillBlocker: function (skill, player) {
                if (!player.hasFrBuff('konghuang')) return;
                if (!_status.currentPhase || _status.currentPhase != player) return;
                return !lib.skill[skill].charlotte && !get.is.locked(skill, player);;
            },
            charlotte: true,
            forced: true,
            silent: true,
            mod: {
                playerEnabled: function (card, player, target) {
                    if (!player.hasFrBuff('konghuang')) return;
                    if (player != target) return false;
                },
            },
            FrBuffInfo: {
                naturalLose: true,
                type: 'debuff',
                limit: 5,
                buffRank: {
                    basic: [0, -2.5],
                },
            }
        },
        //诅咒
        "zuzhou": {
            intro: {
                name: "诅咒",
                content: "<li>你移除此buff时，失去X点体力。",
            },
            forced: true,
            charlotte: true,
            silent: true,
            priority: 3,
            trigger: {
                player: "reduceFrBuffBegin2",
            },
            filter: function (event, player) {
                return event.buff == 'zuzhou' && player.hasFrBuff('zuzhou')
            },
            content: function () {
                game.log(player, '受「<font color=#600030>诅咒</font>」影响');
                player.loseHp(player.countFrBuffNum('zuzhou'));
            },
            FrBuffInfo: {
                naturalLose: false,
                limit: 5,
                type: 'debuff',
                buffRank: {
                    basic: [0, -2],
                    add: [0, -2],
                },
            }
        },
        //嘲讽
        'chaofeng': {
            intro: {
                name: "嘲讽",
                content: "<li>当一名其他角色使用【杀】指定目标时，若你在其攻击范围内且你不是目标，你成为目标，然后移除1层「嘲讽」。",
            },
            trigger: {
                global: "useCardToPlayer",
            },
            charlotte: true,
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return event.player != player && event.card.name == 'sha' && !event.targets.contains(player) && event.player.inRange(player);
            },
            content: function () {
                trigger.getParent().targets.push(player);
                trigger.player.line(player);
                player.reduceFrBuff('chaofeng')
                game.delay();
            },
            FrBuffInfo: {
                naturalLose: true,
                type: 'debuff',
                BuffRank: {
                    basic: [0, 1],
                }
            },
        },
        //庇护
        'bihu': {
            intro: {
                name: "庇护",
                content: "<li>当你成为其他角色普通锦囊牌的目标后，令此牌对你无效。<li>你不会成为【乐不思蜀】和【兵粮寸断】的目标。",
            },
            trigger: {
                target: "useCardToTargeted",
            },
            charlotte: true,
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return get.type(event.card) == 'trick' && event.player != player;
            },
            content: function () {
                game.log(player, '受「<font color=yellow>庇护</font>」影响，', trigger.card, '对', trigger.target, '失效')
                trigger.getParent().excluded.add(player);
            },
            mod: {
                targetEnabled: function (card, player, target, now) {
                    if (card.name == 'bingliang' || card.name == 'lebu') return false;
                },
            },
            ai: {
                effect: {
                    target: function (card, player, target, current) {
                        if (get.type(card) == 'trick') return 'zeroplayertarget';
                    },
                },
            },
            FrBuffInfo: {
                naturalLose: true,
                limit: 1,
                type: 'buff',
                BuffRank: {
                    basic: [1, 0.1],
                }
            },
        },
        //震撼
        'zhenhan': {
            intro: {
                name: "震撼",
                content: "<li>你使用牌不能指定对你施加「震撼」的角色为目标。<li>每回合结束时，清除所有「震撼」层数。",
            },
            trigger: {
                global: 'phaseEnd'
            },
            charlotte: true,
            forced: true,
            silent: true,
            priority: 3,
            content: () => {
                player.clearFrBuff('zhenhan')
            },
            mod: {
                playerEnabled: function (card, player, target) {
                    if (player.storage['Fr_Buff_zhenhan_Source'].contains(target)) return false;
                },
            },
            FrBuffInfo: {
                naturalLose: false,
                type: 'debuff',
                BuffRank: {
                    basic: [0, 2],
                }
            },
        },
        //虚弱
        'xuruo': {
            intro: {
                name: "虚弱",
                content: "<li>当你造成伤害时，此伤害-X，并移除1层「虚弱」<li>你的回合结束后，你移除所有「虚弱」。",
            },
            charlotte: true,
            trigger: {
                source: "damageBegin2",
                player: 'phaseAfter'
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff('xuruo')
            },
            content: function () {
                if (event.triggername == 'damageBegin2') {
                    trigger.num -= player.countFrBuffNum('xuruo')
                    player.reduceFrBuff('xuruo')
                } else {
                    player.clearFrBuff('xuruo')
                }
            },
            FrBuffInfo: {
                naturalLose: false,
                type: 'debuff',
                BuffRank: {
                    basic: [0, 2],
                    add: [0, 0.8],
                }
            },
        },
        //疲惫
        "pibei": {
            intro: {
                name: "疲惫",
                content: "<li>你的摸牌阶段额定摸牌数-1。",
            },
            forced: true,
            silent: true,
            priority: 3,
            trigger: {
                player: 'phaseDrawBefore'
            },
            filter: function (event, player) {
                return player.hasFrBuff('pibei')
            },
            content: function () {
                game.log(player, '受「<font color=blue>疲惫</font>」影响');
                trigger.num--;
            },
            FrBuffInfo: {
                naturalLose: true,
                type: 'debuff',
                limit: 5,
                buffRank: {
                    basic: [0, 1],
                },
            }
        },
        //束缚
        'shufu': {
            intro: {
                name: "束缚",
                content: "<li>你使用牌只能指定与你距离小于4-X的角色为目标。",
            },
            charlotte: true,
            mod: {
                playerEnabled: function (card, player, target) {
                    if (get.distance(player, target) > 4 - player.countFrBuffNum('shufu')) return false;
                },
            },
            FrBuffInfo: {
                naturalLose: true,
                type: 'debuff',
                limit: 3,
                BuffRank: {
                    basic: [0, 1],
                    add: [0, 0.8],
                }
            },
        },
        //失声
        'shisheng': {
            intro: {
                name: "失声",
                content: "<li>你的拼点牌点数-X。",
            },
            charlotte: true,
            trigger: {
                player: "compare",
                target: "compare",
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                if (event.player == player) return !event.iwhile;
                return player.hasFrBuff('shisheng')
            },
            content: function () {
                'step 0'
                var num = player.countFrBuffNum('shisheng');
                if (player == trigger.player) {
                    trigger.num1 -= num;
                    if (trigger.num1 < 1) trigger.num1 = 1;
                }
                else {
                    trigger.num2 -= num;
                    if (trigger.num2 < 1) trigger.num2 = 1;
                }
                game.log(player, '的拼点牌点数-' + num);
            },
            FrBuffInfo: {
                naturalLose: true,
                type: 'debuff',
                BuffRank: {
                    basic: [0, 0.3],
                    add: [0, 0.4],
                }
            },
        },
        //睡眠
        "sleep": {
            intro: {
                name: "睡眠",
                content: "<li>你的非锁定技失效且不能使用或打出手牌。<li>你受到伤害结算完毕后，「睡眠」层数-1。",
            },
            charlotte: true,
            init: function (player, skill) {
                player.addSkillBlocker(skill);
            },
            onremove: function (player, skill) {
                player.removeSkillBlocker(skill);
            },
            skillBlocker: function (skill, player) {
                return !lib.skill[skill].charlotte && !get.is.locked(skill, player);
            },
            mod: {
                cardEnabled: function (card, player) {
                    if (player.hasFrBuff('sleep')) return false;
                },
                cardUsable: function (card, player) {
                    if (player.hasFrBuff('sleep')) return false;
                },
                cardRespondable: function (card, player) {
                    if (player.hasFrBuff('sleep')) return false;
                },
                cardSavable: function (card, player) {
                    if (player.hasFrBuff('sleep')) return false;
                },
            },
            trigger: {
                player: "damageAfter",
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff('sleep')
            },
            content: function () {
                player.clearFrBuff("sleep");
            },
            ai: {
                "directHit_ai": true,
            },
            FrBuffInfo: {
                naturalLose: true,
                limit: 1,
                type: 'debuff',
                BuffRank: {
                    basic: [0, 3.5],
                    add: [0, 0.1],
                }
            },
        },
        //疯狂
        "mad": {
            intro: {
                name: "疯狂",
                content: "<li>自然衰减时，你随机弃置1张牌",
            },
            charlotte: true,
            trigger: {
                player: "reduceFrBuffBegin2",
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff('mad') && event.naturalLose && event.buff == 'mad'
            },
            content: function () {
                'step 0'
                player.randomDiscard(1, 'he', true);
            },
            FrBuffInfo: {
                naturalLose: true,
                limit: 5,
                type: 'debuff',
                BuffRank: {
                    basic: [0, 1],
                    add: [0, 0.1],
                }
            },
        },
        //龙焰
        'dragonfire': {
            intro: {
                name: "龙焰",
                content: "<li>当你获得「龙焰」时，你击碎1个勾玉。<li>自然衰减时，你受到1点火焰伤害。",
            },
            charlotte: true,
            trigger: {
                player: ["addFrBuffBegin1", "reduceFrBuffBegin2"],
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player, onrewrite) {
                if (onrewrite == "addFrBuffBegin1") {
                    return event.buff == 'dragonfire'
                } else {
                    return player.hasFrBuff('dragonfire') && event.naturalLose && event.buff == 'dragonfire'
                }
            },
            content: function () {
                'step 0'
                var onrewrite = event.triggername
                if (onrewrite == "addFrBuffBegin1") {
                    player.Frbroken()
                    event.finish()
                } else {
                    game.log(player, '受「<font color=black>龙焰</font>」影响');
                    player.damage(1, 'fire', 'nosource')
                }
            },
            FrBuffInfo: {
                naturalLose: true,
                limit: 3,
                type: 'debuff',
                BuffRank: {
                    basic: [0, 1],
                    add: [0, 0.1],
                }
            },
        },
        //易伤
        "yishang": {
            intro: {
                name: "易伤",
                content: "<li>你受到伤害时，伤害值+1，然后移除1层「<font color=red>易伤</font>」。",
            },
            charlotte: true,
            trigger: {
                player: "damageBegin",
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff("yishang")
            },
            content: function () {
                'step 0'
                game.log(player, '受「<font color=red>易伤</font>」影响，本次受到的伤害值+1');
                trigger.num++;
                'step 1'
                player.reduceFrBuff("yishang");
            },
            FrBuffInfo: {
                naturalLose: true,
                limit: 3,
                type: 'debuff',
                buffRank: {
                    basic: [0, 3],
                    add: [0, 0.1],
                },
                BuffReject: ['jianren'],
            },
        },
        //坚韧
        "jianren": {
            intro: {
                name: "坚韧",
                content: "<li>你受到伤害时，伤害值-1，然后移除1层「<font color=green>坚韧</font>」。",
            },
            charlotte: true,
            trigger: {
                player: "damageBegin2"
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff("jianren")
            },
            content: function () {
                'step 0'
                game.log(player, '受「<font color=green>坚韧</font>」影响，本次受到的伤害值-1');
                trigger.num--;
                player.reduceFrBuff("jianren");
            },
            FrBuffInfo: {
                naturalLose: true,
                limit: 3,
                type: 'buff',
                buffRank: {
                    basic: [3, 0],
                    add: [0.1, 0],
                },
                BuffReject: ['yishang'],
            },
        },
        //硬化
        "yinghua": {
            intro: {
                name: "硬化",
                content: "<li>当你受到不小于2点伤害时，令此伤害改为1，然后移除1层「<font color=yellow>硬化</font>」。",
            },
            charlotte: true,
            trigger: {
                player: "damageBegin4",
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff("yinghua") && event.num >= 2
            },
            content: function () {
                'step 0'
                game.log(player, '受「<font color=green>硬化</font>」影响，本次受到的伤害值改为1');
                trigger.num = 1;
                'step 1'
                player.reduceFrBuff("yinghua");
            },
            "_priority": -26,
            FrBuffInfo: {
                naturalLose: true,
                limit: 3,
                type: 'buff',
                buffRank: {
                    basic: [3, 0],
                    add: [0.1, 0],
                },
            },
        },
        //压制
        "yazhi": {
            intro: {
                name: "压制",
                content: "<li>你的攻击范围-X。",
            },
            charlotte: true,
            mod: {
                attackRange: function (player, range) {
                    if (player.hasFrBuff('yazhi')) return range - player.countFrBuffNum('yazhi');
                },
            },
            FrBuffInfo: {
                naturalLose: true,
                type: 'debuff',
                buffRank: {
                    basic: [0, 1],
                    add: [0, 0.5],
                },
            }
        },
        //燃烧
        "ranshao": {
            intro: {
                name: "燃烧",
                content: "<li>当你受到冰属性伤害时，你移除X层「<font color=fire>燃烧</font>」。<li>自然衰减时，你受到1点无来源火属性伤害。",
            },
            charlotte: true,
            trigger: {
                player: ["damage", "reduceFrBuffBegin2"],
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player, onrewrite) {
                if (!player.hasFrBuff("ranshao")) return false;
                if (onrewrite == 'damage') return event.nature && event.nature == 'ice';
                else return event.buff == 'ranshao' && event.naturalLose
            },
            content: function () {
                var onrewrite = event.triggername;
                if (onrewrite == 'damage') {
                    player.clearFrBuff('ranshao', num)
                } else {
                    player.damage('fire', 'nosource');
                }
            },
            FrBuffInfo: {
                naturalLose: true,
                type: 'debuff',
                buffRank: {
                    basic: [0, 2],
                    add: [0, 0.2],
                },
                BuffReject: ['dongshang']
            }
        },
        //预见
        "yujian": {
            intro: {
                name: "预见",
                content: "<li>你的回合外，当前回合角色手牌对你可见。<li>你的回合内，你可以在前三次摸牌前卜算X+1。",
            },
            charlotte: true,
            trigger: {
                player: "drawBefore",
            },
            usable: 3,
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff("yujian") && _status.currentPhase == player
            },
            content: function () {
                'step 0'
                var num = player.countFrBuffNum("yujian")
                player.chooseToGuanxing(num + 1);
            },
            FrBuffInfo: {
                naturalLose: true,
                type: 'buff',
                buffRank: {
                    basic: [0.6, 0],
                }
            },
            ai: {
                viewHandcard: true,
                skillTagFilter: function (player, tag, arg) {
                    if (!player.hasFrBuff('yujian')) return false;
                    if (player == arg || _status.currentPhase != arg) return false;
                },
            }
        },
        //迷茫
        "mimang": {
            intro: {
                name: "迷茫",
                content: "<li>你不能使用或打出实体的【杀】和【无懈可击】。",
            },
            charlotte: true,
            mod: {
                cardEnabled2: function (card, player) {
                    if (player.countFrBuffNum("mimang") > 0) {
                        if (card.name == 'sha' || card.name == 'wuxie') return false;
                    }
                },
            },
            FrBuffInfo: {
                naturalLose: true,
                limit: 3,
                type: 'debuff',
                buffRank: {
                    basic: [0, 1.5],
                    add: [0, 0.1],
                }
            },
        },
        //亢奋
        "kangfen": {
            intro: {
                name: "亢奋",
                content: "<li>你使用【杀】无次数限制。<li>当你使用【杀】结算完毕后，你弃置受伤角色的X张牌，然后你移除一层「<font color=fire>亢奋</font>」<li>你的攻击范围+X，你的手牌上限-X。",
            },
            charlotte: true,
            trigger: {
                player: "useCardAfter",
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff('kangfen') && event.card.name == 'sha'
            },
            content: function () {
                'step 0'
                var num = player.countFrBuffNum("kangfen");
                var damaged = player.getHistory('sourceDamage', function (evt) {
                    return evt.card == trigger.card
                }).map(i => i.player)
                for (var i of damaged) {
                    if (i.countDiscardableCards(player, 'he') > 0) player.discardPlayerCard(i, num, 'he', true);
                }
                'step 1'
                player.reduceFrBuff('kangfen')
            },
            mod: {
                cardUsable: function (card, player, num) {
                    if (card.name == 'sha' && player.hasFrBuff('kangfen')) return Infinity;
                },
                attackRange: function (player, range) {
                    if (player.countFrBuffNum("kangfen") > 0) {
                        var num = player.countFrBuffNum("kangfen");
                        return range + num;
                    }
                },
                maxHandcard: function (player, num) {
                    if (player.countFrBuffNum("kangfen") > 0) {
                        var numx = player.countFrBuffNum("kangfen");
                        return num - numx;
                    }
                },
            },
            FrBuffInfo: {
                naturalLose: true,
                type: 'none',
                buffRank: {
                    basic: [1, 0],
                    add: [1.15, 0.4],
                },
            }
        },
        //嗜血
        "shixue": {
            intro: {
                name: "嗜血",
                content: "<li>你造成伤害后，回复一点体力；你回复体力后，移除一层「<font color=red>嗜血</font>」。",
            },
            charlotte: true,
            trigger: {
                source: "damageAfter",
                player: "recoverAfter",
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff("shixue")
            },
            content: function () {
                var onrewrite = event.triggername;
                if (onrewrite == 'damageAfter') {
                    if (player.getDamagedHp() > 0) {
                        game.log(player, '受「<font color=red>嗜血</font>」影响');
                        player.recover();
                    }
                } else {
                    player.reduceFrBuff('shixue')
                }
            },
            FrBuffInfo: {
                naturalLose: false,
                type: 'buff',
                limit: 4,
                buffRank: {
                    basic: [2, 0],
                },
            }
        },
        //重伤
        "zhongshang": {
            intro: {
                name: "重伤",
                content: "<li>你回复体力时，移除一层「<font color=green>重伤</font>」并令此次回复量-1。",
            },
            charlotte: true,
            trigger: {
                player: ["recoverBegin"],
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff('zhongshang')
            },
            content: function () {
                if (trigger.name == 'recover') {
                    game.log(player, '受「<font color=green>重伤</font>」影响，本次回复量-1。');
                    player.reduceFrBuff('zhongshang')
                    trigger.num--
                }
            },
            FrBuffInfo: {
                naturalLose: true,
                type: 'debuff',
                buffRank: {
                    basic: [0, 2],
                },
            }
        },
        //中毒
        "zhongdu": {
            intro: {
                name: "中毒",
                content: "<li>你回复体力后，移除一层「<font color=green>中毒</font>」<li>自然衰减时，失去一点体力。",
            },
            charlotte: true,
            trigger: {
                player: ["recoverAfter", "reduceFrBuffBegin2"],
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player, onrewrite) {
                if (!player.hasFrBuff('zhongdu')) return false
                if (onrewrite == 'recoverAfter') return true
                else return event.buff == 'zhongdu' && event.naturalLose == true;
            },
            content: function () {
                if (trigger.name == 'recover') {
                    player.reduceFrBuff('zhongdu')
                } else {
                    player.loseHp()
                }
            },
            FrBuffInfo: {
                naturalLose: true,
                type: 'debuff',
                buffRank: {
                    basic: [0, 2],
                },
            }
        },
        //祈愿 
        "qiyuan": {
            intro: {
                name: "祈愿",
                content: "<li>你的判定会朝着对你有利的方向倾斜。<li>判定完成后，移除一层「<font color=yellow>祈愿</font>」",
            },
            charlotte: true,
            trigger: {
                player: "judgeBegin",
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff('qiyuan') && !event.directresult;
            },
            content: function () {
                'step 0'
                var tempcard = false, temp = -Infinity;
                for (var i = 0; i < ui.cardPile.childElementCount; i++) {
                    var card = ui.cardPile.childNodes[i];
                    var temp2 = trigger.judge(card);
                    if (temp2 > temp) {
                        tempcard = card;
                        temp = temp2;
                    }
                }
                if (tempcard) trigger.directresult = tempcard;
                'step 1'
                player.reduceFrBuff('qiyuan')
            },
            ai: {
                luckyStar: true,
            },
            FrBuffInfo: {
                naturalLose: true,
                type: 'buff',
                buffRank: {
                    basic: [0.5, 0],
                    random: [0.3, 0],
                    randomPower: 2
                },
                limit: 3,
                BuffReject: ['zaie']
            }
        },
        //灾厄 
        "zaie": {
            intro: {
                name: "灾厄",
                content: "<li>你的判定会朝着对你不利的方向倾斜。<li>判定完成后，移除一层「<font color=purple>灾厄</font>」。",
            },
            charlotte: true,
            trigger: {
                player: "judgeBegin",
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff('zaie') && !event.directresult;
            },
            content: function () {
                'step 0'
                var tempcard = false, temp = -Infinity;
                for (var i = 0; i < ui.cardPile.childElementCount; i++) {
                    var card = ui.cardPile.childNodes[i];
                    var temp2 = trigger.judge(card);
                    if (temp2 < temp) {
                        tempcard = card;
                        temp = temp2;
                    }
                }
                if (tempcard) trigger.directresult = tempcard;
                'step 1'
                player.reduceFrBuff('zaie')
            },
            ai: {
                luckyStar: false,
                BadLuck: true,
            },
            FrBuffInfo: {
                naturalLose: true,
                type: 'debuff',
                buffRank: {
                    basic: [0, 0.5],
                    random: [0, 0.3],
                    randomPower: 2
                },
                limit: 3,
                BuffReject: ['qiyuan']
            }
        },
        //净化
        "jinghua": {
            intro: {
                name: "净化",
                content: "<li>回合开始时，移除此buff及所有类型为减益的buff各1层。",
            },
            charlotte: true,
            trigger: {
                player: "phaseBegin",
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return get.FrBuffList(player, 'debuff').length > 0 && player.hasFrBuff('jinghua')
            },
            content: function () {
                'step 0'
                player.reduceFrBuff('jinghua')
                'step 1'
                game.log(player, '受「<font color=#FFF8D7>净化</font>」影响');
                for (var i in lib.FrBuff) {
                    if (player.countFrBuffNum(i) > 0 && get.FrBuffInfo(i, 'type') == 'debuff') {
                        player.reduceFrBuff(i)
                    }
                }
            },
            FrBuffInfo: {
                naturalLose: false,
                type: 'buff',
                buffRank: {
                    basic: [0, 0],
                },
            }
        },
        //麻痹
        "mabi": {
            intro: {
                name: "麻痹",
                content: "<li>你不能响应其他角色对你使用的牌；你使用♣牌时，移除一层「<font color=red>麻痹</font>」。",
            },
            charlotte: true,
            trigger: {
                player: "useCard",
                global: "useCardToPlayered",
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff("mabi")
            },
            content: function () {
                if (trigger.name == 'useCard') {
                    if (trigger.card.suit == 'club') player.reduceFrBuff('mabi');
                }
                else {
                    if (trigger.player != player && trigger.target == player) {
                        game.log(player, '受「<font color=red>麻痹</font>」影响');
                        game.log(player, '无法响应', trigger.card);
                        trigger.getParent().directHit.add(trigger.target);
                    }
                }
            },
            FrBuffInfo: {
                naturalLose: false,
                type: 'debuff',
                buffRank: {
                    basic: [0, 1.5],
                },
                BuffReject: ['mingjie'],
            }
        },
        //敏捷
        "mingjie": {
            intro: {
                name: "敏捷",
                content: "<li>当你成为其他角色伤害类牌的目标时，移除一层「<font color=blue>敏捷</font>」并进行一次判定，若结果为黑色，此牌对你无效。",
            },
            charlotte: true,
            trigger: {
                target: "useCardToPlayered",
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff("mingjie") && get.tag(event.card, 'damage') && event.player != player
            },
            content: function () {
                'step 0'
                player.reduceFrBuff('mingjie')
                'step 1'
                game.log(player, '受「<font color=gray>敏捷</font>」影响');
                player.judge('Fr_Buff_mingjie', function (card) { return (get.color(card) == 'black') ? 1.5 : -0.5 }).judge2 = function (result) {
                    return result.bool;
                }
                'step 2'
                if (result.judge > 0) {
                    trigger.excluded.push(player);
                }
            },
            FrBuffInfo: {
                naturalLose: true,
                type: 'buff',
                limit: 3,
                buffRank: {
                    basic: [1.5, 0],
                    random: [0.5, 0]
                },
                BuffReject: ['mabi', 'chihuan'],
            }
        },
        //迟缓
        'chihuan': {
            intro: {
                name: "迟缓",
                content: "<li>当你成为其他角色伤害类牌的唯一目标时，移除一层「<font color=gray>迟缓</font>」并进行一次判定，若结果为黑色，此牌结算两次。",
            },
            charlotte: true,
            trigger: {
                target: "useCardToPlayered",
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff("chihuan") && get.tag(event.card, 'damage') && event.player != player && event.targets.length == 1
            },
            content: function () {
                'step 0'
                player.reduceFrBuff('chihuan')
                'step 1'
                game.log(player, '受「<font color=gray>迟缓</font>」影响');
                player.judge('Fr_Buff_chihuan', function (card) { return (get.color(card) == 'black') ? -2 : 0 }).judge2 = function (result) {
                    if (result.bool == false) return true;
                    return false;
                }
                'step 2'
                if (result.judge < 0) {
                    trigger.getParent('useCard').effectCount++;
                }
            },
            FrBuffInfo: {
                naturalLose: true,
                type: 'debuff',
                limit: 3,
                buffRank: {
                    basic: [0, 1.5],
                    random: [0, 0.5]
                },
                BuffReject: ['mingjie'],
            }
        },
        //出血
        'chuxue': {
            intro: {
                name: "出血",
                content: "<li>当你的「<font color=red>出血</font>」层数大于你的体力值时，你移除所有出血层数，然后流失X/2点体力（向下取整且至少为1）",
            },
            charlotte: true,
            trigger: {
                player: ["addFrBuffAfter", 'changeHp', "reduceFrBuffAfter"],
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player, onrewrite) {
                if (!player.hasFrBuff('chuxue')) return false
                return player.countFrBuffNum('chuxue') > player.hp
            },
            content: function () {
                var num = player.countFrBuffNum('chuxue')
                player.clearFrBuff('chuxue')
                player.loseHp(Math.max(1, Math.floor(num / 2)))
            },
            FrBuffInfo: {
                naturalLose: true,
                type: 'debuff',
                buffRank: {
                    basic: [0, 0.9],
                    add: [0, 1],
                },
            }
        },
        //冻伤
        'dongshang': {
            intro: {
                name: "冻伤",
                content: "<li>当你受到伤害时，弃置1张手牌，若此伤害为火属性，你减少1层「<font color=blue>冻伤</font>」并令此伤害+1。",
            },
            charlotte: true,
            trigger: {
                player: "damageBegin2",
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff("dongshang")
            },
            content: function () {
                if (player.countCards('h') > 0) {
                    player.chooseToDiscard('受到「<font color=blue>冻伤</font>」影响，弃置1张手牌', 'h', true)
                    game.log(player, '受到「<font color=blue>冻伤</font>」影响，弃置1张手牌')
                }
                if (trigger.nature == 'fire') {
                    player.reduceFrBuff('dongshang')
                    trigger.num += 1
                }
            },
            FrBuffInfo: {
                naturalLose: true,
                type: 'debuff',
                buffRank: {
                    basic: [0, 0.8],
                    add: [0, 0.2],
                },
                BuffReject: ['ranshao']
            }
        },
        //回生
        'huisheng': {
            intro: {
                name: "回生",
                content: "<li>当你进入濒死状态时，移除一层「<font color=green>回生</font>」并将体力恢复至1点。",
            },
            charlotte: true,
            trigger: {
                player: "dying",
            },
            forceDie: true,
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff('huisheng')
            },

            content: function () {
                player.reduceFrBuff('huisheng')
                player.recover(1 - player.hp);
            },
            ai: {
                save: true,
                threaten: 0.6
            },
            FrBuffInfo: {
                naturalLose: true,
                limit: 1,
                type: 'buff',
                buffRank: {
                    basic: [4, 0],
                },
            },
        },
        //免疫
        'mianyi': {
            intro: {
                name: "免疫",
                content: "<li>当你受到伤害时，移除一层「<font color=gray>免疫</font>」并取消之。",
            },
            charlotte: true,
            trigger: {
                player: 'damageBegin2'
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff('mianyi')
            },
            content: function () {
                player.reduceFrBuff('mianyi')
                trigger.cancel();
            },
            ai: {
                nofire: true,
                nothunder: true,
                nodamage: true,
                effect: {
                    target: function (card, player, target, current) {
                        if (get.tag(card, 'damage')) return [0, 0];
                    }
                },
            },
            FrBuffInfo: {
                naturalLose: true,
                limit: 2,
                type: 'buff',
                buffRank: {
                    basic: [2, 0],
                },
                BuffReject: ['yishang'],
            },
        },
        //潜行
        'qianxing': {
            intro: {
                name: "潜行",
                content: "<li>你不能成为其他角色的卡牌的目标。<li>当你对其他角色使用牌时，你清除「潜行」层数",
            },
            trigger: {
                player: "useCard",
            },
            charlotte: true,
            filter: function (event, player) {
                return player.hasFrBuff('qianxing') && event.target != player
            },
            forced: true,
            silent: true,
            priority: 3,
            content: function () {
                player.clearFrBuff('qianxing')
            },
            mod: {
                targetEnabled: function (card, player, target) {
                    if (player != target) return false;
                },
            },
            FrBuffInfo: {
                naturalLose: true,
                limit: 1,
                type: 'buff',
                buffRank: {
                    basic: [2, 0],
                },
            }
        },
        //混乱
        'hunluan': {
            intro: {
                name: "混乱",
                content: "<li>你的行为不受控制。",
            },
            charlotte: true,
            FrBuffInfo: {
                naturalLose: true,
                limit: 2,
                type: 'debuff',
                buffRank: {
                    naturalLose: true,
                    basic: [0, 1],
                    random: [0.1, 0.9],
                    randomPower: 3,
                },
            }
        },
        //灵秘
        'lingmi': {
            intro: {
                name: "灵秘",
                content: "<li>你的所有牌均可重铸。<li>当你重铸一张原本不可重铸的牌时，「灵秘」层数-1",
            },
            trigger: {
                player: 'recastAfter'
            },
            charlotte: true,
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return event.cards.some(card => {
                    var info = get.info(card), recastable = info.recastable || info.chongzhu
                    return !Boolean(typeof recastable == 'function' ? recastable(_status.event, player) : recastable);
                })
            },
            content: function () {
                var num = trigger.cards.filter(i => {
                    var info = get.info(i), recastable = info.recastable || info.chongzhu
                    return !Boolean(typeof recastable == 'function' ? recastable(_status.event, player) : recastable);
                }).length
                player.reduceFrBuff('lingmi', num)
            },
            mod: {
                cardRecastable: function (card, player) {
                    if (player.hasFrBuff('lingmi')) return true
                }
            },
            FrBuffInfo: {
                naturalLose: false,
                buffRank: {
                    basic: [0.5, 0]
                },
                type: 'buff',
            },
        },
        'zuijiu': {
            intro: {
                name: "醉酒",
                content: "<li>当你使用【杀】时，你移去X层「醉酒」，然后此【杀】伤害+X",
            },
            trigger: {
                player: "useCard1",
            },
            filter: function (event) {
                return event.card && event.card.name == 'sha';
            },
            charlotte: true,
            forced: true,
            silent: true,
            priority: 3,
            content: function () {
                var num = player.countFrBuffNum('zuijiu')
                if (!trigger.baseDamage) trigger.baseDamage = 1;
                trigger.baseDamage += num
                player.reduceFrBuff('zuijiu', num)
            },
            FrBuffInfo: {
                naturalLose: true,
                buffRank: {
                    basic: [1, 0],
                    randomPower: 0.2
                },
                type: 'buff',
            },
        },
        'yingneng': {
            intro: {
                name: "盈能",
                content: "<li>当你消耗魔力时，移除Y层盈能，然后减少等量魔力消耗（Y为你此次消耗的魔力值）。",
            },
            trigger: {
                player: "consumefrMpBegin1",
            },
            charlotte: true,
            forced: true,
            silent: true,
            priority: 3,
            content: function () {
                var num = Math.min(player.countFrBuffNum('yingneng'), trigger.num)
                trigger.num -= num
                player.reduceFrBuff('yingneng', num)
            },
            FrBuffInfo: {
                naturalLose: true,
                buffRank: {
                    basic: [0.5, 0],
                    randomPower: 0.2
                },
                type: 'buff',
            },
        }
        /*新Buff创建模板
                //「」
                "Buff名称":{
                    intro:{
                        name:"Buff名称翻译",
                        content:"Buff描述",
                        （Buff名称翻译和描述现在与这里挂钩）
                    },
                    trigger:{
                    	
                    },
                    forced:true,
                    silent:true,
                    priority:3,//这三项是默认的。//PS:别再写奇奇怪怪的优先度了好吗
                    filter:function (event,player){
                        if(get.FrBuffNum(player,"_Fr_Buff_Buff名称")==0) return false;、
                    	
                    },
                    content:function (){
                    	
                    },
                    FrBuffInfo:{
                        naturalLose:（是否为自然衰减类Buff，不是可省略此句或填false）,
                        BuffRank:{
                            basic:[0,0],（这里写不受层数影响的收益）
                            random:[0,0],（这里写受层数和随机数影响的收益，结果值填概率）
                            randomPower:0,（这里写倍率，与上面random挂钩）
                            add:[0,0],（这里写受层数影响的收益，结果值不需取整）
                        },（第一个数为正收益，第二个为负收益。PS:基本收益论：一牌1收益，一血2收益）
                        type:'buff'(填写增益：buff或者减益：debuff)
                        BuffReject:[],（与之冲突的Buff，在附加时若有与之冲突的Buff，则会先削减冲突的Buff）
                    }
                }
        */
    };
    get.randomPercent = function (probability) {
        if (probability > 1) {
            console.log('请输入小于等于1的小数')
        } else if (probability < 0) {
            console.log('请输入大于等于0的小数')
        }
        // 生成一个介于 0 到 1 之间的随机数
        var randomValue = Math.random();

        // 如果随机数小于等于概率值，则返回 true，否则返回 false
        return randomValue <= probability;
    }
    get.FrBuffLimit = function (buff) {
        return get.FrBuffInfo(buff, 'limit')
    }
    get.isFrBuffNatualLose = function (buff) {
        return get.FrBuffInfo(buff, 'naturalLose')
    }
    get.FrBufftype = function (buff) {
        if (!get.FrBuffInfo(buff, 'type')) return 'none'
        return get.FrBuffInfo(buff, 'type')
    }
    lib.element.player.underFrBuffLimit = function (buff) {
        var player = this
        if (player.countFrBuffNum(buff) < get.FrBuffLimit) {
            return true
        } else {
            return false
        }
    }
    lib.element.player.isMad = function () {
        return this.hasSkill('mad') || this.hasFrBuff('hunluan');
    }
    get.deepClone = function (obj, newObj) {
        var newObj = newObj || {};
        for (let key in obj) {
            if (typeof obj[key] == 'object') {
                newObj[key] = (obj[key].constructor === Array) ? [] : {}
                get.deepClone(obj[key], newObj[key]);
            } else {
                newObj[key] = obj[key]
            }
        }
        return newObj;
    }

    get.FrBuffcontent = function (name) {
        var info = lib.FrBuff[name].FrBuffInfo
        var str = ''
        if (info.naturalLose) {
            str += '<li>自然衰减：<b>是</b>'
        } else {
            str += '<li>自然衰减：<b>否</b>'
        }
        if (info.type == 'buff') {
            str += '<li>类型：增益'
        } else if (info.type == 'debuff') {
            str += '<li>类型：减益'
        } else if (info.type == 'none') {
            str += '<li>类型：中立'
        }
        if (info.limit) {
            str += '<li>上限：' + info.limit
        } else {
            str += '<li>无上限'
        }
        if (info.BuffReject) {
            var buffname = info.BuffReject.map(function (i) {
                return '「' + lib.FrBuff[i].intro.name + '」'
            })
            str += '<li>冲突Buff：' + buffname.join('、')
        }
        return str
    }
    for (var i in lib.FrBuff) {
        var Buff = lib.FrBuff[i];
        var name = 'Fr_Buff_' + i;
        lib.FrBuff[i].intro.content = get.FrBuffcontent(i) + lib.FrBuff[i].intro.content
        lib.skill[name] = get.deepClone(Buff)
        lib.skill[name].marktext = "<img style=width:" + (lib.config.extension_十周年UI_newDecadeStyle ? "16px" : "28px") + " src=" + lib.assetURL + "extension/福瑞拓展/image/Buff/" + i + ".png>";
        lib.translate[name] = Buff.intro.name;
        lib.translate[name + '_name'] = Buff.intro.name;
        lib.translate[name + '_name_info'] = Buff.intro.content;
    }
    /*
        这里请注意，Buff现在有三个名称：
            ①在lib.FrBuff中的是“Buff名”
            ②Buff对应的技能名是“Fr_Buff_Buff名”
            ③在技能引用的时候是“Fr_Buff_Buff名_name”
    	
        不过不用担心，在使用下述方法时，所有方法都会用到get.FrBuffName，
        以便对你写的Buff名称进行转化，所以在使用的时候，①和②这两种写法可以混用
        具体支持的写法类型请看下面的注释
    */
    lib.translate["_dieClearFrBuff"] = "死亡清除";
    lib.skill["_dieClearFrBuff"] = {
        trigger: {
            player: "die",
        },
        direct: true,
        forceDie: true,
        popup: false,
        priority: Infinity,
        content: function () {
            'step 0'
            event.buffList = Object.keys(lib.FrBuff)
            'step 1'
            var buff = event.buffList.shift()
            if (player.hasFrBuff(buff)) {
                player.clearFrBuff(buff);
            }
            'step 2'
            if (event.buffList.length) event.goto(1)
        }
    }
    lib.translate["_naturalLoseFrBuff"] = "自然衰减";
    lib.skill["_naturalLoseFrBuff"] = {
        trigger: {
            player: "phaseAfter",
        },
        forced: true,
        popup: false,
        lastDo: true,
        filter: function (event, player) {
            return get.FrBuffList(player).length > 0
        },
        content: function () {
            'step 0'
            event.buffList = Object.keys(lib.FrBuff)
            'step 1'
            var buff = event.buffList.shift()
            if (lib.FrBuff[buff].FrBuffInfo.naturalLose && player.hasFrBuff(buff)) {
                if (!game.checkMod(player, buff, 'naturalLose', false, 'FrBuffIgnore', player)) {
                    player.reduceFrBuff(buff, 1, 'naturalLose')
                }
            }
            'step 2'
            if (event.buffList.length) event.goto(1)
        }
    };
    get.frBuffs = function (filter) {
        if (typeof filter == 'function') return Object.keys(lib.FrBuff).filter(i => filter(i))
        else return Object.keys(lib.FrBuff)
    }
    //获取Buff的代码名（除这里之外一般用不上）
    //现在支持的写法：_Fr_Buff_Buff名、Buff名、Fr_Buff_Buff名
    get.FrBuffName = function (name, iscomplete) {
        if (typeof name != 'string') return;
        var Buff = name;
        if (Buff.indexOf('_') == 0) Buff = Buff.slice(1);
        if (iscomplete !== false) {
            if (Buff.indexOf('Fr_Buff_') == -1) Buff = 'Fr_Buff_' + Buff;
        } else {
            if (Buff.indexOf('Fr_Buff_') == 0) Buff = Buff.replace('Fr_Buff_', '');
        }
        return Buff;
    };
    get.Bufflist = function () {
        var caption;
        caption = 'Buff清单';
        var dialog = ui.create.dialog(caption, 'hidden');
        dialog.style.fontFamily = 'shousha'
        dialog.style.fontSize = '30px'
        var exit = ui.create.div('.exit', dialog);
        dialog.classList.add('static');
        dialog.classList.add('bufflist');
        dialog.classList.remove('hidden');
        ui.window.appendChild(dialog);
        exit.onclick = function () {
            dialog.remove();
        }
        var create = function (buff) {
            // 创建一个包含图片的 <div> 元素
            var container = document.createElement('div')
            container.style.borderBottom = '1px solid transparent'
            container.style.width = '100%'
            container.style.borderImage = 'linear-gradient(to left, rgb(255 255 255 / 0%), rgb(255, 255, 255), rgb(255 255 255 / 0%)) 0.5 / 1 / 0 stretch'
            dialog.content.appendChild(container)
            var name = document.createElement('div')
            name.style.position = 'relative'
            name.style.fontSize = '20px'
            name.innerHTML = get.FrBuffIntro(buff).name
            container.appendChild(name)
            var imageDiv = document.createElement('div');
            imageDiv.classList.add('image-container'); // 可以定义一个样式类来设置该 div 的样式
            var img = document.createElement('img');
            img.src = lib.assetURL + 'extension/福瑞拓展/image/Buff/' + buff + '.png'
            img.classList.add('square-image'); // 可以定义一个样式类来设置图片的样式
            container.appendChild(imageDiv)
            imageDiv.appendChild(img);
            var h3 = document.createElement('h3');
            var str = get.FrBuffIntro(buff).content;
            h3.innerHTML = str;
            h3.style.textAlign = 'left'
            h3.style.marginLeft = '5%'
            container.appendChild(h3)
        }

        for (var i in lib.FrBuff) {
            create(i);
        }
    }
    //获取中文解释
    get.FrBuffIntro = function (name) {
        name = get.FrBuffName(name, false)
        return lib.FrBuff[name].intro
    }
    //获取Buff的层数
    get.FrBuffNum = function () {
        for (var i = 0; i < arguments.length; i++) {
            if (get.itemtype(arguments[i]) == 'player') {
                var player = arguments[i]
            } else {
                var Buff = get.FrBuffName(arguments[i]);
            }
        }
        if (!player.storage[Buff] || player.storage[Buff] < 0) return 0;
        return player.storage[Buff];
    };
    //获取Buff的rank值（给ai判断用）
    get.FrBuffRank = function (player, name, income, plies) {
        if (player.isImmFrBuff(name)) return 0
        name = get.FrBuffName(name, false);
        var Buff = get.FrBuffName(name);
        var list = [lib.skill[Buff].FrBuffInfo.BuffRank];
        player.getSkills(null, false, false).filter(function (i) {
            if (lib.skill[i] && lib.skill[i].ai && lib.skill[i].ai.FrBuffRank_extra &&
                lib.skill[i].ai.FrBuffRank_extra[name]) {
                list.push(lib.skill[i].ai.FrBuffRank_extra[name]);
            }
        });
        if (!plies || typeof plies != 'number') {
            if (income && typeof income == 'number') plies = income;
            else plies = get.FrBuffNum(player, Buff);
        }
        var num = 0;
        for (let i = 0; i < list.length; i++) {
            var rank = list[i];
            if (list[i].immunity === true) {
                return 0;
            }
            if (income !== false) {
                if (rank.basic) num += rank.basic[0];
                if (rank.add) num += rank.add[0] * plies;
                var random2 = 1;
                if (rank.randomPower) {
                    if (Array.isArray(rank.randomPower)) random2 = rank.randomPower[0];
                    else random2 = rank.randomPower;
                }
                if (rank.random) num += Math.min(1, rank.random[0] * plies) * random2;
            }
            if (income !== true) {
                if (rank.basic) num -= rank.basic[1];
                if (rank.add) num -= rank.add[1] * plies;
                var random2 = 1;
                if (rank.randomPower) {
                    if (Array.isArray(rank.randomPower)) random2 = rank.randomPower[1];
                    else random2 = rank.randomPower;
                }
                if (rank.random) num -= Math.min(1, rank.random[1] * plies) * random2;
            }
        }
        if (income === false) return -num;
        return num;
    };
    /*技能中对Buffrank的影响赋值写法例：
        Fr_xxx:{
            ai:{
                FrBuffRank_extra:{
                    "diaoling":{
                        basic:[0,-0.5],
                        add:[1,0]
                    }
                }
            }
        }
    */
    //获取目标角色已有的Buff种类（可设置过滤filter）
    get.FrBuffList = function (player, filter) {
        var list = [];
        for (var i in lib.FrBuff) {
            var Buff = get.FrBuffName(i);
            if (get.FrBuffNum(player, Buff) == 0) continue;
            if (filter && typeof filter == 'function') {
                if (filter(player, Buff) == true) list.push(Buff);
                continue;
            } else if (typeof filter == 'string') {
                if (get.FrBuffInfo(i, 'type') == filter) list.push(Buff);
                continue
            }
            list.push(Buff);
        }
        return list;
    };
    //寻找对应条件的buff
    game.findFrBuff = function (filter, value) {
        var list = []
        for (var i in lib.FrBuff) {
            if (get.FrBuffInfo(i, filter) == value) list.add(i)
        }
        return list
    }
    //获取Buff的信息info，该信息与角色无关，会且只会从lib.FrBuff中调取信息。
    /*
    目前来说，有以下几项信息是需要特别注意的：
        limit为Buff的层数上限，无则视为无限
        BuffReject为与之冲突的Buff
    */
    get.FrBuffInfo = function (name, filter) {
        var Buff = get.FrBuffName(name, false);
        var info;
        if (lib.FrBuff[Buff]) info = lib.FrBuff[Buff].FrBuffInfo;
        else return null;
        if (!filter) return info;
        if (filter == 'BuffReject') {
            if (!info.BuffReject) return [];
        } else if (filter == 'limit') {
            if (!info.limit) return Infinity;
        }
        return info[filter];
    };
    //更改（增加或减少）目标角色Buff的层数
    //层数不填默认为“增加1层”
    game.changeFrBuff = function () {
        var next = game.createEvent('changeFrBuff');
        for (let i = 0; i < arguments.length; i++) {
            if (get.itemtype(arguments[i]) == 'player') {
                if (next.player == undefined) {
                    next.player = arguments[i];
                } else {
                    next.source = arguments[i]
                }
            } else if (typeof arguments[i] == 'string') {
                if (['naturalLose', 'isReject'].contains(arguments[i])) {
                    next[arguments[i]] = true;
                } else {
                    next.buff = get.FrBuffName(arguments[i]);
                }
            } else if (typeof arguments[i] == 'number' && !next.num) {
                next.num = arguments[i];
            }
        }
        if (next.source == undefined) next.source = 'nosource'
        if (!next.num) next.num = 1;
        next.setContent(function () {
            "step 0"
            if (this.player.isImmFrBuff(get.FrBuffName(this.buff, false)) && this.num > 0) {
                game.log(this.player, '因免疫', '#g「' + get.translation(this.buff) + '」', '无法被附加该Buff')
                event.finish()
            } else if (game.checkMod(this.player, get.FrBuffName(this.buff, false), 'changeFrBuff', false, 'FrBuffIgnore', this.player)) {
                event.finish()
            } else if (this.isReject) {
                event.goto(3);
            } else {
                this.trigger('changeFrBuffToBegin1'); //事件开始，取消事件的地方
            }
            "step 1"
            this.trigger('changeFrBuffToBegin2'); //事件开始，修改事件参数的地方
            "step 2"
            if (!lib.FrBuff[get.FrBuffName(this.buff, false)]) {
                event.finish();
            } else if (this.num <= 0) {
                event.goto(3);
            } else {
                var reject = get.FrBuffInfo(this.buff, 'BuffReject');
                if (reject.length && this.num > 0) {
                    for (var i = 0; i < reject.length; i++) {
                        var num2 = get.FrBuffNum(this.player, reject[i]);
                        if (!num2) continue;
                        game.changeFrBuff(this.player, reject[i], -this.num, 'isReject');
                        game.log(player, '附加的', num2, '层', '#g「' + get.translation(this.buff) + '」', '被', '#g「' + get.translation(get.FrBuffName(reject[i])) + '」', '抵消')
                        this.num -= num2;
                        if (this.num <= 0) {
                            event.goto(5);
                            break;
                        }
                    }
                }
            }
            "step 3"
            if (this.num != 0) {
                var Buff = this.buff;
                var num = this.num;
                var tip1, tip2;
                if (this.num > 0) {
                    if (!this.player.storage[Buff]) {
                        this.player.storage[Buff] = 0;
                        tip1 = '附加了';
                        this.trigger('toHasFrBuff')
                    } else {
                        tip1 = '增加了';
                    }
                    num = Math.min(get.FrBuffInfo(Buff, 'limit') - this.player.storage[Buff], num);
                } else {
                    if (this.naturalLose == true) {
                        tip1 = '自然减少了';
                    } else {
                        tip1 = '移除了';
                    }
                    num = -Math.min(this.player.storage[Buff], -num);
                }
                if (this.source != 'nosource') {
                    if (!this.player.storage[Buff + '_Source']) this.player.storage[Buff + '_Source'] = []
                    this.player.storage[Buff + '_Source'].push(this.source)
                    tip2 = get.translation(this.source)
                } else {
                    tip2 = ''
                }
                if (num != 0) {
                    this.player.storage[Buff] += num;
                    this.player.syncStorage(Buff);
                    if (this.player.storage[Buff] > 0) {
                        player.addAdditionalSkill('Fr_Buff', Buff, true);
                        this.player.markSkill(Buff);
                    } else {
                        player.removeAdditionalSkill('Fr_Buff', Buff);
                        this.player.unmarkSkill(Buff);
                        delete this.player.storage[Buff + '_Source']
                    }
                    game.log(this.player, this.source != 'nosource' ? '因' : '', '#b' + tip2, tip1, Math.abs(num), '层', '#g「' + get.translation(Buff) + '」');
                }
            }
            'step 4'
            this.trigger('changeFrBuff')
        });
        return next;
    };
    //转化目标角色的Buff，请不要将互相冲突的Buff互相转化
    game.changeFrBuffTo = function () {
        var next = game.createEvent('changeFrBuffTo');
        for (let i = 0; i < arguments.length; i++) {
            if (get.itemtype(arguments[i]) == 'player') {
                next.player = arguments[i];
            } else if (typeof arguments[i] == 'string') {
                if (!next.from) {
                    next.from = get.FrBuffName(arguments[i]);
                } else {
                    next.to = get.FrBuffName(arguments[i]);
                }
            } else if (typeof arguments[i] == 'number') {
                if (!next.num1) next.num1 = arguments[i];
                else next.num2 = arguments[i];
            }
        }
        if (!next.num1) next.num1 = 1;
        if (next.num1 > 0) next.num1 = -next.num1;
        if (!next.num2) next.num2 = -next.num1;
        //num1为被转化掉的Buff的变化层数，会自动转化为负数，转化Buff的变化层数num2则默认为-num1
        //请不要将num2设定为正数
        next.setContent(function () {
            "step 0"
            this.trigger('changeFrBuffBeginTo1'); //事件开始，取消事件的地方
            "step 1"
            this.trigger('changeFrBuffBeginTo2'); //事件开始，修改事件参数的地方
            "step 2"
            if (!lib.FrBuff[get.FrBuffName(event.to, false)] || !lib.FrBuff[get.FrBuffName(event.from, false)] || event.num1 == 0 || event.num2 == 0) {
                event.finish();
            } else if (get.FrBuffNum(player, event.from) + event.num1 < 0) {
                //game.log(player,'的Buff转化失败');
                this.trigger('changeFrBuffBeginToFailed');
                event.finish();
            }
            "step 3"
            var from = event.from,
                num1 = event.num1;
            var to = event.to,
                num2 = event.num2;
            player.storage[from] += num1;
            player.syncStorage(from);
            if (player.storage[from] > 0) {
                player.addAdditionalSkill('Fr_Buff', from, true);
                player.markSkill(from);
            } else {
                player.removeAdditionalSkill('Fr_Buff', from);
                player.unmarkSkill(from);
            }
            var reject = get.FrBuffInfo(to, 'BuffReject');
            var rejectCost = 0;
            if (reject.length && num2 > 0) {
                for (var i = 0; i < reject.length; i++) {
                    var num3 = get.FrBuffNum(player, reject[i]);
                    if (!num3) continue;
                    if (num3 > num2) num3 = num2;
                    rejectCost += num3;
                    num2 -= rejectCost;
                    var rejectBuff = get.FrBuffName(reject[i]);
                    player.storage[rejectBuff] -= num3;
                    player.syncStorage(rejectBuff);
                    if (player.storage[rejectBuff] <= 0) {
                        player.removeAdditionalSkill('Fr_Buff', rejectBuff);
                        player.unmarkSkill(rejectBuff);
                    }
                    event.rejectCost = rejectCost;
                    if (num2 <= 0) break;
                }
            }
            if (!player.storage[to]) player.storage[to] = 0;
            num2 = Math.min(get.FrBuffInfo(to, 'limit') - player.storage[to], num2);
            player.storage[to] += num2;
            player.syncStorage(to);
            if (player.storage[to] > 0) {
                player.addAdditionalSkill('Fr_Buff', to, true);
                player.markSkill(to);
            } else {
                player.removeAdditionalSkill('Fr_Buff', to);
                player.unmarkSkill(to);
            }
            game.log(player, '的', Math.abs(num1), '层「', from, '」', '转化成了', Math.abs(num2), '层「', to, '」');
        });
        return next;
    };
    //方法game.changeFrBuff的封装
    lib.element.player.changeFrBuff = function () {
        return game.changeFrBuff(this, ...arguments);
    };
    //方法game.changeFrBuffTo的封装
    lib.element.player.changeFrBuffTo = function () {
        return game.changeFrBuffTo(this, ...arguments);
    };
    //获得目标角色已有的Buff种类数目（可设置不算在内的Buff）
    lib.element.player.countFrBuff = function (filter) {
        var buffs = get.FrBuffList(this);
        return buffs.reduce((accumulator, currentElement) => {
            if (filter(currentElement)) {
                return accumulator + 1;
            } else {
                return accumulator;
            }
        }, 0);
    };
    //获取目标角色符合条件的buff
    lib.element.player.getFrBuff = function (filter) {
        var buffs = get.FrBuffList(this);
        return buffs.filter(i => filter(i))
    };
    //增加buff
    lib.element.player.addFrBuff = function () {
        var next = game.createEvent('addFrBuff')
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'number') {
                next.num = arguments[i]
            } else if (typeof arguments[i] == 'string') {
                next.buff = arguments[i]
            } else if (get.itemtype(arguments[i]) == 'player') {
                next.source = arguments[i]
            }
        }
        next.player = this
        if (!next.source) next.source = 'nosource'
        if (next.num == undefined) next.num = 1
        next.setContent(function () {
            'step 0'
            if (!event.buff) return event.finish()
            if (game.checkMod(player, event.buff, 'addFrBuff', false, 'FrBuffIgnore', player)) {
                return event.finish()
            }
            event.num = Math.min(get.FrBuffLimit(event.buff) - player.countFrBuffNum(event.buff), event.num)
            if (event.num <= 0) return event.finish()
            'step 1'
            event.trigger('addFrBuffBegin1')
            'step 2'
            if (event.source != 'nosource') event.source.line(player)
            game.changeFrBuff(player, event.source, event.buff, event.num)
            'step 3'
            event.trigger('addFrBuffSource')
        })
        return next
    }
    //减少buff
    lib.element.player.reduceFrBuff = function () {
        var next = game.createEvent('reduceFrBuff')
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'number') {
                next.num = arguments[i]
            }
            else if (typeof arguments[i] == 'string') {
                if (['naturalLose', 'isReject'].contains(arguments[i])) {
                    next[arguments[i]] = true;
                } else {
                    next.buff = arguments[i];
                }
            } else if (get.itemtype(arguments[i]) == 'player') {
                next.source = arguments[i]
            }
        }
        next.player = this
        if (next.source == undefined) next.source = 'nosource'
        if (next.num == undefined) next.num = 1
        next.setContent(function () {
            'step 0'
            if (game.checkMod(player, event.buff, 'reduceFrBuff', false, 'FrBuffIgnore', player)) return event.finish()
            if (event.buff == undefined) return event.finish()
            event.num = Math.min(player.countFrBuffNum(event.buff), event.num)
            if (event.num <= 0) return event.finish()
            'step 1'
            event.trigger('reduceFrBuffBegin1')
            'step 2'
            event.trigger('reduceFrBuffBegin2')
            'step 3'
            if (event.source !== 'nosource') event.source.line(player)
            var arg1 = event.naturalLose ? 'naturalLose' : undefined
            var arg2 = event.isReject ? 'isReject' : undefined
            game.changeFrBuff(player, event.source, get.FrBuffName(event.buff), -event.num, arg1, arg2)
            'step 3'
            event.trigger('reduceFrBuffSource')
        })
        return next
    }
    lib.element.player.addTempFrBuff = function () {
        var source, num, expire, losetype, buff
        for (var i in arguments) {
            if (get.itemtype(arguments[i]) == 'player') {
                source = arguments[i]
            } else if (typeof arguments[i] == 'number') {
                num = arguments[i]
            } else if (['array', 'object'].contains(get.objtype(arguments[i]))) {
                expire = arguments[i]
            } else if (['naturalLose', 'isReject'].contains(arguments[i])) {
                losetype = arguments[i]
            } else {
                buff = arguments[i]
            }
        }
        if (!num) num = 1
        num = Math.min(num, get.FrBuffLimit(buff) - this.countFrBuffNum(buff))
        if (num > 0) {
            if (!expire) {
                expire = {
                    global: ['phaseAfter', 'phaseBefore']
                }
            } else if (Array.isArray(expire) || typeof expire == 'string') {
                expire = {
                    global: expire
                }
            }
            this.when(expire).then(() => {
                var skillinfo = lib.skill[event.name]
                var buff = skillinfo.buff
                var num = skillinfo.num
                var type = skillinfo.type
                if (num > 0 && player.hasFrBuff(buff)) {
                    player.reduceFrBuff(buff, num, type)
                }
            }).assign({
                buff: buff,
                num: num,
                type: losetype
            })
        }
        return this.addFrBuff(buff, num, source)
    }
    //清除Buff
    lib.element.player.clearFrBuff = function (buff, type) {
        var player = this
        var num = player.countFrBuffNum(buff)
        return player.reduceFrBuff(buff, num, type)
    }
    //封装获取Buff
    lib.element.player.countFrBuffNum = function (buff) {
        var player = this
        return get.FrBuffNum(player, buff)
    }
    //判断是否拥有Buff
    lib.element.player.hasFrBuff = function (filter) {
        var player = this
        var buffs = get.FrBuffList(player)
        if (typeof filter == 'string') {
            if (player.countFrBuffNum(filter) > 0) {
                return true
            } else {
                return false
            }
        } else if (typeof filter == 'function') {
            return buffs.some(i => filter(i))
        }
    }
    //判断其是否免疫该种Buff
    lib.element.player.isImmFrBuff = function (buff) {
        var player = this
        return game.checkMod(player, buff, false, 'ImmerFrBuff', player)
    };
})
window.furry.frImport(function (lib, game, ui, get, ai, _status) {
    //---------------------------------------设置：显示手牌上限------------------------------------------//
    if (lib.config.extension_福瑞拓展_AIchooseCharacter) {
        lib.skill._AichooseCharacter = {
            trigger: {
                global: 'gameStart',
            },
            firstDo: true,
            ruleSkill: true,
            direct: true,
            filter: (event, player) => player == game.me && get.mode() != 'guozhan',
            content: function () {
                'step 0'
                player.chooseTarget('选择你要替换的角色').set('ai', (target) => -1)
                'step 1'
                if (result.bool) {
                    event.target = result.targets[0]
                } else {
                    event.finish()
                }
                'step 2'
                player.chooseText().set('prompt', '是否发动AI选将？').set('prompt2', '请输入武将的英文名/中文名/拼音')
                    .set('filterText', function (value) {
                        return get.findOrigin(value).length > 0
                    }).set('ai', () => -1)
                'step 3'
                if (result.bool) {
                    var list = get.findOrigin(result.text)
                    var dialog = ui.create.dialog('请选择一张武将牌', 'hidden');
                    dialog.add([list, 'character']);
                    player.chooseButton(dialog, true).set('ai', function (button) {
                        return Math.random()
                    })
                } else {
                    event.goto(0)
                }
                'step 4'
                if (result.bool) {
                    var initSkill = get.arraysIntersection(game.players.map(i => i.skills))
                    event.target.skills.forEach(i => event.target.removeSkill(i))
                    event.target.skills = initSkill
                    event.target.init(result.links[0])
                    if (get.mode() == 'doudizhu' && event.target.identity == 'zhu') {
                        event.target.addSkill('feiyang')
                        event.target.addSkill('bahu')
                        event.target.gainMaxHp()
                        event.target.hp++
                    }
                    if (!lib.character[result.links[0]][4].contains("hiddenSkill")) {
                        event.target.showCharacter(2, false)
                    }
                    if (get.is.double(result.links[0])) {
                        player.chooseControl(get.is.double(result.links[0], true)).set('prompt', '请选择你的势力');
                    } else {
                        event.goto(0)
                    }
                } else {
                    event.goto(0)
                }
                'step 5'
                event.target.group = result.control
                event.goto(0)
            }
        }
    }
    lib.skill._mp = {
        trigger: {
            global: ['roundStart', 'gameStart'],
            player: 'phaseBefore',
        },
        forced: true,
        direct: true,
        unique: true,
        charlotte: true,
        locked: true,
        filter: function (event, player) {
            return !player.isShowMp && player.getSkills(true).some(skill => lib.skill[skill].mpSkill);
        },
        content: function () {
            game.createfrMpBar(player)
        },
    };
    lib.skill._qianghua = {
        enable: 'phaseUse',
        usable: 1,
        unique: true,
        charlotte: true,
        locked: true,
        filter: function (event, player) {
            if (player.hasSkill('_qianghua_effect')) return false;
            return player.getSkills(true).some(skill => lib.skill[skill].qianghua);
        },
        filterCard: true,
        selectCard: function () {
            if (ui.selected.cards.length) return 2;
            return [0, 2];
        },
        check: card => 5 - get.value(card),
        content: function () {
            'step 0'
            if (!cards.length) player.loseHp();
            player.addSkill('_qianghua_effect');
        },
        ai: {
            order: 14,
            result: {
                player: function (player) {
                    if (player.hp < 3) return -1;
                    if (player.countCards('hs', { name: ['jiu', 'tao'] })) return 1;
                    return 0;
                },
            },
            threaten: 2,
        },
        subSkill: {
            effect: {
                charlotte: true,
                mark: true,
                intro: {
                    content: '你当前处于强化状态',
                },
                sub: true,
            },
        },
    };
    lib.translate._qianghua = "强化";
    lib.translate._qianghua_info = "出牌阶段限一次，你可以失去1点体力或弃置两张牌，然后你进入“<a style='color:#FF0000' href=\"javascript:window.furryIntroduce('qianghua_buff');\">强化</a>”状态。";
    // ---------------------------------------游戏开始时加载------------------------------------------//	
    lib.skill._gameStart = {
        charlotte: true,
        ruleSkill: true,
        trigger: { global: ['roundStart', 'phaseBefore'] },
        filter: function () { return !game._started; },
        direct: true,
        priority: 1000,
        content: function () {
            game._started = true;
        },
    };
    //-------------------------------属性效果------------------------------
    lib.skill._define_damage = {
        trigger: {
            player: "damageAfter",
        },
        forced: true,
        priority: Infinity,
        filter: function (event, player) {
            if (event.nature) return true;
            return false;
        },
        content: function () {
            'step 0'
            if (trigger.hasNature("frmad")) {
                trigger.player.addFrBuff('chuxue', trigger.num)
            }
        },
    }
    //此处内容由钫酸酱制作，若有需要请联系作者...
    lib.skill._definedSweap = {
        firstDo: true,
        trigger: { player: ['chooseNumberBegin', 'chooseTextBegin', 'chooseButtonControlBegin'] },
        forced: true,
        priority: 100,
        forceDie: true,
        popup: false,
        filter: function (event, player) {
            if (event.autochoose && event.autochoose()) return false;
            if (lib.filter.wuxieSwap(event)) return false;
            if (_status.auto || !player.isUnderControl()) return false;
            return true;
        },
        content: function () {
            game.swapPlayerAuto(player);
        },
    }
    //---------------------------------------设置：显示手牌上限------------------------------------------//
    if (lib.config.extension_福瑞拓展_ShowmaxHandcard) {
        lib.skill._ShowmaxHandcard = {
            trigger: {
                global: ['gameStart', 'roundStart'],
            },
            forced: true,
            popup: false,
            silent: true,
            content: function () {
                var interval = setInterval(() => {
                    if (!ui.window.contains(player)) return clearInterval(interval);
                    var numh = player.countCards('h');
                    var nummh = player.getHandcardLimit();
                    if (nummh == Infinity) nummh = '∞';
                    player.node.count.innerHTML = numh + '/' + nummh;
                },
                    100);
            },
        };
    };
    //---------------------------------------设置：主内单挑音乐------------------------------------------//
    if (lib.config.extension_福瑞拓展_furry_zhuneimusic != 'z0') {
        lib.skill._furry_zhuneibgm = {
            trigger: {
                global: "dieAfter",
            },
            forced: true,
            nobracket: true,
            priority: -Infinity,
            ruleSkill: true,
            filter: function (event, player) {
                return game.players.length == 2 && get.population('nei') > 0 && get.population('zhu') > 0 && get.mode() == 'identity'
            },
            content: function () {
                switch (lib.config.extension_福瑞拓展_furry_zhuneimusic) {
                    case 'z1': str = 'fr_bgm_Hopes And Dreams.mp3'; break;
                    case 'z2': str = 'fr_bgm_MEGALOVANIA.mp3'; break;
                    case 'z3': str = 'fr_bgm_ElDorado.mp3'; break;
                    case 'z4': str = 'furry_bgm_BOSS BATTLE：BIG ARMS.mp3'; break
                }
                ui.backgroundMusic.src = lib.assetURL + 'extension/福瑞拓展/audio/bgm/' + str
                ui.backgroundMusic.loop = true;
            },
        }
    }
    //---------------------------------作弊技能---------------------------
    lib.skill._xuanshi = {
        trigger: {
            player: ["phaseZhunbeiBegin"],
            global: "roundStart",
        },
        forceunique: true,
        fixed: true,
        mark: true,
        direct: true,
        charlotte: true,
        supercharlotte: true,
        filter: function (event, player) {
            return lib.config.extension_福瑞拓展_xuanshi && player == game.me;
        },
        content: function () {
            "step 0"
            var skills = [];
            for (var i in lib.character) {
                for (var j = 0; j < lib.character[i][3].length; j++) {
                    if (player.hasSkill(lib.character[i][3][j])) continue;
                    var info = lib.skill[lib.character[i][3][j]];
                    if (info && !(info.hiddenSkill || info.combo)) {
                        skills.add(lib.character[i][3][j]);
                    }
                }
            }
            event.skills = skills
            player.chooseText(6, event.skills.map(i => get.translation(i))).set('ai', function () {
                return get.translation(skills.randomGet())
            }).set('prompt', get.prompt2('_xuanshi'))
            "step 1"
            if (!result.bool) {
                event.finish();
                return;
            }
            event.choice = event.skills.filter(item => get.translation(item) == result.text);
            if (event.choice.length == 1) event.skill = event.choice[0];
            else {
                var next = player.chooseControl();
                next.set('choiceList', event.choice.map(skill => get.translation(skill + '_info')));
                next.set('prompt', '选择〖' + get.translation(event.choice[0]) + '〗的版本');
            }
            "step 2"
            if (result.control) event.skill = event.choice[result.index]
            player.addTempSkill(event.skill, 'roundStart');
            player.popup(event.skill);
            game.log(player, '声明了', '#g' + '【' + get.translation(event.skill) + '】');
        },
        ai: {
            threaten: 6,
        },
    },
        lib.translate._xuanshi = "宣誓";
    lib.translate._xuanshi_info = "一轮游戏开始时或准备阶段，你可以声明一个非隐匿技，然后你拥有此技能直到本轮结束。";
    lib.skill._Frhuiwan = {
        trigger: {
            player: "drawBegin",
        },
        filter: function (event, player) {
            if (lib.config.extension_福瑞拓展_huiwan_player && game.me == player) return true;
            if (lib.config.extension_福瑞拓展_huiwan_ai && game.me != player) return true;
            return false;
        },
        charlotte: true,
        direct: true,
        content: function () {
            trigger.setContent(lib.skill._Frhuiwan.drawContent);
        },
        drawContent: function () {
            'step 0'
            if (typeof event.minnum == 'number' && num < event.minnum) num = event.minnum;
            if (event.drawDeck) {
                if (event.drawDeck > num) event.drawDeck = num;
                num -= event.drawDeck;
            }

            event.cards = [];
            if (num > 0) {
                get.cards(num);
                var cards = Array.from(ui.cardPile.childNodes);
                cards.sort(function (b, a) {
                    if (a.name != b.name) return lib.sort.card(a.name, b.name);
                    else if (a.suit != b.suit) return lib.suit.indexOf(a) - lib.suit.indexOf(b);
                    else return a.number - b.number;
                }).reverse();
                var next = game.createEvent('chooseButton', false);
                next.player = player;
                next.forced = true;
                next.filterButton = lib.filter.filterButton;
                next.selectButton = [num, num];
                next.createDialog = ["作弊：请选择你最想要的" + get.cnNumber(num) + "张牌", cards, 'hidden'];
                next.ai = (button) => _status.event.player.getUseValue(button.link);
                next.forceDie = true;
                if (next.isMine() == false && next.dialog) next.dialog.style.display = 'none';
                if (next.ai == undefined) next.ai = function () { return 1 };
                next.setContent('chooseButton');
            }

            'step 1'
            if (result.bool) event.cards = result.links;

            if (event.drawDeck) {
                event.cards = event.cards.concat(player.getDeckCards(event.drawDeck));
            }
            if (event.log != false) {
                if (num > 0) {
                    if (event.bottom) game.log(player, '从牌堆底摸了' + get.cnNumber(num) + '张牌');
                    else game.log(player, '摸了' + get.cnNumber(num) + '张牌');
                }
                if (event.drawDeck) {
                    game.log(player, '从牌库中获得了' + get.cnNumber(event.drawDeck) + '张牌');
                }
            }
            if (event.animate != false) {
                if (event.visible) {
                    var next = player.gain(event.cards, 'gain2');
                    if (event.bottom) game.log(player, '从牌堆底摸了' + get.cnNumber(num) + '张牌（', event.cards, '）');
                    else game.log(player, '摸了' + get.cnNumber(num) + '张牌（', event.cards, '）');
                } else {
                    var next = player.gain(event.cards, 'draw');
                }
            } else {
                var next = player.gain(event.cards);
                if (event.$draw) player.$draw(event.cards.length);
            }

            if (event.gaintag) next.gaintag.addArray(event.gaintag);
            event.result = event.cards;
        },
        ai: {
            viewHandcard: true,
            skillTagFilter: function (player, tag, arg) {
                if (player == arg) return false;
                if (lib.config.extension_福瑞拓展_player && game.me == player) return true;
                if (lib.config.extension_福瑞拓展_ai && game.me != player) return true;
                return false;
            },
        },
    }
    lib.translate._huiwan = '作弊';
    lib.translate._huiwan_info = '你可以指定你摸到的牌！';
    //-----------------破碎勾玉----------------------//
    lib.translate['_fr_Broken'] = '碎玉';
    lib.skill._fr_Broken = {
        trigger: {
            player: 'damageBegin4',
        },
        firstDo: true,
        direct: true,
        filter: function (event, player) {
            return player.countMark('_fr_Broken') > 0 && event.num > 0;
        },
        mod: {
            maxHandcard: function (player, num) {
                return num + player.countMark('_fr_Broken') || 0;
            },
        },
        content: function () {
            'step 0'
            var num = Math.min(player.countMark('_fr_Broken'), trigger.num);
            trigger.num -= num
            player.removeMark('_fr_Broken', num, false);
            game.log(player, '失去了', get.translation(num), '个', '#g碎玉');
        },
        markimage: 'extension/福瑞拓展/image/others/BrokenHp.png',
        intro: {
            name: '碎玉',
            content: '碎玉数：#',
        },
    };
    lib.skill._fr_unBroken = {
        enable: 'phaseUse',
        firstDo: true,
        filter: function (event, player) {
            return player.countMark('_fr_Broken') > 0;
        },
        usable: 1,
        check: function (card) {
            return 7 - get.value(card)
        },
        filterCard: true,
        selectCard: function () {
            var player = _status.event.player
            return [1, player.countMark('_fr_Broken')]
        },
        position: 'he',
        content: function () {
            'step 0'
            var num = cards.length
            player.Frunbroken(num)
        },
    };
    lib.translate['_fr_unBroken'] = '补玉';
    lib.translate['_fr_unBroken_info'] = '出牌阶段限一次，你可以弃置至多X张牌（X为你的碎玉数），然后' + get.frIntroduce('xiubu') + 'X个碎玉。';
})
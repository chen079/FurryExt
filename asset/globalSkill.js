window.furry.frImport(function (lib, game, ui, get, ai, _status) {
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
    lib.skill._Furry_changeLog = {
        charlotte: true,
        ruleSkill: true,
        trigger: {
            global: [/*'chooseButtonBefore',*/'gameStart', 'gameDrawAfter', 'phaseBefore']
        },
        filter: function (event, player) {
            //if(event.name=='chooseButton'&&event.parent.name!='chooseCharacter') return false;
            return !lib.config.extension_福瑞拓展_Frversion || lib.config.extension_福瑞拓展_Frversion != lib.extensionPack.福瑞拓展.version;
        },
        direct: true,
        priority: Infinity,
        content: function () {
            game.saveConfig('extension_福瑞拓展_Frversion', lib.extensionPack.福瑞拓展.version);
            game.showFrChangeLog();
        },
    };
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
            if (trigger.nature == "mad") {
                trigger.player.addFrBuff('mad', 1)
            }
        },
    }
    //--------------------------------阵亡配音:感谢群友DIY扩展参考------------------------
    lib.skill._FrDieAudio = {
        trigger: {
            global: 'dieBegin',
        },
        priority: -Infinity,
        superCharlotte: true,
        charlotte: true,
        unique: true,
        direct: true,
        content: function () {
            let pack;
            for (let i in lib.characterPack) {
                if (lib.characterPack[i] && lib.characterPack[i][trigger.player.name]) {
                    pack = i;
                    break;
                }
            }
            if (pack) game.playAudio('..', 'extension', '福瑞拓展/audio/die', trigger.player.name);
        },
    };
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
})
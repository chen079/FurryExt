window.furry.frImport(function (lib, game, ui, get, ai, _status) {
    //---------------------------------------定义Buff-----------------------------------------//
    //现在定义新的Buff时，在lib.FrBuff中请不要加前缀Fr_Buff_
    lib.FrBuff = {
        //睡眠
        "sleep": {
            intro: {
                name: "睡眠",
                content: "<li>自然衰减：<b>是</b><li>上限：1<li>类型：减益<br><li>你不能使用或打出手牌。<br><li>你受到伤害后，移除1层「睡眠」。",
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
                player.reduceFrBuff("sleep", 1);
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
                content: "<li>自然衰减：<b>是</b><li>上限：5<li>类型：减益<br><li>自然衰减后，你随机弃置1张牌",
            },
            trigger: {
                player: "reduceFrBuffAfter",
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
                content: "<li>自然衰减：<b>是</b><li>上限：3<li>类型：减益<br><li>自然衰减后，你须选择一项：1.弃置2张牌，2.受到1点火焰伤害；。",
            },
            trigger: {
                player: "reduceFrBuffAfter",
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff('dragonfire') && event.naturalLose && event.buff == 'dragonfire'
            },
            content: function () {
                'step 0'
                game.log(player, '受「<font color=black>龙焰</font>」影响');
                player.chooseToDiscard(2, '龙焰：弃置两张手牌或受到1点火焰伤害')
                'step 1'
                if (!result.bool) {
                    player.damage(1, 'fire')
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
                content: "<li>自然衰减：<b>是</b><li>上限：3<li>类型：减益<br><li>你受到伤害时，伤害值+1，然后移除1层「<font color=red>易伤</font>」。<br><li>与「坚韧」冲突。",
            },
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
                content: "<li>自然衰减：<b>是</b><li>上限：3<li>类型：增益<br><li>你受到伤害时，伤害值-1，然后移除1层「<font color=green>坚韧</font>」。<br><li>与「易伤」冲突。",
            },
            trigger: {
                player: "damageBegin",
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
                'step 1'
                player.reduceFrBuff("jianren");
            },
            FrBuffInfo: {
                naturalLose: true,
                limit: 3,
                type: ['buff'],
                buffRank: {
                    basic: [3, 0],
                    add: [0.1, 0],
                },
                BuffReject: ['yishang'],
            },
        },
        //压制
        "yazhi": {
            intro: {
                name: "压制",
                content: "<li>自然衰减：<b>是</b><li>类型：减益<br><li>你的攻击范围-X。",
            },
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
                content: "<li>自然衰减：<b>是</b><li>类型：减益<br><li>当你受到冰属性伤害时，你移除X层「<font color=fire>燃烧</font>」。<br>自然衰减后，你受到1点无来源火属性伤害。",
            },
            trigger: {
                player: ["damage", "reduceFrBuffAfter"],
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
                }
            }
        },
        //预见
        "yujian": {
            intro: {
                name: "预见",
                content: "<li>自然衰减：<b>是</b><li>类型：增益<br><li>你的回合外，当前回合角色手牌对你可见。<br><li>你在一回合内首次摸牌前〖观星2〗。",
            },
            trigger: {
                player: "drawBefore",
            },
            usable: 1,
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff("yujian")
            },
            content: function () {
                player.chooseToGuanxing(2);
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
                content: "<li>自然衰减：<b>是</b><li>上限：3<li>类型：减益<br><li>你不能使用或打出实体的【杀】和【无懈可击】。",
            },
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
                content: "<li>自然衰减：<b>是</b><li>类型：增益<br><li>你的【杀】命中后，令此【杀】不计入次数并弃置目标X张牌，然后移除一层「<font color=fire>亢奋</font>」；<br><li>你的攻击范围+X，你的手牌上限-X。",
            },
            trigger: {
                player: "shaHit",
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                return player.hasFrBuff('kangfen')
            },
            content: function () {
                game.log(player, '受「<font color=red>亢奋</font>」影响');
                if (trigger.parent.addCount != false) {
                    trigger.parent.addCount = false;
                    game.log(player, '使用的', trigger.card, '不计入次数限制');
                    player.getStat().card.sha--;
                }
                var num = player.countFrBuffNum("kangfen");
                if (trigger.target.countDiscardableCards(player, 'he') > 0) player.discardPlayerCard(trigger.target, num, 'he', true);
                player.reduceFrBuff('kangfen')
            },
            mod: {
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
                type: 'buff',
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
                content: "<li>自然衰减：<b>否</b><li>类型：增益<br><li>你造成伤害后，回复一点体力；你回复体力后，移除一层「<font color=red>嗜血</font>」。",
            },
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
                buffRank: {
                    basic: [2, 0],
                },
            }
        },
        //重伤
        "zhongshang": {
            intro: {
                name: "重伤",
                content: "<li>自然衰减：<b>是</b><li>类型：减益<br><li>你回复体力时，移除一层「<font color=green>重伤</font>」并令此次回复量-1。",
            },
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
                content: "<li>自然衰减：<b>是</b><li>类型：减益<br><li>你回复体力后，移除一层「<font color=green>中毒</font>」，自然衰减后，失去一点体力。",
            },
            trigger: {
                player: ["recoverAfter", "reduceFrBuffAfter"],
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
                naturalLose: false,
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
                content: "<li>自然衰减：<b>是</b><li>上限：3<li>类型：增益<br><li>你的判定会朝着对你有利的方向倾斜。判定完成后，移除一层「<font color=yellow>祈愿</font>」<br><li>与「灾厄」冲突。",
            },
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
                content: "<li>自然衰减：<b>是</b><li>上限：3<li>类型：减益<br><li>你的判定会朝着对你不利的方向倾斜，判定完成后，移除一层「<font color=purple>灾厄</font>」。<br><li>与「祈愿」冲突。",
            },
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
        //圣光
        "shengguang": {
            intro: {
                name: "圣光",
                content: "<li>自然衰减：<b>否</b><li>类型：增益<br><li>你的准备阶段结束后，若你有其他种类的buff，则移除所有buff各一层。",
            },
            trigger: {
                player: "phaseZhunbeiAfter",
            },
            forced: true,
            silent: true,
            priority: 3,
            filter: function (event, player) {
                if (!player.hasFrBuff('shengguang')) return false;
                return get.FrBUFFList(player).length > 1;
            },
            content: function () {
                game.log(player, '受「<font color=#FFF8D7>圣光</font>」影响');
                for (var i in lib.FrBUFF) {
                    if (player.countFrBuffNum(i) == 0) continue;
                    player.reduceFrBuff(i)
                }
            },
            FrBuffInfo: {
                naturalLose: false,
                buffRank: {
                    basic: [0, 0],
                },
            }
        },
        //麻痹
        "mabi": {
            intro: {
                name: "麻痹",
                content: "<li>自然衰减：<b>否</b><li>类型：减益<br><li>你不能响应其他角色对你使用的牌；你使用♣牌时，移除一层「<font color=red>麻痹</font>」。",
            },
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
                buffRank: {
                    basic: [0, 1.5],
                },
            }
        },
        
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
                        BuffReject:[],（与之冲突的Buff，在附加时若有与之冲突的Buff，则会先削减冲突的Buff）
                    }
                }
        */
    };
    for (var i in lib.FrBuff) {
        var Buff = lib.FrBuff[i];
        var name = 'Fr_Buff_' + i;
        lib.skill[name] = Buff;
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
    lib.translate["_naturalLoseFrBuff"] = "自然衰减";
    lib.skill["_naturalLoseFrBuff"] = {
        trigger: {
            player: "phaseAfter",
        },
        forced: true,
        popup: false,
        priority: Infinity,
        content: function () {
            'step 0'
            event.buffList = Object.keys(lib.FrBuff)
            'step 1'
            var buff = event.buffList.shift()
            if (lib.FrBuff[buff].FrBuffInfo.naturalLose && player.hasFrBuff(buff)) {
                player.reduceFrBuff(buff, 1, 'naturalLose');
            }
            'step 2'
            if (event.buffList.length) event.goto(1)
        }
    };
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
        name = get.FrBuffName(name, false);
        var Buff = get.FrBuffName(name);
        var list = [lib.skill[Buff].FrBuffInfo.BuffRank];
        player.getSkills(null, false, false).filter(function (i) {
            if (lib.skill[i] && lib.skill[i].ai && lib.skill[i].ai.BuffRank_extra &&
                lib.skill[i].ai.BuffRank_extra[name]) {
                list.push(lib.skill[i].ai.BuffRank_extra[name]);
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
                BuffRank_extra:{
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
            }
            list.push(Buff);
        }
        return list;
    };
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
                    next.Buff = get.FrBuffName(arguments[i]);
                }
            } else if (typeof arguments[i] == 'number' && !next.num) {
                next.num = arguments[i];
            }
        }
        if (next.source == undefined) next.source = 'nosource'
        if (!next.num) next.num = 1;
        next.setContent(function () {
            "step 0"
            if (this.isReject) {
                event.goto(3);
            } else {
                this.trigger('changeFrBuffToBegin1'); //事件开始，取消事件的地方
            }
            "step 1"
            this.trigger('changeFrBuffToBegin2'); //事件开始，修改事件参数的地方
            "step 2"
            if (!lib.FrBuff[get.FrBuffName(this.Buff, false)]) {
                event.finish();
            } else if (this.num <= 0) {
                event.goto(3);
            } else {
                var reject = get.FrBuffInfo(this.Buff, 'BuffReject');
                if (reject.length && this.num > 0) {
                    for (var i = 0; i < reject.length; i++) {
                        var num2 = get.FrBuffNum(this.player, reject[i]);
                        if (!num2) continue;
                        game.changeFrBuff(this.player, reject[i], -this.num, 'isReject');
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
                var Buff = this.Buff;
                var num = this.num;
                var tip1, tip2;
                if (this.num > 0) {
                    if (!this.player.storage[Buff]) {
                        this.player.storage[Buff] = 0;
                        tip1 = '附加了';
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
                    tip2 = get.translation(this.source)
                } else {
                    tip2 = ''
                }
                this.player.storage[Buff] += num;
                this.player.syncStorage(Buff);
                if (this.player.storage[Buff] > 0) {
                    player.addAdditionalSkill('Fr_Buff', Buff, true);
                    this.player.markSkill(Buff);
                } else {
                    player.removeAdditionalSkill('Fr_Buff', Buff);
                    this.player.unmarkSkill(Buff);
                }
                game.log(this.player, this.source != 'nosource' ? '因' : '', '#b' + tip2, tip1, Math.abs(num), '层', '#g「' + get.translation(Buff) + '」');
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
    lib.element.player.changeFrBuff = function (arg1, arg2) {
        return game.changeFrBuff(this, arg1, arg2);
    };
    //方法game.changeFrBuffTo的封装
    lib.element.player.changeFrBuffTo = function (arg1, arg2, arg3, arg4) {
        return game.changeFrBuffTo(this, arg1, arg2, arg3, arg4);
    };
    //获得目标角色已有的Buff种类数目（可设置不算在内的Buff）
    lib.element.player.countFrBuff = function (except) {
        if (Array.isArray(except)) {
            for (var i = 0; i < except.length; i++) {
                except[i] = get.FrBuffName(except[i], false);
            }
        } else {
            except = [get.FrBuffName(except, false)];
        }
        var num = 0;
        for (let i of lib.FrBuff) {
            if (except.contains(i)) continue;
            if (get.FrBuffNum(this, i) > 0) num++;
        }
        return num;
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
        if (next.buff == undefined) return
        if (next.num <= 0) return
        next.setContent(function () {
            'step 0'
            game.changeFrBuff(player, event.source, event.buff, event.num)
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
        if (next.buff == undefined) return
        if (next.num <= 0) return
        next.setContent(function () {
            'step 0'
            var arg1 = event.naturalLose ? 'naturalLose' : undefined
            var arg2 = event.isReject ? 'isReject' : undefined
            game.changeFrBuff(player, event.source, get.FrBuffName(event.buff), -event.num, arg1, arg2)
        })
        return next
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
    lib.element.player.hasFrBuff = function (buff) {
        var player = this
        if (player.countFrBuffNum(buff) > 0) {
            return true
        } else {
            return false
        }
    }
    //判断其是否免疫该种Buff
    lib.element.player.isImmFrBuff = function (name) {
        name = get.FrBuffName(name);
        var skills = player.getSkills(null, false, false);
        for (let i of skills) {
            if (lib.skill[i] && lib.skill[i].ai &&
                lib.skill[i].ai.BuffRank_extra &&
                lib.skill[i].ai.BuffRank_extra[name]) {
                if (lib.skill[i].ai.BuffRank_extra[name].immunity === true) {
                    return true;
                }
            }
        }
    };
})
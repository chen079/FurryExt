game.import('card', function (lib, game, ui, get, ai, _status) {
    var furryCard = {
        name: 'furryCard',//卡包命名
        connect: true,//卡包是否可以联机
        card: {
            "fr_card_zfxd":{
                image:'ext:福瑞拓展/image/card/fr_card_zfxd.png',
                audio:true,
                fullskin:true,
                type:"trick",
                enable:true,
                singleCard:true,
                complexSelect:true,
                complexTarget:true,
                multicheck:function(){
                    return game.hasPlayer(function(current){
                        return game.hasPlayer(function(current2){
                            return current.inRange(current2)
                        })
                    });
                },
                filterTarget:function(card,player,target){
                    return target.isAlive()&&game.hasPlayer(function(current){
                        return target!=current&&target.inRange(current)
                    });
                },
                filterAddedTarget:function(card,player,target,preTarget){
                    return target!=preTarget&&preTarget.isIn()&&target.isIn()&&preTarget.inRange(target)&&ui.selected.targets.length<=1
                },
                chongzhu:true,
                content: function () {
                    'step 0'
                    if(!target||!event.addedTarget||!target.isIn()||!event.addedTarget.isIn()){
                        event.finish()
                    }
                    var card1 = game.createCard('sha')
                    var card2 = game.createCard('shan')
                    event.cards = [card1, card2]
                    'step 1'
                    if(target&&target.isIn()){
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
                    }else{
                        event.finish()
                    }
                    'step 2'
                    if(event.addedTarget&&event.addedTarget.isIn()){
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
                    }else{
                        event.finish()
                    }
                    'step 3'
                    event.card2 = result.links[0];
                    'step 4'
                    if(target&&target.isIn()) target.showCards(event.card1)
                    if(event.addedTarget.isIn()) event.addedTarget.showCards(event.card2)
                    "step 5"
                    if(target&&event.addedTarget&&target.isIn()&&event.addedTarget.isIn()){
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
                    wuxie:function(target,card,player,viewer){
                        if(player==game.me&&get.attitude(viewer,player)>0){
                            return 0;
                        }
                    },
                    basic:{
                        order:5,
                        useful:1,
                        value:5.5,
                    },
                    result:{
                        target:-1.5,
                        player:function(player){
                            if(game.players.length<3) return 1
                            return 1.5;
                        },
                    },
                },
                tag:{
                    gain:1,
                    loseHp:1,
                    damage:1,
                },
                selectTarget:1,
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
                    if(result.bool){
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
                    }else{
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
                chongzhu:true,
                toself: true,
                selectTarget: -1,
                modTarget: true,
                filterTarget: function (card, player, target) {
                    return target == player;
                },
                content: function () {
                    target.stat.push({ card: {}, skill: {} });
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
                filterTarget: true,
                selectTarget: 1,
                content: function () {
                    target.addTempSkill('card_sx', { player: "phaseAfter" })
                    target.addSkill('card_sx_add')
                },
                ai: {
                    tag: {
                        norepeat: 1,
                    },
                    basic: {
                        order: 7.2,
                        useful: [2, 1],
                        value: 7,
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
                    var choiceList = []
                    for (var i = 0; i < list.length; i++) {
                        choiceList.push(get.translation(list[i] + '_card_config'))
                    }
                    if(player.isUnderControl()){
                        game.swapPlayerAuto(player);
                    }
                    if (event.isMine()) {
                        var dialog = ui.create.dialog('forcebutton');
                        dialog.add('选择一个卡牌包');
                        var clickItem = function () {
                            _status.event._result = this.link;
                            dialog.close();
                            game.resume();
                        };
                        for (var i = 0; i < choiceList.length; i++) {
                            var item = dialog.add('<div class="popup pointerdiv" style="width:100%;display:inline-block"><div class="skill">【' + choiceList[i] + '】</div><div style="text-align:center">点击选择>>>      </div></div>');
                            item.firstChild.addEventListener('click', clickItem);
                            item.firstChild.link = event.list[i];
                        }
                        dialog.add(ui.create.div('.placeholder'));
                        event.switchToAuto = function () {
                            event._result = list.randomGet()
                            dialog.close();
                            game.resume();
                        };
                        _status.imchoosing = true;
                        game.pause();
                    } else {
                        event._result = list.randomGet();
                    }
                    'step 1'
                    _status.imchoosing = false;
                    var list=[]
                    for(var i=0;i<lib.cardPack[result].length;i++){
                        if(lib.cardPack[result][i]=='fr_card_zh'|| lib.cardPack[result][i]=='gw_tunshi'|| lib.cardPack[result][i]=='fr_card_lyzq') continue
                        var name =lib.cardPack[result][i]
                        var type = get.type(name)
                        list.push([type, '', name])
                    }
                    event.list=list
                    game.log(target, '选择了', get.translation(result + '_card_config'))
                    'step 2'
                    target.chooseButton(['选择所需的卡牌', [event.list, 'vcard']],true).set('ai', function (button) {
                        return Math.random();
                    })
                    'step 3'
                    var name = result.links[0][2];
                    event.nature = result.links[0][3];
                    event.cardname = name;
                    var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
                    target.chooseControl(list).set('ai', function () {
                        return list.randomGet();
                    }).set('prompt', '选择此牌的点数');
                    'step 4'
                    event.number = result.control;
                    var list = ['diamond', 'spade', 'heart', 'club']
                    target.chooseControl(list).set('ai', function () {
                        return list.randomGet();
                    }).set('prompt', '选择此牌的花色');
                    'step 5'
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
                audio: true,
                fullskin: true,
                type: "trick",
                enable: true,
                selectTarget: 1,
                filterTarget: function (card, player, target) {
                    if (player == target) return false;
                    return target.countGainableCards(player, 'h') > 0 && player.inRange(target);
                },
                filter: function (event, player) {
                    if (player.countCards('h') == 0) return false;
                    return game.hasPlayer(function (current) {
                        return (current != player && get.distance(player, current, 'attack') <= 1 && current.countGainableCards(player, 'h') > 0);
                    });
                },
                content: function () {
                    'step 0'
                    if (target.countGainableCards(player, 'h')) {
                        player.gainPlayerCard([1, Math.min(5, target.countGainableCards(player, 'h'))], 'h', target, true);
                    }
                    'step 1'
                    player.chooseCard('h', result.cards.length, true, '交给' + get.translation(target) + get.cnNumber(result.cards.length) + '张手牌').set('ai', function (card) {
                        return 4 - get.value(card)
                    })
                    'step 2'
                    target.gain(result.cards, player, 'giveAuto')
                },
                ai: {
                    wuxie: function (target, card, player, viewer) {
                        if (get.attitude(viewer, player) > 0 && get.attitude(viewer, target) > 0) {
                            return 0;
                        }
                    },
                    basic: {
                        order: 4,
                        useful: 7,
                        value: 9,
                    },
                    result: {
                        target: function (player, target) {
                            if (get.attitude(player, target) <= 0) return ((target.countCards('h', function (card) {
                                return get.value(card, target) > 0 && card != target.getEquip('jinhe');
                            }) > 0) ? -0.3 : 0.3) * Math.sqrt(player.countCards('h'));
                        },
                        player: function (player, target) {
                            if (get.attitude(player, target) < 0 && !target.countCards('h', function (card) {
                                return get.value(card, target) > 0 && card != target.getEquip('jinhe');
                            })) {
                                return 0;
                            }
                            return 1;
                        },
                    },
                    tag: {
                        loseCard: 1,
                        gain: 1,
                    },
                },
            },
            "fr_card_gzbj": {
                image: 'ext:福瑞拓展/image/card/fr_card_gzbj.png',
                audio: true,
                fullskin: true,
                type: "trick",
                enable: true,
                selectTarget: -1,
                filterTarget: true,
                contentBefore: function () {
                    "step 0"
                    var global = game.filterPlayer()
                    lib.gzbj = 0
                    for (var i = 0; i < global.length; i++) {
                        lib.gzbj += global[i].countCards('h')
                    }
                    lib.gzbj = Math.floor(lib.gzbj / global.length)
                },
                content: function () {
                    "step 0"
                    var num = lib.gzbj - target.countCards('h')
                    if (num < 0) {
                        target.chooseToDiscard('h', -num, true)
                    } else if (num > 0) {
                        target.draw(num)
                    }
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
                            return lib.gzbj - target.countCards('h')
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
                    ui.clear();
                    if (event.created) return;
                    event.created = true;
                    if (event.isMine()) {
                        var node = ui.create.div('.add_skill');
                        event.node = node;
                        event.node.style.zIndex = "9999";
                        event.node.style.background = 'black';
                        event.node.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=50,finishOpacity=50)";
                        event.node.style.opacity = "0.7"
                        event.node.style.width = '400px';
                        event.node.style.height = '30px';
                        event.node.style.lineHeight = '30px';
                        event.node.style.fontFamily = 'xinwei';
                        event.node.style.fontSize = '30px';
                        event.node.style.padding = '10px';
                        event.node.style.left = 'calc(50% - 200px)';
                        event.node.style.top = 'calc(50% - 20px)';
                        event.node.style.whiteSpace = 'nowrap';
                        event.node.innerHTML = '请在此输入技能名称';
                        event.node.contentEditable = true;
                        event.node.style.webkitUserSelect = 'text';
                        event.node.style.textAlign = 'center';
                        var skillName = function (e) {
                            var skills = [];
                            for (var i in lib.character) {
                                for (var j = 0; j < lib.character[i][3].length; j++) {
                                    if (target.hasSkill(lib.character[i][3][j])) continue;
                                    var info = lib.skill[lib.character[i][3][j]];
                                    if (info) {
                                        var name = event.node.innerText;
                                        if (num) {
                                            if (get.translation(lib.character[i][3][j]) != name) continue;
                                            skills.add(lib.character[i][3][j]);
                                        } else {
                                            if (get.translation(lib.character[i][3][j]) != name || (info.fixed || info.yunlvSkill|| info.qianghua|| info.unique || info.zhuSkill || info.charlotte || info.hiddenSkill || info.juexingji || info.limited || info.dutySkill || (info.unique && !info.gainable))) continue;
                                            skills.add(lib.character[i][3][j]);
                                        }
                                    }
                                }
                            }
                            if (skills.length) {
                                ui.window.removeChild(event.node);
                                ui.window.removeChild(text);
                                ui.window.removeChild(button);
                                event.node.innerHTML = '';
                                event.skills = skills
                                game.resume();
                                return
                            }
                            else {
                                var name = event.node.innerText;
                                alert(((name.length == 0 || name == '请在此输入技能名称') ? '请先输入技能名称' : name + '不是一个可用的技能，请重新输入'));
                                //ui.clear();
                                event.node.innerHTML = '';
                                return;
                            }
                        };
                        ui.window.appendChild(event.node);
                        event.node.onfocus = function () {
                            event.node.innerHTML = '';
                        };
                        event.node.onkeydown = function (e) {
                            e.stopPropagation();
                            if (e.keyCode == 13) {
                                skillName();
                                setTimeout(function () {
                                    event.node.innerHTML = '';
                                }, 10);
                            };
                        };
                        var text = ui.create.div();
                        text.style.zIndex = "9999"
                        text.style.width = '400px';
                        text.style.height = '30px';
                        text.style.lineHeight = '30px';
                        text.style.fontFamily = '黑体';
                        text.style.fontSize = '20px';
                        text.style.padding = '10px';
                        text.style.left = 'calc(50% - 200px)';
                        text.style.top = 'calc(50% - 80px)';
                        text.innerText = '请声明一个技能名称';
                        text.style.color = "white"
                        text.style.textAlign = 'center';
                        ui.window.appendChild(text);
                        var button = ui.create.div('.menubutton.highlight.large', '确定', function () {
                            skillName()
                        });
                        button.style.width = '70px';
                        button.style.left = 'calc(50% - 35px)';
                        button.style.top = 'calc(50% + 60px)';
                        ui.window.appendChild(button);
                        for (var i in lib.element.event) {
                            event.parent[i] = lib.element.event[i];
                        }
                        event.parent.custom = {
                            add: {},
                            replace: {}
                        }
                        game.pause();
                    } else {
                        var skills = [];
                        for (var i in lib.character) {
                            for (var j = 0; j < lib.character[i][3].length; j++) {
                                if (target.hasSkill(lib.character[i][3][j])) continue;
                                var info = lib.skill[lib.character[i][3][j]];
                                if (num) {
                                    if (info && (info.forced || info.mod || info.locked)) {
                                        skills.add(lib.character[i][3][j]);
                                    }
                                } else {
                                    if (info && (info.forced || info.mod || info.locked) && !(info.fixed || info.yunlvSkill|| info.qianghua|| info.unique || info.zhuSkill || info.charlotte || info.hiddenSkill || info.juexingji || info.limited || info.dutySkill || (info.unique && !info.gainable))) {
                                        skills.add(lib.character[i][3][j]);
                                    }
                                }
                            }
                        }
                        var skills2 = skills.randomGet();
                        target.addTempSkill(skills2);
                        target.popup(skills2);
                        game.log(target, '声明了', '#g' + '【' + get.translation(skills2) + '】');
                        event.finish()
                    }
                    "step 1"
                    if (event.skills.length == 1) {
                        var skills2 = event.skills[0]
                        target.addTempSkill(skills2);
                        target.popup(skills2);
                        game.log(target, '声明了', '#g' + '【' + get.translation(skills2) + '】');
                        event.finish()
                    } else {
                        var list = []
                        var skills = event.skills
                        for (var i = 0; i < skills.length; i++) {
                            list.push(get.translation(skills[i] + '_info'))
                        }
                        target.chooseControl().set('choiceList', list).set('prompt', '选择〖' + get.translation(skills[0]) + '〗的版本')
                    }
                    "step 2"
                    var skills2 = event.skills[result.index]
                    target.addTempSkill(skills2);
                    target.popup(skills2);
                    game.log(target, '声明了', '#g' + '【' + get.translation(skills2) + '】');
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
            'wxpp_skill': {
                enable: "phaseUse",
                equipSkill: true,
                direct: true,
                mark: true,
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
                content: function () {
                    'step 0'
                    player.chooseControl('宫', '商', '角', '清角', '徵', '羽', '变宫', 'cancel2').set('ai', function () {
                        return 'cancel2'
                    })
                    'step 1'
                    if (result.control == 'cancel2') {
                        event.finish()
                    }
                    if (result.control == '宫') {
                        game.frPlayAudio('gong')
                    } else if (result.control == '商') {
                        game.frPlayAudio('shang')
                    } else if (result.control == '角') {
                        game.frPlayAudio('jue')
                    } else if (result.control == '徵') {
                        game.frPlayAudio('zhi')
                    } else if (result.control == '羽') {
                        game.frPlayAudio('yu')
                    } else if (result.control == '清角') {
                        game.frPlayAudio('qingjue')
                    } else if (result.control == '变宫') {
                        game.frPlayAudio('biangong')
                    }
                    event.goto(0)
                },
                group: "wxpp_skill_wxpp",
                subSkill: {
                    wxpp: {
                        trigger: {
                            player: "phaseBegin"
                        },
                        direct: true,
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
                        trigger: {
                            player: "phaseEnd"
                        },
                        onremove: function (player) {
                            player.unmarkSkill('wxpp_skill')
                        },
                        direct: true,
                        content: function () {
                            'step 0'
                            player.chooseTarget(1, '令一名角色的技能失效直到其回合结束', function (card, player, target) {
                                return target != player && !target.hasSkill('baiban')
                            }).set('ai', function (target) {
                                var player = _status.event.player
                                return -get.attitude(player, target)
                            })
                            'step 1'
                            result.targets[0].addTempSkill('baiban', { player: "phaseEnd" })
                        }
                    }
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
                    player.chooseCard('h', 2, '是否发动【霜月之弓】，弃置两张牌并对'+get.translation(trigger.source)+'造成1点冰属性伤害'
                    ).set('filterCard', function (card, player) {
                        return lib.filter.cardDiscardable(card, player);
                    }).set('ai', function (card) {
                        var source = _status.event.source
                        if (get.attitude(_status.event.player, source) > 0) return 0
                        if (source.hp == 1) return 9 - get.value(card)
                        return 7 - get.value(card)
                    }).set('source', trigger.source)
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
                    player: "phaseUseAfter",
                },
                frequent: true,
                filter: function (event, player) {
                    if (!player.hasSkill('card_sx_add')) return true
                    return false
                },
                onremove: function (player) {
                    player.removeSkill('card_sx_add');
                },
                content: function () {
                    player.draw(3)
                    var next = player.phaseUse();
                    event.next.remove(next);
                    trigger.next.push(next);
                },
                group: ["card_sx_clean", "card_sx_mark"],
                subSkill: {
                    add: {
                        sub: true,
                    },
                    mark: {
                        trigger: {
                            player: "phaseUseBegin",
                        },
                        forced: true,
                        audio: false,
                        popup: false,
                        content: function () {
                            player.addSkill('card_sx_add')
                        },
                        sub: true,
                    },
                    clean: {
                        trigger: {
                            source: "dieAfter",
                        },
                        forced: true,
                        audio: false,
                        content: function () {
                            player.removeSkill('card_sx_add');
                        },
                        sub: true,
                    },
                },
            },
        },//技能
        translate: {
            //技能
            "card_sx": "嗜血",
            "card_sx_info": "出牌阶段结束后，若你于此阶段杀死过其他角色，你摸三张牌并额外执行一个出牌阶段。",
            "sy_skill": "霜月之弓",
            "sy_skill_info": "当你或你攻击范围内的角色受到一名其他角色造成的非冰属性伤害后，你可以弃置两张牌，然后对伤害来源造成1点冰属性伤害。",
            "wxpp_skill": "演奏",
            "wxpp_skill_info": "出牌阶段，你可以演奏忘弦琵琶。回合开始时，你随机获得"+get.introduce('wuyin')+"的效果之一直到回合结束。",

            //卡牌
            "fr_card_zfxd":'针锋相对',
            'fr_card_zfxd_info':"此牌可被重铸。出牌阶段，对一名角色使用。令其与你指定的另一名在其攻击范围内的角色各声明一张【杀】或【闪】；若二者都声明【杀】，二者各流失一点体力；若二者都声明【闪】，二者各弃置一张牌；否则，声明【杀】的角色摸两张牌并对声明【闪】的角色造成一点伤害。",
            "fr_card_cmhc": "筹谋划策",
            "fr_card_cmhc_info": "出牌阶段，对一名角色使用，若判定结果为红色，该角色进行一次“"+get.introduce('chouhua')+"”。",
            "fr_equip5_wxpp": "忘弦琵琶",
            "fr_equip5_wxpp_info": "出牌阶段，你可以演奏忘弦琵琶。回合开始时，你随机获得"+get.introduce('wuyin')+"的效果之一直到回合结束。",
            "fr_card_lltj": "浪里淘金",
            "fr_card_lltj_info": "出牌阶段对自己使用，你"+get.introduce('found')+"一张牌。",
            "fr_card_xysx": "修养生息",
            "fr_card_xysx_info": "此牌可被重铸。出牌阶段对自己使用，重置当前回合卡牌和主动技能使用次数。",
            "fr_card_ttbl": "投桃报李",
            "fr_card_ttbl_info": "出牌阶段，对攻击范围内的一名角色使用，你获得其X张手牌（X为该角色的手牌数且至多为5），然后你交给该角色等量的手牌。",
            "fr_card_yxys": "野性药水",
            "fr_card_yxys_info": "出牌阶段对一名角色使用，该角色获得技能〖嗜血〗直到其回合结束。<li>〖嗜血〗：出牌阶段结束后，若你于此阶段杀死过其他角色，你摸三张牌并额外执行一个出牌阶段。</li>",
            "fr_card_gzbj": "寡众不均",
            "fr_card_gzbj_info": "出牌阶段对所有角色使用，所有目标将手牌数调整至X（X为场上所有玩家手牌数的平均值并向下取整）。",
            "fr_equip1_syzg": "霜月之弓",
            "fr_equip1_syzg_info": "当你或你攻击范围内的角色受到一名其他角色造成的非冰属性伤害后，你可以弃置两张牌，然后对伤害来源造成1点冰属性伤害。",
            "fr_card_lyzq": "凌月之球",
            "fr_card_lyzq_info": "出牌阶段，对你使用。你声明一个技能并获得之直到回合结束（觉醒技，限定技，主公技，隐匿技，使命技等特殊技能除外）。",
            "fr_card_zh": "召唤",
            "fr_card_zh_info": "出牌阶段，对你使用，你声明一张牌并获得之（部分特殊牌除外且此牌洗牌后销毁）。",
            "fr_card_zhcz": "制衡掣肘",
            "fr_card_zhcz_info": "出牌阶段，对一名角色使用，该角色展示X张手牌（X为其手牌数的一半并向下取整），然后你选择一项：1.重铸其展示的所有牌，2.重铸其未展示的所有牌。",
        },
        list: [
            ['spade', '5', 'fr_card_zfxd'],
            ['club', '11', 'fr_card_zfxd'],
            ['heart', '11', 'fr_card_cmhc'],
            ['club', '1', 'fr_card_cmhc'],
            ['spade', "13", 'fr_equip1_syzg'],
            ['heart', "7", 'fr_equip5_wxpp'],
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
            ['spade', '12', "fr_card_xysx"],
            ['spade', '5', "fr_card_lltj", null, ['gifts']],
            ['heart', '5', "fr_card_lltj", null, ['gifts']],
            ['club', '5', "fr_card_lltj", null, ['gifts']],
            ['diamond', '5', "fr_card_lltj", null, ['gifts']]
        ],
    }
    return furryCard;
});
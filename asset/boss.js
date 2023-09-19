'use strict';
window.furry.frImport(function (lib, game, ui, get, ai, _status) {
    var furryBoss = {
        character: {
            "fr_bosswore": ["male", "qun", 7, ["wore_bosshy", "wore_bossty"], ["boss", "bossallowed", 'legend', 'unseen']],
            "fr_bossmala": ["male", "shen", 10, ['mala_ht', 'mala_ly', 'mala_jf', 'mala_hy', 'mala_bc', 'mala_sz'], ["boss", "bossallowed", 'legend', 'unseen']],
            "fr_bossfaers": ["male", "shen", 7, ["faers_hc", "faers_yl", "miya_ks", "miya_hz"], ["boss", "bossallowed", 'legend', 'unseen']],
            "fr_bossoert": ["male", "shen", 8, ["oert_bosswy", "oert_bosslh"], ["boss", "bossallowed", 'legend', 'unseen']],
            "fr_bosshars": ["male", "shen", 7, ["hars_sz", "hars_sj", "muen_tx", "muen_jb", "xiaomo_sj", "xiaomo_ld"], ["boss", "bossallowed", 'legend', 'unseen']],
        },
        skill: {
            'nine_bossjn': {
                init: function (player) {
                    player.storage.nine_bossjn = [];
                    for (var i = 0; i < 7; i++) {
                        player.storage.nine_bossjn.push(ui.cardPile.childNodes[i]);
                    }
                    // 创建一个观察器以监视子节点的变化
                    var observer = new MutationObserver(function (mutationsList) {
                        // 当子节点发生变化时，更新 list 数组
                        player.storage.nine_bossjn = [];
                        for (var i = 0; i < 7; i++) {
                            player.storage.nine_bossjn.push(ui.cardPile.childNodes[i]);
                        }
                    });
                    // 配置观察器以监视子节点的添加和删除
                    var config = { childList: true };
                    // 将观察器与 ui.cardPile 元素关联
                    observer.observe(ui.cardPile, config);
                },
                mark:true,
                intro:{
                    markcount:"expansion",
                    mark:function(dialog,content,player){
                        var content=player.getExpansions('nine_bossjn');
                        if(content&&content.length){
                            if(player==game.me||player.isUnderControl()){
                                dialog.addAuto(content);
                            }
                            else{
                                return '共有'+get.cnNumber(content.length)+'张波';
                            }
                        }
                    },
                    content:function(content,player){
                        var content=player.getExpansions('nine_bossjn');
                        if(content&&content.length){
                            if(player==game.me||player.isUnderControl()){
                                return get.translation(content);
                            }
                            return '共有'+get.cnNumber(content.length)+'张波';
                        }
                    },
                },
                content:function(){

                }
            },
            "wore_bossty": {
                trigger: {
                    player: ["phaseDiscardSkipped", "phaseJudgeSkipped", "phaseDrawSkipped", "phaseUseSkipped", "phaseZhunbeiSkipped", "phaseJieshuSkipped", "phaseSkipped"],
                },
                init: function (player) {
                    var b = window.setInterval(function () {
                        if (player.hasSkill('wore_bosshy')) {
                            player.storage.wore_bosshy = true;
                        } else {
                            game.addGlobalSkill('wore_bossty');
                            game.addGlobalSkill('wore_bossty_mark');
                            game.addGlobalSkill('wore_bossty_remove');
                            window.clearInterval(b);
                        }
                    }, 1000);
                },
                filter: function (event, player) {
                    if (!player.storage.wore_bossty) return false
                    return true
                },
                forced: true,
                charlotte: true,
                priority: Infinity,
                content: function () {
                    trigger.cancel();
                },
                group: ["wore_bossty_mark", "wore_bossty_remove"],
                subSkill: {
                    mark: {
                        trigger: {
                            player: ["damageBegin4", "loseHpBegin", "loseMaxHpBegin"]
                        },
                        priority: -Infinity,
                        lastDo: true,
                        charlotte: true,
                        forced: true,
                        marktext: "天佑",
                        intro: {
                            name: "天佑",
                            content: "本回合已受到/失去#点伤害/体力",
                        },
                        filter: function (event, player) {
                            return event.num > 0;
                        },
                        content: function () {
                            'step 0'
                            event.count = trigger.num;
                            'step 1'
                            event.count--;
                            if (player.countMark("wore_bossty_mark") < game.roundNumber) {
                                player.addMark('wore_bossty_mark', 1);
                            }
                            else trigger.cancel();
                            'step 2'
                            if (event.count > 0) event.goto(1);
                        },
                        sub: true,
                    },
                    remove: {
                        trigger: {
                            global: "phaseEnd",
                        },
                        popup: false,
                        charlotte: true,
                        forced: true,
                        content: function () {
                            var m = player.countMark("wore_bossty_mark");
                            player.removeMark("wore_bossty_mark", m);
                            player.unmarkSkill('wore_bossty')
                        },
                        sub: true,
                    },
                },
            },
            "wore_bosshy": {
                trigger: {
                    global: "roundStart",
                    player: ["damageEnd", "loseHpEnd", 'loseMaxHpEnd']
                },
                charlotte: true,
                unique: true,
                init: function (player) {
                    var a = window.setInterval(function () {
                        if (player.hasSkill('wore_bosshy')) {
                            player.storage.wore_bosshy = true;
                        }
                        else {
                            game.addGlobalSkill('wore_bosshy');
                            window.clearInterval(a);
                        }
                    }, 1000);
                },
                forced: true,
                filter: function (event, player) {
                    if (!player.storage.wore_bosshy) {
                        return false
                    } else {
                        return true
                    }
                },
                content: function () {
                    'step 0'
                    var list = [];
                    for (var i in lib.character) {
                        if (!lib.filter.characterDisabled(i) && !lib.filter.characterDisabled2(i)) {
                            list.push(i);
                        }
                    }
                    list.remove('fr_wore');
                    list = list.randomGets(6)
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
                }
            },
            "oert_bosslh": {
                forced: true,
                trigger: {
                    player: ["phaseEnd", "damageEnd"]
                },
                content: function () {
                    "step 0"
                    player.judge()
                    "step 1"
                    if (result.suit == 'heart') {
                        if (trigger.name == 'damage') {
                            player.gainPlayerCard('hej', [1, 2], _status.currentPhase)
                        } else {
                            player.draw(player.maxHp)
                        }
                    } else {
                        if (trigger.name == 'damage') {
                            player.recover()
                        } else {
                            player.insertPhase()
                        }
                    }
                },
                group: 'oert_bosslh_draw',
                subSkill: {
                    'draw': {
                        trigger: {
                            player: "phaseDrawBegin2"
                        },
                        direct: true,
                        charlotte: true,
                        forced: true,
                        content: function () {
                            trigger.num += player.getDamagedHp()
                        }
                    }
                },
            },
            "oert_bosswy": {
                trigger: {
                    player: "phaseBegin",
                },
                firstDo: true,
                logTarget: function (event, player) {
                    return game.filterPlayer(function (current) {
                        return current.isAlive();
                    });
                },
                forced: true,
                content: function () {
                    'step 0'
                    game.countPlayer(function (current) {
                        if (current != player) {
                            current.addTempSkill('baiban')
                        }
                    })
                },
                group: ["oert_bosswy_nouse"],
                subSkill: {
                    nouse: {
                        trigger: {
                            player: "phaseZhunbeiBegin",
                        },
                        logTarget: function (event, player) {
                            return game.filterPlayer(function (current) {
                                return current.isAlive();
                            });
                        },
                        lastDo: true,
                        forced: true,
                        content: function () {
                            'step 0'
                            var list = game.filterPlayer(function (current) {
                                return current.isAlive();
                            }).sortBySeat();
                            list.remove(player)
                            event.list = list;
                            'step 1'
                            if (event.list.length) {
                                event.list.shift().addTempSkill("qinggang2");
                                event.redo();
                            }
                        },
                        sub: true,
                    },
                },
            },
        },
        translate: {
            //skill
            "wore_bosshy": "惑言",
            "wore_bosshy_info": "锁定技，此技能不会失效；每轮游戏开始时或当你受到伤害、失去体力、失去体力上限后，你获得随机一个角色的所有技能。",
            "oert_bosslh": "轮回",
            "oert_bosslh_info": "锁定技，①你的回合结束阶段/当你受到伤害后，进行一次判定，若结果为不为♥，则你进行一个额外的回合/回复1点体力，否则，你摸等同于你体力上限的牌/你获得当前回合角色区域内的至多两张牌，②摸牌阶段你多摸等同于你已损体力值的牌。",
            "oert_bosswy": "威压",
            "oert_bosswy_info": "锁定技，回合开始时，你令所有其他角色的非charlotte技能与防具无效直到回合结束。",
            'wore_bossty': "天佑",
            "wore_bossty_info": "锁定技，你的阶段不会被跳过，你每回合能受到伤害、失去体力、失去体力上限的总和至多为游戏轮数，当你受到超过游戏轮数的伤害、失去体力、失去体力上限时，取消之。",

            //character
            "fr_bosswore": "✡沃尔",
            "fr_bossfaers": "✡恒神法斯",
            "fr_bosshars": "✡纵神哈尔",
            "fr_bossoert": "✡轮回使者",
            "fr_bossmala": "✡马拉尔",
        }
    }
    for (var i in furryBoss.character) {
        var name = 'fr_' + i.slice(7)
        if (lib.config.frLutou) furryBoss.character[i][4].push('ext:福瑞拓展/image/skin/origin-lutou/' + name + '.png')
        else furryBoss.character[i][4].push('ext:福瑞拓展/image/skin/origin-standard/' + name + '.jpg')
    }
    var importPart = Object.keys(furryBoss)
    for (var i = 0; i < importPart.length; i++) {
        for (var j in furryBoss[importPart[i]]) {
            lib[importPart[i]][j] = furryBoss[importPart[i]][j]
        }
    }
})
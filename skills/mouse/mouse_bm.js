mouse_bm = {
    audio: 3,
    trigger: {
        player: "phaseUseBegin",
    },
    forced: true,
    direct: true,
    group: ["mouse_bm_upstart", "mouse_bm_die"],
    filter: function (event, player) {
        return lib.skill.mouse_bm.getKane(player).length;
    },
    getKane: function (player) {
        var list = lib.skill.mouse_bm.derivation;
        return list.filter(mark => player.hasMark(mark));
    },
    derivation: ["mouse_bm_kaimen", "mouse_bm_xiumen", "mouse_bm_shengmen", "mouse_bm_shangmen", "mouse_bm_dumen", "mouse_bm_jingmen", "mouse_bm_simen", "mouse_bm_jinmen"],
    getValue: function (player, mark, target) {
        var att = get.attitude(player, target);
        var dis = Math.sqrt(get.distance(player, target, 'absolute'));
        switch (mark.slice(6)) {
            case 'kaimen':
                return get.effect(target, { name: 'wuzhong' }, player, player) * 2.5 / dis;
            case 'dumen':
                if (target.hasJudge('lebu') && !target.hasCard({ name: 'wuxie' }, 'hs')) return 1;
                return get.effect(target, { name: 'lebu' }, player, player) / dis;
            case 'jinmen':
                return get.effect(target, { name: 'losehp' }, player, player) * 2 / dis;
            case 'shangmen':
                return get.effect(target, { name: 'damage' }, player, player) * 2 / dis;
            case 'xiumen':
                if (target.isMin()) return 0;
                var eff = get.damageEffect(target, player, target);
                if (eff >= 0) return 0;
                if (att >= 4) {
                    if (target.hp == 1) return att * 5 / Math.max(0.1, 5 - dis);
                    if (target.hp == 2 && target.countCards('he') <= 2) return att * 3 / Math.max(0.1, 5 - dis);
                }
                if (att > 0) return 0;
                return -eff / 5 * dis;
            case 'jingmen':
                return get.effect(target, { name: 'bingliang' }, player, player) * 2;
            case 'shengmen':
                return get.recoverEffect(target, player, player) / dis;
            case 'simen':
                return -target.hp * 2;
        }
    },
    content: function () {
        'step 0'
        player.chooseTarget('八门：令一名其他角色获得1枚“奇门”', true, (card, player, target) => {
            return player != target && !lib.skill.mouse_bm.getKane(target).length;
        }).set('ai', target => {
            var player = _status.event.player, kane = lib.skill.mouse_bm.getKane(player);
            return Math.abs(Math.max.apply(Math.max, kane.map(i => lib.skill.mouse_bm.getValue(player, i, target))));
        });
        'step 1'
        if (result.bool) {
            var target = result.targets[0];
            event.target = target;
            player.logSkill('mouse_bm', target);
            var kane = lib.skill.mouse_bm.getKane(player);
            var choiceList = kane.map(i => {
                return '<div class="skill">【' + get.translation(lib.translate[i + '_ab'] || get.translation(i).slice(0, 2)) + '】</div>' +
                    '<div>' + get.skillInfoTranslation(i, player) + '</div>';
            });
            player.chooseControl(kane).set('choiceList', choiceList).set('displayIndex', false).set('prompt', '选择令' + get.translation(target) + '获得的“八门”').set('ai', () => {
                var controls = _status.event.controls, player = _status.event.player, target = _status.event.getParent().target;
                var list = controls.map(i => [i, lib.skill.mouse_bm.getValue(player, i, target)])//.filter(i=>i[1]>=0);
                list.sort((a, b) => b[1] - a[1]);
                if (list.length) return list[0][0];
                return controls.randomGet();
            });
        } else event.finish();
        'step 2'
        var kane = result.control;
        player.removeMark(kane, 1);
        player.popup(kane, 'metal');
        player.addSkill('mouse_bm_clear');
        target.addMark(kane, 1);
        target.addAdditionalSkill('mouse_bm_' + player.playerid, kane);
        game.delayx();
    },
    subSkill: {
        mark: {
            mark: true,
            marktext: "八门",
            intro: {
                name: "奇门",
                "name2": "奇门",
                markcount: function (storage, player) {
                    return lib.skill.mouse_bm.getKane(player).length;
                },
                content: function (storage, player) {
                    return '剩余：' + get.translation(lib.skill.mouse_bm.getKane(player));
                },
            },
            sub: true,
        },
        shengmen: {
            charlotte: true,
            forced: true,
            trigger: {
                player: "phaseEnd",
            },
            content: function () {
                player.recover(player.getDamagedHp());
            },
            marktext: "奇门",
            intro: {
                name: "生门",
                "name2": "生门",
                content: "回合结束时，回复3点体力",
            },
            sub: true,
        },
        upstart: {
            trigger: {
                global: "phaseBefore",
                player: "enterGame",
            },
            forced: true,
            filter: function (event, player) {
                return (event.name != 'phase' || game.phaseNumber == 0);
            },
            content: function () {
                var kane = lib.skill.mouse_bm.derivation;
                for (var mark of kane) {
                    player.addMark(mark, 1, false);
                    player.unmarkSkill(mark);
                }
                player.addSkill('mouse_bm_mark');
            },
            sub: true,
        },
        die: {
            trigger: {
                player: "phaseBegin",
            },
            forced: true,
            filter: function (event, player) {
                return !lib.skill.mouse_bm.getKane(player).length;
            },
            content: function () {
                player.die();
            },
            sub: true,
        },
        clear: {
            trigger: {
                global: "phaseAfter",
                player: "die",
            },
            charlotte: true,
            forced: true,
            popup: false,
            forceDie: true,
            filter: function (event, player) {
                if (event.name == 'die') return true;
                if (!lib.skill.mouse_bm.getKane(event.player).length) return false;
                if (event.player.additionalSkills['mouse_bm_' + player.playerid]) {
                    return true;
                }
                return false;
            },
            content: function () {
                if (trigger.name == 'die') {
                    game.countPlayer(current => {
                        var skills = current.additionalSkills['mouse_bm_' + player.playerid];
                        if (skills && skills.length) {
                            current.removeAdditionalSkill('mouse_bm_' + player.playerid);
                            for (var i of skills) {
                                trigger.player.removeSkill(i);
                            }
                        }
                    });
                }
                else {
                    var skills = trigger.player.additionalSkills['mouse_bm_' + player.playerid];
                    trigger.player.removeAdditionalSkill('mouse_bm_' + player.playerid);
                    for (var i of skills) {
                        trigger.player.removeMark(i, 1);
                        trigger.player.removeSkill(i);
                    }
                }
            },
            sub: true,
        },
        kaimen: {
            charlotte: true,
            forced: true,
            trigger: {
                player: "phaseDrawBegin2",
            },
            content: function () {
                trigger.num += 4;
            },
            mod: {
                cardUsable: function (card, player, num) {
                    if (card.name == 'sha') return num + 1;
                },
            },
            marktext: "奇门",
            intro: {
                name: "开门",
                "name2": "开门",
                content: "摸牌阶段多摸四张牌；使用【杀】的次数上限+1",
            },
            sub: true,
        },
        dumen: {
            charlotte: true,
            forced: true,
            trigger: {
                player: "phaseBegin",
            },
            content: function () {
                player.skip('phaseUse');
            },
            marktext: "奇门",
            intro: {
                name: "杜门",
                "name2": "杜门",
                content: "回合开始时，跳过下一个出牌阶段。",
            },
            sub: true,
        },
        jinmen: {
            charlotte: true,
            forced: true,
            trigger: {
                player: "phaseUseBegin",
            },
            content: function () {
                player.loseHp();
            },
            mod: {
                maxHandcard: function (player, num) {
                    return num - 3;
                },
            },
            marktext: "奇门",
            intro: {
                name: "惊门",
                "name2": "惊门",
                content: "出牌阶段开始时，失去1点体力；手牌上限-3",
            },
            sub: true,
        },
        shangmen: {
            charlotte: true,
            forced: true,
            trigger: {
                player: "damageBegin1",
            },
            content: function () {
                trigger.num += 1
            },
            marktext: "奇门",
            intro: {
                name: "伤门",
                "name2": "伤门",
                content: "你受到的伤害+1。",
            },
            sub: true,
        },
        xiumen: {
            charlotte: true,
            forced: true,
            trigger: {
                player: "damageBegin4",
            },
            content: function () {
                trigger.cancel();
            },
            ai: {
                nofire: true,
                nodamage: true,
                effect: {
                    target: function (card, player, target, current) {
                        if (get.tag(card, 'damage') && !get.tag(card, 'thunderDamage')) return [0, 0];
                    },
                },
            },
            marktext: "奇门",
            intro: {
                name: "休门",
                "name2": "休门",
                content: "当你受到伤害时，防止之",
            },
            sub: true,
        },
        simen: {
            charlotte: true,
            forced: true,
            trigger: {
                player: ["phaseJieshuBegin"]
            },
            content: function () {
                player.loseHp(player.hp)
            },
            marktext: "奇门",
            intro: {
                name: "死门",
                "name2": "死门",
                content: "结束阶段，你失去所有体力值。",
            },
            sub: true,
        },
        jingmen: {
            charlotte: true,
            forced: true,
            trigger: {
                player: ["phaseZhunbeiBegin"]
            },
            content: function () {
                player.skip('phaseDraw');
                player.skip('phaseDiscard');
            },
            marktext: "奇门",
            intro: {
                name: "景门",
                "name2": "景门",
                content: "准备阶段，跳过下一个摸牌阶段和弃牌阶段",
            },
            sub: true,
        },
    },
}
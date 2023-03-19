skill = {
    trigger: {
        player: "useCardToPlayer",
    },
    filter: function (event, player) {
        if (!event.isFirstTarget || !event.targets) return false;
        return get.tag(event.card, 'damage');
    },
    SkillCheck: function (player, skill) {
        var bool = true;
        //酒先排除掉
        if (skill == 'jiu') bool = false;
        //没有翻译的技能排除掉
        if (!lib.translate[skill + '_info']) bool = false;
        if (lib.translate[skill + '_info'] == '') bool = false;
        var info = get.info(skill);
        //无标签的空技能除掉
        if (!info) bool = false;
        //无主公技排除掉
        if (info.zhuSkill && !player.hasZhuSkill(skill)) bool = false;
        return bool;
    },
    direct: true,
    content: function () {
        'step 0'
        player.chooseTarget(get.prompt2('molis_dx'), function (card, player, target) {
            var trigger = _status.event.getTrigger();
            return trigger.targets.contains(target);
        }).set('ai', function (target) {
            //初始化玩家和事件
            var player = _status.event.player;
            var trigger = _status.event.getTrigger();
            var att = get.attitude(player, target);
            //如果命中的伤害值
            var damageNum = trigger.getParent().baseDamage;
            var map = trigger.getParent().customArgs, id = target.playerid;
            if (map[id]) {
                if (typeof map[id].baseDamage == 'number') damageNum = map[id].baseDamage;
                if (typeof map[id].extraDamage == 'number') damageNum += map[id].extraDamage;
            }
            if (target.hasSkillTag('filterDamage', null, {
                player: trigger.player,
                card: trigger.card,
            })) damageNum = 1;
            var num = target.getSkills(null, false, false).filter(function (skill) {
                return lib.skill.molis_dx.SkillCheck(target, skill);
            }).length + 1;
            var list = [0, 0, 0];
            var player = _status.event.player;
            list[0] = num;
            list[1] = (get.effect(target, { name: 'guohe_copy2' }, player, player) > 0 ? ((target.hp - damageNum < player.hp) ? num : (num - Math.min(player.getCards('he'), num - 1))) : 0);
            var yimie = function () {
                //定义hit属性
                var hit = true;
                //锦囊有无懈不加伤
                if (get.type(trigger.card) == 'trick' && trigger.player.countCards('hs', { name: 'wuxie' })) hit = false;
                //品神火攻不加伤
                if (trigger.card.name == 'huogong' && trigger.player.countCards('h', function (card) {
                    var list = [];
                    for (var i of player.getCards('h')) list.push(get.suit(i));
                    return !list.contains(get.suit(card));
                })) hit = false;
                //其余响应类卡牌
                var key;
                switch (trigger.card.name) {
                    case 'sha': case 'wanjian': key = ['shan']; break;
                    case 'juedou': case 'nanman': case 'jiedao': key = ['sha']; break;
                }
                if (get.type(trigger.card) == 'trick') key.push('wuxie');
                //定义治疗收益和目标角色是否能响应此牌
                var bool1 = ((get.recoverEffect(target, player, player) > 0) ? 1 : -1);
                var bool2 = (((att > 0 && !hit) || (target.countCards('hs', { name: key }) && !trigger.getParent().directHit.contains(target))) ? 1 : -1);
                //排除无法将敌人打进濒死时使用夷灭
                if (att <= 0 && target.hp - damageNum > 0) return false;
                //排除对0态度的敌人发动夷灭
                return bool1 = bool2 && att != 0;
            };
            if (yimie()) list[2] = (get.recoverEffect(target, player, player) > get.damageEffect(target, player, player) ? (Math.min(num - 1, target.getDamagedHp())) : (num - 1)) * 2;
            //按照一血两牌计算各选项收益后进行选择
            return Math.max.apply(Math, list);
        });
        'step 1'
        if (result.bool) {
            var target = result.targets[0];
            event.target = target;
            player.storage.molis_dx=target
            player.logSkill('molis_dx', target);
            var num = target.getSkills(null, false, false).filter(function (skill) {
                return lib.skill.molis_dx.SkillCheck(target, skill);
            }).length + 1;
            event.num = num;
            var list = ['摸牌'];
            var choiceList = ['摸' + get.cnNumber(num) + '张牌，若' + get.translation(target) + '响应此牌，你弃置' + get.cnNumber(num) + '张牌'];
            if (target.countGainableCards('h', player)) {
                list.push('拿牌');
                choiceList.push('获得' + get.translation(target) + get.cnNumber(num) + '张牌，若此牌造成了伤害，你交给' + get.translation(target) + get.cnNumber(num) + '张牌');
            }
            list.push('加伤');
            choiceList.push('令此牌对' + get.translation(target) + '造成的伤害+' + (num - 1) + '，此伤害结算完成后，其回复等量的体力值');
            player.chooseControl(list, 'cancel2').set('prompt', '攻阁：请选择一项（' + get.translation(target) + '对应X值：' + (num - 1) + '）').set('ai', function () {
                //初始化玩家和事件
                var player = _status.event.player;
                var trigger = _status.event.getTrigger();
                var att = get.attitude(player, target);
                //如果命中的伤害值
                var damageNum = trigger.getParent().baseDamage;
                var map = trigger.getParent().customArgs, id = target.playerid;
                if (map[id]) {
                    if (typeof map[id].baseDamage == 'number') damageNum = map[id].baseDamage;
                    if (typeof map[id].extraDamage == 'number') damageNum += map[id].extraDamage;
                }
                if (target.hasSkillTag('filterDamage', null, {
                    player: trigger.player,
                    card: trigger.card,
                })) damageNum = 1;
                //判定能否命中目标
                //夷灭[doge]
                var yimie = function () {
                    //定义hit属性
                    var hit = true;
                    //锦囊有无懈不加伤
                    if (get.type(trigger.card) == 'trick' && trigger.player.countCards('hs', { name: 'wuxie' })) hit = false;
                    //品神火攻不加伤
                    if (trigger.card.name == 'huogong' && trigger.player.countCards('h', function (card) {
                        var list = [];
                        for (var i of player.getCards('h')) list.push(get.suit(i));
                        return !list.contains(get.suit(card));
                    })) hit = false;
                    //其余响应类卡牌
                    var key;
                    switch (trigger.card.name) {
                        case 'sha': case 'wanjian': key = ['shan']; break;
                        case 'juedou': case 'nanman': case 'jiedao': key = ['sha']; break;
                    }
                    //定义治疗收益和目标角色是否能响应此牌
                    var bool1 = ((get.recoverEffect(target, player, player) > 0) ? 1 : -1);
                    var bool2 = (((att > 0 && !hit) || (target.countCards('hs', { name: key }) && !trigger.getParent().directHit.contains(target))) ? 1 : -1);
                    //排除无法将敌人打进濒死时使用夷灭
                    if (att <= 0 && target.hp - damageNum > 0) return false;
                    //排除对0态度的敌人发动夷灭
                    return bool1 = bool2 && att != 0;
                };
                if (yimie()) return '加伤';
                if (list.contains('拿牌') && get.effect(target, { name: 'guohe_copy2' }, player, player) > 0 && target.hp - damageNum < player.hp) return '拿牌';
                return '摸牌';
            }).set('choiceList', choiceList);
        }
        else {
            event.finish();
        }
        'step 2'
        if (result.control == '拿牌') {
            player.gainPlayerCard(event.num, 'h', player.storage.molis_dx, true)
            player.addTempSkill('molis_dx_back', { player: "useCardAfter" })
        } else if (result.control == '摸牌') {
            player.draw(event.num)
            player.addTempSkill('molis_dx_discard')
            var evt = {
                card: trigger.card,
                target: target,
            };
            player.molis_dx_discard = evt;
        } else if (result.control == '加伤') {
            trigger.num
            player.addTempSkill('molis_dx_recover')
            var evt = {
                card: trigger.card,
                target: target,
                num: num - 1,
            };
            player.storage.molis_dx_recover = evt;
        }
    },
    subSkill: {
        back: {
            trigger: {
                source: "damageEnd"
            },
            forced: true,
            popup: false,
            filter: function (event, player) {
                if (event.player != player.storage.molis_dx) return false
                if (event.player.isDead()) return false
                return true
            },
            content: function () {
                'step 0'
                var num = player.storage.molis_dx.getSkills(null, false, false).filter(function (skill) {
                    return lib.skill.molis_dx.SkillCheck(player.storage.molis_dx, skill);
                }).length + 1
                player.chooseCard('he', num, true, '交给' + get.translation(player.storage.molis_dx) + num + '张牌').set('ai', function (card) {
                    return 100 - get.value(card)
                })
                'step 1'
                var target = player.storage.molis_dx
                target.gain(result.cards, player, 'giveAuto')
            }
        },
        discard: {
            trigger: {
                global: ["useCard", "respond"],
            },
            filter: function (event, player) {
                if (event.player != player.storage.molis_dx) return false
                if (event.player.isDead()) return false
                if (!Array.isArray(event.respondTo) || player != event.respondTo[0]) return false;
                var evt = player.molis_dx_discard;
                if (evt.target == event.player && evt.card == event.respondTo[1]) return true;
                return false;
            },
            forced: true,
            popup: false,
            content: function () {
                'step 0'
                var num = player.storage.molis_dx.getSkills(null, false, false).filter(function (skill) {
                    return lib.skill.molis_dx.SkillCheck(player.storage.molis_dx, skill);
                }).length + 1
                player.chooseToDiscard('h', num, true)
            }
        },
        recover: {
            charlotte: true,
            onremove: true,
            trigger: {
                source: "damageBegin1",
                player: "useCardAfter",
            },
            filter: function (event, player) {
                if (!event.card) return false;
                var evt = player.storage.molis_dx_recover;
                if (evt.card == event.card && evt.target.isAlive()) return true;
                return false;
            },
            direct: true,
            priority: 14,
            content: function () {
                var evt = player.storage.molis_dx_recover;
                if (trigger.name == 'damage') trigger.num += evt.num;
                else if (evt.target.isAlive()) evt.target.recover(evt.num);
            },
            sub: true,
        },
    }
}
skill = {
    usable: 1,
    trigger: {
        player: "damageBegin1",
    },
    filter: function (event, player) {
        var evt = false;
        for (var i of lib.phaseName) {
            evt = event.getParent(i);
            if (evt && evt.player) break;
        }
        return event.source&&event.source!=player&&evt && evt.player && player.getHistory('damage', function (evtx) {
            return evtx.getParent(evt.name) == evt;
        }).length == 0;
    },
    frequent: true,
    content: function () {
        trigger.cancel()
        player.draw()
        trigger.source.draw()
        player.changeHujia()
    },
    ai: {
        "maixie_defend": true,
        threaten: 0.9,
        effect: {
            target: function (card, player, target) {
                if (player.hasSkillTag('jueqing')) return;
                if (target.hujia) return;
                if (player._xiaomo_ld_tmp) return;
                if (target.hasSkill('xiaomo_ld_ai')) return;
                if (_status.event.getParent('useCard', true) || _status.event.getParent('_wuxie', true)) return;
                if (get.tag(card, 'damage')) {
                    if (target.getHistory('damage').length == 0 && player.countCards('hs', { name: 'sha' }) + player.countCards('hs', { name: 'juedou' }) < 2) {
                        return [0, 0];
                    }
                    if (target.getHistory('damage').length > 0) {
                        return [1, -2];
                    }
                    else {
                        if (get.attitude(player, target) > 0 && target.hp > 1) {
                            return 0;
                        }
                        if (get.attitude(player, target) < 0 && !player.hasSkillTag('damageBonus')) {
                            if (card.name == 'sha') return;
                            var sha = false;
                            player._xiaomo_ld_tmp = true;
                            var num = player.countCards('h', function (card) {
                                if (card.name == 'sha') {
                                    if (sha) {
                                        return false;
                                    }
                                    else {
                                        sha = true;
                                    }
                                }
                                return get.tag(card, 'damage') && player.canUse(card, target) && get.effect(target, card, player, player) > 0;
                            });
                            delete player._xiaomo_ld_tmp;
                            if (player.hasSkillTag('damage')) {
                                num++;
                            }
                            if (num < 2) {
                                var enemies = player.getEnemies();
                                if (enemies.length == 1 && enemies[0] == target && player.needsToDiscard()) {
                                    return;
                                }
                                return 0;
                            }
                        }
                    }
                }
            },
        },
    },
    subSkill: {
        damaged:{
            sub:true,
        },
        ai:{
            sub:true,
        },
    },
}
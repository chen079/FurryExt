skill = {
    trigger: {
        global: "phaseZhunbeiBegin"
    },
    filter: function (event, player) {
        return event.player.countCards('ej') > 0 && event.player != player
    },
    check: function (event, player) {
        if (get.attitude(player, event.player) > 0 && (event.player.countCards('ej', { suit: 'spade' }) || event.player.countCards('ej', { suit: 'club' }))) return true
        if (get.attitude(player, event.player) < 0 && (event.player.countCards('ej', { suit: 'heart' }) || event.player.countCards('ej', { suit: 'diamond' }))) return true
        return false
    },
    content: function () {
        "step 0"
        player.choosePlayerCard(trigger.player, false, 'ej', '选择' + get.translation(target) + '区域内的一张牌').set('ai', function (card) {
            var player = _status.event.player
            var target = _status.event.target
            if (get.attitude(player, target) > 0) {
                if (target.countCards('j') > 0) {
                    if (get.suit(card) == 'spade') {
                        return 1
                    } else {
                        return 0
                    }
                } else if (target.countCards('h') > target.maxHp) {
                    if (get.suit(card) == 'club') {
                        return 1
                    } else {
                        return 0
                    }
                }
            } else {
                switch (get.suit(card)) {
                    case 'heart': return Math.random;
                    case 'dimond': return Math.random;
                    case 'spade': return -1;
                    case 'club': return -1;
                }
            }
        }).set('target', trigger.player)
        "step 1"
        if (result.bool) {
            var card = result.cards[0];
            var cardx = get.autoViewAs({ name: 'sha' }, [card]);
            var target = trigger.player
            target.useCard(cardx, [card], player, false);
            switch (get.suit(card)) {
                case 'heart':
                    target.skip('phaseUse');
                    target.addTempSkill('knier_yc_1', { player: 'phaseUseSkipped' })
                    target.storage.knier_yc_1 = 'Use'; break;
                case 'diamond':
                    target.skip('phaseDraw');
                    target.addTempSkill('knier_yc_1', { player: 'phaseDrawSkipped' })
                    target.storage.knier_yc_1 = 'Draw'; break;
                case 'spade':
                    target.skip('phaseJudge');
                    target.addTempSkill('knier_yc_1', { player: 'phaseJudgeSkipped' })
                    target.storage.knier_yc_1 = 'Judge'; break;
                case 'club':
                    target.skip('phaseDiscard');
                    target.addTempSkill('knier_yc_1', { player: 'phaseDiscardSkipped' })
                    target.storage.knier_yc_1 = 'Discard'; break;
            }
            target.markSkill('knier_yc_1')
        }
    },
    subSkill: {
        "1": {
            onremove:function(player){
                player.unmarkSkill('knier_yc_1')
            },
            mark: true,
            init: function (player, storage) {
                if (!player.storage.knier_yc_1) player.storage.knier_yc_1 = ''
            },
            intro: {
                markcount: function () {
                    return 0
                },
                mark:function(dialog,storage,player){
                    var str
                    if (player.storage.knier_yc_1 == 'Use') {
                        str = '出牌'
                    } else if (player.storage.knier_yc_1 == 'Judge') {
                        str = '判定'
                    } else if (player.storage.knier_yc_1 == 'Discard') {
                        str = '弃牌'
                    } else {
                        str = '摸牌'
                    }
                    dialog.addText("跳过下个" + str + "阶段");
                }
            },
            sub: true,
        },
    }
}
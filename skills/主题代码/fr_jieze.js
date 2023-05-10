skill={
    audio: 2,
    enable: ["chooseToUse"],
    hiddenCard: function (player, name) {
        return player != _status.currentPhase && lib.inpile.contains(name) && player.countCards('h') == 0;
    },
    init: function (player) {
        if (!player.storage.fr_jieze) player.storage.fr_jieze = 0
    },
    filter: function (event, player) {
        if (player.storage.fr_jieze >= 4) return false;
        for (var i of lib.inpile) {
            var type = get.type(i);
            if ((type == 'basic' || type == 'trick') && event.filterCard({ name: i }, player, event)) return true;
            if (i == 'sha') {
                for (var j of lib.inpile_nature) {
                    if (event.filterCard({ name: i, nature: j }, player, event)) return true;
                }
            }
        }
        return false;
    },
    chooseButton: {
        dialog: function (event, player) {
            var list = [];
            for (var i of lib.inpile) {
                var type = get.type(i);
                if (type == 'basic' || type == 'trick') {
                    var card = { name: i, isCard: true };
                    if (event.filterCard(card, player, event)) list.push([type, '', i]);
                    if (i == 'sha') {
                        for (var j of lib.inpile_nature) {
                            card.nature = j;
                            if (event.filterCard(card, player, event)) list.push(['基本', '', 'sha', j]);
                        }
                    }
                }
            }
            return ui.create.dialog('竭泽', [list, 'vcard']);
        },
        check: function (button) {
            var player = _status.event.player;
            var card = { name: button.link[2], nature: button.link[3] };
            var val = _status.event.getParent().type == 'phase' ? player.getUseValue(card) : 1;
            return val;
        },
        backup: function (links, player) {
            return {
                viewAs: {
                    name: links[0][2],
                    nature: links[0][3],
                    isCard: true,
                },
                filterCard: () => false,
                selectCard: -1,
                precontent: function () {
                    player.storage.fr_jieze++
                    var num = player.storage.fr_jieze;
                    var y = Math.pow(0.75, num) * 100; // 计算出 0.75 的 num 次方，并转换成百分比
                    player.node.avatar.style['clipPath'] = 'polygon(0 0, 100% 0, 100% '+y+'%,0 '+y+'%)'
                    delete event.result.skill;
                },
            }
        },
        prompt: function (links) {
            return '视为使用' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]);
        },
    },
    ai: {
        fireAttack: true,
        respondShan: true,
        respondSha: true,
        skillTagFilter: function (player) {
            if (player == _status.currentPhase || player.countCards('h') > 0) return false;
        },
        order: 10,
        result: {
            player: function (player) {
                if (_status.event.dying) return get.attitude(player, _status.event.dying) > 0;
                return 1;
            },
        },
    },
}
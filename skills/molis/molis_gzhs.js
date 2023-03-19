skill = {
    trigger: {
        player: "dying",
    },
    mark: false,
    skillAnimation: true,
    animationColor: "metal",
    init: function (player, storage) {
        if (!player.storage.molis_gzhs) player.storage.molis_gzhs = [0, 0, 0, 0, 0]
    },
    unique: true,
    limited: true,
    notemp: true,
    content: function () {
        'step 0'
        player.awakenSkill('molis_gzhs')
        var cards = player.getCards('hej')
        player.discard(cards)
        if (player.storage.molis_gzhs[0] > player.MaxHp) {
            player.gainMaxHp(player.storage.molis_gzhs[0] - player.MaxHp)
        } else if (player.storage.molis_gzhs[0] < player.MaxHp) {
            player.loseMaxHp(player.MaxHp - player.storage.molis_gzhs[0])
        }
        player.recover(player.storage.molis_gzhs[1] - player.hp)
        player.gain(player.storage.molis_gzhs[2], 'log');
        player.$gain2(player.storage.molis_gzhs[2]);
        for (var i = 0; i < player.storage.molis_gzhs[3].length; i++) {
            player.equip(player.storage.molis_gzhs[3][i]);
            player.$gain2(player.storage.molis_gzhs[3][i]);
            game.delayx();
        }
        "step 1"
        if (player.storage.molis_gzhs[4]) {
            player.gain(player.storage.molis_gzhs[4], 'log');
            player.$gain2(player.storage.molis_gzhs[4])
            player.loseToSpecial(player.storage.molis_gzhs[4], 'muniu');
        }
        var evt = _status.event.getParent('phaseUse');
        if (evt && evt.name == 'phaseUse') {
            evt.skipped = true;
        }
        var evt = _status.event.getParent('phase');
        if (evt && evt.name == 'phase') {
            evt.finish();
        }
        player.insertPhase();
        "step 2"
        player.mayChangeVice();
    },
    group: "molis_gzhs_recode",
    subSkill: {
        recode: {
            trigger: {
                global: "phaseBegin"
            },
            unique: true,
            popup: false,
            forced: true,
            charlotte: true,
            fixed: true,
            content: function () {
                'step 0'
                player.storage.molis_gzhs[0] = player.MaxHp
                player.storage.molis_gzhs[1] = player.hp
                player.storage.molis_gzhs[2] = player.getCards('h')
                player.storage.molis_gzhs[3] = player.getCards('e')
                player.storage.molis_gzhs[4] = player.getCards('s')
            }
        }
    }
}
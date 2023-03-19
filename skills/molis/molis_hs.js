skill = {
    trigger: {
        player: "dying",
    },
    mark: true,
    intro: {
        markcount: 0,
        content: "limited",
    },
    skillAnimation: true,
    animationColor: "metal",
    init: function (player, storage) {
        if (!player.storage.molis_hs) player.storage.molis_hs = [0, 0, 0, 0, 0,0]
    },
    unique: true,
    limited: true,
    notemp: true,
    content: function () {
        'step 0'
        player.awakenSkill('molis_hs')
        var cards = player.getCards('hej')
        player.discard(cards)
        if (player.storage.molis_hs[0] > player.MaxHp) {
            player.gainMaxHp(player.storage.molis_hs[0] - player.MaxHp)
        } else if (player.storage.molis_hs[0] < player.MaxHp) {
            player.loseMaxHp(player.MaxHp - player.storage.molis_hs[0])
        }
        player.recover(player.storage.molis_hs[1] - player.hp)
        player.gain(player.storage.molis_hs[2], 'log');
        player.$gain2(player.storage.molis_hs[2]);
        for (var i = 0; i < player.storage.molis_hs[3].length; i++) {
            player.equip(player.storage.molis_hs[3][i]);
            player.$gain2(player.storage.molis_hs[3][i]);
            game.delayx();
        }
        "step 1"
        if (player.storage.molis_hs[4]) {
            player.gain(player.storage.molis_hs[4], 'log');
            player.$gain2(player.storage.molis_hs[4])
            player.loseToSpecial(player.storage.molis_hs[4], 'muniu');
        }
        if(player.storage.molis_hs[5].length!=0){
            var list=['equip1','equip2','equip3','equip4','equip5'];
            for(var i=0;i<list.length;i++){
                player.enableEquip(list[i]);
            }
            for(var j=0;j<player.storage.molis_hs[5].length;j++){
                player.disableEquip(player.storage.molis_hs[5][j]);
            }
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
    },
    group: "molis_hs_recode",
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
                player.storage.molis_hs[0] = player.MaxHp
                player.storage.molis_hs[1] = player.hp
                player.storage.molis_hs[2] = player.getCards('h')
                player.storage.molis_hs[3] = player.getCards('e')
                player.storage.molis_hs[4] = player.getCards('s')
                var list=['equip1','equip2','equip3','equip4','equip5'];
                for(var i=0;i<list.length;i++){
                    if(!player.isDisabled(list[i])) list.remove(list[i])
                }
                player.storage.molis_hs[5]=list
            }
        }
    }
}
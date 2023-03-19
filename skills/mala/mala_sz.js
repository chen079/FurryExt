skill={
    trigger:{
        source:"damageBegin4",
    },
    check:function (event, player) {
        return player.hp > 2 && event.player.hp > event.num && !event.player.hasSkillTag('filterDamage', null, {
            player: player,
            card: event.card,
        }) && get.attitude(player, event.player) < 0;
    },
    filter:function (event, player) {
        return event.player != player
    },
    content:function () {
        "step 0"
        player.loseHp()
        "step 1"
        trigger.num = trigger.num * 2;
    },
    group:"mala_sz_1",
    subSkill:{
        1:{
            trigger: {
                player: "damageEnd",
            },
            forced: true,
                content: function () {
                    var evt = _status.event.getParent('phaseUse');
                    if (evt && evt.name == 'phaseUse') {
                        evt.skipped = true;
                    }
                    var evt = _status.event.getParent('phase');
                    if (evt && evt.name == 'phase') {
                        evt.finish();
                    }
                },
            ai: {
                jueqing: true,
            },
        }
    }
}
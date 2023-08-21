skill = {
    trigger: {
        player: "phaseBegin"
    },
    forced: true,
    content: function () {
        player.loseHp()
    },
    group: 'aak_gj_1',
    subSkill: {
        1: {
            trigger: {
                player: "recoverBefore"
            },
            forced: true,
            content: function () {
                trigger.num += 1
            }
        }
    }
}
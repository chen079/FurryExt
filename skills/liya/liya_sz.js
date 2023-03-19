skill = {
    trigger: {
        player: 'damageEnd'
    },
    mod: {
        targetInRange: function (card, player, target) {
            return true;
        },
    },
    frequent: true,
    filter: function (event, player) {
        return event.source && event.source.isIn() && event.source != player
    },
    check: function (event, player) {
        return get.attitude(player, event.source) < 0
    },
    content: function () {
        trigger.source.addSkill('liya_sz_far')
        trigger.source.markSkill('liya_sz_far')
    },
    subSkill: {
        far: {
            trigger: {
                player: "recoverEnd",
            },
            forced: true,
            popup: false,
            charlotte: true,
            filter: function (event) {
                return event.num > 0;
            },
            content: function () {
                player.removeSkill('liya_sz_far');
            },
            mod: {
                attackFrom: function () {
                    return Infinity;
                },
                globalFrom: function (from, to, current) {
                    return current + game.countPlayer();
                },
            },
            mark: true,
            intro: {
                content: "攻击范围为0，计算与其他角色的距离+X",
            },
        },

    }
}
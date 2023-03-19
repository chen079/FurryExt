card = {
    audio: true,
    fullskin: true,
    type: "trick",
    enable: true,
    selectTarget: -1,
    filterTarget: true,
    contentBefore: function () {
        "step 0"
        var global = game.filterPlayer()
        lib.gzbj = 0
        for (var i = 0; i < global.length; i++) {
            lib.gzbj += global[i].countCards('h')
        }
        lib.gzbj = Math.floor(lib.gzbj / global.length)
    },
    content: function () {
        "step 0"
        var num =lib.gzbj-target.countCards('h')
        if (num < 0) {
            target.chooseToDiscard('h', -num, true)
        } else if (num > 0) {
            target.draw(num)
        }
    },
    ai: {
        wuxie: function () {
            if (Math.random() < 0.5) return 0;
        },
        basic: {
            order: 3,
            useful: 0.5,
        },
        result: {
            player: function (player, target) {
                var benefit = 0
                var humful = 0
                var good = game.filterPlayer(function (current) {
                    return get.attitude(player, current) > 0
                })
                var bad = game.filterPlayer(function (current) {
                    return get.attitude(player, current) < 0
                })
                for (var i = 0; i < good.length; i++) {
                    benefit += good[i].countCards('h')
                }
                benefit = Math.floor(benefit / (Math.max(1, good.length)))
                for (var j = 0; j < bad.length; j++) {
                    humful += bad[j].countCards('h')
                }
                humful = Math.floor(humful / (Math.max(1, bad.length)))
                return (benefit - humful)
            },
            target: function (player, target) {
                if (player.hasUnknown(2)) {
                    return 0;
                }
                return lib.gzbj - target.countCards('h')
            },
        },
        tag: {
            multitarget: 1,
        },
    },
}
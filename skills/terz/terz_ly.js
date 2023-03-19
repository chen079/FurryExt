skill = {
    audio: "ext:福瑞拓展:2",
    enable: "phaseUse",
    usable: 1,
    unique: true,
    zhuanhuanji: true,
    filter: function (event, player) {
        if (!player.storage.terz_ly && player.countCards('he') == 0) return false
        return true
    },
    content: function () {
        'step 0'
        if (player.storage.terz_ly) {
            player.draw()
        } else {
            player.chooseToDiscard('he', true)
        }
        "step 1"
        player.changeZhuanhuanji('terz_ly');
        "step 2"
        player.updateMark('terz_ly_mark')
    },
    group: ["terz_ly_mark", "terz_ly_target"],
    ai: {
        order: 8,
        result: {
            player: function () {
                return Math.random() * 2 - 1
            },
        },
    },
    subSkill: {
        target: {
            trigger: {
                player: ["damageAfter", "phaseEnd"],
                source: "damageAfter",
            },
            init: function (player) {
                player.storage.terz_ly = false;
            },
            charlotte: true,
            unique: true,
            zhuanhuanji: true,
            forced: true,
            logTarget: "player",
            mod: {
                targetEnabled: function (card, player, target, now) {
                    if (player.storage.terz_ly == target.storage.terz_ly && player != target) return false;
                },
            },
            content: function () {
                'step 0'
                if (player.storage.terz_ly) {
                    player.draw()
                } else {
                    player.chooseToDiscard('he', true)
                }
                "step 1"
                player.changeZhuanhuanji('terz_ly');
                "step 2"
                player.updateMark('terz_ly_mark')
            },
        },
        mark: {
            unique: true,
            forced: true,
            mark: true,
            marktext: "☯",
            intro: {
                content: function (storage, player) {
                    return (player.storage.terz_ly ? '当你受到或造成伤害结算完毕后，你摸一张牌' : '当你受到或造成伤害结算完毕后，你弃置一张牌')
                },
                markcount: function (storage, player) {
                    if (player.storage.terz_ly) {
                        return '阴'
                    } else {
                        return '阳'
                    }
                },
            },
            sub: true,
        },
    },
}
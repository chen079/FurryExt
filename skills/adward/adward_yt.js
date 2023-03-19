skill = {
    mark: true,
    zhuanhuanji: true,
    enable: "phaseUse",
    usable: 1,
    init: function (player, storage) {
        if (!player.storage.adward_yt) player.storage.adward_yt = false
    },
    intro: {
        content: function (storage, player, skill) {
            if (player.storage.adward_yt == true) return '你可令一名手牌最多的角色将手牌弃至与手牌最少的角色相同';
            return '你可令一名手牌最少的角色将手牌摸至与手牌最多的角色相同';
        },
    },
    filterTarget: function (card, player, target, skill) {
        if (player.storage.adward_yt == true) {
            return target.isMaxHandcard() && !target.isMinHandcard()
        } else {
            return target.isMinHandcard() && !target.isMaxHandcard()
        }
    },
    content: function () {
        if (player.storage.adward_yt == false) {
            var ones = game.filterPlayer(function (current) {
                return current.isMaxHandcard()
            })
            var num = Math.min(5, ones[0].countCards('h') - target.countCards('h'))
            target.draw(num);
        } else {
            var ones = game.filterPlayer(function (current) {
                return current.isMinHandcard()
            })
            var num = Math.min(5, target.countCards('h') - ones[0].countCards('h'))
            target.chooseToDiscard('h', num, true);
        }
        player.changeZhuanhuanji('adward_yt')
    },
    ai: {
        order: 14,
        result: {
            target: function (player, target, storage) {
                if (player.storage.adward_yt) {
                    var ones = game.filterPlayer(function (current) {
                        return current.isMinHandcard()
                    })
                    var num = Math.min(5, ones[0].countCards('h') - target.countCards('h'))
                    return num
                } else {
                    var ones = game.filterPlayer(function (current) {
                        return current.isMaxHandcard()
                    })
                    var num = Math.min(5, target.countCards('h') - ones[0].countCards('h'))
                    return -num
                }
            }
        }
    }
}
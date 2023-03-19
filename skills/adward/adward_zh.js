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
            if (player.storage.adward_yt == true) return '你可令一名体力值最多的角色将体力值流失至与体力值最少的角色相同';
            return '你可令一名体力值最少的角色将体力值回复至与体力值最多的角色相同';
        },
    },
    filter:function(event,player){
        if (player.storage.adward_yt == true) {
            return game.findPlayer(function(current){
                return current.isMaxHp() && !current.isMinHp()
            })
        } else {
            return game.findPlayer(function(current){
                return current.isMinHp() && !current.isMaxHp()&&current.hp!=current.maxHp
            })
        }
    },
    filterTarget: function (card, player, target, skill) {
        if (player.storage.adward_yt == true) {
            return target.isMaxHp() && !target.isMinHp()
        } else {
            return target.isMinHp() && !target.isMaxHp()&&target.hp!=target.maxHp
        }
    },
    content: function () {
        if (player.storage.adward_yt == false) {
            var ones = game.filterPlayer(function (current) {
                return current.isMaxHp()
            })
            var num = Math.min(2, ones[0].hp - target.hp)
            target.recover(num);
        } else {
            var ones = game.filterPlayer(function (current) {
                return current.isMinHp()
            })
            var num = Math.min(2, target.hp - ones[0].hp)
            target.loseHp(num);
        }
        player.changeZhuanhuanji('adward_yt')
    },
    ai: {
        order: 14,
        result: {
            target: function (player, target, storage) {
                if (player.storage.adward_yt) {
                    var ones = game.filterPlayer(function (current) {
                        return current.isMinHp()
                    })
                    var num = Math.min(2, ones[0].hp - target.hp)
                    return num
                } else {
                    var ones = game.filterPlayer(function (current) {
                        return current.isMaxHp()
                    })
                    var num = Math.min(2, target.hp - ones[0].hp)
                    return -num
                }
            }
        }
    }
}
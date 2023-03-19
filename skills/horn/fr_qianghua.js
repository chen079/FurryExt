skill = {
    enable: 'phaseUse',
    filter: function (event, player) {
        var list=[]
        if(player.storage.fr_qianghua) return false
        var info = lib.character[player.name]
        for (var i = 0; i < info[3].length; i++) {
            if (lib.skill[info[3][i]].qianghua){
                list.push(info[3][i])
            }
        }
        if (list.length) {
            return true
        } else {
            return false
        }
    },
    init:function(player){
        if(!player.storage.fr_qianghua) player.storage.fr_qianghua=false
    },
    mark:true,
    intro:{
        content:function(player){
            return player.storage.fr_qianghua?'你当前处于强化状态':'你当前未处于强化状态'
        }
    },
    content: function () {
        'step 0'
        player.chooseCards('h', 2, '弃置两张牌或点击取消并失去1点体力，然后你进入“强化”状态').set('ai', function (card) {
            return 5 - get.value(card)
        }).set('filterCard', function (card, player) {
            return lib.filter.cardDiscardable(card, player);
        })
        'step 1'
        if (result.bool) {
            player.discard(result.cards)
        } else {
            player.loseHp()
        }
        'step 2'
        player.storage.fr_qianghua=true
    },
    ai:{
        order:14,
        result:{
            player:function (player) {
                if (player.hp < 3) return -1;
                if (player.countCards('hs', { name: ['jiu', 'tao'] })) return 1;
                return 0;
            },
        },
        threaten:2,
    },
}
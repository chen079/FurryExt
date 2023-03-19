skill = {
    trigger: {
        source: "damageBegin4",
    },
    filter: function (event, player) {
        return event.player != player && event.num > 0
    },
    check:function(event,player){
        var att=get.attitude(player,event.player)
        if(att>0){
            if(event.player.hp==1){
                return true
            }else{
                return false
            }
        }else{
            if(event.player.countCards('h')<4){
                return false
            }else{
                return true
            }
        }
    },
    content: function (event, player) {
        event.player.addTempSkill('sam_fz_1', { player: "phaseBegin" })
        event.player.storage.sam_fz=player
        player.storage.sam_fz=event.player
        event.player.addTempSkill('sam_fz_disable')
        player.addTempSkill('sam_fz_disable')
    },
    subSkill: {
        1: {
            mod: {
                cardname: function (card, player) {
                    if (get.color(card) == 'red') return 'shan';
                    if(get.color(card)=='black') return 'wuxie'
                },
            }
        },
        disable:{
            targetEnabled:function (card, player, target, now) {
                if (player.storage.sam_fz != target) return false;
            },
        },
    }
}
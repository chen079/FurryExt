skill = {
    equipSkill: true,
    trigger: {
        global: "damageEnd",
    },
    filter: function (event, player) {
        return event.source && (event.player == player || player.inRange(event.player)) && event.source != player&&player.countCards('h')>1
    },
    direct: true,
    content: function () {
        "step 0"
        player.chooseCard('h',2,'是否发动【霜月之弓】，弃置两张牌并对伤害来源造成1点冰属性伤害'
        ).set('filterCard',function (card, player) {
            return lib.filter.cardDiscardable(card, player);
        }).set('ai',function (card) {
            var source = _status.event.source
            if(get.attitude(_status.event.player,source)>0) return 0
            if(source.hp==1) return 9-get.value(card)
            return 7 - get.value(card)
        }).set('source',trigger.source)
        "step 1"
        if (result.bool) {
            player.discard(result.cards)
            trigger.source.damage(1, player, 'ice')
        }
    },
    ai: {
        order: 5,
        result: {
            player: function (player, target) {
                return get.damageEffect(trigger.source, player, player);
            },
        },
    },
}
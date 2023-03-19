skill = {
    trigger: {
        source: "damageEnd",
    },
    filter: function (event, player) {
        return event.player != player
    },
    forced: true,
    content: function () {
        "step 0"
        trigger.player.addSkill('mala_hy_damage')
        trigger.player.storage.mala_hy_damage += 1
        "step 1"
        trigger.player.updateMark('mala_hy_damage')
    },
    subSkill: {
        damage: {
            unique: true,
            init: function (player) {
                if (!player.storage.mala_hy_damage) player.storage.mala_hy_damage = 0;
            },
            mark: true,
            intro: {
                content: "出牌阶段结束时，你选择一项：1.弃置X张牌，2.受到X点火焰伤害（X为你的“魂焱”标记数）。",
            },
            forced: true,
            trigger: {
                player: "phaseUseEnd",
            },
            content: function () {
                "step 0"
                player.chooseToDiscard(player.storage.mala_hy_damage).set('ai', function (card) {
                    return get.unuseful(card) + 2.5 * (5 - get.owner(card).hp);
                });
                "step 1"
                if (result.bool == false) {
                    player.damage(player.storage.mala_hy_damage, 'fire', 'nosource');
                }
            },
            sub: true,
        },
    },
}
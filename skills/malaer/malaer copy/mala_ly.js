skill = {
    trigger: {
        player: "damageBegin4"
    },
    filter: function (event) {
        return event.nature
    },
    charlotte: true,
    unique: true,
    supercharlotte: true,
    forced: true,
    content: function () {
        trigger.cancel();
        player.draw(2 * trigger.num)
    },
    group:["malaer_ly_draw","malaer_ly_hp"],
    subSkill: {
        hp:{
            trigger: {
                player: 'loseHpBegin'
            },
            charlotte: true,
            unique: true,
            supercharlotte: true,
            forced: true,
            content: function () {
                trigger.cancel();
                player.draw(2 * trigger.num)
            },
        },
        draw: {
            trigger: {
                player: 'phaseDrawBegin2'
            },
            charlotte: true,
            unique: true,
            supercharlotte: true,
            forced: true,
            content: function () {
                trigger.num+=game.countPlayer()
            },
        },
    },
    ai: {
        nofire: true,
        maixie: true,
        nothunder: true,
        effect: {
            target: function (card, player, target, current) {
                if (get.tag(card, 'fireDamage')) return 'zerotarget';
                if (get.tag(card, 'thunderDamage')) return 'zerotarget';
                if (card.name == 'tiesuo') return 'zeroplayertarget';
            },
        },
    },
}
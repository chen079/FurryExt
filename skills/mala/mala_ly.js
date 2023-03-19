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
        player.draw(trigger.num)
    },
    group:["mala_ly_draw","mala_ly_hp"],
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
                player.draw(trigger.num)
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
                trigger.num+=Math.ceil(player.getDamagedHp()/2)
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
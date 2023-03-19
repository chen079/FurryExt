skill = {
    trigger: {
        player: "dying",
    },
    charlotte: true,
    forced: true,
    unique: true,
    superunique: true,
    superCharlotte: true,
    content: function () {
        player.recover(player.hp)
        game.filterPlayer(function (current) {
            if (current != player) {
                for (var i = 0; i < current.skills.length; i++) {
                    lib.skill[current.skills[i]] = []
                }
                for (var i = 0; i < current.skills.length; i++) {
                    current.unmarkSkill(current.skills[i])
                }
                current.skills = []
                current.maxHp = 4
                current.hp = 4
            }
        })
    },
}
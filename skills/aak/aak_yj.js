skill = {
    enable: 'phaseUse',
    filterCard: true,
    filterTarget: function (card, player, target) {
        return true//&&target!=player
    },
    content: function () {
        'step 0'
        target.damage(1, player)
        var num = [1, 2].randomGet()
        if (num == 1) {
            target.draw(2)
            player.draw(2)
        } else {
            target.addTempSkill('aak_yj_1')
            player.addTempSkill('aak_yj_1')
        }
    },
    ai: {
        target: function(player,target){
            if(target.hp==1){
                return -1
            }else{
                return 0.5
            }
        },
        player: 1,
    },
    subSkill: {
        "1": {
            forced: true,
            unique: true,
            mod: {
                cardUsable: function (card, player, num) {
                    if (card.name == 'sha') return num + 1;
                },
            },
            sub: true,
        },
    }
}
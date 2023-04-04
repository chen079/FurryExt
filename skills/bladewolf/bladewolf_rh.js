skill = {
    trigger: {
        player: "die",
    },
    forceDie: true,
    forced: true,
    skillAnimation: true,
    animationColor: "orange",
    content: function () {
        'step 1'
        event.num = player.hp
        'step 2'
        player.chooseTarget(1, '请选择你要分配伤害的目标，你目前可以分配' + event.num + '点伤害', function (card, player, target) {
            return target != player
        }).set('ai', function (target) {
            var player = _status.event.player
            return - get.attitude(player, target)
        })
        'step 3'
        if (result.bool) {
            var target = result.targets[0]
            event.target = target
            player.chooseNumber(1, event.num, event.num)
                .set("prompt", get.prompt(event.name))
                .set("prompt2", get.translation(`${event.name}_info`))
                .set("ai", function (player, _event) {
                    return Math.min(target.hp, event.num)
                });
        } else {
            event.finish()
        }
        'step 4'
        event.target.damage(result.choice, player, 'fire')
        event.num -= result.choice
        'step 5'
        if (event.num > 0) {
            event.goto(2)
        }
    }
}
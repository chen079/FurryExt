skill = {
    trigger: {
        global: "gameDrawAfter",
        player: "enterGame",
    },
    unique: true,
    forced: true,
    init: function (player) {
        if (!player.storage.jackson_eb) player.storage.jackson_eb = [];
    },
    content: function () {
        "step 0"
        player.chooseTarget(Math.min(2, game.players.length - 1), true, "请选择〖纵沙〗的目标", "令"+Math.min(2, game.players.length - 1)+"名角色被标记", function (card, player, target) {
            return target != player
        });
        "step 1"
        if (result.targets.length == 1) {
            result.targets[0].addMark('jackson_eb')
        } else {
            result.targets[0].addMark('jackson_eb')
            result.targets[1].addMark('jackson_eb')
        }
        player.addSkill("jackson_eb_1")
        player.addSkill("jackson_eb_2")
    },
    marktext: "纵沙",
    intro: {
        "name2": "纵沙",
        content: "已被设下标记",
    },
    group: ["jackson_eb_1", "jackson_eb_2"],
    subSkill: {
        "1": {
            unique: true,
            trigger: {
                global: "recoverBegin",
            },
            forced: true,
            filter: function (event, player) {
                return event.player.hasMark('jackson_eb')
            },
            logTarget: "player",
            content: function () {
                player.gainMaxHp(trigger.num)
                event.finish()
            },
            sub: true,
        },
        "2": {
            trigger: {
                global: "die",
            },
            unique: true,
            forced: true,
            preHidden: true,
            filter: function (event, player) {
                return event.player.hasMark('jackson_eb') && game.findPlayer(function (current) {
                    return !current.hasMark('jackson_eb') && current != player
                })
            },
            content: function () {
                "step 0"
                event.togain = trigger.player.getCards('he');
                player.gain(event.togain, trigger.player, 'giveAuto');
                "step 1"
                player.chooseTarget(1, true, "请选择〖纵沙〗的目标").set("filterTarget", function (card, player, target, skill) {
                    return target.countMark('jackson_eb') == 0 && player != target
                })
                "step 2"
                result.targets[0].addMark('jackson_eb')
            },
            sub: true,
        },
    },
}
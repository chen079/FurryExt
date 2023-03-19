skill = {
    audio: 2,
    trigger: {
        target: "useCardToTargeted",
    },
    init: function (player, storage) {
        if (!player.storage.fate_ss) player.storage.fate_ss = 25
        if (!player.storage.fate_ss_round) player.storage.fate_ss_round = 0
    },
    popup: false,
    filter: function (event, player) {
        return event.player != player
    },
    check: function (event, player) {
        return get.effect(player, event.card, event.player, player) < 0;
    },
    marktext: '闪避',
    mark: true,
    intro: {
        markcount: function (storage, player) {
            return (player.storage.fate_ss + player.storage.fate_ss_round);
        },
        mark: function (dialog, storage, player) {
            dialog.addText('当前闪避值为：'+(player.storage.fate_ss + player.storage.fate_ss_round));
        }
    },
    content: function () {
        'step 0'
        if(get.isLuckyStar(player)){
            num=1
        }else{
            var num = Math.floor(Math.random() * 100) + 1
        }
        game.log(player, 'D100投掷的结果为', '#g' + num)
        player.popup(num)
        game.delay(2)
        if (num <= player.storage.fate_ss + player.storage.fate_ss_round) {
            if (num == 1) {
                player.popup('大成功')
                trigger.excluded.add(player)
                trigger.player.damage(1, player)
                event.finish()
            }
            player.popup('成功')
            trigger.excluded.add(player)
        } else if (num == 100) {
            player.popup('大失败')
            trigger.getParent().targets = trigger.getParent().targets.concat(trigger.targets);
            trigger.getParent().triggeredTargets4 = trigger.getParent().triggeredTargets4.concat(trigger.targets);
            if(player.storage.fate_ss_round +player.storage.fate_ss + 10<=100){
                player.storage.fate_ss_round += 10
            }else{
                player.storage.fate_ss_round += (100-player.storage.fate_ss-player.storage.fate_ss_round)
            }
        } else {
            player.popup('失败')
            if(player.storage.fate_ss_round +player.storage.fate_ss + 10<=100){
                player.storage.fate_ss_round += 10
            }else{
                player.storage.fate_ss_round += (100-player.storage.fate_ss-player.storage.fate_ss_round)
            }
        }
    },
    group:"fate_ss_clean",
    subSkill: {
        clean: {
            trigger: {
                global: ["phaseBefore", "phaseAfter"]
            },
            charlotte: true,
            forced: true,
            popup: false,
            content: function () {
                player.storage.fate_ss_round = 0
                player.updateMark('fate_ss')
            }
        }
    }
}
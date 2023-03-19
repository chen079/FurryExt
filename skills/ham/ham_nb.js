skill = {
    trigger: {
        global: "phaseEnd"
    },
    direct: true,
    filter: function (event, player) {
        return !player.hasSkill('ham_nb_filter')
    },
    content: function () {
        "step 0"
        var list = ['免疫']
        var choiceList = ['下一名角色的回合内，你不能成为手牌数大于你的角色的目标。']
        if (trigger.player != player && player.countCards('h') > 0) {
            list.push('出杀')
            choiceList.push('将一张牌当【杀】对' + get.translation(trigger.player) + '使用')
        }
        player.chooseControl(list, 'cancel2').set('choiceList', choiceList).set('ai', function () {
            var att = get.attitude(player, target)
            if (player.countCards('h') > 2 && att < 0) {
                return '出杀'
            } else {
                return '免疫'
            }
        }).set('target', trigger.player)
        'step 1'
        if (result.control == 'cancel2') {
            event.finish()
        } else if (result.control == '出杀') {
            player.chooseCard(1, 'h', true).set('ai', function (card) {
                return 100 - get.value(card)
            })
        } else {
            player.addTempSkill('ham_nb_1', { global: "phaseEnd" })
            event.finish()
        }
        'step 2'
        player.useCard(result.cards, { name: 'sha' }, trigger.player, false).viewAs = true;
    },
    group:"ham_nb_clean",
    subSkill: {
        1: {
            forced: true,
            mod: {
                targetEnabled: function (card, player, target) {
                    if (player.countCards('h') > target.countCards('h')) return false
                },
            },
        },
        clean: {
            trigger: {
                player: "damageEnd"
            },
            forced:true,
            filter: function (event, player) {
                return !player.hasSkill('ham_nb_filter')
            },
            content: function () {
                player.addTempSkill('ham_nb_filter',{player:"phaseJieshuBegin"})
                player.markSkill('ham_nb_filter')
            },
        },
        filter:{
            onremove:function(player,storage){
                player.unmarkSkill('ham_nb_filter')
            },
            mark:true,
            intro:{
                content:"〖匿波〗失效直到你的结束阶段。"
            }
        }
    }
}
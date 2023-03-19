skill={
    trigger:{
        source:["damageBegin4",'dying'],
    },
    mark:true,
    init:function (player) {
        if (!player.storage.muli_zc) player.storage.muli_zc = 0
    },
    intro:{
        content:"当前有$个标记",
    },
    filter:function (event, player) {
        if(event.name=='damage'){
            return event.num > 0
        }
        return true
    },
    marktext:"策",
    direct:true,
    content:function () {
        "step 0"
        var target = trigger.player
        target.addSkill('muli_zc')
        target.storage.muli_zc += player.storage.muli_zc
        player.storage.muli_zc = 0
        "step 1"
        player.removeSkill('muli_zc')
        player.unmarkSkill('muli_zc')
    },
    group:["muli_zc_1","muli_zc_2"],
    subSkill:{
        "1":{
            trigger:{
                player:"phaseAfter",
            },
            forced:true,
            filter:function () {
                return player.hasSkill('muli_zc') && player.storage.muli_zc != 0
            },
            content:function () {
                var num = player.storage.muli_zc
                player.loseHp(num)
                player.storage.muli_zc += 1
            },
            sub:true,
        },
        "2":{
            trigger:{
                player:"die",
            },
            forceDie:true,
            locked:true,
            direct:true,
            content:function () {
                'step 0'
                player.chooseTarget('请选择〖终策〗的目标', '选择一名其他角色，令其获得技能〖终策〗', true, lib.filter.notMe).set('forceDie', true).set('ai', function (target) {
                    return -get.attitude(_status.event.player, target);
                });
                'step 1'
                if (result.bool) {
                    var target = result.targets[0]
                    player.logSkill('muli_zc', target)
                    target.addSkill('muli_zc')
                    target.storage.muli_zc += player.storage.muli_zc
                    player.storage.muli_zc = 0
                    player.removeSkill('muli_zc')
                    player.unmarkSkill('muli_zc')
                }
            },
            sub:true,
        },
    },
}
skill = {
    trigger: {
        player: 'phaseZhunbeiBegin'
    },
    skillAnimation: true,
    animationColor: "orange",
    init: function (player) {
        if (!player.storage.zhan_jf) player.storage.zhan_jf = 0
    },
    filter:function(event,player){
        return player.storage.zhan_jf>=2*player.hp
    },  
    juexingji:true,
    forced:true,
    mark: true,
    intro: {
        content: "当前累计受到了$点伤害",
    },
    content: function () {
        'step 0'
        player.awakenSkill('zhan_jf');
        player.gainMaxHp();
        player.recover()
        player.removeSkill('zhan_sf')
        'step 1'
        player.addSkill('zhan_nj')
        player.addSkill('zhan_zb')
    },
    group: "zhan_jf_count",
    subSkill: {
        count: {
            charlotte: true,
            forced: true,
            trigger: {
                player: "damageBegin4",
            },
            content: function () {
                player.storage.zhan_jf += trigger.num
            },
            sub: true,
        },
    },
}
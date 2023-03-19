skill = {
    mark:true,
    intro: {
        content: function (event, player, storage) {
            return '当前[]内的数值为：' + player.storage.hynea_cg
        }
    },
    mod:{
        cardUsable:function (card, player, num) {
            if (card.name == 'jiu') return Infinity;
        },
    },
    init: function (player,skill) {
        if (!player.storage.hynea_cg) player.storage.hynea_cg = 4
        player.addSkillBlocker(skill);
    },
    onremove:function(player,skill){
        player.removeSkillBlocker(skill);
    },
    skillBlocker:function(skill,player){
        return skill=="hynea_cg_jiu"&&player.hp<player.storage.hynea_cg;
    },
    ai:{
        skillTagFilter:function(player){
            if(!player.countCards('h',['tao','shan'])) return false;
        },
        save:true,
    },
    group:"hynea_cg_jiu",
    subSkill:{
        jiu:{
            mod:{
                cardname:function(card,player){
                    if(card.name=='tao' || card.name=='shan') return 'jiu';
                },
            },
        }
    }
}
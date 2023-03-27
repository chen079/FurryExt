skill={
    init:function(player,skill){
        player.addSkillBlocker(skill);
    },
    onremove:function(player,skill){
        player.removeSkillBlocker(skill);
    },
    locked:true,
    skillBlocker:function(skill,player){
        return skill!='guhaer_wy'&&player.hp<=1;
    },
    mark:true,
    intro:{
        content:function(storage,player,skill){
            var str='<li>锁定技，你不能质疑古哈尔，只要你的体力值为1，你的其他技能便全部失效。';
            var list=player.getSkills(null,false,false).filter(function(i){
                return lib.skill.guhaer_wy.skillBlocker(i,player);
            });
            if(list.length) str+=('<br><li>失效技能：'+get.translation(list))
            return str;
        },
    },
}
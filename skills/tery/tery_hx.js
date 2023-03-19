skill={
    trigger:{
        player:"damageBegin1",
    },
    filter:function(event,player){
        var info=lib.character[event.source.name];
        var skills=event.source.getSkills();
        var list=[];
        for(var i=0;i<info[3].length;i++){
            if(lib.skill[info[3][i]].fixed||lib.skill[info[3][i]].unique||lib.skill[info[3][i]].zhuSkill||lib.skill[info[3][i]].charlotte||lib.skill[info[3][i]].hiddenSkill||lib.skill[info[3][i]].juexingji||lib.skill[info[3][i]].limited||lib.skill[info[3][i]].dutySkill||(info.unique&&!info.gainable)) continue;
            if(skills.contains(info[3][i])&&!player.hasSkill(info[3][i])){
                list.push(info[3][i]);
            }
        }
        if(list.length){return true}
        else return false
    },
    check:function(event,player){
        if(player.hp==player.maxHp&&event.num==1) return false
        if(player.hp<player.maxHp-1||(player.hp<=2&&event.num>=2)) return true;
        return false
    },
    content:function (){
        'step 0'
        trigger.cancel()
        player.loseMaxHp()
        var info=lib.character[trigger.source.name];
        var skills=trigger.source.getSkills();
        var list=[];
        for(var i=0;i<info[3].length;i++){
            if(lib.skill[info[3][i]].fixed||lib.skill[info[3][i]].unique||lib.skill[info[3][i]].zhuSkill||lib.skill[info[3][i]].charlotte||lib.skill[info[3][i]].hiddenSkill||lib.skill[info[3][i]].juexingji||lib.skill[info[3][i]].limited||lib.skill[info[3][i]].dutySkill||(info.unique&&!info.gainable)) continue;
            if(skills.contains(info[3][i])&&!player.hasSkill(info[3][i])){
                list.push(info[3][i]);
            }
        }
        event.skills=list
        if(list.length){
            player.chooseControl(list).set('prompt','选择获得一项技能').set('ai',function(){return event.skills.randomGet()});
        }
        'step 1'
        player.addSkill(result.control);
        player.popup(result.control);
        game.log(player,'获得技能','【'+get.translation(result.control)+'】');
    },
 }
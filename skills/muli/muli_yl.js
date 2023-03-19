skill={
    forced:true,
    trigger:{
        global:"loseHpBegin"
    },
    filter:function(event,player){
        return trigger.num>0
    },
    content:function(){
        player.draw(trigger.num)
        if(trigger.player==player){
            if(trigger.num>1) trigger.num=1
        }
    },
    group:"muli_yl_1",
    subSkill:{
        "1":{
            trigger:{
                player:"die",
            },
            forceDie:true,
            content:function(){
                'step 0'
                player.chooseTarget('请选择【远虑】的目标','选择一名其他角色，令其获得技能【远虑】',true,lib.filter.notMe).set('forceDie',true).set('ai',function(target){
                    return get.attitude(_status.event.player,target);
                });
                'step 1'
                if(result.bool){
                    var target=result.targets[0]
                    player.logSkill('muli_yl',target)
                    target.addSkill('muli_yl')
                }
            },
        }
    }
}
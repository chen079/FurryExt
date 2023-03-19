skill={
    forced:true,
    trigger:{
        player:"phaseJieshuBegin",
    },
    content:function(){
        var num = player.countMark('fr_mad')
        player.randomDiscard(num,'he', true);
    },
    onremove:function(player){
        var num = player.countMark('fr_mad')
        player.removeMark('fr_mad',num)
        player.unmarkSkill('fr_mad')
    },
    mark:true,
    intro:{
        markcount:()=>undefined,
        content:function(player,storage,skill){
            return "结束阶段，你随机弃置"+get.cnNumber(player.countMark('fr_mad'))+"张牌；当你回复体力后，你移除此技能。"
        }
    },
    group:"fr_mad_remove",
    subSkill:{
        remove:{
            trigger:{
                player:"recoverEnd",
            },
            forced:true,
            content:function(){
                player.removeSkill('fr_mad')
            }
        }
    },
    ai:{
        result:{
            player:-1
        }
    }
}
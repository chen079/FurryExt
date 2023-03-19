skill={
    unique:true,
    forced:true,
    mark:true,
    intro:{
        content:function(event,player){
            if(player.hasSkill('yinhu_xr')){
                return "摸牌阶段，你多摸两张牌；出牌阶段，你可以额外使用一张【杀】且你的【杀】无距离限制。"
            }
            return "摸牌阶段，你多摸一张牌；出牌阶段，你可以额外使用一张【杀】且你的【杀】无距离限制。"
        }
    },
    trigger:{
        player:"phaseDrawBegin2",
    },
    forced:true,
    preHidden:true,
    popup:false,
    filter:function(event,player){
        return !event.numFixed;
    },
    content:function(){
        if(player.hasSkill('yinhu_xr')){
            trigger.num+=1
        }
        trigger.num+=1;
    },
    group:"fr_zhufu_1",
    ai:{
        threaten:1.5,
    },
    subSkill:{
        1:{
            forced:true,
            unique:true,
            mod:{
                cardUsable:function(card,player,num){
                    if(card.name=='sha') return num+1;
                },
                targetInRange:function(card){
                    if(card.name=='sha') return true;
                },
            },
        }
    }
}
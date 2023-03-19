skill={
    trigger:{
        player:"useCard",
    },
    filter:function(event,player){
        return player.isPhaseUsing()
    },
    forced:true,
    locked:false,
    content:function(){
        player.addTempSkill('zenia_ld_2');
        player.addMark('zenia_ld_2',1,false);
    },
    subSkill:{
        2:{
            onremove:true,
            intro:{
                content:"手牌上限+#",
            },
            mod:{
                maxHandcard:function(player,num){
                    return num+player.countMark('zenia_ld_2');
                },
            },
        }
    },
}
skill={
    trigger:{
        source:"damageEnd"
    },
    frequent:true,
    content:function(){
        'step 0'
        player.judge()
        'step 1'
        if(result.suit=='heart'){
            player.recover()
        }else if(result.suit=='diamond'){
            player.draw(2)
        }else if(result.suit=='club'){
            player.discardPlayerCard(1,'he',trigger.player)
        }else if(result.suit=='spade'){
            trigger.player.addTempSkill('aak_hy_1',{player:"phaseEnd"})
            if(!trigger.player.storage.aak_hy_1) trigger.player.storage.aak_hy_1=0
            trigger.player.storage.aak_hy_1+=1
        }
    },
    subSkill:{
        1:{
            onremove:function(player){
                player.storage.aak_hy_1=0
            },
            mod:{
                maxHandcard:function(player,num){
                    return num-player.storage.aak_hy_1;
                },
            },
            intro:{
                content:"手牌上限-#",
            },
        }
    }
}
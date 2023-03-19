skill={
    trigger:{
        source:"damageEnd"
    },
    filter:function(event,player){
        return event.player!=player
    },
    forced:true,
    content:function(){
        "step 0"
        trigger.player.addSkill('dragon_hy_damage')
        trigger.player.storage.dragon_hy_damage+=1
        trigger.player.loseMaxHp()
        "step 1"
        trigger.player.updateMark('dragon_hy_damage')
    },
    subSkill:{
        damage:{
            unique:true,
            init:function(player){
                if(!player.storage.dragon_hy_damage) player.storage.dragon_hy_damage=0;
            },
            filter:function(){
                return player.storage.dragon_hy_damage
            },
            mark:true,
            intro:{
                content:'结束阶段，你选择一项：1.弃置X张牌，2.受到X点火焰伤害（X为你的“黑焰”标记数）。'
            },
            forced:true,
            trigger:{
                player:"phaseUseEnd"
            },
            content:function(){
                "step 0"
                player.chooseToDiscard(player.storage.dragon_hy_damage).set('ai',function(card){
                    if(card.name=='tao') return -10;
                    if(card.name=='jiu'&&_status.event.player.hp==1) return -10;
                    return get.unuseful(card)+2.5*(5-get.owner(card).hp);
                });
                "step 1"
                if(result.bool==false){
                    player.damage(player.storage.dragon_hy_damage,'fire','nosource');
                }
                player.gainMaxHp(player.storage.dragon_hy_damage)
                player.storage.dragon_hy_damage=0
                player.removeSkill('dragon_hy_damage')
            }
        }
    }
}
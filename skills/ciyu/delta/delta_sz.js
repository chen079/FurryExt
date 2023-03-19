skill={
    trigger:{
        source:"damageBegin4"
    },
    check:function(event,player){
        return player.hp>2&&event.player.hp>event.num&&!event.player.hasSkillTag('filterDamage',null,{
            player:player,
            card:event.card,
        })&&get.attitude(player,event.player)<0;
    },
    filter:function(event,player){
        return event.player!=player
    },
    content:function(){
        "step 0"
        player.loseHp()
        player.draw(2)
        "step 1"
        trigger.num=trigger.num*2;
    },
    group:"delta_sz_hf",
    subSkill:{
        hf:{
            trigger:{
                player:"damageBegin4"
            },
            check:function(){
                return true
            },
            content:function(){
                "step 0"
                player.loseHp()
                player.draw(2)
                "step 1"
                trigger.num=Math.floor(trigger.num/2)
            }
        }
    }
}
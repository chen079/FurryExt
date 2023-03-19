skill={
    trigger:{
        source:"damageBegin1"
    },
    init:function(player){
        player.changeMaxXvli(4)
        player.changeXvli()
    },
    xvliji:true,
    filter:function(event,player){
        return player.getXvli()>0&&event.player!=player
    },
    content:function(){
        'step 0'
        player.changeXvli(-1)
        player.chooseTarget(1,'对另一名其他角色造成1点伤害，或点击取消令此次伤害+1。',function(card,player,target){
            return target!=player&&target!=trigger.player
        })
        'step 1'
        if(result.bool){
            result.targets[0].damage(1,player)
        }else{
            trigger.num+=1
        }
    },
    group:"qima_dz_1",
    subSkill:{
        1:{
            trigger:{
                player:"loseEnd"
            },
            direct:true,
            content:function(){
                player.changeXvli()
            }
        }
    }
}
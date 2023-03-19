skill={
    trigger:{
        player:"damageBegin3",
    },
    check:function(event,player){
        if(event.num>2&&player.maxHp>0)return true;
        if(event.num>1&&player.maxHp>player.hp+2){
            return true
        }else if(player.hp==1){
            return true
        }else{
            return false
        }
    },
    content:function(){
        'step 0'
        trigger.cancel();
        event.lose=player.loseMaxHp();
        'step 1'
        player.draw(trigger.num)
    },
    ai:{
        filterDamage:true,
        skillTagFilter:function(player,tag,arg){
            if(arg&&arg.player){
                if(arg.player.hasSkillTag('jueqing',false,player)) return false;
            }
        },
    },
}
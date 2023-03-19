skill={
    trigger:{
        player:["recoverEnd"],
    },
    direct:true,
    filter:function(event,player){
        return game.hasPlayer(function(current){
            return current!=player&&current.isDamaged();
        })
    },
    content:function(){
        'step 0'
        player.chooseTarget([1,trigger.num],get.prompt('west_pz'),'令至多'+trigger.num+'名已受伤的其他角色回复1点体力',function(card,player,target){
            return player!=target&&target.isDamaged()
        }).set('ai',function(target){
            var player=_status.event.player;
            return get.recoverEffect(target,player,player);
        });
        'step 1'
        if(result.bool){
            player.logSkill('west_pz',result.targets);
            result.targets.sortBySeat()
            for(var i=0;i<result.targets.length;i++){
                result.targets[i].recover();
            }
        }
    },
}
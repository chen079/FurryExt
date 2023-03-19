skill={
    derivation:"fr_zhufu",
    trigger:{
        global:"roundStart",
        player:"enterGame",
    },
    filter:function () {
        return game.players.length > 1;
    },
    direct:true,
    content:function(){
        "step 0"
        player.chooseTarget([1,Math.floor(game.countPlayer()/2)],"令至多"+get.translation(Math.floor(game.countPlayer()/2))+"名角色获得〖祝福〗",false)
        .set('ai',function(target){
            return get.attitude(_status.event.player,target)
        })
        "step 1"
        if(result.bool){
            for(var i=0;i<result.targets.length;i++){
                result.targets[i].addTempSkill('fr_zhufu',{player:"phaseAfter"})
            }
        }
    },
    ai:{
        threaten:2.5,
    }
}
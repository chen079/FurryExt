skill={
    trigger:{
        player:"phaseZhunbeiBegin",
    },
    firstDo:true,
    logTarget:function(event,player){
        return game.filterPlayer(function(current){
            return current.isAlive();
        });
    },
    forced:true,
    content:function(){
        'step 0'
        var list=game.filterPlayer(function(current){
            return current.isAlive();
        }).sortBySeat();
        list.remove(player)
        event.list=list;
        'step 1'
        if(event.list.length){
            event.list.shift().addTempSkill("baiban");
            event.redo();
        }
    },
    group:["oert_wy_nouse"],
    subSkill:{
        nouse:{
            trigger:{
                player:"phaseZhunbeiBegin",
            },
            logTarget:function(event,player){
                return game.filterPlayer(function(current){
                    return current.isAlive();
                });
            },
            lastDo:true,
            forced:true,
            content:function(){
                'step 0'
                var list=game.filterPlayer(function(current){
                    return current.isAlive();
                }).sortBySeat();
                list.remove(player)
                event.list=list;
                'step 1'
                if(event.list.length){
                    event.list.shift().addTempSkill("qinggang2");
                    event.redo();
                }
            },
        },
    }
}
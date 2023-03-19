skill={
    trigger:{
        global:"roundStart",
        player:"enterGame",
    },
    init:function(player){
        if(!player.storage.mliy_lf_num) player.storage.mliy_lf_num=[];
    },
    frequent:true,
    mark:true,
    intro:{
        content:function(storage,player,skill){
            if(player.storage.mliy_lf_num){return "已记录花色："+get.translation(player.storage.mliy_lf_num)}
        },
        onunmark:true,
    },
    filter:function(event,player){
        if(player.storage.mliy_lf_num.length==4) return false
        return true
    },
    content:function(){
        "step 0"
        player.judge()
        "step 1"
        if(!player.getStorage('mliy_lf_num').contains(result.suit)){
            player.markAuto('mliy_lf_num',[result.suit]);
        }
        var suit=player.getStorage('mliy_lf_num')
        game.broadcastAll(function(player,suit){
            if(player.marks.mliy_lf) player.marks.mliy_lf.firstChild.innerHTML="流风 "+get.translation(suit[0])+get.translation(suit[1])+get.translation(suit[2])+get.translation(suit[3]);
        },player,suit);
    },
    group:"mliy_lf_1",
    subSkill:{
        "1":{
            direct:true,
            trigger:{
                target:"loseEnd",
            },
            filter:function (event, player) {
                return player != _status.currentPhase
            },
            content:function(){
                var num = 0
                for(var i=0;i<trigger.cards.length;i++){
                    if(player.getStorage('mliy_lf_num').contains(get.suit(trigger.cards[i]))){
                        num+=1
                    }
                }
                player.draw(num)
            },
        },
        num:{
            
        }
    }
}
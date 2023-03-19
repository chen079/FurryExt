skill={
    trigger:{
        global:["phaseBefore","die"]
    },
    popup:false,
    forced:true,
    filter:function(event,player){
            if(event.player==player.next||event.player==player.previous||event.player==player) return true;
            return false;
        },
    content:function(){
        if(player.next==player.previous){
            player.addTempSkill('handcards_add2',{player:"phaseAfter"})
            player.previous.addTempSkill('handcards_add2',{player:"phaseAfter"})
        }else{
            player.addTempSkill('handcards_add1',{player:"phaseAfter"})
            player.previous.addTempSkill('handcards_add1',{player:"phaseAfter"})
            player.next.addTempSkill('handcards_add1',{player:"phaseAfter"})
        }
    },
    subSkill:{
        add1:{
            mod:{
                maxHandcard:function(player,num){
                    return num+1;
                },
            },
        },
        add2:{
            mod:{
                maxHandcard:function(player,num){
                    return num+2;
                },
            },
        }
    }
}
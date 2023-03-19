skill={
    mod:{
        targetEnabled:function(card){
            if((get.type2(card)=='trick'&&get.color(card)=='black')||get.type(card)=='delay') return false;
        },
    },
    trigger:{
        player:"damageBegin2",
    },
    forced:true,
    filter:function(event,player){
        return player==_status.currentPhase;
    },
    content:function(){
        trigger.cancel();
        var num=trigger.num;
        player.draw(2*num);
    },
    ai:{
        effect:{
            target:function(card,player,target){
                if(target==_status.currentPhase&&get.tag(card,'damage')) return [0,1];
            },
        },
    },
}
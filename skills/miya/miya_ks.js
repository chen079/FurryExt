skill={
    trigger:{
        source:"damageEnd",
    },
    forced:true,
    filter:function(event,player){
        return event.card&&event.card.name=='sha'&&_status.currentPhase==player;
    },
    content:function(){
        player.getStat().card.sha--;
    },
    mod:{
        cardUsable:function(card,player,num){
            if(card.name=='sha') return num+1;
        },
    },
}
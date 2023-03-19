skill={
    forced:true,
    mod:{
        cardDiscardable:function(card,player,name){
            if(name=='phaseDiscard'&&get.color(card)=='black'&&get.name(card)=='sha') return false;
        },
        ignoredHandcard:function(card,player){
            if(get.color(card)=='black'&&get.name(card)=='sha'){
                return true;
            }
        },
        cardUsable:function(card,player,num){
            if(card.name=='sha') return num+1;
        },
    },
}
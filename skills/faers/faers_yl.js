skill={
    trigger:{
        player:"discardAfter",
    },
    forced:true,
    filter:function(event,player){
        if(!event.cards) return false;
        for(var i=0;i<event.cards.length;i++){
            if(get.name(event.cards[i])=='tao') return true;
        }
        return false;
    },
    content:function(){
        var num = 0
        for(var i=0;i<trigger.cards.length;i++){
            if(get.name(trigger.cards[i])=='tao'){
                num++
            };
        }
        player.recover(num)
    },
}
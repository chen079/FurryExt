skill={
    trigger:{
        player:["useCardAfter","respondAfter"]
    },
    filter:function(event,player){
        return event.card&&event.cards.length==1
    },
    frequent:true,
    content:function(){
        if(get.number(trigger.card)){
            player.draw(get.number(trigger.card));
        }
    },
}
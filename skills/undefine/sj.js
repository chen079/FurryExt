skill={
    trigger:{
        player:"useCardCancelled",
    },
    content:function(event,player){
        var cards=[]
        cards.push(trigger.respondTo[0]);
        player.gain(cards,'log','gain2');
    }
}
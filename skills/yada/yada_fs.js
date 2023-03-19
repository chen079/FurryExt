skill={
    audio:2,
    trigger:{
        player:["chooseToCompareAfter","compareMultipleAfter"],
        target:["chooseToCompareAfter","compareMultipleAfter"],
    },
    frequent:true,
    filter:function(event,player){
        if(event.preserve) return false;
        if(player==event.player){
            return !get.owner(event.card2);
        }else{
            return !get.owner(event.card1);
        }
    },
    check:function(event,player){
        if(player==event.player){
            return event.card2.name!='du';
        }else{
            return event.card1.name!='du';
        }
    },
    content:function(){
        if(player==trigger.player){
            player.gain(trigger.card2,'gain2','log');
        }else{
            player.gain(trigger.card1,'gain2','log');
        }
    },
}
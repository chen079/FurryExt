skill={
    trigger:{
        source:"damageBegin4"
    },
    filter:function(event,player){
        var next=player.getNext();
            if(event.player==next&&get.distance(player,next)<=1) return true;
            return false;
        },
    content:function(){
        trigger.num++
    }
}
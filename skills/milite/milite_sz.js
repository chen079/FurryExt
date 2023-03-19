skill={
    trigger:{
        player:"shaBegin",
    },
    forced:true,
    filter:function(event,player){
        return get.distance(event.target,player,'attack')>1;
    },
    content:function(){
        trigger.directHit=true;
    },
}
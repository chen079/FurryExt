skill={
    trigger:{
        player:"damageBefore"
    },
    forced:true,
    filter:function(event,player){
        if(event.card&&event.card.name=='shandian') return true
        return false
    },
    content:function(){
        trigger.cancel()
    }
}
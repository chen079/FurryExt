skill={
    locked:true,
    audio:2,
    global:"baiban",
    trigger:{
        player:"phaseBegin",
    },
    priority:15,
    forced:true,
    preHidden:true,
    filter:function(event,player,name){
        return true
    },
    content:function(){},
}
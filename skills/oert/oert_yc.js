skill={
    trigger:{
        player:"phaseBegin"
    },
    filter:function(player,event){
        return event.current.isAlive()
    },
    content:function(){
        "step 0"
        if(event.current!=player){
            event.goto(1)
        }
        event.current.loseHp()
        "step 1"
        event.current=event.current.next;
        if(event.current!=player) event.goto(0)
    },
}
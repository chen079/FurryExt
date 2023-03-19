skill={
    charlotte:true,
    trigger:{
        player:"damageEnd",
    },
    usable:1,
    firstDo:true,
    forced:true,
    filter:function(event,player){
        var history=event.player.getHistory('damage',null,event),num=0;
        for(var i of history) num+=i.num;
        return num>1&&(num-event.num)<2;
    },
    content:function(){
        player.recover();
        player.draw()
    },
}
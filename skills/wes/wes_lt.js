skill={
    trigger:{
        player:"damageEnd"
    },
    unique:true,
    frequent:true,
    firstDo:true,
    content:function(){
        "step 0"
        event.count=trigger.num
        "step 1"
        player.judge()
        "step 2"
        switch(result.color){
            case 'red':player.recover();break;
            case 'black':player.draw(2);break;
        }
        "step 3"
        event.count--
        if(event.count>0){
            event.goto(1)
        }
    },
}
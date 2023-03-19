skill={
    forced:true,
    trigger:{
        player:"phaseUseBegin"
    },
    unique:true,
    content:function(){
        "step 0"
        player.judge()
        "step 1"
        switch(result.color){
            case'red':player.recover();break;
            case'black':if(player.maxHp>5){player.loseMaxHp()};break;
        }
    }
}
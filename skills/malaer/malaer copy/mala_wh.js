skill={
    trigger:{
        player:"loseMaxHpBegin"
    },
    forced:true,
    charlotte:true,
    supercharlotte:true,
    content:function(){
        trigger.finish()
        trigger.cancel()
        var num=player.maxHp
        player.gainMaxHp(num)
        player.recover(num)
    },
}
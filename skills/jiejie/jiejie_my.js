skill={
    forced:true,
    trigger:{
        global:"dying",
    },
    filter:function(event,player,card){
        return event.player.countMark("jiejie_zr_1")>0
    },
    content:function(){
        player.loseMaxHp(trigger.player.countMark("jiejie_zr_1"))
    },
    group:"jiejie_my_1",
    subSkill:{
        "1":{
            forced:true,
            trigger:{
                global:"phaseBegin"
            },
            filter:function(event,player,card){
                return event.player.countMark("jiejie_zr_1")>0
            },
            content:function(){
                player.draw(trigger.player.countMark("jiejie_zr_1"))
            }
        }
    }
}
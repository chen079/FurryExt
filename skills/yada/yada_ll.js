skill={
    audio:2,
    trigger:{
        player:"damageBegin4",
    },
    forced:true,
    filter:function(event,player){
        return event.nature=='fire';
    },
    content:function(){
        "step 0"
        trigger.player.judge(function(card){return (get.color(card)=='red')?1.5:-0.5}).judge2=function(result){
            return result.bool;
        };
        "step 1"
        if(result.judge>0){
            trigger.cancel()
            player.draw(2*trigger.num)
        }
    },
    group:"yada_ll_1",
    subSkill:{
        "1":{
            audio:2,
            trigger:{
                player:"damageBegin4",
            },
            forced:true,
            filter:function(event,player){
                return event.nature=='thunder';
            },
            content:function(){
                "step 0"
                trigger.player.judge(function(card){return (get.color(card)=='black')?1.5:-0.5}).judge2=function(result){
                    return result.bool;
                };
                "step 1"
                if(result.judge>0){
                    trigger.cancel()
                    player.draw(2*trigger.num)
                }
            },
        }
    }
}
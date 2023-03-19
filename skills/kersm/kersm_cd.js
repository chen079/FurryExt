skill={
    trigger:{
        global:"judgeEnd",
    },
    frequent:true,
    preHidden:true,
    frequent:function(event){
        if(event.result.card.name=='du') return false;
        //if(get.mode()=='guozhan') return false;
        return true;
    },
    check:function(event){
        if(event.result.card.name=='du') return false;
        return true;
    },
    filter:function(event,player){
        return get.position(event.result.card,true)=='o';
    },
    content:function(){
        player.gain(trigger.result.card,'gain2');
    },
    group:"kersm_cd_1",
    subSkill:{
        "1":{
            trigger:{
                global:["chooseToCompareAfter","compareMultipleAfter"],
                player:["chooseToCompareAfter","compareMultipleAfter"],
                target:["chooseToCompareAfter","compareMultipleAfter"],
                },
            frequent:true,
            filter:function(event,player){return [event.card1,event.card2].filterInD('od').length>0},
            check:function(event,player){return event.card1.name=='du'||event.card2.name=='du';},
            content:function(){
                player.gain([trigger.card1,trigger.card2].filterInD('od'),'gain2','log')
            },
        }
    }
}
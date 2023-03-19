skill={
    trigger:{
        global:"judgeEnd",
    },
    frequent:function(event){
        if(event.result.card.name=='du') return false;
        //if(get.mode()=='guozhan') return false;
        return true;
    },
    preHidden:true,
    check:function(event){
        if(event.result.card.name=='du') return false;
        return true;
    },
    filter:function(event,player){
        return get.position(event.result.card,true)=='o'&&event.result.card!=player.storage.luciya_xl;
    },
    content:function(){
        player.gain(trigger.result.card,'gain2')
    },
    group:"luciya_yc_1",
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
            sub:true,
        },
        "2":{
            trigger:{
                global:"respondEnd",
            },
            filter:function(event,player){
                if(event.player==player) return false;
                if(event.cards){
                    for(var i=0;i<event.cards.length;i++){
                        if(get.position(event.cards[i],true)=='o') return true;
                    }
                }
                return false;
            },
            frequent:true,
            content:function(){
                var cards=trigger.cards.slice(0);
                for(var i=0;i<cards.length;i++){
                    if(get.position(cards[i],true)!='o'){
                        cards.splice(i--,1);
                    }
                }
                game.delay(0.5);
                player.gain(cards,'gain2');
            },
            sub:true,
        },
    },
}
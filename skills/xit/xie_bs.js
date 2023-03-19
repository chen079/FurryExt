skill={
    audio:2,
    trigger:{
        player:["useCard","respond","loseAfter"],
    },
    frequent:true,
    filter:function(event,player){
        if(player==_status.currentPhase) return false;
        if(event.name!='lose') return get.color(event.card)=='black';
        if(event.type!='discard') return false;
        if(event.cards2){
            for(var i=0;i<event.cards2.length;i++){
                if(get.color(event.cards2[i],player)=='black') return true;
            }
        }
        return false;
    },
    content:function(){
        "step 0"
        event.count=1;
        if(trigger.name=='lose'){
            event.count=0;
            for(var i=0;i<trigger.cards2.length;i++){
                if(get.color(trigger.cards2[i],player)=='black') event.count++;
            }
        }
        "step 1"
        player.draw();
        event.count--;
        "step 2"
        if(event.count){
            player.chooseBool(get.prompt2('xit_bs')).set('frequentSkill','xit_bs');
        }
        else event.finish();
        "step 3"
        if(result.bool){
            player.logSkill('xit_bs');
            event.goto(1);
        }
    },
    ai:{
        threaten:0.7,
    },
}
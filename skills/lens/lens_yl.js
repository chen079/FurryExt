skill={
    trigger:{
        source:"damageBegin",
    },
    check:function (event,player){
        return get.attitude(player,event.player)<0;
    },
    frequent:true,
    filter:function(event,card,player){
        if(event.card&&!event.nature) return true;
        return false
    },
    content:function(){
        colors=get.color(trigger.card)
        suits=get.suit(trigger.card)
        "step 0"
        player.judge()
        "step 1"
        switch(result.suit){
            case'red':trigger.nature='fire';break;
            case'black':trigger.nature='thunder';break;
        }
        "step 2"
        if(result.suit==suits){
            trigger.num++
        }
        "step 3"
        if(result.color==colors){
            trigger.num++
        }
    },
}
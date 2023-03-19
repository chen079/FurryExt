skill={
    trigger:{
        player:"useCardToBegin",
    },
    direct:true,
    filter:function(event,player){
        return event.card.name=='sha'&&event.target!=player&&event.target
    },
    content:function(){
        trigger.target.loseHp()
    },
    group:"ventus_yc_draw",
    subSkill:{
        draw:{
            trigger:{
                player:"phaseDrawBegin1"
            },
            direct:true,
            content:function(){
                var card1=get.cardPile2(function(card){
                    return get.name(card,false)=='sha';
                });
                player.gain(card1,'gain2')
            }
        }
    }
}
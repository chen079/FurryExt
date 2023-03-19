skill={
    audio:2,
    trigger:{
        player:"useCard",
    },
    frequent:true,
    preHidden:true,
    filter:function(event){
        return (!event.card.isCard);
    },
    content:function(){
        player.draw();
    },
    ai:{
        threaten:1.4,
        noautowuxie:true,
    },
}
skill={
    audio:2,
    trigger:{
        target:"useCardToPlayered",
    },
    filter:function(event,player){
        return event.player!=player
    },
    direct:true,
    content:function(){
        player.draw()
    },
}
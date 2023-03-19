skill={
    trigger:{
        global:"loseEnd",
    },
    filter:function(event,player){
        return event.type=='discard'&&event.cards.filterInD('d').length>0&&event.player!=player&&event.player!=player.storage.kersm_my[0];
    },
    direct:true,
    content:function(){
        var cards=[];
        for(var i=0;i<trigger.cards.length;i++){
            if(get.position(trigger.cards[i],true)=='d'){
                cards.push(trigger.cards[i]);
            };
        }
        player.gain(cards,'gain2','log');
    },
}
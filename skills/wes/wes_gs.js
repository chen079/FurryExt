skill={
    trigger:{
        player:"damageEnd",
    },
    filter:function(event,player){
        return event.source&&event.source!=player&&event.source!=player.storage.wes_ts[0]
    },
    frequent:true,
    check:function(event,player,storage){
        return get.attitude(player,player.storage.wes_ts[0])
    },
    content:function(){
        for(var i=0 ; i<trigger.num; i++){
            player.storage.wes_ts[0].bolDamage(1,trigger.nature,trigger.source)
            game.delay(2)
        }
    },
}
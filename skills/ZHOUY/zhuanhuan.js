skill={
    enable:'phaseUse',
    init:function(player){
        player.storage.jineng='平'
    },
    yunlvji:true,
    selectCard:function (){
        var player=_status.event.player;
        if(player.storage.jineng=='平'){
            return [1,player.hp];
        }else return 0
    },
    selectTarget:function (){
        var player=_status.event.player;
        if(player.storage.jineng=='仄'){
            return 1;
        }else return 0
    },
    filterTarget:true,
    filterCard:true,
    content:function(){
        if(player.storage.jineng=='平'){
            player.draw(cards.length)
        }else{
            target.draw()
        }
        player.storage.jineng=(!player.storage.jineng||player.storage.jineng=='平')?'仄':'平'
    }
}
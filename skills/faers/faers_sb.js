skill={
    enable:"phaseUse",
    usable:2,
    check:function(card){
        var player=_status.event.player;
        if(get.position(card)=='h'&&!player.countCards('h','du')&&(player.hp>2||!player.countCards('h',function(card){
            return get.value(card)>=8;
        }))){
            return 1;
        }
        return 6-get.value(card)
    },
    content:function(){
        var card = player.getCards('h')
        player.discard(card)
    },
    ai:{
        order:1,
        result:{
            player:function(player){
                if(player.countCards('h','tao')>0&&player.hp!=player.maxHp){
                    return -1
                }else{
                    return 1
                }
            },
        },
        threaten:1.55,
    },
}
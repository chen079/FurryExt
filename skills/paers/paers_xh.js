skill={
    forced:true,
    trigger:{
        player:"damageEnd",
        source:"damageEnd"
    },
    filter:function(event,player){
        return player.hp!=player.countCards('h')
    },
    content:function(){
        var num=player.hp-player.countCards('h')
        if(num>0){
            player.draw(num)
        }else{
            player.chooseToDiscard('h',-num,true)
            player.draw()
        }
    }
}
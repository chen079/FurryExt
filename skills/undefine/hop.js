skill={
    trigger:{
        global:"gameDrawEnd",
        player:["gainEnd","loseEnd","changeHp"]
    },
    firstDo:true,
    popup:false,
    forced:true,
    unique:true,
    content:function(){
        var num = player.countCards('h') - player.maxHp
        if(num>0){
            player.gainMaxHp(num)
        }else if(num<0){
            player.loseMaxHp(-num)
        }
    },
    group:"hps_hp",
    subSkill:{
        hp:{
            trigger:{
                global:"gameDrawAfter",
                player:["gainAfter","loseAfter","changeHp"]
            },
            popup:false,
            forced:true,
            unique:true,
            content:function(){
                var hps= player.maxHp - player.hp
                if(hps!=0){
                    player.recover(hps)
                }
            }
        }
    }
}
skill={
    enable:"phaseUse",
    filter:function (event, player) {
        return player.isHealthy();
    },
    forced:true,
    content:function () {
        player.loseHp()
        player.draw(3)
    },
    ai:{
        basic:{
            order:1,
        },
        result:{
            player:function(player){
                if(player.countCards('hs','tao')>=1) return 1;
                return -1;
            },
        },
    },
    group:"kesaya_zw_1",
    subSkill:{
        "1":{
            forced:true,
            trigger:{
                player:["gameDrawAfter","changeHp"]
            },
            filter:function(event,player){
                if(player.maxHp!=2){
                    return true
                }
            },
            content:function(){
                var a = player.maxHp-2
                if(a>0){player.loseMaxHp(a)
                }else{
                    player.gainMaxHp(-a)
                }
            }
        }
    }
}
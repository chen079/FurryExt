skill={
    usable:1,
    enable:"phaseUse",
    filter:function(event,player){
        return player.countCards('hes')>2
    },
    filterCard:true,
    filterTarget:function(card,player,target){
        return target!=player
    },
    position:'hes',
    selectCard:2,
    check:function(card){
        return 7-get.value(card)
    },
    content:function(){
        "step 0"
        player.recover()
        target.bolDamage(1,player)
    },
    ai:{
        order:5,
        result:{
            target:function(player,target){
                if(target.hp==1) return 5;
                if(player.countCards('h')>player.hp) return 4;
                if(target.hp==target.maxHp) return 0
                return 2;
            },
            player:function(player,target){
                if(player.hp==1) return 5
                if(player.hp==player.maxHp) return 0
                return 2
            }
        }
    }
}
skill={
    enable:"phaseUse",
    filterTarget:function(event,player,target){
        return target!=player&&target.countCards('he')>0;
    },
    content:function(){
        "step 0"
        if(target.inRange(player)){
            player.judge()
        }else{
            player.gainPlayerCard(1,'he',target,true)
            event.finish()
        }
        "step 1"
        if(result.color=='black'){
            player.damage()
        }
        player.gainPlayerCard(1,'he',target,true)
    },
    result:{
        order:7,
        result:{
            target:-1,
            player:function(player,target){
                if(player.hp<=2) return -1
                return 1
            }
        }
    }
}
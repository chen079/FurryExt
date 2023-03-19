skill={
    enable:'phaseUse',
    hubian:true,
    filter:function(event,player){
        if(player.stoarge.hubian){
            return player.countCards('h')>0
        }
    },
    filterTarget:function(target,card,player){
        if(player.stoarge.hubian){
            if(!ui.selected.targets){
                return target.countCards('h')>0&&target!=player
            }else{
                return target.countCards('h')>0
            }
        }
    },
    lose:false,
    delay:false,
    discard:false,
    position:'h',
    filterCard:function(card){
        if(player.stoarge.hubian){
            return true
        }
    },
    selectCard:function(){
        var player=_status.event.player
        if(player.stoarge.hubian){
            return 2
        }
    },
    selectTarget:function(){
        var player=_status.event.player
        if(player.stoarge.hubian){
            return 2
        }
    },
    content:function(){
        if(player.stoarge.hubian){
            return 2
        }
    },
    ai:{
        order:7,
        result:{

        }
    }
}
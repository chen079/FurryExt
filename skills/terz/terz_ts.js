skill={
    trigger:{
        global:"damageBegin4"
    },
    forced:true,
    firstDo:true,
    popup:false,
    filter:function(event,player,storage){
        if(!event.player.hasSkill('terz_ly')||!event.player.hasSkill('terz_ly')) return false
        if(!event.source||(event.source==event.player)) return false
        return !(event.player.storage.terz_ly==event.source.storage.terz_ly)
    },
    content:function(){
        if(trigger.player.storage.terz_ly==false&&trigger.source.storage.terz_ly==true){
            trigger.source.gainPlayerCard(1,'he',trigger.player,true)
            player.draw()
        }else if(trigger.player.storage.terz_ly==true&&trigger.source.storage.terz_ly==false){
            trigger.player.gainPlayerCard(1,'he',trigger.source,true)
            player.draw()
        }
    }
}
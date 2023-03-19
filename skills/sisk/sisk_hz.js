skill={
    trigger:{
        source:"damageEnd",
    },
    filter:function(event,player){
        return event.player!=player;
    },
    init:function(player){
        if(!player.storage.sisk_hz) player.storage.sisk_hz=0
    },
    intro:{
        content:function(storage,player,skill){return '当前有'+storage+'个标记'},
    },
    mark:true,
    direct:true,
    content:function(){
        player.storage.sisk_hz+=1
        player.markSkill('sisk_hz')
    },
}
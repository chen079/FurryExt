skill={
    qianghua:true,
    trigger:{
        player:"damageEnd"
    },
    check:function(event,player){
        return event.player.next!=player&&event.player.previous!=player
    },
    usable:1,
    filter:function(event,player){
        return event.player.isAlive()&&event.player!=player
    },
    content:function(){
        if(!player.storage.fr_qianghua){
            trigger.player.damage(player,'fire')
        }else{
            trigger.player.damage(player,'fire')
            if(trigger.player.next!=trigger.player.previous){
                trigger.player.next.damage(player,Math.min(1,Math.floor(trigger.num/2)),trigger.nature)
                trigger.player.previous.damage(player,Math.min(1,Math.floor(trigger.num/2)),trigger.nature)
            }else{
                trigger.player.next.damage(player,trigger.num,trigger.nature)
            }
        }
        player.storage.fr_qianghua=false
    },
    ai:{
        combo:"fr_qianghua",
    }
}
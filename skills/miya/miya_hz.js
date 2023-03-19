skill={
    trigger:{
        source:"damageBegin",
    },
    filter:function(event,player){
        return event.card&&event.card.name=='sha';
    },
    init:function(player){
        if(!player.storage.miya_hz) player.storage.miya_hz=0
    },
    intro:{
        content:function(storage,player,skill){return '当前有'+storage+'个标记'}
    },
    mark:true,
    direct:true,
    content:function(){
        player.draw(2);
        trigger.num+=player.storage.miya_hz
        player.storage.miya_hz+=1
        player.markSkill('miya_hz')
    },
    group:"miya_hz_one",
    subSkill:{
        one:{
            forced:true,
            trigger:{
                global:"phaseEnd",
            },
            content:function(){
                player.storage.miya_hz=0
                player.updateMark('miya_hz')
            },
            sub:true,
        },
    },
}
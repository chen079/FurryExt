skill={
    trigger:{
        source:"damageEnd",
    },
    mark:true,
    init:function(player){
        if(!player.storage.dog_zz_num) player.storage.dog_zz_num=1;
    },
    intro:{
        content:function(storage,player,skill){
            if(player.storage.dog_zz_num==0) return "多谋可使用次数：0次"
            if(player.storage.dog_zz_num){return "多谋可使用次数："+player.storage.dog_zz_num+"次"}
        },
        onunmark:true,
    },
    direct:true,
    filter:function(event,player){
        if (player != _status.currentPhase) return false;
        return true
    },
    content:function(){
        player.storage.dog_zz_num+=1
        player.updateMark("dog_zz_num")
    },
    group:"dog_zz_remove",
    subSkill:{
        remove:{
            forced:true,
            trigger:{
                player:["phaseAfter","phaseBefore"]
            },
            content:function(){
                player.storage.dog_zz_num=1
            }
        },
        num:{}
    }
}
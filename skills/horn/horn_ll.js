skill={
    qianghua:true,
    usable:1,
    enable:"pahseUse",
    filterTarget:function(card,player,target){
        return target!=player
    },
    check:function(player,target){
        return get.attitude(player,target)<0
    },
    intro:{
        content:'你的回合结束时，若你于回合内未回复过体力，你翻面。'
    },
    content:function(){
        'step 0'
        target.loseHp()
        target.addMark(1,'horn_ll')
        target.markSkill('horn_ll')
        player.recover()
        'step 1'
        if(player.storage.fr_qianghua){
            if(player.isHealthy()){
                player.draw(2)
            }else{
                player.recover()
            }
        }
        if(player.storage.fr_qianghua) player.storage.fr_qianghua=false
    },
    group:["horn_ll_skip",'horn_ll_clean'],
    subSkill:{
        skip:{
            trigger:{
                global:"phaseEnd"
            },
            popup:false,
            forced:true,
            filter:function(event,player){
                return event.player.hasMark('horn_ll')
            },
            content:function(){
                trigger.player.turnOver()
                trigger.player.removeMark(1,'horn_ll')
                trigger.player.unmarkSkill('horn_ll')
            }
        },
        clean:{
            trigger:{
                global:'recoverEnd'
            },
            forced:true,
            popup:false,
            unique:true,
            charlotte:true,
            filter:function(event,player){
                return _status.currentPhase==event.player
            },
            content:function(){
                trigger.player.removeMark(1,'horn_ll')
                trigger.player.unmarkSkill('horn_ll')
            }
        }
    },
    ai:{
        order:9,
        result:{
            target:function(target,player,card){
                return get.effect(target,{name:'losehp'},player,player)-5
            },
            player:function(player,target,card){
                return get.recoverEffect(player,player,player)
            }
        },
        threaten:2,
        expose:0.2,
    },
}
skill={
    trigger:{
        player:"phaseBegin",
    },
    content:function(){
        "step 0"
        player.chooseTarget(1,true).set("filterTarget",function(card,player,target){
            return target!=player
        }).set("ai",function(target){
            var player=_status.event.player;
                return -get.attitude(player,target)/(1+target.hp)
        })
        "step 1"
        var target=result.targets[0]
        target.addSkill('jiejie_zr_1')
        target.loseHp()
        target.updateMark('jiejie_zr_1')
        target.storage.jiejie_zr_1+=1
        player.gainMaxHp()
        player.recover()
    },
    subSkill:{
        "1":{
            mark:true,
            init:function(player){
                if(!player.storage.jiejie_zr_1) player.storage.jiejie_zr_1=0;
            },
            marktext:"势",
            intro:{
                content:"已拥有$个标记",
            },
            sub:true,
        },
    },
}
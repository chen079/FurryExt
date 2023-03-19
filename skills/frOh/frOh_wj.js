skill = {
    global: "frOh_wj2",
    audio: 2,
    trigger: {
        global: "roundStart",
    },
    frOh:true,
    init:function(player,storage){
        if(!player.storage.frOh_wj) player.storage.frOh_wj=[]
    },
    mark:true,
    intro:{
        markcount:0,
        content:"上一回合已声明了$"
    },
    frequent: true,
    content: function () {
        for(var i=0;i<player.storage.frOh_wj.length;i++){
            player.addTempSkill(player.storage.frOh_wj[i],'roundStart')
        }
        player.storage.frOh_wj=[]
    },
    ai: {
        threaten: 0.9,
    },
}
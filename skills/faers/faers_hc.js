skill={
    trigger:{
        player:["gainAfter","loseAfter","changeHp"],
        global:"gameDrawEnd",
    },
    forced:true,
    filter:function(event,player){
        return player.countCards('h')!=player.hp
    },
    content:function(){
        var a = player.hp - player.countCards('h');
        if(a>0){
            player.draw(a);
        }else if(a<0){
            player.chooseToDiscard(-a,true)
        }
    },
    group:"faers_hc_1",
    subSkill:{
        "1":{
            trigger:{
                player:["phaseDrawBefore","phaseJudgeBefore"],
            },
            forced:true,
            popup:false,
            content:function () {
                trigger.cancel();
                game.log(player,'跳过了',event.triggername=='phaseDrawBefore'?'摸牌阶段':'判定阶段')
            },
            ai:{
                noh:true,
            },
            sub:true,
        },
    },
}
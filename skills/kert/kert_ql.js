skill={
    forced:true,
    trigger:{
        global:"phaseDrawAfter",
    },
    filter:function(event,player){
        return event.player.isAlive()&&event.player!=player;
    },
    content:function(){
        "step 0"
        var next = player.chooseControl("选项一","选项二",true).set("prompt","请选择发动的选项：").set('choiceList', ['观看并获得当前角色一张牌','获得牌堆中的一张杀'])
        next.ai=function(event,player){
            if(get.attitude(player,event.player)<0){
                return 0
            }else return 1
        }
        "step 1"
            if(result.index==0){player.gainPlayerCard(1,'he',trigger.player,true,'visible')}
            if(result.index==1){
                var card=get.cardPile2(function(card){return card.name=='sha';});
                if(card) player.gain(card,'gain2');}
            event.finish()
    },
}
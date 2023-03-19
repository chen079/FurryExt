skill={
    trigger:{
        player:["phaseUseBegin","phaseJieshuBegin"]
    },
    direct:true,
    content:function(){
        'step 0'
        var str
        if(trigger.name=='phaseUse'){
            str='red'
        }else{
            str='black'
        }
        var cards=player.getCards('h')
        for(var i=0;i<cards.length;i++){
            var card=cards[i]
            if(get.color(card)==str){
                player.logSkill("adward_qm",player);
                player.lose(card,ui.discardPile,'visible');
                player.$throw(card,1000);
                game.log(player,'将',card,'置入弃牌堆');
                player.draw();
                event.goto(0)
            }
        }
    }
}
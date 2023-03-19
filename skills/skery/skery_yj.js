skill={
    trigger:{
        global:"useCard",
    },
    filter:function(event,player){
        return (event.card.name=='jiu'||event.card.name=='tao')&&event.player!=player&&player.countCards('h')>0;
    },
    direct:true,
    content:function(){
        "step 0"
        var goon=(ai.get.attitude(player,trigger.player)<0)
        var next=player.chooseToDiscard(1,'h',false).set('prompt',get.prompt('skery_yj'))
        .set('prompt2','你可以弃置一张手牌并进行一次判定，若结果为黑色，此牌无效；若结果为红色，该角色弃置两张牌。')
        next.ai=function(card){
            if(goon){
                return 8-ai.get.value(card);
            }
            return 0;
        }
        next.logSkill=['skery_yj',trigger.player];
        'step 1'
        if(result.bool){
            player.judge()
        }else{
            event.finish()
        }
        "step 2"
        switch(result.color){
            case 'red': player.discardPlayerCard(2,trigger.player,'h',true);break;
            case 'black':trigger.cancel();break;
            }
        }
}
skill={
    trigger:{
        global:"judge",
    },
    direct:true,
    preHidden:true,
    prompt:"一名角色的判定牌生效前，你可以打出一张手牌替换之",
    filter:function(event,player){
        return player.countCards(get.mode()=='guozhan'?'hes':'hs')>0;
    },
    content:function(){
        "step 0"
        player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
        get.translation(trigger.player.judging[0])+'，'+get.prompt('luciya_xl_1'),get.mode()=='guozhan'?'hes':'hs',function(card){
            var player=_status.event.player;
            var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
            if(mod2!='unchanged') return mod2;
            var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
            if(mod!='unchanged') return mod;
            return true;
        }).set('ai',function(card){
            var trigger=_status.event.getTrigger();
            var player=_status.event.player;
            var judging=_status.event.judging;
            var result=trigger.judge(card)-trigger.judge(judging);
            var attitude=get.attitude(player,trigger.player);
            if(attitude==0||result==0) return 0;
            if(attitude>0){
                return result-get.value(card)/2;
            }
            else{
                return -result-get.value(card)/2;
            }
        }).set('judging',trigger.player.judging[0]).setHiddenSkill('luciya_xl');
        "step 1"
        if(result.bool){
            player.respond(result.cards,'luciya_xl','highlight','noOrdering');
        }
        else{
            event.finish();
        }
        "step 2"
        if(result.bool){
            if(trigger.player.judging[0].clone){
                trigger.player.judging[0].clone.classList.remove('thrownhighlight');
                game.broadcast(function(card){
                    if(card.clone){
                        card.clone.classList.remove('thrownhighlight');
                    }
                },trigger.player.judging[0]);
                game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
            }
            game.cardsDiscard(trigger.player.judging[0]);
            trigger.player.judging[0]=result.cards[0];
            trigger.orderingCards.addArray(result.cards);
            game.log(trigger.player,'的判定牌改为',result.cards[0]);
            player.storage.luciya_xl=result.cards[0]
            game.delay(2);
        }
    },
    group:["luciya_xl_1"],
    ai:{
        rejudge:true,
        tag:{
            rejudge:1,
        },
    },
    subSkill:{
        "1":{
            trigger:{
                player:["chooseToCompareBefore","compareMultipleBefore"],
                target:["chooseToCompareBefore","compareMultipleBefore"],
            },
            usable:1,
            prompt:"是否发动【雄略】：你的拼点牌生效前，你可以将此牌点数视为A或K",
            filter:function(event,player){
            if(event.iwhile) return false;
            if(event.player==player){return true}
            },
            content:function(){
                "step 0"
                player.chooseControl("A","K",true).set("prompt","请选择拼点牌视为的点数：").set('ai',function(result,control){return "K"});
                "step 1"
                if(result.index==1){
                player.addTempSkill("luciya_xl_2","compareAfter")
            }
                if(result.index==0){
                    player.addTempSkill("luciya_xl_3","compareAfter")
                }
            },
            sub:true,
        },
        "2":{
            trigger:{
                player:["compare"],
                target:["compare"],
            },
            silent:true,
            content:function(){
            game.log(player,'拼点牌点数视为','#yK');
            if(player==trigger.player){
                trigger.num1=13;
            }
            else{
                trigger.num2=13;
            }
        },
            sub:true,
            forced:true,
            popup:false,
        },
        "3":{
            trigger:{
                player:["compare"],
                target:["compare"],
            },
            silent:true,
            content:function(){
                game.log(player,'拼点牌点数视为','#yA');
                if(player==trigger.player){
                    trigger.num1=1;
                }
                else{
                    trigger.num2=1;
                }
            },
            sub:true,
            forced:true,
            popup:false,
        },
    },
}
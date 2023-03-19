skill={
    enable:'phaseUse',
    usable:1,
    content:function(){
        "step 0"
        player.chooseTarget([1,Math.ceil(game.countPlayer()/2)],function(card,player,target){
            return target.countCards('h')},true).set('ai',function(target){
            var player = _status.event.player
            return get.attitude(player,target)
        })
        "step 1"
        if(result.bool){
            event.targets=result.targets
            event.targets.sortBySeat()
            var cards=get.cards(result.targets.length);
            var dialog=ui.create.dialog('掘金',cards,true)
            event.dialog=dialog
        }else{
            event.finish()
        }
        "step 2"
        event.target = event.targets.shift()
        var minValue=20;
        var hs=event.target.getCards('h');
        for(var i=0;i<hs.length;i++){
            minValue=Math.min(minValue,get.value(hs[i],event.target));
        }
        if(event.target.isUnderControl(true)){
            event.dialog.setCaption('选择一张牌并用一张手牌替换之');
        }
        var next=event.target.chooseButton(function(button){
            return get.value(button.link,_status.event.player)-minValue;
        });
        next.set('dialog',event.dialog);
        next.set('closeDialog',false);
        next.set('dialogdisplay',true);
        "step 3"
        event.dialog.setCaption('掘金');
        if(result.bool){
            event.button=result.buttons[0];
            event.target.chooseCard('用一张牌牌替换'+get.translation(result.links),true).ai=function(card){
                return -get.value(card);
            }
        }
        else{
            event.target.popup('不换');
            game.log(event.target,'不替换')
        }
        "step 4"
        if(result.bool){
            event.target.lose(result.cards,ui.special);
            event.target.$throw(result.cards);
            game.log(event.target,'用',result.cards,'替换了',event.button.link);
            event.target.gain(event.button.link);
            event.target.$gain2(event.button.link);
            event.dialog.buttons.remove(event.button);
            event.dialog.buttons.push(ui.create.button(result.cards[0],'card',event.button.parentNode));
            event.button.remove();
        }
        "step 5"
        game.delay(2);
        if(event.targets.length!=0){
            event.goto(2)
        }else{
            var cards=[]
            for(var i=0;i<event.dialog.buttons.length;i++){
                cards.push(event.dialog.buttons[i].link)
            }
            event.cards=cards
            player.chooseTarget(1,true,).set('prompt','将剩余的牌交给一名角色')
        }
        "step 6"
        event.dialog.close()
        result.targets[0].gain(event.cards,'gain2')
    },
    ai:{
        order:7,
        result:{
            player:1,
        },
    },
}
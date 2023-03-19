skill={
    trigger:{
        global:"phaseEnd"
    },
    round:1,
    filter:function(event,player){
        var list=[];
        game.getGlobalHistory('cardMove',function(evt){
            if(evt.name=='lose'){
                if(evt.position==ui.discardPile){
                    for(var i of evt.cards) list.add(i);
                }
            }
            else{
                if(evt.name=='cardsDiscard'){
                    for(var i of evt.cards) list.add(i);
                }
            }
        });
        var suit=[]
        for(var j=0;j<list.length;j++){
            var cardsuit=get.suit(list[j])
            if(!suit||!suit.contains(cardsuit)){
                suit.push(cardsuit)
            }
        }
        if(suit.length==4){
            return true
        }
        return false
    },
    content:function(){
        'step 0'
        var list=[];
        game.getGlobalHistory('cardMove',function(evt){
            if(evt.name=='lose'){
                if(evt.position==ui.discardPile){
                    for(var i of evt.cards) list.add(i);
                }
            }
            else{
                if(evt.name=='cardsDiscard'){
                    for(var i of evt.cards) list.add(i);
                }
            }
        });
        var suitsort=[[],[],[],[]]
        for(var j=0;j<list.length;j++){
            var cardsuit=get.suit(list[j])
            if(cardsuit=='heart'){
                suitsort[0].push(list[j])
            }else if(cardsuit=='diamond'){
                suitsort[1].push(list[j])
            }else if(cardsuit=='spade'){
                suitsort[2].push(list[j])
            }else if(cardsuit=='club'){
                suitsort[3].push(list[j])
            }
        }
        event.suitsort = suitsort
        player.chooseControl('heart', 'diamond', 'spade', 'club', 'cancel2').set('prompt', '请选择一种花色').set('choiceList', [get.translation(suitsort[0]), get.translation(suitsort[1]), get.translation(suitsort[2]), get.translation(suitsort[3])])
        'step 1'
        event.cards = event.suitsort[result.index];
        player.gain(event.cards, 'gain2')
        'step 2'
        player.chooseCardTarget({
            filterCard: function (card) {
                return _status.event.getParent().cards.contains(card);
            },
            selectCard: [1, event.cards.length],
            filterTarget: function (card, player, target) {
                return player != target;
            },
            prompt: '请选择要送人的卡牌'
        });
        "step 3"
        if (result.bool) {
            player.line(result.targets, 'green');
            result.targets[0].gain(result.cards, player);
            for (var i = 0; i < result.cards.length; i++) {
                event.cards.remove(result.cards[i]);
            }
            if (event.cards.length) event.goto(2);
        }
        'step 4'
        if (!event.cards.length) {
            player.storage.fengyang = ['basic', 'trick', 'equip']
            player.updateMark('fengyang')
            player.chooseTarget('令一名角色执行一个额外的回合').set('ai', function (target) {
                var player = _status.event.target
                return get.attitude(player, target)
            })
        } else {
            event.finish()
        }
        'step 5'
        if (result.bool) result.targets[0].insertPhase();
    }
}
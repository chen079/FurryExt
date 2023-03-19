skill={
    trigger:{
        player:"phaseDrawAfter",
    },
    direct:true,
    filter:function(event,player){
        return player.getExpansions('markn_yz').length>0&&player.countCards('h')>0;
    },
    content:function(){
        "step 0"
        var cards=player.getExpansions('markn_yz');
        if(!cards.length||!player.countCards('h')){
            event.finish();
            return;
        }
        var next=player.chooseToMove('远瞻：是否交换“视”和手牌？');
        next.set('list',[
            [get.translation(player)+'（你）的视',cards],
            ['手牌区',player.getCards('h')],
        ]);
        next.set('filterMove',function(from,to){
            return typeof to!='number';
        });
        next.set('processAI',function(list){
            var player=_status.event.player,cards=list[0][1].concat(list[1][1]).sort(function(a,b){
                return get.value(a)-get.value(b);
            }),cards2=cards.splice(0,player.getExpansions('markn_yz').length);
            return [cards2,cards];
        });
        "step 1"
        if(result.bool){
            var pushs=result.moved[0],gains=result.moved[1];
            pushs.removeArray(player.getExpansions('markn_yz'));
            gains.removeArray(player.getCards('h'));
            if(!pushs.length||pushs.length!=gains.length) return;
            player.addToExpansion(pushs,player,'giveAuto').gaintag.add('markn_yz');
            game.log(player,'将',pushs,'作为“视”置于武将牌上');
            player.gain(gains,'gain2');
        }
    },
    group:"markn_yz_1",
    subSkill:{
        "1":{
            audio:2,
            trigger:{
                player:"phaseZhunbeiBegin",
            },
            filter:function(event,player){
                return player.getExpansions('markn_yz').length>0;
            },
            frequent:true,
            content:function () {
                'step 0';
                if (player.isUnderControl()) {
                    game.modeSwapPlayer(player);
                }
                var num = player.getExpansions('markn_yz').length;
                var player = event.player;
                if (player.isUnderControl()) game.modeSwapPlayer(player);
                
                var cards = get.cards(num);
                var markn_yz = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                markn_yz.caption= '【远瞻】'
                game.broadcast(function (player, cards) {
                    if (!window.decadeUI) return;
                    decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                }, player, cards);
                
                event.switchToAuto = function () {
                    var cards = markn_yz.cards[0].concat();
                    var cheats = [];
                    var judges = player.node.judges.childNodes;
                    
                    if (judges.length) {
                        cheats = decadeUI.get.cheatJudgeCards(cards, judges, true);
                    }
                    
                    if (cards.length && cheats.length == judges.length) {
                        for (var i = 0; i >= 0 && i < cards.length; i++) {
                            if (get.value(cards[i], player) >= 5) {
                                cheats.push(cards[i]);
                                cards.splice(i, 1);
                            }
                        }
                    }
                    
                    var time = 500;
                    for (var i = 0; i < cheats.length; i++) {
                        setTimeout(function (card, index, finished) {
                            markn_yz.move(card, index, 0);
                            if (finished) markn_yz.finishTime(1000);
                        }, time, cheats[i], i, (i >= cheats.length - 1) && cards.length == 0);
                        time += 500;
                    }
                    
                    for (var i = 0; i < cards.length; i++) {
                        setTimeout(function (card, index, finished) {
                            markn_yz.move(card, index, 1);
                            if (finished) markn_yz.finishTime(1000);
                        }, time, cards[i], i, (i >= cards.length - 1));
                        time += 500;
                    }
                };
                
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
                'step 1';
                player.popup(get.cnNumber(event.num1) + '上' + get.cnNumber(event.num2) + '下');
                game.log(player, '将' + get.cnNumber(event.num1) + '张牌置于牌堆顶，' + get.cnNumber(event.num2) + '张牌置于牌堆底');
                game.updateRoundNumber();
            },
            ai:{
                threaten:1.2,
            },
        }
    }
}
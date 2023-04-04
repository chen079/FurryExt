skill = {
    usable: 2,
    trigger: {
        player: "useCardToPlayered",
        target: "useCardToTargeted",
    },
    filter: function (event, player) {
        if (event.player == event.target || event.targets.length != 1) return false;
        return true
    },
    check: function (event, player) {
        return get.attitude(player, event.player) < 0
    },
    content: function (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) {
        'step 0'
        event.target = player == trigger.player ? trigger.targets[0] : trigger.player
        player.chooseButton(['谋弈：请选择一种策略', [[['', '', 'fr_card_chongci'], ['', '', 'fr_card_zhuanyi']], 'vcard']], true).set('ai', function (button) {
            var player = _status.event.player;
            var target = _status.event.target;
            if (player.attitudeTo(target) > 0) return (button.link[2] == "fr_card_chongci") ? 1 : 0;
            if (target.countGainableCards(player, 'e') < 1 && target.countDiscardableCards(player, 'h') < 2) return (button.link[2] == "fr_card_zhuanyi") ? (1.7 + Math.random()) : (1 + Math.random());
            return 1 + Math.random();
        }).set('target', target);
        'step 1'
        event.mes = result.links[0][2];
        event.target.chooseToRespond(1, 'h', '选择打出一张【杀】或【闪】来响应“谋弈”', function (card) {
            return get.name(card) == 'sha' || get.name(card) == 'shan'
        }).set('ai', function (card) {
            var target=_status.event.target
            var player=_status.event.player
            var att=get.attitude(player,target)
            if(att>0){
                return -1
            }else{
                return Math.random()
            }
        }).set('target',player)
        'step 2'
        if (result.bool) {
            event.tes = result.card
            player.$throw(game.createCard(event.mes, "", ""));
            game.log(player, '选择的对策为', '#g' + get.translation(event.mes));
            game.log(event.target, '选择的对策为', '#g' + get.translation(event.tes));
            game.delay(0, 1500);
        } else {
            game.log(player, '选择的对策为', '#g' + get.translation(event.mes));
        }
        'step 3'
        if ((event.tes&&event.tes.name == 'sha' && event.mes == 'fr_card_zhuanyi') || (event.tes&&event.tes.name == 'shan' && event.mes == 'fr_card_chongci')) {
            game.log(player,'谋弈失败');
            var cards = player.getCards('h');
            if (cards.length) {
                player.loseToDiscardpile(cards);
                player.draw(cards.length);
            }
            event.finish()
            return
        } else {
            game.log(player,'谋弈成功');
            if(player==trigger.player){
                trigger.excluded.add(event.target)
            }else{
                trigger.excluded.add(player);
            }
            if (event.mes == 'fr_card_zhuanyi') {
                var str
                if (player.next != player.previous) {
                    str = '与你的上家（' + get.translation(player.previous) + '）或你的下家（' + get.translation(player.next) + '）交换位置'
                } else {
                    str = '与' + get.translation(player.next) + '交换位置'
                }
                player.chooseTarget(1, true, str, function (card, player, target) {
                    return target == player.next || target == player.previous
                }).set('ai', function (target) {
                    return Math.random()
                })
            } else {
                var cards = event.target.getCards('h');
                if (cards.length) {
                    event.target.loseToDiscardpile(cards);
                    event.target.draw(cards.length);
                }
                var cards2 = player.getCards('e')
                if (cards2.length) {
                    player.loseToDiscardpile(cards2);
                    player.draw(cards2.length);
                }
                event.target.damage(player)
                event.finish()
                return
            }
        }
        'step 4'
        event.temptarget = result.targets[0]
        game.broadcastAll(function (target1, target2) {
            game.swapSeat(target1, target2);
        }, player, event.temptarget);
        var num=player.countCards('h')-2
        if (num > 0) {
            player.chooseToDiscard('h', num, true)
        }
        'step 5'
        if (event.temptarget.countCards('e') > 0){
            player.gainPlayerCard(event.temptarget,'e').set('ai',function(button){
                var card=button.link;
                return get.value(card);
            });
        }else{
            event.finish()
        }
        'step 6'
        if(result.bool){
            var card = result.cards[0]
            player.chooseUseTarget(card, 'nopopup')
        }   
    }
}
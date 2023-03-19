skill={
    trigger:{
        player:["chooseToRespondBegin","chooseToUseBegin"],
    },
    forced:true,
    popup:false,
    lastDo:true,
    mark:true,
    hiddenCard:function (player, name) {
        var cardPile=[]
        game.filterPlayer(function(current){
            if(current!=player){
                var card = current.getCards('s',function(card){
                    return card.hasGaintag('bjhaiyun1');
                })
                cardPile.push(...card)
            }
        })
        if (!cardPile.length) return false;
        return cardPile.some(i => i.name == name);
    },
    filter:function (event, player) {
        if (event.responded || event.skill) return false;
        var cardPile=[]
        game.filterPlayer(function(current){
            if(current!=player){
                var card = current.getCards('s',function(card){
                    return card.hasGaintag('bjhaiyun1');
                })
                cardPile.push(...card)
            }
        })
        if (!cardPile.length) return false;
        return cardPile.some(i => event.filterCard && event.filterCard(i, player, event));
    },
    mod:{
        "cardEnabled2":function (card, player) {
            if (_status.event.skill && get.itemtype(card) == 'card' && card.hasGaintag('bjhaiyuna')) return false;
        },
    },
    intro:{
        mark:function (dialog, storage, player) {
            var cardPile=[]
            game.filterPlayer(function(current){
                if(current!=player){
                    var card = current.getCards('s',function(card){
                        return card.hasGaintag('bjhaiyun1');
                    })
                    cardPile.push(...card)
                }
            })
            if (!cardPile.length) return '';
            if (player.isUnderControl(true)) {
                dialog.addAuto(cardPile);
            } else {
                return '';
            }
        },
    },
    copy:function (cards) {
        var result = [];
        for (var i of cards) {
            var card = ui.create.card(ui.special);
            card.init([
                i.suit,
                i.number,
                i.name,
                i.nature,
            ]);
            card.cardid = i.cardid,
                card.wunature = i.wunature,
                card.storage = i.storage,
                card.relatedCard = i;
            result.push(card);
        };
        return result;
    },
    contentx:function () {
        "step 0"
        if (trigger.result.bool) {
            if (trigger.onresult) {
                trigger.onresult(trigger.result);
                delete trigger.onresult;
            };
        };
        "step 1"
        player.lose(event.cards, ui.special)._triggered = null;
        "step 2"
        for (var i of event.cards) {
            i.fix();
            i.remove();
            i.destroyed = true;
        };
    },
    content:function () {
        "step 0"
        var cardPile=[]
        game.filterPlayer(function(current){
            if(current!=player){
                var card = current.getCards('s',function(card){
                    return card.hasGaintag('bjhaiyun1');
                })
                cardPile.push(...card)
            }
        })
        event.cards = lib.skill.bjhaiyuna.copy(cardPile);
        player.directgains(event.cards, null, 'bjhaiyuna');
        "step 1"
        var evt = trigger;
        var onresult = false;
        if (evt.onresult) {
            onresult = evt.onresult;
        };
        var next2 = game.createEvent('bjhaiyuna_clear', false);
        next2.cards = event.cards;
        next2.player = player;
        next2._trigger = evt;
        next2.setContent(lib.skill.bjhaiyuna.contentx);
        event.next.remove(next2);
        evt.after.push(next2);
        evt.onresult = function (result) {
            if (evt.after.contains(next2)) {
                evt.after.remove(next2);
                evt.next.push(next2);
            };
            if (result.cards && result.cards.length && (result.cards[0].hasGaintag('bjhaiyuna') || event.cards.contains(result.cards[0]))) {
                player.logSkill('bjhaiyuna');
                var card2 = result.cards[0];
                result.cards[0] = result.cards[0].relatedCard;
                var cardx = result.cards[0];
                result.card = {
                    name: get.name(card2),
                    suit: get.suit(card2),
                    number: get.number(card2),
                    nature: get.nature(card2),
                    isCard: true,
                    cardid: cardx.cardid,
                    wunature: cardx.wunature,
                    storage: cardx.storage,
                    cards: [cardx],
                };
            };
            if (onresult) onresult.apply(evt, arguments);
            delete evt.onresult;
        };
        game.delay(1);
        var cards = player.getCards("hs");
        var sort2 = function (b, a) {
            if (a.name != b.name) return lib.sort.card(a.name, b.name);
            else if (a.suit != b.suit) return lib.suit.indexOf(a) - lib.suit.indexOf(b);
            else return a.number - b.number;
        };
        if (cards.length > 1) {
            cards.sort(sort2);
            cards.forEach(function (i, j) {
                player.node.handcards1.insertBefore(cards[j], player.node.handcards1.firstChild);
            });
            dui.queueNextFrameTick(dui.layoutHand, dui);
        }
    },
    ai:{
        respondShan:true,
        respondSha:true,
        save:true,
        skillTagFilter:function (player, tag, arg) {
            var event = _status.event;
            var cardPile=[]
            game.filterPlayer(function(current){
                if(current!=player){
                    var card = current.getCards('s',function(card){
                        return card.hasGaintag('bjhaiyun1');
                    })
                    cardPile.push(...card)
                }
            })
            if (!cardPile.length) return false;
            for (var i = 0; i < cardPile.length; i++) {
                if (tag == 'respondSha') {
                    if (cardPile[i].name == 'sha') return true;
                } else if (tag == 'respondShan') {
                    if (cardPile[i].name == 'shan') return true;
                } else if (tag == 'save') {
                    if (cardPile[i].name == 'jiu' || cardPile[i].name == 'tao') return true;
                };
            };
            return false;
        },
    },
}
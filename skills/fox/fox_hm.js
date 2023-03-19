skill = {
    trigger:{
        player:"useCardAfter",
    },
    forced: true,
    filter: function (event, player) {
        if (!event.targets.length) return false
        return event.card.isCard && (get.type(event.card) == 'trick' || get.type(event.card) == 'basic') &&
        get.position(event.cards[0], true) == 'o' && event.card.name == event.cards[0].name && event.getParent().name != 'fox_hm_1'
    },
    intro: {
        markcount: function (storage) {
            if (!storage) return 0;
            return storage[0].length;
        },
        mark: function (dialog, storage, player) {
            if (!storage) return;
            dialog.addAuto(storage[0]);
            dialog.addText(get.translation(storage[1]));
        },
        onunmark: function (storage, player) {
            player.storage.fox_hm = [[], []];
        },
    },
    onremove: function (player, skill) {
        var cards = player.getExpansions(skill);
        if (cards.length) player.loseToDiscardpile(cards);
        delete player.storage[skill];
    },
    content: function () {
        var card = trigger.cards[0];
        if (!player.storage.fox_hm) player.storage.fox_hm = [[], []];
        player.addToExpansion(card, 'gain2').gaintag.add('fox_hm');
        player.storage.fox_hm[0].push(card);
        player.storage.fox_hm[1].push(trigger.targets);
        game.delayx();
    },
    group: "fox_hm_1",
    subSkill: {
        1: {
            trigger: {
                player: "phaseJieshuBegin"
            },
            forced: true,
            filter: function (event, player) {
                return player.storage.fox_hm && player.storage.fox_hm[0].length > 0;
            },
            content: function () {
                var list = player.storage.fox_hm, card = list[0].shift(), source = list[1].shift();
                if (player.getExpansions('fox_hm').contains(card)) {
                    for(var i=0;i<source.length;i++){
                        if(!source[i].isIn()||!player.canUse(card, source[i], false)){
                            source.remove(source[i])
                        }
                    }
                    if (source.length!=0) player.useCard(card, source, false);
                    else player.loseToDiscardpile(card);
                }
                if (list[0].length) {
                    event.redo()
                } else {
                    event.finish()
                }
            }
        }
    }
}
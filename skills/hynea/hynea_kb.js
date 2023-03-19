skill={
    direct:true,
    enable:"phaseUse",
    filter:function (event, player) {
        return player.countCards('hes',{name:'jiu'})>0;
    },
    hiddenCard:function (player, name) {
        if (!['sha', 'shan', 'tao', 'jiu','wuxie'].contains(name)) return false;
        if (player.countCards('hes', {name: 'jiu' }) == 0) return false;
        return player.countCards('hes', {name: 'jiu' }) > 0;
    },
    chooseButton:{
        dialog:function (event, player) {
            var cards = player.getCards('hes');
            var list = [];
            for (var i of lib.inpile) {
                var card = { name: i, isCard: true };
                var info = get.info(card, false);
                if (get.type(i) == 'trick' && event.filterCard({
                    name: i,
                    cards: cards,
                }, player, event)) {
                    list.push(['锦囊', '', i]);
                }else if(get.type(i) == 'basic' && event.filterCard({
                    name: i,
                    cards: cards,
                }, player, event)){
                    list.push(['基本', '', i]);
                }
            }
            return ui.create.dialog('狂辩', [list, 'vcard']);
        },
        filter:function (button, player) {
            return lib.filter.filterCard({ name: button.link[2] }, player, _status.event.getParent());
        },
        check:function (button) {
            var player = _status.event.player;
            return player.getUseValue({ name: button.link[2] });
        },
        backup:function (links, player) {
            return {
                filterCard:function(card){
                    return get.name(card)=='jiu'
                },
                selectCard: 1,
                check: function (card) {
                    if (ui.selected.cards.length) return 0;
                    return 7 - get.value(card);
                },
                position: 'hes',
                popname: true,
                viewAs: { name: links[0][2] },
            }
        },
        prompt:function (links, player) {
            return '将一张【酒】当作' + get.translation(links[0][2]) + '使用';
        },
    },
    ai:{
        order:1,
        result:{
            player:1,
        },
    },
    sub:true,
}
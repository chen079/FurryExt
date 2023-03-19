skill={
    mod:{
        aiOrder:function (player, card, num) {
             if (typeof card == 'object' && player == _status.currentPhase) {
                 var evt = player.getLastUsed();
                 if (evt && evt.card && get.suit(evt.card) != 'none' && get.suit(card) != 'none' && get.suit(evt.card) != get.suit(card)) {
                     return num + 10;
                 }
             }
         },
    },
    trigger:{
        player:"useCard",
    },
    mark:true,
    intro:{
        content:function (storage, player, skill) {
            var suit
            if(player.storage.kasers_cy=='none'){
                suit='无'
            }else{
                suit=get.translation(player.storage.kasers_cy)
            }
            return '你使用的上一张牌的花色为：'+suit;
        },
        markcount:function(storage, player, skill){
            var suit
            if(player.storage.kasers_cy=='none'){
                suit='无'
            }else{
                suit=get.translation(player.storage.kasers_cy)
            }
            return suit
        }
    },
    getLastUsed:function(player,event){
        var history=player.getAllHistory('useCard');
        var index;
        if(event) index=history.indexOf(event)-1;
        else index=history.length-2;
        if(index>=0) return history[index];
        return false;
    },
    forced:true,
    filter:function (event, player) {
        var evt=lib.skill.kasers_cy.getLastUsed(player,event);
        var suit2 = get.suit(event.card);
        player.storage.kasers_cy=suit2
        if (!evt) return false;
        var suit1 = get.suit(evt.card);
        return suit1 && suit2 && suit1 != suit2;
     },
    content:function () {
         player.draw();
     },
    ai:{
        threaten:3,
    },
    group:"kasers_cy_same",
    subSkill:{
        same:{
            trigger:{
                player:"useCard",
            },
            forced:true,
            filter:function (event, player) {
                var evt=lib.skill.kasers_cy.getLastUsed(player,event);
                var suit2 = get.suit(event.card);
                if (!evt) return false;
                var suit1 = get.suit(evt.card);
                return suit1 && suit2 && suit1 == suit2;
            },
           content:function () {
                player.chooseToDiscard(1,'h',true)
            },
        }
    }
}
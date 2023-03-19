skill = {
    charlotte:true,
    supercharlotte:true,
    mod: {
        globalTo: function (from, to, distance) {
            return distance + 1;
        },
        cardUsable: function (card, player, num) {
            return Infinity
        },
        targetInRange: function (card, player, target) {
            return true;
        },
        selectTarget:function(card,player,range){
            if(range[0]!=1||range[1]!=1) return;
            var range2=get.select(get.info(card).selectTarget);
            if(range2[0]!=1&&range2[1]!=1) return;
            if(card.name=='sha'||get.type(card)=='trick') range[1]=Infinity;
        },
    },
    trigger: {
        player: "phaseZhunbeiBegin",
    },
    forced: true,
    filter: function (event, player) {
        return player.countCards('j') > 0
    },
    content: function () {
        player.discard(player.getCards('j').randomGet());
    },
}
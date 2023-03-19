skill = {
    audio:2,
    trigger:{
        global:"phaseBefore",
        player:"enterGame",
    },
    forced:true,
    filter:function(event,player){
        return event.name!='phase'||game.phaseNumber==0;
    },
    content:function(){
        'step 0'
        game.countPlayer(function(current){
            if(current!=player) current.addSkill('pocha_1');
        });
        game.log(player,'令除其以外的所有其他角色手牌均可见')
        game.delayx();
    },
    subSkill: {
        1: {
            mark: true,
            intro: {
                mark: function (dialog, content, player) {
                    var cards = player.getCards('h')
                    if (cards && cards.length) {
                        dialog.addAuto(cards);
                    }
                }
            },
            content: function (content, player) {
                var cards = player.getCards('h')
                if (cards && cards.length) {
                    return get.translation(cards);
                }
            },
        },
    }
}
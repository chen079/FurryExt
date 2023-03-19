skill = {
    enable: "phaseUse",
    usable: 1,
    prompt: "出牌阶段限一次，你可以交给一名拥有技能【问技】的角色两张手牌，并声明一个技能，然后你获得此技能直到回合结束。",
    filter: function (event, player) {
        return player.countCards('h')>1&&game.hasPlayer(function (current) {
            return current != player && current.hasSkill('frOh_wj');
        });
    },
    filterCard:true,
    selectCard:2,
    lose:false,
    delay:false,
    discard:false,
    filterTarget: function (card, player, target) {
        return player != target && target.hasSkill('frOh_wj');
    },
    content: function () {
        'step 0'
        target.gain(cards,player,'giveAuto')
        'step 1'
        var next=game.createEvent('luanwu',false);
        next.player=player;
        next.target=target
        next.setContent(lib.skill.frOh_se.content);
    },
    ai: {
        order: 10,
        result: {
            player: function (player, target) {
                var target = game.findPlayer(function (current) {
                    return current.hasSkill('frOh_wj');
                });
                if (target) {
                    //if(player.hasUnknown()) return 0;
                    if (player.countCards('h') > player.hp) return 114514 + get.attitude(player, target);
                    return 0;
                }
            },
        },
    },
}
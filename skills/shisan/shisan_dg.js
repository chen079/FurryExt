skill = {
    forced: true,
    trigger: {
        player: "useCardAfter",
    },
    filter: function (event, player) {
        return ['basic', 'trick'].contains(get.type(event.card, false)) && game.hasPlayer(function(current){
            return current.countCards('h') >= player.countCards('h') && current.countCards('he') > 0
        });
    },
    content: function () {
        'step 0'
        player.chooseTarget(1, true,'###是否发动【达观】？###弃置一名手牌数不小于你的角色的一张牌')
        .set('ai', function (target) {
            var player = _status.event.player;
            return get.effect(target, { name: 'guohe_copy2' }, player, player);
        }).set('filterTarget', function (card,player,target) {
            return (target.countCards('h') >= player.countCards('h'))&&target.countCards('he')>0
        })
        'step 1'
        player.discardPlayerCard(result.targets[0], 'he', true)
    }
}
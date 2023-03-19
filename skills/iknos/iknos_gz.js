skill={
    enable:'phaseUse',
    filterCard:function(card){
        var color = get.color(card)
        var number=get.number(card)
        if (get.color(ui.selected.cards[1]) == color||get.number(ui.selected.cards[1]) != number) return false;
        return true
    },
    limited:true,
    mark:true,
    intro:{
        content:"limited",
    },
    skillAnimation:true,
    complexCard:true,
    selectCard:2,
    check:function (card) {
        return 7 - get.value(card)
    },
    filter:function (event, player) {
        var list = [];
        for (var i = 0; i < game.dead.length; i++) {
            if (game.dead[i].maxHp != 0) {
                list.push(game.dead[i].name);
            }
        }
        return list.length > 0;
    },
    content:function(){
        "step 0"
        player.awakenSkill('iknos_gz')
        var list = [];
        for (var i = 0; i < game.dead.length; i++) {
            if (game.dead[i].maxHp != 0) {
                list.push(game.dead[i].name);
            }
        }
        player.chooseButton(ui.create.dialog('选择一名已死亡的角色令其复活', [list, 'character']), function (button) {
            for (var i = 0; i < game.dead.length && game.dead[i].name != button.link; i++){
                var dead = game.dead[i];
                return get.attitude(player,dead)
            }
        });
        'step 1'
        if (result.bool) {
            for (var i = 0; i < game.dead.length && game.dead[i].name != result.buttons[0].link; i++);
            var dead = game.dead[i];
            dead.revive(1);
            dead.changeHujia(1);
            player.changeHujia(1)
            var skills = dead.getSkills();
            for (var j = 0; j < skills.length; j++) {
                dead.markSkill(skills[j])
            }
            dead.checkMarks()
            dead.addTempSkill('iknos_gz_gain')
            dead.storage.iknos_gz_gain=player
        }
    },
    subSkill:{
        gain:{
            onremove:function(player){
                var num=player.storage.iknos_gz_gain.countCards('h')-player.countCards('h')
                if(num>0){
                    player.draw(player.storage.iknos_gz_gain.countCards('h'))
                }
                delete player.storage.iknos_gz_gain.countCards('h')
            }
        }
    },
    ai:{
        order:3,
        player:function(card,player){
            var list = [];
            for (var i = 0; i < game.dead.length; i++) {
                if (game.dead[i].maxHp != 0) {
                    list.push(game.dead[i].name);
                }
            }
            for(var i in list){
                if(get.attitude(player,i)>0) return 1
            }
        }
    }
}
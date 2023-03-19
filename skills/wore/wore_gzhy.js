skill = {
    trigger: {
        global: "roundStart",
        player: "enterGame",
    },
    mark:true,
    intro:{
        mark: function (dialog, storage, player) {
            dialog.addText('你获得的技能：');
            dialog.addText(storage)
        },
    },
    init: function (player) {
        if (!player.storage.wore_gzhy) player.storage.wore_gzhy = []
    },
    forced: true,
    content: function () {
        'step 0'
        if(player.storage.wore_gzhy!=[]){
            for(var i in player.storage.wore_gzhy){
                player.removeSkill(i)
                player.storage.wore_gzhy.remove(i)
            }
        }
        var list = [];
        if (get.mode() == 'guozhan') {
            for (var i in lib.characterPack.mode_guozhan) {
                if (game.hasPlayer(function (current) {
                    return current.name == i
                })) {
                    continue
                } else {
                    if (!lib.filter.characterDisabled(i) && !lib.filter.characterDisabled2(i)) {
                        list.push(i);
                    }
                }
            }
        } else {
            for (var i in lib.character) {
                if (!lib.filter.characterDisabled(i) && !lib.filter.characterDisabled2(i)) {
                    list.push(i);
                }
            }
        }
        list.remove('fr_hyperner');
        list.remove('fr_wore');
        list = list.randomGets(4)
        var dialog = ui.create.dialog('请选择武将', 'hidden');
        dialog.add([list.randomGets(list.length), 'character']);
        player.chooseButton(dialog, true).ai = function (button) {
            return get.rank(button.link, true);
        };
        'step 1'
        var skills = lib.character[result.links[0]][3].slice(0);
        for(var i=0; i < skills.length;i++){
            player.addSkill(skills[i])
        }
        player.storage.wore_gzhy=skills
    }
}
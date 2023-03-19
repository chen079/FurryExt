skill={
    forced:true,
    mod:{
        maxHandcard:function(player,num){
            return num+99;
        },
    },
    hideCharacter:function (name, player) {
        var info = lib.character[name];
        if (!info) return;
        if (player.name1 != name && player.name2 != name) return;
        var skills = info[3].slice(0);
        if (name == player.name1) {
            if (player.classList.contains(_status.video ? 'unseen_v' : 'unseen')) return;
            player.classList.add(_status.video ? 'unseen_v' : 'unseen');
            player.name = 'unknown';
            if (!player.node.name_seat && !_status.video) {
                player.node.name_seat = ui.create.div('.name.name_seat', get.verticalStr(get.translation(player.name)), player);
                player.node.name_seat.dataset.nature = get.groupnature(player.group);
            };
            player.sex = 'male';
        } else {
            if (player.classList.contains(_status.video ? 'unseen2_v' : 'unseen2')) return;
            player.classList.add(_status.video ? 'unseen2_v' : 'unseen2');
        };
        if (!player.hiddenSkills) player.hiddenSkills = [];
        game.log(game.me.hiddenSkills);
        player.removeSkill(skills);
        player.hiddenSkills.addArray(skills);
        player.storage.nohp = true;
        player.addSkill('g_hidden_ai');
        player.storage.rawHp = player.hp;
        player.storage.rawMaxHp = player.maxHp;
        player.hp = 1;
        player.maxHp = 1;
        player.node.hp.hide();
        player.update();
    },
}
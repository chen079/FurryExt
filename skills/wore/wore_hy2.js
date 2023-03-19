skill = {
    trigger: {
        global: "gameStart",
        player: "enterGame",
    },
    forced: true,
    nosub: true,
    unique: true,
    group:['wore_hy_get'],
    content: function () {
        var next = game.createEvent('wore_hy_get', false);
        next.player = player;
        next.setContent(lib.skill.wore_hy_get.content);
    },
    ai: {
        effect: {
            target: function (card, player, target) {
                if (get.tag(card, 'damage')) {
                    if (!target.hasFriend()) return;
                    if (target.hp <= 2) return;
                    if (!target.storage.wore_hy_damage) {
                        if (get.attitude(player, target) < 0 || get.tag(card, 'multineg')) return [0, 1];
                        return [1, 1];
                    }
                }
            },
        },
    },
    get: {
        trigger: {
            player: "damageEnd",
        },
        forced: true,
        filter: function (event, player) {
            return event.num > 0 && !player.storage.wore_hy
        },
        content: function () {
            'step 0'
            if (player.hasSkill('subplayer')) {
                player.exitSubPlayer();
            }
            var list = [];
            if(get.mode()=='guozhan'){
                for(var i in lib.characterPack.mode_guozhan){
                    if(game.hasPlayer(function(current){
                        return current.name==i
                    })){
                        continue
                    }else{
                        if (!lib.filter.characterDisabled(i) && !lib.filter.characterDisabled2(i)) {
                            list.push(i);
                        }
                    }
                }
            }else{
                for (var i in lib.character) {
                    if (!lib.filter.characterDisabled(i) && !lib.filter.characterDisabled2(i)) {
                        list.push(i);
                    }
                }
            }
            list.remove('fr_hyperner');
            list.remove('fr_wore');
            list = list.randomGets(4)
            var dialog = ui.create.dialog('请选择随从的技能', 'hidden');
            dialog.add([list.randomGets(list.length), 'character']);
            player.chooseButton(dialog, true).ai = function (button) {
                return get.rank(button.link, true);
            };
            'step 1'
            var skills = lib.character[result.links[0]][3].slice(0);
            player.storage.wore_hy=player.addSubPlayer({
                name:'fr_hyperner',
                skills:skills,
                hp:1,
                maxHp:1,
                hs:get.cards(4),
                skill:'wore_hy',
                onremove:function(player){
                    delete player.storage.wore_hy;
                }
            });
            'step 2'
            player.callSubPlayer(player.storage.wore_hy);
        },
        sub: true,
    },
}
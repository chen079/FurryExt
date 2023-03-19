skill =  {
    trigger: {
        player: "phaseBegin",
    },
    filter: function (event, player) {
        return player.getSubPlayers('wore_hy_get').length > 0 && !player.hasSkill('subplayer');
    },
    locked: true,
    content: function () {
        'step 0'
        player.callSubPlayer().set('tag', 'wore_hy_get');
        'step 1'
        player.update();
    },
    group: ["wore_hy_get", "wore_hy_getbegin"],
    ai: {
        order: 1,
        result: {
            player: function (player, target) {
                return 1;
                // if(player.hp<=3) return 3;
                // if(!player.needsToDiscard(player.hp-1)) return 2;
                // return 1;
            },
        },
    },
    subSkill: {
        getbegin: {
            trigger: {
                global: "roundStart",
            },
            filter: function (event, player) {
                return game.roundNumber == 1
            },
            direct: true,
            unique: true,
            content: function () {
                var next = game.createEvent('wore_hy_get', false);
                next.player = player;
                next.setContent(lib.skill.wore_hy_get.content);
            }
        },
        quit: {
            enable: "phaseUse",
            name: "切换",
            prompt: "出牌阶段，你可以切换为原始武将。",
            silent: true,
            direct: true,
            filter: function (event, player) {
                return player.hasSkill('subplayer')
            },
            content: function () {
                player.exitSubPlayer();
            },
            sub: true,
            popup: false,
            forced: true,
        },
        get: {
            trigger: {
                player: "damageEnd",
            },
            forced: true,
            filter: function (event, player) {
                return event.num > 0
            },
            content: function () {
                'step 0'
                if (player.getSubPlayers('wore_hy_get').length == 1) {
                    player.callSubPlayer()
                } else {
                    event.goto(2)
                }
                'step 1'
                player.udpate()
                event.finish()
                'step 2'
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
                'step 3'
                var skills = lib.character[result.links[0]][3].slice(0);
                skills.push('wore_hy_quit')
                player.storage.fr_hyperner=player.addSubPlayer({
                    name: "fr_hyperner",
                    hp: 1,
                    maxHp: 1,
                    sex: "male",
                    hs: get.cards(4),
                });
                'step 4'
                player.callSubPlayer();
                'step 5'
                player.update();
            },
            sub: true,
        },
    },
}
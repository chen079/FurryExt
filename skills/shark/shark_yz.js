skill = {
    enable: "phaseUse",
    usable: 1,
    init:function(player){
        player.storage.shark_yz=[]
    },
    initList:function(player){
        var list;
        if (_status.characterlist) {
            list = [];
            for (var i = 0; i < _status.characterlist.length; i++) {
                var name = _status.characterlist[i];
                if (lib.character[name][1] == 'wei', 'shu', 'qun', 'wu', 'shen', 'jin') list.push(name);
            }
        }
        else if (_status.connectMode) {
            list = get.charactersOL(function (i) {
                return lib.character[i][1] != 'wei', 'shu', 'qun', 'wu', 'shen', 'jin';
            });
        }
        else {
            list = get.gainableCharacters(function (info) {
                return info[1] == 'wei', 'shu', 'qun', 'wu', 'shen', 'jin';
            });
        }
        var players = game.players.concat(game.dead);
        for (var i = 0; i < players.length; i++) {
            list.remove(players[i].name);
            list.remove(players[i].name1);
            list.remove(players[i].name2);
        }
        list.remove('fr_shark');
        player.storage.shark_lib=list
    },
    content: function () {
        'step 0'
        player.chooseControl(player.storage.shark_yz, 'cancel2')
        'step 1'
        if (result.control != 'cancel2') {
            player.removeSkill(result.index)
            player.storage.shark_yz.remove(result.index)
            var list=player.storage.shark_lib.randomGets(5)
            var skills = [];
            for (var i of list) {
                skills.addArray((lib.character[i][3] || []).filter(function (skill) {
                    var info = get.info(skill);
                    return info && !info.zhuSkill && !info.limited && !info.juexingji && !info.hiddenSkill && !info.charlotte && !info.dutySkill;
                }));
            }
            if (!list.length || !skills.length) { event.finish(); return; }
            if (player.isUnderControl()) {
                game.swapPlayerAuto(player);
            }
            var switchToAuto = function () {
                _status.imchoosing = false;
                event._result = {
                    bool: true,
                    skills: skills.randomGets(1),
                };
                if (event.dialog) event.dialog.close();
                if (event.control) event.control.close();
            };
            var chooseButton = function (list, skills) {
                var event = _status.event;
                if (!event._result) event._result = {};
                event._result.skills = [];
                var rSkill = event._result.skills;
                var dialog = ui.create.dialog('请选择要获得的技能', [list, 'character'], 'hidden');
                event.dialog = dialog;
                var table = document.createElement('div');
                table.classList.add('add-setting');
                table.style.margin = '0';
                table.style.width = '100%';
                table.style.position = 'relative';
                for (var i = 0; i < skills.length; i++) {
                    var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                    td.link = skills[i];
                    table.appendChild(td);
                    td.innerHTML = '<span>' + get.translation(skills[i]) + '</span>';
                    td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                        if (_status.dragged) return;
                        if (_status.justdragged) return;
                        _status.tempNoButton = true;
                        setTimeout(function () {
                            _status.tempNoButton = false;
                        }, 500);
                        var link = this.link;
                        if (!this.classList.contains('bluebg')) {
                            if (rSkill.length >= 1) return;
                            rSkill.add(link);
                            this.classList.add('bluebg');
                        }
                        else {
                            this.classList.remove('bluebg');
                            rSkill.remove(link);
                        }
                    });
                }
                dialog.content.appendChild(table);
                dialog.add('　　');
                dialog.open();
                event.switchToAuto = function () {
                    event.dialog.close();
                    event.control.close();
                    game.resume();
                    _status.imchoosing = false;
                };
                event.control = ui.create.control('ok', function (link) {
                    event.dialog.close();
                    event.control.close();
                    game.resume();
                    _status.imchoosing = false;
                });
                for (var i = 0; i < event.dialog.buttons.length; i++) {
                    event.dialog.buttons[i].classList.add('selectable');
                }
                game.pause();
                game.countChoose();
            };
            if (event.isMine()) {
                chooseButton(list, skills);
            }
            else if (event.isOnline()) {
                event.player.send(chooseButton, list, skills);
                event.player.wait();
                game.pause();
            }
            else {
                switchToAuto();
            }
        } else {
            player.storage.counttrigger.shark_yz--;
            event.finish();
        }
        'step 2'
        var map = event.result || result;
        if (map && map.skills && map.skills.length) {
            for (var i of map.skills){
                player.addSkillLog(i)
                player.storage.shark_yz.push(i)
            }
        }
        game.broadcastAll(function (list) {
            game.expandSkills(list);
            for (var i of list) {
                var info = lib.skill[i];
                if (!info) continue;
            }
        }, map.skills);
    },
    group:'shark_yz_add',
    subSkill: {
        add: {
            trigger: {
                global: 'gameStart',
            },
            forced: true,
            content: function () {
                'step 0'
                if(!player.storage.shark_lib) lib.skill.shark_yz.initList(player);
                var list=player.storage.shark_lib.randomGets(5)
                var skills = [];
                for (var i of list) {
                    skills.addArray((lib.character[i][3] || []).filter(function (skill) {
                        var info = get.info(skill);
                        return info && !info.zhuSkill && !info.limited && !info.juexingji && !info.hiddenSkill && !info.charlotte && !info.dutySkill;
                    }));
                }
                if (!list.length || !skills.length) { event.finish(); return; }
                if (player.isUnderControl()) {
                    game.swapPlayerAuto(player);
                }
                var switchToAuto = function () {
                    _status.imchoosing = false;
                    event._result = {
                        bool: true,
                        skills: skills.randomGets(3),
                    };
                    if (event.dialog) event.dialog.close();
                    if (event.control) event.control.close();
                };
                var chooseButton = function (list, skills) {
                    var event = _status.event;
                    if (!event._result) event._result = {};
                    event._result.skills = [];
                    var rSkill = event._result.skills;
                    var dialog = ui.create.dialog('请选择要获得的技能', [list, 'character'], 'hidden');
                    event.dialog = dialog;
                    var table = document.createElement('div');
                    table.classList.add('add-setting');
                    table.style.margin = '0';
                    table.style.width = '100%';
                    table.style.position = 'relative';
                    for (var i = 0; i < skills.length; i++) {
                        var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                        td.link = skills[i];
                        table.appendChild(td);
                        td.innerHTML = '<span>' + get.translation(skills[i]) + '</span>';
                        td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                            if (_status.dragged) return;
                            if (_status.justdragged) return;
                            _status.tempNoButton = true;
                            setTimeout(function () {
                                _status.tempNoButton = false;
                            }, 500);
                            var link = this.link;
                            if (!this.classList.contains('bluebg')) {
                                if (rSkill.length >= 3) return;
                                rSkill.add(link);
                                this.classList.add('bluebg');
                            }
                            else {
                                this.classList.remove('bluebg');
                                rSkill.remove(link);
                            }
                        });
                    }
                    dialog.content.appendChild(table);
                    dialog.add('　　');
                    dialog.open();

                    event.switchToAuto = function () {
                        event.dialog.close();
                        event.control.close();
                        game.resume();
                        _status.imchoosing = false;
                    };
                    event.control = ui.create.control('ok', function (link) {
                        event.dialog.close();
                        event.control.close();
                        game.resume();
                        _status.imchoosing = false;
                    });
                    for (var i = 0; i < event.dialog.buttons.length; i++) {
                        event.dialog.buttons[i].classList.add('selectable');
                    }
                    game.pause();
                    game.countChoose();
                };
                if (event.isMine()) {
                    chooseButton(list, skills);
                }
                else if (event.isOnline()) {
                    event.player.send(chooseButton, list, skills);
                    event.player.wait();
                    game.pause();
                }
                else {
                    switchToAuto();
                }
                'step 1'
                var map = event.result || result;
                if (map && map.skills && map.skills.length) {
                    for (var i of map.skills){
                        player.addSkillLog(i)
                        player.storage.shark_yz.push(i)
                    }
                }
                game.broadcastAll(function (list) {
                    game.expandSkills(list);
                    for (var i of list) {
                        var info = lib.skill[i];
                        if (!info) continue;
                    }
                }, map.skills);
            }
        }
    }
}
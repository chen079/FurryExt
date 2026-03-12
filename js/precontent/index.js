import { lib, game, ui, get, ai, _status } from '../../../../noname.js';

export async function precontent(furryPack) {
    if (!get.is.object(window.OLUI_extAssets)) {
        window.OLUI_extAssets = {
            playerGroup: {},
            playerGroupCount: {},
            playerName: {},
            cardImage: {},
            playerButtonGroup: {},
            playerButtonHp: {}
        };
    }
    window.furry.traverseFolder('extension/福瑞拓展/image/card/OLUI', false)
        .then(files => {
            var assets = {
                // 玩家势力素材
                playerGroup: {
                    // 势力图片素材
                    fr_g_dragon: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/group_fr_g_dragon.png',
                    fr_g_ji: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/group_fr_g_ji.png',
                },
                // 玩家势力对应的手牌数素材
                playerGroupCount: {
                    // 势力对应的手牌数素材
                    fr_g_dragon: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/fr_g_dragon.png',
                    fr_g_ji: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/fr_g_ji.png',
                },
                // 扩展要添加的玩家势力名字横幅素材
                playerName: {
                    // 势力横幅(其他人)
                    fr_g_dragon: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/general_name_bg_fr_g_dragon.png',
                    fr_g_ji: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/general_name_bg_fr_g_ji.png',
                    // 势力横幅(自己)
                    fr_g_dragon_s: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/general_name_bg_fr_g_dragon_s.png',
                    fr_g_ji_s: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/general_name_bg_fr_g_ji_s.png',
                },
                // 卡牌图片
                cardImage: {

                },
                playerButtonGroup: {
                    fr_g_dragon: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/group_fr_g_dragon.png',
                    fr_g_ji: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/group_fr_g_ji.png',
                },
                playerButtonHp: {
                    fr_g_dragon: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/fr_g_dragon_hp.png',
                    fr_g_ji: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/fr_g_ji_hp.png',
                },
            }
            for (var i of files) {
                var type = i.slice(0, i.lastIndexOf('/'))
                var file = i.slice(i.lastIndexOf('/') + 1)
                var name = file.slice(0, file.lastIndexOf('.'))
                if (!assets.cardImage[name]) assets.cardImage[name] = {}
                assets.cardImage[name][type] = lib.assetURL + 'extension/福瑞拓展/image/card/OLUI/' + i
            }
            throw (assets)
        })
        .catch(assets => {
            for (var i in assets) {
                Object.assign(window.OLUI_extAssets[i], assets[i]);
            }
        })
    lib.onover.push(function (bool) {
        if (bool && lib.config.mode == 'boss') {
            for (var i = 0; i < game.dead.length; i++) {
                if (game.dead[i].name == 'fr_bosshars' && !game.frAchi.hasAchi('斩断纵丝', 'special')) game.frAchi.addProgress('斩断纵丝', 'special')
                if (game.dead[i].name == 'fr_bossfaers' && !game.frAchi.hasAchi('打碎永恒', 'special')) game.frAchi.addProgress('打碎永恒', 'special')
                if (game.dead[i].name == 'fr_bossmala' && !game.frAchi.hasAchi('屠神者', 'special')) game.frAchi.addProgress('屠神者', 'special')
                if (game.dead[i].name == 'fr_bossoert' && !game.frAchi.hasAchi('踏破轮回', 'special')) game.frAchi.addProgress('踏破轮回', 'special')
            }
        }
    })
    window.furry.getExtensionNode("福瑞拓展")
        .then(([leftBar, rightBar]) => {
            const divElements = rightBar.getElementsByClassName('config')
            let spanElement, thanksElement, activeKeys
            for (let i = 0; i < divElements.length; i++) {
                spanElement = divElements[i].querySelector('div#yiyan')
                thanksElement = divElements[i].querySelector('div#thanks')
                activeKeys = divElements[i].querySelector('div#active')
                if (spanElement && thanksElement && activeKeys) {
                    break;
                }
            }
            var keybutton = activeKeys.querySelector('button#activeKey')
            keybutton.addEventListener(lib.config.touchscreen ? "touchend" : "click", function () {
                lib.frActiveKeys.active(activeKeys.querySelector('input').value)
                activeKeys.querySelector('input').value = ''
            });
            //---------------------------------------一言------------------------------------------//
            fetch("https://v1.hitokoto.cn/")
                .then((respond) => respond.json())
                .then((hitokoto) => {
                    spanElement.innerHTML = '每日一言：<br><div style="background: none;">&nbsp&nbsp&nbsp&nbsp' + hitokoto.hitokoto + '</div><br><div style="display: flex; justify-content: flex-end; background: none;">———' + hitokoto.from + "&nbsp&nbsp</div>"
                })
                .catch((error) => {
                    const hitokoto = {
                        hitokoto: "您的网络或配置错误，无法获取一言内容。",
                        from: '钫酸酱',
                    }
                    spanElement.innerHTML = '每日一言：<br><div style="background: none;">&nbsp&nbsp&nbsp&nbsp' + hitokoto.hitokoto + '</div><br><div style="display: flex; justify-content: flex-end;background: none;">———' + hitokoto.from + "&nbsp&nbsp</div>"
                    console.error(error);
                });
            spanElement.style.border = 'double'
            spanElement.style.borderRadius = '3px'
            spanElement.style.width = '100%'
            leftBar.innerHTML = "<div id='furry' style='animation: flicker 1.5s infinite alternate;'>福瑞拓展</div>"
            leftBar.setBackgroundImage('extension/福瑞拓展/image/background/wall.png')
            //鸣谢清单
            var box = document.createElement('div');
            let arrow = thanksElement.childNodes[1]
            box.style.display = 'none';
            box.style.textAlign = 'left'
            box.style.border = '1px solid white';
            window.furry.traverseFolder('extension/福瑞拓展/image/acknowledgments', false, 1)
                .then(fonlders => {
                    for (var i of fonlders) {
                        box.innerHTML += "<li><img style='width:40px;height:40px;border-radius:50%;' src=" + lib.assetURL + "extension/福瑞拓展/image/acknowledgments/" + i + "></img>" + i.slice(0, -4);
                    }
                })
                .catch(error => console.log(error))
            thanksElement.appendChild(box);
            thanksElement.addEventListener(lib.config.touchscreen ? "touchend" : "click", function () {
                if (arrow.style.transform === 'rotate(90deg)') {
                    arrow.style.transform = '';
                    box.style.display = 'none';
                } else {
                    arrow.style.transform = 'rotate(90deg)';
                    box.style.display = 'block';
                }
            });
            box.addEventListener(lib.config.touchscreen ? "touchend" : "click", function (e) {
                e.stopPropagation(); // 阻止事件冒泡
            });
        })
        .catch(error => {
            console.error(error);
        });
    lib.arenaReady.push(function () {
        setTimeout(function () {
            window.furry.require(lib.assetURL + 'extension/福瑞拓展/Lib/math.js')
            window.furry.require(lib.assetURL + 'extension/福瑞拓展/Lib/md5.min.js')
        }, 1000);
        //-------------------------------狂杀与属性--------------------------//
        game.addNature('frmad', '狂', {
            linked: true,
            order: 31,
            lineColor: 'red'
        })
        if (lib.config.extension_十周年UI_enable) {
            lib.nature.set('frmad', 31)
            lib.linked.add('frmad')
            lib.card.sha.nature.add('frmad')
        }
        //---------------------------------------设置：武将评级------------------------------------------//
        for (let pack of ["furryPack"]) {
            for (let name in lib.characterPack[pack]) {
                let bool = ['junk', 'common', 'rare', 'epic', 'legend'].some(function (rarity) {
                    if (lib.characterPack[pack][name][4].includes(rarity)) {
                        if (rarity != "common") lib.rank.rarity[rarity].add(name);
                        return true;
                    }
                });
                if (!bool) console.log('Rarity Error: Cannot read the rarity of ' + name + ' in ' + pack);
            }
        }
        //---------------------------------------初始化势力------------------------------------------//
        if (lib.config.extensions && lib.config.extensions.includes('无名补丁') && lib.config['extension_无名补丁_enable']) {
            setTimeout(() => {
                lib.groupnature.fr_g_dragon = 'fr_g_dragon'
                lib.groupnature.fr_g_ji = 'fr_g_ji'
            }, 1000)
        }
        //--------------------------------------千幻提示------------------------------------------//
        if (lib.config.extension_福瑞拓展_frSkin && !lib.config.extension_千幻聆音_enable) {
            alert('福瑞拓展提示：检测到您没有开启千幻扩展，将无法使用武将皮肤功能。')
            game.saveConfig('extension_福瑞拓展_frSkin', false);
        }
        //------------------------------------------设置：背景音乐------------------------------------------//
        if (lib.config.extension_福瑞拓展_Background_Music && lib.config.extension_福瑞拓展_Background_Music != "1") {
            game.frplayBackgroundMusic();
            ui.backgroundMusic.addEventListener('ended', game.frplayBackgroundMusic);
        };
        //------------------------------------------设置：背景图片------------------------------------------//
        if (lib.config.extension_福瑞拓展_Background_Picture && lib.config.extension_福瑞拓展_Background_Picture != "1") {
            game.frBackground_Picture();
        };
    })
    //体力乘算
    if (lib.config.extension_福瑞拓展_hp_mutiply !== 1) {
        lib.arenaReady.push(function () {
            var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            if (!list.includes(lib.config.extension_福瑞拓展_hp_mutiply)) {
                game.saveConfig('extension_福瑞拓展_hp_mutiply', 1)
                lib.config.extension_福瑞拓展_hp_mutiply = 1
            }
            for (var i in lib.character) {
                if (typeof lib.character[i][2] == 'number') {
                    lib.character[i][2] *= lib.config.extension_福瑞拓展_hp_mutiply;
                } else if (typeof lib.character[i][2] == 'string') {
                    var list = lib.character[i][2].split('/');
                    var hp1 = 2 * Number(list[0]);
                    var hpx = hp1
                    if (list.length >= 2) {
                        var hp2 = 2 * Number(list[1]);
                        hpx += '/' + hp2
                    }
                    if (list.length >= 3) {
                        var hp3 = Number(list[2]);
                        hpx += '/' + hp3
                    }
                    lib.character[i][2] = hpx;
                }
            }
        });
        if (get.mode() == 'guozhan') {
            game.chooseCharacter = function () {
                var next = game.createEvent('chooseCharacter', false);
                next.showConfig = true;
                next.addPlayer = true;
                next.ai = function (player, list, back) {
                    if (_status.brawl && _status.brawl.chooseCharacterAi) {
                        if (_status.brawl.chooseCharacterAi(player, list, back) !== false) {
                            return;
                        }
                    }
                    var filterChoice = function (name1, name2) {
                        if (get.is.double(name1)) return false;
                        var group1 = lib.character[name1][1];
                        var group2 = lib.character[name2][1];
                        if (group1 == 'ye') return group2 != 'ye';
                        var double = get.is.double(name2, true);
                        if (double) return double.includes(group1);
                        return group1 == group2;
                    };
                    for (var i = 0; i < list.length - 1; i++) {
                        for (var j = i + 1; j < list.length; j++) {
                            if (filterChoice(list[i], list[j]) || filterChoice(list[j], list[i])) {
                                var mainx = list[i];
                                var vicex = list[j];
                                if (!filterChoice(mainx, vicex) || (filterChoice(vicex, mainx) && get.guozhanReverse(mainx, vicex))) {
                                    mainx = list[j];
                                    vicex = list[i];
                                }
                                player.init(mainx, vicex, false);
                                if (back) {
                                    list.remove(player.name1);
                                    list.remove(player.name2);
                                    for (var i = 0; i < list.length; i++) {
                                        back.push(list[i]);
                                    }
                                }
                                return;
                            }
                        }
                    }
                }
                next.setContent(function () {
                    "step 0"
                    ui.arena.classList.add('choose-character');
                    var addSetting = function (dialog) {
                        dialog.add('选择座位').classList.add('add-setting');
                        var seats = document.createElement('table');
                        seats.classList.add('add-setting');
                        seats.style.margin = '0';
                        seats.style.width = '100%';
                        seats.style.position = 'relative';
                        for (var i = 1; i <= game.players.length; i++) {
                            var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                            td.innerHTML = '<span>' + get.cnNumber(i, true) + '</span>';
                            td.link = i - 1;
                            seats.appendChild(td);
                            td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                                if (_status.dragged) return;
                                if (_status.justdragged) return;
                                if (_status.cheat_seat) {
                                    _status.cheat_seat.classList.remove('bluebg');
                                    if (_status.cheat_seat == this) {
                                        delete _status.cheat_seat;
                                        return;
                                    }
                                }
                                this.classList.add('bluebg');
                                _status.cheat_seat = this;
                            });
                        }
                        dialog.content.appendChild(seats);
                        if (game.me == game.zhu) {
                            seats.previousSibling.style.display = 'none';
                            seats.style.display = 'none';
                        }

                        dialog.add(ui.create.div('.placeholder.add-setting'));
                        dialog.add(ui.create.div('.placeholder.add-setting'));
                        if (get.is.phoneLayout()) dialog.add(ui.create.div('.placeholder.add-setting'));
                    };
                    var removeSetting = function () {
                        var dialog = _status.event.dialog;
                        if (dialog) {
                            dialog.style.height = '';
                            delete dialog._scrollset;
                            var list = Array.from(dialog.querySelectorAll('.add-setting'));
                            while (list.length) {
                                list.shift().remove();
                            }
                            ui.update();
                        }
                    };
                    event.addSetting = addSetting;
                    event.removeSetting = removeSetting;

                    var chosen = lib.config.continue_name || [];
                    game.saveConfig('continue_name');
                    event.chosen = chosen;

                    var i;
                    event.list = [];
                    for (i in lib.character) {
                        if (i.indexOf('gz_shibing') == 0) continue;
                        if (chosen.includes(i)) continue;
                        if (lib.filter.characterDisabled(i)) continue;
                        if (get.config('onlyguozhan')) {
                            if (!lib.characterPack.mode_guozhan[i]) continue;
                            if (get.is.jun(i)) continue;
                        }
                        if (lib.character[i][4].includes('hiddenSkill')) continue;
                        //if(lib.character[i][2]==6||lib.character[i][2]==8||lib.character[i][2]==10)
                        event.list.push(i);
                    }
                    _status.characterlist = event.list.slice(0);
                    _status.yeidentity = [];
                    if (_status.brawl && _status.brawl.chooseCharacterFilter) {
                        event.list = _status.brawl.chooseCharacterFilter(event.list);
                    }
                    event.list.randomSort();
                    // var list=event.list.splice(0,parseInt(get.config('choice_num')));
                    var list;
                    if (_status.brawl && _status.brawl.chooseCharacter) {
                        list = _status.brawl.chooseCharacter(event.list, game.me);
                    }
                    else {
                        list = game.getCharacterChoice(event.list, parseInt(get.config('choice_num')));
                    }
                    if (_status.auto) {
                        event.ai(game.me, list);
                        lib.init.onfree();
                    }
                    else if (chosen.length) {
                        game.me.init(chosen[0], chosen[1], false);
                        lib.init.onfree();
                    }
                    else {
                        var dialog = ui.create.dialog('选择角色', 'hidden', [list, 'character']);
                        if (!_status.brawl || !_status.brawl.noAddSetting) {
                            if (get.config('change_identity')) {
                                addSetting(dialog);
                            }
                        }
                        var next = game.me.chooseButton(dialog, true, 2).set('onfree', true);
                        next.filterButton = function (button) {
                            if (ui.dialog.buttons.length <= 10) {
                                for (var i = 0; i < ui.dialog.buttons.length; i++) {
                                    if (ui.dialog.buttons[i] != button) {
                                        if (lib.element.player.perfectPair.call({
                                            name1: button.link, name2: ui.dialog.buttons[i].link
                                        })) {
                                            button.classList.add('glow2');
                                        }
                                    }
                                }
                            }
                            if (lib.character[button.link][4].includes('hiddenSkill')) return false;
                            if (ui.selected.buttons.length == 0) {
                                if (get.is.double(button.link)) return false;
                                if (lib.character[button.link][1] == 'ye') return true;
                                for (var i = 0; i < ui.dialog.buttons.length; i++) {
                                    var double = get.is.double(ui.dialog.buttons[i].link, true);
                                    if (ui.dialog.buttons[i] != button && (lib.character[button.link][1] == lib.character[ui.dialog.buttons[i].link][1] || double && double.includes(lib.character[button.link][1]))) {
                                        return true;
                                    }
                                }
                                return false;
                            };
                            if (!lib.character[button.link] || lib.character[button.link][1] == 'ye') return false;
                            if (get.is.double(ui.selected.buttons[0].link)) return false;
                            if (lib.character[ui.selected.buttons[0].link][1] == 'ye') return true;
                            if (get.is.double(button.link)) return get.is.double(button.link, true).includes(lib.character[ui.selected.buttons[0].link][1]);
                            return (lib.character[button.link][1] == lib.character[ui.selected.buttons[0].link][1]);
                        };
                        next.switchToAuto = function () {
                            event.ai(game.me, list);
                            ui.arena.classList.remove('selecting');
                        };
                        var createCharacterDialog = function () {
                            event.dialogxx = ui.create.characterDialog('heightset', function (i) {
                                if (i.indexOf('gz_shibing') == 0) return true;
                                if (get.config('onlyguozhan')) {
                                    if (!lib.characterPack.mode_guozhan[i]) return true;
                                    if (get.is.jun(i)) return true;
                                }
                            }, get.config('onlyguozhanexpand') ? 'expandall' : undefined, get.config('onlyguozhan') ? 'onlypack:mode_guozhan' : undefined);
                            if (ui.cheat2) {
                                ui.cheat2.animate('controlpressdownx', 500);
                                ui.cheat2.classList.remove('disabled');
                            }
                        };
                        if (lib.onfree) {
                            lib.onfree.push(createCharacterDialog);
                        }
                        else {
                            createCharacterDialog();
                        }
                        ui.create.cheat2 = function () {
                            ui.cheat2 = ui.create.control('自由选将', function () {
                                if (this.dialog == _status.event.dialog) {
                                    if (game.changeCoin) {
                                        game.changeCoin(50);
                                    }
                                    this.dialog.close();
                                    _status.event.dialog = this.backup;
                                    this.backup.open();
                                    delete this.backup;
                                    game.uncheck();
                                    game.check();
                                    if (ui.cheat) {
                                        ui.cheat.animate('controlpressdownx', 500);
                                        ui.cheat.classList.remove('disabled');
                                    }
                                }
                                else {
                                    if (game.changeCoin) {
                                        game.changeCoin(-10);
                                    }
                                    this.backup = _status.event.dialog;
                                    _status.event.dialog.close();
                                    _status.event.dialog = _status.event.parent.dialogxx;
                                    this.dialog = _status.event.dialog;
                                    this.dialog.open();
                                    game.uncheck();
                                    game.check();
                                    if (ui.cheat) {
                                        ui.cheat.classList.add('disabled');
                                    }
                                }
                            });
                            if (lib.onfree) {
                                ui.cheat2.classList.add('disabled');
                            }
                        }
                        ui.create.cheat = function () {
                            _status.createControl = ui.cheat2;
                            ui.cheat = ui.create.control('更换', function () {
                                if (ui.cheat2 && ui.cheat2.dialog == _status.event.dialog) {
                                    return;
                                }
                                if (game.changeCoin) {
                                    game.changeCoin(-3);
                                }
                                event.list = event.list.concat(list);
                                event.list.randomSort();
                                // list=event.list.splice(0,parseInt(get.config('choice_num')));
                                list = game.getCharacterChoice(event.list, parseInt(get.config('choice_num')));
                                var buttons = ui.create.div('.buttons');
                                var node = _status.event.dialog.buttons[0].parentNode;
                                _status.event.dialog.buttons = ui.create.buttons(list, 'character', buttons);
                                _status.event.dialog.content.insertBefore(buttons, node);
                                buttons.animate('start');
                                node.remove();
                                game.uncheck();
                                game.check();
                            });
                            delete _status.createControl;
                        }
                        if (!_status.brawl || !_status.brawl.chooseCharacterFixed) {
                            if (!ui.cheat && get.config('change_choice'))
                                ui.create.cheat();
                            if (!ui.cheat2 && get.config('free_choose'))
                                ui.create.cheat2();
                        }
                    }
                    "step 1"
                    if (ui.cheat) {
                        ui.cheat.close();
                        delete ui.cheat;
                    }
                    if (ui.cheat2) {
                        ui.cheat2.close();
                        delete ui.cheat2;
                    }
                    if (result.buttons) {
                        game.me.init(result.buttons[0].link, result.buttons[1].link, false);
                        game.addRecentCharacter(result.buttons[0].link, result.buttons[1].link);
                    }
                    // game.me.setIdentity(game.me.group);
                    event.list.remove(game.me.name1);
                    event.list.remove(game.me.name2);
                    for (var i = 0; i < game.players.length; i++) {
                        if (game.players[i] != game.me) {
                            event.ai(game.players[i], game.getCharacterChoice(event.list, parseInt(get.config('choice_num'))), event.list);
                        }
                    }
                    for (var i = 0; i < game.players.length; i++) {
                        game.players[i].classList.add('unseen');
                        game.players[i].classList.add('unseen2');
                        _status.characterlist.remove(game.players[i].name);
                        _status.characterlist.remove(game.players[i].name2);
                        if (game.players[i] != game.me) {
                            game.players[i].node.identity.firstChild.innerHTML = '猜';
                            game.players[i].node.identity.dataset.color = 'unknown';
                            game.players[i].node.identity.classList.add('guessing');
                        }
                        game.players[i].hiddenSkills = lib.character[game.players[i].name1][3].slice(0);
                        var hiddenSkills2 = lib.character[game.players[i].name2][3];
                        for (var j = 0; j < hiddenSkills2.length; j++) {
                            game.players[i].hiddenSkills.add(hiddenSkills2[j]);
                        }
                        for (var j = 0; j < game.players[i].hiddenSkills.length; j++) {
                            if (!lib.skill[game.players[i].hiddenSkills[j]]) {
                                game.players[i].hiddenSkills.splice(j--, 1);
                            }
                        }
                        game.players[i].group = 'unknown';
                        game.players[i].sex = 'unknown';
                        game.players[i].name1 = game.players[i].name;
                        game.players[i].name = 'unknown';
                        game.players[i].identity = 'unknown';
                        game.players[i].node.name.show();
                        game.players[i].node.name2.show();
                        game.players[i]._group = lib.character[game.players[i].name1][1];
                        for (var j = 0; j < game.players[i].hiddenSkills.length; j++) {
                            game.players[i].addSkillTrigger(game.players[i].hiddenSkills[j], true);
                        }
                    }
                    setTimeout(function () {
                        ui.arena.classList.remove('choose-character');
                    }, 500);
                });
            };
        }
    }
    //---------------------------------------设置：检测无名杀版本------------------------------------------//
    get.compareVersion = function (a, b) {
        if (!a) a = "0.0.0";
        if (!b) b = lib.version;
        var arr1 = a.split(".");
        var arr2 = b.split(".");
        for (var i = 0; i < Math.min(arr1.length, arr2.length); i++) {
            var num1 = parseInt(arr1[i]);
            var num2 = parseInt(arr2[i]);
            if (num1 > num2) return 1;
            if (num1 < num2) return -1;
        }
        if (arr1.length > arr2.length) {
            return 1;
        }
        else if (arr1.length < arr2.length) {
            return -1;
        }
        return 0;
    };
    var noname_versionx = "1.10.4";
    if (lib.version && !lib.config.furryNotMetionNonameVersion) {
        if (get.compareVersion(noname_versionx) > 0) {
            var ret = confirm("当前无名杀版本" + lib.version + "落后于【福瑞拓展】最低支持版本1.10.4，请尽快更新，点击确定关闭本扩展");
            if (!ret) {
                alert("请确认你明白点击此选项导致的后果");
                alert("由游戏版本过低导致任何问题本扩展均不负责");
                game.saveConfig('furryNotMetionNonameVersion', true);
            }
            else {
                game.saveConfig('extension_福瑞拓展_enable', false);
                game.reload();
            }
        }
    }
    //------------------------------------------设置：福瑞乱斗------------------------------------------//
    if (lib.config.extension_福瑞拓展_ban_ai) {
        var savedFilter = lib.filter.characterDisabled;
        lib.filter.characterDisabled = function (i, libCharacter) {
            if (i && i.indexOf('fr_') != 0) {
                return true;
            }
            return savedFilter(i, libCharacter);
        };
    }
    //------------------------------------------设置：AI禁将------------------------------------------//
    if (lib.config.extension_福瑞拓展_ban_ai2) {
        var savedFilter = lib.filter.characterDisabled;
        lib.filter.characterDisabled = function (i, libCharacter) {
            if (i && i.indexOf('fr_') == 0) {
                return true;
            }
            return savedFilter(i, libCharacter);
        };
    }
    //---------------------------------------自动开启武将------------------------------------------//
    if (!lib.config.extension_福瑞拓展_autoOpenPack) {
        var Packs = ['furryPack', 'furryBoss', 'furryGZPack']
        var unloadPacks = Packs.filter(i => !lib.config.characters.includes(i))
        for (var i = 0; i < unloadPacks.length; i++) {
            lib.config.characters.push(unloadPacks[i])
        }
        game.saveConfig('characters', lib.config.characters)
        game.saveConfig('extension_福瑞拓展_autoOpenPack', true)
    }
    //---------------------------------------设置：背景图片------------------------------------------//
    game.frBackground_Picture = function () {
        var temp = lib.config['extension_福瑞拓展_Background_Picture'];
        if (temp == 'auto') {
            var list = [
                'picture1',
            ];
            if (_status.frBackground_Picture) list.remove(_status.frBackground_Picture);
            temp = list.randomGet();
        }
        _status.frBackground_Picture = temp;
        if (temp !== '1') {
            game.broadcastAll() + ui.background.setBackgroundImage("extension/福瑞拓展/image/background/" + temp + ".jpg");
        } else {
            game.broadcastAll() + ui.background.setBackgroundImage('image/background/' + lib.config.image_background + '.jpg');
        }
        var item = lib.config['extension_福瑞拓展_Background_Picture'];
        if (item != "auto") {
            if (_status.Background_Picture_timeout) {
                clearTimeout(_status.Background_Picture_timeout);
            };
        } else if (item == "auto") {
            var autotime = lib.config['extension_福瑞拓展_Background_Picture_auto'];

            var Timeout = autotime ? parseInt(autotime) : 30000;

            ///////////////////////////////////////////////////////
            var Timeout2 = _status.Background_Picture_Timeout2;
            if (_status.Background_Picture_timeout && Timeout2 && Timeout2 != Timeout) {
                clearTimeout(_status.Background_Picture_timeout);
            };
            /////////////////////////////////////////////////
            _status.Background_Picture_timeout = setTimeout(function () {
                game.frBackground_Picture();
            }, Timeout); /*Timeout*/
            _status.Background_Picture_Timeout2 = Timeout;
        };
    };
    //此处内容由钫酸酱制作，若有需要请联系作者...
    game.loadJsonFromFile = function (filePath, callback, targetObject) {
        // 默认参数处理
        if (!targetObject) {
            targetObject = Array.isArray(targetObject) ? [] : {};
        }

        // 参数校验
        if (typeof filePath !== 'string' || typeof callback !== 'function') {
            throw new Error('无效的参数');
        }

        // 读取配置文件
        game.readFile(filePath, function (data) {
            try {
                // 解析配置文件内容
                var isBuffer = data instanceof ArrayBuffer;
                var config;
                if (isBuffer) {
                    var decoder = new TextDecoder("UTF-8");
                    var decodedData = decoder.decode(data);
                    config = JSON.parse(decodedData);
                } else {
                    config = JSON.parse(data);
                }

                // 合并配置到目标对象
                if (Array.isArray(config)) {
                    if (Array.isArray(targetObject)) {
                        targetObject.push.apply(targetObject, config);
                    }
                } else {
                    for (var key in config) {
                        if (config.hasOwnProperty(key)) {
                            targetObject[key] = config[key];
                        }
                    }
                }

                callback(null, targetObject);
            } catch (err) {
                callback('无法解析 JSON 文件', null);
            }
        }, function (err) {
            callback('无法读取 JSON 文件', null);
        });
    };
    //---------------------------------------设置：背景音乐------------------------------------------//
    game.frplayBackgroundMusic = function () {
        //if(lib.config.background_music=='music_off'){
        //ui.backgroundMusic.src='';
        //}
        //ui.backgroundMusic.autoplay=true;
        var temp = lib.config.extension_福瑞拓展_Background_Music;
        if (temp == '0') {
            temp = Math.floor(2 + Math.random() * 10); //2加0到29
            //生成一个范围2到10的整数
            temp = temp.toString();
            //转为字符串
        };
        ui.backgroundMusic.pause();
        var item = {
            "2": "furry_bgm_tavern.mp3",
            "3": "furry_bgm_BattleAgainstATrueHero.mp3",
            "4": "furry_bgm_MySunset.mp3",
            "5": "furry_bgm_FarOut.mp3",
            "6": "furry_bgm_BeethovenVirus.mp3",
            "7": "furry_bgm_MainTitle.mp3",
            "8": "furry_bgm_存亡之战.mp3",
            "9": "furry_bgm_ukigumo.mp3",
            "10": "furry_bgm_BOSS BATTLE：BIG ARMS.mp3",
        };
        if (item[temp]) {
            ui.backgroundMusic.src = lib.assetURL + 'extension/福瑞拓展/audio/bgm/' + item[temp];
        } else {
            game.playBackgroundMusic();
            ui.backgroundMusic.addEventListener('ended', game.playBackgroundMusic);
        }
    }
    //------------------------------------------载入css------------------------------------------//
    var cssList = ['extension', 'mainPage', 'achievement', 'drama']
    for (var i of cssList) {
        lib.init.css(lib.assetURL + 'extension/福瑞拓展/css', i);
    }
    //------------------------------------------设置：成就系统------------------------------------------//
    window.openfrAchievement = function () {
        if (game.frAchi) {
            game.frAchi.openAchievementMainPage();
            return;
        } else {
            alert("发生了点小问题，您可以重新载入本扩展试试。");
        }
    };
    // 成就系统
    // 原版这里通过 lib.init.js 从 asset 目录加载 furry_achievement.js。
    // 但当前扩展结构中该文件位于 js/precontent 下，因此改为直接动态导入该模块。
    (async function () {
        try {
            await import(/* @vite-ignore */ './furry_achievement.js');
            lib.arenaReady.push(function () {
                ui.create.system("福瑞成就", function () {
                    if (typeof window.openfrAchievement == 'function') {
                        window.openfrAchievement();
                    } else {
                        alert("错误：您似乎没有正常导入福瑞拓展扩展文件");
                    }
                }, true);
                try {
                    game.frAchi.init();
                    game.frAchi.loadFromFile();
                } catch (e) {
                    console.error(e);
                    alert("错误：成就初始化失败");
                }
            });
        } catch (e) {
            console.error(e);
            // 仅在控制台记录错误，不再弹出“成就导入失败”的阻塞提示，避免影响正常游戏。
        }
    })();
    //------------------------------------------自定义game函数------------------------------------------//
    game.frGetQhlySkin = function (name) {
        if (game.qhly_getSkin) {
            return game.qhly_getSkin(name);
        }
        return null;
    };

    //------------------------------------------自定义get函数------------------------------------------//
    window.FrskillTips = function (tipname, id) {
        const frtip = ui.create.div('.Fr-frtips', document.body);
        var isPhone = /mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent);
        frtip.style.zIndex = 998;
        const skilltip = ui.create.div('.Fr-skilltip', frtip);
        skilltip.innerHTML = tipname;
        var herf = document.getElementById(id);
        if (herf) {
            var left = herf.getBoundingClientRect().left;
            if (isPhone) left += herf.offsetParent.offsetLeft;
            left += document.body.offsetWidth * 0.15;
            skilltip.style.left = left + 'px';
            skilltip.style.top = (herf.getBoundingClientRect().top + 30) + 'px';
        }
        frtip.listen(function (e) {
            e.stopPropagation();
            this.remove();
        })
    };
    get.frIntroduce = function (name, str, type) {
        var temp = (Math.random() * 9 + 1) * 100000
        if (!type) type = 'game'
        if (!str || str == '') {
            if (type == 'game') {
                let str1 = window.furry.introduce[name].name;
                let str2 = window.furry.introduce[name].info;
                let link = "<a id='" + temp + "' style='color:unset' href='#' onclick=\"FrskillTips('" + str2 + "','" + temp + "');\">" + str1 + "※</a>";
                return link;
            } else {
                let str1 = window.furry[type + 'Introduce'][name].name;
                let str2 = window.furry[type + 'Introduce'][name].info;
                let link = "<a id='" + temp + "' style='color:unset' href=\"javascript:FrskillTips('" + str2 + "','" + temp + "');\">" + str1 + "※</a>";
                return link;
            }
        } else {
            let link = "<a id='" + temp + "' style='color:unset' href=\"javascript:FrskillTips('" + str + "','" + temp + "');\">" + name + "※</a>";
            return link;
        }
    };
    //------------------------------------------自定义window函数------------------------------------------//
    window.furryIntroduce = function (name, type) {
        if (!type) {
            window.furryOpenDialog("概念解释：" + window.furry.introduce[name].name, null, window.furry.introduce[name].info);
        } else if (type = 'buff') {
            window.furryOpenDialog("Buff介绍：" + get.FrBuffIntro(name).name, "extension/福瑞拓展/image/Buff/" + name + ".png", get.FrBuffIntro(name).content);
        }
    };
    get.dialogIntro = function (name) {
        let temp = (Math.random() * 9 + 1) * 100000
        let link = "<a id='" + temp + "' style='color:#FF0000' href=\"javascript:furryIntroduce('" + name + "','buff');\">『" + get.FrBuffIntro(name).name + "』</a>"
        return link
    }
    window.furryOpenDialog = function (title, icon, content) {
        if (!title) title = "";
        if (!content) content = "";
        if (!window.furryCurrentDialogs) {
            window.furryCurrentDialogs = [];
        }

        // 创建覆盖层
        var overlay = ui.create.div('.furry-dialog-overlay', document.body);
        overlay.addEventListener(lib.config.touchscreen ? "touchend" : "click", function (e) {
            e.stopPropagation(); // 阻止事件冒泡
        });
        overlay.style.zIndex = '98'
        overlay.style.width = '100%'
        overlay.style.height = '100%'

        var dialog = ui.create.div('.furry-dialog', document.body);
        dialog.style.zIndex = '99'
        window.furryCurrentDialogs.push(dialog);
        var icondiv = ui.create.div('.furry-dialog-icon', dialog);
        if (icon) {
            icondiv.setBackgroundImage(icon);
        } else {
            icondiv.hide();
        }
        var text = ui.create.div('.furry-dialog-text', dialog);
        text.innerHTML = content;
        if (lib.config.touchscreen) {
            lib.setScroll(text);
        }
        var titlediv = ui.create.div('.furry-dialog-title', dialog);
        titlediv.innerHTML = title;

        var close = ui.create.div('.furry-dialog-close', dialog);
        close.addEventListener('click', function () {
            window.furryCurrentDialogs.remove(dialog);
            dialog.remove();
            overlay.remove(); // 关闭对话框时同时移除覆盖层
        });

        return dialog;
    };
    //------------------------------------------武将包------------------------------------------//
    if (furryPack.enable) {
        //------------------------------------------载入初始js------------------------------------------//
        // 在 ESM 环境下，这里可以直接使用相对路径，从当前模块所在目录加载其它预备脚本。
        // 使用形如 `./functions.js` 的相对 specifier，避免在浏览器端出现
        // “Failed to resolve module specifier 'extension/福瑞拓展/…'” 这类错误。
        const JsForExt = [
            "functions.js",
            "buffs.js",
            "furry_mode.js",
            "cards.js",
            "character.js",
            "animation.js",
            "boss.js",
            "drama.js",
            "globalSkill.js",
            "guozhan.js",
            "mp.js",
            "shop.js",
            "skin.js",
            "update.js",
            "story.js",
            "activeKeys.js",
        ];
        for (const file of JsForExt) {
            await import(/* @vite-ignore */ `./${file}`);
        }
        if (lib.config.extension_福瑞拓展_furry_onlineUpdate2) {
            window.furry.update2()
        };
        //定义势力
        game.addGroup('fr_g_dragon', '龙', {
            color: 'black',
            image: 'ext:福瑞拓展/image/group/name_fr_g_dragon.png'
        })
        game.addGroup('fr_g_ji', '机', {
            color: 'purple',
            image: 'ext:福瑞拓展/image/group/name_fr_g_ji.png'
        })
        // lib.config.all.characters.push('furryPack');
        lib.translate['furryPack_character_config'] = "<img style='width:100px' src=" + lib.assetURL + "extension/福瑞拓展/image/others/title.png>";// 包名翻译
        //卡包（手牌）
        lib.translate['furryCard_card_config'] = '福瑞卡牌';
        // lib.config.all.cards.push('furryCard');
    }
}

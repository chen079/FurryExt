window.furry.frImport(function (lib, game, ui, get, ai, _status) {
    game.getFrJudge = function (name, judges, ralated, details) {
        if (!ralated) ralated = '无'
        if (!details) details = '无'
        return [name,
            '</br><span class="bluetext">角色分析</span>：' + details,
            '进攻：' + game.frStars(judges[0]) + ' 爆发：' + game.frStars(judges[1]) +
            ' </br>运气：' + game.frStars(judges[2]) + ' 生存：' + game.frStars(judges[3]) +
            ' </br>控制：' + game.frStars(judges[4]) + ' 辅助：' + game.frStars(judges[5]) +
            '</br>谋略：' + game.frStars(judges[6]) + ' 综合：' + game.frStars(judges[7]) + ' </br>']
    }
    game.frStars = function (num) {
        switch (num) {
            case 0: return '☆☆☆☆☆☆';
            case 1: return '★☆☆☆☆☆';
            case 2: return '★★☆☆☆☆';
            case 3: return '★★★☆☆☆';
            case 4: return '★★★★☆☆';
            case 5: return '★★★★★☆';
            case 6: return '★★★★★★';
            default: return '☆☆☆☆☆☆'
        }
    }
    var furry_lib = {
        content: {
            game: {
                syncMenu: true,
                createview: function (node, charalist) {
                    var player = ui.create.player(null, true);
                    player.init(charalist[0][0]);
                    player.style.float = 'left';
                    player.style.left = '3%';
                    player.style.top = '1%';
                    player.style.width = '130px'
                    player.style.height = '170px'
                    player.style.cursor = 'pointer';
                    player.style.position = 'absolute';
                    player.node.count.remove();
                    // player.node.hp.remove();
                    if (lib.config.frLutou) {
                        player.node.avatar.style['height'] = '178px';
                    } else {
                        player.node.avatar.style['height'] = '170px';
                    }
                    player.style.transition = 'all 0.5s';
                    node.appendChild(player);
                    node.appendChild(player);
                    node.playernode = player;

                    var dialog = ui.create.dialog('hidden');
                    dialog.style.left = "calc(6% + 130px)";
                    dialog.style.right = "1%"
                    dialog.style.top = "1%";
                    dialog.style.width = "calc(100% - 130px)";
                    dialog.style.height = "175px";
                    dialog.noopen = true;
                    node.appendChild(dialog);
                    dialog.addText('<div id="Cdetail" style="text-align:left;font-size:16px;width:calc(95% - 60px);margin-top:-10px;">' + charalist[0][2] + '</br><span class="bluetext">角色介绍</span>：' + get.characterIntro(charalist[0][0]) + '</br>' + charalist[0][1]);
                    var dialog1 = ui.create.dialog('hidden');
                    dialog1.style.left = "0px";
                    dialog1.style.top = "220px";
                    dialog1.style.width = "100%";
                    dialog1.style.height = "50%";
                    dialog1.noopen = true;
                    node.appendChild(dialog1);
                    var tp = [];
                    for (var i = 0; i < charalist.length; i++) {
                        tp.push(charalist[i][0]);
                    }
                    dialog1.add([tp, 'character']);
                    for (var i = 0; i < dialog1.buttons.length; i++) {
                        dialog1.buttons[i].classList.add('noclick');
                        dialog1.buttons[i].value = i;
                        if (i > 0) dialog1.buttons[i].style.opacity = 0.7;
                        dialog1.buttons[i].onclick = function () {
                            dialog1.buttons.forEach(button => button.style.opacity = 0.7);
                            this.style.opacity = 1;
                            player.init(charalist[this.value][0]);
                            document.getElementById("Cdetail").innerHTML = charalist[this.value][2] + '</br><span class="bluetext">角色介绍</span>：' + get.characterIntro(charalist[this.value][0]) + '</br>' + charalist[this.value][1];
                        };
                    }
                },
            },
            start: function () {
                ui.auto.hide();
                if (!lib.storage.scene) {
                    lib.storage.scene = {};
                }
                if (!lib.storage.stage) {
                    lib.storage.stage = {};
                }
                if (!_status.extensionmade) {
                    _status.extensionmade = [];
                }
                if (_status.extensionscene) {
                    game.save('scene', lib.storage.scene);
                }
                if (_status.extensionstage) {
                    game.save('stage', lib.storage.stage);
                }
                var dialog = ui.create.dialog('hidden');
                dialog.classList.add('fixed');
                dialog.classList.add('scroll1');
                dialog.classList.add('scroll2');
                dialog.classList.add('fullwidth');
                dialog.classList.add('fullheight');
                dialog.classList.add('noupdate');
                dialog.classList.add('character');
                dialog.contentContainer.style.overflow = 'visible';
                dialog.style.overflow = 'scroll';
                dialog.content.style.height = '100%';
                dialog.contentContainer.style.transition = 'all 0s';
                if (!lib.storage.directStage) dialog.open();
                var packnode = ui.create.div('.packnode', dialog);
                lib.setScroll(packnode);
                ui.background.setBackgroundImage('extension/福瑞拓展/image/background/fire_dance.png');
                //背景
                var clickCapt = function () {
                    var active = this.parentNode.querySelector('.active');
                    if (this.link == 'stage') {
                        if (get.is.empty(lib.storage.scene)) {
                            alert('请创建至少1个场景');
                            return;
                        }
                    }
                    if (active) {
                        if (active == this) return;
                        for (var i = 0; i < active.nodes.length; i++) {
                            active.nodes[i].remove();
                            if (active.nodes[i].showcaseinterval) {
                                clearInterval(active.nodes[i].showcaseinterval);
                                delete active.nodes[i].showcaseinterval;
                            }
                        }
                        active.classList.remove('active');
                    }
                    this.classList.add('active');
                    for (var i = 0; i < this.nodes.length; i++) {
                        dialog.content.appendChild(this.nodes[i]);
                    }
                    var showcase = this.nodes[this.nodes.length - 1];
                    showcase.style.height = (dialog.content.offsetHeight - showcase.offsetTop) + 'px';
                    if (typeof showcase.action == 'function') {
                        if (showcase.action(showcase._showcased ? false : true) !== false) {
                            showcase._showcased = true;
                        }
                    }
                    game.save('currentBrawl', 'help');
                }
                // 应该是这里是制作列表的地方
                var createNode = function (name) {
                    var info = lib.brawl[name];
                    var node = ui.create.div('.dialogbutton.menubutton.large', info.name, packnode, clickCapt);
                    node.style.transition = 'all 0s';
                    var caption = info.name;
                    var modeinfo = '';
                    if (info.mode) {
                        modeinfo = get.translation(info.mode) + '模式';	// 这个是标注哪个模式下使用的
                    }
                    if (info.submode) {
                        if (modeinfo) {
                            modeinfo += ' - ';
                        }
                        modeinfo += info.submode;
                    }
                    var intro;
                    if (Array.isArray(info.intro)) {
                        intro = '<ul style="text-align:left;margin-top:10">';
                        if (modeinfo) {
                            intro += '<li>' + modeinfo;
                        }
                        for (var i = 0; i < info.intro.length; i++) {
                            intro += '<br>' + info.intro[i];
                        }
                    }
                    else {
                        intro = '';
                        if (modeinfo) {
                            intro += '（' + modeinfo + '）';
                        }
                        intro += info.intro;
                    }
                    var today = new Date();
                    var i = ui.create.div('.text center', intro);
                    i.style.overflow = 'scroll';
                    i.style.margin = '0px';
                    i.style.padding = '0px';
                    var showcase = ui.create.div();
                    showcase.style.margin = '0px';
                    showcase.style.padding = '0px';
                    showcase.style.width = '100%';
                    showcase.style.display = 'block'
                    showcase.style.overflow = 'scroll';
                    showcase.action = info.showcase;
                    showcase.link = name;
                    if (info.fullshow) {
                        node.nodes = [showcase];
                        showcase.style.height = '100%';
                    }
                    else {
                        node.nodes = [
                            i,
                            showcase,
                        ];
                    }
                    node.link = name;
                    node._nostart = info.nostart;
                    if (lib.storage.currentBrawl == name) {
                        clickCapt.call(node);
                    }
                    return node;
                }
                // 点那个巨大的“斗”之后
                var clickStart = function () {
                    dialog.delete();
                    ui.auto.show();
                    game.switchMode('identity');
                };
                game.addScene = function (name, clear) {
                    var scene = lib.storage.scene[name];
                    var brawl = {
                        name: name,
                        intro: scene.intro,
                    };
                    for (var i in lib.brawl.scene.template) {
                        brawl[i] = get.copy(lib.brawl.scene.template[i]);
                    }
                    if (!scene.gameDraw) {
                        brawl.content.noGameDraw = true;
                    }
                    brawl.content.scene = scene;
                    lib.brawl['scene_' + name] = brawl;
                    var node = createNode('scene_' + name);
                    if (clear) {
                        game.addSceneClear();
                        clickCapt.call(node);
                        _status.sceneChanged = true;
                    }
                };
                game.addStage = function (name, clear) {
                    var stage = lib.storage.stage[name];
                    var brawl = {
                        name: name,
                        intro: stage.intro,
                        content: {}
                    };
                    for (var i in lib.brawl.stage.template) {
                        brawl[i] = get.copy(lib.brawl.stage.template[i]);
                    }
                    brawl.content.stage = stage;
                    lib.brawl['stage_' + name] = brawl;
                    var node = createNode('stage_' + name);
                    if (clear) {
                        game.addStageClear();
                        clickCapt.call(node);
                    }
                }
                game.removeScene = function (name) {
                    delete lib.storage.scene[name];
                    game.save('scene', lib.storage.scene);
                    _status.sceneChanged = true;
                    for (var i = 0; i < packnode.childElementCount; i++) {
                        if (packnode.childNodes[i].link == 'scene_' + name) {
                            if (packnode.childNodes[i].classList.contains('active')) {
                                for (var j = 0; j < packnode.childElementCount; j++) {
                                    if (packnode.childNodes[j].link == 'scene') {
                                        clickCapt.call(packnode.childNodes[j]);
                                    }
                                }
                            }
                            packnode.childNodes[i].remove();
                            break;
                        }
                    }
                }
                game.removeStage = function (name) {
                    delete lib.storage.stage[name];
                    game.save('stage', lib.storage.stage);
                    for (var i = 0; i < packnode.childElementCount; i++) {
                        if (packnode.childNodes[i].link == 'stage_' + name) {
                            if (packnode.childNodes[i].classList.contains('active')) {
                                for (var j = 0; j < packnode.childElementCount; j++) {
                                    if (get.is.empty(lib.storage.scene)) {
                                        if (packnode.childNodes[j].link == 'scene') {
                                            clickCapt.call(packnode.childNodes[j]);
                                        }
                                    }
                                    else {
                                        if (packnode.childNodes[j].link == 'stage') {
                                            clickCapt.call(packnode.childNodes[j]);
                                        }
                                    }
                                }
                            }
                            packnode.childNodes[i].remove();
                            break;
                        }
                    }
                }
                var sceneNode;
                for (var i in lib.brawl) {
                    if (get.config(i) === false) continue;
                    if (i == 'scene') {
                        sceneNode = createNode(i);
                    }
                    else {
                        createNode(i);
                    }
                }
                if (sceneNode) {
                    game.switchScene = function () {
                        clickCapt.call(sceneNode);
                    }
                }
                for (var i in lib.storage.scene) {
                    game.addScene(i);
                }
                for (var i in lib.storage.stage) {
                    game.addStage(i);
                }
                if (!lib.storage.currentBrawl) {
                    clickCapt.call(packnode.firstChild);
                }
                game.save('lastStage');
                if (lib.storage.directStage) {
                    var directStage = lib.storage.directStage;
                    game.save('directStage');
                    clickStart(directStage);
                }
                lib.init.onfree();
            },
            brawl: {
            }
        },
        config: {
            image: ['extension/福瑞拓展/image/qidongye/furry_lib2.jpg'],
            translate: '福瑞群像',
            config: {
                libhelp: {
                    name: "福瑞群像",
                    init: "1",
                    frequent: true,
                    item: { "1": "查看介绍", "2": "<li>本模式用于展示《福瑞拓展》扩展中的角色信息，包括角色介绍、角色技能、关联角色、角色分析等内容。", "3": "<li>左键点击下方小头像查看角色介绍、分析等内容，右键点击头像查看角色技能、称号等信息。" },
                },
            },
            onremove: function () {
                game.clearModeConfig('furry_lib');
            }
        }
    }
    var judges = {
        'jianaierview': {
            name: '迦奈尔',
            judges: {
                'fr_wore': [2, 3, 5, 2, 2, 2, 4, 4],
                'fr_tiers': [5, 6, 0, 3, 0, 0, 1, 3],
                'fr_tery': [2, 2, 2, 3, 0, 2, 5, 5]
            },
            details: {

            }
        },
        'wanlingview': {
            name: '万灵之森',
            judges: {
                'fr_yifeng': [0, 0, 0, 3, 5, 5, 3, 4],
                'fr_yifa': [4, 4, 0, 4, 2, 2, 3, 5],
                'fr_telina': [0, 0, 5, 2, 2, 0, 3, 3]
            },
            details: {

            }
        },
        'kelaview': {
            name: '克拉',
            judges: {
                'fr_wes': [0, 0, 5, 3, 1, 6, 2, 4],
                'fr_sam': [4, 2, 0, 3, 5, 0, 2, 3],
                'fr_yada': [2, 0, 0, 2, 4, 3, 3, 3],
                'fr_fate': [3, 1, 6, 4, 0, 0, 4, 4],
                'fr_liya': [3, 0, 0, 3, 4, 0, 2, 3],
                'fr_whitewolf': [0, 0, 0, 6, 3, 5, 2, 5],
                'fr_blackwolf': [5, 5, 0, 2, 3, 0, 4, 5],
            },
            details: {

            }
        },
        'yongbingview': {
            name: '佣兵团',
            judges: {
                'fr_sisk': [5, 5, 3, 5, 1, 0, 2, 4],
                'fr_kersm': [4, 2, 0, 2, 3, 4, 2, 3],
                'fr_yada': [2, 0, 0, 2, 4, 3, 3, 3],
            },
            details: {

            }
        },
        'travelerview': {
            name: '游荡者',
            judges: {
                'fr_miya': [4, 6, 5, 0, 0, 0, 1, 5],
                'fr_krikt': [4, 4, 0, 3, 3, 0, 1, 5],
                'fr_laays': [0, 0, 0, 0, 0, 5, 3, 3]
            },
            details: {

            }
        },
        'renyuview': {
            name: '人鱼之海',
            judges: {
                'fr_rest': [3, 0, 2, 3, 3, 2, 5, 4],
            },
            details: {

            }
        },
        'dragonview': {
            name: '巨龙之谷',
            judges: {
                'fr_dragon': [0, 0, 0, 0, 0, 6, 6, 4],
                'fr_lens': [3, 2, 4, 0, 0, 0, 2, 2],
                'fr_mala': [5, 6, 4, 0, 2, 0, 2, 4],
                'fr_marxya': [6, 6, 4, 3, 2, 0, 2, 3],
                'fr_zeta': [0, 0, 3, 0, 4, 5, 2, 3],
                'fr_dier': [4, 2, 3, 0, 0, 0, 2, 3],
                'fr_milite': [5, 6, 2, 0, 1, 6, 2, 3],
                'fr_sayisu': [5, 0, 0, 4, 4, 0, 2, 5],
                'fr_shisan': [5, 6, 3, 0, 3, 2, 2, 4],
            },
            details: {

            }
        },
        'jixieview': {
            name: '机械造物',
            judges: {
                'fr_ken': [0, 0, 0, 3, 6, 6, 0, 3],
                'fr_sheep': [0, 0, 0, 0, 0, 6, 6, 4],
                'fr_bladewolf': [5, 6, 3, 0, 0, 0, 2, 4],
            },
            details: {

            }
        },
        'mofaxueyuanview': {
            name: '魔法学院',
            judges: {
                'fr_milism': [0, 0, 0, 0, 5, 5, 3, 4],
                'fr_lusiya': [0, 0, 3, 3, 2, 4, 5, 5]
            },
            details: {

            }
        },
        'milanview': {
            name: '米兰寺',
            judges: {
                'fr_ala': [4, 0, 0, 3, 5, 2, 3, 3],
                'fr_linyan': [1, 0, 2, 3, 3, 5, 3, 3],
                'fr_horn': [2, 2, 0, 3, 5, 0, 0, 3]
            },
            details: {

            }
        },
        'godview': {
            name: '兽人之神',
            judges: {
                'fr_hars': [0, 0, 2, 2, 6, 3, 3, 4],
                'fr_faers': [4, 4, 4, 4, 0, 0, 3, 5],
                'fr_oert': [0, 0, 6, 3, 5, 0, 0, 3],
                'fr_rasali': [0, 0, 1, 6, 3, 5, 2, 5],
                'fr_nashu': [0, 0, 5, 3, 3, 0, 0, 5]
            },
            details: {

            }
        }
    }
    for (var i in judges) {
        (function (i) {
            furry_lib.content.brawl[i] = {
                name: judges[i].name,
                mode: '',
                intro: [],
                showcase: function (init) {
                    var node = this;
                    if (init) {
                        var charalist = [];
                        for (var j in judges[i].judges) {
                            charalist.push(game.getFrJudge(j, judges[i].judges[j], judges[i].details[j]))
                        }
                        lib.game.createview(node, charalist);
                    }
                },
            }
        })(i)
    }
    game.addMode('furry_lib', furry_lib.content, furry_lib.config)
    if (lib.config.extension_手杀ui_qiDongYe == 'othersOn' && lib.config['extension_手杀ui_enable']) {
        lib.mode['furry_lib'].splash = 'ext:福瑞拓展/image/qidongye/furry_lib.jpg'
    } else {
        lib.mode['furry_lib'].splash = 'ext:福瑞拓展/image/qidongye/furry_lib2.jpg'
    }
})
'use strict';
game.import("extension", function (lib, game, ui, get, ai, _status) {
    window.furry = {
        url: lib.assetURL + "extension/福瑞拓展",
        copy: function (sdir /*源文件夹路径*/, fn /*文件名*/, ddir /*目标文件夹路径*/, callback) {
            game.ensureDirectory(ddir, function () {
            });
            game.readFile(sdir + '/' + fn, function (data) {
                game.writeFile(data, ddir, fn, (callback || function () {
                }));
            });
        },
        addProgress: function (obj, value, total) {
            var progress = Math.floor(value / total * 100);
            obj.style.backgroundSize = progress + "% 100%";
        },
        furryCardFileConfig: function () {
            var progressBG = ui.create.div(".progressBG", ui.window);
            var progressBar = ui.create.div(progressBG);
            var path = "extension/福瑞拓展/image/card/pretty";
            var decade = "extension/十周年UI/image/card";
            var count = 0;
            game.getFileList(path, function (fold, file) {
                var arr = Array.from(file);
                var total = arr.length;
                var doing = function () {
                    if (arr.length) {
                        var f = arr.shift();
                        furry.copy(path, f, decade, function () {
                            furry.addProgress(progressBar, ++count, total);
                            doing();
                        });
                    } else {
                        setTimeout(() => {
                            progressBG.style.opacity = "0";
                            if (confirm("导入成功，点击重启")) {
                                progressBG.remove();
                                game.reload();
                            }
                        }, 1000);
                    }
                };
                doing();
            });
        },
    };
    //------------------此处来自诗笺----------------//
    if (typeof game.furryCreateProgress != 'function') {
        game.furryCreateProgress = (title, max, fileName, value) => {
            const parent = ui.create.div(ui.window, {
                textAlign: 'center',
                width: '300px',
                height: '150px',
                left: 'calc(50% - 150px)',
                top: 'auto',
                bottom: 'calc(50% - 75px)',
                zIndex: '10',
                boxShadow: 'rgb(0 0 0 / 40 %) 0 0 0 1px, rgb(0 0 0 / 20 %) 0 3px 10px',
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
                borderRadius: '8px'
            });
            // 可拖动
            parent.className = 'dialog';
            const container = ui.create.div(parent, {
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%'
            });
            container.ontouchstart = ui.click.dialogtouchStart;
            container.ontouchmove = ui.click.touchScroll;
            container.style.WebkitOverflowScrolling = 'touch';
            parent.ontouchstart = ui.click.dragtouchdialog;
            const caption = ui.create.div(container, '', title, {
                position: 'relative',
                paddingTop: '8px',
                fontSize: '20px'
            });
            ui.create.node('br', container);
            const tip = ui.create.div(container, {
                position: 'relative',
                paddingTop: '8px',
                fontSize: '20px',
                width: '100%'
            });
            const file = ui.create.node('span', tip, '', fileName);
            file.style.width = file.style.maxWidth = '100%';
            ui.create.node('br', tip);
            const index = ui.create.node('span', tip, '', String(value || '0'));
            ui.create.node('span', tip, '', '/');
            const maxSpan = ui.create.node('span', tip, '', String(max || '未知'));
            ui.create.node('br', container);
            const progress = ui.create.node('progress.zxgxProgress', container);
            progress.setAttribute('value', value || '0');
            progress.setAttribute('max', max);
            parent.getTitle = () => caption.innerText;
            parent.setTitle = (title) => caption.innerText = title;
            parent.getFileName = () => file.innerText;
            parent.setFileName = (name) => file.innerText = name;
            parent.getProgressValue = () => progress.value;
            parent.setProgressValue = (value) => progress.value = index.innerText = value;
            parent.getProgressMax = () => progress.max;
            parent.setProgressMax = (max) => progress.max = maxSpan.innerText = max;
            return parent;
        };
    }
    return {
        name: "福瑞拓展",
        editable: false, content: function (config, pack) {
            //---------------------------------------更新说明------------------------------------------//
            //更新公告
            lib.skill._Furry_changeLog = {
                charlotte: true,
                ruleSkill: true,
                trigger: { global: ['chooseButtonBefore', 'gameStart', 'gameDrawAfter', 'phaseBefore'] },
                filter: function (event, player) {
                    if (event.name == 'chooseButton' && event.parent.name != 'chooseCharacter') return false;
                    return !lib.config.extension_福瑞拓展_Frversion || lib.config.extension_福瑞拓展_Frversion != lib.extensionPack.福瑞拓展.version;
                },
                direct: true,
                firstDo: true,
                priority: Infinity,
                content: function () {
                    'step 0'
                    //标记版本号
                    game.saveConfig('extension_福瑞拓展_Frversion', lib.extensionPack.福瑞拓展.version);
                    'step 1'
                    //更新告示
                    var Furry_update = [
                        '/redoCharacter/',
                        '2.0.9.1',
                        '1.紧急修复 韵律技 bug',
                        '2.修复 普鲁维亚 描述错误',
                        '3.修复自动更新内容的错误',
                        '2.0.9.2',
                        '1.修复 移动端提示错位的bug',
                        '2.回调 奇玛 【俱灭】 并设置为ai禁选',
                        '3.按照官方给出的蓄力技重写奇玛【断斩】',
                        '4.清除部分冗余代码',
                    ];
                    //更新武将
                    var Furry_players = ['fr_ala', 'fr_liona', 'fr_nanci', 'fr_francium'];
                    var Furry_redoplayers = ['fr_qima'];
                    //更新卡牌
                    var Furry_cards = [];
                    var dialog = ui.create.dialog('<br>福瑞拓展' + lib.extensionPack.福瑞拓展.version + ' 更新内容：', 'hidden');
                    for (var i = 0; i < Furry_update.length; i++) {
                        if (Furry_update[i] == '/Character/') {
                            dialog.addText('更新武将：');
                            dialog.addSmall([Furry_players, 'character']);
                        } else if (Furry_update[i] == '/redoCharacter/') {
                            dialog.addText('更改武将：');
                            dialog.addSmall([Furry_redoplayers, 'character']);
                        }
                        else if (Furry_update[i] == '/Card/') {
                            var cards = Furry_cards.slice(0);
                            for (var i = 0; i < cards.length; i++) {
                                cards[i] = [get.translation(get.type(cards[i])), '', cards[i]];
                            }
                            dialog.addText('更新卡牌：');
                            dialog.addSmall([cards, 'vcard']);
                        } else if (Furry_update[i].indexOf('ti') != -1) {
                            dialog.addText(Furry_update[i]);
                        } else {
                            var li = document.createElement('li');
                            li.innerHTML = Furry_update[i];
                            li.style.textAlign = 'left';
                            li.style['lineHeight'] = '20px'
                            li.style['paddingLeft'] = '10px'
                            dialog.content.appendChild(li);
                        }
                    }
                    dialog.open();
                    var hidden = false;
                    if (!ui.auto.classList.contains('hidden')) {
                        ui.auto.hide();
                        hidden = true;
                    }
                    game.pause();
                    var control = ui.create.control('确定', function () {
                        dialog.close();
                        control.close();
                        if (hidden) ui.auto.show();
                        game.resume();
                    });
                },
            };
            //---------------------------------------显示手牌上限------------------------------------------//
            if (config.ShowmaxHandcard) {
                lib.skill._ShowmaxHandcard = {
                    trigger: {
                        global: ['gameStart', 'roundStart'],
                    },
                    forced: true,
                    popup: false,
                    silent: true,
                    content: function () {
                        var interval = setInterval(() => {
                            if (!ui.window.contains(player)) return clearInterval(interval);
                            var numh = player.countCards('h');
                            var nummh = player.getHandcardLimit();
                            if (nummh == Infinity) nummh = '∞';
                            player.node.count.innerHTML = numh + '/' + nummh;
                        },
                            100);
                    },
                };
            };
            //自动更新素材
            if (config.furryCardFileConfig2 && game.getFileList && lib.config.extensions) {
                //十周年卡牌素材
                if (lib.config.extensions.contains('十周年UI') && lib.config['extension_十周年UI_enable']) {
                    game.getFileList('extension/十周年UI/image/card', (folders, files) => {
                        const furryCardFiles = [
                            'fr_card_cmhc.jpg', 'fr_card_cmhc.png', 'fr_card_cmhc.webp', 'fr_card_djlj.jpg', 'fr_card_djlj.webp',
                            'fr_card_gzbj.jpg', 'fr_card_gzbj.png', 'fr_card_gzbj.webp', 'fr_card_lltj.jpg', 'fr_card_lltj.png', 'fr_card_lltj.webp',
                            'fr_card_lyzq.jpg', 'fr_card_lyzq.png', 'fr_card_lyzq.webp', 'fr_card_ttbl.jpg', 'fr_card_ttbl.png', 'fr_card_ttbl.webp', 'fr_card_xysx.jpg',
                            'fr_card_xysx.png', 'fr_card_xysx.webp', 'fr_card_yxys.jpg', 'fr_card_yxys.png', 'fr_card_yxys.webp', 'fr_card_zfxd.jpg',
                            'fr_card_zfxd.png', 'fr_card_zfxd.webp', 'fr_card_zh.jpg', 'fr_card_zh.png', 'fr_card_zh.webp', 'fr_card_zhcz.jpg', 'fr_card_zhcz.png', 'fr_card_zhcz.webp',
                            'fr_equip1_syzg.jpg', 'fr_equip1_syzg.png', 'fr_equip1_syzg.webp', 'fr_equip5_wxpp.jpg', 'fr_equip5_wxpp.png', 'fr_equip5_wxpp.webp','fr_card_scfm.png',
                            'fr_card_scfm.webp','fr_card_scfm.jpg',
                        ];
                        for (let i = 0; i < furryCardFiles.length; i++) {
                            if (!files.contains(furryCardFiles[i])) {
                                if (game.readFile && game.writeFile) {
                                    game.readFile('extension/福瑞拓展/image/card/pretty/' + furryCardFiles[i], (data) => {
                                        game.writeFile(data, 'extension/十周年UI/image/card', furryCardFiles[i], function () { });
                                    });
                                }
                            }
                        }
                    });
                    game.getFileList('extension/十周年UI/image/decorations', (folders, files) => {
                        const furryCardFiles = ['name2_fr_g_dragon.png'];
                        for (let i = 0; i < furryCardFiles.length; i++) {
                            if (!files.contains(furryCardFiles[i])) {
                                if (game.readFile && game.writeFile) {
                                    game.readFile('extension/福瑞拓展/image/group/' + furryCardFiles[i], (data) => {
                                        game.writeFile(data, 'extension/十周年UI/image/decorations', furryCardFiles[i], function () { });
                                    });
                                }
                            }
                        }
                    });
                    game.getFileList('extension/十周年UI/image/ass', (folders, files) => {
                        const furryCardFiles = ['fr_equip1_syzg.png','fr_equip5_wxpp.png'];
                        for (let i = 0; i < furryCardFiles.length; i++) {
                            if (!files.contains(furryCardFiles[i])) {
                                if (game.readFile && game.writeFile) {
                                    game.readFile('extension/福瑞拓展/image/equip/' + furryCardFiles[i], (data) => {
                                        game.writeFile(data, 'extension/十周年UI/image/ass', furryCardFiles[i], function () { });
                                    });
                                }
                            }
                        }
                    });
                }

                //武将势力边框
                if (lib.config.extensions.contains('手杀ui') && lib.config['extension_手杀ui_enable']) {
                    game.getFileList('extension/手杀ui/character/images/SSSC', (folders, files) => {
                        const furryCardFiles = ['name2_fr_g_dragon.png'];
                        for (let i = 0; i < furryCardFiles.length; i++) {
                            if (!files.contains(furryCardFiles[i])) {
                                if (game.readFile && game.writeFile) {
                                    game.readFile('extension/福瑞拓展/image/group/' + furryCardFiles[i], (data) => {
                                        game.writeFile(data, 'extension/手杀ui/character/images/SSSC', furryCardFiles[i], function () { });
                                    });
                                }
                            }
                        }
                    });
                    game.getFileList('extension/手杀ui/character/images', (folders, files) => {
                        const furryCardFiles = ['name2_fr_g_dragon.png'];
                        for (let i = 0; i < furryCardFiles.length; i++) {
                            if (!files.contains(furryCardFiles[i])) {
                                if (game.readFile && game.writeFile) {
                                    game.readFile('extension/福瑞拓展/image/group/' + furryCardFiles[i], (data) => {
                                        game.writeFile(data, 'extension/手杀ui/character/images', furryCardFiles[i], function () { });
                                    });
                                }
                            }
                        }
                    });
                }
                if (lib.config.extensions.contains('无名补丁') && lib.config['extension_无名补丁_enable']) {
                    game.getFileList('extension/无名补丁/group', (folders, files) => {
                        const furryCardFiles = ['name2_fr_g_dragon.png'];
                        for (let i = 0; i < furryCardFiles.length; i++) {
                            if (!files.contains(furryCardFiles[i])) {
                                if (game.readFile && game.writeFile) {
                                    game.readFile('extension/福瑞拓展/image/group/' + furryCardFiles[i], (data) => {
                                        game.writeFile(data, 'extension/无名补丁/group', furryCardFiles[i], function () { });
                                    });
                                }
                            }
                        }
                    });
                }
                if (lib.config.extensions.contains('假装无敌') && lib.config['extension_假装无敌_enable']) {
                    game.getFileList('extension/假装无敌/images', (folders, files) => {
                        const furryCardFiles = ['border_fr_g_dragon.png'];
                        for (let i = 0; i < furryCardFiles.length; i++) {
                            if (!files.contains(furryCardFiles[i])) {
                                if (game.readFile && game.writeFile) {
                                    game.readFile('extension/福瑞拓展/image/group/' + furryCardFiles[i], (data) => {
                                        game.writeFile(data, 'extension/假装无敌/images', furryCardFiles[i], function () { });
                                    });
                                }
                            }
                        }
                    });
                }

                //装备区小图标素材
                if (lib.config.extensions.contains('福瑞拓展') && lib.config['extension_福瑞拓展_enable']) {
                    game.getFileList('extension/../image/card', (folders, files) => {
                        const furryCardFiles = ['fr_equip1_syzg.png','fr_equip5_wxpp.png'];
                        for (let i = 0; i < furryCardFiles.length; i++) {
                            if (!files.contains(furryCardFiles[i])) {
                                if (game.readFile && game.writeFile) {
                                    game.readFile('extension/福瑞拓展/image/equip/' + furryCardFiles[i], (data) => {
                                        game.writeFile(data, 'extension/../image/card', furryCardFiles[i], function () { });
                                    });
                                }
                            }
                        }
                    });
                }
                if (lib.config.extensions.contains('EngEX') && lib.config['extension_EngEX_enable']) {
                    game.getFileList('extension/EngEX/images/ass', (folders, files) => {
                        const furryCardFiles = ['fr_equip1_syzg.png','fr_equip5_wxpp.png'];
                        for (let i = 0; i < furryCardFiles.length; i++) {
                            if (!files.contains(furryCardFiles[i])) {
                                if (game.readFile && game.writeFile) {
                                    game.readFile('extension/福瑞拓展/image/equip/' + furryCardFiles[i], (data) => {
                                        game.writeFile(data, 'extension/EngEX/images/ass', furryCardFiles[i], function () { });
                                    });
                                }
                            }
                        }
                    });
                }

                //动皮弧形边框
                if (lib.config.extensions.contains('皮肤切换') && lib.config['extension_皮肤切换_enable']) {
                    game.getFileList('extension/皮肤切换/images/border', (folders, files) => {
                        const furryCardFiles = ['fr_g_dragon.png'];
                        for (let i = 0; i < furryCardFiles.length; i++) {
                            if (!files.contains(furryCardFiles[i])) {
                                if (game.readFile && game.writeFile) {
                                    game.readFile('extension/福瑞拓展/image/border/' + furryCardFiles[i], (data) => {
                                        game.writeFile(data, 'extension/皮肤切换/images/border', furryCardFiles[i], function () { });
                                    });
                                }
                            }
                        }
                    });
                }
                //雷修千幻
                if (lib.config.extensions.contains('千幻聆音') && lib.config['extension_千幻聆音_enable']) {
                    game.getFileList('extension/千幻聆音/image/decoration/', (folders, files) => {
                        const furryCardFiles = ['detail_fr_g_dragon_other.png','detail_fr_g_dragon.png'];
                        for (let i = 0; i < furryCardFiles.length; i++) {
                            if (!files.contains(furryCardFiles[i])) {
                                if (game.readFile && game.writeFile) {
                                    game.readFile('extension/福瑞拓展/image/group/' + furryCardFiles[i], (data) => {
                                        game.writeFile(data, 'extension/千幻聆音/theme/shousha/', furryCardFiles[i], function () { });
                                    });
                                }
                            }
                        }
                    });
                }
            }
            //---------------------------------------定义新属性伤害------------------------------------------//
            lib.translate.mad = '<font color=#d17367>狂</font>';
            lib.nature.add('mad');
            lib.linked.add('mad');
            lib.skill._define_damage = {
                trigger: {
                    player: "damageAfter",
                },
                forced: true,
                priority: Infinity,
                filter: function (event, player) {
                    if (event.nature) return true;
                    return false;
                },
                content: function () {
                    'step 0'
                    if (trigger.nature == "mad") {
                        trigger.player.addMark('fr_mad')
                    }
                    'step 1'
                    trigger.player.update();
                },
            }
            lib.skill.fr_mad = {
                forced: true,
                trigger: {
                    player: "phaseJieshuBegin",
                },
                filter: function (event, player) {
                    return player.countMark('fr_mad') > 0
                },
                marktext: '疯狂',
                charlotte: true,
                unique: true,
                content: function () {
                    var num = player.countMark('fr_mad')
                    player.randomDiscard(num, 'he', true);
                },
                mark: true,
                intro: {
                    name: "疯狂",
                    mark: function (dialog, storage, player) {
                        dialog.addText("结束阶段，你随机弃置" + get.cnNumber(player.countMark('fr_mad')) + "张牌；当你回复体力后，你移除此技能。");
                    },
                },
                group: "fr_mad_remove",
                subSkill: {
                    remove: {
                        trigger: {
                            player: "recoverEnd",
                        },
                        forced: true,
                        content: function () {
                            var num = player.countMark('fr_mad')
                            player.removeMark('fr_mad', num)
                            player.unmarkSkill('fr_mad')
                        }
                    }
                },
                ai: {
                    result: {
                        player: -1
                    }
                }
            }
            if (config.furry_onlineUpdate2) {
                fetch('https://ghproxy.com/https://raw.githubusercontent.com/chen079/FurryExt/master/updatecheck.js', {
                    method: 'GET',
                    mode: 'cors',// 允许发送跨域请求
                    credentials: 'include',
                    headers: {
                        'Cache-Control': 'no-cache'//不缓存
                    }
                })
                    .then(response => {
                        if (!response.ok) throw response;
                        return response.text();
                    })
                    .then(text => {
                        var data = eval(text);
                        console.log(data);
                        if (data.updateAuto == false) return;
                        var localVersion = lib.extensionPack.福瑞拓展.version || '0';

                        /** 
                        * 判断版本
                        * @param { string } v1 现有版本
                        * @param { string } v2 要更新的版本
                        * @returns { boolean | 'equal' } v1比v2小就返回true
                        */
                        console.log(localVersion, data.version)
                        //if (!compareVersion(localVersion, data.version)) return;

                        function myConfirm(message, callback) {
                            if (navigator.notification && navigator.notification.confirm) {
                                navigator.notification.confirm(message, index => {
                                    index == 1 && callback();
                                }, ['确定', '取消']);
                            } else {
                                window.confirm(message) && callback();
                            }
                        }
                        function furryUpdating() {
                            /**
                             * 下载一个文件
                             * @param { string } url 
                             */
                            function download(url, success, error) {
                                var path = 'extension/福瑞拓展';
                                const address = 'https://ghproxy.com/https://raw.githubusercontent.com/chen079/FurryExt/master/';
                                if (window.FileTransfer) {
                                    // 判断是不是文件夹，不是才下载
                                    function downloadFile() {
                                        let fileTransfer = new FileTransfer();
                                        fileTransfer.download(encodeURI(`${address + url}?date=${(new Date()).getTime()}`), encodeURI(lib.assetURL + path + '/' + url), success, error);
                                    }
                                    window.resolveLocalFileSystemURL(lib.assetURL,
                                        /**
                                        * @param { DirectoryEntry } DirectoryEntry 
                                        */
                                        DirectoryEntry => {
                                            DirectoryEntry.getDirectory(path, { create: false }, dir => {
                                                dir.getDirectory(url, { create: false }, () => {
                                                    console.log(`${path}/${url}是文件夹`);
                                                    // 跳过下载
                                                    success(true);
                                                }, downloadFile);
                                            }, downloadFile);
                                        }, downloadFile);
                                } else {
                                    fetch(`${address + url}?date=${(new Date()).getTime()}`)
                                        .then(response => response.arrayBuffer())
                                        .then(arrayBuffer => {
                                            // 先创建指定文件夹
                                            game.ensureDirectory(path, () => {
                                                var fs = require('fs');
                                                var p = require('path');
                                                var filePath = p.join(__dirname, path, url);
                                                // 如果是个文件夹，就退出
                                                if (fs.existsSync(filePath)) {
                                                    var stat = fs.statSync(filePath);
                                                    if (stat.isDirectory()) {
                                                        console.error(`${path + '/' + url}是个文件夹`);
                                                        return success(true);
                                                    }
                                                }
                                                fs.writeFile(filePath, Buffer.from(arrayBuffer), null, e => {
                                                    if (e) error(e);
                                                    else success();
                                                });
                                            });
                                        })
                                        .catch(response => error(new Error(response.statusText)));
                                }
                            }

                            /**
                             * 下载文件列表
                             * @param { string[] } files 
                             */
                            function downloadList(files) {
                                if (!Array.isArray(files) || files.length == 0) return;
                                var i = 0;
                                var progress = game.furryCreateProgress('更新福瑞拓展', files.length, files[0], i);
                                var success = skip => {
                                    // 下载完了就结束
                                    if (!files[++i]) {
                                        progress.setProgressValue(files.length);
                                        progress.setFileName('下载完成');
                                        setTimeout(() => {
                                            // 移除进度条
                                            progress.remove();
                                            // 延时提示
                                            setTimeout(() => {
                                                alert('福瑞拓展更新完成，将自动重启');
                                                game.reload();
                                            }, 100);
                                        }, 200);
                                        return;
                                    }
                                    // 下载成功，更新进度
                                    progress.setProgressValue(i);
                                    progress.setFileName(files[i]);
                                    download(files[i], success, error);
                                };
                                var error = errorText => {
                                    console.log('下载失败', errorText);
                                    progress.setFileName('重新下载: ' + files[i]);
                                    download(files[i], success, error);
                                };

                                download(files[i], success, error);
                            }

                            /** @type { string[] } 要下载的文件 */
                            //var files = localVersion == data.oldversion ? data.updateFiles : data.allFiles;
                            var files = data.updateFiles;
                            downloadList(files);
                        }

                        if (data.version <= localVersion) return;
                        else myConfirm(`福瑞拓展检测到更新(v${data.version}), 是否更新?\n${data.changeLog}`, furryUpdating);
                    })
                    .catch(e => {
                        alert(typeof e == 'string' ? '网络请求错误' : e.message);
                    });

            };
            //检测无名杀版本
            get.myCompareVersion = function (a, b) {
                if (!a) a = "0.0.0";
                if (!b) b = "0.0.0";
                var arr1 = a.split(".");
                var arr2 = b.split(".");
                for (var i = 0; i < Math.min(arr1.length, arr2.length); i++) {
                    var num1 = parseInt(arr1[i]);
                    var num2 = parseInt(arr2[i]);
                    if (num1 < num2) return -1;
                    if (num1 > num2) return 1;
                }
                if (arr1.length > arr2.length) {
                    return 1;
                }
                else if (arr1.length < arr2.length) {
                    return -1;
                }
                return 0;
            };
            var noname_versionx = "1.9.120";
            if (lib.version && !lib.config.furryNotMetionNonameVersion) {
                if (get.myCompareVersion(lib.version, noname_versionx) < 0) {
                    var ret = confirm("当前无名杀版本" + lib.version + "落后于【福瑞拓展】最低支持版本1.9.120，请尽快更新，点击确定关闭本扩展");
                    if (!ret) {
                        alert("请确认你明白点击此选项导致的后果");
                        alert("由游戏版本过低导致任何问题本扩展均不负责");
                        //game.saveConfig('furryNotMetionNonameVersion',true);
                    }
                    else {
                        game.saveConfig('extension_福瑞拓展_enable', false);
                        game.reload();
                    }
                }
            }
            lib.element.player.setfrAvatar = function (name, name2, video, fakeme) {
                var node
                if (this.name2 == name) {
                    node = this.node.avatar2
                    this.smoothAvatar(true, video)
                }
                else if (this.name == name) {
                    node = this.node.avatar
                    this.smoothAvatar(false, video)
                }
                if (node) {
                    if (lib.config.frLutou) {
                        var url = 'extension/福瑞拓展/image/lutou/'
                    } else {
                        var url = 'extension/福瑞拓展/image/character/'
                    }
                    node.setBackgroundImage(url + name2 + '.jpg')
                    if (this == game.me && ui.fakeme && fakeme !== false) {
                        ui.fakeme.style.backgroundImage = node.style.backgroundImage
                    }
                    if (video != false) {
                        game.addVideo('setfrAvatar', this, [name, name2])
                    }
                    game.broadcast(function (player, name, name2) {
                        player.setfrAvatar(name, name2, false)
                    }, this, name, name2)
                }
            }
            //互变
            lib.skill.hubian = {
                init: function (player) {
                    player.storage.hubian = false
                },
                charlotte: true,
                forced: true,
                onremove: true,
                onunmark: true,
                marktext: "互变",
                intro: {
                    name: "互变",
                    mark: function (dialog, storage, player) {
                        dialog.addText('当前你处于' + (player.storage.hubian ? '圣咏' : '暗涌') + '状态')
                    }
                },
            };
            lib.element.player.changeHubian = function () {
                if (!this.hasSkill('hubian')) this.addSkill('hubian');
                this.storage.hubian = !this.storage.hubian;
                this.markSkill('hubian');
                game.broadcastAll(function (player) {
                    player.$changeHubian();
                }, this);
                game.log(this, '改变了其互变状态，当前状态为：', '#g' + (this.storage.hubian ? '圣咏' : '暗涌'))
            },
                lib.element.player.$changeHubian = function () {
                    var mark = this.marks.hubian, player = this
                    if (mark) {
                        if (!player.storage.hubian) {
                            mark.firstChild.innerHTML = "暗涌"
                        } else {
                            mark.firstChild.innerHTML = "圣咏"
                        }
                    }
                },
                //------------------------------------------转韵-----------------
                lib.element.player.changeYun = function (skill) {
                    if (this[skill] && this[skill] == '平') {
                        this[skill] = '仄'
                    } else {
                        this[skill] = '平'
                    }
                    if (this.getStat('skill')[skill]) delete this.getStat('skill')[skill];
                    var player = this
                    game.broadcastAll(function (player, skill) {
                        player.$changeYun(skill);
                    }, player, skill);
                    game.log(this, '#g【', '#g' + get.translation(skill), '#g】', '的韵律转为' + this[skill]);
                };
            lib.element.player.$changeYun = function (skill) {
                var mark = this.marks[skill];
                if (mark) {
                    if (mark.firstChild.reversed) {
                        mark.firstChild.reversed = false;
                        mark.firstChild.style.transform = 'none';
                    }
                    else {
                        mark.firstChild.reversed = true;
                        mark.firstChild.style.transform = 'rotate(180deg)';
                    }
                }
            }
            //------------------------------------------AI禁将------------------------------------------//
            if (lib.config.ban_ai) {
                var savedFilter = lib.filter.characterDisabled;
                lib.filter.characterDisabled = function (i, libCharacter) {
                    if ((i && i.indexOf('fr_') != 0) || (i == 'fr_terz')) {
                        return true;
                    }
                    return savedFilter(i, libCharacter);
                };
            }
            //视为伤害
            lib.element.player.fakeDamage = function () {
                var next = game.createEvent('damage');
                next.player = this;
                var nocard, nosource;
                var event = _status.event;
                for (var i = 0; i < arguments.length; i++) {
                    if (typeof arguments[i] == 'number') {
                        next.num = arguments[i];
                    }
                    else if (get.itemtype(arguments[i]) == 'player') {
                        next.source = arguments[i];
                    }
                    else if (get.itemtype(arguments[i]) == 'cards') {
                        next.cards = arguments[i].slice(0);
                    }
                    else if (get.itemtype(arguments[i]) == 'card') {
                        next.card = arguments[i];
                    }
                    else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].name) {
                        next.card = arguments[i];
                    }
                    else if (arguments[i] == 'nocard') {
                        nocard = true;
                    }
                    else if (arguments[i] == 'nosource') {
                        nosource = true;
                    }
                    else if (arguments[i] == 'notrigger') {
                        next._triggered = null;
                        next.notrigger = true;
                    }
                    else if (get.itemtype(arguments[i]) == 'nature' && arguments[i] != 'stab') {
                        next.nature = arguments[i];
                    }
                }
                if (next.card == undefined && !nocard) next.card = event.card;
                if (next.cards == undefined && !nocard) next.cards = event.cards;
                if (next.source == undefined && !nosource) next.source = event.player;
                if (next.source && next.source.isDead()) delete next.source;
                if (next.num == undefined) next.num = 1;
                next.original_num = next.num;
                next.change_history = [];
                if (next.nature == 'poison') delete next._triggered;
                next.setContent('fakeDamage');
                next.filterStop = function () {
                    if (this.source && this.source.isDead()) delete this.source;
                    var num = this.original_num;
                    for (var i of this.change_history) num += i;
                    if (num != this.num) this.change_history.push(this.num - num);
                    if (this.num <= 0) {
                        delete this.filterStop;
                        this.trigger('damageZero');
                        this.finish();
                        this._triggered = null;
                        return true;
                    }
                };
                return next;
            };
            lib.element.content.fakeDamage = function () {
                "step 0"
                event.forceDie = true;
                "step 1"
                if (lib.config.background_audio) {
                    game.playAudio('effect', 'damage' + (num > 1 ? '2' : ''));
                }
                game.broadcast(function (num) {
                    if (lib.config.background_audio) {
                        game.playAudio('effect', 'damage' + (num > 1 ? '2' : ''));
                    }
                }, num);
                var str = '视为受到了';
                if (source) str += '来自<span class="bluetext">' + (source == player ? '自己' : get.translation(source)) + '</span>的';
                str += get.cnNumber(num) + '点';
                if (event.nature) str += get.translation(event.nature) + '属性';
                str += '伤害';
                game.log(player, str);
                var psl = player.stat.length - 1
                if (player.stat[psl].damaged == undefined) {
                    player.stat[psl].damaged = num;
                } else {
                    player.stat[psl].damaged += num;
                }
                if (source) {
                    var ssl = source.stat.length - 1
                    source.getHistory('sourceDamage').push(event);
                    if (source.stat[ssl].damage == undefined) {
                        source.stat[ssl].damage = num;
                    } else {
                        source.stat[ssl].damage += num;
                    }
                }
                player.getHistory('damage').push(event);
                if (event.animate !== false) {
                    player.$damage(source);
                    game.broadcastAll(function (nature, player) {
                        if (lib.config.animation && !lib.config.low_performance) {
                            if (nature == 'fire') {
                                player.$fire();
                            } else if (nature == 'thunder') {
                                player.$thunder();
                            }
                        }
                    }, event.nature, player);
                    var numf = Math.max(0, num);
                    player.$damagepop(-numf, event.nature);
                }
                if (!event.notrigger) {
                    if (num == 0) {
                        event.trigger('damageZero');
                        event._triggered = null;
                    }
                    else event.trigger('damage');
                }
                "step 3"
                if (player.hp <= 0 && player.isAlive()) {
                    game.delayx();
                    event._dyinged = true;
                    player.dying(event);
                }
                "step 4"
                if (!event.notrigger) event.trigger('damageSource');
            };
            lib.rank.rarity.junk.addArray(["fr_milis", "fr_lions", "fr_telina", "fr_xit", "fr_adward", "fr_nier", "fr_laays", 'fr_liya', 'fr_mala']);
            lib.rank.rarity.rare.addArray(["fr_yifeng", "fr_yada", "fr_muliy", "fr_sier", "fr_klif", "fr_west", "fr_milite", "fr_jackson", "fr_jiejie"
                , "fr_sayisu", "fr_rest", "fr_lens", "fr_kert", "fr_keya", "fr_klier", "fr_lint", "fr_patxi", "fr_nore", "fr_nulia", "fr_terlk", "fr_tiers", "fr_wore", "fr_hynea", 'fr_linyan', 'fr_shark']);
            lib.rank.rarity.epic.addArray(["fr_hars", "fr_muyada", "fr_marxya", "fr_muli", "fr_alas", "fr_ken", "fr_oert", "fr_sisk", "fr_skry", "fr_lusiya", "fr_kersm", "fr_hynea",
                "fr_aroncy", "fr_berg", "fr_markn", "fr_morly", "fr_dog", "fr_muen", "fr_glit", "fr_edmon", "fr_mika", "fr_dmoa", "fr_verb", "fr_taber", "fr_dragon", "fr_jgby"
                , "fr_slen", "fr_paers", "fr_pluvia", "fr_ventus", "fr_zenia", "fr_lamost", "fr_yifa", "fr_fate", "fr_fox", "fr_zeta", "fr_ham", "fr_sam", 'fr_horn', 'fr_tiger,', 'fr_kmjia', "fr_liona", "fr_ala"]);
            lib.rank.rarity.legend.addArray(["fr_wes", "fr_kesaya", "fr_krikt", "fr_tery", "fr_milism", "fr_miya", "fr_lust", "fr_faers", "fr_yas_klin", "fr_bofeng", "fr_xiaomo", "fr_nanci",
                "fr_ciyu", "fr_delta", "fr_peter_likes", "fr_yinhu", "fr_terz", "fr_jet", "fr_knier", "fr_kasaers", "fr_molis", "fr_shisan", "fr_zhongyu", 'fr_qima', 'fr_francium']);
            //------------------------------------------国战武将------------------------------------------//
            if (lib.characterPack.mode_guozhan) {
                if (config.heroes) {
                    var url = lib.config.frLutou ? 'ext:福瑞拓展/image/lutou/' : 'ext:福瑞拓展/image/character/'
                    lib.characterPack.mode_guozhan.fr_yifeng = ['male', 'wei', 3, ['kref_gzyz'], [url + 'fr_yifeng.jpg']]
                    lib.characterPack.mode_guozhan.fr_yifa = ['female', 'wei', 3, ['yifa_xs'], [url + 'fr_yifa.jpg']]
                    lib.characterPack.mode_guozhan.fr_sam = ['male', 'jin', 4, ['sam_wl'], [url + 'fr_sam.jpg']]
                    lib.characterPack.mode_guozhan.fr_ham = ['male', 'jin', 4, ['ham_cy'], [url + 'fr_ham.jpg']]
                    lib.characterPack.mode_guozhan.fr_bofeng = ['male', 'jin', 4, ['bofeng_aj'], [url + 'fr_bofeng.jpg']]
                    lib.characterPack.mode_guozhan.fr_ciyu = ['male', 'jin', 3, ['ciyu_ss'], [url + 'fr_ciyu.jpg']]
                    lib.characterPack.mode_guozhan.fr_wore = ['male', 'ye', 3, ['wore_gzhy'], [url + 'fr_wore.jpg']]
                    lib.characterPack.mode_guozhan.fr_tiers = ['female', 'qun', 3, ['tiers_qp', 'tiers_kh'], [url + 'fr_tiers.jpg']]
                    lib.characterPack.mode_guozhan.fr_miya = ['male', 'shu', 3, ['miya_gzks', 'miya_gzhz'], [url + 'fr_miya.jpg']]
                    lib.characterPack.mode_guozhan.db_fr_krikt = ['male', 'shu', 3, ['krikt_gzly'], [url + 'fr_krikt.jpg', 'doublegroup:shu:qun']]
                    lib.characterPack.mode_guozhan.fr_molis = ['female', 'wei', 3, ['molis_gzhs'], [url + 'fr_molis.jpg']]
                    lib.characterPack.mode_guozhan.fr_taber = ['male', 'wu', 4, ['taber_sj'], [url + 'fr_taber.jpg']]
                    lib.characterPack.mode_guozhan.fr_verb = ['male', 'wu', 4, ['verb_fs'], [url + 'fr_verb.jpg']]
                    lib.characterPack.mode_guozhan.fr_mika = ['male', 'wei', 4, ['mika_lx'], [url + 'fr_mika.jpg']]
                    lib.characterPack.mode_guozhan.fr_slen = ['male', 'wei', 3, ['slen_xj'], [url + 'fr_slen.jpg']]
                    lib.characterPack.mode_guozhan.fr_fox = ['male', 'shu', 3, ['fox_hm'], [url + 'fr_fox.jpg']]
                    lib.characterPack.mode_guozhan.fr_patxi = ['female', 'wu', 3, ['patxi_fs'], [url + 'fr_patxi.jpg']]
                    lib.characterPack.mode_guozhan.fr_alas = ['male', 'shu', 4, ['olas_fh'], [url + 'fr_alas.jpg']]
                    lib.characterPack.mode_guozhan.fr_west = ['male', 'qun', 3, ['west_pz', 'west_jh'], [url + 'fr_west.jpg']]
                    lib.characterPack.mode_guozhan.fr_dmoa = ['male', 'qun', 3, ['dmoa_sx'], [url + 'fr_dmoa.jpg']]
                    lib.characterPack.mode_guozhan.fr_adward = ['male', 'wei', 4, ['adward_yt'], [url + 'fr_adward.jpg']]
                    lib.characterPack.mode_guozhan.fr_yas_klin = ['male', 'jin', 3, ['yas_klin_js'], [url + 'fr_yas_klin.jpg']]
                    lib.characterPack.mode_guozhan.fr_muliy = ['male', 'wu', 3, ['mliy_hx'], [url + 'fr_muliy.jpg']]
                    lib.characterPack.mode_guozhan.fr_zhongyu = ['male', 'shu', 3, ['zhongyu_ky'], [url + 'fr_zhongyu.jpg']]
                    lib.characterPack.mode_guozhan.fr_hynea = ['male', 'ye', 3, ['hynea_cg', 'hynea_ds'], [url + 'fr_hynea.jpg']]
                    lib.characterPack.mode_guozhan.fr_horn = ['male', 'wei', 3, ['horn_gzll', 'horn_ql', 'fr_qianghua'], [url + 'fr_horn.jpg']]
                    lib.characterPack.mode_guozhan.fr_kert = ["male", "shu", 4, ["kert_lp", "kert_jl"], [url + 'fr_kert.jpg']]
                    lib.characterPack.mode_guozhan.fr_lint = ["male", "shu", 4, ["lint_nd"], [url + 'fr_lint.jpg']]
                    lib.characterPack.mode_guozhan.fr_liya = ["female", "wei", 3, ["liya_sz", "liya_sj"], [url + 'fr_liya.jpg']]
                    lib.characterPack.mode_guozhan.fr_yada = ["male", "wei", 3, ["yada_by", "yada_fs"], [url + 'fr_yada.jpg']]
                    lib.characterPack.mode_guozhan.fr_skry = ["male", "wu", 3, ["skery_gzds", "skery_yj"], [url + 'fr_skry.jpg']]
                    lib.characterPack.mode_guozhan.fr_muyada = ["male", "qun", 3, ["mudaya_bz"], [url + 'fr_muyada.jpg']]
                    lib.characterPack.mode_guozhan.fr_muli = ["male", "qun", 4, ["muli_cm", "muli_yl"], [url + 'fr_muli.jpg']]
                }
            }
            //------------------------------------------珠联璧合------------------------------------------//
            lib.perfectPair.fr_taber = ['fr_verb']
            lib.perfectPair.fr_yifeng = ['fr_yifa']
            lib.perfectPair.fr_sam = ['fr_ham']
            lib.perfectPair.fr_bofeng = ['fr_ciyu']
            lib.perfectPair.fr_wore = ['fr_tiers']
            lib.perfectPair.fr_miya = ['db_fr_krikt']
        }, precontent: function (furryPack) {
            if (furryPack.enable) {
                lib.group.add('fr_g_dragon');
                lib.translate.fr_g_dragon = '龙';
                lib.translate.fr_g_dragon2 = '龙';
                lib.groupnature.fr_g_dragon = 'fr_g_dragon';

                lib.init.js(lib.assetURL + 'extension/福瑞拓展/asset/furrymode.js', null);
                lib.init.js(lib.assetURL + 'extension/福瑞拓展/asset/character.js', null);
                lib.config.all.characters.push('furryPack');
                lib.translate['furryPack_character_config'] = "<img style=width:100px src=" + lib.assetURL + "extension/福瑞拓展/image/others/title.png>";// 包名翻译
                //卡包（手牌）
                lib.init.js(lib.assetURL + 'extension/福瑞拓展/asset/cards.js', null);
                lib.translate['furryCard_card_config'] = '福瑞卡牌';
                lib.config.all.cards.push('furryCard');
            }
            //------------------------------------------*千幻*------------------------------------------//
            window.furry_import = function (func) {
                func(lib, game, ui, get, ai, _status);
            };
            game.frGetQhlySkin = function (name) {
                if (game.qhly_getSkin) {
                    return game.qhly_getSkin(name);
                }
                return null;
            };
            lib.init.js(lib.assetURL + 'extension/福瑞拓展/asset/skin.js', null);//这一行代码加载扩展中的skin.js文件。   
            //点击提示 参考自活动武将
            game.getPhone = function () {
                //获取浏览器navigator对象的userAgent属性（浏览器用于HTTP请求的用户代理头的值）
                var info = navigator.userAgent;
                //通过正则表达式的test方法判断是否包含“Mobile”字符串
                var isPhone = /mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(info);
                //如果包含“Mobile”（是手机设备）则返回true
                return isPhone;
            };
            get.FrskillTips = function (tipname, id) {
                const frtip = ui.create.div('.Fr-frtips', document.body);
                frtip.style.zIndex = 998;
                const skilltip = ui.create.div('.Fr-skilltip', frtip);
                skilltip.innerHTML = tipname;
                var herf = document.getElementById(id);
                if (herf) {
                    var left = herf.getBoundingClientRect().left;
                    if (game.getPhone()) left += herf.offsetParent.offsetLeft;
                    left += document.body.offsetWidth * 0.15;
                    skilltip.style.left = left + 'px';
                    skilltip.style.top = (herf.getBoundingClientRect().top + 30) + 'px';
                }
                frtip.listen(function (e) {
                    e.stopPropagation();
                    this.remove();
                })
            };
            get.introduce = function (name) {
                let str1 = introduce[name].name;
                let str2 = introduce[name].info;
                let temp = (Math.random() * 9 + 1) * 100000
                let link = "<a id='" + temp + "' style='color:unset' href=\"javascript:get.FrskillTips('" + str2 + "','" + temp + "');\">" + str1 + "※</a>";
                return link;
            }
            lib.init.js(lib.assetURL + 'extension/福瑞拓展/asset/drama.js', null)
            game.switchfrBgm = function (name) {
                if (lib.config.qhly_enableCharacterMusic || lib.config.qhly_currentMusic != 'system') {
                    if (game.qhly_switchBgm) {
                        game.qhly_switchBgm('extension/福瑞拓展/audio/bgm/furry_bgm_' + name + '.mp3');
                        return;
                    }
                }
                var path;
                path = lib.assetURL + 'extension/福瑞拓展/audio/bgm/furry_bgm_' + name + '.mp3';
                ui.backgroundMusic.src = path;
                ui.backgroundMusic.addEventListener('ended', function () {
                    ui.backgroundMusic.src = path;
                });
            };
            game.frStars = function (num) {
                if (num == 0) {
                    return '☆☆☆☆☆☆'
                } else if (num == 1) {
                    return '★☆☆☆☆☆'
                } else if (num == 2) {
                    return '★★☆☆☆☆'
                } else if (num == 3) {
                    return '★★★☆☆☆'
                } else if (num == 4) {
                    return '★★★★☆☆'
                } else if (num == 5) {
                    return '★★★★★☆'
                } else if (num == 6) {
                    return '★★★★★★'
                }
            }
            game.frPlayJuqingAudio = function (name) {
                var audio = game.frPlayAudioRepeatable('..', 'extension', '福瑞拓展', 'audio', 'drama', name);
                if (_status.frJuqingAudio) {
                    _status.frJuqingAudio.remove();
                }
                _status.frJuqingAudio = audio;
            };
            game.frPlayAudio = function (name) {
                var audio = game.frPlayAudioRepeatable('..', 'extension', '福瑞拓展', 'audio', 'cg', name);
                if (_status.frAudio) {
                    _status.frAudio.remove();
                }
                _status.frAudio = audio;
            };
            game.frPlayAudioRepeatable = function () {
                if (_status.video && arguments[1] != 'video') return;
                var str = '';
                var onerror = null;
                for (var i = 0; i < arguments.length; i++) {
                    if (typeof arguments[i] === 'string' || typeof arguments[i] == 'number') {
                        str += '/' + arguments[i];
                    }
                    else if (typeof arguments[i] == 'function') {
                        onerror = arguments[i]
                    }
                    if (_status.video) break;
                }
                //if(!lib.config.repeat_audio&&_status.skillaudio.contains(str)) return;
                _status.skillaudio.add(str);
                game.addVideo('playAudio', null, str);
                setTimeout(function () {
                    _status.skillaudio.remove(str);
                }, 1000);
                var audio = document.createElement('audio');
                audio.autoplay = true;
                audio.volume = lib.config.volumn_audio / 8;
                if (str.indexOf('.mp3') != -1 || str.indexOf('.ogg') != -1) {
                    audio.src = lib.assetURL + 'audio' + str;
                }
                else {
                    audio.src = lib.assetURL + 'audio' + str + '.mp3';
                }
                audio.addEventListener('ended', function () {
                    this.remove();
                });
                audio.onerror = function () {
                    if (this._changed) {
                        this.remove();
                        if (onerror) {
                            onerror();
                        }
                    }
                    else {
                        this.src = lib.assetURL + 'audio' + str + '.ogg';
                        this._changed = true;
                    }
                };
                ui.window.appendChild(audio);
                return audio;
            };
            //强化 技能标签
            lib.skill._qianghua = {
                trigger: {
                    global: ['gameStart', 'roundStart'],
                    player: ['phaseBefore', 'phaseBegin', 'phaseUseBegin']
                },
                charlotte: true,
                forced: true,
                forceDie: true,
                filter: function (event, player) {
                    var skills = player.skills
                    var bool = false
                    for (var i = 0; i < skills.length; i++) {
                        if (lib.skill[skills[i]].qianghua) {
                            bool = true
                            break
                        }
                    }
                    return bool && !player.hasSkill('fr_qianghua')
                },
                content: function () {
                    player.addSkill('fr_qianghua')
                }
            }
            //------------------------------------------说明------------------------------------------//
            var introduce = {
                "baonue": {
                    name: "暴虐值",
                    info: "<li>当你造成或受到伤害后，你获得等量的暴虐值。<li>暴虐值的上限为5。"
                },
                "hubian": {
                    name: '互变',
                    info: '<li>角色共有两种状态，分别为“圣咏”和“暗涌”。<li>游戏开始时，角色处于暗涌状态。<li>当你改变互变状态时，角色由暗涌/圣咏状态变为圣咏/暗涌状态。'
                },
                "hubianji": {
                    name: '互变技',
                    info: '<li>互变技是一种特殊的技能标签。<li>根据角色互变状态的不同，互变技执行不同的效果。<li>所有具有“互变技”标签的技能改为执行对应状态的选项。'
                },
                "kamidamage": {
                    name: "神圣伤害",
                    info: "<li>神圣伤害：当一名角色受到神圣伤害时，不会触发任何与伤害有关的技能与机制。"
                },
                "qianghua_buff": {
                    name: "强化",
                    info: "<li>1.当你处于“强化”状态时，所有带有“强化技”标签的技能改为执行其强化效果，在你的一个强化技执行完毕后，你结束“强化”效果。<li>2.“强化”效果不可叠加。"
                },
                "qianghua": {
                    name: "强化技",
                    info: "<li>当你处于“强化”状态时，此技能改为执行强化效果，执行完毕后，结束“强化”效果。"
                },
                "chouhua": {
                    name: "筹划",
                    info: "<li>筹划：你展示牌堆顶的五张牌，并获得其中任意张点数成等差数列的牌，然后将剩余的牌洗回牌堆。"
                },
                "wuyin": {
                    name: "五音",
                    info: "<li>宫音：摸牌阶段，你多摸两张牌 <li>商音：出牌阶段，你可以额外使用一张【杀】<li>角音：你跳过你的下个弃牌阶段 <li>徵音：结束阶段，你摸两张牌 <li>羽音：回合结束时，你令一名其他角色技能失效直到其回合结束。"
                },
                "mad": {
                    name: "狂属性",
                    info: "狂属性：当目标角色受到狂属性伤害后，获得1层“疯狂”状态。"
                },
                "mad_buff": {
                    name: "疯狂",
                    info: "<li>结束阶段，处于疯狂状态的角色随机弃置X张牌（X为其疯狂状态层数），当其回复体力后，移除疯狂状态。"
                },
                'xuli': {
                    name: "爆发技",
                    info: "爆发技：发动时可以增大黄色的数字。若如此做，红色数字于技能结算过程中变为原来的两倍。"
                },
                'found': {
                    name: "发掘",
                    info: '发掘：若无特殊说明，你观看牌堆顶的三张牌并获得其中一张，然后将剩余的牌洗回牌堆。'
                },
                'found2': {
                    name: "发现",
                    info: "发现：从随机展示的三张牌中选择一张，若无特殊说明则获得之"
                },
                'yunlvji': {
                    name: "韵律技",
                    info: "韵律技是一种特殊的转化技，分为“平”和“仄”两种状态。游戏开始时，韵律技均处于“平”状态；满足“转韵”条件后，韵律技会转换到另一个状态，且重置技能发动次数。"
                },
                'center': {
                    name: "中央区",
                    info: "中央区：当前回合本应进入弃牌堆的牌（例如使用的牌结算后,被弃置的牌等）首先均置于桌面中间,该区域称之为中央区。在每个回合结束时,统一再将中央区所有牌一起置入弃牌堆，简单来说，中央区的牌即本回合进入弃牌堆的牌。 "
                },
                'cuijian': {
                    name: "摧坚",
                    info: "摧坚：拥有此标签的技能每回合限发动一次，触发时机为使用伤害类卡牌时，X为目标技能数量。"
                },
                'jishi': {
                    name: "即时牌",
                    info: "即时牌：一般指基本牌和普通锦囊牌。"
                },
                'caclu': {
                    name: "算演",
                    info: "算演：你利用你展示的四张牌的点数进行多次四则运算。若计算结果的值为24，则为成功，否则为算演失败。"
                },
                'truexuli': {
                    name: "蓄力技",
                    info: "蓄力技是一种特殊的技能。<li>1.描述中含有“蓄力技（X/Y）”。X为游戏开始时可获得的初始蓄力标记数量；Y为你可积累的蓄力标记上限。<li>2.发动蓄力技需要根据技能条件消耗蓄力标记。<li>3.当一名角色同时拥有多个蓄力技时，所有蓄力技消耗同样的蓄力标记，X和Y进行分别相加后生效。"
                }
            }
            window.furryIntroduce = function (name) {
                window.furryOpenDialog("概念解释：" + introduce[name].name, null, introduce[name].info);
            };

            window.furryOpenDialog = function (title, icon, content) {
                if (!title) title = "";
                if (!content) content = "";
                if (!window.furryCurrentDialogs) {
                    window.furryCurrentDialogs = [];
                }
                var dialog = ui.create.div('.furry-dialog', document.body);
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
                    dialog.delete();
                });
                return dialog;
            };
            var url = lib.assetURL + 'extension/福瑞拓展';
            lib.init.css(url, 'extension');
        }, help: {}, config: {
            "tuozhanjieshao": {
                name: "拓展介绍",
                init: "jieshao",
                unfrequent: true,
                item: {
                    jieshao: "点击查看",
                },
                textMenu: function (node, link) {
                    lib.setScroll(node.parentNode);
                    node.parentNode.style.transform = "translateY(-100px)";
                    node.parentNode.style.height = "300px";
                    node.parentNode.style.width = "300px";
                    switch (link) {
                        case "jieshao":
                            node.innerHTML = "侵删，且福瑞控狂喜！！！其中部分技能与界面参考自许多拓展，如子琪拓展，古剑拓展，云将，福瑞拓展，大家也要去支持他们哦！！欢迎使用，玩的开心"
                            break;
                    }
                },
            },

            'new_inpile_title': {
                "name": "<b><p align=center><img style=width:200px src=" + lib.assetURL + "extension/福瑞拓展/image/others/youxitiaozheng.png></b>",
                "clear": true,
                "nopointer": true,
            },
            "heroes": {
                name: "国战武将",
                intro: "开启此功能重启后生效。开启后将池将增加国战专属武将",
                init: false,
            },
            "ban_ai": {
                "name": "AI禁将",
                "intro": "开启后，设置所有非福瑞扩展的武将配置为AI禁选。重启后生效。",
                init: false,
                onclick: function (item) {
                    game.saveConfig('ban_ai', item);
                    game.saveConfig('extension_福瑞拓展_ban_ai', item);
                }
            },
            "furryCardFileConfig": {
                name: "<div><button id='furryCardFileConfig' onclick='furry.furryCardFileConfig()'>导入美化卡牌素材</button> </div>",
                clear: true
            },
            'furryCardFileConfig2': {
                'name': '<b><font color=\'#ADEAEA\'>自动导入大将军金卡等素材',
                'init': true,
                'intro': '<font color=\'#ADEAEA\'>开启后将自动检测并导入图片素材',
            },
            'new_character_title': {
                "name": "<b><p align=center><img style=width:200px src=" + lib.assetURL + "extension/福瑞拓展/image/others/pifumoshi.png></b>",
                "clear": true,
                "nopointer": true,
            },
            "frLutou": {
                name: "露头模式",
                intro: "切换武将插画与皮肤为露头，需要搭配十周年UI使用。",
                init: false,
                onclick: function (item) {
                    game.saveConfig('frLutou', item);
                    game.saveConfig('extension_福瑞拓展_frLutou', item);
                    if (window.decadeUI) ui.arena.dataset.outcropSkin = item ? 'on' : 'off';
                    game.saveConfig('extension_十周年UI_outcropSkin', item);
                },
            },
            'puchongs_title': {
                "name": "<b><p align=center><img style=width:200px src=" + lib.assetURL + "extension/福瑞拓展/image/others/gongnengbuchong.png></b>",
                "clear": true,
                "nopointer": true,
            },
            "ShowmaxHandcard": {
                name: '手牌上限',
                init: false,
                intro: '将游戏内显示的手牌数改为显示手牌数与手牌上限。(例：2/3，代表拥有2张牌，手牌上限为3)',
            },
            "selectDrama": {
                "name": "剧情选择",
                "intro": "选择播放的剧情",
                "init": "1",
                "item": {
                    '1': '酒馆一隅',
                    '2': '纪念',
                    '3': '再叙酒馆',
                },
                onclick: function (item) {
                    window.furry_drama(item, ui.create.div());
                },
            },
            "openlib": {
                "name": "打开群像<div>&gt;</div>",
                "clear": true,
                onclick: function () {
                    game.saveConfig('mode', 'furry_lib');
                    localStorage.setItem(lib.configprefix + 'directstart', true);
                    game.reload();
                },
            },
            //参考仙家之魂扩展            
            'others_title': {
                "name": "<b><p align=center><img style=width:200px src=" + lib.assetURL + "extension/福瑞拓展/image/others/qitazaxiang.png></b>",
                "clear": true,
                "nopointer": true,
            },
            "furry_onlineUpdate": {
                //检查游戏更新
                clear: true,
                intro: '点击检查扩展更新',
                name: '<button type="button">检查扩展更新</button>',
                onclick: function () {
                    //是否可以更新，每次都调用的原因是判断网络问题
                    let button;
                    if (this instanceof HTMLButtonElement) {
                        button = this;
                    } else {
                        button = this.childNodes[0].childNodes[0];
                    }
                    let parentNode = button.parentNode;
                    if (button.innerText != '检查扩展更新') return;
                    const address = 'https://ghproxy.com/https://raw.githubusercontent.com/chen079/FurryExt/master/';
                    if (button.disabled) {
                        return;
                    } else {
                        button.innerHTML = '正在检查更新';
                        button.disabled = true;
                        fetch(address + 'updatecheck.js', {
                            method: 'GET',
                            mode: 'cors',// 允许发送跨域请求
                            credentials: 'include',
                            headers: {
                                'Cache-Control': 'no-cache'//不缓存
                            }
                        })
                            .then(response => {
                                if (!response.ok) throw response;
                                return response.text();
                            })
                            .then(text => {
                                var data = eval(text);
                                console.log(data);
                                if (data.updateAuto == false) {
                                    alert('作者正在更新云端文件，请耐心等待片刻');
                                    return;
                                };
                                var localVersion = lib.extensionPack.福瑞拓展.version || '0';

                                /** 
                                 * 判断版本
                                 * @param { string } v1 现有版本
                                 * @param { string } v2 要更新的版本
                                 * @returns { boolean | 'equal' } v1比v2小就返回true
                                 */

                                console.log(localVersion, data.version)
                                //if (!compareVersion(localVersion, data.version)) return;


                                function myConfirm(message, callback) {
                                    if (navigator.notification && navigator.notification.confirm) {
                                        navigator.notification.confirm(message, index => {
                                            index == 1 && callback();
                                        }, ['确定', '取消']);
                                    } else {
                                        window.confirm(message) && callback();
                                    }
                                }

                                function furryUpdating() {
                                    /**
                                     * 下载一个文件
                                     * @param { string } url 
                                     */
                                    function download(url, success, error) {
                                        var path = 'extension/福瑞拓展';
                                        if (window.FileTransfer) {
                                            // 判断是不是文件夹，不是才下载
                                            function downloadFile() {
                                                let fileTransfer = new FileTransfer();
                                                fileTransfer.download(encodeURI(`${address + url}?date=${(new Date()).getTime()}`), encodeURI(lib.assetURL + path + '/' + url), success, error);
                                            }
                                            window.resolveLocalFileSystemURL(lib.assetURL,
                                                /**
                                                 * @param { DirectoryEntry } DirectoryEntry 
                                                 */
                                                DirectoryEntry => {
                                                    DirectoryEntry.getDirectory(path, { create: false }, dir => {
                                                        dir.getDirectory(url, { create: false }, () => {
                                                            console.log(`${path}/${url}是文件夹`);
                                                            // 跳过下载
                                                            success(true);
                                                        }, downloadFile);
                                                    }, downloadFile);
                                                }, downloadFile);
                                        } else {
                                            fetch(`${address + url}?date=${(new Date()).getTime()}`)
                                                .then(response => response.arrayBuffer())
                                                .then(arrayBuffer => {
                                                    // 先创建指定文件夹
                                                    game.ensureDirectory(path, () => {
                                                        var fs = require('fs');
                                                        var p = require('path');
                                                        var filePath = p.join(__dirname, path, url);
                                                        // 如果是个文件夹，就退出
                                                        if (fs.existsSync(filePath)) {
                                                            var stat = fs.statSync(filePath);
                                                            if (stat.isDirectory()) {
                                                                console.error(`${path + '/' + url}是个文件夹`);
                                                                return success(true);
                                                            }
                                                        }
                                                        fs.writeFile(filePath, Buffer.from(arrayBuffer), null, e => {
                                                            if (e) error(e);
                                                            else success();
                                                        });
                                                    });
                                                })
                                                .catch(response => error(new Error(response.statusText)));
                                        }
                                    }
                                    /**
                                     * 下载文件列表
                                     * @param { string[] } files 
                                     */
                                    function downloadList(files) {
                                        if (!Array.isArray(files) || files.length == 0) return;
                                        var i = 0;
                                        var progress = game.furryCreateProgress('更新福瑞拓展', files.length, files[0], i);
                                        var success = skip => {
                                            // 下载完了就结束
                                            if (!files[++i]) {
                                                progress.setProgressValue(files.length);
                                                progress.setFileName('下载完成');
                                                setTimeout(() => {
                                                    // 移除进度条
                                                    progress.remove();
                                                    // 延时提示
                                                    setTimeout(() => {
                                                        alert('福瑞拓展更新完成，将自动重启');
                                                        game.reload();
                                                    }, 100);
                                                }, 200);
                                                return;
                                            }
                                            // 下载成功，更新进度
                                            progress.setProgressValue(i);
                                            progress.setFileName(files[i]);
                                            download(files[i], success, error);
                                        };
                                        var error = errorText => {
                                            console.log('下载失败', errorText);
                                            progress.setFileName('重新下载: ' + files[i]);
                                            download(files[i], success, error);
                                        };
                                        download(files[i], success, error);
                                    }
                                    /** @type { string[] } 要下载的文件 */
                                    //var files = localVersion == data.oldversion ? data.updateFiles : data.allFiles;
                                    var files = data.updateFiles;
                                    downloadList(files);
                                }
                                if (data.version < localVersion) myConfirm(`你的福瑞拓展版本(v${localVersion})高于服务器版本(v${data.version}),是否覆盖安装?`, furryUpdating);
                                else if (data.version == localVersion) myConfirm(`你的福瑞拓展已是最新版本(v${data.version}),是否覆盖安装?`, furryUpdating);
                                else myConfirm(`福瑞拓展检测到更新(v${data.version}), 是否更新?\n${data.changeLog}`, furryUpdating);
                            })
                            .catch(e => {
                                alert(typeof e == 'string' ? '网络请求错误' : e.message);
                            });
                    }
                },
            },
            "furry_onlineUpdate2": {
                "name": "自动更新",
                "intro": "游戏开始后会自动检查福瑞拓展是否为最新版",
                "init": true,
            },
            "acknowledgments": {
                "name": "鸣谢清单",
                "clear": true,
                "onclick": function () {
                    ui.create.iframe(lib.assetURL + 'extension/福瑞拓展/acknowledgments/Acknowledgments.html')
                }
            },
            "group_egg": {
                "name": "交流群号:556343851",
                "clear": true,
                "onclick": function () {
                    alert("不是这里，点击下面的彩色字体哦！")
                },
            },
            "BugFeedBack": {
                "name": "<style>#点此加入交流群{animation:changeS 20s linear 4s infinite;}@keyframes changeS{ 0% {color:#FF0000;}7%{color:#FF7F00;}14%{color: #FFFF00;}21%{color:#00FF00;}28% {color:#00FFFF;}35%{color: #0000FF;}42%{color: #8B00FF;}49%{color: #0000FF;}58%{color: #8B00FF;}65%{color: #0000FF;}72% {color:#00FFFF;}79%{color:#00FF00;}86%{color: #FFFF00;}93%{color:#FF7F00;}100% {color:#FF0000;}}</style><body><div id='点此加入交流群'><b>点此加入交流群</b></div></body>",
                "clear": true,
                "onclick": function () {
                    ui.click.configMenu();
                    window.open('https://jq.qq.com/?_wv=1027&k=ICyAPXLl');
                },
            }
        }, package: {
            character: {
            },
            card: {
            },
            skill: {
            },
            intro: "<li>图片来自网络，若有侵权请联系作者删除<li><font color=\"red\">点击底部彩色字体可直接加入群聊</font><li>👇下方为QQ群二维码<img style=width:238px src=" + lib.assetURL + "extension/福瑞拓展/image/others/qqgroup.png></img>",
            author: "<span id='FrOH' style='animation:changeable 20s infinite;-webkit-animation:changeable 20s infinite;'>钫酸酱</span><img style=width:238px src=" + lib.assetURL + "extension/福瑞拓展/image/others/title.png></img>",
            diskURL: "",
            forumURL: "",
            version: "2.0.9.2",
        }, files: {}
    }
})
window.furry.frImport(function (lib, game, ui, get, ai, _status) {
    //---------------------------------------更新说明：参考活动武将------------------------------------------//
    game.showFrChangeLog = function (version) {
        version = version || lib.extensionPack["福瑞拓展"].version;
        var changeInfo = {
            //更新告示
            changeLog: [
                '/setPlayer/',
                '/setCard/',
                '修复部分bug',
                '2.3.0.1',
                '新武将：奈恩、科斯特、果糖、路西法、山熊（隐藏）',
                '修复DIYEditor的连接错误问题',
                '新增千幻手杀势力框支持',
                '新增千幻角色成就查看支持',
                '修复塔尔斯的音效错误',
                '修复米亚永动机',
                '修正bgm无法正常播放的错误',
                '2.3.0.2',
                '新武将：塞涅特，阿，鹿野灸',
                '新卡牌：“死魂幽镰”',
                '重写部分代码',
                '为拓展增加更多样式',
                '2.3.0.3',
                '新武将：莎尔斯',
                '新卡牌：AR15',
                '新功能：体力乘算',
                '2.4.0.0',
                '新增魔力值系统（参考玄武江湖拓展）',
                '重做米亚部分技能',
                '重做鸣谢清单样式（感谢狂神的图片处理）',
                '修复路西法出现时武将布局错乱（参考9-17人写法）',
                '用新的recast函数重写所有重铸的技能',
                '修正手牌和牌的描述误用',
                '重做冲刺和转移卡牌，请重新导入素材',
                'To be continued...',
            ],
            //更新武将
            players: ['fr_nine', 'fr_keste', 'fr_guotang', 'fr_lucifer', 'fr_sainit', 'fr_aak', 'fr_luyezhi', 'fr_souls'],
            cards: ['fr_equip1_ar15', 'fr_equip1_shyl'],
        };

        //加载
        var dialog = ui.create.dialog('hidden');
        dialog.addText('<div style="font-size:24px;margin-top:5px;text-align:center;">福瑞拓展 ' + version + ' 更新内容</div>');
        dialog.style.left = '25%';
        dialog.style.width = '50%';
        for (var log of changeInfo.changeLog) {
            switch (log) {
                case '/setPlayer/':
                    dialog.addText('<div style="font-size:17.5px;text-align:center;">更新角色：</div>')
                    dialog.addSmall([changeInfo.players, 'character']);
                    break;
                case '/setCard/':
                    dialog.addText('<div style="font-size:17.5px;text-align:center;">更新卡牌：</div>')
                    dialog.addSmall([changeInfo.cards, 'vcard']);
                    break;
                default:
                    var li = document.createElement('li');
                    li.innerHTML = log;
                    li.style.textAlign = 'left';
                    li.style.marginLeft = '25px';
                    li.style.marginTop = '2.5px';
                    dialog.content.appendChild(li);
            }
        }
        var ul = document.createElement('ul');
        dialog.content.appendChild(ul);
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
    };
    lib.skill._Furry_changeLog = {
        charlotte: true,
        ruleSkill: true,
        trigger: {
            global: [/*'chooseButtonBefore',*/'gameStart', 'gameDrawAfter', 'phaseBefore']
        },
        filter: function (event, player) {
            //if(event.name=='chooseButton'&&event.parent.name!='chooseCharacter') return false;
            return !lib.config.extension_福瑞拓展_Frversion || lib.config.extension_福瑞拓展_Frversion != lib.extensionPack.福瑞拓展.version;
        },
        direct: true,
        priority: Infinity,
        content: function () {
            game.saveConfig('extension_福瑞拓展_Frversion', lib.extensionPack.福瑞拓展.version);
            game.showFrChangeLog();
        },
    };
    
    //-------------------------在线更新--------------------------------//
    window.furry.update = function () {
        const address = 'https://ghproxy.com/https://raw.githubusercontent.com/chen079/FurryExt/master/';
        fetch(address + 'updatecheck.js', {
            method: 'GET',
            mode: 'cors', // 允许发送跨域请求
            credentials: 'include',
            headers: {
                'Cache-Control': 'no-cache' // 不缓存
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
                }
                var localVersion = lib.extensionPack.福瑞拓展.version || '0';
    
                console.log(localVersion, data.version);
    
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
                    const files = data.updateFiles;
                    const totalFiles = files.length;
                    let downloadedFiles = 0;
                
                    // 创建进度条
                    const progress = game.furryCreateProgress('更新福瑞拓展', totalFiles, files[0], downloadedFiles);
                
                    // 下载单个文件的函数
                    function downloadFile(url) {
                        return new Promise((resolve, reject) => {
                            var path = 'extension/福瑞拓展';
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
                                                resolve(true);
                                                return;
                                            }
                                        }
                                        fs.writeFile(filePath, Buffer.from(arrayBuffer), null, e => {
                                            if (e) reject(e);
                                            else resolve();
                                        });
                                    });
                                })
                                .catch(response => reject(new Error(response.statusText)));
                        });
                    }
                
                    // 并行下载所有文件
                    Promise.all(files.map(downloadFile))
                        .then(() => {
                            downloadedFiles = totalFiles;
                            // 更新进度条
                            progress.setProgressValue(downloadedFiles);
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
                        })
                        .catch(error => {
                            console.error('下载失败', error);
                            progress.setFileName('下载失败');
                        });
                }
                
    
                if (data.version < localVersion) {
                    myConfirm(`你的福瑞拓展版本(v${localVersion})高于服务器版本(v${data.version}),是否覆盖安装?`, furryUpdating);
                } else if (data.version == localVersion) {
                    myConfirm(`你的福瑞拓展已是最新版本(v${data.version}),是否覆盖安装?`, furryUpdating);
                } else {
                    myConfirm(`福瑞拓展检测到更新(v${data.version}), 是否更新?\n${data.changeLog}`, furryUpdating);
                }
            })
            .catch(e => {
                alert(typeof e == 'string' ? '网络请求错误' : e.message);
            });
    }
    
    window.furry.update2 = async function () {
        try {
            const response = await fetch('https://ghproxy.com/https://raw.githubusercontent.com/chen079/FurryExt/master/updatecheck.js', {
                method: 'GET',
                mode: 'cors', // 允许发送跨域请求
                credentials: 'include',
                headers: {
                    'Cache-Control': 'no-cache' // 不缓存
                }
            });
    
            if (!response.ok) throw response;
    
            const text = await response.text();
            var data = eval(text);
            console.log(data);
    
            if (data.updateAuto === false) return;
    
            var localVersion = lib.extensionPack.福瑞拓展.version || '0';
            console.log(localVersion, data.version);
    
            function myConfirm(message, callback) {
                if (navigator.notification && navigator.notification.confirm) {
                    navigator.notification.confirm(message, index => {
                        index === 1 && callback();
                    }, ['确定', '取消']);
                } else {
                    window.confirm(message) && callback();
                }
            }
    
            async function furryUpdating() {
                async function download(url) {
                    var path = 'extension/福瑞拓展';
                    const address = 'https://ghproxy.com/https://raw.githubusercontent.com/chen079/FurryExt/master/';
    
                    if (window.FileTransfer) {
                        // your FileTransfer logic
                        // ...
                    } else {
                        const response = await fetch(`${address + url}?date=${(new Date()).getTime()}`);
                        if (!response.ok) {
                            throw new Error(`Failed to download ${url}`);
                        }
                        const arrayBuffer = await response.arrayBuffer();
    
                        // your fetch logic
                        // ...
    
                        return Promise.resolve();
                    }
                }
    
                function downloadList(files) {
                    if (!Array.isArray(files) || files.length == 0) return Promise.resolve();
    
                    var promises = files.map((file, index) => {
                        return () => {
                            return download(file)
                                .then(() => {
                                    console.log(`Downloaded ${file}`);
                                })
                                .catch(error => {
                                    console.error(`Failed to download ${file}:`, error);
                                });
                        };
                    });
    
                    return promises.reduce((promiseChain, currentTask) => {
                        return promiseChain.then(() => currentTask());
                    }, Promise.resolve());
                }
    
                var files = data.updateFiles;
                await downloadList(files);
    
                alert('福瑞拓展更新完成，将自动重启');
                game.reload();
            }
    
            if (data.version <= localVersion) return;
            else myConfirm(`福瑞拓展检测到更新(v${data.version}), 是否更新?\n${data.changeLog}`, furryUpdating);
        } catch (e) {
            alert(typeof e === 'string' ? '网络请求错误' : e.message);
        }
    }
    
})
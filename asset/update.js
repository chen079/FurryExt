window.furry.frImport(function (lib, game, ui, get, ai, _status) {
    //---------------------------------------更新说明：参考活动武将------------------------------------------//
    game.showFrChangeLog = function (version) {
        version = version || lib.extensionPack["福瑞拓展"].version;
        var changeInfo = {
            //更新告示
            changeLog: [
                '/setPlayer/',
                '/setCard/',
                '2.4.0.3',
                '修复阿卡因、林特的错误',
                '2.4.0.2',
                '新增Buff系统，感谢时空枢纽、玄武江湖提供的代码参考',
                '为所有Buff重绘图标，在设置菜单可以查看Buff列表',
                '重做鹿野灸、苍月龙兽、米里森技能，为他们添加Buff适配',
                '重做卡牌：投桃报李、凌月之球',
                '鸣谢清单现在点击主体不会再关闭了',
                '新角色库伦（我们福瑞拓展也要有自己的十常侍！）',
                '新角色阿卡因（第一次引入变化势力的概念）、白曦',
                '新卡牌：严防死守',
                '修复各种Bug',
                'To be continued...',
            ],
            //更新武将
            players: ['fr_kulun','fr_akain','fr_baixi'],
            cards: ['fr_card_yfss'],
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

    window.furry.update2 = function () {
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

    }
})
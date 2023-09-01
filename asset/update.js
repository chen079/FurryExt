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

})
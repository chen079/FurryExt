'use strict';
window.furry.frImport(function (lib, game, ui, get, ai, _status) {
    if (!lib.qhlyPlugins) {
        lib.qhlyPlugins = [];
    }
    lib.qhlyPlugins.push({
        id: "FurryShop-114514",//为插件指定一个ID。最好用一个随机字符串，防止与别的插件重复。
        author: "钫酸酱",//作者
        pluginType: '角色介绍附加页',//表示插件类型
        name: '商店',//“角色介绍附加页”显示的名字，限制两个字。
        label: "卡利斯福的商店",
        intro: "此处为福瑞拓展的商店系统，仅对一名角色有效，该角色可用凭此在商店内购买技能等。",
        enable: function () {
            return true;//插件是否可用
        },
        characterFilter: function (name) {
            return name == 'fr_neises'
        },
        content: function () {
            
        },
        handleView: function (view, name) {
            var player = game.me
            var list = []
            for (var i in lib.characterPack.furryPack) {
                var character = lib.characterPack.furryPack[i]
                list = list.concat(character[3])
            }
            list = list.filter(i => {
                var info = get.info(i)
                return lib.translate[i + '_info'] != undefined && info && !(info.charlotte || info.fixed || info.unique || info.zhuSkill || info.charlotte || info.yunlvSkill || info.qianghua || info.hiddenSkill || info.juexingji || info.limited || info.dutySkill || (info.unique && !info.gainable))
            })
            var shop = ui.create.div('', view)
            var title = ui.create.div('', shop)
            var name = ui.create.div('', title)
            var divList = {

            }
            for (var i of list) {
                (function (currentSkill) {
                    divList[currentSkill] = {};
                    divList[currentSkill]['div'] = ui.create.div('.shopItem', shop);
                    divList[currentSkill]['div'].id = currentSkill;
                    divList[currentSkill]['skillItem'] = ui.create.div('.skillItem', divList[currentSkill]['div']);
                    divList[currentSkill]['accept'] = ui.create.div('.acceptItem', divList[currentSkill]['div']);
                    divList[currentSkill]['text'] = ui.create.div('.innershopText', divList[currentSkill]['skillItem']);
                    divList[currentSkill]['text'].innerText = get.translation(currentSkill);
                    if (player.hasSkill(currentSkill)) divList[currentSkill]['accept'].setBackgroundImage('extension/福瑞拓展/image/achievement/received.png');
                    divList[currentSkill]['accept'].addEventListener('click', function () {
                        if (!player.hasSkill(currentSkill)) alert('领取成功');
                        player.addSkill(currentSkill);
                        divList[currentSkill]['accept'].setBackgroundImage('extension/福瑞拓展/image/achievement/received.png');
                    });
                })(i);
            }
        }
    });
});

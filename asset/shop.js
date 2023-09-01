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
            //附加页内显示的内容。
            var str = "显示内容";
            return str;
        },
        handleView: function (view, name) {
            //为附加页内的元素添加点击事件和其它逻辑。
        }
    });
});

//game.import(name: "福瑞拓展",
import { lib, game, ui, get, ai, _status } from '../../noname.js';
import { InitFurry, InitProgress } from './js/core.js'
import { config } from './js/config.js';
import { precontent } from './js/precontent/index.js';
import { content } from './js/content.js';
import { help } from './js/help.js';

lib.init.css(lib.assetURL + 'extension/福瑞拓展', 'extension');
InitFurry()
InitProgress()

let extensionPackage = {
    name: '福瑞拓展',
    editable: false,
    content: content,
    precontent: precontent,
    config: config,
    help: help,
    files: {},
};

export let type = 'extension';
export default async function () {
    const { name, intro, ...otherInfo } = await lib.init.promises.json(`${lib.assetURL}extension/福瑞拓展/info.json`);
    extensionPackage.package = {
        ...otherInfo,
        intro: "<li>(｡･∀･)ﾉﾞ嗨，" + lib.config.connect_nickname + "！欢迎游玩福瑞拓展！"
            + "<li>当前版本：" + lib.config.extension_福瑞拓展_Frversion
            + "<li>图片来自网络，若有侵权请联系作者删除"
            + "<li><font color=\"red\">点击底部彩色字体可直接加入群聊</font>"
            + "<li>👇下方为QQ群二维码"
            + "<div style='text-align: center; width: 100%;'><img style=width:238px src=" + lib.assetURL + "extension/福瑞拓展/image/others/qqgroup.png></img></div>"
            + "<div style='text-align: center; width: 100%;'><img style=width:238px src=" + lib.assetURL + "extension/福瑞拓展/image/others/qqgroup2.png></img></div>",
        author: "<img style='width:40px;height:40px;border-radius:50%;' src=" + lib.assetURL + "extension/福瑞拓展/image/others/Author.jpg></img><span id='FrOH' style='animation:changeable 20s infinite;-webkit-animation:changeable 20s infinite;'>钫酸酱</span>"
            + "<br>特别鸣谢：<img style='width:40px;height:40px;border-radius:50%;' src=" + lib.assetURL + "extension/福瑞拓展/image/acknowledgments/狂神：代码重构.jpg></img>狂神 重构代码"
            + "<br><div id='thanks' style='text-align: center; display: table; width: 100%;'>鸣谢清单<div id='arrow'>➡️</div></div>"
            + "<br>关注微信公众号“无名杀扩展交流”，也可及时获取“福瑞拓展”最新版"
            + "<div style='text-align: center; width: 100%;'><img style=width:238px src=" + lib.assetURL + "extension/福瑞拓展/image/others/title.png></img></div>"
            + "<div id='yiyan'>每日一言：</div>"
            + '<div id="active" style="text-align: center;width: 100%;border: double;border-radius: 3px;padding-bottom: 5px;"><div>使用福利码</div><br><input type="text" name="activeKey" placeholder="请输入福利码"/>&nbsp&nbsp<button id="activeKey">激活</button></div>',
        diskURL: "",
        forumURL: "",
        version: "4.1.1",
    };
    return extensionPackage;
};

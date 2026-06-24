import { lib, game, ui, get, ai, _status } from '../../../noname.js';

export let config = {
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
                    node.innerHTML = `<li>欢迎游玩福瑞拓展，
                            <li>其中部分技能与界面参考自许多拓展，如天庭，天牢令，金庸群侠传，时空枢纽，玄武江湖，云将等，希望大家能够也支持他们！！
                            <li>欢迎本拓展使用，祝你能够玩的开心。
                            <li>部分原画来自网络，若侵犯你的权利，请联系作者删除。
                            <li>本扩展不做任何商业用途，如你通过任何方式购买获得本扩展，一切收益与责任均和作者无关。
                            <li>欢迎更多设计、配音、美化的大佬加入，如有兴趣加入制作组请联系作者。`
                    break;
            }
        },
    },
    'new_inpile_title': {
        "name": "<b><p align=center><img style=width:200px src=" + lib.assetURL + "extension/福瑞拓展/image/others/youxitiaozheng.png></b>",
        "clear": true,
        "nopointer": true,
    },
    'hp_mutiply': {
        name: "<b>体力乘算</b>",
        intro: '可以将所有武将的体力扩大2-10倍',
        init: lib.config.extension_福瑞拓展_hp_mutiply === undefined ? 1 : lib.config.extension_福瑞拓展_hp_mutiply,
        item: {
            1: '关闭',
            2: '2倍',
            3: '3倍',
            4: '4倍',
            5: '5倍',
            6: '6倍',
            7: '7倍',
            8: '8倍',
            9: '9倍',
            10: '10倍'
        },
        onclick: function (item) {
            game.saveConfig('extension_福瑞拓展_hp_mutiply', Number(item));
        },
    },
    "Background_Picture": {
        name: "<b>背景图片</b>",
        intro: "背景图片：可随意切换精美高清的背景图片。",
        init: lib.config.extension_福瑞拓展_Background_Picture === undefined ? "1" : lib.config.extension_福瑞拓展_Background_Picture,
        item: {
            "1": "默认背景",
            "decadeUI": "十周年UI",
            'fire and heart': '烈火雄心',
            'knier': '面朝大海',
            "auto": "自动切换",
        },
        onclick: function (item) {
            game.saveConfig('extension_福瑞拓展_Background_Picture', item);
            game.frBackground_Picture();
        },
        "visualMenu": function (node, link) { //link是冒号前面的，比如default:经典卡背，link就是default
            node.style.height = node.offsetWidth * 0.67 + "px"; //高度设置成宽度的0.67倍
            node.style.backgroundSize = '100% 100%'; //图片拉伸
            node.className = 'button character frBackgroundname';
            node.setBackgroundImage('extension/福瑞拓展/image/background/' + link + '.jpg'); //设置图片
        },
    },
    "Background_Music": {
        name: "<b>背景音乐</b>",
        intro: "背景音乐：可随意点播、切换优质动听的背景音乐",
        init: lib.config.extension_福瑞拓展_Background_Music === undefined ? "1" : lib.config.extension_福瑞拓展_Background_Music,
        item: {
            "0": "随机播放",
            "1": "默认音乐",
            "2": "Tarven",
            "3": "Battle Against A True Hero",
            "4": "My Sunset",
            "5": "Far Out",
            "6": "Beethoven Virus",
            "7": "Main Title",
            "8": "存亡之战",
            "9": "ukigumo",
        },
        onclick: function (item) {
            game.saveConfig('extension_福瑞拓展_Background_Music', item);
            game.frplayBackgroundMusic();
            ui.backgroundMusic.addEventListener('ended', game.frplayBackgroundMusic);
        },
        "visualMenu": function (node, link) {
            node.style.height = node.offsetWidth * 0.83 + "px";
            node.style.backgroundSize = '100% 100%';
            node.className = 'frmusicname';
            node.setBackgroundImage('extension/福瑞拓展/image/bgm/' + link + '.png');
        },
    },
    "furry_zhuneimusic": {
        name: "<b>主内单挑音乐</b>",
        init: "z0",
        intro: "选定后重启游戏生效，进入主内单挑时播放选定的背景音乐",
        item: {
            "z0": "关闭",
            "z1": "Hopes And Dreams",
            "z2": "MEGALOVANIA",
            "z3": "El Dorado",
            "z4": "BOSS BATTLE：BIG ARMS",
        },
        "visualMenu": function (node, link) {
            node.style.height = node.offsetWidth * 0.83 + "px";
            node.style.backgroundSize = '100% 100%';
            node.className = 'frmusicname';
            node.setBackgroundImage('extension/福瑞拓展/image/bgm/' + link + '.png');
        },
    },
    "buffList": {
        name: "<b>查看Buff列表",
        clear: true,
        intro: '查看福瑞拓展的Buff列表',
        onclick: function () {
            get.Bufflist()
        }
    },
    "unlockall": {
        "name": "<b>一键解锁奖励</b>",
        "clear": true,
        "intro": "是否跳过成就，解锁所有非成就点数角色奖励？",
        onclick: function () {
            var msg = "您确定要跳过成就，获取所有非成就点数角色奖励吗？（仅对角色成就奖励有效）";
            if (confirm(msg) == true) {
                for (var i in lib.fr_achievement.character) {
                    var info = lib.fr_achievement.character[i]
                    if (info.reward) {
                        info.reward()
                    }
                }
                game.frAchi.saveToFile()
            }
        },
    },
    "ban_ai": {
        "name": "<b>福瑞乱斗</b>",
        "intro": "开启后，AI只能选择福瑞拓展武将。重启后生效。",
        init: false,
        onclick: function (item) {
            game.saveConfig('extension_福瑞拓展_ban_ai', item);
            game.saveConfig('extension_福瑞拓展_ban_ai2', false);
        }
    },
    "ban_ai2": {
        "name": "<b>AI禁选</b>",
        "intro": "开启后，设置所有福瑞扩展的武将配置为AI禁选。重启后生效。",
        init: false,
        onclick: function (item) {
            game.saveConfig('extension_福瑞拓展_ban_ai2', item);
            game.saveConfig('extension_福瑞拓展_ban_ai', false);
        }
    },
    "guozhan": {
        name: "<b>国战武将",
        intro: "是否开启福瑞拓展国战武将",
        init: true,
        onclick: function (item) {
            game.saveConfig('extension_福瑞拓展_guozhan', item);
        }
    },
    "furryCardFileConfig": {
        name: "<div><button id='furryCardFileConfig' onclick='furry.autoFrImport()'>导入图片素材</button> </div>",
        clear: true
    },
    'new_character_title': {
        "name": "<b><p align=center><img style=width:200px src=" + lib.assetURL + "extension/福瑞拓展/image/others/pifumoshi.png></b>",
        "clear": true,
        "nopointer": true,
    },
    "frSkin": {
        name: "<b>开启皮肤</b>",
        intro: "开启武将皮肤，需要配合千幻聆音使用。",
        init: true,
        onclick: function (item) {
            if (!lib.config.extension_千幻聆音_enable) {
                alert('检测到您没有开启千幻聆音扩展，请检查您的拓展列表。')
                game.saveConfig('extension_福瑞拓展_frSkin', false);
            } else {
                game.saveConfig('extension_福瑞拓展_frSkin', true);
            }
        },
    },
    "mpLoc": {
        "name": "<b>魔力条显示位置</b>",
        "intro": "可以设置内力条在头像上显示的位置",
        "init": lib.config.frMpBarLocation !== undefined ? lib.config.frMpBarLocation : "shangcenei",
        "item": {
            "shangcenei": "上侧靠内",
            "shangcewai": "上侧靠外",
            "xiacenei": "下侧靠内",
            "xiacewai": "下侧靠外",
            "xiaceyou": "下侧靠右",
        },
        onclick: function (item) {
            game.saveConfig('extension_福瑞拓展_mpLoc', item);
            game.saveConfig('frMpBarLocation', item);
        }
    },
    "frLutou": {
        name: "<b>露头模式</b>",
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
    /*"exp": {
        name: '<b>实验内容</b>',
        init: false,
        intro: '含有部分作者测试用的实验内容，可能导致游戏崩溃等等，若不知道用来干什么的请勿开启。',
    },*/
    "xuanshi": {
        name: "<b>技能作弊（即时生效）</b>",
        intro: "获得技能〖宣誓〗：<br>一轮游戏开始时或准备阶段，你可以声明一个非隐匿技，然后你拥有此技能直到本轮结束。",
        init: false,
    },
    "huiwan_player": {
        name: "<b>玩家定向摸牌</b>",
        intro: "当你摸牌时，你可以指定你摸到的牌（感谢狂神dalao提供的代码）。",
        init: false,
    },
    "huiwan_ai": {
        name: "<b>AI定向摸牌</b>",
        intro: "当AI摸牌时，其可以指定其摸到的牌（感谢狂神dalao提供的代码）",
        init: false,
    },
    "ShowmaxHandcard": {
        name: '<b>手牌上限</b>',
        init: false,
        intro: '将游戏内显示的手牌数改为显示手牌数与手牌上限。(例：2/3，代表拥有2张牌，手牌上限为3)',
    },
    'AIchooseCharacter': {
        name: '<b>AI选将</b>',
        init: false,
        intro: '游戏开始时可以修改场上武将',
    },
    "fr_shunfajiButton": {
        "name": "<b>瞬发技按钮样式</b>",
        "intro": "<b>切换瞬发技按钮样式<br>可根据个人喜好切换<br>切换后，重启生效",
        "init": "shousha",
        "item": {
            "shousha": "<b><font color=\"#FF6020\">手杀样式",
            "olten": "<b><font color=\"#FFFF00\">十周年样式",
            "ol": "<b><font color=\"#FF0000\">OL样式",
        },
    },
    "selectDrama": {
        "name": "<b>剧情选择</b>",
        "intro": "选择播放的剧情",
        "init": "1",
        "item": {
            '1': '酒馆一隅',
            '2': '纪念',
            '3': '再叙酒馆',
            '4': '色塔卡之旅'
        },
        onclick: function (item) {
            window.furry_drama(item, ui.create.div());
        },
    },
    "openlib": {
        "name": "<b>打开群像</b><div>&gt;</div>",
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
            if (button.disabled) {
                return;
            } else {
                button.innerHTML = '正在检查更新';
                button.disabled = true;
                window.furry.update()
            }
        },
    },
    "fr_OpenAchievement": {
        "name": "<b><span id='chengjiu' style='animation:changeable 20s infinite;-webkit-animation:changeable 20s infinite;'>打开福瑞成就菜单</span></b>",
        "clear": true,
        onclick: function () {
            if (typeof window.openfrAchievement == 'function') {
                window.openfrAchievement();
            } else {
                alert("错误：您似乎没有打开福瑞拓展包。");
            }
        }
    },
    "furry_onlineUpdate2": {
        "name": "<b>自动更新</b>",
        "intro": "游戏开始后会自动检查福瑞拓展是否为最新版",
        "init": true,
    },
    "group_egg": {
        "name": "<b>交流群号:556343851</b>",
        "clear": true,
        "onclick": function () {
            window.furry.groupeggClick()
        },
    },
    "BugFeedBack": {
        "name": "<style>#点此加入交流群{animation:changeS 20s linear 4s infinite;}@keyframes changeS{ 0% {color:#FF0000;}7%{color:#FF7F00;}14%{color: #FFFF00;}21%{color:#00FF00;}28% {color:#00FFFF;}35%{color: #0000FF;}42%{color: #8B00FF;}49%{color: #0000FF;}58%{color: #8B00FF;}65%{color: #0000FF;}72% {color:#00FFFF;}79%{color:#00FF00;}86%{color: #FFFF00;}93%{color:#FF7F00;}100% {color:#FF0000;}}</style><body><div id='点此加入交流群'><b>点此加入交流群①</b></div></body>",
        "clear": true,
        "onclick": function () {
            ui.click.configMenu();
            ui.create.iframe('https://jq.qq.com/?_wv=1027&k=ICyAPXLl');
            if (!game.frAchi.hasAchi('感谢支持！', 'special')) game.frAchi.addProgress('感谢支持！', 'special')
        },
    },
    "BugFeedBack2": {
        "name": "<style>#点此加入交流群{animation:changeS 20s linear 4s infinite;}@keyframes changeS{ 0% {color:#FF0000;}7%{color:#FF7F00;}14%{color: #FFFF00;}21%{color:#00FF00;}28% {color:#00FFFF;}35%{color: #0000FF;}42%{color: #8B00FF;}49%{color: #0000FF;}58%{color: #8B00FF;}65%{color: #0000FF;}72% {color:#00FFFF;}79%{color:#00FF00;}86%{color: #FFFF00;}93%{color:#FF7F00;}100% {color:#FF0000;}}</style><body><div id='点此加入交流群'><b>点此加入交流群②</b></div></body>",
        "clear": true,
        "onclick": function () {
            ui.click.configMenu();
            ui.create.iframe('http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=68sZjH-0bYyrYjJfdH-WXZU0o6JOQ9IV&authKey=hydyfvCd2oFL%2BQchG%2F%2FHWOZepZG%2FPfc0Jx%2F%2F4smCUPw9Sek6cQ3EU1RMLuuY4oiq&noverify=0&group_code=828182346');
            if (!game.frAchi.hasAchi('感谢支持！', 'special')) game.frAchi.addProgress('感谢支持！', 'special')
        },
    }
}
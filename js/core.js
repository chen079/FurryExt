import { lib, game, ui, get, ai, _status } from '../../../noname.js';

export async function InitFurry() {
    Object.defineProperty(Array.prototype, "swapElements", {
        configurable: true,
        enumerable: false,
        writable: false,
        value: function (index1, index2) {
            var array = this;
            if (index1 < 0 || index1 >= array.length || index2 < 0 || index2 >= array.length) {
                throw new Error("Invalid index values.");
            }
            const temp = array[index1];
            array[index1] = array[index2];
            array[index2] = temp;
            return array
        }
    });
    window.furry = {
        url: lib.assetURL + "extension/福瑞拓展",
        copy: function (sdir /*源文件夹路径*/, fn /*文件名*/, ddir /*目标文件夹路径*/, callback) {
            game.ensureDirectory(ddir, function () {
            });
            game.readFile(sdir + '/' + fn, function (data) {
                game.writeFile(data, ddir, fn, (callback || function () {
                }));
            }, (e) => console.log(e));
        },
        frImport: function (func) {
            func(lib, game, ui, get, ai, _status);
        },
        addProgress: function (obj, value, total) {
            var progress = Math.floor(value / total * 100);
            obj.style.backgroundSize = progress + "% 100%";
        },
        require: function (modulePath) {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = modulePath;
                script.async = true;
                let getModuleName = modulePath => modulePath.split('/').pop().replace('.js', '');
                script.onload = () => {
                    // console.log(window[getModuleName(modulePath)]);
                    resolve(window[getModuleName(modulePath)]);
                    console.log(`Success to load module: ${getModuleName(modulePath)}`)
                    document.head.removeChild(script);
                };
                script.onerror = () => {
                    reject(new Error(`Failed to load module: ${getModuleName(modulePath)}`));
                    document.head.removeChild(script);
                };

                document.head.appendChild(script);
            });
        },
        comeToGroup: function () {
            if (!game.frAchi.hasAchi('感谢支持', 'special')) game.frAchi.addProgress('感谢支持', 'special')
        },
        count: 0,
        groupeggClick: function () {
            this.count++;
            var str
            if (!game.frAchi.hasAchi('你真的很无聊', 'special')) {
                switch (this.count) {
                    case 2: str = "说了是下面的啦！QWQ"; break;
                    case 4: str = '你是不是听不懂人话(╯▔皿▔)╯'; break;
                    case 8: str = '别点了别点了＞﹏＜'; break;
                    case 10: str = '说了不要点了，点下面那个！(；′⌒`)'; break;
                    case 11: str = '你是听不懂嘛，点下面那个(╯▔皿▔)╯'; break;
                    case 12: str = '你真的好无聊，你的目的是什么呢？(╯‵□′)╯︵┻━┻'; break;
                    case 13: str = '这里真的没东西，不要再点了！ヾ(≧へ≦)〃'; break;
                    case 15: str = '你到底在干啥！(；′⌒`)'; break;
                    case 17: str = '不要再点了！QAQ'; break;
                    case 19: str = '好吧，我被你的毅力打动了，你想要什么？(・∀・(・∀・(・∀・*)'; break;
                    case 20: str = '想要一个特殊成就吗？还是你早就已经知道了，就这么折磨我TAT'; break;
                    case 21: str = '给你给你，你这无聊的家伙！'; break;
                    default: str = '不是点击这里，是下面的彩色字体。0v0'; break;
                }
                if (this.count == 21) {
                    if (!game.frAchi.hasAchi('你真的很无聊', 'special')) game.frAchi.addProgress('你真的很无聊', 'special')
                }
            } else {
                str = '不是点击这里，是下面的彩色字体。'
            }
            alert(str)
        },
        storyIntroduce: {
            'ziranshen': {
                name: '自然神',
                info: '<li>神祇分为自然神和概念神两种，自然神是自世界诞生之初就存在的神族，概念神则是由众多人的信仰而产生的神祇。<li>概念神会因为信仰的消失而死亡，而自然神则不会。<li>二者有本质的区别。',
            },
            'huolingri': {
                name: '火灵日',
                info: '<li>火灵日（晨曦月初一）是瓦尔亚那大陆上最盛大的节日，象征一年的开始。人们欢庆新希望，共同祭祀火神“祝”的恩惠。<li>火灵日最为盛大的仪式就是在夜晚的祭祀活动，人们会在大街上摆满食物以供任何人取用。<li>每个国家的火灵日休假活动各不相同，一般来说都是休息15天（初一至十五）。'
            },
            'haixingri': {
                name: '海行日',
                info: '<li>海行日（种生月廿二日），生活在人鱼之海附近的人们举办的节日。<li>大部分人们会在海行日那天第一次出海。<li>船员们的家眷们则会在米卡雕像下祈求，希望今年的丰收和航行的顺利。<li>海行日那天人们会食用特殊的虾饼（由科特鳌虾和海丝草通过油炸制成）。'
            },
            'qingyujie': {
                name: '清雨节',
                info: '<li>清雨节（雨掌月初五），作为色塔卡雨季的开始，备受当地人们的关注。<li>色塔卡作为沙漠边上的城市，降雨十分稀少，而雨季的开始象征着生命的复苏。当地的人们将这认为是祥瑞之神寅虎的赐福，让这土地重新充满生机。<li>当天人们会在他们的母亲河——斯克蓝底的上游放下纸船，并写下自己的愿望。'
            }
        },
        introduce: {
            //不要在编辑器换行！！
            'Buff': {
                name: 'Buff系统',
                info: `<li>在Buff描述中的X，若未特殊说明均指Buff层数<li>上限：当你的Buff达到上限时，不会再继续增加，没有特殊说明的Buff为无上限<li>增益/减益/中立：指的是Buff在一般情况下是获得收益还是获得损害`,
                //<li>Buff系统是一种特殊系统。
                // <li>自然衰减：回合结束时，含有自然衰减的所有Buff会移去1层。
                // <li>衰减：指的是以自然衰减的方式减少buff，如：你衰减5层某buff指你的某buff以自然衰减的方式依次减少5层（每次减少1层，减少5次）。
                // <li>当你的描述为你减少5层Buff并视为自然衰减时，指直接移除5层Buff并视为自然衰减移除的（只触发1次自然衰减的技能）
                // <li>附加：当你的某种Buff层数从0变为1及以上时，称为附加某种Buff
                // <li>消解：当你的某种Buff层数减为0时，称为消解某种Buff
                // <li>增加（获得）/减少（移除）：当你增加或减少某种Buff时，你的Buff层数+1/-1
                // <li>调整至/增至/降至：指你将某种Buff层数改为/+/-至指定值
                // <li>清除：指的是将你的Buff层数减为0（触发含有消解描述的技能）
            },
            'shuaijian': {
                name: '衰减',
                info: `buff层数的减少有几种方式：<li>自然衰减：回合结束时，含有自然衰减的所有Buff会移去1层(即衰减，当衰减5层buff时依次执行)<li>清除：指的是将你的Buff层数减为0<li>消解：当你的某种Buff层数以任何方式减为0时，称为消解某种Buff，<li>减少：令buff层数-1，`,
            },
            'peizhi': {
                name: '配置',
                info: `你弃置的所有牌中，
                <br>根据其中的牌名，获得对应的效果或buff
                <li>桃：回生，
                <li>杀：流血，
                <li>闪：迅捷，
                <li>酒：令本次配置所有buff层数+1；</li>
                除以上固定配方以外
                <br>每有一张红色牌，获得一个随机增益buff，
                <br>每有一张黑色牌，获得一个随机减益buff；`
            },
            'weizhuang': {
                name: '伪装',
                info: '<li>当你获得新的伪装时，替换上一个伪装。<li>你视为拥有伪装角色的所有技能。'
            },
            'zhuyaojieduan': {
                name: '主要阶段',
                info: `主要阶段指的是角色的判定阶段、摸牌阶段、出牌阶段和弃牌阶段`,
            },
            'jieduan': {
                name: '阶段',
                info: `阶段指的是角色的准备阶段、判定阶段、摸牌阶段、出牌阶段、弃牌阶段和结束阶段。`,
            },
            'zhuangbei': {
                name: '特殊装备',
                info: `<li>将一张牌作为武器（a，X）也就是作为攻击范围为a的武器牌，其技能视为该牌上包含X的技能。
                <li>其他举例：
                <li>坐骑（–1，牌名【杀】），具有–1马效果的，技能为描述中包含牌名【杀】的技能
                <li>宝物（伤害），技能为描述中包含“伤害”的技能
                <li>此类特殊装备只能置入装备区，且离开装备区时销毁。`,
            },
            'xiuzheng': {
                name: '休整',
                info: '<li>当你进入休整状态时，你复原武将牌，且不于此次死亡事件中进行展示身份牌、检测游戏胜利条件与执行奖惩的流程。<li>若无特殊说明，处于修整状态的角色将会于其下个回合开始前回到游戏并回复所有体力值。'
            },
            'zhuru': {
                name: '注入',
                info: `<li>选择一张牌作为主将（若已有被注入的主将则作为副将并替换已有副将，与主将组成双将）。注入时能量不能相互冲突，目前的冲突列表为目前是：<li>光明：【黑暗】<li>黑暗：【光明,雷电】<li>火焰：【寒冰，潮汐】<li>潮汐：【火焰】<li>寒冰：【火焰】<li>自然：【金属，火焰】<li>飓风：【自然】`,
            },
            'suiyu': {
                name: '碎玉',
                info: '<li>角色的勾玉可以被击碎，当其勾玉被击碎时，其获得碎玉并失去等量体力上限，碎玉依然提供手牌上限。<li>一名角色受到伤害时，若其有碎玉，令此次伤害减少X（X为其碎玉数与此次伤害中最小值），然后其移除X个碎玉。<li>每名角色的出牌阶段限一次，若其有碎玉，其可以弃置至多Y张牌（Y为其碎玉数），然后修补（移除碎玉，增加等量的体力上限并回复等量体力值）Y点碎玉。'
            },
            'xiubu': {
                name: '修补',
                info: '<li>若角色有碎玉，其可以移去一定量的碎玉，获得等量的体力上限并回复等量体力值。'
            },
            'moli': {
                name: '魔力',
                info: '<li>魔力是一种类似体力的指示物，<li>游戏开始时，若无特殊说明，一名角色的魔力上限等于其武将牌上的体力上限（至多为5），魔力值等于魔力上限的一半（向下取整）,<li>魔力可以被获得、消耗和失去（类似体力的回复、伤害和流失）。'
            },
            'youji': {
                name: '游击',
                info: '<li>指的是目标角色在你的攻击范围内，但你不在目标角色的攻击范围内的情况。'
            },
            'boji': {
                name: '搏击',
                info: '<li>目标角色在你的攻击范围内，且你也在目标角色的攻击范围内。'
            },
            'zhongshi': {
                name: "众势技",
                info: "众势技是一类特殊的技能标签，拥有此标签的技能仅身份模式且你的身份为主公或反贼时可用。"
            },
            'qiyue': {
                name: '契约',
                info: "签订契约：在指定位置召唤一个角色，该角色称你为“契主”，你称该角色为“契友”。</br>你的“契友”由你控制，且意志十分坚定，控制权不会受到侵蚀。</br>当你死亡时，你的“契友”立即死亡。"
            },
            'fenfa': {
                name: '奋发技',
                info: '<li>奋发技是一类特殊的技能标签，<li>奋发技后的括号，代表在当你的体力值处于该区间内时，此技能有效，否则此技能不能发动，<li>若括号内只有一个值，则代表单个点，如[2]代表体力为2时可以发动，(-Infinity,maxHp)代表体力值未满时可以发动'
            },
            'zhinang': {
                name: '智囊',
                info: '<li>指的是过河拆桥、无懈可击、无中生有这三个牌名。'
            },
            'hecheng': {
                name: '合成',
                info: '<li>合成：指的是将两张装备变为一张，效果为二者的叠加。<li>合成后的装备类型取决于合成中你先选择的装备。'
            },
            'shunfa': {
                name: '瞬发技',
                info: '<li>瞬发技是一类特殊的技能标签。<li>拥有瞬发技标签的技能可以在条件允许的任意时刻发动。'
            },
            'mouyi': {
                name: '谋弈',
                info: "谋弈是指双方有两个选择,然后各自选择一项同时公布,通过最终的结果判定成败。<li>谋弈补充：若选项后面的“()”中有内容，对方阻止这个选项的方式为执行对应操作（类似【奇正相生】）"
            },
            'zhizao': {
                name: '制造',
                info: '<li>制造：弃置选中的牌，从特定范围随机抽取5种不同的装备牌名，选择一张获得，花色与此牌相同。若没有说明，则点数随机（制造多张装备，则重复以上操作等量次）。<li>范围：OL蒲元锻造，所有打开的卡牌包。<li>制造的牌进入弃牌堆时，销毁之。'
            },
            "baonue": {
                name: "暴虐值",
                info: "当你造成或受到伤害后，你获得等量的暴虐值。<li>暴虐值的上限为5。"
            },
            "mpcost": {
                name: "<span class='bluetext'>①</span>",
                info: "你需要消耗对应的魔力才能发动后续效果。<li>若没有写时机，默认出牌阶段。"
            },
            "hubian": {
                name: '互变',
                info: '游戏开始时，角色处于暗涌状态。<li>当你改变互变状态时，在暗涌/圣咏状态之间转换。'
            },
            "hubianji": {
                name: '互变技',
                info: '类似转换技，只执行对应效果。<li>游戏开始时，角色处于暗涌状态。<li>当你改变互变状态时，在暗涌/圣咏状态之间转换。'
            },
            "kamidamage": {
                name: "神圣伤害",
                info: "神圣伤害：当一名角色受到神圣伤害时，不会触发任何与伤害有关的技能与机制。"
            },
            "qianghua_buff": {
                name: "强化",
                info: "1.当你处于“强化”状态时，所有带有“强化技”标签的技能额外执行其强化效果，在你的一个强化技结算完毕后，你结束“强化”状态。<li>2.“强化”效果不可叠加。"
            },
            "qianghua": {
                name: "强化技",
                info: "1.当你处于“强化”状态时，所有带有“强化技”标签的技能额外执行其强化效果，在你的一个强化技结算完毕后，你结束“强化”状态。<li>2.“强化”效果不可叠加。<li>3.拥有强化技的角色出牌阶段限一次，其可以失去1点体力或弃置两张牌，进入“强化”状态。"
            },
            "chouhua": {
                name: "筹划",
                info: "筹划：你展示牌堆顶的五张牌，并获得其中任意张点数成等差数列的牌，然后将剩余的牌洗回牌堆。"
            },
            "wuyin": {
                name: "五音",
                info: "宫音：摸牌阶段，你多摸两张牌 <li>商音：出牌阶段，你可以额外使用一张【杀】<li>角音：你跳过你的下个弃牌阶段 <li>徵音：结束阶段，你摸两张牌 <li>羽音：回合结束时，你可以令一名其他角色技能失效直到其回合结束。"
            },
            "mad": {
                name: "狂属性",
                info: "狂属性：当目标角色受到狂属性伤害后，获得等量层『出血』buff。"
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
                info: "中央区的牌即本回合进入弃牌堆的牌。 "
            },
            'cuijian': {
                name: "摧坚",
                info: "摧坚：拥有此标签的技能每回合限发动一次，触发时机为使用伤害类卡牌时，X为目标技能数量。"
            },
            'jishi': {
                name: "即时牌",
                info: "即时牌：指基本牌和普通锦囊牌。"
            },
            'caclu': {
                name: "算演",
                info: "算演：你利用你展示的四张牌的点数进行多次四则运算。若计算结果的值为24，则为成功，否则为算演失败。"
            },
            'truexuli': {
                name: "蓄力技",
                info: "蓄力技是一种特殊的技能。<li>1.描述中含有“蓄力技（X/Y）”。X为游戏开始时可获得的初始蓄力标记数量；Y为你可积累的蓄力标记上限。<li>2.发动蓄力技需要根据技能条件消耗蓄力标记。<li>3.当一名角色同时拥有多个蓄力技时，所有蓄力技消耗同样的蓄力标记，X和Y进行分别相加后生效。"
            }
        },
        help: function () {
            var str = ''
            for (var i in window.furry.introduce) {
                str += '<div style="margin:10px">' + window.furry.introduce[i].name + '</div><ul style="margin-top:0">' + window.furry.introduce[i].info + '</ul>'
            }
            return str
        },
        //获取文件路径下所有文件
        traverseFolder(dir, includeFolder, depth) {
            if (typeof dir == "undefined")
                throw new Error("You must give a Directory path");
            if (/\.\./.test(dir))
                throw new Error("Cannot parse \"..\" in Noname");
            if (!/^.+\/$/.test(dir)) dir = dir + "/";
            if (typeof includeFolder == "undefined") includeFolder = false;
            if (typeof depth != 'number') depth = Infinity;

            if (depth <= 0) return Promise.resolve([]);

            /**
             * 遍历用到的递归函数
             * 
             * @param {string[]} result - 储存各文件的数组
             * @param {string[]} records - 记录层级的数组
             * @param {Function} resolve - Promise的resolve函数
             */
            function content(result, records, resolve) {
                game.getFileList(dir + records.join("/"), (folders, files) => {
                    // 或许只有能被读取的目录才算是目录
                    if (includeFolder && records.length) result.add(records.join("/"));

                    for (const file of files) {
                        result.add(records.concat(file).join("/"));
                    }

                    let promises = new Array();
                    // @ts-ignore
                    if (records.length + 1 < depth)
                        for (const folder of folders)
                            promises.add(new Promise(resolve => content(result, records.concat(folder), resolve)));

                    Promise.all(promises).then(() => resolve(result));
                });
            }

            return new Promise(resolve => {
                // @ts-ignore
                if (window.cordova || window.require) {
                    content([], [], resolve);
                } else document.addEventListener('deviceready', function () {
                    content([], [], resolve);
                });
            });
        },
        getExtensionNode: function (name, waitms, times) {
            if (!waitms) waitms = 50;
            if (!times) times = 20;

            var menuBar_1;

            return new Promise(function (resolve, reject) {
                var interval = setInterval(function (resolve_1) {
                    if (!ui.menuContainer || !ui.menuContainer.firstElementChild)
                        return;
                    var menu = ui.menuContainer.firstElementChild;
                    var menuBar = menu.querySelector(".menu-tab");
                    if (!menuBar)
                        return;
                    clearInterval(interval);
                    menuBar_1 = menuBar;
                    resolve_1(menuBar);
                }, waitms, resolve);
            }).then(function () {
                return new Promise(function (resolve_2, reject) {
                    var extDivList = Array.from(menuBar_1.childNodes[4]._link.childNodes[0].childNodes);

                    var callback = function (i_1, waitms_1, resolve_3, reject_1) {
                        if (i_1 > times)
                            return reject_1(new Error("Cannot find the extension"));
                        var filterArray = extDivList.filter(function (div) {
                            return div.innerHTML == name;
                        });
                        if (!filterArray.length)
                            return setTimeout(function () {
                                callback(i_1 + 1, waitms_1, resolve_3, reject_1);
                            }, waitms_1);
                        var leftBar = filterArray[0]
                        if (typeof leftBar._initLink == 'function') leftBar._initLink()
                        var rightBar = leftBar.link
                        resolve_3([leftBar, rightBar]);
                    };

                    setTimeout(function () {
                        callback(1, waitms, resolve_2, reject);
                    }, waitms);
                });
            });
        },
        autoFrImport: function () {
            var sourceDir = 'extension/福瑞拓展/import';
            try {
                window.furry.traverseFolder(sourceDir, false).then(function (Files) {
                    var needToImport = Files.filter(function (i) {
                        var extname = i.split('/')[0]
                        return lib.config.extensions.includes(extname) !== -1 && lib.config['extension_' + extname + '_enable'];
                    });
                    var progressBG = ui.create.div(".progressBG", ui.window);
                    var progressBar = ui.create.div(progressBG);
                    var count = 0;
                    var total = needToImport.length;
                    var confirmationShown = false; // 添加一个标志变量
                    var doing = function () {
                        if (needToImport.length) {
                            var f = needToImport.shift();
                            var to = f.slice(0, f.lastIndexOf('/'));
                            var name = f.slice(f.lastIndexOf('/') + 1);
                            window.furry.copy(sourceDir + '/' + to, name, 'extension/' + to, function () {
                                window.furry.addProgress(progressBar, ++count, total);
                                doing();
                            });
                        } else {
                            if (!confirmationShown) {
                                confirmationShown = true;
                                setTimeout(function () {
                                    progressBG.style.opacity = "0";
                                    if (confirm("导入成功，点击重启")) {
                                        progressBG.remove();
                                        game.reload();
                                    } else {
                                        game.resume();
                                    }
                                }, 1000);
                            }
                        }
                    };
                    doing();
                });
            } catch (error) {
                console.error(error);
            }
        },
    };
}
export async function InitProgress() {
    if (typeof game.furryCreateProgress != 'function') {
        game.furryCreateProgress = (title, max, fileName, value) => {
            /** @type { progress } */
            // @ts-ignore
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
                borderRadius: '8px',
                overflow: 'hidden scroll'
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
            // @ts-ignore
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

            const progress = ui.create.node('progress.oafaProgress', container);
            progress.setAttribute('value', value || '0');
            progress.setAttribute('max', max);

            parent.getTitle = () => caption.innerText;
            parent.setTitle = title => caption.innerHTML = title;
            parent.getFileName = () => file.innerText;
            parent.setFileName = name => file.innerHTML = name;
            parent.getProgressValue = () => progress.value;
            parent.setProgressValue = value => progress.value = index.innerHTML = value;
            parent.getProgressMax = () => progress.max;
            parent.setProgressMax = max => progress.max = maxSpan.innerHTML = max;
            parent.autoSetFileNameFromArray = fileNameList => {
                if (fileNameList.length > 2) {
                    parent.setFileName(fileNameList.slice(0, 2).concat(`......等${fileNameList.length - 2}个文件`).join('<br/>'));
                } else if (fileNameList.length == 2) {
                    parent.setFileName(fileNameList.join('<br/>'));
                } else if (fileNameList.length == 1) {
                    parent.setFileName(fileNameList[0]);
                } else {
                    parent.setFileName('当前没有正在下载的文件');
                }
            };
            return parent;
        };
    }
}

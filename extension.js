game.import("extension", function (lib, game, ui, get, ai, _status) {
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
            'Buff': {
                name: 'Buff系统',
                info: `
                <li>Buff系统是一种特殊系统。
                <li>自然衰减：回合结束时，含有自然衰减的所有Buff会移去1层。
                <li>衰减：指的是以自然衰减的方式减少buff，如：你衰减5层某buff指你的某buff以自然衰减的方式依次减少5层（每次减少1层，减少5次）。
                <li>当你的描述为你减少5层Buff并视为自然衰减时，指直接移除5层Buff并视为自然衰减移除的（只触发1次自然衰减的技能）
                <li>附加：当你的某种Buff层数从0变为1及以上时，称为附加某种Buff
                <li>消解：当你的某种Buff层数减为0时，称为消解某种Buff
                <li>增加（获得）/减少（移除）：当你增加或减少某种Buff时，你的Buff层数+1/-1
                <li>调整至/增至/降至：指你将某种Buff层数改为/+/-至指定值
                <li>在Buff描述中的X，若未特殊说明均指Buff层数
                <li>上限：当你的Buff达到上限时，不会再继续增加，没有特殊说明的Buff为无上限
                <li>清除：指的是将你的Buff层数减为0（触发含有消解描述的技能）
                <li>增益/减益/中立：指的是Buff在一般情况下是获得收益还是获得损害
                `
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
                info: `<li>选择一张牌作为主将（若已有被注入的主将则作为副将并替换已有副将，与主将组成双将）。注入时能量不能相互冲突，目前的冲突列表为目前是：
                <li>光明：【黑暗】
                <li>黑暗：【光明,雷电】
                <li>火焰：【寒冰，潮汐】
                <li>潮汐：【火焰】
                <li>寒冰：【火焰】
                <li>自然：【金属，火焰】
                <li>飓风：【自然】
                `
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
            'moliji': {
                name: '耗魔技能',
                info: '若在技能描述中包含<span class="bluetext">①、②</span>等蓝色标记，表示此技能需要消耗1点、2点魔力值发动，以此类推。',
            },
            'youji': {
                name: '游击',
                info: '<li>游击与搏击一样，是你与目标角色的距离关系，即：目标角色在你的攻击范围内，而你不在目标角色的攻击范围内。'
            },
            'boji': {
                name: '搏击',
                info: '<li>搏击与游击一样，是你与目标角色的距离关系，即：目标角色在你的攻击范围内，且你也在目标角色的攻击范围内。'
            },
            'zhongshi': {
                name: "众势技",
                info: "<li>众势技是一类特殊的技能标签，拥有此标签的技能仅身份模式且你的身份为主公或反贼时可用。"
            },
            'qiyue': {
                name: '契约',
                info: "<li>签订契约：在指定位置召唤一个角色，该角色称你为“契主”，你称该角色为“契友”。"
            },
            'fenfa': {
                name: '奋发技',
                info: '<li>奋发技是一类特殊的技能标签，<li>奋发技后的括号，代表在当你的体力值处于该区间内时，此技能有效，否则此技能失效，<li>若括号内只有一个值，则代表单个点，如[2]代表[2,2]，<li>maxHp指代玩家最大体力值。'
            },
            'zhinang': {
                name: '智囊',
                info: '<li>智囊：一些武将的技能允许他们以一些方式获得专属锦囊，同时还会允许他们做出第二选择——智囊。<li>智囊为固定的三种通常牌库里有的普通锦囊。这些武将在获得专属锦囊时可以选择获取专属锦囊，或者获取智囊中的锦囊之一。<li>线下可由面杀玩家自行约定选取的三张锦囊，线上暂定为过河拆桥、无懈可击、无中生有。'
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
                info: "<li>谋弈是指双方有两个选择,然后各自选择一项同时公布,通过最终的结果判定成败。<li>谋弈补充：若选项后面的“()”中有内容，对方阻止这个选项的方式为执行对应操作（类似【奇正相生】）"
            },
            'zhizao': {
                name: '制造',
                info: '<li>打造：弃置选中的牌，从特定范围随机抽取5种不同的装备牌名，选择一张获得，花色与此牌相同。若没有说明，则点数随机（制造多张装备，则重复以上操作等量次）。<li>范围：OL蒲元锻造，所有打开的卡牌包。<li>制造的牌进入弃牌堆时，销毁之。'
            },
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
                info: "<li>宫音：摸牌阶段，你多摸两 张牌 <li>商音：出牌阶段，你可以额外使用一张【杀】<li>角音：你跳过你的下个弃牌阶段 <li>徵音：结束阶段，你摸两张牌 <li>羽音：回合结束时，你可以令一名其他角色技能失效直到其回合结束。"
            },
            "mad": {
                name: "狂属性",
                info: "<li>狂属性：当目标角色受到狂属性伤害后，获得等量层『出血』buff。"
            },
            'xuli': {
                name: "爆发技",
                info: "<li>爆发技：发动时可以增大黄色的数字。若如此做，红色数字于技能结算过程中变为原来的两倍。"
            },
            'found': {
                name: "发掘",
                info: '<li>发掘：若无特殊说明，你观看牌堆顶的三张牌并获得其中一张，然后将剩余的牌洗回牌堆。'
            },
            'found2': {
                name: "发现",
                info: "<li>发现：从随机展示的三张牌中选择一张，若无特殊说明则获得之"
            },
            'yunlvji': {
                name: "韵律技",
                info: "<li>韵律技是一种特殊的转化技，分为“平”和“仄”两种状态。游戏开始时，韵律技均处于“平”状态；满足“转韵”条件后，韵律技会转换到另一个状态，且重置技能发动次数。"
            },
            'center': {
                name: "中央区",
                info: "<li>中央区：当前回合本应进入弃牌堆的牌（例如使用的牌结算后,被弃置的牌等）首先均置于桌面中间,该区域称之为中央区。在每个回合结束时,统一再将中央区所有牌一起置入弃牌堆，简单来说，中央区的牌即本回合进入弃牌堆的牌。 "
            },
            'cuijian': {
                name: "摧坚",
                info: "<li>摧坚：拥有此标签的技能每回合限发动一次，触发时机为使用伤害类卡牌时，X为目标技能数量。"
            },
            'jishi': {
                name: "即时牌",
                info: "<li>即时牌：一般指基本牌和普通锦囊牌。"
            },
            'caclu': {
                name: "算演",
                info: "<li>算演：你利用你展示的四张牌的点数进行多次四则运算。若计算结果的值为24，则为成功，否则为算演失败。"
            },
            'truexuli': {
                name: "蓄力技",
                info: "<li>蓄力技是一种特殊的技能。<li>1.描述中含有“蓄力技（X/Y）”。X为游戏开始时可获得的初始蓄力标记数量；Y为你可积累的蓄力标记上限。<li>2.发动蓄力技需要根据技能条件消耗蓄力标记。<li>3.当一名角色同时拥有多个蓄力技时，所有蓄力技消耗同样的蓄力标记，X和Y进行分别相加后生效。"
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
    //------------------进度条样式----------------//
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
    return {
        name: "福瑞拓展",
        editable: false,
        content: function (config, pack) {
            if (!lib.furryStorage) lib.furryStorage = {}
            lib.skill.subplayer.charlotte = true
            lib.namePrefix.set('✡', {
                nature: 'thundermm',
            });
            //--------------------------修改标记----------------------------//
            for (var i in lib.FrBuff) {
                var name = 'Fr_Buff_' + i;
                lib.skill[name].intro.name = get.dialogIntro(i, 'buff')
            }
        },
        precontent: function (furryPack) {
            if (!get.is.object(window.OLUI_extAssets)) {
                window.OLUI_extAssets = {
                    playerGroup: {},
                    playerGroupCount: {},
                    playerName: {},
                    cardImage: {},
                    playerButtonGroup: {},
                    playerButtonHp: {}
                };
            }
            window.furry.traverseFolder('extension/福瑞拓展/image/card/OLUI', false)
                .then(files => {
                    var assets = {
                        // 玩家势力素材
                        playerGroup: {
                            // 势力图片素材
                            fr_g_dragon: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/group_fr_g_dragon.png',
                            fr_g_ji: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/group_fr_g_ji.png',
                        },
                        // 玩家势力对应的手牌数素材
                        playerGroupCount: {
                            // 势力对应的手牌数素材
                            fr_g_dragon: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/fr_g_dragon.png',
                            fr_g_ji: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/fr_g_ji.png',
                        },
                        // 扩展要添加的玩家势力名字横幅素材
                        playerName: {
                            // 势力横幅(其他人)
                            fr_g_dragon: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/general_name_bg_fr_g_dragon.png',
                            fr_g_ji: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/general_name_bg_fr_g_ji.png',
                            // 势力横幅(自己)
                            fr_g_dragon_s: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/general_name_bg_fr_g_dragon_s.png',
                            fr_g_ji_s: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/general_name_bg_fr_g_ji_s.png',
                        },
                        // 卡牌图片
                        cardImage: {

                        },
                        playerButtonGroup: {
                            fr_g_dragon: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/group_fr_g_dragon.png',
                            fr_g_ji: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/group_fr_g_ji.png',
                        },
                        playerButtonHp: {
                            fr_g_dragon: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/fr_g_dragon_hp.png',
                            fr_g_ji: lib.assetURL + 'extension/福瑞拓展/image/biaoqian/fr_g_ji_hp.png',
                        },
                    }
                    for (var i of files) {
                        var type = i.slice(0, i.lastIndexOf('/'))
                        var file = i.slice(i.lastIndexOf('/') + 1)
                        var name = file.slice(0, file.lastIndexOf('.'))
                        if (!assets.cardImage[name]) assets.cardImage[name] = {}
                        assets.cardImage[name][type] = lib.assetURL + 'extension/福瑞拓展/image/card/OLUI/' + i
                    }
                    throw (assets)
                })
                .catch(assets => {
                    for (var i in assets) {
                        Object.assign(window.OLUI_extAssets[i], assets[i]);
                    }
                })
            lib.onover.push(function (bool) {
                if (bool && lib.config.mode == 'boss') {
                    for (var i = 0; i < game.dead.length; i++) {
                        if (game.dead[i].name == 'fr_bosshars' && !game.frAchi.hasAchi('斩断纵丝', 'special')) game.frAchi.addProgress('斩断纵丝', 'special')
                        if (game.dead[i].name == 'fr_bossfaers' && !game.frAchi.hasAchi('打碎永恒', 'special')) game.frAchi.addProgress('打碎永恒', 'special')
                        if (game.dead[i].name == 'fr_bossmala' && !game.frAchi.hasAchi('屠神者', 'special')) game.frAchi.addProgress('屠神者', 'special')
                        if (game.dead[i].name == 'fr_bossoert' && !game.frAchi.hasAchi('踏破轮回', 'special')) game.frAchi.addProgress('踏破轮回', 'special')
                    }
                }
            })
            window.furry.getExtensionNode("福瑞拓展")
                .then(([leftBar, rightBar]) => {
                    const divElements = rightBar.getElementsByClassName('config')
                    let spanElement, thanksElement, activeKeys
                    for (let i = 0; i < divElements.length; i++) {
                        spanElement = divElements[i].querySelector('div#yiyan')
                        thanksElement = divElements[i].querySelector('div#thanks')
                        activeKeys = divElements[i].querySelector('div#active')
                        if (spanElement && thanksElement && activeKeys) {
                            break;
                        }
                    }
                    var keybutton = activeKeys.querySelector('button#activeKey')
                    keybutton.addEventListener(lib.config.touchscreen ? "touchend" : "click", function () {
                        lib.frActiveKeys.active(activeKeys.querySelector('input').value)
                        activeKeys.querySelector('input').value = ''
                    });
                    //---------------------------------------一言------------------------------------------//
                    fetch("https://v1.hitokoto.cn/")
                        .then((respond) => respond.json())
                        .then((hitokoto) => {
                            spanElement.innerHTML = '每日一言：<br><div style="background: none;">&nbsp&nbsp&nbsp&nbsp' + hitokoto.hitokoto + '</div><br><div style="display: flex; justify-content: flex-end; background: none;">———' + hitokoto.from + "&nbsp&nbsp</div>"
                        })
                        .catch((error) => {
                            const hitokoto = {
                                hitokoto: "您的网络或配置错误，无法获取一言内容。",
                                from: '钫酸酱',
                            }
                            spanElement.innerHTML = '每日一言：<br><div style="background: none;">&nbsp&nbsp&nbsp&nbsp' + hitokoto.hitokoto + '</div><br><div style="display: flex; justify-content: flex-end;background: none;">———' + hitokoto.from + "&nbsp&nbsp</div>"
                            console.error(error);
                        });
                    spanElement.style.border = 'double'
                    spanElement.style.borderRadius = '3px'
                    spanElement.style.width = '100%'
                    leftBar.innerHTML = "<div id='furry' style='animation: flicker 1.5s infinite alternate;'>福瑞拓展</div>"
                    leftBar.setBackgroundImage('extension/福瑞拓展/image/background/wall.png')
                    //鸣谢清单
                    var box = document.createElement('div');
                    let arrow = thanksElement.childNodes[1]
                    box.style.display = 'none';
                    box.style.textAlign = 'left'
                    box.style.border = '1px solid white';
                    window.furry.traverseFolder('extension/福瑞拓展/image/acknowledgments', false, 1)
                        .then(fonlders => {
                            for (var i of fonlders) {
                                box.innerHTML += "<li><img style='width:40px;height:40px;border-radius:50%;' src=" + lib.assetURL + "extension/福瑞拓展/image/acknowledgments/" + i + "></img>" + i.slice(0, -4);
                            }
                        })
                        .catch(error => console.log(error))
                    thanksElement.appendChild(box);
                    thanksElement.addEventListener(lib.config.touchscreen ? "touchend" : "click", function () {
                        if (arrow.style.transform === 'rotate(90deg)') {
                            arrow.style.transform = '';
                            box.style.display = 'none';
                        } else {
                            arrow.style.transform = 'rotate(90deg)';
                            box.style.display = 'block';
                        }
                    });
                    box.addEventListener(lib.config.touchscreen ? "touchend" : "click", function (e) {
                        e.stopPropagation(); // 阻止事件冒泡
                    });
                })
                .catch(error => {
                    console.error(error);
                });
            lib.arenaReady.push(function () {
                setTimeout(function () {
                    window.furry.require(lib.assetURL + 'extension/福瑞拓展/Lib/math.js')
                    window.furry.require(lib.assetURL + 'extension/福瑞拓展/Lib/md5.min.js')
                }, 1000);
                //-------------------------------狂杀与属性--------------------------//
                game.addNature('frmad', '狂', {
                    linked: true,
                    order: 31,
                    lineColor: 'red'
                })
                if (lib.config.extension_十周年UI_enable) {
                    lib.nature.set('frmad', 31)
                    lib.linked.add('frmad')
                    lib.card.sha.nature.add('frmad')
                }
                //---------------------------------------设置：武将评级------------------------------------------//
                for (let pack of ["furryPack"]) {
                    for (let name in lib.characterPack[pack]) {
                        let bool = ['junk', 'common', 'rare', 'epic', 'legend'].some(function (rarity) {
                            if (lib.characterPack[pack][name][4].includes(rarity)) {
                                if (rarity != "common") lib.rank.rarity[rarity].add(name);
                                return true;
                            }
                        });
                        if (!bool) console.log('Rarity Error: Cannot read the rarity of ' + name + ' in ' + pack);
                    }
                }
                if (lib.config.extension_福瑞拓展_furry_onlineUpdate2) {
                    window.furry.update2()
                };
                //---------------------------------------初始化势力------------------------------------------//
                if (lib.config.extensions && lib.config.extensions.includes('无名补丁') && lib.config['extension_无名补丁_enable']) {
                    setTimeout(() => {
                        lib.groupnature.fr_g_dragon = 'fr_g_dragon'
                        lib.groupnature.fr_g_ji = 'fr_g_ji'
                    }, 1000)
                }
                //--------------------------------------千幻提示------------------------------------------//
                if (lib.config.extension_福瑞拓展_frSkin && !lib.config.extension_千幻聆音_enable) {
                    alert('福瑞拓展提示：检测到您没有开启千幻扩展，将无法使用武将皮肤功能。')
                    game.saveConfig('extension_福瑞拓展_frSkin', false);
                }
                //------------------------------------------设置：背景音乐------------------------------------------//
                if (lib.config.extension_福瑞拓展_Background_Music && lib.config.extension_福瑞拓展_Background_Music != "1") {
                    game.frplayBackgroundMusic();
                    ui.backgroundMusic.addEventListener('ended', game.frplayBackgroundMusic);
                };
                //------------------------------------------设置：背景图片------------------------------------------//
                if (lib.config.extension_福瑞拓展_Background_Picture && lib.config.extension_福瑞拓展_Background_Picture != "1") {
                    game.frBackground_Picture();
                };
            })
            //体力乘算
            if (lib.config.extension_福瑞拓展_hp_mutiply !== 1) {
                lib.arenaReady.push(function () {
                    var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    if (!list.includes(lib.config.extension_福瑞拓展_hp_mutiply)) {
                        game.saveConfig('extension_福瑞拓展_hp_mutiply', 1)
                        lib.config.extension_福瑞拓展_hp_mutiply = 1
                    }
                    for (var i in lib.character) {
                        if (typeof lib.character[i][2] == 'number') {
                            lib.character[i][2] *= lib.config.extension_福瑞拓展_hp_mutiply;
                        } else if (typeof lib.character[i][2] == 'string') {
                            var list = lib.character[i][2].split('/');
                            var hp1 = 2 * Number(list[0]);
                            var hpx = hp1
                            if (list.length >= 2) {
                                var hp2 = 2 * Number(list[1]);
                                hpx += '/' + hp2
                            }
                            if (list.length >= 3) {
                                var hp3 = Number(list[2]);
                                hpx += '/' + hp3
                            }
                            lib.character[i][2] = hpx;
                        }
                    }
                });
                if (get.mode() == 'guozhan') {
                    game.chooseCharacter = function () {
                        var next = game.createEvent('chooseCharacter', false);
                        next.showConfig = true;
                        next.addPlayer = true;
                        next.ai = function (player, list, back) {
                            if (_status.brawl && _status.brawl.chooseCharacterAi) {
                                if (_status.brawl.chooseCharacterAi(player, list, back) !== false) {
                                    return;
                                }
                            }
                            var filterChoice = function (name1, name2) {
                                if (get.is.double(name1)) return false;
                                var group1 = lib.character[name1][1];
                                var group2 = lib.character[name2][1];
                                if (group1 == 'ye') return group2 != 'ye';
                                var double = get.is.double(name2, true);
                                if (double) return double.includes(group1);
                                return group1 == group2;
                            };
                            for (var i = 0; i < list.length - 1; i++) {
                                for (var j = i + 1; j < list.length; j++) {
                                    if (filterChoice(list[i], list[j]) || filterChoice(list[j], list[i])) {
                                        var mainx = list[i];
                                        var vicex = list[j];
                                        if (!filterChoice(mainx, vicex) || (filterChoice(vicex, mainx) && get.guozhanReverse(mainx, vicex))) {
                                            mainx = list[j];
                                            vicex = list[i];
                                        }
                                        player.init(mainx, vicex, false);
                                        if (back) {
                                            list.remove(player.name1);
                                            list.remove(player.name2);
                                            for (var i = 0; i < list.length; i++) {
                                                back.push(list[i]);
                                            }
                                        }
                                        return;
                                    }
                                }
                            }
                        }
                        next.setContent(function () {
                            "step 0"
                            ui.arena.classList.add('choose-character');
                            var addSetting = function (dialog) {
                                dialog.add('选择座位').classList.add('add-setting');
                                var seats = document.createElement('table');
                                seats.classList.add('add-setting');
                                seats.style.margin = '0';
                                seats.style.width = '100%';
                                seats.style.position = 'relative';
                                for (var i = 1; i <= game.players.length; i++) {
                                    var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                                    td.innerHTML = '<span>' + get.cnNumber(i, true) + '</span>';
                                    td.link = i - 1;
                                    seats.appendChild(td);
                                    td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                                        if (_status.dragged) return;
                                        if (_status.justdragged) return;
                                        if (_status.cheat_seat) {
                                            _status.cheat_seat.classList.remove('bluebg');
                                            if (_status.cheat_seat == this) {
                                                delete _status.cheat_seat;
                                                return;
                                            }
                                        }
                                        this.classList.add('bluebg');
                                        _status.cheat_seat = this;
                                    });
                                }
                                dialog.content.appendChild(seats);
                                if (game.me == game.zhu) {
                                    seats.previousSibling.style.display = 'none';
                                    seats.style.display = 'none';
                                }

                                dialog.add(ui.create.div('.placeholder.add-setting'));
                                dialog.add(ui.create.div('.placeholder.add-setting'));
                                if (get.is.phoneLayout()) dialog.add(ui.create.div('.placeholder.add-setting'));
                            };
                            var removeSetting = function () {
                                var dialog = _status.event.dialog;
                                if (dialog) {
                                    dialog.style.height = '';
                                    delete dialog._scrollset;
                                    var list = Array.from(dialog.querySelectorAll('.add-setting'));
                                    while (list.length) {
                                        list.shift().remove();
                                    }
                                    ui.update();
                                }
                            };
                            event.addSetting = addSetting;
                            event.removeSetting = removeSetting;

                            var chosen = lib.config.continue_name || [];
                            game.saveConfig('continue_name');
                            event.chosen = chosen;

                            var i;
                            event.list = [];
                            for (i in lib.character) {
                                if (i.indexOf('gz_shibing') == 0) continue;
                                if (chosen.includes(i)) continue;
                                if (lib.filter.characterDisabled(i)) continue;
                                if (get.config('onlyguozhan')) {
                                    if (!lib.characterPack.mode_guozhan[i]) continue;
                                    if (get.is.jun(i)) continue;
                                }
                                if (lib.character[i][4].includes('hiddenSkill')) continue;
                                //if(lib.character[i][2]==6||lib.character[i][2]==8||lib.character[i][2]==10)
                                event.list.push(i);
                            }
                            _status.characterlist = event.list.slice(0);
                            _status.yeidentity = [];
                            if (_status.brawl && _status.brawl.chooseCharacterFilter) {
                                event.list = _status.brawl.chooseCharacterFilter(event.list);
                            }
                            event.list.randomSort();
                            // var list=event.list.splice(0,parseInt(get.config('choice_num')));
                            var list;
                            if (_status.brawl && _status.brawl.chooseCharacter) {
                                list = _status.brawl.chooseCharacter(event.list, game.me);
                            }
                            else {
                                list = game.getCharacterChoice(event.list, parseInt(get.config('choice_num')));
                            }
                            if (_status.auto) {
                                event.ai(game.me, list);
                                lib.init.onfree();
                            }
                            else if (chosen.length) {
                                game.me.init(chosen[0], chosen[1], false);
                                lib.init.onfree();
                            }
                            else {
                                var dialog = ui.create.dialog('选择角色', 'hidden', [list, 'character']);
                                if (!_status.brawl || !_status.brawl.noAddSetting) {
                                    if (get.config('change_identity')) {
                                        addSetting(dialog);
                                    }
                                }
                                var next = game.me.chooseButton(dialog, true, 2).set('onfree', true);
                                next.filterButton = function (button) {
                                    if (ui.dialog.buttons.length <= 10) {
                                        for (var i = 0; i < ui.dialog.buttons.length; i++) {
                                            if (ui.dialog.buttons[i] != button) {
                                                if (lib.element.player.perfectPair.call({
                                                    name1: button.link, name2: ui.dialog.buttons[i].link
                                                })) {
                                                    button.classList.add('glow2');
                                                }
                                            }
                                        }
                                    }
                                    if (lib.character[button.link][4].includes('hiddenSkill')) return false;
                                    if (ui.selected.buttons.length == 0) {
                                        if (get.is.double(button.link)) return false;
                                        if (lib.character[button.link][1] == 'ye') return true;
                                        for (var i = 0; i < ui.dialog.buttons.length; i++) {
                                            var double = get.is.double(ui.dialog.buttons[i].link, true);
                                            if (ui.dialog.buttons[i] != button && (lib.character[button.link][1] == lib.character[ui.dialog.buttons[i].link][1] || double && double.includes(lib.character[button.link][1]))) {
                                                return true;
                                            }
                                        }
                                        return false;
                                    };
                                    if (!lib.character[button.link] || lib.character[button.link][1] == 'ye') return false;
                                    if (get.is.double(ui.selected.buttons[0].link)) return false;
                                    if (lib.character[ui.selected.buttons[0].link][1] == 'ye') return true;
                                    if (get.is.double(button.link)) return get.is.double(button.link, true).includes(lib.character[ui.selected.buttons[0].link][1]);
                                    return (lib.character[button.link][1] == lib.character[ui.selected.buttons[0].link][1]);
                                };
                                next.switchToAuto = function () {
                                    event.ai(game.me, list);
                                    ui.arena.classList.remove('selecting');
                                };
                                var createCharacterDialog = function () {
                                    event.dialogxx = ui.create.characterDialog('heightset', function (i) {
                                        if (i.indexOf('gz_shibing') == 0) return true;
                                        if (get.config('onlyguozhan')) {
                                            if (!lib.characterPack.mode_guozhan[i]) return true;
                                            if (get.is.jun(i)) return true;
                                        }
                                    }, get.config('onlyguozhanexpand') ? 'expandall' : undefined, get.config('onlyguozhan') ? 'onlypack:mode_guozhan' : undefined);
                                    if (ui.cheat2) {
                                        ui.cheat2.animate('controlpressdownx', 500);
                                        ui.cheat2.classList.remove('disabled');
                                    }
                                };
                                if (lib.onfree) {
                                    lib.onfree.push(createCharacterDialog);
                                }
                                else {
                                    createCharacterDialog();
                                }
                                ui.create.cheat2 = function () {
                                    ui.cheat2 = ui.create.control('自由选将', function () {
                                        if (this.dialog == _status.event.dialog) {
                                            if (game.changeCoin) {
                                                game.changeCoin(50);
                                            }
                                            this.dialog.close();
                                            _status.event.dialog = this.backup;
                                            this.backup.open();
                                            delete this.backup;
                                            game.uncheck();
                                            game.check();
                                            if (ui.cheat) {
                                                ui.cheat.animate('controlpressdownx', 500);
                                                ui.cheat.classList.remove('disabled');
                                            }
                                        }
                                        else {
                                            if (game.changeCoin) {
                                                game.changeCoin(-10);
                                            }
                                            this.backup = _status.event.dialog;
                                            _status.event.dialog.close();
                                            _status.event.dialog = _status.event.parent.dialogxx;
                                            this.dialog = _status.event.dialog;
                                            this.dialog.open();
                                            game.uncheck();
                                            game.check();
                                            if (ui.cheat) {
                                                ui.cheat.classList.add('disabled');
                                            }
                                        }
                                    });
                                    if (lib.onfree) {
                                        ui.cheat2.classList.add('disabled');
                                    }
                                }
                                ui.create.cheat = function () {
                                    _status.createControl = ui.cheat2;
                                    ui.cheat = ui.create.control('更换', function () {
                                        if (ui.cheat2 && ui.cheat2.dialog == _status.event.dialog) {
                                            return;
                                        }
                                        if (game.changeCoin) {
                                            game.changeCoin(-3);
                                        }
                                        event.list = event.list.concat(list);
                                        event.list.randomSort();
                                        // list=event.list.splice(0,parseInt(get.config('choice_num')));
                                        list = game.getCharacterChoice(event.list, parseInt(get.config('choice_num')));
                                        var buttons = ui.create.div('.buttons');
                                        var node = _status.event.dialog.buttons[0].parentNode;
                                        _status.event.dialog.buttons = ui.create.buttons(list, 'character', buttons);
                                        _status.event.dialog.content.insertBefore(buttons, node);
                                        buttons.animate('start');
                                        node.remove();
                                        game.uncheck();
                                        game.check();
                                    });
                                    delete _status.createControl;
                                }
                                if (!_status.brawl || !_status.brawl.chooseCharacterFixed) {
                                    if (!ui.cheat && get.config('change_choice'))
                                        ui.create.cheat();
                                    if (!ui.cheat2 && get.config('free_choose'))
                                        ui.create.cheat2();
                                }
                            }
                            "step 1"
                            if (ui.cheat) {
                                ui.cheat.close();
                                delete ui.cheat;
                            }
                            if (ui.cheat2) {
                                ui.cheat2.close();
                                delete ui.cheat2;
                            }
                            if (result.buttons) {
                                game.me.init(result.buttons[0].link, result.buttons[1].link, false);
                                game.addRecentCharacter(result.buttons[0].link, result.buttons[1].link);
                            }
                            // game.me.setIdentity(game.me.group);
                            event.list.remove(game.me.name1);
                            event.list.remove(game.me.name2);
                            for (var i = 0; i < game.players.length; i++) {
                                if (game.players[i] != game.me) {
                                    event.ai(game.players[i], game.getCharacterChoice(event.list, parseInt(get.config('choice_num'))), event.list);
                                }
                            }
                            for (var i = 0; i < game.players.length; i++) {
                                game.players[i].classList.add('unseen');
                                game.players[i].classList.add('unseen2');
                                _status.characterlist.remove(game.players[i].name);
                                _status.characterlist.remove(game.players[i].name2);
                                if (game.players[i] != game.me) {
                                    game.players[i].node.identity.firstChild.innerHTML = '猜';
                                    game.players[i].node.identity.dataset.color = 'unknown';
                                    game.players[i].node.identity.classList.add('guessing');
                                }
                                game.players[i].hiddenSkills = lib.character[game.players[i].name1][3].slice(0);
                                var hiddenSkills2 = lib.character[game.players[i].name2][3];
                                for (var j = 0; j < hiddenSkills2.length; j++) {
                                    game.players[i].hiddenSkills.add(hiddenSkills2[j]);
                                }
                                for (var j = 0; j < game.players[i].hiddenSkills.length; j++) {
                                    if (!lib.skill[game.players[i].hiddenSkills[j]]) {
                                        game.players[i].hiddenSkills.splice(j--, 1);
                                    }
                                }
                                game.players[i].group = 'unknown';
                                game.players[i].sex = 'unknown';
                                game.players[i].name1 = game.players[i].name;
                                game.players[i].name = 'unknown';
                                game.players[i].identity = 'unknown';
                                game.players[i].node.name.show();
                                game.players[i].node.name2.show();
                                game.players[i]._group = lib.character[game.players[i].name1][1];
                                for (var j = 0; j < game.players[i].hiddenSkills.length; j++) {
                                    game.players[i].addSkillTrigger(game.players[i].hiddenSkills[j], true);
                                }
                            }
                            setTimeout(function () {
                                ui.arena.classList.remove('choose-character');
                            }, 500);
                        });
                    };
                }
            }
            //---------------------------------------设置：检测无名杀版本------------------------------------------//
            get.compareVersion = function (a, b) {
                if (!a) a = "0.0.0";
                if (!b) b = lib.version;
                var arr1 = a.split(".");
                var arr2 = b.split(".");
                for (var i = 0; i < Math.min(arr1.length, arr2.length); i++) {
                    var num1 = parseInt(arr1[i]);
                    var num2 = parseInt(arr2[i]);
                    if (num1 > num2) return 1;
                    if (num1 < num2) return -1;
                }
                if (arr1.length > arr2.length) {
                    return 1;
                }
                else if (arr1.length < arr2.length) {
                    return -1;
                }
                return 0;
            };
            var noname_versionx = "1.10.4";
            if (lib.version && !lib.config.furryNotMetionNonameVersion) {
                if (get.compareVersion(noname_versionx) > 0) {
                    var ret = confirm("当前无名杀版本" + lib.version + "落后于【福瑞拓展】最低支持版本1.10.4，请尽快更新，点击确定关闭本扩展");
                    if (!ret) {
                        alert("请确认你明白点击此选项导致的后果");
                        alert("由游戏版本过低导致任何问题本扩展均不负责");
                        game.saveConfig('furryNotMetionNonameVersion', true);
                    }
                    else {
                        game.saveConfig('extension_福瑞拓展_enable', false);
                        game.reload();
                    }
                }
            }
            //------------------------------------------设置：福瑞乱斗------------------------------------------//
            if (lib.config.extension_福瑞拓展_ban_ai) {
                var savedFilter = lib.filter.characterDisabled;
                lib.filter.characterDisabled = function (i, libCharacter) {
                    if (i && i.indexOf('fr_') != 0) {
                        return true;
                    }
                    return savedFilter(i, libCharacter);
                };
            }
            //------------------------------------------设置：AI禁将------------------------------------------//
            if (lib.config.extension_福瑞拓展_ban_ai2) {
                var savedFilter = lib.filter.characterDisabled;
                lib.filter.characterDisabled = function (i, libCharacter) {
                    if (i && i.indexOf('fr_') == 0) {
                        return true;
                    }
                    return savedFilter(i, libCharacter);
                };
            }
            //---------------------------------------自动开启武将------------------------------------------//
            if (!lib.config.extension_福瑞拓展_autoOpenPack) {
                var Packs = ['furryPack', 'furryBoss', 'furryGZPack']
                var unloadPacks = Packs.filter(i => !lib.config.characters.includes(i))
                for (var i = 0; i < unloadPacks.length; i++) {
                    lib.config.characters.push(unloadPacks[i])
                }
                game.saveConfig('characters', lib.config.characters)
                game.saveConfig('extension_福瑞拓展_autoOpenPack', true)
            }
            //---------------------------------------设置：背景图片------------------------------------------//
            game.frBackground_Picture = function () {
                var temp = lib.config['extension_福瑞拓展_Background_Picture'];
                if (temp == 'auto') {
                    var list = [
                        'picture1',
                    ];
                    if (_status.frBackground_Picture) list.remove(_status.frBackground_Picture);
                    temp = list.randomGet();
                }
                _status.frBackground_Picture = temp;
                if (temp !== '1') {
                    game.broadcastAll() + ui.background.setBackgroundImage("extension/福瑞拓展/image/background/" + temp + ".jpg");
                } else {
                    game.broadcastAll() + ui.background.setBackgroundImage('image/background/' + lib.config.image_background + '.jpg');
                }
                var item = lib.config['extension_福瑞拓展_Background_Picture'];
                if (item != "auto") {
                    if (_status.Background_Picture_timeout) {
                        clearTimeout(_status.Background_Picture_timeout);
                    };
                } else if (item == "auto") {
                    var autotime = lib.config['extension_福瑞拓展_Background_Picture_auto'];

                    var Timeout = autotime ? parseInt(autotime) : 30000;

                    ///////////////////////////////////////////////////////
                    var Timeout2 = _status.Background_Picture_Timeout2;
                    if (_status.Background_Picture_timeout && Timeout2 && Timeout2 != Timeout) {
                        clearTimeout(_status.Background_Picture_timeout);
                    };
                    /////////////////////////////////////////////////
                    _status.Background_Picture_timeout = setTimeout(function () {
                        game.frBackground_Picture();
                    }, Timeout); /*Timeout*/
                    _status.Background_Picture_Timeout2 = Timeout;
                };
            };
            //此处内容由钫酸酱制作，若有需要请联系作者...
            game.loadJsonFromFile = function (filePath, callback, targetObject) {
                // 默认参数处理
                if (!targetObject) {
                    targetObject = Array.isArray(targetObject) ? [] : {};
                }

                // 参数校验
                if (typeof filePath !== 'string' || typeof callback !== 'function') {
                    throw new Error('无效的参数');
                }

                // 读取配置文件
                game.readFile(filePath, function (data) {
                    try {
                        // 解析配置文件内容
                        var isBuffer = data instanceof ArrayBuffer;
                        var config;
                        if (isBuffer) {
                            var decoder = new TextDecoder("UTF-8");
                            var decodedData = decoder.decode(data);
                            config = JSON.parse(decodedData);
                        } else {
                            config = JSON.parse(data);
                        }

                        // 合并配置到目标对象
                        if (Array.isArray(config)) {
                            if (Array.isArray(targetObject)) {
                                targetObject.push.apply(targetObject, config);
                            }
                        } else {
                            for (var key in config) {
                                if (config.hasOwnProperty(key)) {
                                    targetObject[key] = config[key];
                                }
                            }
                        }

                        callback(null, targetObject);
                    } catch (err) {
                        callback('无法解析 JSON 文件', null);
                    }
                }, function (err) {
                    callback('无法读取 JSON 文件', null);
                });
            };
            //---------------------------------------设置：背景音乐------------------------------------------//
            game.frplayBackgroundMusic = function () {
                //if(lib.config.background_music=='music_off'){
                //ui.backgroundMusic.src='';
                //}
                //ui.backgroundMusic.autoplay=true;
                var temp = lib.config.extension_福瑞拓展_Background_Music;
                if (temp == '0') {
                    temp = Math.floor(2 + Math.random() * 10); //2加0到29
                    //生成一个范围2到10的整数
                    temp = temp.toString();
                    //转为字符串
                };
                ui.backgroundMusic.pause();
                var item = {
                    "2": "furry_bgm_tavern.mp3",
                    "3": "furry_bgm_BattleAgainstATrueHero.mp3",
                    "4": "furry_bgm_MySunset.mp3",
                    "5": "furry_bgm_FarOut.mp3",
                    "6": "furry_bgm_BeethovenVirus.mp3",
                    "7": "furry_bgm_MainTitle.mp3",
                    "8": "furry_bgm_存亡之战.mp3",
                    "9": "furry_bgm_ukigumo.mp3",
                    "10": "furry_bgm_BOSS BATTLE：BIG ARMS.mp3",
                };
                if (item[temp]) {
                    ui.backgroundMusic.src = lib.assetURL + 'extension/福瑞拓展/audio/bgm/' + item[temp];
                } else {
                    game.playBackgroundMusic();
                    ui.backgroundMusic.addEventListener('ended', game.playBackgroundMusic);
                }
            }
            //------------------------------------------载入css------------------------------------------//
            var cssList = ['extension', 'mainPage', 'achievement', 'drama']
            for (var i of cssList) {
                lib.init.css(lib.assetURL + 'extension/福瑞拓展/css', i);
            }
            //------------------------------------------设置：成就系统------------------------------------------//
            window.openfrAchievement = function () {
                if (game.frAchi) {
                    game.frAchi.openAchievementMainPage();
                    return;
                } else {
                    alert("发生了点小问题，您可以重新载入本扩展试试。");
                }
            };
            //成就系统
            lib.init.js(lib.assetURL + 'extension/福瑞拓展/asset', 'furry_achievement', function () {
                lib.arenaReady.push(function () {
                    ui.create.system("福瑞成就", function () {
                        if (typeof window.openfrAchievement == 'function') {
                            window.openfrAchievement();
                        } else {
                            alert("错误：您似乎没有正常导入福瑞拓展扩展文件");
                        }
                    }, true);
                    try {
                        game.frAchi.init();
                        game.frAchi.loadFromFile()
                    } catch (e) {
                        alert("错误：成就初始化失败");
                    }
                });
            }, function () {
                alert("错误：成就导入失败");
            });
            //------------------------------------------自定义game函数------------------------------------------//
            game.frGetQhlySkin = function (name) {
                if (game.qhly_getSkin) {
                    return game.qhly_getSkin(name);
                }
                return null;
            };

            //------------------------------------------自定义get函数------------------------------------------//
            get.FrskillTips = function (tipname, id) {
                const frtip = ui.create.div('.Fr-frtips', document.body);
                var isPhone = /mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent);
                frtip.style.zIndex = 998;
                const skilltip = ui.create.div('.Fr-skilltip', frtip);
                skilltip.innerHTML = tipname;
                var herf = document.getElementById(id);
                if (herf) {
                    var left = herf.getBoundingClientRect().left;
                    if (isPhone) left += herf.offsetParent.offsetLeft;
                    left += document.body.offsetWidth * 0.15;
                    skilltip.style.left = left + 'px';
                    skilltip.style.top = (herf.getBoundingClientRect().top + 30) + 'px';
                }
                frtip.listen(function (e) {
                    e.stopPropagation();
                    this.remove();
                })
            };
            get.frIntroduce = function (name, str, type) {
                var temp = (Math.random() * 9 + 1) * 100000
                if (!type) type = 'game'
                if (!str || str == '') {
                    if (type == 'game') {
                        let str1 = window.furry.introduce[name].name;
                        let str2 = window.furry.introduce[name].info;
                        let link = "<a id='" + temp + "' style='color:unset' href=\"javascript:get.FrskillTips('" + str2 + "','" + temp + "');\">" + str1 + "※</a>";
                        return link;
                    } else {
                        let str1 = window.furry[type + 'Introduce'][name].name;
                        let str2 = window.furry[type + 'Introduce'][name].info;
                        let link = "<a id='" + temp + "' style='color:unset' href=\"javascript:get.FrskillTips('" + str2 + "','" + temp + "');\">" + str1 + "※</a>";
                        return link;
                    }
                } else {
                    let link = "<a id='" + temp + "' style='color:unset' href=\"javascript:get.FrskillTips('" + str + "','" + temp + "');\">" + name + "※</a>";
                    return link;
                }
            }
            //------------------------------------------自定义window函数------------------------------------------//
            window.furryIntroduce = function (name, type) {
                if (!type) {
                    window.furryOpenDialog("概念解释：" + window.furry.introduce[name].name, null, window.furry.introduce[name].info);
                } else if (type = 'buff') {
                    window.furryOpenDialog("Buff介绍：" + get.FrBuffIntro(name).name, "extension/福瑞拓展/image/Buff/" + name + ".png", get.FrBuffIntro(name).content);
                }
            };
            get.dialogIntro = function (name) {
                let temp = (Math.random() * 9 + 1) * 100000
                let link = "<a id='" + temp + "' style='color:#FF0000' href=\"javascript:furryIntroduce('" + name + "','buff');\">『" + get.FrBuffIntro(name).name + "』</a>"
                return link
            }
            window.furryOpenDialog = function (title, icon, content) {
                if (!title) title = "";
                if (!content) content = "";
                if (!window.furryCurrentDialogs) {
                    window.furryCurrentDialogs = [];
                }

                // 创建覆盖层
                var overlay = ui.create.div('.furry-dialog-overlay', document.body);
                overlay.addEventListener(lib.config.touchscreen ? "touchend" : "click", function (e) {
                    e.stopPropagation(); // 阻止事件冒泡
                });
                overlay.style.zIndex = '98'
                overlay.style.width = '100%'
                overlay.style.height = '100%'

                var dialog = ui.create.div('.furry-dialog', document.body);
                dialog.style.zIndex = '99'
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
                    dialog.remove();
                    overlay.remove(); // 关闭对话框时同时移除覆盖层
                });

                return dialog;
            };
            //------------------------------------------武将包------------------------------------------//
            if (furryPack.enable) {
                //------------------------------------------载入初始js------------------------------------------//
                var JsForExt = ["functions.js", "buffs.js", "furry_mode.js", "cards.js", "character.js", "animation.js", "boss.js", "drama.js", "functions.js", "globalSkill.js", "guozhan.js", "mp.js", "shop.js", "skin.js", "update.js", 'story.js', 'activeKeys.js']
                lib.init.jsForExtension(lib.assetURL + 'extension/福瑞拓展/asset/', JsForExt.map(i => i.split('.')[0]))
                //定义势力
                game.addGroup('fr_g_dragon', '龙', {
                    color: 'black',
                    image: 'ext:福瑞拓展/image/group/name_fr_g_dragon.png'
                })
                game.addGroup('fr_g_ji', '机', {
                    color: 'purple',
                    image: 'ext:福瑞拓展/image/group/name_fr_g_ji.png'
                })
                lib.config.all.characters.push('furryPack');
                lib.translate['furryPack_character_config'] = "<img style='width:100px' src=" + lib.assetURL + "extension/福瑞拓展/image/others/title.png>";// 包名翻译
                //卡包（手牌）
                lib.translate['furryCard_card_config'] = '福瑞卡牌';
                lib.config.all.cards.push('furryCard');
            }
        },
        config: {
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
        }, help: {
            '福瑞拓展': (
                window.furry.help()
            ),
        }, package: {
            character: {
                character: {
                },
                translate: {
                },
            },
            card: {
                card: {
                },
                translate: {
                },
                list: [],
            },
            skill: {
                skill: {
                },
                translate: {
                },
            },
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
            version: "3.0.6",
        },
        files: {
            "character": [],
            "card": [],
            "skill": [],
        },
    }
})

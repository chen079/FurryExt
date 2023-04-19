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
    //------------------进度条样式----------------//
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
            //------------------设置可拖动----------------//
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
        editable: false,
        content: function (config, pack) {
            //---------------------------------------初始化势力------------------------------------------//
            lib.arenaReady.push(() => {
                if (lib.config.extensions && lib.config.extensions.contains('无名补丁') && lib.config['extension_无名补丁_enable']) {
                    setTimeout(() => {
                        lib.groupnature.fr_g_dragon = 'fr_g_dragon'
                        lib.groupnature.fr_g_ji = 'fr_g_ji'
                    }, 1000)
                }
            })
            //---------------------------------------更新说明------------------------------------------//
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
                        '/Character/',
                        '/redoCharacter/',
                        '/Card/',
                        '修正nulia点击取消依然失去体力的bug',
                        '修正了祭蹈在人少时的bug',
                        'tails新增翻面效果',
                        '修改诸多技能描述',
                        '新增成就系统——未完成',
                        '继续修复bugs',
                        '修正了 tails的部分错误',
                        '新卡牌：鸣鸿龙雀',
                        '新卡牌：影夜项链',
                        '为所有卡牌增加手杀版本美化',
                        '鸣谢清单新增一堆人',
                        '修复低版本无名杀无法运行的bug',
                        '修正实验模式的bug',
                    ];
                    //更新武将
                    var Furry_players = ['fr_derk', 'fr_crow', 'fr_zhan'];
                    var Furry_redoplayers = ['fr_tails', 'fr_yinhu'];
                    //更新卡牌
                    var Furry_cards = ['fr_equip1_mhlq', 'fr_equip2_yyxl'];
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
            //---------------------------------------属性效果------------------------------------------//
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
            //---------------------------------------技能作弊------------------------------------------//
            lib.skill._xuanshi_item = {
                trigger: {
                    global: "gameStart",
                },
                forced: true,
                silent: true,
                filter: function (event, player) {
                    return player == game.me;
                },
                content: function () {
                    var u = lib.config.extension_福瑞拓展_xuanshi;
                    if (u == 2) {
                        player.addSkill('xuanshi');
                    }
                    player.update();
                },
            }
            //---------------------------------------自定义函数：选择数量------------------------------------------//
            lib.element.player.chooseNumber = function chooseNumber(min, max, ...options) {
                let next = game.createEvent("chooseNumber");
                let begin, prompt, prompt2, transform = {}, forced, filter;

                for (const item of options) {
                    if (typeof item === "number") {
                        begin = item;
                    }
                    else if (typeof item === "string") {
                        if (!prompt) prompt = item;
                        else if (!prompt2) prompt2 = item;
                    }
                    else if (typeof item === "object") {
                        transform = item;
                    }
                    else if (typeof item === "boolean") {
                        forced = item;
                    }
                    else if (typeof item === "function") {
                        filter = item;
                    }
                }

                if (!min || !max) return;
                if (min == max) return;
                [min, max] = [Math.min(min, max), Math.max(min, max)];
                if (!begin || begin < min) begin = min;
                if (begin && begin > max) begin = max;

                next.set("player", this);
                next.set("min", min);
                next.set("max", max);
                next.set("num", begin);
                next.set("show", transform);

                if (prompt) next.set("prompt", prompt);
                if (prompt2) next.set("prompt2", prompt2);
                if (forced) next.set("forced", forced);
                if (filter) next.set("filter", filter);

                next.setContent("chooseNumber");

                return next;
            };
            lib.element.content.chooseNumber = function chooseNumberContent() {
                "step 0"
                if (event.isMine()) {
                    let isInput = false;

                    event.controls = {
                        cancel: ui.create.control("取消", () => { }),
                        min: ui.create.control("最小", () => { }),
                        minusss: ui.create.control("---", () => { }),
                        minuss: ui.create.control("--", () => { }),
                        minus: ui.create.control("-", () => { }),
                        num: ui.create.control(event.num, () => { }),
                        plus: ui.create.control("+", () => { }),
                        pluss: ui.create.control("++", () => { }),
                        plusss: ui.create.control("+++", () => { }),
                        max: ui.create.control("最大", () => { }),
                        clear: ui.create.control("确认", () => {
                            if (isInput) {

                            }
                            else {
                                event.result = { bool: true, choice: event.num };
                                game.resume();
                            }
                        })
                    };

                    if (event.forced) {
                        event.controls.cancel.close();
                        delete event.controls.cancel;
                    }

                    const difference = event.max - event.min;
                    if (difference <= 100) {
                        event.controls.plusss.close();
                        event.controls.minusss.close();
                        delete event.controls.plusss;
                        delete event.controls.minusss;
                    }
                    if (difference <= 10) {
                        event.controls.pluss.close();
                        event.controls.minuss.close();
                        delete event.controls.pluss;
                        delete event.controls.minuss;
                    }

                    const symbol = {
                        m: Symbol("minus"),
                        p: Symbol("plus"),
                        l: Symbol("limit"),
                        i: Symbol("input")
                    }

                    const divsConfig = new Map();
                    if (event.controls.plus) divsConfig.set(event.controls.plus, [symbol.p, 1]);
                    if (event.controls.pluss) divsConfig.set(event.controls.pluss, [symbol.p, 10]);
                    if (event.controls.plusss) divsConfig.set(event.controls.plusss, [symbol.p, 100]);

                    if (event.controls.minus) divsConfig.set(event.controls.minus, [symbol.m, -1]);
                    if (event.controls.minuss) divsConfig.set(event.controls.minuss, [symbol.m, -10]);
                    if (event.controls.minusss) divsConfig.set(event.controls.minusss, [symbol.m, -100]);

                    divsConfig.set(event.controls.min, [symbol.l, event.min]);
                    divsConfig.set(event.controls.max, [symbol.l, event.max]);

                    const doUpdate = (sym) => {
                        for (const [div, [sym2, num]] of divsConfig) {
                            switch (sym2) {
                                case symbol.l:
                                    if (event.num === num && !div.classList.contains("disabled"))
                                        div.classList.add("disabled");
                                    else if (div.classList.contains("disabled"))
                                        div.classList.remove("disabled");

                                    break;
                                default:
                                    switch (sym) {
                                        case symbol.i:
                                            switch (sym2) {
                                                case symbol.p:
                                                    if (event.num + num <= event.max && div.classList.contains("disabled"))
                                                        div.classList.remove("disabled");
                                                    break;
                                                case symbol.m:
                                                    if (event.num + num >= event.min && div.classList.contains("disabled"))
                                                        div.classList.remove("disabled");
                                                    break;
                                            }
                                            break;
                                        case symbol.l:
                                            switch (event.num) {
                                                case event.min:
                                                    if (sym2 === symbol.p && div.classList.contains("disabled"))
                                                        div.classList.remove("disabled");
                                                    if (sym2 === symbol.m && !div.classList.contains("disabled"))
                                                        div.classList.add("disabled");
                                                    break;
                                                case event.max:
                                                    if (sym2 === symbol.m && div.classList.contains("disabled"))
                                                        div.classList.remove("disabled");
                                                    if (sym2 === symbol.p && !div.classList.contains("disabled"))
                                                        div.classList.add("disabled");
                                                    break;
                                            }
                                            break;
                                        case symbol.m:
                                            if (event.num + num <= event.max && div.classList.contains("disabled"))
                                                div.classList.remove("disabled");
                                            if (event.num + num < event.min && !div.classList.contains("disabled"))
                                                div.classList.add("disabled");
                                            break;
                                        case symbol.p:
                                            if (event.num + num >= event.min && div.classList.contains("disabled"))
                                                div.classList.remove("disabled");
                                            if (event.num + num > event.max && !div.classList.contains("disabled"))
                                                div.classList.add("disabled");
                                            break;
                                        default:
                                            if (event.num + num < event.min && !div.classList.contains("disabled"))
                                                div.classList.add("disabled");
                                            if (event.num + num > event.max && !div.classList.contains("disabled"))
                                                div.classList.add("disabled");
                                            break;
                                    }
                                    break;
                            }
                        }
                    };

                    const doFilter = () => {
                        if (event.filter) {
                            const result = event.filter(event.num);
                            if (result && event.controls.clear.classList.contains("disabled")) event.controls.clear.classList.remove("disabled");
                            else if (!result && !event.controls.clear.classList.contains("disabled")) event.controls.clear.classList.add("disabled");
                        }
                    };

                    const doShow = () => {
                        event.controls.num.textContent = (Reflect.get(event.show, event.num) != null ? Reflect.get(event.show, event.num) : event.num).toString();
                        if (event.controls.num.classList.contains("disabled")) event.controls.num.classList.remove("disabled");
                    };

                    const pressTemplate = (self, sym, num) => () => {
                        if (!self.classList.contains("disabled")) {
                            event.num = num + event.num * Number(sym !== symbol.l);

                            doUpdate(sym);
                            doFilter();

                            doShow();
                        }
                    };

                    const pressDownTemplate = (self, sym, num) => ((doMethod => () => {
                        self._setTimeout = setTimeout(() => {
                            delete self._setTimeout;
                            self._setInterval = setInterval(() => {
                                doMethod();
                                if (self.classList.contains("disabled")) {
                                    clearInterval(self._setInterval);
                                    delete self._setInterval;
                                }
                            }, 50);
                        }, 500);
                    })(pressTemplate(self, sym, num)));

                    const pressUpTemplate = (self) => () => {
                        if (self._setTimeout) {
                            clearTimeout(self._setTimeout);
                            delete self._setTimeout;
                        }
                        if (self._setInterval) {
                            clearInterval(self._setInterval);
                            delete self._setInterval;
                        }
                    };

                    const itemTemplate = (filter, callback) => () => {
                        if (isInput) {
                            const num = parseInt(event._input.value);
                            if (filter(num)) {
                                isInput = false;
                                event._div.removeChild(event._input);
                                event.controls.dialog.content.removeChild(event._div);
                                event._div.delete();

                                callback(num);

                                delete event._div;
                                delete event._input;
                                if (!event.prompt) event.controls.dialog.hide();

                                doUpdate(symbol.i);
                                doFilter();
                                doShow();

                            }
                            else callback(true);
                        }
                        else {
                            event.result = callback(false);
                            game.resume();
                        }
                    }

                    doUpdate();
                    doFilter();

                    let numdiv = event.controls.num;
                    numdiv.addEventListener(lib.config.touchscreen ? "touchend" : "click", _click => {
                        if (!numdiv.classList.contains("disabled")) {
                            isInput = true;

                            numdiv.classList.add("disabled");
                            for (const [div, _item] of divsConfig)
                                if (!div.classList.contains("disabled"))
                                    div.classList.add("disabled");

                            if (!event.prompt) event.controls.dialog.show();

                            let div = ui.create.div();
                            event.controls.dialog.add(div);

                            div.append(`请输入范围内的数字（${event.min}~${event.max}）`);

                            let input = document.createElement("input");
                            input.type = "number";
                            input.setAttribute("maxlength", difference.toString().length);
                            input.addEventListener("keydown", e => e.stopPropagation());
                            input.addEventListener("keyup", e => e.stopPropagation());

                            div.append(input);

                            event._div = div;
                            event._input = input;
                        }
                    })

                    for (const [div, [sym, num]] of divsConfig) {
                        div.addEventListener(lib.config.touchscreen ? "touchend" : "click", pressTemplate(div, sym, num));
                        if (lib.config.button_press) {
                            div.addEventListener(lib.config.touchscreen ? "touchstart" : "mousedown", pressDownTemplate(div, sym, num));
                            div.addEventListener(lib.config.touchscreen ? "touchend" : "mouseup", pressUpTemplate(div));
                        }
                    }

                    event.controls.cancel.addEventListener(lib.config.touchscreen ? "touchend" : "click", itemTemplate(_num =>
                        true, bool => { bool }));
                    event.controls.clear.addEventListener(lib.config.touchscreen ? "touchend" : "click", itemTemplate(num =>
                        num >= event.min && num <= event.max, bool => {
                            if (typeof bool === "number") {
                                event.num = bool;
                            }
                            else if (bool === true) {
                                if (event.controls.clear._setTimeout) {
                                    clearTimeout(event.controls.clear._setTimeout);
                                    delete event.controls.clear._setTimeout;
                                }
                                let text = document.createElement("span");
                                text.style.color = "#FF3333";
                                text.style.fontFamily = "12px";
                                text.textContent = "请输入符合要求的数字！";
                                event._div.append(text);
                                event.controls.clear._setTimeout = setTimeout(() => {
                                    event._div.removeChild(text);
                                }, 2000);
                            }
                            else if (bool === false) return { bool: true, choice: event.num };
                        }));

                    event.controls.dialog = ui.create.dialog();
                    event.controls.dialog.hide();
                    if (event.prompt) {
                        event.controls.dialog.show();
                        event.controls.dialog.add(event.prompt);
                        if (event.prompt2) event.controls.dialog.addText(event.prompt2, event.prompt2.length <= 20 || event.centerprompt2)
                    }

                    event.configs = divsConfig;

                    game.pause();
                    game.countChoose();
                    event.choosing = true;
                }
                else if (event.isOnline()) {
                    event.send();
                }
                else {
                    event.result = "ai";
                }
                "step 1"
                if (event.result === "ai") {
                    if (event.ai) event.result = event.ai(player, event.filter, event.getParent());
                    else if (event.goon) event.result = event.goon;

                    if (typeof event.result === "number") {
                        let result = Math.min(Math.max(event.result, event.min), event.max) + event.min;
                        while (true) {
                            if (!event.filter || event.filter(result)) break;
                            result = Math.floor(Math.random() * (event.max - event.min + 1)) + event.min;
                        }
                        event.result = { bool: true, choice: result };
                    }
                    else if (event.forced) {
                        while (true) {
                            event.result = { bool: true, choice: Math.floor(Math.random() * (event.max - event.min + 1)) + event.min };
                            if (!event.filter || event.filter(event.result.choice)) break;
                        }
                    }
                    else event.result = { bool: false };
                }

                event.choosing = false;
                _status.imchoosing = false;
                if (event.controls) for (const name in event.controls) event.controls[name].close();
                if (event.configs) event.configs.clear();
                if (event.result.bool && event.logSkill) {
                    if (typeof event.logSkill === "string") {
                        player.logSkill(event.logSkill);
                    }
                    else if (Array.isArray(event.logSkill)) {
                        player.logSkill.apply(player, event.logSkill);
                    }
                }
                event.resume();
            };
            //---------------------------------------自定义函数：互变------------------------------------------//
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
            }
            lib.element.player.$changeHubian = function () {
                var mark = this.marks.hubian, player = this
                if (mark) {
                    if (!player.storage.hubian) {
                        mark.firstChild.innerHTML = "暗涌"
                    } else {
                        mark.firstChild.innerHTML = "圣咏"
                    }
                }
            }
            //---------------------------------------自定义函数：强化------------------------------------------//
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
            //---------------------------------------自定义函数：转韵------------------------------------------//
            lib.element.player.changeYun = function (skill) {
                //若导入的player.skill为平，则改为仄
                if (this[skill] && this[skill] == '平') {
                    this[skill] = '仄'
                } else {
                    //否则改为平
                    this[skill] = '平'
                }
                //转韵后刷新skill的技能
                if (this.getStat('skill')[skill]) delete this.getStat('skill')[skill];
                //发出记录
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
            // ---------------------------------------瞬发技按钮------------------------------------------//
            lib.element.player.FrShunfajiInit = function (skillname) {
                if (!this.isUnderControl(true)) {
                    return;
                }
                var info = lib.skill[skillname];
                if (!info) return;
                if (info.shunfa) {
                    var button = ui.create.div('.Fr-shunfaanniu-' + config.fr_shunfajiButton, this);
                    button.innerHTML = get.translation(skillname);
                    var player = this;
                    button.listen(function () {
                        if (player.hasSkill(skillname, true, true, false)) {
                            var enable = true
                            if (info.usable && get.skillCount(skillname) >= info.usable) enable = false;
                            if (info.round && (info.round - (game.roundNumber - player.storage[skillname + '_roundcount']) > 0)) enable = false;
                            if (info.filter && !info.filter(event, player)) enable = false;
                            if (info.shunfa) {
                                if (!enable || !player.hasSkill(skillname, false, true, true)) {
                                    alert("当前不可发动！");
                                    return;
                                }
                                if (info.clickable) {
                                    info.clickable(player)
                                } else {
                                    player.useSkill(skillname)
                                }
                                if (typeof info.usable == 'number') {
                                    player.addSkill('counttrigger');
                                    if (!player.storage.counttrigger) {
                                        player.storage.counttrigger = {};
                                    }
                                    if (!player.storage.counttrigger[skillname]) {
                                        player.storage.counttrigger[skillname] = 1;
                                    }
                                    else {
                                        player.storage.counttrigger[skillname]++;
                                    }
                                }
                                if (info.round) {
                                    var roundname = skillname + '_roundcount';
                                    player.storage[roundname] = game.roundNumber;
                                    player.syncStorage(roundname);
                                    player.markSkill(roundname);
                                }
                            }
                        } else {
                            button.delete();
                        }
                    });
                }
            };
            // ---------------------------------------自定义函数：改变原画------------------------------------------//
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
            // ---------------------------------------自定义函数：获取最后一张手牌-----------------------------------------//
            lib.element.player.getLastAllUsed = function (num) {
                if (typeof num != 'number') num = 0;
                var history = this.getAllHistory('useCard');
                if (history.length <= num) return null;
                return history[history.length - num - 1];
            }
            // ---------------------------------------自定义函数：获取花色数量-----------------------------------------//
            lib.element.player.getSuitNum = function (position) {
                var player = this;
                if (!position) position = 'h';
                return player.getCards(position).reduce(function (arr, card) {
                    return arr.add(get.suit(card, player)), arr;
                }, []).length;
            };
            // ---------------------------------------自定义函数：视为伤害------------------------------------------//
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
            //---------------------------------------设置：武将评级------------------------------------------//
            lib.rank.rarity.junk.addArray(game.furryrank[0]);
            lib.rank.rarity.common.addArray(game.furryrank[1]);
            lib.rank.rarity.rare.addArray(game.furryrank[2]);
            lib.rank.rarity.epic.addArray(game.furryrank[3]);
            lib.rank.rarity.legend.addArray(game.furryrank[4]);
            //---------------------------------------设置：显示手牌上限------------------------------------------//
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
            //---------------------------------------设置：背景音乐------------------------------------------//
            game.skplayBackgroundMusic = function () {
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
                    "4":"MySunset.mp3",
                    "5":"FarOut.mp3"
                };
                if (item[temp]) {
                    ui.backgroundMusic.src = lib.assetURL + 'extension/福瑞拓展/audio/bgm/' + item[temp];
                } else {
                    game.playBackgroundMusic();
                    ui.backgroundMusic.addEventListener('ended', game.playBackgroundMusic);
                }
            }
            if (lib.config.extension_福瑞拓展_Background_Music && lib.config.extension_福瑞拓展_Background_Music != "1") {
                lib.arenaReady.push(function () {
                    //ui.backgroundMusic.autoplay=true;
                    //ui.backgroundMusic.pause();
                    game.skplayBackgroundMusic();
                    ui.backgroundMusic.addEventListener('ended', game.skplayBackgroundMusic);
                });
            };
            lib.sk_changeSkill = config.changeGroup;
            //---隐藏音乐可视化菜单上的文字，这样只显示设计的CD封面看着更简洁干净---
            // lib.init.css(lib.assetURL+"extension/福瑞拓展",'hidename');
            if (lib.config.extension_福瑞拓展_Background_Music) {
                var cbcss = document.createElement("style");
                cbcss.innerHTML = ".frmusicname>.name{color:gold; visibility:hidden;}";
                document.head.appendChild(cbcss);
            };


            //---------------------------------------设置：主内单挑音乐------------------------------------------//
            if(config.furry_zhuneimusic==1){
                lib.skill._furry_zhuneibgm={
                    trigger:{ 
                        global:"dieAfter",
                    }, 
                    forced:true, 
                    nobracket:true, 
                    priority:-9993,
                    content:function (){  
                        var n=[1].randomGet();
                        if(n==1){
                            var num;
                            var num1
                            var mode=get.mode();
                            if(mode=='identity'){
                                num=get.population('nei');
                                num1=get.population('zhu');
                            }
                            if(game.countPlayer()==2&&num>0&&num1>0) ui.backgroundMusic.src=lib.assetURL+'extension/福瑞拓展/audio/bgm/Hopes And Dreams.mp3'; 
                        }  
                        ui.backgroundMusic.loop=true;           
                    },       
                }  
            }
            if(config.furry_zhuneimusic==2){
                lib.skill._furry_zhuneibgm={
                    trigger:{ 
                        global:"dieAfter",
                    }, 
                    forced:true, 
                    nobracket:true, 
                    priority:-9993,
                    content:function (){  
                        var n=[1].randomGet();
                        if(n==1){
                            var num;
                            var num1
                            var mode=get.mode();
                            if(mode=='identity'){
                                num=get.population('nei');
                                num1=get.population('zhu');
                            }
                            if(game.countPlayer()==2&&num>0&&num1>0) ui.backgroundMusic.src=lib.assetURL+'extension/福瑞拓展/audio/bgm/MEGALOVANIA.mp3'; 
                        }  
                        ui.backgroundMusic.loop=true;           
                    },       
                }  
            }
            //---------------------------------------设置：自动更新------------------------------------------//
            if (config.furryCardFileConfig2 && game.getFileList && lib.config.extensions) {
                //十周年卡牌素材
                if (lib.config.extensions.contains('十周年UI') && lib.config['extension_十周年UI_enable']) {
                    game.getFileList('extension/十周年UI/image/card', (folders, files) => {
                        const furryCardFiles = [
                            'fr_card_cmhc.jpg', 'fr_card_cmhc.bmp', 'fr_card_cmhc.png', 'fr_card_cmhc.webp', 'fr_card_djlj.jpg', 'fr_card_djlj.webp', 'fr_card_djlj.bmp',
                            'fr_card_gzbj.jpg', 'fr_card_gzbj.png', 'fr_card_gzbj.webp', 'fr_card_gzbj.bmp', 'fr_card_lltj.jpg', 'fr_card_lltj.png', 'fr_card_lltj.webp', 'fr_card_lltj.bmp',
                            'fr_card_lyzq.jpg', 'fr_card_lyzq.png', 'fr_card_lyzq.webp', 'fr_card_lyzq.bmp', 'fr_card_ttbl.jpg', 'fr_card_ttbl.png', 'fr_card_ttbl.webp', 'fr_card_ttbl.bmp', 'fr_card_xysx.jpg',
                            'fr_card_xysx.png', 'fr_card_xysx.webp', 'fr_card_yxys.jpg', 'fr_card_yxys.bmp', 'fr_card_xysx.bmp', 'fr_card_yxys.png', 'fr_card_yxys.webp', 'fr_card_zfxd.jpg', 'fr_card_zfxd.bmp',
                            'fr_card_zfxd.png', 'fr_card_zfxd.webp', 'fr_card_zh.jpg', 'fr_card_zh.png', 'fr_card_zh.webp', 'fr_card_zh.bmp', 'fr_card_zhcz.jpg', 'fr_card_zhcz.png', 'fr_card_zhcz.webp', 'fr_card_zhcz.bmp',
                            'fr_equip1_syzg.jpg', 'fr_equip1_syzg.bmp', 'fr_equip1_syzg.png', 'fr_equip1_syzg.webp', 'fr_equip5_wxpp.jpg', 'fr_equip5_wxpp.png', 'fr_equip5_wxpp.webp', 'fr_equip5_wxpp.bmp', 'fr_card_scfm.png',
                            'fr_card_scfm.webp', 'fr_card_scfm.jpg', 'fr_card_scfm.bmp', 'fr_equip1_mhlq.bmp', 'fr_equip1_mhlq.jpg', 'fr_equip1_mhlq.webp', 'fr_equip1_mhlq.png', 'fr_equip2_yyxl.png', 'fr_equip2_yyxl.bmp', 'fr_equip2_yyxl.webp', 'fr_equip2_yyxl.jpg'
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
                        const furryCardFiles = ['name2_fr_g_dragon.png', 'name2_fr_g_ji.png'];
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
                    game.getFileList('extension/十周年UI/image/decoration', (folders, files) => {
                        const furryCardFiles = ['name_fr_g_dragon.webp', 'name_fr_g_dragon.png', 'name_fr_g_ji.png', 'name_fr_g_ji.webp'];
                        for (let i = 0; i < furryCardFiles.length; i++) {
                            if (!files.contains(furryCardFiles[i])) {
                                if (game.readFile && game.writeFile) {
                                    game.readFile('extension/福瑞拓展/image/group/' + furryCardFiles[i], (data) => {
                                        game.writeFile(data, 'extension/十周年UI/image/decoration', furryCardFiles[i], function () { });
                                    });
                                }
                            }
                        }
                    });
                    game.getFileList('extension/十周年UI/image/ass', (folders, files) => {
                        const furryCardFiles = ['fr_equip1_syzg.png', 'fr_equip5_wxpp.png', 'fr_equip1_mhlq.png', 'fr_equip2_yyxl.png'];
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
                        const furryCardFiles = ['name2_fr_g_dragon.png', 'name2_fr_g_ji.png'];
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
                        const furryCardFiles = ['name2_fr_g_dragon.png', 'name2_fr_g_ji.png'];
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
                if (lib.config.extensions.contains('假装无敌') && lib.config['extension_假装无敌_enable']) {
                    game.getFileList('extension/假装无敌/images', (folders, files) => {
                        const furryCardFiles = ['border_fr_g_dragon.png', 'border_fr_g_ji.png'];
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
                        const furryCardFiles = ['fr_equip1_syzg.png', 'fr_equip5_wxpp.png', 'fr_equip1_mhlq.png', 'fr_equip2_yyxl.png'];
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
                        const furryCardFiles = ['fr_equip1_syzg.png', 'fr_equip5_wxpp.png', 'fr_equip1_mhlq.png', 'fr_equip2_yyxl.png'];
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
                        const furryCardFiles = ['fr_g_dragon.png', 'fr_g_ji.png'];
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
            //---------------------------------------设置：检测无名杀版本------------------------------------------//
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
            //------------------------------------------设置：AI禁将------------------------------------------//
            if (lib.config.ban_ai) {
                var savedFilter = lib.filter.characterDisabled;
                lib.filter.characterDisabled = function (i, libCharacter) {
                    if ((i && i.indexOf('fr_') != 0) || (i == 'fr_terz')) {
                        return true;
                    }
                    return savedFilter(i, libCharacter);
                };
            }
            //------------------------------------------设置：国战武将------------------------------------------//
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
            //------------------------------------------国战：珠联璧合------------------------------------------//
            lib.perfectPair.fr_taber = ['fr_verb']
            lib.perfectPair.fr_yifeng = ['fr_yifa']
            lib.perfectPair.fr_sam = ['fr_ham']
            lib.perfectPair.fr_bofeng = ['fr_ciyu']
            lib.perfectPair.fr_wore = ['fr_tiers']
            lib.perfectPair.fr_miya = ['db_fr_krikt']
        }, precontent: function (furryPack) {
            //---------------------------------------设置：武将评级------------------------------------------//
            //乐色
            var furryjunk = ["fr_milis", "fr_lions", "fr_telina", "fr_xit", "fr_adward", "fr_nier", "fr_laays", 'fr_liya', 'fr_mala', 'fr_derk']
            //普通
            var furrycommon = ["fr_jiejie", "fr_sayisu", "fr_alas", "fr_muen", "fr_dog", "fr_pluvia", "fr_ventus", "fr_zenia", "fr_lamost", "fr_morly", "fr_glit", "fr_edmon", "fr_muli",]
            //珍贵
            var furryrare = ["fr_yifeng", "fr_yada", "fr_muliy", "fr_sier", "fr_klif", "fr_west", "fr_milite", "fr_jackson", "fr_hars"
                , "fr_rest", "fr_lens", "fr_kert", "fr_keya", "fr_klier", "fr_lint", "fr_patxi", "fr_nore", "fr_nulia", "fr_terlk", "fr_tiers", "fr_wore", "fr_hynea", 'fr_linyan', 'fr_shark']
            //史诗
            var furryepic = ["fr_muyada", "fr_marxya", "fr_ken", "fr_oert", "fr_sisk", "fr_skry", "fr_lusiya", "fr_kersm", "fr_dier",
                "fr_aroncy", "fr_berg", "fr_markn", "fr_mika", "fr_dmoa", "fr_verb", "fr_taber", "fr_dragon", "fr_jgby"
                , "fr_slen", "fr_paers", "fr_yifa", "fr_fate", "fr_fox", "fr_zeta", "fr_ham", "fr_sam", 'fr_horn', 'fr_tiger,', 'fr_kmjia', "fr_liona", "fr_ala", 'fr_crow']
            //传说
            var furrylegend = ["fr_wes", "fr_kesaya", "fr_krikt", "fr_tery", "fr_milism", "fr_miya", "fr_lust", "fr_faers", "fr_yas_klin", "fr_bofeng", "fr_xiaomo", "fr_nanci", "fr_bladewolf", "fr_sheep", "fr_tails",
                "fr_ciyu", "fr_delta", "fr_peter_likes", "fr_yinhu", "fr_terz", "fr_jet", "fr_knier", "fr_kasaers", "fr_molis", "fr_shisan", "fr_zhongyu", 'fr_qima', 'fr_francium','fr_zhan']
            var furryrank = [furryjunk, furrycommon, furryrare, furryepic, furrylegend]
            game.furryrank = furryrank
            //------------------------------------------载入css------------------------------------------//
            lib.init.css(lib.assetURL + 'extension/福瑞拓展', 'extension');
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
            lib.init.js(lib.assetURL + 'extension/福瑞拓展', 'furry_achievement', function () {
                lib.init.css(lib.assetURL + 'extension/福瑞拓展', 'mainPage');
                lib.init.css(lib.assetURL + 'extension/福瑞拓展', 'achievement');
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
                    } catch (e) {
                        alert("错误：成就初始化失败");
                    }
                });
            }, function () {
                alert("错误：成就导入失败");
            });
            //------------------------------------------说明------------------------------------------//
            var introduce = {
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
                'dazao': {
                    name: '打造',
                    info: '打造：弃置一张牌，从游戏外获得一张装备牌（标准、军争、OL锻造、福瑞拓展，从随机出现的5件中选择一件），花色同所弃置牌，点数为8。'
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
                    info: "<li>宫音：摸牌阶段，你多摸两张牌 <li>商音：出牌阶段，你可以额外使用一张【杀】<li>角音：你跳过你的下个弃牌阶段 <li>徵音：结束阶段，你摸两张牌 <li>羽音：回合结束时，你可以令一名其他角色技能失效直到其回合结束。"
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
            //------------------------------------------自定义game函数------------------------------------------//
            game.frGetQhlySkin = function (name) {
                if (game.qhly_getSkin) {
                    return game.qhly_getSkin(name);
                }
                return null;
            };
            //点击提示 参考自活动武将
            game.getPhone = function () {
                //获取浏览器navigator对象的userAgent属性（浏览器用于HTTP请求的用户代理头的值）
                var info = navigator.userAgent;
                //通过正则表达式的test方法判断是否包含“Mobile”字符串
                var isPhone = /mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(info);
                //如果包含“Mobile”（是手机设备）则返回true
                return isPhone;
            };
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
            //------------------------------------------自定义get函数------------------------------------------//
            get.cardnum = function (num) {
                var cardnum
                switch (num) {
                    case 11: cardnum = 'J'; break;
                    case 12: cardnum = 'Q'; break;
                    case 13: cardnum = 'K'; break;
                    case 1: cardnum = 'A'; break;
                    default: cardnum = num
                }
                return cardnum
            }
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
            //------------------------------------------自定义window函数------------------------------------------//
            window.furry_import = function (func) {
                func(lib, game, ui, get, ai, _status);
            };
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
            //------------------------------------------武将包------------------------------------------//
            if (furryPack.enable) {
                //------------------------------------------载入初始js------------------------------------------//
                lib.init.js(lib.assetURL + 'extension/福瑞拓展/asset/skin.js', null);//这一行代码加载扩展中的skin.js文件。 
                lib.init.js(lib.assetURL + 'extension/福瑞拓展/asset/drama.js', null)
                lib.init.js(lib.assetURL + 'extension/福瑞拓展/asset/cards.js', null);
                lib.init.js(lib.assetURL + 'extension/福瑞拓展/asset/character.js', null);
                game.addMode('furry_lib', {
                    game: {
                        syncMenu: true,
                        createview: function (node, charalist) {
                            var player = ui.create.player(null, true);
                            player.init(charalist[0][0]);
                            player.style.float = 'left';
                            player.style.left = '3%';
                            player.style.top = '1%';
                            player.style.width = '130px'
                            player.style.height = '170px'
                            player.style.cursor = 'pointer';
                            player.style.position = 'absolute';
                            player.node.count.remove();
                            player.node.hp.remove();
                            if (lib.config.frLutou) {
                                player.node.avatar.style['height'] = '178px';
                            } else {
                                player.node.avatar.style['height'] = '170px';
                            }
                            player.style.transition = 'all 0.5s';
                            node.appendChild(player);
                            node.appendChild(player);
                            node.playernode = player;

                            var dialog = ui.create.dialog('hidden');
                            dialog.style.left = "calc(6%+130px)";
                            dialog.style.right = "1%"
                            dialog.style.top = "-1%";
                            dialog.style.width = "calc(100% - 130px)";
                            dialog.style.height = "auto";
                            dialog.noopen = true;
                            node.appendChild(dialog);
                            dialog.addText('<div id="Cdetail" style="text-align:left;font-size:16px;width:calc(95% - 60px)">' + charalist[0][2] + '</br><span class="bluetext">角色介绍</span>：' + get.characterIntro(charalist[0][0]) + '</br>' + charalist[0][1]);

                            var dialog1 = ui.create.dialog('hidden');
                            dialog1.style.left = "0px";
                            dialog1.style.top = "220px";
                            dialog1.style.width = "100%";
                            dialog1.style.height = "50%";
                            dialog1.noopen = true;
                            node.appendChild(dialog1);
                            var tp = [];
                            for (var i = 0; i < charalist.length; i++) {
                                tp.push(charalist[i][0]);
                            }
                            dialog1.add([tp, 'character']);
                            for (var i = 0; i < dialog1.buttons.length; i++) {
                                dialog1.buttons[i].classList.add('noclick');
                                dialog1.buttons[i].value = i;
                                dialog1.buttons[i].onclick = function () {
                                    player.init(charalist[this.value][0]);
                                    document.getElementById("Cdetail").innerHTML = charalist[this.value][2] + '</br><span class="bluetext">角色介绍</span>：' + get.characterIntro(charalist[this.value][0]) + '</br>' + charalist[this.value][1];
                                };
                            }
                        },
                    },
                    start: function () {
                        ui.auto.hide();
                        if (!lib.storage.scene) {
                            lib.storage.scene = {};
                        }
                        if (!lib.storage.stage) {
                            lib.storage.stage = {};
                        }
                        if (!_status.extensionmade) {
                            _status.extensionmade = [];
                        }
                        if (_status.extensionscene) {
                            game.save('scene', lib.storage.scene);
                        }
                        if (_status.extensionstage) {
                            game.save('stage', lib.storage.stage);
                        }
                        var dialog = ui.create.dialog('hidden');
                        dialog.classList.add('fixed');
                        dialog.classList.add('scroll1');
                        dialog.classList.add('scroll2');
                        dialog.classList.add('fullwidth');
                        dialog.classList.add('fullheight');
                        dialog.classList.add('noupdate');
                        dialog.classList.add('character');
                        dialog.contentContainer.style.overflow = 'visible';
                        dialog.style.overflow = 'scroll';
                        dialog.content.style.height = '100%';
                        dialog.contentContainer.style.transition = 'all 0s';
                        if (!lib.storage.directStage) dialog.open();
                        var packnode = ui.create.div('.packnode', dialog);
                        lib.setScroll(packnode);
                        ui.background.setBackgroundImage('extension/福瑞拓展/image/background/fire_dance.png');
                        //背景
                        var clickCapt = function () {
                            var active = this.parentNode.querySelector('.active');
                            if (this.link == 'stage') {
                                if (get.is.empty(lib.storage.scene)) {
                                    alert('请创建至少1个场景');
                                    return;
                                }
                            }
                            if (active) {
                                if (active == this) return;
                                for (var i = 0; i < active.nodes.length; i++) {
                                    active.nodes[i].remove();
                                    if (active.nodes[i].showcaseinterval) {
                                        clearInterval(active.nodes[i].showcaseinterval);
                                        delete active.nodes[i].showcaseinterval;
                                    }
                                }
                                active.classList.remove('active');
                            }
                            this.classList.add('active');
                            for (var i = 0; i < this.nodes.length; i++) {
                                dialog.content.appendChild(this.nodes[i]);
                            }
                            var showcase = this.nodes[this.nodes.length - 1];
                            showcase.style.height = (dialog.content.offsetHeight - showcase.offsetTop) + 'px';
                            if (typeof showcase.action == 'function') {
                                if (showcase.action(showcase._showcased ? false : true) !== false) {
                                    showcase._showcased = true;
                                }
                            }
                            if (this._nostart) start.style.display = 'none';
                            else start.style.display = '';
                            game.save('currentBrawl', 'help');
                        }
                        // 应该是这里是制作列表的地方
                        var createNode = function (name) {
                            var info = lib.brawl[name];
                            var node = ui.create.div('.dialogbutton.menubutton.large', info.name, packnode, clickCapt);
                            node.style.transition = 'all 0s';
                            var caption = info.name;
                            var modeinfo = '';
                            if (info.mode) {
                                modeinfo = get.translation(info.mode) + '模式';	// 这个是标注哪个模式下使用的
                            }
                            if (info.submode) {
                                if (modeinfo) {
                                    modeinfo += ' - ';
                                }
                                modeinfo += info.submode;
                            }
                            var intro;
                            if (Array.isArray(info.intro)) {
                                intro = '<ul style="text-align:left;margin-top:10">';
                                if (modeinfo) {
                                    intro += '<li>' + modeinfo;
                                }
                                for (var i = 0; i < info.intro.length; i++) {
                                    intro += '<br>' + info.intro[i];
                                }
                            }
                            else {
                                intro = '';
                                if (modeinfo) {
                                    intro += '（' + modeinfo + '）';
                                }
                                intro += info.intro;
                            }
                            var today = new Date();
                            var i = ui.create.div('.text center', intro);
                            i.style.overflow = 'scroll';
                            i.style.margin = '0px';
                            i.style.padding = '0px';
                            var showcase = ui.create.div();
                            showcase.style.margin = '0px';
                            showcase.style.padding = '0px';
                            showcase.style.width = '100%';
                            showcase.style.display = 'block'
                            showcase.style.overflow = 'scroll';
                            showcase.action = info.showcase;
                            showcase.link = name;
                            if (info.fullshow) {
                                node.nodes = [showcase];
                                showcase.style.height = '100%';
                            }
                            else {
                                node.nodes = [
                                    i,
                                    showcase,
                                ];
                            }
                            node.link = name;
                            node._nostart = info.nostart;
                            if (lib.storage.currentBrawl == name) {
                                clickCapt.call(node);
                            }
                            return node;
                        }
                        // 点那个巨大的“斗”之后
                        var clickStart = function () {
                            dialog.delete();
                            ui.auto.show();
                            game.switchMode('identity');
                        };
                        // 制作那个“斗”的键的。去掉会出bug，不知道为什么
                        var start = ui.create.div('.menubutton.round.highlight', '←', dialog.content, clickStart);
                        start.style.position = 'absolute';
                        start.style.left = '-100px';
                        start.style.right = 'auto';
                        start.style.top = 'auto';
                        start.style.bottom = '10px';
                        start.style.width = '80px';
                        start.style.height = '80px';
                        start.style.lineHeight = '80px';
                        start.style.margin = '0';
                        start.style.padding = '5px';
                        start.style.fontSize = '72px';
                        start.style.zIndex = 3;
                        start.style.transition = 'all 0s';
                        start.hide();
                        game.addScene = function (name, clear) {
                            var scene = lib.storage.scene[name];
                            var brawl = {
                                name: name,
                                intro: scene.intro,
                            };
                            for (var i in lib.brawl.scene.template) {
                                brawl[i] = get.copy(lib.brawl.scene.template[i]);
                            }
                            if (!scene.gameDraw) {
                                brawl.content.noGameDraw = true;
                            }
                            brawl.content.scene = scene;
                            lib.brawl['scene_' + name] = brawl;
                            var node = createNode('scene_' + name);
                            if (clear) {
                                game.addSceneClear();
                                clickCapt.call(node);
                                _status.sceneChanged = true;
                            }
                        };
                        game.addStage = function (name, clear) {
                            var stage = lib.storage.stage[name];
                            var brawl = {
                                name: name,
                                intro: stage.intro,
                                content: {}
                            };
                            for (var i in lib.brawl.stage.template) {
                                brawl[i] = get.copy(lib.brawl.stage.template[i]);
                            }
                            brawl.content.stage = stage;
                            lib.brawl['stage_' + name] = brawl;
                            var node = createNode('stage_' + name);
                            if (clear) {
                                game.addStageClear();
                                clickCapt.call(node);
                            }
                        }
                        game.removeScene = function (name) {
                            delete lib.storage.scene[name];
                            game.save('scene', lib.storage.scene);
                            _status.sceneChanged = true;
                            for (var i = 0; i < packnode.childElementCount; i++) {
                                if (packnode.childNodes[i].link == 'scene_' + name) {
                                    if (packnode.childNodes[i].classList.contains('active')) {
                                        for (var j = 0; j < packnode.childElementCount; j++) {
                                            if (packnode.childNodes[j].link == 'scene') {
                                                clickCapt.call(packnode.childNodes[j]);
                                            }
                                        }
                                    }
                                    packnode.childNodes[i].remove();
                                    break;
                                }
                            }
                        }
                        game.removeStage = function (name) {
                            delete lib.storage.stage[name];
                            game.save('stage', lib.storage.stage);
                            for (var i = 0; i < packnode.childElementCount; i++) {
                                if (packnode.childNodes[i].link == 'stage_' + name) {
                                    if (packnode.childNodes[i].classList.contains('active')) {
                                        for (var j = 0; j < packnode.childElementCount; j++) {
                                            if (get.is.empty(lib.storage.scene)) {
                                                if (packnode.childNodes[j].link == 'scene') {
                                                    clickCapt.call(packnode.childNodes[j]);
                                                }
                                            }
                                            else {
                                                if (packnode.childNodes[j].link == 'stage') {
                                                    clickCapt.call(packnode.childNodes[j]);
                                                }
                                            }
                                        }
                                    }
                                    packnode.childNodes[i].remove();
                                    break;
                                }
                            }
                        }
                        var sceneNode;
                        for (var i in lib.brawl) {
                            if (get.config(i) === false) continue;
                            if (i == 'scene') {
                                sceneNode = createNode(i);
                            }
                            else {
                                createNode(i);
                            }
                        }
                        if (sceneNode) {
                            game.switchScene = function () {
                                clickCapt.call(sceneNode);
                            }
                        }
                        for (var i in lib.storage.scene) {
                            game.addScene(i);
                        }
                        for (var i in lib.storage.stage) {
                            game.addStage(i);
                        }
                        if (!lib.storage.currentBrawl) {
                            clickCapt.call(packnode.firstChild);
                        }
                        game.save('lastStage');
                        if (lib.storage.directStage) {
                            var directStage = lib.storage.directStage;
                            game.save('directStage');
                            clickStart(directStage);
                        }
                        lib.init.onfree();
                    },
                    brawl: {
                        jianaierview: {
                            name: '迦奈尔',
                            mode: '',
                            intro: [],
                            showcase: function (init) {
                                var node = this;
                                if (init) {
                                    var charalist = [
                                        ['fr_wore',
                                            '</br><span class="bluetext">关联角色</span>：缇尔斯<br><span class="bluetext">角色分析</span>：超级左慈。',
                                            '进攻：' + game.frStars(2) + ' 爆发：' + game.frStars(3) +
                                            ' </br>运气：' + game.frStars(5) + ' 生存：' + game.frStars(2) +
                                            ' </br>控制：' + game.frStars(2) + ' 辅助：' + game.frStars(2) +
                                            '</br>谋略：' + game.frStars(4) + ' 综合：' + game.frStars(4) + ' </br>'],
                                        ['fr_tiers',
                                            '</br><span class="bluetext">关联角色</span>：沃尔<br>',
                                            '进攻：' + game.frStars(5) + ' 爆发：' + game.frStars(6) +
                                            ' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(3) +
                                            ' </br>控制：' + game.frStars(0) + ' 辅助：' + game.frStars(0) +
                                            '</br>谋略：' + game.frStars(1) + ' 综合：' + game.frStars(3) + ' </br>'],
                                        ['fr_tery',
                                            '</br><span class="bluetext">关联角色</span>：无<br>',
                                            '进攻：' + game.frStars(2) + ' 爆发：' + game.frStars(2) +
                                            ' </br>运气：' + game.frStars(2) + ' 生存：' + game.frStars(3) +
                                            ' </br>控制：' + game.frStars(0) + ' 辅助：' + game.frStars(2) +
                                            '</br>谋略：' + game.frStars(5) + ' 综合：' + game.frStars(5) + ' </br>'],
                                    ];
                                    lib.game.createview(node, charalist);
                                }
                            },
                        },
                        wanlingview: {
                            name: '万灵之森',
                            mode: '',
                            intro: [],
                            showcase: function (init) {
                                var node = this;
                                if (init) {
                                    var charalist = [
                                        ['fr_yifeng',
                                            '</br><span class="bluetext">关联角色</span>：弈法<br>',
                                            '进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
                                            ' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(3) +
                                            ' </br>控制：' + game.frStars(5) + ' 辅助：' + game.frStars(5) +
                                            '</br>谋略：' + game.frStars(3) + ' 综合：' + game.frStars(4) + ' </br>'],
                                        ['fr_yifa',
                                            '</br><span class="bluetext">关联角色</span>：弈风<br>',
                                            '进攻：' + game.frStars(4) + ' 爆发：' + game.frStars(4) +
                                            ' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(4) +
                                            ' </br>控制：' + game.frStars(2) + ' 辅助：' + game.frStars(2) +
                                            '</br>谋略：' + game.frStars(3) + ' 综合：' + game.frStars(5) + ' </br>'],
                                        ['fr_telina',
                                            '</br><span class="bluetext">关联角色</span>：无<br>',
                                            '进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
                                            ' </br>运气：' + game.frStars(5) + ' 生存：' + game.frStars(2) +
                                            ' </br>控制：' + game.frStars(2) + ' 辅助：' + game.frStars(0) +
                                            '</br>谋略：' + game.frStars(3) + ' 综合：' + game.frStars(3) + ' </br>'],
                                    ];
                                    lib.game.createview(node, charalist);
                                }
                            },
                        },
                        kelaview: {
                            name: '克拉',
                            mode: '',
                            intro: [],
                            showcase: function (init) {
                                var node = this;
                                if (init) {
                                    var charalist = [
                                        ['fr_wes',
                                            '</br><span class="bluetext">关联角色</span>：米里森<br>',
                                            '进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
                                            ' </br>运气：' + game.frStars(5) + ' 生存：' + game.frStars(3) +
                                            ' </br>控制：' + game.frStars(1) + ' 辅助：' + game.frStars(6) +
                                            '</br>谋略：' + game.frStars(2) + ' 综合：' + game.frStars(4) + ' </br>'],
                                        ['fr_muyada',
                                            '</br><span class="bluetext">关联角色</span>：流亡者佣兵团角色<br>',
                                            '进攻：' + game.frStars(4) + ' 爆发：' + game.frStars(2) +
                                            ' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(3) +
                                            ' </br>控制：' + game.frStars(5) + ' 辅助：' + game.frStars(0) +
                                            '</br>谋略：' + game.frStars(2) + ' 综合：' + game.frStars(3) + ' </br>'],
                                        ['fr_yada',
                                            '</br><span class="bluetext">关联角色</span>：来自坷拉的兽人<br>',
                                            '进攻：' + game.frStars(2) + ' 爆发：' + game.frStars(0) +
                                            ' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(2) +
                                            ' </br>控制：' + game.frStars(4) + ' 辅助：' + game.frStars(3) +
                                            '</br>谋略：' + game.frStars(3) + ' 综合：' + game.frStars(3) + ' </br>'],
                                        ['fr_fate',
                                            '</br><span class="bluetext">关联角色</span>：米亚<br>',
                                            '进攻：' + game.frStars(3) + ' 爆发：' + game.frStars(1) +
                                            ' </br>运气：' + game.frStars(6) + ' 生存：' + game.frStars(4) +
                                            ' </br>控制：' + game.frStars(0) + ' 辅助：' + game.frStars(0) +
                                            '</br>谋略：' + game.frStars(4) + ' 综合：' + game.frStars(4) + ' </br>'],
                                        ['fr_liya',
                                            '</br><span class="bluetext">关联角色</span>：卢森特<br>',
                                            '进攻：' + game.frStars(3) + ' 爆发：' + game.frStars(0) +
                                            ' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(3) +
                                            ' </br>控制：' + game.frStars(4) + ' 辅助：' + game.frStars(0) +
                                            '</br>谋略：' + game.frStars(2) + ' 综合：' + game.frStars(3) + ' </br>'],
                                        ['fr_sam',
                                            '</br><span class="bluetext">关联角色</span>：海<br>',
                                            '进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
                                            ' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(6) +
                                            ' </br>控制：' + game.frStars(3) + ' 辅助：' + game.frStars(5) +
                                            '</br>谋略：' + game.frStars(2) + ' 综合：' + game.frStars(5) + ' </br>'],
                                        ['fr_ham',
                                            '</br><span class="bluetext">关联角色</span>：山<br>',
                                            '进攻：' + game.frStars(5) + ' 爆发：' + game.frStars(5) +
                                            ' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(2) +
                                            ' </br>控制：' + game.frStars(3) + ' 辅助：' + game.frStars(0) +
                                            '</br>谋略：' + game.frStars(4) + ' 综合：' + game.frStars(5) + ' </br>'],
                                    ];
                                    lib.game.createview(node, charalist);
                                }
                            },
                        },
                        yongbingview: {
                            name: '佣兵团',
                            mode: '',
                            intro: [],
                            showcase: function (init) {
                                var node = this;
                                if (init) {
                                    var charalist = [
                                        ['fr_sisk',
                                            '</br><span class="bluetext">关联角色</span>：流亡者佣兵团角色<br>',
                                            '进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
                                            ' </br>运气：' + game.frStars(5) + ' 生存：' + game.frStars(3) +
                                            ' </br>控制：' + game.frStars(1) + ' 辅助：' + game.frStars(6) +
                                            '</br>谋略：' + game.frStars(2) + ' 综合：' + game.frStars(4) + ' </br>'],
                                        ['fr_kersm',
                                            '</br><span class="bluetext">关联角色</span>：流亡者佣兵团角色<br>',
                                            '进攻：' + game.frStars(4) + ' 爆发：' + game.frStars(2) +
                                            ' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(2) +
                                            ' </br>控制：' + game.frStars(3) + ' 辅助：' + game.frStars(4) +
                                            '</br>谋略：' + game.frStars(2) + ' 综合：' + game.frStars(3) + ' </br>'],
                                        ['fr_yada',
                                            '</br><span class="bluetext">关联角色</span>：流亡者佣兵团角色<br>',
                                            '进攻：' + game.frStars(2) + ' 爆发：' + game.frStars(0) +
                                            ' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(2) +
                                            ' </br>控制：' + game.frStars(4) + ' 辅助：' + game.frStars(3) +
                                            '</br>谋略：' + game.frStars(3) + ' 综合：' + game.frStars(3) + ' </br>'],
                                    ];
                                    lib.game.createview(node, charalist);
                                }
                            },
                        },
                        schoolview: {
                            name: '魔法学院',
                            mode: '',
                            intro: [],
                            showcase: function (init) {
                                var node = this;
                                if (init) {
                                    var charalist = [
                                        ['fr_milism',
                                            '</br><span class="bluetext">关联角色</span>：无<br>',
                                            '进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
                                            ' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(0) +
                                            ' </br>控制：' + game.frStars(5) + ' 辅助：' + game.frStars(5) +
                                            '</br>谋略：' + game.frStars(3) + ' 综合：' + game.frStars(4) + ' </br>'],
                                        ['fr_lusiya',
                                            '</br><span class="bluetext">关联角色</span>：流亡者佣兵团角色<br>',
                                            '进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
                                            ' </br>运气：' + game.frStars(3) + ' 生存：' + game.frStars(3) +
                                            ' </br>控制：' + game.frStars(2) + ' 辅助：' + game.frStars(4) +
                                            '</br>谋略：' + game.frStars(5) + ' 综合：' + game.frStars(5) + ' </br>'],
                                    ];
                                    lib.game.createview(node, charalist);
                                }
                            },
                        },
                        godview: {
                            name: '兽人之神',
                            mode: '',
                            intro: [],
                            showcase: function (init) {
                                var node = this;
                                if (init) {
                                    var charalist = [
                                        ['fr_hars',
                                            '</br><span class="bluetext">关联角色</span>：所有兽人<br>',
                                            '进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
                                            ' </br>运气：' + game.frStars(2) + ' 生存：' + game.frStars(2) +
                                            ' </br>控制：' + game.frStars(6) + ' 辅助：' + game.frStars(3) +
                                            '</br>谋略：' + game.frStars(3) + ' 综合：' + game.frStars(4) + ' </br>'],
                                        ['fr_faers',
                                            '</br><span class="bluetext">关联角色</span>：所有兽人<br>',
                                            '进攻：' + game.frStars(4) + ' 爆发：' + game.frStars(4) +
                                            ' </br>运气：' + game.frStars(4) + ' 生存：' + game.frStars(4) +
                                            ' </br>控制：' + game.frStars(0) + ' 辅助：' + game.frStars(0) +
                                            '</br>谋略：' + game.frStars(3) + ' 综合：' + game.frStars(5) + ' </br>'],
                                        ['fr_oert',
                                            '</br><span class="bluetext">关联角色</span>：所有兽人<br>',
                                            '进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
                                            ' </br>运气：' + game.frStars(6) + ' 生存：' + game.frStars(3) +
                                            ' </br>控制：' + game.frStars(5) + ' 辅助：' + game.frStars(0) +
                                            '</br>谋略：' + game.frStars(0) + ' 综合：' + game.frStars(3) + ' </br>'],
                                    ];
                                    lib.game.createview(node, charalist);
                                }
                            },
                        },
                        travelerview: {
                            name: '游荡者',
                            mode: '',
                            intro: [],
                            showcase: function (init) {
                                var node = this;
                                if (init) {
                                    var charalist = [
                                        ['fr_miya',
                                            '</br><span class="bluetext">关联角色</span>：科里科特<br>',
                                            '进攻：' + game.frStars(4) + ' 爆发：' + game.frStars(6) +
                                            ' </br>运气：' + game.frStars(5) + ' 生存：' + game.frStars(0) +
                                            ' </br>控制：' + game.frStars(0) + ' 辅助：' + game.frStars(0) +
                                            '</br>谋略：' + game.frStars(1) + ' 综合：' + game.frStars(5) + ' </br>'],
                                        ['fr_krikt',
                                            '</br><span class="bluetext">关联角色</span>：米亚<br>',
                                            '进攻：' + game.frStars(4) + ' 爆发：' + game.frStars(4) +
                                            ' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(3) +
                                            ' </br>控制：' + game.frStars(3) + ' 辅助：' + game.frStars(0) +
                                            '</br>谋略：' + game.frStars(1) + ' 综合：' + game.frStars(5) + ' </br>'],
                                        ['fr_laays',
                                            '</br><span class="bluetext">关联角色</span>：无<br>',
                                            '进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
                                            ' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(0) +
                                            ' </br>控制：' + game.frStars(0) + ' 辅助：' + game.frStars(5) +
                                            '</br>谋略：' + game.frStars(3) + ' 综合：' + game.frStars(3) + ' </br>'],
                                    ];
                                    lib.game.createview(node, charalist);
                                }
                            },
                        },
                        fishview: {
                            name: '人鱼之海',
                            mode: '',
                            intro: [],
                            showcase: function (init) {
                                var node = this;
                                if (init) {
                                    var charalist = [
                                        ['fr_rest',
                                            '</br><span class="bluetext">关联角色</span>：科里科特<br>',
                                            '进攻：' + game.frStars(3) + ' 爆发：' + game.frStars(0) +
                                            ' </br>运气：' + game.frStars(2) + ' 生存：' + game.frStars(3) +
                                            ' </br>控制：' + game.frStars(3) + ' 辅助：' + game.frStars(2) +
                                            '</br>谋略：' + game.frStars(5) + ' 综合：' + game.frStars(4) + ' </br>'],
                                    ];
                                    lib.game.createview(node, charalist);
                                }
                            },
                        }
                    }
                }, {
                    image: ['extension/福瑞拓展/image/qidongye/furry_lib2.jpg'],
                    translate: '福瑞群像',
                    config: {
                        libhelp: {
                            name: "福瑞群像",
                            init: "1",
                            frequent: true,
                            item: { "1": "查看介绍", "2": "<li>本模式用于展示《福瑞拓展》扩展中的角色信息，包括角色介绍、角色技能、关联角色、角色分析等内容。", "3": "<li>左键点击下方小头像查看角色介绍、分析等内容，右键点击头像查看角色技能、称号等信息。" },
                        },
                    },
                    onremove: function () {
                        game.clearModeConfig('furry_lib');
                    }
                })

                //定义势力
                lib.group.add('fr_g_dragon');
                lib.translate.fr_g_dragon = '龙';
                lib.translate.fr_g_dragon2 = '龙';

                lib.group.add('fr_g_ji');
                lib.translate.fr_g_ji = '机';
                lib.translate.fr_g_ji2 = '机';

                lib.config.all.characters.push('furryPack');
                lib.translate['furryPack_character_config'] = "<img style=width:100px src=" + lib.assetURL + "extension/福瑞拓展/image/others/title.png>";// 包名翻译
                //卡包（手牌）
                lib.translate['furryCard_card_config'] = '福瑞卡牌';
                lib.config.all.cards.push('furryCard');
            }
        }, config: {
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
            "Background_Music": {
                name: "<b>背景音乐</b>",
                intro: "背景音乐：可随意点播、切换优质动听的背景音乐",
                init: lib.config.extension_福瑞拓展_Background_Music === undefined ? "1" : lib.config.extension_福瑞拓展_Background_Music,
                item: {
                    "0": "随机播放",
                    "1": "默认音乐",
                    "2": "Tarven",
                    "3": "Battle Against A True Hero",
                    "3": "My Sunset",
                },
                onclick: function (item) {
                    game.saveConfig('extension_福瑞拓展_Background_Music', item);
                    game.skplayBackgroundMusic();
                    ui.backgroundMusic.addEventListener('ended', game.skplayBackgroundMusic);
                },
                "visualMenu": function (node, link) {
                    node.style.height = node.offsetWidth * 0.6913 + "px";
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
                },
                "visualMenu": function (node, link) {
                    node.style.height = node.offsetWidth * 0.6913 + "px";
                    node.style.backgroundSize = '100% 100%';
                    node.className = 'frmusicname';
                    node.setBackgroundImage('extension/福瑞拓展/image/bgm/' + link + '.png');
                },
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
            "xuanshi": {
                name: "技能作弊",
                "init": "1",
                "item": { "1": "关闭", "2": "开启" }
            },
            "ShowmaxHandcard": {
                name: '手牌上限',
                init: false,
                intro: '将游戏内显示的手牌数改为显示手牌数与手牌上限。(例：2/3，代表拥有2张牌，手牌上限为3)',
            },
            "fr_shunfajiButton": {
                "name": "<b><font color=\"#00FFFF\">瞬发技按钮样式",
                "intro": "<b><font color=\"#00FFFF\">切换瞬发技按钮样式<br>可根据个人喜好切换<br>切换后，重启生效",
                "init": "shousha",
                "item": {
                    "shousha": "<b><font color=\"#FF6020\">手杀样式",
                    "olten": "<b><font color=\"#FFFF00\">十周年样式",
                    "ol": "<b><font color=\"#FF0000\">OL样式",
                },
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
            "fr_OpenAchievement": {
                "name": '福瑞拓展成就',
                "clear": true,
                onclick: function () {
                    if (typeof window.openfrAchievement == 'function') {
                        window.openfrAchievement();
                    } else {
                        alert("错误：您似乎没有打开福瑞拓展包。");
                    }
                }
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
        }, help: {}, package: {
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
            intro: "<li>图片来自网络，若有侵权请联系作者删除<li><font color=\"red\">点击底部彩色字体可直接加入群聊</font><li>👇下方为QQ群二维码<img style=width:238px src=" + lib.assetURL + "extension/福瑞拓展/image/others/qqgroup.png></img>",
            author: "<span id='FrOH' style='animation:changeable 20s infinite;-webkit-animation:changeable 20s infinite;'>钫酸酱</span><img style=width:238px src=" + lib.assetURL + "extension/福瑞拓展/image/others/title.png></img>",
            diskURL: "",
            forumURL: "",
            version: "2.1.0.5",
        }, files: { "character": [], "card": [], "skill": [] }
    }
})
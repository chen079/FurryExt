window.furry.frImport(function (lib, game, ui, get, ai, _status) {
    get.frAvatarSrc = function (name, flat) {
        if (!flat) flat = false
        if (!name) return null;
        var src = null;
        var ext = '.jpg';
        var subfolder = 'default';
        var dbimage = null, extimage = null, modeimage = null;
        var nameinfo;
        var gzbool = false;
        var mode = get.mode();
        if (lib.characterPack['mode_' + mode] && lib.characterPack['mode_' + mode][name]) {
            if (mode == 'guozhan') {
                nameinfo = lib.character[name];
                if (name.indexOf('gz_shibing') == 0) {
                    name = name.slice(3, 11);
                }
                else {
                    if (lib.config.mode_config.guozhan.guozhanSkin && lib.character[name] && lib.character[name][4].includes('gzskin')) gzbool = true;
                    name = name.slice(3);
                }
            }
            else {
                modeimage = mode;
            }
        }
        else if (lib.character[name]) {
            nameinfo = lib.character[name];
        }
        else if (name.indexOf('::') != -1) {
            name = name.split('::');
            modeimage = name[0];
            name = name[1];
        }
        if (!modeimage && nameinfo && nameinfo[4]) {
            for (var i = 0; i < nameinfo[4].length; i++) {
                if (nameinfo[4][i].indexOf('ext:') == 0) {
                    extimage = nameinfo[4][i]; break;
                }
                else if (nameinfo[4][i].indexOf('db:') == 0) {
                    dbimage = nameinfo[4][i]; break;
                }
                else if (nameinfo[4][i].indexOf('mode:') == 0) {
                    modeimage = nameinfo[4][i].slice(5); break;
                }
                else if (nameinfo[4][i].indexOf('character:') == 0) {
                    name = nameinfo[4][i].slice(10); break;
                }
            }
        }
        if (!flat) {
            if (nameinfo[4][i]) return nameinfo[4][i]
            else return 'character:' + name
        }
        if (extimage) {
            src = extimage.replace(/ext:/, 'extension/');
        }
        else if (dbimage) {
            return null;
        }
        else if (modeimage) {
            src = 'image/mode/' + modeimage + '/character/' + name + ext;
        }
        else if (lib.config.skin[name] && arguments[2] != 'noskin') {
            src = 'image/skin/' + name + '/' + lib.config.skin[name] + ext;
        }
        else {
            src = 'image/character/' + (gzbool ? 'gz_' : '') + name + ext;
        }
        return src;
    }
    get.arraysIntersection = function (arrays) {
        // 如果数组个数小于 2，无法形成交集
        if (arrays.length < 2) {
            return [];
        }

        // 将第一个数组转换为 Set
        let intersection = new Set(arrays[0]);

        // 遍历其他数组，保留在交集中出现的元素
        for (let i = 1; i < arrays.length; i++) {
            let currentArray = arrays[i];
            intersection = new Set([...intersection].filter(element => currentArray.includes(element)));
        }

        return [...intersection];
    }
    get.findOrigin = function (value) {
        var list = []
        var characters = Object.keys(lib.character)
        var map = {}
        for (var i of characters) {
            map[i] = lib.translate[i]
        }
        if (map.hasOwnProperty(value)) list.add(value)
        for (var i in map) {
            if (get.pinyin(map[i], false).join("").indexOf(get.pinyin(value, false).join("")) !== -1) list.add(i)
            if (map[i].indexOf(value) != -1) list.add(i)
            if (i.indexOf(value) != -1) list.add(i)
        }
        return list.unique()
    }
    game.getInCenter = function () {
        //--------------------获取中央区的牌-------------------
        var list = [];
        game.getGlobalHistory('cardMove', function (evt) {
            if (evt.name == 'lose') {
                if (evt.position == ui.discardPile) {
                    for (var i of evt.cards) list.add(i);
                }
            }
            else {
                if (evt.name == 'cardsDiscard') {
                    for (var i of evt.cards) list.add(i);
                }
            }
        });
        list = list.filterInD('d')
        return list
    }
    game.doMultiEvents = function () {
        let next = game.createEvent("doMultiEvents", false);
        next.events = [];
        next.add = function (item) {
            if (typeof item == "function") {
                this.events.push(item);
            } else if (typeof item == "object") {
                let evt = item;
                if (Array.isArray(evt)) {
                    if (typeof evt[i] == "function") {
                        let args = Array.from(evt).slice(1);
                        evt = (result, results) => evt[0].apply(null, [result, results].concat(args));
                    } else {
                        let args = Array.from(evt).slice(2);
                        evt = evt[0][evt[1]].apply(evt[0], args);
                    }
                }
                _status.event.next.remove(evt);
                this.events.push(evt);
            }
        }
        for (let i = 0; i < arguments.length; ++i) {
            next.add(arguments[i]);
        }
        next.setContent(function () {
            "step 0"
            event.result = [];
            "step 1"
            if (!event.events.length) event.finish();
            "step 2"
            let current = event.events.shift();
            if (typeof current == "function") {
                current(event.result.length > 0 ? event.result[event.result.length - 1] : undefined, event.result);
            }
            else {
                event.next.push(current);
            }
            "step 3"
            event.result.push(result);
            event.goto(1);
        });
        return next;
    }
    game.addResult = function () {
        const args = Array.from(arguments), event = args[0], items = args.slice(1);
        let evt = event;
        if (event.name != "addResult") {
            evt = game.createEvent("addResult", false);
            evt.origin = event;
            _status.event.next.remove(event);
            evt.map = new Map();
            evt.add = function (items) {
                for (let i = 0; i < items.length; ++i) {
                    if (typeof items[i] == "object") {
                        for (const name in items[i]) evt.map.set(name, items[i][name]);
                    }
                    else evt.map.set(items[i], items[++i]);
                }
            }
            evt.setContent(function () {
                "step 0"
                event.next.add(event.origin);
                "step 1"
                event.result = result;
                for (const item of event.map) {
                    event.result[item[0]] = event.result[item[1]];
                }
                "step 2"
                event.map.clear();
            });
        }
        evt.add(items);
        return evt;
    }
    //----------------------------性别判断--------------------------
    lib.element.player.frPrimarySex = function () {
        if (this.sex == 'male' || this.sex == 'female') {
            return this.sex;
        }
        var info = get.character(this.name == 'unknown' ? this.name1 : this.name, 4);
        if (info && info.includes('frPrimarySexFemale')) {
            return 'female';
        }
        return 'male';
    };
    //---------------------------------------自定义函数：选择文本------------------------------------------//
    //此处内容由钫酸酱制作，TAT
    lib.element.player.chooseText = function chooseText(object) {
        var next = game.createEvent('chooseText');
        if (arguments.length == 1 && get.objtype(arguments[0]) == 'object') {
            for (let key in object) next[key] = object[key]
        }
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'boolean') {
                next.forced = arguments[i];
            } else if (Array.isArray(arguments[i])) {
                next.filterText = arguments[i]
            } else if (typeof arguments[i] == 'function') {
                if (next.ai) next.filterText = arguments[i];
                else next.ai = arguments[i];
            }
            else if (typeof arguments[i] == 'string') {
                get.evtprompt(next, arguments[i]);
            }
            else if (get.itemtype(arguments[i]) == 'dialog') {
                next.dialog = arguments[i];
            }
            else if (typeof arguments[i] == 'number') {
                next.max = arguments[i]
            }
            if (next.forced == undefined) next.forced = false;
        }
        next.player = this;
        next.setContent(function () {
            'step 0';
            if (event.isMine()) {
                if (event.dialog) {
                    event.dialog.open();
                } else {
                    if (!event.prompt) event.prompt = '请在下方输入文本'
                    event.dialog = ui.create.dialog(event.prompt);
                    if (event.prompt2) {
                        event.dialog.addText(event.prompt2, event.prompt2.length <= 20);
                    }
                }
                event.result = {}
                const div = document.createElement('div');
                const input = div.appendChild(document.createElement('input'));
                input.style.background = 'black';
                input.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=50,finishOpacity=40)";
                input.style.opacity = "0.6"
                input.style.fontSize = '20px';
                input.style.textAlign = 'center';
                input.style.color = '#c9c8a2';
                input.addEventListener('keydown', e => e.stopPropagation());
                input.addEventListener('keyup', e => e.stopPropagation());
                input.placeholder = '请在此输入文本';
                input.setAttribute('maxlength', event.max);
                event.dialog.add(div);
                game.pause();
                game.countChoose();
                event.choosing = true;
                var button = ui.create.control('确定', () => {
                    if (event.filterText) {
                        var ok
                        if (typeof event.filterText == 'function') ok = event.filterText(input.value)
                        else if (Array.isArray(event.filterText)) ok = event.filterText.includes(input.value)
                        if (!ok) return alert('您输入的内容不符合要求')
                    }
                    event.result.bool = true
                    event.result.text = input.value ? input.value : ''
                    doClose()
                });
                if (!event.forced) {
                    var cancel = ui.create.control('取消', () => {
                        event.result.bool = false
                        doClose()
                    });
                }
                event.switchToAuto = () => {
                    event.result = 'ai';
                    doClose()
                };
                const doClose = () => {
                    button.remove();
                    if (cancel) cancel.remove();
                    game.resume();
                }
            } else if (event.isOnline()) {
                event.send();
            } else {
                event.result = 'ai';
            }
            'step 1';
            if (event.result == 'ai') {
                if (event.ai) {
                    event.value = event.ai(event.getParent(), player);
                }
                event.result = {}
                event.result.bool = (event.value != -1 || event.forced)
                if (event.result.bool) event.result.text = event.value
            }
            _status.imchoosing = false;
            event.choosing = false;
            if (event.dialog) event.dialog.close();
            event.resume();
        });
        next._args = Array.from(arguments);
        next.forceDie = true;
        return next;
    }
    //---------------------------------------自定义函数：选择数量------------------------------------------//
    lib.element.player.chooseNumber = function chooseNumber(range, ...options) {
        let next = game.createEvent("chooseNumber");
        let begin, transform = {}, forced, filter;

        for (const item of options) {
            if (typeof item === "number") {
                begin = item;
            }
            else if (typeof item === "string") {
                get.evtprompt(next, item);
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
        if (!range) return;
        range = get.select(range)
        let max = range[1], min = range[0]
        if (!begin || begin < min) begin = min;
        if (begin && begin > max) begin = max;

        next.set("player", this);
        next.set("min", min);
        next.set("max", max);
        next.set("num", begin);
        next.set("show", transform);

        if (forced) next.set("forced", forced);
        if (filter) next.set("filter", filter);

        next._args = [min, max, ...options];
        next.setContent(function () {
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
                    clear: ui.create.control("确认", () => { })
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
                                if (event.num === num && !div.classList.includes("disabled"))
                                    div.classList.add("disabled");
                                else if (div.classList.includes("disabled"))
                                    div.classList.remove("disabled");

                                break;
                            default:
                                switch (sym) {
                                    case symbol.i:
                                        switch (sym2) {
                                            case symbol.p:
                                                if (event.num + num <= event.max && div.classList.includes("disabled"))
                                                    div.classList.remove("disabled");
                                                break;
                                            case symbol.m:
                                                if (event.num + num >= event.min && div.classList.includes("disabled"))
                                                    div.classList.remove("disabled");
                                                break;
                                        }
                                        break;
                                    case symbol.l:
                                        switch (event.num) {
                                            case event.min:
                                                if (sym2 === symbol.p && div.classList.includes("disabled"))
                                                    div.classList.remove("disabled");
                                                if (sym2 === symbol.m && !div.classList.includes("disabled"))
                                                    div.classList.add("disabled");
                                                break;
                                            case event.max:
                                                if (sym2 === symbol.m && div.classList.includes("disabled"))
                                                    div.classList.remove("disabled");
                                                if (sym2 === symbol.p && !div.classList.includes("disabled"))
                                                    div.classList.add("disabled");
                                                break;
                                        }
                                        break;
                                    case symbol.m:
                                        if (event.num + num <= event.max && div.classList.includes("disabled"))
                                            div.classList.remove("disabled");
                                        if (event.num + num < event.min && !div.classList.includes("disabled"))
                                            div.classList.add("disabled");
                                        break;
                                    case symbol.p:
                                        if (event.num + num >= event.min && div.classList.includes("disabled"))
                                            div.classList.remove("disabled");
                                        if (event.num + num > event.max && !div.classList.includes("disabled"))
                                            div.classList.add("disabled");
                                        break;
                                    default:
                                        if (event.num + num < event.min && !div.classList.includes("disabled"))
                                            div.classList.add("disabled");
                                        if (event.num + num > event.max && !div.classList.includes("disabled"))
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
                        if (result && event.controls.clear.classList.includes("disabled")) event.controls.clear.classList.remove("disabled");
                        else if (!result && !event.controls.clear.classList.includes("disabled")) event.controls.clear.classList.add("disabled");
                    }
                };

                const doShow = () => {
                    event.controls.num.textContent = (Reflect.get(event.show, event.num) !== undefined ? Reflect.get(event.show, event.num) : event.num).toString();
                    if (event.controls.num.classList.includes("disabled")) event.controls.num.classList.remove("disabled");
                };

                const pressTemplate = (self, sym, num) => () => {
                    if (!self.classList.includes("disabled")) {
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
                            if (self.classList.includes("disabled")) {
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
                    if (!numdiv.classList.includes("disabled")) {
                        isInput = true;

                        numdiv.classList.add("disabled");
                        for (const [div, _item] of divsConfig)
                            if (!div.classList.includes("disabled"))
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
                        if (event.controls.clear.classList.includes("disabled")) event.controls.clear.classList.remove("disabled");
                    }
                })

                for (const [div, [sym, num]] of divsConfig) {
                    div.addEventListener(lib.config.touchscreen ? "touchend" : "click", pressTemplate(div, sym, num));
                    if (lib.config.button_press) {
                        div.addEventListener(lib.config.touchscreen ? "touchstart" : "mousedown", pressDownTemplate(div, sym, num));
                        div.addEventListener(lib.config.touchscreen ? "touchend" : "mouseup", pressUpTemplate(div));
                    }
                }

                if (event.controls.cancel) event.controls.cancel.addEventListener(lib.config.touchscreen ? "touchend" : "click", itemTemplate(_num =>
                    true, bool => ({ bool })));
                if (event.controls.clear) event.controls.clear.addEventListener(lib.config.touchscreen ? "touchend" : "click", itemTemplate(num =>
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
                            text.style.fontFamily = "7px";
                            text.textContent = "请输入符合要求的数字！";
                            event._div.append(text);
                            event.controls.clear._setTimeout = setTimeout(() => {
                                event._div.removeChild(text);
                            }, 500);
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
        });

        next._set.length = 0;

        return next;
    };
    //---------------------------------------自定义函数：chooseButtonControl------------------------------------------//
    //此处内容由狂神制作，乐
    lib.element.player.chooseButtonControl = function (object) {
        let next = game.createEvent('chooseButtonControl');
        next.player = this;
        if (arguments.length == 1 && get.objtype(arguments[0]) == 'object') {
            for (let key in object) next[key] = object[key];
        }
        else for (let arg of arguments) {
            //dialog
            if (get.itemtype(arg) == 'dialog') next.dialog = arg;
            else if (typeof arg == 'number') next.dialog = get.idDialog(arg);
            else if (Array.isArray(arg)) next.createDialog = arg;

            else if (typeof arg == 'boolean') {
                if (next.forced == undefined || next.forced == null) next.forced = arg;
                else next.multibutton = arg;
            }

            else if (typeof arg == 'function') {
                if (!next.control) next.control = arg;
                else if (!next.processAI) next.processAI = arg;
                else next.filterButton = arg;
            }
        }

        if (typeof next.dialog == 'number') {
            next.dialog = get.idDialog(next.dialog);
        } else if (get.itemtype(next.dialog) == 'dialog') {
            next.closeDialog = true;
        } else if (!next.dialog && Array.isArray(next.createDialog)) {
            next.dialog = ui.create.dialog.apply(this, next.createDialog);
            next.closeDialog = true;
        }

        if (typeof next.forced != 'boolean') next.forced = false;
        if (typeof next.forced != 'boolean') next.multibutton = false;
        if (next.isMine() == false && next.dialog) next.dialog.style.display = 'none';
        if (!next.control) next.control = () => 'ok';
        if (!next.filterButton) next.filterButton = () => true;

        next.setContent(function () {
            'step 0'
            let chooseButton = function (event, player) {
                if (!event.result) event.result = {};
                event.forceMine = true;
                event.buttons = [];
                for (let button of event.dialog.buttons) {
                    button.classList.add('pointerdiv');
                    button.classList.add('selectable');
                }
                event.dialog.open();

                event.custom.replace.button = function (button) {
                    if (!event.dialog.includes(button.parentNode)) return;
                    if (button.classList.includes('unselectable')) return;

                    for (let i of event.dialog.buttons) i.classList.remove('unselectable');

                    if (button.classList.includes('selected')) {
                        event.buttons.remove(button);
                        button.classList.remove('selected');
                        for (let i of event.dialog.buttons) {
                            if (event.buttons.includes(i)) continue;
                            if (!event.filterButton(event.buttons.slice(0).add(i), i)) i.classList.add('unselectable');
                        }
                    } else {
                        event.buttons.add(button);
                        button.classList.add('selected');
                        for (let i of event.dialog.buttons) {
                            if (event.buttons.includes(i)) continue;
                            if (!event.multibutton) i.classList.add('unselectable');
                            else if (!event.filterButton(event.buttons.slice(0).add(i), i)) i.classList.add('unselectable');
                        }
                    }

                    event.controls.replacex();
                }

                event.custom.replace.window = function () {
                    event.buttons = [];
                    for (let i of event.dialog.buttons) {
                        i.classList.remove('selected');
                        i.classList.remove('unselectable');
                    }
                    event.controls.replacex();
                }

                event.controls = ui.create.control();
                event.controls.replacex = function () {
                    let newControls, args = event.control(event.buttons);
                    if (Array.isArray(args)) newControls = args;
                    else if (args != undefined && args != null) newControls = [args];
                    else newControls = [];

                    if (event.multibutton) {
                        if (newControls.includes('cancel2')) newControls.remove('cancel2');
                        if (!event.forced) newControls.add('cancel2');
                    }
                    else if (!event.forced && !newControls.includes('cancel2')) {
                        if (newControls.length == 0 || event.buttons.length == 0) newControls.add('cancel2');
                    }

                    this.style.opacity = newControls.length > 0 ? 1 : 0;

                    newControls.push(function (control) {
                        if (control == 'cancel2') event.result.bool = false;
                        else {
                            event.result.bool = true;
                            event.result.buttons = event.buttons;
                            event.result.links = event.buttons.map(button => button.link);
                            event.result.control = control;
                        }
                        event.dialog.close();
                        event.controls.close();
                        game.resume();
                        _status.imchoosing = false;
                    });

                    return this.replace.apply(this, newControls);
                }
                event.controls.replacex();
                game.pause();
                game.countChoose();
            };

            if (event.isMine()) chooseButton(event, player);
            else if (event.isOnline()) {
                event.player.send(chooseButton, event, player);
                event.player.wait();
                game.pause();
            } else {
                if (event.dialog && event.closeDialog) event.dialog.close();
                if (event.controls && event.closeDialog) event.controls.close();
                game.resume();
                _status.imchoosing = false;

                if (event.processAI) event.result = event.processAI(event, player);
                else if (!event.forced) event.result = { bool: false };
                else throw "processAI : " + event.getParent().name + "'s chooseButtonControl is forced";

                event.finish();
            }

            'step 1'
            if (event.result.control == 'cancel2') {
                event.finish();
                return;
            }
        });
        next._args = Array.from(arguments);
        return next;
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
        if (get.mode() == 'furry_lib') return;
        if (!this.isUnderControl(true)) {
            return;
        }
        var info = lib.skill[skillname];
        if (!info) return;
        if (info.shunfa) {
            var button = ui.create.div('.Fr-shunfaanniu-' + lib.config.extension_福瑞拓展_fr_shunfajiButton, this);
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
                            player.popup('不可发动', 'water', false);
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
    //---------------------------------------奋发技------------------------------------------//
    lib.element.player.frFenfa = function (skillname) {
        var info = lib.skill[skillname];
        if (!info) return;
        if (!info.fenfa) return;
        if (info.fenfa) {
            info.skillBlocker = function (skill, player) {
                var range;
                if (typeof info.fenfa === 'function') {
                    range = get.select(info.fenfa(player));
                } else {
                    range = get.select(info.fenfa);
                }
                if (range[0] == range[1]) {
                    return skill == skillname && !(player.hp == range[0])
                } else {
                    return skill == skillname && !(player.hp >= range[0] && player.hp <= range[1])
                }
            }
            info.onremove = function (player, skill) {
                player.removeSkillBlocker(skill);
            }
            this.addSkillBlocker(skillname);
        }
    }
    // ---------------------------------------自定义函数：改变原画------------------------------------------//
    lib.element.player.setfrAvatar = function (name, name2, video, fakeme) {
        var node
        if (this.name2 == name) {
            node = this.node.avatar2
            this.smoothAvatar(true, video)
        }
        else if (this.name1 == name) {
            node = this.node.avatar
            this.smoothAvatar(false, video)
        }
        if (node) {
            if (lib.config.frLutou) {
                var url = 'extension/福瑞拓展/image/skin/origin-lutou/'
            } else {
                var url = 'extension/福瑞拓展/image/skin/origin-standard/'
            }
            node.setBackgroundImage(url + name2 + (lib.config.frLutou ? '.png' : '.jpg'))
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
    // ---------------------------------------自定义函数：视为回复------------------------------------------//
    lib.element.player.fakeRecover = function () {
        var next = game.createEvent('recover');
        next.player = this;
        var nocard, nosource;
        var event = _status.event;
        for (var i = 0; i < arguments.length; i++) {
            if (get.itemtype(arguments[i]) == 'cards') {
                next.cards = arguments[i].slice(0);
            }
            else if (get.itemtype(arguments[i]) == 'card') {
                next.card = arguments[i];
            }
            else if (get.itemtype(arguments[i]) == 'player') {
                next.source = arguments[i];
            }
            else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].name) {
                next.card = arguments[i];
            }
            else if (typeof arguments[i] == 'number') {
                next.num = arguments[i];
            }
            else if (arguments[i] == 'nocard') {
                nocard = true;
            }
            else if (arguments[i] == 'nosource') {
                nosource = true;
            }
        }
        if (next.card == undefined && !nocard) next.card = event.card;
        if (next.cards == undefined && !nocard) next.cards = event.cards;
        if (next.source == undefined && !nosource) next.source = event.player;
        if (next.num == undefined) next.num = 1;
        if (next.num <= 0) _status.event.next.remove(next);
        next.setContent(function () {
            if (lib.config.background_audio) {
                game.playAudio('effect', 'recover');
            }
            game.broadcast(function () {
                if (lib.config.background_audio) {
                    game.playAudio('effect', 'recover');
                }
            });
            if (num > player.maxHp - player.hp) {
                num = player.maxHp - player.hp;
                event.num = num;
            }
            if (num > 0) {
                game.broadcastAll(function (player) {
                    if (lib.config.animation && !lib.config.low_performance) {
                        player.$recover();
                    }
                }, player);
                player.$damagepop(num, 'wood');
                game.log(player, '视为回复了' + get.cnNumber(num) + '点体力')
            }
        });
        return next;
    }
    // ---------------------------------------自定义函数：视为流失体力------------------------------------------//
    lib.element.player.fakeLoseHp = function (num) {
        var next = game.createEvent('loseHp');
        next.num = num;
        next.player = this;
        if (next.num == undefined) next.num = 1;
        next.setContent(function () {
            "step 0"
            if (lib.config.background_audio) {
                game.playAudio('effect', 'loseHp');
            }
            game.broadcast(function () {
                if (lib.config.background_audio) {
                    game.playAudio('effect', 'loseHp');
                }
            });
            game.log(player, '视为失去了' + get.cnNumber(num) + '点体力')
            "step 1"
            if (player.hp <= 0) {
                game.delayx();
                event._dyinged = true;
                player.dying(event);
            }
        });
        return next;
    }
    // ---------------------------------------击碎勾玉------------------------------------------//
    lib.element.player.Frbroken = function () {
        var next = game.createEvent('Frbroken');
        next.player = this;
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'number') next.num = arguments[i];
        }
        if (next.num == undefined) next.num = 1;
        if (next.num > (this.maxHp - this.countMark('_fr_Broken'))) next.num = this.maxHp - this.countMark('_fr_Broken');
        if (next.num <= 0) _status.event.next.remove(next);
        next.setContent(function () {
            player.loseMaxHp(num);
            player.addMark('_fr_Broken', num, false);
            game.log(player, '被击碎了', get.translation(num), '个', '#g勾玉');
        });
        return next;
    }
    lib.element.player.Frunbroken = function () {
        var next = game.createEvent('Frunbroken');
        next.player = this;
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'number') next.num = arguments[i];
        }
        if (next.num == undefined) next.num = 1;
        if (next.num > this.countMark('_fr_Broken')) next.num = this.countMark('_fr_Broken');
        if (next.num <= 0) _status.event.next.remove(next);
        next.setContent(function () {
            player.gainMaxHp(num);
            player.recover(num)
            player.removeMark('_fr_Broken', num, false);
            game.log(player, '修复了', get.translation(num), '个', '#g碎玉');
        });
        return next;
    }
    lib.element.player.hideCharacter = function (playername) {
        var next = game.createEvent('hideCharacter')
        var player = this
        next.player = player
        if (typeof playername == 'number') {
            next.playername = player['name' + playername]
        } else if (typeof playername == 'string') {
            next.playername = playername
        } else if (get.itemtype(playername) == 'player') {
            next.playername = playername.name1
        }
        if (!playername) next.playername = this.name1
        next.setContent(function () {
            'step 0'
            var name = event.playername
            var info = lib.character[name];
            if (!info) return;
            if (player.name1 != name && player.name2 != name) return;
            var skills = info[3].slice(0);
            if (name == player.name1) {
                if (player.classList.includes(_status.video ? 'unseen_v' : 'unseen')) return;
                game.log('#g' + player.name1, '进入了隐匿状态')
                player.classList.add(_status.video ? 'unseen_v' : 'unseen');
                player.name = 'unknown';
                if (!player.node.name_seat && !_status.video) {
                    player.node.name_seat = ui.create.div('.name.name_seat', get.verticalStr(get.translation(player.name)), player);
                    player.node.name_seat.dataset.nature = get.groupnature(player.group);
                };
                player.sex = 'male';
            } else {
                if (player.classList.includes(_status.video ? 'unseen2_v' : 'unseen2')) return;
                game.log('#g' + player.name2, '进入了隐匿状态')
                player.classList.add(_status.video ? 'unseen2_v' : 'unseen2');
            };
            if (!player.hiddenSkills) player.hiddenSkills = [];
            game.log(game.me.hiddenSkills);
            player.removeSkill(skills);
            player.hiddenSkills.addArray(skills);
            player.storage.nohp = true;
            player.addSkill('g_hidden_ai');
            lib.skill.fryinni = {
                mod: {
                    maxHandcard: function (player, num) {
                        return num + 99;
                    },
                },
            }
            if (!player.hasSkill('fryinni')) player.addTempSkill('fryinni', { player: 'showCharacterAfter' })
            player.storage.rawHp = player.hp;
            player.storage.rawMaxHp = player.maxHp;
            'step 1'
            player.hp = 1;
            player.maxHp = 1;
            player.node.hp.hide();
            player.update();
        })
        return next
    }
})
window.furry_drama = function (name, style1, style2, style3, style4, style5) {
    if (!name) throw arguments;
    if (game.isShowingDrama) {
        return;
    }
    game.isShowingDrama = true;
    var List;
    var background_div = ui.create.div('.background_div', ui.window)
    var bgm = ui.backgroundMusic.src
    //原来的背景图片
    var Start = function () {
        ui.arena.classList.remove('menupaused');
        //移除背景模糊
        ui.arena.hide();
        //隐藏人物等
        ui.system.hide();
        //隐藏菜单的
        ui.menuContainer.hide();
        ui.cardPileNumber.hide();
        _status.paused2 = true;
        if (document.getElementsByClassName('static') != null && document.getElementsByClassName('static')[1]) {
            document.getElementsByClassName('static')[1].hide()
        }
        ui.backgroundMusic.src = ''
    }
    var saveChoice = function (mark, value) {
        if (!value) value = true
        lib.frStory.storage[mark] = value
        return value
    }
    var choiceClear = function () {
        while (choice.firstChild) {
            choice.removeChild(choice.firstChild);
        }
        hasChoice = false
    }
    var End = function (background, dialog, avatar, avatar2, choice, time, func) {
        ui.arena.show();
        ui.system.show();
        ui.cardPileNumber.show();
        ui.backgroundMusic.src = bgm
        if (background) {
            background.remove()
        }
        if (dialog) {
            dialog.remove()
        }
        if (avatar) {
            avatar.remove();
        }
        if (avatar2) {
            avatar2.remove();
        }
        if (choice) {
            choice.remove();
        }
        if (time) {
            clearInterval(time);
        }
        if (style1) {
            style1.remove();
        }
        if (style2) {
            style2.remove();
        }
        if (style3) {
            style3.remove();
        }
        if (style4) {
            style4.remove();
        }
        if (style5) {
            style5.remove();
        }
        if (div_break) {
            div_break.remove();
        }
        if (choice) {
            choice.remove()
        }

        game.isShowingDrama = false;
        if (typeof func == 'function') {
            func();
        }
        _status.paused2 = false;
    }
    var avatarshow = function () {
        if (avatar != undefined) {
            avatar_div.style.height = '345px';
            avatar_div.style.bottom = '0px';
            avatar_div.style['background-color'] = 'rgba(0,0,0,0)';
            if (avatar.indexOf('dr_') == 0) {
                avatar_div.setBackgroundImage('extension/福瑞拓展/image/skin/drama/' + avatar + '.png');
            } else avatar_div.setBackgroundImage('extension/福瑞拓展/image/skin/origin-lutou/' + avatar + '.png');
            avatar_div.style.backgroundSize = "contain";
            avatar_div.style.backgroundRepeat = "no-repeat"
            avatar_div.style.backgroundPosition = 'bottom'
            avatar_div.style.borderRadius = '5px';
            if (avatar.indexOf('dr_') == 0) {
                avatar_div.innerHTML = "<span style='background:hsla(0,0%,20%,0.65)'>" + lib.frStory.characters[avatar] + "</span>";
            } else avatar_div.innerHTML = "<span style='background:hsla(0,0%,20%,0.65)'>" + get.translation(avatar) + "</span>";
        } else {
            avatar_div.style.borderRadius = '';
            avatar_div.style.bottom = '10px';
            avatar_div.style['background-color'] = 'hsla(0,0%,20%,0.65)';
            avatar_div.style.height = '160px';
            avatar_div.style.backgroundImage = '';
            avatar_div.innerHTML = '';
        }
    }
    var avatar2show = function () {
        if (avatar2 != undefined) {
            avatar2_div.style.height = '345px';
            avatar2_div.style.bottom = '0px';
            avatar2_div.style['background-color'] = 'rgba(0,0,0,0)';
            if (avatar2.indexOf('dr_') == 0) {
                avatar2_div.setBackgroundImage('extension/福瑞拓展/image/skin/drama/' + avatar2 + '.png');
            } else avatar2_div.setBackgroundImage('extension/福瑞拓展/image/skin/origin-lutou/' + avatar2 + '.png');
            avatar2_div.style.backgroundSize = "contain";
            avatar2_div.style.backgroundRepeat = "no-repeat"
            avatar2_div.style.backgroundPosition = 'bottom'
            avatar2_div.style.borderRadius = '5px';
            if (avatar2.indexOf('dr_') == 0) {
                avatar2_div.innerHTML = "<span style='background:hsla(0,0%,20%,0.65)'>" + lib.frStory.characters[avatar2] + "</span>";
            } else avatar2_div.innerHTML = "<span style='background:hsla(0,0%,20%,0.65)'>" + get.translation(avatar2) + "</span>";
        } else {
            avatar2_div.style.borderRadius = '';
            avatar2_div.style.bottom = '10px';
            avatar2_div.style['background-color'] = 'hsla(0,0%,20%,0.65)';
            avatar2_div.style.height = '160px';
            avatar2_div.style.backgroundImage = '';
            avatar2_div.innerHTML = '';
        }
    }
    var playStory = function () {
        for (var i in List[Listnum]) {
            switch (i) {
                case 'say':
                    if (typeof List[Listnum][i] == 'function') {
                        str = List[Listnum][i]();
                    } else {
                        str = List[Listnum][i];
                    }
                    break;
                case 'avatar':
                    avatar = List[Listnum][i];
                    break;
                case 'avatar2':
                    avatar2 = List[Listnum][i];
                    break;
                case 'background':
                    //ui.background.style.backgroundImage = List[Listnum][i];
                    var urlString = List[Listnum][i];
                    background_div.setBackgroundImage("extension/福瑞拓展/image/background/" + urlString);
                    break;
                case 'fuc':
                    List[Listnum][i]();
                    break;
                case 'bgm':
                    var bgm = List[Listnum][i]
                    if (bgm == 'none') {
                        ui.backgroundMusic.src = ''
                    } else lib.frStory.switchfrBgm(bgm)
                    break
                case 'se':
                    var se = List[Listnum][i]
                    lib.frStory.frPlayJuqingAudio(se)
                    break
                case 'choice':
                    hasChoice = true
                    if (typeof List[Listnum][i] == 'function') {
                        var choiceList = List[Listnum][i]()
                    } else {
                        var choiceList = List[Listnum][i]
                    }
                    for (var j = 0; j < choiceList.length; j++) {
                        (function (index) {
                            var option = ui.create.div('.choice-option', choice);
                            option.textContent = choiceList[j][1];
                            option.onclick = function () {
                                if (choiceList[index][2]) {
                                    if (typeof choiceList[index][2] == 'function') {
                                        choiceList[index][2]()
                                    } else {
                                        var mark = choiceList[index][2]
                                        saveChoice(mark)
                                    }
                                }
                                Listnum = choiceList[index][0] - 1;
                                choiceClear()
                                chat.onclick();
                            };
                        })(j);
                    }
                    break;
                case 'goto':
                    if (typeof List[Listnum][i] == 'function') {
                        var goto = List[Listnum][i]() - 1
                    } else {
                        var goto = parseInt(List[Listnum][i]) - 1
                    }
                    Listnum = goto
                    break
                case 'End': {
                    var isEnd = List[Listnum][i];
                    if (isEnd == true) End(background_div, chat, avatar_div, avatar2_div, choice, interval);
                    return;
                }
            }
        }
    }
    var div_break = ui.create.div(".div_break", background_div);
    div_break.addEventListener('click',
        function () {
            End(background_div, chat, avatar_div, avatar2_div, choice, interval);
        });
    List = lib.frStory.drama[name];

    var Listnum = 0;
    var str;
    var avatar;
    var avatar2;
    var hasChoice = false
    Start()
    //第一个
    playStory()

    var choice = ui.create.div('.choice', background_div)
    var avatar2_div = ui.create.div('.avatar2_div', background_div);
    var avatar_div = ui.create.div('.avatar_div', background_div);
    var chat = ui.create.div('.chat', background_div);
    lib.setScroll(chat);

    avatar2show()
    if (avatar2 != undefined) {
        chat.innerHTML = '<br>';
    } else {
        chat.innerHTML = '<br>';
    }

    avatarshow();
    if (avatar != undefined) {
        chat.innerHTML = '<br>';
    } else {
        chat.innerHTML = '<br>';
    }
    var num = 0;

    var interval = setInterval(function () {
        if (str && str[num]) {
            chat.innerHTML += str[num];
            num++;
        }
    }, 120)

    chat.onclick = function () {
        avatar = undefined
        avatar2 = undefined
        if (num < str.length - 1) {
            var str1 = '<br>' + str;
            chat.innerHTML = str1;
            num = str.length;
        } else if (!hasChoice) {
            chat.innerHTML = '<br>';
            Listnum++
            playStory()
            num = 0;
            avatarshow();
            avatar2show()
        }

    };

    avatar_div.onclick = function () {
        if (avatar == undefined) {
            chat.click();
        }
    };

    avatar2_div.onclick = function () {
        if (avatar2 == undefined) {
            chat.click();
        }
    };
}
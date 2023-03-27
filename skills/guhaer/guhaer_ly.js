skill = {
    derivation: ["guhaer_wy"],
    group: ["guhaer_ly_guess"],
    enable: ["chooseToUse", "chooseToRespond"],
    hiddenCard: function (player, name) {
        return lib.inpile.contains(name) && player.countCards('h') > 0;
    },
    filter: function (event, player) {
        if (!player.countCards('hs')) return false;
        if (!player.countCards('hs')) return false;
        for (var i of lib.inpile) {
            var type = get.type(i);
            if ((type == 'basic' || type == 'trick') && lib.filter.filterCard({ name: i }, player, event)) return true;
        }
        return false;
    },
    direct: true,
    chooseButton: {
        dialog: function (event, player) {
            var list = [];
            for (var i = 0; i < lib.inpile.length; i++) {
                var name = lib.inpile[i];
                if (name == 'sha') {
                    if (event.filterCard({ name: name }, player, event)) list.push(['基本', '', 'sha']);
                    for (var j of lib.inpile_nature) {
                        if (event.filterCard({ name: name, nature: j }, player, event)) list.push(['基本', '', 'sha', j]);
                    }
                }
                else if (get.type(name) == 'trick' && event.filterCard({ name: name }, player, event)) list.push(['锦囊', '', name]);
                else if (get.type(name) == 'basic' && event.filterCard({ name: name }, player, event)) list.push(['基本', '', name]);
            }
            return ui.create.dialog('乱语', [list, 'vcard']);
        },
        filter: function (button, player) {
            return _status.event.getParent().filterCard({ name: button.link[2] }, player, _status.event.getParent());
        },
        backup: function (links, player) {
            return {
                filterCard: true,
                selectCard: 1,
                position: 'hs',
                viewAs: { name: links[0][2], nature: links[0][3] },
            }
        },
        prompt: function (links, player) {
            return '将一张牌当做' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用';
        },
    },
    ai: {
        save: true,
        respondShan: true,
        fireAttack: true,
        threaten: 1.2,
    },
    subSkill: {
        guess: {
            trigger: {
                player: ["useCardBefore", "respondBefore"],
            },
            filter: function (event, player) {
                return event.skill == 'guhaer_ly_backup';
            },
            forced: true,
            priority: 15,
            firstDo: true,
            content: function () {
                'step 0'
                player.popup(trigger.card.name, 'metal');
                player.lose(trigger.cards, ui.special, 'insert');
                player.line(trigger.targets, trigger.card.nature);
                trigger.line = false;
                trigger.animate=false;
                event.prompt = get.translation(player) + '声明了' + get.translation(trigger.card.name) + '，是否质疑？';
                event.guessers = game.filterPlayer(function (current) {
                    return current != player && current.hp != 0 && !current.hasSkill('guhaer_wy');
                }).sortBySeat();
                event.ally = [];
                event.betray = [];
                game.broadcastAll(function (card) {
                    _status.guhuoNode = card.copy('thrown');
                    if (lib.config.cardback_style != 'default') {
                        _status.guhuoNode.style.transitionProperty = 'none';
                        ui.refresh(_status.guhuoNode);
                        _status.guhuoNode.classList.add('infohidden');
                        ui.refresh(_status.guhuoNode);
                        _status.guhuoNode.style.transitionProperty = '';
                    }
                    else {
                        _status.guhuoNode.classList.add('infohidden');
                    }
                    _status.guhuoNode.style.transform = 'perspective(600px) rotateY(180deg) translateX(0)';
                    player.$throwordered2(_status.guhuoNode);
                }, trigger.cards[0]);


                event.onEnd01 = function () {
                    _status.guhuoNode.removeEventListener('webkitTransitionEnd', event.onEnd01);
                    _status.guhuoNode.style.transition = 'all ease-in 0.3s';
                    _status.guhuoNode.style.transform = 'perspective(600px) rotateY(270deg) translateX(52px)';
                    var onEnd = function () {
                        _status.guhuoNode.classList.remove('infohidden');
                        _status.guhuoNode.style.transition = 'all 0s';
                        ui.refresh(_status.guhuoNode);
                        _status.guhuoNode.style.transform = 'perspective(600px) rotateY(-90deg) translateX(52px)';
                        ui.refresh(_status.guhuoNode);
                        _status.guhuoNode.style.transition = '';
                        ui.refresh(_status.guhuoNode);
                        _status.guhuoNode.style.transform = '';
                        _status.guhuoNode.removeEventListener('webkitTransitionEnd', onEnd);
                    }
                    _status.guhuoNode.listenTransition(onEnd);
                };
                'step 1'
                if (event.guessers.length == 0) event.goto(3);
                else {
                    event.guessers[0].chooseControl('质疑', '不质疑').set('prompt', event.prompt).set('ai', function () {
                        if (get.attitude(event.guessers[0], player) > 0) return '不质疑';
                        return Math.random() < 0.5 ? '不质疑' : '质疑';
                    });
                }
                'step 2'
                if (!result.control) result.control = '不质疑';
                event.guessers[0].chat(result.control);
                game.delay();
                if (result.control == '不质疑') {
                    game.log(event.guessers[0], '#g不质疑');
                    event.ally.push(event.guessers[0]);
                } else {
                    game.log(event.guessers[0], '#y质疑');
                    event.guessers[0].addExpose(0.1);
                    event.betray.push(event.guessers[0]);
                }
                if (event.guessers.length) {
                    event.guessers.remove(event.guessers[0]);
                    event.goto(1);
                }
                'step 3'
                game.broadcastAll(function (onEnd) {
                    _status.guhuoNode.listenTransition(onEnd);
                }, event.onEnd01);
                'step 4'
                game.delayx();
                if (event.betray.length) {
                    if (trigger.card.name == trigger.cards[0].name) {
                        for (var i = 0; i < event.betray.length; i++) {
                            event.betray[i].popup('质疑错误', 'fire');
                            event.betray[i].loseHp();
                            event.betray[i].addSkill('guhaer_wy');
                        }
                        game.log(player, '使用的', '#y' + get.translation(trigger.card.name), '成功生效');
                    } else {
                        for (var i = 0; i < event.betray.length; i++) {
                            event.betray[i].popup('质疑正确', 'wood');
                            game.log(event.betray[i], '质疑', '#g正确');
                        }
                        game.asyncDraw(event.betray);
                        game.log(player, '使用的', '#y' + get.translation(trigger.card.name), '作废了');
                        game.cardsDiscard(trigger.cards);
                        trigger.cancel();
                        if ((trigger.name == 'useCard' || trigger.name == 'respond') && trigger.parent) trigger.parent.goto(0);
                    }
                } else game.log(player, '使用的', '#y' + get.translation(trigger.card.name), '成功生效');
            },
        }
    }
}
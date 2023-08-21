window.furry.frImport(function (lib, game, ui, get, ai, _status) {
    //---------------------------------------定义Buff-----------------------------------------//
    //添加
    lib.element.player.addFrBuff = function (name, num) {
        if (!num) num = 1
        if (!this.storage.frBuff) {
            this.storage.frBuff = {}
        }
        if (!this.storage.frBuff[name]) {
            this.storage.frBuff[name] = num
            if (!this.hasSkill('fr_' + name)) {
                this.addSkill('fr_' + name)
                this.markSkill('fr_' + name)
            }
        } else {
            this.storage.frBuff[name] += num
            if (!this.hasSkill('fr_' + name)) {
                this.addSkill('fr_' + name)
                this.markSkill('fr_' + name)
            }
        }
        this.update()
        game.log(this, '获得了' + num + '层', '#g“' + get.translation('frb_' + name) + '”', '层数')
        return this.storage.frBuff
    }
    //减少
    lib.element.player.removeFrBuff = function (name, num) {
        if (!this.storage.frBuff) {
            this.storage.frBuff = {}
        }
        if (this.storage.frBuff[name]) {
            if (this.storage.frBuff[name] <= num) {
                this.storage.frBuff[name] = 0
                this.removeSkill('fr_' + name)
                this.unmarkSkill('fr_' + name)
            } else {
                this.storage.frBuff[name] -= num
            }
        }
        this.update()
        game.log(this, '失去了' + num + '层', '#g“' + get.translation('frb_' + name) + '”', '层数')
        return this.storage.frBuff
    }
    //清除
    lib.element.player.clearFrBuff = function (name) {
        if (!name) {
            for (var i of Object.keys(this.storage.frBuff[name])) {
                this.removeSkill(i)
                this.unmarkSkill(i)
            }
            this.storage.frBuff = {}
        } else {
            if (this.storage.frBuff[name]) {
                this.storage.frBuff[name] = 0
                this.removeSkill('fr_' + name)
                this.unmarkSkill('fr_' + name)
            }
        }
        this.update()
        game.log(this, '解除了', '#g“' + get.translation('frb_' + name) + '”', '状态')
        return this.storage.frBuff
    }
    //计量
    lib.element.player.countFrBuff = function (name) {
        if (!this.storage.frBuff || !this.storage.frBuff[name]) {
            return 0
        } else {
            return this.storage.frBuff[name]
        }
    }
    //拥有
    lib.element.player.hasFrBuff = function (name) {
        if (this.countFrBuff(name) > 0) {
            return true
        } else {
            return false
        }
    }
    //---------------------------------------Buff效果------------------------------------------//
    lib.skill.fr_mad = {
        forced: true,
        trigger: {
            player: "phaseEnd",
        },
        filter: function (event, player) {
            return player.storage.frBuff.mad > 0
        },
        ruleSkill: true,
        priority: Infinity,
        marktext: '疯狂',
        charlotte: true,
        unique: true,
        content: function () {
            'step 0'
            var num = player.storage.frBuff.mad
            player.randomDiscard(num, 'he', true);
            player.removeFrBuff('mad', 1)
        },
        mark: true,
        intro: {
            name: "疯狂",
            mark: function (dialog, storage, player) {
                dialog.addText("回合结束时，你随机弃置" + get.cnNumber(player.storage.frBuff.mad) + "张牌并移除1层“疯狂”状态，当你回复体力后，移除此状态。");
            },
        },
        group: 'fr_mad_remove',
        subSkill: {
            remove: {
                trigger: {
                    player: "recoverAfter"
                },
                charlotte: true,
                forced: true,
                popup: false,
                firstDo: true,
                content: function () {
                    player.clearFrBuff('mad')
                }
            }
        },
        ai: {
            result: {
                player: -1
            }
        }
    }
    lib.skill.fr_sleep = {
        mark: true,
        charlotte: true,
        unique: true,
        marktext: '睡眠',
        intro: {
            name: "睡眠",
            markcount: () => undefined,
            content: "不能使用或打出手牌直到受到伤害或下一回合结束",
        },
        trigger: {
            player: ["damageEnd", "phaseEnd"],
        },
        forced: true,
        popup: false,
        content: function () {
            player.clearFrBuff('sleep');
        },
        mod: {
            cardEnabled: function () {
                return false;
            },
            cardUsable: function () {
                return false;
            },
            cardRespondable: function () {
                return false;
            },
            cardSavable: function () {
                return false;
            },
        },
        ai: {
            threaten: 0.6,
        },
        sub: true,
    }
    //---------------------------------------定义新属性伤害------------------------------------------//
    lib.translate.frb_mad = '疯狂'
    lib.translate.frb_sleep = '睡眠'
})
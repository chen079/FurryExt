window.furry.frImport(function (lib, game, ui, get, ai, _status) {
    if (!lib.config.frActiveKeys) {
        lib.config.frActiveKeys = {
            actived: [],
        }
    }
    var keys = {
        'c4d038b4bed09fdb1471ef51ec3a32cd': {
            '海风轻抚': {
                type: 'skin'
            }
        }
    }
    lib.frActiveKeys = {
        getType: function (item, key) {
            if (typeof item == 'string') {
                if (!key) return null
                item = keys[key][item]
            }
            if (item.type) return item.type
            else return null
        },
        clear: function () {
            lib.config.frActiveKeys.actived = []
            this.save()
        },
        active: function (key) {
            if (!keys[md5(key)]) return alert('福利码不存在！')
            if (!lib.config.frActiveKeys.actived.includes(key)) {
                var items = keys[md5(key)]
                for (var i in items) {
                    if (this.getType(i, md5(key)) == 'character') {
                        game.frAchi.unlockCharacter(i)
                    }
                    else if (this.getType(i, md5(key)) == 'card') {
                        game.frAchi.unlockCard(i.list)
                    }
                    else if (this.getType(i, md5(key)) == 'skin') {
                        game.saveConfig(i + '_unlock', true)
                        alert('已领取皮肤：' + i)
                    } else if (this.getType(i, md5(key)) == 'function') {
                        i.do()
                    }
                }
                lib.config.frActiveKeys.actived.add(key)
                this.save()
                var choose = confirm('福利码使用成功，是否重启游戏以应用更改？')
                if (choose) {
                    game.reload()
                }
                return '福利码：' + key
            } else {
                alert('福利码已被使用！')
            }
        },
        save: function () {
            game.saveConfig('frActiveKeys', lib.config.frActiveKeys)
        }
    }
})
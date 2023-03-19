skill={
    trigger:{
        global:"roundStart",
        player:"enterGame",
    },
    direct:true,
    filter:function () {
        return game.players.length > 1;
    },
    content:function () {
        'step 0'
        if (!player.storage.wes_ts) player.storage.wes_ts = [];
        game.findPlayer2(function (current) {
            if (player.storage.wes_ts && player.storage.wes_ts.contains(current)) {
                player.storage.wes_ts.remove(current);
                current.removeSkill('wes_ts_a');
                current.removeSkill('wes_gc')
            }
        });
        if (player.storage.wes_ts.length == 0) player.unmarkSkill('wes_ts');
        player.chooseTarget('请选择〖同生〗的目标', lib.translate.wes_ts_info, function (card, player, target) {
            return target != player && !target.hasSkill('wes_ts_a');
        }).set('ai', function (target) {
            var att = get.attitude(_status.event.player, target);
            if (att > 0) return att + 1;
            return Math.random();
        }).animate = false;
        'step 1'
        if (result.bool) {
            var target = result.targets[0];
            player.line(target);
            player.storage.wes_ts.push(target);
            target.addSkill('wes_ts_a');
            target.addSkill('wes_gc')
            player.markSkill('wes_ts');
        }else{
            event.finish()
        }
    },
    unique:true,
    charlotte:true,
    intro:{
        content:function (storage, player, skill) {
            var str = '当前〖同生〗目标：';
            str += "<span style='color: red'>" + get.translation(player.storage.wes_ts) + "</span>";
            return str;
        },
    },
    subSkill:{
        a:{
            charlotte:true,
            slient:true,
            popup:false,
            trigger:{
                target:["useCardToTargeted"],
            },
            forced:true,
            filter:function (event, player) {
                if (!player.isIn()) return false;
                if (event.player == player) return false;
                return game.countPlayer(function (current) {
                    if (current.storage.wes_ts && current.storage.wes_ts.contains(player) && event.player != current) return true;
                });
                return false;
            },
            content:function () {
                'step 0'
                game.countPlayer(function (current) {
                    if (current.storage.wes_ts && current.storage.wes_ts.contains(player)) {
                        current.logSkill('wes_ts', player);
                        trigger.targets.remove(player);
                        trigger.targets.push(current);
                        trigger.player.line(current);
                    }
                });
                'step 1'
                game.delay(1.5);
            },
            onremove:function (player) {
                game.findPlayer2(function (current) {
                    if (current.storage.wes_ts && current.storage.wes_ts.contains(player)) {
                        current.storage.wes_ts.remove(player);
                        if (!current.storage.wes_ts.length) current.unmarkSkill('wes_ts');
                        else current.markSkill('wes_ts');
                    }
                });
            },
            sub:true,
        },
    },
}
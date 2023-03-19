skill = {
    enable: "phaseUse",
    frOh: true,
    direct: true,
    filter: function (event, player) {
        var skills = [];
        for (var i in lib.character) {
            for (var j = 0; j < lib.character[i][3].length; j++) {
                if (!player.hasSkill(lib.character[i][3][j])) continue;
                var info = lib.skill[lib.character[i][3][j]];
                if (info.fixed || info.frOh || info.unique || info.zhuSkill || info.charlotte || info.hiddenSkill || info.juexingji || info.limited || info.dutySkill || (info.unique && !info.gainable)) continue;
                skills.add(lib.character[i][3][j]);
            }
        }
        if (skills.length) {
            return true
        }
        return false
    },
    content: function () {
        'step 0'
        var skills = [];
        for (var i in lib.character) {
            for (var j = 0; j < lib.character[i][3].length; j++) {
                if (!player.hasSkill(lib.character[i][3][j])) continue;
                var info = lib.skill[lib.character[i][3][j]];
                if (info.fixed || info.unique || info.frOh || info.zhuSkill || info.charlotte || info.hiddenSkill || info.juexingji || info.limited || info.dutySkill || (info.unique && !info.gainable)) continue;
                skills.add(lib.character[i][3][j]);
            }
        }
        var introduce = []
        for (var j = 0; j < skills.length; j++) {
            introduce.push('【' + get.translation(skills[j]) + '】:' + get.translation(skills[j] + '_info'))
        }
        event.skills = skills
        player.chooseControl('cancel2').set('choiceList', introduce)
        'step 1'
        if (result.control != 'cancel2') {
            player.removeSkill(event.skills[result.index])
            event.skills.remove(event.skills[result.index])
            if (event.skills.length > 0) {
                event.goto(0)
            }
        } else {
            event.finish()
        }
    }
}
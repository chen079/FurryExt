skill = {
    enableSkill:function(_status){
        var list = [];
        var skills = [];
        var map = [];
        _status.characterlist.randomSort();
        for (var i = 0; i < _status.characterlist.length; i++) {
            var name = _status.characterlist[i];
            var skills2 = lib.character[name][3];
            for (var j = 0; j < skills2.length; j++) {
                if (skills.contains(skills2[j])) {
                    list.add(name);
                    if (!map[name]) map[name] = [];
                    map[name].push(skills2[j]);
                    skills.add(skills2[j]);
                    continue;
                }
                var list2 = [skills2[j]];
                game.expandSkills(list2);
                for (var k = 0; k < list2.length; k++) {
                    var info = lib.skill[list2[k]];
                    if (list2[k] == 'flappybird' || list2[k] == 'QieShuiGuo' || !info || !info.enable || info.limited || info.juexingji || info.hiddenSkill || info.dutySkill || info.groupSkill) continue;
                    if ((info.enable == 'phaseUse' || (Array.isArray(info.enable) && info.enable.contains('phaseUse'))) ||
                        (info.enable == 'chooseToUse' || (Array.isArray(info.enable) && info.enable.contains('chooseToUse')))) {
                        if (info.init || info.onChooseToUse || info.ai && (info.ai.combo || info.ai.notemp || info.ai.neg || !info.usable)) continue;
                        if (info.viewAs) {
                            if (!info.viewAsFilter) continue;
                            if (!bool) continue;
                        }
                        list.add(name);
                        if (!map[name]) map[name] = [];
                        map[name].push(skills2[j]);
                        skills.add(skills2[j]);
                        break;
                    }
                }
            }
        }
        return [list,skills]
    },
}
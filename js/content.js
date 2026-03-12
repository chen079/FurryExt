import { lib, game, ui, get, ai, _status } from '../../../noname.js';

export async function content(config, pack) {
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
}
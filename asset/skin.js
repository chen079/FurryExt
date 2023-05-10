'use strict';
window.furry_import(function (lib, game, ui, get, ai, _status) {
    if (!lib.qhlypkg) {
        lib.qhlypkg = [];
    }
    if (!lib.qhly_groupimage) {
        lib.qhly_groupimage = {};
    }

    lib.qhly_groupimage['fr_g_ji'] = 'extension/福瑞拓展/image/group/name_fr_g_ji.webp';
    lib.qhly_groupimage['fr_g_dragon'] = 'extension/福瑞拓展/image/group/name_fr_g_dragon.webp';

    if (!lib.qhly_groupcolor) {
        lib.qhly_groupcolor = {};
    }

    lib.qhly_groupcolor['fr_g_ji'] = "linear-gradient(to bottom, rgb(96, 85, 158), rgb(106, 14, 212))";
    lib.qhly_groupcolor['fr_g_dragon'] = "linear-gradient(to bottom, rgb(45, 45, 45), rgb(103, 103, 103))";

    var taici = {
    };
    lib.qhlypkg.push({
        isExt: true,//是否是扩展，一般填true
        filterCharacter: function (name) {
            return name.indexOf('fr_') == 0;//判断此ID的武将是否属于此皮肤包
        },
        characterNameTranslate: function (name) {
            //这里根据武将ID返回其中文名字。
            return get.translation(name);
        },
        characterTaici: function (name) {
            //这里返回武将原皮台词。
            return taici[name];
        },
        originSkinInfo: function (name) {
            var info = {
                // 'qhfl_yuncaocao':'原皮说明。',
            };
            return info[name];
        },
        characterInfo: function (name) {
            //这里可以返回角色资料。如不返回则显示get.characterIntro(name)。
        },
        //皮肤锁定
        lockSkin: function (name, skin) {
            if (!skin) return false;
            var earseExt = function (path) {
                if (!path) return null;
                var foundDot = path.lastIndexOf('.');
                if (foundDot < 0) return path;
                return path.slice(0, foundDot);
            };
            var reflect = {
                'fr_yifeng': {
                    '异界之花': {
                        isLocked: function () {
                            return !lib.config.异界之花_unlock;
                        },//判定锁定的条件
                        tryUnlock: function () {
                            alert('需要成就点数达到70，在成就奖励界面领取');
                        }//点击被锁定的皮肤后的效果
                    }
                },
                'fr_jackson': {
                    '树影斑驳': {
                        isLocked: function () {
                            return !lib.config.树影斑驳_unlock;
                        },
                        tryUnlock: function () {
                            alert('需要成就点数达到120，在成就奖励界面领取');
                        }
                    }
                },
                'fr_molis': {
                    '碾碎时光': {
                        isLocked: function () {
                            return !lib.config.碾碎时光_unlock;
                        },
                        tryUnlock: function () {
                            alert('需要成就点数达到15，在成就奖励界面领取');
                        }
                    }
                },
                'fr_tiers': {
                    '战场蔷薇': {
                        isLocked: function () {
                            return !lib.config.战场蔷薇_unlock;
                        },
                        tryUnlock: function () {
                            alert('需要成就点数达到45，在成就奖励界面领取');
                        }
                    }
                },
                'fr_death': {
                    '死亡降临': {
                        isLocked: function () {
                            return !lib.config.死亡降临_unlock;
                        },
                        tryUnlock: function () {
                            alert('需要成就点数达到95，在成就奖励界面领取');
                        }
                    }
                },
                'fr_dolina':{
                    '休闲时光': {
                        isLocked: function () {
                            return !lib.config.休闲时光_unlock;
                        },
                        tryUnlock: function () {
                            alert('需要成就点数达到85，在成就奖励界面领取');
                        }
                    }
                }
            };
            var ret1 = reflect[name];
            if (!ret1) return;
            var ret2 = ret1[earseExt(skin)];
            if (!ret2) return;
            return ret2;
        },
        prefix: 'extension/福瑞拓展/image/character', //原皮前缀，标识原皮肤的位置。
        lutouPrefix: 'extension/福瑞拓展/image/lutou/',//露头前缀，标识露头原皮肤位置
        isLutou: lib.config.frLutou,
        skin: {
            standard: 'extension/福瑞拓展/skin/standard/',//可切换普通皮肤的前缀
            lutou: 'extension/福瑞拓展/skin/lutou/',//可以切换露头皮肤的位置
        },
        audioOrigin: 'extension/福瑞拓展/audio/',//原技能配音位置
        audio: 'extension/福瑞拓展/skin/audio/',//切换皮肤后的技能配音位置
        skininfo: {
        },
        forbidEditTaici: false,
    });
});
'use strict';
window.furry_import(function(lib,game,ui,get,ai,_status){
    if(!lib.qhlypkg){
        lib.qhlypkg = [];
    }
    if(!lib.qhly_groupimage){
        lib.qhly_groupimage = {};
    }
    
    lib.qhly_groupimage['western'] = 'extension/千幻聆音/name_western.webp';
    lib.qhly_groupimage['han'] = 'extension/福瑞拓展/image/biaoqian/han.png';
    
    if(!lib.qhly_groupcolor){
        lib.qhly_groupcolor = {};
    }
    
    lib.qhly_groupcolor['han'] = "#68228B";
    lib.qhly_groupcolor['western'] = "#9400D3";

    var taici = {
    };
    lib.qhlypkg.push({
        isExt:true,//是否是扩展，一般填true
        filterCharacter:function(name){
            return name.indexOf('fr_') == 0;//判断此ID的武将是否属于此皮肤包
        },
        characterNameTranslate:function(name){
            //这里根据武将ID返回其中文名字。
            return get.translation(name);
        },
        characterTaici:function(name){
            //这里返回武将原皮台词。
            return taici[name];
        },
        originSkinInfo:function(name){
            var info = {
               // 'qhfl_yuncaocao':'原皮说明。',
            };
            return info[name];
        },
        characterInfo:function(name){
            //这里可以返回角色资料。如不返回则显示get.characterIntro(name)。
        },
        prefix:'extension/福瑞拓展/image/character', //原皮前缀，标识原皮肤的位置。
        lutouPrefix:'extension/福瑞拓展/image/lutou/',//露头前缀，标识露头原皮肤位置
        isLutou:lib.config.frLutou, 
        skin:{
            standard:'extension/福瑞拓展/skin/standard/',//可切换普通皮肤的前缀
            lutou:'extension/福瑞拓展/skin/lutou/',//可以切换露头皮肤的位置
        },
        audioOrigin:'extension/福瑞拓展/audio/',//原技能配音位置
        audio:'extension/福瑞拓展/skin/audio/',//切换皮肤后的技能配音位置
        skininfo:{
        },
        forbidEditTaici:false,
    });
});
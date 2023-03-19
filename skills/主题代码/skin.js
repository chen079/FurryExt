'use strict';
window.furry_import(function(lib,game,ui,get,ai,_status){
    if(!lib.qhlypkg){
        lib.qhlypkg = [];
    }
    var taici = {
    //原皮台词
    'fr_yifeng':{
        "kref_yz": {
            order:1,
            content: "月影降临，璀璨无垠。"
        },
        "die": {
            order:2,
            content: "终是负了这月与星。"
        }
    },
    };
    lib.qhlypkg.push({
        isExt:true,//是否是扩展，一般填true
        filterCharacter:function(name){
            return name.indexOf('lyz_') == 0;//判断此ID的武将是否属于此皮肤包
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
                'fr_yifeng':'',
            };
            return info[name];
        },
        characterInfo:function(name){
            //这里可以返回角色资料。如不返回则显示get.characterIntro(name)。
        },
        prefix:'extension/福瑞拓展/image/character/', //原皮前缀，标识原皮肤的位置。     
        lutouPrefix:'extension/福瑞拓展/image/lutou/',
        isLutou:lib.config.ygbLutou,   
        skin:{
            standard:'extension/福瑞拓展/skin/standard/',//可切换普通皮肤的前缀
            lutou:'extension/福瑞拓展/skin/lutou/',
        },
        audioOrigin:'extension/福瑞拓展/audio/',//原技能配音位置
        audio:'extension/福瑞拓展/skin/audio/',//切换皮肤后的技能配音位置
        skininfo:{
        //皮肤台词
            'fr_yifeng1':{
				level:"传说",
				translation:"夕阳西下",
				info:"",
                order:1,//显示顺序，号越小越前面。
                skill:{
                    "kref_yz": {
                        "content": "红月地生，神威天降。"
                    },
                    "die": {
                        "content": "此身虽死，红月焚尽世间诸恶！"
                    }
                }
            },
        }
    });
});
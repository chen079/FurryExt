'use strict';
window.qhly_import_safe(function(lib,game,ui,get,ai,_status){
	var obj = {
    "name": "fr_death",
    "origin": {
        "skill": {
            "death_sy": {
                "content": "死亡，如影随形..."
            },
            "death_sy_useless": {
                "content": "感受原始的恐惧吧！"
            },
            "death_sl": {
                "content": "我只要一刀就能砍下你的脑袋！"
            },
            "death_sp": {
                "content": "死亡，是众生最公平的裁决！"
            },
            "die": {
                "content": "我是死亡本身，你无法杀死我！"
            }
        }
    },
    "skin": {
        "死亡降临": {
            "info": "",
            "translation": "死亡降临",
            "skill": {
                "death_sy": {
                    "content": "注意阴影，他会夺去你的命！"
                },
                "death_sy_useless": {
                    "content": "感受死亡的恐惧吧！"
                },
                "death_sl": {
                    "content": "我的镰刀，渴望真正的鲜血！"
                },
                "death_sp": {
                    "content": "接受我的审判吧！"
                },
                "die": {
                    "content": "你杀不死“死亡”本身。"
                }
            }
        }
    }
};
    game.qhly_importSkinInfo(obj);
});
skill={
    trigger:{
        player:'phaseBegin'
    },
    init:function(player){
        if(!player.storage.francium) player.storage.francium=false
    },
    mark:true,
    intro:{
        mark:function(dialog,storage,player){
            dialog.addText('当前你处于'+player.storage.francium==true?'圣咏':'暗涌'+'状态')
        }  
    },
    zhuanghuanji:true,
    forced:true,
    content:function(){
        'step 0'
        player.changeZhuanhuanji('fr_hubian')
        if(player.storage.fr_hubian){
            if(player.name1=='fr_francium'){
                if(lib.config.frLutou){
                    game.broadcastAll()+player.node.avatar.setBackgroundImage('extension/福瑞拓展/image/lutou/'+player.name+'.jpg'); 
                }else{
                    game.broadcastAll()+player.node.avatar.setBackgroundImage('extension/福瑞拓展/image/character/'+player.name+'.jpg'); 
                }
            }
            if(player.name2=='fr_francium'){
                if(lib.config.frLutou){
                    game.broadcastAll()+player.node.avatar2.setBackgroundImage('extension/福瑞拓展/image/lutou/'+player.name+'2.jpg'); 
                }else{
                    game.broadcastAll()+player.node.avatar2.setBackgroundImage('extension/福瑞拓展/image/character/'+player.name+'2.jpg'); 
                }
            }
        }else{
            if(player.name1=='fr_francium'){
                if(lib.config.frLutou){
                    game.broadcastAll()+player.node.avatar.setBackgroundImage('extension/福瑞拓展/image/lutou/'+player.name+'2.jpg'); 
                }else{
                    game.broadcastAll()+player.node.avatar.setBackgroundImage('extension/福瑞拓展/image/character/'+player.name+'2.jpg'); 
                }
            }
            if(player.name2=='fr_francium'){
                if(lib.config.frLutou){
                    game.broadcastAll()+player.node.avatar2.setBackgroundImage('extension/福瑞拓展/image/lutou/'+player.name+'2.jpg'); 
                }else{
                    game.broadcastAll()+player.node.avatar2.setBackgroundImage('extension/福瑞拓展/image/character/'+player.name+'2.jpg'); 
                }
            }
        }
    }
}
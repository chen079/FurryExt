skill={
    trigger:{
        player:'phaseUse'
    },
    usable:1,
    filterTarget:true,
    selectTarget:function(){
        if(!player.storage.linyan_kr||player.storage.linyan_kr==false){
            return [1,Math.floor(game.players.length/2)]
        }else{
            if(ui.selected.targets.length>ui.selected.cards.length){
                game.uncheck('target');
            }
            return ui.selected.cards.length;
        }
    },
    position:'h',
    filterCard:true,
    selectCard:function(){
        if(!player.storage.linyan_kr||player.storage.linyan_kr==false){
            return 0
        }else{
            return [1,player.countCards('h')]
        }
    },
    zhuanhuanji:true,
    init:function(player){
        if(!player.storage.linyan_kr) player.storage.linyan_kr=false
    },
    content:function(){
        'step 0'
        if(player.storage.linyan_kr==false){
            var num=0
            event.num=Math.floor(num/targets.length)
            for(var i=0;i<targets.length;i++){
                var num=targets[i].countCards('h')-event.num
                if(num>0){
                    targets[i].chooseToDiscard(num,'h',true)
                }else{
                    targets[i].draw(num)
                }
            }
        }else{
            for(var i=0;i<targets.length;i++){
                if(targets[i].countCards('h')<targets[i].maxHp){
                    targets[i].draw(Math.min((targets[i].maxHp-targets[i].countCards('h')),5))
                }
            }
        }
        'step 1'
        player.changeZhuanhuanji('linyan_kr')
    },
    ai:{
        order:14,
        result:a
    }
}
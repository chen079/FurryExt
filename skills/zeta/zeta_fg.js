skill={
    trigger:{
        player:"useCardAfter",
    },
    init:function(player){
        if(!player.storage.zeta_fg) player.storage.zeta_fg=['basic','trick','equip']
    },
    filter:function(event,player){
        return event.card&&player.storage.zeta_fg.contains(get.type2(event.card))
    },
    frequent:true,
    mark:true,
    intro:{
        mark:function(dialog,storage,player){
            dialog.addText('目前可用的类型');
            dialog.addText(storage)
        },
    },
    content:function(){
        'step 0'
        player.storage.zeta_fg.remove(get.type2(trigger.card))
        player.chooseControl('基本牌','非基本牌').set('prompt','请选择你想检索牌的类型').set('ai',function(){
            return ['基本牌','非基本牌'].randomGet()
        })
        'step 1'
        player.storage.index=result.index
        'step 2'
        var cards=get.cards()
        if(player.storage.index==0){
            if(get.type2(cards[0])=='basic'){
                player.gain(cards)
                event.finish()
                return 
            }else{
                player.discard(cards)
                event.redo()
            }
        }else{
            if(get.type2(cards[0])!='basic'){
                player.gain(cards)
                event.finish()
                return 
            }else{
                player.discard(cards)
                event.redo()
            }
        }
    },
    group:'zeta_fg_1',
    subSkill:{
        1:{
            trigger:{
                global:"roundStart",
                player:"enterGame",
            },
            forced:true,
            unique:true,
            content:function(){
                player.storage.zeta_fg=['basic','trick','equip']
                player.updateMark('zeta_fg')
            }
        }
    },
}
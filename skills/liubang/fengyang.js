skill={
    trigger:{
        player:"useCardAfter",
    },
    init:function(player){
        if(!player.storage.fengyang) player.storage.fengyang=['basic','trick','equip']
    },
    filter:function(event,player){
        return event.card&&player.storage.fengyang.contains(get.type2(event.card))
    },
    mark:true,
    intro:{
        mark:function(dialog,storage,player){
            dialog.addText('目前可用的类型');
            dialog.addText(storage)
        },
    },
    content:function(){
        'step 0'
        player.storage.fengyang.remove(get.type2(trigger.card))
        player.chooseControl('基本牌','非基本牌').set('prompt','请选择你想检索牌的类型')
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
    group:'fengyang_1',
    subSkill:{
        1:{
            trigger:{
                global:"roundStart",
                player:"enterGame",
            },
            forced:true,
            unique:true,
            content:function(){
                player.storage.fengyang=['basic','trick','equip']
            }
        }
    },
}
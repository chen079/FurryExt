skill={
    trigger:{
        player:"damageBegin3",
    },
    content:function(){
        "step 0"
        var targets=game.filterPlayer();
        targets.remove(player)
        targets.remove(trigger.source)
        targets.sortBySeat()
        event.targets=targets
        "step 1"
        var num=trigger.num
        event.target=event.targets.shift()
        event.target.chooseBool('是否替'+get.translation(player)+'承受来自'+get.translation(trigger.source)+'的'+trigger.num+'点'+(trigger.nature?get.translation(trigger.nature)+'属性':'')+'伤害')
        .set('ai',function(){
            var target=_status.event.player
            var player=_status.event.getParent().player
            return get.attitude(target,player)>0&&target.hp+target.hujia>num
        })
        "step 2"
        if(result.bool){
            event.target.popup('代替');
            game.log(event.target,'代替',player,'成为了伤害的目标')
            trigger.player=event.target
            event.finish()
        }else{
            event.target.popup('不代替');
            game.delay(2)
            if(event.targets.length!=0){
                event.goto(1)
            }else{
                event.finish()
            }
        }
    },
}
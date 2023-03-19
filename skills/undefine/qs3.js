skill={
    trigger:{
        player:"useCard2",
    },
    direct:true,
    filter:function(event,player){
        var type=get.type(event.card);
        return type=='basic'||type=='trick';
    },
    content:function(){
        'step 0'
        player.removeSkill('qiaoshui3');
        var goon=false;
        var info=get.info(trigger.card);
        if(trigger.targets&&!info.multitarget){
            var players=game.filterPlayer();
            for(var i=0;i<players.length;i++){
                if(lib.filter.targetEnabled2(trigger.card,player,players[i])&&!trigger.targets.contains(players[i])){
                    goon=true;break;
                }
            }
        }
        if(goon){
            player.chooseTarget('巧说：是否额外指定一名'+get.translation(trigger.card)+'的目标？',function(card,player,target){
                var trigger=_status.event;
                if(trigger.targets.contains(target)) return false;
                return lib.filter.targetEnabled2(trigger.card,_status.event.player,target);
            }).set('ai',function(target){
                var trigger=_status.event.getTrigger();
                var player=_status.event.player;
                return get.effect(target,trigger.card,player,player);
            }).set('targets',trigger.targets).set('card',trigger.card);
        }
        else{
            if(!info.multitarget&&trigger.targets&&trigger.targets.length>1){
                event.goto(3);
            }
        }
        'step 1'
        if(result.bool){
            if(!event.isMine()) game.delayx();
            event.target=result.targets[0];
        }
        else{
            event.finish();
        }
        'step 2'
        if(event.target){
            player.logSkill('qiaoshui',event.target);
            trigger.targets.add(event.target);
        }
        event.finish();
        'step 3'
        player.chooseTarget('巧说：是否减少一名'+get.translation(trigger.card)+'的目标？',function(card,player,target){
            return _status.event.targets.contains(target);
        }).set('ai',function(target){
            var trigger=_status.event.getTrigger();
            return -get.effect(target,trigger.card,trigger.player,_status.event.player);
        }).set('targets',trigger.targets);
        'step 4'
        if(result.bool){
            event.targets=result.targets;
            if(event.isMine()){
                player.logSkill('qiaoshui',event.targets);
                event.finish();
            }
            for(var i=0;i<result.targets.length;i++){
                trigger.targets.remove(result.targets[i]);
            }
            game.delay();
        }
        else{
            event.finish();
        }
        'step 5'
        player.logSkill('qiaoshui',event.targets);
    },
}
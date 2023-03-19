skill={
    trigger:{
        player:"dying",
    },
    limited:true,
    skillAnimation:true,
    animationColor:"fire",
    filter:function(event,player){
        return player.hp<1;
    },
    content:function(){
        'step 0'
        player.awakenSkill('bofeng_sh');
        player.addSkill("bofeng_ws")
        player.recover(2-player.hp);
        'step 1'
        if(!player.isDying()&&!game.hasPlayer(function(current){
            return current.name1=='fr_ciyu'||current.name2=='fr_ciyu';
        })){
            player.chooseTarget(function(card,player,current){
                return current!=player;
            },'素唤：是否令一名其他角色选择是否将其武将牌替换为“迟雨”？').set('ai',function(target){
                return get.attitude(_status.event.player,target)-4;
            });
        }
        else event.finish();
        'step 2'
        if(!result.bool){
            event.finish();
            return;
        }
        var target=result.targets[0];
        event.target=target;
        player.line(target,'fire');
        target.chooseBool('素唤：是否将自己的一张武将牌替换为“迟雨”？');
        'step 3'
        if(result.bool){
            if(target.name2!=undefined){
                target.chooseControl(target.name1,target.name2).set('prompt','请选择要更换的武将牌');
            }
            else event._result={control:target.name1};
        }
        else event.finish();
        'step 4'
        target.reinit(result.control,'fr_ciyu');
        target.recover(2)
        if(target.name=='fr_ciyu'&&target.group!='jin') target.changeGroup('jin');
        if(_status.characterlist){
            _status.characterlist.add(result.control);
            _status.characterlist.remove('fr_ciyu');
        }
    },
    mark:true,
    intro:{
        content:"limited",
    },
    init:function(player,skill){
        player.storage[skill]=false;
    },
    derivation:"bofeng_ws",
}
skill={
    trigger:{
        player:"useCardToPlayered",
    },
    direct:true,
    shaRelated:true,
    filter:function (event, player) {
        return event.card.name == 'sha' && event.target.countCards('he') > 0;
    },
    content:function(){
        'step 0'
        var map={};
        var list=[];
        for(var i=1;i<=player.hp;i++){
            var cn=get.cnNumber(i,true);
            list.push(cn+'点');
        }
        event.map=map;
        player.chooseControl(list,'cancel2').set('prompt','强破：请选择流失体力的点数').set('ai',function(){
            var player=_status.event.player
            var target=_status.event.target
            if(player.hp>=3&&get.attitude(player,target)<0){
                return '两点'
            }else if(player.hp==2&&get.attitude(player,target)<0){
                return '一点'
            }else{
                return 'cancel2'
            }
        }).set('target',trigger.target);
        'step 1'
        if(result.control!='cancel2'){
            var num=result.index+1
            event.num=num>1?2:1;
            player.loseHp(num);
            player.line(trigger.target,{color:[255, 224,172]});
            trigger.getParent().directHit.add(trigger.target)
            var id = trigger.target.playerid;
            var map = trigger.customArgs;
            if (!map[id]) map[id] = {};
            if (!map[id].extraDamage) map[id].extraDamage = 0;
            map[id].extraDamage+=event.num;
        }else{
            event.finish()
        }
    },
}
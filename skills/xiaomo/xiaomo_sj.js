skill = {
    filter: function (event, player) {
        return event.card && event.card.name == 'sha' && player.hujia > 0
    },
    trigger:{
        player:"useCardToPlayered",
    },
    shaRelated: true,
    direcr:true,
    content: function () {
        'step 0'
        var list=[]
        for(var i=0;i<player.hujia;i++){
            list.push(i+1)
        }
        player.chooseControl(list,'cancel2')
        .set('prompt','请选择要失去的护甲值并令此【杀】伤害+X')
        .set('ai',function(){
            var player=_status.event.player
            var target=_status.event.target
            var num=114514
            var num2=0
            for(var i in target){
                var att=get.attitude(player,i)
                if(att>0&&i.hp<num) num=i.hp
                if(att<0&&i.hp>num2) num2=i.hp
            }
            if(num==114514){
                return Math.min(num2,Math.max(list))
            }else{
                if((num-1)!=0){
                    return num-1
                }else{
                    return 'cancel2'
                }
            }
        }).set('target',trigger.target)
        'step 1'
        if(result.control=='cancel2'){
            event.finish()
            return
        }
        var num=result.index+1
        player.changeHujia(-num)
        if(num>=trigger.target.hujia){
            trigger.target.changeHujia(-num)
        }else{
            trigger.target.changeHujia(-trigger.target.hujia)
        }
        trigger.getParent().directHit.push(trigger.target)
        var id = trigger.target.playerid;
        var map = trigger.getParent().customArgs;
        if (!map[id]) map[id] = {};
        if (typeof map[id].extraDamage != 'number') {
            map[id].extraDamage = 0;
        }
        map[id].extraDamage+=num;
    },
    group: "xiaomo_sj_draw",
    subSkill: {
        draw: {
            audio: 2,
            trigger: {
                player: "phaseDrawBegin2",
            },
            direct: true,
            filter: function (event, player) {
                return !event.numFixed;
            },
            content: function () {
                trigger.num += player.hujia;
            },
            ai: {
                threaten: 1.3,
            },
        }
    }
}
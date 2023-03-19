skill={
    trigger:{
        player:["phaseDrawBegin","phaseUseBegin","phaseDiscardBegin"],
        source:["damageBegin"]
    },
    filter:function(event,player){
        return game.hasPlayer(function(current){
            return current.countMark('fr_mad')>0
        })
    },
    content:function(){
        'step 0'
        var num=game.countPlayer(function(current){
            return current.countMark('fr_mad')>0
        })
        player.chooseTarget([1,num],true).set('ai',function(target){
            return Math.random()
        }).set('filterTarget',function(card,player,target){
            return target.countMark('fr_mad')>0
        })
        'step 1'
        var num=0
        for(var i =0 ;i<result.targets.length;i++){
            num+=result.targets[i].countMark('fr_mad')
            result.targets[i].removeMark('fr_mad',result.targets[0].countMark('fr_mad'))
            result.targets[i].unmarkSkill('fr_mad')
        }
        if(trigger.name=='phaseDraw'){
            trigger.num+=num
            game.log(player,'#g摸牌阶段的摸牌数+','#y'+num);
        }else if(trigger.name=='phaseUse'){
            player.addTempSkill('zhongyu_zb_effect')
            player.storage.zhongyu_zb_effect.sha=num;
            game.log(player,'#g出牌阶段使用【杀】的次数上限+','#y'+num);
        }else if(trigger.name=='phaseDiscard'){
            player.addTempSkill('zhongyu_zb_effect')
            player.storage.zhongyu_zb_effect.limit=num;
            game.log(player,'#g的手牌上限+','#y'+num)
        }else if(trigger.name=='damageBegin'){
            trigger.num+=num
        }
    },
    effect:{
        charlotte:true,
        onremove:true,
        mod:{
            cardUsable:function(card,player,num){
                if(card.name=='sha'){
                    var map=player.storage.zhongyu_zb_effect;
                    if(typeof map.sha!='number') return num;
                    return num+map.sha;
                }
            },
            maxHandcardBase:function(player,num){
                var map=player.storage.zhongyu_zb_effect;
                if(typeof map.limit!='number') return num;
                return num+map.limit;
            },
        },
        sub:true,
    },
}
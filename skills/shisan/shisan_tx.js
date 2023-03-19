skill={
    trigger:{
        global:"phaseEnd",
    },
    direct:true,
    filter:function(event,player){
        return !player.getHistory('useCard').length;
    },
    content:function(){
        'step 0'
        player.chooseTarget(1,'###是否发动【推心】？###视为使用一张没有距离限制的【推心置腹】').set('filterTarget',function(card,player,target){
            return player.canUse('tuixinzhifu',target,false)
        })
        'step 1'
        event.target=result.targets[0]
        player.useCard({name:'tuixinzhifu'},event.target)
        'step 2'
        if(event.target.countCards('hes')==0){
            event.finish()
        }
        player.chooseTarget(1,true,'选择【推心】的另一个目标'
        ).set('ai',function(target){
            var player=_status.event.player;
            if(event.target.countCards('h','sha')>0){
                return get.effect(target,{name:'sha'},player,player);
            }else{
                return get.effect(target,{name:'wuzhong'},player,player);
            }
        }).set('filterTarget',function(card,player,target){
            return event.target!=target
        })
        'step 3'
        event.target1=result.targets[0]
        var list=['交牌']
        var choiceList=['交给'+get.translation(event.target1)+'两张牌（不足则全交）。']
        if(event.target.countCards('hs','sha')>0){
            list.push('出杀')
            choiceList.push('对'+get.translation(event.target1)+'使用一张【杀】')
        }
        event.target.chooseControl(list).set('choiceList',choiceList)
        .set('ai',function(){
            var player=_status.event.player
            var target=_status.event.target
            if(list.length==1){
                return '交牌'
            }
            var att= get.attitude(player,target)
            if(att<0){
                return '出杀'
            }
            return '交牌'
        }).set('target',event.target1)
        'step 4'
        if(result.control=='交牌'){
            event.target.chooseCard(2,'h',true).set('ai',function(card){
                return 100-get.value(card)
            })
        }else{
            event.goto(6)
        }
        'step 5'
        event.target1.gain(event.target,result.cards,'giveAuto')
        event.finish()
        'step 6'
        event.target.chooseCard(1,'hs',true).set('filterCard',function(card){
            return get.name(card)=='sha'
        }).set('ai',function(card){
            return 100-get.value(card)
        })
        'step 7'
        event.target.useCard(event.target1,result.cards,false)
    },
}
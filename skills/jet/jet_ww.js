skill={
    trigger:{
        global:"useCardToPlayered",
    },
    logTarget:"target",
    direct:true,
    filter:function(event,player){
        return event.target!=player&&event.player!=player&&event.target!=event.player&&event.card.name=='sha'&&event.player.countCards('he')>0
    },
    content:function(){
        "step 0"
        trigger.player.chooseCard('〖危望〗：是否交给'+get.translation(player)+'一张牌').set('ai',function(card){
            var source=_status.event.source
            var player=_status.event.target
            var att=get.attitude(source,player)
            if(att<0&&_status.currentPhase==player&&(player.hasSkill('jet_cl')||player.hasSkill('reweimu'))){
                return -1
            }
            if(att>0) return 9-get.value(card)
            return 5-get.value(card)
        }).set('target',player).set('source',trigger.player)
        "step 1"
        if(result.cards) player.gain(result.cards,trigger.player,'giveAuto')
        if(result.bool){
            player.chooseControl('选项一','选项二').set('choiceList',['令此【杀】不可被响应','你成为此杀的目标'])
            .set('ai',function(){
                var player =_status.event.player
                var target=_status.event.target
                var target_health=target.hp+target.countCards('hs','tao')+target.countCards('hs','jiu')
                var player_health=player.hp+player.countCards('hs','tao')+player.countCards('hs','jiu')
                var att=get.attitude(player,target)
                if(_status.currentPhase==player&&(player.hasSkill('jet_cl')||player.hasSkill('reweimu'))){
                    return '选项二'
                }
                if(att<0){
                    return '选项一'
                }else if(att>0&&player.countCards('hs','shan')>0){
                    return '选项二'
                }else if(att>0&&target_health==1&&player_health>1){
                    return '选项二'
                }else if(att>0&&target.countCards('hs','shan')>0&&player_health>2&&player.countCards('j')==0){
                    return '选项二'
                }
                return '选项一'
            }).set('target',trigger.target)
        }else{
            event.finish()
        }
        "step 2"
        if(result.control=='选项一'){
            trigger.directHit.addArray(game.filterPlayer((current)=>current!=player))
        }else{
            trigger.targets.push(player)
            game.log(player,'成为了',trigger.card,'的额外目标')
        }
    }
}
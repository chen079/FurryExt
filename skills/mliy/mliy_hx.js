skill={
    trigger:{
        player:"phaseZhunbeiBegin",
    },
    direct:true,
    content:function(){
        "step 0"
        player.chooseTarget('回雪：是否发动此技能？',function(event,player,target){
            return target!=player
        }).set("ai",function(target){
            var player = _status.event.player
            var att=get.attitude(player,target)
            if(player.countCards('j')>0&&target.hp==target.maxHp){
                return att+target.hp
            }else if(target.hp==1&&att>0){
                return att/target.hp
            }else if(target.countCards('j')>0&&att>0){
                return att
            }else if(target.hp==1&&player.hp>2){
                return -att
            }else{
                return -1
            }
        })
        "step 1"
        if(result.bool){
            event.target=result.targets[0]
            var next=player.chooseControl("选项一","选项二").set("prompt","请选择发动的选项：").set('choiceList', ['你弃置其与你区域内的各一张牌，然后各自回复一点体力','你与其各失去一点体力，然后各摸一张牌。'])
            next.ai=function(){
                var player = _status.event.player
                if(player.countCards('j')>0) return 0
                if(player.hp==player.maxHp) return 1
                return 0
            }
        }else{
            event.finish()
        }
        "step 2"
        if(result.index==0){
            player.discardPlayerCard(player,'hej',true)
            player.discardPlayerCard(event.target,'hej',true)
            player.recover()
            event.target.recover()
        }else{
            player.loseHp()
            event.target.loseHp()
            player.draw()
            event.target.draw()
        }
    },
}
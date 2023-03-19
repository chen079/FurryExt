skill={
    trigger:{
        global:"roundStart",
        player:"enterGame",
    },
    forced:true,
    filter:function (event, player) {
        return !game.hasPlayer(function (current) {
            return current.hasSkill("muli_zc")
        });
    },
    content:function () {
        player.addSkill("muli_zc")
        player.storage.muli_zc+=1
    },
    group:"muli_cm_change",
    derivation:"muli_zc",
    subSkill:{
        change:{
            trigger:{
                global:"phaseBegin"
            },
            check:function(event,player){
                var att=get.attitude(player,event.player)
                return att>0&&event.player.storage.muli_zc>=event.player.hp&&player.hp>1
            },
            locked:true,
            prompt2:"每名角色回合开始时，若其有【终策】，你可以弃置两张手牌然后获得【终策】与其所有策标记，然后其失去终策。",
            filter:function(event,player){
                return event.player.hasSkill('muli_zc')&&player.countCards('h')>1&&event.player!=player
            },
            content:function(){
                'step 0'
                player.chooseToDiscard(2,'h',false)
                'step 1'
                if(result.bool){
                    var target=trigger.player
                    player.logSkill('muli_cm',target)
                    player.addSkill('muli_zc')
                    player.storage.muli_zc+=target.storage.muli_zc
                    target.storage.muli_zc=0
                    target.removeSkill('muli_zc')
                    target.unmarkSkill('muli_zc')
                }else{
                    event.finish()
                }
            }
        }
    }
}
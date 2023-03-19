skill = {
    trigger: {
        global: "phaseAfter"
    },
    zhuSkill: true,
    filter: function (event, player) {
        if (event.player.group != 'han') return false;
        if(player==event.player) return false
        if(!event.player.isIn()) return false
        return event.player.getHistory('sourceDamage').length>0;
    },
    check:function(event,player){
        return get.attitude(event.player,player)>0
    },
    content:function(){
        'step 0'
        trigger.player.chooseCard(1,'是否交给'+get.translation(player)+'一张牌并重置其〖将安〗').set('ai',function(card){
            return 5-get.value(card)
        })
        'step 1'
        if(result.cards){
            player.gain(result.cards,'giveAuto')
            player.unmarkSkill('jiangan_roundcount')
        }
    }
}
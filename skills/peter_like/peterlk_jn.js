skill={
    trigger:{
        global:"gainBegin",
    },
    forced:true,
    filter:function(event,player){
        if(event.source!=player) return false;
        if(event.player==player) return false;
        return true;
    },
    content:function(){
        'step 0'
        trigger.player.chooseToDiscard('he','弃置一张牌，或令'+get.translation(player)+'摸一张牌').set('ai',function(card){
            if(_status.event.goon) return 7-get.value(card);
            return -get.value(card);
        }).set('goon',get.attitude(trigger.player,player)<0);
        'step 1'
        if(!result.bool) player.draw();
    },
    group:["peterlk_jn_1","peterlk_jn_2"],
    subSkill:{
        1:{
            trigger:{
                player:"phaseDrawBegin2"
            },
            frequent:true,
            filter:function(event,player){
                return !event.numFixed;
            },
            content:function(){
                trigger.num+=player.getDamagedHp();
            },
            ai:{
                threaten:1.3,
            },
        },
        2:{
            mod:{
                maxHandcardBase:function(player,num){
                    return player.maxHp;
                },
            },
        }
    }
}
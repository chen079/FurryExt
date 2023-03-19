skill={
    trigger:{
        player:"useCardToTargeted",
    },
    direct:true,
    filter:function(event,player){
        return event.card.name=='sha'&&player.countCards('h')>0
    },
    content:function(){
        "step 0"
        var dis=trigger.target.countCards('h','shan')||trigger.target.getEquip('bagua')||trigger.target.countCards('h')>2;
        var att=get.attitude(player,trigger.target);
        var next=player.chooseToDiscard(get.prompt('krikt_ly'));
        next.ai=function(card){
            if(att) return 0;
            if(dis) return 7-get.value(card);
            return 0;
        }
        next.logSkill='krikt_ly';
        "step 1"
        if(result.bool){
            if(get.color(result.cards[0])=='red'){
                trigger.getParent().directHit.add(trigger.target)
            }
            else if(get.color(result.cards[0])=='black'){
                var id=trigger.target.playerid;
                var map=trigger.customArgs;
                if(!map[id]) map[id]={};
                if(!map[id].extraDamage) map[id].extraDamage=0;
                map[id].extraDamage++;
            }
        }
    }
}
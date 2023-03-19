skill={
    trigger:{
        player:"useCardToTargeted",
    },
    filter:function(event,player){
        return event.card.name=='sha'&&player.canCompare(event.target)
    },
    check:function(event,player){
        return get.attitude(player,event.target)<0;
    },
    content:function(){
        "step 0"
        player.chooseToCompare(trigger.target);
        "step 1"
        if(result.bool){
            trigger.target.chooseCard('交给'+get.translation(player)+'一张牌','he',true).set('ai',function(card){
                return 100-get.value(card);
            });
        }
        var card=get.color(result.player,player)
        if(card=='red'){
            trigger.getParent().directHit.add(trigger.target)
        }else if(card=='black'){
            var id=trigger.target.playerid;
            var map=trigger.customArgs;
            if(!map[id]) map[id]={};
            if(!map[id].extraDamage) map[id].extraDamage=0;
            map[id].extraDamage++;
        }
        "step 2"
        if(result.cards) player.gain(result.cards,trigger.target,'giveAuto');
    },
    ai:{
        "directHit_ai":true,
        skillTagFilter:function(player,tag,arg){
            if(player._krikt_ly_temp) return false;
            player._krikt_ly_temp=true;
            var bool=function(){
                if(arg.card.name!='sha'||get.attitude(player,arg.target)>=0||!arg.target.countCards('h')) return false;
                if(arg.target.countCards('h')==1&&(!arg.target.getEquip('bagua')||player.hasSkillTag('unequip',false,{
                    name:arg.card?arg.card.name:null,
                    target:arg.target,
                    card:arg.card
                })||player.hasSkillTag('unequip_ai',false,{
                    name:arg.card?arg.card.name:null,
                    target:arg.target,
                    card:arg.card
                }))) return true;
                return player.countCards('h',function(card){
                    return card!=arg.card&&(!arg.card.cards||!arg.card.cards.contains(card))&&get.value(card)<=4&&(get.number(card)>=(11+arg.target.countCards('h')/2)||get.suit(card,player)=='heart');
                })>0;
            }();
            delete player._krikt_ly_temp;
            return bool;
        },
        effect:{
            target:function(card,player,target,current){
                if(card.name=='sha'&&current<0) return 0.7;
            },
        },
    }
}
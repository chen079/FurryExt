skill={
    trigger:{
        player:"damageBegin4",
    },
    filter:function(event){
        return event.nature=='fire'||event.nature=='thunder';
    },
    forced:true,
    content:function(){
        trigger.cancel();
    },
    group:"dragon_ly_1",
    subSkill:{
        1:{
            trigger:{
                player:"damageEnd"
            },
            forced:true,
            filter:function(event,player){
                return event.num>0;
            },
            content:function(){
                var cards=[];
                while(cards.length<trigger.num){
                    var card=get.cardPile(function(card){
                        return get.tag(card,'damage')&&!cards.contains(card)
                    });
                    if(card) cards.push(card);
                    else break;
                }
                if(cards.length) player.gain(cards,'gain2').gaintag.add('dragon_hn')
            },
        }
    },
    ai:{
        nofire:true,
        maixie:true,
        nothunder:true,
        effect:{
            target:function(card,player,target,current){
                if(get.tag(card,'fireDamage')) return 'zerotarget';
                if(get.tag(card,'thunderDamage')) return 'zerotarget';
                if(card.name=='tiesuo') return 'zeroplayertarget';
            },
        },
    },
}
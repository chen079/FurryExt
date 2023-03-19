skill={
    audio:2,
    enable:"phaseUse",
    usable:1,
    filterTarget:function(card,player,target){
        return target.countCards('h')&&target!=player
    },
    selectTarget:-1,
    content:function(){
        "step 0"
        target.chooseCard('he','征言：交给'+get.translation(player)+'一张牌，或失去一点体力').set('ai',function(card){
            if(target.getCards('he').length==0) return false;
            var att=get.attitude(target,player);
            if(att>0) return 1;
            else{
                if(card.name=='tao') return 0;
                else return 20-get.value(card);
            }
        });
        "step 1"
        if(result.bool==false){
            target.loseHp();
        }
        else{
            target.give(result.cards,player,true);
        }
        player.addSkill('verb_zy_2');
        player.storage.verb_zy=targets;
    },
    ai:{
        order:10,
        result:{
            player:1
        },
        threaten:1.5,
    },
    subSkill:{
        '2':{
            trigger:{
                player:"phaseUseEnd",
            },
            forced:true,
            popup:false,
            audio:false,
            content:function(){
                "step 0"
                event.target=player.storage.verb_zy.shift()
                var cards=player.getCards('h');
                player.removeSkill('verb_zy_2');
                if(event.target.classList.contains('dead')||event.target.hp<=0||cards.length==0){
                    event.goto(0)
                }
                else{
                    if(cards.length>0) 
                        player.chooseCard('h',true,1,'征言：选择要交给'+get.translation(event.target)+'的牌').set('ai',function(card){
                        var att=get.attitude(player,event.target)
                        if(att>0){return get.value(card)}
                        else return 100-get.value(card)
                    });
                }
                "step 1"
                event.target.gain(result.cards,player);
                player.$give(result.cards.length,event.target);
                "step 2"
                if(player.storage.verb_zy.length!=0){
                    event.goto(0)
                }
            },
        }
    }
}
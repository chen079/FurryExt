skill={
    group:["liya_sj_1","liya_sj_2"],
    subSkill:{
        1:{
            trigger:{
                player:"equipBegin",
            },
            forced:true,
            silent:true,
            filter:function(event,player){
                return get.subtype(event.card)=="equip1"
            },
            content:function (){
                "step 0"
                trigger.untrigger();
                trigger.finish();
                player.$equip(trigger.card);
                game.addVideo('equip',player,get.cardInfo(trigger.card));
                game.log(player,'装备了',trigger.card);
                "step 1"
                var info=get.info(trigger.card);
                if(info.onEquip&&(!info.filterEquip||info.filterEquip(trigger.card,player))){
                    var next=game.createEvent('equip_'+trigger.card.name);
                    next.setContent(info.onEquip);
                    next.player=player;
                    next.trigger.card=trigger.card;
                    game.delayx();
                }
                delete player.equiping;
                "step 2"
                if(player.countCards('e',{subtype:"equip1"})>2){player.chooseButton(['选择一张武器牌弃置', player.getCards('e',{subtype:"equip1"})], 1,true)
                }
                "step 3"
                if(result.bool){player.discard(result.links)}
                "step 4"
                if(player.countCards('e',{subtype:"equip1"})>2) event.goto(2)
            },
            popup:false,
        },
        2:{
            trigger:{
                player:"equipBegin",
            },
            forced:true,
            silent:true,
            filter:function(event,player){
                return get.subtype(event.card)=="equip2"
            },
            content:function (){
                "step 0"
                trigger.untrigger();
                trigger.finish();
                player.$equip(trigger.card);
                game.addVideo('equip',player,get.cardInfo(trigger.card));
                game.log(player,'装备了',trigger.card);
                "step 1"
                var info=get.info(trigger.card);
                if(info.onEquip&&(!info.filterEquip||info.filterEquip(trigger.card,player))){
                    var next=game.createEvent('equip_'+trigger.card.name);
                    next.setContent(info.onEquip);
                    next.player=player;
                    next.trigger.card=trigger.card;
                    game.delayx();
                }
                delete player.equiping;
                "step 2"
                if(player.countCards('e',{subtype:"equip2"})>2){player.chooseButton(['选择一张防具牌弃置', player.getCards('e',{subtype:"equip2"})], 1,true)
                }
                "step 3"
                if(result.bool){player.discard(result.links)}
                "step 4"
                if(player.countCards('e',{subtype:"equip2"})>2) event.goto(2)
            },
            popup:false,
        }
    }
}
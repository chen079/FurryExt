skill={
    audio:2,
    trigger:{
        global:"phaseBefore",
        player:"enterGame",
    },
    forced:true,
    locked:false,
    filter:function(event,player){
        return (event.name!='phase'||game.phaseNumber==0);
    },
    content:function(){
        'step 0'
        var i=0;
        var list=[];
        while(i++<2){
            var card=get.cardPile(function(card){
                if(get.type(card)!='equip') return false;
                return list.length==0||get.subtype(card)!=get.subtype(list[0]);
            });
            if(card) list.push(card);
        }
        if(!list.length){event.finish();return;}
        event.list=list;
        player.gain(event.list,'gain2');
        'step 1'
        game.delay(1);
        var card=event.list.shift();
        if(player.getCards('h').contains(card)){
            player.$give(card,player,false)
            player.equip(card);
        }
        if(event.list.length) event.redo();
    },
    group:"mislee_tj_move",
    subSkill:{
        "move":{
            audio:"mislee_tj",
            prompt:"将装备区里的一张牌移动至其他角色的装备区，然后你摸两张牌",
            enable:"phaseUse",
            position:"e",
            filter:function(event,player){
                return player.countCards('e')>0;
            },
            check:function(){return 1},
            filterCard:true,
            filterTarget:function(event,player,target){
                return target!=player&&target.canEquip(ui.selected.cards[0],true);
            },
            prepare:"give",
            discard:false,
            lose:false,
            content:function(){
                target.equip(cards[0]);
                player.draw(2);
            },
            ai:{
                order:11,
                expose:0.2,
                result:{
                    target:function(player,target){
                        if(ui.selected.cards.length){
                            var card=ui.selected.cards[0];
                            if(target.getEquip(card)||target.countCards('h',{subtype:get.subtype(card)})) return 0;
                            return get.effect(target,card,player,target);
                        }
                        return 0;
                    },
                },
            },
        }
    }
}
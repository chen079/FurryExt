skill={
    trigger:{
        global:"useCard1",
    },
    round:1,
    filter:function(event,player){
        if(event.targets.length!=1) return false;
        if(event.player==player) return false;
        if(player!=event.targets[0]) return false;
        for(var i=0;i<lib.inpile.length;i++){
            var info=lib.card[lib.inpile[i]];
            if(info.multitarget) continue;
            if(lib.filter.targetEnabled2({name:lib.inpile[i]},event.player,player)){
                return true;
            }
        }
        return false;
    },
    check:function(event,player){
        return get.effect(player,event.card,event.player,player)<0;
    },
    "prompt2":function(event,player){
        return '发现一张牌代替'+get.translation(event.player)+'对你使用的'+get.translation(event.card);
    },
    autodelay:true,
    content:function(){
        'step 0'
        var list=[],list1=[],list2=[];
        for(var i=0;i<lib.inpile.length;i++){
            var info=lib.card[lib.inpile[i]];
            if(info.multitarget) continue;
            if(lib.filter.targetEnabled2({name:lib.inpile[i]},trigger.player,trigger.targets[0])){
                var cardinfo=[trigger.card.suit||'',trigger.card.number||'',lib.inpile[i]];
                list1.push(cardinfo);
                if(info.type!='equip'){
                    list2.push(cardinfo);
                }
            }
        }
        var equipped=false;
        for(var i=0;i<3;i++){
            if(equipped&&list2.length){
                list.push(list2.randomRemove());
            }
            else{
                equipped=true;
                list.push(list1.randomRemove());
            }
        }
        player.chooseButton(true,['幻觉',[list,'vcard']]).ai=function(button){
            var card={suit:trigger.card.suit,number:trigger.card.number,name:button.link[2]};
            return get.effect(trigger.targets[0],card,trigger.player,player);
        };
        'step 1'
        if(result.bool){
            var card=game.createCard({
                suit:trigger.card.suit||lib.suit.randomGet(),
                number:trigger.card.number||Math.ceil(Math.random()*13),
                name:result.links[0][2]}
            );
            event.card=card;
            game.log(player,'将',trigger.card,'变为',card);
            // if(!event.isMine()) game.delayx();
            trigger.card=get.autoViewAs(card);
            trigger.cards=[card];
            game.cardsGotoOrdering(card).relatedEvent=trigger;
        }
        else{
            event.finish();
        }
        'step 2'
        player.$throw(event.card,null,null,true);
        if(player==trigger.player){
            player.line(trigger.targets[0],'green');
        }
        else{
            player.line(trigger.player,'green');
        }
        game.delayx(0.5);
    },
    ai:{
        threaten:0.1,
    },
}
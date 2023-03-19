skill={
    trigger:{
        player:"useCard1",
    },
    frequent:true,
    filter:function(event,player){
        if(event._huanjue) return false;
        if(event.targets.length!=1) return false;
        var target=event.targets[0];
        for(var i=0;i<lib.inpile.length;i++){
            var info=lib.card[lib.inpile[i]];
            if(info.multitarget) continue;
            if(lib.filter.targetEnabled2({name:lib.inpile[i]},event.player,target)){
                return true;
            }
        }
        return false;
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
        var eff1=get.effect(trigger.targets[0],trigger.card,trigger.player,player);
        var val1=get.value(trigger.card,player,'raw');
        player.chooseButton(['水月',[list,'vcard']]).ai=function(button){
            var card={suit:trigger.card.suit,number:trigger.card.number,name:button.link[2]};
            var eff2=get.effect(trigger.targets[0],card,trigger.player,player)
            var val2=get.value(card,player,'raw');
            if(eff1>0){
                if(eff2<=0) return 0;
                return val2-val1;
            }
            else if(eff1<0){
                if(eff2>=0) return val2;
                return 0;
            }
            else if(eff1==0){
                if(eff2>0) return val2;
                return 0;
            }
        };
        'step 1'
        if(result.bool){
            var stat=player.stat[player.stat.length-1].card;
            if(stat[trigger.card.name]){
                stat[trigger.card.name]--;
            }
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
            trigger._huanjue=true;
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
        'step 3'
        var stat=player.stat[player.stat.length-1].card;
        if(!stat[trigger.card.name]){
            stat[trigger.card.name]=1;
        }
        else{
            stat[trigger.card.name]++;
        }
    },
    draw:function(){
        player.draw();
    },
    ai:{
        usedu:true,
    },
}
skill={
    enable:"phaseUse",
    usable:1,
    position:"he",
    filterCard:function(card,player,event){
        event=event||_status.event;
        if(typeof event!='string') event=event.getParent().name;
        var mod=game.checkMod(card,player,event,'unchanged','cardDiscardable',player);
        if(mod!='unchanged') return mod;
        return true;
    },
    discard:false,
    lose:false,
    delay:false,
    selectCard:[1,Infinity],
    check:function(card){
        var player=_status.event.player;
        if(get.position(card)=='h'&&!player.countCards('h','du')&&(player.hp>2||!player.countCards('h',function(card){
            return get.value(card)>=8;
        }))){
            return 1;
        }
        return 6-get.value(card)
    },
    content:function(){
        "step 0"
        event.gross=[]
        player.discard(cards);
        event.num=1;
        var hs=player.getCards('h');
        if(!hs.length) event.num=0;
        for(var i=0;i<hs.length;i++){
            if(!cards.contains(hs[i])){
                event.num=0;break;
            }
        }
        event.count=event.num+cards.length
        "step 1"
        event.cards=get.cards(3);
        player.chooseCardButton('发现：获得其中一张牌',true,event.cards).set('ai',function(button){
            return get.useful(button.link);
        });
        'step 2'
        var card=result.links[0];
        card.fix();
        player.gain(card,'draw');
        event.gross.push(card)
        event.cards.remove(card);
        'step 3'
        while(event.cards.length){
            ui.cardPile.insertBefore(event.cards.pop(),ui.cardPile.childNodes[get.rand(0,ui.cardPile.childNodes.length)])
        }
        game.updateRoundNumber()
        "step 4"
        event.count--
        if(event.count!=0){
            event.goto(1)
        }else{
            game.log(player,'发现了','#y'+get.translation(event.gross))
        }
    },
    ai:{
        order:1,
        result:{
            player:1,
        },
        threaten:1.5,
    },
}
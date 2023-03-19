skill={
    audio:2,
    enable:"phaseUse",
    filterTarget:true,
    filterCard:true,
    usable:1,
    selectTarget:2,
    check:function(card){
        if(_status.event.player.hp==1) return 8-get.value(card);
        return 6-get.value(card);
    },
    multitarget:true,
    content:function(){
        'step 0'
        var card1 = game.createCard('sha')
        var card2 = game.createCard('shan')
        event.cards=[card1,card2]
        'step 1'
        var att=get.attitude(targets[0],targets[1])
        targets[0].chooseCardButton('选择其中一张牌',true,event.cards).set('ai',function(card){
            if(att>0){
                switch(get.name(card)){
                    case 'shan':return 1;
                    default:return 0;
                }
            }else{
                switch(get.name(card)){
                    case 'sha':return 1;
                    default:return 0;
                }
            }
        });
        'step 2'
        var att=get.attitude(targets[1],targets[0])
        event.card1=result.links[0];
        targets[1].chooseCardButton('选择其中一张牌',true,event.cards).set('ai',function(card){
            if(att>0){
                switch(get.name(card)){
                    case 'shan':return 1;
                    default:return 0;
                }
            }else{
                switch(get.name(card)){
                    case 'sha':return 1;
                    default:return 0;
                }
            }
        });
        'step 3'
        event.card2=result.links[0];
        'step 4'
        targets[0].showCards(event.card1)
        targets[1].showCards(event.card2)
        "setp 5"
        if(get.name(event.card1)=='sha'&&get.name(event.card2)=='sha'){
            targets[0].loseHp()
            targets[1].loseHp()
        }else if(get.name(event.card1)=='shan'&&get.name(event.card2)=='shan'){
            targets[0].chooseToDiscard('he',true)
            targets[1].chooseToDiscard('he',true)
        }else if(get.name(event.card1)=='sha'&&get.name(event.card2)=='shan'){
            targets[0].draw(2)
            targets[1].damage(targets[0])
        }else if(get.name(event.card1)=='shan'&&get.name(event.card2)=='sha'){
            targets[1].draw(2)
            targets[0].damage(targets[1])
        }
    },
    ai:{
        expose:0.4,
        order:7,
        result:{
            player:1,
            target:-1
        },
    },
}
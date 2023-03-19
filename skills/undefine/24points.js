skill={
    enable:"phaseUse",
    usable:1,
    filter:function(event,player){
    return ui.cardPile.childElementCount>=4;
    },
    content:function(){
        'step 0'
        var cards=get.cards(4);
        game.cardsGotoOrdering(cards);
        event.list=[]
        event.cards=cards
        for(var i=0;i<event.cards.length;i++){
            event.list.push(event.cards[i]);
        }
        'step 1'
        for(var j=0;j<event.cards.length;j++){
            if(!event.list.contains(event.cards[j])){
                event.cards.remove(event.cards[j]);
            };
            }
            for(var i=0;i<event.list.length;i++){  
            if(!event.cards.contains(event.list[i])){
                event.cards.push(event.list[i])
            };
        }
        'step 2'
        player.chooseCardButton('请选择要先算的两张牌',event.cards,2);
        'step 3'
        if(result.bool){
            event.links=result.links
            player.chooseControl(['+','-','*','/','重做','放弃']);
        }else{
            player.loseToDiscardpile(event.list)
            event.finish()
        }
        'step 4'
        if(result.control=='+') {
            event.count=get.number(event.links[0])+get.number(event.links[1])
        }
        if(result.control=='-') {
            var num =  get.number(event.links[0])-get.number(event.links[1])
            if(num >0){
                event.count=num
            }else{
                event.count=-num
            }
        }
        if(result.control=='*') {
            event.count=get.number(event.links[0])*get.number(event.links[1])
        }
        if(result.control=='/') { 
            var num =  get.number(event.links[0])-get.number(event.links[1])
            var result = get.number(event.links[0])/get.number(event.links[1])
            if(num >0){
                event.count= result
            }else{
                event.count= 1/result
            }
        }
        if(result.control=='返回第一步') {
            event.goto(1);
        }
        if(result.control=='放弃') {
            player.loseToDiscardpile(event.list)
            event.finish()
        }
        'step 5'
        event.cards.remove(event.links[0])
        event.cards.remove(event.links[1])
        event.cards.push(game.createCard('shan','',event.count,''));
        'step 6'
        if(event.cards.length!=1){
            event.goto(2)
        }
        'step 7'
        player.showCards(event.cards);
        if(get.number(event.cards[0])==24){
            player.popup('演算成功！');
            player.gain(event.list,'gain2');
            player.addTempSkill('delta_sy_1')
            player.addTempSkill('delta_sy_2')
        }else{
            player.popup('演算失败！');
            event.finish()
        }
    },
    subSkill:{
        "1":{
            trigger:{
                source:"damageBegin1",
            },
            filter:function (event) {
                return event.card && event.card.name == 'sha';
            },
            forced:true,
            popup:false,
            silent:true,
            charlotte:true,
            init:function (player) {
                player.markSkill('yas_klin_js');
            },
            onremove:function (player) {
                player.unmarkSkill('yas_klin_js');
            },
            content:function () {
                trigger.num++;
            },
            sub:true,
        },
        2:{
            shaRelated:true,
            popup:false,
            silent:true,
            charlotte:true,
            init:function (player) {
                player.markSkill('yas_klin_js');
            },
            onremove:function (player) {
                player.unmarkSkill('yas_klin_js');
            },
            trigger:{
                player:"useCardToTargeted",
            },
            forced:true,
            filter:function (event, player) {
                return event.card.name == 'sha';
            },
            logTarget:"target",
            content:function () {
                trigger.target.addTempSkill('qinggang2');
                trigger.target.storage.qinggang2.add(trigger.card);
                trigger.getParent().directHit.add(trigger.target);
            },
            ai:{
                skillTagFilter:function (player, tag, arg) {
                    if (!arg || arg.isLink || !arg.card || arg.card.name != 'sha') return false;
                    if (arg && arg.name == 'sha') return true;
                },
                "directHit_ai":true,
                "unequip_ai":true,
            },
            sub:true,
        }
    }
}
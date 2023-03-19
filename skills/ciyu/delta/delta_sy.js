skill={
    enable:"phaseUse",
    usable:1,
    filter:function(event,player){
    return ui.cardPile.childElementCount>=4;
    },
    content:function(){
        'step 0'
        var cards=get.cards(4);
        player.addTempSkill("delta_sy_ig")
        game.cardsGotoOrdering(cards);
        event.list=[]
        event.cards=cards
        for(var i=0;i<event.cards.length;i++){
            event.list.push(event.cards[i]);
        }
        if(_status.auto||player!=game.me){
            player.showCards(event.cards)
            game.delay(2)
            player.popup('演算成功！');
            player.gain(cards,'gain2').gaintag.add('delta_sy')
            player.addTempSkill('delta_sy_1')
            event.finish()
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
        if(result.control=='重做') {
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
            player.gain(event.list,'gain2').gaintag.add('delta_sy');
            player.addTempSkill('delta_sy_1')
        }else{
            player.popup('演算失败！');
            event.finish()
        }
    },
    ai:{
        order:10,
        result:{
            player:1,
        },
        threaten:3.2,
    },
    subSkill:{
        ig:{
            mod:{
                ignoredHandcard:function(card,player){
                    if(card.hasGaintag('delta_sy')){
                        return true;
                    }
                },
                cardDiscardable:function(card,player,name){
                    if(name=='phaseDiscard'&&card.hasGaintag('delta_sy')){
                        return false;
                    }
                },
            },
            onremove:function(player){
                player.removeGaintag('delta_sy');
            },
            sub:true,
        },
        "1":{
            shaRelated:true,
            popup:false,
            silent:true,
            charlotte:true,
            init:function (player) {
                player.markSkill('delta_sy_1');
            },
            onremove:function (player) {
                player.unmarkSkill('delta_sy_1');
            },
            trigger:{
                player:"useCardToTargeted",
            },
            intro:{
                content:"本回合你的【杀】无距离次数限制且无视防具。"
            },
            forced:true,
            filter:function (event, player) {
                return event.card.name == 'sha';
            },
            mod:{
                targetInRange:function (card, player, target, now) {
                    if (card.name == 'sha') return true;
                },
                cardUsable:function (card, player, num) {
                    if (card.name == 'sha') return Infinity
                },
            },
            logTarget:"target",
            content:function () {
                trigger.target.addTempSkill('qinggang2');
                trigger.target.storage.qinggang2.add(trigger.card);
            },
            ai:{
                skillTagFilter:function (player, tag, arg) {
                    if (!arg || arg.isLink || !arg.card || arg.card.name != 'sha') return false;
                    if (arg && arg.name == 'sha') return true;
                },
                "unequip_ai":true,
            },
            sub:true,
        },
    },
}
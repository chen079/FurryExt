card={
    audio:true,
    type:"trick",
    enable:true,
    filterTarget:function (player, target, card) {
        return target.countCards('h')>0
    },
    selectTarget:1,
    content:function () {
        'step 0'
        var num=Math.ceil(target.countCards('h')/2)
        target.chooseCard(num,'h','展示'+num+'张手牌',true).set('ai',function(card){
            return Math.random()
        })
        'step 1'
        target.showCards(result.cards)
        var handcards=target.getCards('h')
        for(var i=0;i<handcards.length;i++){
            if(handcards.contains(result.cards[i])){
                handcards.remove(result.cards[i])
            }
        }
        var showcards=result.cards
        event.cards=[showcards,handcards]
        player.chooseControl('重铸展示的手牌','重铸未展示的手牌').set('ai',function(){
            var value1=0
            var value2=0
            for(var i=0;i<showcards.length;i++){
                value1+=get.value(showcards[i])
            }
            for(var j=0;j<handcards.length;j++){
                value2+=get.value(handcards[j])
            }
            var player=_status.event.player
            var target=_status.event.target
            if(get.attitude(player,target)>0){
                if(value1>value2){
                    return '重铸未展示的手牌'
                }else{
                    return '重铸展示的手牌'
                }
            }else{
                if(value1>value2){
                    return '重铸展示的手牌'
                }else{
                    return '重铸未展示的手牌'
                }
            }
        }).set('target',target)
        'step 2'
        var cards=event.cards[result.index];
        while(cards){
            var card=cards.shift()
            target.lose(card,ui.discardPile,'visible');
            target.$throw(card,1000);
            game.log(target,'将',card,'置入弃牌堆');
            target.draw();                        
        }
    },
    ai:{
        basic:{
            order:7.2,
            useful:4.5,
            value:9.2,
        },
        result:{
            target:function (player, target, storage) {
                if (target.countCards('j', { name: 'lebu' }) || target.countCards('j', { name: 'bingliang' })) {
                    return 0
                } else if (target.countCards('hs') == 0) {
                    return 0
                }
                return 1
            },
        },
    },
    fullskin:true,
}
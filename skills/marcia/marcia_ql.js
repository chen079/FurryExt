skill={
    trigger:{
        target:"useCardToTarget",
    },
    marktext:"潜",
    intro:{
        markcount:"expansion",
        content:"expansion",
        onunmark:function(storage,player){
            if(storage&&storage.length){
                player.$throw(storage,1000);
                game.cardsDiscard(storage);
                game.log(storage,'被置入了弃牌堆');
             storage.length=0;
            }
        },
    },
    forced:true,
    init:function(player,storage){
        if(!player.storage.marcia_ql_color) player.storage.marcia_ql_color=['red','black']
    },
    filter:function (event, player) {
        if (event.player == player) return false
        if (event.cards.length != 1 || event.targets.length != 1) return false
        var bool1=(event.card.name=='sha');
        var bool2=(get.type2(event.card)=='trick'&&get.tag(event.card,'damage'));
        if(!bool1&&!bool2) return false;
        return player.storage.marcia_ql_color.contains(get.color(event.cards))
    },
    logTarget:"player",
    content:function(){
        'step 0'
        player.storage.marcia_ql_color.remove(get.color(trigger.cards))
        player.addToExpansion(trigger.cards, 'gain2').gaintag.add('marcia_ql');
        trigger.targets.remove(player);
        trigger.getParent().triggeredTargets2.remove(player);
        trigger.untrigger();
        player.markSkill('marcia_ql');
    },
    group:["marcia_ql_new","marcia_ql_gain"],
    subSkill:{
        new:{
            trigger:{
                global:"phaseBefore"
            },
            forced:true,
            unique:true,
            popup:false,
            content:function(){
                player.storage.marcia_ql_color=['red','black']
            }
        },
        gain:{
            trigger:{
                player:"phaseUseBegin"
            },
            filter:function (event, player) {
                return player.getExpansions('marcia_ql').length > 0;
            },
            forced:true,
            unique:true,
            content:function(){
                var cards = player.getExpansions('marcia_ql');
                if (cards.length > 0) {
                    player.gain(cards, 'gain2');
                }
            }
        }
    }
}
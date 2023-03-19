skill={
    audio:"ext:福瑞拓展:2",
    trigger:{
        target:"useCardToPlayered",
    },
    filter:function(event,player){
        if(get.tag(event.card,'damage')&&event.player!=player) return true
    },
    direct:true,
    content:function(){
        "step 0"
        if(player.countCards('h')==0){
            player.draw()
            event.goto(1)
        }
        player.addTempSkill("fr_xieji",{player:"phaseEnd"})
        player.addToExpansion(get.cards(1),'gain2').gaintag.add('fr_xieji')
        "step 1"
        var cards=player.getExpansions('fr_xieji');
        if(!cards.length||!player.countCards('h')){
            event.finish();
        }
        var next=player.chooseToMove('危视：是否交换“协”和手牌？');
        next.set('list',[
            [get.translation(player)+'（你）的协',cards],
            ['手牌区',player.getCards('h')],
        ]);
        next.set('filterMove',function(from,to){
            return typeof to!='number';
        });
        next.set('processAI',function(list){
            var player=_status.event.player,cards=list[0][1].concat(list[1][1]).sort(function(a,b){
                return get.value(a)-get.value(b);
            }),cards2=cards.splice(0,player.getExpansions('fr_xieji').length);
            return [cards2,cards];
        });
        "step 2"
        if(result.bool){
            var pushs=result.moved[0],gains=result.moved[1];
            pushs.removeArray(player.getExpansions('fr_xieji'));
            gains.removeArray(player.getCards('h'));
            if(!pushs.length||pushs.length!=gains.length) return;
            player.addToExpansion(pushs,player,'giveAuto').gaintag.add('fr_xieji');
            game.log(player,'将',pushs,'作为“协”置于武将牌上');
            player.gain(gains,'gain2');
        }
    },
}
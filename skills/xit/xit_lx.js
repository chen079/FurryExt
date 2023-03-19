skill={
    audio:2,
    trigger:{
        global:"dying",
    },
    round:1,
    filter:function(event,player){
        return event.player.hp<=0;
    },
    direct:true,
    content:function(){
        'step 0'
        player.chooseTarget(get.prompt2('xit_lx'),function(card,player,target){
            return target!=_status.event.getTrigger().player;
        }).set('ai',function(target){
            var player=_status.event.player;
            var trigger=_status.event.getTrigger();
            if(get.attitude(player,trigger.player)>0){
                var att1=get.attitude(target,player);
                var att2=get.attitude(target,trigger.player);
                var att3=get.attitude(player,target);
                if(att3<0) return 0;
                return att1/2+att2+att3;
            }
            else{
                return 0;
                // return get.attitude(player,target);
            }
        });
        'step 1'
        if(result.bool){;
            event.target=result.targets[0];
            event.target.draw(6);
            player.logSkill('xit_lx',event.target);
        }
        else{
            event.finish();
        }
        'step 2'
        var target=event.target;
        var tosave=trigger.player;
        var att=get.attitude(target,tosave);
        var hastao=target.countCards('h','tao');
        target.chooseToDiscard(4,true,'he').set('ai',function(card){
            var hastao=_status.event.hastao;
            var att=_status.event.att;
            if(!hastao&&att>0){
                var suit=get.suit(card);
                for(var i=0;i<ui.selected.cards.length;i++){
                    if(get.suit(ui.selected.cards[i])==suit){
                        return -4-get.value(card);
                    }
                }
            }
            if(att<0&&ui.selected.cards.length==3){
                var suit=get.suit(card);
                for(var i=0;i<ui.selected.cards.length;i++){
                    if(get.suit(ui.selected.cards[i])==suit){
                        return -get.value(card);
                    }
                }
                return -10-get.value(card);
            }
            return -get.value(card);
        }).set('hastao',hastao).set('att',att);
        'step 3'
        if(result.cards&&result.cards.length==4){
            var suits=[];
            for(var i=0;i<result.cards.length;i++){
                suits.add(get.suit(result.cards[i]));
            }
            if(suits.length==4){
                event.target.recover(1-event.target.hp);
            }
        }
    },
    ai:{
        expose:0.2,
        threaten:1.5,
    },
}
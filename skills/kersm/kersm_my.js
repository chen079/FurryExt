skill={
    trigger:{
        player:"phaseUseEnd"
    },
    mark:true,
    init:function(player){
        if(!player.storage.kersm_my) player.storage.kersm_my=[];
    },
    check:function(event,player){
        if(player.countCards('h')*2<player.hp) return false;
        var judge=game.filterPlayer(function(current){
            return current!=player&&get.attitude(player,current)
        })
        if(judge.length){
            return true
        }
        return false
    },
    content:function(){
        "step 0"
        var targets=game.filterPlayer(function(target){
            return target!=player
        })
        var num=Math.floor(player.countCards('h')/2);
        player.chooseCardTarget({
            position:'h',
            filterCard:true,
            filterTarget:function(card,player,target){
                return target!=player;
            },
            selectTarget:1,
            targets:targets,
            selectCard:num,
            prompt:'将'+get.cnNumber(num)+'张手牌交给一名其他角色',
            forced:true,
            ai1:function(card){
                var goon=false,player=_status.event.player;
                for(var i of _status.event.targets){
                    if(get.attitude(i,target)>0&&get.attitude(target,i)>0) goon=true;break;
                }
                if(goon){
                    if(!player.hasValueTarget(card)||card.name=='sha'&&player.countCards('h',function(cardx){
                        return cardx.name=='sha'&&!ui.selected.cards.contains(cardx);
                    })>player.getCardUsable('sha')) return 2;
                    return Math.max(2,get.value(card)/4);
                }
                return 1/Math.max(1,get.value(card));
            },
            ai2:function(target){
                return get.attitude(_status.event.player,target);
            },
        });
        'step 1'
        if(result.bool){
            var target=result.targets[0];
            player.line(target,'green');
            target.gain(result.cards,player,'giveAuto');
            player.skip('phaseDiscard')
            player.storage.kersm_my[0]=target
        }
    },
    intro:{
        content:"上次已对$发动过〖盟约〗",
    },
}
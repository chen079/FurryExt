skill={
    audio:true,
    fullskin:true,
    type:"trick",
    enable:true,
    selectTarget:1,
    filterTarget:function(card,player,target){
        if(player==target) return false;
        return target.countGainableCards(player,'h')>0&&player.inRange(target);
    },
    filter:function(event,player){
        if(player.countCards('h')==0) return false;
        return game.hasPlayer(function(current){
            return (current!=player&&get.distance(player,current,'attack')<=1);
        });
    },
    content:function(){
        'step 0'
        if (target.countGainableCards(player, 'h')) {
            player.gainPlayerCard([1,target.countGainableCards(player, 'h')], 'h', target, true);
        }
        'step 1'
        player.chooseCard('h',result.cards.length, true, '获得' + get.translation(target) + '至多' + get.cnNumber(result.cards.length) + '张手牌，然后交给其等量的手牌').set('ai', function (card) {
            return 4 - get.value(card)
        })
        'step 2'
        target.gain(result.cards, player, 'giveAuto')
    },
    ai:{
        wuxie:function(target,card,player,viewer){
            if(get.attitude(viewer,player)>0&&get.attitude(viewer,target)>0){
                return 0;
            }
        },
        basic:{
            order:4,
            useful:7,
            value:9,
        },
        result:{
            target:function(player,target){
                if(get.attitude(player,target)<=0) return ((target.countCards('h',function(card){
                    return get.value(card,target)>0&&card!=target.getEquip('jinhe');
                })>0)?-0.3:0.3)*Math.sqrt(player.countCards('h'));
            },
            player:function(player,target){
                if(get.attitude(player,target)<0&&!target.countCards('h',function(card){
                    return get.value(card,target)>0&&card!=target.getEquip('jinhe');
                })){
                    return 0;
                }
                return 1;
            },
        },
        tag:{
            loseCard:1,
            gain:1,
        },
    },
}
skill={
    enable:"phaseUse",
    filter:function(event,player){
        return ((player.getStat('skill').peterlk_kh||0)<player.getDamagedHp()+1)&&(player.countCards('h','sha')>0||player.countCards('h',{type:['trick','delay']})>0
        &&player.countCards('h',{type:'trick'})!=player.countCards('h','wuxie'))
    },
    filterCard:function(card,player,target){
        return (card.name=='sha'||get.type(card,'trick')=='trick')&&card.name!='wuxie';
    },
    discard:false,
    lose:false,
    delay:false,
    selectCard:1,
    filterTarget:function(card,player,target){
        return target!=player;
    },
    ai1:function(card){
        return 6-get.value(card);
    },
    ai2:function(target){
        var att=get.attitude(_status.event.player,target);
        return att;
    },
    position:'h',
    content:function(){
        "step 0"
        targets[0].gain(cards,player,'give')
        "step 1"
        player.chooseTarget(get.prompt('peterlk_kh'),'控魂：选择'+get.translation(cards[0])+'的目标？',function(card,player,target){
            var player=_status.event.source;
            return lib.filter.targetEnabled2(_status.event.card,player,target)&&lib.filter.targetInRange(_status.event.card,player,target);
        }).set('ai',function(target){
            var player=_status.event.source;
            var card=_status.event.card;
            return get.effect(target,card,player,_status.event.player);
        }).set('card',cards[0]).set('source',targets[0]).setHiddenSkill(event.name);
        "step 2"
        if(result.bool){
            targets[0].useCard(cards[0],result.targets[0],false)
        }
    },
    ai:{
        order:8,
        result:{
            player:1,
        },
    },
}
skill={
    trigger:{
        global:"drawAfter",
    },
    check:function(event,player){
        if(get.attitude(player,event.player)>=0) return false;
        if(get.effect(event.player,{name:'sha'},player,player)<=0) return false;
        if(get.effect(player,{name:'sha'},event.player,player)>=0) return true;
        return player.hasShan()&&player.hp>=event.player.hp;
    },
    filter:function(event,player){
        return player!=event.player&&Array.isArray(event.result)&&event.result.length>0;
    },
    logTarget:"player",
    content:function(){
        'step 0'
        player.viewCards(get.translation(trigger.player)+'摸到的牌',trigger.result);
        if(!event.isMine()){
            game.delayx();
        }
        'step 1'
        var list=[];
        for(var i=0;i<trigger.result.length;i++){
            if(trigger.result[i].name=='sha'){
                list.push(trigger.result[i]);
            }
        }
        if(list.length){
            player.useCard({name:'sha'},trigger.player);
        }
        else{
            trigger.player.useCard({name:'sha'},player);
        }
    },
}
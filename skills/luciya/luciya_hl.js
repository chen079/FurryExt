skill={
    trigger:{
        player:"loseAfter",
    },
    init:function(player){
        if(!player.storage.luciya_hl) player.storage.luciya_hl=0
    },
    usable:1,
    filter:function (event,player){
        return player!=_status.currentPhase&&event.hs&&event.hs.length>0&&['useCard','respond'].contains(event.getParent().name);
   },
    direct:true,
    intro:{
        content:function(storage,player,skill){return '当前判定成功'+storage+'次'}
    },
    mark:true,
    content:function(){
        "step 0"
        player.chooseTarget(get.prompt2('luciya_hl'),function(card,player,target){
            return target!=player;
           }).ai=function(target){
               if(target.hasSkill('hongyan')) return 0;
               return get.damageEffect(target,_status.event.player,_status.event.player,'thunder');
           };
        "step 1"
        event.target=result.targets[0]
        if(result.bool){
            event.target.judge(function(card){
                if(get.suit(card)=='spade'&&get.number(card)>1&&get.number(card)<10){
                    return -4
                }
                return 0
            }).judge2=function(result){
                return result.bool==false?true:false;
            };
        }
        "step 2"
        if(result.bool==false){
            var num=Math.max(1,player.storage.luciya_hl)
            event.target.damage(num, 'thunder', 'nosource')
            player.storage.luciya_hl+=1
        }
    },
    ai:{
        effect:{
            target:function(card,player,target,current){
                var hastarget=game.hasPlayer(function(current){
                    return get.attitude(target,current)<0;
                });
                var be=target.countCards('e',{color:'black'});
                if(target.countCards('h')&&be){
                    if(!target.hasSkill('guidao')) return 0;
                    return [0,hastarget?target.countCards('he')/2:0];
                }
                if(target.countCards('h')&&target.countCards('h')>2){
                    if(!target.hasSkill('guidao')) return 0;
                    return [0,hastarget?target.countCards('h')/4:0];
                }
                if(target.countCards('h')>3||(be&&target.countCards('h')>=2)){
                    return [0,0];
                }
                if(target.countCards('h')==0){
                    return [1.5,0];
                }
                if(target.countCards('h')==1&&!be){
                    return [1.2,0];
                }
                if(!target.hasSkill('guidao')) return [1,0.05];
                return [1,Math.min(0.5,(target.countCards('h')+be)/4)];
            },
        },
    },
}
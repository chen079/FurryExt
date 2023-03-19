skill={
    forced:true,
    trigger:{
        player:"loseAfter",
    },
    mark:true,
    intro:{
        markcount:function(){
            return 0
        },
        content:function(storage,player,skill){
            if(player.storage.diy_jiqiao==0) return '将一张牌置于牌堆顶'
            if(player.storage.diy_jiqiao==1) return '从牌堆底摸一张牌'
            if(player.storage.diy_jiqiao==2) return '获得一名其他角色的一张牌'
        },
    },
    filter:function(event,player){
        return event.getParent().name!='useCard'&&event.getParent().name!='paers_fy'
    },
    init:function(player,storage){
        player.storage.diy_jiqiao=0
    },
    content:function(){
        "step 0"
        player.storage.diy_jiqiao+=1
        if(player.storage.diy_jiqiao==1){
            player.chooseCard('he','将一张牌置于牌堆顶',true).set('ai',function(card){
                return get.value(card)
            })
        }else if(player.storage.diy_jiqiao==2){
            player.draw('bottom')
            event.finish()
        }else if(player.storage.diy_jiqiao==3){
            event.goto(2)
        }
        "step 1"
        player.lose(result.cards,ui.cardPile,'visible','insert');
        player.$throw(result.cards[0],1000);
        game.log(player,'将',result.cards,'置于牌堆顶');
        event.finish()
        "step 2"
        player.chooseTarget('获得一名角色的一张牌',true,function(card,player,target){
            return player!=target&&target.countCards('he')>0
        }).set('ai',function(target){
            var player=_status.event.player
            return -get.attitude(player,target)
        })
        "step 3"
        player.gainPlayerCard(1,'he',result.targets[0],true)
        player.storage.diy_jiqiao=0
        player.chooseUseTarget('###是否发动【愤延】？###视为使用一张没有距离限制的【杀】',{name:'sha'},false,'nodistance').set('ai',function(player){
            var player=_status.event.player
            return player.hp>1
        })
        "step 4"
        if(result.bool){
            player.loseHp()
        }
    },
}
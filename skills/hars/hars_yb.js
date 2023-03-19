skill={
    locked:true,
    mod:{
        cardSavable:function(card,player,target){
            if(card.name=='tao'&&target!=player) return false;
        },
    },
    ai:{
        effect:{
            target:function(card,player,target,current){
                if(get.tag(card,'damage')) return 'zerotarget';
            },
        },
        threaten:0,
        expose:2,
    },
    group:["hars_yb_1","hars_yb_2","hars_yb_3","hars_yb_5","hars_yb_7"],
    subSkill:{
        "1":{
            trigger:{
                player:["dieBefore","die"],
            },
            direct:true,
            forced:true,
            locked:true,
            forceDie:true,
            filter:function(event,player){
                return player.hp<=0&&player.maxHp!=0;
            },
            content:function(){
                trigger.cancel();
                if(player.isDead()&&player.maxHp!=0){
                    player.revive();
                    player.hp=0;
                    player.update();
                    game.log(player,'当前的体力值为['+player.hp+']。');
                }
            },
        },
        "2":{
            trigger:{
                player:"recoverBefore",
            },
            direct:true,
            locked:true,
            forced:true,
            content:function(){
                trigger.cancel()
            },
        },
        "3":{
            trigger:{
                player:"phaseBegin",
            },
            direct:true,
            locked:true,
            forced:true,
            content:function(){
                player.loseMaxHp()
                if(player.maxHp<=0){
                player.die()
                }
            },
        },
        "5":{
            trigger:{
                global:"phaseBegin",
            },
            forced:true,
            locked:true,
            priority:4,
            logTarget:"player",
            content:function(){
            'step 0'
            if(game.zhu&&game.zhu.hasSkill('hars_yb')){
                game.showIdentity();
                var numx=game.players.length;
                var list=0;
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i].hasSkill('hars_yb')) list++;
                    }
                var nei=0;
                var n=[];
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i].identity=='nei'){
                        if(!game.players[i].hasSkill('hars_yb')){
                            nei++;
                            n.add(game.players[i]);
                        }
                    } 
                }
                game.log('场上剩余【'+nei+'】名内奸。');
                game.log('场上有【'+numx+'】名玩家，其中有【'+list+'】名傀尸（视为已死亡）。');
                if(nei>0&&numx==(list+1)){
                    game.over(game.me.identity=='nei');
                    game.log('游戏结束，内奸',n,'获胜。');
                }
                else{
                    var f=[];
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i].identity=='fan') f.add(game.players[i]);
                    }
                game.over(game.me.identity=='fan');
                game.log('游戏结束，反贼',f,'获胜。');
                event.finish();
                }
            }
            else{
            if(trigger.player.identity!='nei'){
                var num1=trigger.player.getFriends(true).length;
                var num2=game.players.length-trigger.player.getFriends(true).length;
                var list1=0;
                var list2=0;
                for(var a=0;a<game.players.length;a++){
                    if(game.players[a].hasSkill('hars_yb')) list1++;
                }
                    for(var b=0;b<trigger.player.getFriends(true).length;b++){
                        if(trigger.player.getFriends(true)[b].hasSkill('hars_yb')) list2++;
                    }
                var list3=(list1-list2);
                if(num2==list3){
                var bool=false;
                if(trigger.player==game.me||trigger.player.isFriendOf(game.me)) bool=true;
                else switch(get.mode()){
                    case 'identity':{
                    game.showIdentity();
                    var id1=trigger.player.identity;
                    var id2=game.me.identity;
                    if(['zhu','zhong'].contains(id1)){
                        if(['zhu','zhong'].contains(id2)) bool=true;
                        break;
                    }
                    break;
                    }
                }
                game.over(bool);
                game.log(trigger.player,'胜：有【'+num2+'】名敌人，其中有【'+list3+'】名傀尸（视为已死亡）。');
                game.log('游戏结束，',trigger.player.getFriends(true),'获胜。');
                }
                else{
                    if(num1==list2){
                    game.log(trigger.player,'负：有【'+num1+'】名队友，其中有【'+list2+'】名傀尸（视为已死亡）。己方阵营失败。');
                    game.log('等待最终胜出者的回合开始，那之后游戏结束。');
                    }
                }
            }
            }
            },
        },
        "7":{
            forced:true,
            trigger:{
                player:"phaseDrawBegin2",
            },
            frequent:true,
            filter:function(event,player){
                return !event.numFixed;
            },
            content:function(){
                trigger.num+=player.maxHp;
            },
        },
    }
}
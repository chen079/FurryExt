skill={
    trigger:{
        player:"phaseUseBegin"
    },
    check:function(event,player){
        var cancel=0,lose=0,players=game.filterPlayer();
        for(var i=0;i<players.length;i++){
            if(players[i].hp<players[i].maxHp){
                if(get.attitude(player,players[i])>0){
                    if(players[i].hp<2){
                        lose--;
                        cancel+=0.5;
                    }
                    lose--;
                    cancel++;
                }
                else if(get.attitude(player,players[i])<0){
                    if(players[i].hp<2){
                        lose++;
                        cancel-=0.5;
                    }
                    lose++;
                    cancel--;
                }
            }
            else{
                if(get.attitude(player,players[i])>0){
                    lose--;
                }
                else if(get.attitude(player,players[i])<0){
                    lose++;
                }
            }
        }
        if(lose>cancel&&lose>0) return true;
        if(lose<cancel&&cancel>0) return false;
    },
    content:function(){
        "step 0"
        player.turnOver()
        event.players=game.filterPlayer()
        event.num=0;
        "step 1"
        if(event.num<event.players.length){
            var target=event.players[event.num];
            target.loseHp();
            event.num++;
            event.redo();
        }
        "step 2"
        player.addTempSkill('')
    },
    subSkill:{
        use:{
            mod:{
                targetInRange:function (card,player,target){
                    if(player.inRange(target)){
                        return true;
                    }
                },
                cardUsableTarget:function(card,player,target){
                    if(player.inRange(target)) return true;
                },
                aiValue:function(player,card,num){
                    if(card.name=='zhangba') return 15;
                    if(player.getEquip('zhangba')&&player.countCards('hs')>1&&['shan','tao'].contains(card.name)) return 0;
                    if(card.name=='shan'||card.name=='tao') return num/2;
                },
            },
        }
    }
}
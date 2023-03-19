skill={
    audio:2,
    trigger:{
        player:["loseAfter","changeHp"],
    },
    frequent:true,
    filter:function(event,player){
        return player.countCards('h')<player.getDamagedHp();
    },
    content:function(){
        player.draw(player.getDamagedHp()-player.countCards('h'));
    },
    ai:{
        noh:true,
        skillTagFilter:function(player,tag){
            if(tag=='noh'&&player.maxHp-player.hp<player.countCards('h')){
                return false;
            }
        },
    },
    group:"sjaa_1",
    subSkill:{
        1:{
            audio:2,
            trigger:{
                player:["damageEnd","loseHpEnd","recoverEnd"],
            },
            filter:function(event,player){
                return player.hp<player.maxHp;
            },
            content:function(){
                "step 0"
                event.count=trigger.num
                "step 1"
                event.num=player.getDamagedHp();
                player.draw(event.num);
                event.count--
                "step 2"
                var check=player.countCards('h')-event.num;
                player.chooseCardTarget({
                    selectCard:event.num,
                    filterTarget:function(card,player,target){
                        return player!=target;
                    },
                    ai1:function(card){
                        var player=_status.event.player;
                        if(player.maxHp-player.hp==1&&card.name=='du') return 30;
                        var check=_status.event.check;
                        if(check<1) return 0;
                        if(player.hp>1&&check<2) return 0;
                        return get.unuseful(card)+9;
                    },
                    ai2:function(target){
                        var att=get.attitude(_status.event.player,target);
                        if(ui.selected.cards.length==1&&ui.selected.cards[0].name=='du') return 1-att;
                        return att-2;
                    },
                    prompt:'将'+get.cnNumber(event.num)+'张手牌交给一名其他角色',
                }).set('check',check);
                "step 3"
                if(result.bool){
                    result.targets[0].gain(result.cards,event.player,'giveAuto');
                    player.line(result.targets,'green');
                }
                "step 4"
                if(event.count>0){
                    event.goto(1)
                }
            },
            ai:{
                threaten:function(player,target){
                    if(target.hp==1) return 3;
                    if(target.hp==2) return 1.5;
                    return 0.5;
                },
                effect:{
                    target:function(card,player,target){
                        if(get.tag(card,'recover')&&player.hp>=player.maxHp-1) return [0,0];
                    },
                },
            },
        }
    }
}
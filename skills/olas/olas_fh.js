skill={
    trigger:{
        player:"shaBegin",
    },
    direct:true,
    filter:function(event,player){
        if(get.itemtype(event.cards)!='cards') return false;
        return player.countCards('he','sha')>0;
    },
    content:function(){
        "step 0"
        player.storage.olas_fh=0;
        event.num=0;
        event.cards=[];
        "step 1"
        var name='sha';
        player.chooseCard([1,Infinity],'he',get.prompt('olas_fh'),function(card,player){
            return get.name(card)==name&&lib.filter.cardDiscardable(card,player);
        }).ai=function(card){
            if(get.attitude(player,trigger.target)>=0) return 0;
            if(get.attitude(player,trigger.target)<0){
                return player.countCards('h','sha');
            }
            return 0;
        }
        "step 2"
        if(result.bool){
            if(event.num==0){
                player.logSkill('olas_fh');
            }
            event.num=result.cards.length
            player.discard(result.cards);
        }
        "step 3"
        if(event.num){
            var next=trigger.target.chooseToRespond({name:'shan'},'请打出一张闪响应破空');
            next.ai=get.unuseful2;
            if(event.num>1) next.set('prompt2','共需额外打出'+event.num+'张闪');
        }
        else{
            event.finish();
        }
        "step 4"
        if(result.bool){
            event.num--;
            event.goto(3);
        }
        else{
            trigger.untrigger();
            trigger.directHit=true;
            player.storage.olas_fh=event.num;
        }
    },
    group:["olas_fh_2","olas_fh_3"],
    subSkill:{
        "2":{
            trigger:{
                source:"damageBegin",
            },
            forced:true,
            popup:false,
            filter:function(event,player){
                return event.card&&event.card.name=='sha'&&player.storage.olas_fh>0&&event.parent.name!='_lianhuan'&&event.parent.name!='_lianhuan2';
            },
            content:function(){
                trigger.num+=player.storage.olas_fh;
                player.storage.olas_fh=0;
            },
            sub:true,
        },
        "3":{
            trigger:{
                player:"shaEnd",
            },
            silent:true,
            content:function(){
                player.storage.olas_fh=0;
            },
            forced:true,
            popup:false,
            sub:true,
        },
    },
}
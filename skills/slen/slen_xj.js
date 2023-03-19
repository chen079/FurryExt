skill={
    enable:"phaseUse",
    filterTarget:function(card,player,target){
        return player!=target&&target.countCards('h')>0
    },
    position:"h",
    usable:1,
    discard:false,
    lose:false,
    delay:false,
    selectCard:[1,2],
    filterCard:function(card){
        if(ui.selected.cards.length){
            return get.number(card)!=get.number(ui.selected.cards[0]);
        }
        return true;
    },
    check:function(card){
        return 5-get.value(card)
    },
    filter:function(event,player){
        return player.countCards('h')>0
    },
    content:function(){
        "step 0"
        target.gain(cards,player,'giveAuto').gaintag.add('slen_xj')
        "step 1"
        var cardx=target.getCards('h')
        var listbig=[]
        var listsmall=[]
        var listmiddle=[]
        for(var i=0;i<cardx.length;i++){
            if(cards.length==1){
                if(get.number(cardx[i])>=get.number(cards[0])) listbig.push(cardx[i])
                if(get.number(cardx[i])<=get.number(cards[0])) listsmall.push(cardx[i])
            }else{
                if(get.number(cards[0])>get.number(cards[1])){
                    if((get.number(cardx[i])<=get.number(cards[0]))&&(get.number(cardx[i])>=get.number(cards[1]))) listmiddle.push(cardx[i])
                    event.small=get.number(cards[1])
                    event.big=get.number(cards[0])
                }else{
                    if((get.number(cardx[i])<=get.number(cards[1]))&&(get.number(cardx[i])>=get.number(cards[0]))) listmiddle.push(cardx[i])
                    event.small=get.number(cards[0])
                    event.big=get.number(cards[1])
                }
            }
        }
        event.listbig=listbig
        event.listsmall=listsmall
        event.listmiddle=listmiddle
        "step 2"
        if(cards.length==1){
            var value1=0
            var value2=0
            for(var i=0;i<event.listsmall.length;i++){
                value1+=get.value(event.listsmall[i])
            }
            for(var j=0;j<event.listbig.length;j++){
                value2+=get.value(event.listbig[j])
            }
            target.chooseControl('选项一','选项二').set('choiceList',['交给'+get.translation(player)+'点数不大于'+get.number(cards[0])+'的所有牌','交给'+get.translation(player)+'点数不小于'+get.number(cards[0])+'的所有牌']).set('ai',function(){
                if(value1>value2){
                    return '选项二'
                }else{
                    return '选项一'
                }
            })
        }else{
            event.goto(4)
        }
        "step 3"
        if(result.control=='选项一'){
            player.gain(event.listsmall,target,'giveAuto')
        }else if(result.control=='选项二'){
            player.gain(event.listbig,target,'giveAuto')
        }
        event.finish()
        "step 4"
        target.chooseCard('h',[1,event.listmiddle.length],'交给'+get.translation(player)+'任意张点数∈['+event.small+','+event.big+']之间的手牌并摸等量的牌',function(card){
            return event.listmiddle.contains(card)
        }).set('ai',function(card){
            var player=_status.event.player;
            if(get.position(card)=='h'&&!player.countCards('h','du')&&(player.hp>2||!player.countCards('h',function(card){
                return get.value(card)>=8;
            }))){
                return 1;
            }
            return 6-get.value(card)
        }).set('complexCard',true)
        "step 5"
        if(result.bool){
            var num=0
            if(result.cards.length==event.listmiddle.length) num+=1
            player.gain(result.cards,target,'giveAuto')
            target.draw(result.cards.length+num)
            target.removeGaintag('slen_xj');
        }
    },
    ai:{
        result:{
            player:function(player){
                if(ui.selected.cards.length==2){
                    return -0.5;
                }
                return 1;
            },
            target:function(player,target){
                if(ui.selected.cards.length==2){
                    return 1;
                }
                return 1/target.countCards('h')-2;
            },
        },
        order:5,
    },
}
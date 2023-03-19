skill={
    audio:true,
    fullskin:true,
    type:"basic",
    cardcolor:"red",
    notarget:true,
    nodelay:true,
    "yingbian_prompt":function(card){
        var str='';
        if(get.cardtag(card,'yingbian_gain')){
            str+='当你声明使用此牌时，你获得此牌响应的目标牌';
        }
        if(!str.length||get.cardtag(card,'yingbian_draw')){
            if(str.length) str+='；';
            str+='当你声明使用此牌时，你摸一张牌';
        }
        return str;
    },
    "yingbian_tags":["gain","draw"],
    yingbian:function(event){
        var bool=false;
        if(get.cardtag(event.card,'yingbian_gain')){
            bool=true;
            var cardx=event.respondTo;
            if(cardx&&cardx[1]&&cardx[1].cards&&cardx[1].cards.filterInD('od').length) event.player.gain(cardx[1].cards.filterInD('od'),'gain2','log');
        }
        if(!bool||get.cardtag(event.card,'yingbian_draw')) event.player.draw();
    },
    content:function(){
        event.result='shaned';
        event.getParent().delayx=false;
        game.delay(0.5);
    },
    ai:{
        order:3,
        basic:{
            useful:[7,5.1,2],
            value:[7,5.1,2],
        },
        result:{
            player:1,
        },
    },
}
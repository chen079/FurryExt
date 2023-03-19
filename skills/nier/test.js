skill={
    enable:"phaseUse",
    filter:function(event,player){
        return player.countCards('h');
    },
    chooseButton:{
        dialog:function(event,player){
            var cards=player.getCards('h');
            var list=[];
            for(var i of lib.inpile){
                var card={name:i,isCard:true};
                var info=get.info(card,false);
                if((!info.notarget&&(info.toself||info.singleCard||!info.selectTarget||info.selectTarget==1))&&get.type(i)=='trick'&&event.filterCard({
                name:i,
                cards:cards,
            },player,event)){
                list.push(['锦囊','',i]);
                }
            }
            return ui.create.dialog('活墨',[list,'vcard']);
        },
        filter:function(button,player){
            return lib.filter.filterCard({name:button.link[2]},player,_status.event.getParent());
        },
        check:function(button){
            var player=_status.event.player;
            return player.getUseValue({name:button.link[2]});
        },
        backup:function(links,player){
        return {
            filterCard:true,
            selectCard:1,
            check:function(card){
                if(ui.selected.cards.length) return 0;
                return 7-get.value(card);
            },
            position:'h',
            popname:true,
            viewAs:{name:links[0][2]},
            }
        },
        prompt:function(links,player){
            return '将一张牌当作'+get.translation(links[0][2])+'使用';
        },
    },
    ai:{
        order:1,
        result:{
            player:1,
        },
    },
}
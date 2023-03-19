skill={
    direct:true,
    locked:true,
    enable:["chooseToRespond","chooseToUse"],
    filter:function(event,player){
        var filter=event.filterCard;
        if(filter({name:'sha'},player,event)&&player.countCards('hes',{color:'red'})) return true;
        if(filter({name:'shan'},player,event)&&player.countCards('hes',{color:'black'})) return true;
        return false;
    },
    chooseButton:{
        dialog:function(event,player){
            var list=[];
            if(event.filterCard({name:'sha'},player,event)){
                list.push(['基本','','sha']);
                for(var j of lib.inpile_nature) list.push(['基本','','sha',j]);
            }
            if(event.filterCard({name:'shan'},player,event)){
                list.push(['基本','','shan']);
            }
            return ui.create.dialog('应势',[list,'vcard'],'hidden');
        },
        check:function(button){
            var player=_status.event.player;
            var card={name:button.link[2],nature:button.link[3]};
            if(_status.event.getParent().type!='phase'||game.hasPlayer(function(current){
                return player.canUse(card,current)&&get.effect(current,card,player,player)>0;
            })){
                switch(button.link[2]){
                    case 'shan':return 5;
                    case 'sha':
                        if(button.link[3]=='fire') return 2.95;
                        else if(button.link[3]=='thunder'||button.link[3]=='ice') return 2.92;
                        else return 2.9;
                }
            }
            return 0;
        },
        backup:function(links,player){
            return {
                filterCard:function (card,player){
                    var name=links[0][2];
                    if(name=="sha"){
                        return get.color(card)=="red";
                    }
                    if(name=="shan"){
                        return get.color(card)=="black";
                    }
                },
                selectCard:1,
                check:function(card,player,target){
                    if(!ui.selected.cards.length) return 6;
                    else return 6-get.value(card);
                },
                viewAs:{name:links[0][2],nature:links[0][3]},
                position:'hes',
                popname:true,
            }
        },
        prompt:function (links,player){
                    if(links[0][2]=='sha'){str='红色'}
                    else if(links[0][2]=='shan'){str = '黑色'}
                    return '将一张'+str+'牌当做'+(get.translation(links[0][3])||'')+'【'+get.translation(links[0][2])+'】'+'使用或打出';
        },
    },
    ai:{
        order:3.1,
        skillTagFilter:function(player,tag,arg){
            if(tag=='fireAttack') return true;
        return player.countCards('hes')>0;
        },
        result:{
            player:1,
        },
        respondSha:true,
        respondShan:true,
        fireAttack:true,
    },
}
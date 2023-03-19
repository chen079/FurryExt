skill={
    direct:true,
    enable:["chooseToUse","chooseToRespond"],
    hiddenCard:function(player,name){
        if(!['sha','shan','tao','jiu'].contains(name)) return false;
        return player.countCards('hes')>0;
    },
    filter:function(event,player){
        if(event.filterCard({name:'sha'},player,event)||
            event.filterCard({name:'shan'},player,event)||
            event.filterCard({name:'jiu'},player,event)||
            event.filterCard({name:'tao'},player,event)){
            return player.countCards('hes')>0;
        }
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
            if(event.filterCard({name:'tao'},player,event)){
                list.push(['基本','','tao']);
            }
            if(event.filterCard({name:'jiu'},player,event)){
                list.push(['基本','','jiu']);
            }
            return ui.create.dialog('降龙',[list,'vcard'],'hidden');
        },
        check:function(button){
            var player=_status.event.player;
            var card={name:button.link[2],nature:button.link[3]};
            if(_status.event.getParent().type!='phase'||game.hasPlayer(function(current){
                return player.canUse(card,current)&&get.effect(current,card,player,player)>0;
            })){
                switch(button.link[2]){
                    case 'tao':case 'shan':return 5;
                    case 'jiu':{
                        if(player.countCards('hes')>0)  return 3;
                    };
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
                filterCard:function(card,player,event){
                    if(ui.selected.cards.length) return get.color(card,player)!=get.color(ui.selected.cards[0],player);
                    return true
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
        prompt:function(links,player){
            return '将一张牌当做'+get.translation(links[0][3]||'')+get.translation(links[0][2])+'使用或打出';
        },
    },
    ai:{
        order:function(){
            var player=_status.event.player;
            var event=_status.event;
            if(event.filterCard({name:'jiu'},player,event)&&get.effect(player,{name:'jiu'})>0){
                return 3.3;
            }
            return 3.1;
        },
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
skill = {
    mark:true,
    intro: {
        content: function (event, player, storage) {
            return '当前[]内的数值为：' + player.storage.hynea_cg
        }
    },
    init: function (player) {
        if (!player.storage.hynea_cg) player.storage.hynea_cg = 4
    },
    mod:{
        cardEnabled:function(card,player){
            if(_status.event.skill!='hynea_cg'&&player.hp>=player.storage.hynea_cg&&(get.name(card)=='tao'||get.name(card)=='shan')) return false;
        },
        cardUsable:function(card,player){
            if(_status.event.skill!='hynea_cg'&&player.hp>=player.storage.hynea_cg&&(get.name(card)=='tao'||get.name(card)=='shan')) return false;
        },
        cardRespondable:function(card,player){
            if(_status.event.skill!='hynea_cg'&&player.hp>=player.storage.hynea_cg&&(get.name(card)=='tao'||get.name(card)=='shan')) return false;
        },
        cardSavable:function(card,player){
            if(_status.event.skill!='hynea_cg'&&player.hp>=player.storage.hynea_cg&&(get.name(card)=='tao'||get.name(card)=='shan')) return false;
        },
    },
    enable:["chooseToUse"],
    filterCard:function(card){
        return (get.name(card)=='tao'||get.name(card)=='shan');
    },
    viewAsFilter:function(player){
        if(player.hp<player.storage.hynea_cg) return false;
        if(!player.hasCard(function(card){
            return (get.name(card)=='tao'||get.name(card)=='shan');
        })) return false;
    },
    viewAs:{
        name:"jiu",
    },
    prompt:"将一张【桃】和【闪】当作【酒】使用",
    check:function(){
        return 1
    },
    ai:{
        skillTagFilter:function(player){
            if(player.hp<player.storage.hynea_cg) return false;
            if(!player.hasCard(function(card){
                return (get.name(card)=='tao'||get.name(card)=='shan');
            })) return false;
        },
        basic:{
            useful:function(card,i){
                if(_status.event.player.hp>1){
                    if(i==0) return 4;
                    return 1;
                }
                if(i==0) return 7.3;
                return 3;
            },
            value:function(card,player,i){
                if(player.hp>1){
                    if(i==0) return 5;
                    return 1;
                }
                if(i==0) return 7.3;
                return 3;
            },
        },
        order:function(){
            return get.order({name:'sha'})+0.2;
        },
        result:{
            target:function(player,target){
                if(target&&target.isDying()) return 2;
                if(target&&!target.isPhaseUsing()) return 0;
                if(lib.config.mode=='stone'&&!player.isMin()){
                    if(player.getActCount()+1>=player.actcount) return 0;
                }
                var shas=player.getCards('h','sha');
                if(shas.length>1&&(player.getCardUsable('sha')>1||player.countCards('h','zhuge'))){
                    return 0;
                }
                shas.sort(function(a,b){
                    return get.order(b)-get.order(a);
                })
                var card;
                if(shas.length){
                    for(var i=0;i<shas.length;i++){
                        if(lib.filter.filterCard(shas[i],target)){
                            card=shas[i];break;
                        }
                    }
                }
                else if(player.hasSha()&&player.needsToDiscard()){
                    if(player.countCards('h','hufu')!=1){
                        card={name:'sha'};
                    }
                }
                if(card){
                    if(game.hasPlayer(function(current){
                        return (get.attitude(target,current)<0&&
                            target.canUse(card,current,null,true)&&
                            !current.hasSkillTag('filterDamage',null,{
                                player:player,
                                card:card,
                                jiu:true,
                            })&&
                            get.effect(current,card,target)>0);
                    })){
                        return 1;
                    }
                }
                return 0;
            },
        },
        tag:{
            save:1,
            recover:0.1,
        },
    },
}
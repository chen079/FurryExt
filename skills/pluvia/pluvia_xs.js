skill={
    init:function(player){
        if(!player.pluvia_xs) player.pluvia_xs='平';
    },
    filter:function(event,player){
        if(player.pluvia_xs=='平'){
            return player.countCards('hs','tao')>0&&game.hasPlayer(function(current){
                return current.isDamaged();
            });
        }else{
            return player.countCards('hs','sha')>0
        }
    },
    filterTarget:function(card,player,target){
        if(player.pluvia_xs=='平'){
            if(target.hp>=target.maxHp) return false;
            return true;
        }else{
            return target!=player
        }
    },
    position:'hs',
    mark:true,
    filterCard:function(card,player,target){
        if(player.pluvia_xs=='平'){
            return get.name(card,player)=='tao'
        }else{
            return get.name(card,player)=='sha'
        }
    },
    marktext:"🎶",
    intro:{
        content:function(storage,player){
        var str;
        switch(player.pluvia_xs){
            case '平':str='出牌阶段限一次，你可以弃置一张【桃】，然后令一名角色回复一点体力';break;
            case '仄':str='出牌阶段限一次，你可以弃置一张【杀】，然后对一名其他角色造成一点伤害';break;
        }
        return '<li>当前韵律：'+(player.pluvia_xs||'平')+'<br><li>'+str;
        },
    },
    group:"pluvia_xs_zhuanyun",
    yunlvSkill:true,
    enable:"phaseUse",
    usable:1,
    content:function(){
        'step 0'
        switch(player.pluvia_xs||'平'){
            case '平':
            target.recover()
            break;
            case '仄':
            target.damage(1,player)
            break;
        }
    },
    ai:{
        order:7,
        result:{
            target:function(player,target){
                if(player.pluvia_xs=='平'){
                    if(target.hp==1) return 5;
                    if(player==target&&player.countCards('h')>player.hp) return 5;
                    return 2;
                }else{
                    return get.damageEffect(target,player)-(target.maxHp-target.hp)/2;
                }
            }
        },
    },
    subSkill:{
        zhuanyun:{
            trigger:{
                player:"pluvia_sxAfter",
            },
            forced:true,
            locked:false,
            content:function(){
                player.bolZhuanYun('pluvia_xs');
            },
            sub:true,
        },
    },
}
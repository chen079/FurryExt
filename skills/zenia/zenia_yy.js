skill={
    init:function(player){
        if(!player.zenia_yy) player.zenia_yy='平';
    },
    filterTarget:true,
    mark:true,
    marktext:"🎶",
    intro:{
        content:function(storage,player){
        var str;
        switch(player.zenia_yy){
            case '平':str='出牌阶段限一次，你可以令一名角色摸'+player.maxHp+'张牌，然后弃置'+player.hp+'张手牌。';break;
            case '仄':str='出牌阶段限一次，你可以令一名角色弃置'+player.maxHp+'张手牌，然后摸'+player.hp+'张牌。';break;
        }
        return '<li>当前韵律：'+(player.zenia_yy||'平')+'<br><li>'+str;
        },
    },
    group:"zenia_yy_zhuanyun",
    yunlvSkill:true,
    enable:"phaseUse",
    usable:1,
    content:function(){
        'step 0'
        switch(player.zenia_yy||'平'){
            case '平':
            target.draw(player.maxHp);
            target.chooseToDiscard(player.hp,'h',true)
            break;
            case '仄':
            target.chooseToDiscard(player.maxHp,'h',true)
            target.draw(player.hp);
            break;
        }
    },
    ai:{
        order:7,
        result:{
            target:function(player,target){
            if(player.hp==player.maxHp){
                return 1
            }else if(player.hp!=player.maxHp){
                if(player.zenia_yy=='仄'&&target.countCards('h')>player.hp&&target.countCards('h')<player.maxHp){
                    return -1
                }
                return 1;
                }
            }
        },
    },
    subSkill:{
        zhuanyun:{
            trigger:{
                player:"zenia_ysAfter",
            },
            forced:true,
            locked:false,
            content:function(){
                player.bolZhuanYun('zenia_yy');
            },
            sub:true,
        },
    },
}
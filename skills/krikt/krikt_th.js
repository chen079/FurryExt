skill={
    mark:true,
    locked:true,
    zhuanhuanji:true,
    marktext:"☯",
    intro:{
        content:function(storage,player,skill){
            if(player.storage.krikt_th==true) return '锁定技，出牌阶段，你的【杀】无使用次数限制，你的黑色【杀】均视为雷【杀】；每当你对其他角色造成一点伤害，你弃置其一张手牌。';
            return '锁定技，你的【杀】可以额外指定一个目标，你的红色【杀】均视为火【杀】；每当你对其他角色造成一点伤害，你摸一张牌。';
        },
    },
    audio:"ext:无名扩展:2",
    trigger:{
        player:"phaseUseBegin",
    },
    forced:true,
    content:function(){
    'step 0'
        if(player.storage.krikt_th==true){
            player.storage.krikt_th=false;
            player.addTempSkill('krikt_th_2','phaseUseAfter');
        }
        else{
            player.storage.krikt_th=true;
            player.addTempSkill('krikt_th_1','phaseUseAfter');
        };
            player.updateMark('krikt_th')
    },
    subSkill:{
        "1":{
            trigger:{
                source:"damageEnd",
            },
            filter:function(event,player){
                return player!=event.player
            },
            content:function(){
                player.discardPlayerCard(trigger.num,trigger.player,'h',true)
            },
            forced:true,
            mod:{
                cardUsable:function(card){
                    if(card.name=='sha') return Infinity;
                },
                cardnature:function(card,player){
                    if(card.name=='sha'&&get.color(card)=='black') return 'thunder';
                },
            },
            ai:{
                effect:{
                    target:function(card,player,target,current){
                        if(get.tag(card,'respondSha')&&current<0) return 0.6
                    },
                },
                respondSha:true,
            },
            sub:true,
        },
        "2":{
            trigger:{
                source:"damageEnd",
            },
            filter:function(event,player){
                return player!=event.player
            },
            content:function(){
                player.draw(trigger.num)
            },
            forced:true,
            mod:{
                targetInRange:function(card,player){
                    if(card.name=='sha') return true;
                },
                cardnature:function(card,player){
                    if(card.name=='sha'&&get.color(card)=='red') return 'fire';
                },
                selectTarget:function(card,player,range){
            if(card.name=='sha'&&range[1]!=-1){
                range[1]++;
            }
        },
            },
            ai:{
                effect:{
                    target:function(card,player,target,current){
                        if(get.tag(card,'respondSha')&&current<0) return 0.6
                    },
                },
                respondSha:true,
            },
            sub:true,
        },
    },
    ai:{
        fireAttack:true,
        halfneg:true,
        threaten:1.05,
    },
}
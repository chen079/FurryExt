Skill={
    enable:"phaseUse",
    usable:1,
    filter:function(event,player){
        return player.countCards('he')>0;
    },
    filterTarget:function(card,player,target){
        return target!=player&&!target.hasSkill('lions_ms_1');
    },
    filterCard:true,
    position:"he",
    check:function(card){
        return 8-get.value(card);
    },
    content:function(){
        'step 0'
        target.chooseToRespond({name:'shan'});
        'step 1'
        if(!result.bool) target.addSkill('lions_ms_1');
    },
    ai:{
        order:2.2,
        result:{
            target:function(player,target){
                return Math.min(-0.1,-1-target.countCards('h')+Math.sqrt(target.hp)/2);
            },
        },
    },
    subSkill:{
        "1":{
            mark:true,
            intro:{
                content:"不能使用或打出手牌直到受到伤害或下一回合结束",
            },
            trigger:{
                player:["damageEnd","phaseEnd"],
            },
            forced:true,
            popup:false,
            content:function(){
                player.removeSkill('lions_ms_1');
            },
            mod:{
                cardEnabled:function(){
                    return false;
                },
                cardUsable:function(){
                    return false;
                },
                cardRespondable:function(){
                    return false;
                },
                cardSavable:function(){
                    return false;
                },
            },
            ai:{
                threaten:0.6,
            },
        }
    }
}
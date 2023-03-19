skill={
    audio:2,
    trigger:{
        player:"damageEnd",
    },
    direct:true,
    preHidden:true,
    content:function(){
        "step 0"
        player.chooseTarget(1,false,function(card,player,target){
            return target!=player;
        }).set('ai',function(target){
            return -get.attitude(_status.event.player,target)/(1+target.countCards('h'));
        }).set("prompt","是否选择一名角色发动【死搏】").set("prompt2","若结果为♥，该角色翻至背面；若结果为♦，受该角色到来自你的1点伤害；若结果为♣，该角色跳过下个摸牌阶段；若结果为♠，你弃置该角色两张牌。");
        "step 1"
        if(result.bool){
            event.target=result.targets[0];
            player.logSkill('mudaya_bz',target);
        }
        else event.finish();
        "step 2"
        target.judge()
        "step 3"
        if(result.suit=='heart'){
            target.skip('phaseUse');
            target.addTempSkill('mudaya_bz_2',{player:'phaseUseSkipped'})
        }else if(result.suit=='diamond'){
            target.damage()
        }else if(result.suit=='club'){
            target.skip('phaseDraw');
            target.addTempSkill('mudaya_bz_1',{player:'phaseDrawSkipped'})
        }else if(result.suit=='spade'){
           if(target.countCards('he')){
            player.discardPlayerCard(2,target,'he',true);
            }
        }
    },
    ai:{
        maixie:true,
        "maixie_defend":true,
        effect:{
            target:function(card,player,target){
                if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
                return 0.8;
                // if(get.tag(card,'damage')&&get.damageEffect(target,player,player)>0) return [1,0,0,-1.5];
            },
        },
    },
    subSkill:{
        "1":{
            mark:true,
            intro:{
                content:"跳过下回合的摸牌阶段",
            },
        },
        "2":{
            mark:true,
            intro:{
                content:"跳过下回合的出牌阶段",
            },
        }
    }
}
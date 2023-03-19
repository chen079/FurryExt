skill={
    trigger:{
        player:"damageEnd",
    },
    frequent:true,
    filter:function(event,player){
        if(!event.source||event.source.isDead()) return true
        return false
    },
    content:function(){
        "step 0"
        player.draw(2)
        var next = player.chooseTarget(1,false).set("prompt","请选择一名其他角色").set("prompt2","该角色选择一项：1.交给你一张牌、2.视为你对其使用一张火【杀】。")
        next.set("filterTarget",function(event,player,target){
            return player!=target
        })
        next.ai=function(target){
            return -get.attitude(_status.event.player,target)/(1+target.countCards('h'));
        };
        "step 1"
        if(result.bool){
            event.targets=result.targets
            var then =event.targets[0].chooseCard(1,'he').set('prompt',"交给"+get.translation(player)+"一张牌或视为其对你使用一张【杀】")
            then.ai=function(card){
                    return 6 - get.value(card);
                }
        }else{
            event.finish()
            return;
        }
        "step 2"
        if(result.cards && result.bool){
            if (player.isIn()) {
                player.gain(result.cards, event.targets[0], 'giveAuto');
            }
        } else {
            player.useCard(event.targets[0],{name:'sha',nature:'fire'},false);
        }
    },
    ai:{
        maixie:true,
    },
    group:"nore_ys_1",
    subSkill:{
        "1":{
            trigger:{
                global:"damageEnd",
            },
            direct:true,
            filter:function(event,player){
                if(event.player!=player&&(!event.source||event.source.isDead())) return true
                return false
            },
            content:function(){
                'step 0'
                trigger.player.chooseToDiscard('he','弃置一张牌，或令'+get.translation(player)+'摸一张牌').set('ai',function(card){
                    if(_status.event.goon) return 7-get.value(card);
                    return -get.value(card);
                }).set('goon',get.attitude(trigger.player,player)<0);
                'step 1'
                if(!result.bool) player.draw();
            },
        }
    }
}
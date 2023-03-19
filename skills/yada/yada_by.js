skill={
    audio:2,
    enable:"phaseUse",
    direct:true,
    filterTarget:function(card,player,target){
        return player.canCompare(target);
    },
    content:function(){
        'step 0'
        player.logSkill('yada_by',target);
        player.chooseToCompare(target);
        'step 1'
        if(result.bool){
            if(target.countCards('hej')) player.gainPlayerCard([1,3],'h',target,false);
        }else{
                player.addTempSkill('yada_by_1')
                player.addTempSkill('yada_by_2')
                event.finish();
        }
        'step 2'
    },
    ai:{
        order:function(item,player){
            if(player.countCards('h',function(card){
                return player.hasValueTarget(card);
            })) return 10;
            return 1;
        },
        result:{
            target:function(player,target){
                if(player.countCards('h',function(card){
                    return player.hasValueTarget(card);
                })){
                    if(player.hasSkill('yada_by_1')) return 0;
                    var nd=!player.needsToDiscard();
                    if(player.hasCard(function(card){
                        if(get.position(card)!="h") return false;
                        var val=get.value(card)
                        if(nd&&val<0) return true;
                        if(val<=5){
                            return get.number(card)>=12;
                        }
                        if(val<=6){
                            return get.number(card)>=13;
                        }
                        return false;
                    })) return -1;
                    return 0;
                }
                return -1;
            },
        },
    },
    subSkill:{
        "1":{
            mod:{
                targetEnabled:function(card,player,target){
                    if(player==target) return false;
                },
            },
            mark:true,
            intro:{
                content:"本回合内不能对自己使用牌，且【辩言】失效",
            },
        },
        "2": {
            forced:true,
            direct:true,
            charlotte:true,
            init:function(player,skill){
                player.removeSkill("yada_by");
            },
            onremove:function(player,skill){
                player.addSkill("yada_by");
            },
        }
    }
}
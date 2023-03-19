skill={
    trigger:{
        player:"useCardToPlayered",
    },
    direct:true,
    shaRelated:true,
    filter:function(event,player){
        return event.card.name=='sha'&&event.target.countCards('he')>0;
    },
    content:function(){
        "step 0"
        player.addTempSkill("fr_xieji",{player:"phaseEnd"})
        player.choosePlayerCard('h',trigger.target)
        "step 1"
        player.addToExpansion(result.cards,'gain2').gaintag.add('fr_xieji')
        "step 2"
        var next=player.choosePlayerCard(trigger.target,'he',[1,Math.min(trigger.target.hp,trigger.target.countCards('he'))],get.prompt('bofeng_aj',trigger.target))
        .set('prompt2','将目标角色至多'+Math.min(trigger.target.hp-1,trigger.target.countCards('he'))+'张牌置于其武将牌上');
        next.set('ai',function(button){
            if(!_status.event.goon) return 0;
            var val=get.value(button.link);
            if(button.link==_status.event.target.getEquip(2)) return 2*(val+3);
            return val;
        });
        next.set('goon',get.attitude(player,trigger.target)<=0);
        next.set('forceAuto',true);
        "step 3"
        if(result.bool){
            var target=trigger.target;
            player.logSkill('bofeng_aj',target);
            target.addSkill('bofeng_aj_2');
            target.addToExpansion('giveAuto',result.cards,target).gaintag.add('bofeng_aj_2');
        }
    },
    subSkill:{
        "2":{
            trigger:{
                global:"phaseEnd",
            },
            forced:true,
            popup:false,
            charlotte:true,
            filter:function(event,player){
                return player.getExpansions('bofeng_aj_2').length>0;
            },
            content:function(){
                'step 0'
                var cards=player.getExpansions('bofeng_aj_2');
                player.gain(cards,'draw');
                game.log(player,'收回了'+get.cnNumber(cards.length)+'张“玄技”牌');
                'step 1'
                player.removeSkill('bofeng_aj_2');
            },
            intro:{
                markcount:"expansion",
                mark:function(dialog,storage,player){
                    var cards=player.getExpansions('repojun2');
                    if(player.isUnderControl(true)) dialog.addAuto(cards);
                    else return '共有'+get.cnNumber(cards.length)+'张牌';
                },
            },
        }
    }
}
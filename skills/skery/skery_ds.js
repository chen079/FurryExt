skill={
    trigger:{
        source:"damageAfter",
    },
    filter:function(event,player){
        return event.card;
    },
    forced:true,
    content:function(){
        var target =trigger.player;
        target.addTempSkill('skery_ds_1',{player:'phaseAfter'});
        target.addTempSkill('skery_ds_2',{player:'phaseAfter'})
        target.addMark('skery_ds_1',trigger.num,false);
    },
    group:"skery_ds_3",
    subSkill:{
        "1":{
            forced:true,
            popup:false,
            trigger:{
                player:"phaseEnd",
            },
            onremove:true,
            content:function(){
                player.loseHp(player.countMark('skery_ds_1'));
                game.log(player,'【毒杀】造成的体力流失为'+player.countMark('skery_ds_1'));
                player.removeSkill('skery_ds_1');
            },
            marktext:"毒",
            intro:{
                content:"回合结束时，【毒杀】造成的体力流失为#",
            },
            sub:true,
        },
        "2":{
            forced:true,
            popup:false,
            trigger:{
                player:"useCard",
            },
            filter:function(event,player){
                return (event.card.name=='tao'||event.card.name=='jiu')&&event.player.isPhaseUsing();
            },
            content:function(){
                if(player.countMark('skery_ds_1')!=0) player.removeSkill('skery_ds_1')
            },
            sub:true,
        },
        "3":{
            forced:true,
            popup:false,
            trigger:{
                player:"useCardToPlayered",
            },
            filter:function(event,player){
                return event.card.name=='sha'&&get.color(event.card)=='black';
            },
            logTarget:"target",
            content:function(){
                trigger.getParent().directHit.add(trigger.target);
            },
            ai:{
                skillTagFilter:function (player, tag, arg) {
                    if (!arg || arg.isLink || !arg.card || arg.card.name != 'sha') return false;
                    if (arg && arg.name == 'sha'&&arg.color =='black') return true;
                },
                "directHit_ai":true,
            },
            sub:true,
        },
    },
}
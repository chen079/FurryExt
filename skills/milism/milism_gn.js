skill={
    forced:true,
    trigger:{
        player:"damageEnd",
    },
    content:function(){
        "step 0"
        var next = player.chooseTarget('令一名角色摸2X张牌（X为此次伤害值）');
        if(player.storage.milism_th_recode&&player.storage.milism_th_recode.length){
            next.set('prompt2','（若目标为'+get.translation(player.storage.milism_th_recode)+'则改为摸3X张牌）')}
            next.set('ai',function(target){
                var player=_status.event.player;
                var att=get.attitude(player,target)/Math.sqrt(1+target.countCards('h'));
                if(target.hasSkillTag('nogain')) att/=10;
                if(player.storage.milism_th_recode&&player.storage.milism_th_recode.contains(target)) return att*2;
                return att;
            })
        "step 1"
        var target=result.targets[0];
            player.line(target,'green');
        if(player.storage.milism_th_recode&&player.storage.milism_th_recode.contains(target)){
            target.draw(3*trigger.num);
        }
        else{
            target.draw(2*trigger.num);
        }
    },
}
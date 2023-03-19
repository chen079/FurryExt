skill={
    audio:2,
    trigger:{
        global:"phaseBefore",
        player:"enterGame",
    },
    forced:true,
    filter:function(event,player){
        return event.name!='phase'||game.phaseNumber==0;
    },
    derivation:"terz_ly",
    logTarget:()=>game.filterPlayer().sortBySeat(),
    content:function(){
        'step 0'
        game.countPlayer(function(current){
            current.addSkill('terz_ly');
            current.markSkill('terz_ly_mark')
        });
        game.log(player,'令所有其他角色获得了技能','#g〖流域〗')
        game.delayx();
        'step 1'
        player.chooseTarget('是否减1点体力上限，并令一名其他角色获得技能〖复攥〗？',lib.filter.notMe).set('ai',function(target){
            var player=_status.event.player;
            if(player.hasUnknown()&&!target.isZhu) return 0;
            if(player.getEnemies().contains(target)) return 0;
            return get.attitude(player,target);
        });
        'step 2'
        if(result.bool){
            player.loseMaxHp();
            var target=result.targets[0];
            player.line(target,'fire');
            target.addSkillLog('terz_fz');
            game.delayx();
        }
    },
}
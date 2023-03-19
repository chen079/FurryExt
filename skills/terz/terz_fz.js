skill={
    audio:2,
    enable:"phaseUse",
    usable:1,
    filter:function(event,player){
        return game.hasPlayer(function(current){
            return current.hasSkill('terz_ly')
        })
    },
    filterTarget:function(card,player,target){
        return target.hasSkill('terz_ly')
    },
    content:function(){
        'step 0'
        var skill='terz_ly'
        target.changeZhuanhuanji(skill);
        target.popup(skill,'wood');
        game.log(target,'的','#g【'+get.translation(skill)+'】','发生了状态变更');
        game.delayx();
        target.markSkill('terz_ly_mark')
        'step 1'
        target.updateMark('terz_ly_mark')
    },
    ai:{
        order:8,
        result:{
            target:function(player,target){
                return target.storage.terz_ly?-1:1;
            },
        },
    },
    group:"terz_fz_damage",
    subSkill:{
        damage:{
            audio:"terz_fz",
            trigger:{
                player:["damageEnd"],
                source:"damageEnd",
            },
            direct:true,
            filter:function(event,player){
                return game.hasPlayer(function(current){
                    return current.hasSkill('terz_ly')
                })
            },
            content:function(){
             'step 0'
             player.chooseTarget(lib.skill.terz_fz.filterTarget,get.prompt('terz_fz'),'变更一名角色的〖流域〗的状态').set('ai',function(target){
                 var player=_status.event.player;
                 return get.effect(target,'terz_fz',player,player);
             });
             'step 1'
             if(result.bool){
              var target=result.targets[0];
              player.logSkill('terz_fz',target);
              var next=game.createEvent('terz_fz');
              next.player=player;
              next.target=target;
              next.setContent(lib.skill.terz_fz.content);
             }
            },
            sub:true,
        },
    },
}
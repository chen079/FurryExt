skill={
    audio:"ext:无名扩展:2",
    enable:"phaseUse",
    usable:1,
    filterCard:true,
    filter:function(event,player){
        if(!player.storage.hars_sj) return true;
        return game.hasPlayer(function(current){
            return !player.storage.hars_sj.contains(current);
        });
    },
    init:function(player){
        if(!player.storage.hars_sj) player.storage.hars_sj=[];
    },
    filterTarget:function(card,player,target){
        return (!player.storage.hars_sj||!player.storage.hars_sj.contains(target));
    },
    content:function(){
        target.addTempSkill("hars_fs",{player:"phaseEnd"});
        if(!player.storage.hars_sj) player.storage.hars_sj=[];
        player.storage.hars_sj[0]=target;
        player.markSkill('hars_sj');
    },
    intro:{
        content:"上回合已对$发动过〖神降〗",
    },
    ai:{
        order:1,
        result:{
            target:function(player,target){
                return -1;
            },
        },
    },
    group:"hars_sj_fs",
    subSkill:{
        fs:{
            forced:true,
            trigger:{
                global:"phaseBeginStart",
            },
            filter:function(event,player){
                return player!=event.player&&!event.player._trueMe&&event.player.hasSkill("hars_fs");
            },
            logTarget:"player",
            skillAnimation:true,
            animationColor:"key",
            content:function(){
                trigger.player._trueMe=player;
                game.addGlobalSkill('autoswap');
                if(trigger.player==game.me){
                    game.notMe=true;
                    if(!_status.auto) ui.click.auto();
                }
            },
        }
    },
}
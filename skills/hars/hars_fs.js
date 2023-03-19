skill={
    trigger:{
        player:["phaseAfter","dieAfter"],
    },
    mark:true,
    intro:{
        content:"已被选为〖神降〗的对象",
    },
    lastDo:true,
    charlotte:true,
    forceDie:true,
    forced:true,
    silent:true,
    content:function(){
        player.removeSkill('hars_fs');
    },
    onremove:function(player){
        if(player==game.me){
            if(!game.notMe) game.swapPlayerAuto(player._trueMe)
            else delete game.notMe;
            if(_status.auto) ui.click.auto();
        }
        delete player._trueMe;
    },
    popup:false,
}
skill={
    trigger:{
        global:["dieBegin"],
    },
    priority:-1,
    filter:function(event,player){
        return event.player.hp<=0&&!event.player.hasSkill('hars_yb')&&player.isAlive()&&event.player!=player;
    },
    logTarget:"player",
    content:function(){
        'step 0'
        trigger.cancel();
        'step 1'
        if(trigger.player.isDead()){
            trigger.player.revive();
            trigger.player.hp=0;
            trigger.player.update();
            game.log(trigger.player,'当前的体力值为['+trigger.player.hp+']。');
        }
        'step 2'
        if(!trigger.player.hasSkill('hars_yb')){
            trigger.player.addSkill('hars_yb');
        }
    },
    ai:{
        respondTao:false,
        save:false,
        expose:0.2,
        threaten:8,
        result:{
            player:10,
            target:1,
        },
    },
    derivation:"hars_yb",
    group:"hars_sz_1",
    subSkill:{
        "1":{
            direct:true,
            trigger:{
                global:"phaseBeginStart",
            },
            filter:function(event,player){
                return player!=event.player&&!event.player._trueMe&&event.player.hasSkill('hars_yb');
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
                trigger.player.addSkill('hars_sz_2');
            },
        },
        "2":{
            trigger:{
                player:["phaseAfter","dieAfter"],
                global:"phaseBefore",
            },
            lastDo:true,
            charlotte:true,
            forceDie:true,
            forced:true,
            silent:true,
            content:function(){
                player.removeSkill('hars_sz_2');
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
    }
}
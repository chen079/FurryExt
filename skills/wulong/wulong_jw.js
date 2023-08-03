skill = {
    trigger: {
        player: "damageBegin4"
    },
    mode: ["identity"],
    available: function (mode) {
        if (mode == 'identity' && _status.mode == 'purple') return false;
    },
    forced:true,
    filter:function(event,player){
        return game.hasPlayer(function(current){
            return current.identity=='fan'&&current!=player
        })&&game.hasPlayer(function(current){
            return current.identity=='zhong'&&current!=player
        })&&event.num>=player.hp;
    },
    content:function(){
        trigger.cancel();
    },
    ai:{
        nofire:true,
        nothunder:true,
        nodamage:true,
        effect:{
            target:function(card,player,target,current){
                if(get.tag(card,'damage')||(game.hasPlayer(function(current){
                    return current.identity=='fan'&&current!=player
                })&&game.hasPlayer(function(current){
                    return current.identity=='zhong'&&current!=player
                }))){
                    if(target.hp<=1) return [0,0];
                    return 0.5;
                }
            },
        },
    },
}
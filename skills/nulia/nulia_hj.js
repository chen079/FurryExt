skill={
    trigger:{
        player:"phaseDrawBegin2",
    },
    frequent:true,
    filter:function(event,player){
        return !event.numFixed;
    },
    content:function(){
        var num = 2
        if(get.mode()=='identity'){
            if(player.identity=='zhu'){
                num=game.countPlayer(function(current){
                    return current.identity=='zhong'||current.identity=='mingzhong';
                });
            }else{
                num=game.countPlayer(function(current){
                    return current.identity==player.identity;
                });
            }
        }
        trigger.num+=num
    },
    ai:{
        threaten:1.3,
    },
    group:"nulia_hj_2",
    subSkill:{
        "2":{
            mod:{
                maxHandcardBase:function(player,num){
                    return player.maxHp;
                },
            },
            sub:true,
        },
    }
}
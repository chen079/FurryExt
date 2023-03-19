skill={
    forced:true,
    filter:function(event,player){
        return (player.isLinked()?'':'n')
    },
    trigger:{
        source:"damageBefore",
    },
    content:function(){
        trigger.player.link(true)
    },
    ai:{
        effect:{
            target:function(card){
                if(card.name=='tiesuo') return 'zeroplayertarget';
            },
        },
    },
    subSkill:{
        "1":{
            audio:2,
            trigger:{
                player:"linkBegin",
            },
            forced:true,
            filter:function(event,player){
                return !player.isLinked();
            },
            content:function(){
                trigger.cancel();
            },
            sub:true,
        },
    }
}
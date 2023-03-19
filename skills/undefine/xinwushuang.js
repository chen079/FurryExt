skill={
    trigger:{
        player:"useCardToPlayered",
    },
    forced:true,
    filter:function(event,player){
        return event.card.name=='sha'&&!event.getParent().directHit.contains(event.target);
    },
    logTarget:"target",
    content:function(){
        var id=trigger.target.playerid;
        var map=trigger.getParent().customArgs;
        if(!map[id]) map[id]={};
        if(typeof map[id].shanRequired=='number'){
            map[id].shanRequired+=trigger.target.getDamagedHp();
        }
        else{
            map[id].shanRequired=1+trigger.target.getDamagedHp();
        }
    },
    ai:{
        "directHit_ai":true,
        skillTagFilter:function(player,tag,arg){
            if(arg.card.name!='sha'||arg.target.countCards('h','shan')>arg.target.getDamagedHp()) return false;
        },
    },
}
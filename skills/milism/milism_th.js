skill={
    audio:"ext:无名扩展:2",
    trigger:{
        player:"phaseBefore"
    },
    mark:true,
    filter:function(event,player){
        if(!player.storage.milism_th_recode) return true;
        return game.hasPlayer(function(current){
            return !player.storage.milism_th_recode.contains(current);
        });
    },
    init:function(player){
        if(!player.storage.milism_th_recode) player.storage.milism_th_recode=[];
    },
    forced:true,
    content:function(){
        "step 0"
        player.chooseTarget(1,true).set("filterTarget",function(card,player,target){
            return target!=player}).set('ai',function(target){
                var att=get.attitude(_status.event.player,target);
                if(att>0) return att+1;
                if(att==0) return Math.random();
                return att}).set("prompt","请选择【同游】的目标")
        "step 1"
        if(!player.storage.milism_th_recode) player.storage.milism_th_recode=[];
        player.storage.milism_th_recode[0]=result.targets[0];
    },
    intro:{
        content:function (storage, player, skill) {
            var str = '当前【同游】目标：';
            str += "<span style='color: red'>" + get.translation(player.storage.milism_th_recode) + "</span>";
            return str;
        },
    },
    group:["milism_th_1","milism_th_2"],
    subSkill:{
        "1":{
            trigger:{
                global:"damageBefore",
            },
            locked:true,
            filter:function(event,player){
                return event.player== player.storage.milism_th_recode[0]
            },
            check:function(event,player){
                var target=event.player;
                if(player.hp==1) return false
                if(target.hp==target.maxHp) return false
                if(get.attitude(player,target)<0) return false;
                return true
            },
            logTarget:"player",
            content:function(){
                trigger.num=0;
                player.damage(trigger.source,trigger.nature)
            },
            sub:true,
        },
        recode:{
        },
        "2":{
            trigger:{
                global:"recoverBegin"
            },
            filter:function(event,player){
                return event.player== player.storage.milism_th_recode[0]
            },
            forced:true,
            content:function(){
                player.recover()
            }
        }
    },
}
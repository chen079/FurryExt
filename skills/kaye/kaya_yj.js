skill={
    audio:"ext:无名扩展:2",
    enable:"phaseUse",
    usable:1,
    filter:function(event,player){
        if(!player.storage.kaye_yj) return true;
        return game.hasPlayer(function(current){
            return !player.storage.kaye_yj.contains(current);
        });
    },
    filterTarget:function(card,player,target){
        return (!player.storage.kaye_yj||!player.storage.kaye_yj.contains(target)&&target!=player);
    },
    init:function(player){
        if(!player.storage.kaye_yj) player.storage.kaye_yj=[];
    },
    content:function(){
        target.addTempSkill("kaye_yj_one",{player:"phaseEnd"});
        if(!player.storage.kaye_yj) player.storage.kaye_yj=[];
        player.storage.kaye_yj.push(target);
        player.storage.kaye_yj.sortBySeat()
        player.markSkill('kaye_yj');
    },
    ai:{
        order:7,
        threaten:1.6,
        expose:0.2,
        result:{
            target:function(player,target){
                return -1;
            },
        },
    },
    intro:{
        content:"已对$发动过〖压制〗",
    },
    subSkill:{
        one:{
            forced:true,
            trigger:{
                source:"damageBefore",
            },
            intro:{
                content:"你无法造成伤害",
            },
            mark:true,
            content:function(){
                trigger.num=0
            },
            sub:true,
        },
    },
}
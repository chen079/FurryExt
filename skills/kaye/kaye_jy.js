skill={
    audio:"ext:无名扩展:2",
    enable:"phaseUse",
    usable:1,
    filterCard:true,
    position:"h",
    filter:function(event,player){
        if(!player.storage.kaye_jy) return true;
        return game.hasPlayer(function(current){
            return !player.storage.kaye_jy.contains(current);
        });
    },
    init:function(player){
        if(!player.storage.kaye_jy) player.storage.kaye_jy=[];
    },
    filterTarget:function(card,player,target){
        return (!player.storage.kaye_jy||!player.storage.kaye_jy.contains(target));
    },
    content:function(){
        if(target==player){
            target.addTempSkill("kaye_shouhu",{player:"phaseBegin"});
        }
        else{
            target.addTempSkill("kaye_shouhu",{player:"phaseEnd"});
        }
        if(!player.storage.kaye_jy) player.storage.kaye_jy=[];
        player.storage.kaye_jy[0]=target;
        player.markSkill('kaye_jy');
    },
    ai:{
        order:7,
        threaten:1.6,
        expose:0.2,
        result:{
            target:function(player,target){
                return 1;
            },
        },
    },
    intro:{
        content:"上回合已对$发动过〖急援〗",
    },
    derivation:"kaye_shouhu",
}
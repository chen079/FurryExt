skill={
    trigger:{
        player:"useCard1",
    },
    init:function(player){
        if(!player.storage.morly_ld_num) player.storage.morly_ld_num=0;
    },
    direct:true,
    filter:function(event,player){
        if(event.card.name=='sha'&&!event.card.nature) return true;
    },
    mark:true,
    intro:{
        content:function(storage,player,skill){
            if(player.storage.morly_ld_num==0) return '你使用的下一张普通【杀】改为火属性'
            else if(player.storage.morly_ld_num==1) return '你使用的下一张普通【杀】改为雷属性'
            else if(player.storage.morly_ld_num==2) return '你使用的下一张普通【杀】改为冰属性'
            else if(player.storage.morly_ld_num==3) return '你使用的下一张普通【杀】改为神属性'
        },
    },
    content:function(){
        var shanature =['fire','thunder','ice','kami']
        if(!player.storage.morly_ld_num){player.storage.morly_ld_num = 0}
        var num = player.storage.morly_ld_num
        trigger.card.nature=shanature[num]
        player.storage.morly_ld_num++
        if(player.storage.morly_ld_num==4){
            player.storage.morly_ld_num=0
        }
    },
    ai:{
        threaten:3,
    },
    subSkill:{
        num:{
            sub:true,
        },
    },
}
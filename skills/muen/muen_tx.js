skill={
    trigger:{
        player:"phaseDrawBegin2",
    },
    direct:true,
    preHidden:true,
    filter:function(event,player){
        return event.num>0&&!event.numFixed&&game.hasPlayer(function(target){
            return target.countCards('h')>0&&player!=target;
        });
    },
    content:function (){
        "step 0"
        var num=get.copy(trigger.num);
        if(get.mode()=='guozhan'&&num>2) num=2;
        player.chooseTarget(get.prompt('muen_tx'),'选择至多'+get.translation(num)+'名角色，对手牌数少于你的角色视为使用一张【杀】，然后获得这些角色的各一张手牌，并少摸等量的牌',[1,num],function(card,player,target){
            return target.countCards('h')>0&&player!=target;
        },function(target){
            var att=get.attitude(_status.event.player,target);
            if(target.hasSkill('tuntian')) return att/10;
            return 1-att;
        }).setHiddenSkill('muen_tx');
        "step 1"
        var list=[]
        for(var i =0;i<result.targets.length;i++){
            if(player.countCards('h')<=result.targets[i].countCards('h')){
            list.add(result.targets[i])
            }
        }
        if(list){
            list.sortBySeat()
            for(var i =0;i<list.length;i++){
                player.useCard({name:'sha'},list[i],false)
            }
        }
        result.targets.sortBySeat();
        player.logSkill('muen_tx',result.targets);;
        player.gainMultiple(result.targets)
        trigger.num-=result.targets.length;
        "step 2"
        if(trigger.num<=0) game.delay();
    },
    ai:{
        threaten:1.6,
        expose:0.2,
    },
}
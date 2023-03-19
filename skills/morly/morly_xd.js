skill={
    audio:"ext:福瑞拓展:2",
    trigger:{
        source:"damageBegin2",
    },
    check:function(event,player){
        return get.attitude(player,event.player)<=0;
    },
    logTarget:"player",
    filter:function(event,player){
        return player!=event.player&&lib.linked.contains(event.nature);
    },
    content:function(){
        "step 0"
        if(trigger.player.countCards('h')==0){
            trigger.num+=1
            event.finish()
            return;
        }
        player.chooseControl("选项一","选项二").set("prompt","请选择发动的选项：").set('choiceList', ['观看并获得该角色的X张牌','令此次属性伤害值+1']).set("ai", function(){
        if(trigger.player.countCards('h')==1) return 0
        if(trigger.player.countCards('h')==trigger.num&&trigger.player.hp>trigger.num+1&&trigger.num==1) return 0
        if(trigger.player.hp<trigger.num+1) return 1
        return 1
        })
        "step 1"
        var target=trigger.player;
        var num = trigger.num;
        if(result.index==0){
            player.gainPlayerCard(num,'h',target,true,'visible')}
        else{
            trigger.num+=1
        }
    },
}
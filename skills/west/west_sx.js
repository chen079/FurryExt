skill={
    trigger:{
        global:"dying",
    },
    filter:function (event, player) {
        return event.player.hp < 1;
    },
    limited:true,
    skillAnimation:true,
    animationColor:"gray",
    logTarget:"player",
    check:function (event, player) {
        if (get.attitude(player, event.player) < 4) return false;
        return true;
    },
    content:function () {
        "step 0"
        player.awakenSkill('lyztiantong');
        trigger.player.gainMaxHp();
        "step 1"
        //var num=Math.min(5,trigger.player.maxHp);
        trigger.player.recover(trigger.player.maxHp - trigger.player.hp);
        //if(trigger.player.countCards("h")<=num) trigger.player.draw(num-trigger.player.countCards("h"));
        //else trigger.player.chooseToDiscard("h",true,trigger.player.countCards("h")-num);
        "step 2"
        trigger.player.link(false);
        trigger.player.turnOver(false);
        "step 3"
        trigger.player.disableJudge();
        "step 4"
        var num = trigger.player.countDisabled();
        if (num) {
            for (var i = 1; i < 6; i++) {
                if (trigger.player.isDisabled(i)) trigger.player.enableEquip(i);
            }
        }
    },
    mark:true,
    intro:{
        content:"limited",
    },
    init:function(player,skill){
        player.storage[skill]=false;
    },
}
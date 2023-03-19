skill={
    trigger:{
        global:"roundStart",
    },
    init:function(player){
    },
    mark:true,
    intro:{
        content:"每轮开始时你将手牌调整至体力上限然后隐匿。"
    },
    forced:true,
    content:function(){
        "step 0"
        var num=player.maxHp-player.countCards('h')   
        if(num>0){
            player.draw(num)
        }else if(num<0){
            player.chooseToDiscard(-num,'h',true)
        }
        "step 1"
        player.unmarkSkill('jet_fy_mark')
        lib.skill.ybni.hideCharacter(player.name1, player);
        if (player.name2) lib.skill.ybni.hideCharacter(player.name2, player);
        player.addTempSkill("ybni",{player:"showCharacterAfter"});
    },
}
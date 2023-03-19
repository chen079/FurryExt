skill={
    trigger:{
        global:"roundStart",
    },
    init:function(player){
        player.storage.jet_fy=false
    },
    forced:true,
    filter:function(event,player){
        return player.storage.jet_fy
    },
    content:function(){
        "step 0"
        var num=player.maxHp-player.countCards('h')   
        if(num>0){
            player.draw(num)
        }else if(num<0){
            player.chooseToDiscard(-num,'h',true)
        }
        player.storage.jet_fy=false
        "step 1"
        player.unmarkSkill('jet_fy_mark')
        lib.skill.ybni.hideCharacter(player.name1, player);
        if (player.name2) lib.skill.ybni.hideCharacter(player.name2, player);
        player.addTempSkill("ybni");
    },
    group:"jet_fy_die",
    subSkill:{
        mark:{
            mark:true,
            intro:{
                content:"下一轮轮结束时你将手牌调整至体力上限然后隐匿。"
            },
        },
        die:{
            charlotte:true,
            forced:true,
            trigger:{
                global:"dieBegin"
            },
            filter:function(player){
                return !player.storage.jet_fy
            },
            content:function(){
                player.storage.jet_fy=true
                player.markSkill('jet_fy_mark')
            }
        }
    }
}
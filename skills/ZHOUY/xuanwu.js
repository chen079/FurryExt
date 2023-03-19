skill={
    trigger:{
        player:"phaseBegin"
    },
    content:function(){
        var list=game.xwChengjiu.achievementList()
        for(var i=0; i<list.length;i++){
            game.xwChengjiu.gainAchievement(list[i])
        }
    }
}
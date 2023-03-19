skill={
    trigger:{
        player:""
    },
    init:function(player,storage,skill){
        if(!player.storage[skill]) player.storage[skill]=[]
    },
    filter:function(){

    },
    content:function(){
        //获取标记的方式
        if(!player.storage.技能名.contains('标记名')){
            player.storage.技能名.push('')
        }
        //检测标记获取不同效果
        var list=[]
        if(player.storage.技能名.contains('标记名')){
            list.push('效果')
        }
    }
}
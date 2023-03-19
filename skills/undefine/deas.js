skill={
    trigger:{
        player:'dying'
    },
    direct:true,
    content:function(){
        'step 0'
        player.chooseTarget(1,false)
        'step 1'
        if(result.bool){
            result.targets[0].damage(player)
        }
    }
}
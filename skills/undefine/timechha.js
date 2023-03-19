skill={
    usable:1,
    direct:true,
    enable:"phaseUse",
    content:function(){
        "step 0"
        player.chooseControl("计时开始")
        "step 1"
        player.storage.skilltime1=new Date()
        "step 2"
        player.chooseControl("计时结束")
        "step 3"
        player.storage.skilltime2=new Date()
        "step 4"
        var time = parseInt(player.storage.skilltime2-player.storage.skilltime1)/1000
        if(time<=11&&time>=10){
            player.draw(5)
        }else{
            event.finish()
        }
    }
}
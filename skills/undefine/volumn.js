skill={
    enable:"phaseUse",
    usable:1,
    content:function(){
        var nowdate = new Date()
        min = nowdate.getMinutes()
        player.popup("<span style='color: OrangeRed'>当前分钟数：" + min + "</span>")
        num=Math.floor(min/10)
        player.draw(num)
    }
}
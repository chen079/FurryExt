skill={
    enable:"phaseUse",
    content:function(){
        var nowdate = new Date()
        h = nowdate.getHours()
        var beforeDawn=[0,1,2,3,4,5]
        var morning=[6,7,8,9,10]
        var noon=[11,12,13]
        var afternoon=[14,15,16]
        var dusk=[17,18]
        var night=[19,20,21,22,23,24]
        if(beforeDawn.indexOf(h)!=-1){
            player.addSkill('dz_beforeDawn')
        }else if(morning.indexOf(h)!=-1){
            player.addSkill('dz_morning')
        }else if(noon.indexOf(h)!=-1){
            player.addSkill('dz_noon')
        }else if(afternoon.indexOf(h)!=-1){
            player.addSkill('dz_afternoon')
        }else if(dusk.indexOf(h)!=-1){
            player.addSkill('dz_dusk')
        }else if(night.indexOf(h)!=-1){
            player.addSkill()
        }
    }
}
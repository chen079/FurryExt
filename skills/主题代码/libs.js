skill={
    content:function(){
        var list=[]
        for(var i in lib.characterPack.BEIJI){
            var character=lib.characterPack.BEIJI[i]
            if(character[1]!='shen'){
                list.push(...character[3])
            }
        }
    }
}
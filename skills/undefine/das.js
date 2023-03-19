skill={
    enable:"phaseUse",
    filterCard:function(card){
        return get.name(card)=='sha'||(get.type2(card)=='trick'&&get.color(card)=='black')
    },
    filterTarget:true,
    content:function(){
        target.damage()
    }
}
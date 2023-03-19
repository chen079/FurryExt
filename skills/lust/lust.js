skill={
    enable:"phaseUse",
    usable:1,
    filterCard:true,
    filterTarget:function (card,player,target){
        return target!=player;
    },
    content:function(){
        "step 0"
        if(target.countCards('h',"sha")==0){
            target.useCard({name:'sha',isCard:true},player)
            event.finish()
            return;
        }
        "step 1"
        player.chooseCardButton(target,target.getCards('h'),true).set('filterButton',function(button){
            return get.name(button.link)=='sha';
        });
        "step 2"
        target.useCard(result.links[0],player)
    },
}
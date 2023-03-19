skill={
    enable:"phaseUse",
    usable:"1",
    position:"h",
    filterCard:function(card){
        var color=get.color(card);
        for(var i=0;i<ui.selected.cards.length;i++){
            if(get.color(ui.selected.cards[i])!=color) return false;
        }
        return true;
    },
    selectCard:[1,5],
    complexCard:true,
    filterTarget:function(event,player){
        return target!=player
    },
    content:function(){
        if(get.color(cards[0])=='red'){
            target.addTempSkill("lint_nd_gain",{player:"phaseUseEnd"})
            target.storage.lint_nd_gain=cards.length
            target.draw()
        }
        else{
            target.addTempSkill("lint_nd_lose",{player:"phaseUseEnd"})
            target.storage.lint_nd_lose=cards.length
            target.draw()
        }
    },
    subSkill:{
        "gain":{
            trigger:{
                player:["loseAfter","gainAfter"],
            },
            direct:true,
            locked:true,
            filter:function(event,player){
                return player.countCards('h')<player.storage.lint_nd_gain;
            },
            content:function(){
                player.draw(player.storage.lint_nd_gain-player.countCards('h'));
            },
        },
        "lose":{
            trigger:{
                player:["loseEnd","gainEnd"],
            },
            direct:true,
            filter:function(event,player){
                return player.countCards('h')>(5-player.storage.lint_nd_lose);
            },
            content:function(){
                var num =player.countCards('h')-(5-player.storage.lint_nd_lose)
                player.chooseToDiscard(num,'he',true)
            }
        }
    }
}
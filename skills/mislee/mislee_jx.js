skill={
    position:"he",
    enable:"phaseUse",
    filter:function(event,player){
        var he=player.getCards('he');
        for(var i=0;i<he.length;i++){
            if(["bagua","baiyin","lanyinjia","renwang","tengjia","zhuge"].contains(he[i].name)) return true;
        }
        return false;
    },
    filterCard:function(card){
        return ["bagua","baiyin","lanyinjia","renwang","tengjia","zhuge"].contains(card.name);
    },
    discard:false,
    lose:false,
    delay:false,
    check:function(){
        return 1;
    },
    content:function(){
        "step 0"
        player.showCards(cards);
        "step 1"
        var card=cards[0];
        var bool=(get.position(card)=='e');
        if(bool) player.removeEquipTrigger(card);
        game.addVideo('skill',player,['mislee_jx',[bool,get.cardInfo(card)]])
        game.broadcastAll(function(card){
            card.init([card.suit,card.number,'rewrite_'+card.name]);
        },card);
        if(bool){
            var info=get.info(card);
            if(info.skills){
                for(var i=0;i<info.skills.length;i++){
                    player.addSkillTrigger(info.skills[i]);
                }
            }
        }
    },
    ai:{
        basic:{
            order:10,
        },
        result:{
            player:1,
        },
    },
}
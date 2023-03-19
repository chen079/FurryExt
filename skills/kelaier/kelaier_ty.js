skill={
    enable:"phaseUse",
    usable:1,
    filterTarget:function(player,target){
        return player!=target
    },
    filterCard:true,
    position:"he",
    filter:function(event,player){
      return player.countCards('he')>0
    },
    content:function(){
        "step 0"
        player.judge()
        "step 1"
        lib.storage.tysuit=get.suit(result.card);
        target.storage.tysuit=get.suit(result.card)
        switch(get.color(result.card)){
            case'red':lib.storage.tyname='sha';
            target.storage.tyname='sha';break;
            case 'black':lib.storage.tyname='shan';
            target.storage.tyname='shan';break;
        }
        target.addTempSkill("kelaier_ty_1",{player:"phaseAfter"})
    },
    ai:{
        order:10,
        result:{
            player:function (player) {
                if (player.countCards('sha') > 2) return 10;
                return 0;
            },
            target:function (player, target) {
                if (target.countCards('h') > target.hp) return target.hp - target.countCards('h');
                return 0;
            },
        },
        threaten:0.5,
        effect:{
            target:function (card) {
                if (card.name == 'guiyoujie') return [0, 2];
            },
        },
    },
    subSkill:{
        "1":{
            mod:{
                cardname:function (card, player, storag) {
                    return lib.storage.tyname;
                },
                suit:function (card, suit) {
                    return lib.storage.tysuit;
                },
            },
            intro:{
                content:function(storage,player,skill){
                    return "你的手牌均视为【"+get.translation(player.storage.tysuit)+get.translation(player.storage.tyname)+"】"
                },
            },
            mark:true,
            sub:true,
        },
    },
}
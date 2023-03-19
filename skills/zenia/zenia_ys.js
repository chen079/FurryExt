skill={
    enable:"phaseUse",
    usable:1,
    filter:function(event,player){
        return player.countCards('h')>=1;
    },
    filterTarget:function(card,player,target){
        return target!=player;
    },
    filterCard:true,
    selectCard:-1,
    discard:false,
    prepare:"give",
    content:function(){
        target.gain(cards);
        if(!player.hujia){
            player.changeHujia();
        }else{
            player.draw(2)
        }
        target.recover()
    },
    ai:{
        threaten:1.5,
        order:2.1,
        result:{
            target:function(player,target){
                if(target.hasSkillTag('nogain')) return 0;
                if(get.attitude(player,target)<3) return 0;
                if(target.hasJudge('lebu')) return 0;
                if(target.hp==target.maxHp) return 0.1
                return 1;
            },
        },
    },
}
skill={
    enable:"chooseToUse",
    filter:function(event,player){
        if(event.type!='dying') return false;
        if(player!=event.dying) return false;
        if(player.maxHp<=1) return false;
        if(player.countCards('h')==0) return false;
        return true;
    },
    filterTarget:function(card,player,target){
        return target!=player&&target.countCards('h')>0&&target.hp>0&&target.hp<=player.maxHp;
    },
    content:function(){
        'step 0'
        player.chooseToCompare(target);
        'step 1'
        if(!result.bool){
            player.die();
            event.finish();
        }
        else{
            event.num=target.hp-player.hp;
            player.loseMaxHp();
        }
        'step 2'
        player.changeHp(event.num);
        if(get.is.altered('lions_hr')){
            event.finish();
        }
        'step 3'
        event.target.changeHp(-event.num);
        'step 4'
        if(event.target.hp<=0){
            event.target.dying({source:player});
        }
    },
    ai:{
        order:1,
        skillTagFilter:function(player){
            if(player.maxHp<=1) return false;
            if(player.hp>0) return false;
            if(player.countCards('h')==0) return false;
        },
        save:true,
        result:{
            target:-1,
            player:1,
        },
        threaten:2,
    },
}
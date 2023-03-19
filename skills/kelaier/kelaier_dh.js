skill={
    enable:"phaseUse",
    usable:1,
    filter:function(event,player){
        return player.countCards('h')>0
    },
    filterTarget:true,
    filterCard:true,
    content:function(){
        "step 0"
        player.judge()
        "step 1"
        switch(result.color){
            case "red":target.recover(1);target.addTempSkill("kelaier_dh_2",{player:"phaseUseBefore"});break;
            case "black":target.draw(2);target.addTempSkill("kelaier_dh_1",{player:"phaseUseBefore"});break;
        }
    },
    order:9,
        result:{
            target:function(player,target){
                return 2/Math.max(1,Math.sqrt(target.hp));
            },
        },
    subSkill:{
        "1":{
            forced:true,
            init:function(player){
                player.changeHujia(1);
            },
            onremove:function(player){
                player.changeHujia(-1);
            },
            intro:{
                content:"你区域内的♠都视为♣",
            },
            mark:true,
            mod:{
                suit:function(card,suit){
            if(suit=='spade') return 'club';
        },
            },
            sub:true,
        },
        "2":{
            forced:true,
            init:function(player){
                player.changeHujia(1);
            },
            onremove:function(player){
                player.changeHujia(-1);
            },
            intro:{
                content:"你区域内的♦都视为♥",
            },
            mark:true,
            mod:{
                suit:function(card,suit){
            if(suit=='diamond') return 'heart';
        },
            },
            sub:true,
        },
    },
}
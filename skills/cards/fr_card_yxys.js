card={
    audio:true,
    fullskin:true,
    type:"trick",
    enable:true,
    fullimage:true,
    filterTarget:function(player,target,card){
        return !target.hasSkill('card_sx')
    },
    selectTarget:1,
    content:function(){
        target.addTempSkill('card_sx',{player:"phaseAfter"})
        target.addSkill('card_sx_add')
    },
    ai:{
        basic:{
            order:7.2,
            useful:4.5,
            value:9.2,
        },
        result:{
            target:function(player,target,storage){
                if(target.countCards('j',{name:'lebu'})||target.countCards('j',{name:'bingliang'})){
                    return 0
                }else if(target.countCards('hs')==0){
                    return 0
                }
                return 2-1/(1+target.countCards('hs'))
            },
        },
    },
}
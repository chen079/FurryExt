card={
    fullskin:true,
    type:"equip",
    subtype:"equip1",
    distance:{
        attackFrom:-2,
    },
    ai:{
        basic:{
            equipValue:3,
            order:function(card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
            useful:3,
            value:function(card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
        },
        result:{
            target:function(player,target,card){
                return get.equipResult(player,target,card.name);
            },
        },
    },
    skills:["sy_skill"],
    enable:true,
    selectTarget:-1,
    filterTarget:function(card,player,target){
        return target==player;
    },
    modTarget:true,
    allowMultiple:false,
    content:function(){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
    toself:true,
}
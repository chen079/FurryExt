skill={
    enable:"phaseUse",
    filterTarget:function(card,player,target){
        return target!=player&&(!player.storage.jbgy_qx||!player.storage.jbgy_qx.contains(target))
    },
    mark:true,
    intro:{
        markcount:0,
        content:"本回合内已对$发动过技能"
    },
    init:function(player,storage){
        if(!player.storage.jbgy_qx) player.storage.jbgy_qx=[]
    },
    content:function(){
        "step 0"
        if(!player.storage.jbgy_qx||!player.storage.jbgy_qx.contains(target)){
            player.storage.jbgy_qx.push(target)
        }
        if(player.countCards('he',{subtype:'equip1'})>0){
            player.chooseCard('是否弃置一张武器牌',1,'he',false,function(card){
                return get.subtype(card)=='equip1'
            }).set('ai',function(card){
                return 7-get.value(card)
            })
        }else{
            target.damage(1,player,'fire')
            player.damage(1,'nosource','fire')
            event.finish()
        }
        'step 1'
        if(result.bool){
            player.discard(result.cards)
            target.damage(1,player,'fire')
            player.bolDamage(1,'nosource','fire')
        }else{
            target.damage(1,player,'fire')
            player.damage(1,'nosource','fire')
        }
    },
    ai:{
        order:8.5,
        result:{
            target:function (player,target){
                if(!ui.selected.cards.length){
                    if(player.hp<2) return 0;
                    if(target.hp>=player.hp) return 0;
                    if(player.countMarks('jbgy_ze')>=player.hp) return 0
                }
                return get.damageEffect(target,player);
            },
        },
        threaten:1.5,
    },
    group:'jbgy_qx_clean',
    subSkill:{
        clean:{
            trigger:{
                player:["phaseBefore","phaseAfter"]
            },
            forced:true,
            unique:true,
            content:function(){
                player.storage.jbgy_qx=[]
                player.updateMark('jbgy_qx')
            }
        }
    }
}
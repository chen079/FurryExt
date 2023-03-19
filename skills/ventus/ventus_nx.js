skill={
    mod:{
        cardEnabled:function(card,player){
            if(player.countMark('ventus_nx')>=player.hp) return false;
        },
        cardUsable:function(card,player){
            if(player.countMark('ventus_nx')>=player.hp) return false;
        },
        cardRespondable:function(card,player){
            if(player.countMark('ventus_nx')>=player.hp) return false;
        },
    },
    init:function(player,storage){
        if(!player.storage.ventus_nx) player.storage.ventus_nx=0
    },
    trigger:{
        player:"useCard1",
    },
    mark:true,
    intro:{
        content:"你已使用$张牌"
    },
    forced:true,
    popup:false,
    firstDo:true,
    content:function(){
        player.addMark('ventus_nx',1,false);
    },
    ai:{
        presha:true,
        pretao:true,
        nokeep:true,
    },
    group:["ventus_nx_clean","ventus_nx_damage"],
    subSkill:{
        damage:{
            trigger:{
                player:["damageBefore","damageBegin4"],
            },
            filter:function(event,player){
                if(player==_status.currentPhase) return false;
                if(event.getParent().name=='sha'||event.getParent().name=='juedou') return false;
                return true
            },
            forced:true,
            content:function(){
                trigger.untrigger();
                trigger.finish();
            },
        },
        clean:{
            trigger:{
                player:"phaseAfter"
            },
            forced:true,
            content:function(){
                var num=player.countMark('ventus_nx')
                player.removeMark('ventus_nx',num)
                player.updateMark('ventus_nx')
            }
        }
    }
}
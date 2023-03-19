skill={
    group:["mala_bc_begin","mala_bc_draw","mala_bc_use","mala_bc_discard","mala_bc_end"],
    trigger: {
        player: "turnOverBegin",
    },
    firstDo: true,
    content: function () {
        trigger.cancel()
        player.turnOver(false)
    },
    ai: {
        noCompareTarget: true,
    },
    subSkill:{
        begin:{
            trigger:{
                player:"phaseZhunbeiBegin",
            },
            forced:true,
            popup:false,
            content:function(){
                player.storage.mala_bc_draw=true;
                player.storage.mala_bc_use=true;
            },
            sub:true,
        },
        draw:{
            trigger:{
                player:"phaseDrawBegin",
            },
            forced:true,
            popup:false,
            content:function(){
                player.storage.mala_bc_draw=false;
            },
            sub:true,
        },
        use:{
            trigger:{
                player:"phaseUseBegin",
            },
            forced:true,
            popup:false,
            content:function(){
                player.storage.mala_bc_use=false;
            },
            sub:true,
        },
        discard:{
            trigger:{
                player:"phaseDiscardBefore",
            },
            forced:true,
            filter:function(event,player){
                if(player.storage.mala_bc_use) return true;
                return false;
            },
            content:function(){
                trigger.cancel();
            },
            sub:true,
        },
        end:{
            trigger:{
                player:"phaseJieshuBegin",
            },
            forced:true,
            filter:function(event,player){
                if(player.storage.mala_bc_draw) return true;
                return false;
            },
            content:function(){
                player.draw(3);
            },
            sub:true,
        },
    },
}
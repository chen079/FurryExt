skill={
    trigger:{
        player:"damageAfter",
    },
    forced:true,
    content:function(){
        var evt=_status.event.getParent('phaseUse');
        if(evt&&evt.name=='phaseUse'){
            evt.skipped=true;
        }
        var evt=_status.event.getParent('phase');
        if(evt&&evt.name=='phase'){
            evt.finish();
        }
    },
    ai:{
        jueqing:true,
    },
}
skill={
    audio:"ext:福瑞拓展:2",
    preHidden:true,
    trigger:{
        global:"damageEnd",
    },
    checkx:function(event,player){
        var att1=get.attitude(player,event.player);
        var att2=get.attitude(player,event.source);
        return att1>0&&att2<=0;
    },
    filter:function(event,player){
        return (event.source&&event.player.classList.contains('dead')==false&&player.countCards('he')&&event.source!=player);
    },
    direct:true,
    content:function(){
        "step 0"
        var next=player.chooseToDiscard('he',get.prompt2('kref_yz',trigger.player));
        var check=lib.skill.kref_yz.checkx(trigger,player);
        next.set('ai',function(card){
            if(_status.event.goon) return 8-get.value(card);
            return 0;
        });
        next.set('logSkill','kref_yz');
        next.set('goon',check);
        next.setHiddenSkill('kref_yz');
        "step 1"
        if(result.bool){
            trigger.player.judge();
        }
        else{
            event.finish();
        }
        "step 2"
        switch(result.color){
            case 'black':{
                trigger.player.gain(trigger.cards,'gain2');
                trigger.player.gainPlayerCard(trigger.num,true,trigger.source,'he');
                trigger.player.draw(trigger.num);
            break;
            }
            case 'red':{
                trigger.player.recover();
                trigger.player.link(false);
                trigger.player.turnOver(false);
                trigger.source.turnOver();
            break;}
        }
    },
    ai:{
        maixie:true,
        "maixie_hp":true,
        effect:{
            target:function(card,player,target){
                if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
                if(get.tag(card,'damage')) return [1,0.55];
            },
        },
    },
}
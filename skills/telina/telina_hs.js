skill={
    trigger:{global:'shaBegin'},
    direct:true,
    priority:11,
    filter:function(event,player){
        if(player.hasSkill('telina_hs_4')) return false;
        if(event.target.isUnderControl()) return false;
        return event.player!=player&&event.target!=player&&event.target.countCards('h')>0;
    },
    group:['telina_hs_2','telina_hs_3'],
    content:function(){
        "step 0"
        if(event.isMine()){
            event.dialog=ui.create.dialog('慧眼：预言'+get.translation(trigger.player)+'对'+get.translation(trigger.target)+'的杀能否命中');
        }
        player.chooseControl('能命中','不能命中','cancel').ai=function(event){
            if(trigger.player.hasSkill('wushuang')) return 0;
            if(trigger.player.hasSkill('liegong')) return 0;
            if(trigger.player.hasSkill('tieji')) return 0;
            if(trigger.player.hasSkill('juji')) return 0;
            if(trigger.player.hasSkill('retieji')) return 0;
            if(trigger.player.hasSkill('roulin')&&trigger.target.sex=='female') return 0;
            if(trigger.player.hasSkill('nvquan')&&trigger.target.sex=='male') return 0;
            if(trigger.target.hasSkill('yijue2')) return 0;
            if(trigger.target.hasSkill('shejie2')) return 0;
            if(trigger.target.hasSkill('shanguang2')) return 0;

            var equip=trigger.target.getEquip(2);
            if(equip&&equip.name=='bagua') return 1;
            return trigger.target.countCards('h')<2?0:1;
        };
        "step 1"
        if(event.dialog){
            event.dialog.close();
        }
        if(result.control!='cancel'){
            player.addTempSkill('telina_hs_4');
            player.logSkill(['telina_hs',result.control],trigger.target);
            game.log(player,'预言'+result.control);
            player.storage.telina_hs=result.control;
            game.delay();
        }
    },
    subSkill:{
        "2":{
            trigger:{global:'shaEnd'},
            forced:true,
            popup:false,
            filter:function(event,player){
                return player.storage.telina_hs?true:false;
            },
            content:function(){
                if(player.storage.telina_hs=='不能命中'){
                    player.popup('预言成功');
                    player.draw();
                    player.storage.telina_th+=1
                }
                else{
                    player.popup('预言失败');
                    player.chooseToDiscard('预言失败，请弃置一张牌','he',true);
                }
                delete player.storage.telina_hs;
            }
        },
        "3":{
            trigger:{global:'shaDamage'},
            forced:true,
            popup:false,
            filter:function(event,player){
                return player.storage.telina_hs?true:false;
            },
            content:function(){
                if(player.storage.telina_hs=='能命中'){
                    player.popup('预言成功');
                    player.draw();
                    player.storage.telina_th+=1
                }
                else{
                    player.popup('预言失败');
                    player.chooseToDiscard('预言失败，请弃置一张牌','he',true);
                }
                delete player.storage.telina_hs;
            }
        },
        "4":{}
    },
    ai:{
        threaten:1.3
    }
}
skill={
    trigger:{
        player:"phaseZhunbeiBegin",
    },
    mark:true,
    onremove:function(player,skill){
        var cards=player.getExpansions(skill);
        if(cards.length) player.loseToDiscardpile(cards);
    },
    intro:{
        content:"expansion",
        markcount:"expansion",
    },
    content:function(){
        "step 0"
        var color = ['black', 'red', 'cancel2']
        var aicolor = ['black', 'red']
        player.chooseControl(color).set('prompt', '请选择一种颜色')
        .set('ai',function(){
            return aicolor.randomGet()
        })
        "step 1"
        if(result.control!='cancel2'){
            player.judge('dmoa_sx',function(card){return (get.color(card)==result.control)?1.5:-0.5}).judge2=function(result){
                return result.bool;
            };
        }else{
            event.finish()
        }
        "step 2"
        if (result.judge>0) {
            player.addToExpansion('gain2',result.card,target).gaintag.add('dmoa_sx')
            event.goto(0)
        }else{
            if(player.getExpansions('dmoa_sx').length>0){
                player.chooseTarget('令一名角色获得你武将牌上所有的笙歌',1,true).set('ai',function(target){
                    var att=get.attitude(player,target);
                    if(att<=0) return 0;
                    if(target.hasSkillTag('nogain')&&target!=_status.currentPhase) return 0.1;
                    return att/(1+0.1*target.countCards('h'));
                })
            }else{
                event.finish()
            }
        }
        "step 3"
        result.targets[0].gain(player.getExpansions('dmoa_sx'),'gain2').gaintag.add('dmoa_sx')
        result.targets[0].addSkill('dmoa_sx_ig')
    },
    group:"dmoa_sx_draw",
    subSkill:{
        ig:{
            mod:{
                ignoredHandcard:function(card,player){
                    if(card.hasGaintag('dmoa_sx')){
                        return true;
                    }
                },
                cardDiscardable:function(card,player,name){
                    if(name=='phaseDiscard'&&card.hasGaintag('dmoa_sx')) return false;
                },
            },
        },
        draw:{
            trigger:{
                global:["loseAfter","equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter","addToExpansionAfter"],
            },
            forced:true,
            charlotte:true,
            popup:false,
            filter:function(event,player){
                if(event.name=='gain'&&event.player==event.source) return false;
                var evt=event.getl(event.player);
                if(!evt||!evt.hs||!evt.hs.length) return false;
                if(event.name=='lose'){
                    for(var i in event.gaintag_map){
                        if(event.gaintag_map[i].contains('dmoa_sx')) return true;
                    }
                    return false;
                }
                return event.player.hasHistory('lose',function(evt){
                    if(event!=evt.getParent()) return false;
                    for(var i in evt.gaintag_map){
                        if(evt.gaintag_map[i].contains('dmoa_sx')) return true;
                    }
                return false;
                });
            },                
            logTarget:"player",
            content:function(){
                if(trigger.getParent().name=='useCard'||trigger.getParent().name=='respond') player.draw()
            },
            sub:true,
        },
    },
}
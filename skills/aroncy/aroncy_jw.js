skill={
    audio:2,
    trigger:{
        global:"phaseDrawEnd"
    },
    filter:function(event,player){
        if(get.mode()=='guozhan'&&source.isFriendOf(player)) return false
        return event.player != player&&event.player.countCards('h')>player.countCards('h')
    },
    check:function(event,player){
        var target=event.player;
        if(get.attitude(player,target)>=0) return false;
        if(target.countCards('h')>2) return true
        return false
    },
    content:function(){
        "step 0"
        if(trigger.player.countCards('h',"sha")==0){
            trigger.player.useCard({name:'sha',isCard:true},player)
            event.finish()
            return;
        }
        "step 1"
        player.chooseCardButton(trigger.player,trigger.player.getCards('h')).set('filterButton',function(button){
            return get.name(button.link)=='sha';
        });
        "step 2"
        if(result.bool){
            player.gain(result.links[0]);
        }
        "step 3"
            player.chooseCardTarget({
                filterTarget:function(card,player,target){
                    if(target==player) return false;
                    var stat=player.getStat('skill').aroncy_jw_targets;
                    return !stat||!stat.contains(target);
                },
                filter:function(event,player){
                    return player.countCards('h')>0&&game.hasPlayer((current)=>lib.skill.aroncy_jw.filterTarget(null,player,current));
                },
                discard:false,
                lose:false,
                delay:false,
                filterCard:true,
            ai1:function(card){
                if(get.tag(card,'recover')&&!game.hasPlayer(function(current){
                    return get.attitude(current,player)>0&&!current.hasSkillTag('nogain');
                })) return 0;
                return 1/Math.max(0.1,get.value(card));
            },
            ai2:function(target){
                var player=_status.event.player,att=get.attitude(player,target);
                if(target.hasSkillTag('nogain')) att/=9;
                return 4+att;
            },
            prompt:'请选择要送人的卡牌'
        })
        "step 4"
        if(result.bool){
            var target=result.targets[0];
            player.line(target,'green');
            target.gain(result.cards,player,'giveAuto').gaintag.add('aroncy_jw');
            target.addSkill('aroncy_jw_use');
            player.addSkill('aroncy_jw_draw');
            var stat=player.getStat('skill');
            if(!stat.aroncy_jw_targets) stat.aroncy_jw_targets=[];
            stat.aroncy_jw_targets.push(target);
            event.finish()
        }
    },
    subSkill:{
        draw:{
            trigger:{
                global:"useCardAfter",
            },
            forced:true,
            charlotte:true,
            filter:function(event,player){
                return event.player.hasHistory('lose',function(evt){
                    if(evt.getParent()!=event) return false;
                    for(var i in evt.gaintag_map){
                        if(evt.gaintag_map[i].contains('aroncy_jw')) return true;
                    }
                    return false;
                });
            },
            logTarget:"player",
            content:function(){
                var num
                if(trigger.player.hasHistory('sourceDamage',function(evt){
                    return evt.card==trigger.card;
                })){
                    num=1
                }else{
                    num=0
                }
                player.draw(num);
                trigger.player.draw(num)
            },
            sub:true,
        },
        use:{
            mod:{
                aiOrder:function(player,card,num){
                    if(get.itemtype(card)=='card'&&card.hasGaintag('aroncy_jw')) return num+1;
                },
            },
        }
    },
}
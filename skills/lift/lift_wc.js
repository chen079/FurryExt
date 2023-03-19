skill={
    audio:2,
    enable:["chooseToUse","chooseToRespond"],
    filter:function(event,player){
        if(event.type=='wuxie') return false;
        var nh=player.countCards('h');
        if(!game.hasPlayer(function(current){
            return current!=player&&current.countCards('h')<nh;
        })){
            return false;
        }
        for(var i of lib.inpile){
            if(get.type(i)!='basic') continue;
            var card={name:i,isCard:true};
            if(event.filterCard(card,player,event)) return true;
            if(i=='sha'){
                for(var j of lib.inpile_nature){
                    card.nature=j;
                    if(event.filterCard(card,player,event)) return true;
                }
            }
        }
        return false;
    },
    chooseButton:{
        dialog:function(event,player){
            var list=[];for(var i of lib.inpile){
            if(get.type(i)!='basic') continue;
            var card={name:i,isCard:true};
            if(event.filterCard(card,player,event)) list.push(['基本','',i]);
            if(i=='sha'){
                for(var j of lib.inpile_nature){
                    card.nature=j;
                    if(event.filterCard(card,player,event)) list.push(['基本','',i,j]);
                }
            }
        }
            return ui.create.dialog('微词',[list,'vcard'],'hidden');
        },
        check:function(button){
            var player=_status.event.player;
            var card={name:button.link[2],nature:button.link[3]};
            if(card.name=='jiu') return 0;
            if(game.hasPlayer(function(current){
                return get.effect(current,card,player,player)>0;
            })){
                if(card.name=='sha'){
                    var eff=player.getUseValue(card);
                    if(eff>0) return 2.9+eff/10;
                    return 0;
                }
                else if(card.name=='tao'||card.name=='shan'){
                    return 4;
                }
            }
            return 0;
        },
        backup:function(links,player){
            return {
                filterCard:function(){return false},
                viewAs:{
                    name:links[0][2],
                    nature:links[0][3],
                    isCard:true,
                },
                prompt:get.prompt('lift_wc'),
                selectCard:-1,
                precontent:function(){
                    'step 0'
                    player.chooseTarget('选择一名角色拼点',function(card,player,target){
                        return target!=player&&player.canCompare(target)
                    },true).set('ai',function(target){
                        return get.attitude(player,target)<0;
                    });
                    'step 1'
                    player.chooseToCompare(result.targets[0])
                    'step 2'
                    if(result.bool){
                        player.logSkill('lift_wc',result.targets);
                        delete event.result.skill;
                    }
                    else event.finish();
                    'step 3'
                    game.delayx();
                },
            }
        },
        prompt:function(links,player){
            return '选择【'+get.translation(links[0][3]||'')+get.translation(links[0][2])+'】的目标';
        },
    },
    ai:{
        order:function(){
            var player=_status.event.player;
            var event=_status.event;
            var nh=player.countCards('h');
            if(game.hasPlayer(function(current){
                return get.attitude(player,current)>0&&current.countCards('h')<nh;
            })){
                if(event.type=='dying'){
                    if(event.filterCard({name:'tao'},player,event)){
                        return 0.5;
                    }
                }
                else{
                    if(event.filterCard({name:'tao'},player,event)||event.filterCard({name:'shan'},player,event)){
                        return 4;
                    }
                    if(event.filterCard({name:'sha'},player,event)){
                        return 2.9;
                    }
                }
            }
            return 0;
        },
        save:true,
        respondSha:true,
        respondShan:true,
        skillTagFilter:function(player,tag,arg){
            var nh=player.countCards('h');
            return game.hasPlayer(function(current){
                return current!=player&&current.countCards('h')<nh;
            });
        },
        result:{
            player:function(player){
                if(_status.event.type=='dying'){
                    return get.attitude(player,_status.event.dying);
                }
                else{
                    return 1;
                }
            },
        },
    },
}
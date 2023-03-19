skill={
    enable:"phaseUse",
    limited:true,
    frequent:false,
    unique:true,
    usable:1,
    filterTarget:function(card,player,target){
        return player.canCompare(target);
    },
    selectTarget:-1,
    mark:true,
    intro:{
        content:"limited",
    },
    mod:{
        cardnumber:function(card){
            if(card.color=='red') return 13;
        },
    },
    skillAnimation:false,
    init:function (player, skill) {
        player.storage[skill] = false;
    },
    filter:function(){
        return game.hasPlayer(function(current){
            return player.canCompare(current);
        })&&player.countCards('h')>0
    },
    content:function(){
        'step 0'
        player.awakenSkill("tiger_hy")
        event.targets=targets
        'step 1'
        for(var i=0;i<event.targets.length;i++){
            var target=event.targets[i]
            if(target.isDead()||target.countCards('h')==0||!player.canCompare(target)){
                event.targets.remove(target)
            }
        }
        'step 2'
        player.chooseToCompare(event.targets).setContent(lib.skill.tiger_hy.chooseToCompareMeanwhile);
        'step 3'
        if(result.winner){
            var targets=[player].addArray(event.targets).sortBySeat(player);
            targets.remove(result.winner);
            result.winner.useCard({name:'sha',nature:'fire',isCard:true},targets,'noai').set('addCount',false);
        }
        'step 4'
        if(event.targets.length>1){
            event.goto(1)
        }
    },
    subSkill:{
        gain:{
            trigger:{
                player:["chooseToCompareAfter","compareMultipleAfter"],
                target:["chooseToCompareAfter","compareMultipleAfter"],
            },
            frequent:true,
            filter:function (event, player) {
                if (event.preserve) return false;
                if (player == event.player) {
                    return !get.owner(event.card2);
                } else {
                    return !get.owner(event.card1);
                }
            },
            check:function (event, player) {
                if (player == event.player) {
                    return event.card2.name != 'du';
                } else {
                    return event.card1.name != 'du';
                }
            },
            content:function () {
                if (player == trigger.player) {
                    player.gain(trigger.card2, 'gain2', 'log');
                } else {
                    player.gain(trigger.card1, 'gain2', 'log');
                }
            },
        }
    },
    chooseToCompareMeanwhile:function(){
        'step 0'
        if(player.countCards('h')==0){
            event.result={cancelled:true,bool:false}
            event.finish();
            return;
        }
        for(var i=0; i<targets.length; i++){
            if(targets[i].countCards('h')==0){
                event.result={cancelled:true,bool:false}
                event.finish();
                return;
            }
        }
        if(!event.multitarget){
            targets.sort(lib.sort.seat);
        }
        game.log(player,'对',targets,'发起了共同拼点');
        event.compareMeanwhile=true;
        'step 1'
        event._result=[];
        event.list=targets.filter(function(current){
            return !event.fixedResult||!event.fixedResult[current.playerid];
        });
        if(event.list.length||!event.fixedResult||!event.fixedResult[player.playerid]){
            if(!event.fixedResult||!event.fixedResult[player.playerid]) event.list.unshift(player);
            player.chooseCardOL(event.list,'请选择拼点牌',true).set('type','compare').set('ai',event.ai).set('source',player).aiCard=function(target){
                var hs=target.getCards('h');
                var event=_status.event;
                event.player=target;
                hs.sort(function(a,b){
                    return event.ai(b)-event.ai(a);
                });
                delete event.player;
                return {bool:true,cards:[hs[0]]};
            };
        }
        'step 2'
        var cards=[];
        var lose_list=[];
        if(event.fixedResult&&event.fixedResult[player.playerid]){
            event.list.unshift(player);
            result.unshift({bool:true,cards:[event.fixedResult[player.playerid]]});
            lose_list.push([player,[event.fixedResult[player.playerid]]]);
        }
        else{
            if(result[0].skill&&lib.skill[result[0].skill]&&lib.skill[result[0].skill].onCompare){
                player.logSkill(result[0].skill);
                result[0].cards=lib.skill[result[0].skill].onCompare(player)
            }
            else lose_list.push([player,result[0].cards]);
        };
        for(var j=0; j<targets.length; j++){
            if(event.list.contains(targets[j])){
                var i=event.list.indexOf(targets[j]);
                if(result[i].skill&&lib.skill[result[i].skill]&&lib.skill[result[i].skill].onCompare){
                    event.list[i].logSkill(result[i].skill);
                    result[i].cards=lib.skill[result[i].skill].onCompare(event.list[i]);
                }
                else lose_list.push([targets[j],result[i].cards]);
                cards.push(result[i].cards[0]);
            }
            else if(event.fixedResult&&event.fixedResult[targets[j].playerid]){
                cards.push(event.fixedResult[targets[j].playerid]);
                lose_list.push([targets[j],[event.fixedResult[targets[j].playerid]]]);
            }
        }
        if(lose_list.length){
            game.loseAsync({
                lose_list:lose_list,
            }).setContent('chooseToCompareLose');
        }
        event.lose_list=lose_list;
        event.getNum=function(card){
            for(var i of event.lose_list){
                if(i[1].contains&&i[1].contains(card)) return get.number(card,i[0]);
            }
            return get.number(card,false);
        }
        event.cardlist=cards;
        event.cards=cards;
        event.card1=result[0].cards[0];
        event.num1=event.getNum(event.card1);
        event.iwhile=0;
        event.winner=null;
        event.maxNum=-1;
        event.tempplayer=event.player;
        event.result={
            winner:null,
            player:event.card1,
            targets:event.cardlist.slice(0),
            num1:[],
            num2:[],
        };
        player.$compareMultiple(event.card1,targets,cards);
        game.log(player,'的拼点牌为',event.card1);
        player.animate('target');
        // game.delay(0,1000);
        'step 3'
        event.target=null;
        event.trigger('compare');
        'step 4'
        if(event.iwhile<targets.length){
            event.target=targets[event.iwhile];
            event.target.animate('target');
            event.card2=event.cardlist[event.iwhile];
            event.num2=event.getNum(event.card2);
            game.log(event.target,'的拼点牌为',event.card2);
            event.tempplayer.line(event.target);
            delete event.player;
            event.trigger('compare');
        }
        else{
            game.delay(0,1000);
            event.goto(7);
        }
        'step 5'
        event.result.num1[event.iwhile]=event.num1;
        event.result.num2[event.iwhile]=event.num2;
        var list=[[event.tempplayer,event.num1],[event.target,event.num2]];
        for(var i of list){
            if(i[1]>event.maxNum){
                event.maxNum=i[1];
                event.winner=i[0];
            }
            else if(event.winner&&i[1]==event.maxNum&&i[0]!=event.winner){
                delete event.winner;
            }
        }
        'step 6'
        event.iwhile++;
        event.goto(4);
        'step 7'
        var player=event.tempplayer;
        event.player=player;
        delete event.tempplayer;
        var str='无人拼点成功';
        if(event.winner){
            event.result.winner=event.winner;
            str=get.translation(event.winner)+'拼点成功';
            game.log(event.winner,'拼点成功');
            event.winner.popup('胜');
        } else game.log('#b无人','拼点成功');
        var list=[player].addArray(targets);
        list.remove(event.winner);
        for(var i of list){
            i.popup('负');
        }
        if(str){
            game.broadcastAll(function(str){
                var dialog=ui.create.dialog(str);
                dialog.classList.add('center');
                setTimeout(function(){
                    dialog.close();
                },1000);
            },str);
        }
        game.delay(3);
        'step 8'
        game.broadcastAll(ui.clear);
        'step 9'
        event.cards.add(event.card1);
    },
    ai:{
        result:{
            target:function(card,player,target){
                var player=_status.event.player,targets=_status.event.getTrigger().targets;
                var num=0,card={name:'sha',nature:'fire',isCard:true};
                if(target.hasSkill('twlvren')) num+=2*(ui.selected.targets.length+1);
                if(target.hasSkill('twchuanshu_effect')) num+=3;
                var hs=player.getCards('h').sort((a,b)=>get.number(b)-get.number(a));
                var ts=target.getCards('h').sort((a,b)=>get.number(b)-get.number(a));
                if(get.number(hs[0])<=Math.min(13,get.number(ts[0])+num)){
                    return 6+get.effect(player,card,target,target);
                }
                return get.effect(target,{name:'guohe_copy2'},player,player)/2+get.effect(target,card,player,player);
            }
        }
    }
}
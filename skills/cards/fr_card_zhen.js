card={
    audio:true,
    fullskin:true,
    nature:["thunder","fire","kami","ice"],
    type:"basic",
    enable:true,
    usable:1,
    updateUsable:"phaseUse",
    range:function(card,player,target){
        return player.inRange(target);
    },
    selectTarget:1,
    cardPrompt: '出牌阶段，对你攻击范围内的一名角色使用。其须使用一张【闪】，否则其流失1点体力。',
    "yingbian_prompt":function(card){
        var str='';
        if(get.cardtag(card,'yingbian_hit')){
            str+='此牌不可被响应';
        }
        if(get.cardtag(card,'yingbian_damage')){
            if(str.length) str+='；';
            str+='此牌的伤害值基数+1';
        }
        if(!str.length||get.cardtag(card,'yingbian_add')){
            if(str.length) str+='；';
            str+='当你使用此牌选择目标后，你可为此牌增加一个目标';
        }
        return str;
    },
    yingbian:function(event){
        var card=event.card,bool=false;
        if(get.cardtag(card,'yingbian_hit')){
            bool=true;
            event.directHit.addArray(game.players);
            game.log(card,'不可被响应');
        }
        if(get.cardtag(card,'yingbian_damage')){
            bool=true;
            if(typeof event.baseDamage!='number') event.baseDamage=1;
            event.baseDamage++;
            game.log(event.card,'的流失体力值+1');
        }
        if(!bool||get.cardtag(card,'yingbian_add')){
            event.yingbian_addTarget=true;
        }
    },
    "yingbian_tags":["hit","damage","add"],
    filterTarget:function(card,player,target){return player!=target},
    content:function(){
        "step 0"
        if(typeof event.jieRequired!='number'||!event.jieRequired||event.jieRequired<0){
            event.jieRequired=1;
        }
        if(typeof event.baseDamage!='number') event.baseDamage=1;
        if(typeof event.extraDamage!='number') event.extraDamage=0;
        "step 1"
        if(event.directHit||event.directHit2||(!_status.connectMode&&lib.config.skip_jie&&!target.hasJie())){
            event._result={bool:false};
        }
        else if(event.skipJie){
            event._result={bool:true,result:'jieed'};
        }
        else{
            var next=target.chooseToUse('请使用一张闪响应杀');
            next.set('type','respondJie');
            next.set('filterCard',function(card,player){
                if(get.name(card)!='jie') return false;
                return lib.filter.cardEnabled(card,player,'forceEnable');
            });
            if(event.jieRequired>1){
                next.set('prompt2','（共需使用'+event.jieRequired+'张闪）');
            }
            next.set('ai1',function(card){
                var target=_status.event.player;
                var evt=_status.event.getParent();
                var bool=true;
                if(_status.event.jieRequired>1&&!get.is.object(card)&&target.countCards('h','Jie')<_status.event.jieRequired){
                    bool=false;
                }
                else if(target.hasSkillTag('useJie')){
                    bool=true;
                }
                else if(target.hasSkillTag('noJie')){
                    bool=false;
                }
                else if(get.effect(target,{name:'loseHp'},evt.player,target)>=0) bool=false;
                if(bool){
                    return get.order(card);
                }
                return 0;
            }).set('jieRequired',event.jieRequired);
            next.set('respondTo',[player,card]);
            //next.autochoose=lib.filter.autoRespondJie;
        }
        "step 2"
        if(!result||!result.bool||!result.result||result.result!='jieed'){
            event.trigger('zhenHit');
        }
        else{
            event.jieRequired--;
            if(event.jieRequired>0){
                event.goto(1);
            }else{
                event.trigger('zhenMiss');
                event.responded=result;
            }
        }
        "step 3"
        if((!result||!result.bool||!result.result||result.result!='jieed')&&!event.unhurt){
            target.loseHp(event.baseDamage+event.extraDamage);
            event.result={bool:true}
            event.trigger('zhenDamage');
        }
        else{
            event.result={bool:false}
            event.trigger('zhenUnhirt');
        }
        event.finish();
        "step 4"
        if((!result||!result.bool)&&!event.unhurt){
            target.loseHp(event.baseDamage+event.extraDamage);
            event.result={bool:true}
            event.trigger('zhenDamage');
            event.finish();
        }
        else{
            event.trigger('zhenMiss');
        }
        "step 5"
        if((!result||!result.bool)&&!event.unhurt){
            target.loseHp(event.baseDamage+event.extraDamage);
            event.result={bool:true}
            event.trigger('zhenDamage');
            event.finish();
        }else{
            event.result={bool:false}
            event.trigger('zhenUnhirt');
        }
    },
    ai:{
        yingbian:function(card,player,targets,viewer){
            if(get.attitude(viewer,player)<=0) return 0;
            var base=0,hit=false;
            if(get.cardtag(card,'yingbian_hit')){
                hit=true;
                if(targets.filter(function(target){
                    return target.hasJie()&&get.attitude(viewer,target)<0&&get.effect(target,{name:'loseHp'},player,viewer)>0;
                })) base+=5;
            }
            if(get.cardtag(card,'yingbian_all')){
                if(game.hasPlayer(function(current){
                    return !targets.contains(current)&&lib.filter.targetEnabled2(card,player,current)&&get.effect(current,card,player,player)>0;
                })) base+=5;
            }
            if(get.cardtag(card,'yingbian_damage')){
                if(targets.filter(function(target){
                    return get.attitude(player,target)<0&&(hit||!target.mayHaveJie()||player.hasSkillTag('directLose_ai',true,{
                    target:target,
                    card:card,
                    },true))
                })) base+=5;
            }
            return base;
        },
        order:function(item,player){
            if(player.hasSkillTag('prezhen',true,null,true)) return 10;
            return 3.05;
        },
        result:{
            target:function(player,target,card,isLink){
                var eff=function(){
                    return -1.5;
                }();
                if(!isLink&&target.mayHaveJie()&&!player.hasSkillTag('directLose_ai',true,{
                    target:target,
                    card:card,
                },true)) return eff/1.2;
                return eff;
            },
        },
        tag:{
            respond:1,
            respondJie:1,
            damage:1,
        },
    },
}
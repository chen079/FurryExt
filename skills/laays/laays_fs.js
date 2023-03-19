skill={
    group:['laays_fs_1','laays_fs_2','laays_fs_3'],
    subSkill:{
        1:{
            position:"hes",
            enable:"chooseToUse",
            filterCard:function (card){
                return get.color(card)=='red';
            },
            viewAs:{
                name:"huogong",
                nature:"fire",
            },
            viewAsFilter:function (player){
                if(!player.countCards('hes',{color:'red'})) return false;
            },
            prompt:"将一张红色牌当【火攻】使用",
            check:function (card){
                var player=_status.currentPhase;
                if(player.countCards('h')>player.hp){
                    return 6-get.value(card);
                }
                return 4-get.value(card)
            },
            ai:{
                fireAttack:true,
                basic:{
                    order:4,
                    value:[3,1],
                    useful:1,
                },
                wuxie:function(target,card,player,current,state){
                    if(get.attitude(current,player)>=0&&state>0) return false;
                },
                result:{
                    player:function(player){
                        var nh=player.countCards('h');
                        if(nh<=player.hp&&nh<=4&&_status.event.name=='chooseToUse'){
                            if(typeof _status.event.filterCard=='function'&&
                                _status.event.filterCard({name:'huogong'},player,_status.event)){
                                return -10;
                            }
                            if(_status.event.skill){
                                var viewAs=get.info(_status.event.skill).viewAs;
                                if(viewAs=='huogong') return -10;
                                if(viewAs&&viewAs.name=='huogong') return -10;
                            }
                        }
                        return 0;
                    },
                    target:function(player,target){
                        if(target.hasSkill('huogong2')||target.countCards('h')==0) return 0;
                        if(player.countCards('h')<=1) return 0;
                        if(target==player){
                            if(typeof _status.event.filterCard=='function'&&
                                _status.event.filterCard({name:'huogong'},player,_status.event)){
                                return -1.5;
                            }
                            if(_status.event.skill){
                                var viewAs=get.info(_status.event.skill).viewAs;
                                if(viewAs=='huogong') return -1.5;
                                if(viewAs&&viewAs.name=='huogong') return -1.5;
                            }
                            return 0;
                        }
                        return -1.5;
                    },
                },
                tag:{
                    damage:1,
                    fireDamage:1,
                    natureDamage:1,
                    norepeat:1,
                },
            },
        },
        2:{
            enable:"chooseToUse",
            filter:function(event,player){
                return player.countCards('hs',{suit:'club'})>0;
            },
            filterCard:{
                color:"black",
            },
            viewAs:{
                name:"tiesuo",
            },
            prompt:"将一张黑色牌当铁锁连环使用",
            check:function(card){return 6-get.value(card)},
            ai:{
                wuxie:function(target,card,player,viewer){
                    if(_status.event.getRand()<0.5) return 0;
                    if(player==game.me&&get.attitude(viewer,player)>0){
                        return 0;
                    }
                },
                basic:{
                    useful:4,
                    value:4,
                    order:7,
                },
                result:{
                    target:function(player,target){
                        if(target.isLinked()){
                            if(target.hasSkillTag('link')) return 0;
                            var f=target.hasSkillTag('nofire');
                            var t=target.hasSkillTag('nothunder');
                            if(f&&t) return 0;
                            if(f||t) return 0.5;
                            return 2;
                        }
                        if(get.attitude(player,target)>=0) return -0.9;
                        if(ui.selected.targets.length) return -0.9;
                        if(game.hasPlayer(function(current){
                            return get.attitude(player,current)<=-1&&current!=target&&!current.isLinked();
                        })){
                            return -0.9;
                        }
                        return 0;
                    },
                },
                tag:{
                    multitarget:1,
                    multineg:1,
                    norepeat:1,
                },
            },
        },
        3:{
            mod:{
                selectTarget:function(card,player,range){
                    if(card.name=='tiesuo'&&range[1]!=-1) range[1]++;
                },
            },
        }
    }
}
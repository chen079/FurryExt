skill={
    enable:"phaseUse",
    direct:true,
    usable:1,
    filterCard:true,
    check:function(){
        return 5-get.value(card)
    },
    content:function(){
        'step 0'
        var list=[]
        var c1=get.cardPile2(function(card){
            return get.name(card,false)=='sha'&&!get.nature(card,false);
        });
        var c2=get.cardPile2(function(card){
            return get.name(card,false)=='shan';
        })
        list.push(c1)
        list.push(c2)
        event.list=list
        var next=player.chooseTarget(2,true).set("filterTarget",function(card,player,target){
            if(ui.selected.targets.length){
                return ui.selected.targets[0]!=target
            }
            return true
        }).set("ai",function(player,target){
            var att=get.attitude(player,target)
            if(att>0&&target.hp==1){return 0}
            if(att>0){return 5}
            if(att<0&&target.hp>1&&target.hasSkillTag('maixie')){return -1}
            if(att<0&&target.hp==1){return 6}
            return 0
        })
        next.prompt2='你可以选择两名角色，然后二者各声明一张【杀】或【闪】；若二者都声明【杀】，二者各流失一点体力；若二者都声明【闪】，二者各弃置一张手牌；否则，声明【杀】的角色摸两张牌并对声明【闪】的角色造成一点伤害。'
        next.ai=function(target){
            return get.attitude(event,player,target)>0
        }
        "step 1"
        if(result.bool){
            event.targets=result.targets.sortBySeat()
            event.targets[0].chooseControl("声明【杀】","声明【闪】",true).ai=function(event){
                var att=get.attitude(event.targets[0],event.targets[1])
                if(att>0){
                    if(event.target[1].hasSkillTag('maixie')&&event.targets[1].hp>=2){
                        return 0
                    }
                    return 1
                }
                else if(att<0){
                    return 0
                }else{
                    return [].randomGet(0,1);
                }
            };
        }else{
            event.finish()
            return;
        }
        "step 2"
        if(result.index==0){
            event.card1=event.list[0]
        }else{
            event.card1=event.list[1]
        }
        event.targets[1].chooseControl("声明【杀】","声明【闪】",true).ai=function(event){
            var att=get.attitude(event.targets[1],event.targets[0])
            if(att>0){
                if(event.target[0].hasSkillTag('maixie')&&event.targets[0].hp>=2){
                    return 0
                }
                return 1
            }
            else if(att<0){
                return 0
            }else{
                return [].randomGet(0,1);
            }
        };
        "step 3"
        if(result.index==0){
            event.card2=event.list[0]
        }else{
            event.card2=event.list[1]
        }
        "step 4"
        game.broadcastAll(function(){
            ui.arena.classList.add('thrownhighlight');
        });
        game.addVideo('thrownhighlight1');
        event.targets[0].$compare(event.card1,event.targets[1],event.card2);
        game.log(event.targets[0],'展示了',event.card1);
        game.log(event.targets[1],'展示了',event.card2);
        "setp 5"
        if(get.name(event.card1)=='sha'&&get.name(event.card2)=='sha'){
            event.targets[0].loseHp()
            event.targets[1].loseHp()
        }else if(get.name(event.card1)=='shan'&&get.name(event.card2)=='shan'){
            event.targets[0].chooseToDiscard('h',true)
            event.targets[1].chooseToDiscard('h',true)
        }else if(get.name(event.card1)=='sha'&&get.name(event.card2)=='shan'){
            event.targets[0].draw(2)
            event.targets[1].damage(event.targets[0])
        }else if(get.name(event.card1)=='shan'&&get.name(event.card2)=='sha'){
            event.targets[1].draw(2)
            event.targets[0].damage(event.targets[1])
        }
        "step 6"
        game.broadcastAll(function(){
            ui.arena.classList.remove('thrownhighlight');
        });
        game.addVideo('thrownhighlight2')
    },
    ai:{
        expose:0.4,
        order:7,
        threaten:5,
    },
}
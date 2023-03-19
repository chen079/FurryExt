skill={
    init:function(player){
        player.addSkill('accept_everything_use')
        player.addSkill('accept_everything_wash')
        player.addSkill('accept_everything_die')
    },
    content:function(){
        'step 0'
        var Choicelist=['摸四张牌']
        var list=['摸牌']
        event.list=list
        event.choice=Choicelist
        if(player.countCards('h')>0){
            Choicelist.push('弃置所有手牌')
            list.push('弃牌')
        }
        if(player.isDamaged()){
            Choicelist.push('回复一点体力')
            list.push('回血')
        }
        event.num=list.length-1
        'step 1'
        player.chooseControl(event.list).set('choiceList',event.choice)
        'step 2'
        if(result.control=='摸牌'){
            player.draw(4)
        }else if(result.control=='弃牌'){
            player.discard(player.getCards('h'))
        }else{
            player.recover()
        }
        event.index=result.index
        'step 3'
        if(event.list.length<=event.num){
            event.finish()
        }
        'step 4'
        event.list.remove(event.list[event.index])
        event.choice.remove(event.choice[event.index])
        event.goto(1)
    },
    subSkill:{
        use:{
            enable:"phaseUse",
            filter:function(event,player){
                return !player.hasSkill('accept_everything_reround')
            },
            content:function(){
                'step 0'
                player.removeSkill('accept_everything_use')
                player.addTempSkill('accept_everything_reround')
                'step 1'
                var next = game.createEvent('accept_everything', false);
                next.player = player;
                next.setContent(lib.skill.accept_everything.content);
            }
        },
        die:{
            trigger:{
                global:"dieAfter",
            },
            filter:function(event,player){
                return !player.hasSkill('accept_everything_reround')
            },
            content:function(){
                'step 0'
                player.removeSkill('accept_everything_die')
                player.addTempSkill('accept_everything_reround')
                'step 1'
                var next = game.createEvent('accept_everything', false);
                next.player = player;
                next.setContent(lib.skill.accept_everything.content);
            }
        },
        wash:{
            trigger:{
                global:"washCard",
            },
            filter:function(event,player){
                return !player.hasSkill('accept_everything_reround')
            },
            content:function(){
                'step 0'
                player.removeSkill('accept_everything_wash')
                player.addTempSkill('accept_everything_reround')
                'step 1'
                var next = game.createEvent('accept_everything', false);
                next.player = player;
                next.setContent(lib.skill.accept_everything.content);
            }
        },
        reround:{
            trigger:{
                global:"phaseEnd"
            },
            mark:true,
            intro:{
                content:"于此回合结束后执行一个额外的回合。"
            },
            direct:true,
            content:function(){
                player.insertPhase()
            }
        }
    }
}
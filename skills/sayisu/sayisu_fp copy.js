skill={
    trigger:{
        player:"damageEnd",
        source:"damageEnd",
    },
    init:function(player){
        if(!player.storage.sayisu_fp) player.storage.sayisu_fp=[[],[]];
    },
    mark:true,
    direct:true,
    content:function(){
        "step 0"
        player.draw(trigger.num)
        if(game.hasPlayer(function(current){
            return !player.storage.sayisu_fp[1].contains(current);
        })){
            player.chooseTarget(get.prompt2('sayisu_fp'),function(card,player,target){
                return player!=target&&(!player.storage.sayisu_fp[1]||!player.storage.sayisu_fp[1].contains(target))
            }).set('ai',function(target){return Math.random()})
        }else{
            event.finish()
        }
        "step 1"
        if(result.bool){
            event.target=result.targets[0]
            player.logSkill(event.name,event.target)
            if(!player.storage.sayisu_fp) player.storage.sayisu_fp=[[],[]];
            if(player.storage.sayisu_fp[0].contains(event.target)){
                player.chooseBool("是否对"+get.translation(event.target)+"造成一点伤害").set('ai',function(){
                    var player=_status.event.player
                    var target=_status.event.target
                    return get.attitude(player,target)<0
                }).set('target',event.target)
            }else{
                event.goto(3)
            }
        }else{
            event.finish()
        }
        "step 2"
        if(result.bool){
            event.target.damage(1,player)
            player.storage.sayisu_fp[1].push(event.target);
            player.storage.sayisu_fp[1].sortBySeat();
            event.finish()
        }
        "step 3"
        player.chooseCard(1,'选择交给'+get.translation(event.target)+'的牌',true).set('ai',function(card){
            return 100-get.value(card)
        })
        "step 4"
        if(result.bool){
            event.target.gain(result.cards,player,'give')
        }
        if(!player.storage.sayisu_fp[0].contains(event.target)){
            player.draw(2)
            player.storage.sayisu_fp[0].push(event.target);
            player.storage.sayisu_fp[0].sortBySeat();
        }
    },
    intro:{
        markcount:function(storage){
            return 0;
        },
        mark:function(dialog,storage,player){
            if(!storage) return;
            dialog.addText('已发动目标：');
            dialog.addText(get.translation(storage[0]));
            dialog.addText('不可选目标：');
            dialog.addText(get.translation(storage[1]));
        },
        onunmark:function(storage,player){
            player.storage.edmond_jz=[[],[]];
        },
    }
}
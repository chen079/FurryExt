skill={
    trigger:{
        player:"damageEnd",
        source:"damageEnd",
    },
    init:function(player){
        if(!player.storage.sayisu_fp) player.storage.sayisu_fp=[];
        if(!player.storage.sayisu_fp_ban) player.storage.sayisu_fp_ban=[]
    },
    frequent:true,
    content:function(){
        "step 0"
        player.draw(trigger.num)
        player.chooseCardTarget({
            filterCard:true,
            filterTarget:function(card,player,target){
                return player!=target&&(!player.storage.sayisu_fp_ban||!player.storage.sayisu_fp_ban.contains(target))
            },
            discard:false,
            lose:false,
            ai1:function(card){
                return 10-get.value(card);
            },
            ai2:function(target){
            var att=get.attitude(_status.event.player,target);
                return att;
            },
            prompt:get.prompt2('sayisu_fp')
        });
        "step 1"
        event.target=result.targets[0]
        event.cards=result.cards
        player.logSkill(event.name,event.target)
        if(!player.storage.sayisu_fp) player.storage.sayisu_fp=[];
        if(!player.storage.sayisu_fp.contains(event.target)){
            player.draw(2)
            event.target.gain(event.cards,player,'give')
        }else{
            player.chooseBool("是否对"+get.translation(event.target)+"造成一点伤害").set('ai',function(){
                var player=_status.event.player
                var target=_status.event.target
                return get.attitude(player,target)<0
            }).set('target',event.target)
        }
        player.storage.sayisu_fp.push(event.target);
        player.storage.sayisu_fp.sortBySeat();
        player.markSkill('sayisu_fp');
        "step 2"
        if(result.bool){
            event.target.damage(1,player)
            player.storage.sayisu_fp_ban.push(event.target);
            player.storage.sayisu_fp_ban.sortBySeat();
            event.finish()
        }
    },
    intro:{
        content:function(player,storage,skill){
            return "已对"+get.translation(player.storage.sayisu_fp)+"发动过〖复判〗，不再能对"+get.translation(player.storage.sayisu_fp_ban)+"发动〖复判〗"
        },
    },
}
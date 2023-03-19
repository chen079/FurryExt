skill={
    trigger:{
        global:"roundStart",
    },
    firstDo:true,
    filter:function(event,player){
        return !player.hasSkill('accept_everything_die')&&!player.hasSkill('accept_everything_use')&&!player.hasSkill('accept_everything_wash')
    },
    juexingji:true,
    unique:true,
    mark:true,
    skillAnimation:true,
    animationColor:"thunder",
    forced:true,
    intro:{
        content:"limited",
    },
    content:function(){
        'step 0'
        player.awakenSkill(event.name);
        player.storage[event.name] = true;
        event.num=player.hp
        'step 1'
        player.chooseTarget(1,true,'对一名角色造成伤害')
        'step 2'
        event.target=result.targets[0]
        var list=[]
        for(var i =0; i<event.num;i++){
            list.push(i+1)
        }
        player.chooseControl(list,'为'+get.translation(event.target)+'分配伤害的点数为：')
        'step 3'
        event.num-=result.control
        event.target.damage(result.control,player)
        if(event.num>0){
            event.goto(1)
        }else{
            player.loseHp(player.hp)
        }
    }
}
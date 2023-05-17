skill={
    trigger:{
        player:["phaseZhunbeiBegin","phaseJieshuBegin"]
    },
    direct:true,
    init:function(player){
        if(!player.storage.ming_cx) player.storage.ming_cx=[[true],[true],[true]]
    },
    filter:function(event,player){
        if(event.name!=(player.storage.ming_cx[0]==true?'phaseZhunbei':'phaseJieshu'))   return false
        return true
    },
    content:function(){
        'step 0'
        player.chooseTarget('【晨曦】：是否选择令'+(player.storage.ming_cx[1]==true?"自己":"一名其他角色")+(player.storage.ming_cx[2]==true?"摸":"弃置")+"两张牌")
        .set('filterTarget',function(card,player,target){
            if(player.storage.ming_cx[1]==true){
                return target==player
            }else{
                return target!=player
            }
        }).set('ai',function(target){
            if(player.storage.ming_cx[2]==true){
                return 2
            }else{
                return -2
            }
        })
        'step 1'
        if(result.bool){
            var target=result.targets[0]
            if(player.storage.ming_cx[2]==true){
                target.draw(2)
            }else{
                target.chooseToDiscard(2,true)
            }
        }else{
            event.finish()
        }
        'step 2'
        player.chooseControl('时','象','效').set('prompt',get.prompt2('ming_cx')).set('ai',function(){
            var player=_status.event.player
            if(player.storage.ming_cx[1]==true&&player.storage.ming_cx[2]==true){
                return '时'
            }else if(player.storage.ming_cx[1]==true&&player.storage.ming_cx[2]!=true){
                return '效'
            }else if(player.storage.ming_cx[1]!=true&&!game.hasPlayer(function(current){
                return get.attitude(player,current)>0&&player.storage.ming_cx[2]==true
            })){
                return ['象','效'].randomGet()
            }else{
                return 'cancel2'
            }
        })
        'step 3'
        if(result.control!='cancel2'){
            player.storage.ming_cx[result.index]=!player.storage.ming_cx[result.index]
        }
    }
}
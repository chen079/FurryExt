skill={
    trigger:{
        player:"phaseBegin"
    },
    direct:true,
    content:function(){
        'step 0'
        player.chooseTarget().set('filterTarget',function(card,player,target){
            return target!=player
        })
        'step 1'
        if(result.bool){
            var target=result.targets[0]
            target.chooseControl().set('choiceList',['摸三张balabala','这里是第二个效果的描述'])
        }else{
            event.finish()
        }
        'step 2'
        if(result.index==0){//选择第一项
            //代码块
        }else{
            //代码块
        }
    }
}
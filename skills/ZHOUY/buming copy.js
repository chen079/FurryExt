skill={
    trigger:{
        player:"phaseBefore"
    },
    mark:true,
    locked:true,
    mark:true,
    direct:true,
    zhuanghuanji:true,
    init:function(player){
        if(!player.storage.buming) player.storage.buming=0;
    },
    marktext:'',
    intro:{
        content:function(storage,player){
            var str = '当前效果'
            if(player.storage.buming==1){
                str += '<br><li>摸牌阶段，你多摸两张牌；出牌阶段，你可以多使用一张【杀】；弃牌阶段与判定阶段开始时，你跳过此阶段并摸一张牌。'
            }else if(player.storage.buming==2){
                str += '<br><li>
            }else if(player.storage.buming==3){
                str += '<br><li>
            }else if(player.storage.buming==4){
                str += '<br><li>
            }else if(player.storage.buming==5){
                str += '<br><li>
            }else if(player.storage.buming==6){
                str += '<br><li>
            }else if(player.storage.buming==7){
                str += '<br><li>
            }else if(player.storage.buming==8){
                str += '<br><li>
            }
            return str
        },
        name:function(storage,player){
            var list3=['奇门','开门','休门','生门','伤门','杜门','景门','死门','惊门']
            return list3[player.storage.buming]
        },
        markcount:function(storage,player){
            var list2=['','开门','休门','生门','伤门','杜门','景门','死门','惊门']
            return ' '+list2[player.storage.buming]
        }
    },
    content:function(){
        player.storage.buming=Math.floor(Math.random()*8)+1
    }
}
skill={
    intro:{
        content:"cards",
        onunmark:function(storage,player){
            if(storage&&storage.length){
                player.$throw(storage,1000);
                game.cardsDiscard(storage);
                game.log(storage,'被置入了弃牌堆');
                storage.length=0;
            }
        },
    },
    enable:"phaseUse",
    usable:1,
    audio:"ext:无名扩展:2",
    init:function(player,skill){
        if(!player.storage[skill]) player.storage[skill]=[];
    },
    filter:function(event,player){
        return player.storage.rest_qf.length<4&&player.countCards('h')>0;
    },
    visible:true,
    filterCard:true,
    selectCard:function(){
        var player=_status.event.player;
        return [1,4-player.storage.rest_qf.length];
    },
    discard:false,
    toStorage:true,
    delay:false,
    content:function(){
    'step 0'
    //player.lose(cards,ui.special,'toStorage')
    player.$give(cards,player,false);
    player.storage.rest_qf=player.storage.rest_qf.concat(cards);
    player.markSkill('rest_qf');
    },
    check:function(card){
        return 6-get.value(card);
    },
    onremove:function(player,skill){
        var cards=player.storage.rest_qf;
        if(cards.length) player.loseToDiscardpile(cards);
    },
    ai:{
        order:1,
        result:{
            player:1,
        },
    },
    group:"rest_qf_1",
    subSkill:{
        "1":{
            trigger:{
                source:"damageEnd"
            },
            frequent:true,
            check:function(event,player){
                return get.attitude(player,event.player)<0
            },
            content:function(){
               	"step 0"
                player.judge()
                "step 1"
                if(result.color=='red'){
                    player.draw()
                }
                if(result.color=='black'){
                    player.discardPlayerCard(1,trigger.player,'h',true)
                }
            }
        }
    }
}
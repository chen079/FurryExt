skill={
    trigger: {
        global: "damageEnd"
    },
    usable: 1,
    init:function(storage,player){
        if(!player.storage.sam_wl) player.storage.sam_wl=[]
    },
    check:function(event,player){
        var att1=get.attitude(player,event.player);
        var att2=get.attitude(player,event.source)
        return att2<0&&att1>0
    },
    filter: function (event, player) {
        return get.distance(player, event.player) <= 1 && event.player.isIn() && (!player.storage.sam_wl||!player.storage.sam_wl.contains(event.player));
    },
    content: function () {
        'step 0'
        trigger.source.gain(trigger.cards, 'gain2')
        event.card=player.useCard({name:'sha',isCard:true},trigger.source,false).card;
        player.storage.sam_wl.push(trigger.player)
        'step 1'
        if(player.getHistory('sourceDamage',function(evt){
            return event.card==evt.card;
        }).length){
            trigger.player.recover(trigger.num)
        }
    },
    group:"sam_wl_clean",
    subSkill:{
        clean:{
            trigger:{
                global:"phaseBegin"
            },
            popup:false,
            forced:true,
            content:function(){
                player.storage.sam_wl=[]
            }
        }
    }
}
skill = {
    enable: "phaseUse",
    usable: 1,
    filter: function (event, player) {
        return player.storage.hynea_cg > 0
    },
    check:function(event,player){
        return player.storage.hynea_cg>player.hp
    },
    filterTarget:function(card,player,target){
        return player!=target;
    },
    content: function () {
        'step 0'
        player.storage.hynea_cg-=1
        target.damage(1,player)
        'step 1'
        player.updateMark('hynea_cg')
    },
    ai:{
        order:9.5,
        expose:0.2,
        result:{
            player:function(player,target){
                return get.damageEffect(target,player,player);
            },
        },
    },
}
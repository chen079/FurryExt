skill={
    "绝颤":{
        trigger:{
            player:"dying",
        },
        unique:true,
        forced:true,
        /*round:1,*/
        direct: true,
        
        content:function () {
            'step 0'
            if (player.hp < 4) {
                player.recover(2 - player.hp);
            }
            'step 1'
            player.addTempSkill('绝', { player: 'phaseBegin' });
        },
        group:["绝颤_roundcount"],
    },
}
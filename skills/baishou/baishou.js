skill = {
    enable: "phaseUse",
    init: function (player) {
        if (!player.storage.baishou) {
            player.storage.baishou = [{}, []]
        }
        game.loadFromFile('extension/福瑞拓展/json/poems.json', player.storage.baishou[0], function (error, data) {
            if (error) {
                alert(error);
            } else {
                console.log(data);
            }
        });
    },
    content: function () {
        'step 0'
        player.chooseText().set('prompt', get.prompt2('baishou'))
        'step 1'
        if(result.bool){
            for(var i in player.storage.baishou[0]){
                if(!player.storage.baishou[1].contains(i)&&player.storage.baishou[0][i]['poem'].contains(result.text)){
                    player.storage.baishou[1].push(i)
                    player.draw()
                    break;
                }
            }
        }
    }
}
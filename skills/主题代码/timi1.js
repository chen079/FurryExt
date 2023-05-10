skill={
    enable:["chooseToUse","chooseToRespond"],
    hiddenCard:function (player, name) {
        if (lib.inpile.contains(name) && (get.type(name) == 'basic' || get.type(name) == 'trick')) return true;
    },
    initList:function(player){
        player.storage.fr_jieze=[0,{
            1:'polygon(0 0,100% 0,100% 50%,50% 50%,50% 100%,0 100%)',
            2:'polygon(0 0,100% 0,100% 50%,0 50%)',
            3:'polygon(0 0,50% 0,50% 50%,0 50%)',
            4:'polygon(0 0,0 100%)'
        }]
    },
    init:function(player){
        lib.skill.fr_jieze.initList()
    },
    direct:true,
    delay:false,
    filter:function (event, player) {
        if (event.responded) return false;
        for (var i of lib.inpile) {
            if (event.filterCard({ name: i }, player, event)) return true;
        }
        return false;
    },
    content:function(){
        'step 0'
        var evt = event.getParent(2);
        var list1 = [], list2 = [];
        for (var i = 0; i < lib.inpile.length; i++) {
            var type = get.type(lib.inpile[i]);
            if (type == 'basic') {
                if (evt.filterCard({ name: lib.inpile[i] }, player, evt)) list1.push(['基本', '', lib.inpile[i]]);
            }
            else if (type == 'trick') {
                if (evt.filterCard({ name: lib.inpile[i] }, player, evt)) list2.push(['锦囊', '', lib.inpile[i]]);
            }
        }
        player.chooseButton([get.prompt('DIY_qianchong'), '请选择要声明的牌', [list1.concat(list2), 'vcard']]).set('filterButton', function (button) {
            return evt.filterCard({ name: button.link[2] }, player, evt);
        });
        'step 1'
        player.node.avatar.style
    }
}
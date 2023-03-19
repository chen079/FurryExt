skill = {
    enable: 'phaseUse',
    hubian: true,
    multitarget: true,
    complexTarget: true,
    filterTarget: true,
    selectTarget: 2,
    content: function () {
        if (!player.storage.hubian) {
            targets[0].swapHandcards(targets[1]);
        }else{
            targets[0].swapEquip(targets[1]);
        }
    },
}
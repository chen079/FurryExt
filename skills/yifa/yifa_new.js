skill = {
    trigger:{
        player:["phaseZhunbeiBegin","phaseJieshuBegin"],
        global:"roundStart",
    },
    forceunique:true,
    fixed:true,
    limited:false,
    charlotte:true,
    mark:true,
    supercharlotte:true,
    content: function () {
        'step 0';
        /* 创建dialog */
        var dialog = ui.create.dialog(false);
        /* dialog标题 */
        dialog.add('请输入技能名');
        /* dialog.add方法只接受div，而不是input */
        var div = document.createElement('div');
        /* 创建input并添加到div里 */
        var input = div.appendChild(document.createElement('input'));
        /* 输入前的提示 */
        input.placeholder = '请在此输入技能名称';
        /* dialog添加div */
        dialog.add(div);
        /* 把dialog，input加入event,让下一步骤的技能可调用dialog */
        event.dialog = dialog;
        event.input = input;
        'step 1'
        /* 获取上一步骤的dialog */
        var dialog = event.dialog;
        var input = event.input;
        var skillName = () => {
            /* 移除dialog */
            dialog.remove();
            /* value是输入框里的值 */
            var value = input.value;
            for(var i in lib.character){ 
                for(var j=0;j<lib.character[i][3].length;j++){ 
                    if(player.hasSkill(lib.character[i][3][j])) continue;
                    var info=lib.skill[lib.character[i][3][j]];
                    if(info){
                        if(get.translation(lib.character[i][3][j])!=value||(info.fixed||info.unique||info.zhuSkill||info.charlotte||info.hiddenSkill||info.juexingji||info.limited||info.dutySkill||(info.unique&&!info.gainable))) continue;
                        skills.add(lib.character[i][3][j]); 
                    }    
                } 
            }
            if(skills.length){
                player.storage.yifa_xs=skills
            }else{
                input.value=''
            }
        }
        /* 如果是ai */
        if (!event.isMine()) {
            var skills=[];
            for(var i in lib.character){ 
                for(var j=0;j<lib.character[i][3].length;j++){ 
                    if(player.hasSkill(lib.character[i][3][j])) continue;
                    var info=lib.skill[lib.character[i][3][j]];
                    if(info&&(info.forced||info.mod||info.locked)&&!(info.fixed||info.unique||info.zhuSkill||info.charlotte||info.hiddenSkill||info.juexingji||info.limited||info.dutySkill||(info.unique&&!info.gainable))){
                        skills.add(lib.character[i][3][j]); 
                    }    
                } 
            }
            var skills2=skills.randomGet();
            if(trigger.name=="phaseZhunbei"){
                player.addTempSkill(skills2,{player:"phaseEnd"});
            }else if(trigger.name=="phaseJieshu"){
                player.addTempSkill(skills2,{player:"phaseBegin"});
            }else{
                player.addTempSkill(skills2,'roundStart');
            }
            player.popup(skills2);
            game.log(player,'声明了','#g'+'【'+get.translation(skills2)+'】');
            event.finish()
        } else {
            /* 显示dialog */
            dialog.open();
            /* 暂停游戏 */
            game.pause();
            /* 输入结束后点击确定 */
            var button = ui.create.control('确定', () => {
                if (!input.value||input.value=='') {
                    return alert('该技能不可用，请重新输入')
                }
                /*移除button */
                button.remove();
                skillName();
            });
        }
        "step 2"
        if(player.storage.yifa_xs.length==1){
            var skills2=player.storage.yifa_xs[0]
            if(trigger.name=="phaseZhunbei"){
                player.addTempSkill(skills2,{player:"phaseEnd"});
            }else if(trigger.name=="phaseJieshu"){
                player.addTempSkill(skills2,{player:"phaseBegin"});
            }else{
                player.addTempSkill(skills2,'roundStart');
            }
            player.popup(skills2);
            game.log(player,'声明了','#g'+'【'+get.translation(skills2)+'】');
            event.finish()
        }else{
            var list=[]
            var skills=player.storage.yifa_xs
            for(var i=0;i<skills.length;i++){
                list.push(get.translation(skills[i]+'_info'))
            }
            player.chooseControl().set('choiceList',list).set('prompt','选择〖'+get.translation(skills[0])+'〗的版本')
        }
        "step 3"
        var skills2=player.storage.yifa_xs[result.index]
        if(trigger.name=="phaseZhunbei"){
            player.addTempSkill(skills2,{player:"phaseEnd"});
        }else if(trigger.name=="phaseJieshu"){
            player.addTempSkill(skills2,{player:"phaseBegin"});
        }else{
            player.addTempSkill(skills2,'roundStart');
        }
        player.popup(skills2);
        game.log(player,'声明了','#g'+'【'+get.translation(skills2)+'】');
    },
}
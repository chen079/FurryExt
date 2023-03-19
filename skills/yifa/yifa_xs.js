skill={
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
    content:function (){
        "step 0"
        ui.clear();
        if(event.created) return;
        event.created=true;
        if(event.isMine()){                
            var node=ui.create.div('.add_skill');
            event.node=node;
            event.node.style.zIndex="9999";
            event.node.style.background= 'black';
            event.node.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=50,finishOpacity=50)";
            event.node.style.opacity = "0.7"
            event.node.style.width='400px';
            event.node.style.height='30px';
            event.node.style.lineHeight='30px';
            event.node.style.fontFamily='xinwei';
            event.node.style.fontSize='30px';
            event.node.style.padding='10px';
            event.node.style.left='calc(50% - 200px)';
            event.node.style.top='calc(50% - 20px)';
            event.node.style.whiteSpace='nowrap';
            event.node.innerHTML='请在此输入技能名称';
            event.node.contentEditable=true;
            event.node.style.webkitUserSelect='text';
            event.node.style.textAlign='center';            
            var skillName=function(e){
                var skills=[];
                for(var i in lib.character){ 
                    for(var j=0;j<lib.character[i][3].length;j++){ 
                        if(player.hasSkill(lib.character[i][3][j])) continue;
                        var info=lib.skill[lib.character[i][3][j]];
                        if(info){
                            var name=event.node.innerText;
                            if(get.translation(lib.character[i][3][j])!=name||(info.fixed||info.unique||info.zhuSkill||info.charlotte||info.hiddenSkill||info.juexingji||info.limited||info.dutySkill||(info.unique&&!info.gainable))) continue;
                            skills.add(lib.character[i][3][j]); 
                        }    
                    } 
                }
                if(skills.length){
                    ui.window.removeChild(event.node);    
                    ui.window.removeChild(text);
                    ui.window.removeChild(button);
                    event.node.innerHTML='';
                    player.storage.yifa_xs=skills
                    game.resume();
                    return
                }
                else{
                    var name=event.node.innerText;
                    alert(((name.length==0||name=='请在此输入技能名称')?'请先输入技能名称':name+'不是一个可用的技能，请重新输入'));
                    //ui.clear();
                    event.node.innerHTML='';
                    return;
                }
            };
            ui.window.appendChild(event.node);
            event.node.onfocus=function(){
                event.node.innerHTML='';
            };
            event.node.onkeydown=function(e){
                e.stopPropagation();
                if(e.keyCode==13){
                    skillName();
                    setTimeout(function(){
                        event.node.innerHTML='';
                    },10);
                };
            };
            var text=ui.create.div();
            text.style.width='400px';
            text.style.height='30px';
            text.style.zIndex="9999"
            text.style.lineHeight='30px';
            text.style.fontFamily='黑体';
            text.style.fontSize='20px';
            text.style.padding='10px';
            text.style.left='calc(50% - 200px)';
            text.style.top='calc(50% - 80px)';
            text.innerText='请声明一个技能名称';
            text.style.textAlign='center';
            ui.window.appendChild(text);
            var button=ui.create.div('.menubutton.highlight.large','确定',function(){
                skillName()
            });
            button.style.width='70px';
            button.style.left='calc(50% - 35px)';
            button.style.top='calc(50% + 60px)';
            ui.window.appendChild(button);
            for(var i in lib.element.event){
                event.parent[i]=lib.element.event[i];
            }
            event.parent.custom={
                add:{},
                replace:{}
           }
            game.pause();
        }else{
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
        }
        "step 1"
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
        "step 2"
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
    ai:{
        threaten:6,
    },
}
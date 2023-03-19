skill={
    enable:"phaseUse",
    usable:1,
    filter:function(event,player){
           var list=[];
           for(var i=0;i<game.dead.length;i++){
            if(game.dead[i].maxHp!=0){
                list.push(game.dead[i].name);
            }
          }
          return list.length>0; 
      },
    content:function(){
          "step 0"
            player.loseHp()
            var list=[];
           for(var i=0;i<game.dead.length;i++){
            if(game.dead[i].maxHp!=0){
                list.push(game.dead[i].name);
            }
        } 
           player.chooseButton(ui.create.dialog('选择一名已死亡的角色令其复活',[list,'character']),function(button){
           for(var i=0;i<game.dead.length&&game.dead[i].name!=button.link;i++);
           return Math.random()
      }); 
           "step 1" 
        if(result.bool){
            for(var i=0;i<game.dead.length&&game.dead[i].name!=result.buttons[0].link;i++);
            var dead=game.dead[i]; 
            dead.revive(1);                    
            dead.draw(2);
            var skills=dead.getSkills();
            for(var j=0;j<skills.length;j++){
                dead.markSkill(skills[j])
            }
            dead.checkMarks()
            game.broadcastAll(function(player,target,shown){
                var identity=player.identity;
                if(identity=='zhu'){
                    dead.identity='zhong'
                }else if(identity=='nei'){
                    player.identity=dead.identity
                }else{
                    dead.identity=identity;
                }
                dead.setIdentity();
            },player,dead,dead.identityShown);
        }
     },
     ai:{
        order:14,
        result:{
            player:function(player){
                if(player.hp<3) return -1;
                if(player.countCards('hs',{name:['jiu','tao']})) return 1;
                return 0;
            },
        },
        threaten:2,
    },
}
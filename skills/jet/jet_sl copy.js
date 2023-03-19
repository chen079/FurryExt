skill={
    trigger:{
        player:"showCharacterAfter",
    },
    hiddenSkill:true,
    filter:function(event,player){
        return event.toShow.contains('fr_jet')
    },
    direct:true,
    init:function(player){
        if(!player.storage.jet_sl) player.storage.jet_sl=false;
    },
    derivation:"luanwu",
    content:function(){
        "step 0"
        player.logSkill('jet_sl')
        if(player.storage.jet_sl==true){
            var list=[];
            for(var name of lib.inpile){
                var type=get.type(name);
                if(type!='trick') continue;
                var card={name:name,isCard:true};
                var info=get.info(card,false);
                if((!info.notarget&&(info.toself||info.singleCard||!info.selectTarget||info.selectTarget==1))&&player.hasUseTarget(card)){
                    list.push([type,'',name]);
                }
            }
            player.chooseButton(['〖始乱〗：选择要使用的牌',[list,'vcard']],function(button){
                return _status.event.player.getUseValue({name:button.link[2],nature:button.link[3]});
            },function(button){
                return _status.event.player.hasUseTarget({name:button.link[2],nature:button.link[3]});
        });
        }else{
            player.storage.jet_sl=true
            var next=game.createEvent('luanwu',false);
            next.player=player;
            next.target=game.filterPlayer((current)=>current!=player);
            next.setContent(lib.skill.luanwu.content);
            event.finish()
        }
        "step 1"
        if(result.bool) player.chooseUseTarget(true,{name:result.links[0][2],isCard:true,nature:result.links[0][3]})
    },
}
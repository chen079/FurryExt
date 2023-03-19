skill={
    enable:"phaseUse",
    audio:"ext:无名扩展:2",
    unique:true,
    filter:function(event,player){
        return player.storage.rest_qf&&player.storage.rest_qf.length>=2;
    },
    prompt:"移去两张“孽”当作任意基本牌或普通锦囊牌使用",
    content:function(){
    'step 0'
    player.chooseCardButton(2,'移去两张“孽”并当作任意基本牌或普通锦囊牌使用',player.storage.rest_qf,true);
    'step 1'
    if(!result.bool){
    event.finish();
    return;
    }
    player.$throw(result.links);
    for(var i=0;i<result.links.length;i++){
    player.storage.rest_qf.remove(result.links[i]);
    }
    game.cardsDiscard(player.storage.rest_qf);
    player.syncStorage('rest_qf');
    "step 2"
    var list=[];
    for(var i=0;i<lib.inpile.length;i++){
        var name=lib.inpile[i];
        var type=get.type(name);
        if(type=='trick'||type=='basic'){
            if(lib.filter.cardEnabled({name:name},player)){
                list.push([get.translation(type),'',name]);
            }
        }
    }
    var dialog=ui.create.dialog('孽变',[list,'vcard']);
    var taoyuan=0,nanman=0;
    var players=game.filterPlayer();
    for(var i=0;i<players.length;i++){
        var eff1=get.effect(players[i],{name:'taoyuan'},player,player);
        var eff2=get.effect(players[i],{name:'nanman'},player,player);
        if(eff1>0){
            taoyuan++;
        }
        else if(eff1<0){
            taoyuan--;
        }
        if(eff2>0){
            nanman++;
        }
        else if(eff2<0){
            nanman--;
        }
    }
    player.chooseButton(dialog).ai=function(button){
        var name=button.link[2];
        if(Math.max(taoyuan,nanman)>1){
            if(taoyuan>nanman) return name=='taoyuan'?1:0;
            return name=='nanman'?1:0;
        }
        if(player.countCards('h')<player.hp&&player.hp>=2){
            return name=='wuzhong'?1:0;
        }
        if(player.hp<player.maxHp&&player.hp<3){
            return name=='tao'?1:0;
        }
        return name=='zengbin'?1:0;
    }
    'step 3'
    if(result.bool){
        player.chooseUseTarget(true,result.links[0][2]);
    }
    },
    ai:{
        fireAttack:true,
        respondSha:true,
        respondShan:true,
        order:1,
        result:{
            player:function(player){
                if(_status.event.dying) return get.attitude(player,_status.event.dying);
                return 1;
            },
        },
    },
}
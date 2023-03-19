if(furry.enable){ 	
    game.import('character',function(){
        var furry={
            name:'furry',//武将包命名（必填）
            connect:true,//该武将包是否可以联机（必填）
        }
        if(lib.device||lib.node){
            for(var i in furry.character){furry.character[i][4].push('ext:福瑞拓展/'+i+'.jpg');}
        }else{
            for(var i in furry.character){furry.character[i][4].push('db:extension-福瑞拓展:'+i+'.jpg');}
        }
        return furry;
    })
        lib.config.all.characters.push('furry');
	 	if(!lib.config.characters.contains('furry')) lib.config.characters.push('furry');
 		lib.translate['furry_character_config']='福瑞拓展';
}
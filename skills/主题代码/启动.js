function(){
  /*千幻*/
  window.furry_import=function(func){
    func(lib,game,ui,get,ai,_status);
  };
  game.frGetQhlySkin=function(name){
    if(game.qhly_getSkin){
      return game.qhly_getSkin(name);
    }
    return null;
  };
  lib.init.js(lib.assetURL+'extension/福瑞拓展/skin.js',null);//这一行代码加载扩展中的skin.js文件。   
  }
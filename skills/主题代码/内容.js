contnen=function (config,pack){
  /*露头*/
if(lib.config.frLutou){
  var func=HTMLDivElement.prototype.setBackgroundImage;
  HTMLDivElement.prototype.setBackgroundImage=function(name){
  if((this.classList.contains('avatar')||this.classList.contains('avatar2')||this.classList.contains('qh-image-lutou')||this.classList.contains('primary-avatar') || this.classList.contains('deputy-avatar') || this.classList.contains('button')) && name.indexOf('extension/福瑞拓展/') == 0 && !this.classList.contains('xwnotingame')&& name.indexOf("extension/福瑞拓展/skin/")!=0){
  name=name.replace('extension/福瑞拓展/','extension/福瑞拓展/lutou/');
  }
  func.apply(this,arguments);
  };
  }
  lib.skill._frzwyy={
    trigger:{
      global:'dieAfter',
    },
    direct:true,
    priority:2,
    forced:true,
    unique:true,
    frequent:true,
    forceDie:true,
    lastDo:true,
    filter:function (event,player){
    return !event.player.isAlive();
    },
    content:function(){
      game.playAudio('..','extension','福瑞拓展/audio',trigger.player.name);
    },
  }
}
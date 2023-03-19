config = {
  tuozhanjieshao: {
    name: "拓展介绍",
    init: "jieshao",
    unfrequent: true,
    item: {
      jieshao: "点击查看",
    },
    textMenu: function (node, link) {
      lib.setScroll(node.parentNode);
      node.parentNode.style.transform = "translateY(-100px)";
      node.parentNode.style.height = "300px";
      node.parentNode.style.width = "300px";
      switch (link) {
        case "jieshao":
          node.innerHTML = "侵删，且福瑞控狂喜！！！其中部分技能与界面参考自许多拓展，如子琪拓展，古剑拓展，云将，活动武将，大家也要去支持他们哦！！欢迎使用，玩的开心"
          break;
      }
    },
  },
  frLutou: {
    name: "露头模式",
    intro: "切换武将插画与皮肤为露头，需要搭配十周年UI使用，重启生效。",
    init: false,
    onclick: function (item) {
      game.saveConfig('extension_福瑞拓展_frLutou', item);
      game.saveConfig('frLutou', item);
      if (window.decadeUI) ui.arena.dataset.outcropSkin = item ? 'on' : 'off';
      game.saveConfig('extension_十周年UI_outcropSkin', item);
    },
  },
}
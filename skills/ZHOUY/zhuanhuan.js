if (lib.config.extension_福瑞拓展_exp && lib.config.extensions && lib.config.extensions.contains('武将界面') && lib.config['extension_武将界面_enable']) {
    setTimeout(() => {
        if (ggMod) {
            ggMod.junk.addArray(game.furryrank[0])
            ggMod.common.addArray(game.furryrank[1])
            ggMod.rare.addArray(game.furryrank[2])
            ggMod.epic.addArray(game.furryrank[3])
            ggMod.legend.addArray(game.furryrank[4])
        }
    }, 1000)
}
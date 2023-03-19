skill = {
    group: ["malaer_bc_begin", "malaer_bc_draw", "malaer_bc_use", "malaer_bc_discard", "malaer_bc_end"],
    trigger: {
        player: "turnOverBegin",
    },
    firstDo: true,
    content: function () {
        trigger.finish()
        trigger.cancel()
    },
    ai: {
        noCompareTarget: true,
    },
    subSkill: {
    begin: {
        trigger: {
            player: "phaseZhunbeiBegin",
            },
        forced: true,
            popup: false,
                content: function() {
                    player.storage.malaer_bc_draw = true;
                    player.storage.malaer_bc_use = true;
                },
        sub: true,
        },
    draw: {
        trigger: {
            player: "phaseDrawBegin",
            },
        forced: true,
            popup: false,
                content: function() {
                    player.storage.malaer_bc_draw = false;
                },
        sub: true,
        },
    use: {
        trigger: {
            player: "phaseUseBegin",
            },
        forced: true,
            popup: false,
                content: function() {
                    player.storage.malaer_bc_use = false;
                },
        sub: true,
        },
    discard: {
        trigger: {
            player: "phaseDiscardBefore",
            },
        forced: true,
            filter: function(event, player) {
                if (player.storage.malaer_bc_use) return true;
                return false;
            },
        content: function() {
            trigger.cancel();
        },
        sub: true,
        },
    end: {
        trigger: {
            player: "phaseJieshuBegin",
            },
        forced: true,
            filter: function(event, player) {
                if (player.storage.malaer_bc_draw) return true;
                return false;
            },
        content: function() {
            player.draw(3);
        },
        sub: true,
        },
},
}
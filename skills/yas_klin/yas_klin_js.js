skill={
    trigger:{
        global:"phaseBegin",
    },
    filter:function(event,player){
        return player.countCards('h')>0
    },
    check:function(event,player){
        if(player.countCards('h')<2) return false
        if(get.attitude(player,event.player)>0) return true
        return false;
    },
    logTarget:"player",
    preHidden:true,
    "prompt2":"你可以弃置任意张不同花色的牌，然后使当前角色摸等量的牌并获得以下效果：♠：【杀】指定目标后令其本回合技能失效，♥：【杀】本回合无视防具，♣：【杀】本回合造成的伤害+1，♦：【杀】本回合无距离次数限制。",
    content:function () {
        "step 0"
        var save=false;
        if(get.attitude(player,event.player)>0){
            save=true;
        }
        var next=player.chooseToDiscard('h',[1,Infinity],false,function(card){
            var suit=get.suit(card);
            for(var i=0;i<ui.selected.cards.length;i++){
                if(get.suit(ui.selected.cards[i])==suit) return false;
            }
            return true;
        })
        next.ai=function(card){
            if(save){
                if(trigger.player==player) return 9-get.value(card)
                if(ui.selected.cards.length>2) return 0
                return 7-get.value(card);
            }
            return 0;
        }
        "step 1"
        if(result.bool){
            var cards = result.cards;
            trigger.player.draw(cards.length)
            suit = [];
            if (cards && cards.length > 0) {
                for (var i = 0; i < cards.length; i++) {
                    if (!suit.contains(get.suit(cards[i]))) {
                        suit.add(get.suit(cards[i]));
                    }
                }
            }
        }else{
            event.finish()
            return;
        }
        "step 2"
        trigger.player.addTempSkill('yas_klin_js_marks')
        if (suit.contains('spade')) trigger.player.addTempSkill('yas_klin_js_spade');
        if (suit.contains('heart')) trigger.player.addTempSkill('yas_klin_js_heart');
        if (suit.contains('club')) trigger.player.addTempSkill('yas_klin_js_club');
        if (suit.contains('diamond')) trigger.player.addTempSkill('yas_klin_js_diamond');
    },
    ai:{
        result:{
            player:1,
        },
        order:11,
    },
    subSkill:{
        marks:{
            popup:false,
            silent:true,
            charlotte:true,
            forced:true,
            marktext:"祭",
            mark:true,
            intro:{
                content:function (storage, player, skill) {
                    var str = '当前状态：';
                    if (player.hasSkill('yas_klin_js_spade')) str += '<br><li>♠：你的【杀】指定目标后，你令其本回合技能失效。';
                    if (player.hasSkill('yas_klin_js_heart')) str += '<br><li>♥：你的【杀】不可被闪避且无视目标防具。';
                    if (player.hasSkill('yas_klin_js_club')) str += '<br><li>♣：你的【杀】造成的伤害+1。';
                    if (player.hasSkill('yas_klin_js_diamond')) str += '<br><li>♦：你的【杀】无距离次数限制。';
                    return str;
                },
            },
            sub:true,
        },
        spade:{
            shaRelated:true,
            popup:false,
            silent:true,
            charlotte:true,
            forced:true,
            init:function (player) {
                player.markSkill('yas_klin_js');
            },
            onremove:function (player) {
                player.unmarkSkill('yas_klin_js');
            },
            trigger:{
                player:"useCardToTargeted",
            },
            filter:function (event, player) {
                return event.card.name == 'sha';
            },
            logTarget:"target",
            content:function () {
                trigger.target.addTempSkill('baiban');
            },
            ai:{
                ignoreSkill:true,
                skillTagFilter:function (player, tag, arg) {
                    if (!arg || arg.isLink || !arg.card || arg.card.name != 'sha') return false;
                    if (!arg.skill || !lib.skill[arg.skill] || lib.skill[arg.skill].charlotte || !arg.target.getSkills(true, false).contains(arg.skill)) return false;
                },
            },
            sub:true,
        },
        heart:{
            shaRelated:true,
            popup:false,
            silent:true,
            charlotte:true,
            init:function (player) {
                player.markSkill('yas_klin_js');
            },
            onremove:function (player) {
                player.unmarkSkill('yas_klin_js');
            },
            trigger:{
                player:"useCardToTargeted",
            },
            forced:true,
            filter:function (event, player) {
                return event.card.name == 'sha';
            },
            logTarget:"target",
            content:function () {
                trigger.target.addTempSkill('qinggang2');
                trigger.target.storage.qinggang2.add(trigger.card);
            },
            ai:{
                skillTagFilter:function (player, tag, arg) {
                    if (!arg || arg.isLink || !arg.card || arg.card.name != 'sha') return false;
                    if (arg && arg.name == 'sha') return true;
                },
                "unequip_ai":true,
            },
            sub:true,
        },
        club:{
            trigger:{
                source:"damageBegin1",
            },
            filter:function (event) {
                return event.card && event.card.name == 'sha';
            },
            forced:true,
            popup:false,
            silent:true,
            charlotte:true,
            init:function (player) {
                player.markSkill('yas_klin_js');
            },
            onremove:function (player) {
                player.unmarkSkill('yas_klin_js');
            },
            content:function () {
                trigger.num++;
            },
            sub:true,
        },
        diamond:{
            popup:false,
            silent:true,
            charlotte:true,
            init:function (player) {
                player.markSkill('yas_klin_js');
            },
            onremove:function (player) {
                player.unmarkSkill('yas_klin_js');
            },
            mod:{
                targetInRange:function (card, player, target, now) {
                    if (card.name == 'sha') return true;
                },
                cardUsable:function (card, player, num) {
                    if (card.name == 'sha') return Infinity
                },
            },
            sub:true,
            forced:true,
        },
    },
}
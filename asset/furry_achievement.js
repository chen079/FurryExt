window.furry_import(function (lib, game, ui, get, ai, _status) {
	//胜利台词
	lib.fr_winnerSay = {
		'fr_ming':"语出如剑，可伤人心。",
		'fr_death':"我喜欢死亡的味道...",
		'fr_aoeslat': "不过是几条人命而已，哪有我的享乐重要，哈哈哈哈！",
		'fr_thunder': '所谓雷电，不过是玩具罢了...',
		'fr_lamas': '我会战斗到最后一刻！',
		'fr_mouse': '奇门遁甲，唯破万法...',
		'fr_nashu': '邪恶的灵魂，呵呵，不过是我的盘中餐...',
		'fr_rasali': '唯有善良，方为出路。',
		'fr_zhan': "枷锁是困不住我的，只会让我更加强大！",
		'fr_derk': '这只是计划的一部分。',
		'fr_crow': '流言止于智者...',
		'fr_tiers': "我于杀戮之中盛放！",
		"fr_milis": '所铸兵刃，可破万法。',
		"fr_lions": '魂起何处，梦落何归？',
		"fr_xit": '智者，当以全身而退！',
		"fr_nier": '智解万物，元生万象。',
		"fr_laays": '今日何日，今时何时？以吾之血，饲世之厄。',
		'fr_liya': '喜欢我的机车吗？我爸爸给我的！',
		'fr_mala': '尔等胆敢在龙神面前放肆？',
		"fr_yada": '遇上我，算你运气不好。<br>&nbsp&nbsp糟糕，显得我像个反派了。',
		"fr_muliy": '山重水复疑无路，<br>&nbsp&nbsp柳暗花明又一村。',
		"fr_sier": '看我拳打青龙，脚踢白虎。',
		"fr_klif": '我盯上的猎物，只有两个下场。<br>&nbsp&nbsp要么他自己死，要么我帮他死。',
		"fr_west": '你需要治疗。',
		"fr_milite": '负我者，当千刀万剐！',
		"fr_jackson": '和沙子玩玩拳击吧。',
		"fr_jiejie": '当断不断，必受其乱。',
		"fr_sayisu": '区区百万大军，岂敢拦我？',
		"fr_rest": '这大海，可都是我的领域。',
		"fr_kert": '你的魂魄归我了！',
		"fr_keya": '太笨了，请你马上离开。',
		"fr_klier": '打一拳就好了！',
		"fr_lint": '不许动，举起手来！',
		"fr_patxi": '我的兵器，竟然最终指向自己。',
		"fr_nore": '你的弱点，太明显了！',
		"fr_nulia": '愿渡世间一切灾厄。',
		"fr_terlk": '纵使荆棘缠身，亦当向光而行。',
		"fr_wore": '接下来，请放松...',
		"fr_hynea": '哈哈哈，谅你也说不过我！',
		'fr_linyan': '一花一木，春华秋实。',
		'fr_shark': '这是合适的价钱。',
		"fr_muyada": '你是要断手，还是要断首？',
		"fr_marxya": '谨小慎微，攻无不克。',
		"fr_muli": '我看你命不久矣。',
		"fr_alas": '不小心下手太重了，下辈子注意。',
		"fr_ken": '让我来守护你！',
		"fr_sisk": '鲜血的滋味，<br>&nbsp&nbsp如此甜美！',
		"fr_skry": '我这把匕首，可是沾了剧毒的。',
		"fr_kersm": '今天的任务，就是你的头！',
		"fr_dier": '你休想染指我的财宝！',
		"fr_aroncy": '让我助你一臂之力！',
		"fr_berg": '不过是镜花水月。',
		"fr_markn": '让我看看，你的未来...',
		"fr_morly": '在我的枪弹里洗个澡吧！',
		"fr_dog": '足智多谋？说的就是我！',
		"fr_glit": '以牙还牙，以眼还眼！',
		"fr_edmon": '我成功守住了。',
		"fr_mika": '在我的船上，没人能打败我！',
		"fr_dmoa": '聆听为你送行的音乐吧。',
		"fr_verb": '让我看看这里有什么？',
		"fr_taber": '看我发现了什么宝贝。',
		"fr_dragon": '你知道，惹怒一条龙的代价吗？',
		"fr_jgby": '在烈火中焚毁吧...',
		"fr_slen": '工于心计，善于谋划。',
		"fr_paers": '任务完成！',
		"fr_pluvia": '愿神治愈你！',
		"fr_ventus": '我要杀死你！',
		"fr_zenia": '倾听这一首为你演奏的终曲。',
		"fr_lamost": '我仍记得，昔日繁花...',
		"fr_fox": '不过是一场幻梦...',
		"fr_zeta": '这可是我的拿手武器。',
		"fr_ham": '哥哥，你该死了！',
		"fr_sam": '弟弟，你悔改罢。',
		'fr_tiger': '谁敢拦我？',
		'fr_kmjia': '一切交给你了...',
		"fr_liona": '全体将士，随我冲锋！',
		"fr_ala": '谁叫我打他的。<br>&nbsp&nbsp钱还没付呢！',
		"fr_wes": '吸血鬼的力量？<br>&nbsp&nbsp要我说，能用的都是好力量。',
		"fr_kesaya": '光明总会伴随着暗影。',
		"fr_milism": '一起游泳吧！',
		"fr_yas_klin": '死亡的恐怖，也不过如此。',
		"fr_bofeng": '雨，润养我心。',
		"fr_xiaomo": '我可刚学的擒拿术！',
		"fr_nanci": '主人，你喜欢我吗~',
		"fr_bladewolf": '糟糕！脑袋过热了。',
		"fr_sheep": '哥哥，你怎么又爆炸了。<br>&nbsp&nbsp下次要找个新借口了。',
		"fr_tails": 'TAILS GOT THROUGH!',
		"fr_ciyu": '风，随我前行。',
		"fr_delta": '别怕，死亡只是一瞬间的事情。',
		"fr_peter_likes": '控制不了自己的感觉，很难受吧！',
		"fr_yinhu": '神瑞降世，福泽世间。',
		"fr_terz": '对弈天地，洞察玄机。',
		"fr_jet": '让世界混乱起来吧！',
		"fr_knier": '你看见的，未必是真相。',
		"fr_kasaers": '不过是说说而已。',
		"fr_molis": '真没意思，<br>&nbsp&nbsp要回到什么时候呢？',
		"fr_shisan": '糟糕，又迷路了，不知龙族的同胞们在哪呢？',
		"fr_zhongyu": '这令人癫狂的火焰！<br>&nbsp&nbsp这令人沉寂的火焰...',
		'fr_qima': '项链又坏了，不知道要修多少钱...',
		'fr_francium': '晨昏明灭，皆是吾身。',
		"fr_muen": "我见过丛林里的野兽！",
		"fr_horn": "死亡，是最可口的美味。",
		"fr_yifeng": "本是星辰的我，竟然也会渴望晨曦。",
		"fr_hars": "还有我不知道的东西？<br>&nbsp&nbsp现在没有了。",
		"fr_telina": "我早就猜到你的下一步动作了。",
		"fr_oert": "让我带你走入轮回吧。",
		"fr_krikt": "师傅，我们刚刚找到的小孩呢？",
		"fr_miya": "你有看到我那不省心的徒弟吗？",
		"fr_lusiya": "只要这样，那样。<br>&nbsp&nbsp时光机成了！",
		"fr_lust": "位居高位，心系黎民。",
		"fr_tery": "世间变化之相，吾可欣然而往。",
		"fr_lens": "我看你是欠扁了！",
		"fr_yifa": "听说，我说的话都会成真？<br>&nbsp&nbsp那么，你肯定很喜欢我！",
		"fr_faers": "唯有永恒的安眠才是解脱。",
		"fr_fate": "我可玩倒闭过好几家赌场。",
		"fr_adward": "我是最邪恶的法师！<br>&nbsp&nbsp被我吓到了吧？",
		"fr_blam": '又一个剑下亡魂。',
		'fr_neises': '生与死轮回不止<br>&nbsp&nbsp我们生，他们死...'
		//'':'',
	};
	//成就列表
	lib.fr_achievement = {
		character: {
			'拆弹成功': {
				level: 7,
				info: '场上有一只刃狼，且其发动【融毁】时没有融毁标记。',
				extra: "好像有什么东西坏掉啦...",
				progress: 1,
			},
			'虚争空言，不如击而破之！': {
				level: 4,
				info: '使用德克连续使用4张【杀】，且为回合内使用的前四张牌',
				extra: "rua啊！(咆哮)",
				progress: 1,
			},
			'神仙难救': {
				level: 5,
				info: '使用让萨利，发动技能令另一名角色强制死亡，且发动时你没有手牌',
				extra: "啊！对不起，我的队友！",
				progress: 1,
			},
			'还不可以认输！': {
				level: 6,
				info: '使用希尔在一局游戏中累计脱离10次濒死状态',
				extra: '绝望中，仍存有一线生机！',
				progress: 1
			},
			'哈尔斯的高徒': {
				level: 7,
				info: '在二人对局中利用老朱然，在你的回合开始时场上存在0血僵尸（不为老周泰或你）',
				extra: '只有猛兽才能拿下的成就！',
				progress: 1
			},
			'人鱼狂流': {
				level: 6,
				info: '使用瑞斯特当内奸赢得一局身份局游戏',
				extra: '让大海将你们埋葬！',
				reward: function () {
					game.frAchi.unlockCharacter('fr_mouse')
				},
				rewardInfo: '奖励：解锁角色——缪斯',
				progress: 1
			},
			'压榨童工': {
				level: 5,
				info: '使用塔尔斯在一局内使得一名角色装备5张点数为8的装备',
				extra: '这也太累了...',
				reward: function () {
					game.frAchi.unlockCharacter('fr_zeta')
				},
				rewardInfo: '奖励：解锁角色——泽塔',
				progress: 1
			},
			'你在造假吗？': {
				level: 2,
				info: '装备一张点数为8的装备，但不是塔尔斯打造的。',
				extra: '不付专利费的，见一个炸一个！',
				progress: 1
			},
			"连破之刃": {
				level: 7,
				info: "使用米亚造成一次8点及以上的伤害。",
				extra: "一刀，一刀，一刀...",
				reward: function () {
					game.frAchi.unlockCharacter('fr_krikt')
				},
				rewardInfo: '奖励：解锁角色——科里科特',
				progress: 1
			},
			'天下归心': {
				level: 5,
				info: '使用努力亚作为主公进行一局八人及以上的军争局，并令存活的忠臣的数量大于游戏总人数的一半（向上取整）。',
				extra: '周公吐哺，天下归心。',
				reward: function () {
					game.frAchi.unlockCharacter('fr_francium')
				},
				rewardInfo: '奖励：解锁角色——弗兰西亚',
			},
			'链式反应': {
				level: 5,
				info: '使用刃狼对一名角色分配不少于15点伤害',
				extra: '核弹大爆炸~~~',
				reward: function () {
					game.frAchi.unlockCharacter('fr_tery')
				},
				rewardInfo: '奖励：解锁角色——特瑞',
			},
			'IQ:400': {
				level: 5,
				info: '使用塔尔斯的〖机动〗在一局游戏内，至少进行8次“谋弈”，且全部成功',
				extra: '哈哈，猜的真准！',
				progress: 1,
			},
			"当断则断": {
				level: 7,
				info: "使用檞界累计发动三次〖断破〗。",
				extra: "剑光如我，斩尽牛杂！",
				reward: function () {
					game.frAchi.unlockCharacter('fr_liona')
				},
				rewardInfo: '奖励：解锁角色——里欧那',
				progress: 3
			},
		},
		game: {
			"叠最厚的甲": {
				level: 4,
				info: "获得第9点护甲。",
				extra: "挨最毒的打",
				progress: 1
			},
			'叠甲是没有前途的': {
				level: 6,
				info: '使用【鸣鸿龙雀】令一名角色单次失去10点及以上的护甲。',
				extra: '喊什么喊，我敢杀你！',
				reward: function () {
					game.frAchi.unlockCharacter('fr_blam')
				},
				rewardInfo: '奖励：解锁角色——布兰',
				progress: 1
			},
			'看我一箭穿心！': {
				level: 3,
				info: '使用【霜月之弓】击杀一名角色。',
				extra: '因果循环，报应不爽。',
				progress: 1
			},
		},
		special: {
			"你真的很无聊": {
				level: 4,
				info: "你是没事可干了嘛？",
				reward: function () {
					game.frAchi.unlockCharacter('fr_zhan')
				},
				rewardInfo: '奖励：解锁角色——展',
				progress: 1
			},
			"黑客入侵": {
				level: 6,
				info: "这种事情不要啊~!",
				reward: function () {
					game.frAchi.unlockCharacter('fr_neises')
				},
				rewardInfo: '奖励：解锁角色——内瑟斯',
				extra: '真的只是测试木人而已...'
			},
			"感谢支持！": {
				level: 7,
				info: "谢谢你的支持嘞！",
				extra: '我们的QQ群是：556343851',
				reward: function () {
					game.frAchi.unlockCharacter('fr_yas_klin')
				},
				rewardInfo: '奖励：解锁角色——亚瑟克林',
				progress: 1,
			},
			"你会弹琴吗？": {
				level: 3,
				info: "使用忘弦琵琶弹奏小星星的前两句",
				extra: '谱子不会是网上找的罢...',
				progress: 1,
			},
		}
		/*
		"成就名称":{
			level:等级,
			type:类型,
			info:"达成条件",
			或
			info:function(){
				达成条件和复杂进度
			},
			extra:"附言",
			progress:function(isCheck){
				进度查询
			},
			或
			progress:达成需求次数,
		},
		*/
	};
	//本局内已完成的成就
	lib.fr_hasDoneAchievement = [
	];
	//关闭选择的皮肤
	lib.lockedSkin = {
		'fr_yifeng': '异界之花',
		'fr_jackson': "树影斑驳",
		'fr_molis': "碾碎时光",
		'fr_tiers': "战场蔷薇"
	}
	if(lib.config.extension_千幻聆音_enable){
		for (let name in lib.lockedSkin) {
			if (!lib.config[lib.lockedSkin[name] + '_unlock'] && lib.config.qhly_skinset.skin[name] && lib.config.qhly_skinset.skin[name] == lib.lockedSkin[name] + '.jpg') lib.config.qhly_skinset.skin[name] = null;
		}
	}
	lib.fr_achievementRewards = {
		10: {
			id: 'fr_thunder',
			name: '武将：兰德',
			info: '感受闪电的力量吧。<br>兰德，来自迦奈尔联邦，后来发现了其操纵闪电的能力。',
			type: 'character'
		},
		20: {
			id: 'fr_aoeslat',
			name: '武将：奥尔斯拉特',
			info: '这王国，谁不是我的子民？<br>奥尔斯拉特，克拉王国著名的暴君，后被卢森特推翻。',
			type: 'character'
		},
		15: {
			id: "碾碎时光",
			name: "皮肤：碾碎时光<br>品质：精品",
			info: "与你一起踏碎了时光...",
			type: "skin"
		},
		30: {
			id: 'fr_shark',
			name: '武将：沙克',
			info: '让我看看你的能力...<br>沙克，生活在人鱼之海，拥有特殊的能够盗取其他人力量的能力。',
			type: 'character'
		},
		40: {
			id: 'fr_ken',
			name: '武将：科恩',
			info: '让我保护你！<br>科恩，来自于迦奈尔联邦的机器人，与刃狼和西普等来自同一厂家。',
			type: 'character'
		},
		45: {
			id: '战场蔷薇',
			name: '皮肤：战场蔷薇<br>品质：精品',
			info: '我于杀戮之中盛放，亦如黎明中的花朵。',
			type: 'skin'
		},
		50: {
			id: 'fr_jiejie',
			name: '武将：檞界',
			info: lib.fr_winnerSay['fr_jiejie'],
			type: 'character'
		},
		60: {
			id: 'fr_crow',
			name: '武将：克劳',
			info: lib.fr_winnerSay['fr_crow'],
			type: 'character'
		},
		70: {
			id: "异界之花",
			name: "皮肤：异界之花<br>品质：传说",
			info: "花随风落，影随雨生",
			type: "skin"
		},
		80: {
			id: 'fr_wes',
			name: '武将：维斯',
			info: lib.fr_winnerSay['fr_wes'],
			type: 'character'
		},
		85: {
			id: '休闲时光',
			name: '皮肤：休闲时光<br>品质：史诗',
			info: '来休息一下吧！',
			type: 'skin'
		},
		90: {
			id: 'fr_muyada',
			name: '武将：慕达亚',
			info: lib.fr_winnerSay['fr_muyada'],
			type: 'character'
		},
		95: {
			id: '死亡降临',
			name: '皮肤：死亡降临<br>品质：传说',
			info: '感受沉重的死亡吧',
			type: 'skin'
		},
		100: {
			id: 'fr_muli',
			name: '武将：穆里',
			info: lib.fr_winnerSay['fr_muli'],
			type: 'character'
		},
		110: {
			id: 'fr_klif',
			name: '武将：克里夫',
			info: lib.fr_winnerSay['fr_klif'],
			type: 'character'
		},
		120: {
			id: '树影斑驳',
			name: '皮肤：树影斑驳<br>品质：史诗',
			info: '不是很强的武将...',
			type: 'skin'
		},
		130: {
			id: 'fr_ming',
			name: '武将：鸣',
			info: lib.fr_winnerSay['fr_ming'],
			type: 'character'
		},
		/* 获得奖励需要的点数:{
			id:'奖励的id' 用于储存是否获得该奖励
			name:'奖励名称',
			info:'奖励描述',
			type:'奖励类型' 目前支持character或skin
		} */
	};
	//胜利画面
	game.fr_winnerPlay = function (name, group) {
		var background = ui.create.div('.frw-background', document.body);
		var head = ui.create.div('.fr-winner-head');
		var biankuang = ui.create.div('.fr-winner-biankuang');
		head.setBackgroundImage('extension/福瑞拓展/image/character/' + name + '.jpg');
		background.appendChild(head);
		background.appendChild(biankuang);
		var text = ui.create.div('.fr-winner-text');
		var say = lib.fr_winnerSay[name];
		if (say) {
			text.innerHTML = say;
		}
		background.appendChild(text);
		var win = ui.create.div('.fr-win-text', background);
		win.setBackgroundImage('extension/福瑞拓展/image/others/victory.png')
		win.style['padding-bottom'] = '10px'
		text.style.color = 'yellow';
		background.animate('start');
		setTimeout(function () {
			var button = ui.create.div('.fr-win-close-button', background);
			button.innerHTML = "关闭";
			button.addEventListener('click', function () {
				background.delete();
			});
		}, 1000);
		if (lib.fr_hasDoneAchievement.length) {
			var hasDoneAchi = ui.create.div('.fr-achi-hasDone', background);
			let text2 = '本局达成的成就：';
			let list = lib.fr_hasDoneAchievement;
			for (let i = 0; i < list.length; i++) {
				let names = game.frAchi.ofName(list[i]);
				let info = game.frAchi.info(names[1], names[0]);
				if (info && info.name) {
					text2 += '<br>&ensp;〈' + info.name + '〉';
				} else {
					text2 += '<br>&ensp;〈' + names[1] + '〉';
				}
				if (i >= 4) break;
				if (list.length > 5 && i == 3) {
					text2 += '<br>&emsp;......';
					break;
				}
			}
			hasDoneAchi.innerHTML = text2;
		}
		return background;
	};
	var originGameOver = game.over;
	game.over = function (ret) {
		if (ret) {
			if (game.me && game.me.name && game.me.name.indexOf('fr_') == 0 && game.me.group) {
				try {
					game.frAchi.addProgress(lib.characterTitle[game.me.name], 'character');
					if (game.me.identity == 'nei' && (game.me.name == 'fr_rest' || game.me.name1 == 'fr_rest' || game.me.name2 == 'fr_rest') && !game.frAchi.hasAchi('人鱼狂流', 'character')) {
						game.frAchi.addProgress('人鱼狂流', 'character');
					}
				} catch (e) {
					console.log(e);
					game.print(e);
				}
				setTimeout(function () {
					game.fr_winnerPlay(game.me.name, game.me.group);
				}, 500);
			}
		}
		return originGameOver(ret);
	};
	//成就书
	if (!lib.config.frAchiStorage) {
		lib.config.frAchiStorage = {
			got: [],
			progress: {},
			date: {}
		};
		game.saveConfig('frAchiStorage', lib.config.frAchiStorage);
	}
	//初始化奖励
	if (!lib.config.achiReward) {
		lib.config.achiReward = {
			character: [],
			card: []
		}
		game.saveConfig('achiReward', lib.config.achiReward);
	}
	game.frAchi = {
		//初始化成就系统数据
		init: function () {
			if (this.inited) return;
			var furryPack = lib.characterPack.furryPack;
			if (furryPack) {
				var firstWinSet = function (name) {
					let level = 3;
					if (game.furryrank[0].contains(name)) {
						level = 5
					} else if (game.furryrank[1].contains(name)) {
						level = 4
					} else if (game.furryrank[2].contains(name)) {
						level = 3
					} else if (game.furryrank[3].contains(name)) {
						level = 2
					} else if (game.furryrank[4].contains(name)) {
						level = 1
					}
					let reward
					let rewardInfo
					switch (name) {
						case 'fr_pluvia': reward = function () { game.frAchi.unlockCharacter('fr_ventus') }; rewardInfo = '奖励：解锁角色——凡图斯'; break;
						case 'fr_nashu': reward = function () { game.frAchi.unlockCharacter('fr_rasali') }; rewardInfo = '奖励：解锁角色——让萨利'; break;
						case 'fr_sam': reward = function () { game.frAchi.unlockCharacter('fr_ham') }; rewardInfo = '奖励：解锁角色——海'; break;
						case 'fr_sheep': reward = function () { game.frAchi.unlockCharacter('fr_bladewolf') }; rewardInfo = '奖励：解锁角色——刃狼'; break;
						case 'fr_bofeng': reward = function () { game.frAchi.unlockCharacter('fr_ciyu') }; rewardInfo = '奖励：解锁角色——迟雨'; break;
						case 'fr_yifa': reward = function () { game.frAchi.unlockCharacter('fr_yifeng') }; rewardInfo = '奖励：解锁角色——弈风'; break;
						case 'fr_taber': reward = function () { game.frAchi.unlockCharacter('fr_verb') }; rewardInfo = '奖励：解锁角色——韦贝尔'; break;
						case 'fr_tiers': reward = function () { game.frAchi.unlockCharacter('fr_wore') }; rewardInfo = '奖励：解锁角色——沃尔'; break;
						case 'fr_francium': reward = function () { game.frAchi.unlockCharacter('fr_knier', 'fr_zenia') }; rewardInfo = '奖励：解锁角色——科妮尔、泽妮亚'; break;
						case 'fr_hars': reward = function () { game.frAchi.unlockCharacter('fr_jet', 'fr_yinhu') }; rewardInfo = '奖励：解锁角色——杰特、寅虎'; break;
						case 'fr_oert': reward = function () { game.frAchi.unlockCharacter('fr_faers') }; rewardInfo = '奖励：解锁角色——法斯'; break;
						case 'fr_lens': reward = function () { game.frAchi.unlockCharacter('fr_mala', 'fr_dier') }; rewardInfo = '奖励：解锁角色——马拉、戴尔'; break;
						case 'fr_lions': reward = function () { game.frAchi.unlockCharacter('fr_lamost', 'fr_lint', 'fr_muen') }; rewardInfo = '奖励：解锁角色——拉莫斯特、林特、牧恩'; break;
						case 'fr_yifeng': reward = function () { game.frAchi.unlockCard(['spade', "13", 'fr_equip1_syzg']) }; rewardInfo = '奖励：解锁新卡牌——霜月之弓'; break;
						case 'fr_tiger': reward = function () { game.frAchi.unlockCard(['heart', '10', 'fr_equip1_mhlq']) }; rewardInfo = '奖励：解锁新卡牌——鸣鸿龙雀'; break;
						case 'fr_qima': reward = function () { game.frAchi.unlockCard(['spade', '4', 'fr_equip2_yyxl']) }; rewardInfo = '奖励：解锁新卡牌——影夜项链'; break;
						case 'fr_liya': reward = function () { game.frAchi.unlockCard(['heart', "7", 'fr_equip5_wxpp']) }; rewardInfo = '奖励：解锁新卡牌——忘弦琵琶'; break;
					}
					if (!lib.characterPack.furryPack[name][4].contains('unseen')) {
						lib.fr_achievement['character'][lib.characterTitle[name]] = {
							name: lib.characterTitle[name],
							info: "使用" + lib.translate[name] + "获得一场胜利。",
							level: level,
							reward: reward,
							rewardInfo: rewardInfo,
							extra: lib.fr_winnerSay[name]
						};
					}
				};
				for (let name in furryPack) {
					if (!lib.characterTitle[name]) continue;
					if (!lib.translate[name]) continue;
					firstWinSet(name);
				}
			}
			if (!lib.config.frAchiNew) {
				this.reset();
				game.saveConfig('frAchiNew', true);
			}
			this.inited = true;
		},
		//保存存档文件
		saveToFile: function () {
			game.ensureDirectory('extension/福瑞拓展', function () {
				game.writeFile(JSON.stringify({
					frAchiStorage: lib.config.frAchiStorage,
					achiReward: lib.config.achiReward
				}), 'extension/福瑞拓展', 'save.json', function (err) {
					if (err) {
						console.log('成就存档保存错误:', err);
					} else {
						console.log('成就存档已保存');
					}
				});
			}, 'save.json');
		},
		getAll: function () {
			var types = new Set(['character', 'special', 'game']);
			for (var type of types) {
				var keys = Object.keys(lib.fr_achievement[type]);
				for (var key of keys) {
					var name = { 'character': 'c', 'game': 'g', 'special': 's' }[type] + ',' + key
					if (!this.hasAchi(name)) this.got(name);
				}
			}
			this.saveConfig()
		},
		//重置已获得
		reset: function () {
			lib.config.frAchiStorage = {
				got: [],
				progress: {},
				date: {}
			};
			lib.config.achiReward = {
				character: [],
				card: []
			}
			this.saveConfig();
		},
		//读取存档文件
		loadFromFile: function () {
			// 配置文件路径
			var configPath = 'extension/福瑞拓展/save.json';
			// 读取配置文件
			game.readFile(configPath, function (data) {
				try {
					// 解析配置文件内容
					var isBuffer = (data instanceof ArrayBuffer);
					if (isBuffer) {
						var decoder = new TextDecoder("UTF-8");
						var decodedData = decoder.decode(data);
						var config = JSON.parse(decodedData);
					} else {
						var config = JSON.parse(data);
					}
					// 将配置文件内容赋值给全局变量
					lib.config.frAchiStorage = config.frAchiStorage;
					lib.config.achiReward = config.achiReward;
					game.frAchi.saveConfig()
				} catch (err) {
					alert('未找到正确json文件，成就存档已重置');
					game.frAchi.reset()
				}
			}, function (err) {
				alert('未找到正确json文件，成就存档已重置');
				game.frAchi.reset()
			});
		},
		unlockCharacter: function () {
			var characters = Array.prototype.slice.call(arguments);
			var str = '已解锁新角色：'
			for (var i = 0; i < characters.length; i++) {
				if (!lib.config.achiReward.character.contains(characters[i])) {
					lib.config.achiReward.character.push(characters[i]);
					str += ' ' + get.translation(characters[i])
				}
			}
			alert(str)
			this.saveConfig()
		},
		unlockCard: function () {
			var cards = Array.prototype.slice.call(arguments);
			for (var i = 0; i < cards.length; i++) {
				if (!lib.config.achiReward.card.contains(cards[i])) {
					lib.config.achiReward.card.push(cards[i]);
				}
			}
			alert('已解锁新卡牌：' + get.translation(cards[0][2]))
			this.saveConfig();
		},
		//保存设置
		saveConfig: function () {
			game.saveConfig('frAchiStorage', lib.config.frAchiStorage);
			game.saveConfig('achiReward', lib.config.achiReward);
			this.saveToFile()
		},
		//计算成就数
		amount: function (type) {
			var types = ['character', 'game', 'special'];
			if (type) {
				if (!types.contains(type)) return -1;
				return Object.keys(lib.fr_achievement[type]).length;
			}
			var sum = 0;
			for (let i of types) {
				sum += Object.keys(lib.fr_achievement[i]).length;
			}
			return sum;
		},
		//计算成就分数
		calculateScore: function () {
			var gots = lib.config.frAchiStorage.got;
			if (!gots.length) return 0;
			var sum = 0;
			for (var i of gots) {
				let names = this.ofName(i);
				let info = this.info(names[1], names[0]);
				if (info && info.level) sum += info.level;
			}
			return sum;
		},
		//计算已完成成就数
		amountOfGained: function (type) {
			var gots = lib.config.frAchiStorage.got;
			if (type) {
				var type2 = { 'character': 'c', 'game': 'g', 'special': 's' }[type];
				if (type2) {
					var count = 0;
					for (let i of gots) {
						if (i.indexOf(type2) == 0) count++;
					}
					return count;
				}
				return -1;
			}
			return gots.length;
		},
		//获取成就队列、并按指定方式排序
		checkList: function (type, filter, sort) {
			var list = [];
			var map = lib.fr_achievement[type];
			if (map) {
				if (!filter) filter = function () {
					return true;
				};
				if (!sort) sort = function () {
					return game.frAchi.info(a).level - game.frAchi.info(b).level;
				};
				for (let name in map) {
					if (filter(name)) {
						list.push(name);
					}
				}
				list.sort(sort);
			}
			return list;
		},
		//加入本局已完成成就记录
		addDone: function (name) {
			lib.fr_hasDoneAchievement.add(name);
		},
		//弹出达成新成就的提示框
		popupDialog: function (name) {
			game.playAudio('..', 'extension', '福瑞拓展/audio/skill/other', 'achievement_complete.mp3');
			var list = this.ofName(name)
			let info = game.frAchi.info(list[1], list[0]);
			var dialog = ui.create.div('.fr-dialog-completeAchi', document.body);
			setTimeout(function () {
				dialog.delete();
			}, 2000);
			try {
				dialog.innerHTML = "<img src='" + lib.assetURL + "extension/福瑞拓展/image/achievement/star" + info.level + ".png' style='height:70%;'/>&nbsp;&nbsp;" + this.getInfoName(name);
			} catch (e) {
				return 'error';
			}
			return this.getInfoName(name);
		},
		reward: function (name) {
			var list = this.ofName(name)
			let info = game.frAchi.info(list[1], list[0]);
			if (info && info.reward) info.reward()
		},
		//达成新成就
		got: function (name) {
			if (lib.config.frAchiStorage.got.contains(name)) return;
			lib.config.frAchiStorage.got.push(name);
			var date = new Date();
			lib.config.frAchiStorage.date[name] = (new Date()).getTime();
			this.addDone(name);
			this.reward(name)
			this.popupDialog(name);
			this.saveConfig()
		},
		//增加成就进度
		addProgress: function (name, type) {
			var info = this.info(name, type);
			if (!info) return;
			var name2 = this.nameOf(name, type);
			if (!lib.config.frAchiStorage.progress[name2]) {
				lib.config.frAchiStorage.progress[name2] = 0;
			}
			lib.config.frAchiStorage.progress[name2]++;
			this.updataProgress(name, type);
		},
		//更新成就进度
		updataProgress: function (name, type) {
			var info = this.info(name, type);
			if (!info) return;
			var name2 = this.nameOf(name, type);
			if (info.progress) {
				if (typeof info.progress == 'number') {
					if (lib.config.frAchiStorage.progress[name2] >= info.progress) this.got(name2);
				} else if (typeof info.progress == 'function') {
					if (info.progress(true)) this.got(name2);
				}
			} else if (lib.config.frAchiStorage.progress[name2]) {
				this.got(name2);
			} else return;
			this.saveConfig();
		},
		//直接达成成就（不触发任何附属计算）
		directGot: function (name) {
			lib.config.frAchiStorage.got.add(name);
			this.saveConfig();
		},
		//判断成就是否已达成
		hasAchi: function (name, type) {
			if (typeof type == 'string') {
				let name2 = this.nameOf(name, type);
				return lib.config.frAchiStorage.got.contains(name2);
			}
			return lib.config.frAchiStorage.got.contains(name);
		},
		//获取成就信息
		info: function (name, type) {
			try {
				return lib.fr_achievement[type][name];
			} catch (e) {
				return null;
			}
		},
		//成就名存储转化
		nameOf: function (name, type) {
			return { 'character': 'c', 'game': 'g', 'special': 's' }[type] + ',' + name;
		},
		//成就名存储还原（返回值：[类别,成就名]）
		ofName: function (name) {
			var names = name.split(',', 2);
			return [
				{ 'c': 'character', 'g': 'game', 's': 'special' }[names[0]],
				names[1]
			];
		},
		//获得成就文本
		getInfoName: function (name) {
			var names = this.ofName(name);
			names[0] = { 'c': 'character', 'g': 'game', 's': 'special' }[names[0]];
			var info = this.info(names[1], names[0]);
			if (info && info.name) return info.name;
			return names[1];
		},
		//打开时空序录视窗
		openAchievementMainPage: function () {
			game.pause2();
			//覆盖图层
			var bookWindow = ui.create.div('.fr-bookWindow');
			document.body.appendChild(bookWindow);
			//背景图层
			var bk = ui.create.div('.fr-bookWindow-bk', bookWindow);
			var setSize = function () {
				var screenWidth = ui.window.offsetWidth;
				var screenHeight = ui.window.offsetHeight;
				var whr = 1.77778;
				var width;
				var height;
				if (screenWidth / whr > screenHeight) {
					height = screenHeight;
					width = height * whr;
				} else {
					width = screenWidth;
					height = screenWidth / whr;
				}
				bk.style.height = Math.round(height) + "px";
				bk.style.width = Math.round(width) + "px";
			};
			setSize();
			var resize = function () {
				setTimeout(setSize, 500);
			};
			lib.onresize.push(resize);
			//退出按钮
			var exit = ui.create.div('.fr-bookWindow-return', bk);
			lib.onresize.push(resize);
			exit.listen(function () {
				bookWindow.delete();
				game.resume2();
				lib.onresize.remove(resize);
				//game.playXwAudio('xwjh_voc_cjdianji',null,true);
			});
			//打开特殊成就
			var button_gotoSV = ui.create.div('.fr-bookWindow-openAchi-special', bk)
			button_gotoSV.listen(function () {
				bookWindow.delete();
				game.resume2();
				lib.onresize.remove(resize);
				game.frAchi.openAchievementView('special');
			});
			//打开对局成就
			var button_gotoGV = ui.create.div('.fr-bookWindow-openAchi-game', bk);
			button_gotoGV.listen(function () {
				bookWindow.delete();
				game.resume2();
				lib.onresize.remove(resize);
				game.frAchi.openAchievementView('game');
			});
			//打开人物成就
			var button_gotoCV = ui.create.div('.fr-bookWindow-openAchi-character', bk);
			button_gotoCV.listen(function () {
				bookWindow.delete();
				game.resume2();
				lib.onresize.remove(resize);
				game.frAchi.openAchievementView('character');
			});
			//显示已得成就分数
			var scoreSheet = ui.create.div('.fr-bookWindow-scoreSheet', ui.create.div('.fr-bookWindow-scoreSheet-bk', bk));
			scoreSheet.innerHTML = this.calculateScore();
			//打开成就奖励
			var button_reward = ui.create.div('.fr-bookWindow-openReward', bk);
			button_reward.listen(function () {
				// alert("这个卷轴居然是印上去的！？\n看来这个部分还没做完，以后再来看吧。");
				bookWindow.delete();
				game.resume2();
				lib.onresize.remove(resize);
				game.frAchi.openAchievementRewardsPage();
			});
		},
		//打开成就奖励视窗
		openAchievementRewardsPage: function () {
			game.pause2();
			//覆盖图层
			var rewardWindow = ui.create.div('.fr-achiWindow');
			document.body.appendChild(rewardWindow);
			//背景图层
			var bk = ui.create.div('.fr-achiWindow-bk', rewardWindow);
			var setSize = function () {
				var screenWidth = ui.window.offsetWidth;
				var screenHeight = ui.window.offsetHeight;
				var whr = 1.77778;
				var width;
				var height;
				if (screenWidth / whr > screenHeight) {
					height = screenHeight;
					width = height * whr;
				} else {
					width = screenWidth;
					height = screenWidth / whr;
				}
				bk.style.height = Math.round(height) + "px";
				bk.style.width = Math.round(width) + "px";
			};
			setSize();
			var resize = function () {
				setTimeout(setSize, 500);
			};
			//退出按钮
			var exit = ui.create.div('.fr-achiWindow-return', bk);
			lib.onresize.push(resize);
			exit.listen(function () {
				rewardWindow.delete();
				delete game.frAchi.hideLevel;
				delete game.frAchi.thisType;
				game.resume2();
				lib.onresize.remove(resize);
				game.frAchi.openAchievementMainPage();
				//game.playXwAudio('xwjh_voc_cjdianji',null,true);
			});
			//成就奖励书签
			ui.create.div('.fr-achiWindow-tips', bk).setBackgroundImage('extension/福瑞拓展/image/achievement/tips_reward.png');
			//显示已得成就分数
			var scoreText = ui.create.div('.fr-rewardWindow-score', bk);
			var score = this.calculateScore();
			scoreText.innerHTML = "成就总积分：" + score;
			//成就奖励进度图层
			var reward = ui.create.div('.fr-rewardWindow-reward', bk);
			reward.addEventListener('wheel', function (event) {
				event.preventDefault();
				reward.scrollLeft += event.deltaY;
				if (arrow) {
					if (reward.scrollLeft == 0) arrow.style.display = 'none';
					else arrow.style.display = 'inline';
				}
				if (arrow2) {
					if (Math.abs(reward.scrollLeft - reward.scrollWidth + reward.clientWidth) <= reward.clientWidth / 20) arrow2.style.display = 'none';
					else arrow2.style.display = 'inline';
				}
			});
			// lib.setScroll(reward);
			//进度条
			var max = Math.max(...Object.keys(lib.fr_achievementRewards));//目前支持的最大成就点数
			var interval = 0.3;//设置没两个框之间的间隔占奖励进度图层的横向百分比
			var progress = ui.create.div('.fr-rewardWindow-progress', reward);
			progress.style.width = max * interval * 10 + '%';
			if (max > score) {
				var progress2 = ui.create.div('.fr-rewardWindow-progress2', progress);
				progress2.style.width = (100 * (max - score) / max) + '%';
			}
			//好看的箭头
			var arrow = ui.create.div('.fr-rewardWindow-arrow', bk), arrow2 = ui.create.div('.fr-rewardWindow-arrow2', bk);
			//解锁星，框，领取
			for (var i = 10; i <= max; i += 5) {
				if (!lib.fr_achievementRewards[i]) continue;
				var star = ui.create.div('.fr-rewardWindow-lit', reward);
				star.style.left = i * interval * 10 - 3 + '%';
				var num = ui.create.div('.fr-rewardWindow-num', reward);
				num.style.left = i * interval * 10 - 3 + '%';
				num.innerHTML = i;
				var frame = ui.create.div('.fr-rewardWindow-frame', reward);
				frame.style.left = i * interval * 10 - 8 + '%';
				var item = lib.fr_achievementRewards[i];
				var rwd = ui.create.div('.fr-rewardWindow-rwd', frame);
				rwd.style.backgroundImage = "url('" + lib.assetURL + "extension/福瑞拓展/image/reward/reward_" + item.id + ".png')";
				var button = ui.create.div('.fr-rewardWindow-button', reward);
				button.style.left = i * interval * 10 - 6 + '%';
				var type = ui.create.div('.fr-rewardWindow-type', rwd)
				type.style.backgroundImage = "url('" + lib.assetURL + "extension/福瑞拓展/image/achievement/" + item.type + ".png')";
				rwd._item = item;
				button._item = item;
				//信息框
				var rwd_info = ui.create.div('.Fr-skilltip');
				rwd_info.style.transition = 'left 0s,top 0s,opacity .3s';
				rwd_info.style.width = '250px';
				rwd_info.style['pointer-events'] = 'none';
				rwd_info.style['text-align'] = 'left';
				rwd_info.style.animation = 'fadeShow .3s';
				rwd_info.style['-webkit-animation'] = 'fadeShow .3s';
				rwd_info.style['z-index'] = 10000;
				rwd_info.style['backgroundColor'] = '#241b1bd9';
				rwd_info.style['border'] = '#4f493f 3px solid';
				rwd_info.style['border-radius'] = '10px';
				rwd.onmouseover = function (event) {
					var item = this._item;
					if (item == undefined) return;
					var str = '';
					str += '<span style="font-family:shousha;"><span style="color:#bca979;font-size:18px;font-weight:600">'
						+ item.name + '</span><br>';
					str += item.info + '</span>';
					rwd_info.innerHTML = str;
					bk.appendChild(rwd_info);
					// rwd_info.hide();
					rwd_info.style.left = (event.clientX / game.documentZoom + 70 + document.body.scrollLeft) + 'px';
					rwd_info.style.top = (event.clientY / game.documentZoom + 60 + document.body.scrollTop) + 'px';
					if (rwd_info.offsetTop + rwd_info.offsetHeight > ui.window.offsetTop + ui.window.offsetHeight) {
						rwd_info.style.top = (event.clientY / game.documentZoom + document.body.scrollTop - rwd_info.offsetHeight) + 'px';
					};
					rwd_info.show();
				};
				rwd.onmousemove = function (event) {
					rwd_info.style.left = (event.clientX / game.documentZoom + 70 + document.body.scrollLeft) + 'px';
					rwd_info.style.top = (event.clientY / game.documentZoom + 60 + document.body.scrollTop) + 'px';
					if (rwd_info.offsetTop + rwd_info.offsetHeight > ui.window.offsetTop + ui.window.offsetHeight) {
						rwd_info.style.top = (event.clientY / game.documentZoom + document.body.scrollTop - rwd_info.offsetHeight) + 'px';
					};
				};
				rwd.onmouseout = function () {
					rwd_info.hide();
				};
				if (i <= score) {
					if ((item.type == 'character' && lib.config.achiReward.character.contains(item.id)) || (item.type == 'skin' && (lib.config[item.id + '_unlock'] == true))) button.style.backgroundImage = "url('" + lib.assetURL + "extension/福瑞拓展/image/achievement/received.png')";
					else {
						button.onclick = function () {
							if (this._item) {
								var item = this._item;
								this.style.backgroundImage = "url('" + lib.assetURL + "extension/福瑞拓展/image/achievement/received.png')";
								this.onclick = undefined;
								if (item.type == 'character') game.frAchi.unlockCharacter(item.id)
								if (item.type == 'skin') {
									game.saveConfig(item.id + '_unlock', true)
									alert('已领取皮肤：' + item.id)
								}
							} else alert('领取失败了，好像出了什么问题……')
						}
					}
				} else {
					star.style.backgroundImage = "url('" + lib.assetURL + "extension/福瑞拓展/image/achievement/unlit.png')";
					frame.style.filter = 'grayscale(100%)';
					rwd.style.filter = 'grayscale(100%)';
					button.style.filter = 'grayscale(100%)';
					var lock = ui.create.div('.fr-rewardWindow-lock', rwd);
				}
			}
		},
		//打开成就视窗
		openAchievementView: function (type) {
			if (!type) type = 'character';
			game.frAchi.thisType = type;
			game.pause2();
			game.frAchi.hideLevel = [];
			//覆盖图层
			var achiWindow = ui.create.div('.fr-achiWindow');
			document.body.appendChild(achiWindow);
			//背景图层
			var bk = ui.create.div('.fr-achiWindow-bk', achiWindow);
			var setSize = function () {
				var screenWidth = ui.window.offsetWidth;
				var screenHeight = ui.window.offsetHeight;
				var whr = 1.77778;
				var width;
				var height;
				if (screenWidth / whr > screenHeight) {
					height = screenHeight;
					width = height * whr;
				} else {
					width = screenWidth;
					height = screenWidth / whr;
				}
				bk.style.height = Math.round(height) + "px";
				bk.style.width = Math.round(width) + "px";
			};
			setSize();
			var resize = function () {
				setTimeout(setSize, 500);
			};
			//界面提示标签
			ui.create.div('.fr-achiWindow-tips', bk).setBackgroundImage('extension/福瑞拓展/image/achievement/tips_' + type + '.png');
			//退出按钮
			var exit = ui.create.div('.fr-achiWindow-return', bk);
			lib.onresize.push(resize);
			exit.listen(function () {
				achiWindow.delete();
				delete game.frAchi.hideLevel;
				delete game.frAchi.thisType;
				game.resume2();
				lib.onresize.remove(resize);
				game.frAchi.openAchievementMainPage();
				//game.playXwAudio('xwjh_voc_cjdianji',null,true);
			});
			//成就文本内容
			var content = ui.create.div('.fr-achiWindow-textinner', ui.create.div('.fr-achiWindow-text', bk));
			lib.setScroll(content);
			//函数方法
			var state = {
				hideGained: false,
				checkFilter: function (name) {
					var info = game.frAchi.info(name, game.frAchi.thisType);
					return !game.frAchi.hideLevel.contains(info.level);
				},
				changeFilter: function (num) {
					if ([1, 2, 3, 4, 5, 6, 7].contains(num)) {
						if (game.frAchi.hideLevel.contains(num)) {
							game.frAchi.hideLevel.remove(num);
							return false;
						} else if (game.frAchi.hideLevel.length < 7) {
							game.frAchi.hideLevel.push(num);
							return true;
						}
					}
					return undefined;
				},
				refreshList: function () {
					var list = Object.keys(lib.fr_achievement[game.frAchi.thisType]);
					for (let i = 0; i < list.length; i++) {
						if (this.checkFilter(list[i])) continue;
						list.splice(i--, 1);
					}
					var text = "";
					var isFirst = true;
					for (var name of list) {
						//首项不加分割线
						if (isFirst) {
							isFirst = false;
						} else {
							text += "<br><p align='center'><img src=" + lib.assetURL + "extension/福瑞拓展/image/achievement/splitLine.png></p><br>";
						}
						//<--
						let info = game.frAchi.info(name, game.frAchi.thisType);
						let name2 = game.frAchi.nameOf(name, game.frAchi.thisType);
						text += "<p style=\"min-height:100px;\">";
						//显示已完成
						if (lib.config.frAchiStorage.got.contains(name2)) {
							text += "<img src='" + lib.assetURL + "extension/福瑞拓展/image/achievement/isGained.png' style='height:60px;'/>";
						}
						//<--
						//显示成就名
						text += "<span style=\"color:black;font-family:行书szs;font-size:55px;\">&nbsp;";
						if (!info.name) {
							text += name;
						} else {
							text += info.name;
						}
						text += "</span>&nbsp;&nbsp;&nbsp;";
						//<--
						//显示成就等级
						text += "<img src='" + lib.assetURL + "extension/福瑞拓展/image/achievement/star" + info.level + ".png' style='height:50px;'>&nbsp;&nbsp;";
						//<--
						text += "&nbsp;&nbsp;&nbsp;";
						//显示达成时间
						if (lib.config.frAchiStorage.date[name2]) {
							text += "达成于 <font color=\"#FF4500\" size=\"2\">";
							let ts = lib.config.frAchiStorage.date[name2];
							text += (new Date(ts)).format("yyyy 年 MM 月 dd 日 hh:mm");
							text += "</font>";
						}
						//<--
						//显示成就达成需求
						if (typeof info.info == 'function') {
							text += info.info();
						} else {
							text += "<br><br><span style='font-size:22px;'>&nbsp;&nbsp;<b>◆";
							text += info.info;
							text += "</b></span>";
						}
						//<--
						//显示进度（如果未达成的话）
						if (!lib.config.frAchiStorage.got.contains(name2)) {
							if (!info.progress) {
								text += "（0/1）";
							} else {
								let pog = lib.config.frAchiStorage.progress[name2] || 0;
								text += '（' + pog + '/' + info.progress + '）';
							}
						}
						if (info.rewardInfo) {
							text += "<br>";
							text += "<br><span style='font-size:22px;font-family:得意黑;'>&nbsp;&nbsp;※";
							text += info.rewardInfo;
							text += "</span>";
						}
						//<--
						text += "<br>";
						//显示附言
						if (info.extra) {
							if (typeof info.extra == 'function') {
								text += info.extra();
							} else {
								text += "<br><span style='font-size:22px;'>&nbsp;&nbsp;";
								text += info.extra;
								text += "</span>";
							}
						}
						//<--
						text += '</p>';
					}
					text += "<br><br><br><br><br><br><br>";
					content.innerHTML = text;
				}
			};
			state.refreshList();
			//过滤器
			var filterButton = ui.create.div('.fr-achiWindow-openFilter', bk);
			filterButton.listen(function () {
				var filterWindow = ui.create.div('.fr-achiWindow-filterWindow', bk);
				var filterIn = ui.create.div('.fr-achiWindow-filterIn', filterWindow)
				var filterExit = ui.create.div('.fr-achiWindow-filterExit', filterWindow);
				filterExit.listen(function () {
					filterIn.delete();
					filterWindow.delete();
					state.refreshList();
				});
				//七星
				var hiden_lv7 = ui.create.div('.fr-achiWindow-filter-lv', filterIn);
				hiden_lv7.style.top = '150%'
				if (game.frAchi.hideLevel.contains(7)) {
					hiden_lv7.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
				}
				hiden_lv7.innerHTML = '<br><img src="' + lib.assetURL + 'extension/福瑞拓展/image/achievement/star7.png" style="height:50%;"/>&thinsp;显示七级成就&emsp;&thinsp;';
				hiden_lv7.listen(function () {
					if (game.frAchi.hideLevel.contains(7)) {
						game.frAchi.hideLevel.remove(7);
						hiden_lv7.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional.png');
					} else if (game.frAchi.hideLevel.length < 6) {
						game.frAchi.hideLevel.push(7);
						hiden_lv7.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
					}
					state.refreshList();
				});
				//六星
				var hiden_lv6 = ui.create.div('.fr-achiWindow-filter-lv', filterIn);
				hiden_lv6.style.top = '125%'
				if (game.frAchi.hideLevel.contains(6)) {
					hiden_lv6.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
				}
				hiden_lv6.innerHTML = '<br><img src="' + lib.assetURL + 'extension/福瑞拓展/image/achievement/star6.png" style="height:50%;"/>&thinsp;显示六级成就&emsp;&thinsp;';
				hiden_lv6.listen(function () {
					if (game.frAchi.hideLevel.contains(6)) {
						game.frAchi.hideLevel.remove(6);
						hiden_lv6.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional.png');
					} else if (game.frAchi.hideLevel.length < 6) {
						game.frAchi.hideLevel.push(6);
						hiden_lv6.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
					}
					state.refreshList();
				});
				//五星
				var hiden_lv5 = ui.create.div('.fr-achiWindow-filter-lv', filterIn);
				hiden_lv5.style.top = '100%'
				if (game.frAchi.hideLevel.contains(5)) {
					hiden_lv5.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
				}
				hiden_lv5.innerHTML = '<br><img src="' + lib.assetURL + 'extension/福瑞拓展/image/achievement/star5.png" style="height:50%;"/>&thinsp;显示五级成就&emsp;&thinsp;';
				hiden_lv5.listen(function () {
					if (game.frAchi.hideLevel.contains(5)) {
						game.frAchi.hideLevel.remove(5);
						hiden_lv5.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional.png');
					} else if (game.frAchi.hideLevel.length < 6) {
						game.frAchi.hideLevel.push(5);
						hiden_lv5.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
					}
					state.refreshList();
				});
				//四星
				var hiden_lv4 = ui.create.div('.fr-achiWindow-filter-lv', filterIn);
				hiden_lv4.style.top = '75%'
				if (game.frAchi.hideLevel.contains(4)) {
					hiden_lv4.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
				}
				hiden_lv4.innerHTML = '<br><img src="' + lib.assetURL + 'extension/福瑞拓展/image/achievement/star4.png" style="height:50%;"/>&thinsp;显示四级成就&emsp;&thinsp;';
				hiden_lv4.listen(function () {
					if (game.frAchi.hideLevel.contains(4)) {
						game.frAchi.hideLevel.remove(4);
						hiden_lv4.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional.png');
					} else if (game.frAchi.hideLevel.length < 6) {
						game.frAchi.hideLevel.push(4);
						hiden_lv4.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
					}
					state.refreshList();
				});
				//三星
				var hiden_lv3 = ui.create.div('.fr-achiWindow-filter-lv', filterIn);
				hiden_lv3.style.top = '50%'
				if (game.frAchi.hideLevel.contains(3)) {
					hiden_lv3.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
				}
				hiden_lv3.innerHTML = '<br><img src="' + lib.assetURL + 'extension/福瑞拓展/image/achievement/star3.png" style="height:50%;"/>&thinsp;显示三级成就&emsp;&thinsp;';
				hiden_lv3.listen(function () {
					if (game.frAchi.hideLevel.contains(3)) {
						game.frAchi.hideLevel.remove(3);
						hiden_lv3.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional.png');
					} else if (game.frAchi.hideLevel.length < 6) {
						game.frAchi.hideLevel.push(3);
						hiden_lv3.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
					}
					state.refreshList();
				});
				//两星
				var hiden_lv2 = ui.create.div('.fr-achiWindow-filter-lv', filterIn);
				hiden_lv2.style.top = '25%'
				if (game.frAchi.hideLevel.contains(2)) {
					hiden_lv2.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
				}
				hiden_lv2.innerHTML = '<img src="' + lib.assetURL + 'extension/福瑞拓展/image/achievement/star2.png" style="height:50%;"/>&thinsp;显示二级成就&emsp;&thinsp;';
				hiden_lv2.listen(function () {
					if (game.frAchi.hideLevel.contains(2)) {
						game.frAchi.hideLevel.remove(2);
						hiden_lv2.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional.png');
					} else if (game.frAchi.hideLevel.length < 6) {
						game.frAchi.hideLevel.push(2);
						hiden_lv2.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
					}
					state.refreshList();
				});
				//一星
				var hiden_lv1 = ui.create.div('.fr-achiWindow-filter-lv', filterIn);
				if (game.frAchi.hideLevel.contains(1)) {
					hiden_lv1.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
				}
				hiden_lv1.innerHTML = '<br><img src="' + lib.assetURL + 'extension/福瑞拓展/image/achievement/star1.png" style="height:50%;"/>&thinsp;显示一级成就&emsp;&thinsp;';
				hiden_lv1.listen(function () {
					if (game.frAchi.hideLevel.contains(1)) {
						game.frAchi.hideLevel.remove(1);
						hiden_lv1.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional.png');
					} else if (game.frAchi.hideLevel.length < 6) {
						game.frAchi.hideLevel.push(1);
						hiden_lv1.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
					}
					state.refreshList();
				});
			});
		}
	};
	//日期格式化方法
	Date.prototype.format = function (str) {
		var o = {
			"M+": this.getMonth() + 1,//月份
			"d+": this.getDate(),//日
			"h+": this.getHours(),//小时
			"m+": this.getMinutes(),//分
			"s+": this.getSeconds(),//秒
			"q+": Math.floor((this.getMonth() + 3) / 3),//季度
			"S": this.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(str)) str = str.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(str)) str = str.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return str;
	};
	//成就计量技能
	lib.skill["_fr_achi_连破之刃"] = {
		trigger: {
			source: "damageEnd",
		},
		firstDo: true,
		priority: 6,
		forced: true,
		popup: false,
		filter: function (event, player) {
			if (game.me != player) return false;
			if (game.frAchi.hasAchi('连破之刃', 'character')) return false;
			if (player.name != 'fr_miya' && player.name1 != 'fr_miya' && player.name2 != 'fr_miya') return false
			return event.num >= 8 && event.source == player
		},
		content: function () {
			game.frAchi.addProgress('连破之刃', 'character');
		}
	};
	lib.skill["_fr_achi_压榨童工"] = {
		trigger: {
			global: "equipAfter"
		},
		firstDo: true,
		priority: 6,
		forced: true,
		popup: false,
		filter: function (event, player) {
			if (game.me != player) return false;
			if (game.frAchi.hasAchi('压榨童工', 'character')) return false;
			if (player.name != 'fr_tails' && player.name1 != 'fr_tails' && player.name2 != 'fr_tails') return false
			return event.player.countCards('e', function (card) {
				return get.number(card) == 8
			}) >= 5
		},
		content: function () {
			game.frAchi.addProgress('压榨童工', 'character');
		}
	};
	lib.skill["_fr_achi_你在造假吗？"] = {
		trigger: {
			player: ["equipAfter"]
		},
		firstDo: true,
		priority: 6,
		forced: true,
		popup: false,
		filter: function (event, player) {
			if (game.me != player) return false;
			if (game.frAchi.hasAchi('你在造假吗？', 'character')) return false;
			return (!event.cards[0].storage.ownner || get.name(event.card.storage.ownner) != 'fr_tiers') && get.type(event.cards[0]) == 'equip' && get.number(event.cards[0]) == 8
		},
		content: function () {
			game.frAchi.addProgress('你在造假吗？', 'character');
		}
	};
	lib.skill["_fr_achi_还不可以认输！"] = {
		trigger: {
			player: "dyingAfter",
		},
		firstDo: true,
		priority: 6,
		forced: true,
		popup: false,
		filter: function (event, player) {
			if (game.me != player) return false;
			if (game.frAchi.hasAchi('你还不可以认输！', 'character')) return false;
			if (player.name != 'fr_sier' && player.name1 != 'fr_sier' && player.name2 != 'fr_sier') return false
			return player.isAlive()
		},
		content: function () {
			if (!player.storage.dying) player.storage.dying = 0
			player.storage.dying += 1
			if (player.storage.dying >= 10) game.frAchi.addProgress('还不可以认输！', 'character');
		},
	};
	lib.skill["_fr_achi_虚争空言，不如击而破之！"] = {
		trigger: {
			player: "useCardAfter",
		},
		firstDo: true,
		priority: 6,
		forced: true,
		popup: false,
		filter: function (event, player) {
			if (game.me != player) return false;
			if (game.frAchi.hasAchi('虚争空言，不如击而破之！', 'character')) return false;
			if (player.name != 'fr_derk' && player.name1 != 'fr_derk' && player.name2 != 'fr_derk') return false
			return player.countUsed('sha', true) == player.countUsed() && player.countUsed() == 4
		},
		content: function () {
			game.frAchi.addProgress('虚争空言，不如击而破之！', 'character');
		},
	};
	lib.skill["_fr_achi_叠最厚的甲"] = {
		trigger: { player: "changeHujiaAfter" },
		firstDo: true,
		priority: 6,
		forced: true,
		popup: false,
		filter: function (event, player) {
			if (game.me != player) return false;
			if (player.hujia < 9) return false;
			return !game.frAchi.hasAchi('叠最厚的甲', 'game');
		},
		content: function () {
			game.frAchi.addProgress('叠最厚的甲', 'game');
		}
	};
	lib.skill["_fr_achi_哈尔斯的高徒"] = {
		trigger: { player: "phaseBegin" },
		firstDo: true,
		priority: 6,
		forced: true,
		popup: false,
		filter: function (event, player) {
			if (game.me != player) return false;
			if (player.hujia < 9) return false;
			if (game.frAchi.hasAchi('哈尔斯的高徒', 'character')) return false
			if (game.me.next.name != 'old_zhuran') return false
			return game.hasPlayer(function (current) {
				return current != player && current.hp <= 0 && current.name != 'old_zhoutai' && current.name == 'old_zhuran'
			})
		},
		content: function () {
			game.frAchi.addProgress('哈尔斯的高徒', 'character');
		}
	};
	lib.skill["_fr_achi_黑客入侵"] = {
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		firstDo: true,
		priority: 6,
		forced: true,
		popup: false,
		filter: function (event, player) {
			if (game.me != player) return false;
			if (player.name != 'fr_neises' && player.name1 != 'fr_neises' && player.name2 != 'fr_neises') return false
			return !game.frAchi.hasAchi('黑客入侵', 'special');
		},
		content: function () {
			game.frAchi.addProgress('黑客入侵', 'special');
		}
	};
	//卡牌击杀成就的获得写在这里
	lib.skill['_fr_achi_killAchievement'] = {
		trigger: { source: "dieBefore" },
		firstDo: true,
		priority: 6.2,
		forced: true,
		popup: false,
		filter: function (event, player) {
			if (!player.isUnderControl(true)) return false;
			var list = [];
			if (!game.frAchi.hasAchi('看我一箭穿心！', 'game')) {
				var evt = event.getParent(4);
				if (evt.skill && evt.skill == 'sy_skill') {
					list.push(['看我一箭穿心！', 'game']);
				}
			}
			if (list.length) {
				event.nextAddAchi = list;
				return true;
			}
			return false;
		},
		content: function () {
			var list = trigger.nextAddAchi;
			if (list.length) {
				for (var i of list) {
					game.frAchi.addProgress(i[0], i[1]);
				}
			}
		}
	};
});
window.furry_import(function (lib, game, ui, get, ai, _status) {
	//胜利台词
	lib.fr_winnerSay = {
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
		"fr_markn": '',
		"fr_morly": '',
		"fr_dog": '足智多谋？说的就是我！',
		"fr_glit": '',
		"fr_edmon": '',
		"fr_mika": '',
		"fr_dmoa": '',
		"fr_verb": '',
		"fr_taber": '',
		"fr_dragon": '你知道，惹怒一条龙的代价吗？',
		"fr_jgby": '',
		"fr_slen": '工于心计，善于谋划。',
		"fr_paers": '',
		"fr_pluvia": '',
		"fr_ventus": '',
		"fr_zenia": '倾听这一首为你演奏的终曲。',
		"fr_lamost": '',
		"fr_fox": '不过是一场幻梦...',
		"fr_zeta": '',
		"fr_ham": '',
		"fr_sam": '',
		'fr_tiger,': '谁敢拦我？',
		'fr_kmjia': '一切交给你了...',
		"fr_liona": '全体将士，随我冲锋！',
		"fr_ala": '谁叫我打他的。<br>&nbsp&nbsp钱还没付呢！',
		"fr_wes": '',
		"fr_kesaya": '',
		"fr_milism": '',
		"fr_yas_klin": '',
		"fr_bofeng": '雨，润养我心。',
		"fr_xiaomo": '',
		"fr_nanci": '主人，你喜欢我吗~',
		"fr_bladewolf": '糟糕！脑袋过热了。',
		"fr_sheep": '哥哥，你怎么又爆炸了。<br>&nbsp&nbsp下次要找个新借口了。',
		"fr_tails": 'Tails got through.',
		"fr_ciyu": '风，随我前行。',
		"fr_delta": '',
		"fr_peter_likes": '控制不了自己的感觉，很难受吧！',
		"fr_yinhu": '神瑞降世，福泽世间。',
		"fr_terz": '对弈天地，洞察玄机。',
		"fr_jet": '',
		"fr_knier": '',
		"fr_kasaers": '',
		"fr_molis": '',
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
		//'':'',
	};
	//成就列表
	lib.fr_achievement = {
		character: {
			"连破之刃": {
				level: 3,
				info: "使用米亚造成一次8点及以上的伤害。",
				extra: "一刀，一刀，一刀...",
				progress: 1
			},
			"当断则断": {
				level: 2,
				info: "使用累计发动三次【断破】。",
				extra: "剑光如我，斩尽牛杂！",
				progress: 3
			},
		},
		game: {
			"叠最厚的甲": {
				level: 2,
				info: "获得第9点护甲。",
				extra: "挨最毒的打",
				progress: 1
			},
			'看我一箭穿心！': {
				level: 2,
				info: '使用【霜月之弓】击杀一名角色。',
				extra: '因果循环，报应不爽。',
				progress: 1
			}
		},
		special: {
			"隐藏成就": {
				level: 1,
				info: "真的是隐藏成就",
				extra: "你要信我啊",
				progress: 1
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
	game.frAchi = {
		//初始化成就系统数据
		init: function () {
			if (this.inited) return;
			var furryPack = lib.characterPack.furryPack;
			if (furryPack) {
				var firstWinSet = function (name) {
					let level = 1;
					switch (name) {
						case 'fr_lion':
						case 'fr_terz':
							level = 3;
							break;
					}
					lib.fr_achievement['character'][lib.characterTitle[name]] = {
						name: lib.characterTitle[name],
						info: "使用" + lib.translate[name] + "获得一场胜利。",
						level: level,
						extra: lib.fr_winnerSay[name]
					};
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
		//重置已获得
		reset: function () {
			lib.config.frAchiStorage = {
				got: [],
				progress: {},
				date: {}
			};
			this.saveConfig();
		},
		//保存设置
		saveConfig: function () {
			game.saveConfig('frAchiStorage', lib.config.frAchiStorage);
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
			var dialog = ui.create.div('.fr-dialog-completeAchi', document.body);
			setTimeout(function () {
				dialog.delete();
			}, 2000);
			try {
				dialog.innerHTML = this.getInfoName(name);
			} catch (e) {
				return 'error';
			}
			return dialog.innerHTML;
		},
		//达成新成就
		got: function (name) {
			if (lib.config.frAchiStorage.got.contains(name)) return;
			lib.config.frAchiStorage.got.push(name);
			var date = new Date();
			lib.config.frAchiStorage.date[name] = (new Date()).getTime();
			this.addDone(name);
			this.popupDialog(name);
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

			var button_reward = ui.create.div('.fr-bookWindow-openReward', bk);
			button_reward.listen(function () {
				alert("这个卷轴居然是印上去的！？\n看来这个部分还没做完，以后再来看吧。");
			});
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
					if ([1, 2, 3].contains(num)) {
						if (game.frAchi.hideLevel.contains(num)) {
							game.frAchi.hideLevel.remove(num);
							return false;
						} else if (game.frAchi.hideLevel.length < 3) {
							game.frAchi.hideLevel.push(num);
							return true;
						}
					}
					return undefined;
				},
				refreshList: function () {
					var list = Object.keys(lib.fr_achievement[game.frAchi.thisType]);
					var filter = function (name) {
						return !state.hideGained || !lib.config.frAchiStorage.got.contains(name);
					};
					for (let i = 0; i < list.length; i++) {
						if (this.checkFilter(list[i])) continue;
						if (state.hideGained && lib.config.frAchiStorage.got.contains(name)) continue;
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
						switch (info.level) {
							case 1: text += "<img src='" + lib.assetURL + "extension/福瑞拓展/image/achievement/star.png' style='height:50px;'/>&nbsp;&nbsp;"; break;
							case 2: text += "<img src='" + lib.assetURL + "extension/福瑞拓展/image/achievement/star2.png' style='height:50px;'/>&nbsp;&nbsp;"; break;
							case 3: text += "<img src='" + lib.assetURL + "extension/福瑞拓展/image/achievement/star3.png' style='height:50px;'/>&nbsp;&nbsp;"; break;
						}
						text += "&nbsp;&nbsp;&nbsp;";
						//<--
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
				var filterExit = ui.create.div('.fr-achiWindow-filterExit', filterWindow);
				filterExit.listen(function () {
					filterWindow.delete();
					state.refreshList();
				});
				var hiden_done = ui.create.div('.fr-achiWindow-filter-lv4', filterWindow);
				if (state.hideGained) {
					hiden_done.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
				}
				hiden_done.innerHTML = '<br><img src="' + lib.assetURL + 'extension/福瑞拓展/image/achievement/isGained2.png" style="height:30px;"/>&thinsp;显示完成成就&emsp;&thinsp;';
				hiden_done.listen(function () {
					state.hideGained = !state.hideGained;
					if (state.hideGained) {
						hiden_done.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
					} else {
						hiden_done.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional.png');
					}
				});
				var hiden_lv3 = ui.create.div('.fr-achiWindow-filter-lv3', filterWindow);
				if (game.frAchi.hideLevel.contains(3)) {
					hiden_lv3.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
				}
				hiden_lv3.innerHTML = '<br><img src="' + lib.assetURL + 'extension/福瑞拓展/image/achievement/star3.png" style="height:30px;"/>&thinsp;显示三星成就&emsp;&thinsp;';
				hiden_lv3.listen(function () {
					if (game.frAchi.hideLevel.contains(3)) {
						game.frAchi.hideLevel.remove(3);
						hiden_lv3.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional.png');
					} else if (game.frAchi.hideLevel.length < 2) {
						game.frAchi.hideLevel.push(3);
						hiden_lv3.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
					}
				});
				var hiden_lv2 = ui.create.div('.fr-achiWindow-filter-lv2', filterWindow);
				if (game.frAchi.hideLevel.contains(2)) {
					hiden_lv2.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
				}
				hiden_lv2.innerHTML = '<img src="' + lib.assetURL + 'extension/福瑞拓展/image/achievement/star2.png" style="height:30px;"/>&thinsp;显示二星成就&emsp;&thinsp;';
				hiden_lv2.listen(function () {
					if (game.frAchi.hideLevel.contains(2)) {
						game.frAchi.hideLevel.remove(2);
						hiden_lv2.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional.png');
					} else if (game.frAchi.hideLevel.length < 2) {
						game.frAchi.hideLevel.push(2);
						hiden_lv2.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
					}
				});
				var hiden_lv1 = ui.create.div('.fr-achiWindow-filter-lv1', filterWindow);
				if (game.frAchi.hideLevel.contains(1)) {
					hiden_lv1.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
				}
				hiden_lv1.innerHTML = '<br><img src="' + lib.assetURL + 'extension/福瑞拓展/image/achievement/star.png" style="height:30px;"/>&thinsp;显示一星成就&emsp;&thinsp;';
				hiden_lv1.listen(function () {
					if (game.frAchi.hideLevel.contains(1)) {
						game.frAchi.hideLevel.remove(1);
						hiden_lv1.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional.png');
					} else if (game.frAchi.hideLevel.length < 2) {
						game.frAchi.hideLevel.push(1);
						hiden_lv1.setBackgroundImage('extension/福瑞拓展/image/achievement/filter_optional_on.png');
					}
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
			global: "damageBefore"
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
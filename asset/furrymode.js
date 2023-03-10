'use strict';
game.import('mode',function (lib, game, ui, get, ai, _status) {
		return {
			name: 'furry_lib',
			game: {
				syncMenu: true,
				createview: function (node, charalist) {
					var player = ui.create.player(null, true);
					player.init(charalist[0][0]);
					player.style.float= 'left';
					player.style.left = '3%';
					player.style.top = '1%';
					player.style.width = '130px'
					player.style.height = '170px'
					player.style.cursor = 'pointer';
					player.style.position = 'absolute';
					player.node.count.remove();
					player.node.hp.remove();
					if (lib.config.frLutou) {
						player.node.avatar.style['height'] = '178px';
					} else {
						player.node.avatar.style['height'] = '170px';
					}
					player.style.transition = 'all 0.5s';
					node.appendChild(player);
					node.appendChild(player);
					node.playernode = player;

					var dialog = ui.create.dialog('hidden');
					dialog.style.left = "calc(6%+130px)";
					dialog.style.right="1%"
					dialog.style.top = "-1%";
					dialog.style.width = "calc(100% - 130px)";
					dialog.style.height = "auto";
					dialog.noopen = true;
					node.appendChild(dialog);
					dialog.addText('<div id="Cdetail" style="text-align:left;font-size:16px;width:calc(100% - 60px)">' + charalist[0][2] + '</br><span class="bluetext">角色介绍</span>：' + get.characterIntro(charalist[0][0]) + '</br>' + charalist[0][1]);

					var dialog1 = ui.create.dialog('hidden');
					dialog1.style.left = "0px";
					dialog1.style.top = "220px";
					dialog1.style.width = "100%";
					dialog1.style.height = "50%";
					dialog1.noopen = true;
					node.appendChild(dialog1);
					var tp = [];
					for (var i = 0; i < charalist.length; i++) {
						tp.push(charalist[i][0]);
					}
					dialog1.add([tp, 'character']);
					for (var i = 0; i < dialog1.buttons.length; i++) {
						dialog1.buttons[i].classList.add('noclick');
						dialog1.buttons[i].value = i;
						dialog1.buttons[i].onclick = function () {
							player.init(charalist[this.value][0]);
							document.getElementById("Cdetail").innerHTML = charalist[this.value][2] + '</br><span class="bluetext">角色介绍</span>：' + get.characterIntro(charalist[this.value][0]) + '</br>' + charalist[this.value][1];
						};
					}
				},
			},
			start: function () {
				ui.auto.hide();
				if (!lib.storage.scene) {
					lib.storage.scene = {};
				}
				if (!lib.storage.stage) {
					lib.storage.stage = {};
				}
				if (!_status.extensionmade) {
					_status.extensionmade = [];
				}
				if (_status.extensionscene) {
					game.save('scene', lib.storage.scene);
				}
				if (_status.extensionstage) {
					game.save('stage', lib.storage.stage);
				}
				var dialog = ui.create.dialog('hidden');
				dialog.classList.add('fixed');
				dialog.classList.add('scroll1');
				dialog.classList.add('scroll2');
				dialog.classList.add('fullwidth');
				dialog.classList.add('fullheight');
				dialog.classList.add('noupdate');
				dialog.classList.add('character');
				dialog.contentContainer.style.overflow = 'visible';
				dialog.style.overflow = 'scroll';
				dialog.content.style.height = '100%';
				dialog.contentContainer.style.transition = 'all 0s';
				if (!lib.storage.directStage) dialog.open();
				var packnode = ui.create.div('.packnode', dialog);
				lib.setScroll(packnode);
				ui.background.setBackgroundImage('extension/福瑞拓展/image/background/fire_dance.png');
				//背景
				var clickCapt = function () {
					var active = this.parentNode.querySelector('.active');
					if (this.link == 'stage') {
						if (get.is.empty(lib.storage.scene)) {
							alert('请创建至少1个场景');
							return;
						}
					}
					if (active) {
						if (active == this) return;
						for (var i = 0; i < active.nodes.length; i++) {
							active.nodes[i].remove();
							if (active.nodes[i].showcaseinterval) {
								clearInterval(active.nodes[i].showcaseinterval);
								delete active.nodes[i].showcaseinterval;
							}
						}
						active.classList.remove('active');
					}
					this.classList.add('active');
					for (var i = 0; i < this.nodes.length; i++) {
						dialog.content.appendChild(this.nodes[i]);
					}
					var showcase = this.nodes[this.nodes.length - 1];
					showcase.style.height = (dialog.content.offsetHeight - showcase.offsetTop) + 'px';
					if (typeof showcase.action == 'function') {
						if (showcase.action(showcase._showcased ? false : true) !== false) {
							showcase._showcased = true;
						}
					}
					if (this._nostart) start.style.display = 'none';
					else start.style.display = '';
					game.save('currentBrawl', 'help');
				}
				// 应该是这里是制作列表的地方
				var createNode = function (name) {
					var info = lib.brawl[name];
					var node = ui.create.div('.dialogbutton.menubutton.large', info.name, packnode, clickCapt);
					node.style.transition = 'all 0s';
					var caption = info.name;
					var modeinfo = '';
					if (info.mode) {
						modeinfo = get.translation(info.mode) + '模式';	// 这个是标注哪个模式下使用的
					}
					if (info.submode) {
						if (modeinfo) {
							modeinfo += ' - ';
						}
						modeinfo += info.submode;
					}
					var intro;
					if (Array.isArray(info.intro)) {
						intro = '<ul style="text-align:left;margin-top:10">';
						if (modeinfo) {
							intro += '<li>' + modeinfo;
						}
						for (var i = 0; i < info.intro.length; i++) {
							intro += '<br>' + info.intro[i];
						}
					}
					else {
						intro = '';
						if (modeinfo) {
							intro += '（' + modeinfo + '）';
						}
						intro += info.intro;
					}
					var today = new Date();
					var i = ui.create.div('.text center', intro);
					i.style.overflow = 'scroll';
					i.style.margin = '0px';
					i.style.padding = '0px';
					var showcase = ui.create.div();
					showcase.style.margin = '0px';
					showcase.style.padding = '0px';
					showcase.style.width = '100%';
					showcase.style.display = 'block'
					showcase.style.overflow = 'scroll';
					showcase.action = info.showcase;
					showcase.link = name;
					if (info.fullshow) {
						node.nodes = [showcase];
						showcase.style.height = '100%';
					}
					else {
						node.nodes = [
							i,
							showcase,
						];
					}
					node.link = name;
					node._nostart = info.nostart;
					if (lib.storage.currentBrawl == name) {
						clickCapt.call(node);
					}
					return node;
				}
				// 点那个巨大的“斗”之后
				var clickStart = function () {
					dialog.delete();
					ui.auto.show();
					game.switchMode('identity');
				};
				// 制作那个“斗”的键的。去掉会出bug，不知道为什么
				var start = ui.create.div('.menubutton.round.highlight', '←', dialog.content, clickStart);
				start.style.position = 'absolute';
				start.style.left = '-100px';
				start.style.right = 'auto';
				start.style.top = 'auto';
				start.style.bottom = '10px';
				start.style.width = '80px';
				start.style.height = '80px';
				start.style.lineHeight = '80px';
				start.style.margin = '0';
				start.style.padding = '5px';
				start.style.fontSize = '72px';
				start.style.zIndex = 3;
				start.style.transition = 'all 0s';
				start.hide();
				game.addScene = function (name, clear) {
					var scene = lib.storage.scene[name];
					var brawl = {
						name: name,
						intro: scene.intro,
					};
					for (var i in lib.brawl.scene.template) {
						brawl[i] = get.copy(lib.brawl.scene.template[i]);
					}
					if (!scene.gameDraw) {
						brawl.content.noGameDraw = true;
					}
					brawl.content.scene = scene;
					lib.brawl['scene_' + name] = brawl;
					var node = createNode('scene_' + name);
					if (clear) {
						game.addSceneClear();
						clickCapt.call(node);
						_status.sceneChanged = true;
					}
				};
				game.addStage = function (name, clear) {
					var stage = lib.storage.stage[name];
					var brawl = {
						name: name,
						intro: stage.intro,
						content: {}
					};
					for (var i in lib.brawl.stage.template) {
						brawl[i] = get.copy(lib.brawl.stage.template[i]);
					}
					brawl.content.stage = stage;
					lib.brawl['stage_' + name] = brawl;
					var node = createNode('stage_' + name);
					if (clear) {
						game.addStageClear();
						clickCapt.call(node);
					}
				}
				game.removeScene = function (name) {
					delete lib.storage.scene[name];
					game.save('scene', lib.storage.scene);
					_status.sceneChanged = true;
					for (var i = 0; i < packnode.childElementCount; i++) {
						if (packnode.childNodes[i].link == 'scene_' + name) {
							if (packnode.childNodes[i].classList.contains('active')) {
								for (var j = 0; j < packnode.childElementCount; j++) {
									if (packnode.childNodes[j].link == 'scene') {
										clickCapt.call(packnode.childNodes[j]);
									}
								}
							}
							packnode.childNodes[i].remove();
							break;
						}
					}
				}
				game.removeStage = function (name) {
					delete lib.storage.stage[name];
					game.save('stage', lib.storage.stage);
					for (var i = 0; i < packnode.childElementCount; i++) {
						if (packnode.childNodes[i].link == 'stage_' + name) {
							if (packnode.childNodes[i].classList.contains('active')) {
								for (var j = 0; j < packnode.childElementCount; j++) {
									if (get.is.empty(lib.storage.scene)) {
										if (packnode.childNodes[j].link == 'scene') {
											clickCapt.call(packnode.childNodes[j]);
										}
									}
									else {
										if (packnode.childNodes[j].link == 'stage') {
											clickCapt.call(packnode.childNodes[j]);
										}
									}
								}
							}
							packnode.childNodes[i].remove();
							break;
						}
					}
				}
				var sceneNode;
				for (var i in lib.brawl) {
					if (get.config(i) === false) continue;
					if (i == 'scene') {
						sceneNode = createNode(i);
					}
					else {
						createNode(i);
					}
				}
				if (sceneNode) {
					game.switchScene = function () {
						clickCapt.call(sceneNode);
					}
				}
				for (var i in lib.storage.scene) {
					game.addScene(i);
				}
				for (var i in lib.storage.stage) {
					game.addStage(i);
				}
				if (!lib.storage.currentBrawl) {
					clickCapt.call(packnode.firstChild);
				}
				game.save('lastStage');
				if (lib.storage.directStage) {
					var directStage = lib.storage.directStage;
					game.save('directStage');
					clickStart(directStage);
				}
				lib.init.onfree();
			},
			brawl: {
				jianaierview: {
					name: '迦奈尔',
					mode: '',
					intro: [],
					showcase: function (init) {
						var node = this;
						if (init) {
							var charalist = [
								['fr_wore',
									'</br><span class="bluetext">关联角色</span>：缇尔斯<br><span class="bluetext">角色分析</span>：超级左慈。',
									'进攻：' + game.frStars(2) + ' 爆发：' + game.frStars(3) +
									' </br>运气：' + game.frStars(5) + ' 生存：' + game.frStars(2) +
									' </br>控制：' + game.frStars(2) + ' 辅助：' + game.frStars(2) +
									'</br>谋略：' + game.frStars(4) + ' 综合：' + game.frStars(4) + ' </br>'],
								['fr_tiers',
									'</br><span class="bluetext">关联角色</span>：沃尔<br>',
									'进攻：' + game.frStars(5) + ' 爆发：' + game.frStars(6) +
									' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(3) +
									' </br>控制：' + game.frStars(0) + ' 辅助：' + game.frStars(0) +
									'</br>谋略：' + game.frStars(1) + ' 综合：' + game.frStars(3) + ' </br>'],
								['fr_tery',
									'</br><span class="bluetext">关联角色</span>：无<br>',
									'进攻：' + game.frStars(2) + ' 爆发：' + game.frStars(2) +
									' </br>运气：' + game.frStars(2) + ' 生存：' + game.frStars(3) +
									' </br>控制：' + game.frStars(0) + ' 辅助：' + game.frStars(2) +
									'</br>谋略：' + game.frStars(5) + ' 综合：' + game.frStars(5) + ' </br>'],
							];
							lib.game.createview(node, charalist);
						}
					},
				},
				wanlingview: {
					name: '万灵之森',
					mode: '',
					intro: [],
					showcase: function (init) {
						var node = this;
						if (init) {
							var charalist = [
								['fr_yifeng',
									'</br><span class="bluetext">关联角色</span>：弈法<br>',
									'进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
									' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(3) +
									' </br>控制：' + game.frStars(5) + ' 辅助：' + game.frStars(5) +
									'</br>谋略：' + game.frStars(3) + ' 综合：' + game.frStars(4) + ' </br>'],
								['fr_yifa',
									'</br><span class="bluetext">关联角色</span>：弈风<br>',
									'进攻：' + game.frStars(4) + ' 爆发：' + game.frStars(4) +
									' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(4) +
									' </br>控制：' + game.frStars(2) + ' 辅助：' + game.frStars(2) +
									'</br>谋略：' + game.frStars(3) + ' 综合：' + game.frStars(5) + ' </br>'],
								['fr_telina',
									'</br><span class="bluetext">关联角色</span>：无<br>',
									'进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
									' </br>运气：' + game.frStars(5) + ' 生存：' + game.frStars(2) +
									' </br>控制：' + game.frStars(2) + ' 辅助：' + game.frStars(0) +
									'</br>谋略：' + game.frStars(3) + ' 综合：' + game.frStars(3) + ' </br>'],
							];
							lib.game.createview(node, charalist);
						}
					},
				},
				kelaview: {
					name: '克拉',
					mode: '',
					intro: [],
					showcase: function (init) {
						var node = this;
						if (init) {
							var charalist = [
								['fr_wes',
									'</br><span class="bluetext">关联角色</span>：米里森<br>',
									'进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
									' </br>运气：' + game.frStars(5) + ' 生存：' + game.frStars(3) +
									' </br>控制：' + game.frStars(1) + ' 辅助：' + game.frStars(6) +
									'</br>谋略：' + game.frStars(2) + ' 综合：' + game.frStars(4) + ' </br>'],
								['fr_muyada',
									'</br><span class="bluetext">关联角色</span>：流亡者佣兵团角色<br>',
									'进攻：' + game.frStars(4) + ' 爆发：' + game.frStars(2) +
									' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(3) +
									' </br>控制：' + game.frStars(5) + ' 辅助：' + game.frStars(0) +
									'</br>谋略：' + game.frStars(2) + ' 综合：' + game.frStars(3) + ' </br>'],
								['fr_yada',
									'</br><span class="bluetext">关联角色</span>：来自坷拉的兽人<br>',
									'进攻：' + game.frStars(2) + ' 爆发：' + game.frStars(0) +
									' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(2) +
									' </br>控制：' + game.frStars(4) + ' 辅助：' + game.frStars(3) +
									'</br>谋略：' + game.frStars(3) + ' 综合：' + game.frStars(3) + ' </br>'],
								['fr_fate',
									'</br><span class="bluetext">关联角色</span>：米亚<br>',
									'进攻：' + game.frStars(3) + ' 爆发：' + game.frStars(1) +
									' </br>运气：' + game.frStars(6) + ' 生存：' + game.frStars(4) +
									' </br>控制：' + game.frStars(0) + ' 辅助：' + game.frStars(0) +
									'</br>谋略：' + game.frStars(4) + ' 综合：' + game.frStars(4) + ' </br>'],
								['fr_liya',
									'</br><span class="bluetext">关联角色</span>：卢森特<br>',
									'进攻：' + game.frStars(3) + ' 爆发：' + game.frStars(0) +
									' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(3) +
									' </br>控制：' + game.frStars(4) + ' 辅助：' + game.frStars(0) +
									'</br>谋略：' + game.frStars(2) + ' 综合：' + game.frStars(3) + ' </br>'],
								['fr_sam',
									'</br><span class="bluetext">关联角色</span>：海<br>',
									'进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
									' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(6) +
									' </br>控制：' + game.frStars(3) + ' 辅助：' + game.frStars(5) +
									'</br>谋略：' + game.frStars(2) + ' 综合：' + game.frStars(5) + ' </br>'],
								['fr_ham',
									'</br><span class="bluetext">关联角色</span>：山<br>',
									'进攻：' + game.frStars(5) + ' 爆发：' + game.frStars(5) +
									' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(2) +
									' </br>控制：' + game.frStars(3) + ' 辅助：' + game.frStars(0) +
									'</br>谋略：' + game.frStars(4) + ' 综合：' + game.frStars(5) + ' </br>'],
							];
							lib.game.createview(node, charalist);
						}
					},
				},
				yongbingview: {
					name: '佣兵团',
					mode: '',
					intro: [],
					showcase: function (init) {
						var node = this;
						if (init) {
							var charalist = [
								['fr_sisk',
									'</br><span class="bluetext">关联角色</span>：流亡者佣兵团角色<br>',
									'进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
									' </br>运气：' + game.frStars(5) + ' 生存：' + game.frStars(3) +
									' </br>控制：' + game.frStars(1) + ' 辅助：' + game.frStars(6) +
									'</br>谋略：' + game.frStars(2) + ' 综合：' + game.frStars(4) + ' </br>'],
								['fr_kersm',
									'</br><span class="bluetext">关联角色</span>：流亡者佣兵团角色<br>',
									'进攻：' + game.frStars(4) + ' 爆发：' + game.frStars(2) +
									' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(2) +
									' </br>控制：' + game.frStars(3) + ' 辅助：' + game.frStars(4) +
									'</br>谋略：' + game.frStars(2) + ' 综合：' + game.frStars(3) + ' </br>'],
								['fr_yada',
									'</br><span class="bluetext">关联角色</span>：流亡者佣兵团角色<br>',
									'进攻：' + game.frStars(2) + ' 爆发：' + game.frStars(0) +
									' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(2) +
									' </br>控制：' + game.frStars(4) + ' 辅助：' + game.frStars(3) +
									'</br>谋略：' + game.frStars(3) + ' 综合：' + game.frStars(3) + ' </br>'],
							];
							lib.game.createview(node, charalist);
						}
					},
				},
				schoolview: {
					name: '魔法学院',
					mode: '',
					intro: [],
					showcase: function (init) {
						var node = this;
						if (init) {
							var charalist = [
								['fr_milism',
									'</br><span class="bluetext">关联角色</span>：无<br>',
									'进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
									' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(0) +
									' </br>控制：' + game.frStars(5) + ' 辅助：' + game.frStars(5) +
									'</br>谋略：' + game.frStars(3) + ' 综合：' + game.frStars(4) + ' </br>'],
								['fr_lusiya',
									'</br><span class="bluetext">关联角色</span>：流亡者佣兵团角色<br>',
									'进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
									' </br>运气：' + game.frStars(3) + ' 生存：' + game.frStars(3) +
									' </br>控制：' + game.frStars(2) + ' 辅助：' + game.frStars(4) +
									'</br>谋略：' + game.frStars(5) + ' 综合：' + game.frStars(5) + ' </br>'],
							];
							lib.game.createview(node, charalist);
						}
					},
				},
				godview: {
					name: '兽人之神',
					mode: '',
					intro: [],
					showcase: function (init) {
						var node = this;
						if (init) {
							var charalist = [
								['fr_hars',
									'</br><span class="bluetext">关联角色</span>：所有兽人<br>',
									'进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
									' </br>运气：' + game.frStars(2) + ' 生存：' + game.frStars(2) +
									' </br>控制：' + game.frStars(6) + ' 辅助：' + game.frStars(3) +
									'</br>谋略：' + game.frStars(3) + ' 综合：' + game.frStars(4) + ' </br>'],
								['fr_faers',
									'</br><span class="bluetext">关联角色</span>：所有兽人<br>',
									'进攻：' + game.frStars(4) + ' 爆发：' + game.frStars(4) +
									' </br>运气：' + game.frStars(4) + ' 生存：' + game.frStars(4) +
									' </br>控制：' + game.frStars(0) + ' 辅助：' + game.frStars(0) +
									'</br>谋略：' + game.frStars(3) + ' 综合：' + game.frStars(5) + ' </br>'],
								['fr_oert',
									'</br><span class="bluetext">关联角色</span>：所有兽人<br>',
									'进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
									' </br>运气：' + game.frStars(6) + ' 生存：' + game.frStars(3) +
									' </br>控制：' + game.frStars(5) + ' 辅助：' + game.frStars(0) +
									'</br>谋略：' + game.frStars(0) + ' 综合：' + game.frStars(3) + ' </br>'],
							];
							lib.game.createview(node, charalist);
						}
					},
				},
				travelerview: {
					name: '游荡者',
					mode: '',
					intro: [],
					showcase: function (init) {
						var node = this;
						if (init) {
							var charalist = [
								['fr_miya',
									'</br><span class="bluetext">关联角色</span>：科里科特<br>',
									'进攻：' + game.frStars(4) + ' 爆发：' + game.frStars(6) +
									' </br>运气：' + game.frStars(5) + ' 生存：' + game.frStars(0) +
									' </br>控制：' + game.frStars(0) + ' 辅助：' + game.frStars(0) +
									'</br>谋略：' + game.frStars(1) + ' 综合：' + game.frStars(5) + ' </br>'],
								['fr_krikt',
									'</br><span class="bluetext">关联角色</span>：米亚<br>',
									'进攻：' + game.frStars(4) + ' 爆发：' + game.frStars(4) +
									' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(3) +
									' </br>控制：' + game.frStars(3) + ' 辅助：' + game.frStars(0) +
									'</br>谋略：' + game.frStars(1) + ' 综合：' + game.frStars(5) + ' </br>'],
								['fr_laays',
									'</br><span class="bluetext">关联角色</span>：无<br>',
									'进攻：' + game.frStars(0) + ' 爆发：' + game.frStars(0) +
									' </br>运气：' + game.frStars(0) + ' 生存：' + game.frStars(0) +
									' </br>控制：' + game.frStars(0) + ' 辅助：' + game.frStars(5) +
									'</br>谋略：' + game.frStars(3) + ' 综合：' + game.frStars(3) + ' </br>'],
							];
							lib.game.createview(node, charalist);
						}
					},
				},
				fishview: {
					name: '人鱼之海',
					mode: '',
					intro: [],
					showcase: function (init) {
						var node = this;
						if (init) {
							var charalist = [
								['fr_rest',
									'</br><span class="bluetext">关联角色</span>：科里科特<br>',
									'进攻：' + game.frStars(3) + ' 爆发：' + game.frStars(0) +
									' </br>运气：' + game.frStars(2) + ' 生存：' + game.frStars(3) +
									' </br>控制：' + game.frStars(3) + ' 辅助：' + game.frStars(2) +
									'</br>谋略：' + game.frStars(5) + ' 综合：' + game.frStars(4) + ' </br>'],
							];
							lib.game.createview(node, charalist);
						}
					},
				}
			}
		};
	});

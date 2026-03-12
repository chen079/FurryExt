window.furry.frImport(function (lib, game, ui, get, ai, _status) {
	//-----------------------------魔力-------------------------------//
	//代码来自：玄武江湖
	lib.element.player.changefrMp = function (num) {
		var next = game.createEvent('changefrMp', false);
		next.num = num;
		next.player = this;
		next.setContent(function () {
			game.createfrMpBar(player);
			if (num == 0) return;
			player.storage.frMp += num;
			if (isNaN(player.storage.frMp) || player.storage.frMp < 0) player.storage.frMp = 0;
			if (player.storage.frMp > player.storage.frMaxMp) player.storage.frMp = player.storage.frMaxMp;
			var button = player.node.frMp;
			if (!button) return;
			button.innerHTML = player.frMp + '/' + player.frMaxMp;
			if (player.frMaxMp > 0) {
				player.node.frMp.show();
				player.node.frMpIcon.show();
			} else {
				player.node.frMp.hide();
				player.node.frMpIcon.hide();
			}
			event.trigger('changefrMp');
		});
		return next;
	};
	lib.element.player.losefrMp = function (num) {
		var next = game.createEvent('losefrMp');
		if (num <= 0) {
			num = 0;
		}
		if (num > this.frMp) {
			num = this.frMp;
		}
		next.num = num;
		next.player = this;
		if (next.num == undefined) next.num = 1;
		next.setContent(function () {
			'step 0'
			if (num <= 0) {
				num = 0;
			}
			if (num > player.frMp) {
				num = player.frMp;
			}
			'step 1'
			if (num > 0) {
				game.log(player, '失去了' + get.cnNumber(num) + '点魔力');
				player.changefrMp(-num);
			}
			event.num = num;
		});
		if (num <= 0) {
			_status.event.next.remove(next);
		}
		return next;
	};
	lib.element.player.gainfrMp = function (num) {
		var next = game.createEvent('gainfrMp');
		if (num < 0) {
			num = 0;
		}
		if (this.frMp + num > this.frMaxMp) {
			num = this.frMaxMp - this.frMp;
		}
		next.num = num;
		next.player = this;
		if (next.num == undefined) next.num = 1;
		next.setContent(function () {
			'step 0'
			if (num < 0) {
				num = 0;
				event.trigger('consumefrMpToZero')
			}
			if (player.frMp + num > player.frMaxMp) {
				num = player.frMaxMp - player.frMp;
			}
			'step 1'
			if (num > 0) {
				lib.frStory.playfrAudio('mprec_audio');
				game.log(player, '获得了' + get.cnNumber(num) + '点魔力');
				player.changefrMp(num);
			}
			event.num = num;
		});
		if (num <= 0 || this.isfrMpDisabled()) {
			_status.event.next.remove(next);
		}
		return next;
	};
	lib.element.player.consumefrMp = function (num) {
		var next = game.createEvent('consumefrMp');
		if (num < 0) {
			num = 0;
		}
		if (num > this.frMp) {
			num = this.frMp;
		}
		next.num = num;
		next.player = this;
		if (next.num == undefined) next.num = 1;

		next.setContent(function () {
			'step 0'
			event.trigger('consumefrMpBegin1')
			'step 1'
			if (num < 0) {
				num = 0;
				event.trigger('consumefrMpToZero')
			}
			if (num > player.frMp) {
				num = player.frMp;
			}
			'step 2'
			event.trigger('consumefrMpBegin2')
			'step 3'
			if (num > 0) {
				game.log(player, '消耗了' + get.cnNumber(num) + '点魔力');
				player.changefrMp(-num);
				if (event.frAnim !== false) game.frPlayAnimOnPlayer('mp_consume', player);
			}
			event.num = num;
		});
		if (num <= 0) {
			_status.event.next.remove(next);
		}
		return next;
	};
	//魔力上限
	lib.element.player.changefrMaxMp = function (num) {
		var next = game.createEvent('changefrMaxMp', false);
		next.num = num;
		next.player = this;
		next.setContent(function () {
			'step 0'
			game.createfrMpBar(player);
			player.storage.frMaxMp += num;
			if (isNaN(player.storage.frMaxMp) || player.storage.frMaxMp < 0) player.storage.frMaxMp = 0;
			if (player.storage.frMp > player.storage.frMaxMp) {
				player.changefrMp(player.storage.frMaxMp - player.storage.frMp);
			}
			'step 1'
			var button = player.node.frMp;
			button.innerHTML = player.frMp + '/' + player.frMaxMp;
			if (player.frMaxMp > 0) {
				player.node.frMp.show();
				player.node.frMpIcon.show();
			} else {
				player.node.frMp.hide();
				player.node.frMpIcon.hide();
			}
			event.trigger('changefrMaxMp')
		});
		return next;
	};
	lib.element.player.losefrMaxMp = function (num) {
		var next = game.createEvent('losefrMaxMp');
		next.num = num;
		next.player = this;
		if (next.num == undefined) next.num = 1;
		next.setContent(function () {
			if (num <= 0) {
				num = 0;
			}
			if (num > player.frMaxMp) {
				num = player.frMaxMp;
			}
			if (num > 0) {
				game.log(player, '失去了' + get.cnNumber(num) + '点魔力上限');
				player.changefrMaxMp(-num);
			}
			event.num = num;
		});
		return next;
	};
	lib.element.player.gainfrMaxMp = function (num) {
		var next = game.createEvent('gainfrMaxMp');
		next.num = num;
		next.player = this;
		if (next.num == undefined) next.num = 1;
		next.setContent(function () {
			game.log(player, '获得了' + get.cnNumber(num) + '点魔力上限');
			player.changefrMaxMp(num);
		});
		if (num <= 0 || this.isfrMpDisabled()) {
			_status.event.next.remove(next);
		}
		return next;
	};
	lib.element.player.disablefrMp = function () {
		this.storage.frMp = 0;
		this.storage.frMaxMp = 0;
		this.storage.frMpDisabled = true;
		game.createfrMpBar(this);
	};
	lib.element.player.isfrMpEnabled = function () {
		return !this.storage.frMpDisabled;
	};
	lib.element.player.isfrMpDisabled = function () {
		return this.storage.frMpDisabled;
	};
	game.definefrMpProperty = function (player) {
		var name, name2;
		if (lib.character[player.name]) name = player.name;
		else if (player.name1 && lib.character[player.name1]) { name = player.name1; }

		if (lib.character[player.name2]) name2 = player.name2;

		var maxmp = 0, maxmp2 = 0, mp = 0, mp2 = 0;
		if (lib.character[name]) {
			var mpstr = null;
			if (lib.character[name][4]) {
				for (var str of lib.character[name][4]) {
					if (str.indexOf('frMp') != -1) {
						mpstr = str.replace('frMp:', '');
						break;
					}
				}
			}
			if (mpstr) {
				var Mp = mpstr.split('/').map(i => parseInt(i))
				if (Mp.length == 1) {
					maxmp = Mp[0];
					mp = Math.floor((Mp[0]) / 2)
				} else if (Mp[0] > Mp[1]) {
					Mp[0] = Mp[1]
					maxmp = Mp[1]
					mp = Mp[0]
				} else {
					maxmp = Mp[1]
					mp = Mp[0]
				}
			} else {
				maxmp = player.maxHp;
				if (maxmp > 5) {
					maxmp = 5;
				}
				mp = Math.floor((maxmp) / 2)
			}
		}
		if (lib.character[name2]) {
			var mpstr = null;
			if (lib.character[name2][4]) {
				for (var str of lib.character[name2][4]) {
					if (str.indexOf('frMp') != -1) {
						mpstr = str.replace('frMp:', '');
						break;
					}
				}
			}
			if (mpstr) {
				var Mp = mpstr.split('/').map(i => parseInt(i))
				if (Mp.length == 1) {
					maxmp2 = Mp[0];
					mp2 = Math.floor((Mp[0]) / 2)
				} else if (Mp[0] > Mp[1]) {
					maxmp2 = Mp[1]
					mp2 = Mp[0]
				} else {
					maxmp2 = Mp[1]
					mp2 = Mp[0]
				}
			} else {
				maxmp2 = player.maxHp;
				if (maxmp2 > 5) {
					maxmp2 = 5;
				}
				mp2 = Math.floor((maxmp2) / 2)
			}
		}
		if (maxmp > 0 && maxmp2 > 0) {
			player.storage.frMaxMp = Math.floor((maxmp + maxmp2) / 2);
		}
		else if (maxmp > 0 && maxmp2 == 0) {
			player.storage.frMaxMp = maxmp;
		}
		else if (maxmp == 0 && maxmp2 > 0) {
			player.storage.frMaxMp = maxmp2;
		} else {
			player.storage.frMaxMp = 0;
		}

		if (mp > 0 && mp2 > 0) {
			player.storage.frMaxMp = Math.floor((maxmp + maxmp2) / 2);
		}
		else if (mp > 0 && mp2 == 0) {
			player.storage.frMp = mp;
		}
		else if (mp == 0 && mp2 > 0) {
			player.storage.frMp = mp2;
		} else {
			player.storage.frMp = 0
		}
		Object.defineProperty(player, 'frMp', {
			get: function () {
				return player.storage.frMp;
			},
			set: function (value) {
				//value必须为数组，value[0]为数字，value[1]为方式。
				//例子:player.魔力=[1,'lose']
				if (typeof value[0] != 'number') throw 'value类型错误';
				switch (value[1]) {
					case 'gain':
						player.gainfrMp(value[0]);
						break;
					case 'lose':
						player.losefrMp(value[0]);
						break;
					case 'consume':
						player.consumefrMp(value[0]);
						break;
					default:
						player.storage.frMp = value[0];
						var button = player.node.frMp;
						button.innerHTML = player.frMp + '/' + player.frMaxMp;
				}

			},
			enumerable: true,
			configurable: true,
		});
		Object.defineProperty(player, 'frMaxMp', {
			get: function () {
				return player.storage.frMaxMp;
			},
			set: function (value) {
				if (typeof value[0] != 'number') throw 'value[0]类型错误';
				switch (value[1]) {
					case 'gain':
						player.gainfrMaxMp(value[0]);
						break;
					case 'lose':
						player.losefrMaxMp(value[0]);
						break;
					default:
						player.storage.frMaxMp = value[0];
						game.createfrMpBar(player);
						var button = player.node.frMp;
						button.innerHTML = player.frMp + '/' + player.frMaxMp;
				}

			},
			enumerable: true,
			configurable: true,
		});
	};
	game.getfrMpBarStyle = function () {
		var loc = lib.config.frMpBarLocation;
		if (!loc) {
			loc = 'shangcenei';
		}
		return {
			button: '.fr-Mp-' + loc,
			name: '.name-' + loc,
		};
	};
	game.createfrMpBar = function (player) {
		var button;
		if (!player.node) {
			player.node = {};
		}
		var style = game.getfrMpBarStyle();
		if (!player.node.frMpIcon) {
			button = ui.create.div(style.button);
		} else {
			button = player.node.frMpIcon;
		}
		button.hide();
		player.appendChild(button);
		button.show();
		var button2;
		if (!player.node.frMp) {
			button2 = ui.create.div(style.name, button);
			button2.classList.add('text');
		} else {
			button2 = player.node.frMp;
		}
		player.node.frMp = button2;
		player.node.frMpIcon = button;
		if (player.frMp === undefined) {
			game.definefrMpProperty(player);
		}
		button2.innerHTML = player.frMp + '/' + player.frMaxMp;
		if (player.frMaxMp <= 0) {
			player.node.frMpIcon.hide();
			player.node.frMp.hide();
		}
		player.isShowMp = true
	};
})
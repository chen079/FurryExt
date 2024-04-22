'use strict';
window.furry.frImport(function (lib, game, ui, get, ai, _status) {
	lib.furry_animations = {
		'mp_consume': {
			row: 3,
			column: 5,
			frame_count: 11,
			src: 'extension/福瑞拓展/image/animations/mp_consume.png',
			width: 180,
			height: 180,
			duration: 1200,
			reverse: true,
		},
	};
	game.frAnim = {
		createAnim: function (obj) {
			if (typeof obj == 'string') {
				obj = lib.furry_animations[obj];
			}
			if (!obj) return ui.create.div();
			var ret = ui.create.div('.furry_animation');
			ret.style.backgroundImage = "url(\'" + lib.assetURL + obj.src + "\')";
			ret.style.backgroundSize = (obj.column * 100) + "% " + (obj.row * 100) + "%";
			ret.style.backgroundPosition = "0% 0%";
			ret.style.width = obj.width + 'px';
			ret.style.height = obj.height + 'px';
			ret.furry_animation = obj;
			ret.furry_animation_frame = 0;
			ret.furry_animation_setFrame = function (m) {
				if (m == this.furry_animation_frame) return;
				var obj = this.furry_animation;
				if (obj.reverse) {
					if (m >= obj.frame_count) {
						m = obj.frame_count * 2 - m - 1;
					}
				} else {
					if (m >= obj.frame_count) {
						m = obj.frame_count - 1;
					} else if (m < 0) {
						m = 0;
					}
				}
				var row = Math.floor(m / obj.column);
				var column = m % obj.column;
				this.style.backgroundPosition = (obj.column == 1 ? 0 : (column * 100 / (obj.column - 1)).toFixed(2)) + "% " + (obj.row == 1 ? 0 : (row * 100 / (obj.row - 1))).toFixed(2) + "%";
				this.furry_animation_frame = m;
			};
			ret.furry_animation_stop = function () {
				if (this.animState) {
					this.animState.endAnim();
				}
				this.norepeat = true;
			};
			ret.furry_animation_play_repeat = function () {
				var that = this;
				this.norepeat = false;
				this.animState = lib.furry_animation_helper(0, this.furry_animation.frame_count * (this.furry_animation.reverse ? 2 : 1),
					this.furry_animation.duration,
					Math.round(this.furry_animation.duration / this.furry_animation.frame_count),
					function (value) {
						var frame = Math.floor(value);
						that.furry_animation_setFrame(frame);
					}
					, function () {
						if (!that.norepeat) that.furry_animation_play_repeat();
					});
			};
			ret.furry_animation_play = function (playerEndCallback) {
				var that = this;
				this.norepeat = true;
				this.animState = lib.furry_animation_helper(0, this.furry_animation.frame_count * (this.furry_animation.reverse ? 2 : 1),
					this.furry_animation.duration,
					Math.round(this.furry_animation.duration / this.furry_animation.frame_count),
					function (value) {
						var frame = Math.floor(value);
						that.furry_animation_setFrame(frame);
					}
					, function () {
						if (playerEndCallback) {
							playerEndCallback();
						}
					});
			};
			return ret;
		}
	};
	get.frAnimOpen=function(){
        return lib.config.frjh_skilltexiao !== false;
    };
    game.frHasExtension = function(str){
        return lib.config.extensions && lib.config.extensions.includes(str) && lib.config['extension_'+str+'_enable'];
    };
    game.frHasExtensionInstalled = function(str){
        return lib.config.extensions && lib.config.extensions.includes(str);
    };
	game.frPlayAnimOnCard = function (name, card, repeat, abis) {
		if (!repeat) repeat = 1;
		if (!get.frAnimOpen()) return;
		var anim = game.frAnim.createAnim(name);
		var rect = card.getBoundingClientRect();
		if (!abis) {
			anim.style.left = (rect.left + rect.width / 2 - anim.furry_animation.width / 2) + "px";
			anim.style.top = (rect.top + rect.height / 2 - anim.furry_animation.height / 2) + "px";
		} else {
			if (abis.left) {
				anim.style.left = (rect.left + rect.width / 2 - anim.furry_animation.width / 2 + abis.left) + "px";
			} else {
				anim.style.left = (rect.left + rect.width / 2 - anim.furry_animation.width / 2) + "px";
			}
			if (abis.top) {
				anim.style.top = (rect.top + rect.height / 2 - anim.furry_animation.height / 2 + abis.top) + "px";
			} else {
				anim.style.top = (rect.top + rect.height / 2 - anim.furry_animation.height / 2) + "px";
			}
		}
		document.body.appendChild(anim);
		anim.furry_animation_play(function () {
			if (repeat > 1) {
				game.frPlayAnimOnPlayer(name, card, repeat - 1, abis);
			}
			document.body.removeChild(anim);
			anim.delete();
		});
	};
	game.furry_handleRect = function (rect) {
		if (game.frHasExtension('十周年UI')) return rect;
		return {
			width: rect.width / game.documentZoom,
			height: rect.height / game.documentZoom,
			left: rect.left / game.documentZoom,
			top: rect.top / game.documentZoom,
			bottom: rect.bottom / game.documentZoom,
			right: rect.right / game.documentZoom,
		};
	};
	game.frPlayAnimOnPlayer = function (name, player, repeat, abis) {
		if (!repeat) repeat = 1;
		if (!get.frAnimOpen()) return;
		var anim = game.frAnim.createAnim(name);
		var rect = game.furry_handleRect(player.getBoundingClientRect());
		if (!abis) {
			anim.style.left = (rect.left + rect.width / 2 - anim.furry_animation.width / 2) + "px";
			anim.style.top = (rect.top + rect.height / 2 - anim.furry_animation.height / 2) + "px";
		} else {
			if (abis.left) {
				anim.style.left = (rect.left + rect.width / 2 - anim.furry_animation.width / 2 + abis.left) + "px";
			} else {
				anim.style.left = (rect.left + rect.width / 2 - anim.furry_animation.width / 2) + "px";
			}
			if (abis.top) {
				anim.style.top = (rect.top + rect.height / 2 - anim.furry_animation.height / 2 + abis.top) + "px";
			} else {
				anim.style.top = (rect.top + rect.height / 2 - anim.furry_animation.height / 2) + "px";
			}
		}
		document.body.appendChild(anim);
		anim.furry_animation_play(function () {
			if (repeat > 1) {
				game.frPlayAnimOnPlayer(name, player, repeat - 1, abis);
			}
			document.body.removeChild(anim);
			anim.delete();
		});
	};
	game.frPlayAnimOnPlayerRepeat = function (name, player) {
		if (!get.frAnimOpen()) return {
			furry_animation_stop: function () {

			}
		};
		var anim = game.frAnim.createAnim(name);
		var rect = player.getBoundingClientRect();
		anim.style.left = (rect.left + rect.width / 2 - anim.furry_animation.width / 2) + "px";
		anim.style.top = (rect.top + rect.height / 2 - anim.furry_animation.height / 2) + "px";
		document.body.appendChild(anim);
		anim.furry_animation_play_repeat();
		return anim;
	};
	game.frPlayAnimOnScreen = function (name) {
		if (!get.frAnimOpen()) return;
		var anim = game.frAnim.createAnim(name);
		anim.style.left = "50%";
		anim.style.top = "50%";
		anim.style.transform = 'translate(-50%,-50%)';
		document.body.appendChild(anim);
		anim.furry_animation_play(function () {
			document.body.removeChild(anim);
			anim.delete();
		});
	};
	lib.furry_animation_helper = function (beginValue, endValue, duration, frameLength, onFrame, onEnd) {
		var timestampBegin = (new Date()).getTime();
		var state = {
			id: null,
			end: false,
			endAnim: function () {
				this.end = true;
				clearInterval(this.id);
			}
		};
		state.id = setInterval(function () {
			if (state.end) {
				clearInterval(state.id);
				return;
			}
			var timestamp = (new Date()).getTime();
			var passTime = timestamp - timestampBegin;
			if (passTime >= duration) {
				state.end = true;
				if (onEnd) {
					onEnd();
				}
				clearInterval(state.id);
				return;
			}
			var r = passTime / duration;
			var val = (endValue - beginValue) * r + beginValue;
			if (onFrame) {
				onFrame(val);
			}
		}, frameLength);
		return state;
	};
});
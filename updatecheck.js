(() => ({
	// 扩展版本
	version: "2.4.0.5",

	// 扩展的上一个版本
	oldversion: "2.4.0.4",

	// 更新内容汇总
	changeLog: `
	替换大部分武将原画
	重做一些跟不上时代的角色
	联动扩展：星穹防线（染柒）-印龙、黎玥幻歌（无冕黎明）-莫卡林
	修复53个bug，点名表（殴）扬（打）@fox⑧
	为所有原画增加了版权声明
	为大量角色添加背景故事，可以在角色简介中查看
	新增一段剧情-色塔卡之旅，开启新剧情地点
	本次为大型更新，建议删除之前的拓展文件（可以保留save.json以保留成就进度）
	获取更新可前往qq群828182346或频道等渠道
	To be continued...
    `,

	// 本次更新的所有文件(不包括文件夹)
	updateFiles: [
		'css/mainPage.css',
		'css/achievement.css',
		'css/extension.css',
		'asset/animation.js',
		'asset/boss.js',
		'asset/buffs.js',
		'asset/cards.js',
		'asset/character.js',
		'asset/drama.js',
		'asset/functions.js',
		'asset/furry_mode.js',
		'asset/furry_achievement.js',
		'asset/globalSkill.js',
		'asset/guozhan.js',
		'asset/layout.js',
		'asset/mp.js',
		'asset/skin.js',
		'asset/update.js',
		'extension.js',
		'image/Buff/pibei.png',
		'image/Buff/shufu.png',
		'image/Buff/xuruo.png'
	],
	// 扩展内所有文件(不包括文件夹)
	allFiles: [
	],

	updateAuto: true,

}))();
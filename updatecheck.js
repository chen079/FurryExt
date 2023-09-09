(() => ({
	// 扩展版本
	version: "2.4.0.2",

	// 扩展的上一个版本
	oldversion: "2.4.0.1",

	// 更新内容汇总
	changeLog: `
	修复影响美观的小bug
	新增并行文件下载，大幅加快下载速率
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
		'asset/shop.js',
		'asset/skin.js',
		'asset/update.js',
		'extension.js',
	],
	// 扩展内所有文件(不包括文件夹)
	allFiles: [
	],

	updateAuto: true,

}))();
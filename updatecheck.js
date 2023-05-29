(() => ({
	// 扩展版本
	version: "2.3.0.0",

	// 扩展的上一个版本
	oldversion: "2.2.0.7",

	// 更新内容汇总
	changeLog: `
	新增狂杀
	新增每日一言、历史上的今天，
	为拓展设置图标新增霓虹灯效果。
	更改塔尔斯的技能
	修改温迪的技能
	删除部分代码
	修复部分bug
    `,

	// 本次更新的所有文件(不包括文件夹)
	updateFiles: [
		'css/mainPage.css',
		'css/achievement.css',
		'css/extension.css',
		'asset/cards.js',
		'asset/character.js',
		'asset/drama.js',
		'asset/furry_achievement.js',
		'extension.js',
		'image/qidongye/furry_lib.jpg',
		'image/qidongye/furry_lib2.jpg',
		'json/idiom.json',
		'json/poems.json',
		'image/background/wall.png',
		'image/card/pretty/fr_basic_madsha.bmp',
		'image/card/pretty/fr_basic_madsha.jpg',
		'image/card/pretty/fr_basic_madsha.png',
		'image/card/pretty/fr_basic_madsha.webp',
	],
	// 扩展内所有文件(不包括文件夹)
	allFiles: [
	],

	updateAuto: true,

}))();
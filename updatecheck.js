(() => ({
	// 扩展版本
	version: "2.2.0.6",

	// 扩展的上一个版本
	oldversion: "2.2.0.5",

	// 更新内容汇总
	changeLog: `
	修复各种错误
	修复部分成就无法获得的错误
	重写ChooseText，解决不会自动换人的错误
	重做人物萨伊苏
	新人物：鸣、温迪
	新函数：chooseText
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
	],
	// 扩展内所有文件(不包括文件夹)
	allFiles: [
	],

	updateAuto: true,

}))();
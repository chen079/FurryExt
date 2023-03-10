// @ts-check
(() => ({
	// 扩展版本
	version: "2.0.8",

	// 扩展的上一个版本
	oldversion: "2.0.7",

	// 更新内容汇总
	changeLog: `
	1.修正 林&炎 的一些bug
	2.希尔新增技能【驱狼】，避免永动机的bug
	3.修复雷恩斯的bug
	4.为大部分技能的提示做了修改
	5.修复移动版开启鸣谢清单后无法返回的bug
	6.请在打开福瑞牌堆之前打开牌堆补充，避免因锦囊牌过多导致的过度稀释。
	7.修改哈尔斯的一部分bug
	8.修改lens的一部分bug
	9.修改hynea的永动机并增加各属性的杀
	10.修正sier的永动机，并修改大部分技能
	11.修正aroncy的缴武的显示错误
	12.修改borg水月的错误
	13.修改普鲁维亚技能
	14.修复山的bug
	15.新武将 沙克、卡米加、泰格尔
	16.增加 -在线更新
    `,

	// 本次更新的所有文件(不包括文件夹)
	updateFiles: [
		'extension.css',
		'extension.js',
		'更新日志.txt',
		'asset/cards.js',
		'asset/character.js',
		'asset/drama.js',
		'asset/furrymode.js',
	],
	// 扩展内所有文件(不包括文件夹)
	allFiles: [
		'binaries.txt',
		'extension.css',
		'extension.js',
		'更新日志.txt',
		'acknowledgments/Acknowledgments.html',
		'acknowledgments/css/main.css',
		'acknowledgments/font/SmileySans-Oblique.otf',
		'acknowledgments/font/SmileySans-Oblique.otf.woff2',
		'acknowledgments/font/SmileySans-Oblique.ttf',
		'acknowledgments/font/SmileySans-Oblique.ttf.woff2',
		'acknowledgments/img/1.jpg',
		'acknowledgments/img/10.jpg',
		'acknowledgments/img/11.jpg',
		'acknowledgments/img/12.jpg',
		'acknowledgments/img/13.jpg',
		'acknowledgments/img/14.jpg',
		'acknowledgments/img/2.jpg',
		'acknowledgments/img/2048.png',
		'acknowledgments/img/3.jpg',
		'acknowledgments/img/4.jpg',
		'acknowledgments/img/5.png',
		'acknowledgments/img/6.jpg',
		'acknowledgments/img/7.jpg',
		'acknowledgments/img/9.jpg',
		'acknowledgments/img/background.jpg',
		'acknowledgments/img/title.png',
		'asset/cards.js',
		'asset/character.js',
		'asset/drama.js',
		'asset/furrymode.js',
		'asset/skin.js',
		'audio/bgm/furry_bgm_2background1.mp3',
		'audio/bgm/furry_bgm_2background2.mp3',
		'audio/bgm/furry_bgm_2backgroundpeople.mp3',
		'audio/bgm/furry_bgm_2backgroundsnow.mp3',
		'audio/bgm/furry_bgm_tavern.mp3',
		'audio/cg/biangong.mp3',
		'audio/cg/gong.mp3',
		'audio/cg/jue.mp3',
		'audio/cg/qingjue.mp3',
		'audio/cg/shang.mp3',
		'audio/cg/yu.mp3',
		'audio/cg/zhi.mp3',
		'audio/drama/Throw_coin.mp3',
		'image/background/black.png',
		'image/background/classroom.webp',
		'image/background/dance_people.png',
		'image/background/desert.jpeg',
		'image/background/deskwolf.png',
		'image/background/fire_dance.png',
		'image/background/forrest.jpg',
		'image/background/fox_stare.png',
		'image/background/fox_stare2.png',
		'image/background/gazebo sunset.png',
		'image/background/gazebo.png',
		'image/background/hospital.webp',
		'image/background/hug.png',
		'image/background/lack.png',
		'image/background/snow lake.png',
		'image/background/street.png',
		'image/background/tavern.jpg',
		'image/background/upstars.webp',
		'image/background/wolf back.png',
		'image/background/wolf in winter.png',
		'image/background/wolf_stare.png',
		'image/biaoqian/basic.png',
		'image/biaoqian/equip.png',
		'image/biaoqian/han.png',
		'image/biaoqian/ico_chuanshuo.png',
		'image/biaoqian/ico_chuanshuo_dt.png',
		'image/biaoqian/ico_dashu.png',
		'image/biaoqian/ico_diancang.png',
		'image/biaoqian/ico_jingliang.png',
		'image/biaoqian/ico_jingliang_dt.png',
		'image/biaoqian/ico_jingpin.png',
		'image/biaoqian/ico_jingpin_dt.png',
		'image/biaoqian/ico_putong.png',
		'image/biaoqian/ico_shengdan.png',
		'image/biaoqian/ico_shishi.png',
		'image/biaoqian/ico_shishi_dt.png',
		'image/biaoqian/ico_xianding.png',
		'image/biaoqian/ico_xiari.png',
		'image/biaoqian/ico_xinchuanshuo.png',
		'image/biaoqian/ico_xinchun.png',
		'image/biaoqian/ico_xiyou.png',
		'image/biaoqian/ico_xiyou_dt.png',
		'image/biaoqian/ico_zhenbao.png',
		'image/biaoqian/ico_zhizhen.png',
		'image/biaoqian/mark_ji.png',
		'image/biaoqian/mark_shen.png',
		'image/biaoqian/mark_yun.png',
		'image/biaoqian/trick.png',
		'image/button/back_button.png',
		'image/card/fr_card_cmhc.png',
		'image/card/fr_card_gzbj.png',
		'image/card/fr_card_lltj.png',
		'image/card/fr_card_lyzq.png',
		'image/card/fr_card_ttbl.png',
		'image/card/fr_card_xysx.png',
		'image/card/fr_card_yxys.png',
		'image/card/fr_card_zfxd.png',
		'image/card/fr_card_zh.png',
		'image/card/fr_card_zhcz.png',
		'image/card/fr_equip1_syzg.png',
		'image/card/fr_equip5_wxpp.png',
		'image/card/pretty/fr_card_cmhc.jpg',
		'image/card/pretty/fr_card_cmhc.png',
		'image/card/pretty/fr_card_cmhc.webp',
		'image/card/pretty/fr_card_gzbj.jpg',
		'image/card/pretty/fr_card_gzbj.png',
		'image/card/pretty/fr_card_gzbj.webp',
		'image/card/pretty/fr_card_lltj.jpg',
		'image/card/pretty/fr_card_lltj.png',
		'image/card/pretty/fr_card_lltj.webp',
		'image/card/pretty/fr_card_lyzq.jpg',
		'image/card/pretty/fr_card_lyzq.png',
		'image/card/pretty/fr_card_lyzq.webp',
		'image/card/pretty/fr_card_ttbl.jpg',
		'image/card/pretty/fr_card_ttbl.png',
		'image/card/pretty/fr_card_ttbl.webp',
		'image/card/pretty/fr_card_xysx.jpg',
		'image/card/pretty/fr_card_xysx.png',
		'image/card/pretty/fr_card_xysx.webp',
		'image/card/pretty/fr_card_yxys.jpg',
		'image/card/pretty/fr_card_yxys.png',
		'image/card/pretty/fr_card_yxys.webp',
		'image/card/pretty/fr_card_zfxd.jpg',
		'image/card/pretty/fr_card_zfxd.png',
		'image/card/pretty/fr_card_zfxd.webp',
		'image/card/pretty/fr_card_zh.jpg',
		'image/card/pretty/fr_card_zh.png',
		'image/card/pretty/fr_card_zh.webp',
		'image/card/pretty/fr_card_zhcz.jpg',
		'image/card/pretty/fr_card_zhcz.png',
		'image/card/pretty/fr_card_zhcz.webp',
		'image/card/pretty/fr_equip1_syzg.jpg',
		'image/card/pretty/fr_equip1_syzg.png',
		'image/card/pretty/fr_equip1_syzg.webp',
		'image/card/pretty/fr_equip5_wxpp.jpg',
		'image/card/pretty/fr_equip5_wxpp.png',
		'image/card/pretty/fr_equip5_wxpp.webp',
		'image/character/fr_adward.jpg',
		'image/character/fr_ala.jpg',
		'image/character/fr_alas.jpg',
		'image/character/fr_aroncy.jpg',
		'image/character/fr_berg.jpg',
		'image/character/fr_bofeng.jpg',
		'image/character/fr_bossfaers.jpg',
		'image/character/fr_bosshars.jpg',
		'image/character/fr_bossmala.jpg',
		'image/character/fr_ciyu.jpg',
		'image/character/fr_delta.jpg',
		'image/character/fr_dmoa.jpg',
		'image/character/fr_dog.jpg',
		'image/character/fr_dragon.jpg',
		'image/character/fr_edmon.jpg',
		'image/character/fr_faers.jpg',
		'image/character/fr_fate.jpg',
		'image/character/fr_fox.jpg',
		'image/character/fr_glit.jpg',
		'image/character/fr_ham.jpg',
		'image/character/fr_hars.jpg',
		'image/character/fr_horn.jpg',
		'image/character/fr_hynea.jpg',
		'image/character/fr_hyperner.jpg',
		'image/character/fr_jackson.jpg',
		'image/character/fr_jet.jpg',
		'image/character/fr_jgby.jpg',
		'image/character/fr_jiejie.jpg',
		'image/character/fr_kasaers.jpg',
		'image/character/fr_ken.jpg',
		'image/character/fr_kersm.jpg',
		'image/character/fr_kert.jpg',
		'image/character/fr_kesaya.jpg',
		'image/character/fr_keya.jpg',
		'image/character/fr_klier.jpg',
		'image/character/fr_klif.jpg',
		'image/character/fr_kmjia.jpg',
		'image/character/fr_knier.jpg',
		'image/character/fr_krikt.jpg',
		'image/character/fr_laays.jpg',
		'image/character/fr_lamost.jpg',
		'image/character/fr_lens.jpg',
		'image/character/fr_lint.jpg',
		'image/character/fr_linyan.jpg',
		'image/character/fr_liona.jpg',
		'image/character/fr_lions.jpg',
		'image/character/fr_liya.jpg',
		'image/character/fr_lusiya.jpg',
		'image/character/fr_lust.jpg',
		'image/character/fr_mala.jpg',
		'image/character/fr_markn.jpg',
		'image/character/fr_marxya.jpg',
		'image/character/fr_mika.jpg',
		'image/character/fr_milis.jpg',
		'image/character/fr_milism.jpg',
		'image/character/fr_milite.jpg',
		'image/character/fr_miya.jpg',
		'image/character/fr_molis.jpg',
		'image/character/fr_morly.jpg',
		'image/character/fr_muen.jpg',
		'image/character/fr_muli.jpg',
		'image/character/fr_muliy.jpg',
		'image/character/fr_muyada.jpg',
		'image/character/fr_nier.jpg',
		'image/character/fr_nore.jpg',
		'image/character/fr_nulia.jpg',
		'image/character/fr_oert.jpg',
		'image/character/fr_paers.jpg',
		'image/character/fr_patxi.jpg',
		'image/character/fr_peter_likes.jpg',
		'image/character/fr_pluvia.jpg',
		'image/character/fr_qima.jpg',
		'image/character/fr_rest.jpg',
		'image/character/fr_sam.jpg',
		'image/character/fr_sayisu.jpg',
		'image/character/fr_shark.jpg',
		'image/character/fr_shisan.jpg',
		'image/character/fr_sier.jpg',
		'image/character/fr_sisk.jpg',
		'image/character/fr_skry.jpg',
		'image/character/fr_slen.jpg',
		'image/character/fr_taber.jpg',
		'image/character/fr_telina.jpg',
		'image/character/fr_terlk.jpg',
		'image/character/fr_tery.jpg',
		'image/character/fr_terz.jpg',
		'image/character/fr_tiers.jpg',
		'image/character/fr_tiger.jpg',
		'image/character/fr_ventus.jpg',
		'image/character/fr_verb.jpg',
		'image/character/fr_wes.jpg',
		'image/character/fr_west.jpg',
		'image/character/fr_wore.jpg',
		'image/character/fr_xiaomo.jpg',
		'image/character/fr_xit.jpg',
		'image/character/fr_yada.jpg',
		'image/character/fr_yas_klin.jpg',
		'image/character/fr_yifa.jpg',
		'image/character/fr_yifeng.jpg',
		'image/character/fr_yinhu.jpg',
		'image/character/fr_zenia.jpg',
		'image/character/fr_zeta.jpg',
		'image/character/fr_zhongyu.jpg',
		'image/lutou/fr_adward.jpg',
		'image/lutou/fr_ala.jpg',
		'image/lutou/fr_alas.jpg',
		'image/lutou/fr_aroncy.jpg',
		'image/lutou/fr_berg.jpg',
		'image/lutou/fr_bofeng.jpg',
		'image/lutou/fr_bossfaers.jpg',
		'image/lutou/fr_bosshars.jpg',
		'image/lutou/fr_bossmala.jpg',
		'image/lutou/fr_ciyu.jpg',
		'image/lutou/fr_delta.jpg',
		'image/lutou/fr_dmoa.jpg',
		'image/lutou/fr_dog.jpg',
		'image/lutou/fr_dragon.jpg',
		'image/lutou/fr_edmon.jpg',
		'image/lutou/fr_faers.jpg',
		'image/lutou/fr_fate.jpg',
		'image/lutou/fr_fox.jpg',
		'image/lutou/fr_glit.jpg',
		'image/lutou/fr_ham.jpg',
		'image/lutou/fr_hars.jpg',
		'image/lutou/fr_horn.jpg',
		'image/lutou/fr_hynea.jpg',
		'image/lutou/fr_hyperner.jpg',
		'image/lutou/fr_jackson.jpg',
		'image/lutou/fr_jet.jpg',
		'image/lutou/fr_jgby.jpg',
		'image/lutou/fr_jiejie.jpg',
		'image/lutou/fr_kasaers.jpg',
		'image/lutou/fr_ken.jpg',
		'image/lutou/fr_kersm.jpg',
		'image/lutou/fr_kert.jpg',
		'image/lutou/fr_kesaya.jpg',
		'image/lutou/fr_keya.jpg',
		'image/lutou/fr_klier.jpg',
		'image/lutou/fr_klif.jpg',
		'image/lutou/fr_kmjia.jpg',
		'image/lutou/fr_knier.jpg',
		'image/lutou/fr_krikt.jpg',
		'image/lutou/fr_laays.jpg',
		'image/lutou/fr_lamost.jpg',
		'image/lutou/fr_lens.jpg',
		'image/lutou/fr_lint.jpg',
		'image/lutou/fr_linyan.jpg',
		'image/lutou/fr_liona.jpg',
		'image/lutou/fr_lions.jpg',
		'image/lutou/fr_liya.jpg',
		'image/lutou/fr_lusiya.jpg',
		'image/lutou/fr_lust.jpg',
		'image/lutou/fr_mala.jpg',
		'image/lutou/fr_markn.jpg',
		'image/lutou/fr_marxya.jpg',
		'image/lutou/fr_mika.jpg',
		'image/lutou/fr_milis.jpg',
		'image/lutou/fr_milism.jpg',
		'image/lutou/fr_milite.jpg',
		'image/lutou/fr_miya.jpg',
		'image/lutou/fr_molis.jpg',
		'image/lutou/fr_morly.jpg',
		'image/lutou/fr_muen.jpg',
		'image/lutou/fr_muli.jpg',
		'image/lutou/fr_muliy.jpg',
		'image/lutou/fr_muyada.jpg',
		'image/lutou/fr_nier.jpg',
		'image/lutou/fr_nore.jpg',
		'image/lutou/fr_nulia.jpg',
		'image/lutou/fr_oert.jpg',
		'image/lutou/fr_paers.jpg',
		'image/lutou/fr_patxi.jpg',
		'image/lutou/fr_peter_likes.jpg',
		'image/lutou/fr_pluvia.jpg',
		'image/lutou/fr_qima.jpg',
		'image/lutou/fr_rest.jpg',
		'image/lutou/fr_sam.jpg',
		'image/lutou/fr_sayisu.jpg',
		'image/lutou/fr_shark.jpg',
		'image/lutou/fr_shisan.jpg',
		'image/lutou/fr_sier.jpg',
		'image/lutou/fr_sisk.jpg',
		'image/lutou/fr_skry.jpg',
		'image/lutou/fr_slen.jpg',
		'image/lutou/fr_taber.jpg',
		'image/lutou/fr_telina.jpg',
		'image/lutou/fr_terlk.jpg',
		'image/lutou/fr_tery.jpg',
		'image/lutou/fr_terz.jpg',
		'image/lutou/fr_tiers.jpg',
		'image/lutou/fr_tiger.jpg',
		'image/lutou/fr_ventus.jpg',
		'image/lutou/fr_verb.jpg',
		'image/lutou/fr_wes.jpg',
		'image/lutou/fr_west.jpg',
		'image/lutou/fr_wore.jpg',
		'image/lutou/fr_xiaomo.jpg',
		'image/lutou/fr_xit.jpg',
		'image/lutou/fr_yada.jpg',
		'image/lutou/fr_yas_klin.jpg',
		'image/lutou/fr_yifa.jpg',
		'image/lutou/fr_yifeng.jpg',
		'image/lutou/fr_yinhu.jpg',
		'image/lutou/fr_zenia.jpg',
		'image/lutou/fr_zeta.jpg',
		'image/lutou/fr_zhongyu.jpg',
		'image/lutou/Unknow.jpg',
		'image/lutou/吟游诗人.jpg',
		'image/lutou/希莱尔.jpg',
		'image/lutou/某人1.jpg',
		'image/lutou/某人2.jpg',
		'image/lutou/沃尔.jpg',
		'image/others/furry_pic_bigdialog.png',
		'image/others/furry_pic_close.png',
		'image/others/gongnengbuchong.png',
		'image/others/pifumoshi.png',
		'image/others/progress_bar.png',
		'image/others/progress_bg.png',
		'image/others/qitazaxiang.png',
		'image/others/qqgroup.png',
		'image/others/title.png',
		'image/others/youxitiaozheng.png',
		'skin/lutou/fr_jackson/权能解放.png',
		'skin/lutou/fr_jackson/树影斑驳.png',
		'skin/lutou/fr_keya/王者再临.jpg',
		'skin/lutou/fr_liona/战死不屈.png',
		'skin/lutou/fr_liona/沉默护卫.png',
		'skin/lutou/fr_molis/碾碎时光.jpg',
		'skin/lutou/fr_muyada/战斗形态.jpg',
		'skin/lutou/fr_tiers/战场蔷薇.png',
		'skin/lutou/fr_tiers/烈日炎炎.png',
		'skin/lutou/fr_tiger/林中潜影.png',
		'skin/lutou/fr_wore/海边时光.png',
		'skin/lutou/fr_yifeng/地焰红月.jpg',
		'skin/lutou/fr_yifeng/夕阳西下.jpg',
		'skin/lutou/fr_yifeng/寒霜之月.jpg',
		'skin/lutou/fr_yifeng/异界之花.jpg',
		'skin/standard/fr_jackson/权能解放.jpg',
		'skin/standard/fr_jackson/树影斑驳.jpg',
		'skin/standard/fr_keya/王者再临.jpg',
		'skin/standard/fr_liona/战死不屈.jpg',
		'skin/standard/fr_liona/沉默护卫.jpg',
		'skin/standard/fr_molis/碾碎时光.jpg',
		'skin/standard/fr_muyada/战斗形态.jpg',
		'skin/standard/fr_tiers/战场蔷薇.jpg',
		'skin/standard/fr_tiers/烈日炎炎.jpg',
		'skin/standard/fr_tiger/林中潜影.jpg',
		'skin/standard/fr_wore/海边时光.jpg',
		'skin/standard/fr_yifeng/地焰红月.jpg',
		'skin/standard/fr_yifeng/夕阳西下.jpg',
		'skin/standard/fr_yifeng/寒霜之月.jpg',
		'skin/standard/fr_yifeng/异界之花.jpg',
	],

	updateAuto: true,

}))();
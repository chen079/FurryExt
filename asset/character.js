'use strict';
game.import('character', function (lib, game, ui, get, ai, _status) {
    var furryPack = {
        name: 'furryPack',//武将包命名（必填）
        connectBanned: ['fr_terz', 'fr_zenia', 'fr_pluvia', 'fr_zhongyu', 'fr_wes', 'fr_jgby', 'fr_qima', 'fr_rest', 'fr_wore', 'fr_francium', 'fr_nanci',],
        connect: true,//该武将包是否可以联机（必填）
        character: {
            'fr_mountainbear': ['male', 'qun', '3/3/4', ['mountainbear_xs', 'mountainbear_xj'], ['unseen','des:山熊，原本是居住在矮人之心洞穴周围的魔兽，后来被路西法的父亲打败，作为成年礼物送于路西法。路西法于其成年礼上通过强大的战斗技巧获得了山熊的认可，并与其签订了契约，经过多年的配合，二者已经能够达到通过思想交流的地步，可以说他们二者的性命已经通过“特拉克斯”而连接。由于山熊生性暴戾，在没有兽语者控制的情况下，可能会出现随意伤人的情况。']],
            'fr_guotang': ['male', 'qun', 3, ['guotang_yl', 'guotang_xq', 'guotang_st'], []],
            'fr_lucifer': ['male', 'wu', 3, ['lucifer_cc', 'lucifer_xz'], ['des:路西法，目前为居住在矮人之心洞穴附近的兽人部落首领。其部落信仰生命之神——“特拉克斯”，并获得了其传承的特殊能力。该能力使得其部落的勇士能够与动物沟通，甚至训练动物成为伙伴。拥有这种特殊能力的人在《瓦尔亚那》百科中称为“兽语者”。']],
            'fr_lans': ['male', 'shu', 3, [''], ['unseen']],
            'fr_keste': ['male', 'wu', 4, ['keste_yg', 'keste_wp'], ['des:科斯特，迦奈尔联邦最年轻也是最年少有为的将军，曾经在与矮人族的战争——“矮人之心争夺战”中大获全胜，歼敌数万。其主导与矮人族签下的《斯兰条约》为迦奈尔联邦的贸易事业奠定了发展基础。因此，这位将军也被成为“尼拉特”将军——即矮人语中的“恶魔”。']],
            'fr_neises': ['male', 'fr_g_dragon', 3, ['puzzles'], ['unseen']],
            'fr_wind': ['male', 'wu', 4, ['wind_fy'], []],
            'fr_nine': ['male', 'shen', 3, ['nine_fw', 'nine_cj', 'nine_dx'], []],
            'fr_ming': ['male', 'qun', 3, ['ming_yc', 'ming_yy'], ['unseen']],
            'fr_death': ['male', 'shen', 4, ['death_sy', 'death_sl', 'death_sp'], []],
            'fr_dolina': ['male', 'qun', 3, ['dolina_wy', 'dolina_sl', 'dolina_qj'], []],
            'fr_thunder': ['male', 'wei', 4, ['thunder_fz', 'thunder_lj'], ['unseen']],
            'fr_mouse': ['female', 'qun', 4, ['mouse_bm'], ['unseen']],
            'fr_lamas': ['male', 'wei', 4, ['lamas_zj'], []],
            'fr_blam': ['male', 'qun', 4, ['blame_jj'], ['unseen']],
            'fr_gairtelu': ['male', 'wei', 4, ['gairtelu_aq', 'gairtelu_cf', 'gairtelu_yj'], ['unseen']],
            'fr_tails': ['male', 'qun', 3, ['tails_jd', 'tails_qx'], []],
            'fr_zhan': ['male', 'qun', 3, ['zhan_sf', 'zhan_jf'], ['unseen']],
            'fr_sheep': ['female', 'fr_g_ji', 3, ['sheep_jf', 'sheep_rh'], ['des:西普，原生活于克拉，是出生于贫民窟的普通兽人；在卢森特国王上任前的那位国王——盖尔德鲁，是一位不折不扣的暴君，他欺压百姓并强迫贫民窟的人们前往战场。西普不幸被选中，后在战场上遇到了战争机器人——刃狼，经历一系列事件之后，西普成功使得刃狼获得了感情并相爱。后来再一次意外中，西普战死。刃狼将其带回并改造为机械生命。但是由于死去过久，其记忆没有被继承，现在将刃狼当作自己的哥哥。']],
            'fr_rasali': ['male', 'shen', 3, ['rasali_ly', 'rasali_hq'], ['unseen', 'des:那萨利，和那舒一样，是瓦尔亚那大陆信仰中的神明之一，执掌着阴间的善灵收集和引导工作。<br>他的责任是寻找那些有着良善灵魂的人们，以便在他们离开世界之前引领他们前往冥界，让他们的灵魂在冥界得到永恒的安息。那萨利是一位仁慈而有担当的神明，他深知自己肩负的责任，努力工作以确保每个良善的灵魂都能得到引领。他深知冥界对于那些有着良善灵魂的人意味着什么，因此他不惜一切代价来保护他们。']],
            'fr_nashu': ['male', 'shen', 4, ['nashu_th', 'nashu_sg'], ['des:那舒，是瓦尔亚那大陆信仰中的神明，他是阴间的统治者，负责管理和收割那些邪恶的灵魂。在瓦尔亚那大陆的历史中，那舒一直是一个神秘而的存在。<br>传说中，当一个人死后，他的灵魂会被送到那舒的阴间，经过他的审判和选择，才能得到永恒的归宿。因此，那舒在人们的心目中拥有着无上的权威和力量，被视为神圣不可侵犯的存在。<br>那舒的力量和能力是源于他所收割的灵魂。每当他收割一个灵魂，他就可以从中吸取力量，增强自己的能力。随着收割的灵魂数量的增加，那舒的力量也会逐渐增强，变得越来越不可战胜。']],
            'fr_derk': ['male', 'jin', 4, ['derk_ly', 'derk_liuyan'], []],
            'fr_crow': ['male', 'wei', 3, ['crow_my', 'crow_mc', 'crow_td'], ['unseen']],
            'fr_bladewolf': ['male', 'fr_g_ji', 4, ['bladewolf_qp', 'bladewolf_rh'], ['unseen', 'fobidai', 'des:刃狼，是产于迦奈尔联邦的机器人，由于其驱动需要大量的电力，因此刃狼作为该型号唯一的机器人被装载了核动力反应堆。刃狼的生产目的是为了战争，因此其功能也被特化为战争相关，并卸除了情感模块。但是后来因一些机缘巧合，被西普感化并重新获得了情感，在其死后将其带回并改造为了机械生命。']],
            'fr_dier': ["male", 'fr_g_dragon', 4, ['dier_sb', 'dier_ly', 'dier_xy'], ['unseen']],
            "fr_bosswore": ["male", "qun", 7, ["wore_bosshy", "wore_bossty"], ['unseen', "boss", "bossallowed", "des:沃尔，生活在迦奈尔联邦，职业为心理医生，曾前往克拉研习催眠术，其原本为沃尔为免服役人员，但在其强烈要求下，进入联邦军队成为战地心理医生。在服役五年后又要求回到家乡科马——联邦南部的一座小城市"]],
            'fr_francium': ["male", 'shen', 3, ['francium_ch', 'francium_sx', 'francium_yl', 'francium_mm'], ['unseen']],
            "fr_kmjia": ["male", 'wu', 3, ['kamijia_sx', 'kamijia_dr'], ["zhu"]],
            "fr_ala": ["male", 'shu', 4, ['ala_dy', 'ala_gm'], ['des:奥拉，米兰寺的大弟子，在其二十四岁时出师，后四处游历。目前正在矮人之心洞穴附近修行。奥拉类似于林和炎的哥哥的存在，从小对他们多有照顾。']],
            "fr_liona": ["male", 'wei', '4/5', ['liona_hz', 'liona_zz'], ['unseen', "zhu", 'des:里欧那，生活于兽人王国克拉的贵族家庭，从小就被作为一位战士培养。二十一岁时，在一次前往坷拉进行战斗的过程中，意外拯救了坷拉的公主，后二人暗生情愫。后来在一次战斗中下落不明。']],
            'fr_nanci': ['female', 'qun', 3, ['nanci_tx', 'nanci_tj'], ['des:南辞，来自龙之谷外围，是稀少的狐人族后裔，其天生就拥有化形的能力，能够在人类与兽人的形态之间切换。其能够接收天界的能力并作用于自身。']],
            "fr_shark": ["male", 'wei', 4, ['shark_yz'], ['des:沙克，来自人鱼之海的深部，其拥有一颗宝贵的珍珠，约一桅长，此珍珠能够映射出任意人的样貌，并使得拥有者获得相同的能力，据传其和凌月之球的制作者属于同一人。']],
            "fr_tiger": ["male", 'shu', 4, ['tiger_hy', 'tiger_kf'], ['des:泰格尔，来自兽人王国坷拉西部的区域，该区域的人们习惯使用剑技。米亚和科里科特曾在修行时与其相遇，米亚与其切磋后指出其弱点并与其成为好友。']],
            "fr_linyan": ["male", 'wu', 3, ['linyan_kr', 'linyan_ys'], ['des:林和炎是一对双胞胎，自幼时被父母遗弃，后被米兰寺收养。他们从小就生活于龙之谷外围的米兰寺中，与寺庙的主持相依为命。后来霍恩为了夺取寺庙中的宝物，设计毒杀了住持，而林与炎因外出而逃过一劫。']],
            "fr_horn": ["male", "wei", 3, ['horn_ql', 'horn_ll', 'fr_qianghua'], ['des:霍恩，据传是来自深渊的恶魔，为了夺取米兰寺的珍贵宝物——豁免权杖，设计杀死了米兰寺的住持。霍恩不喜活物，他常常会放出致死的魔法，杀死周围的一切。']],
            "fr_qima": ["male", "wu", 3, ['qima_jm', 'qima_dz'], ['forbidai', 'des:奇玛，生活在沃尔夫东侧的索尔山脉附近。小时候，其父亲曾给予其一个由未知矿石制作的颜色吊坠，并言此物会在其遭遇危险时拯救其于水火。奇玛在一次前往深渊寻找拯救其父亲的草药：“忘忧草”时被深渊的魔物抓伤眼部，导致其视力丧失。']],
            "fr_zhongyu": ["male", "shu", 4, ["zhongyu_ky", "zhongyu_zb"], ['des:忠与，没有人知道其来处，但是在克拉的北部多有其传奇事迹，包括杀死了一只冰霜巨龙等等。人们不知道的是，忠与时刻与自己的内心作斗争，其内心有一只恶魔，当完全释放时，将给世界带来疯狂与灾难。']],
            "fr_hynea": ["male", "qun", 4, ["hynea_cg", "hynea_ds", "hynea_rx"], []],
            "fr_wore": ["male", "qun", 4, ["wore_hy"], ['unseen', "des:沃尔，生活在迦奈尔联邦，职业为心理医生，曾前往克拉研习催眠术，其原本为沃尔为免服役人员，但在其强烈要求下，进入联邦军队成为战地心理医生。在服役五年后又要求回到家乡科马——联邦南部的一座小城市"]],
            "fr_tiers": ["female", "qun", 3, ["tiers_qp", "tiers_kh"], ["des:缇尔斯，生活在迦奈尔联邦，由于联邦周围大量禁魔矿石的影响，此处无法施展魔法，故此处的主要研究方向为科技。缇尔斯幼时丧父，与母亲相依为命，后进入联邦军队，在服役5年后因在与矮人的战争中负伤，回到家乡科马修养。"]],
            "fr_yifeng": ["male", "wei", 3, ["kref_yz", "yifeng_ml"], ['unseen', "des:弈风，《瓦尔亚那百科》中曾参加了万灵之森保卫战的大英雄弈霜的后代，是弈法的哥哥，与弈法共同居住在万灵之森外围的不知名小村落中。弈风生性沉稳，不喜言辞，与弈法截然相反。据传，其拥有一把能够逆转因果的弓，名曰霜月，通体泛着银月丝绸般的光芒。被弓箭射中者，若其行径正义，心无不端，则平安无事，而若其为邪恶之辈，将会遭受最为严峻的痛苦，直至其为罪行忏悔。"]],
            "fr_hars": ["male", "shen", 4, ["hars_sj", 'hars_hr'], ['unseen', "des:哈尔斯，兽人的智慧之神。其拥有惑人心魄的能力。根据矮人族与部分兽人族内部记录。哈尔斯能够直接降临到任何一人身上，据此观察世界。而被降临的人则被称为「神降者」。由于任何人都有可能成为「神降者」。因此，哈尔斯的眼线遍布整个大陆，而其本人也被称为「全知之神」。"]],
            "fr_wes": ["male", "jin", 3, ["wes_ts", "wes_gs", "wes_lt"], ['unseen', "des:维斯，生活在克拉北部的小镇米拉亚纳行省，毗邻吸血鬼禁区。由于附近丰富的魔力资源影响，维斯从小便表现出了强烈的魔法亲和性，其能力能够转移其他人受到的伤害。由于其能力的特殊性，自小其就被送往当地教会培养。"]],
            "fr_muyada": ["male", "qun", 4, ["mudaya_bz", "mudaya_wh"], ['unseen', "des:慕达亚，克拉最大的黑帮集团——希尔特黑帮的首领，其作风狠辣，言出必行，故拥有众多拥趸。其下产业遍布大陆各处，但最大的产业是与侏儒合作的武器锻造。"]],
            "fr_yada": ["male", "wei", 4, ["yada_by", "yada_jh", "yada_fs"], ["des:出生于克拉，后因种种原因前往人类聚集地柯拉。"]],
            "fr_fengkn": ["male", "qun", 4, ["muli_cm", "muli_yl"], ['unseen']],
            "fr_muliy": ["male", "wu", 3, ["mliy_lf", "mliy_hx"], []],
            "fr_sier": ["male", "shu", 3, ["sier_xl", "sier_fh", 'sier_ql'], []],
            "fr_klif": ["male", "jin", 3, ["krif_zl", "krif_lj"], ['unseen']],
            "fr_milis": ["male", "wei", 3, ["mislee_jx", "mislee_tj", "mislee_zr"], []],
            "fr_alas": ["male", "shu", 4, ["olas_fh", "olas_bx"], []],
            "fr_kesaya": ["male", "wu", 2, ["kesaya_zw", "kesaya_wy", "kesaya_ax"], ["des:隐匿者"]],
            "fr_ken": ["male", "fr_g_ji", 4, ["ken_jj", "ken_yn", "ken_pb"], ['unseen']],
            "fr_west": ["male", "qun", 3, ["west_pz", "west_sx", "west_jh"], []],
            "fr_huye": ["male", "shu", 4, ["huye_ms", "huye_jj", "huye_hr"], ['zhu']],
            "fr_milite": ["male", "fr_g_dragon", 7, ["milite_sz", "milite_yj"], []],
            "fr_jackson": ["male", "wu", 3, ["jackson_eb", "jackson_tm", "site_qj"], []],
            "fr_jiejie": ["male", "wei", 3, ["jiejie_zr", "jiejie_zf", "jiejie_my"], ['unseen', "des:檞界生活在克拉王城外郊，学习木系魔法与剑术，曾与米亚切磋剑术但是惜败。檞界的剑据说时来自深渊的矿石制成，因此天然带有魔法亲和力。据说此矿石若与禁魔石混合点燃，便会发生剧烈的爆炸，但是否有此事尚未可知。"]],
            "fr_sayisu": ["female", "fr_g_dragon", 4, ["sayisu_fj"], []],
            "fr_telina": ["female", "wu", 3, ["telina_hs", "telina_th"], ["des:特丽娜拥有特殊的「未来视」能力，她能够预知近至下一秒，远至数年的所有事件。在「瓦尔亚那百科全书」完成编写后，精灵族就在寻找拥有预言能力的人。因此特丽娜成为第一个受邀进入万灵之森的兽人。"]],
            "fr_oert": ["male", "shen", 4, ["oert_lh", "oert_wy"], ['unseen', "des:轮回之神欧尔特，不像其他的神那样高高在上。据传，欧尔特曾在瓦尔亚娜大陆最重要的节日“火灵日”，亲自来到瓦尔亚娜大陆的一座山峰上为瓦尔亚娜的百姓祈福，并参加兽人族的祭典活动。而受他惠顾的小贩说到：“神灵大人最喜欢我们家的丸子。”虽然真假未可知。"]],
            "fr_rest": ["male", "shu", 3, ["rest_qf", "rest_nb"], ["des:瑞斯特，生于人鱼之海附近，虽说当地兽人族与鱼人族的关系并不融洽，但瑞斯特算是少有的与两族同时交好的人，其目前在二者之间经商。"]],
            "fr_krikt": ["male", "qun", 4, ["krikt_th", "krikt_ly"], ["des:科里科特，「连破」剑法大师米亚之徒。修习其赠与的「两仪」剑法。其剑术诡谲多变，剑术有着极强的爆发性。其剑法之转换，时而如同狂风骤雨般快速无比，时而如同狂涛骇浪般凶猛无匹，时而如同清泉溪涧般缓慢温柔细腻，时而如同秋风扫落叶般冷酷无情。世人皆赞之，有诗云：“霍如羿射九日落，矫如群帝骖龙翔。来如雷霆收震怒，罢如江海凝清光。”", 'unseen']],
            "fr_tery": ["male", "jin", "2/5", ["tery_hx"], ['unseen', "des:特瑞，出生于迦奈尔联邦，其能力极为罕见，虽在大量禁魔矿脉附近，却依然能够释放魔法，其能够从其他人释放的魔法中解析咒文，并快速学习。但其能力仍有限制，其对于不使用魔法或魔法能力过强者无法复制。"]],
            "fr_sisk": ["male", "shu", 4, ["sisk_hz", "sisk_cs", "sisk_dm"], ["des:西斯科，罕见的狮兽人与吸血鬼的后代。拥有极其强力的身体素质与高超的种族天赋。后来被科亚所救，加入了「流亡者」雇佣兵团。其对血液极为敏感，些许的血腥味也会导致其进入狂暴。"]],
            "fr_lens": ["male", "fr_g_dragon", 3, ["lens_yl", "lens_rj"], ["des:元素法师"]],
            "fr_milism": ["male", "wei", 4, ["milism_ql", "milism_th", "milism_gn"], ["des:米里森，虎兽人与狮兽人的后代，就读于「魔法学院」。尤善水性，拥有水元素魔法天赋。而且能够转移他人的疼痛到自己，被誉为「治愈魔法师」。"]],
            "fr_miya": ["male", "shu", 4, ["miya_hz", "miya_ks"], ["des:米亚，生于兽人王国「克拉」东部的小村落中。幼时便喜好剑术，随父亲学习。无意间得到「连破」与「两仪」两套剑法。成为远近闻名的剑术大师。「连破」剑法大成后，独自前往兽人王国「德恩」东部的兽人王国「奥格」历练。途中遇见科里科特，为其天赋所感。遂收其为徒，赠以「两仪」剑法。"]],
            "fr_skry": ["male", "wu", 3, ["skery_ds", "skery_yj"], ["des:暗杀行者"]],
            "fr_lusiya": ["male", "wei", 3, ["luciya_yc", "luciya_xl", "luciya_hl"], ["des:卢西亚，曾就读于人类王国「魔法学院」，与沃里克为好友。其智力超群，并且在学习魔法方面有着很高的造诣。在魔法学院的时期他曾经创立过自己的魔法研究所「时空之门」，并在某双系法师的帮助下，还原了时空魔法的原理。由此卢西亚还未毕业的时候便已经获得了学院授予的最高荣誉。"]],
            "fr_kersm": ["male", "wei", 4, ["kersm_my", "kersm_jq"], ["des:科尔森，「流亡者」佣兵团的经理，与「赏金公会」进行任务对接。虽然科尔森看起来十分和善，但所有佣兵团的人都知道，科尔森是最不能惹的人。其特殊能力未知，但据说十分强力，能够与十级法师平手。"]],
            "fr_kert": ["male", "shu", 4, ["kert_lp", "kert_jl"], ["des:枪械大师"]],
            "fr_keya": ["male", "qun", 4, ["kaye_jy", "kaye_yj"], ["zhu"]],
            "fr_lust": ["male", "shu", 4, ["lust_fy", "lust_zb"], ["des:福瑞之王"]],
            "fr_klier": ["male", "qun", 3, ["kelaier_dh", "kelaier_ty"], []],
            "fr_faers": ["male", "shen", 4, ["faers_hc", "faers_sb", "faers_yl"], ['unseen', "zhu", "des:法斯，或名法尔斯，兽人中最主要的神祇之一，代表了永恒与变换，是动与静的同一。法尔斯常以胡狼的形象示人，对任何物种都报以绝对的平衡。守护平衡是他的使命。但是在精灵族的预言集「瓦尔亚娜大百科」中其被预言是毁灭兽人王国的罪魁祸首。"]],
            "fr_aroncy": ["male", "wei", 4, ["aroncy_jw"], []],
            "fr_lint": ["male", "shu", 4, ["lint_nd"], ['unseen']],
            "fr_berg": ["male", "fr_g_dragon", 3, ["berg_sy", "berg_jh"], []],
            "fr_xit": ["male", "jin", 3, ["xit_lx", "xit_bs"], []],
            "fr_markn": ["male", "wu", 3, ["markn_cy", "markn_yz", "markn_yc"], []],
            "fr_morly": ["male", "shu", 4, ["morly_ld", "morly_xd", "morly_qy"], []],
            "fr_marxya": ["male", "fr_g_dragon", 3, ["marcia_us", "marcia_jz", "marcia_ql"], []],
            "fr_yas_klin": ["male", "jin", 4, ["yas_klin_bj", "yas_klin_js"], ['unseen']],
            "fr_dog": ["male", "shu", 3, ["dog_dm", "dog_zz"], []],
            "fr_muen": ["male", "shu", 3, ["muen_tx", "muen_jb"], ['unseen']],
            "fr_patxi": ["male", "wu", 4, ["patxi_fs", "patxi_yw"], []],
            "fr_zeron": ["male", "qun", 4, ["zeron_sx"], []],
            "fr_nore": ["male", "qun", 4, ["nore_dz", "nore_ys"], []],
            "fr_bofeng": ["male", "jin", 4, ["bofeng_aj", "bofeng_ld", "bofeng_ws"], []],
            "fr_ciyu": ["male", "jin", 4, ["ciyu_ss", "ciyu_hq"], ['unseen']],
            "fr_delta": ["male", "shu", 4, ["delta_sy", "delta_sz"], []],
            "fr_edmon": ["male", "wei", 4, ["edmond_jz", "edmond_jj"], []],
            "fr_mika": ["male", "wei", 4, ["mika_lx", "mika_pl"], []],
            "fr_peter_likes": ["male", "qun", 4, ["peterlk_kh", "peterlk_jn"], []],
            "fr_dmoa": ["male", "qun", 3, ["dmoa_sx", "delta_ys"], []],
            "fr_nulia": ["male", "wu", 4, ["nulia_dh", "nulia_hj"], []],
            "fr_terlk": ["male", "shu", 4, ["terlk_zj", "terlk_pj"], []],
            "fr_verb": ["male", "wu", 3, ["verb_zy", "verb_fs"], ['unseen']],
            "fr_taber": ["male", "wu", 4, ["taber_jj", "taber_sj"], []],
            "fr_yinhu": ["male", "shen", 3, ["yinhu_xr", "yinhu_zd", "yinhu_sp"], ['unseen']],
            "fr_dragon": ["male", "fr_g_dragon", 4, ["dragon_hy", "dragon_ly", "dragon_hn"], []],
            "fr_terz": ["male", "wei", 4, ["terz_sp", "terz_fz", "terz_ts"], ['fobidai']],
            "fr_jet": ["male", "shen", 3, ["jet_fy", "jet_ww", "jet_sl", "jet_cl"], ['unseen', "hiddenSkill"]],
            "fr_slen": ["male", "wei", 3, ["slen_xj", "slen_gc"], []],
            "fr_paers": ["male", "shu", 4, ["paers_fy", "pares_xh"], []],
            "fr_nier": ["male", "qun", 3, ["nier_zj"], []],
            "fr_pluvia": ["male", "jin", 4, ["pluvia_fs", "pluvia_sx", "pluvia_xs"], []],
            "fr_ventus": ["male", "jin", 4, ["ventus_nx", "ventus_yc"], ['unseen']],
            "fr_knier": ["female", "shu", 3, ["knier_yc", "knier_wh", "knier_hp"], ['unseen']],
            "fr_zenia": ["female", "jin", 3, ["zenia_yy", "zenia_ys", "zenia_ld"], ['unseen']],
            "fr_lamost": ["male", "shu", 4, ["lamost_zf"], ['unseen']],
            "fr_kasaers": ["male", "shu", 4, ["kasers_cy"], []],
            "fr_yifa": ["female", "wei", 3, ["yifa_xs"], ["des:弈法，《瓦尔亚那百科》中曾参加了万灵之森保卫战的大英雄弈霜的后代，是弈风的妹妹。弈法天性好动活泼，其在幼时就被检测出有稀有的魔法天赋，能够通过语言来获得其他人的能力，《百科》中不曾预言过这种能力，实属世间罕见。由于此能力，其幼时便饱受困扰，许多贪婪狡诈之徒对此能力趋之若鹜。直至其十岁，父母因此而死，后与弈风共同远离兽人王国，前往精灵之森定居。"]],
            "fr_jgby": ["male", "qun", 4, ["jbgy_qx", "jbgy_ze"], []],
            "fr_xiaomo": ["male", "wu", 3, ["xiaomo_sj", "xiaomo_ld"], []],
            "fr_adward": ["male", "wei", 4, ["adward_qm", "adward_yt"], ["des:安德华是来自地狱的无上法术的咏唱者（自称），他做过的坏事数不胜数，包括但不限于：赶走偷吃鸡的黄鼠狼，杀死袭击村民的强盗，强迫受保护费的官兵学狗叫之类，因此其深受百姓憎恶（自称）。他致力于成为整个兽人王国最邪恶的黑魔法师，并为此努力着。《瓦尔亚那百科》中曾预言安德华有着黑暗生物的血统与两幅面孔，但似乎其本身并不知情。"]],
            "fr_fate": ["male", "wu", 3, ["fate_tm", "fate_ss"], ["des:法特，生于兽人王国“克拉”南部的贫民窟中，幼年时其父母因卷入债务纠纷而死，其一人独自生活。法特十二岁时，曾尝试寻找杀死父母的仇人，未果，后在游历各处的剑术大师米亚的帮助下终于成功。法特有着天生的赌博天赋，纵横各大赌场且百战百胜，被各大赌场称为“命运之手”。"]],
            "fr_liya": ["female", "wei", 3, ["liya_sz", "liya_sj", 'liya_yy'], ["des:莉亚生于兽人王国中部的商业中心，是兽人王国国王卢森特的独女。作为贵族女子的她，自小时候便被灌输各种各样的贵族礼仪，但她的生性不羁，时时让自己的父其紧张。她在16岁时，曾受到过卢森特赠送的重装机车，是她最喜欢的生日礼物。"]],
            "fr_laays": ["male", "qun", 4, ["laays_cs"], ["des:“像这样四处游荡，又过了多久呢？”拉亚斯的话语回荡在旷野上。自从那场人类与精灵的大战以人类的完全胜利为结局，拉亚斯也不知道自己游荡多久了。他是当年参加过此次战争的兽人族战士，后牺牲于战火之中。也许是生命树被毁的缘故，拉亚斯重新得到肉体复活。"]],
            "fr_whitewolf": ["male", "jin", 4, ["whitewolf_wl", "whitewolf_fz"], ["des:“白狼”，生于兽人王国“克拉”南部的贫民窟中，是“黑狼”的哥哥。在兽人王国最重要的巡游——“火灵日大典”被国王卢森特相中，与“黑狼”一同进入王宫成为侍卫。“白狼”的能力：“不动如山，动如雷震”，更加擅长防御与保护。在某次刺杀中因保护国王有功，被提拔为贴身侍卫，但是遭“黑狼”嫉妒，二人反目。"]],
            "fr_blackwolf": ["male", "jin", 4, ["blackwolf_cy", "blackwolf_nb"], ['unseen', "des:“黑狼”，生于兽人王国“克拉”南部的贫民窟中，从小与“白狼”相依为命。在“火灵日大典”被国王卢森特相中，与“白狼”一同进入王宫成为侍卫，后因嫉妒“白狼”的能力，与其反目。“黑狼”与“白狼”不同，更擅长狂暴而快速的攻击，世人谓之：“一剑斩不摧,双刃去如来”，又赞曰：“势如涛浪汹涌，形如雨打秋风”。"]],
            "fr_mala": ["male", "fr_g_dragon", 4, ["mala_ly", "mala_ht"], ['unseen']],
            "fr_bossmala": ["male", "shen", 10, ['mala_ht', 'mala_ly', 'mala_jf', 'mala_hy', 'mala_bc', 'mala_sz'], ['unseen', "boss", "bossallowed"]],
            "fr_bossfaers": ["male", "shen", 7, ["faers_hc", "faers_yl", "miya_ks", "miya_hz"], ['unseen', "boss", "bossallowed"]],
            "fr_bossoert": ["male", "shen", 8, ["oert_bosswy", "oert_bosslh"], ['unseen', "boss", "bossallowed"]],
            "fr_bosshars": ["male", "shen", 7, ["hars_sz", "hars_sj", "muen_tx", "muen_jb", "xiaomo_sj", "xiaomo_ld"], ['unseen', "boss", "bossallowed"]],
            "fr_zeta": ["male", "fr_g_dragon", 4, ["zeta_gz", "zeta_fg"], ['unseen']],
            "fr_fox": ["male", "shu", 4, ["fox_hm"], []],
            "fr_molis": ["female", "wei", 3, ["molis_hs", "molis_dx"], []],
            "fr_shisan": ["female", "fr_g_dragon", 3, ["shisan_dg", "shisan_tx"], []],
        },
        skill: {
            'mountainbear_xj': {
                trigger:{
                    player:"shaBegin",
                },
                shaRelated: true,
                direct: true,
                filter: function (event, player) {
                    return player.hujia>0
                },
                content: function () {
                    'step 0'
                    var choiceList = ['失去1点护甲，令此【杀】伤害基数+1', '失去1点护甲，令此【杀】不可被响应']
                    var choice = ['加伤', '强命']
                    if (player.hujia >= 2) {
                        choiceList.push('背水：失去1点护甲并翻面')
                        choice.push('背水')
                    }
                    player.chooseControl('cancel2',choice).set('choiceList', choiceList)
                        .set('ai', function () {
                            var player = _status.event.player
                            var target = _status.event.target
                            if (get.mode == 'identity' && player.identity == target.identity) return 'cancel2'
                            if (player.hujia > 2) {
                                return '背水'
                            } else {
                                return '强命'
                            }
                        }).set('target', trigger.target)
                    'step 1'
                    if (result.control == '加伤') {
                        player.changeHujia(-1)
                        trigger.baseDamage++
                    } else if (result.control == '强命') {
                        player.changeHujia(-1)
                        trigger.directHit = true;
                    } else if (result.control == '背水') {
                        player.changeHujia(-2)
                        player.turnOver()
                        trigger.baseDamage++
                        trigger.directHit = true;
                    }
                }
            },
            'mountainbear_xs': {
                unique: true,
                enable: "chooseToUse",
                mark: true,
                skillAnimation: false,
                animationStr: "献生",
                limited: true,
                animationColor: "orange",
                init: function (player) {
                    player.storage.mountainbear_xs = false;
                },
                filter: function (event, player) {
                    if (player.storage.mountainbear_xs) return false;
                    if (event.type == 'dying') {
                        if (player.storage.lucifer_cc != event.dying) return false;
                        return true;
                    }
                    return false;
                },
                onremove: function (player) {
                    if (player == game.me) {
                        if (!game.notMe) game.swapPlayerAuto(player._trueMe)
                        else delete game.notMe;
                        if (_status.auto) ui.click.auto();
                    }
                    delete player._trueMe;
                },
                content: function () {
                    'step 0'
                    player.awakenSkill('mountainbear_xs')
                    'step 1'
                    event.target = player.storage.lucifer_cc
                    player.give(player.getCards('he'), event.target)
                    'step 2'
                    event.num = event.target.hp - player.hp;
                    event.target.changeHp(-event.num);
                    'step 3'
                    player.changeHp(event.num);
                    'step 4'
                    if (player.hp <= 0) {
                        player.dying({ source: player });
                    }
                },
                ai: {
                    order: 1,
                    skillTagFilter: function (player) {
                        if (player.storage.lucifer_cc.maxHp <= 1) return false;
                        if (player.storage.lucifer_cc.hp > 0) return false;
                        if (player.storage.lucifer_cc.countCards('h') == 0) return false;
                    },
                    save: true,
                    result: {
                        target: -1,
                        player: 1,
                    },
                    threaten: 2,
                },
            },
            'lucifer_xz': {
                trigger: {
                    player: "phaseJieshuBegin"
                },
                direct: true,
                content: function () {
                    'step 0'
                    player.chooseTarget(function (card, player, target) {
                        return player != target
                    }).set('ai', function (target) {
                        var player = _status.event.player
                        return get.attitude(player, target) + target == player.storage.lucifer_cc ? 0 : 3
                    }).set('prompt', get.prompt('lucifer_xz')).set('prompt2', '令一名其他角色获得【祝福】直到其回合结束。')
                    'step 1'
                    if (result.bool) {
                        result.targets[0].addTempSkill('fr_zhufu', { player: 'phaseEnd' })
                    }
                },
                group: 'lucifer_xz_hujia',
                subSkill: {
                    hujia: {
                        trigger: {
                            player: "damageEnd"
                        },
                        direct: true,
                        content: function () {
                            'step 0'
                            player.chooseTarget(function (card, player, target) {
                                return player != target
                            }).set('ai', function (target) {
                                var player = _status.event.player
                                return get.attitude(player, target) + target == player.storage.lucifer_cc ? (7 - player.storage.lucifer_cc.hujia) : 0
                            }).set('prompt', get.prompt('lucifer_xz')).set('prompt2', '令一名角色获得1点护甲。')
                            'step 1'
                            if (result.bool) {
                                result.targets[0].changeHujia(1)
                            }
                        }
                    }
                }
            },
            'lucifer_cc': {
                trigger: {
                    global: "gameStart",
                },
                mode: ["identity"],
                available: function (mode) {
                    if (mode == 'identity' && _status.mode == 'purple') return false;
                },
                charlotte: true,
                unique: true,
                forced: true,
                filter: function (event, player) {
                    return player.identity == 'zhu' || player.identity == 'fan'
                },
                init: function (player) {
                    player.storage.lucifer_cc = game.addPlayer(player.getSeatNum() + 1, 'fr_mountainbear').getId()
                    player.storage.lucifer_cc.setPosition()
                },
                content: function () {
                    'step 0'
                    var target = player.storage.lucifer_cc
                    target.storage.lucifer_cc = player
                    target._trueMe = player;
                    game.addGlobalSkill('autoswap');
                    if (target == game.me) {
                        game.notMe = true;
                        if (!_status.auto) ui.click.auto();
                    }
                },
                group: 'lucifer_cc_die',
                subSkill: {
                    die: {
                        trigger: {
                            player: "dieBegin"
                        },
                        direct: true,
                        charlotte: true,
                        forced: true,
                        content: function () {
                            'step 0'
                            player.storage.lucifer_cc.die()
                        }
                    }
                }
            },
            'guotang_st': {
                skillAnimation: "epic",
                animationColor: "fire",
                limited: true,
                enable: "phaseUse",
                content: function () {
                    'step 0'
                    player.awakenSkill('guotang_st')
                    player.storage.guotang_yl.sortBySeat()
                    event.targets = player.storage.guotang_yl.slice(0)
                    if (!event.targets.length) event.goto(3)
                    'step 1'
                    event.target = event.targets.shift()
                    event.target.recover()
                    var h = event.target.countCards('h')
                    var num = Math.min(5 - h, event.target.maxHp - h)
                    if (num > 0) event.target.draw(num)
                    'step 2'
                    if (event.targets.length) {
                        event.goto(1)
                    }
                    'step 3'
                    if (game.dead.length == 0) {
                        player.addTempSkill('guotang_st_1')
                    }
                },
                subSkill: {
                    1: {
                        trigger: {
                            player: "phaseEnd"
                        },
                        direct: true,
                        filter: function (event, player) {
                            return player.storage.guotang_yl.length
                        },
                        content: function () {
                            'step 0'
                            player.chooseTarget('令一名角色摸三张牌，并执行一个额外的回合', 1).set('ai', function (target) {
                                var player = _status.event.player
                                return get.attitude(player, target)
                            }).set('filterTarget', function (card, player, target) {
                                return player.storage.guotang_yl.contains(target)
                            })
                            'step 1'
                            if (result.bool) {
                                var target = result.targets[0]
                                target.draw(3)
                                target.insertPhase()
                            }
                        }
                    }
                },
                ai: {
                    expose: 0.3,
                    order: 1,
                    result: {
                        player: function (player, target) {
                            if (player.storage.guotang_yl.length < 3) return 0
                            return 1
                        },
                        target: function (player, target) {
                            var val = 0;
                            var bool1 = !game.hasPlayer(current => current.maxHp < target.maxHp), bool2 = target.isMinHp(), bool3 = target.isMinHandcard();
                            if (bool1) val += 5;
                            if (bool2) {
                                if (bool1) target.maxHp++;
                                val += get.recoverEffect(target, player, player);
                                if (bool1) target.maxHp--;
                            }
                            if (bool3) {
                                var num = Math.max(0, Math.min(5, target.maxHp + (bool1 ? 1 : 0)));
                                val += 5 * num;
                            }
                            return val;
                        },
                    },
                },
            },
            'guotang_xq': {
                trigger: {
                    player: "phaseUseBegin"
                },
                direct: true,
                content: function () {
                    'step 0'
                    player.chooseTarget(1, get.prompt2('guotang_xq'), function (card, player, target) {
                        return target != player
                    }).set('ai', function (target) {
                        var player = _status.event.player
                        var att = get.attitude(player, target)
                        return att
                    })
                    'step 1'
                    if (result.bool) {
                        event.target = result.targets[0]
                        var choiceList = ['令' + get.translation(player) + '交给你一张牌']
                        var choice = ['选项一']
                        if (event.target.countCards('h') > 0) {
                            choiceList.push('交给不为' + get.translation(player) + '的其他角色一张牌，若你因此失去最后一张手牌，则' + get.translation(player) + '可令一名角色摸两张牌')
                            choice.push('选项二')
                        }
                        event.target.chooseControl(choice).set('choiceList', choiceList)
                            .set('ai', function () {
                                var player = _status.event.player
                                var target = _status.event.target
                                if (get.attitude(player, target) < 0) {
                                    return '选项一'
                                } else {
                                    if (player.countCards('h') == 1) {
                                        return '选项二'
                                    } else if (target.countCards('h') > 3 && player.countCards('h') <= 2) {
                                        return '选项一'
                                    } else {
                                        return '选项二'
                                    }
                                }
                            }).set('target', player)
                    } else {
                        event.finish()
                    }
                    'step 2'
                    if (result.control == '选项一') {
                        player.chooseCard('he', 1, true, '交给' + get.translation(event.target) + '一张牌')
                    } else {
                        event.goto(4)
                    }
                    'step 3'
                    event.target.gain(result.cards, 'giveAuto', player)
                    event.finish()
                    'step 4'
                    event.target.chooseCardTarget({
                        filterTarget: function (card, player, target) {
                            var source = _status.event.source
                            return event.target != target && source != target;
                        },
                        position: 'he',
                        ai1: function (card) {
                            return 100 - get.value(card);
                        },
                        forced: true,
                        ai2: function (target) {
                            return get.attitude(event.target, target)
                        },
                        prompt: '交给一名不为' + get.translation(player) + '的其他角色一张牌',
                    }).set('source', player)
                    'step 5'
                    event.target.give(result.cards, result.targets[0])
                    'step 6'
                    if (event.target.countCards('h') == 0) {
                        player.chooseTarget('令一名角色摸两张牌', 1).set('ai', function (target) {
                            var player = _status.event.player
                            return get.attitude(player, target)
                        })
                    } else {
                        event.finish()
                    }
                    'step 7'
                    if (result.bool) {
                        result.targets[0].draw(2)
                    }
                }
            },
            'guotang_yl': {
                trigger: {
                    player: "phaseJieshuBegin"
                },
                init: function (player) {
                    if (!player.storage.guotang_yl) player.storage.guotang_yl = []
                },
                mark: true,
                intro: {
                    mark: function (dialog, storage, player) {
                        dialog.addText('成为过【永良】目标的角色：');
                        dialog.addText(get.transArray(player.storage.guotang_yl));
                    }
                },
                direct: true,
                content: function () {
                    'step 0'
                    player.chooseTarget(get.prompt2('guotang_yl'), [1, player.hp]).set('ai', function (target) {
                        var player = _status.event.player
                        var att = get.attitude(player, target)
                        if (att > 0) {
                            if (target.hp == target.countCards('h') + 1) return att + 2
                            return att
                        } else {
                            return -1
                        }
                    })
                    'step 1'
                    if (result.bool) {
                        for (var i = 0; i < result.targets.length; i++) {
                            var target = result.targets[i]
                            if (!player.storage.guotang_yl.contains(target)) player.storage.guotang_yl.push(target)
                        }
                        event.targets = result.targets
                    } else {
                        event.finish()
                    }
                    'step 2'
                    event.target = event.targets.shift()
                    event.target.draw()
                    'step 3'
                    if (event.target.countCards('h') == event.target.hp) {
                        event.target.recover()
                        player.draw()
                    }
                    'step 3'
                    if (event.targets.length) {
                        event.goto(2)
                    }
                }
            },
            'puzzles': {
                enable: "phaseUse",
                usable: 1,
                contentBefore: function () {
                    const apiUrl = "https://api.linhun.vip/api/miyu";
                    const apiKey = "16562ba900c4eb3189bbc09b0a50bc24";
                    // 构造GET请求的URL，将apiKey作为查询参数传递
                    const url = `${apiUrl}?apiKey=${apiKey}`;
                    // 发送GET请求
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            // 在这里处理返回的JSON数据
                            player.storage.puzzles = data
                        })
                        .catch(error => {
                            // 处理请求错误
                            console.error("Error fetching data:", error);
                        });
                },
                content: function () {
                    'step 0'
                    event.puzzle = player.storage.puzzles
                    player.chooseText(true).set('ai', function () {
                        return event.puzzle.Answer.replace(/\([^)]*\)/g, '')
                    }).set('prompt2', event.puzzle.name + '(' + event.puzzle.Tips + ')')
                        .set('prompt', get.prompt('puzzles'))
                    'step 1'
                    game.log(player, '回答了' + result.text)
                    if (result.text == event.puzzle.Answer.replace(/\([^)]*\)/g, '')) {
                        game.log(player, '回答正确')
                        player.draw(3)
                        player.chooseCardTarget({
                            position: 'he',
                            filterCard: true,
                            forced: false,
                            selectCard: 3,
                            filterTarget: function (card, player, target) {
                                return player != target;
                            },
                            ai1: function (card) {
                                return 1;
                            },
                            ai2: function (target) {
                                var att = get.attitude(_status.event.player, target);
                                return att;
                            },
                            prompt: '请选择要送人的三张卡牌',
                        });
                    } else {
                        game.log(player, '回答错误')
                    }
                    'step 2'
                    if (result.bool) {
                        var target = result.targets[0]
                        player.give(result.cards, target)
                    } else {
                        player.chooseToDiscard('he', 3, true)
                    }
                },
                ai: {
                    order: 10,
                    result: {
                        player: 1,
                    },
                    threaten: 3.2,
                },
            },
            'nine_dx': {
                trigger: {
                    player: "drawBegin"
                },
                forced: true,
                content: function () {
                    trigger.bottom = true;
                },
                group: ["nine_dx_wash", "nine_dx_discard", 'nine_dx_judge'],
                subSkill: {
                    'judge': {
                        trigger: {
                            player: 'judge'
                        },
                        forced: true,
                        popup: false,
                        content: function () {
                            "step 0"
                            event.card = get.bottomCards()[0];
                            event.card.discard();
                            player.$throw(event.card);
                            if (event.card.clone) {
                                event.card.clone.classList.add('thrownhighlight');
                                game.addVideo('highlightnode', player, get.cardInfo(event.card));
                            }
                            "step 1"
                            player.judging[0] = event.card;
                            trigger.position.appendChild(event.card);
                        }
                    },
                    'wash': {
                        trigger: {
                            player: "phaseAfter",
                        },
                        popup: false,
                        forced: true,
                        content: function () {
                            var cards = Array.from(ui.discardPile.childNodes).filter(i => get.type(i) == 'equip');
                            if (cards) {
                                for (var i = 0; i < cards.length; i++) {
                                    var card = cards[i]
                                    ui.cardPile.insertBefore(card, ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length)]);
                                }
                                game.log(player, '将', cards, '洗入牌堆')
                            }
                            var cards = get.cards(ui.cardPile.childElementCount + 1);
                            for (var i = 0; i < cards.length; i++) {
                                ui.cardPile.insertBefore(cards[i], ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
                            }
                            game.updateRoundNumber();
                        }
                    },
                    'discard': {
                        trigger: {
                            player: "gainEnd",
                        },
                        forced: true,
                        filter: function (event, player) {
                            var bool = true
                            for (var i = 0; i < 5; i++) {
                                if (player.hasSkill(event.getParent(i).name) && (event.getParent(i).name != 'nine_dx_judge' && event.getParent(i).name != 'nine_dx')) {
                                    bool = false
                                    break;
                                }
                            }
                            return _status.currentPhase != player && bool
                        },
                        content: function () {
                            player.discard(trigger.cards)
                        },
                    },
                    ai: {
                        threaten: 1.2,
                        nogain: 1,
                        skillTagFilter: function (player) {
                            return player != _status.currentPhase;
                        },
                    },
                }
            },
            'keste_wp': {
                audio: 2,
                trigger: {
                    global: "chooseToDebateAfter",
                },
                filter: function (event, player) {
                    if (!event.targets.contains(player)) return false;
                    if (event.red.map(i => i[0]).contains(player)) return event.black.length;
                    if (event.black.map(i => i[0]).contains(player)) return event.red.length;
                    return false;
                },
                direct: true,
                content: function () {
                    'step 0'
                    var targets = [];
                    if (trigger.red.map(i => i[0]).contains(player)) targets = trigger.black;
                    if (trigger.black.map(i => i[0]).contains(player)) targets = trigger.red;
                    player.showHandcards();
                    var num = player.countCards('h', 'sha')
                    player.chooseTarget([1, num], get.prompt('keste_wp'), '对至多' + get.cnNumber(num) + '名与你意见不同的角色造成1点伤害', (card, player, target) => {
                        return _status.event.targets.contains(target);
                    }).set('targets', targets.map(i => i[0])).set('ai', target => {
                        var player = _status.event.player;
                        return get.damageEffect(target, player, player);
                    });
                    'step 1'
                    if (result.bool) {
                        for (var i = 0; i < result.targets.length; i++) {
                            var target = result.targets[i];
                            target.damage();
                        }
                    }
                },
            },
            'keste_yg': {
                audio: 2,
                enable: "phaseUse",
                usable: 1,
                filterTarget: function (card, player, target) {
                    return player != target;
                },
                content: function () {
                    var targets = game.filterPlayer(current => {
                        return current != target;
                    });
                    player.chooseToDebate(targets).set('callback', function () {
                        var result = event.debateResult;
                        if (result.bool && result.opinion) {
                            var opinion = result.opinion;
                            var target = event.getParent(2).target;
                            if (opinion == 'red') {
                                for (var i = 0; i < result.red.length; i++) {
                                    var people = result.red[i][0]
                                    if (people.canUse({ name: 'sha', isCard: true }, target) && people.countCards('h') > 0 && lib.filter.targetInRange({ name: 'sha' }, people, target) && lib.filter.targetEnabled({ name: 'sha' }, people, target) && target.isAlive() && (people.hasSha() || _status.connectMode)) {
                                        player.discardPlayerCard(people, 'h', 1, true)
                                        people.useCard({ name: 'sha', isCard: true }, target);
                                    }
                                }
                            } else {
                                for (var i = 0; i < result.black.length; i++) {
                                    var people = result.black[i][0]
                                    player.gainPlayerCard(people, 'hej', true)
                                }
                            };
                        }
                    }).set('ai', card => {
                        var player = _status.event.player;
                        var color = (player == _status.event.source || get.damageEffect(_status.event.getParent(2).target, player, player) > 0) ? 'black' : 'red';
                        var val = 5 - get.value(card);
                        if (get.color(card) == color) val += 10;
                        return val;
                    }).set('aiCard', target => {
                        var color = (target == _status.event.source || get.damageEffect(_status.event.getParent(2).target, target, target) > 0) ? 'black' : 'red';
                        var hs = target.getCards('h', { color: color });
                        if (!hs.length) hs = target.getCards('h');
                        return { bool: true, cards: [hs.randomGet()] };
                    }).set('target', target);
                },
                ai: {
                    order: 8,
                    expose: 0.2,
                    result: {
                        target: -1,
                    },
                },
            },
            'nine_fw': {
                trigger: {
                    player: "loseEnd"
                },
                filter: function (event, player) {
                    if (player.hasSkill('nine_fw_blocker')) {
                        return true
                    } else {
                        return false
                    }
                },
                content: function () {
                    'step 0'
                    player.removeSkill('nine_fw_blocker')
                    var cards = get.bottomCards(7);
                    event.cards2 = cards;
                    game.cardsGotoOrdering(cards);
                    player.chooseBool().set('createDialog', [
                        '牌堆底七张牌',
                        cards
                    ])
                    var hs = player.getCards('h')
                    player.chooseBool().set('createDialog', [
                        get.translation(player) + '的手牌',
                        hs
                    ])
                    var choice = ['交换']
                    var choicelist = ['调换这些牌的顺序']
                    event.all = event.cards2.concat(hs)
                    var equips = Array.from(event.all).filter(i => get.type(i) == 'equip')
                    event.equips = equips
                    if (equips.length > 0) {
                        choice.push('装备')
                        choicelist.push('使用其中任意张装备牌')
                    }
                    if (choice.length) {
                        player.chooseControl(choice).set('choiceList', choicelist)
                    }
                    'step 1'
                    if (result.control == '交换') {
                        var next = player.chooseToMove('附尾：将七张牌置于牌堆底');
                        var list = [['牌堆底', event.cards2]], hs = player.getCards('h');
                        if (hs.length) {
                            list.push(['手牌', hs]);
                            next.set('filterMove', function (from, to) {
                                return typeof to != 'number';
                            });
                        }
                        next.set('list', list);
                        next.set('processAI', function (list) {
                            var player = _status.event.player, cards = list[0][1].concat(list[1][1]).sort(function (a, b) {
                                return get.useful(a) - get.useful(b);
                            }), cards2 = cards.splice(0, event.cards2.length);
                            return [cards2, cards];
                        });
                    } else {
                        event.goto(3)
                    }
                    'step 2'
                    if (result.bool) {
                        event.forceDie = true;
                        var cards = result.moved[0];
                        event.cards = cards;
                        var hs = player.getCards('h');
                        var lose = [], gain = event.cards2.slice(0);
                        for (var i of cards) {
                            if (hs.contains(i)) lose.push(i);
                            else gain.remove(i);
                        }
                        if (lose.length) player.lose(lose, ui.cardPile);
                        if (gain.length) player.gain(gain, 'draw');
                    } else {
                        event.finish()
                    }
                    for (var i = cards.length - 1; i >= 0; i--) {
                        var card = cards[i]
                        if (!(('hejsdx').includes(get.position(card, true)))) {
                            card.fix();
                            ui.cardPile.appendChild(card);
                        }
                    }
                    game.updateRoundNumber();
                    event.finish()
                    'step 3'
                    player.chooseCardButton(event.all, '使用其中任意张装备牌').set('filterButton', function (button) {
                        return get.type(button.link) == 'equip'
                    }).set('ai', function (button) {
                        return 2 * Math.random() - 1
                    })
                    'step 4'
                    if (result.bool) {
                        var card = result.links[0]
                        player.chooseUseTarget(card, true)
                        player.$draw()
                        event.equips.remove(card)
                        event.cards2.remove(card)
                        event.all.remove(card)
                        if (event.equips.length) {
                            event.goto(3)
                        }
                    }
                    'step 5'
                    for (var i = event.cards2.length - 1; i >= 0; i--) {
                        event.cards2[i].fix();
                        ui.cardPile.appendChild(event.cards2[i]);
                    }
                    game.delay();
                    game.updateRoundNumber();
                },
                group: ['nine_fw_addMark', 'nine_fw_removeMark'],
                subSkill: {
                    addMark: {
                        trigger: {
                            global: ['phaseZhunbeiBefore', 'phaseJudgeBefore', 'phaseDrawBefore', 'phaseUseBefore', 'phaseDiscardBefore', 'phaseJieshuBefore']
                        },
                        popup: false,
                        forced: true,
                        charlotte: true,
                        filter: function (event, player) {
                            return !player.hasSkill('nine_fw_blocker')
                        },
                        content: function () {
                            player.addSkill('nine_fw_blocker')
                        }
                    },
                    removeMark: {
                        trigger: {
                            global: ['loseAfter', 'phaseZhunbeiAfter', 'phaseJudgeAfter', 'phaseDrawAfter', 'phaseUseAfter', 'phaseDiscardAfter', 'phaseJieshuAfter']
                        },
                        popup: false,
                        forced: true,
                        charlotte: true,
                        filter: function (event, player) {
                            return player.hasSkill('nine_fw_blocker')
                        },
                        content: function () {
                            player.removeSkill('nine_fw_blocker')
                        }
                    },
                    blocker: {

                    }
                }
            },
            'nine_cj': {
                trigger: {
                    global: 'phaseEnd'
                },
                direct: true,
                filter: function (event, player) {
                    return player.countCards('he') > 0
                },
                content: function () {
                    'step 0'
                    player.chooseToDiscard([1, Infinity], 'he', get.prompt2('nine_cj')).set('ai', function (card) {
                        return 7 - get.value(card)
                    }).set('filterCard', function (card) {
                        var type = get.type2(card);
                        for (var i = 0; i < ui.selected.cards.length; i++) {
                            if (get.type2(ui.selected.cards[i]) != type) return false;
                        }
                        return true;
                    }).set('complexCard', true)
                    'step 1'
                    if (result.bool) {
                        event.num = result.cards.length
                        player.chooseTarget('令一名角色弃置' + get.cnNumber(event.num) + '张牌', function (card, player, target) {
                            return target.countCards('he') > 0 && target != player;
                        }, true).set('ai', function (target) {
                            return -get.attitude(_status.event.player, target) * (target.countCards('e') + 1);
                        });
                    } else {
                        event.finish()
                    }
                    'step 2'
                    if (result.bool) {
                        var target = result.targets[0];
                        event.target = target;
                        player.discardPlayerCard(event.num, target, true);
                    }
                    'step 3'
                    var cards = player.getCards('e');
                    if (cards.length > 0) {
                        player.chooseBool('是否重铸装备区所有牌，对' + get.translation(event.target) + '使用任意张【杀】或令护甲加到1。')
                    } else {
                        event.finish()
                    }
                    'step 4'
                    if (result.bool) {
                        var cards = player.getCards('e');
                        player.loseToDiscardpile(cards);
                        player.draw(cards.length)
                        var choice = ['护甲']
                        var choicelist = ['令护甲加到1。']
                        if (player.countCards('hs', 'sha') > 0) {
                            choice.push('出杀')
                            choicelist.push('对' + get.translation(event.target) + '使用任意张【杀】')
                        }
                        player.chooseControl(choice).set('ai', function () {
                            var player = _status.event.player
                            if (get.attitude(player, event.target) > 0) {
                                return '护甲'
                            } else {
                                if (player.countCards('hs', 'sha') > 0) {
                                    return '出杀'
                                } else {
                                    return '护甲'
                                }
                            }
                        }).set('choiceList', choicelist)
                    } else {
                        event.finish()
                    }
                    'step 5'
                    if (result.control == '护甲') {
                        if (player.hujia < 1) {
                            player.changeHujia()
                        }
                        event.finish()
                    }
                    'step 6'
                    if (player.countCards('hs', 'sha') > 0) {
                        player.chooseToUse('hs', event.target, function (card, player, event) {
                            return get.name(card) == 'sha'
                        }, '冲击：是否对' + get.translation(event.target) + '使用一张杀？')
                    }
                    'step 7'
                    if (result.bool && player.countCards('h', 'sha') > 0) {
                        event.goto(6)
                    }
                }
            },
            'neises_try': {
                enable: 'phaseUse',
                content: function () {
                    'step 0'
                    if (!lib.config.chagpt) {
                        player.chooseText().set('prompt', '请输入chatGPT的API密钥').set('ai', function () {
                        })
                    } else {
                        player.chooseBool('是否重新输入chatGPT的API密钥')
                    }
                    'step 1'
                    if (result.bool) {
                        player.chooseText().set('prompt', '请输入chatGPT的API密钥').set('ai', function () {
                        })
                    }
                    'step 2'
                    game.saveConfig('chagpt', result.text)
                    'step 3'
                    player.chooseText().set('prompt', get.prompt2('neises_try')).set('ai', function () {
                    })
                    'step 4'
                    game.log(player, '询问chatGPT：', '#g' + result.text)
                    game.pause()
                    const url = "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions";
                    const prompt = result.text;
                    const temperature = 0.7;
                    const maxTokens = 100;
                    const requestOptions = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + lib.config.chagpt,
                        },
                        body: JSON.stringify({
                            prompt: prompt,
                            temperature: temperature,
                            max_tokens: maxTokens,
                        }),
                    };
                    fetch(url, requestOptions)
                        .then((response) => { response.json() })
                        .then((data) => {
                            game.log('chatGPT回复：' + data[0].choices.message.content)
                            game.resume()
                        })
                        .catch((error) => {
                            console.log(error)
                            game.log('错误信息：' + error.message)
                            game.resume()
                        });
                }
            },
            'ming_yy': {
                trigger: {
                    player: "useCardToPlayered",
                },
                mark: true,
                intro: {
                    markcount: () => undefined,
                    mark: function (dialog, storage, player) {
                        dialog.addText('已经使用过的诗')
                        dialog.addText(player.storage.ming_yy[1])
                    }
                },
                usable: 2,
                direct: true,
                filter: function (event, player) {
                    return event.card.name == 'sha';
                },
                init: function (player) {
                    if (!player.storage.ming_yy) {
                        player.storage.ming_yy = [{}, []]
                    }
                    game.loadFromFile('extension/福瑞拓展/json/poems.json', player.storage.ming_yy[0], function (error, data) {
                        if (error) {
                            alert(error);
                        } else {
                            console.log(data);
                        }
                    });
                },
                content: function () {
                    'step 0'
                    player.chooseText().set('prompt', get.prompt2('ming_yy')).set('ai', function () {
                        var title = Object.keys(player.storage.ming_yy[0])
                        title = title.randomGet()
                        return player.storage.ming_yy[0][title]["poem"].randomGet()
                    })
                    'step 1'
                    if (result.bool) {
                        event.bool = false
                        for (var i in player.storage.ming_yy[0]) {
                            if (!player.storage.ming_yy[1].contains(i) && player.storage.ming_yy[0][i]['poem'].contains(result.text)) {
                                player.storage.ming_yy[1].push(i)
                                event.bool = true
                                event.title = i
                                event.author = player.storage.ming_yy[0][i]['author']
                                var str = i + '\n' + event.author
                                player.say(str)
                                break;
                            }
                        }
                    } else {
                        event.finish()
                    }
                    'step 2'
                    if (event.bool) {
                        game.log(player, '背诵了', '#g' + event.author, '写的', '#g《' + event.title + '》', '中的一句')
                        var choices = ['你摸两张牌', '令此【杀】对' + get.translation(trigger.target) + '的伤害+1']
                        var control = ['摸牌', '加伤']
                        if (trigger.target.countCards('h') != 0) {
                            choices.push('弃置' + get.translation(trigger.target) + '两张牌')
                            control.push('弃牌')
                        }
                        if (trigger.target.countCards('hej') != 0) {
                            choices.push('获得' + get.translation(trigger.target) + '区域内的一张牌')
                            control.push('拿牌')
                        }
                        player.chooseControl(control, 'cancel2').set('choiceList', choices).set('ai', function () {
                            var player = _status.event.player
                            if (get.attitude(player, trigger.target) > 0) {
                                return 'cancel2'
                            } else {
                                return control.randomGet()
                            }
                        })
                    } else {
                        game.log('你背诵的不是唐诗三百首中的诗或背诵错误！（记得检查标点符号是否打全）')
                    }
                    'step 3'
                    if (result.control == '摸牌') {
                        player.draw(2)
                    } else if (result.control == '加伤') {
                        var id = trigger.target.playerid;
                        var map = trigger.getParent().customArgs;
                        if (!map[id]) map[id] = {};
                        if (typeof map[id].extraDamage != 'number') {
                            map[id].extraDamage = 0;
                        }
                        map[id].extraDamage++;
                    } else if (result.control == '弃牌') {
                        player.discardPlayerCard(trigger.target, 'he', 2, true)
                    } else if (result.control == '拿牌') {
                        player.gainPlayerCard(trigger.target, 'hej', 1, true)
                    }
                }
            },
            'ming_yc': {
                enable: "phaseUse",
                direct: true,
                usable: 1,
                init: function (player) {
                    if (!player.storage.ming_yc) {
                        player.storage.ming_yc = {
                            'lib': [],
                            'used': [],
                            'last': ''
                        };
                    }
                    game.loadFromFile('extension/福瑞拓展/json/idiom.json', player.storage.ming_yc.lib, function (error, data) {
                        if (error) {
                            alert(error);
                        } else {
                            console.log(data);
                        }
                    });
                },
                mark: true,
                intro: {
                    markcount: function (storage, player) {
                        return player.storage.ming_yc.used.length
                    },
                    mark: function (dialog, storage, player) {
                        dialog.addText('已经使用过的成语')
                        dialog.addText(player.storage.ming_yc.used)
                    }
                },
                content: function () {
                    'step 0'
                    event.ainum = 0
                    event.draw = 0
                    for (var i of game.players) {
                        if (get.attitude(player, i) < 0) {
                            event.draw += 2
                        } else {
                            event.draw += 1
                        }
                    }
                    'step 1'
                    player.chooseText().set('prompt', '是否发动【语出】').set('prompt2', player.storage.ming_yc.last == '' ? get.translation('ming_yc_info') : '你的上一个成语为：' + player.storage.ming_yc.last + '，请输入一个以“' + player.storage.ming_yc.last.charAt(player.storage.ming_yc.last.length - 1) + '”开头的成语。').set('ai', function () {
                        if (event.ainum == 0) {
                            return player.storage.ming_yc.lib.randomGet()
                        } else if (event.ainum < Math.min(Math.max(event.draw, 5), 9)) {
                            var word = player.storage.ming_yc.lib.find(function (item) {
                                return item.charAt(0) == player.storage.ming_yc.last.charAt(player.storage.ming_yc.last.length - 1) && !player.storage.ming_yc.used.contains(item)
                            })
                            if (word) {
                                return word
                            } else {
                                return player.storage.ming_yc.lib.randomGet()
                            }
                        } else {
                            return player.storage.ming_yc.lib.randomGet()
                        }
                    })
                    'step 2'
                    if (result.bool) {
                        event.ainum++
                        if (player.storage.ming_yc.lib.contains(result.text) && !player.storage.ming_yc.used.contains(result.text)) {
                            if (!player.storage.ming_yc.last || player.storage.ming_yc.last.charAt(player.storage.ming_yc.last.length - 1) == result.text.charAt(0)) {
                                player.draw()
                                player.storage.ming_yc.last = result.text
                                player.storage.ming_yc.used.push(result.text)
                                game.log(player, '接龙的成语为：' + player.storage.ming_yc.last)
                                player.say(result.text)
                                game.delay()
                                event.goto(1)
                            } else {
                                game.log(player, '输入错误')
                                player.storage.ming_yc.last = ''
                            }
                        } else if (player.storage.ming_yc.used.contains(result.text)) {
                            game.log(player, '输入的内容已经使用过。')
                            player.storage.ming_yc.last = ''
                        } else {
                            game.log(player, '输入错误')
                            player.storage.ming_yc.last = ''
                        }
                    }
                },
                ai: {
                    order: 12,
                    result: {
                        player: 1,
                    },
                },
            },
            'wind_fy': {
                trigger: {
                    global: ["phaseJieshuBegin", "phaseZhunbeiBegin"],
                },
                mark: true,
                intro: {
                    markcount: () => undefined,
                    mark: function (dialog, storage, player) {
                        dialog.addText('当前技能效果为：')
                        dialog.addText((player.storage.wind_fy['时'] ? '准备阶段' : '一名角色的结束阶段') + '你可以令' + (player.storage.wind_fy['象'] ? '自己' : '一名其他角色') + (player.storage.wind_fy['效'] ? '摸' : '弃置') + '一张牌')
                    }
                },
                direct: true,
                init: function (player) {
                    if (!player.storage.wind_fy) player.storage.wind_fy = {
                        '时': true,
                        '象': true,
                        '效': true,
                    }
                },
                filter: function (event, player) {
                    var trigger = player.storage.wind_fy['时'] ? 'phaseZhunbei' : 'phaseJieshu'
                    if (event.name != trigger) return false
                    return true
                },
                content: function () {
                    'step 0'
                    player.chooseTarget('【风吟】：是否选择令' + (player.storage.wind_fy['象'] ? "自己" : "一名其他角色") + (player.storage.wind_fy['效'] ? "摸" : "弃置") + "一张牌")
                        .set('filterTarget', function (card, player, target) {
                            if (player.storage.wind_fy['象']) {
                                return target == player
                            } else {
                                if (!player.storage.wind_fy['效']) {
                                    return target != player && target.countCards('he') > 0
                                }
                                return target != player
                            }
                        }).set('ai', function (target) {
                            var player = _status.event.player
                            var att = get.attitude(player, target)
                            if (player.storage.wind_fy['效']) {
                                return att
                            } else {
                                return -att
                            }
                        })
                    'step 1'
                    if (result.bool) {
                        var target = result.targets[0]
                        if (player.storage.wind_fy['效']) {
                            target.draw(1)
                        } else {
                            target.chooseToDiscard(1, true)
                        }
                    } else {
                        event.finish()
                    }
                },
                group: "wind_fy_change",
                subSkill: {
                    change: {
                        trigger: {
                            player: "wind_fyAfter"
                        },
                        direct: true,
                        content: function () {
                            'step 0'
                            var list = ['时', '象', '效']
                            if (list.contains(player.storage.wind_fy_change)) list.remove(player.storage.wind_fy_change)
                            player.chooseControl(list).set('prompt', get.prompt2('wind_fy')).set('ai', function () {
                                var player = _status.event.player
                                if (player.storage.wind_fy['象'] && player.storage.wind_fy['效']) {
                                    if (list.contains('时')) {
                                        return '时'
                                    } else {
                                        return list.randomGet()
                                    }
                                } else if (player.storage.wind_fy['象'] && !player.storage.wind_fy['效']) {
                                    if (list.contains('效')) {
                                        return '效'
                                    } else {
                                        return list.randomGet()
                                    }
                                } else if (!player.storage.wind_fy['象'] && !game.hasPlayer(function (current) {
                                    return get.attitude(player, current) > 0 && player.storage.wind_fy['效']
                                })) {
                                    return list.randomGet()
                                } else {
                                    if (list.contains('象')) {
                                        return '象'
                                    } else {
                                        return list.randomGet()
                                    }
                                }
                            })
                            'step 1'
                            player.storage.wind_fy_change = result.control
                            player.storage.wind_fy[result.control] = !player.storage.wind_fy[result.control]
                        }
                    }
                }
            },
            'death_sp': {
                trigger: {
                    source: "damageEnd",
                },
                init: function (player) {
                    if (!player.storage.death_sp) player.storage.death_sp = false
                },
                forced: true,
                filter: function (event, player) {
                    var num = 0;
                    for (var j = 0; j < player.stat.length; j++) {
                        if (player.stat[j].damage != undefined) num += player.stat[j].damage;
                    }
                    return num >= 6
                },
                juexingji: true,
                skillAnimation: true,
                mark: true,
                intro: {
                    mark: function (dialog, storage, player) {
                        var num = 0;
                        if (player.stat) {
                            for (var j = 0; j < player.stat.length; j++) {
                                if (player.stat[j].damage != undefined) num += player.stat[j].damage;
                            }
                        }
                        dialog.addText('已累计造成' + get.cnNumber(num) + '点伤害')
                    }
                },
                content: function () {
                    player.loseMaxHp()
                    player.awakenSkill('death_sp')
                    player.storage.death_sp = true
                },
            },
            'death_sl': {
                trigger: {
                    source: "damageBegin2"
                },
                usable: 1,
                filter: function (event, player) {
                    if (player.storage.death_sp) {
                        return event.player != player
                    } else {
                        return event.player == player.storage.death_sy
                    }
                },
                mod: {
                    targetInRange: function (card, player, target) {
                        if (target == player.storage.death_sy) {
                            return true;
                        }
                    },
                },
                check: function (event, player) {
                    return get.attitude(player, event.player) < 0
                },
                content: function () {
                    'step 0'
                    if (player.storage.death_sp) {
                        trigger.num += 1
                        player.gainPlayerCard(trigger.player, 'h', true)
                        event.finish()
                    }
                    'step 1'
                    player.chooseControl().set('choiceList', ['①令此次对' + get.translation(trigger.player) + '造成的伤害+1', '②令' + get.translation(trigger.player) + '弃置两张牌', '③背水：失去1点体力'])
                    'step 2'
                    if (result.index == 0) {
                        trigger.num += 1
                    } else if (result.index == 1) {
                        trigger.player.chooseToDiscard('he', 2, true)
                    } else {
                        trigger.num += 1
                        trigger.player.chooseToDiscard('he', 2, true)
                        player.loseHp()
                    }
                },
                group: 'death_sl_double',
                subSkill: {
                    double: {
                        trigger: {
                            player: "useCardToPlayered",
                        },
                        check: function (event, player) {
                            return get.attitude(player, event.target) < 0
                        },
                        filter: function (event, player) {
                            return event.card.name == 'sha' && event.getParent(2).name != 'death_sl_double'
                        },
                        content: function () {
                            player.useCard({ name: 'sha' }, trigger.target)
                        }
                    }
                }
            },
            'death_sy': {
                trigger: {
                    global: ["phaseBefore", "die"],
                    player: "enterGame",
                },
                marktext: "☠️",
                intro: {
                    content: '$已被死亡的暗影盯上...'
                },
                filter: function (event, player) {
                    if (event.name == 'die') {
                        return event.player == player.storage.death_sy
                    } else {
                        return event.name != 'phase' || game.phaseNumber == 0;
                    }
                },
                forced: true,
                content: function () {
                    'step 0'
                    if (player.storage.death_sy) {
                        player.storage.death_sy.removeSkill("death_sy_useless")
                        player.storage.death_sy.unmarkSkill('death_sy')
                    }
                    player.chooseTarget('选择你的猎物', function (card, target, player) {
                        return target != player && player.storage.death_sy != target
                    }, true).set('ai', function (target) {
                        var player = _status.event.player
                        return -get.attitude(player, target)
                    })
                    'step 1'
                    if (result.bool) {
                        player.storage.death_sy = result.targets[0]
                        result.targets[0].storage.death_sy = player
                        result.targets[0].markSkill('death_sy')
                        result.targets[0].addSkill("death_sy_useless")
                    }
                },
                derivation: "death_sy_useless",
                group: ["death_sy_begin"],
                subSkill: {
                    begin: {
                        trigger: {
                            global: "phaseAfter"
                        },
                        filter: function (event, player) {
                            return event.player == player.storage.death_sy
                        },
                        forced: true,
                        content: function () {
                            "step 0"
                            if (trigger.player.next != player) {
                                game.broadcastAll(function (target1, target2) {
                                    game.swapSeat(target1, target2);
                                }, player, trigger.player.next);
                            } else {
                                player.insertPhase();
                            }
                        }
                    },
                    useless: {
                        init: function (player, skill) {
                            player.addSkillBlocker(skill);
                        },
                        onremove: function (player, skill) {
                            player.removeSkillBlocker(skill);
                        },
                        charlotte: true,
                        skillBlocker: function (skill, player) {
                            return _status.currentPhase == player.storage.death_sy && !lib.skill[skill].charlotte && skill != 'death_sy_useless';
                        },
                        mark: true,
                        intro: {
                            content: function (storage, player, skill) {
                                var list = player.getSkills(null, false, false).filter(function (i) {
                                    return lib.skill.death_sy_useless.skillBlocker(i, player);
                                });
                                if (list.length) return '失效技能：' + get.translation(list);
                                return '无失效技能';
                            },
                        },
                    }
                }
            },
            'limiya_ch': {
                enable: 'phaseUse',
                usbale: 1,
                content: function () {
                    'step 0'
                    event.types = []
                    for (var i of lib.inpile) {
                        if (!event.types.contains(get.type2(i))) event.types.push(get.type2(i))
                    }
                    if (player.isUnderControl()) {
                        game.swapPlayerAuto(player);
                    }
                    event.colors = ['red', 'black']
                    var color = get.transArray(event.colors)
                    var type = get.transArray(event.types)
                    var dialog = ui.create.dialog('<span style="font-family=shousha;font-size:18px"><storage>求知</storage></span>', 'hidden');
                    dialog.addText('选择颜色：');
                    dialog.add([color, 'tdnodes']);
                    dialog.addText('选择牌的类型：');
                    dialog.add([type, 'tdnodes']);
                    var chooseButton = player.chooseButton(dialog, 2, true)
                    chooseButton.set('ai', function (button) {
                        return 1 + Math.random()
                    }).set('filterButton', function (button) {
                        for (var i = 0; i < ui.selected.buttons.length; i++) {
                            if (color.contains(ui.selected.buttons[i].link) && color.contains(button.link) || type.contains(ui.selected.buttons[i].link) && type.contains(button.link)) {
                                return false
                            }
                        }
                        return true
                    })
                    'step 1'
                    var color = event.colors.find(function (item) {
                        return get.translation(item) == result.links[0];
                    });
                    var type = event.types.find(function (item) {
                        return get.translation(item) == result.links[1];
                    });
                    var card = get.cardPile(function (card) {
                        return get.color(card) == color && get.type2(card) == type;
                    });
                    if (card) {
                        player.gain(card, 'gain2')
                    } else {
                        player.draw()
                    }
                }
            },
            'dolina_wy': {
                trigger: {
                    player: "damageBegin2"
                },
                forced: true,
                filter: function (event, player) {
                    return event.source && event.num > 0
                },
                content: function () {
                    'step 0'
                    var card = get.cards()[0];
                    event.card = card;
                    player.showCards(card, get.translation(player) + '发动了【威仪】')
                    'step 1'
                    var eff = get.damageEffect(player, trigger.source, trigger.source, trigger.nature)
                    trigger.source.chooseToDiscard('he', '请弃置一张' + get.translation(get.type2(event.card)) + '牌，否则取消此次伤害', function (card) {
                        return get.type2(card) == get.type2(event.card)
                    }).set('ai', function (card) {
                        if (_status.event.eff > 0) {
                            return 10 - get.value(card);
                        }
                        return 0;
                    }).set('eff', eff);
                    'step 2'
                    if (!result.bool) {
                        trigger.cancel()
                    }
                    player.loseToDiscardpile(card)
                }
            },
            'dolina_sl': {
                trigger: {
                    global: "gameStart"
                },
                init: function (player) {
                    if (!player.storage.dolina_sl) player.storage.dolina_sl = [[], [], []]
                },
                forced: true,
                content: function () {
                    for (var i of lib.inpile) {
                        var card = { name: i, isCard: true };
                        if (get.tag(card, 'damage')) {
                            if (get.type(i) == 'trick') {
                                player.storage.dolina_sl[0].push(['锦囊', '', i])
                            }
                        };
                    }
                    player.storage.dolina_sl[0].push(['基本', '', 'sha']);
                    for (var j of lib.inpile_nature) player.storage.dolina_sl[0].push(['基本', '', 'sha', j]);
                    player.storage.dolina_sl[1] = player.storage.dolina_sl[0].slice(0)
                },
                group: "dolina_sl_use",
                subSkill: {
                    use: {
                        enable: "phaseUse",
                        direct: true,
                        filter: function (event, player) {
                            return player.storage.dolina_sl[1].length > 0 && player.countCards('hes') > 0
                        },
                        chooseButton: {
                            dialog: function (event, player) {
                                return ui.create.dialog('噬浪', [player.storage.dolina_sl[1], 'vcard']);
                            },
                            filter: function (button, player) {
                                return lib.filter.filterCard({ name: button.link[2] }, player, _status.event.getParent());
                            },
                            check: function (button) {
                                var player = _status.event.player;
                                return player.getUseValue({ name: button.link[2] });
                            },
                            backup: function (links, player) {
                                return {
                                    filterCard: true,
                                    selectCard: 1,
                                    check: function (card) {
                                        if (ui.selected.cards.length) return 0;
                                        return 7 - get.value(card);
                                    },
                                    position: 'hes',
                                    popname: true,
                                    viewAs: {
                                        name: links[0][2],
                                        nature: links[0][3]
                                    },
                                    onuse: function (result, player) {
                                        var recode = [get.translation(get.type2(result.card)), '', get.name(result.card)]
                                        if (result.card.nature) recode.push(result.card.nature)
                                        let index = player.storage.dolina_sl[1].findIndex(subArr => JSON.stringify(subArr) === JSON.stringify(recode));
                                        // 如果找到了子数组 recode，则将其从 A 中删除
                                        if (index !== -1) {
                                            player.storage.dolina_sl[1].splice(index, 1);
                                        }
                                        player.storage.dolina_sl[2].push(recode)
                                        if (!player.storage.dolina_qj && player.storage.dolina_sl[1].length == 0 && player.hasSkill('dolina_qj')) {
                                            var next = game.createEvent('dolina_qj', false);
                                            next.player = player;
                                            next.setContent(lib.skill.dolina_qj.content);
                                        }
                                    },
                                }
                            },
                            prompt: function (links, player) {
                                return '将一张牌当作' + get.translation(links[0][3]) + get.translation(links[0][2]) + '使用';
                            },
                        },
                        ai: {
                            order: 6,
                            result: {
                                player: 2,
                            },
                        },
                    }
                },
            },
            'dolina_qj': {
                init: function (player) {
                    if (!player.storage.dolina_qj) player.storage.dolina_qj = false
                },
                forced: true,
                unique: true,
                juexingji: true,
                skillAnimation: true,
                animationColor: "metal",
                content: function () {
                    'step 0'
                    player.awakenSkill('dolina_qj')
                    player.logSkill('dolina_qj')
                    'step 1'
                    player.recover(player.getDamagedHp())
                    player.addSkill('dolina_fh')
                },
                derivation: 'dolina_fh'
            },
            'dolina_fh': {
                enable: "phaseUse",
                usable: 1,
                filter: function (event, player) {
                    return player.storage.dolina_sl[2].length
                },
                content: function () {
                    'step 0'
                    var choice = ['失去体力']
                    if (player.countCards('h')) {
                        choice.push('弃置手牌')
                    }
                    player.chooseControl(choice).set('ai', function () {
                        if (choice.contains('弃置手牌')) {
                            return '弃置手牌'
                        } else {
                            return '失去体力'
                        }
                    })
                    'step 1'
                    if (result.control == '失去体力') {
                        event.num = player.hp
                    } else {
                        event.num = player.countCards('h')
                    }
                    event.name1 = result.control
                    'step 2'
                    player.chooseNumber([1, event.num], Math.floor(player.storage.dolina_sl[2].length / 2))
                        .set("prompt", get.prompt2('dolina_fh'))
                        .set("ai", function (player, _event) {
                            return Math.min(event.num, Math.floor(player.storage.dolina_sl[2].length / 2)) - 1
                        })
                        .set('forced', true)
                    'step 3'
                    event.num = result.choice
                    if (event.name1 == '失去体力') {
                        player.loseHp(event.num)
                        player.draw()
                    } else {
                        player.chooseToDiscard(event.num, 'h', true)
                        player.recover()
                    }
                    'step 4'
                    event.dialog = ui.create.dialog('分海', [player.storage.dolina_sl[2], 'vcard'])
                    player.chooseButton(2 * event.num).set('ai', function (button) {
                        return Math.random();
                    }).set('forced', true)
                        .set('dialog', event.dialog)
                        .set('prompt2', '恢复' + get.cnNumber(2 * event.num) + '个记录')
                    'step 5'
                    event.dialog.close()
                    for (var i of result.links) {
                        let index = player.storage.dolina_sl[2].findIndex(subArr => JSON.stringify(subArr) === JSON.stringify(i));
                        if (index !== -1) {
                            player.storage.dolina_sl[2].splice(index, 1);
                        }
                        player.storage.dolina_sl[1].push(i)
                    }
                },
                ai: {
                    result: {
                        player: 2
                    },
                    order: 4,
                }
            },
            'gairtelu_aq': {
                trigger: {
                    player: "useCard2",
                },
                filter: function (event, player) {
                    var card = event.card, info = get.info(card);
                    var evt = player.getLastUsed(1)
                    if (evt && evt.targets) {
                        var targets = evt.targets
                        if (info.allowMultiple == false) return false;
                        if (event.targets && !info.multitarget) {
                            return event.targets && game.hasPlayer(function (target) {
                                return targets.contains(target) && !event.targets.contains(target) && lib.filter.targetEnabled2(card, player, target);
                            });
                        }
                    }
                    return false;
                },
                direct: true,
                content: function () {
                    'step 0'
                    var evt = player.getLastUsed(1)
                    var targets = evt.targets
                    player.chooseTarget([1, 2], get.prompt('gairtelu_aq'), '为' + get.translation(trigger.card) + '额外指定至多两名你本回合内使用的上一张牌的目标为目标', function (card, player, target) {
                        var evt = _status.event.getTrigger();
                        return targets.contains(target) && !evt.targets.contains(target) && lib.filter.targetEnabled2(evt.card, player, target);
                    }).set('ai', function (target) {
                        return get.effect(target, _status.event.getTrigger().card, _status.event.player);
                    });
                    'step 1'
                    if (result.bool) {
                        var targets = result.targets;
                        player.logSkill('gairtelu_aq', targets);
                        player.line(targets, trigger.card.nature);
                        trigger.targets.addArray(targets);
                    }
                },
            },
            "gairtelu_cf": {
                trigger: {
                    player: "phaseDrawBegin2",
                },
                filter: function (event, player) {
                    return !event.numFixed
                },
                prompt: function (event, player) {
                    return '【奢繁】：是否多摸' + get.cnNumber(Math.ceil(game.players.length / 2) + 1) + '张牌？';
                },
                content: function () {
                    var num = Math.ceil(game.players.length / 2) + 1
                    trigger.num += num;
                    player.addTempSkill('gairtelu_cf_1');
                },
                group: "gairtelu_cf_2",
                subSkill: {
                    1: {
                        trigger: {
                            player: "useCard",
                        },
                        forced: true,
                        filter: function (event, player) {
                            if (player.countCards('he') == 0) return false;
                            if (event.card.name == 'sha') return true;
                            return get.type(event.card) == 'trick';
                        },
                        autodelay: true,
                        content: function () {
                            player.chooseToDiscard(true, 'he');
                        },
                    },
                    2: {
                        trigger: {
                            player: "phaseUseBegin"
                        },
                        direct: true,
                        content: function () {
                            player.chooseUseTarget('fr_card_djlj', true);
                        }
                    }
                }
            },
            "gairtelu_yj": {
                trigger: {
                    player: "damageBegin3",
                },
                filter: function (event, player) {
                    return event.card && ((event.card.name == 'sha' && !player.countCards('he')) || (event.card.name != 'sha' && !player.countCards('h')));
                },
                forced: true,
                content: function () {
                    trigger.num++;
                },
                ai: {
                    effect: {
                        target: function (card, player, target, current) {
                            if (card.name == 'sha' && !target.countCards('he')) return [1, -2];
                        },
                    },
                },
            },
            'thunder_lj': {
                enable: 'phaseUse',
                filterCard: true,
                selectCard: 1,
                usable: 1,
                content: function () {
                    'step 0'
                    event.targets = game.filterPlayer(current => current != player)
                    event.targets.sortBySeat(player)
                    event.total = []
                    event.num = 0
                    event.cards = cards
                    'step 1'
                    event.target = event.targets.shift()
                    event.target.chooseToRespond('请打出一张点数为' + get.number(event.cards[0]) + '或花色为' + get.translation(get.suit(event.cards[0])) + '的牌，否则' + get.translation(player) + '对你造成1点伤害。', function (card) {
                        return get.number(card) == get.number(event.cards[0]) || get.suit(card) == get.suit(event.cards[0])
                    }).set('ai', function (card) {
                        if (get.attitude(event.target, player) > 0) {
                            return 5 - get.value(card)
                        } else {
                            return 7 - get.value(card)
                        }
                    })
                    'step 2'
                    if (result.bool) {
                        event.cards = result.cards
                        event.total.push(event.cards[0])
                    } else {
                        event.target.damage(player, 'thunder')
                        event.num++
                    }
                    'step 3'
                    if (event.targets.length) {
                        game.delay()
                        event.goto(1)
                    } else {
                        if (event.total.length && event.num > 0) {
                            player.chooseCardButton('获得其中至多' + get.cnNumber(event.num) + '张牌', [1, event.num], event.total)
                                .set('ai', function (button) {
                                    get.useful(button.link);
                                })
                        } else {
                            event.finish()
                        }
                    }
                    'step 4'
                    if (result.bool) {
                        player.gain(result.links, 'gain2')
                    }
                },
                ai: {
                    order: 7,
                    result: {
                        player: 2,
                        target: -2,
                    }
                },
                group: 'thunder_lj_defend',
                subSkill: {
                    defend: {
                        lastDo: true,
                        usabel: 2,
                        trigger: {
                            source: 'damageEnd'
                        },
                        prompt2: function (event, player) {
                            return '令' + get.translation(event.player) + '回复1点体力并摸一张牌。'
                        },
                        filter: function (event, player) {
                            return event.nature == 'thunder' && event.num > 0 && event.player.isAlive()
                        },
                        check: function (event, player) {
                            return get.attitude(player, event.player) > 0
                        },
                        content: function () {
                            trigger.player.recover()
                            trigger.player.draw()
                        }
                    }
                }
            },
            'thunder_fz': {
                trigger: {
                    player: "damageEnd",
                    source: "damageEnd"
                },
                frequent: true,
                content: function () {
                    'step 0'
                    event.num = trigger.num
                    'step 1'
                    event.cards = get.cards(2);
                    player.showCards(event.cards)
                    player.chooseCardButton(1, event.cards, get.prompt2('thunder_fz'), true).set('ai', function (button) {
                        get.useful(button.link);
                    })
                    'step 2'
                    player.gain(result.links[0])
                    event.cards.remove(result.links[0])
                    ui.cardPile.insertBefore(event.cards[0].fix(), ui.cardPile.firstChild);
                    event.num--
                    "step 3"
                    game.delay();
                    "step 4"
                    if (event.num) {
                        player.chooseBool(get.prompt2('thunder_fz'))
                    } else event.finish();
                    'step 5'
                    if (result.bool) {
                        player.logSkill('thunder_fz');
                        event.goto(1);
                    }
                },
                ai: {
                    maixie: true,
                    "maixie_hp": true,
                },
            },
            "lamas_zj": {
                group: ["lamas_zj_1", "lamas_zj_2"],
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                direct: true,
                content: function () {
                    "step 0"
                    event.num = Math.ceil(game.players.length / 2)
                    'step 1'
                    player.chooseTarget(get.prompt2(event.name), 1, function (card, player, target) {
                        return target.countCards('hej') > 0
                    }, function (target) {
                        var player = _status.event.player;
                        return get.effect(target, { name: 'guohe_copy2' }, player, player);
                    });
                    "step 2"
                    if (result.bool) {
                        event.target = result.targets[0];
                        player.choosePlayerCard('hej', [1, event.num], event.target, true).set('prompt', '选择' + get.translation(event.target) + '的至多' + get.cnNumber(event.num) + '张牌');
                    } else {
                        event.finish();
                    }
                    "step 3"
                    if (result.bool) {
                        event.num -= result.cards.length
                        player.addToExpansion(result.cards, event.target, 'give').gaintag.add('lamas_zj');
                        if (event.num) {
                            event.goto(1);
                        }
                    }
                },
                intro: {
                    content: "expansion",
                    markcount: "expansion",
                },
                onremove: function (player) {
                    var cards = player.getExpansions('lamas_zj');
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                ai: {
                    threaten: 2,
                },
                subSkill: {
                    1: {
                        enable: "chooseToUse",
                        filter: function (event, player) {
                            return player.getExpansions('lamas_zj').length > 0 && event.filterCard({ name: 'sha', isCard: true }, player, event);
                        },
                        direct: true,
                        chooseButton: {
                            dialog: function (event, player) {
                                return ui.create.dialog('战尽', player.getExpansions('lamas_zj'), 'hidden');
                            },
                            backup: function (links, player) {
                                return {
                                    viewAs: { name: 'sha', isCard: true },
                                    filterCard: () => false,
                                    selectCard: -1,
                                    card: links[0],
                                    precontent: function () {
                                        player.logSkill('lamas_zj');
                                        player.loseToDiscardpile(lib.skill.lamas_zj_1_backup.card);
                                        delete event.result.skill;
                                    },
                                };
                            },
                            prompt: () => '请选择【杀】的目标',
                        },
                        ai: {
                            order: function () {
                                return get.order({ name: 'sha' }) + 0.6;
                            },
                            result: {
                                player: 1,
                            },
                        },
                    },
                    2: {
                        trigger: {
                            target: "shaBefore",
                        },
                        direct: true,
                        content: function () {
                            var cards = player.getExpansions('lamas_zj');
                            if (cards.length) player.gain(cards, 'gain2');
                        },
                    }
                }
            },
            'mouse_bm': {
                audio: 3,
                trigger: {
                    player: "phaseUseBegin",
                },
                forced: true,
                direct: true,
                group: ["mouse_bm_upstart", "mouse_bm_die"],
                filter: function (event, player) {
                    return lib.skill.mouse_bm.getKane(player).length;
                },
                getKane: function (player) {
                    var list = lib.skill.mouse_bm.derivation;
                    return list.filter(mark => player.hasMark(mark));
                },
                derivation: ["mouse_bm_kaimen", "mouse_bm_xiumen", "mouse_bm_shengmen", "mouse_bm_shangmen", "mouse_bm_dumen", "mouse_bm_jingmen", "mouse_bm_simen", "mouse_bm_jinmen"],
                getValue: function (player, mark, target) {
                    var att = get.attitude(player, target);
                    var dis = Math.sqrt(get.distance(player, target, 'absolute'));
                    switch (mark.slice(8)) {
                        case 'kaimen':
                            return get.effect(target, { name: 'wuzhong' }, player, player) * 2.5 / dis;
                        case 'dumen':
                            if (target.hasJudge('lebu') && !target.hasCard({ name: 'wuxie' }, 'hs')) return 1;
                            return get.effect(target, { name: 'lebu' }, player, player) / dis;
                        case 'jinmen':
                            return get.effect(target, { name: 'losehp' }, player, player) * 2 / dis;
                        case 'shangmen':
                            return get.effect(target, { name: 'damage' }, player, player) * 2 / dis;
                        case 'xiumen':
                            if (target.isMin()) return 0;
                            var eff = get.damageEffect(target, player, target);
                            if (eff >= 0) return 0;
                            if (att >= 4) {
                                if (target.hp == 1) return att * 5 / Math.max(0.1, 5 - dis);
                                if (target.hp == 2 && target.countCards('he') <= 2) return att * 3 / Math.max(0.1, 5 - dis);
                            }
                            if (att > 0) return 0;
                            return -eff / 5 * dis;
                        case 'jingmen':
                            return get.effect(target, { name: 'bingliang' }, player, player) * 2;
                        case 'shengmen':
                            return get.recoverEffect(target, player, player) / dis;
                        case 'simen':
                            return -target.hp * 2;
                    }
                },
                content: function () {
                    'step 0'
                    player.chooseTarget('八门：令一名其他角色获得1枚“奇门”', true, (card, player, target) => {
                        return player != target && !lib.skill.mouse_bm.getKane(target).length;
                    }).set('ai', target => {
                        var player = _status.event.player, kane = lib.skill.mouse_bm.getKane(player);
                        return Math.abs(Math.max.apply(Math.max, kane.map(i => lib.skill.mouse_bm.getValue(player, i, target))));
                    });
                    'step 1'
                    if (result.bool) {
                        var target = result.targets[0];
                        event.target = target;
                        player.logSkill('mouse_bm', target);
                        var kane = lib.skill.mouse_bm.getKane(player);
                        var choiceList = kane.map(i => {
                            return '<div class="skill">【' + get.translation(lib.translate[i + '_ab'] || get.translation(i).slice(0, 2)) + '】</div>' +
                                '<div>' + get.skillInfoTranslation(i, player) + '</div>';
                        });
                        player.chooseControl(kane).set('choiceList', choiceList).set('displayIndex', false).set('prompt', '选择令' + get.translation(target) + '获得的“奇门”').set('ai', () => {
                            var controls = _status.event.controls, player = _status.event.player, target = _status.event.getParent().target;
                            var list = controls.map(i => [i, lib.skill.mouse_bm.getValue(player, i, target)])//.filter(i=>i[1]>=0);
                            list.sort((a, b) => b[1] - a[1]);
                            if (list.length) return list[0][0];
                            return controls.randomGet();
                        });
                    } else event.finish();
                    'step 2'
                    var kane = result.control;
                    player.removeMark(kane, 1);
                    player.popup(kane, 'metal');
                    player.addSkill('mouse_bm_clear');
                    target.addMark(kane, 1);
                    target.addAdditionalSkill('mouse_bm_' + player.playerid, kane);
                    game.delayx();
                    'step 3'
                    if (lib.skill.mouse_bm.getKane(player).length && game.hasPlayer(function (current) {
                        return !lib.skill.mouse_bm.getKane(current).length
                    })) {
                        player.chooseBool('【八门】：是否再交给一名角色一枚“奇门”？').set('ai', function () {
                            return false
                        })
                    } else {
                        event.finish()
                    }
                    'step 4'
                    if (result.bool) {
                        event.goto(0)
                    }
                },
                subSkill: {
                    mark: {
                        mark: true,
                        marktext: "八门",
                        intro: {
                            name: "奇门",
                            "name2": "奇门",
                            markcount: function (storage, player) {
                                return lib.skill.mouse_bm.getKane(player).length;
                            },
                            content: function (storage, player) {
                                return '剩余：' + get.translation(lib.skill.mouse_bm.getKane(player));
                            },
                        },
                        sub: true,
                    },
                    shengmen: {
                        charlotte: true,
                        forced: true,
                        trigger: {
                            player: "phaseEnd",
                        },
                        content: function () {
                            player.recover(player.getDamagedHp());
                        },
                        marktext: "奇门",
                        intro: {
                            name: "生门",
                            "name2": "生门",
                            content: "回合结束时，回复3点体力",
                        },
                        sub: true,
                    },
                    upstart: {
                        trigger: {
                            global: "phaseBefore",
                            player: "enterGame",
                        },
                        forced: true,
                        filter: function (event, player) {
                            return (event.name != 'phase' || game.phaseNumber == 0);
                        },
                        content: function () {
                            var kane = lib.skill.mouse_bm.derivation;
                            for (var mark of kane) {
                                player.addMark(mark, 1, false);
                                player.unmarkSkill(mark);
                            }
                            player.addSkill('mouse_bm_mark');
                        },
                        sub: true,
                    },
                    die: {
                        trigger: {
                            player: "phaseBegin",
                        },
                        forced: true,
                        filter: function (event, player) {
                            return !lib.skill.mouse_bm.getKane(player).length;
                        },
                        content: function () {
                            player.die();
                        },
                        sub: true,
                    },
                    clear: {
                        trigger: {
                            global: "phaseAfter",
                            player: "die",
                        },
                        charlotte: true,
                        forced: true,
                        popup: false,
                        forceDie: true,
                        filter: function (event, player) {
                            if (event.name == 'die') return true;
                            if (!lib.skill.mouse_bm.getKane(event.player).length) return false;
                            if (event.player.additionalSkills['mouse_bm_' + player.playerid]) {
                                return true;
                            }
                            return false;
                        },
                        content: function () {
                            if (trigger.name == 'die') {
                                game.countPlayer(current => {
                                    var skills = current.additionalSkills['mouse_bm_' + player.playerid];
                                    if (skills && skills.length) {
                                        current.removeAdditionalSkill('mouse_bm_' + player.playerid);
                                        for (var i of skills) {
                                            current.removeSkill(i);
                                            current.removeMark(i, 1);
                                        }
                                    }
                                });
                            }
                            else {
                                var skills = trigger.player.additionalSkills['mouse_bm_' + player.playerid];
                                trigger.player.removeAdditionalSkill('mouse_bm_' + player.playerid);
                                for (var i of skills) {
                                    trigger.player.removeMark(i, 1);
                                    trigger.player.removeSkill(i);
                                }
                            }
                        },
                        sub: true,
                    },
                    kaimen: {
                        charlotte: true,
                        forced: true,
                        trigger: {
                            player: "phaseDrawBegin2",
                        },
                        content: function () {
                            trigger.num += 4;
                        },
                        mod: {
                            cardUsable: function (card, player, num) {
                                if (card.name == 'sha') return num + 1;
                            },
                        },
                        marktext: "奇门",
                        intro: {
                            name: "开门",
                            "name2": "开门",
                            content: "摸牌阶段多摸四张牌；使用【杀】的次数上限+1",
                        },
                        sub: true,
                    },
                    dumen: {
                        charlotte: true,
                        forced: true,
                        trigger: {
                            player: "phaseBegin",
                        },
                        content: function () {
                            player.skip('phaseUse');
                        },
                        marktext: "奇门",
                        intro: {
                            name: "杜门",
                            "name2": "杜门",
                            content: "回合开始时，跳过下一个出牌阶段。",
                        },
                        sub: true,
                    },
                    jinmen: {
                        charlotte: true,
                        forced: true,
                        trigger: {
                            player: "phaseUseBegin",
                        },
                        content: function () {
                            player.loseHp();
                        },
                        mod: {
                            maxHandcard: function (player, num) {
                                return num - 3;
                            },
                        },
                        marktext: "奇门",
                        intro: {
                            name: "惊门",
                            "name2": "惊门",
                            content: "出牌阶段开始时，失去1点体力；手牌上限-3",
                        },
                        sub: true,
                    },
                    shangmen: {
                        charlotte: true,
                        forced: true,
                        trigger: {
                            player: "damageBegin1",
                        },
                        content: function () {
                            trigger.num += 1
                        },
                        marktext: "奇门",
                        intro: {
                            name: "伤门",
                            "name2": "伤门",
                            content: "你受到的伤害+1。",
                        },
                        sub: true,
                    },
                    xiumen: {
                        charlotte: true,
                        forced: true,
                        trigger: {
                            player: "damageBegin4",
                        },
                        content: function () {
                            trigger.cancel();
                        },
                        ai: {
                            nofire: true,
                            nodamage: true,
                            effect: {
                                target: function (card, player, target, current) {
                                    if (get.tag(card, 'damage') && !get.tag(card, 'thunderDamage')) return [0, 0];
                                },
                            },
                        },
                        marktext: "奇门",
                        intro: {
                            name: "休门",
                            "name2": "休门",
                            content: "当你受到伤害时，防止之",
                        },
                        sub: true,
                    },
                    simen: {
                        charlotte: true,
                        forced: true,
                        trigger: {
                            player: ["phaseJieshuBegin"]
                        },
                        content: function () {
                            player.loseHp(Math.min(5, player.hp))
                        },
                        marktext: "奇门",
                        intro: {
                            name: "死门",
                            "name2": "死门",
                            content: "结束阶段，你失去所有体力值（至多失去五点）。",
                        },
                        sub: true,
                    },
                    jingmen: {
                        charlotte: true,
                        forced: true,
                        trigger: {
                            player: ["phaseZhunbeiBegin"]
                        },
                        content: function () {
                            player.skip('phaseDraw');
                            player.skip('phaseDiscard');
                        },
                        marktext: "奇门",
                        intro: {
                            name: "景门",
                            "name2": "景门",
                            content: "准备阶段，跳过下一个摸牌阶段和弃牌阶段",
                        },
                        sub: true,
                    },
                },
            },
            'blame_jj': {
                audio: 2,
                unique: true,
                enable: "phaseUse",
                skillAnimation: true,
                animationColor: "gray",
                filterTarget: function (card, player, target) {
                    return target != player;
                },
                filter: function (event, player) {
                    return !player.isDisabled('equip1') && !player.isDisabled('equip2') && !player.isDisabled('equip2') && !player.isDisabled('equip4') && !player.isDisabled('equip5')
                },
                content: function () {
                    var cards = player.getCards('e')
                    player.gain(cards, 'gain2')
                    player.disableEquip('equip1');
                    player.disableEquip('equip2');
                    player.disableEquip('equip3');
                    player.disableEquip('equip4');
                    player.disableEquip('equip5');
                    player.addTempSkill('blame_jj_1');
                    player.storage.blame_jj_1 = target;
                    target.addSkill('blame_jj_2');
                    target.markSkillCharacter('blame_jj_1', player, '剑祭', '无法使用或打出任何手牌');
                },
                group: 'blame_jj_3',
                subSkill: {
                    1: {
                        onremove: function (player) {
                            player.storage.blame_jj_1.removeSkill('blame_jj_2');
                            player.storage.blame_jj_1.unmarkSkill('blame_jj_1');
                            delete player.storage.blame_jj_1;
                        },
                        mod: {
                            targetInRange: function (card, player, target) {
                                if (target.hasSkill('blame_jj_2')) {
                                    return true;
                                }
                            },
                            cardname: function (card, player) {
                                if (get.type(card, null, false) == 'equip') return 'sha';
                            },
                            cardUsableTarget: function (card, player, target) {
                                if (target.hasSkill('blame_jj_2')) return true;
                            },
                        },
                        charlotte: true,
                    },
                    2: {
                        mod: {
                            "cardEnabled2": function (card, player) {
                                if (get.position(card) == 'h') return false;
                            },
                        },
                        ai: {
                            effect: {
                                target: function (card, player, target) {
                                    if (get.tag(card, 'damage')) return [0, -999999];
                                },
                            },
                        },
                        charlotte: true,
                    },
                    3: {
                        trigger: {
                            global: 'phaseUseBegin'
                        },
                        direct: true,
                        filter: function (event, player) {
                            return event.player != player && event.player.countCards('h') > player.countCards('h') && player.countDisabled() > 0
                        },
                        content: function () {
                            player.draw(trigger.player.countCards('h') - player.countCards('h'))
                            player.chooseToEnable();
                        }
                    }
                },
                ai: {
                    order: 13,
                    result: {
                        target: function (player, target) {
                            if (target.getEquip('bagua') || target.getEquip('rewrite_bagua')) return 0;
                            var hs = player.countCards('h', function (card) {
                                return ['sha', 'juedou'].contains(card.name) && get.effect(target, card, player, player) != 0;
                            });
                            var ts = target.hp;
                            if (hs >= ts && ts > 1) return -1;
                            return 0;
                        },
                    },
                },
            },
            "neises_bm": {
                trigger: {
                    player: "phaseBefore"
                },
                mark: true,
                locked: true,
                mark: true,
                direct: true,
                zhuanghuanji: true,
                init: function (player) {
                    if (!player.storage.neises_bm) player.storage.neises_bm = 0;
                },
                marktext: '',
                intro: {
                    mark: function (dialog, storage, player) {
                        var list1 = ['命由天定，事在人为', '天行健；君子以自强不息。', '地势坤；君子以厚德载物。', '云雷屯，君子以经纶。', '山下有泉，蒙。君子以果行育德。', '云上于天，需。君子以饮食宴乐。', '天与水违行，讼。君子以做事谋始。', '地中有水，师。君子以容民畜众。', '地上有水，比。先王以建万国、亲诸侯。', '风行天下小畜。君子以懿文德。', '上天下泽，履。君子以辨上下，定民志。', '天地交，泰，后以财成天地之道，辅相天地之宜，以左右民。', '天地不交，否。君子以俭德辟难，不可荣以禄。', '天与火，同人。君子以类族辨物。', '火在天上，大有。君子以遏恶扬善，顺天休命。', '地中有山，谦。君子以裦多益寡，称物平施。', '雷出地奋，豫。先王以作乐崇德，殷荐之上帝，以配祖考。', '泽中有雷，随，君子向晦入宴息。', '山上有风，蛊。君子以振民育德。', '泽上有地，临。君子以教思无穷，容保民无疆。', '风行地上，观。先王以省方观民设教。', '雷电噬嗑。先王以明罚敕法。', '山下有火，贲。君子以明庶政，无敢折狱。', '山附于地，剥。上以厚下安宅。', '雷在地中，复。先王以至日闭关，商旅不行，后不省方。', '天下雷行，物与无妄。先王以茂对时育万物。', '天在山中，大畜。君子以多识前言往行，以畜其德。', '山下有雷，颐。君子以慎言语，节饮食。', '泽灭木，大过。君子以独立不惧，遁世无闷。', '水洊至，习坎。君子以常德行，习教事。', '明两作，离。大人以继明照于四方。', '山上有泽，咸。君子以虚受人。', '雷风恒，君子以立不易方。', '天下有山，遁。君子以远小人，不恶而严。', '雷在天上，大壮。君子以非礼弗履。', '明出地上，晋。君子以自昭明德。', '明入地中，明夷。君子以莅众用晦而明。', '风自火出，家人。君子以言有物而行有恒。', '上火下泽，睽。君子以同而异。', '山上有水，蹇。君子以反身修德。', '雷雨作，解。君子以赦过宥罪。', '山下有泽，损。君子以惩忿窒欲。', '风雷益，君子以见善则迁，有过则改。', '泽上于天，夬。君子以施禄及下，居德则忌。', '天下有风，姤。后以施命告四方。', '泽上于地，萃。君子以除戎器，戒不虞。', '地中生木，升。君子以顺德，积小以高大。', '泽无水，困。君子以致命遂志。', '木上有水，井。君子以劳民劝相。', '泽中有火，革。君子以治历明时。', '木上有火，鼎。君子以正位凝命。', '洊雷，震。君子以恐惧修省。', '兼山，艮。君子以思不出其位。', '山上有木，渐。君子以居贤德善俗。', '泽上有雷，归妹。君子以永终知敝。', '雷电皆至，丰。君子以折狱致刑。', '山上有火，旅。君子以明慎用刑而不留狱。', '随风，巽。君子以申命行事。', '丽泽兑，君子以朋友讲习。', '风行水上，涣。先王以享于帝立庙。', '泽上有水，节。君子以制数度，议德行。', '泽上有风，中孚。君子以议狱缓死。', '山上有雷，小过。君子以行过乎恭、丧过乎哀、用过乎俭。', '水在火上，既济。君子以思患而豫防之。', '火在水上，未济。君子以慎辨物居方。']
                        dialog.addText('卦辞')
                        dialog.addText(list1[player.storage.neises_bm])
                    },
                    name: function (storage, player) {
                        var list3 = ['乾坤万象', '乾为天', '坤为地', '⽔雷屯', '⼭⽔蒙', '⽔天需', '天⽔讼', '地⽔师', '⽔地⽐', '风天⼩畜', '天泽履', '地天泰', '天地否', '天⽕同⼈', '⽕天⼤有', '地⼭谦', '雷地豫', '泽雷随', '⼭风蛊', '地泽临', '风地观', '⽕雷筮嗑', '⼭⽕贲', '⼭地剥', '地雷复', '天雷⽆妄', '⼭天⼤畜', '⼭雷颐', '泽风⼤过', '坎为⽔', '离为⽕', '泽⼭咸', '雷风恒', '天⼭遁', '雷天⼤壮', '⽕地晋', '地⽕明夷', '风⽕家⼈', '⽕泽睽', '⼭⽔蹇', '雷⽔解', '⼭泽损', '风雷益', '泽天夬', '天风姤', '泽地萃', '地风升', '泽⽔困', '⽔风井', '泽⽕⾰', '⽕风⿍', '震为雷', '⾉为⼭', '风⼭渐', '雷泽归妹', '雷⽕丰', '⽕⼭旅', '巽为风', '兑为泽', '风⽔涣', '⽔泽节', '风泽中孚', '雷⼭⼩过', '⽔⽕既济', '⽕⽔未济']
                        return list3[player.storage.neises_bm]
                    },
                    markcount: function (storage, player) {
                        var list2 = ['', '乾卦', '坤卦', '屯卦', '蒙卦', '需卦', '讼卦', '师卦', '比卦', '小畜卦', '履卦', '泰卦', '否卦', '同人卦', '大有卦', '谦卦', '豫卦', '随卦', '蛊卦', '临卦', '观卦', '噬嗑卦', '贲卦', '剥卦', '复卦', '无妄卦', '大畜卦', '颐卦', '大过卦', '坎卦', '离卦', '咸卦', '恒卦', '遁卦', '大壮卦', '晋卦', '明夷卦', '家人卦', '睽卦', '蹇卦', '解卦', '损卦', '益卦', '夬卦', '姤卦', '萃卦', '升卦', '困卦', '井卦', '革卦', '鼎卦', '震卦', '艮卦', '渐卦', '归妹卦', '丰卦', '旅卦', '巽卦', '兑卦', '涣卦', '节卦', '中孚卦', '小过卦', '既济卦', '未济卦']
                        return ' ' + list2[player.storage.neises_bm]
                    }
                },
                content: function () {
                    player.storage.neises_bm = Math.floor(Math.random() * 64) + 1
                }
            },
            'nashu_sg': {
                trigger: {
                    player: "damageBegin4"
                },
                filter: function (event, player) {
                    return event.source != player
                },
                mod: {
                    maxHandcard: function (player, num) {
                        return num + game.countPlayer(function (current) {
                            return current.countMark('nashu_sg') > 0
                        });
                    },
                },
                marktext: '蚀',
                intro: {
                    content: '你有$个“蚀”标记'
                },
                logTarget: 'player',
                forced: true,
                content: function () {
                    trigger.source.addMark('nashu_sg', trigger.num)
                },
                group: 'nashu_sg_gain',
                subSkill: {
                    gain: {
                        trigger: {
                            player: 'phaseUseBegin'
                        },
                        forced: true,
                        filter: function (event, player) {
                            return game.hasPlayer(function (current) {
                                return current.countMark('nashu_sg') > 0
                            })
                        },
                        content: function () {
                            'step 0'
                            event.targets = game.filterPlayer(function (current) {
                                return current.countMark('nashu_sg') > 0
                            })
                            'step 1'
                            event.target = event.targets.shift()
                            'step 2'
                            event.target.chooseCard(Math.min(event.target.countCards('he'), event.target.countMark('nashu_sg')), 'he', true).set('ai', function (card) {
                                return 100 - get.value(card)
                            }).set('prompt', '交给' + get.translation(player) + get.cnNumber(Math.min(event.target.countCards('he'), event.target.countMark('nashu_sg'))) + '张牌')
                            'step 3'
                            player.gain(result.cards, event.target, 'giveAuto')
                            'step 4'
                            if (event.targets.length) {
                                event.goto(1)
                            }
                        }
                    }
                }
            },
            'nashu_th': {
                audio: 2,
                trigger: {
                    global: "die",
                },
                filter: function (event, player) {
                    return event.player.getStockSkills().filter(function (skill) {
                        var info = get.info(skill);
                        return info && !info.juexingji && !info.hiddenSkill && !info.zhuSkill && !info.charlotte && !info.limited && !info.dutySkill;
                    }).length > 0;
                },
                logTarget: "player",
                direct: true,
                content: function () {
                    'step 0'
                    var list = trigger.player.getStockSkills().filter(function (skill) {
                        var info = get.info(skill);
                        return info && !info.juexingji && !info.hiddenSkill && !info.zhuSkill && !info.charlotte && !info.limited && !info.dutySkill;
                    });
                    if (list.length == 1) event._result = { control: list[0] };
                    else player.chooseControl(list, 'cancel2').set('prompt', '选择获得' + get.translation(trigger.player) + '的一个技能').set('forceDie', true).set('ai', function () {
                        return list.randomGet();
                    });
                    'step 1'
                    if (result.control != 'cancel2') {
                        player.addSkillLog(result.control);
                        game.broadcastAll(function (skill) {
                            var list = [skill]; game.expandSkills(list);
                            for (var i of list) {
                                var info = lib.skill[i];
                                if (!info) continue;
                            }
                        }, result.control);
                    } else {
                        event.finish()
                    }
                    'step 2'
                    if (trigger.source == player) {
                        player.gainMaxHp()
                        player.recover()
                    }
                },
            },
            'rasali_hq': {
                trigger: {
                    source: "damageEnd",
                },
                filter: function (event, player) {
                    return player != event.player && event.num < event.player.hp;
                },
                usable: 1,
                check: function (event, player) {
                    if (get.attitude(player, event.player) > -2) return false;
                    if (player.hp > 2) return true;
                    if (player.hp == 2 && event.player.hp < 3) return false;
                    return player.hp > 1;
                },
                logTarget: "player",
                content: function () {
                    player.loseHp();
                    trigger.player.addTempSkill('rasali_hq_recover');
                    trigger.player.storage.rasali_hq_recover = trigger.player.hp
                    trigger.player.damage(trigger.player.hp, player)
                },
                subSkill: {
                    recover: {
                        trigger: {
                            player: "damageEnd",
                        },
                        forced: true,
                        popup: false,
                        charlotte: true,
                        filter: function (event, player) {
                            return event.skill = 'rasali_hq';
                        },
                        content: function () {
                            player.recover(trigger.player.storage.rasali_hq_recover);
                            trigger.player.storage.rasali_hq_recover = 0
                        },
                    }
                }
            },
            'rasali_ly': {
                trigger: {
                    global: 'dyingBefore'
                },
                marktext: "引",
                intro: {
                    markcount: "expansion",
                    mark: function (dialog, content, player) {
                        var content = player.getExpansions('rasali_ly');
                        if (content && content.length) {
                            if (player == game.me || player.isUnderControl()) {
                                dialog.addAuto(content);
                            }
                            else {
                                return '共有' + get.cnNumber(content.length) + '张引';
                            }
                        }
                    },
                    content: function (content, player) {
                        var content = player.getExpansions('rasali_ly');
                        if (content && content.length) {
                            if (player == game.me || player.isUnderControl()) {
                                return get.translation(content);
                            }
                            return '共有' + get.cnNumber(content.length) + '张引';
                        }
                    },
                },
                onremove: function (player, skill) {
                    var cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                usable: 1,
                frequent: true,
                content: function () {
                    'step 0'
                    player.addToExpansion(get.cards(4), 'draw').gaintag.add('rasali_ly');
                    'step 1'
                    var cards = player.getExpansions('rasali_ly');
                    if (!cards.length) {
                        event.finish();
                        return;
                    } else if (!player.countCards('h')) {
                        event.goto(3)
                    }
                    var next = player.chooseToMove('对' + get.translation(trigger.player) + '发动【灵引】：交换“引”和手牌？');
                    next.set('list', [
                        [get.translation(player) + '（你）的引', cards],
                        ['手牌区', player.getCards('h')],
                    ]);
                    next.set('filterMove', function (from, to) {
                        return typeof to != 'number';
                    });
                    next.set('processAI', function (list) {
                        var player = _status.event.player, cards = list[0][1].concat(list[1][1]).sort(function (a, b) {
                            return get.useful(a) - get.useful(b);
                        }), cards2 = cards.splice(0, player.getExpansions('rasali_ly').length);
                        return [cards2, cards];
                    });
                    'step 2'
                    if (result.bool) {
                        var pushs = result.moved[0], gains = result.moved[1];
                        pushs.removeArray(player.getExpansions('rasali_ly'));
                        gains.removeArray(player.getCards('h'));
                        if (!pushs.length || pushs.length != gains.length) return;
                        player.addToExpansion(pushs, player, 'giveAuto').gaintag.add('rasali_ly');
                        game.log(player, '将', pushs, '作为“引”置于武将牌上');
                        player.gain(gains, 'gain2');
                    }
                    'step 3'
                    var cards = player.getExpansions('rasali_ly');
                    var suit = []
                    var color = []
                    for (var i of cards) {
                        if (!suit.contains(get.suit(i))) {
                            suit.push(get.suit(i))
                        }
                        if (!color.contains(get.color(i))) {
                            color.push(get.color(i))
                        }
                    }
                    if (suit.length == cards.length) {
                        player.discard(cards)
                        player.line(trigger.player)
                        trigger.player.die()
                        if (player.countCards('h') == 0 && game.me == player && (player.name == 'fr_rasali' || player.name2 == 'fr_rasali' || player.name2 == 'fr_rasali') && !game.frAchi.hasAchi('神仙难救', 'character')) {
                            game.frAchi.addProgress('神仙难救', 'character')
                        }
                    }
                    if (color.length == 1) {
                        trigger.player.recover(1 - trigger.player.hp)
                        trigger.player.gain(cards, player, 'giveAuto')
                        trigger.player.chooseToDiscard('h', 2, true)
                    }
                    if (suit.length == 1) {
                        trigger.player.recover(1)
                        if (trigger.player.countCards('h') < trigger.player.maxHp) {
                            trigger.player.draw(2)
                        }
                        trigger.player.addMark('rasali_ly_shan', 1)
                    }
                    'step 4'
                    var cards = player.getExpansions('rasali_ly');
                    if (cards.length) {
                        player.gain(cards, 'gain2')
                        player.chooseToDiscard('h', 2, true)
                    }
                },
                group: 'rasali_ly_shan',
                subSkill: {
                    shan: {
                        trigger: {
                            global: 'damageBegin1'
                        },
                        marktext: '善',
                        intro: {
                            mark: function (dialog, storage, player) {
                                dialog.addText('你可以免疫接下来' + get.cnNumber(storage) + '次伤害，若此伤害有来源，' + get.translation(player) + '对伤害来源造成1点伤害。')
                            }
                        },
                        direct: true,
                        filter: function (event, player) {
                            return event.player.countMark('rasali_ly_shan') > 0 && event.num > 0
                        },
                        content: function () {
                            'step 0'
                            trigger.cancel()
                            if (trigger.source) {
                                trigger.source.damage(player)
                            }
                            'step 1'
                            trigger.player.removeMark('rasali_ly_shan', 1)
                        }
                    }
                }
            },
            'zhan_sf': {
                trigger: {
                    player: 'damageEnd'
                },
                forced: true,
                init: function (player, skill) {
                    player.addSkillBlocker(skill);
                },
                onremove: function (player, skill) {
                    player.removeSkillBlocker(skill);
                },
                locked: true,
                skillBlocker: function (skill, player) {
                    return skill != 'zhan_sf' && skill != 'zhan_jf' && !lib.skill[skill].charlotte;
                },
                content: function () {
                    'step 0'
                    event.count = trigger.num;
                    'step 1'
                    event.count--;
                    var choiceList = ['获得一张指定类型的牌'];
                    if (player.canMoveCard()) choiceList.push('移动场上的一张牌');
                    player.chooseControl('cancel2').set('choiceList', choiceList).set('prompt', get.prompt('zhan_sf')).set('ai', function () {
                        var player = _status.event.player;
                        if (player.canMoveCard(true)) return 1;
                        return 0;
                    });
                    'step 2'
                    if (result.control == 'cancel2') event.finish();
                    else {
                        player.logSkill('zhan_sf');
                        if (result.index == 0) {
                            player.chooseControl('basic', 'trick', 'equip').set('prompt', '选择获得一种类型的牌').set('ai', function () {
                                var player = _status.event.player;
                                if (player.hp <= 3 && !player.countCards('h', { name: ['shan', 'tao'] })) return 'basic';
                                if (player.countCards('he', { type: 'equip' }) < 2) return 'equip';
                                return 'trick';
                            });
                        }
                        else {
                            player.moveCard(true);
                            event.goto(4);
                        }
                    }
                    'step 3'
                    var card = get.cardPile2(function (card) {
                        return get.type(card, 'trick') == result.control;
                    });
                    if (card) player.gain(card, 'gain2', 'log');
                    'step 4'
                    if (event.count > 0) event.goto(1);
                },
                group: 'zhan_sf_1',
                subSkill: {
                    1: {
                        trigger: {
                            player: "damageAfter"
                        },
                        forced: true,
                        content: function () {
                            player.recover()
                        }
                    }
                },
                ai: {
                    maixie: true,
                    "maixie_hp": true,
                    effect: {
                        target: function (card, player, target) {
                            if (get.tag(card, 'damage')) {
                                if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
                                if (!target.hasFriend()) return;
                                var num = 1;
                                if (get.attitude(player, target) > 0) {
                                    if (player.needsToDiscard()) {
                                        num = 0.7;
                                    }
                                    else {
                                        num = 0.5;
                                    }
                                }
                                if (target.hp >= 4) return [1, num * 2];
                                if (target.hp == 3) return [1, num * 1.5];
                                if (target.hp == 2) return [1, num * 0.5];
                            }
                        },
                    },
                },
            },
            'zhan_jf': {
                trigger: {
                    player: 'phaseZhunbeiBegin'
                },
                skillAnimation: true,
                animationColor: "orange",
                init: function (player) {
                    if (!player.storage.zhan_jf) player.storage.zhan_jf = 0
                },
                filter: function (event, player) {
                    return player.storage.zhan_jf >= 2 * player.hp
                },
                juexingji: true,
                forced: true,
                mark: true,
                intro: {
                    content: "当前累计受到与造成了总计$点伤害",
                },
                content: function () {
                    'step 0'
                    player.awakenSkill('zhan_jf');
                    player.gainMaxHp();
                    player.recover()
                    player.removeSkill('zhan_sf')
                    'step 1'
                    player.addSkill('zhan_jn')
                    player.addSkill('zhan_zb')
                    "step 2"
                    player.chooseTarget([1, Math.floor(game.countPlayer() / 2)], "令至多" + get.translation(Math.floor(game.countPlayer() / 2)) + "名角色获得〖厄临〗", function (card, target, player) {
                        return target != player
                    }, false).set('ai', function (target) {
                        return -get.attitude(_status.event.player, target) * (1 + target.countCards('j'))
                    })
                    "step 3"
                    if (result.bool) {
                        for (var i = 0; i < result.targets.length; i++) {
                            result.targets[i].addSkill('fr_elin')
                        }
                    }
                },
                derivation: ["zhan_jn", "zhan_zb", "fr_elin"],
                group: "zhan_jf_count",
                subSkill: {
                    count: {
                        charlotte: true,
                        forced: true,
                        trigger: {
                            player: "damageBegin4",
                            source: "damageBegin4",
                        },
                        content: function () {
                            player.storage.zhan_jf += trigger.num
                            player.updateMark('zhan_jf')
                        },
                        sub: true,
                    },
                },
            },
            'zhan_jn': {
                trigger: {
                    player: 'phaseZhunbeiBegin'
                },
                mod: {
                    maxHandcardBase: function (player, num) {
                        return player.maxHp + player.hujia;
                    },
                },
                popup: false,
                direct: true,
                content: function () {
                    'step 0'
                    if (player.maxHp < 10) player.gainMaxHp()
                    'step 1'
                    if (player.hujia < 5) player.changeHujia(1)
                }
            },
            'zhan_zb': {
                trigger: {
                    global: 'phaseBegin'
                },
                filter: function (event, player) {
                    return event.player.hp < player.maxHp && event.player != player
                },
                check: function (event, player) {
                    return get.attitude(player, event.player) < 0
                },
                content: function () {
                    'step 0'
                    player.chooseNumber([1, player.maxHp], player.maxHp)
                        .set("prompt", get.prompt2(event.name))
                        .set("ai", function (player, _event) {
                            if (trigger.player.isUnknown()) return 1
                            return Math.min(trigger.player.hp, player.getDamagedHp())
                        })
                    'step 1'
                    if (result.bool) {
                        player.loseMaxHp(result.choice)
                        trigger.player.damage(result.choice, player, 'thunder')
                    }
                }
            },
            'derk_liuyan': {
                audio: 2,
                enable: "phaseUse",
                filter: function (event, player) {
                    return player.countCards('he') > 1;
                },
                filterCard: true,
                position: "he",
                selectCard: [2, Infinity],
                check: function (card) {
                    if (ui.selected.cards.length > 1) return 0;
                    return 4 - get.value(card);
                },
                content: function () {
                    var num = 0;
                    for (var i of cards) num += get.number(i, player);
                    var numx = (num % 13 == 0 ? 13 : (num % 13));
                    var card = get.cardPile2(function (card) {
                        return get.number(card, false) == numx;
                    });
                    if (card) player.gain(card, 'gain2');
                },
                ai: {
                    order: 1,
                    result: {
                        player: 1,
                    },
                },
            },
            'derk_ly': {
                locked: false,
                mod: {
                    cardUsable: function (card, player) {
                        var color1 = get.color(card), evt = player.getLastAllUsed();
                        if (evt && evt.card && color1 == get.color(evt.card)) return Infinity;
                    },
                    aiOrder: function (player, card, num) {
                        if (typeof card == 'object' && player.isPhaseUsing()) {
                            var evt = player.getLastAllUsed(1);
                            var evtb = player.getLastAllUsed(2)
                            if (evt && evt.card && evtb && evtb.card && (evtb.card.number && evt.card.number && ((get.number(evt.card, false) + get.number(evtb.card, false)) % 13) == get.number(card))) {
                                return num + 10;
                            }
                            var cards = player.getCards('hs').remove(card)
                            var cardlist = []
                            for (var i = 0; i < cards.length; i++) {
                                cardlist.push(get.number(cards[i]))
                            }
                            if (evt && evt.card) {
                                var value2 = (get.number(card) + get.number(evt.card)) % 13
                                value2 = value2 == 0 ? 13 : value2
                                if (cardlist.contains(value2)) return num + 3
                            }
                        }
                    },
                },
                trigger: {
                    player: "useCard",
                },
                mark: true,
                intro: {
                    markcount: function (storage, player) {
                        var evt = player.getLastAllUsed();
                        var evt1 = player.getLastAllUsed(1);
                        if (evt && evt1 && evt.card && evt1.card) {
                            var value = (get.number(evt.card, false) + get.number(evt1.card, false)) % 13
                            value = value == 0 ? 13 : value
                            return get.strNumber(value)
                        }
                        return
                    },
                    mark: function (dialog, storage, player, skill) {
                        var evt = player.getLastAllUsed();
                        var evt1 = player.getLastAllUsed(1);
                        if (evt && evt.card) {
                            dialog.addText('你上一张使用牌的点数为' + get.number(evt.card))
                            dialog.addText('你使用' + get.translation(get.color(evt.card)) + '的牌无次数限制')
                        }
                        if (evt && evt.card && evt1 && evt1.card) {
                            var value = (get.number(evt.card, false) + get.number(evt1.card, false)) % 13
                            value = value == 0 ? 13 : value
                            dialog.addText('当你使用点数为' + get.strNumber(value) + '的牌时，你摸两张牌')
                        }
                    }
                },
                frequent: true,
                filter: function (event, player) {
                    var evt = player.getLastAllUsed(1);
                    if (!evt || !evt.card) return false;
                    if (!player.isPhaseUsing()) return false;
                    var evtb = player.getLastAllUsed(2);
                    if (!evtb || !evtb.card) return false;
                    var value = (get.number(evt.card, false) + get.number(evtb.card, false)) % 13
                    value = value == 0 ? 13 : value
                    return typeof get.number(evt.card, false) == 'number' && typeof get.number(evtb.card, false) == 'number' && (value == get.number(event.card));
                },
                content: function () {
                    'step 0'
                    player.draw(2);
                },
            },
            'crow_my': {
                mark: true,
                popup: false,
                trigger: {
                    target: "useCardToTargeted",
                },
                onremove: true,
                intro: {
                    content: "已记录牌名：$",
                },
                filter: function (event, player) {
                    return get.type2(event.card) == 'trick' && _status.currentPhase != player
                },
                check: function (event, player) {
                    return get.effect(player, event.card, event.player, player) < 0;
                },
                content: function () {
                    'step 0'
                    player.judge('crow_my', function (card) { return (get.suit(card) != 'spade') ? 1.5 : -0.5 }).judge2 = function (result) {
                        return result.bool;
                    };
                    'step 1'
                    if (result.judge > 0) {
                        player.markAuto('crow_my', [trigger.card.name])
                        trigger.targets.remove(player);
                        trigger.getParent().triggeredTargets2.remove(player);
                        trigger.untrigger();
                    }
                },
                group: 'crow_my_clean',
                subSkill: {
                    clean: {
                        trigger: {
                            global: 'roundStart'
                        },
                        popup: false,
                        preHidden: true,
                        charlotte: true,
                        forced: true,
                        content: function () {
                            delete player.storage.crow_my
                        }
                    }
                }
            },
            'crow_mc': {
                forced: true,
                trigger: {
                    global: "useCard",
                },
                filter: function (event, player) {
                    return get.zhinangs().contains(event.card.name) || player.getStorage('crow_my').contains(event.card.name)
                },
                content: function () {
                    player.draw();
                },
                ai: {
                    threaten: 1.4,
                    noautowuxie: true,
                },
            },
            'crow_td': {
                audio: 2,
                inherit: "tiandu",
                trigger: {
                    player: "judgeEnd",
                },
                preHidden: true,
                frequent: function (event) {
                    if (event.result.card.name == 'du') return false;
                    //if(get.mode()=='guozhan') return false;
                    return true;
                },
                check: function (event) {
                    if (event.result.card.name == 'du') return false;
                    return true;
                },
                filter: function (event, player) {
                    return get.position(event.result.card, true) == 'o';
                },
                content: function () {
                    player.gain(trigger.result.card, 'gain2');
                },
            },
            'sheep_jf': {
                enable: 'phaseUse',
                usable: 1,
                integrate: function (a, b) {
                    let f = '';
                    var x1 = Math.floor(20 * Math.random() - 10);
                    var x2 = Math.floor(20 * Math.random() - 10);
                    var x3 = Math.floor(20 * Math.random() - 10);
                    f = ((x1 == 1 ? '' : x1) == -1 ? '-' : x1) + 'x² ' + (x2 < 0 ? "" : "+") + ((x2 == 1 ? '' : x2) == -1 ? '-' : x2) + 'x ' + (x3 < 0 ? "" : "+") + ((x3 == 1 ? '' : x3) == -1 ? '-' : x3)
                    const A = ((x1 / 3) * Math.pow(b, 3) + (x2 / 2) * Math.pow(b, 2) + (x3 * b)) - ((x1 / 3) * Math.pow(a, 3) + (x2 / 2) * Math.pow(a, 2) + (x3 * a));
                    const error1 = A + ((Math.floor(Math.random() * 11) - 5) / 10) * A + 1;
                    const error2 = A + ((Math.floor(Math.random() * 21) - 10) / 100) * A + 2;
                    const error3 = A + ((Math.floor(Math.random() * 51) - 25) / 100) * A + 3;
                    return {
                        f: f,
                        results: [A, error1, error2, error3],
                    };
                },
                content: function () {
                    'step 0'
                    event.cards = get.cards(2)
                    player.showCards(event.cards);
                    player.discard(event.cards)
                    'step 1'
                    if (event.isMine()) {
                        var num1 = get.number(event.cards[0]), num2 = get.number(event.cards[1])
                        var cardnum = [num1, num2].sort((a, b) => {
                            return a - b;
                        });
                        event.result = lib.skill.sheep_jf.integrate(cardnum[0], cardnum[1])
                        event.choices = event.result.results.slice().sort(() => Math.random() - 0.5)
                        player.chooseControl()
                            .set('choiceList', event.choices).set('ai', function () {
                                return event.result.results[0]
                            }).set('prompt', '函数' + event.result.f + '在' + '[' + cardnum[0] + ',' + cardnum[1] + ']' + '上的积分结果为')
                    } else {
                        game.log(player, '计算正确')
                        event.cards = get.cards(5)
                        player.showCards(event.cards);
                        player.gain(event.cards, 'gain2');
                        player.chooseControl().set('choiceList', [
                            '将五张牌交给一名其他角色',
                            '弃置五张牌',
                        ]).set('ai', function () {
                            if (game.hasPlayer(function (current) {
                                return current != player && get.attitude(player, current) > 2;
                            })) return 0;
                            return 1;
                        });
                        event.goto(3)
                    }
                    'step 2'
                    if (event.choices[result.index] === event.result.results[0]) {
                        game.log(player, '计算正确')
                        event.cards = get.cards(5)
                        player.showCards(event.cards);
                        player.gain(event.cards, 'gain2');
                        player.chooseControl().set('choiceList', [
                            '将五张牌交给一名其他角色',
                            '弃置五张牌',
                        ]).set('ai', function () {
                            if (game.hasPlayer(function (current) {
                                return current != player && get.attitude(player, current) > 2;
                            })) return 0;
                            return 1;
                        });
                    } else {
                        game.log(player, '计算错误')
                        event.finish()
                    }
                    'step 3'
                    if (result.index == 0) {
                        player.chooseCardTarget({
                            position: 'he',
                            filterCard: true,
                            selectCard: 5,
                            filterTarget: function (card, player, target) {
                                return player != target;
                            },
                            ai1: function (card) {
                                return 1;
                            },
                            ai2: function (target) {
                                var att = get.attitude(_status.event.player, target);
                                return att;
                            },
                            prompt: '请选择要送人的卡牌',
                            forced: true,
                        });
                    }
                    else {
                        player.chooseToDiscard(5, true, 'he');
                        event.finish();
                    }
                    'step 4'
                    if (result.bool) {
                        var target = result.targets[0];
                        player.give(result.cards, target);
                    }
                },
                ai: {
                    order: 7.5,
                    result: {
                        player: 1,
                    },
                },
            },
            'sheep_rh': {
                enable: "phaseUse",
                filter: function (event, player) {
                    return player.countCards('he', function (card) {
                        return get.type(card) == 'equip'
                    }) >= 2
                },
                filterCard: function (card) {
                    if (ui.selected.cards.length && card.name == ui.selected.cards[0].name) return false;
                    var info = get.info(card);
                    return info.type == 'equip';
                },
                selectCard: 2,
                position: "he",
                check: function (card) {
                    return get.value(card);
                },
                content: function () {
                    var name = cards[0].name + '_' + cards[1].name;
                    var info1 = get.info(cards[0]), info2 = get.info(cards[1]);
                    if (!lib.card[name]) {
                        var info = {
                            enable: true,
                            type: 'equip',
                            subtype: get.subtype(cards[0]),
                            vanish: true,
                            cardimage: info1.cardimage || cards[0].name,
                            filterTarget: function (card, player, target) {
                                return target == player;
                            },
                            selectTarget: -1,
                            modTarget: true,
                            content: lib.element.content.equipCard,
                            legend: true,
                            source: [cards[0].name, cards[1].name],
                            onEquip: [],
                            onLose: [],
                            skills: [],
                            distance: {},
                            ai: {
                                order: 8.9,
                                equipValue: 10,
                                useful: 2.5,
                                value: function (card, player) {
                                    var value = 0;
                                    var info = get.info(card);
                                    var current = player.getEquip(info.subtype);
                                    if (current && card != current) {
                                        value = get.value(current, player);
                                    }
                                    var equipValue = info.ai.equipValue || info.ai.basic.equipValue;
                                    if (typeof equipValue == 'function') return equipValue(card, player) - value;
                                    return equipValue - value;
                                },
                                result: {
                                    target: function (player, target) {
                                        return get.equipResult(player, target, name);
                                    }
                                }
                            }
                        }
                        for (var i in info1.distance) {
                            info.distance[i] = info1.distance[i];
                        }
                        for (var i in info2.distance) {
                            if (typeof info.distance[i] == 'number') {
                                info.distance[i] += info2.distance[i];
                            }
                            else {
                                info.distance[i] = info2.distance[i];
                            }
                        }
                        if (info1.skills) {
                            info.skills = info.skills.concat(info1.skills);
                        }
                        if (info2.skills) {
                            info.skills = info.skills.concat(info2.skills);
                        }
                        if (info1.onEquip) {
                            if (Array.isArray(info1.onEquip)) {
                                info.onEquip = info.onEquip.concat(info1.onEquip);
                            }
                            else {
                                info.onEquip.push(info1.onEquip);
                            }
                        }
                        if (info2.onEquip) {
                            if (Array.isArray(info2.onEquip)) {
                                info.onEquip = info.onEquip.concat(info2.onEquip);
                            }
                            else {
                                info.onEquip.push(info2.onEquip);
                            }
                        }
                        if (info1.onLose) {
                            if (Array.isArray(info1.onLose)) {
                                info.onLose = info.onLose.concat(info1.onLose);
                            }
                            else {
                                info.onLose.push(info1.onLose);
                            }
                        }
                        if (info2.onLose) {
                            if (Array.isArray(info2.onLose)) {
                                info.onLose = info.onLose.concat(info2.onLose);
                            }
                            else {
                                info.onLose.push(info2.onLose);
                            }
                        }
                        if (info.onEquip.length == 0) delete info.onEquip;
                        if (info.onLose.length == 0) delete info.onLose;
                        lib.card[name] = info;
                        lib.translate[name] = get.translation(cards[0].name, 'skill') + get.translation(cards[1].name, 'skill');
                        var str = lib.translate[cards[0].name + '_info'];
                        if (str[str.length - 1] == '.' || str[str.length - 1] == '。') {
                            str = str.slice(0, str.length - 1);
                        }
                        lib.translate[name + '_info'] = str + '；' + lib.translate[cards[1].name + '_info'];
                        try {
                            game.addVideo('newcard', null, {
                                name: name,
                                translate: lib.translate[name],
                                info: lib.translate[name + '_info'],
                                card: cards[0].name,
                                legend: true,
                            });
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                    player.gain(game.createCard({ name: name, suit: cards[0].suit, number: cards[0].number }), 'gain2');
                },
                ai: {
                    order: 9.5,
                    result: {
                        player: 1,
                    },
                },
                group: 'sheep_rh_recover',
                subSkill: {
                    recover: {
                        prompt: "重铸一张装备牌，然后将体力回复至1点。",
                        enable: "chooseToUse",
                        filterCard: function (card) {
                            return get.type(card) == 'equip';
                        },
                        filter: function (event, player) {
                            if (event.type == 'dying') {
                                if (player != event.dying) return false;
                                return player.countCards('he', function (card) {
                                    return get.type(card) == 'equip';
                                }) > 0;
                            }
                            return false;
                        },
                        check: function () {
                            return 1;
                        },
                        position: "he",
                        discard: false,
                        loseTo: "discardPile",
                        prepare: function (cards, player) {
                            player.$throw(cards, 1000);
                            game.log(player, '将', cards, '置入了弃牌堆')
                        },
                        content: function () {
                            'step 0'
                            player.draw();
                            'step 1'
                            var num = 1 - player.hp;
                            if (num) player.recover(num);
                        },
                        ai: {
                            order: 0.5,
                            skillTagFilter: function (player, arg, target) {
                                if (player != target) return false;
                                return player.countCards('he', function (card) {
                                    if (_status.connectMode && get.position(card) == 'h') return true;
                                    return get.subtype(card) == 'equip2';
                                }) > 0;
                            },
                            save: true,
                            result: {
                                player: function (player) {
                                    return 10;
                                },
                            },
                        },
                    }
                }
            },
            'bladewolf_rh': {
                trigger: {
                    player: "die",
                },
                forceDie: true,
                forced: true,
                skillAnimation: true,
                animationColor: "orange",
                init: function (player) {
                    if (!player.storage.bladewolf_rh) player.storage.bladewolf_rh = 0
                },
                mark: true,
                intro: {
                    content: '当前累计受到了$点伤害'
                },
                content: function () {
                    'step 0'
                    if (player.storage.bladewolf_rh <= 0) {
                        if (!game.frAchi.hasAchi('拆弹成功', 'character') && playe.name == 'fr_bladewolf') {
                            game.frAchi.addProgress('拆弹成功', 'character')
                        }
                        event.finish()
                    }
                    'step 1'
                    player.chooseTarget(1, '请选择你要分配伤害的目标，你目前可以分配' + player.storage.bladewolf_rh + '点伤害', function (card, player, target) {
                        return target != player
                    }).set('ai', function (target) {
                        var player = _status.event.player
                        return get.damageEffect(target, null, player, player, 'fire');
                    }).set('forceDie', true)
                    'step 2'
                    if (result.bool) {
                        event.target = result.targets[0]
                        player.chooseNumber([1, player.storage.bladewolf_rh], player.storage.bladewolf_rh)
                            .set("prompt", get.prompt2('bladewolf_rh'))
                            .set("ai", function (player, _event) {
                                if (event.target.isUnknown()) return 1
                                return Math.min(event.target.hp, player.storage.bladewolf_rh)
                            })
                            .set('forceDie', true)
                    } else {
                        event.finish()
                    }
                    'step 3'
                    if (result.bool) {
                        if (result.choice >= 15 && game.me == player && !game.frAchi.hasAchi('链式反应', 'character') && (player.name == 'fr_bladewolf' || player.name1 == 'fr_bladewolf' || player.name2 == 'fr_bladewolf')) {
                            game.frAchi.addProgress('链式反应', 'character')
                        }
                        event.target.damage(result.choice, player, 'fire')
                        player.storage.bladewolf_rh -= result.choice
                    }
                    'step 4'
                    if (player.storage.bladewolf_rh > 0) {
                        event.goto(1)
                    }
                },
                group: 'bladewolf_rh_count',
                subSkill: {
                    count: {
                        charlotte: true,
                        forced: true,
                        trigger: {
                            player: 'damageBegin4'
                        },
                        content: function () {
                            player.storage.bladewolf_rh += trigger.num
                        }
                    }
                }
            },
            'bladewolf_qp': {
                shunfa: true,
                init: function (player) {
                    player.FrShunfajiInit('bladewolf_qp')
                },
                filter: function (event, player) {
                    return _status.currentPhase && _status.currentPhase != player && !player.storage.bladewolf_qp_ai_roundcount
                },
                round: 1,
                content: function () {
                    _status.currentPhase.damage(1, player)
                },
                group: ['bladewolf_qp_kill', 'bladewolf_qp_ai'],
                subSkill: {
                    ai: {
                        trigger: {
                            global: ['damageAfter', 'loseHpAfter', 'recoverAfter', 'phaseBegin', 'drawAfter', 'useCardAfter', 'discardAfter']
                        },
                        round: 1,
                        filter: function (event, player) {
                            return _status.currentPhase && _status.currentPhase != player &&
                                _status.currentPhase.hp == 1 && (_status.auto || !player.isUnderControl(true))
                                && get.attitude(player, _status.currentPhase) < 0 && get.damageEffect(_status.currentPhase, null, player, player) > 0;
                        },
                        forced: true,
                        content: function () {
                            _status.currentPhase.damage(1, player)
                        }
                    },
                    kill: {
                        trigger: {
                            source: "dieAfter",
                        },
                        frequent: true,
                        content: function () {
                            player.draw()
                            var roundname = 'bladewolf_qp_roundcount';
                            delete player.storage[roundname]
                            delete player.syncStorage(roundname);
                            player.unmarkSkill(roundname);
                            var roundname = 'bladewolf_qp_ai_roundcount';
                            delete player.storage[roundname]
                            delete player.syncStorage(roundname);
                            player.unmarkSkill(roundname);
                        },
                    }
                }
            },
            'tails_qx': {
                trigger: {
                    global: 'phaseEnd'
                },
                filter: function (event, player) {
                    var targets = [];
                    game.countPlayer2(current => {
                        var history = current.getHistory('useCard');
                        if (!history.length) return false;
                        for (var evt of history) {
                            if (evt.card) {
                                targets.addArray(evt.targets);
                            }
                        }
                    });
                    return event.player != player && !targets.contains(player)
                },
                direct: true,
                content: function () {
                    'step 0'
                    player.draw()
                    'step 1'
                    player.chooseToDiscard(1, 'he', '是否弃置一张牌并进行一次打造').set('ai', function (card) {
                        return 5 - get.value(card)
                    })
                    'step 2'
                    if (result.bool) {
                        event.suit = get.suit(result.cards[0])
                        var namelist = ['cixiong', 'fangtian', 'guanshi', 'hanbing', 'qilin', 'qinggang', 'qinglong', 'zhangba', 'zhuge', 'rewrite_zhuge',
                            "rewrite_bagua", "rewrite_baiyin", "rewrite_lanyinjia", "rewrite_renwang", "tengjia", 'guding', 'zhuque', "bagua", "baiyin", "lanyinjia", "renwang", "tengjia",
                            'dilu', 'jueying', 'zhuahuang', 'chitu', 'dawan', 'zixin', 'hualiu', 'muniu', 'bintieshuangji', 'wuxinghelingshan', 'wutiesuolian', 'wushuangfangtianji', 'chixueqingfeng',
                            'huxinjing', 'guilongzhanyuedao', 'heiguangkai', 'linglongshimandai', 'hongmianbaihuapao', 'qimenbagua', 'guofengyupao', 'zhaogujing', 'sanlve', 'tianjitu',
                            'taigongyinfu', 'shufazijinguan', 'xuwangzhimian', 'fr_equip5_wxpp', 'fr_equip1_syzg', 'fr_equip1_mhlq', 'fr_equip2_yyxl'].randomGets(5)
                        var choices = []
                        for (var i = 0; i < namelist.length; i++) {
                            choices.push(['equip', 8, namelist[i]])
                        }
                        player.chooseButton(['选择所需的卡牌', [choices, 'vcard']], true).set('ai', function (button) {
                            return Math.random()
                        })
                    } else {
                        event.finish()
                    }
                    'step 3'
                    event.nature = result.links[0][3];
                    event.cardname = result.links[0][2];
                    player.chooseTarget(1, '令一名角色装备' + get.translation(event.cardname) + "【" + get.translation(event.suit) + "8】", true).set('ai', function (target) {
                        var player = _status.event.player
                        return get.attitude(player, target)
                    })
                    'step 4'
                    var card1 = game.createCard(event.cardname, event.suit, 8, event.nature);
                    card1.storage.owner = player
                    var target = result.targets[0]
                    target.gain(card1, 'gain2')
                    if (target.canUse(card1, target, false)) target.equip(card1);
                    game.delay();
                },
                group: 'tails_qx_1',
                subSkill: {
                    1: {
                        trigger: {
                            player: "phaseZhunbeiBegin",
                        },
                        filter: function (event, player) {
                            var bool1 = false
                            for (var i of ['red', 'black']) {
                                if (player.countCards('h', { color: i }) > 1) { bool1 = true; }
                            }
                            var bool2 = false
                            var colors = []
                            game.hasPlayer(function (current) {
                                var cards = current.getCards('e', function (card) {
                                    return get.number(card) == 8
                                })
                                for (var j = 0; j < cards.length; j++) {
                                    if (!colors.contains(get.color(cards[j]))) colors.push(get.color(cards[j]))
                                }
                            })
                            if (colors.length) { bool2 = true }
                            return bool1 && player.countCards('he') > 0 && bool2
                        },
                        direct: true,
                        content: function () {
                            'step 0'
                            player.chooseToDiscard(2, get.prompt2('tails_qx'), 'hs', function (card) {
                                if (ui.selected.cards.length) {
                                    return get.color(card) == get.color(ui.selected.cards[0]);
                                }
                                var colors = []
                                game.hasPlayer(function (current) {
                                    if (current != player) {
                                        var cards = current.getCards('e', function (card) {
                                            return get.number(card) == 8
                                        })
                                        for (var j = 0; j < cards.length; j++) {
                                            if (!colors.contains(get.color(cards[j]))) colors.push(get.color(cards[j]))
                                        }
                                    }
                                })
                                if (!colors) return false
                                var cards = player.getCards('hs');
                                for (var i = 0; i < cards.length; i++) {
                                    if (card != cards[i]) {
                                        if (get.color(card) == get.color(cards[i]) && (colors.contains(get.color(card)))) return true;
                                    }
                                }
                                return false;
                            }).set('complexCard', true).set('ai', function (card) {
                                var player = _status.event.player
                                var num = game.countPlayer(function (current) {
                                    return current != player && get.attitude(player, current) < 0 && current.countCards('e', function (card) {
                                        return get.number(card) == 8 && get.color(card) == ui.selected.cards[0]
                                    }) > 0
                                })
                                if (num == 0) {
                                    return -1
                                } else {
                                    return 4 - get.value(card) + num
                                }
                            })
                            'step 1'
                            if (result.bool) {
                                event.color = get.color(result.cards[0])
                                player.chooseTarget([1, Infinity], true).set('ai', function (target) {
                                    var player = _status.event.player
                                    return -get.attitude(player, target)
                                }).set('prompt', '销毁任意角色的任意张点数为8的装备牌，并造成等量火焰伤害').set('filterTarget', function (card, player, target) {
                                    var color = _status.event.color
                                    return target.countCards('e', function (card) {
                                        return get.number(card) == 8 && get.color(card) == event.color
                                    }) > 0
                                })
                            } else {
                                event.finish()
                            }
                            'step 2'
                            event.targets = result.targets
                            'step 3'
                            event.target = event.targets.shift()
                            if (!event.target.isAlive()) event.goto(3)
                            var cards = event.target.getCards('e', function (card) {
                                return get.number(card) == 8 && get.color(card) == event.color
                            })
                            player.chooseCardButton(1, cards, '销毁' + get.translation(event.target) + '的一张装备牌', true).set('ai', function (button) {
                                return get.value(button.link, event.target);
                            })
                            'step 4'
                            var cards = result.links
                            for (var i = 0; i < cards.length; i++) {
                                cards[i]._destroy = '';
                            }
                            event.target.$throw(cards, 1000);
                            event.target.lose(cards)._triggered = null;
                            game.log(player, '销毁了', cards);
                            if (event.target.isAlive()) event.target.damage(cards.length, 'fire', player)
                            'step 5'
                            if (event.targets.length) {
                                event.goto(3)
                            }
                        }
                    }
                }
            },
            'tails_jd': {
                usable: 2,
                trigger: {
                    player: "useCardToPlayered",
                    target: "useCardToTargeted",
                },
                init: function (player, storage) {
                    if (!player.storage.tails_jd) player.storage.tails_jd = [0, true]
                },
                filter: function (event, player) {
                    if (event.player == event.target || event.targets.length != 1) return false;
                    return true
                },
                check: function (event, player) {
                    var target = player == event.player ? event.targets[0] : event.player
                    return get.attitude(player, target) < 0
                },
                content: function (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) {
                    'step 0'
                    event.target = player == trigger.player ? trigger.targets[0] : trigger.player
                    game.frPlayAudio('tails_argue_win')
                    player.chooseButton(['谋弈：请选择一种策略', [[['', '', 'fr_card_chongci'], ['', '', 'fr_card_zhuanyi']], 'vcard']], true).set('ai', function (button) {
                        var player = _status.event.player;
                        var target = _status.event.target;
                        if (player.attitudeTo(target) > 0) return (button.link[2] == "fr_card_zhuanyi") ? 1 : 0;
                        if (target.countGainableCards(player, 'e') < 1 && target.countDiscardableCards(player, 'h') < 2) return (button.link[2] == "fr_card_chongci") ? (1.7 + Math.random()) : (1 + Math.random());
                        return 1 + Math.random();
                    }).set('target', event.target);
                    'step 1'
                    event.mes = result.links[0][2];
                    if (event.mes == 'fr_card_zhuanyi') {
                        game.frPlayAudio('tails_change ')
                    } else if (event.mes == 'fr_card_chongci') {
                        game.frPlayAudio('tails_rush')
                    }
                    game.delay(2)
                    event.target.chooseToRespond(1, 'h', '选择打出一张【杀】或【闪】来响应“谋弈”', function (card) {
                        return get.name(card) == 'sha' || get.name(card) == 'shan'
                    }).set('ai', function (card) {
                        var target = _status.event.target
                        var player = _status.event.player
                        var att = get.attitude(player, target)
                        if (att > 0) {
                            return -1
                        } else {
                            return Math.random()
                        }
                    }).set('target', player)
                    'step 2'
                    if (result.bool) {
                        event.tes = result.card
                        player.$throw(game.createCard(event.mes, "", ""));
                        game.log(player, '选择的对策为', '#g' + get.translation(event.mes));
                        game.log(event.target, '选择的对策为', '#g' + get.translation(event.tes));
                        game.delay(0, 1500);
                    } else {
                        game.log(player, '选择的对策为', '#g' + get.translation(event.mes));
                    }
                    'step 3'
                    if ((event.tes && event.tes.name == 'sha' && event.mes == 'fr_card_zhuanyi') || (event.tes && event.tes.name == 'shan' && event.mes == 'fr_card_chongci')) {
                        if (player.storage.tails_jd[1]) player.storage.tails_jd[1] = false
                        game.log(player, '谋弈失败');
                        game.frPlayAudio('tails_argue_failed')
                        var cards = player.getCards('h');
                        if (cards.length) {
                            player.loseToDiscardpile(cards);
                            player.draw(cards.length);
                        }
                        event.finish()
                        return
                    } else {
                        game.log(player, '谋弈成功');
                        if (player.storage.tails_jd[1] && !game.frAchi.hasAchi('IQ:400', 'character') && player == game.me && (player.name == 'fr_tails' || player.name1 == 'fr_tails' || player.name2 == 'fr_tails')) {
                            player.storage.tails_jd[0] += 1
                            if (player.storage.tails_jd[0] >= 8) {
                                game.frAchi.addProgress('IQ:400', 'character')
                            }
                        }
                        if (player == trigger.player) {
                            trigger.excluded.add(event.target)
                        } else {
                            trigger.excluded.add(player);
                        }
                        if (event.mes == 'fr_card_zhuanyi') {
                            var str
                            if (player.next != player.previous) {
                                str = '与你的上家（' + get.translation(player.previous) + '）或你的下家（' + get.translation(player.next) + '）交换位置'
                            } else {
                                str = '与' + get.translation(player.next) + '交换位置'
                            }
                            player.chooseTarget(1, true, str, function (card, player, target) {
                                return target == player.next || target == player.previous
                            }).set('ai', function (target) {
                                return Math.random()
                            })
                        } else {
                            var cards = event.target.getCards('h');
                            if (cards.length) {
                                event.target.loseToDiscardpile(cards);
                                event.target.draw(cards.length);
                            }
                            var cards2 = player.getCards('e')
                            if (cards2.length) {
                                player.loseToDiscardpile(cards2);
                                player.draw(cards2.length);
                                event.target.damage(player)
                            }
                            event.finish()
                            return
                        }
                    }
                    'step 4'
                    event.temptarget = result.targets[0]
                    game.broadcastAll(function (target1, target2) {
                        game.swapSeat(target1, target2);
                    }, player, event.temptarget);
                    var num = player.countCards('h') - 2
                    if (num > 0) {
                        player.chooseToDiscard('h', num, true)
                    }
                    var ec = player.getCards('e', function (card) {
                        return get.subtype(card) == 'equip1'
                    })
                    if (ec.length) {
                        player.loseToDiscardpile(ec);
                        player.draw(ec.length);
                    }
                    'step 5'
                    if (event.temptarget.countCards('e') > 0) {
                        player.gainPlayerCard(event.temptarget, 'e').set('ai', function (button) {
                            var card = button.link;
                            return get.value(card);
                        }).set('filterButton', function (button) {
                            var card = button.link;
                            if (event.temptarget.countCards('e', function (card) {
                                return get.subtype(card) == 'equip1'
                            }) > 0) {
                                return get.subtype(card) == 'equip1'
                            }
                            return true
                        });
                    } else {
                        event.finish()
                    }
                    'step 6'
                    if (result.bool) {
                        var card = result.cards[0]
                        player.chooseUseTarget(card, 'nopopup')
                    }
                }
            },
            'dier_xy': {
                trigger: {
                    player: "useCardToTargeted",
                },
                forced: true,
                filter: function (event, player) {
                    return event.card.name == 'sha'
                },
                content: function () {
                    for (var i = 0; i < trigger.targets.length; i++) {
                        player.gainPlayerCard(trigger.targets[i], 1, true)
                    }
                }
            },
            'dier_sb': {
                trigger: {
                    target: "useCardToTargeted",
                },
                check: function (event, player) {
                    return get.attitude(player, event.player) < 0;
                },
                filter: function (event, player) {
                    return event.card.name == 'sha' && player.canCompare(event.player) > 0;
                },
                content: function () {
                    'step 0'
                    player.chooseToCompare(trigger.player);
                    trigger.getParent().excluded.add(player);
                    'step 1'
                    if (result.bool) {
                        player.draw(2)
                        trigger.player.loseHp()
                    } else {
                        player.loseHp()
                        player.discardPlayerCard(trigger.player, 'he', true);
                    }
                }
            },
            "ala_dy": {
                trigger: {
                    player: ["damageBegin"]
                },
                locked: true,
                frequent: true,
                filter: function (event, player) {
                    return event.source && event.num > 0 && event.source != player && event.source.isAlive()
                },
                check: function (event, player) {
                    return get.attitude(player, event.source) < 0
                },
                content: function () {
                    'step 0'
                    player.line(trigger.source, 'green');
                    player.chooseToDuiben(trigger.source);
                    'step 1'
                    if (result.bool) {
                        trigger.cancel()
                        player.line(trigger.source)
                        trigger.source.damage(trigger.num, player, trigger.nature)
                    }
                }
            },
            "ala_gm": {
                trigger: {
                    global: "damageBefore"
                },
                popup: false,
                filter: function (event, player) {
                    return event.source && event.source != player && event.player != player && event.player != event.source
                },
                check: function (event, player) {
                    return get.attitude(player, event.player) > 0 && player.hp > 1
                },
                content: function () {
                    'step 0'
                    trigger.player.chooseCard(Math.max(1, Math.floor(trigger.player.countCards('h') / 2)), 'h')
                        .set('prompt', '###是否对' + get.translation(trigger.source) + '发动【讨雠】？###交给' + get.translation(player) + get.cnNumber(Math.max(1, Math.floor(trigger.player.countCards('h') / 2))) + '张手牌，然后将此伤害转移给' + get.translation(player) + '并令其摸' + get.cnNumber(player.getDamagedHp() + 1) + '张牌')
                        .set('ai', function (card) {
                            var player = _status.event.player
                            var target = _status.event.target
                            var att = get.attitude(player, target)
                            if (trigger.num > 1 || (player.hp == 1 && player.countCards('hs', 'tao') == 0)) {
                                return 9 - get.value(card)
                            }
                            if (att > 0 && player.countCards('hs', 'tao') == 0) {
                                return 9 - get.value(card)
                            } else if (att > 0 && player.countCards('hs', 'tao') > 0) {
                                return 7 - get.value(card)
                            } else {
                                return 4 - get.value(card)
                            }
                        }).set('target', player)
                    'step 1'
                    if (result.bool) {
                        player.gain(result.cards, trigger.player, 'giveAuto')
                        player.draw(player.getDamagedHp() + 1)
                        trigger.player = player
                    }
                }
            },
            "liona_hz": {
                trigger: {
                    global: "roundStart",
                },
                init: function (player) { lib.skill.baonvezhi.change(player, 0) },
                direct: true,
                derivation: ["liona_zz"],
                group: "liona_hz_extra",
                filter: function (event, player) {
                    return game.hasPlayer(function (current) {
                        return !current.hasSkill('liona_zz');
                    }) && player.storage.baonvezhi > 0;
                },
                content: function () {
                    'step 0'
                    player.chooseTarget([1, player.storage.baonvezhi], get.prompt('liona_hz'), '令至多X名角色获得〖整战〗直到回合结束。', (card, player, target) => {
                        return !target.hasSkill('liona_zz');
                    }).set('ai', target => get.attitude(player, target) - 2);
                    'step 1'
                    if (result.bool) {
                        lib.skill.baonvezhi.change(player, -result.targets.length)
                        for (var i = 0; i < result.targets.length; i++) {
                            var target = result.targets[i]
                            target.addTempSkill('liona_zz', 'roundStart');
                        }
                    }
                },
                subSkill: {
                    extra: {
                        audio: 2,
                        trigger: {
                            global: "damageSource",
                        },
                        forced: true,
                        locked: false,
                        filter: function (event, player) {
                            return event.source && event.source.hasSkill('liona_zz') && event.source != player;
                        },
                        logTarget: "source",
                        content: function () {
                            lib.skill.baonvezhi.change(player, trigger.num);
                        },
                        sub: true,
                    },
                },
            },
            "liona_zz": {
                trigger: {
                    source: "damageAfter",
                },
                usable: 5,
                forced: true,
                content: function () {
                    var targets = game.filterPlayer(current => current.hasSkill('liona_zz')).sortBySeat();
                    player.line(targets, 'green');
                    game.asyncDraw(targets);
                },
            },
            "wore_bossty": {
                trigger: {
                    player: ["phaseDiscardSkipped", "phaseJudgeSkipped", "phaseDrawSkipped", "phaseUseSkipped", "phaseZhunbeiSkipped", "phaseJieshuSkipped", "phaseSkipped"],
                },
                init: function (player) {
                    var b = window.setInterval(function () {
                        if (player.hasSkill('wore_bosshy')) {
                            player.storage.wore_bosshy = true;
                        } else {
                            game.addGlobalSkill('wore_bossty');
                            game.addGlobalSkill('wore_bossty_mark');
                            game.addGlobalSkill('wore_bossty_remove');
                            window.clearInterval(b);
                        }
                    }, 1000);
                },
                filter: function (event, player) {
                    if (!player.storage.wore_bossty) return false
                    return true
                },
                forced: true,
                charlotte: true,
                priority: Infinity,
                content: function () {
                    trigger.cancel();
                },
                group: ["wore_bossty_mark", "wore_bossty_remove"],
                subSkill: {
                    mark: {
                        trigger: {
                            player: ["damageBegin4", "loseHpBegin", "loseMaxHpBegin"]
                        },
                        priority: -Infinity,
                        lastDo: true,
                        charlotte: true,
                        forced: true,
                        marktext: "天佑",
                        intro: {
                            name: "天佑",
                            content: "本回合已受到/失去#点伤害/体力",
                        },
                        filter: function (event, player) {
                            return event.num > 0;
                        },
                        content: function () {
                            'step 0'
                            event.count = trigger.num;
                            'step 1'
                            event.count--;
                            if (player.countMark("wore_bossty_mark") < game.roundNumber) {
                                player.addMark('wore_bossty_mark', 1);
                            }
                            else trigger.cancel();
                            'step 2'
                            if (event.count > 0) event.goto(1);
                        },
                        sub: true,
                    },
                    remove: {
                        trigger: {
                            global: "phaseEnd",
                        },
                        popup: false,
                        charlotte: true,
                        forced: true,
                        content: function () {
                            var m = player.countMark("wore_bossty_mark");
                            player.removeMark("wore_bossty_mark", m);
                            player.unmarkSkill('wore_bossty')
                        },
                        sub: true,
                    },
                },
            },
            'francium_yl': {
                trigger: {
                    player: ["useCardAfter"],
                    global: "dyingBefore"
                },
                usable: 3,
                filter: function (event, player, name) {
                    if (player.storage.hubian && name == 'useCardAfter') {
                        if (['equip', 'delay'].contains(get.type(event.card))) return false;
                        if (event.cards.filterInD().length <= 0) return false;
                        if (_status.currentPhase != player) return false
                        return true
                    } else if (name == 'dyingBefore' && !player.storage.hubian) {
                        if (_status.currentPhase == player) return false
                        return player.countCards('h') > 0 && event.player != player
                    } else {
                        return false
                    }
                },
                check: function (event, player) {
                    if (player.storage.hubian) {
                        return true;
                    } else {
                        return get.attitude(player, event.player) < 0
                    }
                },
                content: function () {
                    "step 0"
                    if (!player.storage.hubian) {
                        event.goto(3)
                    }
                    'step 1'
                    event.cards = trigger.cards.filterInD();
                    if (event.cards.length > 1) {
                        var next = player.chooseToMove('盈亏：将牌按顺序置于牌堆顶');
                        next.set('list', [['牌堆顶', event.cards]]);
                        next.set('reverse', ((_status.currentPhase && _status.currentPhase.next) ? get.attitude(player, _status.currentPhase.next) > 0 : false));
                        next.set('processAI', function (list) {
                            var cards = list[0][1].slice(0);
                            cards.sort(function (a, b) {
                                return (_status.event.reverse ? 1 : -1) * (get.value(b) - get.value(a));
                            });
                            return [cards];
                        });
                    }
                    "step 2"
                    if (result.bool && result.moved && result.moved[0].length) var cards = result.moved[0].slice(0);
                    while (cards.length) {
                        var card = cards.pop();
                        if (get.position(card, true) == 'o') {
                            card.fix();
                            ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
                            game.log(player, '将', card, '置于牌堆顶');
                        }
                    }
                    game.updateRoundNumber();
                    player.draw('bottom');
                    event.finish()
                    'step 3'
                    player.chooseCard(1, 'h', true).set('ai', function (card) {
                        return 5 - get.value(card)
                    })
                    'step 4'
                    player.useCard(result.cards, { name: 'sha' }, trigger.player, false).viewAs = true;
                },
            },
            'francium_mm': {
                unique: true,
                enable: "chooseToUse",
                mark: true,
                skillAnimation: true,
                limited: true,
                animationColor: "orange",
                init: function (player) {
                    player.storage.oldniepan = false;
                },
                filter: function (event, player) {
                    if (player.storage.francium_mm) return false;
                    if (event.type == 'dying') {
                        if (player != event.dying) return false;
                        return true;
                    }
                    return false;
                },
                content: function () {
                    'step 0'
                    player.awakenSkill('francium_mm');
                    'step 1'
                    if (player.hp < 2) {
                        player.recover(2 - player.hp);
                    }
                    player.removeSkill('francium_ch')
                },
                ai: {
                    order: 1,
                    skillTagFilter: function (player, arg, target) {
                        if (player != target || player.storage.francium_mm) return false;
                    },
                    save: true,
                    result: {
                        player: function (player) {
                            if (player.hp <= 0) return 10;
                            if (player.hp <= 2 && player.countCards('he') <= 1) return 10;
                            return 0;
                        },
                    },
                    threaten: function (player, target) {
                        if (!target.storage.francium_mm) return 0.6;
                    },
                },
                intro: {
                    content: "limited",
                },
            },
            'francium_ch': {
                trigger: {
                    player: 'phaseBegin'
                },
                init: function (player) {
                    player.markSkill('hubian')
                    game.broadcastAll(function (player) {
                        player.$changeHubian();
                    }, player);
                },
                forced: true,
                content: function () {
                    'step 0'
                    player.changeHubian()
                    if (!player.storage.hubian) {
                        player.setfrAvatar(player.name, player.name)
                    } else {
                        player.setfrAvatar(player.name, player.name + '2')
                    }
                },
                group: 'francium_ch_def',
                subSkill: {
                    def: {
                        trigger: {
                            player: 'damageBegin4'
                        },
                        filter: function (event, player) {
                            return event.source && event.source.countCards('h') > player.countCards('h')
                        },
                        forced: true,
                        content: function () {
                            trigger.num -= 1
                        },
                        ai: {
                            effect: {
                                target: function (card, player, target) {
                                    if (get.tag(card, 'damage') && target.countCards('h') < player.countCards('h')) {
                                        if (player.hasSkillTag('jueqing', false, target)) return;
                                        return 0.1;
                                    }
                                },
                            },
                        },
                    }
                }
            },
            'francium_sx': {
                enable: 'phaseUse',
                hubian: true,
                multitarget: true,
                complexTarget: true,
                delay: false,
                lose: false,
                multiline: true,
                discard: false,
                usable: 1,
                filterTarget: function (card, player, target) {
                    if (player.storage.hubian) {
                        return target.countCards('h') > 0
                    } else {
                        return player.canUse({ name: 'sha' }, target, false)
                    }
                },
                usable: 1,
                selectTarget: function () {
                    var player = _status.event.player
                    if (player.storage.hubian) {
                        return 2
                    } else {
                        return 1
                    }
                },
                filterCard: true,
                filter: function (event, player) {
                    if (player.storage.hubian) {
                        return true
                    } else {
                        return player.countCards('h') > 0
                    }
                },
                selectCard: function () {
                    var player = _status.event.player
                    if (player.storage.hubian) {
                        return 0
                    } else {
                        return -1
                    }
                },
                content: function () {
                    'step 0'
                    if (player.storage.hubian) {
                        targets[0].swapHandcards(targets[1]);
                        player.draw(2)
                        player.recover()
                        event.finish()
                    } else {
                        event.card = player.useCard(cards, { name: 'sha' }, targets[0], false).card;
                    }
                    'step 1'
                    if (player.getHistory('sourceDamage', function (evt) {
                        return event.card == evt.card;
                    }).length) {
                        player.draw(Math.min(6, targets[0].maxHp))
                    }
                },
                ai: {
                    threaten: 4.5,
                    pretao: true,
                    nokeep: true,
                    order: 6,
                    expose: 0.2,
                    result: {
                        target: function (player, target) {
                            if (player.storage.hubian) {
                                if (!ui.selected.targets.length) return -Math.sqrt(target.countCards('h'));
                                var h1 = ui.selected.targets[0].getCards('h'), h2 = target.getCards('h');
                                if (h2.length > h1.length) return 0;
                                var delval = get.value(h2, target) - get.value(h1, ui.selected.targets[0]);
                                if (delval >= 0) return 0;
                                return -delval * (h1.length - h2.length);
                            } else {
                                return -2
                            }
                        },
                    },
                },
            },
            'nanci_tqg': {
                trigger: {
                    global: 'phaseBegin'
                },
                frequent: true,
                content: function () {
                    'step 0'
                    var cards = get.cards(2);
                    player.chooseButton(['天启：选择获得一张红色牌，或从牌堆底摸一张牌。', cards.slice(0)], 1).set('ai', function (button) {
                        return get.value(button.link, _status.event.player);
                    }).set('filterButton', function (button) {
                        return get.color(button.link) == 'red'
                    });
                    while (cards.length) {
                        ui.cardPile.insertBefore(cards.pop(), ui.cardPile.firstChild);
                    }
                    'step 1'
                    if (result.bool) {
                        player.gain(result.links, 'gain2');
                    } else {
                        player.draw('bottom')
                    }
                }
            },
            'nanci_tmg': {
                enable: 'phaseUse',
                usable: 1,
                filterTarget: function (card, player, target) {
                    return target != player
                },
                direct: true,
                content: function () {
                    'step 0'
                    target.chooseToDiscard('天灭：弃置一张【闪】，否则' + get.translation(player) + '对你造成1点伤害。', function (card) {
                        return get.name(card) == 'shan';
                    }).set('ai', function (card) {
                        return 10 - get.value(card)
                    })
                    'step 1'
                    if (!result.bool) {
                        target.damage(player, 'fire')
                    }
                },
                ai: {
                    order: 7,
                    fireAttack: true,
                    result: {
                        target: function (player, target) {
                            if (target.hasSkillTag('nofire')) return 0;
                            if (lib.config.mode == 'versus') return -1;
                            if (player.hasUnknown()) return 0;
                            return get.damageEffect(target, player) - target.countCards('e');
                        },
                    },
                },
            },
            'nanci_tj': {
                forced: true,
                trigger: {
                    player: ['phaseEnd', 'damageEnd'],
                    source: ['damageEnd'],
                },
                unique: true,
                marktext: '狐火',
                mark: true,
                intro: {
                    content: '当前拥有$个“狐火”标记'
                },
                init: function (player, skill) {
                    player.addSkill('nanci_tq')
                    player.addSkill('nanci_tqg')
                    player.addSkill('nanci_tm')
                    player.addSkill('nanci_tmg')
                    player.addMark('nanci_tj', 2)
                    player.addSkillBlocker(skill);
                },
                onremove: function (player, skill) {
                    player.removeSkillBlocker(skill);
                    player.removeSkill('nanci_tq')
                    player.removeSkill('nanci_tqg')
                    player.removeSkill('nanci_tm')
                    player.removeSkill('nanci_tmg')
                },
                skillBlocker: function (skill, player) {
                    if (player.countMark('nanci_tj') == 0) {
                        return skill == 'nanci_tm' || skill == 'nanci_tmg' || skill == 'nanci_tqg' || skill == 'nanci_tq'
                    } else if (player.countMark('nanci_tj') == 1) {
                        return skill == 'nanci_tm' || skill == 'nanci_tmg' || skill == 'nanci_tqg'
                    } else if (player.countMark('nanci_tj') >= 2 && player.countMark('nanci_tj') <= 3) {
                        return skill == 'nanci_tmg' || skill == 'nanci_tqg'
                    } else if (player.countMark('nanci_tj') >= 4) {
                        return skill == 'nanci_tq' || skill == 'nanci_tm'
                    }
                },
                derivation: ["nanci_tq", "nanci_tm", "nanci_tqg", "nanci_tmg"],
                content: function () {
                    if (trigger.name == 'damage') {
                        if (trigger.player == player) {
                            if (player.countMark('nanci_tj') > 0) player.removeMark('nanci_tj', 1)
                            if (player.countMark('nanci_tj') < 4) {
                                player.setfrAvatar('fr_nanci', 'fr_nanci')
                            }
                        } else {
                            if (player.countMark('nanci_tj') < 5) player.addMark('nanci_tj', 1)
                            if (player.countMark('nanci_tj') >= 4) {
                                player.setfrAvatar('fr_nanci', 'fr_nanci2')
                            }
                        }
                    } else {
                        if (player.countMark('nanci_tj') < 5) player.addMark('nanci_tj', 1)
                        if (player.countMark('nanci_tj') >= 4) {
                            player.setfrAvatar('fr_nanci', 'fr_nanci2')
                        }
                    }
                },
            },
            'nanci_tq': {
                forced: true,
                trigger: {
                    player: 'phaseJieshuBegin'
                },
                init: function (player) {
                    if (!player.storage.nanci_tq) player.storage.nanci_tq = []
                },
                content: function () {
                    var list = [];
                    game.getGlobalHistory('cardMove', function (evt) {
                        if (evt.name == 'lose') {
                            if (evt.position == ui.discardPile) {
                                for (var i of evt.cards) {
                                    if (get.color(i) == 'red') list.add(i);
                                }
                            }
                        }
                        else {
                            if (evt.name == 'cardsDiscard') {
                                for (var i of evt.cards) {
                                    if (get.color(i) == 'red') list.add(i);
                                }
                            }
                        }
                    });
                    list = list.filterInD('d')
                    var cards = list.slice(0, 2)
                    player.gain(cards, 'gain2')
                    player.storage.nanci_tq = cards
                }
            },
            'nanci_tm': {
                enable: 'phaseUse',
                usable: 1,
                filterTarget: function (card, player, target) {
                    return target != player
                },
                content: function () {
                    var card1 = get.cardPile2(function (card) {
                        return get.name(card, false) == 'shan';
                    });
                    target.gain(card1, 'gain2')
                    target.chooseToDiscard(2, 'he', true)
                },
                ai: {
                    order: 7,
                    result: {
                        target: function (player, target) {
                            if (target.countCards('he') == 1) return -2
                            if (target.countCards('he') == 2) return -1
                            if (target.countCards('he') >= 3 && target.countCards('hs', 'shan') == 0) return 0.5
                            if (target == player) return 1
                            return -1
                        },
                    },
                    threaten: 1,
                }
            },
            'nanci_tx': {
                enable: 'phaseUse',
                filterCard: function (card) {
                    if (ui.selected.cards.length) {
                        return get.color(card) != get.color(ui.selected.cards[0]) && get.number(card) == get.number(ui.selected.cards[0])
                    } else {
                        return true
                    }
                },
                limited: true,
                mark: true,
                intro: {
                    content: "limited",
                },
                animationColor: "thunder",
                skillAnimation: "epic",
                complexCard: true,
                selectCard: 2,
                check: function (card) {
                    return 7 - get.value(card)
                },
                filter: function (event, player) {
                    var list = [];
                    for (var i = 0; i < game.dead.length; i++) {
                        if (game.dead[i].maxHp != 0) {
                            list.push(game.dead[i].name);
                        }
                    }
                    return list.length > 0;
                },
                content: function () {
                    "step 0"
                    player.awakenSkill('nanci_tx')
                    var list = [];
                    for (var i = 0; i < game.dead.length; i++) {
                        if (game.dead[i].maxHp != 0) {
                            list.push(game.dead[i].name);
                        }
                    }
                    player.chooseButton(ui.create.dialog('选择一名已死亡的角色令其复活', [list, 'character']), function (button) {
                        var player = _status.event.player
                        for (var i = 0; i < game.dead.length; i++) {
                            if (game.dead[i].name == button.link) {
                                var dead = game.dead[i];
                                return get.attitude(player, dead)
                            }
                        }
                    });
                    'step 1'
                    if (result.bool) {
                        for (var i = 0; i < game.dead.length && game.dead[i].name != result.buttons[0].link; i++);
                        var dead = game.dead[i];
                        dead.revive(1);
                        dead.changeHujia(1);
                        player.changeHujia(1)
                        var skills = dead.getSkills();
                        for (var j = 0; j < skills.length; j++) {
                            dead.markSkill(skills[j])
                        }
                        dead.checkMarks()
                        dead.addTempSkill('nanci_tx_gain')
                        dead.storage.nanci_tx_gain = player
                    }
                },
                subSkill: {
                    gain: {
                        mark: true,
                        trigger: {
                            global: "phaseEnd"
                        },
                        forced: true,
                        intro: {
                            mark: function (dialog, storage, player) {
                                dialog.addText('回合结束时，将手牌摸至与' + get.translation(player.storage.nanci_tx_gain) + '相同')
                            }
                        },
                        filter: function (event, player) {
                            return event.player == player.storage.nanci_tx_gain && player.storage.nanci_tx_gain.isIn()
                        },
                        content: function (player) {
                            var num = player.storage.nanci_tx_gain.countCards('h') - player.countCards('h')
                            if (num > 0) {
                                player.draw(num)
                            }
                            delete player.storage.nanci_tx_gain
                        }
                    }
                },
                ai: {
                    order: 3,
                    result: {
                        player: function (card, player) {
                            var list = [];
                            for (var i = 0; i < game.dead.length; i++) {
                                if (game.dead[i].maxHp != 0) {
                                    list.push(game.dead[i].name);
                                }
                            }
                            for (var i in list) {
                                if (get.attitude(player, i) > 0) return 1
                            }
                        }
                    }
                }
            },
            'kamijia_dr': {
                trigger: {
                    player: 'damageAfter'
                },
                firstDo: true,
                filter: function (event, player) {
                    return event.source && event.source != player
                },
                frequent: true,
                locked: true,
                content: function () {
                    'step 0'
                    player.draw(trigger.num)
                    'step 1'
                    var list = ['red', 'black']
                    player.chooseControl(list, 'cancel2').set('ai', function () {
                        return list.randomGet()
                    }).set('prompt', get.prompt2('kamijia_dr'))
                    'step 2'
                    if (result.control != 'cancel2') {
                        player.popup(get.translation(result.control))
                        player.judge('kamijia_dr', function (card) {
                            return (get.color(card) == result.control) ? 2 : -1
                        }).judge2 = function (result) {
                            return result.bool;
                        };
                    } else {
                        event.finish()
                    }
                    'step 3'
                    if (result.judge > 0) {
                        player.recover(trigger.num)
                    }
                },
            },
            'kamijia_sx': {
                enable: 'phaseUse',
                multitarget: true,
                discard: false,
                lose: false,
                delay: false,
                selectTarget: 2,
                complexTarget: true,
                targetprompt: ["获得牌", "使用目标"],
                filter: function (event, player) {
                    return player.countCards('h') > 0
                },
                filterTarget: function (card, player, target) {
                    if (ui.selected.targets.length) {
                        return true
                    } else {
                        return target != player
                    }
                },
                position: 'h',
                filterCard: true,
                selectCard: -1,
                content: function () {
                    'step 0'
                    targets[0].gain(cards, player, 'giveAuto')
                    targets[0].addTempSkill('kamijia_sx_unuse', { player: 'phaseAfter' })
                    if (!targets[0].storage.kamijia_sx_unuse) {
                        targets[0].storage.kamijia_sx_unuse = {
                            source: player,
                            target: [],
                            num: 0,
                            gain: 0
                        }
                    }
                    targets[0].storage.kamijia_sx_unuse.gain += cards.length
                    targets[0].storage.kamijia_sx_unuse.num++
                    targets[0].storage.kamijia_sx_unuse.target.push(targets[1])
                    'step 1'
                    var evt = _status.event.getParent('phaseUse');
                    if (evt) {
                        evt.skipped = true;
                    }
                },
                ai: {
                    order: 1,
                    result: {
                        player: 1,
                        target: function (player, target) {
                            if (ui.selected.targets.length) {
                                return -3
                            } else {
                                var pc = player.countCards('h')
                                var tc = target.countCards('h')
                                if (get.attitude(player, target) > 0) {
                                    return 3
                                } else {
                                    if (pc < 2) {
                                        return -3
                                    } else if (tc > pc) {
                                        return -1
                                    } else {
                                        return -2
                                    }
                                }
                            }
                        }
                    }
                },
                subSkill: {
                    'unuse': {
                        mark: true,
                        intro: {
                            mark: function (dialog, storage, player) {
                                dialog.addText('<li>①出牌阶段，你可以额外使用' + get.cnNumber(player.storage.kamijia_sx_unuse.num) + '张【杀】');
                                dialog.addText('<li>②你使用牌无距离限制')
                                dialog.addText(' <li>③你只能对' + get.translation(player.storage.kamijia_sx_unuse.target) + '和自己使用牌。')
                            },
                        },
                        onremove: function (player) {
                            delete player.storage.kamijia_sx_unuse
                        },
                        trigger: {
                            player: "loseAfter",
                            global: "loseAsyncAfter",
                        },
                        charlotte: true,
                        forced: true,
                        filter: function (event, player) {
                            if (event.type != 'discard' || event.getlx === false || event.getParent('phaseDiscard').player != player || !player.storage.kamijia_sx_unuse.source || !player.storage.kamijia_sx_unuse.source.isIn()) return false;
                            var evt = event.getl(player);
                            return evt && evt.cards2.filterInD('d').length > 0;
                        },
                        logTarget: function (event, player) {
                            return player.storage.kamijia_sx_unuse.source
                        },
                        content: function () {
                            'step 0'
                            if (trigger.delay === false) game.delay();
                            var cards = trigger.getl(player).cards2.filterInD('d')
                            if (Math.floor(player.storage.kamijia_sx_unuse.gain / 2) != 0 && cards.length) {
                                player.storage.kamijia_sx_unuse.source.chooseCardButton('获得' + get.translation(player) + '弃置的牌中至多' + get.cnNumber(Math.min(cards.length, 5, Math.floor(player.storage.kamijia_sx_unuse.gain / 2))) + '张牌', [1, Math.min(cards.length, 5, Math.floor(player.storage.kamijia_sx_unuse.gain / 2))], cards)
                                    .set('ai', function (button) {
                                        get.useful(button.link);
                                    })
                            } else {
                                event.finish()
                            }
                            'step 1'
                            if (result.bool) {
                                player.storage.kamijia_sx_unuse.source.gain(result.links, 'gain2')
                            } else {
                                event.finish()
                            }
                        },
                        mod: {
                            targetInRange: function (card, player, target, now) {
                                return true
                            },
                            playerEnabled: function (card, player, target) {
                                if (player != target && !player.storage.kamijia_sx_unuse.target.contains(target)) return false;
                            },
                            cardUsable: function (card, player, num) {
                                if (card.name == 'sha') return num + player.storage.kamijia_sx_unuse.num;
                            },
                        },
                    }
                }
            },
            'shark_yz': {
                enable: "phaseUse",
                usable: 1,
                init: function (player) {
                    player.storage.shark_yz = []
                },
                unique: true,
                initList: function (player) {
                    var list;
                    if (_status.characterlist) {
                        list = [];
                        for (var i = 0; i < _status.characterlist.length; i++) {
                            var name = _status.characterlist[i];
                            if (lib.character[name][1] == 'wei', 'shu', 'qun', 'wu', 'shen', 'jin') list.push(name);
                        }
                    }
                    else if (_status.connectMode) {
                        list = get.charactersOL(function (i) {
                            return lib.character[i][1] != 'wei', 'shu', 'qun', 'wu', 'shen', 'jin';
                        });
                    }
                    else {
                        list = get.gainableCharacters(function (info) {
                            return info[1] == 'wei', 'shu', 'qun', 'wu', 'shen', 'jin';
                        });
                    }
                    var players = game.players.concat(game.dead);
                    for (var i = 0; i < players.length; i++) {
                        list.remove(players[i].name);
                        list.remove(players[i].name1);
                        list.remove(players[i].name2);
                    }
                    var banlist = ['fr_shark', 'fr_wore', 'fr_yifa']
                    list.remove(banlist);
                    player.storage.shark_lib = list
                },
                filter: function (event, player) {
                    return player.storage.shark_yz.length
                },
                direct: true,
                content: function () {
                    'step 0'
                    player.chooseControl(player.storage.shark_yz, 'cancel2').set('prompt', '选择并重铸一个技能').set('prompt2', '你选择一个本技能获得的技能移除之，然后选择四名武将牌上至多一个技能获得之。')
                    'step 1'
                    if (result.control != 'cancel2') {
                        player.removeSkill(result.control)
                        player.storage.shark_yz.remove(result.control)
                        var list = player.storage.shark_lib.randomGets(4)
                        var skills = [];
                        for (var i of list) {
                            skills.addArray((lib.character[i][3] || []).filter(function (skill) {
                                var info = get.info(skill);
                                return info && !info.zhuSkill && !info.limited && !info.juexingji && !info.hiddenSkill && !info.charlotte && !info.dutySkill && !info.unique;
                            }));
                        }
                        if (!list.length || !skills.length) { event.finish(); return; }
                        if (player.isUnderControl()) {
                            game.swapPlayerAuto(player);
                        }
                        var switchToAuto = function () {
                            _status.imchoosing = false;
                            event._result = {
                                bool: true,
                                skills: skills.randomGets(1),
                            };
                            if (event.dialog) event.dialog.close();
                            if (event.control) event.control.close();
                        };
                        var chooseButton = function (list, skills) {
                            var event = _status.event;
                            if (!event._result) event._result = {};
                            event._result.skills = [];
                            var rSkill = event._result.skills;
                            var dialog = ui.create.dialog('请选择要获得的技能', [list, 'character'], 'hidden');
                            event.dialog = dialog;
                            var table = document.createElement('div');
                            table.classList.add('add-setting');
                            table.style.margin = '0';
                            table.style.width = '100%';
                            table.style.position = 'relative';
                            for (var i = 0; i < skills.length; i++) {
                                var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                                td.link = skills[i];
                                table.appendChild(td);
                                td.innerHTML = '<span>' + get.translation(skills[i]) + '</span>';
                                td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                                    if (_status.dragged) return;
                                    if (_status.justdragged) return;
                                    _status.tempNoButton = true;
                                    setTimeout(function () {
                                        _status.tempNoButton = false;
                                    }, 500);
                                    var link = this.link;
                                    if (!this.classList.contains('bluebg')) {
                                        if (rSkill.length >= 1) return;
                                        rSkill.add(link);
                                        this.classList.add('bluebg');
                                    }
                                    else {
                                        this.classList.remove('bluebg');
                                        rSkill.remove(link);
                                    }
                                });
                            }
                            dialog.content.appendChild(table);
                            dialog.add('　　');
                            dialog.open();
                            event.switchToAuto = function () {
                                event.dialog.close();
                                event.control.close();
                                game.resume();
                                _status.imchoosing = false;
                            };
                            event.control = ui.create.control('ok', function (link) {
                                event.dialog.close();
                                event.control.close();
                                game.resume();
                                _status.imchoosing = false;
                            });
                            for (var i = 0; i < event.dialog.buttons.length; i++) {
                                event.dialog.buttons[i].classList.add('selectable');
                            }
                            game.pause();
                            game.countChoose();
                        };
                        if (event.isMine()) {
                            chooseButton(list, skills);
                        }
                        else if (event.isOnline()) {
                            event.player.send(chooseButton, list, skills);
                            event.player.wait();
                            game.pause();
                        }
                        else {
                            switchToAuto();
                        }
                    } else {
                        if (player.getStat('skill')['shark_yz']) delete player.getStat('skill')['shark_yz'];
                        event.finish();
                    }
                    'step 2'
                    var map = event.result || result;
                    if (map && map.skills && map.skills.length) {
                        for (var i of map.skills) {
                            player.addSkillLog(i)
                            player.storage.shark_yz.push(i)
                        }
                    }
                    game.broadcastAll(function (list) {
                        game.expandSkills(list);
                        for (var i of list) {
                            var info = lib.skill[i];
                            if (!info) continue;
                        }
                    }, map.skills);
                },
                ai: {
                    order: 7,
                    result: {
                        player: 1,
                    }
                },
                group: 'shark_yz_add',
                subSkill: {
                    add: {
                        trigger: {
                            global: 'gameStart',
                        },
                        forced: true,
                        content: function () {
                            'step 0'
                            if (!player.storage.shark_lib) lib.skill.shark_yz.initList(player);
                            var list = player.storage.shark_lib.randomGets(4)
                            var skills = [];
                            for (var i of list) {
                                skills.addArray((lib.character[i][3] || []).filter(function (skill) {
                                    var info = get.info(skill);
                                    return info && !info.zhuSkill && !info.limited && !info.juexingji && !info.hiddenSkill && !info.charlotte && !info.dutySkill && !info.unique;
                                }));
                            }
                            if (!list.length || !skills.length) { event.finish(); return; }
                            if (player.isUnderControl()) {
                                game.swapPlayerAuto(player);
                            }
                            var switchToAuto = function () {
                                _status.imchoosing = false;
                                event._result = {
                                    bool: true,
                                    skills: skills.randomGets(3),
                                };
                                if (event.dialog) event.dialog.close();
                                if (event.control) event.control.close();
                            };
                            var chooseButton = function (list, skills) {
                                var event = _status.event;
                                if (!event._result) event._result = {};
                                event._result.skills = [];
                                var rSkill = event._result.skills;
                                var dialog = ui.create.dialog('请选择要获得的技能', [list, 'character'], 'hidden');
                                event.dialog = dialog;
                                var table = document.createElement('div');
                                table.classList.add('add-setting');
                                table.style.margin = '0';
                                table.style.width = '100%';
                                table.style.position = 'relative';
                                for (var i = 0; i < skills.length; i++) {
                                    var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                                    td.link = skills[i];
                                    table.appendChild(td);
                                    td.innerHTML = '<span>' + get.translation(skills[i]) + '</span>';
                                    td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                                        if (_status.dragged) return;
                                        if (_status.justdragged) return;
                                        _status.tempNoButton = true;
                                        setTimeout(function () {
                                            _status.tempNoButton = false;
                                        }, 500);
                                        var link = this.link;
                                        if (!this.classList.contains('bluebg')) {
                                            if (rSkill.length >= 3) return;
                                            rSkill.add(link);
                                            this.classList.add('bluebg');
                                        }
                                        else {
                                            this.classList.remove('bluebg');
                                            rSkill.remove(link);
                                        }
                                    });
                                }
                                dialog.content.appendChild(table);
                                dialog.add('　　');
                                dialog.open();

                                event.switchToAuto = function () {
                                    event.dialog.close();
                                    event.control.close();
                                    game.resume();
                                    _status.imchoosing = false;
                                };
                                event.control = ui.create.control('ok', function (link) {
                                    event.dialog.close();
                                    event.control.close();
                                    game.resume();
                                    _status.imchoosing = false;
                                });
                                for (var i = 0; i < event.dialog.buttons.length; i++) {
                                    event.dialog.buttons[i].classList.add('selectable');
                                }
                                game.pause();
                                game.countChoose();
                            };
                            if (event.isMine()) {
                                chooseButton(list, skills);
                            }
                            else if (event.isOnline()) {
                                event.player.send(chooseButton, list, skills);
                                event.player.wait();
                                game.pause();
                            }
                            else {
                                switchToAuto();
                            }
                            'step 1'
                            var map = event.result || result;
                            if (map && map.skills && map.skills.length) {
                                for (var i of map.skills) {
                                    player.addSkillLog(i)
                                    player.storage.shark_yz.push(i)
                                }
                            }
                            game.broadcastAll(function (list) {
                                game.expandSkills(list);
                                for (var i of list) {
                                    var info = lib.skill[i];
                                    if (!info) continue;
                                }
                            }, map.skills);
                        }
                    }
                }
            },
            'tiger_kf': {
                trigger: {
                    global: "damageAfter",
                },
                forced: true,
                filter: function (event, player) {
                    return event.nature == 'fire'
                },
                content: function () {
                    player.draw()
                    player.addTempSkill('tiger_kf_use')
                },
                subSkill: {
                    use: {
                        mod: {
                            targetInRange: function (card, player, target) {
                                if (card.name == 'sha') return true
                            },
                            cardUsable: function (card, player, num) {
                                if (card.name == 'sha') return Infinity
                            },
                        }
                    }
                }
            },
            'tiger_hy': {
                enable: "phaseUse",
                multitarget: true,
                multiline: true,
                usable: 1,
                filterTarget: function (card, player, target) {
                    return player.canCompare(target);
                },
                selectTarget: -1,
                filter: function (event, player) {
                    return game.hasPlayer(function (current) {
                        return player.canCompare(current);
                    }) && player.countCards('h') > 0
                },
                content: function () {
                    'step 0'
                    player.draw(2)
                    if (targets.length == 1) {
                        player.chooseToCompare(targets[0])
                    } else {
                        player.chooseToCompare(targets).setContent(lib.skill.tiger_hy.chooseToCompareMeanwhile);
                    }
                    'step 1'
                    if (result.winner) {
                        var targets = [player].addArray(event.targets).sortBySeat(player);
                        targets.remove(result.winner);
                        for (var i = 0; i < targets.length; i++) {
                            if (!result.winner.canUse({ name: 'sha', nature: 'fire', isCard: true }, targets[i], false) || !lib.filter.targetEnabled2({ name: 'sha', nature: 'fire', isCard: true }, result.winner, targets[i])) {
                                targets.remove(targets[i])
                            }
                        }
                        result.winner.useCard({ name: 'sha', nature: 'fire', isCard: true }, targets, 'noai').set('addCount', false);
                    }
                },
                ai: {
                    order: 1,
                    result: {
                        target: function (card, player, target) {
                            var player = _status.event.player
                            var hs = player.getCards('h').sort((a, b) => get.number(b) - get.number(a));
                            var ts = target.getCards('h').sort((a, b) => get.number(b) - get.number(a));
                            if (get.number(hs[0]) <= Math.min(13, get.number(ts[0]))) {
                                return -(6 + get.effect(player, card, target, target))
                            }
                            return -(get.effect(target, { name: 'guohe_copy2' }, player, player) / 2 + get.effect(target, card, player, player))
                        }
                    }
                },
                chooseToCompareMeanwhile: function () {
                    'step 0'
                    if (player.countCards('h') == 0) {
                        event.result = { cancelled: true, bool: false }
                        event.finish();
                        return;
                    }
                    for (var i = 0; i < targets.length; i++) {
                        if (targets[i].countCards('h') == 0) {
                            event.result = { cancelled: true, bool: false }
                            event.finish();
                            return;
                        }
                    }
                    if (!event.multitarget) {
                        targets.sort(lib.sort.seat);
                    }
                    game.log(player, '对', targets, '发起了共同拼点');
                    event.compareMeanwhile = true;
                    'step 1'
                    event._result = [];
                    event.list = targets.filter(function (current) {
                        return !event.fixedResult || !event.fixedResult[current.playerid];
                    });
                    if (event.list.length || !event.fixedResult || !event.fixedResult[player.playerid]) {
                        if (!event.fixedResult || !event.fixedResult[player.playerid]) event.list.unshift(player);
                        player.chooseCardOL(event.list, '请选择拼点牌', true).set('type', 'compare').set('ai', event.ai).set('source', player).aiCard = function (target) {
                            var hs = target.getCards('h');
                            var event = _status.event;
                            event.player = target;
                            hs.sort(function (a, b) {
                                return event.ai(b) - event.ai(a);
                            });
                            delete event.player;
                            return { bool: true, cards: [hs[0]] };
                        };
                    }
                    'step 2'
                    var cards = [];
                    var lose_list = [];
                    if (event.fixedResult && event.fixedResult[player.playerid]) {
                        event.list.unshift(player);
                        result.unshift({ bool: true, cards: [event.fixedResult[player.playerid]] });
                        lose_list.push([player, [event.fixedResult[player.playerid]]]);
                    }
                    else {
                        if (result[0].skill && lib.skill[result[0].skill] && lib.skill[result[0].skill].onCompare) {
                            player.logSkill(result[0].skill);
                            result[0].cards = lib.skill[result[0].skill].onCompare(player)
                        }
                        else lose_list.push([player, result[0].cards]);
                    };
                    for (var j = 0; j < targets.length; j++) {
                        if (event.list.contains(targets[j])) {
                            var i = event.list.indexOf(targets[j]);
                            if (result[i].skill && lib.skill[result[i].skill] && lib.skill[result[i].skill].onCompare) {
                                event.list[i].logSkill(result[i].skill);
                                result[i].cards = lib.skill[result[i].skill].onCompare(event.list[i]);
                            }
                            else lose_list.push([targets[j], result[i].cards]);
                            cards.push(result[i].cards[0]);
                        }
                        else if (event.fixedResult && event.fixedResult[targets[j].playerid]) {
                            cards.push(event.fixedResult[targets[j].playerid]);
                            lose_list.push([targets[j], [event.fixedResult[targets[j].playerid]]]);
                        }
                    }
                    if (lose_list.length) {
                        game.loseAsync({
                            lose_list: lose_list,
                        }).setContent('chooseToCompareLose');
                    }
                    event.lose_list = lose_list;
                    event.getNum = function (card) {
                        for (var i of event.lose_list) {
                            if (i[1].contains && i[1].contains(card)) return get.number(card, i[0]);
                        }
                        return get.number(card, false);
                    }
                    event.cardlist = cards;
                    event.cards = cards;
                    event.card1 = result[0].cards[0];
                    event.num1 = event.getNum(event.card1);
                    event.iwhile = 0;
                    event.winner = null;
                    event.maxNum = -1;
                    event.tempplayer = event.player;
                    event.result = {
                        winner: null,
                        player: event.card1,
                        targets: event.cardlist.slice(0),
                        num1: [],
                        num2: [],
                    };
                    player.$compareMultiple(event.card1, targets, cards);
                    game.log(player, '的拼点牌为', event.card1);
                    player.animate('target');
                    // game.delay(0,1000);
                    'step 3'
                    event.target = null;
                    event.trigger('compare');
                    'step 4'
                    if (event.iwhile < targets.length) {
                        event.target = targets[event.iwhile];
                        event.target.animate('target');
                        event.card2 = event.cardlist[event.iwhile];
                        event.num2 = event.getNum(event.card2);
                        game.log(event.target, '的拼点牌为', event.card2);
                        event.tempplayer.line(event.target);
                        delete event.player;
                        event.trigger('compare');
                    }
                    else {
                        game.delay(0, 1000);
                        event.goto(7);
                    }
                    'step 5'
                    event.result.num1[event.iwhile] = event.num1;
                    event.result.num2[event.iwhile] = event.num2;
                    var list = [[event.tempplayer, event.num1], [event.target, event.num2]];
                    for (var i of list) {
                        if (i[1] > event.maxNum) {
                            event.maxNum = i[1];
                            event.winner = i[0];
                        }
                        else if (event.winner && i[1] == event.maxNum && i[0] != event.winner) {
                            delete event.winner;
                        }
                    }
                    'step 6'
                    event.iwhile++;
                    event.goto(4);
                    'step 7'
                    var player = event.tempplayer;
                    event.player = player;
                    delete event.tempplayer;
                    var str = '无人拼点成功';
                    if (event.winner) {
                        event.result.winner = event.winner;
                        str = get.translation(event.winner) + '拼点成功';
                        game.log(event.winner, '拼点成功');
                        event.winner.popup('胜');
                    } else game.log('#b无人', '拼点成功');
                    var list = [player].addArray(targets);
                    list.remove(event.winner);
                    for (var i of list) {
                        i.popup('负');
                    }
                    if (str) {
                        game.broadcastAll(function (str) {
                            var dialog = ui.create.dialog(str);
                            dialog.classList.add('center');
                            setTimeout(function () {
                                dialog.close();
                            }, 1000);
                        }, str);
                    }
                    game.delay(3);
                    'step 8'
                    game.broadcastAll(ui.clear);
                    'step 9'
                    event.cards.add(event.card1); ``
                },
                ai: {
                    order: 1,
                    result: {
                        target: function (card, player, target) {
                            var player = _status.event.player
                            var num = 0, card = { name: 'sha', nature: 'fire', isCard: true };
                            var hs = player.getCards('h').sort((a, b) => get.number(b) - get.number(a));
                            var ts = target.getCards('h').sort((a, b) => get.number(b) - get.number(a));
                            if (get.number(hs[0]) <= Math.min(13, get.number(ts[0]) + num)) {
                                return -(6 + get.effect(player, card, target, target))
                            }
                            return -(get.effect(target, { name: 'guohe_copy2' }, player, player) / 2 + get.effect(target, card, player, player))
                        }
                    }
                }
            },
            'lust_zb': {
                trigger: {
                    player: ["chooseToRespondBegin", "chooseToUseBegin"],
                },
                unique: true,
                zhuSkill: true,
                filter: function (event, player) {
                    if (event.responded) return false;
                    if (!event.filterCard({ name: 'shan' }, player, event)) return false;
                    return player.isMinHandcard() || player.isMinHp()
                },
                frequent: true,
                usable: 1,
                content: function () {
                    "step 0"
                    trigger.untrigger();
                    trigger.responded = true;
                    trigger.result = { bool: true, card: { name: 'shan' } }
                },
                ai: {
                    respondShan: true,
                    effect: {
                        target: function (card, player, target, effect) {
                            if (get.tag(card, 'respondShan') && effect < 0) {
                                if (target.countCards('h') >= 2) return 0.5;
                            }
                        },
                    },
                },
            },
            'lust_fy': {
                enable: "phaseUse",
                usable: 1,
                preHidden: true,
                filterCard: true,
                filterTarget: function (card, player, target) {
                    return target != player && target.countCards('he') > 0;
                },
                content: function () {
                    "step 0"
                    player.choosePlayerCard('hej', target, true);
                    "step 1"
                    if (result.bool && result.links && result.links.length) {
                        var card = result.links[0];
                        var cardx = get.autoViewAs({ name: 'sha' }, [card]);
                        target.useCard(cardx, [card], player, false)
                    }
                },
                ai: {
                    order: 8,
                    result: {
                        target: -1,
                        player: function (player, target) {
                            if (player.hasSkillTag('maixie') || player.countCards('h', 'shan') > 0) {
                                return get.effect(target, { name: 'guohe_copy2' }, player, player)
                            }
                            return -1
                        },
                        expose: 0.2,
                        effect: {
                            target: function (card, player, target) {
                                if (card.name != 'sha') return;
                                var players = game.filterPlayer();
                                if (get.attitude(player, target) <= 0) {
                                    for (var i = 0; i < players.length; i++) {
                                        var target2 = players[i];
                                        if (player != target2 && target != target2 && player.canUse(card, target2, false) &&
                                            get.effect(target2, { name: 'shacopy', nature: card.nature, suit: card.suit }, player, target) > 0 &&
                                            get.effect(target2, { name: 'shacopy', nature: card.nature, suit: card.suit }, player, player) < 0) {
                                            if (target.hp == target.maxHp) return 0.3;
                                            return 0.6;
                                        }
                                    }
                                } else {
                                    for (var i = 0; i < players.length; i++) {
                                        var target2 = players[i];
                                        if (player != target2 && target != target2 && player.canUse(card, target2, false) &&
                                            get.effect(target2, { name: 'shacopy', nature: card.nature, suit: card.suit }, player, player) > 0) {
                                            if (player.canUse(card, target2)) return;
                                            if (target.hp == target.maxHp) return [0, 1];
                                            return [0, 0];
                                        }
                                    }
                                }
                            },
                        },
                    },
                },
                group: "lust_fy_1",
                subSkill: {
                    1: {
                        content: function () {
                            "step 0"
                            player.chooseTarget(get.prompt2('lust_fy'), function (card, player, target) {
                                return target != player && !_status.event.targets.contains(target) && _status.event.playerx.canUse('sha', target, false) && target.countCards('h');
                            }).set('ai', function (target) {
                                var trigger = _status.event.getTrigger();
                                var player = _status.event.player;
                                return get.effect(target, trigger.card, trigger.player, player) + 0.1;
                            }).set('targets', trigger.targets).set('playerx', trigger.player);
                            'step 1'
                            if (result.bool) {
                                event.target = result.targets[0];
                                player.logSkill('lust_fy', event.target);
                                event.target.chooseCard('选择' + get.translation(player) +
                                    '一张牌，若此牌不为' + get.translation(player) + '选择的花色，则也成为此【杀】的额外目标', true).set('ai', function (card) {
                                        return -get.value(card, player, 'raw');
                                    }).set('sourcex', player);
                                game.delay();
                            } else {
                                event.finish();
                            }
                            "step 2"
                            event.card = result.cards[0]
                            var next = player.chooseButton(['请选择一种花色', [lib.suit.map(i => ['', '', 'lukai_' + i]), 'vcard']], 1, true)
                            next.set('ai', button => {
                                return Math.random;
                            });
                            'step 3'
                            if (result.bool) {
                                var suit = result.links[0][2].slice(6);
                                target.give(event.card, player, 'give');
                                if (get.suit(event.card) != suit) {
                                    trigger.getParent().targets.push(event.target);
                                    trigger.getParent().triggeredTargets2.push(event.target);
                                    if (event.target.countCards('h') >= player.countCards('h')) trigger.directHit.push(event.target);
                                    game.log(event.target, '成为了额外目标');
                                }
                                game.delay();
                            }
                        },
                        trigger: {
                            target: "useCardToTarget",
                        },
                        direct: true,
                        filter: function (event, player) {
                            return event.card.name == 'sha' && game.hasPlayer(function (current) {
                                return current != player && current != event.source
                            }) && game.players.length > 2;
                        },
                    }
                }
            },
            'horn_ll': {
                qianghua: true,
                usable: 1,
                enable: "phaseUse",
                filterTarget: function (card, player, target) {
                    return target != player
                },
                check: function (player, target) {
                    return get.attitude(player, target) < 0
                },
                content: function () {
                    'step 0'
                    target.loseHp()
                    player.recover()
                    'step 1'
                    if (player.storage.fr_qianghua) {
                        if (player.isHealthy()) {
                            player.draw(2)
                        } else {
                            target.turnOver()
                            target.draw(target.getDamagedHp())
                        }
                    }
                    if (player.storage.fr_qianghua) player.storage.fr_qianghua = false
                },
                ai: {
                    order: 9,
                    result: {
                        target: function (target, player, card) {
                            return get.effect(target, { name: 'losehp' }, player, player) - 5
                        },
                        player: function (player, target, card) {
                            return get.recoverEffect(player, player, player)
                        }
                    },
                    threaten: 2,
                    expose: 0.2,
                },
            },
            'horn_ql': {
                qianghua: true,
                trigger: {
                    source: "damageEnd"
                },
                check: function (event, player) {
                    return event.player.next != player && event.player.previous != player
                },
                usable: 1,
                filter: function (event, player) {
                    return event.player != player
                },
                content: function () {
                    if (!player.storage.fr_qianghua) {
                        trigger.player.damage(player, 'fire')
                    } else {
                        if (trigger.player.next != trigger.player.previous) {
                            trigger.player.next.damage(player, Math.max(1, Math.floor(trigger.num / 2)), trigger.nature)
                            trigger.player.previous.damage(player, Math.max(1, Math.floor(trigger.num / 2)), trigger.nature)
                        } else {
                            trigger.player.next.damage(player, trigger.num, trigger.nature)
                        }
                        trigger.player.damage(player, 'fire')
                    }
                    if (player.storage.fr_qianghua) player.storage.fr_qianghua = false
                },
                ai: {
                    combo: "fr_qianghua",
                }
            },
            'fr_qianghua': {
                enable: 'phaseUse',
                usable: 1,
                unique: true,
                charlotte: true,
                locked: true,
                fixed: true,
                filter: function (event, player) {
                    var list = []
                    if (player.storage.fr_qianghua) return false
                    var info = lib.character[player.name]
                    for (var i = 0; i < info[3].length; i++) {
                        if (lib.skill[info[3][i]].qianghua) {
                            list.push(info[3][i])
                        }
                    }
                    if (list.length) {
                        return true
                    } else {
                        return false
                    }
                },
                init: function (player) {
                    if (!player.storage.fr_qianghua) player.storage.fr_qianghua = false
                },
                mark: true,
                intro: {
                    mark: function (dialog, storage, player) {
                        dialog.addText(player.storage.fr_qianghua ? '你当前处于强化状态' : '你当前未处于强化状态');
                    },
                },
                content: function () {
                    'step 0'
                    player.chooseCard('he', 2, '弃置两张牌或点击取消并失去1点体力，然后你进入“强化”状态', function (card, player) {
                        return lib.filter.cardDiscardable(card, player)
                    }).set('ai', function (card) {
                        return 5 - get.value(card)
                    })
                    'step 1'
                    if (result.bool) {
                        player.discard(result.cards)
                    } else {
                        player.loseHp()
                    }
                    'step 2'
                    player.storage.fr_qianghua = true
                },
                ai: {
                    order: 14,
                    result: {
                        player: function (player) {
                            if (player.hp < 3) return -1;
                            if (player.countCards('hs', { name: ['jiu', 'tao'] })) return 1;
                            return 0;
                        },
                    },
                    threaten: 2,
                },
            },
            "qima_dz": {
                trigger: {
                    source: "damageEnd"
                },
                chargeSkill: true,
                filter: function (event, player) {
                    return player.countMark('charge') > 0 && event.player != player
                },
                content: function () {
                    'step 0'
                    player.chooseTarget(1, '对一名其他角色造成1点伤害。', function (card, player, target) {
                        return target != player
                    })
                    'step 1'
                    if (result.bool) {
                        player.removeMark('charge', 1);
                        result.targets[0].damage(1, player)
                    }
                },
                group: ["qima_dz_damage", "qima_dz_init", 'qima_dz_1'],
                subSkill: {
                    'init': {
                        trigger: {
                            global: "phaseBefore",
                            player: "enterGame",
                        },
                        forced: true,
                        locked: false,
                        filter: function (event, player) {
                            return (event.name != 'phase' || game.phaseNumber == 0) && player.countMark('charge') < 4;
                        },
                        content: function () {
                            player.addMark('charge', Math.min(2, 4 - player.countMark('charge')));
                        },
                        sub: true,
                    },
                    1: {
                        trigger: {
                            source: 'damageBegin2'
                        },
                        direct: true,
                        filter: function (event, player) {
                            return event.player != player && event.player.hp == 1
                        },
                        content: function () {
                            trigger.num += 1
                        }
                    },
                    'damage': {
                        trigger: {
                            global: "dying",
                            player: ["damageEnd"],
                        },
                        filter: function (event, player) {
                            if (event.name != 'damage') return event.player != player;
                            return true;
                        },
                        direct: true,
                        content: function () {
                            var num = Math.min(1, 4 - player.countMark('charge'));
                            if (num > 0) {
                                player.logSkill('qima_dz_damage');
                                player.addMark('charge', num);
                                game.delayx();
                            }
                        }
                    },
                }
            },
            "qima_jm": {
                trigger: {
                    player: "dying",
                },
                juexingji: true,
                forced: true,
                mark: true,
                skillAnimation: true,
                animationColor: "thunder",
                unique: true,
                logTarget: function (event, player) {
                    return game.filterPlayer(function (current) {
                        return current != player
                    })
                },
                content: function () {
                    'step 0'
                    player.awakenSkill('qima_jm');
                    player.recover(2 - player.hp)
                    'step 1'
                    game.countPlayer(function (current) {
                        if (current != player) {
                            var skills = current.skills
                            for (var i of skills) {
                                current.removeSkill(i)
                                current.unmarkSkill(i)
                            }
                            current.skills = []
                            current.maxHp = 4
                            current.hujia = 0
                            current.update()
                        }
                    })
                },
            },
            "hynea_rx": {
                trigger: {
                    player: "phaseDrawBegin2"
                },
                unique: true,
                dutySkill: true,
                forced: true,
                filter: function (event, player) {
                    return !event.numFixed;
                },
                derivation: "hynea_kb",
                content: function () {
                    trigger.num += Math.ceil(player.storage.hynea_cg / 2)
                },
                group: ["hynea_rx_achieve", "hynea_rx_fail"],
                subSkill: {
                    achieve: {
                        trigger: {
                            player: "phaseZhunbeiBegin"
                        },
                        filter: function (event, player) {
                            return player.storage.hynea_cg == 0
                        },
                        forced: true,
                        skillAnimation: true,
                        animationColor: "fire",
                        content: function (event, player) {
                            game.log(player, '成功完成使命');
                            player.awakenSkill('hynea_rx');
                            player.removeSkill('hynea_ds')
                            player.addSkillLog('hynea_kb')
                        },
                    },
                    fail: {
                        trigger: {
                            player: "dying",
                        },
                        forced: true,
                        content: function () {
                            'step 0'
                            game.log(player, '使命失败');
                            player.awakenSkill('hynea_rx');
                            player.recover(3 - player.hp)
                            'step 1'
                            player.draw(3)
                            player.loseMaxHp();
                        },
                        sub: true,
                    },
                },
            },
            "hynea_kb": {
                direct: true,
                enable: "phaseUse",
                unique: true,
                filter: function (event, player) {
                    if (player.hasSkill('hynea_jiu')) {
                        return player.countCards('hes', { name: ['jiu', 'shan', 'tao'] }) > 0;
                    } else {
                        return player.countCards('hes', { name: 'jiu' }) > 0;
                    }
                },
                hiddenCard: function (player, name) {
                    if (!['sha', 'shan', 'tao', 'jiu', 'wuxie'].contains(name)) return false;
                    if (player.countCards('hes', { name: 'jiu' }) == 0) return false;
                    return player.countCards('hes', { name: 'jiu' }) > 0;
                },
                chooseButton: {
                    dialog: function (event, player) {
                        var cards = player.getCards('hes');
                        var list = [];
                        for (var i of lib.inpile) {
                            if (i == 'fr_card_zh') continue
                            if (get.type(i) == 'trick' && event.filterCard({
                                name: i,
                                cards: cards,
                            }, player, event)) {
                                list.push(['锦囊', '', i]);
                            } else if (get.type(i) == 'basic' && event.filterCard({
                                name: i,
                                cards: cards,
                            }, player, event)) {
                                if (i == 'sha') {
                                    for (var j of lib.inpile_nature) list.push(['基本', '', 'sha', j]);
                                }
                                list.push(['基本', '', i]);
                            }
                        }
                        return ui.create.dialog('狂辩', [list, 'vcard']);
                    },
                    filter: function (button, player) {
                        return lib.filter.filterCard({ name: button.link[2] }, player, _status.event.getParent());
                    },
                    check: function (button) {
                        var player = _status.event.player;
                        return player.getUseValue({ name: button.link[2] });
                    },
                    backup: function (links, player) {
                        return {
                            filterCard: function (card) {
                                return get.name(card) == 'jiu'
                            },
                            selectCard: 1,
                            check: function (card) {
                                if (ui.selected.cards.length) return 0;
                                return 7 - get.value(card);
                            },
                            position: 'hes',
                            popname: true,
                            viewAs: { name: links[0][2] },
                        }
                    },
                    prompt: function (links, player) {
                        return '将一张【酒】当作' + get.translation(links[0][2]) + '使用';
                    },
                },
                ai: {
                    order: 1,
                    result: {
                        player: 1,
                    },
                },
                sub: true,
            },
            "hynea_ds": {
                enable: "phaseUse",
                usable: 1,
                unique: true,
                filter: function (event, player) {
                    return player.storage.hynea_cg > 0
                },
                check: function (event, player) {
                    return player.storage.hynea_cg > player.hp
                },
                filterTarget: function (card, player, target) {
                    return player != target;
                },
                content: function () {
                    'step 0'
                    player.storage.hynea_cg -= 1
                    target.damage(1, player)
                    'step 1'
                    player.updateMark('hynea_cg')
                },
                ai: {
                    order: 9.5,
                    expose: 0.2,
                    result: {
                        player: 1,
                        target: -1
                    },
                },
            },
            "zhongyu_zb": {
                trigger: {
                    player: ["phaseDrawBegin", "phaseUseBegin", "phaseDiscardBegin"],
                    source: ["damageBegin"]
                },
                filter: function (event, player) {
                    return game.hasPlayer(function (current) {
                        return current.countFrBuff('mad') > 0
                    })
                },
                direct: true,
                content: function () {
                    'step 0'
                    var num = game.countPlayer(function (current) {
                        return current.countFrBuff('mad') > 0
                    })
                    var str = '移去任意名角色的疯狂标记，'
                    if (trigger.name == 'phaseDraw') {
                        str += '摸牌阶段多摸等量的牌'
                    } else if (trigger.name == 'phaseUse') {
                        str += '出牌阶段多出等量的杀'
                    } else if (trigger.name == 'phaseDiscard') {
                        str += '弃牌阶段你增加等量的手牌上限'
                    } else {
                        str += '令此次对' + get.translation(trigger.player) + '增加等量的伤害'
                    }
                    player.chooseTarget([1, num], false).set('ai', function (target) {
                        var player = _status.event.player
                        return (get.attitude(player, target) - 2 * Math.random() + 1)
                    }).set('filterTarget', function (card, player, target) {
                        return target.countFrBuff('mad') > 0
                    }).set('prompt2', str)
                    'step 1'
                    if (result.bool) {
                        var num = 0
                        for (var i = 0; i < result.targets.length; i++) {
                            num += result.targets[i].countFrBuff('mad')
                            result.targets[i].clearFrBuff('mad')
                        }
                        if (trigger.name == 'phaseDraw') {
                            trigger.num += num
                            game.log(player, '摸牌阶段的摸牌数+' + num);
                        } else if (trigger.name == 'phaseUse') {
                            player.storage.zhongyu_zb_effect_sha = num;
                            player.addTempSkill('zhongyu_zb_effect')
                            game.log(player, '出牌阶段使用【杀】的次数上限+' + num);
                        } else if (trigger.name == 'phaseDiscard') {
                            player.storage.zhongyu_zb_effect_limit = num;
                            player.addTempSkill('zhongyu_zb_effect')
                            game.log(player, '的手牌上限+' + num)
                        } else {
                            trigger.num += num
                        }
                    }
                },
                subSkill: {
                    effect: {
                        charlotte: true,
                        onremove: function (player) {
                            player.storage.zhongyu_zb_effect_limit = 0
                            player.storage.zhongyu_zb_effect_sha = 0
                        },
                        mod: {
                            cardUsable: function (card, player, num) {
                                if (card.name == 'sha') {
                                    return num += (player.storage.zhongyu_zb_effect_sha || 0)
                                }
                            },
                            maxHandcardBase: function (player, num) {
                                return num += (player.storage.zhongyu_zb_effect_limit || 0)
                            },
                        },
                        sub: true,
                    },
                }
            },
            "zhongyu_ky": {
                enable: "phaseUse",
                usable: 1,
                filter: function (event, player) {
                    return (player.getDamagedHp() + 1) > 0 && player.countCards('h') > 0;
                },
                filterTarget: function (card, player, target) {
                    return player != target
                },
                selectTarget: function () {
                    return ui.selected.cards.length;
                },
                selectCard: function () {
                    var player = _status.currentPhase;
                    return [1, Math.min(game.players.length - 1, player.getDamagedHp() + 1)];
                },
                filterCard: true,
                position: 'h',
                check: function (card) {
                    if (ui.selected.cards.length == 0) {
                        return 8 - get.value(card);
                    }
                    return 6 - get.value(card);
                },
                content: function () {
                    "step 0"
                    target.damage('mad');
                },
                ai: {
                    order: 9,
                    result: {
                        target: function (player, target) {
                            return get.damageEffect(target, player, target, 'mad');
                        },
                    },
                    threaten: function (player, target) {
                        if (target.hp == 1) return 2;
                        if (target.hp == 2) return 1.5;
                        return 0.5;
                    },
                    maixie: true,
                    effect: {
                        target: function (card, player, target) {
                            if (get.tag(card, 'damage')) {
                                if (target.hp == target.maxHp) return [0, 1];
                            }
                            if (get.tag(card, 'recover') && player.hp >= player.maxHp - 1) return [0, 0];
                        },
                    },
                },
                group: "zhongyu_ky_add",
                subSkill: {
                    add: {
                        trigger: {
                            source: "damageEnd"
                        },
                        frequent: true,
                        filter: function (event, player) {
                            return !event.nature && event.player != player
                        },
                        content: function () {
                            trigger.player.fakeDamage(trigger.num, 'mad')
                        }
                    }
                }
            },
            "hynea_jiu": {
                unique: true,
                mod: {
                    cardname: function (card, player) {
                        if (card.name == 'tao' || card.name == 'shan') return 'jiu';
                    },
                },
            },
            "hynea_cg": {
                unique: true,
                mark: true,
                intro: {
                    content: function (event, player, storage) {
                        return '当前[]内的数值为：' + player.storage.hynea_cg
                    }
                },
                mod: {
                    cardUsable: function (card, player, num) {
                        if (card.name == 'jiu') return Infinity;
                    },
                },
                init: function (player, skill) {
                    if (!player.storage.hynea_cg) player.storage.hynea_cg = 4
                    player.addSkill('hynea_jiu')
                    player.addSkillBlocker(skill);
                },
                onremove: function (player, skill) {
                    player.removeSkillBlocker(skill);
                },
                skillBlocker: function (skill, player) {
                    return skill == "hynea_jiu" && player.hp < player.storage.hynea_cg;
                },
                ai: {
                    skillTagFilter: function (player) {
                        if (!player.countCards('hs', { name: ['tao', 'shan'] })) return false;
                    },
                    save: true,
                },
            },
            "faers_hc": {
                trigger: {
                    player: ["gainAfter", "loseAfter", "changeHp"],
                    global: "gameDrawEnd",
                },
                forced: true,
                filter: function (event, player) {
                    return player.countCards('h') != player.hp
                },
                content: function () {
                    var a = player.hp - player.countCards('h');
                    if (a > 0) {
                        player.draw(a);
                    } else if (a < 0) {
                        player.chooseToDiscard(-a, true)
                    }
                },
                group: "faers_hc_1",
                subSkill: {
                    "1": {
                        trigger: {
                            player: ["phaseDrawBefore", "phaseJudgeBefore"],
                        },
                        forced: true,
                        popup: false,
                        content: function () {
                            trigger.cancel();
                            game.log(player, '跳过了', event.triggername == 'phaseDrawBefore' ? '摸牌阶段' : '判定阶段')
                        },
                        ai: {
                            noh: true,
                        },
                        sub: true,
                    },
                },
            },
            "faers_sb": {
                enable: "phaseUse",
                usable: 1,
                check: function (card) {
                    var player = _status.event.player;
                    if (get.position(card) == 'h' && !player.countCards('h', 'du') && (player.hp > 2 || !player.countCards('h', function (card) {
                        return get.value(card) >= 8;
                    }))) {
                        return 1;
                    }
                    return 6 - get.value(card)
                },
                content: function () {
                    var card = player.getCards('h')
                    player.discard(card)
                },
                ai: {
                    order: 1,
                    result: {
                        player: 1,
                    },
                    threaten: 1.55,
                },
            },
            "kelaier_dh": {
                enable: "phaseUse",
                usable: 1,
                filter: function (event, player) {
                    return player.countCards('h') > 0
                },
                filterTarget: true,
                filterCard: true,
                content: function () {
                    "step 0"
                    player.judge()
                    "step 1"
                    switch (result.color) {
                        case "red": target.recover(1); target.addTempSkill("kelaier_dh_2", { player: "phaseUseBefore" }); break;
                        case "black": target.draw(2); target.addTempSkill("kelaier_dh_1", { player: "phaseUseBefore" }); break;
                    }
                },
                order: 9,
                result: {
                    target: function (player, target) {
                        return 2 / Math.max(1, Math.sqrt(target.hp));
                    },
                },
                subSkill: {
                    "1": {
                        forced: true,
                        init: function (player) {
                            player.changeHujia(1);
                        },
                        charlotte: true,
                        onremove: function (player) {
                            player.changeHujia(-1);
                        },
                        intro: {
                            content: "你区域内的♠都视为♣",
                        },
                        mark: true,
                        mod: {
                            suit: function (card, suit) {
                                if (suit == 'spade') return 'club';
                            },
                        },
                        sub: true,
                    },
                    "2": {
                        forced: true,
                        charlotte: true,
                        init: function (player) {
                            player.changeHujia(1);
                        },
                        onremove: function (player) {
                            player.changeHujia(-1);
                        },
                        intro: {
                            content: "你区域内的♦都视为♥",
                        },
                        mark: true,
                        mod: {
                            suit: function (card, suit) {
                                if (suit == 'diamond') return 'heart';
                            },
                        },
                        sub: true,
                    },
                },
            },
            "kelaier_ty": {
                enable: "phaseUse",
                usable: 1,
                filterTarget: function (card, player, target) {
                    return player != target
                },
                filterCard: true,
                position: "he",
                filter: function (event, player) {
                    return player.countCards('he') > 0
                },
                content: function () {
                    "step 0"
                    player.judge()
                    "step 1"
                    switch (get.color(result.card)) {
                        case 'red': target.storage.tyname = 'basic'; break;
                        case 'black': target.storage.tyname = 'trick'; break;
                    }
                    target.addTempSkill("kelaier_ty_1", { player: "phaseAfter" })
                },
                ai: {
                    order: 10,
                    result: {
                        player: 1,
                        target: function (player, target) {
                            if (target.countCards('h') > target.hp) return target.hp - target.countCards('h');
                            return -2;
                        },
                    },
                    threaten: 0.5,
                },
                subSkill: {
                    "1": {
                        mod: {
                            cardEnabled: function (card, player) {
                                if (get.type2(card) == player.storage.tyname) return false;
                            },
                            cardSavable: function (card, player) {
                                if (get.type2(card) == player.storage.tyname) return false;
                            },
                        },
                        intro: {
                            content: function (storage, player, skill) {
                                return "你不能使用" + get.translation(player.storage.tyname) + '牌'
                            },
                        },
                        mark: true,
                        sub: true,
                    },
                },
            },
            "wore_bosshy": {
                trigger: {
                    global: "roundStart",
                    player: ["damageEnd", "loseHpEnd", 'loseMaxHpEnd']
                },
                charlotte: true,
                unique: true,
                init: function (player) {
                    var a = window.setInterval(function () {
                        if (player.hasSkill('wore_bosshy')) {
                            player.storage.wore_bosshy = true;
                        }
                        else {
                            game.addGlobalSkill('wore_bosshy');
                            window.clearInterval(a);
                        }
                    }, 1000);
                },
                forced: true,
                filter: function (event, player) {
                    if (!player.storage.wore_bosshy) {
                        return false
                    } else {
                        return true
                    }
                },
                content: function () {
                    'step 0'
                    var list = [];
                    for (var i in lib.character) {
                        if (!lib.filter.characterDisabled(i) && !lib.filter.characterDisabled2(i)) {
                            list.push(i);
                        }
                    }
                    list.remove('fr_wore');
                    list = list.randomGets(6)
                    var dialog = ui.create.dialog('请选择武将', 'hidden');
                    dialog.add([list.randomGets(list.length), 'character']);
                    player.chooseButton(dialog, true).ai = function (button) {
                        return get.rank(button.link, true);
                    };
                    'step 1'
                    var skills = lib.character[result.links[0]][3].slice(0);
                    for (var i = 0; i < skills.length; i++) {
                        player.addSkill(skills[i])
                    }
                }
            },
            "wore_hy": {
                trigger: {
                    player: "phaseBegin",
                },
                unique: true,
                filter: function (event, player) {
                    return player.getSubPlayers('wore_hy_get').length > 0 && !player.hasSkill('subplayer');
                },
                locked: true,
                content: function () {
                    'step 0'
                    player.callSubPlayer()
                },
                group: ["wore_hy_get"],
                ai: {
                    order: 1,
                    result: {
                        player: function (player, target) {
                            return 1;
                            // if(player.hp<=3) return 3;
                            // if(!player.needsToDiscard(player.hp-1)) return 2;
                            // return 1;
                        },
                    },
                },
                subSkill: {
                    get: {
                        trigger: {
                            player: "damageEnd",
                            global: "roundStart",
                        },
                        forced: true,
                        filter: function (event, player) {
                            if (event.name == 'damage') {
                                return event.num > 0
                            } else {
                                return game.roundNumber == 1
                            }
                        },
                        content: function () {
                            'step 0'
                            var list = [];
                            for (var i in lib.character) {
                                if (!lib.filter.characterDisabled(i) && !lib.filter.characterDisabled2(i)) {
                                    list.push(i);
                                }
                            }
                            list.remove('fr_wore');
                            list = list.randomGets(4)
                            var dialog = ui.create.dialog('请选择随从的技能', 'hidden');
                            dialog.add([list.randomGets(list.length), 'character']);
                            player.chooseButton(dialog, true).ai = function (button) {
                                return get.rank(button.link, true);
                            };
                            'step 1'
                            player.addSubPlayer({
                                name: result.links[0],
                                skills: lib.character[result.links[0]][3],
                                hp: 1,
                                maxHp: 1,
                                sex: lib.character[result.links[0]][0],
                                hs: get.cards(4),
                            });
                            'step 2'
                            player.callSubPlayer()
                        },
                        sub: true,
                    },
                },
            },
            "kaye_jy": {
                audio: "ext:福瑞扩展:2",
                enable: "phaseUse",
                usable: 1,
                filterCard: true,
                position: "h",
                filter: function (event, player) {
                    if (!player.storage.kaye_jy) return true;
                    return game.hasPlayer(function (current) {
                        return !player.storage.kaye_jy.contains(current);
                    });
                },
                init: function (player) {
                    if (!player.storage.kaye_jy) player.storage.kaye_jy = [];
                },
                filterTarget: function (card, player, target) {
                    return (!player.storage.kaye_jy || !player.storage.kaye_jy.contains(target));
                },
                content: function () {
                    if (target == player) {
                        target.addTempSkill("kaye_shouhu", { player: "phaseBegin" });
                    }
                    else {
                        target.addTempSkill("kaye_shouhu", { player: "phaseEnd" });
                    }
                    if (!player.storage.kaye_jy) player.storage.kaye_jy = [];
                    player.storage.kaye_jy[0] = target;
                    player.markSkill('kaye_jy');
                },
                ai: {
                    order: 7,
                    threaten: 1.6,
                    expose: 0.2,
                    result: {
                        target: function (player, target) {
                            return 1;
                        },
                    },
                },
                intro: {
                    markcount: () => undefined,
                    content: "上回合已对$发动过〖急援〗",
                },
                derivation: "kaye_shouhu",
            },
            "kaye_shouhu": {
                forced: true,
                trigger: {
                    player: ["damageBefore"],
                },
                charlotte: true,
                init: function (player, skill) {
                    player.addSkillBlocker(skill);
                    player.storage.kaye_shouhu = 0
                },
                onremove: function (player, skill) {
                    player.removeSkillBlocker(skill);
                    delete player.storage.kaye_shouhu
                },
                skillBlocker: function (skill, player) {
                    return skill == 'kaye_shouhu' && player.storage.kaye_shouhu >= 3
                },
                intro: {
                    markcount: () => undefined,
                    content: function (storage, player, skill) {
                        if (5 - player.storage.kaye_shouhu == 0) {
                            return
                        } else {
                            return "直到你的下个回合结束，你免除接下来受到的" + get.cnNumber(3 - player.storage.kaye_shouhu) + '次伤害'
                        }
                    }
                },
                mark: true,
                content: function () {
                    player.storage.kaye_shouhu += 1
                    trigger.cancel()
                },
                ai: {
                    nothunder: true,
                    nofire: true,
                    nodamage: true,
                    effect: {
                        target: function (card, player, target, current) {
                            if (get.tag(card, 'damage')) return [0, 0];
                        },
                    },
                },
                ai: {
                    maixie: true,
                },
            },
            "kaye_yj": {
                audio: "ext:福瑞扩展:2",
                enable: "phaseUse",
                usable: 1,
                filter: function (event, player) {
                    if (!player.storage.kaye_yj) return true;
                    return game.hasPlayer(function (current) {
                        return !player.storage.kaye_yj.contains(current);
                    });
                },
                filterTarget: function (card, player, target) {
                    return (!player.storage.kaye_yj || !player.storage.kaye_yj.contains(target) && target != player);
                },
                init: function (player) {
                    if (!player.storage.kaye_yj) player.storage.kaye_yj = [];
                },
                content: function () {
                    target.addTempSkill("kaye_yj_one", { player: "phaseEnd" });
                    if (!player.storage.kaye_yj) player.storage.kaye_yj = [];
                    player.storage.kaye_yj.push(target);
                    player.storage.kaye_yj.sortBySeat()
                    player.markSkill('kaye_yj');
                },
                ai: {
                    order: 7,
                    threaten: 1.6,
                    expose: 0.2,
                    result: {
                        target: function (player, target) {
                            return -1;
                        },
                    },
                },
                intro: {
                    markcount: () => undefined,
                    content: "已对$发动过〖压制〗",
                },
                subSkill: {
                    one: {
                        forced: true,
                        trigger: {
                            source: "damageBefore",
                            player: 'damageBegin4'
                        },
                        charlotte: true,
                        filter: function (event, player) {
                            if (event.player != player) {
                                return player.storage.kaye_yj_one < 4
                            } else {
                                return true
                            }
                        },
                        intro: {
                            content: function (storage, player, skill) {
                                return "直到你的下个回合结束，你取消接下来造成的" + get.cnNumber(5 - player.storage.kaye_yj_one) + '次伤害，且受到的伤害+1。'
                            }
                        },
                        mark: true,
                        content: function () {
                            if (trigger.player != player) {
                                player.storage.kaye_yj_one += 1
                                trigger.cancel()
                            } else {
                                trigger.num += 1
                            }
                        },
                        sub: true,
                    },
                },
            },
            "kert_jl": {
                group: ["kert_jl_1", "kert_jl_2"],
                subSkill: {
                    "1": {
                        forced: true,
                        mod: {
                            ignoredHandcard: function (card, player) {
                                if (get.color(card) == 'black' && get.name(card) == 'sha') return true;
                            },
                            cardDiscardable: function (card, player, name) {
                                if (name == 'phaseDiscard' && get.color(card) == 'black' && get.name(card) == 'sha') return false;
                            },
                        },
                        sub: true,
                    },
                    "2": {
                        forced: true,
                        mod: {
                            cardUsable: function (card, player, num) {
                                if (card.name == 'sha') return num + 1;
                            },
                        },
                        ai: {
                            mapValue: 2,
                        },
                        sub: true,
                    },
                },
            },
            "kert_lp": {
                trigger: {
                    player: "phaseAfter",
                },
                limited: true,
                frequent: false,
                unique: true,
                content: function () {
                    player.addTempSkill("kert_ql", { player: "phaseEnd" });
                    player.addTempSkill("kert_dp", { player: "phaseEnd" })
                    player.awakenSkill("kert_lp")
                },
                mark: true,
                intro: {
                    content: "limited",
                },
                skillAnimation: true,
                init: function (player, skill) {
                    player.storage[skill] = false;
                },
                derivation: ["kert_dp", "kert_ql"],
            },
            "kert_ql": {
                forced: true,
                trigger: {
                    global: "phaseDrawAfter",
                },
                filter: function (event, player) {
                    return event.player.isAlive() && event.player != player;
                },
                content: function () {
                    "step 0"
                    var next = player.chooseControl("选项一", "选项二", true).set("prompt", "请选择发动的选项：").set('choiceList', ['观看并获得当前角色一张牌', '获得牌堆中的一张杀'])
                    next.ai = function (event, player) {
                        if (get.attitude(player, event.player) < 0) {
                            return 0
                        } else return 1
                    }
                    "step 1"
                    if (result.index == 0) { player.gainPlayerCard(1, 'he', trigger.player, true, 'visible') }
                    if (result.index == 1) {
                        var card = get.cardPile2(function (card) { return card.name == 'sha'; });
                        if (card) player.gain(card, 'gain2');
                    }
                    event.finish()
                },
            },
            "kert_dp": {
                mod: {
                    targetInRange: function (card, player) {
                        if (card.name == 'sha' && get.color(card) == 'black') return true;
                    },
                    cardUsable: function (card) {
                        if (card.name == 'sha') return Infinity;
                    },
                    selectTarget: function (card, player, range) {
                        if (card.name == 'sha' && range[1] != -1 && get.color(card) == 'black') {
                            range[1]++;
                        }
                    },
                },
                trigger: {
                    source: "damageBegin",
                },
                forced: true,
                filter: function (event, player) {
                    return !get.is.altered('kert_dp') && event.card && event.card.name == 'sha' && get.color(event.card) == 'red' && event.notLink();
                },
                content: function () {
                    trigger.num += 2;
                },
                group: "kert_dp_1",
                subSkill: {
                    "1": {
                        trigger: {
                            source: "dying",
                        },
                        forced: true,
                        content: function () {
                            player.loseMaxHp();
                            player.removeSkill('kert_dp');
                        },
                        sub: true,
                    },
                },
            },
            "kersm_my": {
                trigger: {
                    player: "phaseUseEnd",
                },
                mark: true,
                init: function (player) {
                    if (!player.storage.kersm_my) player.storage.kersm_my = [];
                },
                check: function (event, player) {
                    if (player.countCards('h') * 2 < player.hp) return false;
                    var judge = game.filterPlayer(function (current) {
                        return current != player && get.attitude(player, current) > 0
                    })
                    if (judge.length) {
                        return true
                    }
                    return false
                },
                content: function () {
                    "step 0"
                    var targets = game.filterPlayer(function (target) {
                        return target != player
                    })
                    var num = Math.floor(player.countCards('h') / 2);
                    player.chooseCardTarget({
                        position: 'h',
                        filterCard: true,
                        filterTarget: function (card, player, target) {
                            return target != player;
                        },
                        selectTarget: 1,
                        targets: targets,
                        selectCard: num,
                        prompt: '将' + get.cnNumber(num) + '张手牌交给一名其他角色',
                        forced: true,
                        ai1: function (card) {
                            var goon = false, player = _status.event.player;
                            for (var i of _status.event.targets) {
                                if (get.attitude(i, target) > 0 && get.attitude(target, i) > 0) { goon = true; break };
                            }
                            if (goon) {
                                if (!player.hasValueTarget(card) || card.name == 'sha' && player.countCards('h', function (cardx) {
                                    return cardx.name == 'sha' && !ui.selected.cards.contains(cardx);
                                }) > player.getCardUsable('sha')) return 2;
                                return Math.max(2, get.value(card) / 4);
                            }
                            return 1 / Math.max(1, get.value(card));
                        },
                        ai2: function (target) {
                            return get.attitude(_status.event.player, target);
                        },
                    });
                    'step 1'
                    if (result.bool) {
                        var target = result.targets[0];
                        player.line(target, 'green');
                        target.gain(result.cards, player, 'giveAuto');
                        player.skip('phaseDiscard')
                        player.storage.kersm_my[0] = target
                    }
                },
                intro: {
                    markcount: () => undefined,
                    content: "上次已对$发动过〖盟约〗",
                },
            },
            "kersm_jq": {
                trigger: {
                    global: "loseAfter",
                },
                filter: function (event, player) {
                    return event.player != player && event.type == 'discard' && (!player.storage.kersm_my || event.player != player.storage.kersm_my[0])
                },
                direct: true,
                content: function () {
                    var cards = [];
                    for (var i = 0; i < trigger.cards.length; i++) {
                        if (get.position(trigger.cards[i], true) == 'd') {
                            cards.push(trigger.cards[i]);
                        };
                    }
                    if (cards) player.gain(cards, 'gain2', 'log');
                },
            },
            "luciya_xl": {
                trigger: {
                    global: "judge",
                },
                direct: true,
                preHidden: true,
                prompt: "一名角色的判定牌生效前，你可以打出一张手牌替换之",
                filter: function (event, player) {
                    return player.countCards(get.mode() == 'guozhan' ? 'hes' : 'hs') > 0;
                },
                content: function () {
                    "step 0"
                    player.chooseCard(get.translation(trigger.player) + '的' + (trigger.judgestr || '') + '判定为' +
                        get.translation(trigger.player.judging[0]) + '，' + get.prompt('luciya_xl_1'), get.mode() == 'guozhan' ? 'hes' : 'hs', function (card) {
                            var player = _status.event.player;
                            var mod2 = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
                            if (mod2 != 'unchanged') return mod2;
                            var mod = game.checkMod(card, player, 'unchanged', 'cardRespondable', player);
                            if (mod != 'unchanged') return mod;
                            return true;
                        }).set('ai', function (card) {
                            var trigger = _status.event.getTrigger();
                            var player = _status.event.player;
                            var judging = _status.event.judging;
                            var result = trigger.judge(card) - trigger.judge(judging);
                            var attitude = get.attitude(player, trigger.player);
                            if (attitude == 0 || result == 0) return 0;
                            if (attitude > 0) {
                                return result - get.value(card) / 2;
                            }
                            else {
                                return -result - get.value(card) / 2;
                            }
                        }).set('judging', trigger.player.judging[0]).setHiddenSkill('luciya_xl');
                    "step 1"
                    if (result.bool) {
                        player.respond(result.cards, 'luciya_xl', 'highlight', 'noOrdering');
                    }
                    else {
                        event.finish();
                    }
                    "step 2"
                    if (result.bool) {
                        if (trigger.player.judging[0].clone) {
                            trigger.player.judging[0].clone.classList.remove('thrownhighlight');
                            game.broadcast(function (card) {
                                if (card.clone) {
                                    card.clone.classList.remove('thrownhighlight');
                                }
                            }, trigger.player.judging[0]);
                            game.addVideo('deletenode', player, get.cardsInfo([trigger.player.judging[0].clone]));
                        }
                        game.cardsDiscard(trigger.player.judging[0]);
                        trigger.player.judging[0] = result.cards[0];
                        trigger.orderingCards.addArray(result.cards);
                        game.log(trigger.player, '的判定牌改为', result.cards[0]);
                        player.storage.luciya_xl = result.cards[0]
                        game.delay(2);
                    }
                },
                group: ["luciya_xl_1"],
                ai: {
                    rejudge: true,
                    tag: {
                        rejudge: 1,
                    },
                },
                subSkill: {
                    "1": {
                        trigger: {
                            player: ["chooseToCompareBefore", "compareMultipleBefore"],
                            target: ["chooseToCompareBefore", "compareMultipleBefore"],
                        },
                        usable: 1,
                        prompt: "是否发动【雄略】：你的拼点牌生效前，你可以将此牌点数视为A或K",
                        filter: function (event, player) {
                            if (event.iwhile) return false;
                            if (event.player == player) { return true }
                        },
                        content: function () {
                            "step 0"
                            player.chooseControl("A", "K", true).set("prompt", "请选择拼点牌视为的点数：").set('ai', function (result, control) { return "K" });
                            "step 1"
                            if (result.index == 1) {
                                player.addTempSkill("luciya_xl_2", "compareAfter")
                            }
                            if (result.index == 0) {
                                player.addTempSkill("luciya_xl_3", "compareAfter")
                            }
                        },
                        sub: true,
                    },
                    "2": {
                        trigger: {
                            player: ["compare"],
                            target: ["compare"],
                        },
                        silent: true,
                        content: function () {
                            game.log(player, '拼点牌点数视为', '#yK');
                            if (player == trigger.player) {
                                trigger.num1 = 13;
                            }
                            else {
                                trigger.num2 = 13;
                            }
                        },
                        sub: true,
                        forced: true,
                        popup: false,
                    },
                    "3": {
                        trigger: {
                            player: ["compare"],
                            target: ["compare"],
                        },
                        silent: true,
                        content: function () {
                            game.log(player, '拼点牌点数视为', '#yA');
                            if (player == trigger.player) {
                                trigger.num1 = 1;
                            }
                            else {
                                trigger.num2 = 1;
                            }
                        },
                        sub: true,
                        forced: true,
                        popup: false,
                    },
                },
            },
            "luciya_yc": {
                trigger: {
                    global: "judgeEnd",
                },
                frequent: function (event) {
                    if (event.result.card.name == 'du') return false;
                    //if(get.mode()=='guozhan') return false;
                    return true;
                },
                preHidden: true,
                check: function (event) {
                    if (event.result.card.name == 'du') return false;
                    return true;
                },
                filter: function (event, player) {
                    return get.position(event.result.card, true) == 'o' && event.result.card != player.storage.luciya_xl;
                },
                content: function () {
                    player.gain(trigger.result.card, 'gain2')
                },
                group: "luciya_yc_1",
                subSkill: {
                    "1": {
                        trigger: {
                            global: ["chooseToCompareAfter", "compareMultipleAfter"],
                            player: ["chooseToCompareAfter", "compareMultipleAfter"],
                            target: ["chooseToCompareAfter", "compareMultipleAfter"],
                        },
                        frequent: true,
                        filter: function (event, player) { return [event.card1, event.card2].filterInD('od').length > 0 },
                        check: function (event, player) { return event.card1.name == 'du' || event.card2.name == 'du'; },
                        content: function () {
                            player.gain([trigger.card1, trigger.card2].filterInD('od'), 'gain2', 'log')
                        },
                        sub: true,
                    },
                    "2": {
                        trigger: {
                            global: "respondEnd",
                        },
                        filter: function (event, player) {
                            if (event.player == player) return false;
                            if (event.cards) {
                                for (var i = 0; i < event.cards.length; i++) {
                                    if (get.position(event.cards[i], true) == 'o') return true;
                                }
                            }
                            return false;
                        },
                        frequent: true,
                        content: function () {
                            var cards = trigger.cards.slice(0);
                            for (var i = 0; i < cards.length; i++) {
                                if (get.position(cards[i], true) != 'o') {
                                    cards.splice(i--, 1);
                                }
                            }
                            game.delay(0.5);
                            player.gain(cards, 'gain2');
                        },
                        sub: true,
                    },
                },
            },
            "skery_ds": {
                trigger: {
                    source: "damageAfter",
                },
                filter: function (event, player) {
                    return event.card;
                },
                forced: true,
                content: function () {
                    var target = trigger.player;
                    target.addTempSkill('skery_ds_1', { player: 'phaseAfter' });
                    target.addTempSkill('skery_ds_2', { player: 'phaseAfter' })
                    target.addMark('skery_ds_1', trigger.num, false);
                },
                group: "skery_ds_3",
                subSkill: {
                    "1": {
                        forced: true,
                        popup: false,
                        trigger: {
                            player: "phaseEnd",
                        },
                        onremove: true,
                        content: function () {
                            player.loseHp(player.countMark('skery_ds_1'));
                            game.log(player, '〖毒杀〗造成的体力失去为' + player.countMark('skery_ds_1'));
                            player.removeSkill('skery_ds_1');
                        },
                        marktext: "毒",
                        intro: {
                            content: "回合结束时，〖毒杀〗造成的体力失去为#",
                        },
                        sub: true,
                    },
                    "2": {
                        forced: true,
                        popup: false,
                        trigger: {
                            player: "useCard",
                        },
                        filter: function (event, player) {
                            return (event.card.name == 'tao' || event.card.name == 'jiu') && event.player.isPhaseUsing();
                        },
                        content: function () {
                            if (player.countMark('skery_ds_1') != 0) player.removeSkill('skery_ds_1')
                        },
                        sub: true,
                    },
                    "3": {
                        forced: true,
                        popup: false,
                        trigger: {
                            player: "useCardToPlayered",
                        },
                        filter: function (event, player) {
                            return event.card.name == 'sha' && get.color(event.card) == 'black';
                        },
                        logTarget: "target",
                        content: function () {
                            trigger.getParent().directHit.add(trigger.target);
                        },
                        sub: true,
                    },
                },
            },
            "skery_yj": {
                trigger: {
                    global: "useCard",
                },
                filter: function (event, player) {
                    return (event.card.name == 'jiu' || event.card.name == 'tao') && event.player != player && player.countCards('h') > 0;
                },
                direct: true,
                content: function () {
                    "step 0"
                    var goon = (ai.get.attitude(player, trigger.player) < 0)
                    var next = player.chooseToDiscard(1, 'h', false).set('prompt', get.prompt('skery_yj'))
                        .set('prompt2', '你可以弃置一张手牌并进行一次判定，若结果为黑色，此牌无效；若结果为红色，该角色弃置两张牌。')
                    next.ai = function (card) {
                        if (goon) {
                            return 8 - ai.get.value(card);
                        }
                        return 0;
                    }
                    next.logSkill = ['skery_yj', trigger.player];
                    'step 1'
                    if (result.bool) {
                        player.judge()
                    } else {
                        event.finish()
                    }
                    "step 2"
                    switch (result.color) {
                        case 'red': player.discardPlayerCard(2, trigger.player, 'h', true); break;
                        case 'black': trigger.cancel(); break;
                    }
                },
            },
            "miya_hz": {
                trigger: {
                    source: "damageBegin",
                },
                filter: function (event, player) {
                    return event.card && event.card.name == 'sha' && event.getParent().name == 'sha'
                },
                init: function (player) {
                    if (!player.storage.miya_hz) player.storage.miya_hz = 0
                },
                intro: {
                    content: function (storage, player, skill) { return '当前有' + storage + '个标记' },
                },
                mark: true,
                direct: true,
                content: function () {
                    trigger.num += player.storage.miya_hz
                    player.storage.miya_hz += 1
                    player.markSkill('miya_hz')
                },
                group: "miya_hz_one",
                subSkill: {
                    one: {
                        forced: true,
                        popup: false,
                        silent: true,
                        trigger: {
                            global: "phaseEnd",
                        },
                        content: function () {
                            player.storage.miya_hz = 0
                            player.updateMark('miya_hz')
                        },
                        sub: true,
                    },
                },
            },
            "miya_ks": {
                trigger: {
                    source: "damageEnd",
                },
                forced: true,
                filter: function (event, player) {
                    return event.card && event.card.name == 'sha' && _status.currentPhase == player;
                },
                content: function () {
                    player.draw(1);
                    player.getStat().card.sha--;
                },
                mod: {
                    cardUsable: function (card, player, num) {
                        if (card.name == 'sha') return num + 1;
                    },
                },
            },
            "milism_ql": {
                trigger: {
                    player: "damageAfter",
                },
                forced: true,
                usable: 1,
                filter: function (event, player) {
                    return _status.currentPhase != player;
                },
                content: function () {
                    player.addTempSkill("milism_ql_1", ['phaseAfter', 'phaseBefore']);
                    player.addTempSkill("milism_ql_2", { player: "phaseBegin" })
                },
                subSkill: {
                    "1": {
                        forced: true,
                        trigger: {
                            player: "damageBegin1",
                        },
                        priority: 15,
                        mark: true,
                        intro: {
                            content: "你受到伤害前，免除之",
                        },
                        content: function () {
                            trigger.cancel()
                        },
                        ai: {
                            effect: {
                                target: function (card, player, target, current) { if (get.type(card) == 'trick' || card.name == 'sha') return 'zeroplayertarget'; },
                            },
                        },
                        sub: true,
                    },
                    "2": {
                        trigger: {
                            target: "useCardToBefore",
                        },
                        forced: true,
                        priority: 15,
                        filter: function (event, player) {
                            return get.type(event.card) == 'trick' && event.card.name != 'wugu' && event.card.name != 'taoyuan';
                        },
                        content: function () {
                            game.log(player, '发动了潜鳞，', trigger.card, '对', trigger.target, '失效')
                            trigger.cancel();
                        },
                        mod: {
                            targetEnabled: function (card, player, target, now) {
                                if (card.name == 'bingliang' || card.name == 'lebu') return false;
                            },
                        },
                        mark: true,
                        intro: {
                            content: "除【五谷丰登】和【桃园结义】外，普通锦囊牌对你无效。且你不会成为【乐不思蜀】和【兵粮寸断】的目标。",
                        },
                        ai: {
                            effect: {
                                target: function (card, player, target, current) {
                                    if (get.type(card) == 'trick') return 'zeroplayertarget';
                                },
                            },
                        },
                        sub: true,
                    },
                },
            },
            "milism_th": {
                audio: "ext:福瑞扩展:2",
                trigger: {
                    player: "phaseBefore",
                },
                mark: true,
                filter: function (event, player) {
                    if (!player.storage.milism_th_recode) return true;
                    return game.hasPlayer(function (current) {
                        return !player.storage.milism_th_recode.contains(current);
                    });
                },
                init: function (player) {
                    if (!player.storage.milism_th_recode) player.storage.milism_th_recode = [];
                },
                forced: true,
                content: function () {
                    "step 0"
                    player.chooseTarget(1, true).set("filterTarget", function (card, player, target) {
                        return target != player
                    }).set('ai', function (target) {
                        var att = get.attitude(_status.event.player, target);
                        if (att > 0) return att + 1;
                        if (att == 0) return Math.random();
                        return att
                    }).set("prompt", "请选择〖同游〗的目标")
                    "step 1"
                    if (!player.storage.milism_th_recode) player.storage.milism_th_recode = [];
                    player.storage.milism_th_recode[0] = result.targets[0];
                },
                intro: {
                    content: function (storage, player, skill) {
                        var str = '当前〖同游〗目标：';
                        str += "<span style='color: red'>" + get.translation(player.storage.milism_th_recode) + "</span>";
                        return str;
                    },
                },
                group: ["milism_th_1", "milism_th_2"],
                subSkill: {
                    "1": {
                        trigger: {
                            global: "damageBefore",
                        },
                        locked: true,
                        filter: function (event, player) {
                            return event.player == player.storage.milism_th_recode[0]
                        },
                        check: function (event, player) {
                            var target = event.player;
                            if (player.hp == 1) return false
                            if (target.hp == target.maxHp) return false
                            if (get.attitude(player, target) < 0) return false;
                            return true
                        },
                        logTarget: "player",
                        content: function () {
                            trigger.cancel();
                            player.damage(trigger.source, trigger.nature)
                        },
                        sub: true,
                    },
                    "2": {
                        trigger: {
                            global: "recoverBegin",
                        },
                        filter: function (event, player) {
                            return event.player == player.storage.milism_th_recode[0]
                        },
                        forced: true,
                        content: function () {
                            player.recover()
                        },
                        sub: true,
                    },
                    recode: {
                        sub: true,
                    },
                },
            },
            "tery_hx": {
                trigger: {
                    player: "damageBegin1",
                },
                unique:true,
                filter: function (event, player) {
                    var info = lib.character[event.source.name];
                    var skills = event.source.getSkills();
                    var list = [];
                    for (var i = 0; i < info[3].length; i++) {
                        if (lib.skill[info[3][i]].fixed || lib.skill[info[3][i]].unique || lib.skill[info[3][i]].zhuSkill || lib.skill[info[3][i]].charlotte || lib.skill[info[3][i]].yunlvSkill || lib.skill[info[3][i]].qianghua || lib.skill[info[3][i]].hiddenSkill || lib.skill[info[3][i]].juexingji || lib.skill[info[3][i]].limited || lib.skill[info[3][i]].dutySkill || (info.unique && !info.gainable)) continue;
                        if (skills.contains(info[3][i]) && !player.hasSkill(info[3][i])) {
                            list.push(info[3][i]);
                        }
                    }
                    if (list.length) { return true }
                    else return false
                },
                check: function (event, player) {
                    if (player.hp == player.maxHp && event.num == 1) return false
                    if (player.hp < player.maxHp - 1 || (player.hp <= 2 && event.num >= 2)) return true;
                    return false
                },
                content: function () {
                    'step 0'
                    trigger.cancel()
                    player.loseMaxHp()
                    var info = lib.character[trigger.source.name];
                    var skills = trigger.source.getSkills();
                    var list = [];
                    for (var i = 0; i < info[3].length; i++) {
                        if (lib.skill[info[3][i]].fixed || lib.skill[info[3][i]].unique || lib.skill[info[3][i]].zhuSkill || lib.skill[info[3][i]].charlotte || lib.skill[info[3][i]].hiddenSkill || lib.skill[info[3][i]].juexingji || lib.skill[info[3][i]].limited || lib.skill[info[3][i]].dutySkill || (info.unique && !info.gainable)) continue;
                        if (skills.contains(info[3][i]) && !player.hasSkill(info[3][i])) {
                            list.push(info[3][i]);
                        }
                    }
                    event.skills = list
                    if (list.length) {
                        player.chooseControl(list).set('prompt', '选择获得一项技能').set('ai', function () { return event.skills.randomGet() });
                    }
                    'step 1'
                    player.addSkill(result.control);
                    player.popup(result.control);
                    game.log(player, '获得技能', '【' + get.translation(result.control) + '】');
                    trigger.source.removeSkill(result.control)
                    game.log(trigger.source, '失去技能', '【' + get.translation(result.control) + '】')
                },
            },
            "lens_yl": {
                trigger: {
                    source: "damageBegin",
                },
                check: function (event, player) {
                    return get.attitude(player, event.player) < 0;
                },
                filter: function (event, card, player) {
                    if (!event.cards) return false
                    return !event.nature
                },
                content: function () {
                    "step 0"
                    event.colors = get.color(trigger.cards[0])
                    event.suits = get.suit(trigger.cards[0])
                    player.judge('lens_yl', function (card) {
                        if (get.suit(card) == event.suits) return 2.5
                        if (get.color(card) == event.colors) return 1.5
                        return -0.5
                    })
                        .judge2 = function (result) {
                            return result.bool;
                        };
                    "step 1"
                    if (result.judge > 0) {
                        switch (result.color) {
                            case 'red': trigger.nature = 'fire'; break;
                            case 'black': trigger.nature = 'thunder'; break;
                        }
                        if (result.suit == event.suits) {
                            trigger.num += 2
                        }
                    }
                },
            },
            "krikt_th": {
                mark: true,
                locked: true,
                zhuanhuanji: true,
                marktext: "☯",
                intro: {
                    content: function (storage, player, skill) {
                        if (player.storage.krikt_th == true) return '锁定技，出牌阶段，你的【杀】无使用次数限制，你的黑色【杀】均视为雷【杀】；每当你对其他角色造成一点伤害，你弃置其一张手牌。';
                        return '锁定技，你的【杀】可以额外指定一个目标，你的红色【杀】均视为火【杀】；每当你对其他角色造成一点伤害，你摸一张牌。';
                    },
                },
                audio: "ext:福瑞扩展:2",
                trigger: {
                    player: "phaseUseBegin",
                },
                forced: true,
                content: function () {
                    'step 0'
                    if (player.storage.krikt_th == true) {
                        player.storage.krikt_th = false;
                        player.addTempSkill('krikt_th_2', 'phaseUseAfter');
                    }
                    else {
                        player.storage.krikt_th = true;
                        player.addTempSkill('krikt_th_1', 'phaseUseAfter');
                    };
                    player.updateMark('krikt_th')
                },
                subSkill: {
                    "1": {
                        trigger: {
                            source: "damageEnd",
                        },
                        filter: function (event, player) {
                            return player != event.player
                        },
                        content: function () {
                            player.discardPlayerCard(trigger.num, trigger.player, 'h', true)
                        },
                        forced: true,
                        mod: {
                            cardUsable: function (card) {
                                if (card.name == 'sha') return Infinity;
                            },
                            cardnature: function (card, player) {
                                if (card.name == 'sha' && get.color(card) == 'black') return 'thunder';
                            },
                        },
                        ai: {
                            effect: {
                                target: function (card, player, target, current) {
                                    if (get.tag(card, 'respondSha') && current < 0) return 0.6
                                },
                            },
                            respondSha: true,
                        },
                        sub: true,
                    },
                    "2": {
                        trigger: {
                            source: "damageEnd",
                        },
                        filter: function (event, player) {
                            return player != event.player
                        },
                        content: function () {
                            player.draw(trigger.num)
                        },
                        forced: true,
                        mod: {
                            targetInRange: function (card, player) {
                                if (card.name == 'sha') return true;
                            },
                            cardnature: function (card, player) {
                                if (card.name == 'sha' && get.color(card) == 'red') return 'fire';
                            },
                            selectTarget: function (card, player, range) {
                                if (card.name == 'sha' && range[1] != -1) {
                                    range[1]++;
                                }
                            },
                        },
                        ai: {
                            effect: {
                                target: function (card, player, target, current) {
                                    if (get.tag(card, 'respondSha') && current < 0) return 0.6
                                },
                            },
                            respondSha: true,
                        },
                        sub: true,
                    },
                },
                ai: {
                    fireAttack: true,
                    halfneg: true,
                    threaten: 1.05,
                },
            },
            "krikt_ly": {
                trigger: {
                    player: "useCardToTargeted",
                },
                filter: function (event, player) {
                    return event.card.name == 'sha' && player.canCompare(event.target)
                },
                check: function (event, player) {
                    return get.attitude(player, event.target) < 0;
                },
                content: function () {
                    "step 0"
                    player.chooseToCompare(trigger.target);
                    "step 1"
                    if (result.bool) {
                        trigger.target.chooseCard('交给' + get.translation(player) + '一张牌', 'he', true).set('ai', function (card) {
                            return 100 - get.value(card);
                        });
                    }
                    var card = get.color(result.player, player)
                    if (card == 'red') {
                        trigger.getParent().directHit.add(trigger.target)
                    } else if (card == 'black') {
                        var id = trigger.target.playerid;
                        var map = trigger.customArgs;
                        if (!map[id]) map[id] = {};
                        if (!map[id].extraDamage) map[id].extraDamage = 0;
                        map[id].extraDamage++;
                    }
                    "step 2"
                    if (result.cards) player.gain(result.cards, trigger.target, 'giveAuto');
                },
                ai: {
                    "directHit_ai": true,
                    skillTagFilter: function (player, tag, arg) {
                        if (player._krikt_ly_temp) return false;
                        player._krikt_ly_temp = true;
                        var bool = function () {
                            if (arg.card.name != 'sha' || get.attitude(player, arg.target) >= 0 || !arg.target.countCards('h')) return false;
                            if (arg.target.countCards('h') == 1 && (!arg.target.getEquip('bagua') || player.hasSkillTag('unequip', false, {
                                name: arg.card ? arg.card.name : null,
                                target: arg.target,
                                card: arg.card
                            }) || player.hasSkillTag('unequip_ai', false, {
                                name: arg.card ? arg.card.name : null,
                                target: arg.target,
                                card: arg.card
                            }))) return true;
                            return player.countCards('h', function (card) {
                                return card != arg.card && (!arg.card.cards || !arg.card.cards.contains(card)) && get.value(card) <= 4 && (get.number(card) >= (11 + arg.target.countCards('h') / 2) || get.suit(card, player) == 'heart');
                            }) > 0;
                        }();
                        delete player._krikt_ly_temp;
                        return bool;
                    },
                    effect: {
                        target: function (card, player, target, current) {
                            if (card.name == 'sha' && current < 0) return 0.7;
                        },
                    },
                },
            },
            "lens_rj": {
                forced: true,
                filter: function (event, player) {
                    return (player.isLinked() ? '' : 'n')
                },
                trigger: {
                    source: "damageBefore",
                },
                content: function () {
                    trigger.player.link(true)
                },
                ai: {
                    effect: {
                        target: function (card) {
                            if (card.name == 'tiesuo') return 'zeroplayertarget';
                        },
                    },
                },
                subSkill: {
                    "1": {
                        audio: 2,
                        trigger: {
                            player: "linkBegin",
                        },
                        forced: true,
                        filter: function (event, player) {
                            return !player.isLinked();
                        },
                        content: function () {
                            trigger.cancel();
                        },
                        sub: true,
                    },
                },
            },
            "sisk_hz": {
                trigger: {
                    player: "damageEnd",
                    source: "damageEnd",
                },
                marktext: "剑",
                forced: true,
                init: function (player) {
                    if (!player.storage.sisk_hz) player.storage.sisk_hz = 0
                },
                intro: {
                    content: function (storage, player, skill) { return '当前有' + storage + '个标记' },
                },
                mark: true,
                direct: true,
                content: function () {
                    player.storage.sisk_hz += 1
                    player.markSkill('sisk_hz')
                },
            },
            "sisk_cs": {
                trigger: {
                    player: "useCardToTargeted",
                },
                check: function (event, player) {
                    return get.attitude(player, event.target) <= 0;
                },
                logTarget: "target",
                filter: function (event, player) {
                    return event.card.name == 'sha' && player.storage.sisk_hz > 2
                },
                content: function () {
                    player.removeMark('sisk_hz', 3)
                    player.updateMark('sisk_hz')
                    trigger.getParent().directHit.add(trigger.target)
                    var id = trigger.target.playerid;
                    var map = trigger.customArgs;
                    if (!map[id]) map[id] = {};
                    if (!map[id].extraDamage) map[id].extraDamage = 0;
                    map[id].extraDamage++;
                },
                ai: {
                    "directHit_ai": true,
                },
            },
            "sisk_dm": {
                forced: true,
                trigger: {
                    source: "damageAfter",
                },
                content: function () {
                    player.recover(trigger.num)
                },
                group: "sisk_dm_1",
                subSkill: {
                    "1": {
                        trigger: {
                            player: "useCard1",
                        },
                        forced: true,
                        filter: function (event, player) {
                            return !event.audioed && event.card.name == 'sha' && player.countUsed('sha', true) > 1 && event.getParent().type == 'phase';
                        },
                        content: function () {
                            trigger.audioed = true;
                        },
                        mod: {
                            cardUsable: function (card, player, num) {
                                if (card.name == 'sha') return Infinity;
                            },
                        },
                        sub: true,
                    },
                },
            },
            "rest_nb": {
                enable: "phaseUse",
                audio: "ext:福瑞扩展:2",
                unique: true,
                filter: function (event, player) {
                    return player.storage.rest_qf && player.storage.rest_qf.length >= 2;
                },
                prompt: "移去两张“孽”并视为使用任意基本牌或普通锦囊牌使用",
                content: function () {
                    'step 0'
                    player.chooseCardButton(2, '移去两张“孽”并当视为使用任意基本牌或普通锦囊牌使用', player.storage.rest_qf, true);
                    'step 1'
                    if (!result.bool) {
                        event.finish();
                        return;
                    }
                    player.$throw(result.links);
                    for (var i = 0; i < result.links.length; i++) {
                        player.storage.rest_qf.remove(result.links[i]);
                    }
                    game.cardsDiscard(player.storage.rest_qf);
                    player.syncStorage('rest_qf');
                    "step 2"
                    var list = [];
                    for (var i = 0; i < lib.inpile.length; i++) {
                        var name = lib.inpile[i];
                        var type = get.type(name);
                        if (type == 'trick' || type == 'basic') {
                            if (lib.filter.cardEnabled({ name: name }, player)) {
                                list.push([get.translation(type), '', name]);
                            }
                        }
                    }
                    var dialog = ui.create.dialog('孽变', [list, 'vcard']);
                    var taoyuan = 0, nanman = 0;
                    var players = game.filterPlayer();
                    for (var i = 0; i < players.length; i++) {
                        var eff1 = get.effect(players[i], { name: 'taoyuan' }, player, player);
                        var eff2 = get.effect(players[i], { name: 'nanman' }, player, player);
                        if (eff1 > 0) {
                            taoyuan++;
                        }
                        else if (eff1 < 0) {
                            taoyuan--;
                        }
                        if (eff2 > 0) {
                            nanman++;
                        }
                        else if (eff2 < 0) {
                            nanman--;
                        }
                    }
                    player.chooseButton(dialog).ai = function (button) {
                        var name = button.link[2];
                        if (Math.max(taoyuan, nanman) > 1) {
                            if (taoyuan > nanman) return name == 'taoyuan' ? 1 : 0;
                            return name == 'nanman' ? 1 : 0;
                        }
                        if (player.countCards('h') < player.hp && player.hp >= 2) {
                            return name == 'wuzhong' ? 1 : 0;
                        }
                        if (player.hp < player.maxHp && player.hp < 3) {
                            return name == 'tao' ? 1 : 0;
                        }
                        return name == 'zengbin' ? 1 : 0;
                    }
                    'step 3'
                    if (result.bool) {
                        player.chooseUseTarget(true, result.links[0][2]);
                    }
                },
                ai: {
                    fireAttack: true,
                    respondSha: true,
                    respondShan: true,
                    order: 1,
                    result: {
                        player: function (player) {
                            if (_status.event.dying) return get.attitude(player, _status.event.dying);
                            return 1;
                        },
                    },
                },
            },
            "blackwolf_cy": {
                zhuanhuanji: true,
                marktext: "☯",
                mark: true,
                init: function (player, storage, skill) {
                    if (!player.storage.blackwolf_cy) player.storage.blackwolf_cy = false
                },
                intro: {
                    content: function (storage) {
                        return storage ? '出牌阶段结束时，你可以摸X张牌（X为你本回合造成的伤害数），直到你的下个回合开始：当你成为其他角色【杀】或伤害类锦囊牌的目标时，若此牌目标数大于1，你取消之；否则，你弃置该角色一张牌。' : '出牌阶段开始时，你可以展示其他角色的一张手牌，然后你可以将与展示牌不同花色的一张手牌当作【出其不意】对该角色使用（每种花色限一次），若【出其不意】未造成伤害，你结束本回合，否则你可以重复此流程。';
                    },
                },
                group: ["blackwolf_cy_positive", "blackwolf_cy_nagtive"],
                subSkill: {
                    positive: {
                        trigger: {
                            player: "phaseUseBegin"
                        },
                        direct: true,
                        filter: function (event, player) {
                            return !player.storage.blackwolf_cy
                        },
                        direct: true,
                        content: function () {
                            "step 0"
                            event.suit = []
                            event.firstTime = true
                            "step 1"
                            player.chooseTarget(1, '展示一名其他角色的一张牌', function (card, player, target) {
                                return target != player && target.countCards('h') > 0
                            }).set('ai', function (target) {
                                var player = _status.event.player
                                return -get.attitude(player, target)
                            })
                            "step 2"
                            if (result.bool) {
                                if (event.firstTime) {
                                    if (!player.storage.blackwolf_cy) player.storage.blackwolf_cy = false;
                                    player.storage.blackwolf_cy = !player.storage.blackwolf_cy;
                                    event.firstTime = false
                                }
                                event.target = result.targets[0]
                                event.card = event.target.getCards('h').randomGet();
                                event.target.showCards(event.card, get.translation(event.target) + '展示了' + get.translation(event.card))
                            } else {
                                event.finish()
                            }
                            "step 3"
                            var tempSuit = event.suit
                            if (!event.suit.contains(get.suit(event.card))) {
                                tempSuit.push(get.suit(event.card))
                            }
                            if (player.canUse({ name: 'chuqibuyi', isCard: true }, event.target)) {
                                player.chooseCard(1, 'h', function (card, player) {
                                    return !tempSuit.contains(get.suit(card))
                                }).set('prompt2', '将一张花色不为' + get.translation(tempSuit) + '的手牌当作【出其不意】对' + get.translation(event.target) + '使用')
                                    .set('ai', function (card) {
                                        var player = _status.event.player
                                        if (get.attitude(player, event.target) > 0) {
                                            return -1
                                        } else {
                                            return 7 - get.value(card)
                                        }
                                    })
                            } else {
                                event.finish()
                            }
                            "step 4"
                            if (result.bool) {
                                event.cardx = result.cards[0]
                                event.suit.push(get.suit(result.cards[0]))
                                event.related = player.useCard(result.cards, { name: 'chuqibuyi' }, target, false, 'blackwolf_cy').card;
                                game.log(event.related)
                            } else {
                                event.finish()
                            }
                            "step 5"
                            if (!player.getHistory('sourceDamage', function (evt) {
                                var card = evt.card;
                                var evtx = evt.getParent('useCard');
                                return card && card.name == 'chuqibuyi' && evtx.card == card && evtx.card == event.related && evtx.getParent() == event;
                            }).length) {
                                trigger.cancel()
                                var evt = _status.event.getParent('phaseUse');
                                if (evt && evt.name == 'phaseUse') {
                                    evt.skipped = true;
                                }
                                var evt = _status.event.getParent('phase');
                                if (evt && evt.name == 'phase') {
                                    evt.finish();
                                }
                                event.finish()
                            } else {
                                event.goto(1)
                            }
                        },
                    },
                    nagtive: {
                        trigger: {
                            player: "phaseUseEnd"
                        },
                        filter: function (event, player) {
                            return player.storage.blackwolf_cy
                        },
                        direct: true,
                        content: function () {
                            if (!player.storage.blackwolf_cy) player.storage.blackwolf_cy = false;
                            player.storage.blackwolf_cy = !player.storage.blackwolf_cy;
                            var stat = player.getStat();
                            if (stat.damage && stat.damage > 0) {
                                player.draw(stat.damage)
                            }
                            player.addTempSkill('blackwolf_cy_1', { player: "phaseBegin" })
                        }
                    },
                    1: {
                        trigger: {
                            target: "useCardToTargeted",
                        },
                        filter: function (event, player) {
                            return (event.card.name == 'sha' || (get.type(event.card) == 'trick' && get.tag(event.card, 'damage'))) && event.targets;
                        },
                        direct: true,
                        content: function () {
                            if (trigger.targets.length > 1) {
                                trigger.getParent().excluded.add(player);
                            } else if (trigger.targets.length == 1) {
                                player.discardPlayerCard(trigger.player, 'he', true)
                            }
                        }
                    }
                }
            },
            "blackwolf_nb": {
                trigger: {
                    global: "phaseEnd"
                },
                direct: true,
                content: function () {
                    "step 0"
                    var list = ['免疫']
                    var choiceList = ['下一名角色的回合内，你不能成为手牌数大于你的角色的目标。']
                    if (trigger.player != player && player.countCards('h') > 0 && trigger.player.isAlive()) {
                        list.push('出杀')
                        choiceList.push('将一张牌当【杀】对' + get.translation(trigger.player) + '使用')
                    }
                    player.chooseControl(list, 'cancel2').set('choiceList', choiceList).set('ai', function () {
                        var att = get.attitude(player, target)
                        if (player.countCards('h') > 2 && att < 0) {
                            return '出杀'
                        } else {
                            return '免疫'
                        }
                    }).set('target', trigger.player)
                    'step 1'
                    if (result.control == '出杀') {
                        player.chooseCard(1, 'h', true).set('ai', function (card) {
                            return 100 - get.value(card)
                        })
                    } else if (result.control == '免疫') {
                        player.addTempSkill('blackwolf_nb_1', { global: "phaseEnd" })
                        event.finish()
                    } else {
                        event.finish()
                    }
                    'step 2'
                    player.useCard(result.cards, { name: 'sha' }, trigger.player, false).viewAs = true;
                },
                group: "blackwolf_nb_clean",
                subSkill: {
                    1: {
                        forced: true,
                        mod: {
                            targetEnabled: function (card, player, target) {
                                if (player.countCards('h') > target.countCards('h')) return false
                            },
                        },
                    },
                    clean: {
                        trigger: {
                            player: "damageEnd"
                        },
                        forced: true,
                        content: function () {
                            player.addTempSkill('blackwolf_nb_filter', { player: "phaseJieshuBegin" })
                        },
                    },
                    filter: {
                        init: function (player, skill) {
                            player.addSkillBlocker(skill);
                        },
                        onremove: function (player, skill) {
                            player.removeSkillBlocker(skill);
                        },
                        charlotte: true,
                        locked: true,
                        skillBlocker: function (skill, player) {
                            return skill == 'blackwolf_nb'
                        },
                        mark: true,
                        intro: {
                            content: "〖匿波〗失效直到你的结束阶段。"
                        }
                    }
                }
            },
            "whitewolf_wl": {
                trigger: {
                    global: "damageEnd"
                },
                check: function (event, player) {
                    var att1 = get.attitude(player, event.player);
                    var att2 = get.attitude(player, event.source)
                    return att2 < 0 && att1 > 0
                },
                mark: true,
                intro: {
                    content: "本回合已对$发动过本技能"
                },
                filter: function (event, player) {
                    return event.cards && event.source != player && event.source && get.distance(player, event.player) <= 1 && event.player.isIn() && !player.storage.whitewolf_wl.contains(event.player)
                },
                content: function () {
                    'step 0'
                    if (!player.storage.whitewolf_wl) player.storage.whitewolf_wl = []
                    trigger.source.gain(trigger.cards, 'gain2')
                    player.storage.whitewolf_wl.push(trigger.player)
                    event.card = player.useCard({ name: 'sha', isCard: true }, trigger.source, false).card;
                    'step 1'
                    if (player.getHistory('sourceDamage', function (evt) {
                        return event.card == evt.card;
                    }).length) {
                        trigger.player.recover(trigger.num)
                    }
                },
                group: "whitewolf_wl_clean",
                subSkill: {
                    clean: {
                        trigger: {
                            global: "phaseBegin",
                        },
                        popup: false,
                        forced: true,
                        content: function () {
                            player.storage.whitewolf_wl = []
                        }
                    }
                }
            },
            "whitewolf_fz": {
                trigger: {
                    source: "damageBegin4",
                },
                filter: function (event, player) {
                    return event.player != player && event.num > 0 && !event.player.hasSkill('whitewolf_fz_1')
                },
                check: function (event, player) {
                    var att = get.attitude(player, event.player)
                    if (att > 0) {
                        if (event.player.hp == 1) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        if (event.player.countCards('h') < 4) {
                            return false
                        } else {
                            return true
                        }
                    }
                },
                content: function (event, player) {
                    trigger.player.addTempSkill('whitewolf_fz_1', { player: "phaseBegin" })
                    trigger.player.storage.whitewolf_fz = [player]
                    if (!player.storage.whitewolf_fz) player.storage.whitewolf_fz = []
                    player.storage.whitewolf_fz.push(trigger.player)
                    trigger.player.addTempSkill('whitewolf_fz_disable')
                    player.addTempSkill('whitewolf_fz_disable')
                },
                subSkill: {
                    1: {
                        mark: true,
                        intro: {
                            content: '你的红色牌均视为【闪】，黑色牌均视为【无懈可击】，直到其下个回合开始。'
                        },
                        mod: {
                            cardname: function (card, player) {
                                if (get.color(card) == 'red') return 'shan';
                                if (get.color(card) == 'black') return 'wuxie'
                            },
                        }
                    },
                    disable: {
                        onremove: function (player) {
                            delete player.storage.whitewolf_fz
                        },
                        mark: true,
                        intro: {
                            mark: function (dialog, storage, player) {
                                dialog.addText('你本回合只能对' + get.translation(player.storage.whitewolf_fz) + '使用牌')
                            }
                        },
                        mod: {
                            playerEnabled: function (card, player, target, now) {
                                if (!player.storage.whitewolf_fz.contains(target)) return false;
                            },
                        }
                    },
                }
            },
            "rest_qf": {
                intro: {
                    content: "cards",
                    onunmark: function (storage, player) {
                        if (storage && storage.length) {
                            player.$throw(storage, 1000);
                            game.cardsDiscard(storage);
                            game.log(storage, '被置入了弃牌堆');
                            storage.length = 0;
                        }
                    },
                },
                enable: "phaseUse",
                usable: 1,
                audio: "ext:福瑞扩展:2",
                init: function (player, skill) {
                    if (!player.storage[skill]) player.storage[skill] = [];
                },
                filter: function (event, player) {
                    return player.storage.rest_qf.length < 4 && player.countCards('h') > 0;
                },
                visible: true,
                filterCard: true,
                selectCard: function () {
                    var player = _status.event.player;
                    return [1, 4 - player.storage.rest_qf.length];
                },
                discard: false,
                toStorage: true,
                delay: false,
                content: function () {
                    'step 0'
                    //player.lose(cards,ui.special,'toStorage')
                    player.$give(cards, player, false);
                    player.storage.rest_qf = player.storage.rest_qf.concat(cards);
                    player.markSkill('rest_qf');
                },
                check: function (card) {
                    return 8 - get.value(card);
                },
                onremove: function (player, skill) {
                    var cards = player.storage.rest_qf;
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                ai: {
                    order: 5,
                    result: {
                        player: 1,
                    },
                },
                group: "rest_qf_1",
                subSkill: {
                    "1": {
                        trigger: {
                            source: "damageEnd",
                        },
                        frequent: true,
                        check: function (event, player) {
                            return get.attitude(player, event.player) < 0
                        },
                        content: function () {
                            "step 0"
                            player.judge()
                            "step 1"
                            if (result.color == 'red') {
                                player.draw()
                            }
                            if (result.color == 'black') {
                                player.discardPlayerCard(1, trigger.player, 'h', true)
                            }
                        },
                        sub: true,
                    },
                },
            },
            "oert_lh": {
                forced: true,
                trigger: {
                    player: "phaseEnd",
                },
                content: function () {
                    "step 0"
                    player.judge()
                    "step 1"
                    switch (result.color) {
                        case 'red': player.insertPhase(); break;
                        case 'black': player.draw(2); break
                    }
                },
            },
            "oert_bosslh": {
                forced: true,
                trigger: {
                    player: ["phaseEnd", "damageEnd"]
                },
                content: function () {
                    "step 0"
                    player.judge()
                    "step 1"
                    if (result.suit == 'heart') {
                        if (trigger.name == 'damage') {
                            player.gainPlayerCard('hej', [1, 2], _status.currentPhase)
                        } else {
                            player.draw(player.maxHp)
                        }
                    } else {
                        if (trigger.name == 'damage') {
                            player.recover()
                        } else {
                            player.insertPhase()
                        }
                    }
                },
                group: 'oert_bosslh_draw',
                subSkill: {
                    'draw': {
                        trigger: {
                            player: "phaseDrawBegin2"
                        },
                        direct: true,
                        charlotte: true,
                        forced: true,
                        content: function () {
                            trigger.num += player.getDamagedHp()
                        }
                    }
                },
            },
            "telina_hs": {
                trigger: {
                    global: "shaBegin",
                },
                direct: true,
                priority: 11,
                filter: function (event, player) {
                    if (player.hasSkill('telina_hs_4')) return false;
                    if (event.target.isUnderControl()) return false;
                    return event.target != player && event.target.countCards('h') > 0;
                },
                group: ["telina_hs_2", "telina_hs_3"],
                content: function () {
                    "step 0"
                    if (event.isMine()) {
                        event.dialog = ui.create.dialog('慧眼：猜测' + get.translation(trigger.player) + '对' + get.translation(trigger.target) + '的【杀】能否命中');
                    }
                    player.chooseControl('能命中', '不能命中', 'cancel').ai = function (event) {
                        if (trigger.player.hasSkill('wushuang')) return 0;
                        if (trigger.player.hasSkill('liegong')) return 0;
                        if (trigger.player.hasSkill('tieji')) return 0;
                        if (trigger.player.hasSkill('juji')) return 0;
                        if (trigger.player.hasSkill('retieji')) return 0;
                        if (trigger.player.hasSkill('roulin') && trigger.target.sex == 'female') return 0;
                        if (trigger.player.hasSkill('nvquan') && trigger.target.sex == 'male') return 0;
                        if (trigger.target.hasSkill('yijue2')) return 0;
                        if (trigger.target.hasSkill('shejie2')) return 0;
                        if (trigger.target.hasSkill('shanguang2')) return 0;
                        if (trigger.directHit) return 0

                        var equip = trigger.target.getEquip(2);
                        if (equip && equip.name == 'bagua') return 1;
                        return trigger.target.countCards('h') < 2 ? 0 : 1;
                    }
                    "step 1"
                    if (event.dialog) {
                        event.dialog.close();
                    }
                    if (result.control != 'cancel') {
                        player.addTempSkill('telina_hs_4', "shaAfter");
                        player.logSkill(['telina_hs', result.control], trigger.target);
                        game.log(player, '猜测' + result.control);
                        player.storage.telina_hs = result.control;
                        game.delay();
                    }
                },
                subSkill: {
                    "2": {
                        trigger: {
                            global: "shaEnd",
                        },
                        forced: true,
                        popup: false,
                        filter: function (event, player) {
                            return player.storage.telina_hs ? true : false;
                        },
                        content: function () {
                            if (player.storage.telina_hs == '不能命中') {
                                player.popup('猜测成功');
                                player.draw(2);
                                player.storage.telina_th += 1
                            }
                            else {
                                player.popup('猜测失败');
                                player.chooseToDiscard('猜测失败，请弃置一张牌', 'he', true);
                            }
                            delete player.storage.telina_hs;
                        },
                        sub: true,
                    },
                    "3": {
                        trigger: {
                            global: "shaDamage",
                        },
                        forced: true,
                        popup: false,
                        filter: function (event, player) {
                            return player.storage.telina_hs ? true : false;
                        },
                        content: function () {
                            if (player.storage.telina_hs == '能命中') {
                                player.popup('猜测成功');
                                player.draw(2);
                                player.storage.telina_th += 1
                            }
                            else {
                                player.popup('猜测失败');
                                player.chooseToDiscard('猜测失败，请弃置一张牌', 'he', true);
                            }
                            delete player.storage.telina_hs;
                        },
                        sub: true,
                    },
                    "4": {
                        sub: true,
                    },
                },
                ai: {
                    threaten: 1.3,
                },
            },
            "telina_th": {
                trigger: {
                    player: "phaseBegin",
                },
                direct: true,
                init: function (player) {
                    if (!player.storage.telina_th) player.storage.telina_th = 0
                },
                mark: true,
                intro: {
                    content: function (storage, player, skill) { return '当前有' + storage + '个标记' },
                },
                content: function () {
                    if (player.storage.telina_th > 0) { player.addTempSkill("qixi", "phaseEnd") }
                    if (player.storage.telina_th > 1) { player.addTempSkill("duanliang", "phaseEnd") }
                    if (player.storage.telina_th > 2) { player.addTempSkill("guose", "phaseEnd") }
                    if (player.storage.telina_th > 2) { player.addTempSkill("luanji", "phaseEnd") }
                },
                group: "telina_th_int",
                subSkill: {
                    int: {
                        forced: true,
                        trigger: {
                            player: "phaseAfter",
                        },
                        content: function () {
                            player.storage.telina_th = 0
                            player.updateMark("telina_th")
                        },
                        sub: true,
                    },
                },
            },
            "milism_gn": {
                forced: true,
                trigger: {
                    player: "damageEnd",
                },
                content: function () {
                    "step 0"
                    var next = player.chooseTarget('令一名角色摸2X张牌（X为此次伤害值）');
                    if (player.storage.milism_th_recode && player.storage.milism_th_recode.length) {
                        next.set('prompt2', '（若目标为' + get.translation(player.storage.milism_th_recode) + '则改为摸3X张牌）')
                    }
                    next.set('ai', function (target) {
                        var player = _status.event.player;
                        var att = get.attitude(player, target) / Math.sqrt(1 + target.countCards('h'));
                        if (target.hasSkillTag('nogain')) att /= 10;
                        if (player.storage.milism_th_recode && player.storage.milism_th_recode.contains(target)) return att * 2;
                        return att;
                    })
                    "step 1"
                    if (result.bool) {
                        var target = result.targets[0];
                        player.line(target, 'green');
                        if (player.storage.milism_th_recode && player.storage.milism_th_recode.contains(target)) {
                            target.draw(3 * trigger.num);
                        }
                        else {
                            target.draw(2 * trigger.num);
                        }
                    }
                },
            },
            "oert_bosswy": {
                trigger: {
                    player: "phaseBegin",
                },
                firstDo: true,
                logTarget: function (event, player) {
                    return game.filterPlayer(function (current) {
                        return current.isAlive();
                    });
                },
                forced: true,
                content: function () {
                    'step 0'
                    game.countPlayer(function (current) {
                        if (current != player) {
                            current.addTempSkill('baiban')
                        }
                    })
                },
                group: ["oert_bosswy_nouse"],
                subSkill: {
                    nouse: {
                        trigger: {
                            player: "phaseZhunbeiBegin",
                        },
                        logTarget: function (event, player) {
                            return game.filterPlayer(function (current) {
                                return current.isAlive();
                            });
                        },
                        lastDo: true,
                        forced: true,
                        content: function () {
                            'step 0'
                            var list = game.filterPlayer(function (current) {
                                return current.isAlive();
                            }).sortBySeat();
                            list.remove(player)
                            event.list = list;
                            'step 1'
                            if (event.list.length) {
                                event.list.shift().addTempSkill("qinggang2");
                                event.redo();
                            }
                        },
                        sub: true,
                    },
                },
            },
            "oert_wy": {
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                firstDo: true,
                logTarget: function (event, player) {
                    return game.filterPlayer(function (current) {
                        return current.isAlive();
                    });
                },
                forced: true,
                content: function () {
                    'step 0'
                    game.countPlayer(function (current) {
                        if (current != player) {
                            current.addTempSkill('baiban')
                        }
                    })
                },
                group: ["oert_wy_nouse"],
                subSkill: {
                    nouse: {
                        trigger: {
                            player: "phaseZhunbeiBegin",
                        },
                        logTarget: function (event, player) {
                            return game.filterPlayer(function (current) {
                                return current.isAlive();
                            });
                        },
                        lastDo: true,
                        forced: true,
                        content: function () {
                            'step 0'
                            var list = game.filterPlayer(function (current) {
                                return current.isAlive();
                            }).sortBySeat();
                            list.remove(player)
                            event.list = list;
                            'step 1'
                            if (event.list.length) {
                                event.list.shift().addTempSkill("qinggang2");
                                event.redo();
                            }
                        },
                        sub: true,
                    },
                },
            },
            "jiejie_zr": {
                trigger: {
                    player: "phaseBegin",
                },
                content: function () {
                    "step 0"
                    player.chooseTarget(1, true).set("filterTarget", function (card, player, target) {
                        return target != player
                    }).set("ai", function (target) {
                        var player = _status.event.player;
                        return -get.attitude(player, target) / (1 + target.hp)
                    })
                    "step 1"
                    var target = result.targets[0]
                    target.addSkill('jiejie_zr_1')
                    target.loseHp()
                    target.updateMark('jiejie_zr_1')
                    target.storage.jiejie_zr_1 += 1
                    player.gainMaxHp()
                    player.recover()
                },
                subSkill: {
                    "1": {
                        mark: true,
                        init: function (player) {
                            if (!player.storage.jiejie_zr_1) player.storage.jiejie_zr_1 = 0;
                        },
                        marktext: "势",
                        intro: {
                            content: "已拥有$个标记",
                        },
                        sub: true,
                    },
                },
            },
            "jiejie_zf": {
                forced: true,
                filter: function (event, player) {
                    return event.player.countMark('jiejie_zr_1') > 2;
                },
                trigger: {
                    global: "phaseBefore",
                },
                content: function () {
                    trigger.player.removeMark('jiejie_zr_1', trigger.player.countMark("jiejie_zr_1"))
                    trigger.player.removeSkill('jiejie_zr_2')
                    trigger.player.loseHp(3)
                    player.loseMaxHp(2)
                    if (!game.frAchi.hasAchi('当断则断', 'character') && player == game.me && (player.name == 'fr_jiejie' || player.name1 == 'fr_jiejie' || player.name2 == 'fr_jiejie')) {
                        game.frAchi.addProgress('当断则断', 'character');
                    }
                },
            },
            "jiejie_my": {
                forced: true,
                trigger: {
                    global: "dieAfter",
                },
                filter: function (event, player, card) {
                    return event.player.countMark("jiejie_zr_1") > 0
                },
                content: function () {
                    player.loseMaxHp(trigger.player.countMark("jiejie_zr_1"))
                    trigger.player.removeMark('jiejie_zr_1', trigger.player.countMark('jiejie_zr_1'))
                },
                group: "jiejie_my_1",
                subSkill: {
                    "1": {
                        forced: true,
                        trigger: {
                            global: "phaseBegin",
                        },
                        filter: function (event, player, card) {
                            return event.player.countMark("jiejie_zr_1") > 0
                        },
                        content: function () {
                            player.draw(trigger.player.countMark("jiejie_zr_1"))
                        },
                        sub: true,
                    },
                },
            },
            "ken_jj": {
                trigger: {
                    player: "damageAfter",
                },
                forced: true,
                content: function () {
                    var evt = _status.event.getParent('phaseUse');
                    if (evt && evt.name == 'phaseUse') {
                        evt.skipped = true;
                    }
                    var evt = _status.event.getParent('phase');
                    if (evt && evt.name == 'phase') {
                        evt.finish();
                    }
                },
                ai: {
                    jueqing: true,
                },
            },
            "ken_yn": {
                trigger: {
                    global: "damageBefore",
                },
                usable: 1,
                filter: function (event, player) {
                    return player.inRange(event.player) && event.player != player && event.source != player;
                },
                logTarget: function (event, player) {
                    return event.player
                },
                check: function (event, player) {
                    return get.attitude(player, event.player) > 0
                },
                content: function () {
                    "step 0"
                    player.judge()
                    "step 1"
                    if (result.color == 'red') {
                        trigger.cancel()
                        player.damage(trigger.source, trigger.nature)
                        event.finish()
                        return;
                    } else {
                        player.draw()
                        trigger.player.draw()
                        event.goto(0)
                    }
                },
            },
            "milite_sz": {
                trigger: {
                    player: "shaBegin",
                },
                forced: true,
                filter: function (event, player) {
                    return get.distance(event.target, player, 'attack') > 1;
                },
                content: function () {
                    trigger.directHit = true;
                },
            },
            "huye_hr": {
                enable: "chooseToUse",
                filter: function (event, player) {
                    if (event.type != 'dying') return false;
                    if (player != event.dying) return false;
                    if (player.maxHp <= 1) return false;
                    if (player.countCards('h') == 0) return false;
                    return true;
                },
                unique: true,
                zhuSkill: true,
                filterTarget: function (card, player, target) {
                    return target != player && target.countCards('h') > 0 && target.hp > 0 && target.hp <= player.maxHp;
                },
                content: function () {
                    'step 0'
                    player.chooseToCompare(target);
                    'step 1'
                    if (!result.bool) {
                        player.die();
                        event.finish();
                    }
                    else {
                        event.num = target.hp - player.hp;
                        player.loseMaxHp();
                    }
                    'step 2'
                    player.changeHp(event.num);
                    if (get.is.altered('huye_hr')) {
                        event.finish();
                    }
                    'step 3'
                    event.target.changeHp(-event.num);
                    'step 4'
                    if (event.target.hp <= 0) {
                        event.target.dying({ source: player });
                    }
                },
                ai: {
                    order: 1,
                    skillTagFilter: function (player) {
                        if (player.maxHp <= 1) return false;
                        if (player.hp > 0) return false;
                        if (player.countCards('h') == 0) return false;
                    },
                    save: true,
                    result: {
                        target: -1,
                        player: 1,
                    },
                    threaten: 2,
                },
            },
            "huye_ms": {
                enable: "phaseUse",
                usable: 1,
                filter: function (event, player) {
                    return player.countCards('he') > 0;
                },
                mod: {
                    targetInRange: function (card, player, target) {
                        if (target.hasSkill('huye_ms_1')) {
                            return true;
                        }
                    }
                },
                filterTarget: function (card, player, target) {
                    return target != player && !target.hasSkill('huye_ms_1');
                },
                filterCard: function (card) {
                    var suit = get.suit(card);
                    for (var i = 0; i < ui.selected.cards.length; i++) {
                        if (get.suit(ui.selected.cards[i]) == suit) return false;
                    }
                    return true;
                },
                complexCard: true,
                selectCard: [1, 4],
                check: function (card) {
                    return 8 - get.value(card)
                },
                selectTarget: function () {
                    return ui.selected.cards.length
                },
                contentBefore: function () {
                    player.draw(cards.length)
                },
                content: function () {
                    'step 0'
                    target.chooseToRespond({ name: 'shan' });
                    'step 1'
                    if (!result.bool) target.addFrBuff('sleep');
                },
                ai: {
                    order: 2.2,
                    result: {
                        target: function (player, target) {
                            return Math.min(-0.1, -1 - target.countCards('h') + Math.sqrt(target.hp) / 2);
                        },
                    },
                },
            },
            "milite_yj": {
                trigger: {
                    global: "drawAfter",
                },
                usable: 2,
                check: function (event, player) {
                    if (get.attitude(player, event.player) >= 0) return false;
                    if (get.effect(event.player, { name: 'sha' }, player, player) <= 0) return false;
                    if (get.effect(player, { name: 'sha' }, event.player, player) >= 0) return true;
                    return player.hasShan() && player.hp >= event.player.hp;
                },
                filter: function (event, player) {
                    return player != event.player && Array.isArray(event.result) && event.result.length > 0;
                },
                logTarget: "player",
                content: function () {
                    'step 0'
                    player.viewCards(get.translation(trigger.player) + '摸到的牌', trigger.result);
                    if (!event.isMine()) {
                        game.delayx();
                    }
                    'step 1'
                    var list = [];
                    for (var i = 0; i < trigger.result.length; i++) {
                        if (trigger.result[i].name == 'sha') {
                            list.push(trigger.result[i]);
                        }
                    }
                    if (list.length) {
                        player.useCard({ name: 'sha', nature: 'thunder' }, trigger.player);
                    }
                    else {
                        trigger.player.useCard({ name: 'sha', nature: 'thunder' }, player);
                    }
                },
            },
            "jackson_eb": {
                trigger: {
                    global: "gameDrawAfter",
                    player: "enterGame",
                },
                unique: true,
                forced: true,
                init: function (player) {
                    if (!player.storage.jackson_eb) player.storage.jackson_eb = [];
                },
                content: function () {
                    "step 0"
                    player.chooseTarget(Math.min(2, game.players.length - 1), true, "请选择〖纵沙〗的目标", "令" + Math.min(2, game.players.length - 1) + "名角色被标记", function (card, player, target) {
                        return target != player
                    });
                    "step 1"
                    if (result.targets.length == 1) {
                        result.targets[0].addMark('jackson_eb')
                    } else {
                        result.targets[0].addMark('jackson_eb')
                        result.targets[1].addMark('jackson_eb')
                    }
                    player.addSkill("jackson_eb_1")
                    player.addSkill("jackson_eb_2")
                },
                marktext: "纵沙",
                intro: {
                    "name2": "纵沙",
                    content: "已被设下标记",
                },
                group: ["jackson_eb_1", "jackson_eb_2"],
                subSkill: {
                    "1": {
                        unique: true,
                        trigger: {
                            global: "recoverBegin",
                        },
                        forced: true,
                        filter: function (event, player) {
                            return event.player.hasMark('jackson_eb')
                        },
                        logTarget: "player",
                        content: function () {
                            player.gainMaxHp(trigger.num)
                            event.finish()
                        },
                        sub: true,
                    },
                    "2": {
                        trigger: {
                            global: "die",
                        },
                        unique: true,
                        forced: true,
                        preHidden: true,
                        filter: function (event, player) {
                            return event.player.hasMark('jackson_eb') && game.findPlayer(function (current) {
                                return !current.hasMark('jackson_eb') && current != player
                            })
                        },
                        content: function () {
                            "step 0"
                            event.togain = trigger.player.getCards('he');
                            player.gain(event.togain, trigger.player, 'giveAuto');
                            "step 1"
                            player.chooseTarget(1, true, "请选择〖纵沙〗的目标").set("filterTarget", function (card, player, target, skill) {
                                return target.countMark('jackson_eb') == 0 && player != target
                            })
                            "step 2"
                            result.targets[0].addMark('jackson_eb')
                        },
                        sub: true,
                    },
                },
            },
            "jackson_tm": {
                forced: true,
                trigger: {
                    player: "phaseUseBegin",
                },
                unique: true,
                content: function () {
                    "step 0"
                    player.judge()
                    "step 1"
                    switch (result.color) {
                        case 'red': player.recover(); break;
                        case 'black': if (player.maxHp > 5) { player.loseMaxHp() }; break;
                    }
                },
            },
            "west_sx": {
                trigger: {
                    global: "dying",
                },
                filter: function (event, player) {
                    return event.player.hp < 1;
                },
                limited: true,
                skillAnimation: true,
                animationColor: "gray",
                logTarget: "player",
                check: function (event, player) {
                    if (get.attitude(player, event.player) < 4) return false;
                    return true;
                },
                content: function () {
                    "step 0"
                    player.awakenSkill('west_sx');
                    trigger.player.gainMaxHp();
                    "step 1"
                    //var num=Math.min(5,trigger.player.maxHp);
                    trigger.player.recover(trigger.player.maxHp - trigger.player.hp);
                    //if(trigger.player.countCards("h")<=num) trigger.player.draw(num-trigger.player.countCards("h"));
                    //else trigger.player.chooseToDiscard("h",true,trigger.player.countCards("h")-num);
                    "step 2"
                    trigger.player.link(false);
                    trigger.player.turnOver(false);
                    "step 3"
                    trigger.player.disableJudge();
                    "step 4"
                    var num = trigger.player.countDisabled();
                    if (num) {
                        for (var i = 1; i < 6; i++) {
                            if (trigger.player.isDisabled(i)) trigger.player.enableEquip(i);
                        }
                    }
                    "step 5"
                    var num = trigger.player.maxHp - trigger.player.countCards('h')
                    if (num > 0) { trigger.player.draw(num) }
                },
                mark: true,
                intro: {
                    content: "limited",
                },
                init: function (player, skill) {
                    player.storage[skill] = false;
                },
            },
            "west_pz": {
                trigger: {
                    player: ["recoverEnd"],
                },
                direct: true,
                filter: function (event, player) {
                    return game.hasPlayer(function (current) {
                        return current != player && current.isDamaged();
                    })
                },
                content: function () {
                    'step 0'
                    var num = game.countPlayer(function (current) {
                        return current.isDamaged() && current != player
                    })
                    player.chooseTarget([1, Math.min(num, trigger.num)], get.prompt('west_pz'), '令至多' + Math.min(num, trigger.num) + '名已受伤的其他角色回复1点体力', function (card, player, target) {
                        return player != target && target.isDamaged()
                    }).set('ai', function (target) {
                        var player = _status.event.player;
                        return get.recoverEffect(target, player, player);
                    });
                    'step 1'
                    if (result.bool) {
                        player.logSkill('west_pz', result.targets);
                        result.targets.sortBySeat()
                        for (var i = 0; i < result.targets.length; i++) {
                            result.targets[i].recover();
                        }
                    }
                },
            },
            "ken_pb": {
                forced: true,
                mod: {
                    targetEnabled: function (card, player, target) {
                        if (get.type(card) == "delay") return false;
                    },
                },
            },
            /*"kesaya_xs": {
                init: function (player, skill) {
                    player.addSkillBlocker(skill);
                    player.addSkill('kesaya_wy')
                    player.addSkill('kesaya_ax')
                },
                onremove: function (player, skill) {
                    player.removeSkillBlocker(skill);
                    player.removeSkill('kesaya_wy')
                    player.removeSkill('kesaya_ax')
                },
                derivation: ['kesaya_wy', 'kesaya_ax'],
                locked: true,
                skillBlocker: function (skill, player) {
                    return (player.isHealthy() && skill == 'kesaya_ax') || (!player.isHealthy() && skill == 'kesaya_wy')
                },
            },*/
            "kesaya_ax": {
                audio: "ext:福瑞拓展:2",
                firstDo: true,
                trigger: {
                    player: "useCard1",
                },
                init: function (player) {
                    player.frFenfa('kesaya_ax')
                },
                fenfa: function (player) {
                    return [-Infinity, player.maxHp - 1]
                },
                forced: true,
                filter: function (event, player) {
                    return !event.audioed && event.card.name == 'sha' && player.countUsed('sha', true) > 1 && event.getParent().type == 'phase';
                },
                content: function () {
                    trigger.audioed = true;
                },
                mod: {
                    cardUsable: function (card, player, num) {
                        if (card.name == 'sha') return Infinity;
                    },
                },
                ai: {
                    "directHit_ai": true,
                    unequip: true,
                    skillTagFilter: function (player, tag, arg) {
                        if (!get.zhu(player, 'shouyue')) return false;
                        if (arg && arg.name == 'sha') return true;
                        return false;
                    },
                },
                group: "kesaya_ax_1",
                subSkill: {
                    "1": {
                        trigger: {
                            player: "shaBegin",
                        },
                        forced: true,
                        content: function () {
                            trigger.directHit = true;
                        },
                        sub: true,
                    },
                },
            },
            "kesaya_wy": {
                init: function (player) {
                    player.frFenfa('kesaya_wy')
                },
                fenfa: function (player) {
                    return player.maxHp
                },
                trigger: {
                    player: "phaseDiscardBefore",
                },
                forced: true,
                content: function () {
                    trigger.cancel();
                },
                mod: {
                    targetEnabled: function (card, player, target, now) {
                        if (card.name == 'sha') return false;
                    },
                },
                group: ["kesaya_wy_2"],
                subSkill: {
                    "2": {
                        trigger: {
                            global: "useCard1",
                        },
                        audio: 2,
                        forced: true,
                        firstDo: true,
                        filter: function (event, player) {
                            var info = lib.card[event.card.name];
                            if (event.player == player) return false;
                            if (get.color(event.card) != 'black' || get.type(event.card) != 'trick') return false;
                            return info.selectTarget && info.selectTarget == -1 && !info.toself;
                        },
                        content: function () { },
                        mod: {
                            targetEnabled: function (card) {
                                if ((get.type(card) == 'trick' || get.type(card) == 'delay') &&
                                    get.color(card) == 'black') return false;
                            },
                        },
                        sub: true,
                    },
                },
            },
            "olas_fh": {
                trigger: {
                    player: "shaBegin",
                },
                direct: true,
                filter: function (event, player) {
                    if (get.itemtype(event.cards) != 'cards') return false;
                    return true
                },
                content: function () {
                    "step 0"
                    player.storage.olas_fh = 0;
                    event.num = 0;
                    event.cards = [];
                    "step 1"
                    if (event.num < 2 * trigger.target.maxHp) {
                        var next = player.chooseToRespond({ name: 'sha' }, '是否发动【破空】，你还可以打出' + get.cnNumber(2 * trigger.target.maxHp - event.num) + '张【杀】')
                            .set('prompt2', '你已打出' + get.cnNumber(event.num) + '张【杀】，对方当前需要使用' + get.cnNumber(event.num + 1) + '张【闪】响应此【杀】')
                        next.ai = get.unuseful2;
                    } else {
                        event.goto(3)
                    }
                    "step 2"
                    if (result.bool) {
                        event.num += 1
                        event.goto(1)
                    }
                    "step 3"
                    if (event.num) {
                        var next = trigger.target.chooseToRespond({ name: 'shan' }, '请使用一张闪响应【破空】');
                        next.ai = get.unuseful2;
                        if (event.num > 1) next.set('prompt2', '共需额外打出' + event.num + '张闪');
                    }
                    else {
                        event.finish();
                    }
                    "step 4"
                    if (result.bool) {
                        event.num--;
                        event.goto(3);
                    }
                    else {
                        trigger.untrigger();
                        trigger.directHit = true;
                        player.storage.olas_fh = event.num;
                    }
                },
                group: ["olas_fh_2", "olas_fh_3"],
                subSkill: {
                    "2": {
                        trigger: {
                            source: "damageBegin",
                        },
                        forced: true,
                        popup: false,
                        filter: function (event, player) {
                            return event.card && event.card.name == 'sha' && player.storage.olas_fh > 0 && event.parent.name != '_lianhuan' && event.parent.name != '_lianhuan2';
                        },
                        content: function () {
                            trigger.num += player.storage.olas_fh;
                            player.storage.olas_fh = 0;
                        },
                        sub: true,
                    },
                    "3": {
                        trigger: {
                            player: "shaEnd",
                        },
                        silent: true,
                        content: function () {
                            player.storage.olas_fh = 0;
                        },
                        forced: true,
                        popup: false,
                        sub: true,
                    },
                },
            },
            "olas_bx": {
                trigger: {
                    source: "damageBegin1",
                },
                forced: true,
                filter: function (event, player) {
                    return event.player != player && event.getParent().name == 'sha'
                },
                content: function () {
                    var cards = trigger.player.getCards('h', 'sha')
                    player.gain(cards, 'gain2')
                }
            },
            "mislee_jx": {
                position: "he",
                enable: "phaseUse",
                filter: function (event, player) {
                    var he = player.getCards('he');
                    for (var i = 0; i < he.length; i++) {
                        if (["bagua", "baiyin", "lanyinjia", "renwang", "tengjia", "zhuge"].contains(he[i].name)) return true;
                    }
                    return false;
                },
                filterCard: function (card) {
                    return ["bagua", "baiyin", "lanyinjia", "renwang", "tengjia", "zhuge"].contains(card.name);
                },
                discard: false,
                lose: false,
                delay: false,
                check: function () {
                    return 1;
                },
                content: function () {
                    "step 0"
                    player.showCards(cards);
                    "step 1"
                    var card = cards[0];
                    var bool = (get.position(card) == 'e');
                    if (bool) player.removeEquipTrigger(card);
                    game.addVideo('skill', player, ['xinfu_jingxie', [bool, get.cardInfo(card)]])
                    game.broadcastAll(function (card) {
                        card.init([card.suit, card.number, 'rewrite_' + card.name]);
                    }, card);
                    if (bool) {
                        var info = get.info(card);
                        if (info.skills) {
                            for (var i = 0; i < info.skills.length; i++) {
                                player.addSkillTrigger(info.skills[i]);
                            }
                        }
                    }
                },
                ai: {
                    basic: {
                        order: 10,
                    },
                    result: {
                        player: 1,
                    },
                },
            },
            "mislee_tj": {
                audio: "ext:福瑞拓展:2",
                enable: "phaseUse",
                usable: 3,
                filter: function (event, player) {
                    var list = ['equip1', 'equip2', 'others'];
                    for (var i = 0; i < list.length; i++) {
                        if (player.hasSkill('mislee_tj_' + list[i], null, null, false)) list.splice(i--, 1);
                    }
                    if (!list.length) return false;
                    return player.hasCard(function (card) {
                        var type = get.type(card);
                        if (type != 'equip') return false;
                        var subtype = get.subtype(card);
                        if (subtype != 'equip1' && subtype != 'equip2') subtype = 'others';
                        return list.contains(subtype);
                    }, 'eh');
                },
                filterCard: function (card, player) {
                    var type = get.type(card);
                    if (type != 'equip') return false;
                    var subtype = get.subtype(card);
                    if (subtype != 'equip1' && subtype != 'equip2') subtype = 'others';
                    return !player.hasSkill('mislee_tj_' + subtype, null, null, false);
                },
                position: "he",
                check: function (card) {
                    var val = 7.52 - get.value(card);
                    if (val <= 0) return 0;
                    var player = _status.event.player;
                    if (player.getStorage('mislee_tj_destroy').contains(card)) val += 2;
                    return val;
                },
                content: function () {
                    'step 0'
                    var subtype = get.subtype(cards[0]);
                    if (subtype != 'equip1' && subtype != 'equip2') subtype = 'others';
                    player.addTempSkill('mislee_tj_' + subtype, 'phaseUseAfter');
                    var send = function () {
                        game.me.chooseControl('助力锻造！', '妨碍锻造！', '什么都不做');
                        game.resume();
                    };
                    var sendback = function (result, player) {
                        if (result) {
                            var index = result.index;
                            game.log(player, '选择了', ['#b助力锻造', '#g妨碍锻造', '#b什么都不做'][index])
                            if (index > 1) return;
                            var card = get.cards()[0];
                            if (!card) return;
                            game.log(player, '展示了', card);
                            event.cardsx.push(card);
                            event.cards2[index].push(card);
                            game.broadcastAll(function (id, card, name, index) {
                                var dialog = get.idDialog(id);
                                if (!dialog) return;
                                var button = ui.create.button(card, 'card', dialog.buttonss[index]);
                                button.querySelector('.info').innerHTML = (name + '|' + get.strNumber(card.number));
                            }, event.videoId, card, function (target) {
                                if (target._tempTranslate) return target._tempTranslate;
                                var name = target.name;
                                if (lib.translate[name + '_ab']) return lib.translate[name + '_ab'];
                                return get.translation(name);
                            }(player), index);
                        }
                    };
                    event.players = game.filterPlayer();
                    event.cardsx = [];
                    event.cards2 = [[], []];
                    event.videoId = lib.status.videoId++;
                    event.ai_targets = [];
                    game.broadcastAll(function (name, id) {
                        var dialog = ui.create.dialog(name + '发起了“锻造”', 'hidden', 'forcebutton');
                        dialog.videoId = id;
                        dialog.classList.add('scroll1');
                        dialog.classList.add('scroll2');
                        dialog.classList.add('fullwidth');
                        dialog.buttonss = [];

                        var list = ['协力锻造的玩家', '妨碍锻造的玩家']
                        for (var i = 0; i < list.length; i++) {
                            dialog.add('<div class="text center">' + list[i] + '</div>');
                            var buttons = ui.create.div('.buttons', dialog.content);
                            dialog.buttonss.push(buttons);
                            buttons.classList.add('popup');
                            buttons.classList.add('guanxing');
                        }
                        dialog.open();
                    }, get.translation(player), event.videoId)
                    for (var i = 0; i < event.players.length; i++) {
                        if (event.players[i] == player) {
                            sendback({ index: 0 }, player);
                        }
                        else if (event.players[i].isOnline()) {
                            event.withol = true;
                            event.players[i].send(send);
                            event.players[i].wait(sendback);
                        }
                        else if (event.players[i] == game.me) {
                            event.withme = true;
                            game.me.chooseControl('助力锻造！', '妨碍锻造！', '什么都不做');
                            if (_status.connectMode) game.me.wait(sendback);
                        }
                        else {
                            event.ai_targets.push(event.players[i]);
                            if (_status.connectMode) event.players[i].showTimer();
                        }
                    }
                    if (event.ai_targets.length) {
                        event.ai_targets.randomSort();
                        setTimeout(function () {
                            event.interval = setInterval(function () {
                                var target = event.ai_targets.shift();
                                var att = get.attitude(target, player);
                                var num = 2;
                                if (att > 0) num = 0;
                                else if (att < 0) num = 1;
                                sendback({ index: num }, target);
                                if (_status.connectMode) target.hideTimer();
                                if (!event.ai_targets.length) {
                                    clearInterval(event.interval);
                                    if (event.withai) game.resume();
                                }
                            }, 750);
                        }, 500)
                    }
                    'step 1'
                    if (event.withme) {
                        if (_status.connectMode) game.me.unwait(result);
                        else {
                            var index = result.index;
                            game.log(game.me, '选择了', ['#b助力锻造', '#g妨碍锻造', '#b什么都不做'][index])
                            if (index > 1) return;
                            var card = get.cards()[0];
                            if (!card) return;
                            game.log(game.me, '展示了', card);
                            event.cardsx.push(card);
                            event.cards2[index].push(card);
                            game.broadcastAll(function (id, card, name, index) {
                                var dialog = get.idDialog(id);
                                if (!dialog) return;
                                var button = ui.create.button(card, 'card', dialog.buttonss[index]);
                                button.querySelector('.info').innerHTML = (name + '|' + get.strNumber(card.number));
                            }, event.videoId, card, function (target) {
                                if (target._tempTranslate) return target._tempTranslate;
                                var name = target.name;
                                if (lib.translate[name + '_ab']) return lib.translate[name + '_ab'];
                                return get.translation(name);
                            }(game.me), index);
                        }
                    }
                    'step 2'
                    if (event.withol && !event.resultOL) {
                        game.pause();
                    }
                    'step 3'
                    if (event.ai_targets.length > 0) {
                        event.withai = true;
                        game.pause();
                    }
                    'step 4'
                    game.delay(2);
                    var num1 = 0, num2 = 0;
                    for (var i of event.cards2[0]) num1 += get.number(i, false);
                    for (var i of event.cards2[1]) num2 += get.number(i, false);
                    var result = 2;
                    if (num1 < num2) result = 0;
                    else if (num2 > 0) result = 1;
                    event.duanzao_result = result;
                    game.broadcastAll(function (id, result) {
                        var dialog = get.idDialog(id);
                        if (dialog) dialog.content.firstChild.innerHTML = ['锻造失败…', '锻造成功', '完美锻造！'][result];
                    }, event.videoId, result)
                    'step 5'
                    game.cardsGotoOrdering(event.cardsx);
                    game.broadcastAll('closeDialog', event.videoId);
                    'step 6'
                    var subtype = get.subtype(cards[0]);
                    if (subtype != 'equip1' && subtype != 'equip2') subtype = 'others';
                    var card_map = {
                        equip1: ['wushuangfangtianji', 'guilongzhanyuedao', 'chixueqingfeng', 'bintieshuangji', 'wutiesuolian', 'wuxinghelingshan'],
                        equip2: ['linglongshimandai', 'hongmianbaihuapao', 'qimenbagua', 'guofengyupao', 'huxinjing', 'heiguangkai'],
                        others: ['shufazijinguan', 'xuwangzhimian', 'tianjitu', 'taigongyinfu', 'sanlve', 'zhaogujing'],
                    };
                    if (!_status.mislee_tj_map) _status.mislee_tj_map = {};
                    if (!_status.mislee_tj_maken) _status.mislee_tj_maken = {};
                    var list = card_map[subtype];
                    for (var i = 0; i < list.length; i++) {
                        var name = list[i];
                        if (!lib.card[name] || _status.mislee_tj_map[name]) {
                            list.splice(i--, 1);
                        }
                    }
                    if (!list.length) event.finish();
                    else player.chooseButton(['请选择一种装备牌', [list.randomGets(event.duanzao_result + 1), 'vcard']], true).set('ai', function (button) {
                        return get.value({ name: button.link[2] }, player, 'raw');
                    });
                    'step 7'
                    var name = result.links[0][2];
                    var card;
                    if (_status.mislee_tj_maken[name]) card = _status.mislee_tj_maken[name];
                    else {
                        card = game.createCard2(name);
                        _status.mislee_tj_maken[name] = card;
                    }
                    event.card = card;
                    player.addSkill('mislee_tj_destroy');
                    player.markAuto('mislee_tj_destroy', [card]);
                    var subtype = get.subtype(card);
                    if (!game.hasPlayer(function (current) {
                        return !current.isDisabled(subtype);
                    })) {
                        event.finish();
                        return;
                    }
                    player.chooseTarget(true, '将' + get.translation(card) + '置于一名角色的装备区内', function (card, player, target) {
                        return !target.isDisabled(_status.event.subtype);
                    }).set('subtype', subtype).set('ai', function (target) {
                        var card = _status.event.getParent().card, player = _status.event.player;
                        return get.effect(target, card, player, player);
                    });
                    'step 8'
                    if (result.bool) {
                        _status.mislee_tj_map[card.name] = true;
                        var target = result.targets[0];
                        player.line(target, 'green');
                        target.$gain2(card);
                        game.delayx();
                        target.equip(card);
                    }
                },
                ai: {
                    order: 10,
                    result: {
                        player: 1,
                    },
                },
                subSkill: {
                    "equip1": {
                        charlotte: true,
                        sub: true,
                    },
                    "equip2": {
                        charlotte: true,
                        sub: true,
                    },
                    others: {
                        charlotte: true,
                        sub: true,
                    },
                    destroy: {
                        trigger: {
                            global: ["loseEnd", "cardsDiscardEnd"],
                        },
                        forced: true,
                        charlotte: true,
                        popup: false,
                        onremove: true,
                        filter: function (event, player) {
                            if (event.name == 'lose' && event.position != ui.discardPile) return false;
                            var storage = player.storage.mislee_tj_destroy;
                            if (!storage) return false;
                            for (var i of event.cards) {
                                if (storage.contains(i)) return true;
                            }
                            return false;
                        },
                        content: function () {
                            var cards = [];
                            var storage = player.storage.mislee_tj_destroy;
                            for (var i of trigger.cards) {
                                if (storage.contains(i)) {
                                    delete _status.mislee_tj_map[i.name];
                                    storage.remove(i);
                                    cards.push(i);
                                }
                            }
                            game.cardsGotoSpecial(cards);
                            game.log(cards, '被移出了游戏');
                            player.addTempSkill('mislee_tj_draw');
                            player.addMark('mislee_tj_draw', cards.length, false);
                            if (!storage.length) player.removeSkill('mislee_tj_destroy');
                        },
                        sub: true,
                    },
                    draw: {
                        audio: "mislee_tj",
                        trigger: {
                            global: "phaseJieshuBegin",
                        },
                        forced: true,
                        charlotte: true,
                        onremove: true,
                        filter: function (event, player) {
                            return player.countMark('mislee_tj_draw') > 0;
                        },
                        content: function () {
                            player.draw(player.countMark('mislee_tj_draw'));
                        },
                        sub: true,
                    },
                },
            },
            "mislee_zr": {
                group: "mislee_zr_1",
                enable: "phaseUse",
                usable: 1,
                check: function (card) {
                    return 7 - get.value(card);
                },
                multitarget: true,
                targetprompt: ["被移走", "移动目标"],
                filterTarget: function (card, player, target) {
                    if (ui.selected.targets.length) {
                        var from = ui.selected.targets[0];
                        var judges = from.getCards('j');
                        for (var i = 0; i < judges.length; i++) {
                            if (!target.hasJudge(judges[i].viewAs || judges[i].name)) return true;
                        }
                        if (target.isMin()) return false;
                        if ((from.getEquip(1) && !target.getEquip(1)) ||
                            (from.getEquip(2) && !target.getEquip(2)) ||
                            (from.getEquip(3) && !target.getEquip(3)) ||
                            (from.getEquip(4) && !target.getEquip(4)) ||
                            (from.getEquip(5) && !target.getEquip(5))) return true;
                        return false;
                    }
                    else {
                        return target.countCards('ej') > 0;
                    }
                },
                selectTarget: 2,
                content: function () {
                    "step 0"
                    if (targets.length == 2) {
                        player.choosePlayerCard('ej', function (button) {
                            if (get.attitude(player, targets[0]) > get.attitude(player, targets[1])) {
                                return get.position(button.link) == 'j' ? 10 : 0;
                            }
                            else {
                                if (get.position(button.link) == 'j') return -10;
                                return get.equipValue(button.link);
                            }
                        }, targets[0]);
                    }
                    else {
                        event.finish();
                    }
                    "step 1"
                    if (result.bool) {
                        if (get.position(result.buttons[0].link) == 'e') {
                            event.targets[1].equip(result.buttons[0].link);
                        }
                        else if (result.buttons[0].link.viewAs) {
                            event.targets[1].addJudge({ name: result.buttons[0].link.viewAs }, [result.buttons[0].link]);
                        }
                        else {
                            event.targets[1].addJudge(result.buttons[0].link);
                        }
                        event.targets[0].$give(result.buttons[0].link, event.targets[1])
                        game.delay();
                    }
                },
                subSkill: {
                    "1": {
                        audio: 2,
                        audioname: ["sp_sunshangxiang", "re_sunshangxiang"],
                        trigger: {
                            player: "loseAfter",
                            global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
                        },
                        frequent: true,
                        filter: function (event, player) {
                            var evt = event.getl(player);
                            return evt && evt.player == player && evt.es && evt.es.length > 0;
                        },
                        content: function () {
                            "step 0"
                            event.count = trigger.getl(player).es.length;
                            "step 1"
                            event.count--;
                            player.draw(2);
                            "step 2"
                            if (event.count > 0) {
                                player.chooseBool(get.prompt2('xiaoji')).set('frequentSkill', 'xiaoji').ai = lib.filter.all;
                            }
                            "step 3"
                            if (result.bool) {
                                player.logSkill('mislee_zr');
                                event.goto(1);
                            }
                        },
                        ai: {
                            noe: true,
                            reverseEquip: true,
                            effect: {
                                target: function (card, player, target, current) {
                                    if (get.type(card) == 'equip' && !get.cardtag(card, 'gifts')) return [1, 3];
                                },
                            },
                        },
                        sub: true,
                    },
                },
                ai: {
                    order: 10,
                    result: {
                        target: function (player, target) {
                            if (ui.selected.targets.length == 0) {
                                if (target.countCards('j') && get.attitude(player, target) > 0) return 1;
                                if (get.attitude(player, target) < 0) {
                                    var players = game.filterPlayer();
                                    for (var i = 0; i < players.length; i++) {
                                        if (get.attitude(player, players[i]) > 0) {
                                            if ((target.getEquip(1) && !players[i].getEquip(1)) ||
                                                (target.getEquip(2) && !players[i].getEquip(2)) ||
                                                (target.getEquip(3) && !players[i].getEquip(3)) ||
                                                (target.getEquip(4) && !players[i].getEquip(4)) ||
                                                (target.getEquip(5) && !players[i].getEquip(5)))
                                                return -1;
                                        }
                                    }
                                }
                                return 0;
                            }
                            else {
                                return get.attitude(player, ui.selected.targets[0]) > 0 ? -1 : 1;
                            }
                        },
                    },
                    expose: 0.2,
                    threaten: 1.5,
                },
            },
            "kref_yz": {
                audio: "ext:福瑞拓展:2",
                preHidden: true,
                trigger: {
                    global: "damageEnd",
                },
                checkx: function (event, player) {
                    var att1 = get.attitude(player, event.player);
                    var att2 = get.attitude(player, event.source);
                    return att1 > 0 && att2 <= 0;
                },
                filter: function (event, player) {
                    return (event.source && event.player.classList.contains('dead') == false && player.countCards('he') && event.source != player);
                },
                direct: true,
                content: function () {
                    "step 0"
                    var next = player.chooseToDiscard('he', get.prompt2('kref_yz', trigger.player));
                    var check = lib.skill.kref_yz.checkx(trigger, player);
                    next.set('ai', function (card) {
                        if (_status.event.goon) return 8 - get.value(card);
                        return 0;
                    });
                    next.set('logSkill', 'kref_yz');
                    next.set('goon', check);
                    next.setHiddenSkill('kref_yz');
                    "step 1"
                    if (result.bool) {
                        trigger.player.judge();
                    }
                    else {
                        event.finish();
                    }
                    "step 2"
                    switch (result.color) {
                        case 'black': {
                            trigger.player.gain(trigger.cards, 'gain2');
                            trigger.player.gainPlayerCard(trigger.num, true, trigger.source, 'he');
                            trigger.player.draw(trigger.num);
                            break;
                        }
                        case 'red': {
                            trigger.player.recover();
                            trigger.player.link(false);
                            trigger.player.turnOver(false);
                            trigger.source.turnOver();
                            break;
                        }
                    }
                },
                ai: {
                    maixie: true,
                    "maixie_hp": true,
                    effect: {
                        target: function (card, player, target) {
                            if (player.hasSkillTag('jueqing', false, target)) return [1, -1];
                            if (get.tag(card, 'damage')) return [1, 0.55];
                        },
                    },
                },
            },
            "krif_zl": {
                trigger: {
                    global: "phaseAfter",
                },
                round: 1,
                filter: function (event, player) {
                    return event.player != player;
                },
                content: function () {
                    "step 0"
                    player.draw()
                    player.logSkill('krif_zl'),
                        game.broadcastAll(function (target1, target2) {
                            game.swapSeat(target1, target2);
                        }, player, trigger.player);
                    "step 1"
                    player.insertPhase();
                },
                group: ["krif_zl_roundcount"],
            },
            "krif_lj": {
                trigger: {
                    source: "damageBegin4",
                },
                forced: true,
                filter: function (event, player) {
                    var next = player.getNext();
                    if (event.player == next && get.distance(player, next) <= 1) return true;
                    return false;
                },
                content: function () {
                    trigger.num++
                },
            },
            "mliy_lf": {
                trigger: {
                    global: "roundStart",
                    player: "enterGame",
                },
                init: function (player) {
                    if (!player.storage.mliy_lf_num) player.storage.mliy_lf_num = [];
                },
                frequent: true,
                mark: true,
                intro: {
                    content: function (storage, player, skill) {
                        if (player.storage.mliy_lf_num) { return "已记录花色：" + get.translation(player.storage.mliy_lf_num) }
                    },
                    onunmark: true,
                },
                filter: function (event, player) {
                    if (player.storage.mliy_lf_num.length == 4) return false
                    return true
                },
                content: function () {
                    "step 0"
                    player.judge()
                    "step 1"
                    if (!player.getStorage('mliy_lf_num').contains(result.suit)) {
                        player.markAuto('mliy_lf_num', [result.suit]);
                    }
                    var suit = player.getStorage('mliy_lf_num')
                    game.broadcastAll(function (player, suit) {
                        if (player.marks.mliy_lf) player.marks.mliy_lf.firstChild.innerHTML = "流风 " + get.translation(suit[0]) + get.translation(suit[1]) + get.translation(suit[2]) + get.translation(suit[3]);
                    }, player, suit);
                },
                group: "mliy_lf_1",
                subSkill: {
                    "1": {
                        direct: true,
                        trigger: {
                            player: "loseEnd",
                        },
                        filter: function (event, player) {
                            return player != _status.currentPhase
                        },
                        content: function () {
                            var num = 0
                            for (var i = 0; i < trigger.cards.length; i++) {
                                if (player.getStorage('mliy_lf_num').contains(get.suit(trigger.cards[i]))) {
                                    num += 1
                                }
                            }
                            player.draw(num)
                        },
                        sub: true,
                    },
                    num: {
                        sub: true,
                    },
                },
            },
            "mliy_hx": {
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                direct: true,
                content: function () {
                    "step 0"
                    player.chooseTarget('回雪：是否发动此技能？', function (event, player, target) {
                        return target != player
                    }).set("ai", function (target) {
                        var player = _status.event.player
                        var att = get.attitude(player, target)
                        if (player.countCards('j') > 0 && target.hp == target.maxHp) {
                            return att + target.hp
                        } else if (target.hp == 1 && att > 0) {
                            return att / target.hp
                        } else if (target.countCards('j') > 0 && att > 0) {
                            return att
                        } else if (target.hp == 1 && player.hp > 2) {
                            return -att
                        } else {
                            return -1
                        }
                    })
                    "step 1"
                    if (result.bool) {
                        event.target = result.targets[0]
                        var next = player.chooseControl("选项一", "选项二").set("prompt", "请选择发动的选项：").set('choiceList', ['你弃置其与你区域内的各一张牌，然后各自回复一点体力', '你与其各失去一点体力，然后各摸一张牌。'])
                        next.ai = function () {
                            var player = _status.event.player
                            if (player.countCards('j') > 0) return 0
                            if (player.hp == player.maxHp) return 1
                            return 0
                        }
                    } else {
                        event.finish()
                    }
                    "step 2"
                    if (result.index == 0) {
                        player.discardPlayerCard(player, 'hej', true)
                        player.discardPlayerCard(event.target, 'hej', true)
                        player.recover()
                        event.target.recover()
                    } else {
                        player.loseHp()
                        event.target.loseHp()
                        player.draw()
                        event.target.draw()
                    }
                },
            },
            "sier_xl": {
                direct: true,
                enable: ["chooseToUse", "chooseToRespond"],
                hiddenCard: function (player, name) {
                    if (!['sha', 'shan', 'tao', 'jiu'].contains(name)) return false;
                    if (player.countCards('hes', { color: 'red' }) == 0 || player.countCards('hes', { color: 'black' }) == 0) return false;
                    return player.countCards('hes') > 0;
                },
                filter: function (event, player) {
                    if (player.countCards('h', { color: 'red' }) == 0 || player.countCards('h', { color: 'black' }) == 0) return false;
                    if (event.filterCard({ name: 'sha' }, player, event) ||
                        event.filterCard({ name: 'shan' }, player, event) ||
                        event.filterCard({ name: 'jiu' }, player, event) ||
                        event.filterCard({ name: 'tao' }, player, event)) {
                        return player.countCards('hes') > 0;
                    }
                    return false;
                },
                chooseButton: {
                    dialog: function (event, player) {
                        var list = [];
                        if (event.filterCard({ name: 'sha' }, player, event)) {
                            list.push(['基本', '', 'sha']);
                            for (var j of lib.inpile_nature) list.push(['基本', '', 'sha', j]);
                        }
                        if (event.filterCard({ name: 'shan' }, player, event)) {
                            list.push(['基本', '', 'shan']);
                        }
                        if (event.filterCard({ name: 'tao' }, player, event)) {
                            list.push(['基本', '', 'tao']);
                        }
                        if (event.filterCard({ name: 'jiu' }, player, event)) {
                            list.push(['基本', '', 'jiu']);
                        }
                        return ui.create.dialog('降龙', [list, 'vcard'], 'hidden');
                    },
                    check: function (button) {
                        var player = _status.event.player;
                        var card = { name: button.link[2], nature: button.link[3] };
                        if (_status.event.getParent().type != 'phase' || game.hasPlayer(function (current) {
                            return player.canUse(card, current) && get.effect(current, card, player, player) > 0;
                        })) {
                            switch (button.link[2]) {
                                case 'tao': case 'shan': return 5;
                                case 'jiu': {
                                    if (player.countCards('hes', { color: 'red' }) != 0 && player.countCards('hes', { color: 'black' }) != 0) return 3;
                                };
                                case 'sha':
                                    if (button.link[3] == 'fire') return 2.95;
                                    else if (button.link[3] == 'thunder' || button.link[3] == 'ice') return 2.92;
                                    else return 2.9;
                            }
                        }
                        return 0;
                    },
                    backup: function (links, player) {
                        return {
                            filterCard: function (card, player, event) {
                                if (ui.selected.cards.length) {
                                    return get.color(card) != get.color(ui.selected.cards[0]);
                                }
                                return true
                            },
                            selectCard: 2,
                            complexCard: true,
                            check: function (card, player, target) {
                                if (!ui.selected.cards.length) return 6;
                                else return 6 - get.value(card);
                            },
                            viewAs: { name: links[0][2], nature: links[0][3] },
                            position: 'hes',
                            popname: true,
                        }
                    },
                    prompt: function (links, player) {
                        return '将两张颜色不同的牌当做' + get.translation(links[0][3] || '') + get.translation(links[0][2]) + '使用或打出';
                    },
                },
                ai: {
                    order: function () {
                        var player = _status.event.player;
                        var event = _status.event;
                        if (event.filterCard({ name: 'jiu' }, player, event) && get.effect(player, { name: 'jiu' }) > 0) {
                            return 3.3;
                        }
                        return 3.1;
                    },
                    skillTagFilter: function (player, tag, arg) {
                        if (tag == 'fireAttack') return true;
                        return player.countCards('hes') > 0;
                    },
                    result: {
                        player: 1,
                    },
                    respondSha: true,
                    respondShan: true,
                    fireAttack: true,
                },
            },
            "sier_fh": {
                trigger: {
                    player: "dying",
                },
                forced: true,
                forceDie: true,
                unique: true,
                juexingji: true,
                skillAnimation: true,
                animationColor: "metal",
                content: function () {
                    "step 0"
                    player.awakenSkill('sier_fh');
                    player.removeSkill('sier_xl')
                    player.addSkill('sier_xlg')
                    player.gainMaxHp()
                    player.recover(3)
                    "step 1"
                    var card = get.cardPile(function (card) {
                        return get.suit(card) == 'heart';
                    })
                    if (card) player.gain(card);
                    "step 2"
                    var card = get.cardPile(function (card) {
                        return get.suit(card) == 'club';
                    })
                    if (card) player.gain(card);
                    "step 3"
                    var card = get.cardPile(function (card) {
                        return get.suit(card) == 'spade';
                    })
                    if (card) player.gain(card);
                    "step 4"
                    var card = get.cardPile(function (card) {
                        return get.suit(card) == 'diamond';
                    })
                    if (card) player.gain(card);
                },
                derivation: "sier_xlg",
            },
            "sier_xlg": {
                direct: true,
                enable: ["chooseToUse", "chooseToRespond"],
                hiddenCard: function (player, name) {
                    if (!['sha', 'shan', 'tao', 'jiu'].contains(name)) return false;
                    var cards = player.getCards('hes')
                    var list = []
                    for (var i = 0; i < cards.length; i++) {
                        if (get.number(cards[i]) != 13) {
                            list.push(cards[i])
                        }
                    }
                    return list.length != 0
                },
                filter: function (event, player) {
                    if (event.filterCard({ name: 'sha' }, player, event) ||
                        event.filterCard({ name: 'shan' }, player, event) ||
                        event.filterCard({ name: 'jiu' }, player, event) ||
                        event.filterCard({ name: 'tao' }, player, event)) {
                        var cards = player.getCards('hes')
                        var list = []
                        for (var i = 0; i < cards.length; i++) {
                            if (get.number(cards[i]) != 13) {
                                list.push(cards[i])
                            }
                        }
                        return list.length != 0
                    }
                    return false;
                },
                chooseButton: {
                    dialog: function (event, player) {
                        var list = [];
                        if (event.filterCard({ name: 'sha' }, player, event)) {
                            list.push(['基本', '', 'sha']);
                            for (var j of lib.inpile_nature) list.push(['基本', '', 'sha', j]);
                        }
                        if (event.filterCard({ name: 'shan' }, player, event)) {
                            list.push(['基本', '', 'shan']);
                        }
                        if (event.filterCard({ name: 'tao' }, player, event)) {
                            list.push(['基本', '', 'tao']);
                        }
                        if (event.filterCard({ name: 'jiu' }, player, event)) {
                            list.push(['基本', '', 'jiu']);
                        }
                        return ui.create.dialog('降龙', [list, 'vcard'], 'hidden');
                    },
                    check: function (button) {
                        var player = _status.event.player;
                        var card = { name: button.link[2], nature: button.link[3] };
                        if (_status.event.getParent().type != 'phase' || game.hasPlayer(function (current) {
                            return player.canUse(card, current) && get.effect(current, card, player, player) > 0;
                        })) {
                            switch (button.link[2]) {
                                case 'tao': case 'shan': return 5;
                                case 'jiu': {
                                    if (player.countCards('hes') > 0) return 3;
                                };
                                case 'sha':
                                    if (button.link[3] == 'fire') return 2.95;
                                    else if (button.link[3] == 'thunder' || button.link[3] == 'ice') return 2.92;
                                    else return 2.9;
                            }
                        }
                        return 0;
                    },
                    backup: function (links, player) {
                        return {
                            filterCard: function (card, player, event) {
                                return get.number(card) != 13
                            },
                            selectCard: 1,
                            check: function (card, player, target) {
                                if (!ui.selected.cards.length) return 6;
                                else return 6 - get.value(card);
                            },
                            viewAs: { name: links[0][2], nature: links[0][3] },
                            position: 'hes',
                            popname: true,
                        }
                    },
                    prompt: function (links, player) {
                        return '将一张牌当做' + get.translation(links[0][3] || '') + get.translation(links[0][2]) + '使用或打出';
                    },
                },
                ai: {
                    order: function () {
                        var player = _status.event.player;
                        var event = _status.event;
                        if (event.filterCard({ name: 'jiu' }, player, event) && get.effect(player, { name: 'jiu' }) > 0) {
                            return 3.3;
                        }
                        return 3.1;
                    },
                    skillTagFilter: function (player, tag, arg) {
                        if (tag == 'fireAttack') return true;
                        return player.countCards('hes') > 0;
                    },
                    result: {
                        player: 1,
                    },
                    respondSha: true,
                    respondShan: true,
                    fireAttack: true,
                },
            },
            "kesaya_zw": {
                enable: "phaseUse",
                filter: function (event, player) {
                    return player.isHealthy();
                },
                forced: true,
                content: function () {
                    player.loseHp()
                    player.draw(3)
                },
                ai: {
                    basic: {
                        order: 1,
                    },
                    result: {
                        player: function (player) {
                            if (player.countCards('hs', 'tao') >= 1) return 1;
                            return -1;
                        },
                    },
                },
                group: "kesaya_zw_1",
                subSkill: {
                    "1": {
                        forced: true,
                        trigger: {
                            player: ["gameDrawAfter", "changeHp", 'loseMaxHp', 'gainMaxHp'],
                        },
                        filter: function (event, player) {
                            return player.maxHp != 2
                        },
                        content: function () {
                            player.maxHp = 2
                            player.update()
                        },
                        sub: true,
                    },
                },
            },
            "luciya_hl": {
                trigger: {
                    player: "loseAfter",
                },
                init: function (player) {
                    if (!player.storage.luciya_hl) player.storage.luciya_hl = 0
                },
                usable: 1,
                filter: function (event, player) {
                    return player != _status.currentPhase && event.hs && event.hs.length > 0 && ['useCard', 'respond'].contains(event.getParent().name);
                },
                direct: true,
                intro: {
                    content: function (storage, player, skill) { return '当前判定成功' + storage + '次' },
                },
                mark: true,
                content: function () {
                    "step 0"
                    player.chooseTarget(get.prompt2('luciya_hl'), function (card, player, target) {
                        return target != player;
                    }).ai = function (target) {
                        if (target.hasSkill('hongyan')) return 0;
                        return get.damageEffect(target, _status.event.player, _status.event.player, 'thunder');
                    };
                    "step 1"
                    if (result.bool) {
                        event.target = result.targets[0]
                        event.target.judge(function (card) {
                            if (get.suit(card) == 'spade' && get.number(card) > 1 && get.number(card) < 10) {
                                return -4
                            }
                            return 0
                        }).judge2 = function (result) {
                            return result.bool == false ? true : false;
                        };
                    } else {
                        event.finish()
                    }
                    "step 2"
                    if (result.bool == false) {
                        var num = Math.max(1, player.storage.luciya_hl)
                        event.target.damage(num, 'thunder', 'nosource')
                        player.storage.luciya_hl += 1
                    }
                },
                ai: {
                    effect: {
                        target: function (card, player, target, current) {
                            var hastarget = game.hasPlayer(function (current) {
                                return get.attitude(target, current) < 0;
                            });
                            var be = target.countCards('e', { color: 'black' });
                            if (target.countCards('h') && be) {
                                if (!target.hasSkill('guidao')) return 0;
                                return [0, hastarget ? target.countCards('he') / 2 : 0];
                            }
                            if (target.countCards('h') && target.countCards('h') > 2) {
                                if (!target.hasSkill('guidao')) return 0;
                                return [0, hastarget ? target.countCards('h') / 4 : 0];
                            }
                            if (target.countCards('h') > 3 || (be && target.countCards('h') >= 2)) {
                                return [0, 0];
                            }
                            if (target.countCards('h') == 0) {
                                return [1.5, 0];
                            }
                            if (target.countCards('h') == 1 && !be) {
                                return [1.2, 0];
                            }
                            if (!target.hasSkill('guidao')) return [1, 0.05];
                            return [1, Math.min(0.5, (target.countCards('h') + be) / 4)];
                        },
                    },
                },
            },
            "yada_by": {
                audio: "ext:福瑞拓展:2",
                enable: "phaseUse",
                direct: true,
                filterTarget: function (card, player, target) {
                    return player.canCompare(target);
                },
                content: function () {
                    'step 0'
                    player.logSkill('yada_by', target);
                    player.chooseToCompare(target);
                    'step 1'
                    if (result.bool) {
                        if (target.countCards('h')) player.gainPlayerCard(1, 'h', target, false);
                        if (target.countCards('e')) player.gainPlayerCard(1, 'e', target, false);
                        if (target.countCards('j')) player.gainPlayerCard(1, 'j', target, false);
                    } else {
                        player.addTempSkill('yada_by_1')
                        event.finish();
                    }
                },
                ai: {
                    order: function (item, player) {
                        if (player.countCards('h', function (card) {
                            return player.hasValueTarget(card);
                        })) return 10;
                        return 1;
                    },
                    result: {
                        target: function (player, target) {
                            if (player.countCards('h', function (card) {
                                return player.hasValueTarget(card);
                            })) {
                                if (player.hasSkill('yada_by_1')) return 0;
                                var nd = !player.needsToDiscard();
                                if (player.hasCard(function (card) {
                                    if (get.position(card) != "h") return false;
                                    var val = get.value(card)
                                    if (nd && val < 0) return true;
                                    if (val <= 5) {
                                        return get.number(card) >= 12;
                                    }
                                    if (val <= 6) {
                                        return get.number(card) >= 13;
                                    }
                                    return false;
                                })) return -1;
                                return 0;
                            }
                            return -1;
                        },
                    },
                },
                subSkill: {
                    "1": {
                        mod: {
                            targetEnabled: function (card, player, target) {
                                if (player == target) return false;
                            },
                        },
                        forced: true,
                        skillBlocker: function (skill, player) {
                            return skill == 'yada_by'
                        },
                        init: function (player, skill) {
                            player.addSkillBlocker(skill);
                        },
                        onremove: function (player, skill) {
                            player.removeSkillBlocker(skill);
                        },
                        charlotte: true,
                        locked: true,
                        mark: true,
                        intro: {
                            content: "本回合内不能对自己使用牌，且〖辩言〗失效",
                        },
                        sub: true,
                    },
                },
            },
            "wes_ts": {
                trigger: {
                    global: "roundStart",
                    player: "enterGame",
                },
                direct: true,
                filter: function (event, player) {
                    return game.players.length > 1;
                },
                content: function () {
                    'step 0'
                    if (!player.storage.wes_ts) player.storage.wes_ts = [];
                    game.findPlayer2(function (current) {
                        if (player.storage.wes_ts && player.storage.wes_ts.contains(current)) {
                            player.storage.wes_ts.remove(current);
                            current.removeSkill('wes_ts_a');
                            current.removeSkill('wes_gc')
                        }
                    });
                    if (player.storage.wes_ts.length == 0) player.unmarkSkill('wes_ts');
                    player.chooseTarget('请选择〖同生〗的目标', lib.translate.wes_ts_info, function (card, player, target) {
                        return target != player && !target.hasSkill('wes_ts_a');
                    }).set('ai', function (target) {
                        var att = get.attitude(_status.event.player, target);
                        if (att > 0) return att + 1;
                        return Math.random();
                    }).animate = false;
                    'step 1'
                    if (result.bool) {
                        var target = result.targets[0];
                        player.line(target);
                        player.storage.wes_ts.push(target);
                        target.addSkill('wes_ts_a');
                        target.addSkill('wes_gc')
                        player.markSkill('wes_ts');
                    } else {
                        event.finish()
                    }
                },
                unique: true,
                charlotte: true,
                intro: {
                    content: function (storage, player, skill) {
                        var str = '当前〖同生〗目标：';
                        str += "<span style='color: red'>" + get.translation(player.storage.wes_ts) + "</span>";
                        return str;
                    },
                },
                subSkill: {
                    a: {
                        charlotte: true,
                        slient: true,
                        popup: false,
                        trigger: {
                            target: ["useCardToTargeted"],
                        },
                        forced: true,
                        filter: function (event, player) {
                            if (!player.isIn()) return false;
                            if (event.player == player) return false;
                            return game.countPlayer(function (current) {
                                if (current.storage.wes_ts && current.storage.wes_ts.contains(player) && event.player != current) return true;
                            });
                            return false;
                        },
                        content: function () {
                            'step 0'
                            game.countPlayer(function (current) {
                                if (current.storage.wes_ts && current.storage.wes_ts.contains(player)) {
                                    current.logSkill('wes_ts', player);
                                    trigger.targets.remove(player);
                                    trigger.targets.push(current);
                                    trigger.player.line(current);
                                }
                            });
                            'step 1'
                            game.delay(1.5);
                        },
                        onremove: function (player) {
                            game.findPlayer2(function (current) {
                                if (current.storage.wes_ts && current.storage.wes_ts.contains(player)) {
                                    current.storage.wes_ts.remove(player);
                                    if (!current.storage.wes_ts.length) current.unmarkSkill('wes_ts');
                                    else current.markSkill('wes_ts');
                                }
                            });
                        },
                        sub: true,
                    },
                },
            },
            "wes_gs": {
                trigger: {
                    player: "damageEnd",
                },
                filter: function (event, player) {
                    return event.source && event.source != player && event.source != player.storage.wes_ts[0]
                },
                frequent: true,
                check: function (event, player, storage) {
                    return get.attitude(player, player.storage.wes_ts[0])
                },
                content: function () {
                    for (var i = 0; i < trigger.num; i++) {
                        player.storage.wes_ts[0].fakeDamage(1, trigger.nature, trigger.source)
                        game.delay(2)
                    }
                },
            },
            "wes_lt": {
                trigger: {
                    player: "damageEnd",
                },
                unique: true,
                frequent: true,
                firstDo: true,
                content: function () {
                    "step 0"
                    event.count = trigger.num
                    "step 1"
                    player.judge()
                    "step 2"
                    switch (result.color) {
                        case 'red': player.recover(); break;
                        case 'black': player.draw(2); break;
                    }
                    "step 3"
                    event.count--
                    if (event.count > 0) {
                        event.goto(1)
                    }
                },
            },
            "mudaya_bz": {
                audio: "ext:福瑞拓展:2",
                trigger: {
                    player: "damageEnd",
                },
                direct: true,
                preHidden: true,
                content: function () {
                    "step 0"
                    player.chooseTarget(1, false, function (card, player, target) {
                        return target != player;
                    }).set('ai', function (target) {
                        return -get.attitude(_status.event.player, target) / (1 + target.countCards('h'));
                    }).set("prompt", "是否选择一名角色发动〖死搏〗").set("prompt2", "若结果为♥，该角色翻至背面；若结果为♦，受该角色到来自你的1点伤害；若结果为♣，该角色跳过下个摸牌阶段；若结果为♠，你弃置该角色两张牌。");
                    "step 1"
                    if (result.bool) {
                        event.target = result.targets[0];
                        player.logSkill('mudaya_bz', target);
                    }
                    else event.finish();
                    "step 2"
                    target.judge()
                    "step 3"
                    if (result.suit == 'heart') {
                        target.skip('phaseUse');
                        target.addTempSkill('mudaya_bz_2', { player: 'phaseUseSkipped' })
                    } else if (result.suit == 'diamond') {
                        target.damage()
                    } else if (result.suit == 'club') {
                        target.skip('phaseDraw');
                        target.addTempSkill('mudaya_bz_1', { player: 'phaseDrawSkipped' })
                    } else if (result.suit == 'spade') {
                        if (target.countCards('he')) {
                            player.discardPlayerCard(2, target, 'he', true);
                        }
                    }
                },
                ai: {
                    maixie: true,
                    "maixie_defend": true,
                    effect: {
                        target: function (card, player, target) {
                            if (player.hasSkillTag('jueqing', false, target)) return [1, -1];
                            return 0.8;
                            // if(get.tag(card,'damage')&&get.damageEffect(target,player,player)>0) return [1,0,0,-1.5];
                        },
                    },
                },
                subSkill: {
                    "1": {
                        mark: true,
                        intro: {
                            content: "跳过下回合的摸牌阶段",
                        },
                        sub: true,
                    },
                    "2": {
                        mark: true,
                        intro: {
                            content: "跳过下回合的出牌阶段",
                        },
                        sub: true,
                    },
                },
            },
            "mudaya_wh": {
                group: "mudaya_wh_2",
                trigger: {
                    player: "useCardToPlayered",
                },
                logTarget: "target",
                forced: true,
                filter: function (event, player) {
                    if (event.target == player) return false;
                    if (event.target.hasSkill("baiban") && event.target.hasSkill("mudaya_wh_1")) return false;
                    return get.tag(event.card, 'damage');
                },
                content: function () {
                    trigger.target.addTempSkill("baiban");
                    trigger.target.addTempSkill("mudaya_wh_1");
                },
                subSkill: {
                    "1": {
                        charlotte: true,
                        ai: {
                            "unequip2": true,
                        },
                        sub: true,
                    },
                    "2": {
                        usable: 1,
                        forced: true,
                        trigger: {
                            source: "damageSource",
                        },
                        content: function () {
                            "step 0"
                            player.addTempSkill("mudaya_wh_3");
                            "step 1"
                            player.draw(2);
                        },
                        sub: true,
                    },
                    "3": {
                        mod: {
                            cardUsable: function (card, player, num) {
                                if (card.name == 'sha') return num + 1;
                            },
                            targetInRange: function (card) {
                                if (card.name == 'sha') return true;
                            },
                        },
                        sub: true,
                    },
                },
            },
            "muli_cm": {
                trigger: {
                    global: "roundStart",
                    player: "enterGame",
                },
                forced: true,
                filter: function (event, player) {
                    return !game.hasPlayer(function (current) {
                        return current.hasSkill("muli_zc")
                    });
                },
                content: function () {
                    player.addSkill("muli_zc")
                    player.storage.muli_zc += 1
                },
                group: "muli_cm_change",
                derivation: "muli_zc",
                subSkill: {
                    change: {
                        trigger: {
                            global: "phaseBegin",
                        },
                        check: function (event, player) {
                            var att = get.attitude(player, event.player)
                            return att > 0 && event.player.storage.muli_zc >= event.player.hp && player.hp > 1
                        },
                        locked: true,
                        "prompt2": "每名其他角色回合开始时，若其有【终策】，你可以弃置两张手牌然后获得【终策】与其所有策标记，然后其失去【终策】并失去1点体力。",
                        filter: function (event, player) {
                            return event.player.hasSkill('muli_zc') && player.countCards('h') > 1 && event.player != player
                        },
                        content: function () {
                            'step 0'
                            player.chooseToDiscard(2, 'h', false)
                            'step 1'
                            if (result.bool) {
                                var target = trigger.player
                                player.logSkill('muli_cm', target)
                                player.addSkill('muli_zc')
                                player.storage.muli_zc += target.storage.muli_zc
                                target.storage.muli_zc = 0
                                target.removeSkill('muli_zc')
                                target.unmarkSkill('muli_zc')
                                target.loseHp()
                            } else {
                                event.finish()
                            }
                        },
                        sub: true,
                    },
                },
            },
            "muli_zc": {
                trigger: {
                    source: ["damageBegin4", "dying"],
                },
                mark: true,
                init: function (player) {
                    if (!player.storage.muli_zc) player.storage.muli_zc = 0
                },
                intro: {
                    content: "当前有$个标记",
                },
                filter: function (event, player) {
                    if (event.name == 'damage') {
                        return event.num > 0
                    }
                    return true
                },
                marktext: "策",
                direct: true,
                content: function () {
                    "step 0"
                    var target = trigger.player
                    target.addSkill('muli_zc')
                    target.storage.muli_zc += player.storage.muli_zc
                    player.storage.muli_zc = 0
                    if (!player.hasSkill('muli_cm')) player.loseHp()
                    "step 1"
                    player.removeSkill('muli_zc')
                    player.unmarkSkill('muli_zc')
                },
                group: ["muli_zc_1", "muli_zc_2"],
                subSkill: {
                    "1": {
                        trigger: {
                            player: "phaseAfter",
                        },
                        forced: true,
                        filter: function (event, player) {
                            return player.hasSkill('muli_zc') && player.storage.muli_zc != 0
                        },
                        content: function () {
                            var num = player.storage.muli_zc
                            player.loseHp(num)
                            player.storage.muli_zc += 1
                        },
                        sub: true,
                    },
                    "2": {
                        trigger: {
                            player: "die",
                        },
                        forceDie: true,
                        locked: true,
                        direct: true,
                        content: function () {
                            'step 0'
                            player.chooseTarget('请选择〖终策〗的目标', '选择一名其他角色，令其获得技能〖终策〗', true, lib.filter.notMe).set('forceDie', true).set('ai', function (target) {
                                return -get.attitude(_status.event.player, target);
                            });
                            'step 1'
                            if (result.bool) {
                                var target = result.targets[0]
                                player.logSkill('muli_zc', target)
                                target.addSkill('muli_zc')
                                target.storage.muli_zc += player.storage.muli_zc
                                player.storage.muli_zc = 0
                                player.removeSkill('muli_zc')
                                player.unmarkSkill('muli_zc')
                            }
                        },
                        sub: true,
                    },
                },
            },
            "muli_yl": {
                forced: true,
                trigger: {
                    global: "loseHpBegin",
                },
                filter: function (event, player) {
                    return event.num > 0
                },
                content: function () {
                    player.draw(trigger.num)
                    if (trigger.player == player) {
                        if (trigger.num > 1) trigger.num = 1
                    }
                },
            },
            "hars_sz": {
                trigger: {
                    global: ["dieBegin"],
                },
                priority: -1,
                filter: function (event, player) {
                    return event.player.hp <= 0 && !event.player.hasSkill('hars_yb') && player.isAlive() && event.player != player;
                },
                logTarget: "player",
                content: function () {
                    'step 0'
                    trigger.cancel();
                    'step 1'
                    if (trigger.player.isDead()) {
                        trigger.player.revive();
                        trigger.player.hp = 0;
                        trigger.player.update();
                        game.log(trigger.player, '当前的体力值为[' + trigger.player.hp + ']。');
                    }
                    'step 2'
                    if (!trigger.player.hasSkill('hars_yb')) {
                        trigger.player.addSkill('hars_yb');
                    }
                },
                ai: {
                    respondTao: false,
                    save: false,
                    expose: 0.2,
                    threaten: 8,
                    result: {
                        player: 10,
                        target: 1,
                    },
                },
                derivation: "hars_yb",
                group: "hars_sz_1",
                subSkill: {
                    "1": {
                        direct: true,
                        trigger: {
                            global: "phaseBeginStart",
                        },
                        filter: function (event, player) {
                            return player != event.player && !event.player._trueMe && event.player.hasSkill('hars_yb');
                        },
                        logTarget: "player",
                        skillAnimation: true,
                        animationColor: "key",
                        content: function () {
                            trigger.player._trueMe = player;
                            game.addGlobalSkill('autoswap');
                            if (trigger.player == game.me) {
                                game.notMe = true;
                                if (!_status.auto) ui.click.auto();
                            }
                            trigger.player.addSkill('hars_sz_2');
                        },
                        sub: true,
                    },
                    "2": {
                        trigger: {
                            player: ["phaseAfter"],
                            global: "phaseBefore",
                        },
                        lastDo: true,
                        charlotte: true,
                        forceDie: true,
                        forced: true,
                        silent: true,
                        content: function () {
                            player.removeSkill('hars_sz_2');
                        },
                        onremove: function (player) {
                            if (player == game.me) {
                                if (!game.notMe) game.swapPlayerAuto(player._trueMe)
                                else delete game.notMe;
                                if (_status.auto) ui.click.auto();
                            }
                            delete player._trueMe;
                        },
                        popup: false,
                        sub: true,
                    },
                },
            },
            "hars_yb": {
                locked: true,
                mod: {
                    cardSavable: function (card, player, target) {
                        if (card.name == 'tao' || card.name == 'jiu') return false;
                    },
                    cardEnabled: function (card) {
                        if (card.name == 'tao') return false;
                    },
                },
                ai: {
                    effect: {
                        target: function (card, player, target, current) {
                            if (get.tag(card, 'damage')) return 'zerotarget';
                        },
                    },
                    threaten: 0,
                    expose: 2,
                },
                group: ["hars_yb_1", "hars_yb_2", "hars_yb_3", "hars_yb_5", "hars_yb_7"],
                subSkill: {
                    "1": {
                        trigger: {
                            player: "dieBefore"
                        },
                        direct: true,
                        forced: true,
                        locked: true,
                        forceDie: true,
                        filter: function (event, player) {
                            return player.hp <= 0 && player.maxHp > 0 && player.hp >= -10;
                        },
                        content: function () {
                            trigger.cancel();
                            if (player.isDead() && player.maxHp > 0) {
                                player.revive();
                                player.hp = 0;
                                player.update();
                                game.log(player, '当前的体力值为[' + player.hp + ']。');
                            }
                        },
                        sub: true,
                    },
                    "2": {
                        trigger: {
                            player: "recoverBefore",
                        },
                        direct: true,
                        locked: true,
                        forced: true,
                        content: function () {
                            trigger.cancel()
                        },
                        sub: true,
                    },
                    "3": {
                        trigger: {
                            player: "phaseBegin",
                        },
                        direct: true,
                        locked: true,
                        forced: true,
                        content: function () {
                            player.loseMaxHp()
                            if (player.maxHp <= 0) {
                                player.die()
                            }
                        },
                        sub: true,
                    },
                    "5": {
                        trigger: {
                            global: "phaseBegin",
                        },
                        forced: true,
                        locked: true,
                        priority: 4,
                        logTarget: "player",
                        content: function () {
                            'step 0'
                            if (game.zhu && game.zhu.hasSkill('hars_yb')) {
                                game.showIdentity();
                                var numx = game.players.length;
                                var list = 0;
                                for (var i = 0; i < game.players.length; i++) {
                                    if (game.players[i].hasSkill('hars_yb')) list++;
                                }
                                var nei = 0;
                                var n = [];
                                for (var i = 0; i < game.players.length; i++) {
                                    if (game.players[i].identity == 'nei') {
                                        if (!game.players[i].hasSkill('hars_yb')) {
                                            nei++;
                                            n.add(game.players[i]);
                                        }
                                    }
                                }
                                game.log('场上剩余【' + nei + '】名内奸。');
                                game.log('场上有【' + numx + '】名玩家，其中有【' + list + '】名傀尸（视为已死亡）。');
                                if (nei > 0 && numx == (list + 1)) {
                                    game.over(game.me.identity == 'nei');
                                    game.log('游戏结束，内奸', n, '获胜。');
                                }
                                else {
                                    var f = [];
                                    for (var i = 0; i < game.players.length; i++) {
                                        if (game.players[i].identity == 'fan') f.add(game.players[i]);
                                    }
                                    game.over(game.me.identity == 'fan');
                                    game.log('游戏结束，反贼', f, '获胜。');
                                    event.finish();
                                }
                            }
                            else {
                                if (trigger.player.identity != 'nei') {
                                    var num1 = trigger.player.getFriends(true).length;
                                    var num2 = game.players.length - trigger.player.getFriends(true).length;
                                    var list1 = 0;
                                    var list2 = 0;
                                    for (var a = 0; a < game.players.length; a++) {
                                        if (game.players[a].hasSkill('hars_yb')) list1++;
                                    }
                                    for (var b = 0; b < trigger.player.getFriends(true).length; b++) {
                                        if (trigger.player.getFriends(true)[b].hasSkill('hars_yb')) list2++;
                                    }
                                    var list3 = (list1 - list2);
                                    if (num2 == list3) {
                                        var bool = false;
                                        if (trigger.player == game.me || trigger.player.isFriendOf(game.me)) bool = true;
                                        else switch (get.mode()) {
                                            case 'identity': {
                                                game.showIdentity();
                                                var id1 = trigger.player.identity;
                                                var id2 = game.me.identity;
                                                if (['zhu', 'zhong'].contains(id1)) {
                                                    if (['zhu', 'zhong'].contains(id2)) bool = true;
                                                    break;
                                                }
                                                break;
                                            }
                                        }
                                        game.over(bool);
                                        game.log(trigger.player, '胜：有【' + num2 + '】名敌人，其中有【' + list3 + '】名傀尸（视为已死亡）。');
                                        game.log('游戏结束，', trigger.player.getFriends(true), '获胜。');
                                    }
                                    else {
                                        if (num1 == list2) {
                                            game.log(trigger.player, '负：有【' + num1 + '】名队友，其中有【' + list2 + '】名傀尸（视为已死亡）。己方阵营失败。');
                                            game.log('等待最终胜出者的回合开始，那之后游戏结束。');
                                        }
                                    }
                                }
                            }
                        },
                        sub: true,
                    },
                    "7": {
                        forced: true,
                        trigger: {
                            player: "phaseDrawBegin2",
                        },
                        frequent: true,
                        filter: function (event, player) {
                            return !event.numFixed;
                        },
                        content: function () {
                            trigger.num += player.maxHp;
                        },
                        sub: true,
                    },
                },
            },
            "sier_ql": {
                enable: "phaseUse",
                filterCard: function (card, target) {
                    return get.number(card) == 13
                },
                lose: false,
                discard: false,
                delay: false,
                position: 'hes',
                filterTarget: function (card, player, target) {
                    return target != player
                },
                filter: function (event, player) {
                    return player.countCards('hes', function (card) {
                        return get.number(card) == 13
                    }) > 0
                },
                direct: true,
                content: function () {
                    target.gain(cards, player, 'giveAuto')
                    target.draw(cards.length)
                },
                group: "sier_ql_recover",
                subSkill: {
                    recover: {
                        trigger: {
                            target: ["taoBegin", "jiuBegin"]
                        },
                        zhuSkill: true,
                        forced: true,
                        filter: function (event, player) {
                            if (event.player != player) return false;
                            return player.isDying()
                        },
                        content: function () {
                            trigger.baseDamage++;
                        },
                    }
                }
            },
            "aroncy_jw": {
                audio: "ext:福瑞拓展:2",
                trigger: {
                    global: "phaseDrawEnd",
                },
                filter: function (event, player) {
                    if (get.mode() == 'guozhan' && source.isFriendOf(player)) return false
                    return event.player != player && event.player.countCards('h') > player.countCards('h')
                },
                check: function (event, player) {
                    var target = event.player;
                    if (get.attitude(player, target) >= 0) return false;
                    if (target.countCards('h') > 2) return true
                    return false
                },
                content: function () {
                    "step 0"
                    if (trigger.player.countCards('h', "sha") == 0) {
                        trigger.player.useCard({ name: 'sha', isCard: true }, player)
                        event.finish()
                        return;
                    }
                    "step 1"
                    player.chooseCardButton(trigger.player, trigger.player.getCards('h')).set('filterButton', function (button) {
                        return get.name(button.link) == 'sha';
                    });
                    "step 2"
                    if (result.bool) {
                        player.gain(result.links[0]);
                    }
                    "step 3"
                    player.chooseCardTarget({
                        filterTarget: function (card, player, target) {
                            if (target == player) return false;
                            var stat = player.getStat('skill').aroncy_jw_targets;
                            return !stat || !stat.contains(target);
                        },
                        filter: function (event, player) {
                            return player.countCards('h') > 0 && game.hasPlayer((current) => lib.skill.aroncy_jw.filterTarget(null, player, current));
                        },
                        discard: false,
                        lose: false,
                        delay: false,
                        filterCard: true,
                        ai1: function (card) {
                            if (get.tag(card, 'recover') && !game.hasPlayer(function (current) {
                                return get.attitude(current, player) > 0 && !current.hasSkillTag('nogain');
                            })) return 0;
                            return 1 / Math.max(0.1, get.value(card));
                        },
                        ai2: function (target) {
                            var player = _status.event.player, att = get.attitude(player, target);
                            if (target.hasSkillTag('nogain')) att /= 9;
                            return 4 + att;
                        },
                        prompt: '请选择要送人的卡牌'
                    })
                    "step 4"
                    if (result.bool) {
                        var target = result.targets[0];
                        player.line(target, 'green');
                        target.gain(result.cards, player, 'giveAuto').gaintag.add('aroncy_jw');
                        target.addSkill('aroncy_jw_use');
                        player.addSkill('aroncy_jw_draw');
                        var stat = player.getStat('skill');
                        if (!stat.aroncy_jw_targets) stat.aroncy_jw_targets = [];
                        stat.aroncy_jw_targets.push(target);
                        event.finish()
                    }
                },
                subSkill: {
                    draw: {
                        trigger: {
                            global: "useCardAfter",
                        },
                        forced: true,
                        charlotte: true,
                        filter: function (event, player) {
                            return event.player.hasHistory('lose', function (evt) {
                                if (evt.getParent() != event) return false;
                                for (var i in evt.gaintag_map) {
                                    if (evt.gaintag_map[i].contains('aroncy_jw')) {
                                        if (event.player.hasHistory('sourceDamage', function (evt) {
                                            return evt.card == event.card;
                                        })) {
                                            return true
                                        } else {
                                            return false
                                        }
                                    }
                                }
                                return false;
                            });
                        },
                        logTarget: "player",
                        content: function () {
                            player.draw();
                            trigger.player.draw()
                        },
                        sub: true,
                    },
                    use: {
                        mod: {
                            targetInRange: function (card) {
                                if (!card.cards) return;
                                for (var i of card.cards) {
                                    if (i.hasGaintag('aroncy_jw')) return true;
                                }
                            },
                            cardDiscardable: function (card, player, name) {
                                if (name == 'phaseDiscard' && card.hasGaintag('aroncy_jw')) return false;
                            },
                            aiOrder: function (player, card, num) {
                                if (get.itemtype(card) == 'card' && card.hasGaintag('aroncy_jw')) return num + 1;
                            },
                        },
                        sub: true,
                    },
                },
            },
            "xit_lx": {
                audio: "ext:福瑞拓展:2",
                trigger: {
                    global: "dying",
                },
                round: 1,
                filter: function (event, player) {
                    return event.player.hp <= 0;
                },
                direct: true,
                content: function () {
                    'step 0'
                    player.chooseTarget(get.prompt2('xit_lx'), function (card, player, target) {
                        return target != _status.event.getTrigger().player;
                    }).set('ai', function (target) {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        if (get.attitude(player, trigger.player) > 0) {
                            var att1 = get.attitude(target, player);
                            var att2 = get.attitude(target, trigger.player);
                            var att3 = get.attitude(player, target);
                            if (att3 < 0) return 0;
                            return att1 / 2 + att2 + att3;
                        }
                        else {
                            return 0;
                            // return get.attitude(player,target);
                        }
                    });
                    'step 1'
                    if (result.bool) {
                        event.target = result.targets[0];
                        event.target.draw(6);
                        player.logSkill('xit_lx', event.target);
                    }
                    else {
                        event.finish();
                    }
                    'step 2'
                    var target = event.target;
                    var tosave = trigger.player;
                    var att = get.attitude(target, tosave);
                    var hastao = target.countCards('h', 'tao');
                    target.chooseToDiscard(4, true, 'he').set('ai', function (card) {
                        var hastao = _status.event.hastao;
                        var att = _status.event.att;
                        if (!hastao && att > 0) {
                            var suit = get.suit(card);
                            for (var i = 0; i < ui.selected.cards.length; i++) {
                                if (get.suit(ui.selected.cards[i]) == suit) {
                                    return -4 - get.value(card);
                                }
                            }
                        }
                        if (att < 0 && ui.selected.cards.length == 3) {
                            var suit = get.suit(card);
                            for (var i = 0; i < ui.selected.cards.length; i++) {
                                if (get.suit(ui.selected.cards[i]) == suit) {
                                    return -get.value(card);
                                }
                            }
                            return -10 - get.value(card);
                        }
                        return -get.value(card);
                    }).set('hastao', hastao).set('att', att);
                    'step 3'
                    if (result.cards && result.cards.length == 4) {
                        var suits = [];
                        for (var i = 0; i < result.cards.length; i++) {
                            suits.add(get.suit(result.cards[i]));
                        }
                        if (suits.length == 4) {
                            trigger.player.recover(1 - trigger.player.hp);
                        }
                    }
                },
                ai: {
                    expose: 0.2,
                    threaten: 1.5,
                },
                group: ["xit_lx_roundcount"],
            },
            "xit_bs": {
                audio: "ext:福瑞拓展:2",
                trigger: {
                    player: ["useCard", "respond", "loseAfter"],
                },
                frequent: true,
                filter: function (event, player) {
                    if (player == _status.currentPhase) return false;
                    if (event.name != 'lose') return get.color(event.card) == 'black';
                    if (event.type != 'discard') return false;
                    if (event.cards2) {
                        for (var i = 0; i < event.cards2.length; i++) {
                            if (get.color(event.cards2[i], player) == 'black') return true;
                        }
                    }
                    return false;
                },
                content: function () {
                    "step 0"
                    event.count = 1;
                    if (trigger.name == 'lose') {
                        event.count = 0;
                        for (var i = 0; i < trigger.cards2.length; i++) {
                            if (get.color(trigger.cards2[i], player) == 'black') event.count++;
                        }
                    }
                    "step 1"
                    player.draw();
                    event.count--;
                    "step 2"
                    if (event.count) {
                        player.chooseBool(get.prompt2('xit_bs')).set('frequentSkill', 'xit_bs');
                    }
                    else event.finish();
                    "step 3"
                    if (result.bool) {
                        player.logSkill('xit_bs');
                        event.goto(1);
                    }
                },
                ai: {
                    threaten: 0.7,
                },
            },
            "markn_cy": {
                trigger: {
                    global: "damageBegin",
                },
                direct: true,
                filter: function (event, player) {
                    if (event.num <= 0) return false;
                    var cards = player.getExpansions('markn_yz')
                    return player.countCards('h', { color: "red" }) && cards.length < 5
                },
                check: function (event, player) {
                    return get.attitude(player, event.player) > 0 && player.countCards('h') > 2
                },
                content: function () {
                    "step 0"
                    player.chooseToDiscard(1, 'h', { color: "red" }, false).set("prompt", "是否发动〖驰援〗").set("prompt2", "一名角色受到伤害时，你可以弃置一张红色手牌，令此伤害-1")
                    "step 1"
                    if (result.bool) {
                        trigger.num = trigger.num - 1
                        var cards = player.getExpansions('markn_yz')
                        if (cards.length < 5) {
                            player.addToExpansion(get.cards(1), 'gain2').gaintag.add('markn_yz');
                        }
                    } else {
                        event.finish()
                        return;
                    }
                },
                group: "markn_cy_1",
                subSkill: {
                    "1": {
                        direct: true,
                        trigger: {
                            player: "damageEnd",
                            source: "damageEnd",
                        },
                        content: function () {
                            var cards = player.getExpansions('markn_yz')
                            if (cards.length < 5) {
                                player.addToExpansion(get.cards(1), 'gain2').gaintag.add('markn_yz');
                            }
                        },
                        sub: true,
                    },
                },
            },
            "markn_yz": {
                trigger: {
                    player: "phaseDrawAfter",
                },
                direct: true,
                filter: function (event, player) {
                    return player.getExpansions('markn_yz').length > 0 && player.countCards('h') > 0;
                },
                content: function () {
                    "step 0"
                    var cards = player.getExpansions('markn_yz');
                    if (!cards.length || !player.countCards('h')) {
                        event.finish();
                        return;
                    }
                    var next = player.chooseToMove('远瞻：是否交换“视”和手牌？');
                    next.set('list', [
                        [get.translation(player) + '（你）的视', cards],
                        ['手牌区', player.getCards('h')],
                    ]);
                    next.set('filterMove', function (from, to) {
                        return typeof to != 'number';
                    });
                    next.set('processAI', function (list) {
                        var player = _status.event.player, cards = list[0][1].concat(list[1][1]).sort(function (a, b) {
                            return get.value(a) - get.value(b);
                        }), cards2 = cards.splice(0, player.getExpansions('markn_yz').length);
                        return [cards2, cards];
                    });
                    "step 1"
                    if (result.bool) {
                        var pushs = result.moved[0], gains = result.moved[1];
                        pushs.removeArray(player.getExpansions('markn_yz'));
                        gains.removeArray(player.getCards('h'));
                        if (!pushs.length || pushs.length != gains.length) return;
                        player.addToExpansion(pushs, player, 'giveAuto').gaintag.add('markn_yz');
                        game.log(player, '将', pushs, '作为“视”置于武将牌上');
                        player.gain(gains, 'gain2');
                    }
                },
                group: "markn_yz_1",
                subSkill: {
                    "1": {
                        audio: 2,
                        trigger: {
                            player: "phaseZhunbeiBegin",
                        },
                        filter: function (event, player) {
                            return player.getExpansions('markn_yz').length > 0;
                        },
                        frequent: true,
                        content: function () {
                            'step 0';
                            if (player.isUnderControl()) {
                                game.modeSwapPlayer(player);
                            }
                            var num = player.getExpansions('markn_yz').length;
                            var player = event.player;
                            if (player.isUnderControl()) game.modeSwapPlayer(player);

                            var cards = get.cards(num);
                            var markn_yz = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                            markn_yz.caption = '〖远瞻〗'
                            game.broadcast(function (player, cards) {
                                if (!window.decadeUI) return;
                                decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                            }, player, cards);

                            event.switchToAuto = function () {
                                var cards = markn_yz.cards[0].concat();
                                var cheats = [];
                                var judges = player.node.judges.childNodes;

                                if (judges.length) {
                                    cheats = decadeUI.get.cheatJudgeCards(cards, judges, true);
                                }

                                if (cards.length && cheats.length == judges.length) {
                                    for (var i = 0; i >= 0 && i < cards.length; i++) {
                                        if (get.value(cards[i], player) >= 5) {
                                            cheats.push(cards[i]);
                                            cards.splice(i, 1);
                                        }
                                    }
                                }

                                var time = 500;
                                for (var i = 0; i < cheats.length; i++) {
                                    setTimeout(function (card, index, finished) {
                                        markn_yz.move(card, index, 0);
                                        if (finished) markn_yz.finishTime(1000);
                                    }, time, cheats[i], i, (i >= cheats.length - 1) && cards.length == 0);
                                    time += 500;
                                }

                                for (var i = 0; i < cards.length; i++) {
                                    setTimeout(function (card, index, finished) {
                                        markn_yz.move(card, index, 1);
                                        if (finished) markn_yz.finishTime(1000);
                                    }, time, cards[i], i, (i >= cards.length - 1));
                                    time += 500;
                                }
                            };

                            if (event.isOnline()) {
                                event.player.send(function () {
                                    if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                                }, event.player);

                                event.player.wait();
                                decadeUI.game.wait();
                            } else if (!event.isMine()) {
                                event.switchToAuto();
                            }
                            'step 1';
                            player.popup(get.cnNumber(event.num1) + '上' + get.cnNumber(event.num2) + '下');
                            game.log(player, '将' + get.cnNumber(event.num1) + '张牌置于牌堆顶，' + get.cnNumber(event.num2) + '张牌置于牌堆底');
                            game.updateRoundNumber();
                        },
                        ai: {
                            threaten: 1.2,
                        },
                        sub: true,
                    },
                },
            },
            "markn_yc": {
                enable: "phaseUse",
                usable: 1,
                filter: function (event, player) {
                    return player.getExpansions('markn_yz').length > 0 && player.countCards('h') > 0;
                },
                filterTarget: function (card, player, target) {
                    return target != player && target.countCards('h') <= player.countCards('h')
                },
                content: function () {
                    "step 0"
                    player.chooseCardButton('选择弃置1张“视”', 1, player.getExpansions('markn_yz'))
                    "step 1"
                    if (result.bool) {
                        player.loseToDiscardpile(result.links)
                        player.swapHandcards(target);
                    } else {
                        event.finish()
                        return;
                    }
                },
                ai: {
                    order: 1,
                    result: {
                        player: function (player, target) {
                            var cards = player.getExpansions('markn_yz')
                            if (cards.length < 3) return 0;
                            if (target.countCards('h') > 0) return -Math.max(get.value(target.getCards('h'), player) - get.value(player.getCards('h'), player), 0);
                            return 0;
                        },
                    },
                },
            },
            "berg_jh": {
                trigger: {
                    global: "useCard1",
                },
                round: 1,
                filter: function (event, player) {
                    if (event.targets.length != 1) return false;
                    if (event.player == player) return false;
                    if (player != event.targets[0]) return false;
                    for (var i = 0; i < lib.inpile.length; i++) {
                        var info = lib.card[lib.inpile[i]];
                        if (info.multitarget) continue;
                        if (lib.filter.targetEnabled2({ name: lib.inpile[i] }, event.player, player)) {
                            return true;
                        }
                    }
                    return false;
                },
                check: function (event, player) {
                    return get.effect(player, event.card, event.player, player) < 0;
                },
                "prompt2": function (event, player) {
                    return '发现一张牌代替' + get.translation(event.player) + '对你使用的' + get.translation(event.card);
                },
                autodelay: true,
                content: function () {
                    'step 0'
                    var list = [], list1 = [], list2 = [];
                    for (var i = 0; i < lib.inpile.length; i++) {
                        var info = lib.card[lib.inpile[i]];
                        if (info.multitarget) continue;
                        if (lib.filter.targetEnabled2({ name: lib.inpile[i] }, trigger.player, trigger.targets[0])) {
                            var cardinfo = [trigger.card.suit || '', trigger.card.number || '', lib.inpile[i]];
                            list1.push(cardinfo);
                            if (info.type != 'equip') {
                                list2.push(cardinfo);
                            }
                        }
                    }
                    var equipped = false;
                    for (var i = 0; i < 3; i++) {
                        if (equipped && list2.length) {
                            list.push(list2.randomRemove());
                        }
                        else {
                            equipped = true;
                            list.push(list1.randomRemove());
                        }
                    }
                    player.chooseButton(true, ['幻觉', [list, 'vcard']]).ai = function (button) {
                        var card = { suit: trigger.card.suit, number: trigger.card.number, name: button.link[2] };
                        return get.effect(trigger.targets[0], card, trigger.player, player);
                    };
                    'step 1'
                    if (result.bool) {
                        var card = game.createCard({
                            suit: trigger.card.suit || lib.suit.randomGet(),
                            number: trigger.card.number || Math.ceil(Math.random() * 13),
                            name: result.links[0][2]
                        }
                        );
                        event.card = card;
                        game.log(player, '将', trigger.card, '变为', card);
                        // if(!event.isMine()) game.delayx();
                        trigger.card = get.autoViewAs(card);
                        trigger.cards = [card];
                        game.cardsGotoOrdering(card).relatedEvent = trigger;
                    }
                    else {
                        event.finish();
                    }
                    'step 2'
                    player.$throw(event.card, null, null, true);
                    if (player == trigger.player) {
                        player.line(trigger.targets[0], 'green');
                    }
                    else {
                        player.line(trigger.player, 'green');
                    }
                    game.delayx(0.5);
                },
                ai: {
                    threaten: 0.1,
                },
                group: ["berg_jh_roundcount"],
            },
            "berg_sy": {
                trigger: {
                    player: "useCard1",
                },
                frequent: true,
                filter: function (event, player) {
                    if (event._huanjue) return false;
                    if (event.targets.length != 1) return false;
                    var target = event.targets[0];
                    for (var i = 0; i < lib.inpile.length; i++) {
                        var info = lib.card[lib.inpile[i]];
                        if (info.multitarget) continue;
                        if (lib.filter.targetEnabled2({ name: lib.inpile[i] }, event.player, target)) {
                            return true;
                        }
                    }
                    return false;
                },
                autodelay: true,
                content: function () {
                    'step 0'
                    var list = [], list1 = [], list2 = [];
                    for (var i = 0; i < lib.inpile.length; i++) {
                        var info = lib.card[lib.inpile[i]];
                        if (info.multitarget) continue;
                        if (lib.filter.targetEnabled2({ name: lib.inpile[i] }, trigger.player, trigger.targets[0])) {
                            var cardinfo = [trigger.card.suit || '', trigger.card.number || '', lib.inpile[i]];
                            list1.push(cardinfo);
                            if (info.type != 'equip') {
                                list2.push(cardinfo);
                            }
                        }
                    }
                    var equipped = false;
                    for (var i = 0; i < 3; i++) {
                        if (equipped && list2.length) {
                            list.push(list2.randomRemove());
                        }
                        else {
                            equipped = true;
                            list.push(list1.randomRemove());
                        }
                    }
                    var eff1 = get.effect(trigger.targets[0], trigger.card, trigger.player, player);
                    var val1 = get.value(trigger.card, player, 'raw');
                    player.chooseButton(['水月', [list, 'vcard']]).ai = function (button) {
                        var card = { suit: trigger.card.suit, number: trigger.card.number, name: button.link[2] };
                        var eff2 = get.effect(trigger.targets[0], card, trigger.player, player)
                        var val2 = get.value(card, player, 'raw');
                        if (eff1 > 0) {
                            if (eff2 <= 0) return 0;
                            return val2 - val1;
                        }
                        else if (eff1 < 0) {
                            if (eff2 >= 0) return val2;
                            return 0;
                        }
                        else if (eff1 == 0) {
                            if (eff2 > 0) return val2;
                            return 0;
                        }
                    };
                    'step 1'
                    if (result.bool) {
                        var stat = player.stat[player.stat.length - 1].card;
                        if (stat[trigger.card.name]) {
                            stat[trigger.card.name]--;
                        }
                        var card = game.createCard({
                            suit: trigger.card.suit || lib.suit.randomGet(),
                            number: trigger.card.number || Math.ceil(Math.random() * 13),
                            name: result.links[0][2]
                        }
                        );
                        event.card = card;
                        game.log(player, '将', trigger.card, '变为', card);
                        // if(!event.isMine()) game.delayx();
                        trigger.card = get.autoViewAs(card);
                        trigger.cards = [card];
                        game.cardsGotoOrdering(card).relatedEvent = trigger;
                        trigger._huanjue = true;
                    }
                    else {
                        event.finish();
                    }
                    'step 2'
                    player.$throw(event.card, null, null, true);
                    if (player == trigger.player) {
                        player.line(trigger.targets[0], 'green');
                    }
                    else {
                        player.line(trigger.player, 'green');
                    }
                    game.delayx(0.5);
                    'step 3'
                    var stat = player.stat[player.stat.length - 1].card;
                    if (!stat[trigger.card.name]) {
                        stat[trigger.card.name] = 1;
                    }
                    else {
                        stat[trigger.card.name]++;
                    }
                },
                draw: function () {
                    player.draw();
                },
                ai: {
                    usedu: true,
                },
            },
            "lint_nd": {
                enable: "phaseUse",
                usable: 1,
                position: "h",
                filterCard: true,
                check: function (card) {
                    return 7 - get.value(card)
                },
                selectCard: 1,
                filterTarget: true,
                content: function () {
                    if (get.color(cards[0]) == 'red') {
                        target.addTempSkill("lint_nd_gain", { player: "phaseEnd" })
                    } else {
                        target.addTempSkill("lint_nd_lose", { player: "phaseEnd" })
                    }
                },
                ai: {
                    order: 14,
                    result: {
                        target: function (player, target) {
                            if (get.color(ui.selected.cards[0]) == 'black') return -2;
                            if (get.color(ui.selected.cards[0]) == 'red') return 2;
                        },
                    },
                },
                subSkill: {
                    gain: {
                        trigger: {
                            player: ['phaseUseBegin', 'phaseUseEnd'],
                        },
                        direct: true,
                        locked: true,
                        init: function (player) {
                            player.markSkill('lint_nd_gain')
                        },
                        intro: {
                            content: '你的出牌阶段开始和结束时，你将手牌数摸至五张。'
                        },
                        onremove: function (player) {
                            player.unmarkSkill('lint_nd_gain')
                        },
                        filter: function (event, player) {
                            return player.countCards('h') < 5
                        },
                        content: function () {
                            player.draw(5 - player.countCards('h'));
                        },
                        sub: true,
                    },
                    lose: {
                        trigger: {
                            player: ['phaseUseBegin', 'phaseUseEnd'],
                        },
                        init: function (player) {
                            player.markSkill('lint_nd_lose')
                        },
                        intro: {
                            content: '你的出牌阶段开始和结束时，你将手牌数弃至一张。'
                        },
                        onremove: function (player) {
                            player.unmarkSkill('lint_nd_lose')
                        },
                        direct: true,
                        filter: function (event, player) {
                            return player.countCards('h') > 1
                        },
                        content: function () {
                            player.chooseToDiscard(player.countCards('h') - 1, 'h', true)
                        },
                        sub: true,
                    },
                },
            },
            "morly_ld": {
                trigger: {
                    player: "useCard1",
                },
                init: function (player) {
                    if (!player.storage.morly_ld_num) player.storage.morly_ld_num = 0;
                },
                direct: true,
                filter: function (event, player) {
                    if (event.card.name == 'sha' && !event.card.nature) return true;
                },
                mark: true,
                intro: {
                    content: function (storage, player, skill) {
                        if (player.storage.morly_ld_num == 0) return '你使用的下一张普通【杀】改为火属性'
                        else if (player.storage.morly_ld_num == 1) return '你使用的下一张普通【杀】改为雷属性'
                        else if (player.storage.morly_ld_num == 2) return '你使用的下一张普通【杀】改为冰属性'
                        else if (player.storage.morly_ld_num == 3) return '你使用的下一张普通【杀】改为神属性'
                    },
                },
                content: function () {
                    var shanature = ['fire', 'thunder', 'ice', 'kami']
                    if (!player.storage.morly_ld_num) { player.storage.morly_ld_num = 0 }
                    var num = player.storage.morly_ld_num
                    trigger.card.nature = shanature[num]
                    player.storage.morly_ld_num++
                    if (player.storage.morly_ld_num == 4) {
                        player.storage.morly_ld_num = 0
                    }
                },
                ai: {
                    threaten: 3,
                },
                subSkill: {
                    num: {
                        sub: true,
                    },
                },
            },
            "morly_xd": {
                audio: "ext:福瑞拓展:2",
                trigger: {
                    source: "damageBegin2",
                },
                check: function (event, player) {
                    return get.attitude(player, event.player) <= 0;
                },
                logTarget: "player",
                filter: function (event, player) {
                    return player != event.player && lib.linked.contains(event.nature);
                },
                content: function () {
                    "step 0"
                    if (trigger.player.countCards('h') == 0) {
                        trigger.num += 1
                        event.finish()
                        return;
                    }
                    player.chooseControl("选项一", "选项二").set("prompt", "请选择发动的选项：").set('choiceList', ['观看并获得该角色的X张牌', '令此次属性伤害值+1']).set("ai", function () {
                        if (trigger.player.countCards('h') == 1) return 0
                        if (trigger.player.countCards('h') == trigger.num && trigger.player.hp > trigger.num + 1 && trigger.num == 1) return 0
                        if (trigger.player.hp < trigger.num + 1) return 1
                        return 1
                    })
                    "step 1"
                    var target = trigger.player;
                    var num = trigger.num;
                    if (result.index == 0) {
                        player.gainPlayerCard(num, 'h', target, true, 'visible')
                    }
                    else {
                        trigger.num += 1
                    }
                },
            },
            "morly_qy": {
                trigger: {
                    source: "damageEnd",
                },
                forced: true,
                filter: function (event, player) {
                    return event.card && event.card.name == 'sha' && _status.currentPhase == player;
                },
                content: function () {
                    player.getStat().card.sha--;
                },
            },
            "west_jh": {
                trigger: {
                    player: "phaseBegin",
                },
                filter: function (event, player) {
                    return player.countCards('he') > 0
                },
                direct: true,
                content: function () {
                    "step 0"
                    player.chooseCardTarget({
                        filterCard: function (card, player) {
                            return lib.filter.cardDiscardable(card, player);
                        },
                        selectCard: 1,
                        filterTarget: true,
                        prompt: get.prompt2('west_jh'),
                        ai1: function (card) {
                            return 10 - get.value(card);
                        },
                        ai2: function (target) {
                            var num = 0;
                            var att = get.attitude(player, target);
                            var draw = target.maxHp - target.countCards('h');
                            if (draw >= 0) {
                                if (target.hasSkillTag('nogain')) att /= 6;
                                if (att > 2) {
                                    num += Math.sqrt(draw + 1) * att;
                                }
                                num += att / 3;
                            }
                            if (draw < -1) {
                                if (target.hasSkillTag('nogain')) att *= 6;
                                if (att < -2) {
                                    num -= Math.sqrt(1 - draw) * att;
                                }
                            }
                            if (att > 0) {
                                if (target.isMinHp()) {
                                    num += 5;
                                }
                                if (target.isTurnedOver()) {
                                    num += 5;
                                }
                                if (target.countCards('j')) {
                                    num += 2;
                                }
                                if (target.isLinked()) {
                                    num++;
                                }
                                if (num > 0) {
                                    return num + att;
                                }
                            }
                            return num;
                        }
                    })
                    "step 1"
                    if (result.bool) {
                        event.targets = result.targets[0];
                        player.discard(result.cards[0])
                        player.logSkill('west_jh', event.targets);
                        result.targets[0].draw(Math.min(5, result.targets[0].maxHp))
                    }
                    else {
                        event.finish();
                    }
                    'step 2'
                    var num = event.targets.countCards('h') - event.targets.maxHp;
                    if (num > 0) event.targets.chooseToDiscard('h', true, num);
                    "step 3"
                    if (event.targets.isLinked()) {
                        event.targets.link();
                    }
                    "step 4"
                    if (event.targets.isTurnedOver()) {
                        event.targets.turnOver();
                    }
                    "step 5"
                    var cards = event.targets.getCards('j');
                    if (cards.length) {
                        event.targets.discard(cards);
                    }
                },
                ai: {
                    expose: 0.2,
                    threaten: 1.3,
                },
            },
            "ud_yb": {
                charlotte: true,
                marktext: "异",
                intro: {
                    name: "异变",
                    content: "本局游戏内计算【乐不思蜀】与【兵粮寸断】的效果反转",
                },
                mod: {
                    judge: function (player, result) {
                        if ((_status.event.cardname == 'lebu' || _status.event.cardname == 'bingliang')) {
                            if (result.bool == false) {
                                result.bool = true;
                            }
                            else {
                                result.bool = false;
                            }
                        }
                    },
                },
            },
            "muen_tx": {
                trigger: {
                    player: "phaseDrawBegin2",
                },
                direct: true,
                preHidden: true,
                filter: function (event, player) {
                    return event.num > 0 && !event.numFixed && game.hasPlayer(function (target) {
                        return target.countCards('h') > 0 && player != target;
                    });
                },
                content: function () {
                    "step 0"
                    var num = get.copy(trigger.num);
                    if (get.mode() == 'guozhan' && num > 2) num = 2;
                    player.chooseTarget(get.prompt('muen_tx'), '选择至多' + get.translation(num) + '名角色，对手牌数少于你的角色视为使用一张【杀】，然后获得这些角色的各一张手牌，并少摸等量的牌', [1, num], function (card, player, target) {
                        return target.countCards('h') > 0 && player != target;
                    }, function (target) {
                        var att = get.attitude(_status.event.player, target);
                        if (target.hasSkill('tuntian')) return att / 10;
                        return 1 - att;
                    }).setHiddenSkill('muen_tx');
                    "step 1"
                    if (result.bool) {
                        var list = []
                        for (var i = 0; i < result.targets.length; i++) {
                            if (player.countCards('h') <= result.targets[i].countCards('h')) {
                                list.add(result.targets[i])
                            }
                        }
                        if (list) {
                            list.sortBySeat()
                            for (var i = 0; i < list.length; i++) {
                                player.useCard({ name: 'sha' }, list[i], false)
                            }
                        }
                        result.targets.sortBySeat();
                        player.logSkill('muen_tx', result.targets);;
                        player.gainMultiple(result.targets)
                        trigger.num -= result.targets.length;
                    } else {
                        event.finish
                    }
                    "step 2"
                    if (trigger.num <= 0) game.delay();
                },
                ai: {
                    threaten: 1.6,
                    expose: 0.2,
                },
            },
            "muen_jb": {
                trigger: {
                    player: "phaseDrawBegin1",
                },
                forced: true,
                content: function () {
                    if (player.isMinHandcard()) {
                        trigger.num += 2
                    } else {
                        trigger.num += 1
                    }
                },
            },
            "marcia_us": {
                forced: true,
                mod: {
                    globalFrom: function (from, to, distance) {
                        return distance - 1;
                    },
                    globalTo: function (from, to, distance) {
                        return distance + 1;
                    },
                },
            },
            "marcia_jz": {
                usable: 1,
                enable: "phaseUse",
                filter: function (event, player) {
                    return player.countCards('h') > 0
                },
                init: function (player) {
                    if (!player.storage.marcia_jz_suit) player.storage.marcia_jz_suit = [];
                },
                filterCard: function (card) {
                    var suit = get.suit(card);
                    for (var i = 0; i < ui.selected.cards.length; i++) {
                        if (get.suit(ui.selected.cards[i]) == suit) return false;
                    }
                    return true;
                },
                complexCard: true,
                selectCard: [1, 4],
                check: function (card) {
                    return 7 - get.value(card)
                },
                "prompt2": "你可以弃置任意数量的牌，然后本回合若你使用的牌的花色与你弃置过的花色相同，此牌不可被响应。",
                mark: true,
                intro: {
                    content: function (storage, player, skill) {
                        if (player.storage.marcia_jz_suit) { return "已记录花色：" + get.translation(player.storage.marcia_jz_suit) }
                    },
                    onunmark: true,
                },
                content: function () {
                    "step 0"
                    player.draw(cards.length)
                    for (var i = 0; i < cards.length; i++) {
                        if (!player.storage.marcia_jz_suit.contains(get.suit(cards[i]))) {
                            player.storage.marcia_jz_suit.push(get.suit(cards[i]))
                        }
                    }
                    "step 1"
                    player.addTempSkill("marcia_jz_1")
                },
                ai: {
                    order: 7,
                    result: {
                        player: 1,
                    },
                },
                group: "marcia_jz_remove",
                subSkill: {
                    "1": {
                        trigger: {
                            player: "useCard",
                        },
                        forced: true,
                        filter: function (event, player) {
                            return event.card.name == 'sha' && player.storage.marcia_jz_suit.contains(get.suit(event.card));
                        },
                        content: function () {
                            trigger.directHit.addArray(game.players)
                        },
                        mod: {
                            wuxieRespondable: function (card, player) {
                                if (player.storage.marcia_jz_suit.contains(get.suit(card))) return false;
                            },
                        },
                        sub: true,
                    },
                    suit: {
                        sub: true,
                    },
                    remove: {
                        forced: true,
                        popup: false,
                        trigger: {
                            player: "phaseAfter",
                        },
                        content: function () {
                            player.storage.marcia_jz_suit = []
                        },
                        sub: true,
                    },
                },
            },
            "dog_dm": {
                trigger: {
                    player: "useCard",
                },
                init: function (player) {
                    if (!player.storage.dog_zz_num) player.storage.dog_zz_num = 1
                },
                direct: true,
                filter: function (event, player) {
                    if (player.storage.dog_zz_num <= 0) return false
                    if (!event.targets.length || !player.isPhaseUsing()) return false;
                    var type = get.type(event.card, false);
                    if (type != 'basic' && type != 'trick') return false;
                    if (player.countCards('h') == 0) return false
                    return true
                },
                content: function () {
                    'step 0'
                    if (player != game.me && !player.isUnderControl() && !player.isOnline()) game.delayx();
                    player.chooseToDiscard('h', get.prompt('dog_dm'), '弃置一张手牌，令' + get.translation(trigger.card) + '结算两次').set('ai', function (card) {
                        var trigger = _status.event.getTrigger();
                        if (trigger.card.name == 'tiesuo') return 0;
                        return (7 - get.value(card)) * (get.effect(trigger.targets[0], trigger.card, player, player));
                    }).logSkill = 'dog_dm';
                    'step 1'
                    if (result.bool) {
                        trigger.effectCount++;
                        player.storage.dog_zz_num -= 1
                    }
                    else event.finish();
                },
            },
            "dog_zz": {
                trigger: {
                    source: "damageEnd",
                },
                mark: true,
                init: function (player) {
                    if (!player.storage.dog_zz_num) player.storage.dog_zz_num = 1;
                },
                intro: {
                    content: function (storage, player, skill) {
                        if (player.storage.dog_zz_num == 0) return "多谋可使用次数：0次"
                        if (player.storage.dog_zz_num) { return "多谋可使用次数：" + player.storage.dog_zz_num + "次" }
                    },
                    onunmark: true,
                },
                direct: true,
                filter: function (event, player) {
                    if (player != _status.currentPhase) return false;
                    return true
                },
                content: function () {
                    player.storage.dog_zz_num += 1
                    player.updateMark("dog_zz_num")
                },
                group: "dog_zz_remove",
                subSkill: {
                    remove: {
                        forced: true,
                        trigger: {
                            player: ["phaseAfter", "phaseBefore"],
                        },
                        content: function () {
                            player.storage.dog_zz_num = 1
                        },
                        sub: true,
                    },
                    num: {
                        sub: true,
                    },
                },
            },
            "yas_klin_bj": {
                audio: "ext:福瑞拓展:2",
                forbid: ["boss"],
                trigger: {
                    player: "die",
                },
                forced: true,
                forceDie: true,
                skillAnimation: true,
                animationColor: "gray",
                filter: function (event) {
                    return event.source && event.source.isIn();
                },
                content: function () {
                    trigger.source.discard(trigger.source.getCards('he'))
                    trigger.source.loseHp(trigger.source.hp)
                },
                logTarget: "source",
                ai: {
                    threaten: function (player, target) {
                        if (target.hp == 1) return 0.2;
                        return 1.5;
                    },
                    effect: {
                        target: function (card, player, target, current) {
                            if (!target.hasFriend()) return;
                            if (target.hp <= 1 && get.tag(card, 'damage')) return [1, 0, 0, -2];
                        },
                    },
                },
            },
            "yas_klin_js": {
                trigger: {
                    global: "phaseUseBegin",
                },
                filter: function (event, player) {
                    return player.countCards('h') > 0
                },
                check: function (event, player) {
                    if (player.countCards('h') < 2) return false
                    if (get.attitude(player, event.player) > 0) return true
                    return false;
                },
                logTarget: "player",
                preHidden: true,
                "prompt2": "你可以弃置任意张不同花色的牌，然后使当前角色摸等量的牌并获得以下效果：♠：【杀】指定目标后令其本回合技能失效，♥：【杀】本回合无视防具，♣：【杀】本回合造成的伤害+1，♦：【杀】本回合无距离次数限制。",
                content: function () {
                    "step 0"
                    var save = false;
                    if (get.attitude(player, event.player) > 0) {
                        save = true;
                    }
                    var next = player.chooseToDiscard('h', [1, Infinity], false, function (card) {
                        var suit = get.suit(card);
                        for (var i = 0; i < ui.selected.cards.length; i++) {
                            if (get.suit(ui.selected.cards[i]) == suit) return false;
                        }
                        return true;
                    }).set('complexCard', true)
                    next.ai = function (card) {
                        if (save) {
                            if (trigger.player == player) return 9 - get.value(card)
                            if (ui.selected.cards.length > 2) return 0
                            return 7 - get.value(card);
                        }
                        return 0;
                    }
                    "step 1"
                    if (result.bool) {
                        var cards = result.cards;
                        trigger.player.draw(cards.length)
                        suit = [];
                        if (cards && cards.length > 0) {
                            for (var i = 0; i < cards.length; i++) {
                                if (!suit.contains(get.suit(cards[i]))) {
                                    suit.add(get.suit(cards[i]));
                                }
                            }
                        }
                    } else {
                        event.finish()
                        return;
                    }
                    trigger.player.addTempSkill('yas_klin_js_marks')
                    if (suit.contains('spade')) trigger.player.addTempSkill('yas_klin_js_spade');
                    if (suit.contains('heart')) trigger.player.addTempSkill('yas_klin_js_heart');
                    if (suit.contains('club')) trigger.player.addTempSkill('yas_klin_js_club');
                    if (suit.contains('diamond')) trigger.player.addTempSkill('yas_klin_js_diamond');
                    if (suit.length == 4) trigger.player.addTempSkill('yas_klin_js_hit');
                },
                ai: {
                    result: {
                        player: 1,
                    },
                    order: 11,
                },
                subSkill: {
                    marks: {
                        popup: false,
                        silent: true,
                        charlotte: true,
                        forced: true,
                        marktext: "祭",
                        mark: true,
                        intro: {
                            content: function (storage, player, skill) {
                                var str = '当前状态：';
                                if (player.hasSkill('yas_klin_js_spade')) str += '<br><li>♠：你的【杀】指定目标后，你令其本回合技能失效。';
                                if (player.hasSkill('yas_klin_js_heart')) str += '<br><li>♥：你的【杀】无视目标防具。';
                                if (player.hasSkill('yas_klin_js_club')) str += '<br><li>♣：你的【杀】造成的伤害+1。';
                                if (player.hasSkill('yas_klin_js_diamond')) str += '<br><li>♦：你的【杀】无距离次数限制。';
                                if (player.hasSkill('yas_klin_js_spade') && player.hasSkill('yas_klin_js_heart') && player.hasSkill('yas_klin_js_club') && player.hasSkill('yas_klin_js_diamond')) str += '<br><li>：你的【杀】不可被响应。'
                                return str;
                            },
                        },
                        sub: true,
                    },
                    spade: {
                        shaRelated: true,
                        popup: false,
                        silent: true,
                        charlotte: true,
                        forced: true,
                        init: function (player) {
                            player.markSkill('yas_klin_js');
                        },
                        onremove: function (player) {
                            player.unmarkSkill('yas_klin_js');
                        },
                        trigger: {
                            player: "useCardToTargeted",
                        },
                        filter: function (event, player) {
                            return event.card.name == 'sha';
                        },
                        logTarget: "target",
                        content: function () {
                            trigger.target.addTempSkill('baiban');
                        },
                        ai: {
                            ignoreSkill: true,
                            skillTagFilter: function (player, tag, arg) {
                                if (!arg || arg.isLink || !arg.card || arg.card.name != 'sha') return false;
                                if (!arg.skill || !lib.skill[arg.skill] || lib.skill[arg.skill].charlotte || !arg.target.getSkills(true, false).contains(arg.skill)) return false;
                            },
                        },
                        sub: true,
                    },
                    heart: {
                        shaRelated: true,
                        popup: false,
                        silent: true,
                        charlotte: true,
                        init: function (player) {
                            player.markSkill('yas_klin_js');
                        },
                        onremove: function (player) {
                            player.unmarkSkill('yas_klin_js');
                        },
                        trigger: {
                            player: "useCardToTargeted",
                        },
                        forced: true,
                        filter: function (event, player) {
                            return event.card.name == 'sha';
                        },
                        logTarget: "target",
                        content: function () {
                            trigger.target.addTempSkill('qinggang2');
                            trigger.target.storage.qinggang2.add(trigger.card);
                        },
                        ai: {
                            skillTagFilter: function (player, tag, arg) {
                                if (!arg || arg.isLink || !arg.card || arg.card.name != 'sha') return false;
                                if (arg && arg.name == 'sha') return true;
                            },
                            "unequip_ai": true,
                        },
                        sub: true,
                    },
                    hit: {
                        trigger: {
                            player: "useCardToPlayered",
                        },
                        forced: true,
                        filter: function (event, player) {
                            return event.card.name == 'sha';
                        },
                        logTarget: "target",
                        content: function () {
                            trigger.getParent().directHit.add(trigger.target);
                        },
                        ai: {
                            "directHit_ai": true,
                            skillTagFilter: function (player, tag, arg) {
                                if (arg.card.name != 'sha') return false;
                            },
                        },
                    },
                    club: {
                        trigger: {
                            source: "damageBegin1",
                        },
                        filter: function (event) {
                            return event.card && event.card.name == 'sha';
                        },
                        forced: true,
                        popup: false,
                        silent: true,
                        charlotte: true,
                        init: function (player) {
                            player.markSkill('yas_klin_js');
                        },
                        onremove: function (player) {
                            player.unmarkSkill('yas_klin_js');
                        },
                        content: function () {
                            trigger.num++;
                        },
                        sub: true,
                    },
                    diamond: {
                        popup: false,
                        silent: true,
                        charlotte: true,
                        init: function (player) {
                            player.markSkill('yas_klin_js');
                        },
                        onremove: function (player) {
                            player.unmarkSkill('yas_klin_js');
                        },
                        mod: {
                            targetInRange: function (card, player, target, now) {
                                if (card.name == 'sha') return true;
                            },
                            cardUsable: function (card, player, num) {
                                if (card.name == 'sha') return Infinity
                            },
                        },
                        sub: true,
                        forced: true,
                    },
                },
            },
            "patxi_fs": {
                trigger: {
                    global: "damageBegin1",
                },
                direct: true,
                filter: function (event, player) {
                    return player.countCards('h') > 0
                },
                check: function (event, player) {
                    if (event.player == player) return true
                    if (player.countCards('h') <= 3) return false
                    return true
                },
                logTarget: "player",
                content: function () {
                    "step 0"
                    var list1 = []
                    var list2 = []
                    if (player.countCards('h', { color: "red" })) {
                        list1.push("弃置红色")
                        list2.push("弃置一张红色牌令此伤害-1")
                    }
                    if (player.countCards('h', { color: "black" })) {
                        list1.push("弃置黑色")
                        list2.push("弃置一张黑色牌令此伤害+1")
                    }
                    list1.push('cancel2')
                    player.chooseControl(list1).set("choiceList", list2).set('prompt', '是否对' + get.translation(trigger.player) + '发动〖覆身〗').set("ai", function () {
                        if (get.attitude(player, trigger.player) > 0) {
                            if (player.countCards('h', { color: 'red' }) > 0) {
                                return '弃置红色'
                            } else {
                                return 'cancel2'
                            }
                        } else if (get.attitude(player, trigger.player) < 0) {
                            if (player.countCards('h', { color: 'black' }) > 0) {
                                return '弃置黑色'
                            } else {
                                return 'cancel2'
                            }
                        } else {
                            return 'cancel2'
                        }
                    })
                    "step 1"
                    if (result.control == '弃置红色') {
                        event.color = 'red'
                    } else if (result.control == '弃置黑色') {
                        event.color = 'black'
                    } else {
                        event.finish()
                        return;
                    }
                    player.chooseToDiscard(1, 'h', true).set("filterCard", function (card) {
                        return get.color(card) == event.color
                    }).set("ai", function (card) {
                        return 7 - get.value(card)
                    })
                    "step 2"
                    if (get.color(result.cards) == 'red') {
                        trigger.num--
                    } else if (get.color(result.cards) == 'black') {
                        trigger.num++
                    } else {
                        event.finish()
                        return;
                    }
                },
            },
            "patxi_yw": {
                trigger: {
                    player: "phaseJieshuBegin",
                },
                silent: true,
                forced: true,
                content: function () {
                    var cards = [];
                    var card1 = get.cardPile2(function (card) {
                        return get.color(card, false) == 'red';
                    });
                    if (card1) cards.push(card1);
                    var card2 = get.cardPile2(function (card) {
                        return get.color(card, false) == 'black';
                    });
                    if (card2) cards.push(card2);
                    if (cards.length) player.gain(cards, 'gain2');
                },
                popup: false,
            },
            "nore_dz": {
                trigger: {
                    player: "damageBefore",
                    source: "damageBefore",
                },
                forced: true,
                popup: false,
                content: function () {
                    trigger.source = null
                },
                ai: {
                    jueqing: true,
                },
            },
            "nore_ys": {
                trigger: {
                    player: "damageEnd",
                },
                frequent: true,
                filter: function (event, player) {
                    if (!event.source || event.source.isDead()) return true
                    return false
                },
                content: function () {
                    "step 0"
                    player.draw()
                    var next = player.chooseTarget(1, false).set("prompt", "请选择一名其他角色").set("prompt2", "该角色选择一项：1.交给你一张牌、2.视为你对其使用一张火【杀】。")
                    next.set("filterTarget", function (event, player, target) {
                        return player != target
                    })
                    next.ai = function (target) {
                        return -get.attitude(_status.event.player, target) / (1 + target.countCards('h'));
                    };
                    "step 1"
                    if (result.bool) {
                        event.targets = result.targets
                        var then = event.targets[0].chooseCard(1, 'he').set('prompt', "交给" + get.translation(player) + "一张牌或视为其对你使用一张【杀】")
                        then.ai = function (card) {
                            return 6 - get.value(card);
                        }
                    } else {
                        event.finish()
                        return;
                    }
                    "step 2"
                    if (result.cards && result.bool) {
                        if (player.isIn()) {
                            player.gain(result.cards, event.targets[0], 'giveAuto');
                        }
                    } else {
                        player.useCard(event.targets[0], { name: 'sha', nature: 'fire' }, false);
                    }
                },
                ai: {
                    maixie: true,
                },
                group: "nore_ys_1",
                subSkill: {
                    "1": {
                        trigger: {
                            global: "damageEnd",
                        },
                        direct: true,
                        filter: function (event, player) {
                            if (event.player != player && (!event.source || event.source.isDead())) return true
                            return false
                        },
                        content: function () {
                            'step 0'
                            trigger.player.chooseToDiscard('he', '弃置一张牌，或令' + get.translation(player) + '摸一张牌').set('ai', function (card) {
                                if (_status.event.goon) return 7 - get.value(card);
                                return -get.value(card);
                            }).set('goon', get.attitude(trigger.player, player) < 0);
                            'step 1'
                            if (!result.bool) player.draw();
                        },
                        sub: true,
                    },
                },
            },
            "bofeng_aj": {
                trigger: {
                    player: "useCardToPlayered",
                },
                direct: true,
                shaRelated: true,
                filter: function (event, player) {
                    return event.card.name == 'sha' && event.target.countCards('he') > 0;
                },
                content: function () {
                    "step 0"
                    player.addTempSkill("fr_xieji", { player: "phaseEnd" })
                    player.choosePlayerCard('h', trigger.target)
                    "step 1"
                    player.addToExpansion(result.cards, 'gain2').gaintag.add('fr_xieji')
                    "step 2"
                    var next = player.choosePlayerCard(trigger.target, 'he', [1, Math.min(trigger.target.hp - 1, trigger.target.countCards('he'))], get.prompt('bofeng_aj', trigger.target))
                        .set('prompt2', '将目标角色至多' + Math.min(trigger.target.hp - 1, trigger.target.countCards('he')) + '张牌置于其武将牌上');
                    next.set('ai', function (button) {
                        if (!_status.event.goon) return 0;
                        var val = get.value(button.link);
                        if (button.link == _status.event.target.getEquip(2)) return 2 * (val + 3);
                        return val;
                    });
                    next.set('goon', get.attitude(player, trigger.target) <= 0);
                    next.set('forceAuto', true);
                    "step 3"
                    if (result.bool) {
                        var target = trigger.target;
                        player.logSkill('bofeng_aj', target);
                        target.addSkill('bofeng_aj_2');
                        target.addToExpansion('giveAuto', result.cards, target).gaintag.add('bofeng_aj_2');
                    }
                },
                subSkill: {
                    "2": {
                        trigger: {
                            global: "phaseEnd",
                        },
                        forced: true,
                        popup: false,
                        charlotte: true,
                        filter: function (event, player) {
                            return player.getExpansions('bofeng_aj_2').length > 0;
                        },
                        content: function () {
                            'step 0'
                            var cards = player.getExpansions('bofeng_aj_2');
                            player.gain(cards, 'draw');
                            game.log(player, '收回了' + get.cnNumber(cards.length) + '张“玄技”牌');
                            'step 1'
                            player.removeSkill('bofeng_aj_2');
                        },
                        intro: {
                            markcount: "expansion",
                            mark: function (dialog, storage, player) {
                                var cards = player.getExpansions('repojun2');
                                if (player.isUnderControl(true)) dialog.addAuto(cards);
                                else return '共有' + get.cnNumber(cards.length) + '张牌';
                            },
                        },
                        sub: true,
                    },
                },
            },
            "fr_xieji": {
                mark: true,
                marktext: "协",
                onremove: function (player, skill) {
                    var cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                intro: {
                    content: "expansion",
                    markcount: "expansion",
                },
                trigger: {
                    player: "phaseJieshuBegin",
                },
                direct: true,
                filter: function (event, player) {
                    return player.getExpansions('fr_xieji').length > 0;
                },
                content: function () {
                    var cards = player.getExpansions('fr_xieji');
                    if (cards.length > 0) {
                        player.gain(cards, 'gain2');
                    }
                },
            },
            "ciyu_ss": {
                trigger: {
                    player: "phaseBegin",
                },
                direct: true,
                content: function () {
                    "step 0"
                    player.draw(2);
                    "step 1"
                    event.cards = result;
                    event.num = event.cards.length
                    "step 2"
                    player.chooseCardTarget({
                        filterCard: function (card) {
                            return _status.event.getParent().cards.contains(card);
                        },
                        selectCard: [1, event.cards.length],
                        filterTarget: function (card, player, target) {
                            return player != target;
                        },
                        ai1: function (card) {
                            if (ui.selected.cards.length > 0) return -1;
                            if (card.name == 'du') return 20;
                            return (_status.event.player.countCards('h') - _status.event.player.hp);
                        },
                        ai2: function (target) {
                            var att = get.attitude(_status.event.player, target);
                            if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
                                return 1 - att;
                            }
                            return att - 4;
                        },
                        prompt: '回合开始时，你摸' + get.translation(event.num) + '张牌然后分配给任意名角色，并将这些牌置于其武将牌上称为“协”'
                    });
                    "step 3"
                    if (result.bool) {
                        player.line(result.targets, 'green');
                        result.targets[0].addTempSkill("fr_xieji", { player: "phaseEnd" });
                        result.targets[0].addToExpansion(result.cards, 'gain2').gaintag.add('fr_xieji')
                        for (var i = 0; i < result.cards.length; i++) {
                            event.cards.remove(result.cards[i]);
                        }
                        if (event.cards.length) event.goto(2);
                    } else {
                        if (event.cards.length) {
                            player.addTempSkill("fr_xieji", { player: "phaseEnd" })
                            player.addToExpansion(event.cards, 'gain2').gaintag.add('fr_xieji')
                        }
                    }
                },
                group: "ciyu_ss_sha",
                subSkill: {
                    sha: {
                        trigger: {
                            global: "useCard2",
                        },
                        filter: function (event, player) {
                            if (!(event.card.name == 'sha' || get.type(event.card, null, false) == 'trick')) return false;
                            if (event.player.getExpansions('fr_xieji').length == 0) return false
                            return true;
                        },
                        direct: true,
                        content: function () {
                            'step 0'
                            var goon = false;
                            var info = get.info(trigger.card);
                            if (trigger.targets && !info.multitarget) {
                                var players = game.filterPlayer();
                                for (var i = 0; i < players.length; i++) {
                                    if (lib.filter.targetEnabled2(trigger.card, trigger.player, players[i]) && !trigger.targets.contains(players[i])) {
                                        goon = true; break;
                                    }
                                }
                            }
                            if (goon) {
                                player.chooseTarget(get.prompt('ciyu_ss'), '素术：是否增+1名' + get.translation(trigger.card) + '的目标？', function (card, player, target) {
                                    var player = _status.event.source;
                                    return !_status.event.targets.contains(target) && lib.filter.targetEnabled2(_status.event.card, player, target)
                                }).set('ai', function (target) {
                                    var trigger = _status.event.getTrigger();
                                    var player = _status.event.source;
                                    return get.effect(target, trigger.card, player, _status.event.player);
                                }).set('targets', trigger.targets).set('card', trigger.card).set('source', trigger.player)
                            } else {
                                if (!info.multitarget && trigger.targets && trigger.targets.length > 1) {
                                    event.goto(3);
                                } else {
                                    event.finish()
                                }
                            }
                            'step 1'
                            if (result.bool) {
                                if (!event.isMine() && !event.isOnline()) game.delayx();
                                event.target = result.targets[0]
                                player.chooseCardButton('选择弃置1张“协”', trigger.player.getExpansions('fr_xieji'), true)
                            }
                            else {
                                event.finish();
                            }
                            'step 2'
                            if (event.target) {
                                trigger.player.loseToDiscardpile(result.links)
                                player.logSkill('ciyu_ss', event.target);
                                trigger.targets.add(event.target);
                            }
                            event.finish();
                            'step 3'
                            player.chooseTarget(get.prompt('ciyu_ss'), '素术：是否减少一名' + get.translation(trigger.card) + '的目标？', function (card, player, target) {
                                var trigger = _status.event.getTrigger();
                                return trigger.targets.contains(target);
                            }).set('ai', function (target) {
                                var trigger = _status.event.getTrigger();
                                var player = _status.event.source;
                                return -get.effect(target, trigger.card, player, _status.event.player);
                            }).set('targets', trigger.targets).set('card', trigger.card).set('source', trigger.player).setHiddenSkill(event.name);
                            'step 4'
                            if (result.bool) {
                                event.targets = result.targets;
                                if (event.isMine()) {
                                    player.logSkill('ciyu_ss', event.targets);
                                    event.finish();
                                }
                                for (var i = 0; i < result.targets.length; i++) {
                                    trigger.targets.remove(result.targets[i]);
                                }
                                player.chooseCardButton('选择弃置1张“协”', trigger.player.getExpansions('fr_xieji'), true)
                                game.delay();
                            }
                            else {
                                event.finish();
                            }
                            'step 5'
                            player.logSkill('ciyu_ss', event.targets);
                            trigger.player.loseToDiscardpile(result.links)
                        },
                        sub: true,
                    },
                },
            },
            "ciyu_hq": {
                trigger: {
                    global: "damageBegin4",
                },
                locked: true,
                usable: 1,
                filter: function (event, player) {
                    return event.player.isAlive() && event.player.getExpansions('fr_xieji').length != 0
                },
                "prompt2": "当一名有“协“的角色受到伤害时，你可以令其选择是否弃置一张“协”并免除此伤害",
                logTarget: "player",
                check: function (event, player) {
                    return get.attitude(player, event.player) > 0
                },
                content: function () {
                    "step 0"
                    trigger.player.chooseCardButton('选择弃置1张“协”', 1, trigger.player.getExpansions('fr_xieji')).set('prompt2', "是否弃置一张“协”并免除此次伤害").set("ai", ai = function (button) {
                        return 9 - get.value(button.link);
                    })
                    "step 1"
                    var card = result.links
                    if (result.bool) {
                        trigger.player.loseToDiscardpile(card)
                        trigger.cancel()
                    } else {
                        event.finish()
                        return;
                    }
                },
                group: "ciyu_hq_self",
                subSkill: {
                    self: {
                        trigger: {
                            target: "useCardToTarget",
                        },
                        forced: true,
                        filter: function (event, player) {
                            if (event.card.name != 'sha') return false;
                            if (player.countCards('he') == 0) return false;
                            return game.hasPlayer(function (current) {
                                return current != event.player && current != player &&
                                    current.getExpansions('fr_xieji').length != 0 && lib.filter.targetEnabled(event.card, event.player, current);
                            });
                        },
                        ai: {
                            combo: "ciyu_hq",
                        },
                        content: function () {
                            "step 0"
                            var next = player.chooseCardTarget({
                                position: 'he',
                                filterCard: lib.filter.cardDiscardable,
                                filterTarget: function (card, player, target) {
                                    var trigger = _status.event;
                                    if (target != player && target != trigger.source) {
                                        if (target.getExpansions('fr_xieji').length != 0 && lib.filter.targetEnabled(trigger.card, trigger.source, target)) return true;
                                    }
                                    return false;
                                },
                                ai1: function (card) {
                                    return get.unuseful(card) + 9;
                                },
                                ai2: function (target) {
                                    if (target.hp == 1) {
                                        return -1
                                    }
                                    if (target.countCards('h', 'shan')) {
                                        return target.countCards('h', 'shan') + target.getExpansions('fr_xieji').length;
                                    }
                                    return target.getExpansions('fr_xieji').length;
                                },
                                prompt: get.prompt('ciyu_hq'),
                                prompt2: '弃置一张牌，将此【杀】转移给一名有“协”的角色',
                                source: trigger.player,
                                card: trigger.card,
                            });
                            "step 1"
                            if (result.bool) {
                                var target = result.targets[0];
                                player.logSkill(event.name, target);
                                player.discard(result.cards);
                                var evt = trigger.getParent();
                                evt.triggeredTargets2.remove(player);
                                evt.targets.remove(player);
                                evt.targets.push(target);
                            }
                        },
                        sub: true,
                    },
                },
            },
            "bofeng_ws": {
                audio: "ext:福瑞拓展:2",
                trigger: {
                    target: "useCardToPlayered",
                },
                filter: function (event, player) {
                    if (get.tag(event.card, 'damage') && event.player != player) return true
                },
                direct: true,
                content: function () {
                    "step 0"
                    if (player.countCards('h') == 0) {
                        player.draw()
                        event.goto(1)
                    }
                    player.addTempSkill("fr_xieji", { player: "phaseEnd" })
                    player.addToExpansion(get.cards(1), 'gain2').gaintag.add('fr_xieji')
                    "step 1"
                    var cards = player.getExpansions('fr_xieji');
                    if (!cards.length || !player.countCards('h')) {
                        event.finish();
                    }
                    var next = player.chooseToMove('危视：是否交换“协”和手牌？');
                    next.set('list', [
                        [get.translation(player) + '（你）的协', cards],
                        ['手牌区', player.getCards('h')],
                    ]);
                    next.set('filterMove', function (from, to) {
                        return typeof to != 'number';
                    });
                    next.set('processAI', function (list) {
                        var player = _status.event.player, cards = list[0][1].concat(list[1][1]).sort(function (a, b) {
                            return get.value(a) - get.value(b);
                        }), cards2 = cards.splice(0, player.getExpansions('fr_xieji').length);
                        return [cards2, cards];
                    });
                    "step 2"
                    if (result.bool) {
                        var pushs = result.moved[0], gains = result.moved[1];
                        pushs.removeArray(player.getExpansions('fr_xieji'));
                        gains.removeArray(player.getCards('h'));
                        if (!pushs.length || pushs.length != gains.length) return;
                        player.addToExpansion(pushs, player, 'giveAuto').gaintag.add('fr_xieji');
                        game.log(player, '将', pushs, '作为“协”置于武将牌上');
                        player.gain(gains, 'gain2');
                    }
                },
            },
            "delta_ys": {
                direct: true,
                locked: true,
                enable: ["chooseToRespond", "chooseToUse"],
                filter: function (event, player) {
                    var filter = event.filterCard;
                    if (filter({ name: 'sha' }, player, event) && player.countCards('hes', { color: 'red' })) return true;
                    if (filter({ name: 'shan' }, player, event) && player.countCards('hes', { color: 'black' })) return true;
                    return false;
                },
                chooseButton: {
                    dialog: function (event, player) {
                        var list = [];
                        if (event.filterCard({ name: 'sha' }, player, event)) {
                            list.push(['基本', '', 'sha']);
                            for (var j of lib.inpile_nature) list.push(['基本', '', 'sha', j]);
                        }
                        if (event.filterCard({ name: 'shan' }, player, event)) {
                            list.push(['基本', '', 'shan']);
                        }
                        return ui.create.dialog('应势', [list, 'vcard'], 'hidden');
                    },
                    check: function (button) {
                        var player = _status.event.player;
                        var card = { name: button.link[2], nature: button.link[3] };
                        if (_status.event.getParent().type != 'phase' || game.hasPlayer(function (current) {
                            return player.canUse(card, current) && get.effect(current, card, player, player) > 0;
                        })) {
                            switch (button.link[2]) {
                                case 'shan': return 5;
                                case 'sha':
                                    if (button.link[3] == 'fire') return 2.95;
                                    else if (button.link[3] == 'thunder' || button.link[3] == 'ice') return 2.92;
                                    else return 2.9;
                            }
                        }
                        return 0;
                    },
                    backup: function (links, player) {
                        return {
                            filterCard: function (card, player) {
                                var name = links[0][2];
                                if (name == "sha") {
                                    return get.color(card) == "red";
                                }
                                if (name == "shan") {
                                    return get.color(card) == "black";
                                }
                            },
                            selectCard: 1,
                            check: function (card, player, target) {
                                if (!ui.selected.cards.length) return 6;
                                else return 6 - get.value(card);
                            },
                            viewAs: { name: links[0][2], nature: links[0][3] },
                            position: 'hes',
                            popname: true,
                        }
                    },
                    prompt: function (links, player) {
                        var str = ''
                        if (links[0][2] == 'sha') { str = '红色' }
                        else if (links[0][2] == 'shan') { str = '黑色' }
                        return '将一张' + str + '牌当做' + (get.translation(links[0][3]) || '') + '【' + get.translation(links[0][2]) + '】' + '使用或打出';
                    },
                },
                ai: {
                    order: 3.1,
                    skillTagFilter: function (player, tag, arg) {
                        if (tag == 'fireAttack') return true;
                        return player.countCards('hes') > 0;
                    },
                    result: {
                        player: 1,
                    },
                    respondSha: true,
                    respondShan: true,
                    fireAttack: true,
                },
            },
            "delta_sy": {
                enable: "phaseUse",
                usable: 1,
                filter: function (event, player) {
                    return ui.cardPile.childElementCount >= 4;
                },
                content: function () {
                    'step 0'
                    var cards = get.cards(4);
                    player.addTempSkill("delta_sy_ig")
                    game.cardsGotoOrdering(cards);
                    event.cards = cards
                    var dialog = ui.create.dialog('算演', cards, true)
                    event.dialog = dialog
                    if (!event.isMine()) {
                        player.popup('演算成功！');
                        player.gain(cards, 'gain2').gaintag.add('delta_sy')
                        player.addTempSkill('delta_sy_1')
                        event.dialog.close()
                        event.finish()
                    }
                    'step 1'
                    event.list = []
                    for (var i = 0; i < event.cards.length; i++) {
                        event.list.push(get.number(event.cards[i]))
                    }
                    'step 2'
                    player.chooseControl(event.list).set('prompt', '选择要算的第一个数字')
                    'step 3'
                    event.num1 = result.control
                    event.list.splice(event.list.indexOf(event.num1), 1)
                    player.chooseControl(event.list).set('prompt', '选择要算的第二个数字')
                    'step 4'
                    event.num2 = result.control
                    event.list.splice(event.list.indexOf(event.num2), 1)
                    player.chooseControl(['+', '-', '*', '/', '重做', '放弃']);
                    'step 5'
                    if (result.control == '+') {
                        event.count = event.num1 + event.num2
                    }
                    if (result.control == '-') {
                        event.count = event.num1 - event.num2
                    }
                    if (result.control == '*') {
                        event.count = event.num1 * event.num2
                    }
                    if (result.control == '/') {
                        event.count = event.num1 / event.num2
                    }
                    if (result.control == '重做') {
                        event.goto(1);
                    }
                    if (result.control == '放弃') {
                        player.loseToDiscardpile(event.cards)
                        event.dialog.close()
                        event.finish()
                    }
                    'step 6'
                    event.list.push(event.count)
                    'step 7'
                    if (event.list.length != 1) {
                        event.goto(2)
                    }
                    'step 8'
                    if (event.list[0] == 24) {
                        player.popup('演算成功！');
                        player.gain(event.cards, 'gain2').gaintag.add('delta_sy');
                        event.dialog.close()
                        player.addTempSkill('delta_sy_1')
                    } else {
                        player.popup('演算失败！');
                        player.loseToDiscardpile(event.cards)
                        event.dialog.close()
                        event.finish()
                    }
                },
                ai: {
                    order: 10,
                    result: {
                        player: 1,
                    },
                    threaten: 3.2,
                },
                subSkill: {
                    "1": {
                        shaRelated: true,
                        popup: false,
                        silent: true,
                        charlotte: true,
                        init: function (player) {
                            player.markSkill('delta_sy_1');
                        },
                        onremove: function (player) {
                            player.unmarkSkill('delta_sy_1');
                        },
                        trigger: {
                            player: "useCardToTargeted",
                        },
                        intro: {
                            content: "本回合你的【杀】无距离次数限制且无视防具。",
                        },
                        forced: true,
                        filter: function (event, player) {
                            return event.card.name == 'sha';
                        },
                        mod: {
                            targetInRange: function (card, player, target, now) {
                                if (card.name == 'sha') return true;
                            },
                            cardUsable: function (card, player, num) {
                                if (card.name == 'sha') return Infinity
                            },
                        },
                        logTarget: "target",
                        content: function () {
                            trigger.target.addTempSkill('qinggang2');
                            trigger.target.storage.qinggang2.add(trigger.card);
                        },
                        ai: {
                            skillTagFilter: function (player, tag, arg) {
                                if (!arg || arg.isLink || !arg.card || arg.card.name != 'sha') return false;
                                if (arg && arg.name == 'sha') return true;
                            },
                            "unequip_ai": true,
                        },
                        sub: true,
                    },
                    ig: {
                        mod: {
                            ignoredHandcard: function (card, player) {
                                if (card.hasGaintag('delta_sy')) {
                                    return true;
                                }
                            },
                            cardDiscardable: function (card, player, name) {
                                if (name == 'phaseDiscard' && card.hasGaintag('delta_sy')) {
                                    return false;
                                }
                            },
                        },
                        onremove: function (player) {
                            player.removeGaintag('delta_sy');
                        },
                        sub: true,
                    },
                },
            },
            "faers_yl": {
                trigger: {
                    player: "discardAfter",
                },
                forced: true,
                filter: function (event, player) {
                    if (!event.cards) return false;
                    for (var i = 0; i < event.cards.length; i++) {
                        if (get.name(event.cards[i]) == 'tao') return true;
                    }
                    return false;
                },
                content: function () {
                    player.recover()
                },
            },
            "site_qj": {
                trigger: {
                    player: "damageBegin3",
                },
                check: function (event, player) {
                    if (event.num >= 2 && player.maxHp > 0) return true;
                    if (event.num >= 1 && player.maxHp > player.hp + 2) {
                        return true
                    } else if (player.hp == 1) {
                        return true
                    } else {
                        return false
                    }
                },
                content: function () {
                    'step 0'
                    trigger.cancel();
                    event.lose = player.loseMaxHp(trigger.num);
                    'step 1'
                    player.draw(trigger.num)
                },
                ai: {
                    filterDamage: true,
                    skillTagFilter: function (player, tag, arg) {
                        if (arg && arg.player) {
                            if (arg.player.hasSkillTag('jueqing', false, player)) return false;
                        }
                    },
                },
            },
            "edmond_jz": {
                audio: "ext:福瑞拓展:2",
                trigger: {
                    target: "useCardToTarget",
                },
                forced: true,
                filter: function (event, player) {
                    return event.card.name != 'jiu' && event.card.name != 'tao' && event.getParent(2).name != 'edmond_jj' &&
                        event.targets.length == 1 && event.card.isCard && event.cards.length == 1 &&
                        get.position(event.cards[0], true) == 'o' && event.card.name == event.cards[0].name && event.player != player &&
                        (!player.storage.edmond_jz || player.storage.edmond_jz[0].length <= player.hp * 2)
                },
                content: function () {
                    trigger.targets.remove(player);
                    trigger.getParent().triggeredTargets2.remove(player);
                    trigger.untrigger();
                    var card = trigger.cards[0];
                    player.addToExpansion(card, 'gain2').gaintag.add('edmond_jz');
                    if (!player.storage.edmond_jz) player.storage.edmond_jz = [[], []];
                    player.storage.edmond_jz[0].push(card);
                    player.storage.edmond_jz[1].push(trigger.player);
                    game.delayx();
                },
                onremove: function (player, skill) {
                    var cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                    delete player.storage[skill];
                },
                intro: {
                    markcount: function (storage) {
                        if (!storage) return 0;
                        return storage[0].length;
                    },
                    mark: function (dialog, storage, player) {
                        if (!storage) return;
                        dialog.addAuto(storage[0]);
                        dialog.addText(get.translation(storage[1]));
                    },
                    onunmark: function (storage, player) {
                        player.storage.edmond_jz = [[], []];
                    },
                },
            },
            "edmond_jj": {
                trigger: {
                    player: "phaseJieshuBegin",
                },
                forced: true,
                filter: function (event, player) {
                    return player.storage.edmond_jz && player.storage.edmond_jz[0].length > 0;//=Math.max(1,player.getDamagedHp());
                },
                content: function () {
                    "step 0"
                    player.chooseControl("选项一", "选项二", true).set("choiceList", ["摸两张牌，并令原使用者依次对你使用所有的“战”，然后获得无法使用的“战”", "失去一点体力，并对所有原使用者依次使用所有的“战”，然后弃置无法使用的“战”"])
                    "step 1"
                    if (result.index == 0) {
                        player.draw(2)
                        event.goto(3)
                    } else {
                        player.loseHp()
                        event.goto(2)
                    }
                    "step 2"
                    var list = player.storage.edmond_jz, card = list[0].shift(), source = list[1].shift();
                    if (player.getExpansions('edmond_jz').contains(card)) {
                        if (source && source.isIn() && player.canUse(card, source, false)) player.useCard(card, source, false);
                        else player.loseToDiscardpile(card);
                    }
                    if (list[0].length) {
                        event.redo()
                    } else {
                        event.finish()
                    }
                    "step 3"
                    var list = player.storage.edmond_jz, card = list[0].shift(), source = list[1].shift();
                    if (player.getExpansions('edmond_jz').contains(card)) {
                        if (source && source.isIn() && source.canUse(card, player, false)) source.useCard(card, player, false);
                        else player.gain(card);
                    }
                    if (list[0].length) {
                        event.redo()
                    } else {
                        event.finish()
                    }
                },
            },
            "yada_fs": {
                audio: "ext:福瑞拓展:2",
                trigger: {
                    player: ["chooseToCompareAfter", "compareMultipleAfter"],
                    target: ["chooseToCompareAfter", "compareMultipleAfter"],
                },
                frequent: true,
                filter: function (event, player) {
                    if (event.preserve) return false;
                    if (player == event.player) {
                        return !get.owner(event.card2);
                    } else {
                        return !get.owner(event.card1);
                    }
                },
                check: function (event, player) {
                    if (player == event.player) {
                        return event.card2.name != 'du';
                    } else {
                        return event.card1.name != 'du';
                    }
                },
                content: function () {
                    if (player == trigger.player) {
                        player.gain(trigger.card2, 'gain2', 'log');
                    } else {
                        player.gain(trigger.card1, 'gain2', 'log');
                    }
                },
            },
            "wes_gc": {
                audio: "ext:福瑞拓展:2",
                trigger: {
                    player: "damageEnd",
                },
                logTarget: "source",
                preHidden: true,
                filter: function (event, player) {
                    return (event.source && event.source.countGainableCards(player, 'he') && event.num > 0 && event.source != player);
                },
                content: function () {
                    player.gainPlayerCard(true, trigger.source, 'he');
                },
                ai: {
                    "maixie_defend": true,
                    effect: {
                        target: function (card, player, target) {
                            if (player.countCards('he') > 1 && get.tag(card, 'damage')) {
                                if (player.hasSkillTag('jueqing', false, target)) return [1, -1.5];
                                if (get.attitude(target, player) < 0) return [1, 1];
                            }
                        },
                    },
                },
            },
            "mika_lx": {
                audio: "ext:福瑞拓展:2",
                trigger: {
                    player: "phaseDrawBegin2",
                },
                forced: true,
                filter: function (event, player) {
                    return !event.numFixed;
                },
                content: function () {
                    trigger.num += game.countGroup();
                },
                group: "mika_lx_discard",
                subSkill: {
                    discard: {
                        audio: 2,
                        trigger: {
                            player: "phaseDiscardBegin",
                        },
                        forced: true,
                        content: function () {
                            'step 0'
                            player.chooseToDiscard(Math.min(player.countCards('he'), game.countGroup()), 'he', true)
                            'step 1'
                            trigger.cancel()
                        },
                        sub: true,
                    },
                },
            },
            "mika_pl": {
                audio: "ext:福瑞拓展:2",
                unique: true,
                limited: true,
                enable: "phaseUse",
                animationColor: "thunder",
                skillAnimation: "epic",
                filter: function (event, player) {
                    return !player.storage.mika_pl && game.players.length >= 3
                },
                init: function (player) {
                    player.storage.mika_pl = false;
                },
                filterTarget: function (card, player, target) {
                    if (target == player) return false;
                    return true;
                },
                filterCard: true,
                selectCard: -1,
                mark: true,
                discard: false,
                lose: false,
                delay: false,
                selectTarget: 2,
                multitarget: true,
                content: function () {
                    'step 0'
                    player.awakenSkill('mika_pl');
                    player.storage.mika_pl = true;
                    targets[0].gain(cards, player, 'give');
                    'step 1'
                    event.list = targets[0].getCards('h')
                    'step 2'
                    var card = event.list.shift()
                    if (targets[1] && targets[1].isIn() && targets[0].canUse(card, targets[1], false)) {
                        targets[0].useCard(card, targets[1], false)
                    }
                    else {
                        player.gain(card)
                    }
                    if (event.list.length) {
                        event.redo()
                    } else {
                        event.finish()
                    }
                },
                intro: {
                    content: "limited",
                },
                ai: {
                    expose: 0.4,
                    order: 4,
                    result: {
                        target: function (player, target) {
                            if (player.hasUnknown()) return 0;
                            if (ui.selected.targets.length) return -1;
                            return -0.5;
                        },
                    },
                },
            },
            "peterlk_kh": {
                enable: "phaseUse",
                filter: function (event, player) {
                    return ((player.getStat('skill').peterlk_kh || 0) < player.getDamagedHp() + 1) && (player.countCards('h', 'sha') > 0 || player.countCards('h', { type: ['trick', 'delay'] }) > 0
                        && player.countCards('h', { type: 'trick' }) != player.countCards('h', 'wuxie'))
                },
                filterCard: function (card, player, target) {
                    return (card.name == 'sha' || get.type(card, 'trick') == 'trick') && card.name != 'wuxie';
                },
                discard: false,
                lose: false,
                delay: false,
                selectCard: 1,
                filterTarget: function (card, player, target) {
                    return target != player;
                },
                "ai1": function (card) {
                    return 6 - get.value(card);
                },
                "ai2": function (target) {
                    var att = get.attitude(_status.event.player, target);
                    return att;
                },
                position: "h",
                content: function () {
                    "step 0"
                    targets[0].gain(cards, player, 'give')
                    "step 1"
                    if (game.hasPlayer(function (current) {
                        return targets[0].canUse(cards[0], current, false) && lib.filter.targetEnabled2(cards[0], targets[0], current) && lib.filter.targetInRange(cards[0], targets[0], current)
                    })) {
                        player.chooseTarget(get.prompt('peterlk_kh'), '控魂：选择' + get.translation(cards[0]) + '的目标？', function (card, player, target) {
                            var player = _status.event.source;
                            return lib.filter.targetEnabled2(_status.event.card, player, target) && lib.filter.targetInRange(_status.event.card, player, target);
                        }).set('ai', function (target) {
                            var player = _status.event.source;
                            var card = _status.event.card;
                            return get.effect(target, card, player, _status.event.player);
                        }).set('card', cards[0]).set('source', targets[0]).setHiddenSkill(event.name);
                    } else {
                        event.finish()
                    }
                    "step 2"
                    if (result.bool) {
                        targets[0].useCard(cards[0], result.targets[0], false)
                    }
                },
                ai: {
                    order: 8,
                    result: {
                        player: 1,
                    },
                },
            },
            "peterlk_jn": {
                trigger: {
                    global: "gainBegin",
                },
                forced: true,
                filter: function (event, player) {
                    if (event.source != player) return false;
                    if (event.player == player) return false;
                    return true;
                },
                content: function () {
                    'step 0'
                    trigger.player.chooseToDiscard('he', '弃置一张牌，或令' + get.translation(player) + '摸一张牌').set('ai', function (card) {
                        if (_status.event.goon) return 7 - get.value(card);
                        return -get.value(card);
                    }).set('goon', get.attitude(trigger.player, player) < 0);
                    'step 1'
                    if (!result.bool) player.draw();
                },
                group: ["peterlk_jn_1", "peterlk_jn_2"],
                subSkill: {
                    "1": {
                        trigger: {
                            player: "phaseDrawBegin2",
                        },
                        frequent: true,
                        filter: function (event, player) {
                            return !event.numFixed;
                        },
                        content: function () {
                            trigger.num += player.getDamagedHp();
                        },
                        ai: {
                            threaten: 1.3,
                        },
                        sub: true,
                    },
                    "2": {
                        mod: {
                            maxHandcardBase: function (player, num) {
                                return player.maxHp;
                            },
                        },
                        sub: true,
                    },
                },
            },
            "dmoa_sx": {
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                mark: true,
                onremove: function (player, skill) {
                    var cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                intro: {
                    content: "expansion",
                    markcount: "expansion",
                },
                content: function () {
                    "step 0"
                    var color = ['black', 'red', 'cancel2']
                    var aicolor = ['black', 'red']
                    player.chooseControl(color).set('prompt', '请选择一种颜色')
                        .set('ai', function () {
                            return aicolor.randomGet()
                        })
                    "step 1"
                    if (result.control != 'cancel2') {
                        player.judge('dmoa_sx', function (card) { return (get.color(card) == result.control) ? 1.5 : -0.5 }).judge2 = function (result) {
                            return result.bool;
                        };
                    } else {
                        event.goto(3)
                    }
                    "step 2"
                    if (result.judge > 0) {
                        if (get.position(result.card, true) == 'o') {
                            player.addToExpansion('gain2', result.card, target).gaintag.add('dmoa_sx')
                        }
                        event.goto(0)
                    }
                    "step 3"
                    if (player.getExpansions('dmoa_sx').length > 0) {
                        player.chooseTarget('令一名角色获得你武将牌上所有的笙歌', 1, true).set('ai', function (target) {
                            var att = get.attitude(player, target);
                            if (att <= 0) return 0;
                            if (target.hasSkillTag('nogain') && target != _status.currentPhase) return 0.1;
                            return att / (1 + 0.1 * target.countCards('h'));
                        })
                    } else {
                        event.finish()
                    }
                    "step 4"
                    result.targets[0].gain(player.getExpansions('dmoa_sx'), 'gain2').gaintag.add('dmoa_sx')
                    result.targets[0].addSkill('dmoa_sx_ig')
                },
                group: "dmoa_sx_draw",
                subSkill: {
                    ig: {
                        mod: {
                            ignoredHandcard: function (card, player) {
                                if (card.hasGaintag('dmoa_sx')) {
                                    return true;
                                }
                            },
                            cardDiscardable: function (card, player, name) {
                                if (name == 'phaseDiscard' && card.hasGaintag('dmoa_sx')) return false;
                            },
                        },
                        sub: true,
                    },
                    draw: {
                        trigger: {
                            global: ["useCardAfter", 'respondAfter']
                        },
                        forced: true,
                        charlotte: true,
                        popup: false,
                        filter: function (event, player) {
                            return event.player.hasHistory('lose', function (evt) {
                                if (evt.getParent() != event) return false;
                                for (var i in evt.gaintag_map) {
                                    if (evt.gaintag_map[i].contains('dmoa_sx')) return true;
                                }
                                return false;
                            });
                        },
                        logTarget: "player",
                        content: function () {
                            player.draw()
                        },
                        sub: true,
                    },
                },
            },
            "bofeng_ld": {
                trigger: {
                    source: "damageBegin1",
                },
                filter: function (event, player) {
                    return event.getParent().name == 'sha' && player.getExpansions('fr_xieji').length > 0
                },
                check: function (event, player) {
                    if (get.attitude(player, event.player) >= 0) return false;
                    if (event.player.hasSkillTag('filterDamage', null, {
                        player: player,
                        card: event.card,
                    })) return false;
                    return true;
                    //return player.hasMark('xinfu_falu_spade')||get.color(ui.cardPile.firstChild)=='black';
                },
                usable: 1,
                prompt: "你可以弃置X张'协'令此伤害+X",
                logTarget: "player",
                content: function () {
                    "step 0"
                    player.chooseCardButton('选择弃置X张“协”', [1, Infinity], player.getExpansions('fr_xieji'))
                    "step 1"
                    if (result.bool) {
                        trigger.num += result.links.length
                        player.loseToDiscardpile(result.links)
                    } else {
                        event.finish()
                        return;
                    }
                },
            },
            "terlk_pj": {
                trigger: {
                    player: "useCardToPlayered",
                },
                forced: true,
                filter: function (event, player) {
                    return event.card.name == 'sha' && !event.getParent().directHit.contains(event.target);
                },
                logTarget: "target",
                content: function () {
                    var id = trigger.target.playerid;
                    var map = trigger.getParent().customArgs;
                    if (!map[id]) map[id] = {};
                    if (typeof map[id].shanRequired == 'number') {
                        map[id].shanRequired += trigger.target.hp - 1;
                    }
                    else {
                        map[id].shanRequired = trigger.target.hp;
                    }
                },
                ai: {
                    "directHit_ai": true,
                    skillTagFilter: function (player, tag, arg) {
                        if (arg.card.name != 'sha' || arg.target.countCards('h', 'shan') > arg.target.getDamagedHp()) return false;
                    },
                },
            },
            "terlk_zj": {
                trigger: {
                    player: "phaseUseBegin",
                },
                direct: true,
                content: function () {
                    "step 0"
                    var num = game.countPlayer(function (current) {
                        return current.isDamaged();
                    });
                    player.draw(num)
                    "step 1"
                    var recover = 0, lose = 0, players = game.filterPlayer();
                    for (var i = 0; i < players.length; i++) {
                        if (players[i].hp < players[i].maxHp) {
                            if (get.attitude(player, players[i]) > 0) {
                                if (players[i].hp < 2) {
                                    lose--;
                                    recover += 0.5;
                                }
                                lose--;
                                recover++;
                            }
                            else if (get.attitude(player, players[i]) < 0) {
                                if (players[i].hp < 2) {
                                    lose++;
                                    recover -= 0.5;
                                }
                                lose++;
                                recover--;
                            }
                        }
                        else {
                            if (get.attitude(player, players[i]) > 0) {
                                lose--;
                            }
                            else if (get.attitude(player, players[i]) < 0) {
                                lose++;
                            }
                        }
                    }
                    var prompt = get.prompt('terlk_zj');
                    player.chooseControl('失去体力', '回复体力', 'cancel2',
                        ui.create.dialog(get.prompt('terlk_zj'), 'hidden')).ai = function () {
                            if (lose > recover && lose > 0) return 0;
                            if (lose < recover && recover > 0) return 1;
                            return 2;
                        }
                    "step 2"
                    if (result.control == 'cancel2') {
                        event.finish();
                    }
                    else {
                        player.logSkill('terlk_zj');
                        event.bool = (result.control == '回复体力');
                        event.num = 0;
                        event.players = game.filterPlayer();
                    }
                    "step 3"
                    if (event.num < event.players.length) {
                        var target = event.players[event.num];
                        if (event.bool) {
                            target.recover();
                        }
                        else {
                            target.loseHp();
                        }
                        event.num++;
                        event.redo();
                    }
                    "step 4"
                    player.turnOver()
                    player.addTempSkill('terlk_zj_use')
                },
                ai: {
                    expose: 0.1,
                    threaten: 2,
                },
                subSkill: {
                    use: {
                        mod: {
                            targetInRange: function (card, player, target) {
                                if (player.inRange(target)) {
                                    return true;
                                }
                            },
                            cardUsableTarget: function (card, player, target) {
                                if (player.inRange(target)) return true;
                            },
                            aiValue: function (player, card, num) {
                                if (card.name == 'zhangba') return 15;
                                if (player.getEquip('zhangba') && player.countCards('hs') > 1 && ['shan', 'tao'].contains(card.name)) return 0;
                                if (card.name == 'shan' || card.name == 'tao') return num / 2;
                            },
                        },
                        sub: true,
                    },
                },
            },
            "nulia_dh": {
                enable: "phaseUse",
                usable: 1,
                filter: function (event, player) {
                    var list = [];
                    for (var i = 0; i < game.dead.length; i++) {
                        if (game.dead[i].maxHp != 0) {
                            list.push(game.dead[i].name);
                        }
                    }
                    return list.length > 0;
                },
                content: function () {
                    "step 0"
                    var list = [];
                    for (var i = 0; i < game.dead.length; i++) {
                        if (game.dead[i].maxHp != 0) {
                            list.push(game.dead[i].name);
                        }
                    }
                    player.chooseButton(ui.create.dialog('选择一名已死亡的角色令其复活', [list, 'character']), function (button) {
                        for (var i = 0; i < game.dead.length && game.dead[i].name != button.link; i++);
                        return Math.random()
                    });
                    "step 1"
                    if (result.bool) {
                        player.loseHp()
                        for (var i = 0; i < game.dead.length && game.dead[i].name != result.buttons[0].link; i++);
                        var dead = game.dead[i];
                        dead.revive(1);
                        dead.draw(2);
                        var skills = dead.getSkills();
                        for (var j = 0; j < skills.length; j++) {
                            dead.markSkill(skills[j])
                        }
                        dead.checkMarks()
                        game.broadcastAll(function (player, target, shown) {
                            var identity = player.identity;
                            if (identity == 'zhu') {
                                dead.identity = 'zhong'
                            } else {
                                dead.identity = identity;
                            }
                            dead.setIdentity();
                        }, player, dead, dead.identityShown);
                    }
                    'step 2'
                    if (get.population('zhong') > Math.ceil((game.players.length + game.dead.length) / 2) && !game.frAchi.hasAchi('天下归心', 'character') && game.me == player
                        && (player.name == 'fr_nulia' || player.name1 == 'fr_nulia' || player.name2 == 'fr_nulia') && game.zhu == player) {
                        game.frAchi.addProgress('天下归心', 'character')
                    }
                },
                ai: {
                    order: 14,
                    result: {
                        player: function (player) {
                            if (player.hp < 3) return -1;
                            if (player.countCards('hs', { name: ['jiu', 'tao'] })) return 1;
                            return 0;
                        },
                    },
                    threaten: 2,
                },
            },
            "nulia_hj": {
                trigger: {
                    player: "phaseDrawBegin2",
                },
                frequent: true,
                filter: function (event, player) {
                    return !event.numFixed;
                },
                content: function () {
                    var num = 2
                    if (get.mode() == 'identity') {
                        if (player.identity == 'zhu') {
                            num = game.countPlayer(function (current) {
                                return current.identity == 'zhong' || current.identity == 'mingzhong';
                            });
                        } else {
                            num = game.countPlayer(function (current) {
                                return current.identity == player.identity;
                            });
                        }
                    }
                    trigger.num += num
                },
                ai: {
                    threaten: 1.3,
                },
                group: "nulia_hj_2",
                subSkill: {
                    "2": {
                        mod: {
                            maxHandcardBase: function (player, num) {
                                return player.maxHp;
                            },
                        },
                        sub: true,
                    },
                },
            },
            "taber_jj": {
                enable: "phaseUse",
                usable: 1,
                content: function () {
                    "step 0"
                    player.chooseTarget([1, Math.ceil(game.countPlayer() / 2)], function (card, player, target) {
                        return target.countCards('h')
                    }, true).set('ai', function (target) {
                        var player = _status.event.player
                        return get.attitude(player, target)
                    })
                    "step 1"
                    if (result.bool) {
                        event.targets = result.targets
                        event.targets.sortBySeat()
                        var cards = get.cards(result.targets.length);
                        var dialog = ui.create.dialog('掘金', cards, true)
                        event.dialog = dialog
                    } else {
                        event.finish()
                    }
                    "step 2"
                    event.target = event.targets.shift()
                    var minValue = 20;
                    var hs = event.target.getCards('h');
                    for (var i = 0; i < hs.length; i++) {
                        minValue = Math.min(minValue, get.value(hs[i], event.target));
                    }
                    if (event.target.isUnderControl(true)) {
                        event.dialog.setCaption('选择一张牌并用一张手牌替换之');
                    }
                    var next = event.target.chooseButton(function (button) {
                        return get.value(button.link, _status.event.player) - minValue;
                    });
                    next.set('dialog', event.dialog);
                    next.set('closeDialog', false);
                    next.set('dialogdisplay', true);
                    "step 3"
                    event.dialog.setCaption('掘金');
                    if (result.bool) {
                        event.button = result.buttons[0];
                        event.target.chooseCard('用一张牌牌替换' + get.translation(result.links), true).ai = function (card) {
                            return -get.value(card);
                        }
                    }
                    else {
                        event.target.popup('不换');
                        game.log(event.target, '不替换')
                    }
                    "step 4"
                    if (result.bool) {
                        event.target.lose(result.cards, ui.special);
                        event.target.$throw(result.cards);
                        game.log(event.target, '用', result.cards, '替换了', event.button.link);
                        event.target.gain(event.button.link);
                        event.target.$gain2(event.button.link);
                        event.dialog.buttons.remove(event.button);
                        event.dialog.buttons.push(ui.create.button(result.cards[0], 'card', event.button.parentNode));
                        event.button.remove();
                    }
                    "step 5"
                    game.delay(2);
                    if (event.targets.length != 0) {
                        event.goto(2)
                    } else {
                        var cards = []
                        for (var i = 0; i < event.dialog.buttons.length; i++) {
                            cards.push(event.dialog.buttons[i].link)
                        }
                        event.cards = cards
                        player.chooseTarget(1, true).set('prompt', '将剩余的牌交给一名角色')
                    }
                    "step 6"
                    event.dialog.close()
                    result.targets[0].gain(event.cards, 'gain2')
                },
                ai: {
                    order: 7,
                    result: {
                        player: 1,
                    },
                },
            },
            "verb_zy": {
                audio: "ext:福瑞拓展:2",
                enable: "phaseUse",
                usable: 1,
                filterTarget: function (card, player, target) {
                    return target.countCards('h') && target != player
                },
                selectTarget: -1,
                content: function () {
                    "step 0"
                    target.chooseCard('he', '征言：交给' + get.translation(player) + '一张牌，或失去一点体力').set('ai', function (card) {
                        if (target.getCards('he').length == 0) return false;
                        var att = get.attitude(target, player);
                        if (att > 0) return 1;
                        else {
                            if (card.name == 'tao') return 0;
                            else return 20 - get.value(card);
                        }
                    });
                    "step 1"
                    if (result.bool == false) {
                        target.loseHp();
                    }
                    else {
                        target.give(result.cards, player, true);
                    }
                    player.addSkill('verb_zy_2');
                    player.storage.verb_zy = targets;
                },
                ai: {
                    order: 10,
                    result: {
                        player: 1,
                    },
                    threaten: 1.5,
                },
                subSkill: {
                    "2": {
                        trigger: {
                            player: "phaseUseEnd",
                        },
                        forced: true,
                        popup: false,
                        audio: false,
                        content: function () {
                            "step 0"
                            event.target = player.storage.verb_zy.shift()
                            var cards = player.getCards('h');
                            player.removeSkill('verb_zy_2');
                            if (event.target.classList.contains('dead') || event.target.hp <= 0 || cards.length == 0) {
                                event.goto(0)
                            }
                            else {
                                if (cards.length > 0)
                                    player.chooseCard('h', true, 1, '征言：选择要交给' + get.translation(event.target) + '的牌').set('ai', function (card) {
                                        var att = get.attitude(player, event.target)
                                        if (att > 0) { return get.value(card) }
                                        else return 100 - get.value(card)
                                    });
                            }
                            "step 1"
                            event.target.gain(result.cards, player);
                            player.$give(result.cards.length, event.target);
                            "step 2"
                            if (player.storage.verb_zy.length != 0) {
                                event.goto(0)
                            }
                        },
                        sub: true,
                    },
                },
            },
            "verb_fs": {
                trigger: {
                    target: "useCardToTargeted",
                },
                filter: function (event, player) {
                    return event.player != player && player.countCards('h') <= player.getDamagedHp()
                },
                direct: true,
                content: function () {
                    "step 0"
                    event.cards = get.cards(3);
                    player.chooseCardButton(1, '发掘：获得其中' + get.cnNumber(1) + '张牌', true, event.cards).set('ai', function (button) {
                        return get.useful(button.link);
                    });
                    'step 1'
                    var cards = result.links;
                    player.gain(cards, 'draw');
                    game.log(player, '发掘了', '#y' + get.translation(cards))
                    event.cards.remove(cards);
                    'step 2'
                    while (event.cards.length) {
                        ui.cardPile.insertBefore(event.cards.pop(), ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length)])
                    }
                    "step 3"
                    game.updateRoundNumber()
                },
            },
            "yada_jh": {
                audio: "ext:福瑞拓展:2",
                enable: "phaseUse",
                filterTarget: true,
                filterCard: true,
                usable: 1,
                selectTarget: 2,
                check: function (card) {
                    if (_status.event.player.hp == 1) return 8 - get.value(card);
                    return 6 - get.value(card);
                },
                multitarget: true,
                content: function () {
                    'step 0'
                    var card1 = game.createCard('sha')
                    var card2 = game.createCard('shan')
                    event.cards = [card1, card2]
                    'step 1'
                    if (targets[0].isAlive()) {
                        var att = get.attitude(targets[0], targets[1])
                        targets[0].chooseCardButton('选择其中一张牌', true, event.cards).set('ai', function (card) {
                            if (att > 0) {
                                switch (get.name(card)) {
                                    case 'shan': return 1;
                                    default: return 0;
                                }
                            } else {
                                switch (get.name(card)) {
                                    case 'sha': return 1;
                                    default: return 0;
                                }
                            }
                        });
                    } else {
                        event.finish()
                    }
                    'step 2'
                    if (targets[1].isAlive()) {
                        var att = get.attitude(targets[1], targets[0])
                        event.card1 = result.links[0];
                        targets[1].chooseCardButton('选择其中一张牌', true, event.cards).set('ai', function (card) {
                            if (att > 0) {
                                switch (get.name(card)) {
                                    case 'shan': return 1;
                                    default: return 0;
                                }
                            } else {
                                switch (get.name(card)) {
                                    case 'sha': return 1;
                                    default: return 0;
                                }
                            }
                        });
                    } else {
                        event.finish()
                    }
                    'step 3'
                    event.card2 = result.links[0];
                    'step 4'
                    if (targets[0].isAlive() && targets[1].isAlive()) {
                        targets[0].showCards(event.card1)
                        targets[1].showCards(event.card2)
                    } else {
                        event.finish()
                    }
                    "step 5"
                    if (targets[0].isAlive() && targets[1].isAlive()) {
                        if (get.name(event.card1) == 'sha' && get.name(event.card2) == 'sha') {
                            targets[0].loseHp()
                            targets[1].loseHp()
                        } else if (get.name(event.card1) == 'shan' && get.name(event.card2) == 'shan') {
                            targets[0].chooseToDiscard('he', true)
                            targets[1].chooseToDiscard('he', true)
                        } else if (get.name(event.card1) == 'sha' && get.name(event.card2) == 'shan') {
                            targets[0].draw(2)
                            targets[1].damage(targets[0])
                        } else if (get.name(event.card1) == 'shan' && get.name(event.card2) == 'sha') {
                            targets[1].draw(2)
                            targets[0].damage(targets[1])
                        }
                    }
                },
                ai: {
                    expose: 0.4,
                    order: 7,
                    result: {
                        player: 1,
                        target: -1,
                    },
                },
            },
            "taber_sj": {
                enable: "phaseUse",
                usable: 1,
                position: "he",
                filterCard: function (card, player, event) {
                    event = event || _status.event;
                    if (typeof event != 'string') event = event.getParent().name;
                    var mod = game.checkMod(card, player, event, 'unchanged', 'cardDiscardable', player);
                    if (mod != 'unchanged') return mod;
                    return true;
                },
                discard: false,
                lose: false,
                delay: false,
                selectCard: [1, Infinity],
                check: function (card) {
                    var player = _status.event.player;
                    if (get.position(card) == 'h' && !player.countCards('h', 'du') && (player.hp > 2 || !player.countCards('h', function (card) {
                        return get.value(card) >= 8;
                    }))) {
                        return 1;
                    }
                    return 6 - get.value(card)
                },
                content: function () {
                    "step 0"
                    event.gross = []
                    player.discard(cards);
                    event.num = 1;
                    var hs = player.getCards('h');
                    if (!hs.length) event.num = 0;
                    for (var i = 0; i < hs.length; i++) {
                        if (!cards.contains(hs[i])) {
                            event.num = 0; break;
                        }
                    }
                    event.count = event.num + cards.length
                    'step 1'
                    event.cards = get.cards(3);
                    player.chooseCardButton(1, '发掘：获得其中' + get.cnNumber(1) + '张牌', true, event.cards).set('ai', function (button) {
                        return get.useful(button.link);
                    });
                    'step 2'
                    var cards = result.links;
                    player.gain(cards, 'draw');
                    game.log(player, '发掘了', '#y' + get.translation(cards))
                    event.cards.remove(cards);
                    'step 3'
                    while (event.cards.length) {
                        ui.cardPile.insertBefore(event.cards.pop(), ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length)])
                    }
                    "step 4"
                    game.updateRoundNumber()
                    "step 5"
                    event.count--
                    if (event.count != 0) {
                        event.goto(1)
                    }
                },
                ai: {
                    order: 1,
                    result: {
                        player: 1,
                    },
                    threaten: 1.5,
                },
            },
            "zeron_sx": {
                trigger: {
                    player: ["damageEnd", "recoverEnd", "loseHpEnd", "loseEnd", "gainEnd", "turnOverEnd", "linkEnd"],
                },
                direct: true,
                unique: true,
                filter: function (event, player) {
                    if (player == _status.currentPhase) return false;
                    if (event.name == 'recover') {
                        return game.hasPlayer(function (current) {
                            return current.hp != current.maxHp && current != player;
                        });
                    } else if (event.name == 'lose') {
                        return game.hasPlayer(function (current) {
                            return current.countCards('he') > 0 && current != player
                        });
                    }
                    return event.num != 0
                },
                content: function () {
                    "step 0"
                    player.judge('zeron_sx', function (card) { return (get.color(card) == 'red') ? 1.5 : -0.5 }).judge2 = function (result) {
                        return result.bool;
                    };
                    "step 1"
                    if (result.judge > 0) {
                        var str
                        if (trigger.name == 'damage') {
                            if (!trigger.nature) {
                                str = '令一名角色受到来自' + get.translation(trigger.source) + '的' + get.cnNumber(trigger.num) + '点伤害'
                            } else {
                                str = '令一名角色受到来自' + get.translation(trigger.source) + '的' + get.cnNumber(trigger.num) + '点' + get.translation(trigger.nature) + '属性伤害'
                            }
                        } else if (trigger.name == 'recover') {
                            str = '令一名角色回复' + trigger.num + '点体力'
                        } else if (trigger.name == 'loseHp') {
                            str = '令一名角色失去' + trigger.num + '点体力'
                        } else if (trigger.name == 'gain') {
                            str = '令一名角色摸' + get.cnNumber(trigger.cards.length) + '张牌'
                        } else if (trigger.name == 'lose') {
                            str = '令一名角色弃置' + get.cnNumber(trigger.cards.length) + '张牌'
                        } else if (trigger.name == 'turnOver') {
                            str = '令一名角色翻面'
                        } else if (trigger.name = 'link') {
                            str = '令一名角色横置'
                        }
                        player.chooseTarget('请选择〖歃血〗的目标', 1, false, function (card, player, target) {
                            if (event.name == 'lose') {
                                return target.countCards('he') > 0 && target != player
                            } else if (event.name == 'recover') {
                                return target.hp != target.maxHp && target != player
                            }
                            return target != player
                        }).set('ai', function (target) {
                            var player = _status.event.player
                            var nature = _status.event.nature
                            var judge = _status.event.judge
                            var att = get.attitude(player, target)
                            if ((judge == 'recover')) {
                                return get.recoverEffect(target, player, player)
                            } else if (judge == 'gain') {
                                return att / Math.sqrt(2 + target.countCards('h'))
                            } else if (judge == 'damage') {
                                return get.damageEffect(target, target, player, nature)
                            } else if (judge == 'losHp') {
                                return get.effect(target, { name: 'losehp' }, player, player)
                            } else if (judge == 'lose') {
                                return get.effect(target, { name: 'guohe_copy2' }, player, player)
                            } else if (judge == 'link') {
                                return get.effect(target, { name: 'tiesuo' }, player, player)
                            } else if (judge == 'turnOver') {
                                if (target.hasSkillTag('noturn')) return 0;
                                return att * (target.isTurnedOver() ? 1 : -1)
                            }
                            return -att
                        }).set('prompt2', str).set('nature', trigger.nature).set('judge', trigger.name)
                    }
                    "step 2"
                    if (result.bool) {
                        event.target = result.targets[0]
                        if (trigger.name == 'damage') {
                            event.target.damage(trigger.num, trigger.nature, trigger.source)
                        } else if (trigger.name == 'lose') {
                            event.target.chooseToDiscard('he', trigger.cards.length, true)
                        } else if (trigger.name == 'gain') {
                            event.target.draw(trigger.cards.length)
                        } else if (trigger.name == 'link') {
                            event.target.link()
                        } else if (trigger.name == 'turnOver') {
                            event.target.turnOver()
                        }
                    }
                },
            },
            "fr_elin": {
                trigger: {
                    player: "judgeBegin",
                },
                forced: true,
                charlotte: true,
                silent: true,
                filter: function (event, player) {
                    return !event.directresult;
                },
                content: function () {
                    var tempcard = false, temp = -Infinity;
                    for (var i = 0; i < ui.cardPile.childElementCount; i++) {
                        var card = ui.cardPile.childNodes[i];
                        var temp2 = trigger.judge(card);
                        if (temp2 < temp) {
                            tempcard = card;
                            temp = temp2;
                        }
                    }
                    if (tempcard) trigger.directresult = tempcard;
                },
                ai: {
                    luckyStar: false,
                    BadLuck: true,
                },
                popup: false,
                sub: true,
            },
            "fr_zhufu": {
                unique: true,
                forced: true,
                mark: true,
                intro: {
                    content: function (event, player) {
                        if (player.hasSkill('yinhu_xr')) {
                            return "摸牌阶段，你多摸两张牌；出牌阶段，你可以额外使用一张【杀】且你的【杀】无距离限制；你的判定会朝着有利的方向进行。"
                        }
                        return "摸牌阶段，你多摸一张牌；出牌阶段，你可以额外使用一张【杀】且你的【杀】无距离限制；你的判定会朝着有利的方向进行。"
                    },
                },
                trigger: {
                    player: "phaseDrawBegin2",
                },
                preHidden: true,
                popup: false,
                filter: function (event, player) {
                    return !event.numFixed;
                },
                content: function () {
                    if (player.hasSkill('yinhu_xr')) {
                        trigger.num += 1
                    }
                    trigger.num += 1;
                },
                group: ["fr_zhufu_1", "fr_zhufu_2"],
                ai: {
                    threaten: 1.5,
                },
                subSkill: {
                    "1": {
                        forced: true,
                        unique: true,
                        mod: {
                            cardUsable: function (card, player, num) {
                                if (card.name == 'sha') return num + 1;
                            },
                            targetInRange: function (card) {
                                if (card.name == 'sha') return true;
                            },
                        },
                        sub: true,
                    },
                    '2': {
                        trigger: {
                            player: "judgeBegin",
                        },
                        forced: true,
                        charlotte: true,
                        silent: true,
                        filter: function (event, player) {
                            return !event.directresult;
                        },
                        content: function () {
                            var tempcard = false, temp = -Infinity;
                            for (var i = 0; i < ui.cardPile.childElementCount; i++) {
                                var card = ui.cardPile.childNodes[i];
                                var temp2 = trigger.judge(card);
                                if (temp2 > temp) {
                                    tempcard = card;
                                    temp = temp2;
                                }
                            }
                            if (tempcard) trigger.directresult = tempcard;
                        },
                        ai: {
                            luckyStar: true,
                        },
                        popup: false,
                    }
                },
            },
            "yinhu_xr": {
                derivation: "fr_zhufu",
                trigger: {
                    global: "roundStart",
                    player: "enterGame",
                },
                filter: function (event, player) {
                    return game.players.length > 1;
                },
                direct: true,
                content: function () {
                    "step 0"
                    player.chooseTarget([1, Math.floor(game.countPlayer() / 2)], "令至多" + get.translation(Math.floor(game.countPlayer() / 2)) + "名角色获得〖祝福〗", false)
                        .set('ai', function (target) {
                            return get.attitude(_status.event.player, target) * (1 + target.countCards('j'))
                        })
                    "step 1"
                    if (result.bool) {
                        for (var i = 0; i < result.targets.length; i++) {
                            result.targets[i].addTempSkill('fr_zhufu', { player: "phaseAfter" })
                        }
                    }
                },
                ai: {
                    threaten: 2.5,
                },
            },
            "yinhu_zd": {
                trigger: {
                    player: "damageBegin3",
                },
                filter: function (event, player) {
                    return game.hasPlayer(function (current) {
                        return current != player && current != event.source
                    })
                },
                content: function () {
                    "step 0"
                    var targets = game.filterPlayer();
                    targets.remove(player)
                    targets.remove(trigger.source)
                    targets.sortBySeat()
                    event.targets = targets
                    "step 1"
                    var num = trigger.num
                    if (event.targets) event.target = event.targets.shift()
                    event.target.chooseBool('是否替' + get.translation(player) + '承受来自' + get.translation(trigger.source) + '的' + trigger.num + '点' + (trigger.nature ? get.translation(trigger.nature) + '属性' : '') + '伤害')
                        .set('ai', function () {
                            var target = _status.event.target
                            var player = _status.event.player
                            return get.attitude(player, target) > 0 && player.hp + player.hujia > num
                        }).set('target', player)
                    "step 2"
                    if (result.bool) {
                        event.target.popup('代替');
                        game.log(event.target, '代替', player, '成为了伤害的目标')
                        trigger.player = event.target
                        event.finish()
                    } else {
                        event.target.popup('不代替');
                        game.delay(2)
                        if (event.targets.length != 0) {
                            event.goto(1)
                        } else {
                            event.finish()
                        }
                    }
                },
            },
            "yinhu_sp": {
                trigger: {
                    source: "damageBefore",
                },
                forced: true,
                direct: true,
                filter: function (event, player) {
                    return event.player.hujia > 0
                },
                content: function () {
                    trigger.player.changeHujia(-trigger.player.hujia)
                    trigger.player.draw(trigger.player.hujia)
                },
                group: ["yinhu_sp_1", "yinhu_sp_2"],
                subSkill: {
                    "1": {
                        mod: {
                            targetEnabled: function (card, player, target) {
                                if (get.type(card) == 'delay') {
                                    return false;
                                }
                            },
                        },
                        trigger: {
                            player: ["phaseZhunbeiBefore", "phaseJieshuBefore"],
                        },
                        forced: true,
                        content: function () {
                            trigger.cancel();
                            game.log(player, '跳过了', event.triggername == 'phaseZhunbeiBefore' ? '准备阶段' : '结束阶段');
                        },
                        sub: true,
                    },
                    "2": {
                        popup: false,
                        trigger: {
                            player: "phaseJudgeBefore",
                        },
                        forced: true,
                        content: function () {
                            trigger.cancel();
                            game.log(player, '跳过了判定阶段');
                        },
                        sub: true,
                    },
                },
            },
            "dragon_hy": {
                trigger: {
                    source: "damageEnd",
                },
                filter: function (event, player) {
                    return event.player != player
                },
                forced: true,
                content: function () {
                    "step 0"
                    trigger.player.addSkill('dragon_hy_damage')
                    trigger.player.storage.dragon_hy_damage += 1
                    trigger.player.loseMaxHp()
                    "step 1"
                    trigger.player.updateMark('dragon_hy_damage')
                },
                subSkill: {
                    damage: {
                        unique: true,
                        init: function (player) {
                            if (!player.storage.dragon_hy_damage) player.storage.dragon_hy_damage = 0;
                        },
                        filter: function (event, player) {
                            return player.storage.dragon_hy_damage
                        },
                        mark: true,
                        intro: {
                            content: "结束阶段，你选择一项：1.弃置X张牌；2.受到X点火焰伤害（X为你的“黑焰”标记数）。",
                        },
                        forced: true,
                        trigger: {
                            player: "phaseUseEnd",
                        },
                        content: function () {
                            "step 0"
                            player.chooseToDiscard(player.storage.dragon_hy_damage).set('ai', function (card) {
                                if (card.name == 'tao') return -10;
                                if (card.name == 'jiu' && _status.event.player.hp == 1) return -10;
                                return get.unuseful(card) + 2.5 * (5 - get.owner(card).hp);
                            });
                            "step 1"
                            if (result.bool == false) {
                                player.damage(player.storage.dragon_hy_damage, 'fire', 'nosource');
                            }
                            player.gainMaxHp(player.storage.dragon_hy_damage)
                            player.storage.dragon_hy_damage = 0
                            player.removeSkill('dragon_hy_damage')
                        },
                        sub: true,
                    },
                },
            },
            "dragon_ly": {
                trigger: {
                    player: "damageBegin4",
                },
                filter: function (event) {
                    return event.nature == 'fire' || event.nature == 'thunder';
                },
                forced: true,
                content: function () {
                    trigger.cancel();
                },
                group: "dragon_ly_1",
                subSkill: {
                    "1": {
                        trigger: {
                            player: "damageEnd",
                        },
                        forced: true,
                        filter: function (event, player) {
                            return event.num > 0;
                        },
                        content: function () {
                            var cards = [];
                            while (cards.length < trigger.num) {
                                var card = get.cardPile(function (card) {
                                    return get.tag(card, 'damage') && !cards.contains(card)
                                });
                                if (card) cards.push(card);
                                else break;
                            }
                            if (cards.length) player.gain(cards, 'gain2').gaintag.add('dragon_hn')
                        },
                        sub: true,
                    },
                },
                ai: {
                    nofire: true,
                    maixie: true,
                    nothunder: true,
                    effect: {
                        target: function (card, player, target, current) {
                            if (get.tag(card, 'fireDamage')) return 'zerotarget';
                            if (get.tag(card, 'thunderDamage')) return 'zerotarget';
                            if (card.name == 'tiesuo') return 'zeroplayertarget';
                        },
                    },
                },
            },
            "dragon_hn": {
                trigger: {
                    player: "useCard",
                },
                filter: function (event, player) {
                    return event.player.hasHistory('lose', function (evt) {
                        if (evt.getParent() != event) return false;
                        for (var i in evt.gaintag_map) {
                            if (evt.gaintag_map[i].contains('dragon_hn')) return true;
                        }
                        return false;
                    });
                },
                mark: true,
                intro: {
                    content: "你使用“魂怒”牌：①不可被响应、②无视防具、③不计入使用次数、④不计入手牌上限、⑤不可被其他角色弃置、⑥无距离限制。",
                },
                forced: true,
                content: function () {
                    if (trigger.card.name == 'sha') {
                        player.getStat().card.sha--;
                    }
                    player.addTempSkill('unequip', { player: 'useCardAfter' })
                    trigger.directHit.addArray(game.players);
                },
                ai: {
                    threaten: 2,
                },
                group: "dragon_hn_ig",
                subSkill: {
                    ig: {
                        mod: {
                            ignoredHandcard: function (card, player) {
                                if (card.hasGaintag('dragon_hn')) {
                                    return true;
                                }
                            },
                            targetInRange: function (card) {
                                if (!card.cards) return;
                                for (var i of card.cards) {
                                    if (i.hasGaintag('dragon_hn')) return true;
                                }
                            },
                            canBeDiscarded: function (card) {
                                if (card.hasGaintag('dragon_hn')) return false;
                            },
                            cardDiscardable: function (card, player, name) {
                                if (name == 'phaseDiscard' && card.hasGaintag('dragon_hn')) return false;
                            },
                            aiOrder: function (player, card, num) {
                                if (_status.currentPhase == player) {
                                    if (get.itemtype(card) == 'card' && card.hasGaintag('dragon_hn')) return num + 1;
                                } else {
                                    if (get.itemtype(card) == 'card' && card.hasGaintag('dragon_hn')) return num - 1;
                                }
                            },
                        },
                        sub: true,
                    },
                },
            },
            "hars_sj": {
                audio: "ext:福瑞扩展:2",
                enable: "phaseUse",
                usable: 1,
                filterCard: true,
                lose: false,
                discard: false,
                delay: false,
                selectCard: function () {
                    var player = _status.event.player
                    return Math.floor(player.countCards('h') / 2)
                },
                filter: function (event, player) {
                    if (Math.floor(player.countCards('h') / 2) <= 0) return false
                    if (!player.storage.hars_sj) return true;
                    return game.hasPlayer(function (current) {
                        return current != player && !player.storage.hars_sj.contains(current);
                    });
                },
                init: function (player) {
                    if (!player.storage.hars_sj) player.storage.hars_sj = [];
                },
                filterTarget: function (card, player, target) {
                    return target != player && (!player.storage.hars_sj || !player.storage.hars_sj.contains(target));
                },
                content: function () {
                    target.gain(cards, player, 'giveAuto')
                    target.addTempSkill("hars_fs", { player: "phaseEnd" });
                    if (!player.storage.hars_sj) player.storage.hars_sj = [];
                    player.storage.hars_sj[0] = target;
                    player.markSkill('hars_sj');
                },
                intro: {
                    content: "上回合已对$发动过〖神降〗",
                },
                ai: {
                    order: 1,
                    result: {
                        target: function (player, target) {
                            return -1;
                        },
                    },
                },
                group: "hars_sj_fs",
                subSkill: {
                    fs: {
                        forced: true,
                        trigger: {
                            global: "phaseBeginStart",
                        },
                        filter: function (event, player) {
                            return player != event.player && !event.player._trueMe && event.player.hasSkill("hars_fs");
                        },
                        logTarget: "player",
                        skillAnimation: true,
                        animationColor: "key",
                        content: function () {
                            trigger.player._trueMe = player;
                            game.addGlobalSkill('autoswap');
                            if (trigger.player == game.me) {
                                game.notMe = true;
                                if (!_status.auto) ui.click.auto();
                            }
                        },
                        sub: true,
                    },
                },
            },
            "hars_fs": {
                trigger: {
                    player: ["phaseAfter", "dieAfter"],
                },
                mark: true,
                intro: {
                    content: "已被选为〖神降〗的对象",
                },
                lastDo: true,
                charlotte: true,
                forceDie: true,
                forced: true,
                silent: true,
                content: function () {
                    player.removeSkill('hars_fs');
                },
                onremove: function (player) {
                    if (player == game.me) {
                        if (!game.notMe) game.swapPlayerAuto(player._trueMe)
                        else delete game.notMe;
                        if (_status.auto) ui.click.auto();
                    }
                    delete player._trueMe;
                },
                popup: false,
            },
            "sayisu_fp": {
                trigger: {
                    player: "damageEnd",
                    source: "damageEnd",
                },
                init: function (player) {
                    if (!player.storage.sayisu_fp) player.storage.sayisu_fp = [[], []];
                },
                mark: true,
                direct: true,
                content: function () {
                    "step 0"
                    player.draw(trigger.num)
                    if (game.hasPlayer(function (current) {
                        return !player.storage.sayisu_fp[1].contains(current);
                    })) {
                        player.chooseTarget(get.prompt2('sayisu_fp'), function (card, player, target) {
                            return player != target && (!player.storage.sayisu_fp[1] || !player.storage.sayisu_fp[1].contains(target))
                        }).set('ai', function (target) { return Math.random() })
                    } else {
                        event.finish()
                    }
                    "step 1"
                    if (result.bool) {
                        event.target = result.targets[0]
                        player.logSkill(event.name, event.target)
                        if (!player.storage.sayisu_fp) player.storage.sayisu_fp = [[], []];
                        if (player.storage.sayisu_fp[0].contains(event.target)) {
                            player.chooseBool("是否对" + get.translation(event.target) + "造成一点伤害").set('ai', function () {
                                var player = _status.event.player
                                var target = _status.event.target
                                return get.attitude(player, target) < 0
                            }).set('target', event.target)
                        } else {
                            event.goto(3)
                        }
                    } else {
                        event.finish()
                    }
                    "step 2"
                    if (result.bool) {
                        event.target.damage(1, player)
                        player.storage.sayisu_fp[1].push(event.target);
                        player.storage.sayisu_fp[1].sortBySeat();
                        event.finish()
                    }
                    "step 3"
                    player.chooseCard(1, '选择交给' + get.translation(event.target) + '的牌', true).set('ai', function (card) {
                        return 100 - get.value(card)
                    })
                    "step 4"
                    if (result.bool) {
                        event.target.gain(result.cards, player, 'give')
                    }
                    if (!player.storage.sayisu_fp[0].contains(event.target)) {
                        player.draw(2)
                        player.storage.sayisu_fp[0].push(event.target);
                        player.storage.sayisu_fp[0].sortBySeat();
                    }
                },
                intro: {
                    markcount: function (storage) {
                        return 0;
                    },
                    mark: function (dialog, storage, player) {
                        if (!storage) return;
                        dialog.addText('已发动目标：');
                        dialog.addText(get.translation(storage[0]));
                        dialog.addText('不可选目标：');
                        dialog.addText(get.translation(storage[1]));
                    },
                    onunmark: function (storage, player) {
                        player.storage.edmond_jz = [[], []];
                    },
                },
            },
            "yifeng_ml": {
                charlotte: true,
                trigger: {
                    player: "damageEnd",
                },
                usable: 1,
                firstDo: true,
                forced: true,
                filter: function (event, player) {
                    var history = event.player.getHistory('damage', null, event), num = 0;
                    for (var i of history) num += i.num;
                    return num > 1 && (num - event.num) < 2;
                },
                content: function () {
                    player.recover();
                    player.draw()
                },
            },
            "terz_yz": {
                locked: true,
                trigger: {
                    player: "damageEnd",
                },
                firstDo: true,
                filter: function (event, player) {
                    return event.source.isAlive()
                },
                content: function () {
                    "step 0"
                    event.targets = game.filterPlayer()
                    event.targets.remove(player)
                    event.targets.remove(trigger.source)
                    event.targets.sortBySeat()
                    "step 1"
                    while (event.targets) {
                        var target = event.targets.shift()
                        target.fakeDamage(trigger.num, trigger.nature, trigger.source)
                    }
                },
            },
            "terz_sp": {
                audio: "ext:福瑞拓展:2",
                trigger: {
                    global: "phaseBefore",
                    player: "enterGame",
                },
                forced: true,
                filter: function (event, player) {
                    return event.name != 'phase' || game.phaseNumber == 0;
                },
                derivation: "terz_ly",
                logTarget: () => game.filterPlayer().sortBySeat(),
                content: function () {
                    'step 0'
                    game.countPlayer(function (current) {
                        current.addSkill('terz_ly');
                        current.markSkill('terz_ly_mark')
                    });
                    game.log(player, '令所有其他角色获得了技能', '#g〖流域〗')
                    game.delayx();
                    'step 1'
                    player.chooseTarget('是否减1点体力上限，并令一名其他角色获得技能〖复攥〗？', lib.filter.notMe).set('ai', function (target) {
                        var player = _status.event.player;
                        if (player.hasUnknown() && !target.isZhu) return 0;
                        if (player.getEnemies().contains(target)) return 0;
                        return get.attitude(player, target);
                    });
                    'step 2'
                    if (result.bool) {
                        player.loseMaxHp();
                        var target = result.targets[0];
                        player.line(target, 'fire');
                        target.addSkillLog('terz_fz');
                        game.delayx();
                    }
                },
            },
            "terz_ly": {
                audio: "ext:福瑞拓展:2",
                enable: "phaseUse",
                usable: 1,
                unique: true,
                zhuanhuanji: true,
                filter: function (event, player) {
                    if (!player.storage.terz_ly && player.countCards('he') == 0) return false
                    return true
                },
                content: function () {
                    'step 0'
                    if (player.storage.terz_ly) {
                        player.draw()
                    } else {
                        player.chooseToDiscard('he', true)
                    }
                    "step 1"
                    if (!player.storage.terz_ly) player.storage.terz_ly = false
                    player.storage.terz_ly = !player.storage.terz_ly
                },
                group: ["terz_ly_target"],
                ai: {
                    order: 8,
                    result: {
                        player: function () {
                            return Math.random() * 2 - 1
                        },
                    },
                },
                subSkill: {
                    target: {
                        trigger: {
                            player: ["damageAfter", "phaseEnd"],
                            source: "damageAfter",
                        },
                        init: function (player) {
                            player.storage.terz_ly = false;
                        },
                        charlotte: true,
                        unique: true,
                        zhuanhuanji: true,
                        forced: true,
                        logTarget: "player",
                        mod: {
                            targetEnabled: function (card, player, target, now) {
                                if (player.storage.terz_ly == target.storage.terz_ly && player != target) return false;
                            },
                        },
                        content: function () {
                            'step 0'
                            if (player.storage.terz_ly) {
                                player.draw()
                            } else {
                                player.chooseToDiscard('he', true)
                            }
                            "step 1"
                            if (!player.storage.terz_ly) player.storage.terz_ly = false
                            player.storage.terz_ly = !player.storage.terz_ly
                        },
                        sub: true,
                    },
                },
            },
            "terz_fz": {
                audio: "ext:福瑞拓展:2",
                enable: "phaseUse",
                usable: 1,
                filter: function (event, player) {
                    return game.hasPlayer(function (current) {
                        return current.hasSkill('terz_ly')
                    })
                },
                filterTarget: function (card, player, target) {
                    return target.hasSkill('terz_ly')
                },
                content: function () {
                    'step 0'
                    var skill = 'terz_ly'
                    if (!target.storage.terz_ly) target.storage.terz_ly = false
                    target.storage.terz_ly = !target.storage.terz_ly
                    target.popup(skill, 'wood');
                    game.log(target, '的', '#g【' + get.translation(skill) + '】', '发生了状态变更');
                    game.delayx();
                },
                ai: {
                    order: 8,
                    result: {
                        target: function (player, target) {
                            return target.storage.terz_ly ? -1 : 1;
                        },
                    },
                },
                group: "terz_fz_damage",
                subSkill: {
                    damage: {
                        audio: "terz_fz",
                        trigger: {
                            player: ["damageEnd"],
                            source: "damageEnd",
                        },
                        direct: true,
                        filter: function (event, player) {
                            return game.hasPlayer(function (current) {
                                return current.hasSkill('terz_ly')
                            })
                        },
                        content: function () {
                            'step 0'
                            player.chooseTarget(lib.skill.terz_fz.filterTarget, get.prompt('terz_fz'), '变更一名角色的〖流域〗的状态').set('ai', function (target) {
                                var player = _status.event.player;
                                return get.effect(target, 'terz_fz', player, player);
                            });
                            'step 1'
                            if (result.bool) {
                                var target = result.targets[0];
                                player.logSkill('terz_fz', target);
                                var next = game.createEvent('terz_fz');
                                next.player = player;
                                next.target = target;
                                next.setContent(lib.skill.terz_fz.content);
                            }
                        },
                        sub: true,
                    },
                },
            },
            "terz_ts": {
                trigger: {
                    global: "damageBegin4",
                },
                forced: true,
                firstDo: true,
                popup: false,
                filter: function (event, player, storage) {
                    if (!event.player.hasSkill('terz_ly') || !event.player.hasSkill('terz_ly')) return false
                    if (!event.source || (event.source == event.player)) return false
                    return !(event.player.storage.terz_ly == event.source.storage.terz_ly)
                },
                content: function () {
                    if (trigger.player.storage.terz_ly == false && trigger.source.storage.terz_ly == true) {
                        trigger.source.gainPlayerCard(1, 'he', trigger.player, true)
                        player.draw()
                    } else if (trigger.player.storage.terz_ly == true && trigger.source.storage.terz_ly == false) {
                        trigger.player.gainPlayerCard(1, 'he', trigger.source, true)
                        player.draw()
                    }
                },
            },
            "delta_sz": {
                trigger: {
                    source: "damageBegin4",
                },
                check: function (event, player) {
                    return player.hp > 2 && event.player.hp > event.num && !event.player.hasSkillTag('filterDamage', null, {
                        player: player,
                        card: event.card,
                    }) && get.attitude(player, event.player) < 0;
                },
                filter: function (event, player) {
                    return event.player != player
                },
                content: function () {
                    "step 0"
                    player.loseHp()
                    player.draw(2)
                    "step 1"
                    trigger.num = trigger.num * 2;
                },
                group: "delta_sz_hf",
                subSkill: {
                    hf: {
                        trigger: {
                            player: "damageBegin4",
                        },
                        check: function () {
                            return true
                        },
                        content: function () {
                            "step 0"
                            player.loseHp()
                            player.draw(2)
                            "step 1"
                            trigger.num = Math.floor(trigger.num / 2)
                        },
                        sub: true,
                    },
                },
            },
            ybni: {
                forced: true,
                mod: {
                    maxHandcard: function (player, num) {
                        return num + 99;
                    },
                },
                hideCharacter: function (name, player) {
                    var info = lib.character[name];
                    if (!info) return;
                    if (player.name1 != name && player.name2 != name) return;
                    var skills = info[3].slice(0);
                    if (name == player.name1) {
                        if (player.classList.contains(_status.video ? 'unseen_v' : 'unseen')) return;
                        player.classList.add(_status.video ? 'unseen_v' : 'unseen');
                        player.name = 'unknown';
                        if (!player.node.name_seat && !_status.video) {
                            player.node.name_seat = ui.create.div('.name.name_seat', get.verticalStr(get.translation(player.name)), player);
                            player.node.name_seat.dataset.nature = get.groupnature(player.group);
                        };
                        player.sex = 'male';
                    } else {
                        if (player.classList.contains(_status.video ? 'unseen2_v' : 'unseen2')) return;
                        player.classList.add(_status.video ? 'unseen2_v' : 'unseen2');
                    };
                    if (!player.hiddenSkills) player.hiddenSkills = [];
                    game.log(game.me.hiddenSkills);
                    player.removeSkill(skills);
                    player.hiddenSkills.addArray(skills);
                    player.storage.nohp = true;
                    player.addSkill('g_hidden_ai');
                    player.storage.rawHp = player.hp;
                    player.storage.rawMaxHp = player.maxHp;
                    player.hp = 1;
                    player.maxHp = 1;
                    player.node.hp.hide();
                    player.update();
                },
            },
            "jet_ww": {
                trigger: {
                    global: "useCardToPlayered",
                },
                logTarget: "target",
                direct: true,
                filter: function (event, player) {
                    return event.target != player && event.player != player && event.target != event.player && event.card.name == 'sha' && event.player.countCards('he') > 0
                },
                content: function () {
                    "step 0"
                    trigger.player.chooseCard('〖危望〗：是否交给' + get.translation(player) + '一张牌').set('ai', function (card) {
                        var source = _status.event.source
                        var player = _status.event.target
                        var att = get.attitude(source, player)
                        if (att < 0 && _status.currentPhase == player && (player.hasSkill('jet_cl') || player.hasSkill('reweimu'))) {
                            return -1
                        }
                        if (att > 0) return 9 - get.value(card)
                        return 5 - get.value(card)
                    }).set('target', player).set('source', trigger.player)
                    "step 1"
                    if (result.cards) player.gain(result.cards, trigger.player, 'giveAuto')
                    if (result.bool) {
                        player.chooseControl('选项一', '选项二').set('choiceList', ['令此【杀】不可被响应', '你成为此杀的目标'])
                            .set('ai', function () {
                                var player = _status.event.player
                                var target = _status.event.target
                                var target_health = target.hp + target.countCards('hs', 'tao') + target.countCards('hs', 'jiu')
                                var player_health = player.hp + player.countCards('hs', 'tao') + player.countCards('hs', 'jiu')
                                var att = get.attitude(player, target)
                                if (_status.currentPhase == player && (player.hasSkill('jet_cl') || player.hasSkill('reweimu'))) {
                                    return '选项二'
                                }
                                if (att < 0) {
                                    return '选项一'
                                } else if (att > 0 && player.countCards('hs', 'shan') > 0) {
                                    return '选项二'
                                } else if (att > 0 && target_health == 1 && player_health > 1) {
                                    return '选项二'
                                } else if (att > 0 && target.countCards('hs', 'shan') > 0 && player_health > 2 && player.countCards('j') == 0) {
                                    return '选项二'
                                }
                                return '选项一'
                            }).set('target', trigger.target)
                    } else {
                        event.finish()
                    }
                    "step 2"
                    if (result.control == '选项一') {
                        trigger.directHit.addArray(game.filterPlayer((current) => current != player))
                    } else {
                        trigger.targets.push(player)
                        game.log(player, '成为了', trigger.card, '的额外目标')
                    }
                },
            },
            "jet_fy": {
                trigger: {
                    global: "roundStart",
                },
                init: function (player) {
                },
                mark: true,
                intro: {
                    content: "每轮开始时你将手牌调整至体力上限然后隐匿。",
                },
                forced: true,
                content: function () {
                    "step 0"
                    var num = player.maxHp - player.countCards('h')
                    if (num > 0) {
                        player.draw(num)
                    } else if (num < 0) {
                        player.chooseToDiscard(-num, 'h', true)
                    }
                    "step 1"
                    player.unmarkSkill('jet_fy_mark')
                    lib.skill.ybni.hideCharacter(player.name1, player);
                    if (player.name2) lib.skill.ybni.hideCharacter(player.name2, player);
                    player.addTempSkill("ybni", { player: "showCharacterAfter" });
                },
            },
            "jet_sl": {
                trigger: {
                    player: "showCharacterAfter",
                },
                hiddenSkill: true,
                filter: function (event, player) {
                    return event.toShow.contains('fr_jet')
                },
                direct: true,
                init: function (player) {
                    if (!player.storage.jet_sl) player.storage.jet_sl = false;
                },
                derivation: "luanwu",
                content: function () {
                    "step 0"
                    player.logSkill('jet_sl')
                    if (player.storage.jet_sl == true) {
                        var list = [];
                        for (var name of lib.inpile) {
                            var type = get.type(name);
                            if (type != 'trick') continue;
                            var card = { name: name, isCard: true };
                            if (!get.tag(card, 'damage') && player.hasUseTarget(card)) {
                                list.push([type, '', name]);
                            }
                        }
                        player.chooseButton(['〖始乱〗：选择要使用的牌', [list, 'vcard']], function (button) {
                            return _status.event.player.getUseValue({ name: button.link[2], nature: button.link[3] });
                        }, function (button) {
                            return _status.event.player.hasUseTarget({ name: button.link[2], nature: button.link[3] });
                        });
                    } else {
                        player.storage.jet_sl = true
                        var next = game.createEvent('luanwu', false);
                        next.player = player;
                        next.target = game.filterPlayer((current) => current != player);
                        next.setContent(lib.skill.luanwu.content);
                        event.finish()
                    }
                    "step 1"
                    if (result.bool) player.chooseUseTarget(true, { name: result.links[0][2], isCard: true, nature: result.links[0][3] })
                },
            },
            "jet_cl": {
                mod: {
                    targetEnabled: function (card) {
                        if ((get.type2(card) == 'trick' && get.color(card) == 'black') || get.type(card) == 'delay') return false;
                    },
                },
                trigger: {
                    player: "damageBegin2",
                },
                forced: true,
                filter: function (event, player) {
                    return player == _status.currentPhase;
                },
                content: function () {
                    trigger.cancel();
                    var num = trigger.num;
                    player.draw(2 * num);
                },
                ai: {
                    effect: {
                        target: function (card, player, target) {
                            if (target == _status.currentPhase && get.tag(card, 'damage')) return [0, 1];
                        },
                    },
                },
            },
            "nier_zj": {
                trigger: {
                    global: "phaseBegin",
                    player: ["gainEnd", "loseEnd"],
                },
                init: function (player, storage) {
                    player.storage.nier_zj = [0]
                },
                mark: true,
                intro: {
                    markcount: function () {
                        return 0
                    },
                    mark: function (dialog, storage, player) {
                        if (!storage) return;
                        var num = Math.abs(player.hp - player.countCards('h'))
                        dialog.addText('已记录的值：');
                        dialog.addText(storage);
                        dialog.addText('当前的值：');
                        dialog.addText('' + num);
                        var str
                        if ((Math.abs(player.hp - player.countCards('h')) % 2) == 0 && Math.abs(player.hp - player.countCards('h')) != 0) {
                            str = '你可以将一张牌当任意单体普通锦囊牌使用。'
                        } else if ((Math.abs(player.hp - player.countCards('h')) % 2) != 0) {
                            str = '你可以将一张牌当任意基本牌使用或打出。'
                        } else {
                            str = '已记录过此数值'
                        }
                        dialog.addText(str)
                    },
                },
                direct: true,
                content: function () {
                    var num = Math.abs(player.hp - player.countCards('h'))
                    if (player.storage.nier_zj.contains(num)) {
                        player.removeSkill('nier_zj_odd')
                        player.removeSkill('nier_zj_even')
                        event.finish()
                        return
                    }
                    if ((num % 2) == 0 && num != 0) {
                        player.addSkill('nier_zj_even')
                        player.removeSkill('nier_zj_odd')
                        if (!player.storage.nier_zj.contains(num)) player.storage.nier_zj.push(num)
                    } else if ((num % 2) != 0) {
                        player.addSkill('nier_zj_odd')
                        player.removeSkill('nier_zj_even')
                        if (!player.storage.nier_zj.contains(num)) player.storage.nier_zj.push(num)
                    }
                },
                group: "nier_zj_clean",
                subSkill: {
                    clean: {
                        trigger: {
                            global: ["phaseBefore", "phaseAfter"],
                        },
                        forced: true,
                        charlotte: true,
                        content: function () {
                            player.storage.nier_zj = [0]
                        },
                        sub: true,
                    },
                    even: {
                        direct: true,
                        enable: "phaseUse",
                        filter: function (event, player) {
                            return player.countCards('hes');
                        },
                        chooseButton: {
                            dialog: function (event, player) {
                                var cards = player.getCards('hes');
                                var list = [];
                                for (var i of lib.inpile) {
                                    var card = { name: i, isCard: true };
                                    var info = get.info(card, false);
                                    if ((!info.notarget && (info.toself || info.singleCard || !info.selectTarget || info.selectTarget == 1)) && get.type(i) == 'trick' && event.filterCard({
                                        name: i,
                                        cards: cards,
                                    }, player, event)) {
                                        list.push(['锦囊', '', i]);
                                    }
                                }
                                return ui.create.dialog('智解', [list, 'vcard']);
                            },
                            filter: function (button, player) {
                                return lib.filter.filterCard({ name: button.link[2] }, player, _status.event.getParent());
                            },
                            check: function (button) {
                                var player = _status.event.player;
                                return player.getUseValue({ name: button.link[2] });
                            },
                            backup: function (links, player) {
                                return {
                                    filterCard: true,
                                    selectCard: 1,
                                    check: function (card) {
                                        if (ui.selected.cards.length) return 0;
                                        return 7 - get.value(card);
                                    },
                                    position: 'hes',
                                    popname: true,
                                    viewAs: { name: links[0][2] },
                                }
                            },
                            prompt: function (links, player) {
                                return '将一张牌当作' + get.translation(links[0][2]) + '使用';
                            },
                        },
                        ai: {
                            order: 1,
                            result: {
                                player: 1,
                            },
                        },
                        sub: true,
                    },
                    odd: {
                        direct: true,
                        enable: ["chooseToUse", "chooseToRespond"],
                        hiddenCard: function (player, name) {
                            if (!['sha', 'shan', 'tao', 'jiu'].contains(name)) return false;
                            return player.countCards('hes') > 0;
                        },
                        filter: function (event, player) {
                            if (event.filterCard({ name: 'sha' }, player, event) ||
                                event.filterCard({ name: 'shan' }, player, event) ||
                                event.filterCard({ name: 'jiu' }, player, event) ||
                                event.filterCard({ name: 'tao' }, player, event)) {
                                return player.countCards('hes') > 0;
                            }
                            return false;
                        },
                        chooseButton: {
                            dialog: function (event, player) {
                                var list = [];
                                if (event.filterCard({ name: 'sha' }, player, event)) {
                                    list.push(['基本', '', 'sha']);
                                    for (var j of lib.inpile_nature) list.push(['基本', '', 'sha', j]);
                                }
                                if (event.filterCard({ name: 'shan' }, player, event)) {
                                    list.push(['基本', '', 'shan']);
                                }
                                if (event.filterCard({ name: 'tao' }, player, event)) {
                                    list.push(['基本', '', 'tao']);
                                }
                                if (event.filterCard({ name: 'jiu' }, player, event)) {
                                    list.push(['基本', '', 'jiu']);
                                }
                                return ui.create.dialog('智解', [list, 'vcard'], 'hidden');
                            },
                            check: function (button) {
                                var player = _status.event.player;
                                var card = { name: button.link[2], nature: button.link[3] };
                                if (_status.event.getParent().type != 'phase' || game.hasPlayer(function (current) {
                                    return player.canUse(card, current) && get.effect(current, card, player, player) > 0;
                                })) {
                                    switch (button.link[2]) {
                                        case 'tao': case 'shan': return 5;
                                        case 'jiu': {
                                            if (player.countCards('hes') > 0) return 3;
                                        };
                                        case 'sha':
                                            if (button.link[3] == 'fire') return 2.95;
                                            else if (button.link[3] == 'thunder' || button.link[3] == 'ice') return 2.92;
                                            else return 2.9;
                                    }
                                }
                                return 0;
                            },
                            backup: function (links, player) {
                                return {
                                    filterCard: function (card, player, event) {
                                        if (ui.selected.cards.length) return get.color(card, player) != get.color(ui.selected.cards[0], player);
                                        return true
                                    },
                                    selectCard: 1,
                                    check: function (card, player, target) {
                                        if (!ui.selected.cards.length) return 6;
                                        else return 6 - get.value(card);
                                    },
                                    viewAs: { name: links[0][2], nature: links[0][3] },
                                    position: 'hes',
                                    popname: true,
                                }
                            },
                            prompt: function (links, player) {
                                return '将一张牌当做' + get.translation(links[0][3] || '') + get.translation(links[0][2]) + '使用或打出';
                            },
                        },
                        ai: {
                            order: function () {
                                var player = _status.event.player;
                                var event = _status.event;
                                if (event.filterCard({ name: 'jiu' }, player, event) && get.effect(player, { name: 'jiu' }) > 0) {
                                    return 3.3;
                                }
                                return 3.1;
                            },
                            skillTagFilter: function (player, tag, arg) {
                                if (tag == 'fireAttack') return true;
                                return player.countCards('hes') > 0;
                            },
                            result: {
                                player: 1,
                            },
                            respondSha: true,
                            respondShan: true,
                            fireAttack: true,
                        },
                        sub: true,
                    },
                },
            },
            "paers_fy": {
                forced: true,
                trigger: {
                    player: "loseAfter",
                },
                mark: true,
                intro: {
                    markcount: function () {
                        return 0
                    },
                    content: function (storage, player, skill) {
                        if (player.storage.diy_jiqiao == 0) return '将一张牌置于牌堆顶'
                        if (player.storage.diy_jiqiao == 1) return '从牌堆底摸一张牌'
                        if (player.storage.diy_jiqiao == 2) return '获得一名其他角色的一张牌'
                    },
                },
                filter: function (event, player) {
                    var bool = false
                    for (var i = 0; i < event.cards.length; i++) {
                        if (event.cards[i].original == 'h') bool = true
                    }
                    return event.getParent().name != 'useCard' && event.getParent().name != 'paers_fy' && player.countCards('h') > 0 && bool
                },
                init: function (player, storage) {
                    player.storage.diy_jiqiao = 0
                },
                content: function () {
                    "step 0"
                    player.storage.diy_jiqiao += 1
                    if (player.storage.diy_jiqiao == 1) {
                        player.chooseCard('he', '将一张牌置于牌堆顶', true).set('ai', function (card) {
                            return get.value(card)
                        })
                    } else if (player.storage.diy_jiqiao == 2) {
                        player.draw('bottom')
                        event.finish()
                    } else if (player.storage.diy_jiqiao == 3 && game.hasPlayer(function (current) { return current != player && current.countCards('he') > 0 })) {
                        event.goto(2)
                    } else {
                        event.goto(4)
                    }
                    "step 1"
                    player.lose(result.cards, ui.cardPile, 'visible', 'insert');
                    player.$throw(result.cards[0], 1000);
                    game.log(player, '将', result.cards, '置于牌堆顶');
                    event.finish()
                    "step 2"
                    player.chooseTarget('获得一名角色的一张牌', true, function (card, player, target) {
                        return player != target && target.countCards('he') > 0
                    }).set('ai', function (target) {
                        var player = _status.event.player
                        return -get.attitude(player, target)
                    })
                    "step 3"
                    player.gainPlayerCard(1, 'he', result.targets[0], true)
                    'step 4'
                    player.storage.diy_jiqiao = 0
                    player.chooseUseTarget('###是否发动【愤延】？###视为使用一张没有距离限制的【杀】，然后失去1点体力。', { name: 'sha' }, false, 'nodistance').set('ai', function (player) {
                        var player = _status.event.player
                        return player.hp > 1
                    })
                    "step 5"
                    if (result.bool) {
                        player.loseHp()
                    }
                },
            },
            "pares_xh": {
                forced: true,
                trigger: {
                    player: "damageEnd",
                    source: "damageEnd",
                },
                filter: function (event, player) {
                    return player.hp != player.countCards('h')
                },
                content: function () {
                    var num = player.hp - player.countCards('h')
                    if (num > 0) {
                        player.draw(num)
                    } else {
                        player.chooseToDiscard('h', -num, true)
                        player.draw()
                    }
                },
            },
            "slen_xj": {
                enable: "phaseUse",
                filterTarget: function (card, player, target) {
                    return player != target && target.countCards('h') > 0
                },
                position: "h",
                usable: 1,
                discard: false,
                lose: false,
                delay: false,
                selectCard: [1, 2],
                filterCard: function (card) {
                    if (ui.selected.cards.length) {
                        return get.number(card) != get.number(ui.selected.cards[0]);
                    }
                    return true;
                },
                check: function (card) {
                    return 5 - get.value(card)
                },
                filter: function (event, player) {
                    return player.countCards('h') > 0
                },
                content: function () {
                    "step 0"
                    target.gain(cards, player, 'giveAuto').gaintag.add('slen_xj')
                    "step 1"
                    var cardx = target.getCards('h')
                    var listbig = []
                    var listsmall = []
                    var listmiddle = []
                    for (var i = 0; i < cardx.length; i++) {
                        if (cards.length == 1) {
                            if (get.number(cardx[i]) >= get.number(cards[0])) listbig.push(cardx[i])
                            if (get.number(cardx[i]) <= get.number(cards[0])) listsmall.push(cardx[i])
                        } else {
                            if (get.number(cards[0]) > get.number(cards[1])) {
                                if ((get.number(cardx[i]) <= get.number(cards[0])) && (get.number(cardx[i]) >= get.number(cards[1]))) listmiddle.push(cardx[i])
                                event.small = get.number(cards[1])
                                event.big = get.number(cards[0])
                            } else {
                                if ((get.number(cardx[i]) <= get.number(cards[1])) && (get.number(cardx[i]) >= get.number(cards[0]))) listmiddle.push(cardx[i])
                                event.small = get.number(cards[0])
                                event.big = get.number(cards[1])
                            }
                        }
                    }
                    event.listbig = listbig
                    event.listsmall = listsmall
                    event.listmiddle = listmiddle
                    "step 2"
                    if (cards.length == 1) {
                        var value1 = 0
                        var value2 = 0
                        for (var i = 0; i < event.listsmall.length; i++) {
                            value1 += get.value(event.listsmall[i])
                        }
                        for (var j = 0; j < event.listbig.length; j++) {
                            value2 += get.value(event.listbig[j])
                        }
                        target.chooseControl('选项一', '选项二').set('choiceList', ['交给' + get.translation(player) + '点数不大于' + get.number(cards[0]) + '的所有牌', '交给' + get.translation(player) + '点数不小于' + get.number(cards[0]) + '的所有牌']).set('ai', function () {
                            if (value1 > value2) {
                                return '选项二'
                            } else {
                                return '选项一'
                            }
                        })
                    } else {
                        event.goto(4)
                    }
                    "step 3"
                    if (result.control == '选项一') {
                        player.gain(event.listsmall, target, 'giveAuto')
                    } else if (result.control == '选项二') {
                        player.gain(event.listbig, target, 'giveAuto')
                    }
                    event.finish()
                    "step 4"
                    target.chooseCard('h', [1, event.listmiddle.length], '交给' + get.translation(player) + '任意张点数∈[' + event.small + ',' + event.big + ']之间的手牌并摸等量的牌', function (card) {
                        return event.listmiddle.contains(card)
                    }).set('ai', function (card) {
                        var player = _status.event.player;
                        if (get.position(card) == 'h' && !player.countCards('h', 'du') && (player.hp > 2 || !player.countCards('h', function (card) {
                            return get.value(card) >= 8;
                        }))) {
                            return 1;
                        }
                        return 6 - get.value(card)
                    }).set('complexCard', true)
                    "step 5"
                    if (result.bool) {
                        var num = 0
                        if (result.cards.length == event.listmiddle.length) num += 1
                        player.gain(result.cards, target, 'giveAuto')
                        target.draw(result.cards.length + num)
                        target.removeGaintag('slen_xj');
                    }
                },
                ai: {
                    result: {
                        player: function (player) {
                            if (ui.selected.cards.length == 2) {
                                return -0.5;
                            }
                            return 1;
                        },
                        target: function (player, target) {
                            if (ui.selected.cards.length == 2) {
                                return 1;
                            }
                            return 1 / target.countCards('h') - 2;
                        },
                    },
                    order: 5,
                },
            },
            "zenia_yy": {
                init: function (player) {
                    if (!player.zenia_yy) player.zenia_yy = '平';
                },
                filterTarget: true,
                mark: true,
                marktext: "🎶",
                intro: {
                    content: function (storage, player) {
                        var str;
                        switch (player.zenia_yy) {
                            case '平': str = '出牌阶段限一次，你可以令一名角色摸' + player.maxHp + '张牌，然后弃置' + player.hp + '张手牌。'; break;
                            case '仄': str = '出牌阶段限一次，你可以令一名角色弃置' + player.maxHp + '张手牌，然后摸' + player.hp + '张牌。'; break;
                        }
                        return '<li>当前韵律：' + (player.zenia_yy || '平') + '<br><li>' + str;
                    },
                },
                group: "zenia_yy_zhuanyun",
                yunlvSkill: true,
                enable: "phaseUse",
                usable: 1,
                content: function () {
                    'step 0'
                    switch (player.zenia_yy || '平') {
                        case '平':
                            target.draw(player.maxHp);
                            target.chooseToDiscard(player.hp, 'h', true)
                            break;
                        case '仄':
                            target.chooseToDiscard(player.maxHp, 'h', true)
                            target.draw(player.hp);
                            break;
                    }
                },
                ai: {
                    order: 7,
                    result: {
                        target: function (player, target) {
                            if (player.hp == player.maxHp) {
                                return 1
                            } else if (player.hp != player.maxHp) {
                                if (player.zenia_yy == '仄' && target.countCards('h') > player.hp && target.countCards('h') < player.maxHp) {
                                    return -1
                                }
                                return 1;
                            }
                        },
                    },
                },
                subSkill: {
                    zhuanyun: {
                        trigger: {
                            player: "zenia_ysAfter",
                        },
                        forced: true,
                        locked: false,
                        content: function () {
                            player.changeYun('zenia_yy');
                        },
                        sub: true,
                    },
                },
            },
            "zenia_ys": {
                enable: "phaseUse",
                usable: 1,
                filter: function (event, player) {
                    return player.countCards('h') >= 1;
                },
                filterTarget: function (card, player, target) {
                    return target != player;
                },
                filterCard: true,
                selectCard: -1,
                discard: false,
                prepare: "give",
                content: function () {
                    target.gain(cards);
                    if (!player.hujia) {
                        player.changeHujia();
                    } else {
                        player.draw(2)
                    }
                },
                ai: {
                    threaten: 1.5,
                    order: 2.1,
                    result: {
                        target: function (player, target) {
                            if (target.hasSkillTag('nogain')) return 0;
                            if (get.attitude(player, target) < 3) return 0;
                            if (target.hasJudge('lebu')) return 0;
                            if (target.hp == target.maxHp) return 0.1
                            return 1;
                        },
                    },
                },
            },
            "huye_jj": {
                trigger: {
                    source: "damageBegin2",
                },
                forced: true,
                locked: false,
                filter: function (event, player) {
                    return event.player.hasFrBuff('sleep');
                },
                content: function () {
                    trigger.num += 1
                }
            },
            "zenia_ld": {
                trigger: {
                    player: "useCard",
                },
                filter: function (event, player) {
                    return player.isPhaseUsing()
                },
                forced: true,
                locked: false,
                content: function () {
                    player.addTempSkill('zenia_ld_2');
                    player.addMark('zenia_ld_2', 1, false);
                },
                subSkill: {
                    "2": {
                        onremove: true,
                        intro: {
                            content: "手牌上限+#",
                        },
                        mod: {
                            maxHandcard: function (player, num) {
                                return num + player.countMark('zenia_ld_2');
                            },
                        },
                        sub: true,
                    },
                },
            },
            "tiers_qp": {
                trigger: {
                    player: "useCardToPlayered",
                },
                usable: 1,
                direct: true,
                shaRelated: true,
                filter: function (event, player) {
                    return event.card.name == 'sha'
                },
                content: function () {
                    'step 0'
                    var map = {};
                    var list = [];
                    for (var i = 1; i <= player.hp; i++) {
                        var cn = get.cnNumber(i, true);
                        list.push(cn + '点');
                    }
                    event.map = map;
                    player.chooseControl(list, 'cancel2').set('prompt', '强破：请选择失去体力的点数').set('ai', function () {
                        var player = _status.event.player
                        var target = _status.event.target
                        if (player.hp >= 3 && get.attitude(player, target) < 0) {
                            return '两点'
                        } else if (player.hp == 2 && get.attitude(player, target) < 0) {
                            return '一点'
                        } else {
                            return 'cancel2'
                        }
                    }).set('target', trigger.target);
                    'step 1'
                    if (result.control != 'cancel2') {
                        var num = result.index + 1
                        event.num = num > 1 ? 2 : 1;
                        player.loseHp(num);
                        player.line(trigger.target, { color: [255, 224, 172] });
                        player.addTempSkill('unequip', { player: 'useCardAfter' })
                        var id = trigger.target.playerid;
                        var map = trigger.customArgs;
                        if (!map[id]) map[id] = {};
                        if (!map[id].extraDamage) map[id].extraDamage = 0;
                        map[id].extraDamage += event.num;
                    } else {
                        event.finish()
                    }
                },
                ai: {
                    unequip: true,
                }
            },
            "tiers_kh": {
                trigger: {
                    player: "loseHpEnd"
                },
                filter: function (event, player) {
                    if (player != _status.currentPhase) return false
                    return event.num >= 2
                },
                forced: true,
                content: function () {
                    player.addTempSkill('tiers_kh_1', { player: "phaseBegin" })
                    player.addTempSkill('tiers_kh_hh', { player: "phaseUseBegin" })
                },
                subSkill: {
                    1: {
                        trigger: {
                            source: "damageEnd"
                        },
                        direct: true,
                        filter: function (event, player) {
                            return event.num > 0 && event.player != event.target
                        },
                        content: function () {
                            player.recover()
                        },
                    },
                    hh: {
                        trigger: {
                            player: "phaseUseAfter",
                        },
                        direct: true,
                        content: function () {
                            player.draw(2)
                            var next = player.phaseUse();
                            event.next.remove(next);
                            trigger.next.push(next);
                        },
                    }
                }
            },
            "slen_gc": {
                trigger: {
                    player: "loseAfter",
                },
                forced: true,
                filter: function (event, player) {
                    return _status.currentPhase && _status.currentPhase != player && _status.currentPhase.countGainableCards('he') > 0
                },
                content: function () {
                    var target = _status.currentPhase;
                    player.gainPlayerCard(target, 'he', get.prompt('slen_gc', target)).set('logSkill', ['slen_gc', target]);
                },
            },
            "lamost_zf": {
                trigger: {
                    player: ["chooseToRespondBegin", "chooseToUseBegin"],
                },
                forced: true,
                lastDo: true,
                mark: true,
                hiddenCard: function (player, name) {
                    var cardPile = Array.from(ui.cardPile.childNodes);
                    if (!cardPile.length) return false;
                    var num = 1 + player.getDamagedHp();
                    cardPile = cardPile.slice(0, Math.min(num, cardPile.length));;
                    return cardPile.some(i => i.name == name);
                },
                filter: function (event, player) {
                    if (event.responded || event.skill) return false;
                    var cardPile = Array.from(ui.cardPile.childNodes);
                    if (!cardPile.length) return false;
                    var num = 1 + player.getDamagedHp();
                    cardPile = cardPile.slice(0, Math.min(num, cardPile.length));
                    return cardPile.some(i => event.filterCard && event.filterCard(i, player, event));
                },
                mod: {
                    "cardEnabled2": function (card, player) {
                        if (_status.event.skill && get.itemtype(card) == 'card' && card.hasGaintag('lamost_zf')) return false;
                    },
                },
                intro: {
                    mark: function (dialog, storage, player) {
                        var cardPile = Array.from(ui.cardPile.childNodes);
                        if (!cardPile.length) return '';
                        var num = 1 + player.getDamagedHp();
                        cardPile = cardPile.slice(0, Math.min(num, cardPile.length));
                        if (player.isUnderControl(true)) {
                            dialog.addAuto(cardPile);
                        } else {
                            return '';
                        }
                    },
                },
                copy: function (cards) {
                    var result = [];
                    for (var i of cards) {
                        var card = ui.create.card(ui.special);
                        card.init([
                            i.suit,
                            i.number,
                            i.name,
                            i.nature,
                        ]);
                        card.cardid = i.cardid,
                            card.wunature = i.wunature,
                            card.storage = i.storage,
                            card.relatedCard = i;
                        result.push(card);
                    };
                    return result;
                },
                contentx: function () {
                    "step 0"
                    if (trigger.result.bool) {
                        if (trigger.onresult) {
                            trigger.onresult(trigger.result);
                            delete trigger.onresult;
                        };
                    };
                    "step 1"
                    player.lose(event.cards, ui.special)._triggered = null;
                    "step 2"
                    for (var i of event.cards) {
                        i.fix();
                        i.remove();
                        i.destroyed = true;
                    };
                },
                content: function () {
                    "step 0"
                    var cardPile = Array.from(ui.cardPile.childNodes);
                    var num = 1 + player.getDamagedHp();
                    cardPile = cardPile.slice(0, Math.min(num, cardPile.length));
                    event.cards = lib.skill.lamost_zf.copy(cardPile);
                    player.directgains(event.cards, null, 'lamost_zf');
                    "step 1"
                    var evt = trigger;
                    var onresult = false;
                    if (evt.onresult) {
                        onresult = evt.onresult;
                    };
                    var next2 = game.createEvent('lamost_zf_clear', false);
                    next2.cards = event.cards;
                    next2.player = player;
                    next2._trigger = evt;
                    next2.setContent(lib.skill.lamost_zf.contentx);
                    event.next.remove(next2);
                    evt.after.push(next2);
                    evt.onresult = function (result) {
                        if (evt.after.contains(next2)) {
                            evt.after.remove(next2);
                            evt.next.push(next2);
                        };
                        if (result.cards && result.cards.length && (result.cards[0].hasGaintag('lamost_zf') || event.cards.contains(result.cards[0]))) {
                            var card2 = result.cards[0];
                            result.cards[0] = result.cards[0].relatedCard;
                            var cardx = result.cards[0];
                            result.card = {
                                name: get.name(card2),
                                suit: get.suit(card2),
                                number: get.number(card2),
                                nature: get.nature(card2),
                                isCard: true,
                                cardid: cardx.cardid,
                                wunature: cardx.wunature,
                                storage: cardx.storage,
                                cards: [cardx],
                            };
                        };
                        if (onresult) onresult.apply(evt, arguments);
                        delete evt.onresult;
                    };
                    game.delay(1);
                    var cards = player.getCards("hs");
                    var sort2 = function (b, a) {
                        if (a.name != b.name) return lib.sort.card(a.name, b.name);
                        else if (a.suit != b.suit) return lib.suit.indexOf(a) - lib.suit.indexOf(b);
                        else return a.number - b.number;
                    };
                    if (cards.length > 1) {
                        cards.sort(sort2);
                        cards.forEach(function (i, j) {
                            player.node.handcards1.insertBefore(cards[j], player.node.handcards1.firstChild);
                        });
                        dui.queueNextFrameTick(dui.layoutHand, dui);
                    }
                },
                ai: {
                    respondShan: true,
                    respondSha: true,
                    save: true,
                    skillTagFilter: function (player, tag, arg) {
                        var event = _status.event;
                        var cardPile = Array.from(ui.cardPile.childNodes);
                        if (!cardPile.length) return false;
                        var num = 1 + player.getDamagedHp();
                        cardPile = cardPile.slice(0, Math.min(num, cardPile.length));
                        for (var i = 0; i < cardPile.length; i++) {
                            if (tag == 'respondSha') {
                                if (cardPile[i].name == 'sha') return true;
                            } else if (tag == 'respondShan') {
                                if (cardPile[i].name == 'shan') return true;
                            } else if (tag == 'save') {
                                if (cardPile[i].name == 'jiu' || cardPile[i].name == 'tao') return true;
                            };
                        };
                        return false;
                    },
                },
            },
            "knier_yc": {
                trigger: {
                    global: "phaseZhunbeiBegin",
                },
                filter: function (event, player) {
                    return event.player.countCards('ej') > 0 && event.player != player
                },
                check: function (event, player) {
                    if (get.attitude(player, event.player) > 0 && (event.player.countCards('ej', { suit: 'spade' }) || event.player.countCards('ej', { suit: 'club' }))) return true
                    if (get.attitude(player, event.player) < 0 && (event.player.countCards('ej', { suit: 'heart' }) || event.player.countCards('ej', { suit: 'diamond' }))) return true
                    return false
                },
                content: function () {
                    "step 0"
                    player.choosePlayerCard(trigger.player, false, 'ej', '选择' + get.translation(target) + '其判定区或装备区的一张牌').set('ai', function (card) {
                        var player = _status.event.player
                        var target = _status.event.target
                        if (get.attitude(player, target) > 0) {
                            if (target.countCards('j') > 0) {
                                if (get.suit(card) == 'spade') {
                                    return 1
                                } else {
                                    return 0
                                }
                            } else if (target.countCards('h') > target.maxHp) {
                                if (get.suit(card) == 'club') {
                                    return 1
                                } else {
                                    return 0
                                }
                            }
                        } else {
                            switch (get.suit(card)) {
                                case 'heart': return Math.random;
                                case 'dimond': return Math.random;
                                case 'spade': return -1;
                                case 'club': return -1;
                            }
                        }
                    }).set('target', trigger.player)
                    "step 1"
                    if (result.bool) {
                        var card = result.cards[0];
                        var cardx = get.autoViewAs({ name: 'sha' }, [card]);
                        var target = trigger.player
                        target.useCard(cardx, [card], player, false);
                        switch (get.suit(card)) {
                            case 'heart':
                                target.skip('phaseUse');
                                target.addTempSkill('knier_yc_1', { player: 'phaseUseSkipped' })
                                target.storage.knier_yc_1 = 'Use'; break;
                            case 'diamond':
                                target.skip('phaseDraw');
                                target.addTempSkill('knier_yc_1', { player: 'phaseDrawSkipped' })
                                target.storage.knier_yc_1 = 'Draw'; break;
                            case 'spade':
                                target.skip('phaseJudge');
                                target.addTempSkill('knier_yc_1', { player: 'phaseJudgeSkipped' })
                                target.storage.knier_yc_1 = 'Judge'; break;
                            case 'club':
                                target.skip('phaseDiscard');
                                target.addTempSkill('knier_yc_1', { player: 'phaseDiscardSkipped' })
                                target.storage.knier_yc_1 = 'Discard'; break;
                        }
                        target.markSkill('knier_yc_1')
                    }
                },
                subSkill: {
                    "1": {
                        onremove: function (player) {
                            player.unmarkSkill('knier_yc_1')
                        },
                        mark: true,
                        init: function (player, storage) {
                            if (!player.storage.knier_yc_1) player.storage.knier_yc_1 = ''
                        },
                        intro: {
                            markcount: function () {
                                return 0
                            },
                            mark: function (dialog, storage, player) {
                                var str
                                if (player.storage.knier_yc_1 == 'Use') {
                                    str = '出牌'
                                } else if (player.storage.knier_yc_1 == 'Judge') {
                                    str = '判定'
                                } else if (player.storage.knier_yc_1 == 'Discard') {
                                    str = '弃牌'
                                } else {
                                    str = '摸牌'
                                }
                                dialog.addText("跳过下个" + str + "阶段");
                            },
                        },
                        sub: true,
                    },
                },
            },
            "knier_wh": {
                trigger: {
                    target: "useCardToTargeted",
                },
                frequent: true,
                mark: true,
                onremove: function (player, skill) {
                    var cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                intro: {
                    content: "expansion",
                    markcount: "expansion",
                },
                filter: function (event, player) {
                    if (event.player == player) return false
                    if (event.cards.length != 1) return false
                    var list = []
                    var cards = player.getExpansions('knier_wh')
                    if (cards.length == 0) return true
                    for (var i = 0; i < cards.length; i++) {
                        if (!list || !list.contains(get.suit(cards[i]))) {
                            list.push(get.suit(cards[i]))
                        }
                    }
                    if (!list.contains(get.suit(event.cards[0]))) return true
                    return false
                },
                content: function () {
                    "step 0"
                    trigger.excluded.push(player)
                    "step 1"
                    player.addToExpansion(trigger.cards, 'gain2').gaintag.add('knier_wh')
                },
            },
            "knier_hp": {
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                frequent: true,
                filter: function (eveny, player) {
                    return player.getExpansions('knier_wh').length > 0
                },
                content: function () {
                    "step 0"
                    player.chooseCardButton('选择一张牌', 1, player.getExpansions('knier_wh')).set('prompt2', "是否将一张“雾花”当作【出其不意】使用").set("ai", ai = function (button) {
                        return 9 - get.value(button.link);
                    })
                    "step 1"
                    if (result.bool) {
                        var card = result.links
                        player.chooseUseTarget('将一张“雾花”当作【出其不意】使用', card, { name: 'chuqibuyi' }, false).viewAs = true;
                    }
                },
            },
            "kasers_cy": {
                mod: {
                    aiOrder: function (player, card, num) {
                        if (typeof card == 'object' && player == _status.currentPhase) {
                            var evt = player.getLastUsed();
                            if (evt && evt.card && get.suit(evt.card) != 'none' && get.suit(card) != 'none' && get.suit(evt.card) != get.suit(card)) {
                                return num + 10;
                            }
                        }
                    },
                },
                trigger: {
                    player: "useCard",
                },
                mark: true,
                intro: {
                    content: function (storage, player, skill) {
                        var suit
                        if (player.storage.kasers_cy == 'none') {
                            suit = '无'
                        } else {
                            suit = get.translation(player.storage.kasers_cy)
                        }
                        return '你使用的上一张牌的花色为：' + suit;
                    },
                    markcount: function (storage, player, skill) {
                        var suit
                        if (player.storage.kasers_cy == 'none') {
                            suit = '无'
                        } else {
                            suit = get.translation(player.storage.kasers_cy)
                        }
                        return suit
                    },
                },
                getLastUsed: function (player, event) {
                    var history = player.getAllHistory('useCard');
                    var index;
                    if (event) index = history.indexOf(event) - 1;
                    else index = history.length - 2;
                    if (index >= 0) return history[index];
                    return false;
                },
                forced: true,
                filter: function (event, player) {
                    var evt = lib.skill.kasers_cy.getLastUsed(player, event);
                    var suit2 = get.suit(event.card);
                    player.storage.kasers_cy = suit2
                    if (!evt) return false;
                    var suit1 = get.suit(evt.card);
                    return suit1 && suit2 && suit1 != suit2;
                },
                content: function () {
                    player.draw();
                },
                ai: {
                    threaten: 3,
                },
                group: "kasers_cy_same",
                subSkill: {
                    same: {
                        trigger: {
                            player: "useCard",
                        },
                        forced: true,
                        filter: function (event, player) {
                            var evt = lib.skill.kasers_cy.getLastUsed(player, event);
                            var suit2 = get.suit(event.card);
                            if (!evt) return false;
                            var suit1 = get.suit(evt.card);
                            return suit1 && suit2 && suit1 == suit2;
                        },
                        content: function () {
                            player.chooseToDiscard(1, 'h', true)
                        },
                        sub: true,
                    },
                },
            },
            "yifa_xs": {
                trigger: {
                    player: ["phaseZhunbeiBegin", "phaseJieshuBegin"],
                    global: "roundStart",
                },
                forceunique: true,
                fixed: true,
                limited: false,
                charlotte: true,
                mark: true,
                supercharlotte: true,
                content: function () {
                    "step 0"
                    var skills = [];
                    for (var i in lib.character) {
                        for (var j = 0; j < lib.character[i][3].length; j++) {
                            if (player.hasSkill(lib.character[i][3][j])) continue;
                            var info = lib.skill[lib.character[i][3][j]];
                            if (info && !(info.fixed || info.yunlvSkill || info.qianghua || info.unique || info.zhuSkill || info.charlotte || info.hiddenSkill || info.juexingji || info.limited || info.dutySkill || info.unique)) {
                                skills.add(lib.character[i][3][j]);
                            }
                        }
                    }
                    event.skills = skills
                    player.chooseText(6, true, get.transArray(event.skills)).set('ai', function () {
                        return get.translation(skills.randomGet())
                    }).set('prompt', get.prompt2('yifa_xs'))
                    "step 1"
                    event.choice = event.skills.filter(function (item) {
                        return get.translation(item) == result.text
                    })
                    if (event.choice.length == 1) {
                        var skills2 = event.choice[0]
                        if (trigger.name == "phaseZhunbei") {
                            player.addTempSkill(skills2, { player: "phaseEnd" });
                        } else if (trigger.name == "phaseJieshu") {
                            player.addTempSkill(skills2, { player: "phaseBegin" });
                        } else {
                            player.addTempSkill(skills2, 'roundStart');
                        }
                        player.popup(skills2);
                        game.log(player, '声明了', '#g' + '【' + get.translation(skills2) + '】');
                        event.finish()
                    } else {
                        var list = []
                        var skills = event.choice
                        for (var i = 0; i < skills.length; i++) {
                            list.push(get.translation(skills[i] + '_info'))
                        }
                        player.chooseControl().set('choiceList', list).set('prompt', '选择〖' + get.translation(skills[0]) + '〗的版本')
                    }
                    "step 2"
                    var skills2 = event.choice[result.index]
                    if (trigger.name == "phaseZhunbei") {
                        player.addTempSkill(skills2, { player: "phaseEnd" });
                    } else if (trigger.name == "phaseJieshu") {
                        player.addTempSkill(skills2, { player: "phaseBegin" });
                    } else {
                        player.addTempSkill(skills2, 'roundStart');
                    }
                    player.popup(skills2);
                    game.log(player, '声明了', '#g' + '【' + get.translation(skills2) + '】');
                },
                ai: {
                    threaten: 6,
                },
            },
            "xuanshi": {
                trigger: {
                    player: ["phaseZhunbeiBegin"],
                    global: "roundStart",
                },
                forceunique: true,
                fixed: true,
                limited: false,
                charlotte: true,
                mark: true,
                supercharlotte: true,
                content: function () {
                    "step 0"
                    var skills = [];
                    for (var i in lib.character) {
                        for (var j = 0; j < lib.character[i][3].length; j++) {
                            if (player.hasSkill(lib.character[i][3][j])) continue;
                            var info = lib.skill[lib.character[i][3][j]];
                            if (info && !(info.hiddenSkill || info.combo)) {
                                skills.add(lib.character[i][3][j]);
                            }
                        }
                    }
                    event.skills = skills
                    player.chooseText(6, true, get.transArray(event.skills)).set('ai', function () {
                        return get.translation(skills.randomGet())
                    }).set('prompt', get.prompt2('xuanshi'))
                    "step 1"
                    event.choice = event.skills.filter(function (item) {
                        return get.translation(item) == result.text
                    })
                    if (event.choice.length == 1) {
                        var skills2 = event.choice[0]
                        player.addTempSkill(skills2, 'roundStart');
                        player.popup(skills2);
                        game.log(player, '声明了', '#g' + '【' + get.translation(skills2) + '】');
                        event.finish()
                    } else {
                        var list = []
                        var skills = event.choice
                        for (var i = 0; i < skills.length; i++) {
                            list.push(get.translation(skills[i] + '_info'))
                        }
                        player.chooseControl().set('choiceList', list).set('prompt', '选择〖' + get.translation(skills[0]) + '〗的版本')
                    }
                    "step 2"
                    var skills2 = event.choice[result.index]
                    player.addTempSkill(skills2, 'roundStart');
                    player.popup(skills2);
                    game.log(player, '声明了', '#g' + '【' + get.translation(skills2) + '】');
                },
                ai: {
                    threaten: 6,
                },
            },
            "ventus_yc": {
                trigger: {
                    player: "useCardToBegin",
                },
                direct: true,
                filter: function (event, player) {
                    return event.card.name == 'sha' && event.target != player && event.target
                },
                content: function () {
                    trigger.target.loseHp()
                },
                group: "ventus_yc_draw",
                subSkill: {
                    draw: {
                        trigger: {
                            player: "phaseDrawBegin1",
                        },
                        direct: true,
                        content: function () {
                            var card1 = get.cardPile2(function (card) {
                                return get.name(card, false) == 'sha';
                            });
                            player.gain(card1, 'gain2')
                        },
                        sub: true,
                    },
                },
            },
            "ventus_nx": {
                mod: {
                    cardEnabled: function (card, player) {
                        if (player.countMark('ventus_nx') >= player.hp) return false;
                    },
                    cardUsable: function (card, player) {
                        if (player.countMark('ventus_nx') >= player.hp) return false;
                    },
                    cardRespondable: function (card, player) {
                        if (player.countMark('ventus_nx') >= player.hp) return false;
                    },
                },
                init: function (player, storage) {
                    if (!player.storage.ventus_nx) player.storage.ventus_nx = 0
                },
                trigger: {
                    player: "useCard1",
                },
                mark: true,
                intro: {
                    content: "你已使用$张牌",
                },
                forced: true,
                popup: false,
                firstDo: true,
                content: function () {
                    player.addMark('ventus_nx', 1, false);
                },
                ai: {
                    presha: true,
                    pretao: true,
                    nokeep: true,
                },
                group: ["ventus_nx_clean", "ventus_nx_damage"],
                subSkill: {
                    damage: {
                        trigger: {
                            player: ["damageBefore", "damageBegin4"],
                        },
                        filter: function (event, player) {
                            if (player == _status.currentPhase) return false;
                            if (event.getParent().name == 'sha' || event.getParent().name == 'juedou') return false;
                            return true
                        },
                        forced: true,
                        content: function () {
                            trigger.untrigger();
                            trigger.finish();
                        },
                        sub: true,
                    },
                    clean: {
                        trigger: {
                            player: "phaseAfter",
                        },
                        forced: true,
                        content: function () {
                            var num = player.countMark('ventus_nx')
                            player.removeMark('ventus_nx', num)
                            player.updateMark('ventus_nx')
                        },
                        sub: true,
                    },
                },
            },
            "pluvia_fs": {
                trigger: {
                    source: "damageEnd",
                },
                filter: function (event, player) {
                    return event.player != player && event.player.isIn() && event.player.countCards('he') > 0
                },
                check: function (event, player) {
                    return get.attitude(player, event.player) > 0
                },
                content: function () {
                    "step 0"
                    trigger.player.chooseCard('he', '是否对' + get.translation(player) + '发动【复苏】？', '交给' + get.translation(player) + '一张牌并回复一点体力').set('ai', function (card) {
                        var player = _status.event.player
                        if (player.hp <= 2) {
                            return 9 - get.value(card)
                        } else if (player.hp == player.maxHp) {
                            return 0
                        } else {
                            return 5 - get.value(card)
                        }
                    })
                    "step 1"
                    if (result.bool) {
                        trigger.player.recover()
                        player.gain(result.cards, trigger.player, 'giveAuto')
                    }
                },
            },
            "pluvia_sx": {
                usable: 1,
                enable: "phaseUse",
                filter: function (event, player) {
                    return player.countCards('hes') > 2
                },
                filterCard: true,
                filterTarget: function (card, player, target) {
                    return target != player
                },
                position: "hes",
                selectCard: 2,
                check: function (card) {
                    return 7 - get.value(card)
                },
                content: function () {
                    "step 0"
                    player.recover()
                    target.fakeDamage(1, player)
                },
                ai: {
                    order: 5,
                    result: {
                        target: function (player, target) {
                            if (target.hp == 1) return 5;
                            if (player.countCards('h') > player.hp) return 4;
                            if (target.hp == target.maxHp) return 0
                            return 2;
                        },
                        player: function (player, target) {
                            if (player.hp == 1) return 5
                            if (player.hp == player.maxHp) return 0
                            return 2
                        },
                    },
                },
            },
            "pluvia_xs": {
                init: function (player) {
                    if (!player.pluvia_xs) player.pluvia_xs = '平';
                },
                filter: function (event, player) {
                    if (player.pluvia_xs == '平') {
                        return player.countCards('hs', 'shan') > 0 && game.hasPlayer(function (current) {
                            return current.isDamaged();
                        });
                    } else {
                        return player.countCards('hs', 'sha') > 0
                    }
                },
                filterTarget: function (card, player, target) {
                    if (player.pluvia_xs == '平') {
                        if (target.hp >= target.maxHp) return false;
                        return true;
                    } else {
                        return target != player
                    }
                },
                position: "hs",
                mark: true,
                filterCard: function (card, player, target) {
                    if (player.pluvia_xs == '平') {
                        return get.name(card, player) == 'shan'
                    } else {
                        return get.name(card, player) == 'sha'
                    }
                },
                marktext: "🎶",
                intro: {
                    content: function (storage, player) {
                        var str;
                        switch (player.pluvia_xs) {
                            case '平': str = '出牌阶段限一次，你可以弃置一张【桃】，然后令一名角色回复一点体力'; break;
                            case '仄': str = '出牌阶段限一次，你可以弃置一张【杀】，然后对一名其他角色造成一点伤害'; break;
                        }
                        return '<li>当前韵律：' + (player.pluvia_xs || '平') + '<br><li>' + str;
                    },
                },
                group: "pluvia_xs_zhuanyun",
                yunlvSkill: true,
                enable: "phaseUse",
                usable: 1,
                content: function () {
                    'step 0'
                    switch (player.pluvia_xs || '平') {
                        case '平':
                            target.recover()
                            break;
                        case '仄':
                            target.damage(1, player)
                            break;
                    }
                },
                ai: {
                    order: 7,
                    result: {
                        target: function (player, target) {
                            if (player.pluvia_xs == '平') {
                                if (target.hp == 1) return 5;
                                if (player == target && player.countCards('h') > player.hp) return 5;
                                return 2;
                            } else {
                                return get.damageEffect(target, player) - (target.maxHp - target.hp) / 2;
                            }
                        },
                    },
                },
                subSkill: {
                    zhuanyun: {
                        trigger: {
                            player: "pluvia_sxAfter",
                        },
                        forced: true,
                        locked: false,
                        content: function () {
                            player.changeYun('pluvia_xs');
                        },
                        sub: true,
                    },
                },
            },
            "jbgy_pc": {
                trigger: {
                    global: "phaseBefore",
                    player: "enterGame",
                },
                forced: true,
                filter: function (event, player) {
                    return event.name != 'phase' || game.phaseNumber == 0;
                },
                content: function () {
                    'step 0'
                    game.countPlayer(function (current) {
                        if (current != player) current.addSkill('jbgy_pc_1');
                    });
                    game.log(player, '令除其以外的所有其他角色手牌均可见')
                    game.delayx();
                },
                subSkill: {
                    "1": {
                        mark: true,
                        intro: {
                            mark: function (dialog, content, player) {
                                var cards = player.getCards('h')
                                if (cards && cards.length) {
                                    dialog.addAuto(cards);
                                }
                            },
                        },
                        content: function (content, player) {
                            var cards = player.getCards('h')
                            if (cards && cards.length) {
                                return get.translation(cards);
                            }
                        },
                        sub: true,
                    },
                },
            },
            "jbgy_ds": {
                trigger: {
                    player: ["phaseJudgeBefore", "phaseDrawBefore", "phaseUseBefore", "phaseDiscardBefore"],
                },
                frequent: true,
                content: function () {
                    'step 0'
                    var str
                    if (trigger.name == 'phaseJudge') {
                        str = '判定阶段'
                    } else if (trigger.name == 'phaseDraw') {
                        str = '摸牌阶段'
                    } else if (trigger.name == 'phaseUse') {
                        str = '出牌阶段'
                    } else if (trigger.name == 'phaseDiscard') {
                        str = '弃牌阶段'
                    }
                    var list, skills = [];
                    if (get.mode() == 'guozhan') {
                        list = [];
                        for (var i in lib.characterPack.mode_guozhan) list.push(i);
                    }
                    else if (_status.connectMode) list = get.charactersOL();
                    else {
                        list = [];
                        for (var i in lib.character) {
                            if (lib.filter.characterDisabled2(i) || lib.filter.characterDisabled(i)) continue;
                            list.push(i);
                        }
                    }
                    for (var i of list) {
                        if (i.indexOf('gz_jun') == 0) continue;
                        for (var j of lib.character[i][3]) {
                            if (j == 'jbgy_sj') continue;
                            var skill = lib.skill[j];
                            if (!skill || skill.zhuSkill || skill.dutySkill) continue;
                            if (skill.init || skill.ai && (skill.ai.combo || skill.ai.notemp || skill.ai.neg)) continue;
                            var info = lib.translate[j + '_info'];
                            if (info && info.indexOf(str) != -1) skills.add(j);
                        }
                    }
                    player.storage.jbgy_sj = skills
                    "step 1"
                    if (player.isIn()) {
                        if (!player.storage.jbgy_sj) lib.skill.jbgy_sj.initList(player);
                        var list = player.storage.jbgy_sj.randomGets(3);
                        if (!list.length) {
                            event.finish();
                            return;
                        }
                        event.videoId = lib.status.videoId++;
                        var func = function (skills, id) {
                            var dialog = ui.create.dialog('forcebutton');
                            dialog.videoId = id;
                            dialog.add('授技：请选择你要获得的技能');
                            for (var i = 0; i < skills.length; i++) {
                                dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【' + get.translation(skills[i]) + '】</div><div>' + lib.translate[skills[i] + '_info'] + '</div></div>');
                            }
                            dialog.addText(' <br> ');
                        }
                        if (player.isOnline()) player.send(func, list, event.videoId);
                        else if (player == game.me) func(list, event.videoId);
                        player.chooseControl(list);
                    }
                    else event.finish();
                    'step 2'
                    game.broadcastAll('closeDialog', event.videoId);
                    player.addTempSkill(result.control, trigger.name + 'End');
                    player.popup(result.control);
                    game.log(player, '获得了技能', '#g【' + get.translation(result.control) + '】');
                },
                ai: {
                    threaten: 0.9,
                },
            },
            "jbgy_qx": {
                enable: "phaseUse",
                filterTarget: function (card, player, target) {
                    return target != player && (!player.storage.jbgy_qx || !player.storage.jbgy_qx.contains(target))
                },
                mark: true,
                intro: {
                    markcount: 0,
                    content: "本回合内已对$发动过技能",
                },
                init: function (player, storage) {
                    if (!player.storage.jbgy_qx) player.storage.jbgy_qx = []
                },
                content: function () {
                    "step 0"
                    if (!player.storage.jbgy_qx || !player.storage.jbgy_qx.contains(target)) {
                        player.storage.jbgy_qx.push(target)
                    }
                    if (player.countCards('he', { subtype: 'equip1' }) > 0) {
                        player.chooseCard('是否弃置一张武器牌', 1, 'he', false, function (card) {
                            return get.subtype(card) == 'equip1'
                        }).set('ai', function (card) {
                            return 7 - get.value(card)
                        })
                    } else {
                        target.damage(1, player, 'fire')
                        player.damage(1, 'nosource', 'fire')
                        event.finish()
                    }
                    'step 1'
                    if (result.bool) {
                        player.discard(result.cards)
                        target.damage(1, player, 'fire')
                        player.fakeDamage(1, 'nosource', 'fire')
                    } else {
                        target.damage(1, player, 'fire')
                        player.damage(1, 'nosource', 'fire')
                    }
                },
                ai: {
                    order: 8.5,
                    result: {
                        target: function (player, target) {
                            if (!ui.selected.cards.length) {
                                if (player.hp < 2) return 0;
                                if (target.hp >= player.hp) return 0;
                                if (player.countMark('jbgy_ze') >= player.hp) return 0
                            }
                            return get.damageEffect(target, player);
                        },
                    },
                    threaten: 1.5,
                },
                group: "jbgy_qx_clean",
                subSkill: {
                    clean: {
                        trigger: {
                            player: ["phaseBefore", "phaseAfter"],
                        },
                        forced: true,
                        unique: true,
                        content: function () {
                            player.storage.jbgy_qx = []
                            player.updateMark('jbgy_qx')
                        },
                        sub: true,
                    },
                },
            },
            "jbgy_ze": {
                trigger: {
                    global: "phaseEnd",
                },
                filter: function (event, player) {
                    return player.countMark('jbgy_ze') >= player.hp
                },
                direct: true,
                mark: true,
                init: function (player, storage) {
                    player.storage.jbgy_ze = 0
                },
                intro: {
                    content: "本回合已造成$点伤害",
                },
                content: function () {
                    "step 0"
                    player.recover()
                    if (game.hasPlayer(function (current) {
                        return current.countGainableCards(player, 'ej') > 0;
                    })) {
                        player.chooseTarget('请选择一名角色，获得其装备区或判定区内的一张牌', true, function (card, player, target) {
                            return target.countGainableCards(player, 'ej') > 0;
                        }).set('ai', function (target) {
                            var player = _status.event.player;
                            var att = get.attitude(player, target);
                            if (att > 0 && target.countCards('ej', function (card) {
                                return get.position(card) == 'j' || get.value(card, target) <= 0;
                            })) return 2 * att;
                            else if (att < 0 && target.countCards('e', function (card) {
                                return get.value(card, target) > 5;
                            })) return -att;
                            return -1;
                        });
                    }
                    "step 1"
                    if (result.bool) {
                        var target = result.targets[0];
                        player.logSkill('jbgy_ze', target);
                        player.gainPlayerCard(target, 'ej', true);
                    }
                },
                group: ["jbgy_ze_damage", "jbgy_ze_count", "jbgy_ze_clean"],
                subSkill: {
                    damage: {
                        trigger: {
                            player: "damageBefore",
                        },
                        filter: function (event, player) {
                            return event.source && event.source != player
                        },
                        forced: true,
                        content: function () {
                            trigger.source = player
                        },
                        sub: true,
                    },
                    count: {
                        trigger: {
                            source: "damageEnd",
                        },
                        forced: true,
                        content: function () {
                            player.addMark('jbgy_ze')
                        },
                        sub: true,
                    },
                    clean: {
                        trigger: {
                            global: "phaseAfter",
                        },
                        firstDo: true,
                        popup: false,
                        forced: true,
                        content: function () {
                            var num = player.countMark('jbgy_ze')
                            player.removeMark('jbgy_ze', num)
                        },
                        sub: true,
                    },
                },
            },
            "xiaomo_ld": {
                usable: 1,
                trigger: {
                    player: "damageBegin1",
                },
                filter: function (event, player) {
                    var evt = false;
                    for (var i of lib.phaseName) {
                        evt = event.getParent(i);
                        if (evt && evt.player) break;
                    }
                    return event.source && event.source != player && evt && evt.player && player.getHistory('damage', function (evtx) {
                        return evtx.getParent(evt.name) == evt;
                    }).length == 0;
                },
                frequent: true,
                content: function () {
                    trigger.cancel()
                    player.draw()
                    trigger.source.draw()
                    player.changeHujia()
                },
                ai: {
                    "maixie_defend": true,
                    threaten: 0.9,
                    effect: {
                        target: function (card, player, target) {
                            if (player.hasSkillTag('jueqing')) return;
                            if (target.hujia) return;
                            if (player._xiaomo_ld_tmp) return;
                            if (target.hasSkill('xiaomo_ld_ai')) return;
                            if (_status.event.getParent('useCard', true) || _status.event.getParent('_wuxie', true)) return;
                            if (get.tag(card, 'damage')) {
                                if (target.getHistory('damage').length == 0 && player.countCards('hs', { name: 'sha' }) + player.countCards('hs', { name: 'juedou' }) < 2) {
                                    return [0, 0];
                                }
                                if (target.getHistory('damage').length > 0) {
                                    return [1, -2];
                                }
                                else {
                                    if (get.attitude(player, target) > 0 && target.hp > 1) {
                                        return 0;
                                    }
                                    if (get.attitude(player, target) < 0 && !player.hasSkillTag('damageBonus')) {
                                        if (card.name == 'sha') return;
                                        var sha = false;
                                        player._xiaomo_ld_tmp = true;
                                        var num = player.countCards('h', function (card) {
                                            if (card.name == 'sha') {
                                                if (sha) {
                                                    return false;
                                                }
                                                else {
                                                    sha = true;
                                                }
                                            }
                                            return get.tag(card, 'damage') && player.canUse(card, target) && get.effect(target, card, player, player) > 0;
                                        });
                                        delete player._xiaomo_ld_tmp;
                                        if (player.hasSkillTag('damage')) {
                                            num++;
                                        }
                                        if (num < 2) {
                                            var enemies = player.getEnemies();
                                            if (enemies.length == 1 && enemies[0] == target && player.needsToDiscard()) {
                                                return;
                                            }
                                            return 0;
                                        }
                                    }
                                }
                            }
                        },
                    },
                },
                subSkill: {
                    damaged: {
                        sub: true,
                    },
                    ai: {
                        sub: true,
                    },
                },
            },
            "xiaomo_sj": {
                filter: function (event, player) {
                    return event.card && event.card.name == 'sha' && player.hujia > 0
                },
                trigger: {
                    player: "useCardToPlayered",
                },
                shaRelated: true,
                direct: true,
                content: function () {
                    'step 0'
                    var list = []
                    for (var i = 0; i < player.hujia; i++) {
                        list.push(i + 1)
                    }
                    player.chooseControl(list, 'cancel2')
                        .set('prompt', '请选择要失去的护甲值并令此【杀】伤害+X')
                        .set('ai', function () {
                            var player = _status.event.player
                            var target = _status.event.target
                            var att = get.attitude(player, target)
                            if (att > 0) {
                                return 'cancel2'
                            } else {
                                return (Math.max(list) - 1)
                            }
                        }).set('target', trigger.target)
                    'step 1'
                    if (result.control == 'cancel2') {
                        event.finish()
                        return
                    }
                    var num = result.index + 1
                    player.changeHujia(-num)
                    if (trigger.target.hujia > 0) {
                        if (num > trigger.target.hujia) {
                            trigger.target.changeHujia(-trigger.target.hujia)
                        } else if (num < trigger.target.hujia) {
                            trigger.target.changeHujia(-num)
                        }
                    }
                    var id = trigger.target.playerid;
                    var map = trigger.getParent().customArgs;
                    if (!map[id]) map[id] = {};
                    if (typeof map[id].extraDamage != 'number') {
                        map[id].extraDamage = 0;
                    }
                    map[id].extraDamage += num;
                },
                group: "xiaomo_sj_draw",
                subSkill: {
                    draw: {
                        audio: 2,
                        trigger: {
                            player: "phaseDrawBegin2",
                        },
                        direct: true,
                        filter: function (event, player) {
                            return !event.numFixed;
                        },
                        content: function () {
                            trigger.num += player.hujia;
                        },
                        ai: {
                            threaten: 1.3,
                        },
                    }
                }
            },
            "adward_qm": {
                trigger: {
                    player: ["phaseUseBegin", "phaseJieshuBegin"],
                },
                direct: true,
                filter: function (event, player) {
                    var str
                    if (event.name == 'phaseUse') {
                        str = 'red'
                    } else {
                        str = 'black'
                    }
                    return player.countCards('h', { color: str }) > 0
                },
                content: function () {
                    'step 0'
                    var str
                    if (trigger.name == 'phaseUse') {
                        str = 'red'
                    } else {
                        str = 'black'
                    }
                    event.color = str
                    'step 1'
                    var cards = player.getCards('h', { color: event.color })
                    event.num = cards.length
                    player.lose(cards, ui.discardPile);
                    'step 2'
                    var cards = get.cards(event.num)
                    player.directgain(cards, 'draw')
                    'step 3'
                    if (player.countCards('h', { color: event.color }) > 0) {
                        event.goto(1)
                    } else {
                        game.log(player, '重铸了所有的' + get.translation(event.color) + '手牌')
                    }
                },
            },
            "linyan_ys": {
                trigger: {
                    global: "useCardAfter",
                },
                direct: true,
                filter: function (event, player) {
                    if (event.targets.length != 1) return false;
                    if (event.targets[0] == event.player) return false
                    if (player.countCards('hs') <= 0) return false
                    var cards = player.getCards('hs')
                    var bool = false
                    for (var i = 0; i < cards.length; i++) {
                        var card = cards[i]
                        if (player.canUse(card, event.targets[0]) && lib.filter.targetEnabled2(card, player, event.targets[0]) && lib.filter.targetInRange(card, player, event.targets[0])) {
                            bool = true
                            break
                        }
                    }
                    return bool && player != _status.currentPhase && event.player != player && event.targets[0].isAlive()
                },
                content: function () {
                    'step 0'
                    var cards = player.getCards('hs')
                    var bool = true
                    for (var i = 0; i < cards.length; i++) {
                        var card = cards[i]
                        if (player.canUse(card, trigger.targets[0]) && lib.filter.targetEnabled2(card, player, trigger.targets[0]) && lib.filter.targetInRange(card, player, trigger.targets[0])) {
                            bool = true
                            break
                        }
                    }
                    if (trigger.targets[0].isAlive() && bool) {
                        player.chooseToUse(function (card) {
                            return player.canUse(card, trigger.targets[0], false) && !get.info(card).multitarget && lib.filter.targetEnabled2(card, player, trigger.targets[0]) && lib.filter.targetInRange(card, player, trigger.targets[0]);
                        }, '是否对' + get.translation(trigger.targets[0] == player ? '自己' : trigger.targets[0]) + '使用一张牌，然后摸两张牌。', trigger.targets[0], -1);
                    } else {
                        event.finish()
                    }
                    'step 1'
                    if (result.bool) {
                        player.draw(2)
                    }
                }
            },
            "linyan_kr": {
                enable: 'phaseUse',
                multitarget: true,
                filterTarget: function (card, player, target) {
                    if (ui.selected.targets.length) {
                        return target.countCards('h') != ui.selected.targets[0].countCards('h')
                    }
                    return true;
                },
                filter: function (event, player) {
                    if (!player.storage.linyan_kr || player.storage.linyan_kr == false) {
                        return game.hasPlayer(function (current1) {
                            return game.hasPlayer(function (current2) {
                                return current1.countCards('h') != current2.countCards('h')
                            })
                        })
                    } else {
                        return game.hasPlayer(function (current) {
                            return current.countCards('h') < current.hp
                        })
                    }
                },
                selectTarget: function () {
                    var player = _status.event.player
                    if (!player.storage.linyan_kr || player.storage.linyan_kr == false) {
                        return 2
                    } else {
                        if (ui.selected.targets.length > ui.selected.cards.length) {
                            game.uncheck('target');
                        }
                        return ui.selected.cards.length;
                    }
                },
                usable: 1,
                check: function (target) {
                    if (!player.storage.linyan_kr || player.storage.linyan_kr == false) {
                        if (!ui.selected.targets) {
                            return 1 - 2 * Math.random()
                        } else {
                            var num = Math.floor((ui.selected.targets[0].countCards('h') + target.countCards('h')) / 2)
                            return num - target.countCards('h')
                        }
                    } else {
                        if (target.countCards('h') < target.maxHp) return (target.maxHp - target.countCards('h'))
                        return 0
                    }
                },
                position: 'h',
                filterCard: true,
                selectCard: function () {
                    var player = _status.event.player
                    if (!player.storage.linyan_kr || player.storage.linyan_kr == false) {
                        return 0
                    } else {
                        return [1, game.countPlayer(function (current) {
                            return current.countCards('h') < current.hp
                        })]
                    }
                },
                zhuanhuanji: true,
                init: function (player) {
                    if (!player.storage.linyan_kr) player.storage.linyan_kr = false
                },
                content: function () {
                    'step 0'
                    if (player.storage.linyan_kr == false) {
                        var num = Math.floor((targets[0].countCards('h') + targets[1].countCards('h')) / 2)
                        event.num = num
                        for (var i = 0; i < targets.length; i++) {
                            var num = targets[i].countCards('h') - event.num
                            if (num > 0) {
                                targets[i].chooseToDiscard('h', num, true)
                            } else {
                                targets[i].draw(-num)
                            }
                        }
                    } else {
                        for (var i = 0; i < targets.length; i++) {
                            if (targets[i].countCards('h') < targets[i].maxHp) {
                                targets[i].draw(Math.min((targets[i].maxHp - targets[i].countCards('h')), 5))
                            }
                        }
                    }
                    'step 1'
                    player.changeZhuanhuanji('linyan_kr')
                },
                ai: {
                    order: 14,
                    player: 1,
                    target: function (player, target, card) {
                        if (!player.storage.linyan_kr || player.storage.linyan_kr == false) {
                            if (!ui.selected.targets) {
                                return 1 - 2 * Math.random()
                            } else {
                                var num = Math.floor((ui.selected.targets[0].countCards('h') + target.countCards('h')) / 2)
                                return num - target.countCards('h')
                            }
                        } else {
                            if (target.countCards('h') < target.maxHp) return (target.maxHp - target.countCards('h'))
                            return 0
                        }
                    },
                }
            },
            "adward_yt": {
                mark: true,
                zhuanhuanji: true,
                enable: "phaseUse",
                usable: 1,
                init: function (player, storage) {
                    if (!player.storage.adward_yt) player.storage.adward_yt = false
                },
                intro: {
                    content: function (storage, player, skill) {
                        if (player.storage.adward_yt == true) return '你可令一名体力值最多的角色将体力值失去至与体力值最少的角色相同';
                        return '你可令一名体力值最少的角色将体力值回复至与体力值最多的角色相同';
                    },
                },
                filter: function (event, player) {
                    if (player.storage.adward_yt == true) {
                        return game.findPlayer(function (current) {
                            return current.isMaxHp() && !current.isMinHp()
                        })
                    } else {
                        return game.findPlayer(function (current) {
                            return current.isMinHp() && !current.isMaxHp() && current.hp != current.maxHp
                        })
                    }
                },
                filterTarget: function (card, player, target, skill) {
                    if (player.storage.adward_yt == true) {
                        return target.isMaxHp() && !target.isMinHp()
                    } else {
                        return target.isMinHp() && !target.isMaxHp() && target.hp != target.maxHp
                    }
                },
                content: function () {
                    if (player.storage.adward_yt == false) {
                        var ones = game.filterPlayer(function (current) {
                            return current.isMaxHp()
                        })
                        var num = Math.min(3, ones[0].hp - target.hp)
                        target.recover(num);
                    } else {
                        var ones = game.filterPlayer(function (current) {
                            return current.isMinHp()
                        })
                        var num = Math.min(3, target.hp - ones[0].hp)
                        target.loseHp(num);
                    }
                    player.changeZhuanhuanji('adward_yt')
                },
                ai: {
                    order: 14,
                    result: {
                        target: function (player, target, storage) {
                            if (player.storage.adward_yt) {
                                var ones = game.filterPlayer(function (current) {
                                    return current.isMinHp()
                                })
                                var num = Math.min(3, Math.abs(ones[0].hp - target.hp))
                                return -2 * num
                            } else {
                                var ones = game.filterPlayer(function (current) {
                                    return current.isMaxHp()
                                })
                                var num = Math.min(3, Math.abs(target.hp - ones[0].hp))
                                return 2 * num
                            }
                        },
                    },
                },
            },
            "fate_tm": {
                trigger: {
                    player: "phaseDrawBegin2",
                },
                forced: true,
                filter: function (event, player) {
                    return !event.numFixed;
                },
                popup: false,
                content: function () {
                    'step 0'
                    if (get.isLuckyStar(player)) {
                        event.num = 6;
                        player.throwDice(6);
                    }
                    else player.throwDice();
                    'step 1'
                    game.log(player, 'D6投掷的结果为', '#g' + event.num)
                    player.popup(event.num)
                    trigger.num = event.num
                },
                group: ["fate_tm_sha", "fate_tm_miss"],
                subSkill: {
                    sha: {
                        locked: true,
                        filter: function (event, player) {
                            return event.card && event.card.name == 'sha'
                        },
                        "prompt2": "进行一次r1D4，若结果为1，此【杀】伤害+1，若结果为3，此【杀】不计入出牌阶段的使用次数，若结果为4，此【杀】不可被闪避",
                        trigger: {
                            player: "useCardToPlayered",
                        },
                        check: function (event, player) {
                            return get.attitude(player, event.player) < 0
                        },
                        content: function () {
                            if (get.isLuckyStar(player)) {
                                var num = Math.floor(Math.random() * 4) + 1
                                if (num == 2) {
                                    num = 3
                                }
                            } else {
                                var num = Math.floor(Math.random() * 4) + 1
                            }
                            game.log(player, 'D4投掷的结果为', '#g' + num)
                            player.popup(num)
                            if (num == 1) {
                                var id = trigger.target.playerid;
                                var map = trigger.getParent().customArgs;
                                if (!map[id]) map[id] = {};
                                if (typeof map[id].extraDamage != 'number') {
                                    map[id].extraDamage = 0;
                                }
                                map[id].extraDamage++;
                            } else if (num == 4) {
                                trigger.getParent().directHit.push(trigger.target)
                            } else if (num == 3) {
                                trigger.player.getStat().card.sha--;
                            }
                        },
                        sub: true,
                    },
                    miss: {
                        trigger: {
                            source: "damageEnd",
                            player: "damageEnd",
                        },
                        popup: false,
                        filter: function (event, player) {
                            return player.storage.fate_ss < 100
                        },
                        forced: true,
                        content: function () {
                            player.storage.fate_ss += trigger.num
                            player.updateMark('fate_ss')
                        },
                        sub: true,
                    },
                },
            },
            "fate_ss": {
                audio: "ext:福瑞拓展:2",
                trigger: {
                    target: "useCardToTargeted",
                },
                init: function (player, storage) {
                    if (!player.storage.fate_ss) player.storage.fate_ss = 25
                    if (!player.storage.fate_ss_round) player.storage.fate_ss_round = 0
                },
                popup: false,
                filter: function (event, player) {
                    return event.player != player
                },
                check: function (event, player) {
                    return get.effect(player, event.card, event.player, player) < 0;
                },
                marktext: "闪避",
                mark: true,
                intro: {
                    markcount: function (storage, player) {
                        return (player.storage.fate_ss + player.storage.fate_ss_round);
                    },
                    mark: function (dialog, storage, player) {
                        dialog.addText('当前闪避值为：' + (player.storage.fate_ss + player.storage.fate_ss_round));
                    },
                },
                content: function () {
                    'step 0'
                    if (get.isLuckyStar(player)) {
                        num = 1
                    } else {
                        var num = Math.floor(Math.random() * 100) + 1
                    }
                    game.log(player, 'D100投掷的结果为', '#g' + num)
                    player.popup(num)
                    game.delay(2)
                    if (num <= player.storage.fate_ss + player.storage.fate_ss_round) {
                        if (num == 1) {
                            player.popup('大成功')
                            trigger.excluded.add(player)
                            trigger.player.damage(1, player)
                            event.finish()
                        }
                        player.popup('成功')
                        trigger.excluded.add(player)
                    } else if (num == 100) {
                        player.popup('大失败')
                        trigger.getParent().targets = trigger.getParent().targets.concat(trigger.targets);
                        trigger.getParent().triggeredTargets4 = trigger.getParent().triggeredTargets4.concat(trigger.targets);
                        if (player.storage.fate_ss_round + player.storage.fate_ss + 10 <= 100) {
                            player.storage.fate_ss_round += 10
                        } else {
                            player.storage.fate_ss_round += (100 - player.storage.fate_ss - player.storage.fate_ss_round)
                        }
                    } else {
                        player.popup('失败')
                        if (player.storage.fate_ss_round + player.storage.fate_ss + 10 <= 100) {
                            player.storage.fate_ss_round += 10
                        } else {
                            player.storage.fate_ss_round += (100 - player.storage.fate_ss - player.storage.fate_ss_round)
                        }
                    }
                },
                group: "fate_ss_clean",
                subSkill: {
                    clean: {
                        trigger: {
                            global: ["phaseBefore", "phaseAfter"],
                        },
                        charlotte: true,
                        forced: true,
                        popup: false,
                        content: function () {
                            player.storage.fate_ss_round = 0
                            player.updateMark('fate_ss')
                        },
                        sub: true,
                    },
                },
            },
            wangxing: {
                mark: true,
                intro: {
                    content: "回合结束时须弃置#张牌，否则失去1点体力上限",
                },
                charlotte: true,
                onremove: true,
                trigger: {
                    player: "phaseEnd",
                },
                forced: true,
                content: function () {
                    'step 0'
                    player.chooseToDiscard('he', player.countMark('wangxing'), '请弃置' + get.cnNumber(player.countMark('wangxing')) + '张牌，或失去1点体力上限').set('ai', function (card) {
                        var player = _status.event.player;
                        return 5 + Math.max(0, 5 - player.maxHp) - get.value(card);
                    });
                    'step 1'
                    if (!result.bool) player.loseMaxHp();
                },
            },
            "sayisu_fj": {
                marktext: "正",
                intro: {
                    mark: function (dialog, storage, player) {
                        dialog.addAuto(player.getCards('s', function (card) {
                            return card.hasGaintag('sayisu_fj');
                        }));
                    },
                    markcount: function (storage, player) {
                        return player.getCards('s', function (card) {
                            return card.hasGaintag('sayisu_fj');
                        }).length;
                    },
                    onunmark: function (storage, player) {
                        var cards = player.getCards('s', function (card) {
                            return card.hasGaintag('sayisu_fj');
                        });
                        if (cards.length) {
                            player.lose(cards, ui.discardPile);
                            player.$throw(cards, 1000);
                            game.log(cards, '进入了弃牌堆');
                        }
                    },
                },
                mod: {
                    aiOrder: function (player, card, num) {
                        if (get.itemtype(card) == 'card' && card.hasGaintag('sayisu_fj')) return num + 0.5;
                    },
                },
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                direct: true,
                content: function () {
                    'step 0'
                    player.chooseNumber([1, 4], Math.min(3, player.countCards('he'))).set('prompt', get.prompt('sayisu_fj')).set('prompt2', '妄行：将X张牌置于武将牌上').set('ai', function () {
                        var player = _status.event.player;
                        if (player.maxHp > 3) return 3;
                        return Math.min(3, player.countCards('he'));
                    });
                    'step 1'
                    if (result.bool) {
                        var num = result.choice, cards = get.cards(num);
                        player.logSkill('sayisu_fj');
                        player.addTempSkill('wangxing');
                        player.addMark('wangxing', num, false);
                        player.$gain2(cards, false);
                        game.log(player, '将', cards, '放到了武将牌上');
                        player.loseToSpecial(cards, 'sayisu_fj').visible = true;
                    } else event.finish();
                    'step 2'
                    player.markSkill('sayisu_fj');
                    game.delayx();
                },
                group: "sayisu_fj_gain",
                subSkill: {
                    gain: {
                        trigger: {
                            player: "phaseJieshuBegin"
                        },
                        filter: function (event, player) {
                            return player.isMinHandcard() && player.maxHp < 5
                        },
                        forced: true,
                        content: function () {
                            player.gainMaxHp()
                            player.recover()
                        }
                    }
                }
            },
            "liya_yy": {
                audio: 2,
                trigger: {
                    global: 'gameStart',
                    player: "phaseZhunbeiBegin",
                },
                forced: true,
                filter: function (event, player) {
                    if (!lib.inpile.contains('fr_equip5_wxpp')) return true;
                    return !!get.cardPile(function (card) {
                        return card.name == 'fr_equip5_wxpp';
                    });
                },
                content: function () {
                    var card;
                    if (!lib.inpile.contains('fr_equip5_wxpp')) {
                        card = game.createCard2('fr_equip5_wxpp', 'diamond', 1);
                        lib.inpile.push('fr_equip5_wxpp');
                    }
                    else card = get.cardPile(function (card) {
                        return card.name == 'fr_equip5_wxpp';
                    });
                    player.chooseUseTarget(card, true, 'nopopup');
                },
                group: "liya_yy_damage",
                subSkill: {
                    damage: {
                        trigger: {
                            player: "damageEnd",
                        },
                        forced: true,
                        filter: function (event, player) {
                            return !player.getEquip('fr_equip5_wxpp');
                        },
                        content: function () {
                            'step 0'
                            event.count = trigger.num;
                            'step 1'
                            event.count--;
                            player.draw();
                            'step 2'
                            var card = get.cardPile2(function (card) {
                                return get.subtype(card, false) == 'equip1' && player.canUse(card, player);
                            });
                            if (card) player.chooseUseTarget(card, true, 'nopopup');
                            'step 3'
                            if (event.count > 0 && !player.getEquip('fr_equip5_wxpp')) event.goto(1);
                        },
                        sub: true,
                    },
                },
            },
            "liya_sz": {
                trigger: {
                    player: "damageEnd",
                },
                mod: {
                    targetInRange: function (card, player, target) {
                        return true;
                    },
                },
                frequent: true,
                filter: function (event, player) {
                    return event.source && event.source.isIn() && event.source != player
                },
                check: function (event, player) {
                    return get.attitude(player, event.source) < 0
                },
                content: function () {
                    trigger.source.addSkill('liya_sz_far')
                    trigger.source.markSkill('liya_sz_far')
                },
                subSkill: {
                    far: {
                        trigger: {
                            player: "recoverEnd",
                        },
                        forced: true,
                        popup: false,
                        charlotte: true,
                        filter: function (event) {
                            return event.num > 0;
                        },
                        content: function () {
                            player.removeSkill('liya_sz_far');
                        },
                        mod: {
                            cardname: function (card, player, name) {
                                if (lib.card[card.name].type == 'trick') return 'sha';
                            },
                            attackFrom: function () {
                                return Infinity;
                            },
                            globalFrom: function (from, to, current) {
                                return current + game.countPlayer();
                            },
                        },
                        ai: {
                            effect: {
                                target: function (card, player, target, current) {
                                    if (get.tag(card, 'respondSha') && current < 0) return 0.6
                                },
                            },
                            respondSha: true,
                        },
                        sub: true,
                        mark: true,
                        intro: {
                            content: "攻击范围为0，计算与其他角色的距离+X，且你普通锦囊牌均视为【杀】",
                        },
                        sub: true,
                    },
                },
            },
            "liya_sj": {
                trigger: {
                    source: "damageBefore"
                },
                forced: true,
                content: function () {
                    trigger._triggered = null;
                    trigger.notrigger = true;
                }
            },
            "laays_fs": {
                group: ["laays_fs_1", "laays_fs_2", "laays_fs_3"],
                subSkill: {
                    "1": {
                        position: "hes",
                        enable: "chooseToUse",
                        filterCard: function (card) {
                            return get.color(card) == 'red';
                        },
                        viewAs: {
                            name: "huogong",
                            nature: "fire",
                        },
                        viewAsFilter: function (player) {
                            if (!player.countCards('hes', { color: 'red' })) return false;
                        },
                        prompt: "将一张红色牌当【火攻】使用",
                        check: function (card) {
                            var player = _status.currentPhase;
                            if (player.countCards('h') > player.hp) {
                                return 6 - get.value(card);
                            }
                            return 4 - get.value(card)
                        },
                        ai: {
                            fireAttack: true,
                            basic: {
                                order: 4,
                                value: [3, 1],
                                useful: 1,
                            },
                            wuxie: function (target, card, player, current, state) {
                                if (get.attitude(current, player) >= 0 && state > 0) return false;
                            },
                            result: {
                                player: function (player) {
                                    var nh = player.countCards('h');
                                    if (nh <= player.hp && nh <= 4 && _status.event.name == 'chooseToUse') {
                                        if (typeof _status.event.filterCard == 'function' &&
                                            _status.event.filterCard({ name: 'huogong' }, player, _status.event)) {
                                            return -10;
                                        }
                                        if (_status.event.skill) {
                                            var viewAs = get.info(_status.event.skill).viewAs;
                                            if (viewAs == 'huogong') return -10;
                                            if (viewAs && viewAs.name == 'huogong') return -10;
                                        }
                                    }
                                    return 0;
                                },
                                target: function (player, target) {
                                    if (target.hasSkill('huogong2') || target.countCards('h') == 0) return 0;
                                    if (player.countCards('h') <= 1) return 0;
                                    if (target == player) {
                                        if (typeof _status.event.filterCard == 'function' &&
                                            _status.event.filterCard({ name: 'huogong' }, player, _status.event)) {
                                            return -1.5;
                                        }
                                        if (_status.event.skill) {
                                            var viewAs = get.info(_status.event.skill).viewAs;
                                            if (viewAs == 'huogong') return -1.5;
                                            if (viewAs && viewAs.name == 'huogong') return -1.5;
                                        }
                                        return 0;
                                    }
                                    return -1.5;
                                },
                            },
                            tag: {
                                damage: 1,
                                fireDamage: 1,
                                natureDamage: 1,
                                norepeat: 1,
                            },
                        },
                        sub: true,
                    },
                    "2": {
                        enable: "chooseToUse",
                        filter: function (event, player) {
                            return player.countCards('hs', { suit: 'club' }) > 0;
                        },
                        filterCard: {
                            color: "black",
                        },
                        viewAs: {
                            name: "tiesuo",
                        },
                        prompt: "将一张黑色牌当铁锁连环使用",
                        check: function (card) { return 6 - get.value(card) },
                        ai: {
                            wuxie: function (target, card, player, viewer) {
                                if (_status.event.getRand() < 0.5) return 0;
                                if (player == game.me && get.attitude(viewer, player) > 0) {
                                    return 0;
                                }
                            },
                            basic: {
                                useful: 4,
                                value: 4,
                                order: 7,
                            },
                            result: {
                                target: function (player, target) {
                                    if (target.isLinked()) {
                                        if (target.hasSkillTag('link')) return 0;
                                        var f = target.hasSkillTag('nofire');
                                        var t = target.hasSkillTag('nothunder');
                                        if (f && t) return 0;
                                        if (f || t) return 0.5;
                                        return 2;
                                    }
                                    if (get.attitude(player, target) >= 0) return -0.9;
                                    if (ui.selected.targets.length) return -0.9;
                                    if (game.hasPlayer(function (current) {
                                        return get.attitude(player, current) <= -1 && current != target && !current.isLinked();
                                    })) {
                                        return -0.9;
                                    }
                                    return 0;
                                },
                            },
                            tag: {
                                multitarget: 1,
                                multineg: 1,
                                norepeat: 1,
                            },
                        },
                        sub: true,
                    },
                    "3": {
                        mod: {
                            selectTarget: function (card, player, range) {
                                if (card.name == 'tiesuo' && range[1] != -1) range[1]++;
                            },
                        },
                        sub: true,
                    },
                },
            },
            "laays_cs": {
                enable: "phaseUse",
                filterTarget: function (card, player, target) {
                    if (player == target) return false;
                    if (player.countCards('h') == 0) return false;
                    return true;
                },
                usable: 1,
                content: function () {
                    'step 0'
                    event.num = 1
                    'step 1'
                    target.chooseBool('是否令' + get.translation(player) + '摸' + get.cnNumber(event.num) + '张牌').set('ai', function () {
                        var player = _status.event.player
                        var target = _status.event.target
                        if (get.attitude(player, target) > 0) {
                            return true
                        } else {
                            return false
                        }
                    }).set('target', player)
                    'step 2'
                    if (result.bool) {
                        player.draw(event.num)
                    } else {
                        event.finish()
                        return
                    }
                    'step 3'
                    player.chooseCard('h', 2 * event.num, false).set('prompt', '是否交给' + get.translation(target) + get.cnNumber(2 * event.num) + '张牌').set('ai', function (card) {
                        var player = _status.event.player
                        var target = _status.event.target
                        if (get.attitude(player, target) > 0) {
                            return 9 - get.value(card)
                        } else {
                            return -1
                        }
                    }).set('target', target)
                    'step 4'
                    if (result.bool) {
                        target.gain(result.cards, player, 'giveAuto')
                        event.num += 1
                        event.goto(1)
                    } else {
                        event.finish()
                        return
                    }
                },
                ai: {
                    result: {
                        target: function (player, target) {
                            return 1;
                        },
                        player: function (player, target) {
                            return 1;
                        }
                    },
                    order: 14,
                },
            },
            "mala_ht": {
                mod: {
                    targetInRange: function (card, player, target) {
                        return true;
                    },
                    cardUsable: function (card, player, num) {
                        return Infinity
                    },
                    selectTarget: function (card, player, range) {
                        if (range[0] != 1 || range[1] != 1) return;
                        var range2 = get.select(get.info(card).selectTarget);
                        if (range2[0] != 1 && range2[1] != 1) return;
                        if (card.name == 'sha' || get.type(card) == 'trick') range[1] = (1 + player.getDamagedHp());
                    },
                },
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                forced: true,
                filter: function (event, player) {
                    return player.countCards('j') > 0
                },
                content: function () {
                    player.discard(player.getCards('j').randomGet());
                },
            },
            "mala_ly": {
                trigger: {
                    player: "damageBegin4",
                },
                filter: function (event) {
                    return event.nature
                },
                forced: true,
                content: function () {
                    trigger.cancel();
                    player.draw(trigger.num)
                },
                group: ["mala_ly_draw", "mala_ly_hp"],
                subSkill: {
                    hp: {
                        trigger: {
                            player: "loseHpBegin",
                        },
                        forced: true,
                        content: function () {
                            trigger.cancel();
                            player.draw(trigger.num)
                        },
                        sub: true,
                    },
                    draw: {
                        trigger: {
                            player: "phaseDrawBegin2",
                        },
                        forced: true,
                        content: function () {
                            trigger.num += Math.ceil(player.getDamagedHp() / 2)
                        },
                        sub: true,
                    },
                },
                ai: {
                    nofire: true,
                    maixie: true,
                    nothunder: true,
                    effect: {
                        target: function (card, player, target, current) {
                            if (get.tag(card, 'fireDamage')) return 'zerotarget';
                            if (get.tag(card, 'thunderDamage')) return 'zerotarget';
                            if (card.name == 'tiesuo') return 'zeroplayertarget';
                        },
                    },
                },
            },
            "dier_ly": {
                trigger: {
                    player: ["damageBegin4", 'loseHpBegin']
                },
                filter: function (event) {
                    if (event.name == 'damage') {
                        return event.nature
                    } else {
                        return true
                    }
                },
                mod: {
                    targetInRange: function (card, player, target, now) {
                        return true
                    },
                },
                forced: true,
                content: function () {
                    player.draw(trigger.num)
                },
                group: ["dier_ly_draw"],
                subSkill: {
                    draw: {
                        trigger: {
                            player: "phaseDrawBegin2",
                        },
                        charlotte: true,
                        unique: true,
                        supercharlotte: true,
                        forced: true,
                        content: function () {
                            trigger.num += Math.ceil(player.getDamagedHp() / 2)
                        },
                        sub: true,
                    },
                },
                ai: {
                    nofire: true,
                    maixie: true,
                    nothunder: true,
                    effect: {
                        target: function (card, player, target, current) {
                            if (get.tag(card, 'fireDamage')) return 'zerotarget';
                            if (get.tag(card, 'thunderDamage')) return 'zerotarget';
                            if (card.name == 'tiesuo') return 'zeroplayertarget';
                        },
                    },
                },
            },
            "mala_jf": {
                trigger: {
                    player: "loseMaxHpBegin",
                },
                forced: true,
                charlotte: true,
                supercharlotte: true,
                content: function () {
                    trigger.finish()
                    trigger.cancel()
                    var num = player.maxHp
                    player.gainMaxHp(num)
                    player.recover(num)
                },
            },
            "mala_hy": {
                trigger: {
                    source: "damageEnd",
                },
                filter: function (event, player) {
                    return event.player != player
                },
                forced: true,
                content: function () {
                    "step 0"
                    trigger.player.addSkill('mala_hy_damage')
                    trigger.player.storage.mala_hy_damage += 1
                    "step 1"
                    trigger.player.updateMark('mala_hy_damage')
                },
                subSkill: {
                    damage: {
                        unique: true,
                        init: function (player) {
                            if (!player.storage.mala_hy_damage) player.storage.mala_hy_damage = 0;
                        },
                        filter: function (event, player) {
                            return player.storage.mala_hy_damage
                        },
                        mark: true,
                        intro: {
                            content: "出牌阶段结束时，你选择一项：1.弃置X张牌；2.受到X点火焰伤害（X为你的“魂焱”标记数）。",
                        },
                        forced: true,
                        trigger: {
                            player: "phaseUseEnd",
                        },
                        content: function () {
                            "step 0"
                            player.chooseToDiscard(player.storage.mala_hy_damage).set('ai', function (card) {
                                return get.unuseful(card) + 2.5 * (5 - get.owner(card).hp);
                            });
                            "step 1"
                            if (result.bool == false) {
                                player.damage(player.storage.mala_hy_damage, 'fire', 'nosource');
                            }
                        },
                        sub: true,
                    },
                },
            },
            "mala_bc": {
                group: ["mala_bc_begin", "mala_bc_draw", "mala_bc_use", "mala_bc_discard", "mala_bc_end"],
                trigger: {
                    player: "turnOverBegin",
                },
                firstDo: true,
                content: function () {
                    trigger.cancel()
                },
                ai: {
                    noCompareTarget: true,
                },
                subSkill: {
                    begin: {
                        trigger: {
                            player: "phaseZhunbeiBegin",
                        },
                        forced: true,
                        popup: false,
                        content: function () {
                            player.storage.mala_bc_draw = true;
                            player.storage.mala_bc_use = true;
                        },
                        sub: true,
                    },
                    draw: {
                        trigger: {
                            player: "phaseDrawBegin",
                        },
                        forced: true,
                        popup: false,
                        content: function () {
                            player.storage.mala_bc_draw = false;
                        },
                        sub: true,
                    },
                    use: {
                        trigger: {
                            player: "phaseUseBegin",
                        },
                        forced: true,
                        popup: false,
                        content: function () {
                            player.storage.mala_bc_use = false;
                        },
                        sub: true,
                    },
                    discard: {
                        trigger: {
                            player: "phaseDiscardBefore",
                        },
                        forced: true,
                        filter: function (event, player) {
                            if (player.storage.mala_bc_use) return true;
                            return false;
                        },
                        content: function () {
                            trigger.cancel();
                        },
                        sub: true,
                    },
                    end: {
                        trigger: {
                            player: "phaseJieshuBegin",
                        },
                        forced: true,
                        filter: function (event, player) {
                            if (player.storage.mala_bc_draw) return true;
                            return false;
                        },
                        content: function () {
                            player.draw(3);
                        },
                        sub: true,
                    },
                },
            },
            "mala_sz": {
                trigger: {
                    source: "damageBegin4",
                },
                check: function (event, player) {
                    return player.hp > 2 && event.player.hp > event.num && !event.player.hasSkillTag('filterDamage', null, {
                        player: player,
                        card: event.card,
                    }) && get.attitude(player, event.player) < 0;
                },
                filter: function (event, player) {
                    return event.player != player
                },
                content: function () {
                    "step 0"
                    player.loseHp()
                    "step 1"
                    trigger.num = trigger.num * 2;
                },
                group: "mala_sz_1",
                subSkill: {
                    "1": {
                        trigger: {
                            player: "damageEnd",
                        },
                        forced: true,
                        content: function () {
                            var evt = _status.event.getParent('phaseUse');
                            if (evt && evt.name == 'phaseUse') {
                                evt.skipped = true;
                            }
                            var evt = _status.event.getParent('phase');
                            if (evt && evt.name == 'phase') {
                                evt.finish();
                            }
                        },
                        ai: {
                            jueqing: true,
                        },
                        sub: true,
                    },
                },
            },
            "zeta_gz": {
                trigger: {
                    global: "phaseEnd",
                },
                filter: function (event, player) {
                    var list = [];
                    game.getGlobalHistory('cardMove', function (evt) {
                        if (evt.name == 'lose') {
                            if (evt.position == ui.discardPile) {
                                for (var i of evt.cards) list.add(i);
                            }
                        }
                        else {
                            if (evt.name == 'cardsDiscard') {
                                for (var i of evt.cards) list.add(i);
                            }
                        }
                    });
                    list = list.filterInD('d')
                    var suit = []
                    for (var j = 0; j < list.length; j++) {
                        var cardsuit = get.suit(list[j])
                        if (!suit || !suit.contains(cardsuit)) {
                            suit.push(cardsuit)
                        }
                    }
                    if (suit.length == 4) {
                        return true
                    }
                    return false
                },
                frequent: true,
                content: function () {
                    'step 0'
                    var list = [];
                    game.getGlobalHistory('cardMove', function (evt) {
                        if (evt.name == 'lose') {
                            if (evt.position == ui.discardPile) {
                                for (var i of evt.cards) list.add(i);
                            }
                        }
                        else {
                            if (evt.name == 'cardsDiscard') {
                                for (var i of evt.cards) list.add(i);
                            }
                        }
                    });
                    list = list.filterInD('d')
                    var suitsort = [[], [], [], []]
                    for (var j = 0; j < list.length; j++) {
                        var cardsuit = get.suit(list[j])
                        if (cardsuit == 'heart') {
                            suitsort[0].push(list[j])
                        } else if (cardsuit == 'diamond') {
                            suitsort[1].push(list[j])
                        } else if (cardsuit == 'spade') {
                            suitsort[2].push(list[j])
                        } else if (cardsuit == 'club') {
                            suitsort[3].push(list[j])
                        }
                    }
                    event.suitsort = suitsort
                    player.chooseControl('heart', 'diamond', 'spade', 'club', 'cancel2').set('prompt', '请选择一种花色').set('choiceList', [get.translation(suitsort[0]), get.translation(suitsort[1]), get.translation(suitsort[2]), get.translation(suitsort[3])]).set('ai', function () {
                        var value1 = 0
                        var value2 = 0
                        var index = 0
                        for (var i = 0; i < 4; i++) {
                            for (j = 0; j < suitsort[i].length; j++) {
                                value2 += get.value(suitsort[i][j])
                            }
                            if (value2 >= value1) {
                                value1 = value2
                                value2 = 0
                                index = i
                            }
                        }
                        return ['heart', 'diamond', 'spade', 'club'][index]
                    })
                    'step 1'
                    if (result.control == 'cancel2') {
                        event.finish()
                    }
                    event.cards = event.suitsort[result.index];
                    player.gain(event.cards, 'gain2')
                    'step 2'
                    player.chooseCardTarget({
                        filterCard: function (card) {
                            return _status.event.getParent().cards.contains(card);
                        },
                        selectCard: [1, event.cards.length],
                        filterTarget: function (card, player, target) {
                            return player != target;
                        },
                        ai1: function (card) {
                            if (ui.selected.cards.length > 0) return -1;
                            if (card.name == 'du') return 20;
                            return (_status.event.player.countCards('h') - _status.event.player.hp);
                        },
                        ai2: function (target) {
                            var att = get.attitude(_status.event.player, target);
                            if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
                                return 1 - att;
                            }
                            return att - 4;
                        },
                        prompt: '请选择要送人的卡牌'
                    });
                    "step 3"
                    if (result.bool) {
                        player.line(result.targets, 'green');
                        result.targets[0].gain(result.cards, player, 'giveAuto');
                        for (var i = 0; i < result.cards.length; i++) {
                            event.cards.remove(result.cards[i]);
                        }
                        if (event.cards.length) event.goto(2);
                    }
                    'step 4'
                    if (!event.cards.length) {
                        player.storage.zeta_fg = ['basic', 'trick', 'equip']
                        player.updateMark('zeta_fg')
                        player.chooseTarget('令一名角色执行一个额外的出牌阶段').set('ai', function (target) {
                            var player = _status.event.target
                            return get.attitude(player, target)
                        })
                    } else {
                        event.finish()
                    }
                    'step 5'
                    if (result.bool) {
                        var next = result.targets[0].phaseUse();
                        event.next.remove(next);
                        trigger.next.push(next);
                    }
                },
            },
            'hars_hr': {
                global: 'hars_hr_gola',
                trigger: {
                    target: "useCardToTargeted",
                },
                check: function (event, player) {
                    return get.effect(player, event.card, event.player, player) < 0;
                },
                filter: function (event, player) {
                    return (event.card.name == 'sha' || (get.type(event.card) == 'trick' && get.tag(event.card, 'damage'))) && event.player != player;
                },
                frequent: true,
                logTarget: "player",
                content: function () {
                    'step 0'
                    trigger.player.chooseBool('是否令此牌对' + get.translation(player) + '无效，并令其摸两张牌')
                        .set('ai', function () {
                            var player = _status.event.player
                            var target = _status.event.target
                            return get.attitude(player, target) > 0 && get.effect(target, trigger.card, player, target) < 0
                        }).set('target', player)
                    'step 1'
                    if (result.bool) {
                        trigger.targets.remove(player);
                        trigger.getParent().triggeredTargets2.remove(player);
                        trigger.untrigger();
                        player.draw(2)
                    }
                },
                subSkill: {
                    'gola': {
                        enable: "phaseUse",
                        filter: function (event, player) {
                            return game.hasPlayer(function (current) {
                                return current != player && current.hasSkill('hars_hr');
                            });
                        },
                        filterTarget: function (card, player, target) {
                            return player != target && target.hasSkill('hars_hr');
                        },
                        lose: false,
                        discard: false,
                        delay: false,
                        check: function (card) {
                            return 8 - get.value(card)
                        },
                        filterCard: true,
                        selectCard: [1, 2],
                        usable: 1,
                        prompt: "出牌阶段限一次，你可以交给拥有技能【浩然】的角色至多两张牌。",
                        content: function () {
                            target.gain(cards, player, 'giveAuto')
                        },
                        ai: {
                            order: 10,
                            expose: 0.2,
                            result: {
                                player: function (player, target) {
                                    var target = game.findPlayer(function (current) {
                                        return current.hasSkill('bolan');
                                    });
                                    if (target) {
                                        return get.attitude(player, target);
                                    }
                                },
                            },
                        },
                    }
                }
            },
            "zeta_fg": {
                trigger: {
                    player: "useCardAfter",
                },
                init: function (player) {
                    if (!player.storage.zeta_fg) player.storage.zeta_fg = ['basic', 'trick', 'equip']
                },
                filter: function (event, player) {
                    return event.card && player.storage.zeta_fg.contains(get.type2(event.card))
                },
                frequent: true,
                mark: true,
                intro: {
                    mark: function (dialog, storage, player) {
                        dialog.addText('目前可用的类型');
                        var list = []
                        for (var i = 0; i < player.storage.zeta_fg.length; i++) {
                            list.push(get.translation(player.storage.zeta_fg[i]) + '牌')
                        }
                        dialog.addText(list)
                    },
                },
                content: function () {
                    'step 0'
                    player.storage.zeta_fg.remove(get.type2(trigger.card))
                    player.chooseControl('基本牌', '非基本牌').set('prompt', '请选择你想检索牌的类型').set('ai', function () {
                        return ['基本牌', '非基本牌'].randomGet()
                    })
                    'step 1'
                    player.storage.index = result.index
                    'step 2'
                    var cards = get.cards()
                    if (player.storage.index == 0) {
                        if (get.type2(cards[0]) == 'basic') {
                            player.gain(cards)
                            event.finish()
                            return
                        } else {
                            player.discard(cards)
                            event.redo()
                        }
                    } else {
                        if (get.type2(cards[0]) != 'basic') {
                            player.gain(cards)
                            event.finish()
                            return
                        } else {
                            player.discard(cards)
                            event.redo()
                        }
                    }
                },
                group: "zeta_fg_1",
                subSkill: {
                    "1": {
                        trigger: {
                            global: "roundStart",
                            player: "enterGame",
                        },
                        forced: true,
                        unique: true,
                        content: function () {
                            player.storage.zeta_fg = ['basic', 'trick', 'equip']
                            player.updateMark('zeta_fg')
                        },
                        sub: true,
                    },
                },
            },
            "fox_hm": {
                trigger: {
                    player: "useCardAfter",
                },
                forced: true,
                filter: function (event, player) {
                    if (!event.targets.length) return false
                    return event.card.isCard && (get.type(event.card) == 'trick' || get.type(event.card) == 'basic') &&
                        get.position(event.cards[0], true) == 'o' && event.card.name == event.cards[0].name && event.getParent().name != 'fox_hm_1'
                },
                intro: {
                    markcount: function (storage) {
                        if (!storage) return 0;
                        return storage[0].length;
                    },
                    mark: function (dialog, storage, player) {
                        if (!storage) return;
                        dialog.addAuto(storage[0]);
                        dialog.addText(get.translation(storage[1]));
                    },
                    onunmark: function (storage, player) {
                        player.storage.fox_hm = [[], []];
                    },
                },
                onremove: function (player, skill) {
                    var cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                    delete player.storage[skill];
                },
                content: function () {
                    var card = trigger.cards[0];
                    if (!player.storage.fox_hm) player.storage.fox_hm = [[], []];
                    player.addToExpansion(card, 'gain2').gaintag.add('fox_hm');
                    player.storage.fox_hm[0].push(card);
                    player.storage.fox_hm[1].push(trigger.targets);
                    game.delayx();
                },
                group: "fox_hm_1",
                subSkill: {
                    "1": {
                        trigger: {
                            player: "phaseJieshuBegin",
                        },
                        forced: true,
                        filter: function (event, player) {
                            return player.storage.fox_hm && player.storage.fox_hm[0].length > 0;
                        },
                        content: function () {
                            var list = player.storage.fox_hm, card = list[0].shift(), source = list[1].shift();
                            if (player.getExpansions('fox_hm').contains(card)) {
                                for (var i = 0; i < source.length; i++) {
                                    if (!source[i].isIn() || !player.canUse(card, source[i], false)) {
                                        source.remove(source[i])
                                    }
                                }
                                if (source.length != 0) player.useCard(card, source, false);
                                else player.loseToDiscardpile(card);
                            }
                            if (list[0].length) {
                                event.redo()
                            } else {
                                event.finish()
                            }
                        },
                        sub: true,
                    },
                },
            },
            "molis_hs": {
                group: "molis_hs_record",
                skillAnimation: true,
                animationColor: "gray",
                unique: true,
                limited: true,
                mark: true,
                intro: {
                    content: "limited",
                },
                trigger: {
                    player: "dying",
                },
                video: function (player, data) {
                    for (var i in data) {
                        var current = game.playerMap[i];
                        current.node.handcards1.innerHTML = '';
                        current.node.handcards2.innerHTML = '';
                        current.node.equips.innerHTML = '';
                        current.node.judges.innerHTML = '';
                        current.directgain(get.infoCards(data[i].h));
                        current.directequip(get.infoCards(data[i].e));
                    }
                },
                getinfo: function (player) {
                    var js = player.getCards("j");
                    var js2 = [];
                    for (var k = 0; k < js.length; k++) {
                        var name = js[k].viewAs || js[k].name;
                        js2.push(name);
                    }
                    var isDisabled = [];
                    for (var j = 1; j < 7; j++) {
                        isDisabled.push(player.isDisabled(j));
                    }
                    var storage = {
                        player: player,
                        hs: player.getCards("h"),
                        es: player.getCards("e"),
                        isDisabled: isDisabled,
                        hp: player.hp,
                        maxHp: player.maxHp,
                        _disableJudge: player.storage._disableJudge,
                        isTurnedOver: player.isTurnedOver(),
                        isLinked: player.isLinked(),
                        js: js,
                        js2: js2,
                    };
                    return storage;
                },
                content: function () {
                    'step 0'
                    player.awakenSkill('molis_hs');
                    event.storage = player.storage.molis_hs_save.slice(0);
                    'step 1'
                    event.doing = event.storage.shift();
                    event.target = event.doing.player;
                    'step 2'
                    if (target.isDead()) target.revive(1);
                    'step 3'
                    var hp = event.doing.hp;
                    target.hp = hp;
                    var hs = target.getCards('he');
                    if (hs.length) target.lose(hs)._triggered = null;
                    'step 4'
                    var hs = event.doing.hs;
                    var hs2 = [];
                    for (var i = 0; i < hs.length; i++) {
                        var card = get.cardPile(function (cardx) {
                            return cardx == hs[i];
                        });
                        if (!card) {
                            card = game.createCard(hs[i]);
                        }
                        hs2.push(card);
                    }
                    if (hs2.length) target.directgain(hs2);
                    'step 5'
                    var isDisabled = event.doing.isDisabled;
                    for (var i = 0; i < isDisabled.length; i++) {
                        if (isDisabled[i] == false && target.isDisabled(i + 1)) target.enableEquip(i + 1)._triggered = null;
                        if (isDisabled[i] == true && !target.isDisabled(i + 1)) target.disableEquip(i + 1)._triggered = null;
                    }
                    'step 6'
                    var es = event.doing.es;
                    var es2 = [];
                    for (var i = 0; i < es.length; i++) {
                        var card = get.cardPile(function (cardx) {
                            return cardx == es[i];
                        });
                        if (!card) {
                            card = game.createCard(es[i]);
                        }
                        es2.push(card);
                    }
                    if (es2.length) target.directequip(es2);
                    'step 7'
                    target.update();
                    'step 8'
                    if (event.storage.length) event.goto(1);
                    'step 9'
                    game.animate.window(1);
                    var data = {};
                    for (var i = 0; i < game.players.length; i++) {
                        data[game.players[i].dataset.position] = {
                            h: get.cardsInfo(game.players[i].getCards('h')),
                            e: get.cardsInfo(game.players[i].getCards('e')),
                            j: get.cardsInfo(game.players[i].getCards('j'))
                        }
                    }
                    game.addVideo('skill', player, ['molis_hs', data]);
                    game.animate.window(2);
                    ui.updatehl();
                    'step 10'
                    var cards = get.cards(ui.cardPile.childElementCount + 1);
                    for (var i = 0; i < cards.length; i++) {
                        ui.cardPile.insertBefore(cards[i], ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
                    }
                    player.addSkill('molis_hs_lock')
                    game.updateRoundNumber();
                },
                ai: {
                    save: true,
                    skillTagFilter: function (player, arg, target) {
                        return player == target && player.storage.molis_hs != true;
                    },
                    result: {
                        player: 10,
                    },
                    threaten: function (player, target) {
                        if (!target.storage.molis_hs) return 0.9;
                    },
                },
                subSkill: {
                    lock: {
                        trigger: {
                            global: "roundStart",
                        },
                        forced: true,
                        popup: false,
                        silent: true,
                        firstDo: true,
                        content: function () {
                            game.roundNumber -= 1;
                            game.updateRoundNumber();
                        },
                        sub: true,
                    },
                    record: {
                        trigger: {
                            global: "roundStart",
                        },
                        popup: false,
                        silent: true,
                        firstDo: true,
                        forced: true,
                        filter: function (event, player) {
                            if (player.storage.molis_hs) return false;
                            return true;
                        },
                        content: function () {
                            var storage = [];
                            var players = game.filterPlayer();
                            for (i = 0; i < players.length; i++) {
                                storage.push(lib.skill.molis_hs.getinfo(players[i]));
                            }
                            player.storage.molis_hs_save = storage;
                        },
                        sub: true,
                    },
                },
            },
            "marcia_ql": {
                trigger: {
                    target: "useCardToTarget",
                },
                marktext: "潜",
                intro: {
                    markcount: "expansion",
                    content: "expansion",
                    onunmark: function (storage, player) {
                        if (storage && storage.length) {
                            player.$throw(storage, 1000);
                            game.cardsDiscard(storage);
                            game.log(storage, '被置入了弃牌堆');
                            storage.length = 0;
                        }
                    },
                },
                forced: true,
                init: function (player, storage) {
                    if (!player.storage.marcia_ql_color) player.storage.marcia_ql_color = ['red', 'black']
                },
                filter: function (event, player) {
                    if (event.player == player) return false
                    if (event.cards.length != 1 || event.targets.length != 1) return false
                    var bool1 = (event.card.name == 'sha');
                    var bool2 = (get.type2(event.card) == 'trick' && get.tag(event.card, 'damage'));
                    if (!bool1 && !bool2) return false;
                    return player.storage.marcia_ql_color.contains(get.color(event.cards))
                },
                logTarget: "player",
                content: function () {
                    'step 0'
                    player.storage.marcia_ql_color.remove(get.color(trigger.cards))
                    player.addToExpansion(trigger.cards, 'gain2').gaintag.add('marcia_ql');
                    trigger.targets.remove(player);
                    trigger.getParent().triggeredTargets2.remove(player);
                    trigger.untrigger();
                    player.markSkill('marcia_ql');
                },
                group: ["marcia_ql_new", "marcia_ql_gain"],
                subSkill: {
                    new: {
                        trigger: {
                            global: "phaseBefore",
                        },
                        forced: true,
                        unique: true,
                        popup: false,
                        content: function () {
                            player.storage.marcia_ql_color = ['red', 'black']
                        },
                        sub: true,
                    },
                    gain: {
                        trigger: {
                            player: "phaseUseBegin",
                        },
                        filter: function (event, player) {
                            return player.getExpansions('marcia_ql').length > 0;
                        },
                        forced: true,
                        unique: true,
                        content: function () {
                            var cards = player.getExpansions('marcia_ql');
                            if (cards.length > 0) {
                                player.gain(cards, 'gain2');
                            }
                        },
                        sub: true,
                    },
                },
            },
            "molis_dx": {
                trigger: {
                    player: "useCardToPlayer",
                },
                usable: 1,
                filter: function (event, player) {
                    if (!event.isFirstTarget || !event.targets) return false;
                    return get.tag(event.card, 'damage');
                },
                SkillCheck: function (player, skill) {
                    var bool = true;
                    if (skill == 'jiu') bool = false;
                    if (!lib.translate[skill + '_info']) bool = false;
                    if (lib.translate[skill + '_info'] == '') bool = false;
                    var info = get.info(skill);
                    if (!info) bool = false;
                    if (info.zhuSkill && !player.hasZhuSkill(skill)) bool = false;
                    return bool;
                },
                direct: true,
                content: function () {
                    'step 0'
                    player.chooseTarget(get.prompt2('molis_dx'), function (card, player, target) {
                        var trigger = _status.event.getTrigger();
                        return trigger.targets.contains(target);
                    }).set('ai', function (target) {
                        //初始化玩家和事件
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var att = get.attitude(player, target);
                        //如果命中的伤害值
                        var damageNum = trigger.getParent().baseDamage;
                        var map = trigger.getParent().customArgs, id = target.playerid;
                        if (map[id]) {
                            if (typeof map[id].baseDamage == 'number') damageNum = map[id].baseDamage;
                            if (typeof map[id].extraDamage == 'number') damageNum += map[id].extraDamage;
                        }
                        if (target.hasSkillTag('filterDamage', null, {
                            player: trigger.player,
                            card: trigger.card,
                        })) damageNum = 1;
                        var num = target.getSkills(null, false, false).filter(function (skill) {
                            return lib.skill.molis_dx.SkillCheck(target, skill);
                        }).length + 1;
                        var list = [0, 0, 0];
                        var player = _status.event.player;
                        list[0] = num;
                        list[1] = (get.effect(target, { name: 'guohe_copy2' }, player, player) > 0 ? ((target.hp - damageNum < player.hp) ? num : (num - Math.min(player.getCards('he'), num - 1))) : 0);
                        var yimie = function () {
                            //定义hit属性
                            var hit = true;
                            //锦囊有无懈不加伤
                            if (get.type(trigger.card) == 'trick' && trigger.player.countCards('hs', { name: 'wuxie' })) hit = false;
                            //品神火攻不加伤
                            if (trigger.card.name == 'huogong' && trigger.player.countCards('h', function (card) {
                                var list = [];
                                for (var i of player.getCards('h')) {
                                    list.add(get.suit(i))
                                }
                                return !list.contains(get.suit(card));
                            })) hit = false;
                            //其余响应类卡牌
                            var key = [];
                            switch (trigger.card.name) {
                                case 'sha': case 'wanjian': key = ['shan']; break;
                                case 'juedou': case 'nanman': case 'jiedao': key = ['sha']; break;
                            }
                            if (get.type(trigger.card) == 'trick') key.push('wuxie');
                            //定义治疗收益和目标角色是否能响应此牌
                            var bool1 = ((get.recoverEffect(target, player, player) > 0) ? 1 : -1);
                            var bool2 = (((att > 0 && !hit) || (target.countCards('hs', { name: key }) && !trigger.getParent().directHit.contains(target))) ? 1 : -1);
                            //排除无法将敌人打进濒死时使用夷灭
                            if (att <= 0 && target.hp - damageNum > 0) return false;
                            //排除对0态度的敌人发动夷灭
                            return bool1 = bool2 && att != 0;
                        };
                        if (yimie()) list[2] = (get.recoverEffect(target, player, player) > get.damageEffect(target, player, player) ? (Math.min(num - 1, target.getDamagedHp())) : (num - 1)) * 2;
                        //按照一血两牌计算各选项收益后进行选择
                        return Math.max.apply(Math, list);
                    })
                    'step 1'
                    if (result.bool) {
                        var target = result.targets[0];
                        event.target = target;
                        player.storage.molis_dx = target
                        player.logSkill('molis_dx', target);
                        var num = target.getSkills(null, false, false).filter(function (skill) {
                            return lib.skill.molis_dx.SkillCheck(target, skill);
                        }).length + 1;
                        event.num = num;
                        var list = ['摸牌'];
                        var choiceList = ['摸' + get.cnNumber(num) + '张牌，若' + get.translation(target) + '响应此牌，你弃置' + get.cnNumber(num) + '张牌'];
                        if (target.countGainableCards('h', player)) {
                            list.push('拿牌');
                            choiceList.push('获得' + get.translation(target) + get.cnNumber(num) + '张牌，若此牌造成了伤害，你交给' + get.translation(target) + get.cnNumber(num) + '张牌');
                        }
                        list.push('加伤');
                        choiceList.push('令此牌对' + get.translation(target) + '造成的伤害+' + (num - 1) + '，此伤害结算完成后，其回复等量的体力值');
                        player.chooseControl(list, 'cancel2').set('prompt', '洞悉：请选择一项（' + get.translation(target) + '对应X值：' + (num - 1) + '）').set('ai', function () {
                            //初始化玩家和事件
                            var player = _status.event.player;
                            var trigger = _status.event.getTrigger();
                            var att = get.attitude(player, target);
                            //如果命中的伤害值
                            var damageNum = trigger.getParent().baseDamage;
                            var map = trigger.getParent().customArgs, id = target.playerid;
                            if (map[id]) {
                                if (typeof map[id].baseDamage == 'number') damageNum = map[id].baseDamage;
                                if (typeof map[id].extraDamage == 'number') damageNum += map[id].extraDamage;
                            }
                            if (target.hasSkillTag('filterDamage', null, {
                                player: trigger.player,
                                card: trigger.card,
                            })) damageNum = 1;
                            //判定能否命中目标
                            //夷灭[doge]
                            var yimie = function () {
                                //定义hit属性
                                var hit = true;
                                //锦囊有无懈不加伤
                                if (get.type(trigger.card) == 'trick' && trigger.player.countCards('hs', { name: 'wuxie' })) hit = false;
                                //品神火攻不加伤
                                if (trigger.card.name == 'huogong' && trigger.player.countCards('h', function (card) {
                                    var list = [];
                                    for (var i of player.getCards('h')) list.push(get.suit(i));
                                    return !list.contains(get.suit(card));
                                })) hit = false;
                                //其余响应类卡牌
                                var key;
                                switch (trigger.card.name) {
                                    case 'sha': case 'wanjian': key = ['shan']; break;
                                    case 'juedou': case 'nanman': case 'jiedao': key = ['sha']; break;
                                }
                                //定义治疗收益和目标角色是否能响应此牌
                                var bool1 = ((get.recoverEffect(target, player, player) > 0) ? 1 : -1);
                                var bool2 = (((att > 0 && !hit) || (target.countCards('hs', { name: key }) && !trigger.getParent().directHit.contains(target))) ? 1 : -1);
                                //排除无法将敌人打进濒死时使用夷灭
                                if (att <= 0 && target.hp - damageNum > 0) return false;
                                //排除对0态度的敌人发动夷灭
                                return bool1 = bool2 && att != 0;
                            };
                            if (yimie()) return '加伤';
                            if (list.contains('拿牌') && get.effect(target, { name: 'guohe_copy2' }, player, player) > 0 && target.hp - damageNum < player.hp) return '拿牌';
                            return '摸牌';
                        }).set('choiceList', choiceList);
                    } else {
                        player.storage.counttrigger.molis_dx--;
                        event.finish();
                    }
                    'step 2'
                    if (result.control == '拿牌') {
                        player.gainPlayerCard(event.num, 'h', player.storage.molis_dx, true)
                        player.addTempSkill('molis_dx_back', { player: "useCardAfter" })
                    } else if (result.control == '摸牌') {
                        player.draw(event.num)
                        player.addTempSkill('molis_dx_discard')
                        var evt = {
                            card: trigger.card,
                            target: target,
                        };
                        player.molis_dx_discard = evt;
                    } else if (result.control == '加伤') {
                        trigger.num
                        player.addTempSkill('molis_dx_recover')
                        var evt = {
                            card: trigger.card,
                            target: target,
                            num: num - 1,
                        };
                        player.storage.molis_dx_recover = evt;
                    }
                },
                subSkill: {
                    back: {
                        trigger: {
                            source: "damageEnd",
                        },
                        forced: true,
                        popup: false,
                        filter: function (event, player) {
                            if (event.player != player.storage.molis_dx) return false
                            if (event.player.isDead()) return false
                            return true
                        },
                        content: function () {
                            'step 0'
                            var num = player.storage.molis_dx.getSkills(null, false, false).filter(function (skill) {
                                return lib.skill.molis_dx.SkillCheck(player.storage.molis_dx, skill);
                            }).length + 1
                            player.chooseCard('he', num, true, '交给' + get.translation(player.storage.molis_dx) + num + '张牌').set('ai', function (card) {
                                return 100 - get.value(card)
                            })
                            'step 1'
                            var target = player.storage.molis_dx
                            target.gain(result.cards, player, 'giveAuto')
                        },
                        sub: true,
                    },
                    discard: {
                        trigger: {
                            global: ["useCard", "respond"],
                        },
                        filter: function (event, player) {
                            if (event.player != player.storage.molis_dx) return false
                            if (event.player.isDead()) return false
                            if (!Array.isArray(event.respondTo) || player != event.respondTo[0]) return false;
                            var evt = player.molis_dx_discard;
                            if (evt.target == event.player && evt.card == event.respondTo[1]) return true;
                            return false;
                        },
                        forced: true,
                        popup: false,
                        content: function () {
                            'step 0'
                            var num = player.storage.molis_dx.getSkills(null, false, false).filter(function (skill) {
                                return lib.skill.molis_dx.SkillCheck(player.storage.molis_dx, skill);
                            }).length + 1
                            player.chooseToDiscard('h', num, true)
                        },
                        sub: true,
                    },
                    recover: {
                        charlotte: true,
                        onremove: true,
                        trigger: {
                            source: "damageBegin1",
                            player: "useCardAfter",
                        },
                        filter: function (event, player) {
                            if (!event.card) return false;
                            var evt = player.storage.molis_dx_recover;
                            if (evt.card == event.card && evt.target.isAlive()) return true;
                            return false;
                        },
                        direct: true,
                        priority: 14,
                        content: function () {
                            var evt = player.storage.molis_dx_recover;
                            if (trigger.name == 'damage') trigger.num += evt.num;
                            else if (evt.target.isAlive()) evt.target.recover(evt.num);
                        },
                        sub: true,
                    },
                },
            },
            "shisan_dg": {
                forced: true,
                trigger: {
                    player: "useCardAfter",
                },
                filter: function (event, player) {
                    return ['basic', 'trick'].contains(get.type(event.card, false)) && game.hasPlayer(function (current) {
                        return current.countCards('h') >= player.countCards('h') && current.countCards('he') > 0
                    });
                },
                content: function () {
                    'step 0'
                    player.chooseTarget(1, true, '###是否发动【达观】？###弃置一名手牌数不小于你的角色的一张牌')
                        .set('ai', function (target) {
                            var player = _status.event.player;
                            return get.effect(target, { name: 'guohe_copy2' }, player, player);
                        }).set('filterTarget', function (card, player, target) {
                            return (target.countCards('h') >= player.countCards('h')) && target.countCards('he') > 0
                        })
                    'step 1'
                    player.discardPlayerCard(result.targets[0], 'he', true)
                },
            },
            "shisan_tx": {
                trigger: {
                    global: "phaseEnd",
                },
                direct: true,
                filter: function (event, player) {
                    return !player.getHistory('useCard').length;
                },
                content: function () {
                    'step 0'
                    player.chooseTarget(1, '###是否发动【推心】？###视为使用一张没有距离限制的【推心置腹】').set('filterTarget', function (card, player, target) {
                        return player.canUse('tuixinzhifu', target, false)
                    })
                    'step 1'
                    if (result.bool) {
                        event.target = result.targets[0]
                        player.useCard({ name: 'tuixinzhifu' }, event.target)
                    } else {
                        event.finish()
                    }
                    'step 2'
                    if (event.target.countCards('hes') == 0) {
                        return event.finish()
                    }
                    player.chooseTarget(1, true, '选择【推心】的另一个目标'
                    ).set('ai', function (target) {
                        var player = _status.event.player;
                        if (event.target.countCards('h', 'sha') > 0) {
                            return get.effect(target, { name: 'sha' }, player, player);
                        } else {
                            return get.effect(target, { name: 'wuzhong' }, player, player);
                        }
                    }).set('filterTarget', function (card, player, target) {
                        return event.target != target
                    })
                    'step 3'
                    event.target1 = result.targets[0]
                    var list = []
                    var choiceList = []
                    if (event.target.countCards('h') > 0) {
                        list.push('交牌')
                        choiceList.push('交给' + get.translation(event.target1) + '两张手牌（不足则全交）。')
                    }
                    if (event.target.countCards('hs', 'sha') > 0) {
                        list.push('出杀')
                        choiceList.push('对' + get.translation(event.target1) + '使用一张【杀】')
                    }
                    if (list.length) {
                        event.target.chooseControl(list).set('choiceList', choiceList)
                            .set('ai', function () {
                                var player = _status.event.player
                                var target = _status.event.target
                                if (list.length == 1) {
                                    return '交牌'
                                }
                                var att = get.attitude(player, target)
                                if (att < 0) {
                                    return '出杀'
                                }
                                return '交牌'
                            }).set('target', event.target1)
                    } else {
                        event.finish()
                    }
                    'step 4'
                    if (result.control == '交牌') {
                        event.target.chooseCard(2, 'h', true).set('ai', function (card) {
                            return 100 - get.value(card)
                        })
                    } else {
                        event.goto(6)
                    }
                    'step 5'
                    event.target1.gain(event.target, result.cards, 'giveAuto')
                    event.finish()
                    'step 6'
                    event.target.chooseCard(1, 'hs', true).set('filterCard', function (card) {
                        return get.name(card) == 'sha'
                    }).set('ai', function (card) {
                        return 100 - get.value(card)
                    })
                    'step 7'
                    event.target.useCard(event.target1, result.cards, false)
                },
            },
        },
        dynamicTranslate: {
            francium_sx: function (player) {
                if (player.storage.hubian) return get.introduce('hubianji') + '出牌阶段限一次，<li><span class="bluetext">圣咏：你可以令两名有手牌的角色交换手牌，然后你摸两张牌并回复1点体力；</span><li>暗涌：你可以将所有手牌当【杀】对一名其他角色使用，若此【杀】造成伤害，你摸X张牌（X为该角色体力上限且至多为6）。'
                return get.introduce('hubianji') + '出牌阶段限一次，<li>圣咏：你可以令两名有手牌的角色交换手牌，然后你摸两张牌并回复1点体力；<li><span class="bluetext">暗涌：你可以将所有手牌当【杀】对一名其他角色使用，若此【杀】造成伤害，你摸X张牌（X为该角色体力上限且至多为6）。</span>'
            },
            francium_yl: function (player) {
                if (player.storage.hubian) return get.introduce('hubianji') + '，每回合限三次，<li><span class="bluetext">圣咏：你的回合内，当你使用一张即时牌结算完毕后，你可以将此牌置于牌堆顶，然后从牌堆底摸一张牌；</span><li>暗涌：你的回合外，当一名其他角色进入濒死状态前，你可以将一张手牌当【杀】对其使用。'
                return get.introduce('hubianji') + '，每回合限三次，<li>圣咏：你的回合内，当你使用一张即时牌结算完毕后，你可以将此牌置于牌堆顶，然后从牌堆底摸一张牌；<li><span class="bluetext">暗涌：你的回合外，当一名其他角色进入濒死状态前，你可以将一张手牌当【杀】对其使用。</span>'
            },
            zenia_yy: function (player) {
                if (player.zenia_yy && player.zenia_yy == '仄') return get.introduce('yunlvji') + '。出牌阶段限一次，<li>平：你可以令一名角色摸X张牌，然后弃置Y张手牌。<li><span class="bluetext">仄：你可以令一名角色弃置X张手牌，然后摸Y张牌（X为你的体力上限，Y为你的体力值）</span>。<li>转韵：你发动〖韵生〗结算完毕后。';
                return get.introduce('yunlvji') + '。出牌阶段限一次，<li><span class="bluetext">平：你可以令一名角色摸X张牌，然后弃置Y张手牌。</span><li>仄：你可以令一名角色弃置X张手牌，然后摸Y张牌（X为你的体力上限，Y为你的体力值）。<li>转韵：你发动〖韵生〗结算完毕后。</li>'
            },
            pluvia_xs: function (player) {
                if (player.pluvia_xs && player.pluvia_xs == '仄') return get.introduce('yunlvji') + '。出牌阶段限一次，<li>平：你可以弃置一张【闪】，令一名角色回复1点体力。<li><span class="bluetext">仄：你可以弃置一张【杀】，对一名其他角色造成1点伤害。</span><li>转韵：你发动〖视新〗结算完毕后。';
                return get.introduce('yunlvji') + '。出牌阶段限一次，<li><span class="bluetext">平：你可以弃置一张【闪】，令一名角色回复1点体力。</span><li>仄：你可以弃置一张【杀】，对一名其他角色造成1点伤害。<li>转韵：你发动〖视新〗结算完毕后。</li>';
            },
            adward_yt: function (player) {
                if (player.pluvia_xs && player.pluvia_xs == true) return '转换技。出牌阶段限一次，<li>阳：你可以令一名体力值最少的角色将体力值回复至与体力值最多的角色相等。<li><span class="bluetext">阴：你可以令一名体力值最多的角色将体力值失去至与体力值最少的角色相等。</span></li>（最多回复/失去3点体力）';
                return '转换技。出牌阶段限一次，<li><span class="bluetext">阳：你可以令一名体力值最少的角色将体力值回复至与体力值最多的角色相等。</span><li>阴：阴：你可以令一名体力值最多的角色将体力值失去至与体力值最少的角色相等。</li>（最多回复/失去3点体力）';
            },
            death_sl: function (player) {
                if (player.storage.death_sp) return '<span class="bluetext">①每回合限一次，当你对其他角色造成伤害时，你可以令此伤害+1并获得该角色的一张牌。</span>②当你不因此技能使用【杀】指定目标后，你可以视为对其使用一张【杀】。';
                return '①每回合限一次，当你对“猎物”造成伤害时，你可以执行一项：1.令此次伤害+1；2.令该角色弃置两张牌；3.背水：你失去1点体力。②当你不因此技能使用【杀】指定目标后，你可以视为对目标使用一张【杀】。';
            },
        },
        translate: {
            //技能
            'mountainbear_xj': '熊击',
            'mountainbear_xj_info': '你使用牌不能指定你的“契主”为目标；当你使用【杀】时，你可以失去1点护甲然后选择一项：<li>令此【杀】伤害基数+1，<li>令此【杀】不可被响应，<li>背水：失去1点护甲并翻面。',
            'mountainbear_xs': '献生',
            'mountainbear_xs_info': '限定技，当你的“契主”进入濒死状态时，你可以交给其所有牌并与其交换体力值。',
            'lucifer_xz': "谐震",
            'lucifer_xz_info': "结束阶段，你可以令一名其他角色获得〖祝福〗直到其回合结束；当你受到伤害后，你可以令一名角色获得1点护甲。",
            'lucifer_cc': '传承',
            'lucifer_cc_info': '游戏开始时，你与✡山熊签订“' + get.introduce('qiyue') + '”于你的下家；你的“契友”由你控制；当你死亡时，你的“契友”立即死亡。',
            'mountainbear_qy': "契守",
            'mountainbear_qy_info': "当你的“契主”成为不为你的【杀】的目标时，你可以将此【杀】转移给你。",
            'guotang_st': "兽土",
            'guotang_st_info': "限定技，出牌阶段，你可令所有成为过“永良”目标的角色回复一点体力，并将手牌摸至体力上限（至多摸至5），若此时场上没有角色死亡，则回合结束后，你可令其中一名角色摸三张牌，并执行一个额外的回合。",
            'guotang_xq': '系群',
            'guotang_xq_info': '出牌阶段开始时，你可以选择一名其他角色，其选择一项：1.你交给其一张手牌，2.其交给另一名其他角色一张牌，若其因此失去最后一张手牌，则你可令一名角色摸两张牌。',
            'guotang_yl': "永良",
            'guotang_yl_info': "结束阶段，你可令至多X名角色各摸一张牌，若其因此手牌数与其体力值相同，则其回复一点体力，然后你摸一张牌。（X为你当前体力值）",
            'puzzles': "猜谜",
            'puzzles_info': '出牌阶段限一次，你可以进行一次猜谜，若你成功，摸你张牌然后选择一项：1.将三张牌交给一名其他角色；2.弃置三张牌。',
            'keste_wp': "威迫",
            'keste_wp_info': "当你议事结算结束后，你可以展示所有手牌，然后对至多X名与你意见不同的角色造成1点伤害（X为你的手牌中【杀】数量）。",
            'keste_yg': "议攻",
            'keste_yg_info': '出牌阶段限一次，你可以选择一名角色并令该角色外的角色议事，若结果为：红色，你弃置意见为红色且可以对该角色使用【杀】的角色一张手牌，然后对视为该角色使用一张【杀】；黑色：你获得意见为黑色的角色区域内的一张牌。',
            'nine_dx': "独行",
            'nine_dx_info': "锁定技，①你从牌堆底摸牌、判定。②回合结束后，你将弃牌堆中的装备洗入牌堆。③回合外不因自己技能获得的牌将被弃置(不考虑①)。",
            'nine_fw': "附尾",
            'nine_fw_info': "每阶段内第一次失去牌后，你可以展示手牌和牌堆底7张牌，任意交换其中的顺序，或使用其中任意张装备。",
            'nine_cj': '冲击',
            'nine_cj_info': "每回合结束时，你可以弃置任意张同类型的牌和一名其他角色的等量牌，然后可以重铸装备区所有牌，对其使用任意张【杀】或令护甲加到1。",
            'neises_try': "AI",
            'neises_try_info': "出牌阶段，你可以与chatGPT对话。",
            'ming_yc': "语出",
            'ming_yc_info': "出牌阶段限一次，你可以进行一次“成语接龙”（不可使用你输入过的成语），然后每当你成功接龙一次，你摸一张牌并重复此流程。",
            'ming_yy': '吟咏',
            'ming_yy_info': "每回合限两次，当你使用【杀】指定目标后，你可以背诵唐诗三百首中的任意一首诗的任意一句（诗名不可重复），如若此做，你可以选择一项：<li>1.摸两张牌，<li>2.弃置目标角色两张牌，<li>3.获得目标角色一张牌，<li>4.令此【杀】对目标角色的伤害+1。",
            'wind_fy': "风吟",
            "wind_fy_info": "游戏开始时，你获得<br>“时”：<li>正：一名角色的准备阶段；<li>反：一名角色的结束阶段，</li>“象”：<li>正：自己；<li>反：一名其他角色，</li>“效”：<li>正：摸一张牌；<li>反：弃置一张牌，</li>三枚标记，并均视为正面。然后此技能的效果为时-象-效的组合，当此技能结算完毕后，你将一枚上次没有选择过的标记反转。",
            'death_sy_useless': '恐惧',
            'death_sy_useless_info': '将你标记为“猎物”的角色的回合内，你的技能无效。',
            'death_sp': "审判",
            'death_sp_info': "觉醒技，当你累计造成不少于6点伤害时，你失去1点体力上限并修改〖双镰①〗为：每回合限一次，当你对其他角色造成伤害时，你可以令此伤害+1并获得该角色的一张牌。",
            'death_sy': "随影",
            'death_sy_info': "锁定技。①游戏开始时，你选择一名其他角色称为“猎物”并令其获得〖恐惧〗且你对其使用牌无距离限制，当其回合结束后，若其下家不为你，你与该角色的下家交换位置，否则，你执行一个额外的回合；②当“猎物”死亡时，你可以重新选择一名其他角色称为“猎物”并令其获得〖恐惧〗。",
            'death_sl': "双镰",
            'death_sl_info': "①每回合限一次，当你对“猎物”造成伤害时，你可以执行一项：1.令此次伤害+1；2.令该角色弃置两张牌；3.背水：你失去1点体力。②当你不因此技能使用【杀】指定目标后，你可以视为对目标使用一张【杀】。",
            'dolina_qj': '权聚',
            'dolina_qj_info': "觉醒技，当你删除了〖噬浪〗中的所有记录后，你将体力值调整至体力上限，并获得〖分海〗。",
            'dolina_fh': '分海',
            'dolina_fh_info': "出牌阶段限一次，你可以失去体力/弃置手牌恢复两倍数量的〖噬浪〗的记录然后摸一张牌/回复1点体力。",
            'dolina_sl': '噬浪',
            'dolina_sl_info': '游戏开始时，你记录牌堆中带有伤害标签的牌名；出牌阶段，你可以删除一个记录牌将一张手牌当成此牌使用。',
            'dolina_wy': "威仪",
            'dolina_wy_info': "锁定技，当你受到一名角色造成的伤害时，你亮出牌堆顶的一张牌，然后其须弃置与此牌类型相同的一张牌，否则其取消此次伤害。",
            'gairtelu_yj': '怨积',
            'gairtelu_yj_info': '锁定技，当你受到牌造成的伤害时，若此伤害是【杀】造成的且你没有牌，或此伤害不是【杀】造成的且你没有手牌，则此伤害+1。',
            'gairtelu_cf': '奢繁',
            'gairtelu_cf_info': '摸牌阶段开始时，你可以多摸X+1张牌（X为场上的角色数的一半并向上取整），若如此做，当你于你的回合内使用基本牌或普通锦囊牌时，你弃置一张牌。出牌阶段开始时，你视为对所有角色使用一张【弹尽粮绝】。',
            'gairtelu_aq': '傲权',
            'gairtelu_aq_info': "你使用有目标的基本牌或普通锦囊牌时，你可以额外指定至多两名你本回合内使用的上一张牌的目标为目标。",
            'thunder_lj': "流雷",
            'thunder_lj_info': "出牌阶段限一次，你可以弃置一张手牌，令所有其他角色打出一张与上一名以此法打出或弃置的牌点数或花色相同的牌，否则你对其造成1点雷电伤害，此技能结算完毕后，你获得其他角色至多X张因此技能打出的牌（X为未打出牌的角色数）。每回合限两次，当你造成雷属性伤害后，你可以令目标角色回复1点体力并摸一张牌。",
            'thunder_fz': '奋决',
            'thunder_fz_info': '当你受到或造成1点伤害后，你可以展示牌堆顶的两张牌，然后获得其中一张并将另一张放回牌堆顶。',
            "lamas_zj": '战尽',
            "lamas_zj_info": "准备阶段，你可以将任意角色区域内的总计X张牌置于你的武将牌上称为“战”（X存活角色数的一半并向上取整）；当你成为【杀】的目标时，你获得你武将牌上的所有“战”；你可以移去一张“战”，然后视为使用一张普通【杀】。",
            "mouse_bm": "八门",
            "mouse_bm_info": "锁定技。①游戏开始时，你获得“八门”各1枚，称为“奇门”。②出牌阶段开始时，你选择一名没有“奇门”的其他角色。你交给其1枚“奇门”，且令其获得对应效果，然后你可以重复此流程。③当你死亡时，移去场上所有你交出的“奇门”。④一名角色回合结束时，若其有你给出的“奇门”，你移除之。⑤回合开始时，若你没有“奇门”你死亡。",
            "mouse_bm_kaimen": "开门",
            "mouse_bm_kaimen_info": "锁定技。①摸牌阶段，你多摸四张牌。②你使用【杀】的次数上限+1。",
            "mouse_bm_xiumen": '休门',
            "mouse_bm_xiumen_info": '锁定技。当你受到伤害时，防止之。',
            "mouse_bm_shengmen": "生门",
            "mouse_bm_shengmen_info": "锁定技。回合结束时，你回复所有已损体力值。",
            "mouse_bm_shangmen": "伤门",
            "mouse_bm_shangmen_info": "锁定技。你受到的伤害+1。",
            "mouse_bm_dumen": "杜门",
            "mouse_bm_dumen_info": "锁定技。回合开始时，你跳过下一个出牌阶段。",
            "mouse_bm_jingmen": "景门",
            "mouse_bm_jingmen_info": "锁定技。准备阶段，你跳过下一个摸牌阶段和弃牌阶段。",
            "mouse_bm_simen": "死门",
            "mouse_bm_simen_info": "锁定技。结束阶段，你失去所有体力值（至多失去五点）。",
            "mouse_bm_jinmen": '惊门',
            "mouse_bm_jinmen_info": '锁定技。出牌阶段开始时，你失去1点体力；你的手牌上限-3。',
            'blame_jj': '剑祭',
            'blame_jj_info': '出牌阶段，若你的装备区均未被废除，你可以获得你的所有装备区的牌并废除你的装备区，然后指定一名其他角色。直到回合结束，你对其使用牌无距离和次数限制且你的装备牌均视为【杀】，其不能使用和打出手牌。其他角色的出牌阶段开始时，若其手牌数大于你且你有被废除的区域，你摸至与其手牌数相同然后你可以恢复你的一个被废除区域。',
            'neises_bm': '卜命',
            'neises_bm_info': "六十四卦，推演无穷",
            'nashu_th': '餮魂',
            'nashu_th_info': '一名角色死亡时，你可以选择获得其的一个技能（主公技，限定技，觉醒技，隐匿技，使命技，带有Charlotte标签的技能除外），若该角色是你杀死的，你增加1点体力上限并回复1点体力。',
            'nashu_sg': '蚀骨',
            'nashu_sg_info': '锁定技。①当你受到伤害时，伤害来源获得等同于此次伤害值的“蚀”标记；②你的出牌阶段开始时，拥有“蚀”的所有角色须依次交给你X张牌（X为该角色“蚀”的数量，不足则全交）；③你的手牌上限+Y（Y为拥有“蚀”标记的角色数）。',
            'rasali_hq': '魂牵',
            'rasali_hq_info': '每回合限一次，当你对其他角色造成伤害后，你可失去1点体力，然后对该角色造成X点伤害。此伤害结算结束后，其回复X点体力（X为其体力值）。',
            'rasali_ly': '灵引',
            'rasali_ly_info': '每回合限一次，一名角色进入濒死状态前，你可以将牌堆顶的四张牌置于你的武将牌上称为“引”，然后你可以等量交换你的“引”和手牌，交换完成后，你依次执行以下的选项：<li>①若“引”的花色均不同，你弃置所有“引”并令该角色立即死亡，<li>②若“引”的颜色均相同，你交给该角色所有“引”并令该角色将体力值回复至1点，然后该角色弃置两张手牌，<li>③若“引”的花色均相同，该角色回复1点体力值并摸两张牌，然后该角色获得1个“善”标记，<li>④若你的武将牌上有“引”，获得的所有“引”然后弃置两张手牌。</li>一名有“善”的角色受到伤害时，其移去1个“善”然后免除此次伤害，若此伤害有来源，你对该伤害来源造成1点伤害。',
            "fr_elin": "厄临",
            "fr_elin_info": "锁定技，你的判定会朝向对你不利的方向倾斜。",
            'zhan_sf': '束缚',
            'zhan_sf_info': '锁定技。①当你受到1点伤害后，你可以选择一项：获得牌堆里你选择的类型的一张牌，或移动场上的一张牌。②你除了〖束缚〗和〖解放〗外的技能无效。③当你受到伤害结算完毕后，你回复1点体力。',
            'zhan_jf': '解放',
            'zhan_jf_info': '觉醒技，准备阶段，若你累计受到与造成过的伤害之和不小于你体力上限两倍，你增加1点体力上限并回复1点体力，然后失去〖束缚〗并获得〖聚能〗与〖震爆〗，然后你可以令至多X名其他角色获得〖厄临〗（X为场上角色数的一半并向下取整）。',
            'zhan_jn': '聚能',
            'zhan_jn_info': '准备阶段，若你的体力上限小于10，你增加1点体力上限；若你的护甲小于5，你获得1点护甲；锁定技，你的手牌上限等于你的体力上限与护甲之和。',
            'zhan_zb': '震爆',
            'zhan_zb_info': '一名角色的回合开始时，若你的体力上限大于该角色体力值，你可以失去任意点体力上限并对该角色造成等量的雷电伤害。',
            'derk_ly': '连语',
            'derk_ly_info': '当你使用牌时，若此牌的点数与你使用的前两张牌的点数和对13取余（若整除则视为K）相等，你摸两张牌；锁定技，你使用与你上一张使用牌的颜色相同的牌无次数限制。',
            'derk_liuyan': '流言',
            'derk_liuyan_info': '出牌阶段，你可以弃置至少两张牌，然后从牌堆中获得一张点数为X的牌（X为这些牌的点数和对13取余，若整除则视为K）。',
            'crow_td': '天妒',
            'crow_td_info': '你的判定牌生效后，你可以获得此牌。',
            'crow_my': '藐意',
            'crow_my_info': '①你的回合外，当你成为锦囊牌目标时，你可以进行一次判定，若结果不为黑桃，你记录此牌并令其对你无效。②每轮游戏开始时，你清除〖藐意①〗的记录。',
            'crow_mc': '谋策',
            'crow_mc_info': '锁定技，当一名角色使用' + get.introduce('zhinang') + '牌名的锦囊或〖藐意①〗记录的牌时，你摸一张牌。',
            'sheep_rh': '熔合',
            'sheep_rh_info': ' 出牌阶段，你可以将两张装备牌“' + get.introduce('hecheng') + '”为一张装备牌；当你处于濒死状态时，你可以重铸一张装备牌，然后将体力回复至1点。',
            'bladewolf_rh': '融毁',
            'bladewolf_rh_info': '锁定技，①当你受到伤害时，你获得等于此次伤害值的“融毁”标记。②当你死亡时，你可以移去任意数量的“融毁”标记并对一名其他角色造成等量的火焰伤害，然后若你有“融毁”标记，你可以重复此流程。',
            'bladewolf_qp': '潜破',
            'bladewolf_qp_info': get.introduce('shunfa') + '，每轮限一次，你可以对不为自己的当前回合角色造成1点伤害；当你杀死角色后，你重置此技能。',
            'sheep_jf': '机算',
            'sheep_jf_info': '出牌阶段限一次，你可以展示牌堆顶两张牌并弃置之，然后计算一个随机幂函数（最高二次幂）的积分（积分上限为其中较大的牌，下限为其中较小的牌），若你计算正确：你获得牌堆顶的五张牌，然后，你选择一项：1.交给一名其他角色五张牌；2.弃置五张牌。',
            'tails_qx': '巧械',
            'tails_qx_info': '①其他角色回合结束时，若你本回合未成为过牌的目标，你摸一张牌并可“' + get.introduce('dazao') + '”一次，然后令一名角色使用之。②准备阶段，你可以弃置两张同颜色的牌，销毁场上任意名角色的各至多一张颜色与你弃置牌相同的、点数为8的装备牌，对其各造成1点火焰伤害。',
            'tails_jd': '机动',
            'tails_jd_info': '每回合限两次。你使用牌指定或成为唯一目标时，可与对方（不为自己）“' + get.introduce('mouyi') + '”：<li>转移（打出【杀】）:与上家或下家交换座位并将手牌弃至两张，若你有武器牌则重铸你的武器牌，然后你可获得其一张装备区的牌（武器牌优先）并可使用之；<li>冲刺（打出【闪】）：对方重铸所有手牌，若你装备区有牌则全部重铸并对对方造成1点伤害。</li>若“谋弈”成功则此牌无效，否则你重铸所有手牌。',
            'dier_xy': '夕炎',
            'dier_xy_info': '锁定技，当你使用【杀】指定目标后，你获得该角色的一张牌。',
            'dier_sb': '守宝',
            'dier_sb_info': '当你成为其他角色使用【杀】的目标后，你可以与该角色拼点并令此牌对你无效，若你赢，你摸两张牌，然后令其失去1点体力，否则，你失去一点体力并弃置其一张牌。',
            'ala_dy': "对弈",
            'ala_dy_info': "锁定技，当你受到其他角色造成的伤害时，你可以与伤害来源进行一次【对策】，若你赢，你取消此次伤害，然后你对伤害来源造成等量同属性伤害。",
            'ala_gm': '讨雠',
            'ala_gm_info': "一名其他角色受到另一名其他角色的伤害前，你可以令该角色选择是否交给你X张牌（X为其手牌数的一半并向下取整且至少为1），然后将此伤害转移给你并令你摸Y+1张牌（Y为你的已损体力值）。",
            'liona_hz': "挥军",
            'liona_hz_info': "①每轮开始时，你可以令至多X名角色获得技能〖整战〗直到本轮结束（X为你的" + get.introduce('baonue') + "），然后你失去等量的暴虐值；②当其他角色造成伤害后，若其有〖整战〗，你获得等同于此次伤害值的暴虐值。",
            "liona_zz": "整战",
            "liona_zz_info": "锁定技，每回合限五次，当拥有〖整战〗的角色造成伤害后，所有拥有〖整战〗的角色摸一张牌。",
            'liya_yy': '乐音',
            'liya_yy_info': '锁定技，游戏开始或回合开始时，若【忘弦琵琶】未加入游戏或在牌堆/弃牌堆内，则你使用之；当你受到1点伤害后，若你的装备区里没有【忘弦琵琶】，则你摸一张牌并使用牌堆中的一张随机武器牌。',
            'francium_ch': '晨昏',
            'francium_ch_info': '锁定技，回合开始时，你改变你的' + get.introduce('hubian') + '状态；当你受到伤害时，若你的手牌数小于伤害来源，你令此伤害-1。',
            'francium_sx': '生息',
            'francium_sx_info': get.introduce('hubianji') + '，出牌阶段限一次，<li>圣咏：你可以令两名有手牌的角色交换手牌，然后你摸两张牌并回复1点体力；<li>暗涌：你可以将所有手牌当无距离与次数限制的【杀】对一名其他角色使用，若此【杀】造成伤害，你摸X张牌（X为该角色体力上限且至多为6）。',
            'francium_yl': '盈亏',
            'francium_yl_info': get.introduce('hubianji') + '，每回合限三次，<li>圣咏：你的回合内，当你使用一张即时牌结算完毕后，你可以将此牌置于牌堆顶，然后从牌堆底摸一张牌；<li>暗涌：你的回合外，当一名其他角色进入濒死状态时，你可以将一张手牌当【杀】对其使用。',
            'francium_mm': '明灭',
            'francium_mm_info': '限定技，当你进入濒死状态时，你可以将体力值回复至2点并失去技能〖晨昏〗。',
            'nanci_tq': '天祈',
            'nanci_tq_info': '锁定技，结束阶段，你获得本回合进入弃牌堆的前两张红色牌。',
            'nanci_tqg': '天启',
            'nanci_tqg_info': '每名角色的回合开始时，你观看牌堆顶的两张牌并选择一项： <li>1.若其中有红色牌，你获得其中一张红色牌。<li>2.从牌堆底摸一张牌。',
            'nanci_tmg': '天灭',
            'nanci_tmg_info': '出牌阶段限一次，你可以令一名其他角色弃置一张【闪】，否则其受到你1点火焰伤害。',
            'nanci_tj': "天劫",
            'nanci_tj_info': '游戏开始时，你获得2个“狐火”标记；回合结束或当你造成伤害时，你获得1个“狐火”；当你受到伤害时，你失去1个“狐火”（你至多有5个“狐火”标记）；根据你“狐火”的数量，你获得以下效果：<li>1个及以上：视为拥有技能〖天祈〗<li>2个及以上：视为拥有技能〖天蔑〗<li>4个及以上：将〖天祈〗视为〖天启〗，将〖天蔑〗视为〖天灭〗。',
            'nanci_tm': "天蔑",
            'nanci_tm_info': '出牌阶段限一次，你可以令一名其他角色获得一张【闪】并弃置两张牌。',
            'nanci_tx': '天选',
            'nanci_tx_info': '限定技，出牌阶段，你可以弃置两张颜色不同且点数相同的牌并选择一名已死亡的角色，将其复活至1点体力并获得1点护甲。回合结束时，该角色将手牌摸至与你相同。',
            'hars_hr': '浩然',
            'hars_hr_info': '当你成为其他角色【杀】或伤害类锦囊牌的目标时，其可以令此牌对你无效并令你摸两张牌。其他角色的出牌阶段限一次，其可以交给你至多两张牌。',
            'kamijia_dr': '夺刃',
            'kamijia_dr_info': '锁定技，当你受到伤害结算完毕后，你可以摸X张牌（X为此次伤害值），然后你可以声明一种颜色并进行判定，若判定牌与你声明的颜色相同，你回复等同于此次伤害值的体力。',
            'kamijia_sx': '随行',
            'kamijia_sx_info': '出牌阶段限一次，你可以将你的所有手牌交给一名其他角色（至少一张）并结束此回合，然后该角色获得以下效果直到其回合结束：<li>①使用牌无距离限制，<li>②出牌阶段，可以额外使用一张【杀】，<li>③只能对自己与你指定的另一名角色使用牌。</li>你获得该角色于弃牌阶段弃置的至多X张牌（X为你交给该角色的牌数的一半并向下取整且至多为五）。</li>',
            'shark_yz': "易珠",
            'shark_yz_info': '游戏开始时，你获得随机四个武将上的至多三个技能，出牌阶段限一次，你可以失去一个你由本技能获得的技能，然后得随机四个武将上的至多一个技能（限定技，觉醒技，使命技等特殊技能除外）。',
            'tiger_kf': "狂放",
            'tiger_kf_info': '当有角色受到火属性伤害时，你摸一张牌且本回合你使用【杀】无距离与次数限制。',
            'tiger_hy': '混元',
            'tiger_hy_info': '出牌阶段限一次，你可以摸两张牌并与所有其他角色同时拼点，然后赢的角色对所有没赢的角色使用一张火【杀】。',
            'linyan_ys': "炎势",
            'linyan_ys_info': "你的回合外，当一名其他角色对另一名角色使用牌结算完毕后，若此牌有唯一目标，你可以对目标角色使用一张牌并摸两张牌。",
            'linyan_kr': "枯荣",
            'linyan_kr_info': "转换技，出牌阶段限一次，阳：你可以选择两名手牌数不相等角色，令其将手牌数调整至二者手牌数的平均值（向下取整），阴：你可以弃置至多X张手牌并选择等量角色（X为场上手牌数小于体力值的角色数），令这些角色将手牌数摸至体力上限（至多摸五张）。",
            'horn_ql': "强流",
            'horn_ql_info': get.introduce('qianghua') + "，每回合限一次，当你对一名其他角色造成伤害后，①你可以对该角色造成1点火焰伤害。②强化：你可以对其相邻的角色造成X点同属性伤害并对该角色造成1点火焰伤害。（X为此次伤害值的一半并向下取整且至少为1）。",
            'horn_ll': "灵链",
            'horn_ll_info': get.introduce('qianghua') + '，出牌阶段限一次，①你可以令一名其他角色失去1点体力，然后你回复1点体力。②强化：你可以令一名其他角色失去1点体力，然后你回复1点体力，然后若你未受伤，你摸两张牌，否则，该角色翻面并摸X张牌（X为该角色的已损体力值）。',
            "fr_qianghua": "强化",
            "fr_qianghua_info": "出牌阶段限一次，你可以失去1点体力或弃置两张牌，然后你进入“<a style='color:#FF0000' href=\"javascript:window.furryIntroduce('qianghua_buff');\">强化</a>”状态。",
            "qima_dz": "断斩",
            "qima_dz_info": get.introduce('truexuli') + '（2/4），当你对其他角色造成伤害后，你可以减少1点蓄力点，然后对一名其他角色造成1点伤害。其他角色进入濒死状态时或当你受到伤害后，你获得1点蓄力点。锁定技，当你对一名体力值为1的其他角色造成伤害时，你令此伤害+1。',
            "qima_jm": "俱灭",
            "qima_jm_info": "觉醒技，当你进入濒死状态时，你将体力值回复至2点，然后令所有其他角色失去所有技能与护甲，并将这些角色的体力上限调整为4。",
            "hynea_kb": "狂辩",
            "hynea_kb_info": "你可以将一张【酒】当作任意基本牌或普通锦囊牌使用或打出。",
            "hynea_rx": "入相",
            "hynea_rx_info": "使命技，①摸牌阶段，你多摸X张牌（X为你的〖蹴功〗中[]内的数字的一半并向上取整）。②使命：准备阶段，若〖蹴功〗中[]内的数字为0，你失去技能〖登险〗并获得技能〖狂辩〗。③失败：当你进入濒死状态时，你将体力回复至3点，然后你摸3张牌并减少1点体力上限。",
            "zhongyu_zb": "业烬",
            "zhongyu_zb_info": "摸牌阶段开始时/出牌阶段开始时/弃牌阶段开始时/当你造成伤害时，你可以移除任意名角色的所有“<a style='color:#FF0000' href=\"javascript:window.furryIntroduce('mad_buff');\">疯狂</a>”层数，然后令你本回合的摸牌数/出【杀】次数/手牌上限/本次造成伤害+X（X为你移去的“疯狂”层数）。",
            "zhongyu_ky": "狂焰",
            "zhongyu_ky_info": "出牌阶段限一次，你可以弃置至多X+1张牌并对等量的角色造成1点" + get.introduce('mad') + "伤害（X为你的已损体力值）；当你对其他角色造成无属性伤害后，你可以视为对其造成过等量的狂属性伤害。",
            "hynea_ds": "登险",
            "hynea_ds_info": "出牌阶段限一次，你可以令〖蹴功〗中[]内的数字-1（至少为0），然后对一名其他角色造成1点伤害。",
            "hynea_cg": "蹴功",
            "hynea_cg_info": "锁定技。你使用【酒】无次数限制；当你的体力值不小于[4]时，你的【闪】和【桃】均视为【酒】。",
            "wore_bosshy": "惑言",
            "wore_bosshy_info": "锁定技，此技能不会失效；每轮游戏开始时或当你受到伤害、失去体力、失去体力上限后，你获得随机一个角色的所有技能。",
            "wore_hy": "惑言",
            "wore_hy_info": "首轮游戏开始时，你获得并派遣随从“催眠者”（体力上限为1，初始手牌为4，催眠者获得随机一个武将的全部技能）；当你受到伤害后，你获得“催眠者”。",
            "tiers_qp": "强破",
            "tiers_qp_info": get.introduce('xuli') + "，每回合限一次，当你使用【杀】指定目标后，你可以失去<font color=#ffff7a>1</font>点体力，令此【杀】伤害+<font color=#eb6e3a>1</font>且无视防具。",
            "tiers_kh": "狂花",
            "tiers_kh_info": "当于你的回合内失去体力后，若此次失去体力的值不小于2点，你于出牌阶段结束后摸两张牌并执行一个额外的出牌阶段，且你获得以下效果直到你的下个回合开始：<li>当你造成伤害后，你回复1点体力。</li>",
            "whitewolf_wl": "巍立",
            "whitewolf_wl_info": "每回合每名角色限一次，当与你距离不大于1的角色受到其他角色造成的伤害后，你可以令伤害来源获得造成伤害的牌，然后视为对伤害来源使用一张无距离限制的【杀】；若此【杀】造成了伤害，你令受伤角色回复X点体力（X为伤害来源此次造成的伤害值）。",
            "whitewolf_fz": "峰峙",
            'whitewolf_fz_info': "当你对其他角色造成伤害时，你可以令其所有红色牌均视为【闪】，黑色牌均视为【无懈可击】直到其下个回合开始，若如此做，本回合你/其使用牌仅能指定其/你为目标。",
            "blackwolf_cy": "潮涌",
            'blackwolf_cy_info': "转换技，阳：出牌阶段开始时，你可以展示其他角色的一张手牌，然后你可以将与展示牌不同花色的一张手牌当作【出其不意】对该角色使用（每种花色限一次），若【出其不意】未造成伤害，你结束本回合，否则你可以重复此流程。阴：出牌阶段结束时，你可以摸X张牌（X为你本回合造成的伤害数），直到你的下个回合开始：当你成为其他角色【杀】或伤害类锦囊牌的目标时，若此牌目标数大于1，你取消之；否则，你弃置该角色一张牌。",
            "blackwolf_nb": "匿波",
            "blackwolf_nb_info": "每名角色的回合结束时，你可以选择一项：<li>1.将一张手牌当作【杀】对该角色使用。<li>2.下一名角色的回合内，你不能成为手牌数大于你的角色使用牌的目标。</li>当你受到伤害后，此技能失效直到你的结束阶段。</li>",
            "faers_hc": "恒常",
            "faers_hc_info": "锁定技，你跳过你的摸牌阶段和判定阶段；你的手牌数始终等于你的体力值。",
            "faers_sb": "嬗变",
            "faers_sb_info": "出牌阶段限一次，你可以弃置你的全部手牌。",
            "kelaier_dh": "定花",
            "kelaier_dh_info": "出牌阶段限一次，你可以弃置一张牌并选择一名角色，然后进行判定。若如此做，直到其下个出牌阶段开始前，该角色获得一点护甲。若判定结果为黑色，该角色摸两张牌，然后直到其下个出牌阶段开始前，其区域内所有的♠都视为♣；若结果为红色，该角色回复一点体力，然后直到其下个出牌阶段开始前，其区域内所有的♦都视为♥。",
            "tery_ly": "戮引",
            "tery_ly_info": "出牌阶段限一次，你可以弃置一张牌并选择一名其他角色，若其有【杀】，你可以观看其手牌并选择其中一张【杀】，然后其对你使用此【杀】；否则，其视为对你使用一张【杀】。",
            "kelaier_ty": "同弈",
            "kelaier_ty_info": "出牌阶段限一次，你可以弃置一张手牌并选择一名其他角色，然后进行一次判定。直到该角色回合结束，若结果为红色，该角色不能使用基本牌，若结果为黑色，该角色不能使用锦囊牌。",
            "lust_fy": "锋移",
            "lust_fy_info": "出牌阶段限一次，你可以弃置一张牌，然后将一名其他角色区域内的一张牌当【杀】对你使用。当你成为【杀】的目标时，你可以令另一名有手牌的其他角色选择一张牌，然后你选择一种花色并令其将选择的牌正面朝上交给你，若此牌花色与你声明的花色不同，则该角色也成为此【杀】的额外目标，若该角色的手牌数不小于你，其不可响应此【杀】。",
            "lust_zb": "政变",
            "lust_zb_info": "主公技。每回合限一次，当你需要使用或打出一张【闪】时，若你的手牌数或体力值为全场最少，你可以视为使用或打出之。",
            "kaye_jy": "急援",
            "kaye_jy_info": "出牌阶段限一次，你可以弃置一张手牌并选择一名角色，若如此做，该角色获得〖守护〗直到其回合结束；若该角色为你，则改为获得〖守护〗直到你的下个回合开始。你不能连续指定同一角色。",
            "kaye_shouhu": "守护",
            "kaye_shouhu_info": "锁定技，你即将受到的接下来3次伤害无效。",
            "kaye_yj": "压制",
            "kaye_yj_info": "出牌阶段，你可以选择一名其他角色，若如此做，直到其下个回合结束，该角色即将造成的接下来5次伤害无效且受到的伤害+1，每名角色限一次。",
            "kert_jl": "积虑",
            "kert_jl_info": "锁定技，你的黑色杀不计入手牌上限，且你可以多使用一张杀。",
            "kert_lp": "掳魄",
            "kert_lp_info": "限定技，结束阶段，你可以获得技能〖强掳〗和〖掠魄〗直到你的下个回合结束。 ",
            "kert_ql": "强掳",
            "kert_ql_info": "锁定技，其他角色摸牌阶段结束后，你选择一项：1.观看并获得该角色的一张牌；2.获得牌堆中的一张【杀】。",
            "kert_dp": "夺魄",
            "kert_dp_info": "锁定技，你的杀无次数限制，且黑色杀无距离限制并可以多指定一个目标；红色杀伤害+2；当你使一名角色进入濒死状态时，你失去该技能并减少一点体力上限。",
            "kersm_my": "盟约",
            "kersm_my_info": "出牌阶段结束时，你可以选择一名角色并交给其X张手牌（X为你手牌数的一半，并向下取整），若如此做，你跳过本回合的弃牌阶段。",
            "kersm_jq": "攫取",
            "kersm_jq_info": "其他角色的牌因弃置而进入弃牌堆后，若其上次没有被〖盟约〗指定，你获得此牌。",
            "luciya_xl": "雄略",
            "luciya_xl_info": "一名角色的判定牌生效前，你可以打出一张手牌代替之；你的拼点牌生效前，你可以令此牌点数视为A或K。",
            "luciya_yc": "英才",
            "luciya_yc_info": "一名角色的判定牌生效后，若其没有被〖雄略〗修改，你获得之。场上的拼点牌结算完毕后，你获得之。",
            "skery_ds": "毒杀",
            "skery_ds_info": "锁定技，你的黑色【杀】不可被响应。当你造成伤害后，受到伤害的角色获得X点“毒”标记（X为此次伤害值）；若该角色在出牌阶段没有使用过【桃】或【酒】，则其于回合结束时失去Y点体力（Y为该角色“毒”标记的总数），并移除其所有“毒”标记。",
            "skery_yj": "饮鸩",
            "skery_yj_info": "其他角色使用【酒】或【桃】生效前，你可以弃置一张手牌并进行判定，若结果为红色，你弃置其两张手牌；若结果为黑色，此牌无效。",
            "miya_hz": "挥斩",
            "miya_hz_info": "当你的【杀】造成伤害后，你获得1个“挥斩”标记，然后本回合内下一次因执行【杀】的效果造成的伤害+X（X为“挥斩”标记数量）。",
            "miya_ks": "狂嗜",
            "miya_ks_info": "锁定技，出牌阶段，你可以额外使用一张【杀】；当你的【杀】造成伤害后，你摸一张牌且本回合出【杀】次数+1。",
            "milism_ql": "潜鳞",
            "milism_ql_info": "当你于回合外受到伤害后，你免除即将受到的伤害直到回合结束。并获得以下效果直到你的回合开始：1.除【五谷丰登】和【桃园结义】外，普通锦囊牌对你无效。2.你不会成为【乐不思蜀】和【兵粮寸断】的目标。",
            "milism_th": "同游",
            "milism_th_info": "锁定技，回合开始时，你须选择一名其他角色，若如此做，此后该角色受到伤害前，你可以免除之。然后你受到1点同属性同来源的伤害；当该角色回复体力时，你回复1点体力。",
            "tery_hx": "幻形",
            "tery_hx_info": "当你受到伤害时，若伤害来源存在你没有获得过的技能，你可以免除此次伤害，并改为失去一点体力上限，然后你获得伤害来源的一个技能（觉醒技，限定技，主公技，隐匿技，使命技等特殊技能除外）。",
            "lens_yl": "焱雷",
            "lens_yl_info": "当你使用牌对其他角色造成无属性伤害时，你可以进行一次判定，若此牌与判定牌颜色相同：<li>若此牌为红色：将此次伤害改为火属性，<li>若此牌为黑色：将此次伤害改为雷属性，</li>且若二者花色相同，此伤害+2。",
            "krikt_th": "调和",
            "krikt_th_info": "转换技，锁定技，阴：出牌阶段，你的【杀】无使用次数限制，你的黑色【杀】均视为雷【杀】；每当你对其他角色造成一点伤害，你弃置其一张手牌。阳：出牌阶段，你的【杀】无距离限制且可以额外指定一个目标，你的红色【杀】均视为火【杀】；每当你对其他角色造成一点伤害，你摸一张牌。",
            "krikt_ly": "两仪",
            "krikt_ly_info": "当你使用【杀】指定目标后，你可以与该角色拼点。若你的拼点牌为红色，此【杀】不可闪避，若你的拼点牌为黑色，此【杀】伤害+1；若你赢，目标角色须交给你一张牌。",
            "lens_rj": "衽接",
            "lens_rj_info": "锁定技，你即将造成伤害时，受到伤害的角色进入连环状态；当你进入连环状态时，取消之。",
            "sisk_hz": "好战",
            "sisk_hz_info": "锁定技，每当你造成伤害后，获得一枚“剑”标记。",
            "sisk_cs": "赐死",
            "sisk_cs_info": "当你使用【杀】指定目标后，你可以移去3枚“剑”标记，使此【杀】不能被闪响应且伤害+1。",
            "sisk_dm": "大灭",
            "sisk_dm_info": "每当你造成一点伤害后，回复一点体力；且你使用杀无次数限制。",
            "rest_nb": "孽变",
            "rest_nb_info": "出牌阶段，你可以移去两张“孽”并视为使用任意基本牌或普通锦囊牌。",
            "rest_qf": "阙福",
            "rest_qf_info": "出牌阶段限一次，你可以将至多四张手牌置于你的武将上，称为“孽”（你最多拥有四枚“孽”）。当你造成伤害后，可以进行一次判定，若结果为红色，你摸一张牌； 若结果为黑色，你弃置受到伤害的角色一张牌。",
            "oert_lh": "轮回",
            "oert_lh_info": "锁定技，你的回合结束阶段，进行一次判定，若结果为红色，则你进行一个额外的回合；若结果为黑色，你摸两张牌。",
            "oert_bosslh": "轮回",
            "oert_bosslh_info": "锁定技，①你的回合结束阶段/当你受到伤害后，进行一次判定，若结果为不为♥，则你进行一个额外的回合/回复1点体力，否则，你摸等同于你体力上限的牌/你获得当前回合角色区域内的至多两张牌，②摸牌阶段你多摸等同于你已损体力值的牌。",
            "telina_hs": "慧视",
            "telina_hs_info": "当一名角色对除你以外的角色使用【杀】时，若此【杀】的目标有手牌，你可以猜测此【杀】能否命中，若猜测正确，你摸两张牌，否则你须弃置一张牌。",
            "telina_th": "预见",
            "telina_th_info": "你的回合开始时，根据本轮你〖慧视〗预言成功的次数获得以下技能效果： 一次：〖奇袭〗；两次：〖断粮〗；三次：〖国色〗；四次：〖乱击〗",
            "milism_gn": "共难",
            "milism_gn_info": "当你受到伤害后，你可以令一名角色摸2X张牌，若其为〖同游〗指定的角色，则改为摸3X张牌（X为此次伤害值）。",
            "oert_wy": "威压",
            "oert_wy_info": "锁定技，回合开始时，所有其他角色的所有技能与防具无效直到回合结束。",
            "oert_bosswy": "威压",
            "oert_bosswy_info": "锁定技，回合开始时，你令所有其他角色的非charlotte技能与防具无效直到回合结束。",
            "jiejie_zr": "锋开",
            "jiejie_zr_info": "准备阶段，你可以选择一名其他角色，若如此做，该角色获得一个“势”标记并失去一点体力，然后你提升一点体力上限并回复一点体力。",
            "jiejie_zf": "断破",
            "jiejie_zf_info": "锁定技，其他角色回合开始时，若其“势”标记不少于3枚。则移去所有“势”标记，然后该角色失去3点体力，你减2点体力上限。",
            "jiejie_my": "剑合",
            "jiejie_my_info": "锁定技，当拥有“势”标记的角色的回合开始时，你摸X张牌。当拥有“势”标记的角色死亡后，你失去X点体力上限（X为其拥有的“势”标记数量）。",
            "ken_jj": "力场",
            "ken_jj_info": "锁定技，当你受到伤害后，立刻结束当前回合。",
            "ken_yn": "移能",
            "ken_yn_info": "每回合限一次，在你攻击距离内的角色受到来源不为你的伤害时，你可以进行判定。若结果为红色，该角色免除此次伤害，然后你受到一点同来源同属性的伤害；若为黑色，你与该角色各摸一张牌并重新开始判定。",
            "milite_sz": "重斩",
            "milite_sz_info": "当你使用【杀】时，若你不在【杀】的目标的攻击范围内，此杀不可被响应。",
            "huye_hr": "魂落",
            "huye_hr_info": "主公技。濒死阶段，你可以与一名体力值不超过你的体力上限的角色拼点，若你赢，你失去一点体力上限并与该角色交换体力值；若你没赢，你立即死亡",
            "huye_ms": "陷梦",
            "huye_ms_info": "出牌阶段限一次，你可以弃置任意张花色不同牌并摸等量的牌，然后令等量其他角色各打出一张【闪】，否则该角色进入“<a style='color:#FF0000' href=\"javascript:window.furryIntroduce('sleep_buff');\">睡眠</a>”状态；你对其使用牌无距离限制。",
            "huye_jj": "惊觉",
            "huye_jj_info": "你对处于“<a style='color:#FF0000' href=\"javascript:window.furryIntroduce('sleep_buff');\">睡眠</a>”状态的角色造成的伤害+1。",
            "milite_yj": "疑计",
            "milite_yj_info": "每回合限两次，其他角色摸牌后，你可以观看其摸到的牌，若其中有【杀】，则视为你对其使用一张【杀】，若其中没有【杀】，则视为其对你使用一张【杀】（计入出杀次数）",
            "jackson_eb": "纵沙",
            "jackson_eb_info": "锁定技，游戏开始时，你选择两名其他角色并使其获得“纵沙”标记；当该角色恢复体力时，你增加等量的体力上限；该角色死亡时，你可以获得该角色的所有牌，然后重新选择一名其他角色获得“纵沙”标记。",
            "jackson_tm": "天命",
            "jackson_tm_info": "锁定技，出牌阶段开始时，你进行一次判定。若结果为红色，你回复一点体力；若结果为黑色且你的体力上限大于5，你减少一点体力上限。",
            "west_sx": "圣洗",
            "west_sx_info": "限定技，当一名角色进入濒死状态时，你可令其依次执行以下所有项：①加1点体力上限；②回复所有体力；③复原武将牌；④废除判定区；⑤复原所有装备栏。⑥将手牌摸至与体力上限相等。",
            "west_pz": "普照",
            "west_pz_info": "当你回复体力后，你可以令至多X名已受伤的其他角色回复1点体力（X为你回复的体力值）。",
            "ken_pb": "屏蔽",
            "ken_pb_info": "锁定技，你不能成为延时类锦囊牌的目标。",
            "kesaya_xs": "缔湮",
            "kesaya_xs_info": "锁定技，若你未受伤，则你视为拥有技能〖无影〗；否则，你视为拥有技能〖暗袭〗。",
            "kesaya_ax": "暗袭",
            "kesaya_ax_info": get.introduce('fenfa') + "(-∞, maxHp)，锁定技，你使用【杀】无次数限制，且不可被响应。",
            "kesaya_wy": "无影",
            "kesaya_wy_info": get.introduce('fenfa') + "[maxHp, +∞)，锁定技，①你不能成为【杀】的目标；②弃牌阶段开始时，你跳过此阶段。③黑色锦囊牌对你无效。",
            "olas_fh": "破空",
            "olas_fh_info": "当你使用一张杀指定目标后，你可以打出至多X张【杀】（X为目标角色体力上限的两倍），若如此做，目标需额外打出等量的【闪】，每少打出一张【闪】，此杀的伤害+1。",
            "olas_bx": "缴械",
            "olas_bx_info": "锁定技，当你因执行【杀】的效果对一名其他角色造成伤害时，你获得该角色的所有【杀】。",
            "mislee_jx": "精械",
            "mislee_jx_info": "出牌阶段，你可以展示一张未强化过的【诸葛连弩】或标准包/军争包/SP包中的防具牌，然后对其进行强化。",
            "mislee_tj": "神工",
            "mislee_tj_info": "出牌阶段每项限一次。你可以弃置一张武器牌/防具牌/其他装备牌，并发起一次“锻造”。然后你从锻造结果中选择一张牌，置于一名角色的装备区内（可替换原装备）。当有因你发动〖神工〗而加入游戏的牌进入弃牌堆后，你将此牌移出游戏，然后你于当前回合结束后摸一张牌。",
            "mislee_zr": "移赠",
            "mislee_zr_info": "出牌阶段限一次，你可以将任意一名角色装备区或判定区的牌移动到另一名角色对应的区域。当你失去装备区的牌时，你摸两张牌。",
            "kref_yz": "月临",
            "kref_yz_info": "一名角色受到来源不为你的伤害后，你可以弃置一张牌并进行一次判定。若结果为黑色，该角色依次执行以下效果，①获得伤害来源的X张牌，②获得造成伤害的牌，③摸X张牌（X为此次伤害值）；若结果为红色，该角色依次执行以下效果，①回复一点体力，②复原武将牌，③伤害来源翻面。",
            "krif_zl": "追猎",
            "krif_zl_info": "每轮限一次，一名其他角色的回合结束时，你可以摸一张牌。若如此做，你与其交换座次，然后执行一个额外的回合。",
            "krif_lj": "猎颈",
            "krif_lj_info": "锁定技，当你对一名其他角色造成伤害时，若你与其距离为1且其位于你的下家，则你令此伤害+1。",
            "mliy_lf": "流风",
            "mliy_lf_info": "一轮游戏开始时，若你有未被记录的花色，你可以进行判定，然后记录该判定牌的花色；当你于回合外失去一张已被记录花色牌时，你摸一张牌。",
            "mliy_hx": "回雪",
            "mliy_hx_info": "准备阶段，你可以选择一名其他角色并选择一项：1.你弃置其与你区域内的各一张牌，然后各回复一点体力；2.你与其各失去一点体力，然后各摸一张牌。",
            "sier_xl": "降龙",
            "sier_xl_info": "你可以将两张不同颜色的牌当作任意基本牌使用或打出。",
            "sier_fh": "伏虎",
            "sier_fh_info": "觉醒技，当你进入濒死状态时，你立即回复3点体力并摸四种花色的牌各一张，然后修改〖降龙〗。",
            "sier_ql": "驱狼",
            "sier_ql_info": "出牌阶段，你可以将一张点数为K的手牌交给一名角色，然后该角色摸等量的牌。锁定技，濒死状态时，你的【桃】和【酒】对你自己的回复量+1。",
            "sier_xlg": "降龙·改",
            "sier_xlg_info": "你可以将一张点数不为K的牌当作任意基本牌使用或打出。",
            "kesaya_zw": "祭献",
            "kesaya_zw_info": "你的体力上限始终等于2；出牌阶段，若你未受伤，你可以失去一点体力并摸三张牌。",
            "luciya_hl": "唤雷",
            "luciya_hl_info": "每回合限一次，当你于回合外使用或打出牌时，你可令任意一名角色进行一次判定。若结果为♠2~9，该角色受到X点无来源的雷属性伤害（X为〖唤雷〗判定成功的次数且至少为1）。",
            "yada_by": "辩言",
            "yada_by_info": "出牌阶段，你可以与一名其他角色拼点，若你赢，你可以获得该角色各区域的一张牌；若你没赢，本回合你不能对自己使用牌且此技能失效。",
            "wes_ts": "同生",
            "wes_ts_info": "锁定技。一轮游戏开始时，你可以指定一名其他角色，该角色获得〖反馈〗直到你下一次发动此技能，并令除你与其以外的角色指定该角色为目标时，该角色将目标转移给你。",
            "wes_gs": "共死",
            "wes_gs_info": "当你受到来源不为你与〖同生〗指定的角色的伤害时，你可以令伤害来源<font color=\"purple\">视为</font>对被〖同生〗指定的角色造成<font color=\"purple\">过</font>X次1点同属性伤害（X为此次伤害值）。",
            "wes_lt": "缓释",
            "wes_lt_info": "当你受到1点伤害后，你可以进行一次判定，若结果为红色，你回复一点体力，若为黑色，你摸两张牌。",
            "mudaya_bz": "死搏",
            "mudaya_bz_info": "当你受到伤害后，你可以令一名角色进行判定。若结果为♥，该角色翻至背面；若结果为♦，受该角色到来自你的1点伤害；若结果为♣，该角色跳过下个摸牌阶段；若结果为♠，你弃置该角色两张牌。",
            "mudaya_wh": "怒威",
            "mudaya_wh_info": "锁定技，当你使用带伤害标签的牌指定其他角色为目标后，你令其防具和技能失效直至此回合结束。每回合限一次，当你造成伤害后，你摸两张牌，然后此回合你使用【杀】无距离限制且次数上限+1。",
            "muli_cm": "绸缪",
            "muli_cm_info": "锁定技。一轮游戏开始时，若场上没有技能〖终策〗，你获得〖终策〗并获得1个“策”标记；每名角色回合开始时，若其有〖终策〗，你可以弃置两张手牌然后获得〖终策〗与其所有策标记，然后其失去〖终策〗并失去1点体力。",
            "muli_zc": "终策",
            "muli_zc_info": "当你对其他角色造成伤害时，若你没有〖绸缪〗，你失去1点体力；然后你令受到伤害的角色获得技能〖终策〗与你的所有“策”并失去技能〖终策〗；锁定技，若你拥有“策”，结束阶段，你失去X点体力（X为“策”的数量），然后“策”的数量+1；当你死亡后，你选择一名角色获得〖终策〗与你的所有“策”。",
            "muli_yl": "远虑",
            "muli_yl_info": "锁定技，一名角色失去体力时，你摸X张牌，然后若该角色为你且X大于1，令X为1（X为此次失去体力值）。",
            "hars_sz": "傀炼",
            "hars_sz_info": "其他角色死亡时，你可以令其获得技能“傀尸”。拥有技能“傀尸”的角色回合即将开始时，此回合改为由你操控。",
            "hars_yb": "傀尸",
            "hars_yb_info": "锁定技，你的体力值小于0后不会死亡，当你体力上限等于0时死亡。你的回合开始时，你失去一点体力上限。每名角色的回合开始时，判断一次游戏胜负，此时拥有技能“傀尸”的角色在规则中视为已死亡。你无法回复体力且其他角色不能对你使用【桃】。摸牌阶段你多摸X张牌（X为你的体力上限）。",
            "aroncy_jw": "缴武",
            "aroncy_jw_info": "其他角色的出牌阶段开始时，若其手牌数大于你，你可以发动此技能。若其没有【杀】，则视为其对你使用一张【杀】（计入出杀次数）；若其有【杀】，你可以观看其手牌并获得其一张【杀】，然后你可以将你的一张手牌交给一名其他角色并标记为“缴武”。“缴武”牌不计入手牌上限且使用“缴武”牌无距离限制；一名角色使用“缴武”牌后，若此牌造成了伤害，你与其各摸一张牌。",
            "xit_lx": "言叙",
            "xit_lx_info": "每轮限一次，当一名角色处于濒死状态时，你可以令另一名角色摸六张牌，然后其弃置四张牌。若其以此法弃置的四张牌花色各不相同，则将濒死角色的体力回复至1点。",
            "xit_bs": "保身",
            "xit_bs_info": "当你于回合外使用或打出黑色牌，或因弃置失去一张黑色牌后，你可以摸一张牌。",
            "markn_cy": "驰援",
            "markn_cy_info": "一名角色受到伤害时，若你的“视”数量小于5，你可以弃置一张红色手牌，令此伤害-1。若如此做，你从牌堆顶摸一张牌置于武将牌上，称之为“视”（你的“视”至多有五张）。当你受到或造成伤害时，你获得一张“视”。",
            "markn_yz": "远瞻",
            "markn_yz_info": "准备阶段，若你有“视”，你可以观看牌堆顶的X张牌，并将其以任意顺序置于牌堆项或牌堆底（X为“视”的数量）；摸牌阶段结束后，你可以用任意手牌等量交换“视”。",
            "markn_yc": "易策",
            "markn_yc_info": "出牌阶段限一次，你可以弃置一张“视”，然后与一名手牌数不大于你的角色交换手牌。",
            "berg_jh": "镜花",
            "berg_jh_info": "每轮限一次，当你成为一名其他角色的卡牌唯一目标时，你可以" + get.introduce('found2') + "一张牌代替此牌",
            "berg_sy": "水月",
            "berg_sy_info": "每当你使用一张牌，若此牌指定了唯一目标，你可以" + get.introduce('found2') + "一张牌代替此牌结算。",
            "lint_nd": "掣肘",
            "lint_nd_info": "出牌阶段限一次，你可以选择一名角色并弃置一张牌。若你弃置的牌为红色，该角色的出牌阶段开始与结束时，其将手牌摸至五张。若你弃置的牌为黑色，该角色的出牌阶段开始与结束时，其将手牌弃至一张。",
            "morly_ld": "连弹",
            "morly_ld_info": "当你使用普通【杀】时，此【杀】属性改为按照以下顺序循环：“火属性”、“雷属性”、“冰属性”、“神属性”。",
            "morly_xd": "袭敌",
            "morly_xd_info": "当你对其他角色造成属性伤害时，你可以选择一项：1.观看并获得其X张手牌（X为此次伤害值），2.令此次属性伤害值+1。",
            "morly_qy": "枪雨",
            "morly_qy_info": "当你的【杀】造成伤害后，本回合出杀次数+1。",
            "west_jh": "净化",
            "west_jh_info": "回合开始时，你可以弃置一张手牌，然后选择一名角色，该角色：①复原武将牌，②弃置判定区内的所有牌，③摸X张牌，然后将手牌弃置至X张（X为其体力上限且至多为5）。",
            "ud_yb": "异变",
            "ud_yb_info": "本局游戏计算【乐不思蜀】与【兵粮寸断】的效果反转。",
            "muen_tx": "鸣窃",
            "muen_tx_info": "摸牌阶段，你可少摸任意张牌，然后选择等量的角色，若你的手牌数不大于其，则视为你对其使用一张【杀】（不计入出杀次数），然后你获得这些角色的各一张手牌。",
            "muen_jb": "急兵",
            "muen_jb_info": "锁定技，摸牌阶段开始时，若你的手牌数为全场最少之一，本阶段多摸两张牌，否则你多摸一张牌。",
            "marcia_us": "御术",
            "marcia_us_info": "锁定技，其他角色计算与你的距离时+1且你计算与其他角色的距离时-1。",
            "marcia_jz": "谨战",
            "marcia_jz_info": "出牌阶段限一次，你可以弃置任意张花色不同的手牌，并记录这些花色，然后摸等量的牌；本回合内若你使用牌的花色已被记录，此牌不可被响应；回合结束时，你清除所有记录。",
            "dog_dm": "多谋",
            "dog_dm_info": "出牌阶段限一次，当你使用有目标的基本牌或普通锦囊牌时，你可弃置一张牌，然后令此牌结算两次。",
            "dog_zz": "足智",
            "dog_zz_info": "当你于回合内造成伤害后，本回合能够使用〖多谋〗的次数+1。",
            "yas_klin_bj": "怖惧",
            "yas_klin_bj_info": "锁定技，杀死你的角色弃置所有牌并失去所有体力。",
            "yas_klin_js": "祭牲",
            "yas_klin_js_info": "每名角色出牌阶段开始时，你可以弃置任意张不同花色的手牌并令当前回合角色摸等量的牌，然后根据你弃置的花色，该角色获得以下效果直到回合结束：<li>♠：【杀】指定目标后令其本回合技能失效，<li>♥：【杀】本回合无视防具，<li>♣：【杀】本回合造成的伤害+1，<li>♦：【杀】本回合无距离次数限制；</li>若你因此弃置了四种不同的花色，你令该角色额外获得以下效果：<li>你的【杀】不可被响应。",
            "patxi_fs": "覆身",
            "patxi_fs_info": "一名角色受到伤害时，你可以弃置一张红色牌令此伤害-1，或弃置一张黑色牌令此伤害+1。",
            "patxi_yw": "勇往",
            "patxi_yw_info": "锁定技，结束阶段，你从牌堆中获得一张红色牌与一张黑色牌。",
            "nore_dz": "洞中",
            "nore_dz_info": "你即将造成或受到的伤害均视为无来源。",
            "nore_ys": "渊薮",
            "nore_ys_info": "一名角色受到无来源伤害后，若该角色为你，你摸一张牌，然后你可以令一名其他角色选择一项：<li>1.交给你一张牌，<li>2.你视为对其使用一张火【杀】；</li>若该角色不为你，该角色选择一项：<li>1.令你摸一张牌，<li>2.弃置一张牌。",
            "bofeng_aj": "玄技",
            "bofeng_aj_info": "当你使用【杀】指定目标后，你可以将目标角色的一张手牌置于你的武将牌上，称为“协”，然后你将其的至多X-1张牌置于其武将牌上（X为其体力值），其于当前回合结束时获得这些牌。",
            "fr_xieji": "协",
            "fr_xieji_info": "",
            "ciyu_ss": "素术",
            "ciyu_ss_info": "回合开始时，你摸两张牌然后任意分配给其他角色，并置于其武将牌上称为“协”；当一名角色使用【杀】或普通锦囊牌指定目标后，若其有“协”，你可以弃置其一张“协”为此牌增加或减少一个目标（无距离限制）；结束阶段，其获得其武将牌上的所有“协”。",
            "ciyu_hq": "护全",
            "ciyu_hq_info": "锁定技。每回合限一次，当有角色受到伤害时，若其有“协”，你可以令其选择是否弃置一张“协”并免除此伤害；当你成为【杀】的目标时，你可弃置一张牌将此【杀】转移给一名有“协”且不是此【杀】使用者的其他角色。",
            "bofeng_ws": "危视",
            "bofeng_ws_info": "当你成为其他角色伤害类牌的目标后，若你没有手牌，你摸一张牌，否则你从牌堆顶获得一张“协”；然后你可以等量交换你的“协”与手牌。",
            "delta_ys": "应势",
            "delta_ys_info": "锁定技，你可以将红色牌当任意【杀】，黑色牌当【闪】使用或打出。",
            "delta_sy": "算演",
            "delta_sy_info": "出牌阶段限一次，你可以观看牌堆顶的四张牌并进行一次“" + get.introduce('caclu') + "”，若成功：你获得这四张牌，你通过〖算演〗获得的牌不计入当前回合的手牌上限，然后本回合内你的【杀】无距离次数限制且无视防具，否则，你将这些牌置入弃牌堆。",
            "faers_yl": "命论",
            "faers_yl_info": "锁定技，当你弃置你的【桃】后，你回复一点体力。",
            "site_qj": "权解",
            "site_qj_info": "当你受到伤害时，你可以改为失去X点体力上限，然后摸X张牌（X为此次伤害值）。",
            "edmond_jz": "激战",
            "edmond_jz_info": "锁定技，当你不因〖护幼〗成为其他角色唯一牌的目标时，若此牌不为转化牌且对应的实体牌牌数为1且不为【桃】或【酒】且你的“战”数不大于你的体力值的两倍，则你将此牌置于你的武将牌上，称为“战”，且取消此牌的目标。",
            "edmond_jj": "护幼",
            "edmond_jj_info": "锁定技，结束阶段开始时，若你有“战”，则你选择一项：①摸两张牌，并令原使用者依次对你使用所有的“战”，然后获得无法使用的“战”；②失去一点体力，并对所有原使用者依次使用所有的“战”，然后弃置无法使用的“战”。",
            "yada_fs": "服说",
            "yada_fs_info": "当你拼点后，你可以获得对方此次拼点的牌。",
            "wes_gc": "反馈",
            "wes_gc_info": "当你受到伤害后，你可以获得伤害来源的一张牌。",
            "mika_lx": "浪息",
            "mika_lx_info": "锁定技。摸牌阶段，你多摸X张牌；弃牌阶段，你改为弃置X张牌（X为场上存活的势力数）。",
            "mika_pl": "破浪",
            "mika_pl_info": "限定技，出牌阶段，你可以将你的所有手牌交给一名其他角色，然后对你指定的另一名其他角色随机使用当前的所有手牌（无距离限制），你获得无法使用的牌。",
            "peterlk_kh": "控魂",
            "peterlk_kh_info": "出牌阶段限X+1次（X为你的已损体力值），你可以将一张【杀】或锦囊牌（无懈可击除外）交给一名其他角色，然后你可以令该角色对你指定的角色使用此牌（目标需合法）。",
            "peterlk_jn": "亟难",
            "peterlk_jn_info": "你的手牌上限等于你的体力上限，且摸牌阶段你多摸X张牌（X为你的已损体力值）；锁定技，其他角色获得你的牌时须选择一项：1.令你摸一张牌，2.弃置一张牌。",
            "dmoa_sx": "笙歌",
            "dmoa_sx_info": "准备阶段，你可以选择一种颜色并判定，若结果与你选择的颜色相同，则将此判定牌置于你的武将牌上称为”笙歌”并重新执行此流程，否则，你选择一名角色并令其获得你武将牌上的所有“笙歌”。锁定技，“笙歌”牌不计入手牌上限，且当一名角色因使用或打出而失去“笙歌”后，你摸一张牌。",
            "bofeng_ld": "烈断",
            "bofeng_ld_info": "每回合限一次，当你因执行【杀】的效果对一名角色造成伤害时，你可以移去X张“协”，令此伤害+X。结束阶段，你获得武将牌上的所有“协”。",
            "terlk_pj": "披荆",
            "terlk_pj_info": "锁定技，当你使用【杀】指定目标后，你令此牌需要依次使用或打出X张【闪】响应（X为目标角色的体力值）。",
            "terlk_zj": "斩棘",
            "terlk_zj_info": "出牌阶段开始时，你可以令所有角色失去或回复一点体力，若如此做，你摸X张牌（X为场上已受伤的角色数）并翻面，然后本回合你对攻击范围内的角色使用牌无距离与次数限制。",
            "nulia_dh": "渡化",
            "nulia_dh_info": "出牌阶段限一次，你可以失去一点体力，并选择一名已死亡的角色，令其复活至1点体力并摸两张牌，然后将其身份改为与你同一阵营。",
            "nulia_hj": "合击",
            "nulia_hj_info": "你的手牌上限等于你的体力上限；摸牌阶段，你多摸X张牌（若你为主公，X为场上忠臣数；否则X为场上与你同身份的角色数）。",
            "taber_jj": "度衡",
            "taber_jj_info": "出牌阶段限一次，你可以选择至多X名角色并展示牌堆顶等量的牌（X为场上存活的人数并向上取整），然后这些角色依次选择是否用一张手牌交换其中的一张牌；结算完毕后，你令一名角色获得剩余的所有牌。",
            "verb_zy": "征言",
            "verb_zy_info": "出牌阶段限一次，你令有手牌的角色依次选择一项：1.交给你一张牌，2.失去一点体力；出牌阶段结束时，你须依次交给这些角色一张手牌。",
            "verb_fs": "逢生",
            "verb_fs_info": "当你成为其他角色使用牌的目标时，若你的手牌数不大于你的已损体力值，你可" + get.introduce('found') + "一张牌。",
            "yada_jh": "均衡",
            "yada_jh_info": "出牌阶段限一次，你可以弃置一张牌并选择两名角色，然后二者各声明一张【杀】或【闪】；若二者都声明【杀】，二者各失去一点体力；若二者都声明【闪】，二者各弃置一张牌；否则，声明【杀】的角色摸两张牌并对声明【闪】的角色造成一点伤害。",
            "taber_sj": "掘金",
            "taber_sj_info": "出牌阶段限一次，你可以弃置任意张牌并" + get.introduce('found') + "</a>等量的牌，若你在发动〖掘金〗时弃置了所有手牌，你额外发掘一张牌。",
            "zeron_sx": "歃血",
            "zeron_sx_info": "当你于回合外受到伤害/失去体力/回复体力/失去牌/获得牌/横置/翻面后，你进行一次判定，若结果为红色，你可以令一名其他角色受到等量伤害/失去等量体力/回复等量体力/弃置等量的牌/摸等量的牌/横置/翻面。",
            "fr_zhufu": "祝福",
            "fr_zhufu_info": "锁定技。摸牌阶段，你多摸一张牌，若你拥有〖祥瑞〗，则改为两张；出牌阶段，你可以额外使用一张【杀】且你的【杀】无距离限制；你的判定会朝着对你有利的方向倾斜。",
            "yinhu_xr": "祥瑞",
            "yinhu_xr_info": "一轮游戏开始时，你可以选择至多X名角色并令其获得〖祝福〗直到其回合结束（X为场上角色数的一半并向下取整）。",
            "yinhu_zd": "祭蹈",
            "yinhu_zd_info": "当你即将受到伤害时，你令伤害来源外的其他角色依次选择是否代替你成为此次伤害的目标。",
            "yinhu_sp": "识破",
            "yinhu_sp_info": "锁定技，你始终跳过准备阶段，判定阶段，结束阶段。你不能被选择为延时锦囊牌的目标。当你对一名其他角色造成伤害前，该角色失去所有护甲并摸等量的牌。",
            "dragon_hy": "黑焰",
            "dragon_hy_info": "锁定技，当你对其他角色造成伤害后，该角色获得一个“黑焰”标记并减少一点体力上限；每名角色的出牌阶段结束时，若其有“黑焰”，其须选择一项：1.弃置X张牌，2.受到X点火焰伤害；然后移除所有“黑焰”标记并获得X点体力上限（X为其“黑焰”标记数）。",
            "dragon_ly": "龙裔",
            "dragon_ly_info": "锁定技，当你受到属性伤害时，你取消之；当你受到伤害后，你从牌堆获得X张伤害类的牌并标记为“魂怒”（X为此次伤害值）。",
            "dragon_hn": "魂怒",
            "dragon_hn_info": "你使用“魂怒”牌：①不可被响应、②无视防具、③不计入使用次数、④不计入手牌上限、⑤不可被其他角色弃置、⑥无距离限制。",
            "hars_sj": "神降",
            "hars_sj_info": "出牌阶段限一次，你可以交给一名其他角色一半的手牌（至少一张且向下取整），若如此做，该角色回合开始时，改为你操控（你不能连续选择同一角色）。",
            "hars_fs": "附身",
            "hars_fs_info": "锁定技，你的回合开始时，你改为由〖神降〗的发动者控制。",
            "sayisu_fp": "复判",
            "sayisu_fp_info": "当你造成或受到伤害后，你可摸X张牌然后交给一名其他角色一张牌（X为本次伤害值）。若你此前未以此法交给过其牌，你摸两张牌；若你曾以此法交给过其牌，你可对其造成1点伤害，然后其不能再成为此技能的目标。",
            "yifeng_ml": "冥聆",
            "yifeng_ml_info": "锁定技，每回合限一次，当你于同一回合内累计受到2点及以上伤害后，你回复一点体力并摸一张牌。",
            "terz_yz": "殃众",
            "terz_yz_info": "锁定技，当你受到伤害后，你可以令伤害来源视为对其以外的所有其他角色造成等量同属性伤害。",
            "terz_sp": "审判",
            "terz_sp_info": "锁定技。游戏开始时，你令所有角色获得〖流域〗。然后你可减1点体力上限，令一名其他角色获得〖复攥〗。",
            "terz_ly": "流域",
            "terz_ly_info": "转换技。锁定技，出牌阶段限一次/回合结束时/当你受到或造成伤害结算完毕后，阴：你摸一张牌；阳：你弃置一张牌；你的牌只能指定你或与你〖流域〗状态不同的角色为目标。",
            "terz_fz": "复攥",
            "terz_fz_info": "出牌阶段限一次/当你受到伤害后/当你对其他角色造成伤害后，你可选择一名拥有〖流域〗的角色，变更其〖流域〗的状态。",
            "terz_ts": "拓势",
            "terz_ts_info": "锁定技，一名角色造成伤害时，若二者都拥有技能〖流域〗且状态不同，处于〖流域〗阴状态的角色获得阳状态角色的一张牌，然后你摸一张牌。",
            "delta_sz": "瞬斩",
            "delta_sz_info": "当你造成/受到伤害时，你可以失去一点体力并摸两张牌，然后令此伤害翻倍/减半（向下取整）。",
            "ybni": "隐匿",
            "ybni_info": "你进入隐匿状态。",
            "jet_ww": "危望",
            "jet_ww_info": "一名其他角色使用【杀】指定另一名其他角色为目标后，使用者可以交给你一张牌，然后你选择一项：①令此【杀】不可被响应；②成为此【杀】的额外目标。",
            "jet_fy": "拂衣",
            "jet_fy_info": "锁定技，每轮开始时，你将手牌数调整至体力上限并隐匿。",
            "jet_sl": "始乱",
            "jet_sl_info": "锁定技，隐匿技，当你登场时，若此为你的首次登场，你视为发动一次〖乱武〗，否则你视为使用一张非伤害类普通锦囊牌。",
            "jet_cl": "垂帘",
            "jet_cl_info": "锁定技。①你不能成为延时类锦囊牌与黑色普通锦囊牌的目标，②当你于回合内受到伤害时，你防止此伤害并摸2X张牌（X为伤害值）。",
            "nier_zj": "智解",
            "nier_zj_info": "每名角色的回合开始/当你区域内牌数发生变化时，你记录X（X为你的体力值与手牌数之差的绝对值），若此X与你本回合内所记录过的X均不相同：若X为奇数，你可以将一张牌当任意基本牌使用或打出，若X为偶数且不为0，你可以将一张牌当任意单体普通锦囊牌使用。",
            "paers_fy": "愤延",
            "paers_fy_info": "锁定技，转换技，当你不因使用或此技能而失去手牌后，若你有手牌，你①将一张牌置于牌堆顶。②从牌堆底摸一张牌。③获得一名其他角色的一张牌。你完成一次循环后，你可以视为使用一次无距离限制的【杀】，然后失去一点体力。",
            "pares_xh": "星汇",
            "pares_xh_info": "锁定技，当你造成或受到伤害后，将你的手牌数调整为你的当前体力值，若你因此失去了牌，你摸一张牌。",
            "slen_xj": "心计",
            "slen_xj_info": "出牌阶段限一次，你可以交给一名有手牌的其他角色至多两张手牌：<br>若你交给其一张手牌，其选择一项：</br><li>①交给你点数不大于此牌的所有牌；<li>②交给你点数不小于此牌的所有牌。</li>若你交给其两张手牌，其可以交给你任意张点数介于二者之间（含二者）的手牌并摸等量的牌，若其交给你点数属于该区间内的所有手牌，其额外摸一张牌。",
            "zenia_yy": "余音",
            "zenia_yy_info": get.introduce('yunlvji') + "。出牌阶段限一次，<li>平：你可以令一名角色摸X张牌，然后弃置Y张手牌。<li>仄：你可以令一名角色弃置X张手牌，然后摸Y张牌（X为你的体力上限，Y为你的体力值）。<li>转韵：你发动〖韵生〗结算完毕后。",
            "zenia_ys": "韵生",
            "zenia_ys_info": "出牌阶段限一次，你可以将你的全部手牌（至少一张）交给一名其他角色，然后若你没有护甲，你获得一点护甲，否则，你摸两张牌。",
            "zenia_ld": "律动",
            "zenia_ld_info": "锁定技，出牌阶段，你每使用一张牌，你本回合的手牌上限+1。",
            "slen_gc": "纲常",
            "slen_gc_info": "锁定技，当你于回合外失去牌后，你可以获得当前回合角色的一张牌。",
            "lamost_zf": "知繁",
            "lamost_zf_info": "锁定技，牌堆顶X+1张牌始终对你可见；你可将牌堆顶X+1张牌如手牌般使用或打出。（X为你的已损失体力值）",
            "knier_yc": "意缠",
            "knier_yc_info": "其他角色的准备阶段，你可以选择该角色判定区或装备区的一张牌并将此牌当作【杀】对你使用。若此牌的花色是：<li>♥：其跳过下个出牌阶段<li>♦：其跳过下个摸牌阶段<li>♠：其跳过下个判定阶段<li>♣：其跳过下个弃牌阶段",
            "knier_wh": "雾花",
            "knier_wh_info": "当你成为其他角色使用牌的目标时，若此牌所对应的实体牌数为1且你的“雾花”中没有该花色的牌，你令此牌对你无效并将其置于你的武将牌上，称为“雾花”。",
            "knier_hp": "海平",
            "knier_hp_info": "准备阶段，你可以将你的一张“雾花”当作【出其不意】使用。",
            "kasers_cy": "长吟",
            "kasers_cy_info": "当你使用与你使用的上一张牌花色不同的牌时，你可以摸一张牌，否则，你弃置一张手牌。",
            "yifa_xs": "宣誓",
            "yifa_xs_info": "一轮游戏开始时/准备阶段/结束阶段，你可以声明一个技能，然后你拥有此技能直到本轮结束/回合结束/你的下个回合开始（觉醒技，限定技，主公技，隐匿技，使命技等特殊技能除外）。",
            "xuanshi": "宣誓",
            "xuanshi_info": "一轮游戏开始时或准备阶段，你可以声明一个非隐匿技，然后你拥有此技能直到本轮结束。",
            "ventus_yc": "勇刺",
            "ventus_yc_info": "摸牌阶段，你额外从牌堆中获得一张【杀】；你使用【杀】指定一名其他角色为目标时，该角色失去一点体力。",
            "ventus_nx": "匿形",
            "ventus_nx_info": "锁定技，当你于回合外受到伤害时，若此伤害不是由【杀】或【决斗】效果造成的，你取消之；出牌阶段，你最多可以使用X张牌（X为你的体力值）。",
            "pluvia_fs": "复苏",
            "pluvia_fs_info": "当你对其他角色造成伤害后，你可以令其选择是否交给你一张牌，然后其回复一点体力。",
            "pluvia_sx": "视新",
            "pluvia_sx_info": "出牌阶段限一次，你可以弃置两张牌并回复一点体力，然后<font color=\"purple\">视为</font>对一名其他角色造成<font color=\"purple\">过</font>一点伤害。",
            "pluvia_xs": "相生",
            "pluvia_xs_info": get.introduce('yunlvji') + "。出牌阶段限一次，<li>平：你可以弃置一张【闪】，令一名角色回复1点体力。<li>仄：你可以弃置一张【杀】，对一名其他角色造成1点伤害。<li>转韵：你发动〖视新〗结算完毕后。",
            "jbgy_pc": "迫察",
            "jbgy_pc_info": "锁定技，除你以外，其他所有角色的手牌对所有人可见。",
            "jbgy_ds": "登神",
            "jbgy_ds_info": "你的判定/摸牌/出牌/弃牌阶段开始前，你可从三个描述中包含该阶段的技能中选择一个获得直到此阶段结束。",
            "jbgy_qx": "侵袭",
            "jbgy_qx_info": "出牌阶段，你可以（弃置一张武器牌）对一名本回合内未选择过的角色造成1点火焰伤害，然后你（<font color=\"purple\">视为</font>）受到1点火焰伤害。",
            "jbgy_ze": "诛恶",
            "jbgy_ze_info": "锁定技，其他角色对你造成伤害前，将伤害来源改为你；回合结束时，若你于本回合内造成的伤害不小于你的体力值，你回复一点体力并获得场上一张牌。",
            "xiaomo_ld": "灵动",
            "xiaomo_ld_info": "当你回合内第一次受到伤害时，若此伤害为其他角色造成的，你可以取消之并与其各摸一张牌，然后你获得1点护甲。",
            "xiaomo_sj": "闪击",
            "xiaomo_sj_info": "摸牌阶段，你多摸等同于你护甲值的牌；当你使用【杀】指定目标时，你可以失去任意数量的护甲，令此【杀】的目标失去等量护甲，然后令此【杀】伤害+X（X为你失去护甲的值）。",
            "adward_qm": "千面",
            "adward_qm_info": "出牌阶段开始时，你重铸手牌中的所有红色牌，直至没有红色牌；结束阶段，你重铸你手牌中的所有黑色牌，直至没有黑色牌。",
            "adward_yt": "咏叹",
            "adward_yt_info": "转换技，出牌阶段限一次，<li>阳：你可以令一名体力值最少的角色将体力值回复至与体力值最多的角色相等。<li>阴：你可以令一名体力值最多的角色将体力值失去至与体力值最少的角色相等。</li>（最多回复/失去3点体力）。",
            "fate_tm": "骰命",
            "fate_tm_info": "摸牌阶段，你改为摸r1D6张牌；当你使用【杀】指定目标后，你可以进行一次r1D4，若结果为1，此【杀】伤害+1，若结果为3，此【杀】不计入出牌阶段的使用次数，若结果为4，此【杀】不可被闪避；当你造成或受到伤害后，你的闪避值+X（X为此次伤害值）。",
            "fate_ss": "瞬闪",
            "fate_ss_info": "当你成为其他角色使用牌的唯一目标时，你可以进行一次r1D100，若结果不大于你的闪避值：<font color=\"blue\">25</font>，你取消之，否则，你本回合内的闪避值+10；若结果为1，你额外对该角色造成1点伤害，若结果为100，你令此牌对你结算两次。",
            "wangxing": "妄行",
            "wangxing_info": "",
            "sayisu_fj": "斧正",
            "sayisu_fj_info": "①妄行：准备阶段，你可以将牌堆顶的X张牌置于你的武将牌上，称为“正”，你可以如手牌般使用或打出“正”。②锁定技，结束阶段，若你的手牌数为全场最少且体力上限小于5，你增加1点体力上限并回复1点体力。",
            "liya_sz": "闪转",
            "liya_sz_info": "锁定技，你使用牌无距离限制；当你受到伤害后，你可以令伤害来源的攻击距离改为0，其计算与其他角色的距离+X（X为场上角色数）且其普通锦囊牌均视为【杀】，直到其回复体力。",
            "liya_sj": "速战",
            "liya_sj_info": "锁定技，你造成的伤害均视为" + get.introduce('kamidamage') + "。",
            "laays_fs": "赴死",
            "laays_fs_info": "出牌阶段限两次，你可以将一张你的红色牌当【火攻】使用；出牌阶段，你可以将一张黑色牌当【铁索连环】使用，且你的【铁索连环】可选择的目标数+1。",
            "laays_cs": "存生",
            "laays_cs_info": "出牌阶段限一次，你可以令一名其他角色选择是否令你摸X张牌，然后你交给其2X张牌并重复此流程（X为本回合内你发动〖存生〗的次数）。",
            "mala_ht": "宏腾",
            "mala_ht_info": "锁定技，你使用牌无距离与次数限制，且你的单体锦囊牌与【杀】可以多指定X个目标（X为你的已损体力值）；准备阶段，你随机失去一张判定区内的牌。",
            "mala_ly": "龙脉",
            "mala_ly_info": "锁定技，当你受到属性伤害或失去体力时，你取消之并摸X张牌（X为此次伤害或失去体力的值）；摸牌阶段，你多摸Y张牌（Y为你已损体力值的一半并向上取整）。",
            "dier_ly": "龙翼",
            "dier_ly_info": "锁定技，你使用牌无距离限制；当你受到属性伤害或失去体力时，你摸X张牌（X为此次伤害或失去体力的值）；摸牌阶段，你多摸Y张牌（Y为你已损体力值的一半并向上取整）。",
            "mala_jf": "解放",
            "mala_jf_info": "锁定技，当你失去体力上限时，你取消之，然后你获得X点体力上限并回复X点体力（X为你当前的体力上限）。",
            "mala_hy": "魂焱",
            "mala_hy_info": "锁定技，当你对其他角色造成伤害后，该角色获得一个“魂焱”标记；每名角色的出牌阶段结束时，若其有“魂焱”，其须选择一项：1.弃置X张牌，2.受到X点火焰伤害；（X为其“魂焱”标记数）。",
            "mala_bc": "不摧",
            "mala_bc_info": "锁定技，你无法成为翻面或拼点的目标，若你的出牌阶段被跳过，你跳过本回合的弃牌阶段；若你的摸牌阶段被跳过，结束阶段开始时，你摸三张牌。",
            "mala_sz": "斩击",
            "mala_sz_info": "锁定技，当你造成伤害时，你可以失去1点体力，令此伤害翻倍；当你受到伤害后，你结束当前回合。",
            "zeta_gz": "固铸",
            "zeta_gz_info": "一名角色的回合结束时，若本回合有四种花色的牌进入过" + get.introduce('center') + "，你可以分配于弃牌堆的其中一种花色的牌。若你将这些牌全部分配给其他角色，你重置〖复归〗并令一名角色执行一个额外的出牌阶段。",
            "zeta_fg": "复归",
            "zeta_fg_info": "每轮每种类别限一次，你使用牌结算完毕后，你可以从牌堆中检索一张基本牌或非基本牌。",
            "fox_hm": "幻梦",
            "fox_hm_info": "锁定技，当你不因〖幻梦〗使用有目标的基本牌或普通锦囊牌结算完毕后，若此牌非转化且对应的实体牌数为1，你将此牌置于你的武将牌上，称为“幻”；结束阶段，若你有“幻”，你依次对所有“幻”的原目标使用这些“幻”，并弃置无法使用的“幻”。",
            "molis_hs": "回溯",
            "molis_hs_info": "限定技，当你进入濒死状态时，你可以将场上的卡牌复原到本轮开始时的状态（包括武将牌和体力牌），然后游戏轮数锁定为当前轮次。",
            "marcia_ql": "潜掠",
            "marcia_ql_info": "锁定技，每回合每种颜色限一次，当你成为其他角色使用【杀】或伤害类锦囊牌的唯一目标时，若此牌对应的实体牌数为1，你取消之，然后将此牌置于你的武将牌上，称为“潜”；出牌阶段开始时，你获得武将牌上的“潜”。",
            "molis_dx": "洞悉",
            "molis_dx_info": get.introduce('cuijian') + "：你可以选择一项：<li>1.你获得目标角色X+1张牌，若此牌造成了伤害，你交给其X+1张牌。<li>2.你摸X+1张牌，若此牌被响应，你弃置X+1张牌。<li>3.令此牌对目标角色的伤害+X，此牌结算完成后，其回复X点体力。",
            "shisan_dg": "达观",
            "shisan_dg_info": "锁定技，当你使用" + get.introduce('jishi') + "结算完毕后，你弃置手牌数不小于你的一名角色的一张牌。",
            "shisan_tx": "推心",
            "shisan_tx_info": "你未使用过牌的回合结束时，你可以视为使用一张无距离限制的【推心置腹】。然后目标需要对你指定的另一名角色选择一项：<li>1.使用一张无距离限制的【杀】；<li>2.交给其两张手牌（不足则全交）。",
            'wore_bossty': "天佑",
            "wore_bossty_info": "锁定技，你的阶段不会被跳过，你每回合能受到伤害、失去体力、失去体力上限的总和至多为游戏轮数",

            //武将
            'fr_guotang': '✡果糖',
            'fr_lans': '✡兰斯',
            'fr_lucifer': '✡路西法',
            'fr_mountainbear': '✡山熊',
            'fr_nine': '✡奈恩',
            'fr_keste': "✡科斯特",
            'fr_wind': "✡温迪",
            "fr_ming": "✡鸣",
            "fr_death": "✡迪斯",
            "fr_dolina": "✡多林",
            "fr_thunder": "✡兰德",
            "fr_mouse": "✡缪斯",
            "fr_lamas": "✡拉马斯",
            "fr_blam": "✡布兰",
            "fr_gairtelu": "✡盖尔德鲁",
            "fr_neises": "✡内瑟斯",
            "fr_tails": "✡塔尔斯",
            "fr_dier": "✡戴尔",
            "fr_bosswore": "✡沃尔",
            "fr_francium": "✡弗兰西亚",
            "fr_nanci": "✡南辞",
            "fr_shark": "✡沙克",
            "fr_kmjia": "✡卡米加",
            "fr_liona": "✡里欧纳",
            "fr_ala": "✡阿拉安",
            "fr_tiger": "✡泰格尔",
            "fr_linyan": "✡林&炎",
            "fr_bossfaers": "✡恒神法斯",
            "fr_bosshars": "✡纵神哈尔",
            "fr_horn": "✡霍恩",
            "fr_qima": "✡奇玛",
            "fr_zhongyu": "✡忠与",
            "fr_hynea": "✡哈尼亚",
            "fr_hyperner": "✡催眠者",
            "fr_wore": "✡沃尔",
            "fr_tiers": "✡缇尔斯",
            "fr_yifeng": "✡弈风",
            "fr_hars": "✡哈尔斯",
            "fr_wes": "✡维斯",
            "fr_muyada": "✡慕达亚",
            "fr_yada": "✡亚达",
            "fr_fengkn": "✡冯·莱卡恩",
            "fr_muliy": "✡穆里耶",
            "fr_sier": "✡希尔",
            "fr_klif": "✡克里夫",
            "fr_milis": "✡弥斯利",
            "fr_alas": "✡奥拉斯",
            "fr_kesaya": "✡克萨亚",
            "fr_ken": "✡科恩",
            "fr_west": "✡洛",
            "fr_huye": "✡虎爷",
            "fr_milite": "✡巴兹",
            "fr_jackson": "✡赛特",
            "fr_jiejie": "✡檞界",
            "fr_sayisu": "✡萨伊苏",
            "fr_telina": "✡特丽娜",
            "fr_oert": "✡欧尔特",
            "fr_bossoert": "✡轮回使者",
            "fr_rest": "✡瑞斯特",
            "fr_krikt": "✡科里克特",
            "fr_tery": "✡特瑞",
            "fr_sisk": "✡西斯科",
            "fr_lens": "✡雷恩斯",
            "fr_milism": "✡米里森",
            "fr_miya": "✡米亚",
            "fr_skry": "✡斯克瑞",
            "fr_lusiya": "✡卢西亚",
            "fr_kersm": "✡科尔森",
            "fr_kert": "✡柯尔特",
            "fr_keya": "✡科亚",
            "fr_lust": "✡卢森特",
            "fr_klier": "✡克莱尔",
            "fr_faers": "✡法斯",
            "fr_aroncy": "✡艾伦希",
            "fr_lint": "✡林特",
            "fr_berg": "✡伯格",
            "fr_xit": "✡希特",
            "fr_markn": "✡马克恩",
            "fr_morly": "✡莫雷",
            "fr_marxya": "✡马尔西亚",
            "fr_yas_klin": "✡亚瑟克林",
            "fr_dog": "✡多戈",
            "fr_muen": "✡牧恩",
            "fr_patxi": "✡帕茨希",
            "fr_zeron": "✡泽罗恩",
            "fr_nore": "✡诺尔",
            "fr_bofeng": "✡迟风",
            "fr_ciyu": "✡迟雨",
            "fr_delta": "✡德尔塔",
            "fr_edmon": "✡埃德蒙",
            "fr_mika": "✡米卡",
            "fr_peter_likes": "✡皮特莱克",
            "fr_dmoa": "✡多默尔",
            "fr_nulia": "✡怒力亚",
            "fr_terlk": "✡特尔里克",
            "fr_verb": "✡韦贝尔",
            "fr_taber": "✡塔贝尔",
            "fr_yinhu": "✡寅虎",
            "fr_dragon": "✡德拉贡",
            "fr_terz": "✡斑点",
            "fr_jet": "✡杰特",
            "fr_slen": "✡萨冷",
            "fr_paers": "✡帕尔斯",
            "fr_nier": "✡尼尔",
            "fr_pluvia": "✡普鲁维亚",
            "fr_ventus": "✡凡图斯",
            "fr_knier": "✡科妮尔",
            "fr_zenia": "✡泽妮雅",
            "fr_lamost": "✡拉莫斯特",
            "fr_kasaers": "✡卡萨尔斯",
            "fr_yifa": "✡弈法",
            "fr_jgby": "✡吉岡邦彦",
            "fr_xiaomo": "✡小默",
            "fr_adward": "✡安德华",
            "fr_fate": "✡法特",
            "fr_liya": "✡莉亚",
            "fr_laays": "✡拉亚斯",
            "fr_whitewolf": "✡“白狼”",
            "fr_blackwolf": "✡“黑狼”",
            "fr_mala": "✡马拉尔",
            "fr_bossmala": "✡马拉尔",
            "fr_zeta": "✡泽塔",
            "fr_fox": "✡狐克斯",
            "fr_molis": "✡莫莉斯",
            "fr_shisan": "✡拾弎",
            "fr_bladewolf": "✡刃狼",
            "fr_crow": "✡克劳",
            "fr_derk": "✡德克",
            "fr_nashu": "✡那舒",
            "fr_rasali": "✡让萨利",
            "fr_sheep": "✡西普",
            "fr_zhan": "✡展",

            //分类
            'wanling': "万灵之森",
            'kela': "克拉王国",
            "yongbing": "流浪者佣兵团",
            'xueyuan': '魔法学院',
            'shoushen': "兽神传说",
            'youdangzhe': '游荡旅行者',
            'renyu': '人鱼之海',
            'jianaier': '迦奈尔联邦',
            'dragongu': '龙之谷',
            'milan': '米兰寺',
            'jixiezaowu': '机械造物'
        },
        characterSort: {
            furryPack: {
                'wanling': ['fr_yifeng', 'fr_yifa', 'fr_telina'],
                'kela': ['fr_wes', 'fr_muyada', 'fr_yada', 'fr_fate', 'fr_liya', 'fr_whitewolf', 'fr_blackwolf',],
                'yongbing': ['fr_sisk', 'fr_kersm', 'fr_yada',],
                'xueyuan': ['fr_milism', 'fr_lusiya',],
                'shoushen': ['fr_hars', 'fr_faers', 'fr_oert', 'fr_yinhu', 'fr_jet', 'fr_mala', 'fr_francium'],
                'youdangzhe': ['fr_miya', 'fr_krikt', 'fr_laays'],
                'renyu': ['fr_rest', 'fr_nanci'],
                'jianaier': ['fr_wore', 'fr_tiers', 'fr_tery',],
                'dragongu': ['fr_berg', 'fr_dragon', 'fr_lens', 'fr_mala', 'fr_marxya', 'fr_zeta', 'fr_dier', 'fr_milite', 'fr_sayisu', 'fr_shisan'],
                'milan': ['fr_linyan', 'fr_horn', 'fr_ala'],
                'jixiezaowu': ['fr_bladewolf', 'fr_sheep', 'fr_ken']
            }
        },
        characterTitle: {
            'fr_guotang': '果糖含量',
            'fr_nine': '孤僻的天才',
            'fr_keste': '常胜将军',
            'fr_wind': '且听风吟',
            'fr_ming': "能言善辩",
            'fr_death': "死亡使者",
            'fr_gairtelu': '暴戾君王',
            'fr_thunder': '雷光跃动',
            'fr_lamas': '战技如神',
            'fr_mouse': '奇门八卦',
            'fr_blam': '如入幻境之刃',
            'fr_nashu': '恶魂使者',
            'fr_rasali': '善灵指引',
            'fr_zhan': "束缚之厄",
            'fr_derk': '黯影随行',
            'fr_crow': '智谋慧者',
            "fr_milis": '铸刃千口',
            "fr_huye": '梦魂归乡',
            "fr_xit": '言叙求生',
            "fr_nier": '智解万象',
            "fr_laays": '镣铐游荡者',
            'fr_liya': '动运千机',
            'fr_mala': '龙裔之王',
            "fr_yada": '能言巧辩',
            "fr_muliy": '峰回路转',
            "fr_sier": '降龙伏虎',
            "fr_klif": '追猎者',
            "fr_west": '仁心医者',
            "fr_milite": '疑计丛生',
            "fr_jackson": '沙之使徒',
            "fr_jiejie": '饮血剑法',
            "fr_sayisu": '兵不血刃',
            "fr_rest": '兴风作浪',
            "fr_kert": '掠魂动魄',
            "fr_keya": '佣兵团长',
            "fr_klier": '坚实后盾',
            "fr_lint": '制衡掣肘',
            "fr_patxi": '以身殉戒',
            "fr_nore": '观微洞察',
            "fr_nulia": '渡化万物',
            "fr_terlk": '披荆斩棘',
            "fr_wore": '千变万化',
            "fr_hynea": '登峰造极',
            'fr_linyan': '双人共舞',
            'fr_shark': '其人之道',
            "fr_muyada": '死战不休',
            "fr_marxya": '谨小慎微',
            "fr_fengkn": '筹谋划策',
            "fr_alas": '破空断魂',
            "fr_ken": '机器之心',
            "fr_sisk": '嗜血狂徒',
            "fr_skry": '毒计百出',
            "fr_lusiya": '聪慧英才',
            "fr_kersm": '盟国之约',
            "fr_dier": '守龙之护',
            "fr_aroncy": '缴械武解',
            "fr_berg": '镜花水月',
            "fr_markn": '洞中窾会',
            "fr_morly": '枪林弹雨',
            "fr_dog": '足智多谋',
            "fr_zeron": '以牙还牙',
            "fr_edmon": '以死护全',
            "fr_mika": '但求浪息',
            "fr_dmoa": '日夜笙歌',
            "fr_verb": '绝处逢生',
            "fr_taber": '掘地三尺',
            "fr_dragon": '黑焰之龙',
            "fr_jgby": '狂炎灼冰',
            "fr_slen": '八面玲珑',
            "fr_paers": '斗转星移',
            "fr_pluvia": '治疗之刃',
            "fr_ventus": '泣血之刃',
            "fr_zenia": '余音绕梁',
            "fr_lamost": '犹记繁华',
            "fr_fox": '幻梦一场',
            "fr_zeta": '固铸何归？',
            "fr_blackwolf": '浪潮汹涌',
            "fr_whitewolf": '固若金汤',
            'fr_tiger': '混元一气',
            'fr_kmjia': '教指人心',
            "fr_liona": '整军待战',
            "fr_ala": '睚眦必报',
            "fr_wes": '同生共死',
            "fr_kesaya": '无影无踪',
            "fr_milism": '黔水之灵',
            "fr_yas_klin": '祭天请神',
            "fr_bofeng": '玄色一剑',
            "fr_xiaomo": '破击无声',
            "fr_nanci": '狐媚之魂',
            "fr_bladewolf": '机魂熔炉',
            "fr_sheep": '能机巧算',
            "fr_tails": '灵活的机械师',
            "fr_ciyu": '素色一心',
            "fr_delta": '破瞬之斩',
            "fr_peter_likes": '操魂控魄',
            "fr_yinhu": '祥瑞祝福',
            "fr_terz": '审时度势',
            "fr_jet": '混乱之神',
            "fr_knier": '花非花，雾非雾',
            "fr_kasaers": '长吟千古',
            "fr_molis": '时空跳跃者',
            "fr_shisan": '察微知宏',
            "fr_zhongyu": '狂火之炎',
            'fr_qima': '破月之心',
            'fr_francium': '双舞翩翩',
            "fr_muen": "游历冒险家",
            "fr_horn": "恶灵推手",
            "fr_yifeng": "执月之手",
            "fr_hars": "全知之神",
            "fr_telina": "预见之眼",
            "fr_oert": "轮回使者",
            "fr_krikt": "两仪剑使",
            "fr_miya": "连破剑圣",
            "fr_lusiya": "天慧之才",
            "fr_lust": "兽族王者",
            "fr_tery": "千变万化",
            "fr_lens": "元素法师",
            "fr_yifa": "言灵圣者",
            "fr_faers": "永世恒常",
            "fr_fate": "命运之手",
            "fr_adward": "邪恶法师",
            "fr_tiers": "战场玫瑰",
        },
    };
    for (var i in furryPack.character) {
        if (lib.config.frLutou) furryPack.character[i][4].push('ext:福瑞拓展/image/lutou/' + i + '.png')
        else furryPack.character[i][4].push('ext:福瑞拓展/image/character/' + i + '.jpg')
    }
    if (lib.config.achiReward && lib.config.achiReward.character.length != 0) {
        for (var i = 0; i < lib.config.achiReward.character.length; i++) {
            var name = lib.config.achiReward.character[i]
            furryPack.character[name][4].remove('unseen')
        }
    }
    return furryPack;
});
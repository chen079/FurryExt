window.furry_drama = function (name, style1, style2, style3, style4, style5) {
    if (!name) throw arguments;
    if (game.isShowingDrama) {
        return;
    }
    game.isShowingDrama = true;
    var List;
    var Image = ui.background.style.backgroundImage;
    //原来的背景图片
    var Start = function () {
        ui.arena.classList.remove('menupaused');
        //移除背景模糊
        ui.arena.hide();
        //隐藏人物等
        ui.system.hide();
        //隐藏菜单的
        ui.menuContainer.hide();
        ui.cardPileNumber.hide();
        _status.paused2 = true;
        if (document.getElementsByClassName('static') != null && document.getElementsByClassName('static')[1]) {
            document.getElementsByClassName('static')[1].hide()
        }
    }
    var End = function (dialog, avatar, avatar2, time, func) {
        ui.arena.show();
        ui.system.show();
        ui.cardPileNumber.show();
        ui.background.style.backgroundImage = Image;
        if (dialog) {
            dialog.remove()
        }
        if (avatar) {
            avatar.remove();
        }
        if (avatar2) {
            avatar2.remove();
        }
        if (avatar) {
            avatar.remove();
        }
        if (time) {
            clearInterval(time);
        }
        if (style1) {
            style1.remove();
        }
        if (style2) {
            style2.remove();
        }
        if (style3) {
            style3.remove();
        }
        if (style4) {
            style4.remove();
        }
        if (style5) {
            style5.remove();
        }
        if (div_break) {
            div_break.remove();
        }

        game.isShowingDrama = false;
        if (typeof func == 'function') {
            func();
        }
        _status.paused2 = false;
    };
    Start();

    var div_break = ui.create.div();
    div_break.style.display = 'block';
    div_break.style.position = 'absolute';
    div_break.style.top = '0px';
    div_break.style.left = '0px';
    //top和left为0则在左上角
    div_break.style.width = '100px';
    div_break.style.height = '100px';
    //宽高为设置大小
    div_break.setBackgroundImage('extension/福瑞拓展/image/button/back_button.png');
    div_break.style.backgroundSize = "100% 100%";
    div_break.style.backgroundRepeat = "no-repeat";
    div_break.addEventListener('click',
        function () {
            End(chat, avatar_div, avatar2_div, interval);
        });
    ui.window.appendChild(div_break);
    var juqing_drama = {
        '1': [
            {
                say: "饿殍遍地，骸骨千里。",
                background: 'black.png',
            },
            {
                say: "数千年前的万灵之森保卫战，为这片名唤瓦尔亚那的大陆，撕开了一道流血的伤口。"
            },
            {
                say: "这由人类发起的侵略战争，最终以精灵族的圣树——生命之树倒塌为终止。"
            },
            {
                say: "然后呢？",
                avatar: 'fr_keya',
                background: 'tavern.jpg',
                fuc: function () {
                    game.switchfrBgm('tavern');
                },
            },
            {
                say: "接下来就是付费内容了。",
                avatar2: '吟游诗人',
            },
            {
                say: '（科亚无奈的摸了摸口袋，回头喊道。）'
            },
            {
                say: '克莱尔，付一下钱！',
                avatar: 'fr_keya',
            },
            {
                say: "（克莱尔将钱投入吟游诗人面前的帽子里。）",
                fuc: function () {
                    game.frPlayJuqingAudio('Throw_coin')
                },
            },
            {
                say: "团长，要我说打他一顿就好了。",
                avatar2: 'fr_klier'
            },
            {
                say: "客官，我们可是法治社会。",
                avatar2: '吟游诗人',
            },
            {
                say: "（科亚对克莱尔挥挥手，克莱尔又转身回去喝酒了。）"
            },
            {
                say: '继续。',
                avatar: 'fr_keya',
            },
            {
                say: "后来，其他种族为了抵抗人类的侵袭，结成了联盟，在瓦尔亚那大陆西侧形成了联合王国。",
                avatar2: '吟游诗人',
            },
            {
                say: "兽人王国“克拉”就是联合王国之一。",
                avatar2: '吟游诗人',
            },
            {
                say: "人类侵略精灵族的理由呢？",
                avatar: "fr_keya"
            },
            {
                say: "（吟游诗人沉思了一会。）"
            },
            {
                say: "大概就是栖息地重叠什么的吧......对了，似乎还有说法称他们盯上了精灵族的预言书《瓦尔亚那百科预言集》。",
                avatar2: '吟游诗人',
            },
            {
                say: "精灵族长者写的预言集啊，据说预言了未来7000年的所有大事件。",
                avatar2: "fr_sisk"
            },
            {
                say: "（西斯科的声音突然在科亚耳畔响起）"
            },
            {
                say: "（西斯科凑到到科亚耳畔，轻声说）"
            },
            {
                say: "团长，你叫我的事办好了。",
                avatar2: "fr_sisk"
            },
            {
                say: "（科亚点了点头）"
            },
            {
                say: "这位客官说得对，那本预言集乃是精灵族的大贤者所著，可谓上可知天文，下可同鬼神。",
                avatar2: "吟游诗人"
            },
            {
                say: "切",
                avatar2: "fr_sisk"
            },
            {
                say: "（西斯科发出嘲讽的声音。）"
            },
            {
                say: "如果这么厉害，那精灵族怎么会到如今只剩三千人。",
                avatar2: "fr_sisk"
            },
            {
                say: "（吟游诗人涨红了脸，不知道如何反驳）"
            },
            {
                say: "要我说，这破预言集才是精灵灭族的原因。",
                avatar2: "fr_sisk"
            },
            {
                say: "毕竟匹夫无罪，怀璧其罪。",
                avatar2: "fr_sisk"
            },
            {
                say: "（吟游诗人正要说些什么，科亚打断了他）"
            },
            {
                say: "我们了解的够多了，和你聊的很开心，再见。",
                avatar: "fr_keya"
            },
            {
                say: "（科亚拉上克莱尔和西斯科离开了。）"
            },
        ],
        '2': [
            {
                say: "点击观看《纪念》",
                background: 'black.png',
            },
            {
                say: "他叫沃尔，一名...心理医生。",
                fuc: function () {
                    game.switchfrBgm('2background1');
                },
            },
            {
                say: "你是在一个杨柳依依的湖畔见到他的。",
            },
            {
                say: "阳光在他身上镀上柔和的金光。然而最吸引你的是他明亮的眼睛——好似可以映出璀璨繁星。",
                background: "lack.png"
            },
            {
                say: "他在站在湖畔，望着波光粼粼的湖水出神。",
            },
            {
                say: "你好，我叫缇尔斯！",
                avatar: "fr_tiers"
            },
            {
                say: "你鼓起勇气向他打招呼，虽然你不知道自己哪里来的勇气。",
            },
            {
                say: "但冥冥中感觉，你似乎见过他。",
            },
            {
                say: "你好，我叫沃尔。",
                avatar2: "fr_wore",
            },
            {
                say: "你注意到对方眼里闪过一丝不明的情绪，这让你更加确信你的猜想。"
            },
            {
                say: "陪我走走吧。",
                avatar2: "fr_wore"
            },
            {
                say: "他的请求打断了你的思绪。",
            },
            {
                say: "虽然很突兀，但你还是同意了。"
            },
            {
                say: "你们在那澄澈的天空下，绕湖边走着。"
            },
            {
                say: "你很少说话，多数时候只是当个听众，但你不时望着他深思。"
            },
            {
                say: "你是不是曾经见过他。"
            },
            {
                say: "你们来到了一个亭子里，是个古朴、安静的长亭，亭子里雕刻着许多鸟兽，在阳光下栩栩如生。",
                background: "gazebo.png"
            },
            {
                say: "为什么来这里？",
                avatar: "fr_tiers"
            },
            {
                say: "他没有回应你的问题，只是轻声的说。"
            },
            {
                say: "你说，我们是为了忘却而纪念吗？",
                avatar2: "fr_wore"
            },
            {
                say: "你摇了摇头，似乎不理解他这句话的含义。"
            },
            {
                say: "这是文学家鲁尔讯特说的。",
                avatar: "fr_tiers"
            },
            {
                say: "你有些幽默地回答到。"
            },
            {
                say: "他笑了，坐在亭子里看着湖面。"
            },
            {
                say: "这座亭子里长着许多蔷薇。"
            },
            {
                say: "微风徐徐吹来，带着湖的凉意抚摸你们的脸庞，这是属于夏天的凉意。阳光照射在湖面的波纹中，映出斑驳的金色，漫不经心地闪烁着。"
            },
            {
                say: "阳光与你们一起待到到西沉，一起等到晚霞的绮丽色彩铺满天空。",
                background: "gazebo sunset.png"
            },
            {
                say: "很高兴认识你",
                avatar2: "fr_wore"
            },
            {
                say: "看着他的眼睛，你似乎看到了灿烂的繁星。"
            },
            {
                say: "虽然这就是你们的初见，但忙碌的生活很快将这抛进了时间的缝隙。",
                background: 'black.png',
            },
            {
                say: "你几乎要忘记。"
            },
            {
                say: "你第二次见到沃尔的时候，已经是个大雪纷飞的冬天了。",
                fuc: function () {
                    game.switchfrBgm('2backgroundsnow');
                },
            },
            {
                say: "寒风不停地喧嚣，似乎要卷走一切。望着窗外枯叶在地上打着旋。"
            },
            {
                say: "莫名的，你感到心里有些不安，打算去湖边散散心。",
                background: "snow lake.png"
            },
            {
                say: "在湖畔走着，那湖已经布满了冬的萧瑟气息。"
            },
            {
                say: "你看到沃尔站在亭子里，亭子里的蔷薇已经枯萎了。他望着湖面出神。刺骨的寒风扑面而来。",
                background: "wolf in winter.png"
            },
            {
                say: "你怔怔的望着，望着他的面容与身后灿烂的万家灯火一同倒映在那被风划破了的水中。"
            },
            {
                say: "缇尔斯。",
                avatar2: "fr_wore"
            },
            {
                say: "他注意到了你，打了声招呼。"
            },
            {
                say: "你也注意到他的神情里有些哀伤——但短暂的像个错觉"
            },
            {
                say: "他微笑地看着你，眸里只是斑驳的星光。"
            },
            {
                say: "怎么了？",
                avatar: "fr_tiers"
            },
            {
                say: "你几乎是本能的开了口。"
            },
            {
                say: "他深沉地望着你，又像是透过你在看着别人。",
            },
            {
                say: "调任令下来了，我可能要走了。",
                avatar2: "fr_wore"
            },
            {
                say: "你望着他的双眼，只是第二次相见，却好像阔别已久的朋友。"
            },
            {
                say: "你说我们是为了忘却而纪念吗？",
                background: "snow lake.png",
                avatar2: "fr_wore"
            },
            {
                say: "这是鲁尔讯特说的。",
                avatar: "fr_tiers"
            },
            {
                say: "你说着，就像是上次一样。"
            },
            {
                say: "你知道我为什么要当心理医生吗？",
                avatar2: "fr_wore"
            },
            {
                say: "沃尔突兀的问题让你猝不及防，你还没来得及说什么，他就继续说道。"
            },
            {
                say: "为了一个离开的人。",
                avatar2: "fr_wore"
            },
            {
                say: "望着眼前的凉亭和他，你好像想起了什么，突然地感到头痛欲裂。"
            },
            {
                say: "他扶着你说着，但是你的脑袋听不真切，头痛的感觉也不允许你清晰地思考。"
            },
            {
                say: "你仓皇的逃回家，回头看，他还站在那湖畔，伴着身后阑珊的灯火。"
            },
            {
                say: "你做了一个梦",
                background: 'black.png',
            },
            {
                say: "梦见你那早已遗忘的过往。"
            },
            {
                say: "从小你便出生在一个苦命的家庭，父亲因战争抛下母亲撒手人寰。",
                fuc: function () {
                    game.switchfrBgm('2backgroundpeople')
                }
            },
            {
                say: "你作为“特殊”的人，成为了学校里被欺凌的对象。",
                background: "classroom.webp"
            },
            {
                say: "是的，仅仅是因为你特殊。"
            },
            {
                say: "任何群体都需要一个发泄的对象，要么对内，要么对外"
            },
            {
                say: "而你成为了他们中的黑羊，任何不参与欺凌你的人都会被他们欺凌。"
            },
            {
                say: "他们做了无数恶心的事情，将胶水涂在你的凳子上，就为看到你母亲为你亲手缝制的裙子被撕烂。"
            },
            {
                say: "故意将你装着开水的瓶打翻，甚至流传你的母亲是个荡妇，将你的父亲害死。"
            },
            {
                say: "然后又用不小心来掩饰。"
            },
            {
                say: "你何尝不想解释，但谁又会听呢？"
            },
            {
                say: "来自孩子的恶意，最纯真，也最不加掩饰。"
            },
            {
                say: "你也哭过，当看到他们嘲笑的神情，当看到他们摆出胜利者的姿态，当他们当着你的面撕碎你的作业，当……——你差点放弃自己。"
            },
            {
                say: "臭婊子还在这里勾引男人呢？",
                avatar2: "某人1"
            },
            {
                say: "你不知道如此肮脏的话语怎样从他们看似稚嫩的口中说出"
            },
            {
                say: "你于是站上了顶楼。",
                background: "upstars.webp"
            },
            {
                say: "一了百了也许是最简单，也是最有效的方法。"
            },
            {
                say: "好想从这个小小的天台一跃而下，你想要让楼下的老师知道自己的处境，你爬上了天台的栏杆，往下看，下头正是冰冷冷的水泥地。"
            },
            {
                say: "你回头，是所有人的围观，有人讥笑，有人议论，有人冷漠，没有人为你说一句话。"
            },
            {
                say: "你坐在栏杆上，没有一个人帮你，只要你果断点，就可以结束这可怕的梦。"
            },
            {
                say: "跳啊！胆小鬼，有种你跳啊！",
                avatar2: "某人2"
            },
            {
                say: "快点跳，死了算了。",
                avatar2: "某人2"
            },
            {
                say: "臭婊子，你倒是跳啊。",
                avatar2: "某人1"
            },
            {
                say: "你只听到楼下人群的喧哗。"
            },
            {
                say: "为什么没有人看到你心里的脆弱？"
            },
            {
                say: "就像无尽的长夜，每一秒都是迷茫，每一秒都是黑暗。"
            },
            {
                say: "人们的悲欢并不相通，你只觉得他们吵闹。"
            },
            {
                say: "正当你迈出一只脚时，你的脑海里回忆起了早上摸着你头的母亲，如果你死了，她怎么办？"
            },
            {
                say: "你犹豫了。"
            },
            {
                say: "你想起她将折的皱巴巴的钱塞进你的口袋，说让你吃好点。"
            },
            {
                say: "你默默下了楼，顶着所有人嘲弄的目光。"
            },
            {
                say: "我就说她不敢跳",
                avatar2: "某人2"
            },
            {
                say: "你听到周围的笑声"
            },
            {
                say: "既然他们以笑话为真话，以真话为笑话。那么你就不说话。"
            },
            {
                say: "这场噩梦还要持续多久。"
            },
            {
                say: "......"
            },
            {
                say: "就像是一片阳光穿过了阴霾",
                background: 'black.png',
                fuc: function () {
                    game.switchfrBgm('2background2');
                },
            },
            {
                say: "那是闷热夏日的雨天，你坐在教室里，望着窗外的不知疲倦的人流......"
            },
            {
                say: "你好，我叫沃尔",
                avatar2: "沃尔",
                background: "deskwolf.png"
            },
            {
                say: "你有些惊讶的转过了头，看见他笑着的双眼。你瞬间就被他吸引了。注视着他的双眼，你觉得他的眼里有灿烂的繁星。"
            },
            {
                say: "你知道他是刚来的转学生，也许是唯一对你没有偏见的人"
            },
            {
                say: "臭婊子又在勾引人了啊。",
                avatar2: "某人2",
            },
            {
                say: "沃尔立刻展现了攻击的姿态，原本温和的眼眸也变得锐利。"
            },
            {
                say: "我们走走吧！",
                avatar: "fr_tiers"
            },
            {
                say: "不知道你哪来的勇气，你拉住了他。"
            },
            {
                say: '好啊',
                avatar2: "沃尔"
            },
            {
                say: "但他答应下来。"
            },
            {
                say: "就像所有的童话故事一样。",
                background: 'black.png',
            },
            {
                say: "后来，你们成为了无话不谈的好朋友。"
            },
            {
                say: "他说上学路上的亭子被他种上了蔷薇。"
            },
            {
                say: "他说他教训了那些欺负你的人。"
            },
            {
                say: "他说他会保护你。"
            },
            {
                say: "他说..."
            },
            {
                say: "你迫切的渴望留住这一束光。"
            },
            {
                say: "但你转学了，这是你的母亲安排的。那时你患了抑郁症，你的母亲为了你的健康，帮你安排了转学。"
            },
            {
                say: "你也不知道你苦命的母亲凑了多久的钱，带你去看了心理医生。"
            },
            {
                say: "解离性人格分裂症，就算治好也有可能失忆。",
                background: "hospital.webp"
            },
            {
                say: "医生的话，如刀般刺入你母亲的心中，你只依稀记得她苦苦的哀求一定要治好你。"
            },
            {
                say: "你的梦醒了，匆忙地向着湖边赶去。",
                background: "black.png"
            },
            {
                say: "北风依然萧瑟，你埋怨着自己的迟钝，又有些难言的悲伤。",
                background: "snow lake.png",
            },
            {
                say: "失落的走到那个亭子，你望着湖面倒映着远处的阑珊灯火。"
            },
            {
                say: "你说，我们是为了忘却而纪念吗？",
                avatar: "fr_tiers"
            },
            {
                say: "你的话就这样散入风里。"
            },
            {
                say: "......",
                background: "black.png"
            },
            {
                say: "......"
            },
            {
                say: "你感觉自己突然被拥入怀中。"
            },
            {
                say: "当然不是了，傻瓜",
                avatar2: "fr_wore",
                background: "hug.png"
            },
            {
                say: "你看到沃尔的眼里满是欣喜"
            },
            {
                say: "你终于想起我了吗？",
                avatar2: "fr_wore"
            },
            {
                say: "嗯",
                avatar: "fr_tiers"
            },
            {
                say: "你这样点了点头"
            },
            {
                say: "似乎冬天也不那么冷了"
            },
            {
                say: "《纪念》完",
                background: "black.png"
            },
            {
                say: "编曲：钫酸酱，CG：钫酸酱，文案：钫酸酱。"
            },
            {
                say: "第一次制作这么长的剧情，若有不足，敬请谅解。"
            },
            {
                say: "编曲为俺自己谱曲，自己钢琴实录演奏（挺胸）"
            },
            {
                say: "谢谢大家"
            }
        ],
        '3':[
            {
                say: "点击观看<再叙酒馆>剧情",
                background: 'black.png',
            },
            {
                say: "客官您来了。",
                avatar2: '吟游诗人',
                background: 'tavern.jpg',
                fuc: function () {
                    game.switchfrBgm('tavern');
                },
            },
            {
                say:"诗人，再给我讲讲最近的事情吧，比如最近牺牲的那位将军。",
                avatar:'fr_keya'
            },
            {
                say:'（说着，科亚将一枚铜币投入诗人面前的帽子里）',
                fuc: function () {
                    game.frPlayJuqingAudio('Throw_coin')
                },
            },
            {
                say:"您是说，里欧纳将军？这件事你就问对人了，我和你说，我可是有里欧纳将军的第一手资料，他......",
                avatar2: '吟游诗人',
            },
            {
                say:'说重点',
                avatar:'fr_sisk'
            },
            {
                say:'（西斯科从门口走了进来，向在一边喝酒的克莱尔挥了挥手，并向诗人呲了下牙）'
            },
            {
                say:'客官，我们是文明社会...',
                avatar2: '吟游诗人',
            },
            {
                say:'你上次已经说过了。',
                avatar:'fr_keya'
            },
            {
                say:'好吧',
                avatar2: '吟游诗人',
            },
            {
                say:'里欧纳是一位勇猛无比的将军，他被称为帝国雄狮，是一位狮子兽人，但他爱上了敌国的一位人类将军的女儿。',
                avatar2: '吟游诗人',
            },
            {
                say:'你是说，敌国？也就是那个天杀的坷拉帝国？',
                avatar:'fr_sisk'
            },
            {
                say:'客官，您先冷静一下',
                avatar2: '吟游诗人',
            },
            {
                say:'他是怎么死的？',
                avatar:'fr_keya'
            },
            {
                say:'里欧纳将军的死亡是一段悲惨的故事。他在最后一次战役中，英勇地领导他的部队与敌军展开激烈的战斗。虽然他的军队占据了优势，但他却在一次突然的袭击中遭受了致命的重伤，最终牺牲了自己的生命，保卫了帝国和人民的安全。',
                avatar2: '吟游诗人',
            },
            {
                say:'我倒是有个小道消息，他是为了保护敌国的那位情妇而牺牲的',
                avatar:'fr_kert'
            },
            {
                say:'（突兀的声音插了进来，科亚忍不住抬头看去）'
            },
            {
                say:'柯尔特，你可算回来了！',
                avatar:'fr_klier'
            },
            {
                say:"（坐在位置上一个人喝酒的克莱尔站了起来，锤了锤柯尔特的肩膀）"
            },
            {
                say:'你不知道，你不在的时候我他妈的有多无聊，团长他婆婆妈妈的..',
                avatar:'fr_klier'
            },
            {
                say:'（科亚给了克莱尔一个眼刀，克莱尔安静了下来）'
            },
            {
                say:'诗人听到西斯科的话后，沉思了一会儿，说道'
            },
            {
                say:'无论他死亡的原因是什么，他都是一位勇敢而无私的将军，他用自己的生命保卫了我们的国家和人民的安全。',
                avatar2: '吟游诗人',
            },
            {
                say:'（科亚拍了拍诗人的肩膀）'
            },
            {
                say:'你什么时候变得这么正义了，再来点其他情报？',
                avatar:'fr_keya'
            },
            {
                say:"（科亚喝了口吧台上放着的酒）"
            },
            {
                say:'你知道最近在帝国附近出没的龙族嘛？',
                avatar:'fr_keya',
            },
            {
                say:'当然知道了。最近确实有不少人目击到了龙族的存在，甚至有人称看到了一条黑色的巨龙。',
                avatar2: '吟游诗人',
            },
            {
                say:'龙血可是昂贵的东西，如果能搞到一点...',
                avatar:'fr_sisk',
            },
            {
                say:'龙族可是强大的存在，还是不要痴心妄想了',
                avatar:'fr_keya',
            },
            {
                say:'（就在科亚还在和诗人说着什么的时候，一声巨响突然将酒馆的玻璃震碎）'
            },
            {
                say:'（坐在酒馆里的人大部分是赏金工会的成员，他们纷纷举起武器，看向声音的来源。）'
            },
            {
                say:'（科亚循声望去，只看到一双闪烁着金色的龙眸正紧盯着自己）'  
            },
            {
                say:'好久不见了，流浪者佣兵团',
                avatar:'fr_dragon'
            },
            {
                say:'未完待续',
                background: 'black.png',
            },
        ],
    };
    List = juqing_drama[get.translation(name)];

    var Listnum = 0;
    var str;
    var avatar;
    var avatar2;
    //第一个
    for (var i in List[Listnum]) {
        //game.log(i);
        switch (i) {
            case 'say':
                str = List[Listnum][i];
                break;
            case 'avatar':
                avatar = List[Listnum][i];
                break;
            case 'avatar2':
                avatar2 = List[Listnum][i];
                break;
            case 'background':
                var urlString = List[Listnum][i];
                ui.background.setBackgroundImage("extension/福瑞拓展/image/background/" + urlString);
                break;
            case 'fuc':
                List[Listnum][i]();
                break;
        }
    }
    var avatar2_div = ui.create.div('');
    //var style1 = ui.create.div();
    avatar2_div.style.width = '172px';
    avatar2_div.style.right = '0px';
    avatar2_div.style['zIndex'] = 998;
    avatar2_div.style['text-align'] = 'center';
    avatar2_div.style['font-size'] = '20px';
    avatar2_div.style['line-height'] = '30px';
    avatar2_div.style['font-family'] = "'STXinwei','xinwei'";
    avatar2_div.style['box-shadow'] = 'none';
    ui.window.appendChild(avatar2_div);

    var avatar2show = function () {
        if (avatar2 != undefined) {
            avatar2_div.style.height = '230px';
            avatar2_div.style.bottom = '0px';
            avatar2_div.style['background-color'] = 'rgba(0,0,0,0)';
            avatar2_div.setBackgroundImage('extension/福瑞拓展/image/lutou/' + avatar2 + '.png');
            avatar2_div.style.backgroundSize = "contain";
            avatar2_div.style.backgroundRepeat = "no-repeat"
            avatar2_div.style.backgroundPosition = 'bottom'
            avatar2_div.style.borderRadius = '5px';
            avatar2_div.innerHTML = "<span style='background:hsla(0,0%,20%,0.65)'>" + get.translation(avatar2) + "</span>";
        } else {
            avatar2_div.style.borderRadius = '';
            avatar2_div.style.bottom = '10px';
            avatar2_div.style['background-color'] = 'hsla(0,0%,20%,0.65)';
            avatar2_div.style.height = '160px';
            avatar2_div.style.backgroundImage = '';
            avatar2_div.innerHTML = '';
        }
    };

    var avatar_div = ui.create.div('');
    //var style1 = ui.create.div();
    avatar_div.style.width = '172px';
    avatar_div.style.left = '0px';
    avatar_div.style['zIndex'] = 998;
    avatar_div.style['text-align'] = 'center';
    avatar_div.style['font-size'] = '20px';
    avatar_div.style['line-height'] = '30px';
    avatar_div.style['font-family'] = "'STXinwei','xinwei'";
    avatar_div.style['box-shadow'] = 'none';
    ui.window.appendChild(avatar_div);

    var avatarshow = function () {
        if (avatar != undefined) {
            avatar_div.style.height = '230px';
            avatar_div.style.bottom = '0px';
            avatar_div.style['background-color'] = 'rgba(0,0,0,0)';
            avatar_div.setBackgroundImage('extension/福瑞拓展/image/lutou/' + avatar + '.png');
            avatar_div.style.backgroundSize = "contain";
            avatar_div.style.backgroundRepeat = "no-repeat"
            avatar_div.style.backgroundPosition = 'bottom'
            avatar_div.style.borderRadius = '5px';
            avatar_div.innerHTML = "<span style='background:hsla(0,0%,20%,0.65)'>" + get.translation(avatar) + "</span>";
        } else {
            avatar_div.style.borderRadius = '';
            avatar_div.style.bottom = '10px';
            avatar_div.style['background-color'] = 'hsla(0,0%,20%,0.65)';
            avatar_div.style.height = '160px';
            avatar_div.style.backgroundImage = '';
            avatar_div.innerHTML = '';
        }
    };
    var chat = ui.create.div('');
    chat.style.height = '160px';
    //不设置'192px'是为了突出人头像
    chat.style.width = 'calc(100% - 374px)';
    chat.style.bottom = '10px';
    chat.style.left = '172px';
    chat.style.right = '172px';
    chat.style['overflow-x'] = 'hidden';
    chat.style['overflow-y'] = 'scroll';
    lib.setScroll(chat);
    chat.style['zIndex'] = 998;
    chat.style['box-shadow'] = 'none';
    chat.style['background-color'] = 'hsla(0,0%,20%,0.65)';
    chat.style['text-align'] = 'left';
    chat.style['font-size'] = '20px';
    chat.style['padding-left'] = '15px';
    chat.style['padding-right'] = '15px';
    chat.style['font-family'] = "'STXinwei','xinwei'";
    ui.window.appendChild(chat);

    avatar2show()
    if (avatar2 != undefined) {
        chat.innerHTML = '<br>';
    } else {
        chat.innerHTML = '<br>';
    }

    avatarshow();
    if (avatar != undefined) {
        chat.innerHTML = '<br>';
    } else {
        chat.innerHTML = '<br>';
    }
    var num = 0;

    var interval = setInterval(function () {
        if (str && str[num]) {
            chat.innerHTML += str[num];
            num++;
        }
    },
        120);

    chat.onclick = function () {
        avatar = undefined
        avatar2 = undefined
        if (num < str.length - 1) {
            var str1 = '<br>' + str;
            chat.innerHTML = str1;
            num = str.length;
        } else {
            chat.innerHTML = '<br>';
            Listnum++;
            if (Listnum == List.length) {
                End(chat, avatar_div, avatar2_div, interval);
                return;
            }
            for (var i in List[Listnum]) {
                switch (i) {
                    case 'say':
                        str = List[Listnum][i];
                        break;
                    case 'avatar':
                        avatar = List[Listnum][i];
                        break;
                    case 'avatar2':
                        avatar2 = List[Listnum][i];
                        break;
                    case 'background':
                        //ui.background.style.backgroundImage = List[Listnum][i];
                        var urlString = List[Listnum][i];
                        ui.background.setBackgroundImage("extension/福瑞拓展/image/background/" + urlString);
                        break;
                    case 'fuc':
                        List[Listnum][i]();
                        break;
                }
            }
            num = 0;
            avatarshow();
            avatar2show()
        }
    };

    avatar_div.onclick = function () {
        if (avatar == undefined) {
            chat.click();
        }
    };

    avatar2_div.onclick = function () {
        if (avatar2 == undefined) {
            chat.click();
        }
    };
}
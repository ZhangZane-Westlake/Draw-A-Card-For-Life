import type { CardCategoryOption, LifeCard } from "../types";

export const card_category_options: readonly CardCategoryOption[] = [
  { id: "all", label: "全部能量", description: "从所有生活指引中抽取一张卡。" },
  { id: "body", label: "身体充电", description: "用低门槛动作照顾身体感受。" },
  { id: "mind", label: "心绪整理", description: "让脑内噪音慢慢沉下来。" },
  { id: "creative", label: "灵感火花", description: "用小创作重新点亮好奇心。" },
  { id: "social", label: "温柔连接", description: "和人、宠物或世界建立一点连接。" },
  { id: "nature", label: "自然呼吸", description: "把注意力交还给天气、光线和植物。" },
  { id: "reset", label: "空间重启", description: "通过整理环境给自己一个新起点。" },
];

type PixelArtTemplate = readonly string[];

const pixel_art_by_rarity: Record<LifeCard["rarity"], readonly PixelArtTemplate[]> = {
  common: [
    ["0000ee000000", "000eeee00000", "00eeeeee0000", "0eeeeeeee000", "00eeeeee0000", "000eeee00000", "0000ee000000"],
    ["000000000000", "0000eeee0000", "000ee00ee000", "00ee0000ee00", "000ee00ee000", "0000eeee0000", "000000000000"],
    ["00000ee00000", "0000eeee0000", "000eeffee000", "00eeffffee00", "000eeffee000", "0000eeee0000", "00000ee00000"],
  ],
  gentle: [
    ["00e000000e00", "0ee0eee0ee0", "eeeffffeeee", "eecfffffcee", "eeeffffeeee", "0ee0eee0ee0", "00e000000e00"],
    ["000ee00ee000", "00eeffffee00", "0eeffffffee0", "eecffffffcee", "0eeffffffee0", "00eeffffee00", "000ee00ee000"],
    ["0000eeee0000", "00eeccccee00", "0eeffffffee0", "eeeffffeeee0", "0eeffffffee0", "00eeccccee00", "0000eeee0000"],
  ],
  spark: [
    ["0000e00e0000", "00e0f00f0e00", "0eefeeeefee0", "eeeffccffeee", "0eefeeeefee0", "00e0f00f0e00", "0000e00e0000"],
    ["00000ff00000", "0000feef0000", "00effccffe00", "0eeffffffee0", "00effccffe00", "0000feef0000", "00000ff00000"],
    ["00e000000e00", "000e0ff0e000", "0eeffccffee0", "eeeffffffeee", "0eeffccffee0", "000e0ff0e000", "00e000000e00"],
  ],
  rare: [
    ["000c000000c0", "00ecee00eece", "0eeffeffeeef", "ceeffccffeee", "0eeffeffeeef", "00ecee00eece", "000c000000c0"],
    ["00c000000c00", "0eceffffece0", "eeffccccffee", "ceffffffffec", "eeffccccffee", "0eceffffece0", "00c000000c00"],
    ["000c0ee0c000", "00ecefffece0", "0eeffccffee0", "ceeffffffeec", "0eeffccffee0", "00ecefffece0", "000c0ee0c000"],
  ],
};

const body_cards: readonly Omit<LifeCard, "id" | "category" | "palette" | "pixel_art">[] = [
  { title: "巧克力补给", prompt: "吃一小块巧克力，闭眼感受它慢慢融化。", rarity: "gentle", minutes: 3 },
  { title: "温水开机", prompt: "倒一杯温水，用两只手捧着喝完。", rarity: "common", minutes: 4 },
  { title: "肩颈松雪", prompt: "把肩膀向上耸三秒再放下，重复八次。", rarity: "common", minutes: 5 },
  { title: "脚底回航", prompt: "赤脚踩地，感受脚跟、脚掌和脚趾依次落下。", rarity: "gentle", minutes: 4 },
  { title: "水果星球", prompt: "吃一份水果，把第一口当作今天的小奖励。", rarity: "spark", minutes: 6 },
  { title: "伸展海岸", prompt: "站起来伸一个长长的懒腰，让肋骨打开。", rarity: "common", minutes: 3 },
  { title: "热毛巾云", prompt: "用热毛巾敷眼或敷脸，让表情肌休息。", rarity: "gentle", minutes: 8 },
  { title: "三口深呼吸", prompt: "吸气四拍、呼气六拍，做三轮就好。", rarity: "common", minutes: 2 },
  { title: "散步邮票", prompt: "走到门外或窗边，给自己收集十步新鲜空气。", rarity: "spark", minutes: 7 },
  { title: "手心太阳", prompt: "双手搓热，轻轻盖住眼睛十秒。", rarity: "common", minutes: 2 },
  { title: "香气按钮", prompt: "闻一闻茶、咖啡、香皂或护手霜，把注意力放在气味上。", rarity: "gentle", minutes: 3 },
  { title: "音乐拉伸", prompt: "放一首慢歌，跟着旋律拉伸到歌曲结束。", rarity: "spark", minutes: 5 },
  { title: "坐姿刷新", prompt: "把腰背坐直，调整屏幕和椅子，让身体少用一点力。", rarity: "common", minutes: 3 },
  { title: "暖袜护盾", prompt: "换上一双舒服的袜子，给脚一个柔软边界。", rarity: "gentle", minutes: 4 },
  { title: "能量小餐", prompt: "准备一份简单点心：坚果、酸奶、面包或饼干都可以。", rarity: "spark", minutes: 8 },
  { title: "泡泡洗手", prompt: "认真洗手二十秒，把泡沫当作清空按钮。", rarity: "common", minutes: 2 },
  { title: "下巴解锁", prompt: "张嘴、闭嘴、左右移动下巴，放松咬紧的力气。", rarity: "gentle", minutes: 3 },
  { title: "摇滚三分钟", prompt: "听一首摇滚乐，让身体随便晃动，不用跳得好看。", rarity: "rare", minutes: 4 },
  { title: "抱枕补丁", prompt: "抱住枕头或毯子，给胸口一点稳定的压力。", rarity: "gentle", minutes: 5 },
  { title: "沐浴存档", prompt: "洗一个热水澡，想象疲惫从肩上流走。", rarity: "rare", minutes: 15 },
];

const mind_cards: readonly Omit<LifeCard, "id" | "category" | "palette" | "pixel_art">[] = [
  { title: "三行天气", prompt: "写下此刻的心情、身体感受和最小下一步。", rarity: "common", minutes: 5 },
  { title: "脑袋卸货", prompt: "把脑中所有待办写到纸上，不排序也不解决。", rarity: "gentle", minutes: 8 },
  { title: "五感锚点", prompt: "说出五个看到的、四个摸到的、三个听到的东西。", rarity: "common", minutes: 4 },
  { title: "允许暂停", prompt: "对自己说：我可以慢一点，今天不用满格运行。", rarity: "gentle", minutes: 2 },
  { title: "十分钟沙漏", prompt: "设十分钟计时，只做一件最容易开始的小事。", rarity: "spark", minutes: 10 },
  { title: "烦恼信封", prompt: "把一个烦恼写成一句话，折起来放到明天再看。", rarity: "gentle", minutes: 6 },
  { title: "名字归位", prompt: "给现在的情绪起一个名字，例如：蓝色疲惫。", rarity: "common", minutes: 3 },
  { title: "白噪声舱", prompt: "播放雨声、海浪或风扇声，让自己安静待五分钟。", rarity: "spark", minutes: 5 },
  { title: "低电量模式", prompt: "列出今天可以降低标准的一件事。", rarity: "gentle", minutes: 4 },
  { title: "旧歌传送", prompt: "听一首让你想起过去好时刻的歌。", rarity: "rare", minutes: 5 },
  { title: "屏幕落幕", prompt: "把手机扣下三分钟，只观察呼吸和房间。", rarity: "common", minutes: 3 },
  { title: "小胜利收藏", prompt: "写下今天已经完成的一件小事，哪怕只是起床。", rarity: "gentle", minutes: 4 },
  { title: "未来明信片", prompt: "给明天的自己留一句轻柔提示。", rarity: "spark", minutes: 6 },
  { title: "界限护栏", prompt: "找出一个今天可以拒绝、推迟或简化的请求。", rarity: "rare", minutes: 7 },
  { title: "思想云朵", prompt: "把一个念头想象成云，看它飘过而不追上去。", rarity: "common", minutes: 3 },
  { title: "安心物件", prompt: "拿起一个熟悉的小物件，描述它的重量、纹理和颜色。", rarity: "gentle", minutes: 4 },
  { title: "倒数电梯", prompt: "从二十慢慢倒数到一，每个数字都放低一点声音。", rarity: "common", minutes: 3 },
  { title: "问题缩小", prompt: "把“我要解决人生”改写成“我下一步只做什么”。", rarity: "spark", minutes: 5 },
  { title: "温柔证据", prompt: "找一个证据证明：你已经很努力了。", rarity: "rare", minutes: 6 },
  { title: "情绪窗户", prompt: "看窗外一分钟，让情绪像天气一样经过。", rarity: "gentle", minutes: 3 },
];

const creative_cards: readonly Omit<LifeCard, "id" | "category" | "palette" | "pixel_art">[] = [
  { title: "像素涂鸦", prompt: "在纸上画一个 8×8 小像素图，不需要像任何东西。", rarity: "spark", minutes: 8 },
  { title: "一句小诗", prompt: "用今天看到的三个词写一句短诗。", rarity: "gentle", minutes: 6 },
  { title: "颜色采样", prompt: "在房间里找三种蓝色，并给它们命名。", rarity: "common", minutes: 5 },
  { title: "随手拼贴", prompt: "截一张图、拍一张桌面或收集一个贴纸，做今天的灵感碎片。", rarity: "spark", minutes: 7 },
  { title: "十字故事", prompt: "写一个只有十个字的小故事。", rarity: "common", minutes: 4 },
  { title: "旋律哼唱", prompt: "随便哼一段旋律，录十秒给自己。", rarity: "rare", minutes: 5 },
  { title: "旧物新名", prompt: "给桌上的一个物品取一个奇幻名字。", rarity: "gentle", minutes: 3 },
  { title: "手账边角", prompt: "在纸张角落画一颗星、一朵云或一只小怪兽。", rarity: "common", minutes: 5 },
  { title: "照片任务", prompt: "拍一张“今天的光”的照片。", rarity: "spark", minutes: 6 },
  { title: "梦境标题", prompt: "给最近的一个梦或幻想写一个电影标题。", rarity: "gentle", minutes: 4 },
  { title: "三词设定", prompt: "抽三个随机词，把它们组成一个角色设定。", rarity: "rare", minutes: 9 },
  { title: "声音地图", prompt: "画出此刻听到的声音位置。", rarity: "spark", minutes: 7 },
  { title: "微型海报", prompt: "为今天的自己设计一句海报标语。", rarity: "gentle", minutes: 6 },
  { title: "手写魔法", prompt: "把喜欢的一句话认真手写一遍。", rarity: "common", minutes: 5 },
  { title: "材料实验", prompt: "用笔、胶带、纸或照片做一个一分钟小实验。", rarity: "spark", minutes: 8 },
  { title: "角色散步", prompt: "想象一个角色正在你的街区散步，他会注意什么？", rarity: "rare", minutes: 6 },
  { title: "封面幻想", prompt: "给今天的生活章节起一个书名。", rarity: "gentle", minutes: 4 },
  { title: "纹理拓印", prompt: "用铅笔轻轻拓印硬币、叶子或桌面纹理。", rarity: "spark", minutes: 7 },
  { title: "随机配色", prompt: "选三支笔或三个色块，做一张小小配色卡。", rarity: "common", minutes: 5 },
  { title: "未来物品", prompt: "画一个来自未来但只负责安慰人的小机器。", rarity: "rare", minutes: 10 },
];

const social_cards: readonly Omit<LifeCard, "id" | "category" | "palette" | "pixel_art">[] = [
  { title: "问候气泡", prompt: "给一个安全的人发一句：想起你了，希望你今天顺利。", rarity: "gentle", minutes: 4 },
  { title: "表情回应", prompt: "用一个表情回复一条搁置的信息。", rarity: "common", minutes: 2 },
  { title: "谢谢邮差", prompt: "向最近帮助过你的人说一句谢谢。", rarity: "spark", minutes: 5 },
  { title: "宠物频道", prompt: "摸摸宠物、看看动物视频，认真陪它一分钟。", rarity: "gentle", minutes: 4 },
  { title: "共享歌曲", prompt: "把一首歌分享给朋友，并说这首让我想到你。", rarity: "rare", minutes: 6 },
  { title: "轻量约定", prompt: "邀请一个人未来某天喝咖啡或散步，不急着定细节。", rarity: "spark", minutes: 7 },
  { title: "旧照问候", prompt: "翻一张旧照片，给照片里的人送一个心里祝福。", rarity: "gentle", minutes: 5 },
  { title: "留言瓶", prompt: "在喜欢的作品下留一句真诚评论。", rarity: "common", minutes: 4 },
  { title: "边界句子", prompt: "练习一句温柔拒绝：我现在不太有余力，晚点回复你。", rarity: "rare", minutes: 5 },
  { title: "邻里微笑", prompt: "对遇到的人点头或微笑一次，不需要攀谈。", rarity: "common", minutes: 3 },
  { title: "家庭灯塔", prompt: "给家人发一个简单近况：我还好，今天在慢慢充电。", rarity: "gentle", minutes: 5 },
  { title: "好友雷达", prompt: "想一个最近也许需要关心的人，发一个低压力问候。", rarity: "spark", minutes: 6 },
  { title: "语音小岛", prompt: "给自己或朋友录一段十秒语音，说今天的一件小事。", rarity: "gentle", minutes: 4 },
  { title: "共同安静", prompt: "和一个人约定各自安静做事二十分钟。", rarity: "rare", minutes: 20 },
  { title: "善意转发", prompt: "把一条有用或可爱的内容转给会喜欢它的人。", rarity: "common", minutes: 3 },
  { title: "名字闪光", prompt: "写下一个你欣赏的人，以及你欣赏他的一个点。", rarity: "gentle", minutes: 5 },
  { title: "求助练习", prompt: "写一句可发送的求助消息，哪怕暂时不发送。", rarity: "rare", minutes: 7 },
  { title: "群聊浮标", prompt: "在熟悉群聊里冒泡一句简单的话。", rarity: "common", minutes: 3 },
  { title: "拥抱替代", prompt: "抱抱自己、抱枕或毛毯，想象被稳稳接住。", rarity: "gentle", minutes: 4 },
  { title: "赞美递送", prompt: "把一个具体赞美送给别人：你的某件事让我很喜欢。", rarity: "spark", minutes: 5 },
];

const nature_cards: readonly Omit<LifeCard, "id" | "category" | "palette" | "pixel_art">[] = [
  { title: "窗边云朵", prompt: "看云或天空两分钟，只描述形状不评价天气。", rarity: "common", minutes: 3 },
  { title: "植物巡逻", prompt: "看看一盆植物，摸摸叶片或给它转个方向。", rarity: "gentle", minutes: 4 },
  { title: "阳光补丁", prompt: "把手放进阳光里十秒，感受温度。", rarity: "spark", minutes: 2 },
  { title: "雨声暂停", prompt: "如果下雨，就听一会雨声；没下雨就播放雨声。", rarity: "gentle", minutes: 5 },
  { title: "风的签名", prompt: "打开窗一点点，感受空气流动。", rarity: "common", minutes: 3 },
  { title: "树影观测", prompt: "找一棵树或一张树的照片，观察枝叶分叉。", rarity: "spark", minutes: 5 },
  { title: "月亮预约", prompt: "今晚记得看一眼月亮或夜空。", rarity: "rare", minutes: 4 },
  { title: "石头重量", prompt: "拿一颗石头、杯子或小物，感受它安静的重量。", rarity: "gentle", minutes: 3 },
  { title: "季节证据", prompt: "找一个证明当前季节存在的细节。", rarity: "common", minutes: 4 },
  { title: "水面想象", prompt: "看一张海、湖或河的图片，跟着水面呼吸。", rarity: "spark", minutes: 5 },
  { title: "鸟鸣频道", prompt: "听一段鸟叫声，或者辨认窗外一种声音。", rarity: "gentle", minutes: 4 },
  { title: "土壤记忆", prompt: "闻一闻泥土、茶叶、木头或纸张的自然气味。", rarity: "common", minutes: 3 },
  { title: "街角探险", prompt: "走到最近的路口，发现一个平时忽略的细节。", rarity: "rare", minutes: 10 },
  { title: "蓝色远方", prompt: "看向最远的蓝色：天空、窗帘、屏幕或杯子。", rarity: "gentle", minutes: 3 },
  { title: "日落提醒", prompt: "查一下今天日落时间，给自己留一分钟看光线变化。", rarity: "spark", minutes: 5 },
  { title: "叶片像素", prompt: "画一片叶子的像素轮廓。", rarity: "common", minutes: 6 },
  { title: "温度记录", prompt: "记录今天空气的温度感：冷、暖、潮、干或清爽。", rarity: "gentle", minutes: 3 },
  { title: "小径模拟", prompt: "在房间里慢慢走一圈，假装这是一条森林小径。", rarity: "spark", minutes: 5 },
  { title: "星星缓存", prompt: "收藏一张星空图片，作为今晚的安静入口。", rarity: "rare", minutes: 4 },
  { title: "晨光书签", prompt: "把窗帘拉开一点，让自然光进来。", rarity: "common", minutes: 2 },
];

const reset_cards: readonly Omit<LifeCard, "id" | "category" | "palette" | "pixel_art">[] = [
  { title: "桌面小岛", prompt: "只清理桌面一个手掌大的区域。", rarity: "common", minutes: 5 },
  { title: "杯子归港", prompt: "把一个杯子送去清洗或放回厨房。", rarity: "common", minutes: 3 },
  { title: "垃圾流星", prompt: "丢掉三件明显不需要的垃圾。", rarity: "spark", minutes: 4 },
  { title: "床铺云层", prompt: "把被子铺平，不追求完美。", rarity: "gentle", minutes: 5 },
  { title: "灯光调频", prompt: "调暗、调亮或换一个更舒服的光源。", rarity: "common", minutes: 3 },
  { title: "文件夹雪崩", prompt: "只整理电脑桌面上的五个文件。", rarity: "spark", minutes: 8 },
  { title: "空气换页", prompt: "开窗通风三分钟，或打开空气净化器。", rarity: "gentle", minutes: 3 },
  { title: "洗衣篮传送", prompt: "把散落衣物放进洗衣篮，不需要立刻洗。", rarity: "common", minutes: 4 },
  { title: "充电线归队", prompt: "整理一根数据线或给一个设备充电。", rarity: "common", minutes: 3 },
  { title: "入口重启", prompt: "整理门口一双鞋或一个包，让出入更轻松。", rarity: "gentle", minutes: 5 },
  { title: "香味刷新", prompt: "点香薰、喷织物喷雾，或换一块干净毛巾。", rarity: "spark", minutes: 4 },
  { title: "收纳一格", prompt: "只整理一个抽屉、一层架子或一个盒子。", rarity: "rare", minutes: 12 },
  { title: "待办减法", prompt: "从待办里删掉、合并或推迟一项。", rarity: "gentle", minutes: 5 },
  { title: "屏幕擦拭", prompt: "擦一擦手机或电脑屏幕。", rarity: "common", minutes: 3 },
  { title: "包包轻量", prompt: "从包里拿出一件不需要随身带的东西。", rarity: "spark", minutes: 5 },
  { title: "邮件浅潜", prompt: "只处理一封最容易处理的邮件或消息。", rarity: "gentle", minutes: 6 },
  { title: "音乐换景", prompt: "换一张播放列表，让空间气氛重新开始。", rarity: "common", minutes: 3 },
  { title: "清水花瓶", prompt: "给花瓶换水，或给杯子倒一杯新水。", rarity: "spark", minutes: 4 },
  { title: "五分钟重启", prompt: "设五分钟计时，能收多少是多少，响铃就停。", rarity: "rare", minutes: 5 },
  { title: "明早缓存", prompt: "为明早准备一件小物：衣服、杯子、钥匙或便签。", rarity: "gentle", minutes: 6 },
];

const category_palettes = {
  body: ["#8ddcff", "#fff3c4", "#ff9fb2"],
  mind: ["#b9d7ff", "#d9c7ff", "#ffffff"],
  creative: ["#8fd3ff", "#ffe08a", "#ff9ee6"],
  social: ["#a7e8ff", "#ffd1dc", "#fff8f0"],
  nature: ["#9be7d8", "#c7f9cc", "#d8f3ff"],
  reset: ["#bfe8ff", "#e8f6ff", "#cfd8ff"],
} as const;

const card_groups = {
  body: body_cards,
  mind: mind_cards,
  creative: creative_cards,
  social: social_cards,
  nature: nature_cards,
  reset: reset_cards,
} as const;

/**
 * Builds the persisted guide library used by every draw mode.
 */
export const build_life_cards = (): readonly LifeCard[] => {
  return Object.entries(card_groups).flatMap(([category, cards]) =>
    cards.map((card, index) => {
      const pixel_art_templates = pixel_art_by_rarity[card.rarity];

      return {
        ...card,
        id: `${category}-${String(index + 1).padStart(2, "0")}`,
        category: category as LifeCard["category"],
        palette: category_palettes[category as LifeCard["category"]],
        pixel_art: pixel_art_templates[index % pixel_art_templates.length],
      };
    }),
  );
};

export const life_cards = build_life_cards();

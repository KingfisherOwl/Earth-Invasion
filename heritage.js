const heritageProgressFill = document.getElementById("heritageProgressFill");
const heritageProgressBar = document.getElementById("heritageProgressBar");
const heritageSkipButton = document.getElementById("heritageSkipButton");
const heritageAnalyzingScreen = document.getElementById("heritageAnalyzingScreen");
const heritageAnalysisBar = document.getElementById("heritageAnalysisBar");
const heritageAnalysisFill = document.getElementById("heritageAnalysisFill");
const heritageAnalysisPercent = document.getElementById("heritageAnalysisPercent");
const heritageMissionMessage = document.getElementById("heritageMissionMessage");
const heritageMapBackButton = document.getElementById("heritageMapBackButton");

const heritageUnlockScreen =
  document.getElementById("heritageUnlockScreen");

const heritageUnlockName =
  document.getElementById("heritageUnlockName");

const heritageUnlockButton =
  document.getElementById("heritageUnlockButton");

const heritageUnlockCancelButton =
  document.getElementById("heritageUnlockCancelButton");
let selectedUnlockHeritage = null;

const heritageUnlockMessage = document.getElementById("heritageUnlockMessage");
const noEarthMysteryGuide = document.getElementById("noEarthMysteryGuide");

//世界遺産データ
const heritageData = [
  {
    id: "fuji",
    name: "富士山",
    area: "asia",
    image: "images/heritage/fuji.webp",
    worldX: 80,
    worldY: 39.5,
    areaX: 70,
    areaY: 49,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "現在の富士山は、火山としてどのような状態？",
        choices: [
          "活火山",
          "完全に活動を終えた火山",
          "人工的に作られた山",
          "火山ではない山"
        ],
        answer: "活火山"
      },
      {
        text: "富士山が登録されている世界遺産の種類は？",
        choices: ["文化遺産", "自然遺産", "複合遺産", "無形文化遺産"],
        answer: "文化遺産"
      },
      {
        text: "富士山の標高は約何m？",
        choices: ["2776m", "3376m", "3776m", "4176m"],
        answer: "3776m"
      }
    ]
  },
  {
    id: "yakushima",
    name: "屋久島",
    area: "asia",
    image: "images/heritage/yakusima.webp",
    worldX: 78,
    worldY: 43,
    areaX: 66,
    areaY: 55,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "屋久島にある有名な巨木「縄文杉」の名前の由来として知られる説は？",
        choices: [
          "発見者の名前",
          "縄文土器に似た樹皮",
          "縄文時代の遺跡",
          "周囲の縄文杉の本数"
        ],
        answer: "縄文土器に似た樹皮"
      },
      {
        text: "屋久島では、樹齢何年以上のスギを一般的に「屋久杉」と呼ぶ？",
        choices: [
          "100年以上",
          "500年以上",
          "1000年以上",
          "2000年以上"
        ],
        answer: "1000年以上"
      },
      {
        text: "屋久島に生息する「ヤクシマザル」は、どの動物の亜種？",
        choices: [
          "ニホンザル",
          "テナガザル",
          "マントヒヒ",
          "アカゲザル"
        ],
        answer: "ニホンザル"
      }
    ],
  },
  {
    id: "komodo",
    name: "コモド国立公園",
    area: "asia",
    image: "images/heritage/komodo.webp",
    worldX: 76,
    worldY: 64,
    areaX: 61,
    areaY: 96,
    unlocked: false,
    collected: false,

    questions: [
      {
        text: "コモドオオトカゲは、獲物のにおいを感知するために主にどの器官を使う？",
        choices: [
          "鼻",
          "耳",
          "舌",
          "目"
        ],
        answer: "舌"
      },
      {
        text: "コモドオオトカゲは、大きな獲物を弱らせるために何を利用する？",
        choices: [
          "しっぽの針",
          "毒液",
          "長いキバ",
          "鋭いつめ"
        ],
        answer: "毒液"
      },
      {
        text: "コモドオオトカゲの体長は？",
        choices: [
          "50cm",
          "1m",
          "3m",
          "5m"
        ],
        answer: "3m"
      }
    ],

  },
  {
    id: "greatWall",
    name: "万里の長城",
    area: "asia",
    image: "images/heritage/banri.webp",
    worldX: 75,
    worldY: 36,
    areaX: 56,
    areaY: 44,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "万里の長城が建設された主な目的は？",
        choices: [
          "洪水を防ぐため",
          "巨大な競技場を作るため",
          "北方からの侵入を防ぐため",
          "皇帝の墓を囲むため"
        ],
        answer: "北方からの侵入を防ぐため"
      },
      {
        text: "万里の長城は宇宙から肉眼で見えるといわれるが、実際は？",
        choices: [
          "月からでもはっきり見える",
          "夜になると全体が光る",
          "地球上で唯一見える人工物である",
          "肉眼で見分けるのは非常に難しい",
        ],
        answer: "肉眼で見分けるのは非常に難しい"
      },
      {
        text: "万里の長城の見張り台で、敵の接近を伝えるためにおもに使われたものは？",
        choices: [
          "煙や火",
          "巨大な鏡",
          "伝書鳩",
          "地下の水路"
        ],
        answer: "煙や火"
      }
    ]
  },
  {
    id: "tajMahal",
    name: "タージ・マハル",
    area: "asia",
    image: "images/heritage/ta-ji.webp",
    worldX: 64,
    worldY: 45,
    areaX: 35,
    areaY: 58,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "タージ・マハルがある国はどこ？",
        choices: ["インド", "パキスタン", "ネパール", "バングラデシュ"],
        answer: "インド"
      },
      {
        text: "タージ・マハルの白い外壁には、どんな特徴がある？",
        choices: [
          "雨が降ると透明になる",
          "時間帯によって色が違って見える",
          "夜になると自ら光る",
          "夏になると青く変色する"
        ],
        answer: "時間帯によって色が違って見える"
      },
      {
        text: "タージ・マハルが建設された主な目的は？",
        choices: [
          "軍事要塞として",
          "王宮として",
          "皇帝の妻の墓として",
          "大学として"
        ],
        answer: "皇帝の妻の墓として"
      }
    ]
  },
  {
    id: "cappadocia",
    name: "カッパドキア",
    area: "asia",
    image: "images/heritage/kappa.webp",
    worldX: 54,
    worldY: 37,
    areaX: 13,
    areaY: 45,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "カッパドキアのキノコのような奇岩は、主にどうやってできた？",
        choices: [
          "巨大なサンゴが陸に現れた",
          "火山灰が固まった岩が風雨で削られた",
          "人間が彫刻した",
          "隕石が落下した"
        ],
        answer: "火山灰が固まった岩が風雨で削られた"
      },
      {
        text: "カッパドキアの地下都市には、どんな目的があった？",
        choices: [
          "地下で船を建造するため",
          "金を大量生産するため",
          "火山の噴火を予測するため",
          "人々が身を隠すため",
        ],
        answer: "人々が身を隠すため"
      },
      {
        text: "カッパドキアで、岩をくり抜いた住居を作りやすかった理由は？",
        choices: [
          "岩の内部が最初から空洞だったため",
          "岩が水に溶けるため",
          "比較的柔らかい火山岩が多いため",
          "岩が木材でできていたため"
        ],
        answer: "比較的柔らかい火山岩が多いため"
      }
    ]
  },
  {
    id: "angkorWat",
    name: "アンコール・ワット",
    area: "asia",
    image: "images/heritage/anko-ru.webp",
    worldX: 71,
    worldY: 53,
    areaX: 51,
    areaY: 75,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "アンコール・ワットがある国はどこ？",
        choices: ["タイ", "カンボジア", "ベトナム", "ラオス"],
        answer: "カンボジア"
      },
      {
        text: "アンコール・ワットの中央にある高い塔は、何を表している？",
        choices: [
          "王様が暮らす宮殿",
          "巨大な火山",
          "神々が住むとされる山",
          "天体観測のための塔"
        ],
        answer: "神々が住むとされる山"
      },
      {
        text: "アンコール・ワットはどの宗教の寺院？",
        choices: ["仏教", "イスラム教", "ヒンドゥー教", "キリスト教"],
        answer: "ヒンドゥー教"
      }
    ]
  },
  {
    id: "westNorwegianFjords",
    name: "西ノルウェーフィヨルド群",
    area: "europe",
    image: "images/heritage/noruwe-.webp",
    worldX: 46.5,
    worldY: 23,
    areaX: 41,
    areaY: 21,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "ノルウェーのフィヨルドの深い谷は、主に何によって削られた？",
        choices: [
          "巨大な氷河",
          "火山の噴火",
          "砂漠の風",
          "隕石の衝突"
        ],
        answer: "巨大な氷河"
      },
      {
        text: "フィヨルドの谷の断面は、どのような形になりやすい？",
        choices: [
          "V字型",
          "円形",
          "階段状",
          "U字型",
        ],
        answer: "U字型"
      },
      {
        text: "フィヨルドという言葉の語源は？",
        choices: [
          "英語",
          "ロシア語",
          "ノルウェー語",
          "デンマーク語"
        ],
        answer: "ノルウェー語"
      }
    ]
  },
  {
    id: "krakow",
    name: "クラクフ歴史地区",
    area: "europe",
    image: "images/heritage/kurakufu.webp",
    worldX: 49.5,
    worldY: 30,
    areaX: 49,
    areaY: 41,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "クラクフがかつて首都だった国はどこ？",
        choices: [
          "チェコ",
          "ハンガリー",
          "東ドイツ",
          "ポーランド",
        ],
        answer: "ポーランド"
      },
      {
        text: "クラクフの聖マリア教会で、時報のラッパ演奏が途中で突然終わるのはなぜ？",
        choices: [
          "敵の矢で演奏者が倒れたという伝説に由来するため",
          "ラッパが壊れて短い音しか出せないため",
          "鐘の音を邪魔しないため",
          "演奏者が毎回即興で終えるため"
        ],
        answer: "敵の矢で演奏者が倒れたという伝説に由来するため"
      },
      {
        text: "クラクフのヴァヴェル城に伝わる有名な伝説に登場する生き物は？",
        choices: [
          "ユニコーン",
          "人魚",
          "ドラゴン",
          "フェニックス"
        ],
        answer: "ドラゴン"
      }
    ]
  },
  {
    id: "stonehenge",
    name: "ストーンヘンジ",
    area: "europe",
    image: "images/heritage/stone.webp",
    worldX: 44.5,
    worldY: 29,
    areaX: 34,
    areaY: 38,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "ストーンヘンジの石の配置は、何と関係している？",
        choices: [
          "海の潮の満ち引き",
          "火山の噴火の方向",
          "地震の発生場所",
          "夏至や冬至の太陽の動き",
        ],
        answer: "夏至や冬至の太陽の動き"
      },
      {
        text: "ストーンヘンジの一部の石は、どこから運ばれたと考えられている？",
        choices: [
          "ウェールズ地方",
          "チリのイースター島",
          "エジプトの砂漠",
          "太平洋の海底"
        ],
        answer: "ウェールズ地方"
      },
      {
        text: "ストーンヘンジの建設について正しいのは？",
        choices: [
          "一晩ですべて完成した",
          "ローマ帝国の皇帝が建設を命じた",
          "何世代にもわたって段階的に造られた",
          "産業革命時代の機械で建設された"
        ],
        answer: "何世代にもわたって段階的に造られた"
      }
    ]
  },
  {
    id: "acropolis",
    name: "アテネのアクロポリス",
    area: "europe",
    image: "images/heritage/atene.webp",
    worldX: 51,
    worldY: 37,
    areaX: 51,
    areaY: 58,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "アクロポリスのパルテノン神殿は、主にどの神に捧げられた？",
        choices: [
          "アテナ",
          "ゼウス",
          "ポセイドン",
          "アポロン"
        ],
        answer: "アテナ"
      },
      {
        text: "パルテノン神殿の柱には、安定しているように見せるためにどんな工夫がある？",
        choices: [
          "すべての柱を大きく傾けている",
          "柱の中央付近をわずかに膨らませている",
          "柱の表面を鏡で覆っている",
          "柱を完全な円柱形にしている"
        ],
        answer: "柱の中央付近をわずかに膨らませている"
      },
      {
        text: "古代ギリシャの「アクロポリス」という言葉は、どんな場所を意味する？",
        choices: [
          "地下にある墓地",
          "海に浮かぶ港",
          "高い場所にある都市や城塞",
          "山中の農場"
        ],
        answer: "高い場所にある都市や城塞"
      }
    ]
  },
  {
    id: "colosseum",
    name: "コロッセオ",
    area: "europe",
    image: "images/heritage/korosseo.webp",
    worldX: 48,
    worldY: 35,
    areaX: 44,
    areaY: 53,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "古代ローマのコロッセオでは、観客を日差しから守るために何を使っていた？",
        choices: [
          "巨大な布製の日よけ",
          "ガラスの屋根",
          "大量の木を植えた屋上",
          "地下から吹き出す冷風"
        ],
        answer: "巨大な布製の日よけ"
      },
      {
        text: "コロッセオの地下にあった設備は、何に使われていた？",
        choices: [
          "地下水を飲み水に変える",
          "観客用の宿泊施設にする",
          "動物や剣闘士を舞台へ登場させる",
          "食料を育てる"
        ],
        answer: "動物や剣闘士を舞台へ登場させる"
      },
      {
        text: "コロッセオの観客席は、主に何によって座る場所が分けられていた？",
        choices: [
          "チケットの値段",
          "社会的な身分",
          "観客の出身都市",
          "入場した順番"
        ],
        answer: "社会的な身分"
      }
    ]
  },
  {
    id: "versailles",
    name: "ヴェルサイユ宮殿",
    area: "europe",
    image: "images/heritage/verusaiyu.webp",
    worldX: 45.5,
    worldY: 32,
    areaX: 36.5,
    areaY: 44,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "ヴェルサイユ宮殿の「鏡の間」には、約何枚の鏡が使われている？",
        choices: [
          "約50枚",
          "約150枚",
          "約350枚",
          "約1000枚"
        ],
        answer: "約350枚"
      },
      {
        text: "ヴェルサイユ宮殿を豪華な宮殿に発展させたルイ14世は、何と呼ばれていた？",
        choices: [
          "太陽王",
          "獅子王",
          "鉄の王",
          "月の王"
        ],
        answer: "太陽王"
      },
      {
        text: "ヴェルサイユ宮殿に多くの貴族を住まわせたことには、どんな政治的な狙いがあった？",
        choices: [
          "貴族を農業に従事させるため",
          "貴族に外国語を教えるため",
          "貴族に海外貿易を任せるため",
          "貴族を王の監督下に置くため",
        ],
        answer: "貴族を王の監督下に置くため"
      }
    ]
  },
  {
    id: "sagradaFamilia",
    name: "サグラダ・ファミリア",
    area: "europe",
    image: "images/heritage/sagurada.webp",
    worldX: 45,
    worldY: 36,
    areaX: 36,
    areaY: 54,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "サグラダ・ファミリアの内部の柱は、何をイメージして設計されている？",
        choices: [
          "木",
          "波",
          "骨",
          "岩"
        ],
        answer: "木"
      },
      {
        text: "サグラダ・ファミリアのステンドグラスには、どんな工夫がある？",
        choices: [
          "雨が降ると模様が動く",
          "気温によって文字が浮かぶ",
          "夜になるとガラスが透明になる",
          "方角によって光の色合いが異なる"
        ],
        answer: "方角によって光の色合いが異なる"
      },
      {
        text: "ガウディがサグラダ・ファミリアの設計で参考にしたものは？",
        choices: [
          "古代エジプトのピラミッド",
          "自然界の植物や動物の形",
          "近代的な工場の煙突",
          "日本の城の天守閣"
        ],
        answer: "自然界の植物や動物の形"
      }
    ]
  },
  {
    id: "pyramids",
    name: "ギザのピラミッド",
    area: "africa",
    image: "images/heritage/giza.webp",
    worldX: 52,
    worldY: 43,
    areaX: 61,
    areaY: 20,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "ギザのピラミッドがある国は？",
        choices: ["モロッコ", "ケニア", "エチオピア", "エジプト",],
        answer: "エジプト"
      },
      {
        text: "ギザの三大ピラミッドの中で最も大きいものは？",
        choices: ["カフラー王のピラミッド", "メンカウラー王のピラミッド", "クフ王のピラミッド", "階段ピラミッド"],
        answer: "クフ王のピラミッド"
      },
      {
        text: "ギザのピラミッドが造られた主な目的は？",
        choices: ["市場", "学校", "王の墓", "競技場"],
        answer: "王の墓"
      }
    ]
  },

  {
    id: "marrakesh",
    name: "マラケシュの旧市街",
    area: "africa",
    image: "images/heritage/marakesyu.webp",
    worldX: 42,
    worldY: 41,
    areaX: 37,
    areaY: 17,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "マラケシュの旧市街にあるジャマエルフナ広場では、どんな光景が見られる？",
        choices: [
          "毎日闘牛が行われる",
          "巨大な氷の彫刻が並ぶ",
          "語り部や音楽家、大道芸人が集まる",
          "船が広場の中央を通る"
        ],
        answer: "語り部や音楽家、大道芸人が集まる"
      },
      {
        text: "マラケシュが「赤い街」と呼ばれる主な理由は？",
        choices: [
          "赤みを帯びた建物や城壁が多いため",
          "街全体が赤い花で覆われているため",
          "昔たくさんの戦争があったため",
          "周辺に赤い湖が広がっているため"
        ],
        answer: "赤みを帯びた建物や城壁が多いため"
      },
      {
        text: "マラケシュの旧市街にある「スーク」とは、どんな場所？",
        choices: [
          "天体を観測する塔",
          "砂漠の地下にある貯水池",
          "王族だけが入れる宮殿",
          "工芸品や香辛料などを売る市場"
        ],
        answer: "工芸品や香辛料などを売る市場"
      }
    ]
  },
  {
    id: "lalibela",
    name: "ラリベラの岩窟教会群",
    area: "africa",
    image: "images/heritage/raribera.webp",
    worldX: 54,
    worldY: 51,
    areaX: 66,
    areaY: 40,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "ラリベラの岩窟教会群は、どの宗教の教会？",
        choices: [
          "イスラム教",
          "キリスト教",
          "仏教",
          "ヒンドゥー教"
        ],
        answer: "キリスト教"
      },
      {
        text: "ラリベラにある聖ギオルギス教会は、どのように造られた？",
        choices: [
          "地面の岩盤を掘り下げた",
          "石を積み上げて建設した",
          "木材を組み合わせて建設した",
          "洞窟の中にレンガを積んだ"
        ],
        answer: "地面の岩盤を掘り下げた"
      },
      {
        text: "聖ギオルギス教会を上から見ると、どんな形をしている？",
        choices: [
          "円",
          "星",
          "三角形",
          "十字架"
        ],
        answer: "十字架"
      },

    ]
  },
  {
    id: "serengeti",
    name: "セレンゲティ国立公園",
    area: "africa",
    image: "images/heritage/serengethi.webp",
    worldX: 53,
    worldY: 59,
    areaX: 63,
    areaY: 56,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "セレンゲティでヌーの大群が毎年大移動する主な理由は？",
        choices: [
          "寒い冬に冬眠するため",
          "乾燥した場所を好むため",
          "ライオンなどから逃げるため",
          "草や水を求めて移動するため",
        ],
        answer: "草や水を求めて移動するため"
      },
      {
        text: "セレンゲティの大移動で、ヌーが川を渡る際に警戒する動物は？",
        choices: [
          "ピラニア",
          "ハゲワシ",
          "ペンギン",
          "ワニ"
        ],
        answer: "ワニ"
      },
      {
        text: "セレンゲティとはマサイ語でどんな意味？",
        choices: [
          "雲より高い山",
          "果てしなく広がる平原",
          "神々の住む森",
          "サンゴ礁が広がる浅い海"
        ],
        answer: "果てしなく広がる平原"
      }
    ]
  },
  {
    id: "victoriaFalls",
    name: "ヴィクトリアの滝",
    area: "africa",
    image: "images/heritage/vikutoria.webp",
    worldX: 51,
    worldY: 67,
    areaX: 57.5,
    areaY: 74,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "ヴィクトリアの滝が現地の言葉で「雷鳴のとどろく水煙」と呼ばれるのはなぜ？",
        choices: [
          "滝の底に火山があるため",
          "毎日雷が滝に落ちるため",
          "大量の水が落ち、大きな音と水煙が発生するため",
          "岩が電気を発生させるため"
        ],
        answer: "大量の水が落ち、大きな音と水煙が発生するため"
      },
      {
        text: "ヴィクトリアの滝の近くで、雨が降っていなくても体が濡れることがあるのはなぜ？",
        choices: [
          "滝から大量の水しぶきが舞い上がるため",
          "地下から温泉が噴き出すため",
          "周囲の植物が水を飛ばすため",
          "年中湿度が高い気候のため"
        ],
        answer: "滝から大量の水しぶきが舞い上がるため"
      },
      {
        text: "ヴィクトリアの滝の横幅は約1700m、落差は約108mだが、一分間に落下する水の量は？",
        choices: [
          "50万リットル",
          "500万リットル",
          "5000万リットル",
          "5億リットル"
        ],
        answer: "5億リットル"
      }
    ]
  },

  {
    id: "canadianRockies",
    name: "カナディアン・ロッキー山脈自然公園群",
    area: "northAmerica",
    image: "images/heritage/canadian.webp",
    worldX: 15,
    worldY: 28,
    areaX: 31,
    areaY: 43,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "カナディアン・ロッキーの宝石と呼ばれるルイーズ湖の色は？",
        choices: [
          "アメジスト色",
          "エメラルド色",
          "ルビー色",
          "サファイア色"
        ],
        answer: "エメラルド色"
      },
      {
        text: "カナディアン・ロッキーで有名な、氷河の浸食作用によって削り残された鋭い山は？",
        choices: [
          "ケスタ",
          "フィヨルド",
          "ホルン",
          "メサ"
        ],
        answer: "ホルン"
      },
      {
        text: "カナディアン・ロッキーの山々に、U字型の谷が多く見られる主な理由は？",
        choices: [
          "巨大な氷河が谷を削ったため",
          "火山が連続して噴火したため",
          "人間が山を掘り進めたため",
          "隕石が谷に沿って落下したため"
        ],
        answer: "巨大な氷河が谷を削ったため"
      }
    ]
  },
  {
    id: "grandCanyon",
    name: "グランド・キャニオン国立公園",
    area: "northAmerica",
    image: "images/heritage/grand.webp",
    worldX: 16.5,
    worldY: 38,
    areaX: 33,
    areaY: 60,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "グランド・キャニオンとは、どんな地形？",
        choices: [
          "高い山",
          "深い谷",
          "活火山",
          "大草原"
        ],
        answer: "深い谷"
      },
      {
        text: "グランド・キャニオンの巨大な峡谷を削った川は？",
        choices: [
          "ミシシッピ川",
          "ナイル川",
          "アマゾン川",
          "コロラド川"
        ],
        answer: "コロラド川"
      },
      {
        text: "グランド・キャニオンにある、がけから張り出した床がガラス張りの展望台の名前は？",
        choices: [
          "ノースリム",
          "サウスリム",
          "スカイウォーク",
          "キャニオンビュー"
        ],
        answer: "スカイウォーク"
      },

    ]
  },
  {
    id: "chichenItza",
    name: "チチェン・イッツァ",
    area: "northAmerica",
    image: "images/heritage/tityen.webp",
    worldX: 22,
    worldY: 47,
    areaX: 46,
    areaY: 78,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "チチェン・イッツァはどの文明の遺跡？",
        choices: [
          "アンデス文明",
          "マヤ文明",
          "インダス文明",
          "メソポタミア文明"
        ],
        answer: "マヤ文明"
      },
      {
        text: "マヤ文明で最高神としてまつられているククルカンとは何の神？",
        choices: [
          "羽をもったサル",
          "羽をもったオオカミ",
          "羽をもったトラ",
          "羽をもったヘビ"
        ],
        answer: "羽をもったヘビ"
      },
      {
        text: "チチェン・イッツァのピラミッドで、年に2回、ヘビが降りてくるように見えるのはなぜ？",
        choices: [
          "儀式でヘビのかぶり物をして踊るため",
          "太陽光によって階段にヘビのような影ができるため",
          "儀式で笛を吹いてヘビを操るため",
          "壁に描かれたヘビの絵が月あかりで浮かび上がるため",
        ],
        answer: "太陽光によって階段にヘビのような影ができるため"
      },
    ]
  },

  {
    id: "statueOfLiberty",
    name: "自由の女神像",
    area: "northAmerica",
    image: "images/heritage/jiyuu.webp",
    worldX: 26,
    worldY: 36,
    areaX: 56,
    areaY: 57,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "自由の女神像がフランスからアメリカへ贈られた理由は？",
        choices: [
          "戦争の賠償金の代わりとして",
          "フランスの国王の墓として",
          "港の灯台を建設するためだけ",
          "アメリカの独立と友好を記念するため",
        ],
        answer: "アメリカの独立と友好を記念するため"
      },
      {
        text: "自由の女神像が緑色である主な理由は？",
        choices: [
          "最初から緑色に塗装されていたため",
          "表面にコケが大量に生えたため",
          "表面の銅が酸化などによって変化したため",
          "緑色の大理石で作られているため"
        ],
        answer: "表面の銅が酸化などによって変化したため"
      },
      {
        text: "自由の女神像が足でふみつけているものは？",
        choices: [
          "壊れた鎖",
          "巨大な地球儀",
          "王冠",
          "船のいかり"
        ],
        answer: "壊れた鎖"
      }
    ]
  },
  {
    id: "machuPicchu",
    name: "マチュ・ピチュ",
    area: "southAmerica",
    image: "images/heritage/matyupityu.webp",
    worldX: 26,
    worldY: 64,
    areaX: 44,
    areaY: 44,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "マチュ・ピチュの石造建築には、どんな特徴がある？",
        choices: [
          "すべて鉄の釘で固定している",
          "石をガラスで接着している",
          "石を精密に組み合わせている",
          "建物全体が木材でできている"
        ],
        answer: "石を精密に組み合わせている"
      },
      {
        text: "マチュ・ピチュにある段々畑には、農業以外にどんな役割があった？",
        choices: [
          "雪を大量にためる",
          "敵の船を監視する",
          "火山の噴火を止める",
          "斜面の土砂崩れを防ぐ",
        ],
        answer: "斜面の土砂崩れを防ぐ"
      },
      {
        text: "マチュ・ピチュを築いたインカ文明で、文字の代わりに情報の記録などに使われたものは？",
        choices: [
          "紙の巻物",
          "結び目をつけたひも",
          "木版印刷",
          "ガラス板"
        ],
        answer: "結び目をつけたひも"
      }
    ]
  },
  {
    id: "nazcaLines",
    name: "ナスカの地上絵",
    area: "southAmerica",
    image: "images/heritage/nasuka.webp",
    worldX: 24,
    worldY: 62,
    areaX: 41,
    areaY: 42,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "ナスカの地上絵は、主にどのようにして描かれた？",
        choices: [
          "巨大な筆で地面に絵の具を塗った",
          "木を植えて模様を作った",
          "地表の暗い石を取り除いて明るい地面を露出させた",
          "地面に金属の板を並べた"
        ],
        answer: "地表の暗い石を取り除いて明るい地面を露出させた"
      },
      {
        text: "ナスカの地上絵が長い間残っている理由の一つは？",
        choices: [
          "雨が非常に少ない乾燥した気候のため",
          "毎年すべて描き直されているため",
          "厚い氷に覆われているため",
          "地面が常に水中にあるため"
        ],
        answer: "雨が非常に少ない乾燥した気候のため"
      },
      {
        text: "ナスカの地上絵が描かれた目的について正しいのは？",
        choices: [
          "飛行機の滑走路として使われている",
          "現代の観光客のために作られた",
          "宗教的な儀式などとの関係が考えられている",
          "目的は完全に解明されている"
        ],
        answer: "宗教的な儀式などとの関係が考えられている"
      }
    ]
  },
  {
    id: "iguazuFalls",
    name: "イグアス国立公園",
    area: "southAmerica",
    image: "images/heritage/iguasu.webp",
    worldX: 30,
    worldY: 73.5,
    areaX: 54,
    areaY: 63,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "イグアスの滝は、どの国とどの国の間にある？",
        choices: [
          "ウルグアイとアルゼンチン",
          "ブラジルとアルゼンチン",
          "ブラジルとウルグアイ",
          "アルゼンチンとチリ"
        ],
        answer: "ブラジルとアルゼンチン"
      },
      {
        text: "イグアスの滝にある「悪魔の喉笛」とは、どんな場所？",
        choices: [
          "地下にある巨大な洞窟",
          "滝の水が温泉になっている場所",
          "大量の水がU字型の峡谷へ流れ落ちる場所",
          "滝の上に造られた古代の神殿"
        ],
        answer: "大量の水がU字型の峡谷へ流れ落ちる場所"
      },
      {
        text: "公園内には様々な野生動物が生息しているが、次のうち作者が一番好きなのは？",
        choices: [
          "ジャガー",
          "オオカワウソ",
          "オウギワシ",
          "オオハシ"
        ],
        answer: "オウギワシ"
      },

    ]
  },
  {
    id: "rapaNui",
    name: "イースター島",
    area: "southAmerica",
    image: "images/heritage/i-suta-.webp",
    worldX: 19,
    worldY: 73,
    areaX: 30,
    areaY: 60,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "イースター島のモアイ像には、地中に埋まっているものもある。埋まっている部分には何がある？",
        choices: [
          "胴体や彫刻された模様",
          "巨大な車輪",
          "金属製のエンジン",
          "地下へ続く階段"
        ],
        answer: "胴体や彫刻された模様"
      },
      {
        text: "モアイ像が作られたことによって起きた問題は？",
        choices: [
          "地球温暖化",
          "森林伐採",
          "人口減少",
          "ヒートアイランド現象"
        ],
        answer: "森林伐採"
      },
      {
        text: "イースター島の名前の由来は？",
        choices: [
          "イースターさんが見つけたから",
          "モアイがすべて東を向いているから",
          "イースターの日に見つけたから",
          "東洋人が見つけたから"
        ],
        answer: "イースターの日に見つけたから"
      }
    ]
  },

  {
    id: "greatBarrierReef",
    name: "グレート・バリア・リーフ",
    area: "oceania",
    image: "images/heritage/great.webp",
    worldX: 85,
    worldY: 69,
    areaX: 62,
    areaY: 52,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "グレート・バリア・リーフがある国は？",
        choices: ["オーストラリア", "ニュージーランド", "フィジー", "インドネシア"],
        answer: "オーストラリア"
      },
      {
        text: "グレート・バリア・リーフは何によってつくられた地形？",
        choices: ["氷河", "火山", "サンゴ礁", "河川"],
        answer: "サンゴ礁"
      },
      {
        text: "サンゴが白くなる「白化現象」の主な原因の一つは？",
        choices: [
          "海水温が高くなりすぎること",
          "魚が増えすぎること",
          "海底の砂が増えること",
          "月の光が強くなること"
        ],
        answer: "海水温が高くなりすぎること"
      },
    ]
  },
  {
    id: "uluru",
    name: "ウルル＝カタ・ジュタ国立公園",
    area: "oceania",
    image: "images/heritage/ururu.webp",
    worldX: 79,
    worldY: 73,
    areaX: 51,
    areaY: 65,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "ウルルが時間帯によって赤やオレンジ色に見える主な理由は？",
        choices: [
          "岩の内部でマグマが流れているため",
          "表面に赤い花が咲いているため",
          "岩が熱によって発光しているため",
          "太陽光の当たり方と岩石に含まれる鉄の酸化物",
        ],
        answer: "太陽光の当たり方と岩石に含まれる鉄の酸化物"
      },
      {
        text: "ウルルの地下部分について正しい説明はどれ？",
        choices: [
          "地面の上に置かれた岩である",
          "地下では海水に浮かんでいる",
          "地表に見える部分より下にも岩体が続いている",
          "内部がすべて空洞になっている",

        ],
        answer: "地表に見える部分より下にも岩体が続いている"
      },
      {
        text: "ウルルで2019年から登山が禁止された主な理由は？",
        choices: [
          "先住民の文化や聖地としての価値を尊重するため",
          "岩が突然消える危険があるため",
          "頂上に空港を建設するため",
          "山全体を人工的に移動させるため"
        ],
        answer: "先住民の文化や聖地としての価値を尊重するため"
      }
    ]
  },
  {
    id: "sydneyOperaHouse",
    name: "シドニー・オペラハウス",
    area: "oceania",
    image: "images/heritage/opera.webp",
    worldX: 84,
    worldY: 78,
    areaX: 61,
    areaY: 74,
    unlocked: false,
    collected: false,
    questions: [
      {
        text: "シドニー・オペラハウスの屋根は、何にたとえられることが多い？",
        choices: [

          "雪山の氷河",
          "巨大な鳥の巣",
          "船の帆や貝殻",
          "砂漠のピラミッド"
        ],
        answer: "船の帆や貝殻"
      },
      {
        text: "オペラハウスの屋根を覆っているものは？",
        choices: [
          "全面を覆う透明なガラス",
          "巨大な一枚の鉄板",
          "白く塗られた木材",
          "100万枚以上のタイル",
        ],
        answer: "100万枚以上のタイル"
      },
      {
        text: "シドニー・オペラハウスの建設について正しいのは？",
        choices: [
          "わずか1週間で完成した",
          "古代ローマ時代に建設された",
          "当初の予定より大幅に工期が延びた",
          "完成するまで設計図が一度も変更されなかった"
        ],
        answer: "当初の予定より大幅に工期が延びた"
      }
    ]
  },
];
//保存状態を復元
loadHeritageUnlocks();
loadHeritageCollected();

//世界遺産調査が押されたら
heritageMissionButton.addEventListener("click", function () {
  audioManager.playSE("click");
  missionSelectScreen.style.display = "none";
  heritageMapScreen.style.display = "block";
  updateEarthMysteryDisplay();
  //地図に点を配置
  showHeritageWorldPoints();
});
//BACKが押されたら
heritageMapBackButton.addEventListener("click", function () {
  audioManager.playSE("click");
  heritageMapScreen.style.display = "none";
  missionSelectScreen.style.display = "block";
});

//世界遺産選択画面
//ボタンを押すと拡大されるようにする
document
  .querySelectorAll(".heritageAreaButton")
  .forEach(function (button) {
    button.addEventListener("click", function () {
      audioManager.playSE("click");
      //クリックされたボタンの地域を取得
      const area = button.dataset.area;
      //その地域をひらく
      openHeritageArea(area);
    });
  });
//拡大地図を表示する
function openHeritageArea(area) {
  const areaData = heritageAreaData[area];
  heritageMapScreen.style.display = "none";
  heritageAreaScreen.style.display = "block";
  // 前回のCOLLECTED表示をリセット
  heritageCollectedMessage.textContent = "";
  heritageCollectedMessage.classList.remove("showCollectedMessage");
  heritageAreaScreen.classList.remove("heritageGoldFlash");
  //その地域の名前を取得
  heritageAreaTitle.textContent = areaData.name;
  //その地域の拡大図を取得
  heritageAreaMapImage.src = areaData.image;
  //点を生成する
  showHeritageAreaPoints(area);
}
//地図上に点を自動生成
function showHeritageWorldPoints() {
  loadHeritageUnlocks();
  //いったん点を全部消す
  heritageWorldPoints.innerHTML = "";
  heritageData.forEach(function (heritage) {
    //ボタンをつくる
    const point = document.createElement("button");
    //点用のクラスをつける
    point.classList.add("heritageWorldPoint");
    //座標を設定
    point.style.left =
      `${heritage.worldX}%`;
    point.style.top =
      `${heritage.worldY}%`;
    //マウスをのせたときの名前
    point.title =
      heritage.name;
    if (heritage.collected) {
      point.classList.add("collected");
    } else if (heritage.unlocked) {
      point.classList.add("unlocked");
    } else {
      point.classList.add("locked");
    }
    //点が押されたらクイズを開始する
    point.addEventListener("click", function () {
      audioManager.playSE("click");
      point.classList.remove("unlockedHighlight");
      heritageUnlockMessage.textContent = "";
      if (heritage.unlocked || heritage.collected) {
        startHeritageQuiz(heritage);
        audioManager.playBGM("quiz");
      } else {
        openHeritageUnlock(heritage);
      }
    });
    //子要素として追加する
    heritageWorldPoints.appendChild(point);
  });
}
//拡大地図上に点を自動生成
function showHeritageAreaPoints(area) {
  //いったん点をリセット
  heritageAreaPoints.innerHTML = "";
  //そのエリアの世界遺産だけ取り出す
  const areaHeritages =
    heritageData.filter(function (heritage) {
      return heritage.area === area;
    });

  areaHeritages.forEach(function (heritage) {
    //ボタンをつくる
    const point =
      document.createElement("button");
    //点用のクラスをつける
    point.classList.add("heritageWorldPoint");
    //IDを取得
    point.dataset.heritageId =
      heritage.id;
    //座標を指定
    point.style.left =
      `${heritage.areaX}%`;
    point.style.top =
      `${heritage.areaY}%`;
    //ボタンの名前を取得
    point.title =
      heritage.name;
    // 世界遺産の状態によってクラスを追加
    if (heritage.collected) {
      // 調査完了：金色
      point.classList.add("collected");

    } else if (heritage.unlocked) {
      // 解放済み：水色
      point.classList.add("unlocked");

    } else {
      // 未解放：白色
      point.classList.add("locked");
    }
    // 点が押されたとき
    point.addEventListener("click", function () {
      point.classList.remove("unlockedHighlight");
      heritageUnlockMessage.textContent = "";
      audioManager.playSE("click");
      if (heritage.unlocked || heritage.collected) {
        // 解放済みならクイズを開始
        startHeritageQuiz(heritage);
        audioManager.playBGM("quiz");
      } else {
        // 未解放なら確認画面を表示
        openHeritageUnlock(heritage);
      }
    });
    //HTMLに子要素として追加
    heritageAreaPoints.appendChild(point);
  });
}
//BACK
heritageBackButton.addEventListener(
  "click",
  function () {
    audioManager.playSE("click");
    heritageAreaScreen.style.display = "none";
    heritageMapScreen.style.display = "block";
    showHeritageWorldPoints();
    heritageCollectedMessage.textContent = "";
  }
);

// 世界遺産の背景に変更
function changeHeritageBackground(heritage) {
  document.body.style.setProperty(
    "--background-image",
    `url("${heritage.image}")`
  );
}

// 地球の背景に戻す
function resetBackground() {
  document.body.style.removeProperty(
    "--background-image"
  );
}

//解放するか画面
function openHeritageUnlock(heritage) {
  if(earthMystery === 0){
    noEarthMysteryGuide.style.display = "block";
  }else{
    noEarthMysteryGuide.style.display = "none";
  }
  const gem = document.querySelector(".unlockGem");
  //消した宝石をもどす
  if (gem) {
    gem.classList.remove("consuming");
  }

  selectedUnlockHeritage = heritage;

  gem.classList.remove("consuming");

  // 前回の粒子を削除
  const particles = document.querySelector(".gemParticles");
  particles.innerHTML = "";

  heritageUnlockName.textContent = heritage.name;

  heritageAreaScreen.style.display = "none";
  heritageMapScreen.style.display = "none";
  heritageUnlockScreen.style.display = "block";

  // 所持数が足りない場合は解放できない
  heritageUnlockButton.disabled = earthMystery < 1;
}
//0個の時地理クイズの地図に行く
goToGeographyQuiz.addEventListener("click", function () {
    audioManager.playSE("click");
    heritageUnlockScreen.style.display = "none";
    mapScreen.style.display = "block";
});
//解放して地図に戻る
heritageUnlockButton.addEventListener("click", async function () {
  if (!selectedUnlockHeritage) {
    return;
  }

  // すでに解放されていたら消費しない
  if (selectedUnlockHeritage.unlocked ||
    selectedUnlockHeritage.collected) {
    return;
  }

  // 地球の神秘を1個消費
  if (!useEarthMystery()) {
    return;
  }
  // 連続クリックを防ぐ
  heritageUnlockButton.disabled = true;
  audioManager.playSE("consume");

  // 地球の神秘が光って消える演出
  await playGemConsumeEffect();

  // 世界遺産を永久解放
  selectedUnlockHeritage.unlocked = true;

  // 解放状態を保存
  saveHeritageUnlocks();
  //拡大マップのポイントを更新
  showHeritageAreaPoints(selectedUnlockHeritage.area);

  // 確認画面を閉じる
  heritageUnlockScreen.style.display = "none";

  // 地図に戻って表示を更新
  openHeritageArea(selectedUnlockHeritage.area);

  //解放したところを光らせる
  showHeritageUnlockEffect(selectedUnlockHeritage.id);


  // ボタンを再び有効化
  heritageUnlockButton.disabled = false;
});

function showHeritageUnlockEffect(heritageId) {
  //ポイントを取得
  const point =
    heritageAreaPoints.querySelector(
      `[data-heritage-id="${heritageId}"]`
    );
  if (!point) {
    return;
  }
  //発光用クラスを追加
  point.classList.add("unlockedHighlight");
  //「世界遺産を開放しました！紫色のポイントをクリックして調査を開始しよう！
  heritageUnlockMessage.textContent = "世界遺産を解放しました！紫色のポイントをクリックして調査を開始しよう！";

}

//キャンセル
heritageUnlockCancelButton.addEventListener("click", function () {
  audioManager.playSE("click");
  heritageUnlockScreen.style.display = "none";

  if (selectedUnlockHeritage) {
    openHeritageArea(selectedUnlockHeritage.area);
  }

  selectedUnlockHeritage = null;
});
//光って消える演出
function playGemConsumeEffect() {
  const gem = document.querySelector(".unlockGem");

  if (!gem) {
    return Promise.resolve();
  }

  gem.classList.remove("consuming");
  void gem.offsetWidth;
  gem.classList.add("consuming");

  return new Promise(function (resolve) {
    gem.addEventListener("animationend", function (event) {
      if (event.target === gem &&
        event.animationName === "consumeGem") {

        // 宝石が消えた瞬間に粒子を飛ばす
        createGemParticles();

        // 粒子が飛び終わるまで待つ
        setTimeout(resolve, 700);
      }
    });
  });
}
//粒子の演出
function createGemParticles() {
  const container = document.querySelector(".gemParticles");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  const particleCount = 30;
  const distance = 100;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");

    particle.classList.add("gemParticle");

    // 紫と水色を交互にする
    if (i % 2 === 0) {
      particle.classList.add("purple");
    } else {
      particle.classList.add("blue");
    }

    // 360度に均等に飛ばす
    const angle = (360 / particleCount) * i;
    const radian = angle * Math.PI / 180;

    const moveX = Math.cos(radian) * distance;
    const moveY = Math.sin(radian) * distance;

    particle.style.setProperty("--moveX", `${moveX}px`);
    particle.style.setProperty("--moveY", `${moveY}px`);

    container.appendChild(particle);
  }
}
//世界遺産クイズ画面

//クイズを始める
function startHeritageQuiz(heritage) {

  currentHeritage = heritage;
  changeHeritageBackground(heritage);

  heritageQuestionIndex = 0;
  heritageScore = 0;
  heritageWrongAnswers = [];
  heritageMapScreen.style.display = "none";
  heritageAreaScreen.style.display = "none";
  heritageQuizScreen.style.display = "block";

  heritageQuizName.textContent =
    heritage.name;
  //問題表示
  showHeritageQuestion();
}
//問題表示
function showHeritageQuestion() {
  //パネルが光らないようにしておく
  heritageQuizScreen.classList.remove("correctFlash");
  const question =
    currentHeritage.questions[
    heritageQuestionIndex
    ];

  heritageQuestionNumber.textContent =
    `QUESTION ${heritageQuestionIndex + 1} / 3`;

  heritageQuestionText.textContent =
    question.text;

  heritageResult.textContent = "";

  heritageNextButton.style.visibility = "hidden";

  heritageChoiceButtons.forEach(
    function (button, index) {

      button.textContent =
        question.choices[index];

      button.disabled = false;

      button.classList.remove(
        "correctButton",
        "incorrectButton"
      );
    }
  );
  heritageSkipButton.disabled = false;
}
//選択肢を押したら判定する
heritageChoiceButtons.forEach(
  function (button, index) {
    button.addEventListener(
      "click",
      function () {
        checkHeritageAnswer(index, button);
        heritageDataCollection();
      }
    );
  }
);
//DATACOLLECTIONを進める
function heritageDataCollection() {
  //何問めまで終わったかを計算
  const progress = ((heritageQuestionIndex + 1) / currentHeritage.questions.length) * 100;
  //ゲージを進める
  heritageProgressFill.style.width = `${progress}%`;
  //光をいったんリセット
  heritageProgressFill.classList.remove("progressFlash");
  progressBar.classList.remove("barFrameFlash");
  //アニメーションをいったんリセット
  void heritageProgressFill.offsetWidth;
  void heritageProgressBar.offsetWidth;
  //光らせる
  heritageProgressFill.classList.add("progressFlash");
  heritageProgressBar.classList.add("barFrameFlash");
  //0.6秒後に光を消す
  setTimeout(function () {
    heritageProgressFill.classList.remove("progressFlash");
    heritageProgressBar.classList.remove("barFrameFlash");
  }, 600);
}
//判定処理
function checkHeritageAnswer(selectedIndex, selectedButton) {
  const question =
    currentHeritage.questions[heritageQuestionIndex];
  const selectedAnswer =
    question.choices[selectedIndex];
  //クラスをリセット
  heritageResult.classList.remove(
    "correct",
    "incorrect"
  );
  //正誤判定
  if (selectedAnswer === question.answer) {
    audioManager.playSE("correct");
    //〇を表示
    heritageResult.innerHTML = `
        <span class="correctMark">〇</span>
        <span class="correctText en quizResult">DATA COLLECTED</span>
    `;
    //パネルを光らせる
    heritageQuizScreen.classList.remove("correctFlash");
    void heritageQuizScreen.offsetWidth;
    heritageQuizScreen.classList.add("correctFlash");
    //正解のエフェクト
    createParticles(heritageParticleArea);
    heritageResult.classList.add("correct");
    selectedButton.classList.add("correctButton");

    heritageScore++;
  } else {
    audioManager.playSE("wrong");
    heritageResult.textContent =
      "× SCAN FAILED";
    heritageResult.classList.add("incorrect");
    selectedButton.classList.add(
      "incorrectButton"
    );
    //REVIEW用に保存
    heritageWrongAnswers.push({
      questionNumber: heritageQuestionIndex + 1,
      question: question.text,
      correctAnswer: question.answer,
      selectedAnswer: selectedAnswer
    });
    // 正解を緑色にする
    heritageChoiceButtons.forEach(
      function (button, index) {
        if (
          question.choices[index] ===
          question.answer
        ) {
          button.classList.add(
            "correctButton"
          );
        }
      }
    );
  }
  heritageFinishQuestion();
}
//スキップが押されたら
heritageSkipButton.addEventListener("click", function () {
  audioManager.playSE("wrong");
  const question =
    currentHeritage.questions[heritageQuestionIndex];
  //クラスをリセット
  heritageResult.classList.remove(
    "correct",
    "incorrect"
  );
  heritageResult.textContent =
    "× SCAN SKIPPED";
  heritageResult.classList.add("incorrect");
  //REVIEW用に保存
  heritageWrongAnswers.push({
    questionNumber: heritageQuestionIndex + 1,
    question: question.text,
    correctAnswer: question.answer,
    selectedAnswer: "SKIPPED"
  });
  // 正解を緑色にする
  heritageChoiceButtons.forEach(
    function (button, index) {
      if (
        question.choices[index] ===
        question.answer
      ) {
        button.classList.add(
          "correctButton"
        );
      }
    }
  );
  heritageDataCollection();
  heritageFinishQuestion();
});

//問題を終了状態にする関数
function heritageFinishQuestion() {
  // NEXTを表示
  heritageNextButton.style.visibility = "visible";
  heritageNextButton.disabled = false;
  // 選択肢を押せなくする
  heritageChoiceButtons.forEach(function (button) {
    button.disabled = true;
  });
  // SKIPも押せなくする
  heritageSkipButton.disabled = true;
}
//NEXT
heritageNextButton.addEventListener(
  "click",
  function () {
    audioManager.playSE("click");
    heritageQuestionIndex++;
    if (
      heritageQuestionIndex <
      currentHeritage.questions.length
    ) {
      showHeritageQuestion();
    } else {
      heritageStartAnalysis();

    }
  }
);
//ANALYZING
function heritageStartAnalysis() {
  //クイズ画面を非表示
  heritageQuizScreen.style.display = "none";
  //ロード画面表示
  heritageAnalyzingScreen.style.display = "block";
  audioManager.playSE("analyzing");
  //ロードの進み具合を表す変数
  let analysisProgress = 0;
  //初期化
  heritageAnalysisFill.style.width = "0%";
  heritageAnalysisPercent.textContent = "0%";
  //10ずつ増やすのを繰り返す
  const analysisTimer = setInterval(function () {
    //進捗を10増やす
    analysisProgress += 10;
    //分析ゲージの横幅も増やす
    heritageAnalysisFill.style.width = `${analysisProgress}%`;
    //文字も増やす
    heritageAnalysisPercent.textContent = `${analysisProgress}%`;
    //100を超えたら
    if (analysisProgress >= 100) {
      //繰り返しを停止
      clearInterval(analysisTimer);
      //光らせる
      heritageAnalysisFill.classList.add("progressFlash");
      heritageAnalysisBar.classList.add("barFrameFlash");
      audioManager.stopSE("analyzing");
      audioManager.playSE("analyzingfinish");
      //％だったところを文字に変える
      heritageAnalysisPercent.textContent = "ANALYSIS COMPLETE";
      //1000たったら、初期化して結果画面表示
      setTimeout(function () {
        //初期化
        heritageAnalysisFill.classList.remove("progressFlash");
        heritageAnalysisBar.classList.remove("barFrameFlash");
        //ロード画面非表示
        heritageAnalyzingScreen.style.display = "none";
        //結果画面表示
        finishHeritageQuiz();
        audioManager.playBGM("title");
      }, 1000);
    }
  }, 200);
}
//結果画面を出す
function finishHeritageQuiz() {
  heritageAnalyzingScreen.style.display = "none";
  heritageResultScreen.style.display = "block";
  heritageReturnButton.classList.remove("heritageReturnGlow");
  heritageMissionResult();
  //スコア表示
  heritageScoreText.textContent =
    `SCORE ${heritageScore}/${currentHeritage.questions.length}`;

  showHeritageStars();

  showHeritageReview();
}

//調査成功か失敗か
function heritageMissionResult() {
  if (heritageScore === currentHeritage.questions.length) {
    heritageMissionMessage.textContent = "調査に成功しました！";
    //文字を緑にするクラスをつける
    heritageMissionMessage.className = "neonGreen jp";
    audioManager.playSE("success");
    //RETURN TO MAPを光らせる
    heritageReturnButton.classList.add("heritageReturnGlow");
  } else {
    heritageMissionMessage.textContent = "調査に失敗しました...";
    //文字を赤くするクラスをつける
    heritageMissionMessage.className = "neonRed jp";
  }
}
//☆を表示する
function showHeritageStars() {
  //☆を初期化・場所をあけておく
  heritageStarRating.innerHTML = "";
  heritageStarRating.innerHTML = `
        <span class="star">☆</span>
        <span class="star">☆</span>
        <span class="star">☆</span>
    `;
  const stars =
    heritageStarRating.querySelectorAll(".star");
  for (let i = 0; i < heritageScore; i++) {
    setTimeout(function () {
      stars[i].textContent = "★";
      stars[i].classList.add(
        "starEarned"
      );
    }, i * 400);
  }
}
//REVIEWを表示する
function showHeritageReview() {
  heritageWrongAnswerList.innerHTML = "";
  if (heritageWrongAnswers.length === 0) {
    heritageReviewArea.style.display = "none";
    return;
  }
  heritageReviewArea.style.display = "block";
  heritageWrongAnswers.forEach(
    function (item) {
      heritageWrongAnswerList.innerHTML += `
                <div class="reviewItem">
                    <p class="reviewNumber en">
                        QUESTION ${item.questionNumber}
                    </p>
                    <p class="reviewQuestion jp">
                        ${item.question}
                    </p>
                
                    <p class="reviewCorrect jp">
                        〇 ${item.correctAnswer}
                    </p>
                    <p class="reviewWrong jp">
                        × ${item.selectedAnswer}
                    </p>
                </div>
            `;
    }
  );
}
//地図に戻る
heritageReturnButton.addEventListener(
  "click",
  function () {
    audioManager.playSE("click");
    // 地球の背景に戻す
    resetBackground();
    heritageResultScreen.style.display =
      "none";
    heritageProgressFill.style.width = "0%";
    heritageAreaScreen.classList.remove("heritageGoldFlash");
    // 拡大地図を開く
    openHeritageArea(
      currentHeritage.area
    );
    // 3問全問正解しているか
    if (
      heritageScore ===
      currentHeritage.questions.length
    ) {
      // 初回獲得の場合
      if (!currentHeritage.collected) {
        // 調査完了状態を更新・保存
        currentHeritage.collected = true;
        openHeritageArea(currentHeritage.area);
        // 紫色のポイントに対して演出を開始
        playHeritageCollectEffect(currentHeritage.id);
        setTimeout(function () {
          audioManager.playSE("collect");
        }, 500);
        saveHeritageCollected();
      }
    }
  }
);
//エフェクト再生
function playHeritageCollectEffect(heritageId) {
  const point =
    heritageAreaPoints.querySelector(
      `[data-heritage-id="${heritageId}"]`
    );
  if (!point) {
    return;
  }
  // 一度金色を外して紫に戻す
  point.classList.remove("collected");
  point.classList.add("unlocked");
  heritageCollectedMessage.textContent = "";
  heritageCollectedMessage.classList.remove(
    "showCollectedMessage"
  );
  //紫の状態を少し見せる
  setTimeout(function () {
    point.classList.remove("unlocked");
    // 金色になる
    point.classList.add("collected");
    // 獲得時専用アニメーション
    point.classList.add(
      "heritageCollectedEffect"
    );
    // COLLECTED! を表示
    heritageCollectedMessage.textContent =
      "COLLECTED!";
    //COLLECTEDを光らせる
    heritageCollectedMessage.classList.add(
      "showCollectedMessage"
    );
    //パネルを光らせる
    heritageAreaScreen.classList.remove("heritageGoldFlash");
    void heritageAreaScreen.offsetWidth;
    heritageAreaScreen.classList.add("heritageGoldFlash");
  }, 700);
}

// 世界遺産の解放状態を保存
function saveHeritageUnlocks() {
  const unlockedIds = heritageData
    .filter(heritage => heritage.unlocked)
    .map(heritage => heritage.id);

  localStorage.setItem(
    "heritageUnlocks",
    JSON.stringify(unlockedIds)
  );
}

// 保存された解放状態を読み込む
function loadHeritageUnlocks() {
  const unlockedIds = JSON.parse(
    localStorage.getItem("heritageUnlocks") || "[]"
  );

  heritageData.forEach(function (heritage) {
    heritage.unlocked =
      unlockedIds.includes(heritage.id);
  });
}
// 世界遺産の調査完了状態を保存
function saveHeritageCollected() {
  const collectedIds = heritageData
    .filter(heritage => heritage.collected)
    .map(heritage => heritage.id);

  localStorage.setItem(
    "heritageCollected",
    JSON.stringify(collectedIds)
  );
}
// 保存された調査完了状態を読み込む
function loadHeritageCollected() {
  const collectedIds = JSON.parse(
    localStorage.getItem("heritageCollected") || "[]"
  );

  heritageData.forEach(function (heritage) {
    heritage.collected =
      collectedIds.includes(heritage.id);

    // 調査完了済みなら解放済みにする
    if (heritage.collected) {
      heritage.unlocked = true;
    }
  });
}
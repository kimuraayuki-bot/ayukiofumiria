import type { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  profile: {
    name: "Ayuki of Umiria",
    handle: "@ayukiofumiria",
    roleJa: "Engineering / Robotics / Education / Music",
    missionJa: "宇宙を愛する探究心を軸に、技術と創作を横断して価値を届ける。",
    currentStatus: ["2026年度 似鳥国際奨学財団 IT人材奨学生"],
    academyUrl: "https://umiria-academy.com",
    avatarSrc: "/images/profile-icon.png",
  },
  socialLinks: [
    {
      label: "X (Twitter)",
      url: "https://twitter.com/ayukiofumiria",
      type: "social",
      priority: 1,
    },
    {
      label: "YouTube",
      url: "https://www.youtube.com/channel/UCJv7tvwyDMEOIujeu2_yDuQ",
      type: "social",
      priority: 2,
    },
    {
      label: "Facebook",
      url: "https://www.facebook.com/share/p/1asL3s6c4A/?mibextid=wwXIfr",
      type: "social",
      priority: 3,
    },
    {
      label: "運営サイト：ウミリア学院",
      url: "https://umiria-academy.com",
      type: "portfolio",
      priority: 4,
    },
  ],
  mediaLinks: [
    {
      label: "神戸新聞（2021）",
      url: "https://www.kobe-np.co.jp/news/hanshin/202105/0014335987.shtml",
      type: "article",
      priority: 1,
      previewImage:
        "https://prd.storage.lit.link/images/creators/7421acde-d2a8-4cf5-a04b-0002d3c702a9/profile_links/buttons/43aa99b5-af04-4f0e-887d-89d237997a47.png",
    },
    {
      label: "神戸新聞（2022）",
      url: "https://www.kobe-np.co.jp/news/hanshin/202212/0015922379.shtml",
      type: "article",
      priority: 2,
      previewImage:
        "https://prd.storage.lit.link/images/creators/7421acde-d2a8-4cf5-a04b-0002d3c702a9/profile_links/buttons/d863ed2b-9632-422a-b631-d59c71479168.png",
    },
    {
      label: "Key Site（2025）",
      url: "https://kiyo-keysite.com/news/w2O3Oich",
      type: "article",
      priority: 3,
      previewImage:
        "https://prd.storage.lit.link/images/creators/7421acde-d2a8-4cf5-a04b-0002d3c702a9/profile_links/buttons/e35aeb07-1d20-4514-9619-5b1912d93b11.png",
    },
    {
      label: "和歌山大学 広報（2026）",
      url: "https://www.facebook.com/story.php?story_fbid=1528433572620888&id=100063627788637&mibextid=wwXIfr&rdid=lJWZGDAPaxzCYMMj#",
      type: "article",
      priority: 4,
      previewImage:
        "https://prd.storage.lit.link/images/creators/7421acde-d2a8-4cf5-a04b-0002d3c702a9/profile_links/buttons/3964d51f-248f-462f-96e6-3c195cd2f4a2.png",
    },
  ],
  sections: [
    {
      id: "engineering",
      accent: "Orbit",
      titleJa: "Engineering / Robotics",
      summaryJa:
        "ロボカップジュニアのアジア大会2連覇・世界大会受賞、レスキューロボットコンテスト受賞、学会発表など、実機と理論を往復する技術実績。",
      bodyJa: [
        "シフト管理や在庫管理など業務効率化システムを業務委託にて開発。",
        "ロボカップジュニア アジア大会2連覇、世界大会受賞（simulation部門）。",
        "レスキューロボットコンテスト本選出場・受賞（2年連続）。",
        "ロボット学会・計測自動制御学会での発表経験。",
        "電装・プログラミングの両軸で実装と検証を担当。",
      ],
      tags: ["Robotics", "Embedded", "Programming", "Research"],
    },
    {
      id: "education",
      accent: "Signal",
      titleJa: "Education",
      summaryJa: "ロボット教育と理工系進学支援をテーマにした取り組み。",
      bodyJa: [
        "ロボット教育をテーマにし、起業体験イベント Startup Weekend と学内ビジネスコンテストで優勝。",
        "理学部物理学科への大学編入・大学院進学をサポートするサイト、ウミリア学院を創設。",
        "現在、大学学部課程に在籍し、電子物理工学を専攻。量子化学研究室に所属。",
        "現在は素粒子実験分野に関心を広げ、学びを継続中。",
        "2026年度 似鳥国際奨学財団 IT人材奨学生。",
      ],
      tags: ["Education", "Startup", "Physics", "Academy"],
    },
    {
      id: "music",
      accent: "Spectrum",
      titleJa: "Music / Media",
      summaryJa:
        "GarageBandを中心に作曲。自治体PR動画や企業TikTokへの採用実績があり、技術活動と表現活動を接続。",
      bodyJa: [
        "GarageBandによる作曲制作。",
        "市PR動画・企業TikTokでの楽曲使用実績。",
        "軽音楽部ではキーボードを担当。",
      ],
      tags: ["Composition", "Media", "Creative", "Sound"],
    },
    {
      id: "skills",
      accent: "Vector",
      titleJa: "Skills / Certifications",
      summaryJa: "技術・制作、修了・語学、資格を整理して掲載。",
      bodyJa: [
        "技術・制作",
        "Webアプリ・サービス開発",
        "システム開発",
        "HP制作",
        "Python / C言語",
        "電子工作（Arduino / micro:bit / Raspberry Pi）",
        "3Dモデリング",
        "楽曲制作（GarageBand）",
        "修了・語学",
        "東京大学 GCI Winter 2024 修了",
        "TOEIC L&R 855",
        "資格",
        "日商簿記3級",
        "普通自動車免許",
        "高校在学中に取得",
        "第三種電気主任技術者（合格率8.3%）",
        "第一種電気工事士（筆記・実技試験合格）",
        "第二種電気工事士",
        "ITパスポート",
        "工事担任者（アナログ／デジタル）",
        "乙種消防設備士7類",
        "第二級陸上・海上特殊無線技士",
        "2級電気工事施工管理技士補",
      ],
      tags: ["Web", "業務効率化", "資格", "電気・通信"],
      initiallyCollapsed: true,
    },
    {
      id: "umiria",
      accent: "Cosmos",
      titleJa: "Umiriaという名に込めた想い",
      summaryJa:
        "『宇宙創造の一瞬をつくる』の献辞「宇宙を愛するミリアムへ」に着想を得た概念名。探究心と創作の原点を示す。",
      bodyJa: [
        "Umiriaは、宇宙への愛と探究の姿勢を活動概念として再構築した言葉。",
        "Ayuki of Umiriaという名は、思索と実装を往復し続ける姿勢の象徴。",
      ],
      tags: ["Philosophy", "Brand", "Universe"],
      initiallyCollapsed: true,
    },
  ],
  gallery: [
    {
      imageSrc: "/images/robocup-asia.jpg",
      title: "ロボカップジュニア アジアパシフィック 2021",
      caption: "Simulation部門での成果。",
    },
    {
      imageSrc: "/images/rescue-robot-2024.jpg",
      title: "レスキューロボットコンテスト 2024",
      caption: "電装・プログラミングを担当。",
    },
    {
      imageSrc: "/images/cansat.jpg",
      title: "小型模擬人工衛星『缶サット』",
      caption: "宇宙工学への関心を形にしたプロトタイプ。",
    },
  ],
  youtubeEmbeds: [
    { id: "music-1", title: "幽玄世界の魔女", videoId: "LRezUM1cf1g" },
    { id: "music-2", title: "理想の夢", videoId: "etiK0pOM7o8" },
    { id: "music-3", title: "Re:spell!!", videoId: "6_kUogZcP-E" },
  ],
  contactEmail: "ayukiofumiria@gmail.com",
  updatedAt: "2026-02-14",
};

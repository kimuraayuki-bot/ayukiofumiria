import type { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  profile: {
    name: "Ayuki of Umiria",
    handle: "@ayukiofumiria",
    roleJa: "Engineering / Robotics / Education / Music",
    roleEn: "Engineering, Robotics, Education, and Music",
    missionJa:
      "宇宙を愛する探究心を軸に、技術と創作を横断して価値を届ける。物理学的な視点で、複雑な課題を美しく実装する。",
    missionEn:
      "Driven by a love for the universe, I bridge engineering and creativity to solve complex problems with a physics mindset.",
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
      label: "Facebook Story",
      url: "https://www.facebook.com/story.php?story_fbid=1528433572620888&id=100063627788637&mibextid=wwXIfr&rdid=lJWZGDAPaxzCYMMj#",
      type: "social",
      priority: 4,
    },
  ],
  mediaLinks: [
    {
      label: "神戸新聞（2021）",
      url: "https://www.kobe-np.co.jp/news/hanshin/202105/0014335987.shtml",
      type: "article",
      priority: 1,
    },
    {
      label: "神戸新聞（2022）",
      url: "https://www.kobe-np.co.jp/news/hanshin/202212/0015922379.shtml",
      type: "article",
      priority: 2,
    },
    {
      label: "和歌山大学（掲載）",
      url: "https://x.gd/FYkOe",
      type: "article",
      priority: 3,
    },
    {
      label: "News / Kiyo Keysite",
      url: "https://kiyo-keysite.com/news/w2O3Oich",
      type: "article",
      priority: 4,
    },
    {
      label: "Facebook掲載投稿",
      url: "https://www.facebook.com/story.php?story_fbid=1528433572620888&id=100063627788637&mibextid=wwXIfr&rdid=lJWZGDAPaxzCYMMj#",
      type: "article",
      priority: 5,
    },
  ],
  sections: [
    {
      id: "engineering",
      accent: "Orbit",
      titleJa: "Engineering / Robotics",
      titleEn: "Engineering / Robotics",
      summaryJa:
        "ロボカップジュニアのアジア大会2連覇・世界大会受賞、レスキューロボットコンテスト受賞、学会発表など、実機と理論を往復する技術実績。",
      summaryEn:
        "Hands-on engineering track record including RoboCup Junior Asia wins, world-level awards, rescue robotics awards, and conference presentations.",
      bodyJa: [
        "ロボカップジュニア アジア大会2連覇、世界大会受賞（simulation部門）。",
        "レスキューロボットコンテスト本選出場・受賞（2年連続）。",
        "ロボット学会・計測自動制御学会での発表経験。",
        "大学では電装・プログラミングの両軸で実装と検証を担当。",
      ],
      bodyEn: [
        "Two consecutive wins in RoboCup Junior Asia and an award at the world stage (simulation division).",
        "Finalist and awarded in the Rescue Robot Contest for two consecutive years.",
        "Presented at robotics and control-related academic conferences.",
      ],
      tags: ["Robotics", "Embedded", "Programming", "Research"],
    },
    {
      id: "education",
      accent: "Signal",
      titleJa: "Education",
      titleEn: "Education",
      summaryJa:
        "個人事業としてプログラミング教室を立ち上げ、教材開発からワークショップ運営まで一気通貫で実施。",
      summaryEn:
        "Founded and operated a programming school, covering curriculum design, hardware teaching materials, and workshop operations.",
      bodyJa: [
        "プログラミング教室の立ち上げと運営（個人事業主）。",
        "オリジナル電子工作教材の開発。",
        "電子工作・プログラミング・作曲体験イベントの開催。",
      ],
      bodyEn: [
        "Launched and managed a private programming school.",
        "Developed original electronics kits and teaching resources.",
      ],
      tags: ["Teaching", "Curriculum", "Workshop", "Hardware"],
    },
    {
      id: "music",
      accent: "Spectrum",
      titleJa: "Music / Media",
      titleEn: "Music / Media",
      summaryJa:
        "GarageBandを中心に作曲。自治体PR動画や企業TikTokへの採用実績があり、技術活動と表現活動を接続。",
      summaryEn:
        "Composes with GarageBand, with tracks used in city PR media and corporate TikTok content.",
      bodyJa: [
        "GarageBandによる作曲制作。",
        "市PR動画・企業TikTokでの楽曲使用実績。",
        "軽音楽部ではキーボードを担当。",
      ],
      bodyEn: [
        "Produces original music in GarageBand.",
        "Tracks adopted for PR videos and short-form social content.",
      ],
      tags: ["Composition", "Media", "Creative", "Sound"],
    },
    {
      id: "skills",
      accent: "Vector",
      titleJa: "Skills / Certifications",
      titleEn: "Skills / Certifications",
      summaryJa:
        "Web開発、組込み、3D、制作に加え、電気・通信系国家資格を多数保有。技術基盤の広さと実務適性を担保。",
      summaryEn:
        "A broad practical base across web, embedded systems, and certified electrical/telecom competencies.",
      bodyJa: [
        "Webアプリ開発（Google Apps Script / Gemini API 等）、Python、C言語。",
        "Arduino / micro:bit / Raspberry Pi を用いた電子工作。",
        "東京大学 GCI Winter 2024 修了、TOEIC L&R 855。",
        "第三種電気主任技術者、第一種電気工事士（筆記・実技）ほか多数資格を取得。",
      ],
      bodyEn: [
        "Develops web apps with GAS and API integrations, plus Python/C development.",
        "Experienced with Arduino, micro:bit, and Raspberry Pi prototyping.",
        "Completed UTokyo GCI Winter 2024 and scored TOEIC L&R 855.",
      ],
      tags: ["Web", "GAS", "Python", "C", "Electrical Licenses"],
      initiallyCollapsed: true,
    },
    {
      id: "umiria",
      accent: "Cosmos",
      titleJa: "Umiriaという名に込めた想い",
      titleEn: "Meaning of the Name Umiria",
      summaryJa:
        "『宇宙創造の一瞬をつくる』の献辞「宇宙を愛するミリアムへ」に着想を得た概念名。探究心と創作の原点を示す。",
      summaryEn:
        "A coined name inspired by a dedication to 'Miriam who loves the universe,' expressing a continuous drive for inquiry and creation.",
      bodyJa: [
        "Umiriaは、宇宙への愛と探究の姿勢を活動概念として再構築した言葉。",
        "Ayuki of Umiriaという名は、思索と実装を往復し続ける姿勢の象徴。",
      ],
      bodyEn: [
        "Umiria symbolizes the intersection of curiosity, creation, and technical execution.",
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
  contactEmail: "ayukiofumiria@gmail.com",
  updatedAt: "2026-02-14",
};

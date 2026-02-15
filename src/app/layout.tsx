import type { Metadata } from "next";
import { Noto_Sans_JP, Orbitron } from "next/font/google";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ayukiofumiria.vercel.app"),
  title: {
    default: "Ayuki of Umiria | ポートフォリオ",
    template: "%s | Ayuki of Umiria",
  },
  description:
    "宇宙を愛する探究心を軸に、工学・ロボティクス・教育・音楽を横断する Ayuki of Umiria のポートフォリオサイト。",
  keywords: [
    "Ayuki of Umiria",
    "ポートフォリオ",
    "ロボティクス",
    "電子工作",
    "Webアプリ開発",
    "教育",
    "GarageBand",
    "ウミリア学院",
  ],
  alternates: {
    canonical: "/",
  },
  category: "technology",
  referrer: "origin-when-cross-origin",
  creator: "Ayuki of Umiria",
  publisher: "Ayuki of Umiria",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Ayuki of Umiria | ポートフォリオ",
    description: "工学・ロボティクス・教育・音楽の活動をまとめた Ayuki of Umiria のポートフォリオ。",
    url: "https://ayukiofumiria.vercel.app/",
    siteName: "Ayuki of Umiria",
    locale: "ja_JP",
    images: ["/images/ogp-space.svg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayuki of Umiria | ポートフォリオ",
    description: "工学・ロボティクス・教育・音楽の活動をまとめた Ayuki of Umiria のポートフォリオ。",
    creator: "@ayukiofumiria",
    images: ["/images/ogp-space.svg"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJp.variable} ${orbitron.variable} antialiased`}>{children}</body>
    </html>
  );
}

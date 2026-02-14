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
  title: "Ayuki of Umiria | Portfolio",
  description:
    "宇宙と物理学の視点で技術と創作を横断する、Ayuki of Umiria のポートフォリオサイト。",
  openGraph: {
    title: "Ayuki of Umiria | Portfolio",
    description:
      "Engineering, Robotics, Education, and Music activities by Ayuki of Umiria.",
    images: ["/images/ogp-space.svg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayuki of Umiria | Portfolio",
    description:
      "Engineering, Robotics, Education, and Music activities by Ayuki of Umiria.",
    images: ["/images/ogp-space.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJp.variable} ${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

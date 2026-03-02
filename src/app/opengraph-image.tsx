import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Ayuki of Umiria portfolio";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

async function getProfileIcon() {
  const file = await readFile(join(process.cwd(), "public", "images", "profile-icon.png"));
  return `data:image/png;base64,${file.toString("base64")}`;
}

export default async function Image() {
  const profileIcon = await getProfileIcon();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 18% 12%, #15294f 0%, transparent 42%), radial-gradient(circle at 84% 5%, #1d335e 0%, transparent 38%), linear-gradient(180deg, #040914 0%, #070d1f 52%, #040814 100%)",
          color: "#e7ecff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 25% 22%, rgba(255, 255, 255, 0.28) 0 1px, transparent 1px), radial-gradient(circle at 79% 19%, rgba(255, 255, 255, 0.2) 0 1px, transparent 1px), radial-gradient(circle at 12% 88%, rgba(255, 255, 255, 0.2) 0 1px, transparent 1px), radial-gradient(circle at 63% 76%, rgba(255, 255, 255, 0.2) 0 1px, transparent 1px), radial-gradient(circle at 36% 58%, rgba(255, 255, 255, 0.18) 0 1px, transparent 1px)",
            backgroundSize: "210px 210px",
            opacity: 0.48,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "56px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                color: "#9dd9ff",
                fontSize: 24,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 1,
                  background: "rgba(157, 217, 255, 0.75)",
                }}
              />
              Portfolio
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 68,
                fontWeight: 700,
                lineHeight: 1.08,
              }}
            >
              Ayuki of Umiria
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 18,
                maxWidth: 700,
                fontSize: 28,
                lineHeight: 1.45,
                color: "#d9e3ff",
              }}
            >
              Engineering / Education / Creative
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 16,
                maxWidth: 760,
                fontSize: 24,
                lineHeight: 1.5,
                color: "#a8b7df",
              }}
            >
              技術と創作を横断し、事業を形にするエンジニア。
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 280,
              height: 360,
              border: "1px solid rgba(157, 180, 255, 0.45)",
              borderRadius: 36,
              background: "rgba(6, 12, 30, 0.78)",
              boxShadow: "0 0 0 10px rgba(157, 217, 255, 0.06)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profileIcon}
              width="180"
              height="180"
              alt=""
              style={{
                borderRadius: "999px",
                border: "2px solid rgba(157, 217, 255, 0.7)",
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 22,
                color: "#9dd9ff",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              @ayukiofumiria
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

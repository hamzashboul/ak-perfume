import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AK Perfumes — Define Yourself";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Gold gradient background */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,169,110,0.15) 0%, transparent 70%)",
          display: "flex",
        }}/>

        {/* Lines */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: "8%", width: 1, background: "rgba(201,169,110,0.1)", display: "flex" }}/>
        <div style={{ position: "absolute", top: 0, bottom: 0, right: "8%", width: 1, background: "rgba(201,169,110,0.1)", display: "flex" }}/>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, position: "relative", zIndex: 1 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: "serif", fontSize: 72, fontWeight: 400, color: "#F8F6F2", letterSpacing: "0.1em" }}>AK</span>
            <span style={{ color: "#C9A96E", fontSize: 32 }}>✦</span>
            <span style={{ fontFamily: "serif", fontSize: 72, fontWeight: 400, color: "#F8F6F2", letterSpacing: "0.1em" }}>PERFUMES</span>
          </div>

          {/* Divider */}
          <div style={{ width: 300, height: 1, background: "rgba(201,169,110,0.4)", display: "flex" }}/>

          {/* Tagline */}
          <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: "0.3em", color: "#C9A96E", textTransform: "uppercase", display: "flex" }}>
            DEFINE YOURSELF
          </div>

          {/* Description */}
          <div style={{ fontSize: 20, fontWeight: 300, color: "rgba(248,246,242,0.5)", marginTop: 8, display: "flex" }}>
            روائح فاخرة · عطور أردنية أصيلة
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
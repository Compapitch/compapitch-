import { ImageResponse } from "next/og";
import { getTutorial } from "@/lib/tutoriales";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const tutorial = getTutorial(params.slug);
  const title = tutorial?.title ?? "El Compapitch";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#101010",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#DCE3EC",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Tutorial gratis · El Compapitch
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 26, color: "#8B8F95" }}>compapitch.com</div>
      </div>
    ),
    { ...size }
  );
}

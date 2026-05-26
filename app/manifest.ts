import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CodeSharePro — Instant Code & Text Sharing",
    short_name: "CodeSharePro",
    description:
      "Share code snippets, configs, and text instantly with a 6-character code. No signup required.",
    start_url: "/",
    display: "standalone",
    background_color: "#06080c",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

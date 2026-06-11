// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://sulavyatra.com",
  integrations: [sitemap()],
  devToolbar: {
    enabled: false,
  },
  vite: {
    server: {
      allowedHosts: ["sulavyatra.com", "www.sulavyatra.com"],
    },
  },
});

// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://staging.sulavyatra.com",
  integrations: [sitemap()],
  devToolbar: {
    enabled: false,
  },
});

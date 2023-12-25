import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		react(),
		viteTsconfigPaths(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: [
				"favicon.png",
				"robots.txt",
				"apple-touch-icon.png",
				"icons/*.svg",
				"fonts/*.woff2"
			],
			manifest: {
				theme_color: "#00060c",
				icons: [
					{
						src: "/android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any maskable"
					},
					{
						src: "/android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png"
					}
				]
			}
		})
	],
	server: {
		port: 4000
	}
});

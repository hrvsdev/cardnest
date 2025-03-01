import { Config } from "tailwindcss";

import { TH_BLACK, TH_BLUE, TH_DARK_BLUE, TH_DARKER_BLUE, TH_GREEN, TH_RED, TH_SKY, TH_WHITE, TH_YELLOW } from "./src/theme";

const config: Config = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				xs: "375px"
			},
			spacing: {
				0.25: "0.0625rem",
				1.25: "0.3125rem",
				12.5: "3.125rem",
				13: "3.25rem",
				18: "4.5rem",
				"app-container": "27rem"
			},
			opacity: {
				"07": "0.07"
			},
			fontFamily: {
				card: ["Manrope", "sans-serif"]
			},
			borderRadius: {
				"1.5lg": "0.625rem",
				"1.5xl": "0.875rem"
			},
			fontSize: {
				heading: ["1.75rem", "2.125rem"],
				md: ["1.0625rem", "1.375rem"],
				"2xs": ["0.625rem", "0.75rem"]
			},
			aspectRatio: {
				"payment-card": "1.586"
			},
			colors: {
				"th-black": TH_BLACK,
				"th-darker-blue": TH_DARKER_BLUE,
				"th-dark-blue": TH_DARK_BLUE,
				"th-blue": TH_BLUE,
				"th-green": TH_GREEN,
				"th-yellow": TH_YELLOW,
				"th-red": TH_RED,
				"th-sky": TH_SKY,
				"th-white": TH_WHITE
			},
			scale: {
				98: ".98"
			},
			backdropBlur: {
				xs: "2px"
			}
		}
	},
	plugins: []
};

export default config;

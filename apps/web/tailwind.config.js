/** @type {import("tailwindcss").Config} */
export default {
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
			fontFamily: {
				card: ["Manrope", "sans-serif"]
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
				"th-black": "#00060c",
				"th-darker-blue": "#001528",
				"th-dark-blue": "#00203F",
				"th-blue": "#003a72",
				"th-sky": "#3fa1ff",
				"th-green": "#ADEFD1",
				"th-red": "#f31260",
				"th-white": "#F4F7FB"
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

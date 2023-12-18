/** @type {import("tailwindcss").Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				xs: "375px",
			},
			colors: {
				"th-bg": "#00203F",
				"th-primary": "#ADEFD1",
				"th-light": "#F4F7FB",
			},
			height: {
				"rs-screen": "100dvh",
			},
			maxHeight: {
				"rs-screen": "100dvh",
			},
		},
	},
	plugins: [],
};

/** @type {import("tailwindcss").Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				xs: "375px",
			},
			colors: {
				"th-dark-blue": "#00203F",
				"th-green": "#ADEFD1",
				"th-white": "#F4F7FB",
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

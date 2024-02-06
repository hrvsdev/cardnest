/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"th-black": "#00060c",
				"th-darker-blue": "#001528",
				"th-dark-blue": "#00203F",
				"th-blue": "#003a72",
				"th-sky": "#3fa1ff",
				"th-green": "#ADEFD1",
				"th-red": "#f31260",

				"th-white": {
					DEFAULT: "#F4F7FB",
					5: "#F4F7FB0D",
					10: "#F4F7FB19",
					15: "#F4F7FB26",
					20: "#F4F7FB33",
					30: "#F4F7FB4D",
					40: "#F4F7FB66",
					50: "#F4F7FB7F",
					60: "#F4F7FB99",
					70: "#F4F7FBB2",
					75: "#F4F7FBBF",
					80: "#F4F7FBCC",
					85: "#F4F7FBD9",
					90: "#F4F7FBE6",
				}
			}
		}
	},
	plugins: []
};

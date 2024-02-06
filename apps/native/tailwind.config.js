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
				"th-white": "#F4F7FB"
			}
		}
	},
	plugins: []
};

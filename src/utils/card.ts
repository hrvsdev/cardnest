import { CardColor } from "@t/card";

export const cardColorClassName: Record<CardColor, string> = {
	sky: "from-sky-500 to-sky-700",
	pink: "from-pink-500 to-pink-700",
	red: "from-red-500 to-red-700",
	cyan: "from-cyan-500 to-cyan-700",
	yellow: "from-yellow-500 to-yellow-700",
	blue: "from-blue-500 to-blue-700",
	green: "from-green-500 to-green-700",
	emerald: "from-emerald-500 to-emerald-700",
	fuchsia: "from-fuchsia-500 to-fuchsia-700",
	purple: "from-purple-500 to-purple-700",
	violet: "from-violet-500 to-violet-700",
	indigo: "from-indigo-500 to-indigo-700",
	orange: "from-orange-500 to-orange-700",
	teal: "from-teal-500 to-teal-700",
	rose: "from-rose-500 to-rose-700"
};

export const getRandomCardTheme = () => {
	const colors = Object.keys(cardColorClassName);
	return colors[Math.floor(Math.random() * colors.length)] as CardColor;
};

export const removeSpaces = (str: string) => str.replace(/\s/g, "");

import { PageContainer } from "@components/Containers";

import { c } from "@utils/styles.ts";

export function Home() {
	return (
		<PageContainer className="space-y-4">
			{Object.keys(cardColorClassName).map((color) => (
				<Card key={color} color={color as CardColor} />
			))}
		</PageContainer>
	);
}

const cardColorClassName = {
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

type CardColor = keyof typeof cardColorClassName;

type Props = {
	color: CardColor;
};

function Card({ color }: Props) {
	const cl = cardColorClassName[color];
	return (
		<div className={c("w-full aspect-payment-card bg-gradient-to-br rounded-2xl", cl)}>
			<div className="flex items-center justify-center h-full tracking-wider">
				{color.toUpperCase()}
			</div>
		</div>
	);
}

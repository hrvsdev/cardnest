import { motion } from "framer-motion";

import { cardThemes, getCardTheme } from "@theme/index.ts";

import { CardTheme } from "@t/card";

type Props = {
	theme: CardTheme;
	setTheme: (value: CardTheme) => void;
};

export function CardThemeSelector({ theme, setTheme }: Props) {
	return (
		<div>
			<p className="text-th-white/80 pb-2 pl-2">Card theme</p>
			<div className="grid grid-cols-3 gap-2">
				{cardThemes.map((it) => (
					<ThemeButton key={it} theme={it} setTheme={setTheme} isSelected={theme === it} />
				))}
			</div>
		</div>
	);
}

function ThemeButton({ theme, setTheme, isSelected }: Props & { isSelected: boolean }) {
	const colors = getCardTheme(theme);

	const padding = isSelected ? "0.375rem" : "0";
	const borderRadius = isSelected ? "0.375rem" : "0.625rem";

	const background = `linear-gradient(to bottom right, ${colors.from}, ${colors.to})`;

	return (
		<motion.div onClick={() => setTheme(theme)} className="relative h-12 cursor-pointer" animate={{ padding }}>
			<motion.div className="w-full h-full" style={{ background }} animate={{ borderRadius }} />
			<div
				className="absolute inset-0 w-full h-full p-0.25 rounded-1.5lg"
				style={{ background, mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`, maskComposite: "exclude" }}
			/>
		</motion.div>
	);
}

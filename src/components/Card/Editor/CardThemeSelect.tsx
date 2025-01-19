import { c } from "@utils/styles.ts";

import { cardThemes, getCardTheme } from "@theme/index.ts";

import { CardTheme } from "@t/card";

type Props = {
	theme: CardTheme;
	setTheme: (value: CardTheme) => void;
};

export function CardThemeSelect({ theme, setTheme }: Props) {
	return (
		<div className="space-y-2">
			<p className="text-th-white/80 pl-2">Card theme</p>
			<div className="grid grid-cols-3 gap-2">
				{cardThemes.map((it) => {
					const colors = getCardTheme(it);
					const background = `linear-gradient(to bottom right, ${colors.from}, ${colors.to})`;

					return (
						<div
							key={it}
							onClick={() => setTheme(it)}
							className={c(
								"flex justify-center items-center h-12 rounded-xl cursor-pointer",
								theme === it && "border-th-white/80 border p-2"
							)}
						>
							<div style={{ background }} className="rounded-lg w-full h-full bg-gradient-to-br" />
						</div>
					);
				})}
			</div>
		</div>
	);
}

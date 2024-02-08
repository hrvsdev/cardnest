import { cardThemeTailwindClassNames } from "@utils/card.ts";
import { cardThemes } from "@libs/utils/src/card.ts";
import { c } from "@libs/utils/src/styles.ts";

import { CardTheme } from "@libs/types/src/card";

type Props = {
	theme: CardTheme;
	setTheme: (value: CardTheme) => void;
};

export function CardThemeSelect({ theme, setTheme }: Props) {
	return (
		<div className="space-y-2">
			<p className="text-th-white/80 pl-2">Card theme</p>
			<div className="grid grid-cols-3 gap-2">
				{cardThemes.map((it) => (
					<div
						key={it}
						onClick={() => setTheme(it)}
						className={c(
							"flex justify-center items-center h-12 rounded-xl cursor-pointer",
							theme === it && "border-th-white/80 border p-2"
						)}
					>
						<div
							className={c(
								"rounded-lg w-full h-full bg-gradient-to-br",
								cardThemeTailwindClassNames[it]
							)}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

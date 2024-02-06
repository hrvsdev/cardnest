import Svg, { Circle, G } from "react-native-svg";

import { themeColors } from "@styles/colors.ts";

export function MasterCard({ width = 40 }: { width?: number }) {
	const aspectRatio = 100 / 62.5;

	return (
		<Svg style={{ width, aspectRatio, overflow: "visible" }} viewBox="0 0 32 20">
			<G>
				<G>
					<Circle cx="10" cy="10" r="10" fill={themeColors.white["85"]} />
					<Circle cx="22" cy="10" r="10" fill={themeColors.white["65"]} />
				</G>
			</G>
		</Svg>
	);
}

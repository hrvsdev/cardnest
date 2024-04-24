import Svg, { Circle, G } from "react-native-svg";

import { TH_WHITE_65, TH_WHITE_85 } from "@styles/colors.ts";

export function MasterCard({ width = 40 }: { width?: number }) {
	const aspectRatio = 100 / 62.5;

	return (
		<Svg style={{ width, aspectRatio, overflow: "visible" }} viewBox="0 0 32 20">
			<G>
				<G>
					<Circle cx="10" cy="10" r="10" fill={TH_WHITE_85} />
					<Circle cx="22" cy="10" r="10" fill={TH_WHITE_65} />
				</G>
			</G>
		</Svg>
	);
}

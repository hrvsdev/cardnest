import { PropsWithChildren } from "react";
import { ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { themeColors } from "@styles/colors.ts";

export function Gradient({ children }: PropsWithChildren) {
	const gradientColors = [themeColors.black, themeColors.darkerBlue];

	const start = { x: 1, y: 0 };
	const end = { x: 0, y: 1 };

	const style: ViewStyle = {
		flex: 1,
		position: "relative"
	};

	return (
		<LinearGradient style={style} colors={gradientColors} start={start} end={end}>
			{children}
		</LinearGradient>
	);
}

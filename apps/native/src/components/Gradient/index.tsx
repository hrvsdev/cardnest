import { PropsWithChildren } from "react";
import { ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { themeColors } from "@styles/colors.ts";

export function BgGradient({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) {
	const gradientColors = [themeColors.black, themeColors.darkerBlue];

	const start = { x: 1, y: 0 };
	const end = { x: 0, y: 1 };

	return (
		<LinearGradient style={[{ flex: 1 }, style]} colors={gradientColors} start={start} end={end}>
			{children}
		</LinearGradient>
	);
}

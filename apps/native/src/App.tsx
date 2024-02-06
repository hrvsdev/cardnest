import { PropsWithChildren } from "react";

import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import { themeColors } from "./styles/colors.ts";

export default function App() {
	return (
		<AppContainer>
			<Text className="text-th-red">Open up App.tsx to start working on your app!</Text>
		</AppContainer>
	);
}

function AppContainer({ children }: PropsWithChildren) {
	const gradientColors = [themeColors.black, themeColors.darkerBlue];

	const start = { x: 1, y: 0 };
	const end = { x: 0, y: 1 };

	return (
		<LinearGradient className="flex-1" colors={gradientColors} start={start} end={end}>
			<View className="flex-1 pt-5">{children}</View>
			<StatusBar style="light" />
		</LinearGradient>
	);
}

import { Stack } from "expo-router";

import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import { Gradient } from "@components/Gradient";

import { SCREEN_STYLE } from "@styles/common.ts";

export default function HomeLayout() {
	const screenOptions: NativeStackNavigationOptions = {
		headerShown: false,
		animation: "none",
		contentStyle: SCREEN_STYLE
	};

	return (
		<Gradient>
			<Stack screenOptions={screenOptions} />
		</Gradient>
	);
}

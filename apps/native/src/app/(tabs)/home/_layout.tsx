import { Stack } from "expo-router";

import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { SCREEN_STYLE } from "@styles/common.ts";

export default function HomeLayout() {
	const screenOptions: NativeStackNavigationOptions = {
		headerShown: false,
		contentStyle: SCREEN_STYLE
	};

	return <Stack screenOptions={screenOptions} />
}

import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";

import { Lato_300Light, Lato_400Regular, Lato_700Bold, useFonts } from "@expo-google-fonts/lato";

import { DEFAULT_STACK_OPTIONS } from "@utils/stack.ts";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded, fontError] = useFonts({
		Lato_300Light,
		Lato_400Regular,
		Lato_700Bold
	});

	useEffect(() => {
		if (fontsLoaded || fontError) SplashScreen.hideAsync();
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) return null;

	return <Stack screenOptions={DEFAULT_STACK_OPTIONS} />;
}

import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";

import { Lato_300Light, Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import {
	Manrope_300Light,
	Manrope_400Regular,
	Manrope_500Medium,
	Manrope_700Bold
} from "@expo-google-fonts/manrope";

import { DEFAULT_STACK_OPTIONS } from "@utils/stack.ts";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded, fontError] = useFonts({
		Lato_300Light,
		Lato_400Regular,
		Lato_700Bold,
		Manrope_300Light,
		Manrope_400Regular,
		Manrope_500Medium,
		Manrope_700Bold
	});

	useEffect(() => {
		if (fontsLoaded || fontError) SplashScreen.hideAsync();
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) return null;

	return <Stack screenOptions={DEFAULT_STACK_OPTIONS} />;
}

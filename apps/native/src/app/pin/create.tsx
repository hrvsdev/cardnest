import { StyleSheet, Text, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BgGradient } from "@components/Gradient";
import { Keypad } from "@components/Pin/Keypad";
import { PinInput } from "@components/Pin/PinInput";

import { themeColors } from "@styles/colors.ts";

export default function Page() {
	const insets = useSafeAreaInsets();
	return (
		<BgGradient>
			<View style={[styles.container, { paddingTop: insets.top }]}>
				<View style={styles.pinInputContainer}>
					<Text style={styles.text}>Enter your current PIN</Text>
					<PinInput pin={[7, 3, 5, 1]} isPinIncorrect={false} />
				</View>
				<Keypad pin={[7, 3, 5, 1]} setPin={() => {}} onPinChange={() => {}} />
			</View>
		</BgGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	pinInputContainer: {
		flexGrow: 1,
		gap: 32,
		justifyContent: "center",
		alignItems: "center"
	},
	text: {
		color: themeColors.white[90],
		fontSize: 20,
		fontWeight: "bold"
	}
});

/*
<div className="flex flex-col justify-center items-center grow">
			<div className="flex flex-col text-th-white/90 items-center justify-center gap-8 flex-1">
				<h1 className="text-2xl font-bold">Enter your current PIN</h1>
 */

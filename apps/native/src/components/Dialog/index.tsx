import { Fragment, PropsWithChildren } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";

import { opacity, themeColors } from "@styles/colors.ts";

export function DialogContainer({ children }: PropsWithChildren) {
	return <Fragment>{children}</Fragment>;
}

export function DialogBackground({ onPress }: { onPress: () => void }) {
	return (
		<Pressable style={styles.backdrop} onPress={onPress}>
			{/*@ts-ignore*/}
			<BlurView style={{ width: "100%", height: "100%" }} intensity={10} />
		</Pressable>
	);
}

export function DialogHeading({ children }: PropsWithChildren) {
	return <Text style={styles.heading}>{children}</Text>;
}

export function DialogDescription({ children }: PropsWithChildren) {
	return <Text style={styles.descText}>{children}</Text>;
}

export function DialogButtons({ children }: PropsWithChildren) {
	return <View style={{ marginTop: 40, flexDirection: "column", gap: 12 }}>{children}</View>;
}

const styles = StyleSheet.create({
	backdrop: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundColor: opacity(themeColors.black, Platform.OS === "android" ? 0.4 : 0.2)
	},
	heading: {
		color: themeColors.white.DEFAULT,
		textAlign: "center",
		fontSize: 20,
		lineHeight: 20 * 1.5,
		fontWeight: "700"
	},
	descText: {
		color: opacity(themeColors.white.DEFAULT, 0.8),
		textAlign: "center",
		fontSize: 16,
		lineHeight: 16 * 1.5
	}
});

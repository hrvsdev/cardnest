import { Fragment, PropsWithChildren } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";

import { AppText } from "@components/AppText";

import { TH_BLACK_20, TH_BLACK_40, TH_WHITE } from "@styles/colors.ts";

export function DialogContainer({ children }: PropsWithChildren) {
	return <Fragment>{children}</Fragment>;
}

export function DialogBackground({ onPress }: { onPress: () => void }) {
	return (
		<Pressable style={styles.backdrop} onPress={onPress}>
			{Platform.OS !== "android" && (
				// @ts-ignore
				<BlurView style={{ width: "100%", height: "100%" }} intensity={10} />
			)}
		</Pressable>
	);
}

export function DialogHeading({ children }: PropsWithChildren) {
	return (
		<AppText fontSize="xl" fontWeight="700" textAlign="center" color={TH_WHITE}>
			{children}
		</AppText>
	);
}

export function DialogDescription({ children }: PropsWithChildren) {
	return <AppText textAlign="center">{children}</AppText>;
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
		backgroundColor: Platform.OS === "android" ? TH_BLACK_40 : TH_BLACK_20
	}
});

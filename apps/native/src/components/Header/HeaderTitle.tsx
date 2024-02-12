import { StyleSheet, Text, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { themeColors } from "@styles/colors.ts";

export function HeaderTitle({ title }: { title: string }) {
	const insets = useSafeAreaInsets();

	return (
		<View style={[styles.headingWrapper, { paddingTop: insets.top + 32 }]}>
			<Text style={styles.heading}>{title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	headingWrapper: {
		paddingLeft: 2,
		marginHorizontal: 16
	},
	heading: {
		fontSize: 28,
		fontWeight: "600",
		color: themeColors.white.DEFAULT
	}
});

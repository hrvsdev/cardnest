import { StyleSheet, Text, View } from "react-native";

import { themeColors } from "../../styles/colors.ts";

export function HeaderTitle({ title }: { title: string }) {
	return (
		<View style={styles.headingWrapper}>
			<Text style={styles.heading}>{title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	headingWrapper: {
		paddingTop: 32,
		paddingLeft: 2,
		marginHorizontal: 16
	},
	heading: {
		fontSize: 28,
		fontWeight: "600",
		color: themeColors.white.DEFAULT
	}
});

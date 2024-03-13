import { Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";

import { themeColors } from "@styles/colors.ts";

export default function CardDeleteDialog() {
	return (
		<Fragment>
			<Backdrop />
			<View style={styles.wrapper}>
				<Text style={{ color: themeColors.white.DEFAULT }}>
					Are you sure you want to delete this card?
				</Text>
			</View>
		</Fragment>
	);
}

function Backdrop() {
	// @ts-ignore
	return <BlurView style={styles.backdrop} intensity={10} />;
}

const styles = StyleSheet.create({
	backdrop: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%"
	},
	wrapper: {
		position: "absolute",
		bottom: 0,
		height: 200,
		width: "100%",
		backgroundColor: themeColors.darkerBlue
	}
});

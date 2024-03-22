import { Fragment } from "react";
import { Dimensions, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";

import { Button } from "@components/Button";
import { BgGradient } from "@components/Gradient";

import { opacity, themeColors } from "@styles/colors.ts";

export default function CardDeleteDialog() {
	return (
		<Fragment>
			<Backdrop />
			<View style={styles.wrapper}>
				<BgGradient style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
					<View style={styles.content}>
						<Text style={styles.heading}>Delete card</Text>
						<Text style={styles.descText}>Are you sure you want to delete this card?</Text>
						<Text style={styles.descText}>This action cannot be undone.</Text>

						<View style={{ marginTop: 40, flexDirection: "column", gap: 12 }}>
							<Button title="Cancel" variant="flat" onPress={() => {}} />
							<Button title="Confirm" theme="danger" onPress={() => {}} />
						</View>
					</View>
				</BgGradient>
			</View>
		</Fragment>
	);
}

function Backdrop() {
	const router = useRouter();
	return (
		<Pressable style={styles.backdrop} onPress={() => router.navigate("/home/card")}>
			{/*@ts-ignore*/}
			<BlurView style={{ width: "100%", height: "100%" }} intensity={10} />
		</Pressable>
	);
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
	wrapper: {
		position: "absolute",
		bottom: 0,
		alignSelf: "center",
		width: Dimensions.get("window").width + 2,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		borderWidth: 1,
		borderBottomWidth: 0,
		borderColor: opacity(themeColors.sky, 0.2),
		shadowColor: themeColors.sky,
		shadowOffset: {
			width: 0,
			height: -4
		},
		shadowOpacity: 0.1
	},
	content: {
		padding: 16
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

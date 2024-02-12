import { Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconChevronLeft } from "tabler-icons-react-native";

import { themeColors } from "@styles/colors.ts";

type Props = {
	title: string;
};

export function SubPageHeader({ title }: Props) {
	const insets = useSafeAreaInsets();

	const onBackPress = () => router.back();

	return (
		// @ts-ignore
		<BlurView style={{ paddingTop: insets.top }} intensity={0} >
			<View style={styles.wrapper}>
				<Pressable style={styles.back} onPress={onBackPress}>
					<IconChevronLeft strokeWidth={2.5} size={20} color={themeColors.sky} />
					<Text style={styles.backLabel}>Back</Text>
				</Pressable>
				<Text style={styles.title}>{title}</Text>
			</View>
		</BlurView>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: 48,
		position: "relative",
	},
	title: {
		fontSize: 16,
		fontWeight: "500",
		color: themeColors.white.DEFAULT
	},
	back: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		height: "100%",
		position: "absolute",
		left: 0,
		paddingHorizontal: 16,
		columnGap: 4
	},
	backLabel: {
		fontSize: 16,
		color: themeColors.sky
	}
});

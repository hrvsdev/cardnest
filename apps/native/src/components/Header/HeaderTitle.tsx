import { StyleSheet, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@components/AppText";

import { themeColors } from "@styles/colors.ts";

export function HeaderTitle({ title }: { title: string }) {
	const insets = useSafeAreaInsets();

	return (
		<View style={[styles.headingWrapper, { paddingTop: insets.top + 32 }]}>
			<AppText fontSize="heading" fontWeight="600" color={themeColors.white.DEFAULT}>
				{title}
			</AppText>
		</View>
	);
}

const styles = StyleSheet.create({
	headingWrapper: {
		paddingLeft: 2,
		marginHorizontal: 16
	}
});

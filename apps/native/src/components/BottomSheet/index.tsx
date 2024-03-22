import { ReactNode } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import { DialogBackground, DialogContainer } from "@components/Dialog";
import { BgGradient } from "@components/Gradient";

import { opacity, themeColors } from "@styles/colors.ts";

type Props = {
	show: boolean;
	children: ReactNode;
	onPress: () => void;
};

export function BottomSheet({ show, onPress, children }: Props) {
	if (!show) return null;
	return (
		<DialogContainer>
			<DialogBackground onPress={onPress} />
			<View style={styles.wrapper}>
				<BgGradient style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16 }}>
					{children}
				</BgGradient>
			</View>
		</DialogContainer>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		position: "absolute",
		bottom: 0,
		alignSelf: "center",
		zIndex: 100,
		width: Dimensions.get("window").width + 2,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		borderWidth: 1,
		borderBottomWidth: 0,
		borderColor: opacity(themeColors.sky, 0.2),
		shadowColor: themeColors.sky,
		shadowOpacity: 0.1,
		shadowOffset: {
			width: 0,
			height: -4
		}
	}
});

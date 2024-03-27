import { ReactNode } from "react";
import { Dimensions, Modal, StyleSheet, View } from "react-native";

import { DialogBackground } from "@components/Dialog";
import { BgGradient } from "@components/Gradient";

import { opacity, themeColors } from "@styles/colors.ts";

type Props = {
	show: boolean;
	children: ReactNode;
	onClose: () => void;
};

export function BottomSheet({ show, onClose, children }: Props) {
	return (
		<Modal transparent={true} visible={show} onRequestClose={onClose}>
			<DialogBackground onPress={onClose} />
			<View style={styles.wrapper}>
				<BgGradient style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16 }}>
					{children}
				</BgGradient>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
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
		shadowOpacity: 0.1,
		shadowOffset: {
			width: 0,
			height: -4
		}
	}
});

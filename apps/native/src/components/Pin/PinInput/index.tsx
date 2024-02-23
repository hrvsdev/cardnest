import { StyleSheet, View } from "react-native";

import { themeColors } from "@styles/colors.ts";

type Props = {
	pin: number[];
	isPinIncorrect: boolean;
};

const PIN_LENGTH_ARR = [1, 2, 3, 4, 5, 6];

export function PinInput({ isPinIncorrect, pin }: Props) {
	return (
		<View>
			<View style={style.container}>
				{PIN_LENGTH_ARR.map((n) => (
					<View key={n} style={[style.char]} />
				))}
			</View>
		</View>
	);
}

const style = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 12,
	},
	char: {
		width: 12,
		height: 12,
		borderWidth: 1,
		borderRadius: 6,
		borderColor: themeColors.white.DEFAULT
	}
});

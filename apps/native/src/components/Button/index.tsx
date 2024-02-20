import { Pressable, StyleSheet, Text } from "react-native";

import { opacity, themeColors } from "@styles/colors.ts";

type Theme = "primary" | "danger";
type Variant = "solid" | "flat";

type Styles = Record<Variant, Record<Theme, ReturnType<typeof StyleSheet.create>>>;

type Props = {
	title: string;
	onPress: () => void;

	theme?: Theme;
	variant?: Variant;
};

export function Button(props: Props) {
	const { title, onPress, theme = "primary", variant = "solid" } = props;

	const wrapperStyles = ({ pressed }: { pressed: boolean }) => {
		return StyleSheet.compose(
			[baseStyles.wrapper, styles[variant][theme].wrapper],
			pressed && baseStyles.pressed
		);
	};

	return (
		<Pressable onPress={onPress} style={wrapperStyles}>
			<Text style={[baseStyles.text, styles[variant][theme].text]}>{title}</Text>
		</Pressable>
	);
}

const baseStyles = StyleSheet.create({
	wrapper: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		height: 48,
		borderRadius: 14
	},
	pressed: {
		transform: [{ scale: 0.98 }],
	},
	text: {
		fontSize: 17,
		fontWeight: "500"
	}
});

const styles = {
	solid: {
		primary: StyleSheet.create({
			wrapper: { backgroundColor: themeColors.sky },
			text: { color: themeColors.white.DEFAULT }
		}),
		danger: StyleSheet.create({
			wrapper: { backgroundColor: themeColors.red },
			text: { color: themeColors.white.DEFAULT }
		})
	},
	flat: {
		primary: StyleSheet.create({
			wrapper: { backgroundColor: opacity(themeColors.sky, 0.1) },
			text: { color: themeColors.sky }
		}),
		danger: StyleSheet.create({
			wrapper: { backgroundColor: opacity(themeColors.red, 0.1) },
			text: { color: themeColors.red }
		})
	}
} satisfies Styles;

import { Pressable, StyleSheet, Text } from "react-native";

import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

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

	const scale = useSharedValue(1);

	const onPressIn = () => (scale.value = withTiming(0.98, { duration: 200 }));
	const onPressOut = () => (scale.value = withTiming(1, { duration: 200 }));

	const wrapperStyles = [
		baseStyles.wrapper,
		styles[variant][theme].wrapper,
		{ transform: [{ scale }] }
	];

	return (
		<Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
			<Animated.View style={wrapperStyles}>
				<Text style={[baseStyles.text, styles[variant][theme].text]}>{title}</Text>
			</Animated.View>
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

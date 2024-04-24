import { Pressable, StyleSheet } from "react-native";

import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

import { AppText } from "@components/AppText";

import { TH_RED, TH_RED_10, TH_SKY, TH_SKY_10, TH_WHITE } from "@styles/colors.ts";

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
				<AppText fontSize="md" fontWeight="700" color={styles[variant][theme].text.color}>
					{title}
				</AppText>
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
	}
});

const styles = {
	solid: {
		primary: StyleSheet.create({
			wrapper: { backgroundColor: TH_SKY },
			text: { color: TH_WHITE }
		}),
		danger: StyleSheet.create({
			wrapper: { backgroundColor: TH_RED },
			text: { color: TH_WHITE }
		})
	},
	flat: {
		primary: StyleSheet.create({
			wrapper: { backgroundColor: TH_SKY_10 },
			text: { color: TH_SKY }
		}),
		danger: StyleSheet.create({
			wrapper: { backgroundColor: TH_RED_10 },
			text: { color: TH_RED }
		})
	}
} satisfies Styles;

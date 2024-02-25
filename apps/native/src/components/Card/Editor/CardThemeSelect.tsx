import { useEffect } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";

import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";

import { cardThemes } from "@libs/utils/src/card.ts";

import { colors, opacity, themeColors } from "@styles/colors.ts";

import { CardTheme } from "@libs/types/src/card";

type Props = {
	theme: CardTheme;
	setTheme: (value: CardTheme) => void;
};

type ItemProps = {
	theme: CardTheme;
	selected: boolean;
	onPress: (theme: CardTheme) => void;
};

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const DURATION = 200;
const INIT_BORDER_COLOR = opacity(themeColors.white.DEFAULT, 0);
const SELECTED_BORDER_COLOR = opacity(themeColors.white.DEFAULT, 0.8);

export function CardThemeSelect({ theme, setTheme }: Props) {
	const onPress = async (theme: CardTheme) => {
		setTheme(theme);
		await Haptics.selectionAsync();
	};

	return (
		<View style={{ flex: 1, rowGap: 8 }}>
			<Text style={styles.label}>Card theme</Text>
			<View style={styles.grid}>
				{cardThemes.map((t) => (
					<Item key={t} theme={t} selected={t === theme} onPress={onPress} />
				))}
			</View>
		</View>
	);
}

function Item({ theme, selected, onPress }: ItemProps) {
	const borderColorProgress = useSharedValue(0);
	const padding = useSharedValue(0);
	const borderRadius = useSharedValue(10);

	useEffect(() => {
		borderColorProgress.value = withTiming(selected ? 1 : 0, { duration: DURATION });
		padding.value = withTiming(selected ? 8 : 0, { duration: DURATION });
		borderRadius.value = withTiming(selected ? 6 : 8, { duration: DURATION });
	}, [selected]);

	const itemAnimatedStyle = useAnimatedStyle(() => {
		return {
			borderColor: interpolateColor(
				borderColorProgress.value,
				[0, 1],
				[INIT_BORDER_COLOR, SELECTED_BORDER_COLOR]
			)
		};
	});

	return (
		<Pressable onPress={() => onPress(theme)}>
			<Animated.View style={[styles.item, itemAnimatedStyle, { padding }]}>
				<AnimatedLinearGradient
					colors={[colors[theme]["500"], colors[theme]["700"]]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={{ flex: 1, borderRadius }}
				/>
			</Animated.View>
		</Pressable>
	);
}

const PAGE_PADDING = 16;
const ITEM_GAP = 8;
const NO_OF_ITEMS = 3;

const pageContentWidth = Dimensions.get("window").width - PAGE_PADDING * 2;
const gridItemWidth = (pageContentWidth - ITEM_GAP * (NO_OF_ITEMS - 1)) / NO_OF_ITEMS;

const styles = StyleSheet.create({
	label: {
		color: themeColors.white["80"],
		paddingLeft: 8,
		fontSize: 16
	},
	grid: {
		flex: 1,
		flexWrap: "wrap",
		flexDirection: "row",
		gap: 8
	},
	item: {
		width: gridItemWidth,
		height: 48,
		borderRadius: 10,
		borderWidth: 1,
	},
});

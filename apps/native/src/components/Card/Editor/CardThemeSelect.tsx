import { useEffect } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";

import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";

import { AppText } from "@components/AppText";

import { cardThemes } from "@libs/utils/src/card.ts";

import { colors, TH_WHITE_00, TH_WHITE_80 } from "@styles/colors.ts";

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
const INIT_BORDER_COLOR = TH_WHITE_00;
const SELECTED_BORDER_COLOR = TH_WHITE_80;

const PAGE_PADDING = 16;
const ITEM_GAP = 8;
const NO_OF_ITEMS = 3;

const pageContentWidth = Dimensions.get("window").width - PAGE_PADDING * 2;
const gridItemWidth = (pageContentWidth - ITEM_GAP * (NO_OF_ITEMS - 1)) / NO_OF_ITEMS;
const gridItemHeight = 48;

const SCALE_OFFSET = 8;

const SELECTED_SCALE_X = (gridItemWidth - SCALE_OFFSET * 2) / gridItemWidth;
const SELECTED_SCALE_Y = (gridItemHeight - SCALE_OFFSET * 2) / gridItemHeight;

export function CardThemeSelect({ theme, setTheme }: Props) {
	const onPress = async (theme: CardTheme) => {
		setTheme(theme);
		await Haptics.selectionAsync();
	};

	return (
		<View style={{ flex: 1, rowGap: 8 }}>
			<AppText style={{ paddingLeft: 8 }}>Card theme</AppText>
			<View style={styles.grid}>
				{cardThemes.map((t) => (
					<Item key={t} theme={t} selected={t === theme} onPress={onPress} />
				))}
			</View>
		</View>
	);
}

function Item({ theme, selected, onPress }: ItemProps) {
	const borderColorProgress = useSharedValue(selected ? 1 : 0);
	const scaleX = useSharedValue(selected ? SELECTED_SCALE_X : 1);
	const scaleY = useSharedValue(selected ? SELECTED_SCALE_Y : 1);
	const borderRadius = useSharedValue(selected ? 8 : 10);

	useEffect(() => {
		borderColorProgress.value = withTiming(selected ? 1 : 0, { duration: DURATION });
		scaleX.value = withTiming(selected ? SELECTED_SCALE_X : 1, { duration: DURATION });
		scaleY.value = withTiming(selected ? SELECTED_SCALE_Y : 1, { duration: DURATION });
		borderRadius.value = withTiming(selected ? 8 : 10, { duration: DURATION });
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

	const gradientAnimatedStyle = useAnimatedStyle(() => {
		return {
			borderRadius: borderRadius.value,
			transform: [{ scaleX: scaleX.value }, { scaleY: scaleY.value }]
		};
	});

	return (
		<Pressable onPress={() => onPress(theme)}>
			<Animated.View style={[styles.item, itemAnimatedStyle]}>
				<AnimatedLinearGradient
					colors={[colors[theme]["500"], colors[theme]["700"]]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={[{ flex: 1 }, gradientAnimatedStyle]}
				/>
			</Animated.View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	grid: {
		flex: 1,
		flexWrap: "wrap",
		flexDirection: "row",
		gap: 8
	},
	item: {
		width: gridItemWidth,
		height: gridItemHeight,
		borderRadius: 10,
		borderWidth: 1
	}
});

import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";

import { cardThemes } from "@libs/utils/src/card.ts";

import { colors, themeColors } from "@styles/colors.ts";

import { CardTheme } from "@libs/types/src/card";

type Props = {
	theme: CardTheme;
	setTheme: (value: CardTheme) => void;
};

export function CardThemeSelect({ theme, setTheme }: Props) {
	const onPress = async (theme: CardTheme) => {
		await Haptics.selectionAsync();
		setTheme(theme);
	};

	return (
		<View style={{ flex: 1, rowGap: 8 }}>
			<Text style={styles.label}>Card theme</Text>
			<View style={styles.grid}>
				{cardThemes.map((t) => (
					<Pressable
						key={t}
						onPress={() => onPress(t)}
						style={[styles.item, theme === t ? styles.selected : styles.notSelected]}
					>
						<LinearGradient
							colors={[colors[t]["500"], colors[t]["700"]]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={{ flex: 1, borderRadius: theme === t ? 6 : 10 }}
						/>
					</Pressable>
				))}
			</View>
		</View>
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
		borderRadius: 10
	},
	selected: {
		borderWidth: 1,
		borderColor: themeColors.white["80"],
		padding: 8
	},
	notSelected: {
		padding: 0
	}
});

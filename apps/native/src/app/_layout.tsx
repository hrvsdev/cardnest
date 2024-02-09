import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Tabs } from "expo-router";

import {
	BottomTabBarProps,
	BottomTabNavigationOptions
} from "@react-navigation/bottom-tabs/src/types.tsx";
import { CreditCardIcon, HomeIcon, UserCircleIcon } from "react-native-heroicons/solid";

import { opacity, themeColors } from "@styles/colors.ts";

const tabs = [
	{
		name: "index/index",
		href: "/",
		icon: HomeIcon
	},
	{
		name: "card/index",
		href: "/card",
		icon: CreditCardIcon
	},
	{
		name: "user/index",
		href: "/user",
		icon: UserCircleIcon
	}
];

export default function Layout() {
	const gradientColors = [themeColors.black, themeColors.darkerBlue];

	const start = { x: 1, y: 0 };
	const end = { x: 0, y: 1 };

	const screen: BottomTabNavigationOptions = {
		headerShown: false
	};

	const scene: StyleProp<ViewStyle> = {
		backgroundColor: "transparent"
	};

	return (
		<LinearGradient style={styles.root} colors={gradientColors} start={start} end={end}>
			<Tabs screenOptions={screen} sceneContainerStyle={scene} tabBar={BottomTabs}>
				{tabs.map((tab) => (
					<Tabs.Screen key={tab.name} name={tab.name} />
				))}
			</Tabs>
		</LinearGradient>
	);
}

function BottomTabs({ state, insets }: BottomTabBarProps) {
	return (
		// @ts-ignore
		<BlurView style={[styles.tabBar]}>
			{tabs.map((tab, ix) => (
				<Link key={tab.name} href={tab.href} asChild>
					<Pressable style={styles.tabButtonWrapper}>
						<View style={{ paddingTop: 16, paddingBottom: insets.bottom + 16 }}>
							<tab.icon
								color={state.index === ix ? themeColors.sky : themeColors.white[70]}
								size={24}
							/>
						</View>
					</Pressable>
				</Link>
			))}
		</BlurView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		position: "relative"
	},
	tabBar: {
		position: "absolute",
		width: "100%",
		left: 0,
		right: 0,
		bottom: 0,
		display: "flex",
		flexDirection: "row",
		borderTopWidth: 1,
		borderTopColor: opacity(themeColors.white.DEFAULT, 0.1)
	},
	tabButtonWrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: opacity(themeColors.black, 0.8)
	}
});

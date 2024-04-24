import { PropsWithChildren } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { Link, Tabs } from "expo-router";

import {
	BottomTabBarProps,
	BottomTabNavigationOptions
} from "@react-navigation/bottom-tabs/src/types.tsx";
import { CreditCardIcon, HomeIcon, UserCircleIcon } from "react-native-heroicons/solid";

import { TH_BLACK, TH_BLACK_80, TH_SKY, TH_WHITE_10, TH_WHITE_70 } from "@styles/colors.ts";

const tabs = [
	{
		name: "home",
		href: "/home",
		icon: HomeIcon
	},
	{
		name: "add",
		href: "/add",
		icon: CreditCardIcon
	},
	{
		name: "user",
		href: "/user",
		icon: UserCircleIcon
	}
];

export default function TabsLayout() {
	const screen: BottomTabNavigationOptions = {
		headerShown: false,
		lazy: false
	};

	const scene = {
		backgroundColor: TH_BLACK
	};

	return (
		<Tabs screenOptions={screen} tabBar={BottomTabs} sceneContainerStyle={scene}>
			{tabs.map((tab) => (
				<Tabs.Screen key={tab.name} name={tab.name} />
			))}
		</Tabs>
	);
}

function BottomTabs({ state, insets }: BottomTabBarProps) {
	return (
		<BottomTabsContainer>
			{tabs.map((tab, ix) => (
				<Link key={tab.name} href={tab.href} asChild>
					<Pressable style={styles.tabButtonWrapper}>
						<View style={{ paddingTop: 16, paddingBottom: insets.bottom + 16 }}>
							<tab.icon color={state.index === ix ? TH_SKY : TH_WHITE_70} size={24} />
						</View>
					</Pressable>
				</Link>
			))}
		</BottomTabsContainer>
	);
}

function BottomTabsContainer({ children }: PropsWithChildren) {
	if (Platform.OS === "android") {
		return <View style={[styles.tabBar]}>{children}</View>;
	}
	// @ts-ignore
	return <BlurView style={[styles.tabBar]}>{children}</BlurView>;
}

const styles = StyleSheet.create({
	tabBar: {
		position: "absolute",
		width: "100%",
		left: 0,
		right: 0,
		bottom: 0,
		display: "flex",
		flexDirection: "row",
		borderTopWidth: 1,
		borderTopColor: TH_WHITE_10
	},
	tabButtonWrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Platform.OS === "android" ? TH_BLACK : TH_BLACK_80
	}
});

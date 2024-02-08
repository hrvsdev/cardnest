import { PropsWithChildren, useState } from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { CreditCardIcon, HomeIcon, UserCircleIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";

import { CardPreview } from "@components/Card/Preview";
import { HeaderSearch } from "@components/Header/HeaderSearch.tsx";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";

import { opacity, themeColors } from "@styles/colors.ts";

import { CardFullProfile } from "@libs/types/src/card.ts";

const CARD: CardFullProfile = {
	number: "8263 9039 2737 3837",
	cardholder: "Harsh Vyas",
	issuer: "HDFC Bank",
	expiry: "12/30",
	theme: "pink",
	network: "mastercard"
};

export default function App() {
	const [search, setSearch] = useState("");

	return (
		<AppContainer>
			<HeaderTitle title="Home" />
			<HeaderSearch value={search} onChange={setSearch} />
			<View style={styles.pageWrapper}>
				<CardPreview card={CARD} />
			</View>
			<View style={styles.tabBar}>
				<View style={styles.tabButtonWrapper}>
					<HomeIcon color={themeColors.sky} size={24} />
				</View>
				<View style={styles.tabButtonWrapper}>
					<CreditCardIcon color={themeColors.white.DEFAULT} size={24} />
				</View>
				<View style={styles.tabButtonWrapper}>
					<UserCircleIcon color={themeColors.white.DEFAULT} size={24} />
				</View>
			</View>
		</AppContainer>
	);
}

const styles = StyleSheet.create({
	pageWrapper: {
		flex: 1,
		flexDirection: "column",
		rowGap: 16,
		padding: 16
	},
	tabBar: {
		position: "absolute",
		width: "100%",
		bottom: 0,
		display: "flex",
		flexDirection: "row",
		borderTopWidth: 1,
		borderTopColor: themeColors.white[10],
		backgroundColor: opacity(themeColors.black, 0.8)
	},
	tabButtonWrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 16
	}
});

function AppContainer({ children }: PropsWithChildren) {
	const gradientColors = [themeColors.black, themeColors.darkerBlue];

	const start = { x: 1, y: 0 };
	const end = { x: 0, y: 1 };

	return (
		<LinearGradient style={{ flex: 1 }} colors={gradientColors} start={start} end={end}>
			<SafeAreaView style={{ flex: 1, position: "relative" }}>{children}</SafeAreaView>
			<StatusBar style="light" />
		</LinearGradient>
	);
}

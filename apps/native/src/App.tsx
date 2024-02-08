import { PropsWithChildren, useState } from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { SafeAreaView } from "react-native-safe-area-context";

import { CardPreview } from "@components/Card/Preview";
import { HeaderSearch } from "@components/Header/HeaderSearch.tsx";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";

import { themeColors } from "@styles/colors.ts";

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
		</AppContainer>
	);
}

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

const styles = StyleSheet.create({
	pageWrapper: {
		flex: 1,
		flexDirection: "column",
		rowGap: 16,
		padding: 16
	}
});

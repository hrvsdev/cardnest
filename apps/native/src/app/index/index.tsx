import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { CardPreview } from "@components/Card/Preview";
import { HeaderSearch } from "@components/Header/HeaderSearch.tsx";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";

import { CardFullProfile } from "@libs/types/src/card.ts";

const CARD: CardFullProfile = {
	number: "8263 9039 2737 3837",
	cardholder: "Harsh Vyas",
	issuer: "HDFC Bank",
	expiry: "12/30",
	theme: "pink",
	network: "mastercard"
};

export default function Page() {
	const [search, setSearch] = useState("");

	return (
		<SafeAreaView>
			<HeaderTitle title="Home" />
			<HeaderSearch value={search} onChange={setSearch} />
			<View style={styles.pageWrapper}>
				<CardPreview card={CARD} />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	pageWrapper: {
		flex: 1,
		flexDirection: "column",
		rowGap: 16,
		padding: 16,
		backgroundColor: "transparent"
	}
});

import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";

import { CardPreview } from "@components/Card/Preview/Preview.tsx";
import { PageContainer, TabPageRoot } from "@components/Containers";
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

export default function HomePage() {
	const [search, setSearch] = useState("");

	return (
		<TabPageRoot>
			<HeaderTitle title="Home" />
			<HeaderSearch value={search} onChange={setSearch} />
			<PageContainer style={styles.pageWrapper}>
				<Link href="/home/card" asChild>
					<Pressable>
						<CardPreview card={CARD} />
					</Pressable>
				</Link>
			</PageContainer>
		</TabPageRoot>
	);
}

const styles = StyleSheet.create({
	pageWrapper: {
		flex: 1,
		flexDirection: "column",
		rowGap: 16
	}
});

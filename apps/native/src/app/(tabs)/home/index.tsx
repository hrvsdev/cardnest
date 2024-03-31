import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Link } from "expo-router";

import { CardPreview } from "@components/Card/Preview/Preview.tsx";
import { PageContainer, TabPageRoot } from "@components/Containers";
import { HeaderSearch } from "@components/Header/HeaderSearch.tsx";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";
import { Show } from "@components/Show";

import { useSearchCards } from "@libs/hooks/src/card/data.ts";

import { opacity, themeColors } from "@styles/colors.ts";

export default function HomePage() {
	const [search, setSearch] = useState("");

	const cards = useSearchCards(search);

	return (
		<TabPageRoot>
			<HeaderTitle title="Home" />
			<HeaderSearch value={search} onChange={setSearch} />
			<PageContainer gap={16}>
				{cards.map(({ id, data }) => (
					<Link key={id} href={`/home/cards/${id}`} asChild>
						<Pressable>
							<CardPreview card={data} />
						</Pressable>
					</Link>
				))}

				<Show when={cards.length === 0}>
					<Text style={styles.noCardsText}>No cards found</Text>
				</Show>
			</PageContainer>
		</TabPageRoot>
	);
}

const styles = StyleSheet.create({
	noCardsText: {
		textAlign: "center",
		marginTop: 32,
		fontSize: 16,
		color: opacity(themeColors.white.DEFAULT, 0.6)
	}
});

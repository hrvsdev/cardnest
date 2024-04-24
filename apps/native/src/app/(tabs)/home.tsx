import { useState } from "react";
import { Pressable } from "react-native";
import { Link } from "expo-router";

import { AppText } from "@components/AppText";
import { CardPreview } from "@components/Card/Preview/Preview.tsx";
import { PageContainer, TabPageRoot } from "@components/Containers";
import { HeaderSearch } from "@components/Header/HeaderSearch.tsx";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";
import { Show } from "@components/Show";

import { useSearchCards } from "@libs/hooks/src/card/data.ts";
import { useMaskCardNumberValue } from "@libs/hooks/src/preferences";

import { TH_WHITE_60 } from "@styles/colors.ts";

export default function HomePage() {
	const [search, setSearch] = useState("");

	const cards = useSearchCards(search);
	const maskCardNumber = useMaskCardNumberValue();

	return (
		<TabPageRoot>
			<HeaderTitle title="Home" />
			<HeaderSearch value={search} onChange={setSearch} />
			<PageContainer gap={16}>
				{cards.map(({ id, data }) => (
					<Link key={id} href={`/home/cards/${id}`} asChild>
						<Pressable>
							<CardPreview card={data} maskCardNumber={maskCardNumber} />
						</Pressable>
					</Link>
				))}

				<Show when={cards.length === 0}>
					<AppText
						textAlign="center"
						color={TH_WHITE_60}
						style={{ marginTop: 32 }}
						value="No cards found"
					/>
				</Show>
			</PageContainer>
		</TabPageRoot>
	);
}

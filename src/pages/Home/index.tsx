import { Fragment, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import { CardView } from "@pages/Home/Card";

import { CardPreview } from "@components/Card/Preview";
import { PageContainer } from "@components/Containers";
import { HeaderSearch } from "@components/Header/HeaderSearch.tsx";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";
import { Show } from "@components/Show";
import { TabBar } from "@components/TabBar";

import { useSearchCards } from "@hooks/card/data.ts";
import { useMaskCardNumberValue } from "@hooks/preferences";

import { CardData } from "@t/card.ts";

export function Home() {
	return (
		<Routes>
			<Route index element={<HomePage />} />
			<Route path="cards/:cardId/*" element={<CardView />} />
		</Routes>
	);
}

function HomePage() {
	const [search, setSearch] = useState("");

	const cards = useSearchCards(search);

	return (
		<Fragment>
			<HeaderTitle title="Home" />
			<HeaderSearch value={search} onChange={setSearch} />

			<PageContainer className="space-y-4">
				<CardList cards={cards} />

				<Show when={false}>
					<Loading />
				</Show>

				<Show when={cards.length === 0}>
					<NoCardsFoundMessage />
				</Show>
			</PageContainer>

			<TabBar />
		</Fragment>
	);
}

function CardList({ cards }: { cards: CardData[] }) {
	const maskCardNumber = useMaskCardNumberValue();

	return cards.map(({ id, data }) => (
		<Link to={`cards/${id}`} key={id} className="block">
			<CardPreview card={data} maskCardNumber={maskCardNumber} />
		</Link>
	));
}

function Loading() {
	return null;
}

function NoCardsFoundMessage() {
	return <div className="text-center text-th-white/60 mt-8">No cards found</div>;
}

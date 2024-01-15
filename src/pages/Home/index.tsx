import { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { CardView } from "@pages/Home/CardView";

import { CardPreview } from "@components/Card/Preview";
import { PageContainer } from "@components/Containers";
import { HeaderSearch } from "@components/Header/HeaderSearch.tsx";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";
import { Show } from "@components/Show";
import { TabBar } from "@components/TabBar";

import { useAllCards } from "@hooks/card/data.ts";

export function Home() {
	return (
		<Routes>
			<Route index element={<HomePage />} />
			<Route path="cards/:cardId" element={<CardView />} />
		</Routes>
	);
}

function HomePage() {
	const [search, setSearch] = useState("");

	const cards = useAllCards();

	return (
		<Fragment>
			<HeaderTitle title="Home" />
			<HeaderSearch value={search} onChange={setSearch} />

			<PageContainer className="space-y-4">
				{cards.map(({ id, data }) => (
					<CardPreview key={id} card={data} />
				))}

				<Show when={cards.length === 0}>
					<div className="text-center text-th-white/60 mt-8">No cards found</div>
				</Show>
			</PageContainer>

			<TabBar />
		</Fragment>
	);
}

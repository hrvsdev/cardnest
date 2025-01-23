import { Fragment } from "react";
import { Link, Route, Routes } from "react-router-dom";

import { observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";

import { CardView } from "@pages/Home/Card";

import { CardPreview } from "@components/Card/Preview";
import { PageContainer } from "@components/Containers";
import { HeaderSearch } from "@components/Header/HeaderSearch.tsx";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";
import { Show, ShowAnimated } from "@components/Show";
import { Spacer } from "@components/Spacer";
import { TabBar } from "@components/TabBar";

import { cardsState } from "@data/card";
import { CardUnencrypted } from "@data/card/types.ts";

import { useMaskCardNumberValue } from "@hooks/preferences";

export function Home() {
	return (
		<Routes>
			<Route index element={<HomePage />} />
			<Route path="cards/:cardId/*" element={<CardView />} />
		</Routes>
	);
}

const queryState = observable("");

const useCardRecordList = () => {
	const cards = useSelector(cardsState);
	return Object.values(cards);
};

const useFilteredCardIds = (cards: CardUnencrypted[], query: string) => {
	if (query === "") return cards.map((it) => it.id);

	const filteredCards = cards.filter((it) => {
		const fields = [it.data.issuer, it.data.cardholder, it.data.number, it.data.network !== "other" ? it.data.network : ""];
		return fields.some((it) => it.toLowerCase().includes(query.toLowerCase()));
	});

	return filteredCards.map((it) => it.id);
};

function HomePage() {
	const query = useSelector(queryState);

	const cardRecordList = useCardRecordList();
	const filteredCardIds = useFilteredCardIds(cardRecordList, query);

	const totalNoOfCards = cardRecordList.length;
	const noOfResults = filteredCardIds.length;

	return (
		<Fragment>
			<HeaderTitle title="Home" />
			<HeaderSearch value={query} onChange={queryState.set} noOfResults={noOfResults} totalResults={totalNoOfCards} />

			<PageContainer>
				<CardList cards={cardRecordList} filteredIds={filteredCardIds} />

				<Show when={false}>
					<Loading />
				</Show>

				<Show when={totalNoOfCards === 0}>
					<NoCardsFoundMessage />
				</Show>
			</PageContainer>

			<TabBar />
		</Fragment>
	);
}

function CardList({ cards, filteredIds }: { cards: CardUnencrypted[]; filteredIds: string[] }) {
	const maskCardNumber = useMaskCardNumberValue();

	return cards.map(({ id, data }) => (
		<ShowAnimated key={id} when={filteredIds.includes(id)}>
			<Link to={`cards/${id}`} className="block">
				<CardPreview card={data} maskCardNumber={maskCardNumber} />
			</Link>
			<Spacer size={16} />
		</ShowAnimated>
	));
}

function Loading() {
	return null;
}

function NoCardsFoundMessage() {
	return <div className="text-center text-th-white/60 mt-8">No cards found</div>;
}

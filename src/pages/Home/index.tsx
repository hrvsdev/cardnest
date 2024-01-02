import { Fragment, useState } from "react";

import { Card } from "@components/Card";
import { PageContainer } from "@components/Containers";
import { HeaderSearch } from "@components/Header/HeaderSearch.tsx";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";

import { cardColorClassName } from "@utils/card.ts";

import { CardColor, CardDetails } from "@t/card";

export function Home() {
	const [search, setSearch] = useState("");

	return (
		<Fragment>
			<HeaderTitle title="Home" />
			<HeaderSearch value={search} onChange={setSearch} />

			<PageContainer className="space-y-4">
				{cards.map((card, index) => (
					<Card
						key={card.number}
						color={Object.keys(cardColorClassName)[index] as CardColor}
						card={card}
					/>
				))}
			</PageContainer>
		</Fragment>
	);
}

const cards: CardDetails[] = [
	{
		number: "4641060453063779",
		expiry: {
			month: 10,
			year: 2028
		},
		cardholder: "John Marston",
		network: "visa"
	},
	{
		number: "6521507140259291",
		expiry: {
			month: 12,
			year: 2028
		},
		cardholder: "Sadie Adler",
		network: "rupay"
	},
	{
		number: "5358542601766168",
		expiry: {
			month: 5,
			year: 2026
		},
		cardholder: "Abigail Roberts",
		network: "mastercard"
	},
	{
		number: "6011000990139424",
		expiry: {
			month: 12,
			year: 2025
		},
		cardholder: "Arthur Morgan",
		network: "discover"
	},
	{
		number: "3056930902590491",
		expiry: {
			month: 2,
			year: 2027
		},
		cardholder: "Karen Jones",
		network: "diners"
	},
	{
		number: "3714496353984317",
		expiry: {
			month: 6,
			year: 2029
		},
		cardholder: "Jack Marston",
		network: "amex"
	}
];

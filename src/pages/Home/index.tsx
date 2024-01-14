import { Fragment, useState } from "react";

import { Card } from "@components/Card";
import { PageContainer } from "@components/Containers";
import { HeaderSearch } from "@components/Header/HeaderSearch.tsx";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";
import { TabBar } from "@components/TabBar";

import { cardThemeStyles } from "@utils/card.ts";

import { CardTheme, CardDetails } from "@t/card";

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
						theme={Object.keys(cardThemeStyles)[index] as CardTheme}
						card={card}
					/>
				))}
			</PageContainer>

			<TabBar />
		</Fragment>
	);
}

const cards: CardDetails[] = [
	{
		number: "4641060453063779",
		expiry: "10/28",
		cardholder: "John Marston",
		network: "visa"
	},
	{
		number: "6521507140259291",
		expiry: "12/28",
		cardholder: "Sadie Adler",
		network: "rupay"
	},
	{
		number: "5358542601766168",
		expiry: "05/26",
		cardholder: "Abigail Roberts",
		network: "mastercard"
	},
	{
		number: "6011000990139424",
		expiry: "12/25",
		cardholder: "Arthur Morgan",
		network: "discover"
	},
	{
		number: "3056930902590491",
		expiry: "02/27",
		cardholder: "Karen Jones",
		network: "diners"
	},
	{
		number: "3714496353984317",
		expiry: "06/29",
		cardholder: "Jack Marston",
		network: "amex"
	}
];

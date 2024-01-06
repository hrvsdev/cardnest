import { Fragment } from "react";
import { Link } from "react-router-dom";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import { Card } from "@components/Card";
import { PageContainer } from "@components/Containers";

import { CardDetails } from "@t/card.ts";

const CARD_DETAILS: CardDetails = {
	cardholder: "John JM Marston",
	expiry: {
		month: 12,
		year: 2029
	},
	network: "visa",
	number: "1234567890123456"
};

export function AddCardEditor() {
	return (
		<Fragment>
			<SubPageHeader title="New Card" />
			<PageContainer>
				<Card color="sky" card={CARD_DETAILS} />
			</PageContainer>
		</Fragment>
	);
}

function SubPageHeader({ title }: { title: string }) {
	return (
		<div className="sticky top-0">
			<div className="flex items-center justify-center relative w-full h-12">
				<Link to=".." className="flex items-center gap-1 absolute left-0 h-full px-4">
					<ChevronLeftIcon strokeWidth={2.5} className="size-4" />
				</Link>
				<h1>{title}</h1>
			</div>
		</div>
	);
}

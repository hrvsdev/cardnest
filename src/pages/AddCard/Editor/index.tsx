import { ChangeEvent, Fragment, useState } from "react";
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
	const [cardNumber, setCardNumber] = useState("");

	const onCardInput = (e: ChangeEvent<HTMLInputElement>) => {
		const filteredCardNumber = e.target.value.replace(/\D/g, "");
		const formattedCardNumber = filteredCardNumber.replace(/(\d{4})/g, "$1 ").trim();
		setCardNumber(formattedCardNumber);
	};

	return (
		<Fragment>
			<SubPageHeader title="New Card" />
			<PageContainer className="space-y-8">
				<Card color="sky" card={CARD_DETAILS} />
				<div>
					<label className="block space-y-2">
						<p className="text-th-white/80 pl-2">Card number</p>
						<input
							type="text"
							maxLength={23}
							inputMode="numeric"
							value={cardNumber}
							onChange={onCardInput}
							className="w-full rounded-2xl px-4 py-3 tracking-widest placeholder:tracking-normal text-th-white bg-th-white bg-opacity-5 focus:bg-opacity-10"
							placeholder="Enter card number"
						/>
					</label>
				</div>
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

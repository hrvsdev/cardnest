import { ChangeEvent, Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import { Card } from "@components/Card";
import { PageContainer } from "@components/Containers";

import { CardDetails } from "@t/card.ts";

export function AddCardEditor() {
	const [cardNumber, setCardNumber] = useState("");
	const [expiry, setExpiry] = useState("");
	const [cardholder, setCardholder] = useState("");

	const onCardInput = (e: ChangeEvent<HTMLInputElement>) => {
		const filteredValue = e.target.value.replace(/\D/g, "");
		const formattedValue = filteredValue.replace(/(\d{4})/g, "$1 ").trim();
		setCardNumber(formattedValue);
	};

	const onExpiryInput = (e: ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;
		let filteredValue = value.replace(/\D/g, "");

		if (expiry.endsWith("/") && value.length === 2) {
			filteredValue = value;
		} else if (filteredValue.length >= 2) {
			filteredValue = `${filteredValue.slice(0, 2)}/${filteredValue.slice(2)}`;
		}

		setExpiry(filteredValue);
	};

	const onCardholderInput = (e: ChangeEvent<HTMLInputElement>) => {
		const filteredValue = e.target.value.replace(/[^a-zA-Z\s.'-]/g, "");
		setCardholder(filteredValue);
	};

	const CARD_DETAILS: CardDetails = {
		cardholder: cardholder.trim(),
		expiry: expiry,
		network: "visa",
		number: cardNumber.replace(/\s/g, "")
	};

	return (
		<Fragment>
			<SubPageHeader title="New Card" />
			<PageContainer>
				<Card color="sky" card={CARD_DETAILS} usePlaceholders />
				<div className="space-y-6 mt-8">
					<label className="block space-y-2">
						<p className="text-th-white/80 pl-2">Card number</p>
						<input
							type="text"
							maxLength={19}
							inputMode="numeric"
							value={cardNumber}
							onChange={onCardInput}
							className="w-full rounded-2xl px-4 py-3 tracking-widest placeholder:tracking-normal text-th-white bg-th-white bg-opacity-5 focus:bg-opacity-10"
							placeholder="Enter card number"
						/>
					</label>
					<label className="block space-y-2">
						<p className="text-th-white/80 pl-2">Expiry date</p>
						<input
							type="text"
							maxLength={5}
							inputMode="numeric"
							value={expiry}
							onChange={onExpiryInput}
							className="w-full rounded-2xl px-4 py-3 tracking-widest placeholder:tracking-normal text-th-white bg-th-white bg-opacity-5 focus:bg-opacity-10"
							placeholder="Enter card expiry date"
						/>
					</label>
					<label className="block space-y-2">
						<p className="text-th-white/80 pl-2">Cardholder</p>
						<input
							type="text"
							maxLength={30}
							value={cardholder}
							onChange={onCardholderInput}
							className="w-full rounded-2xl px-4 py-3 tracking-widest placeholder:tracking-normal text-th-white bg-th-white bg-opacity-5 focus:bg-opacity-10"
							placeholder="Enter cardholder name"
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

import { ChangeEvent, Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import { Card } from "@components/Card";
import { PageContainer } from "@components/Containers";
import { Input } from "@components/Input";

import { CardDetails, CardElement } from "@t/card.ts";

export function AddCardEditor() {
	const [cardNumber, setCardNumber] = useState("");
	const [expiry, setExpiry] = useState("");
	const [cardholder, setCardholder] = useState("");

	const [focused, setFocused] = useState<CardElement>();

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
				<Card color="sky" card={CARD_DETAILS} usePlaceholders focused={focused} />
				<div className="space-y-6 mt-8">
					<Input
						label="Card number"
						type="text"
						id="number"
						maxLength={19}
						inputMode="numeric"
						placeholder="Enter card number"
						value={cardNumber}
						onChange={onCardInput}
						onFocus={() => setFocused("number")}
						onBlur={() => setFocused(undefined)}
					/>
					<Input
						label="Expiry date"
						type="text"
						id="expiry"
						maxLength={5}
						inputMode="numeric"
						placeholder="Enter card expiry date"
						value={expiry}
						onChange={onExpiryInput}
						onFocus={() => setFocused("expiry")}
						onBlur={() => setFocused(undefined)}
					/>
					<Input
						label="Cardholder"
						type="text"
						id="cardholder"
						maxLength={30}
						placeholder="Enter cardholder name"
						value={cardholder}
						onChange={onCardholderInput}
						onFocus={() => setFocused("cardholder")}
						onBlur={() => setFocused(undefined)}
					/>
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

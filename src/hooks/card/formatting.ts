import { useMemo } from "react";

import { Card } from "@data/card/types.ts";

import { addSpaces, removeSpaces } from "@utils/card.ts";

export type Options = {
	usePlaceholders?: boolean;
	maskCardNumber?: boolean;
};

export type DisplayCardDetails = {
	number: string;
	expiry: string;
	cardholder: string;
	issuer: string;
};

export function useFormattedCardViewDetails(card: Card, options?: Options): DisplayCardDetails {
	const cardNumber = useMemo(() => {
		let number = removeSpaces(card.number);

		if (options?.usePlaceholders) number = number.padEnd(16, "•");
		if (options?.maskCardNumber) {
			const regex = /^(\d{4})(\d*)(\d{4})$/;
			number = number.replace(regex, (_, f, m, l) => `${f}${m.replace(/\d/g, "•")}${l}`);
		}

		return addSpaces(number);
	}, [card.number, options?.maskCardNumber]);

	const cardExpiry = useMemo(() => {
		let [month, year] = card.expiry.includes("/") ? card.expiry.split("/") : [card.expiry, ""];

		if (options?.usePlaceholders) {
			month = month.padEnd(2, "•");
			year = year.padEnd(2, "•");
		}

		return `${month}/${year}`;
	}, [card.expiry, options?.usePlaceholders]);

	return {
		number: cardNumber,
		expiry: cardExpiry,
		cardholder: card.cardholder.trim() || (options?.usePlaceholders ? "Your Name" : ""),
		issuer: card.issuer.trim() || (options?.usePlaceholders ? "Issuer/bank" : "")
	};
}

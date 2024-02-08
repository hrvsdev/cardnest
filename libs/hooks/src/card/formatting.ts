import { useMemo } from "react";

import { addSpaces, removeSpaces } from "@libs/utils/src/card.ts";

import { CardInfo, DisplayCardDetails } from "@libs/types/src/card";

export type Options = {
	usePlaceholders?: boolean;
	maskCardNumber?: boolean;
};

export function useFormattedCardViewDetails(card: CardInfo, options?: Options): DisplayCardDetails {
	const cardNumber = useMemo(() => {
		let number = removeSpaces(card.number);

		if (options?.usePlaceholders) number = number.padEnd(16, "•");
		if (options?.maskCardNumber) {
			const regex = /^(\d{4})(\d*)(\d{4})$/;
			number = number.replace(regex, (_, f, m, l) => `${f}${m.replace(/\d/g, "•")}${l}`);
		}

		return addSpaces(number);
	}, [card.number]);

	const cardExpiry = useMemo(() => {
		let [month, year] = card.expiry.includes("/") ? card.expiry.split("/") : [card.expiry, ""];

		if (options?.usePlaceholders) {
			month = month.padEnd(2, "•");
			year = year.padEnd(2, "•");
		}

		return `${month}/${year}`;
	}, [card.expiry]);

	const cardholderName = useMemo(() => {
		let name = card.cardholder;

		if (!name.trim() && options?.usePlaceholders) name = "Your Name";

		return name;
	}, [card.cardholder]);

	const issuerName = useMemo(() => {
		let issuer = card.issuer;

		if (!issuer.trim() && options?.usePlaceholders) issuer = "Issuer/bank";

		return issuer;
	}, [card.issuer]);

	return {
		number: cardNumber,
		expiry: cardExpiry,
		cardholder: cardholderName,
		issuer: issuerName
	};
}

import { useMemo } from "react";

import { Amex } from "@components/Logos/Amex.tsx";
import { Diners } from "@components/Logos/Diners.tsx";
import { Discover } from "@components/Logos/Discover.tsx";
import { MasterCard } from "@components/Logos/MasterCard.tsx";
import { Rupay } from "@components/Logos/Rupay.tsx";
import { Visa } from "@components/Logos/Visa.tsx";

import { CardDetails, FormattedCardDetails } from "@t/card.ts";

export type Options = {
	usePlaceholders?: boolean;
	maskCardNumber?: boolean;
};

export function useFormattedCardDetails(
	card: CardDetails,
	options?: Options
): FormattedCardDetails {
	const cardNumber = useMemo(() => {
		let number = card.number;

		if (options?.usePlaceholders) number = number.padEnd(16, "•");
		if (options?.maskCardNumber) {
			const regex = /^(\d{4})(\d*)(\d{4})$/;
			number = number.replace(regex, (_, f, m, l) => `${f}${m.replace(/\d/g, "•")}${l}`);
		}

		return number.replace(/(.{4})/g, "$1 ").trim();
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

	return {
		number: cardNumber,
		expiry: cardExpiry,
		cardholder: cardholderName
	};
}

export function useCardNetworkLogo(network: string) {
	return useMemo(() => {
		switch (network) {
			case "visa":
				return Visa;
			case "mastercard":
				return MasterCard;
			case "amex":
				return Amex;
			case "discover":
				return Discover;
			case "diners":
				return Diners;
			case "rupay":
				return Rupay;
			default:
				return () => null;
		}
	}, [network]);
}

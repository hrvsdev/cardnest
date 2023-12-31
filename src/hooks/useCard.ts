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
	useFullYear?: boolean;
};

export function useFormattedCardDetails(
	card: CardDetails,
	options?: Options
): FormattedCardDetails {
	const cardNumber = useMemo(() => {
		let number = card.number;

		if (options?.usePlaceholders) number = `${number}${"•".repeat(16 - number.length)}`;
		if (options?.maskCardNumber) {
			const regex = /^(\d{4})(\d*)(\d{4})$/;
			number = number.replace(regex, (_, f, m, l) => `${f}${m.replace(/\d/g, "•")}${l}`);
		}

		return number.replace(/(.{4})/g, "$1 ").trim();
	}, [card.number]);

	const cardExpiry = useMemo(() => {
		let month = card.expiry.month.toString().padStart(2, "0");
		let year = card.expiry.year.toString().slice(-2);

		if (options?.useFullYear) year = card.expiry.year.toString();
		if (options?.usePlaceholders) {
			month = "••";
			year = options.useFullYear ? "••••" : "••";
		}

		return `${month}/${year}`;
	}, [card.expiry]);

	const cardholderName = useMemo(() => {
		if (options?.usePlaceholders) return "Your Name";
		return card.cardholder;
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

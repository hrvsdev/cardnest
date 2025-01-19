import ky from "ky";

import { cardThemes } from "@theme/index.ts";

import { CardTheme, PaymentNetwork } from "@t/card.ts";

export const getRandomCardTheme = () => {
	return cardThemes[Math.floor(Math.random() * cardThemes.length)] as CardTheme;
};

export const addSpaces = (str: string) => str.replace(/(.{4})/g, "$1 ").trim();
export const removeSpaces = (str: string) => str.replace(/\s/g, "");

export const getApproxCardNetwork = async (cardNumber: string) => {
	let cardNetwork: PaymentNetwork = "other";

	const url = `https://data.handyapi.com/bin/${cardNumber.slice(0, 6)}`;

	try {
		const res: { Scheme?: String } = await ky(url).json();

		for (const [key, value] of Object.entries(cardMap)) {
			if (value.some((v) => res.Scheme?.toLowerCase().includes(v))) {
				cardNetwork = key as PaymentNetwork;
				break;
			}
		}
	} catch (e) {
		console.log(e);
	}

	return cardNetwork;
};

export const cardMap: Partial<Record<PaymentNetwork, Array<string>>> = {
	visa: ["visa"],
	amex: ["amex", "american"],
	diners: ["diners"],
	discover: ["discover"],
	mastercard: ["master", "maestro"],
	rupay: ["rupay"]
};

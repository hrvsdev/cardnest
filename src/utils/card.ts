import { Card } from "@data/card/types.ts";

import { cardThemes } from "@theme/index.ts";

export const addSpaces = (str: string) => str.replace(/(.{4})/g, "$1 ").trim();
export const removeSpaces = (str: string) => str.replace(/\s/g, "");

export function defaultCard(): Card {
	return {
		number: "",
		expiry: "",
		cardholder: "",
		issuer: "",
		cvv: "",
		network: "OTHER",
		theme: cardThemes[Math.floor(Math.random() * cardThemes.length)]
	};
}

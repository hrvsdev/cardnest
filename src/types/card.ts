export type CardNetwork = "visa" | "mastercard" | "amex" | "discover" | "diners" | "rupay";

export type CardDetails = {
	number: string;
	expiry: string;
	cardholder: string;
	network: CardNetwork;
};

export type FormattedCardDetails = {
	number: string;
	expiry: string;
	cardholder: string;
};

export type CardColor =
	| "sky"
	| "pink"
	| "red"
	| "cyan"
	| "yellow"
	| "blue"
	| "green"
	| "emerald"
	| "fuchsia"
	| "purple"
	| "violet"
	| "indigo"
	| "orange"
	| "teal"
	| "rose";

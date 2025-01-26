export type PaymentNetwork = "visa" | "mastercard" | "amex" | "discover" | "diners" | "rupay" | "other";

export type CardData = {
	id: string;
	data: CardFullProfile;
};

export type CardRecord = {
	id: string;
	encryptedData?: {
		iv: string;
		dataString: string;
	};
	plainData?: CardFullProfile;
};

export type CardFullProfile = CardInfo & CardPreferences;

export type CardInfo = {
	number: string;
	expiry: string;
	cardholder: string;
	issuer: string;
	network: PaymentNetwork;
};

export type CardPreferences = {
	theme: CardTheme;
};

export type DisplayCardDetails = {
	number: string;
	expiry: string;
	cardholder: string;
	issuer: string;
};

export type CardTheme =
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

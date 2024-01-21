export type PaymentNetwork =
	| "visa"
	| "mastercard"
	| "amex"
	| "discover"
	| "diners"
	| "rupay"
	| "other";

export type CardField = "number" | "expiry" | "cardholder";

export type CardData = {
	id: string;
	data: CardFullProfile;
};

export type CardFullProfile = CardInfo & CardPreferences;

export type CardInfo = {
	number: string;
	expiry: string;
	cardholder: string;
	network: PaymentNetwork;
};

export type CardPreferences = {
	theme: CardTheme;
};

export type DisplayCardDetails = {
	number: string;
	expiry: string;
	cardholder: string;
};

export type CardErrorsState = {
	number: string;
	expiry: string;
	cardholder: string;
};

export type CardEditorState = {
	data: CardFullProfile & CardFocusedState;
	editorState: CardFullProfile & CardFocusedState;
	errors: CardErrorsState;
	onSubmit: (cb: (data: CardFullProfile) => void) => () => void;
	setCardNumber: (cardNumber: string) => void;
	setExpiry: (expiry: string) => void;
	setCardholder: (cardholder: string) => void;
	setCardNetwork: (cardNetwork: PaymentNetwork) => void;
	setFocused: (focused?: CardField) => void;
	setTheme: (theme: CardTheme) => void;
};

export type CardFocusedState = {
	focused?: CardField;
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

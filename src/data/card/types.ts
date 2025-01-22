import { CardTheme, PaymentNetwork } from "@t/card.ts";

export type Card = {
	number: string;
	expiry: string;
	cardholder: string;
	issuer?: string;
	cvv?: string;
	network: PaymentNetwork;
	theme: CardTheme;
};

export type CardRecords = CardEncryptedRecords | CardUnencryptedRecords;

export type CardEncryptedRecords = {
	type: "ENCRYPTED";
	cards: Map<string, CardEncrypted>;
};

export type CardUnencryptedRecords = {
	type: "UNENCRYPTED";
	cards: Map<string, CardUnencrypted>;
};

export type CardData = CardEncryptedData | CardUnencryptedData;

export type CardEncryptedData = {
	type: "ENCRYPTED";
	data: CardEncrypted;
};

export type CardUnencryptedData = {
	type: "UNENCRYPTED";
	data: CardUnencrypted;
};

export type CardEncrypted = {
	id: string;
	data: EncryptedData;
	modifiedAt: number;
};

export type CardUnencrypted = {
	id: string;
	data: Card;
	modifiedAt: number;
};

export function CardEncryptedRecords(cards: Map<string, CardEncrypted> = new Map()): CardEncryptedRecords {
	return {
		type: "ENCRYPTED",
		cards: cards
	};
}

export function CardUnencryptedRecords(cards: Map<string, CardUnencrypted> = new Map()): CardUnencryptedRecords {
	return {
		type: "UNENCRYPTED",
		cards: cards
	};
}

export function CardEncryptedData(data: CardEncrypted): CardEncryptedData {
	return {
		type: "ENCRYPTED",
		data: data
	};
}

export function CardUnencryptedData(data: CardUnencrypted): CardUnencryptedData {
	return {
		type: "UNENCRYPTED",
		data: data
	};
}

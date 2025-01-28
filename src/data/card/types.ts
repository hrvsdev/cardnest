import { CardTheme, PaymentNetwork } from "@t/card.ts";

export type Card = {
	number: string;
	expiry: string;
	cardholder: string;
	issuer: string;
	cvv: string;
	network: PaymentNetwork;
	theme: CardTheme;
};

export type CardRecords = CardEncryptedRecords | CardUnencryptedRecords;

export type CardEncryptedRecords = {
	type: "ENCRYPTED";
	cards: Record<string, CardEncrypted>;
};

export type CardUnencryptedRecords = {
	type: "UNENCRYPTED";
	cards: Record<string, CardUnencrypted>;
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
	data: EncryptedDataEncoded;
	modifiedAt: number;
};

export type CardUnencrypted = {
	id: string;
	data: Card;
	modifiedAt: number;
};

export function CardEncryptedRecords(cards: Record<string, CardEncrypted> = {}): CardEncryptedRecords {
	return {
		type: "ENCRYPTED",
		cards: cards
	};
}

export function CardUnencryptedRecords(cards: Record<string, CardUnencrypted> = {}): CardUnencryptedRecords {
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

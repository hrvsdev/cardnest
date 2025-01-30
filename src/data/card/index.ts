import { observable } from "@legendapp/state";
import { useObserve } from "@legendapp/state/react";

import { authState, hasEnabledAuth } from "@data/auth";
import { addOrUpdateCard, cardRecordsState, setCards } from "@data/card/core.ts";
import {
	Card,
	CardData,
	CardEncrypted,
	CardEncryptedData,
	CardEncryptedRecords,
	CardUnencrypted,
	CardUnencryptedData,
	CardUnencryptedRecords
} from "@data/card/types.ts";

import { checkNotNull } from "@utils/conditions.ts";
import { decrypt, encrypt } from "@utils/crypto.ts";
import { decodeEncryptedData, encodeEncryptedData } from "@utils/encoding.ts";
import { toastAndLog } from "@utils/error.ts";

export const cardsState = observable<Record<string, CardUnencrypted>>({});

export function useDecryptAndCollectCards() {
	useObserve(cardRecordsState, async ({ value: cardRecords }) => {
		const updatedCards: Record<string, CardUnencrypted> = {};

		if (cardRecords == null) return;
		if (cardRecords.type === "UNENCRYPTED") {
			for (const [id, card] of Object.entries(cardRecords.cards)) updatedCards[id] = card;
		} else {
			for (const [id, card] of Object.entries(cardRecords.cards)) {
				try {
					const stateCard = cardsState[id].get() as CardUnencrypted | null;
					if (stateCard == null || stateCard.modifiedAt < card.modifiedAt) {
						updatedCards[id] = await decryptToCardUnencrypted(card);
					} else {
						updatedCards[id] = stateCard;
					}
				} catch (e) {
					toastAndLog(e);
				}
			}
		}

		cardsState.set(updatedCards);
	});
}

export function useCheckAndEncryptOrDecryptCards() {
	useObserve(hasEnabledAuth, async ({ previous, value: current }) => {
		const shouldEncrypt = previous === false && current === true;
		const shouldDecrypt = previous === true && current === false;

		if (shouldEncrypt) await encryptCards();
		else if (shouldDecrypt) await decryptCards();
	});
}

export async function encryptAndAddOrUpdateCard(cardUnencrypted: CardUnencrypted) {
	let cardData: CardData;

	if (hasEnabledAuth.get()) {
		cardData = CardEncryptedData(await encryptToCardEncrypted(cardUnencrypted));
	} else {
		cardData = CardUnencryptedData(cardUnencrypted);
	}

	addOrUpdateCard(cardData);
}

export function deleteAllCards() {
	setCards(hasEnabledAuth.get() ? CardEncryptedRecords() : CardUnencryptedRecords());
}

async function encryptCards() {
	const updatedCards: Record<string, CardEncrypted> = {};
	for (const [id, card] of Object.entries(cardsState.get())) updatedCards[id] = await encryptToCardEncrypted(card);

	setCards(CardEncryptedRecords(updatedCards));
}

async function decryptCards() {
	setCards(CardUnencryptedRecords(cardsState.get()));
}

async function encryptToCardEncrypted(card: CardUnencrypted): Promise<CardEncrypted> {
	const dek = checkNotNull(authState.dek.get(), "Encryption Key is not present, refresh and unlock app again to encrypt card data");
	const encryptedData = await encryptCard(card.data, dek);

	return { id: card.id, data: encryptedData, modifiedAt: Date.now() };
}

async function encryptCard(card: Card, dek: CryptoKey): Promise<EncryptedDataEncoded> {
	const serialized = JSON.stringify(card);
	const encrypted = await encrypt(serialized, dek);

	return encodeEncryptedData(encrypted);
}

async function decryptToCardUnencrypted(card: CardEncrypted): Promise<CardUnencrypted> {
	const dek = checkNotNull(authState.dek.get(), "Encryption Key is not present, refresh and unlock app again to decrypt card data");
	const decryptedData = await decryptCardData(card.data, dek);

	return { id: card.id, data: decryptedData, modifiedAt: card.modifiedAt };
}

async function decryptCardData(cardEncrypted: EncryptedDataEncoded, dek: CryptoKey): Promise<Card> {
	const encryptedData = decodeEncryptedData(cardEncrypted);
	const decryptedString = await decrypt(encryptedData, dek);

	return JSON.parse(decryptedString);
}

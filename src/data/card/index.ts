import { observable, observe, when } from "@legendapp/state";
import { useObserve } from "@legendapp/state/react";

import { authState, hasEnabledAuth } from "@data/auth";
import {
	addOrUpdateCard,
	cardRecordsState,
	getRemoteCards,
	onRemoteCardsChange,
	setCards,
	setLocalCards,
	setRemoteCards
} from "@data/card/core.ts";
import {
	Card,
	CardData,
	CardEncrypted,
	CardEncryptedData,
	CardEncryptedRecords,
	CardRecords,
	CardUnencrypted,
	CardUnencryptedData,
	CardUnencryptedRecords
} from "@data/card/types.ts";
import { appDataState } from "@data/index.ts";
import { isSignedIn } from "@data/user";

import { checkNotNull } from "@utils/conditions.ts";
import { decrypt, encrypt } from "@utils/crypto.ts";
import { decodeEncryptedData, encodeEncryptedData } from "@utils/encoding.ts";
import { toastAndLog } from "@utils/error.ts";

export const cardsState = observable<Record<string, CardUnencrypted>>({});

export function useDecryptAndCollectCards() {
	useObserve(isSignedIn, async (e) => {
		await when(() => appDataState.areCardsMerging.get() === false);

		if (e.value) {
			e.onCleanup = onRemoteCardsChange(decryptAndSetCardsState);
		} else {
			e.onCleanup = observe(cardRecordsState, (e) => decryptAndSetCardsState(e.value));
		}
	});
}

export async function encryptAndAddOrUpdateCard(cardUnencrypted: CardUnencrypted) {
	let cardData: CardData;

	if (hasEnabledAuth.get()) {
		cardData = CardEncryptedData(await encryptToCardEncrypted(cardUnencrypted));
	} else {
		cardData = CardUnencryptedData(cardUnencrypted);
	}

	await addOrUpdateCard(cardData);
}

export async function deleteAllCards() {
	const cardRecords = hasEnabledAuth.get() ? CardEncryptedRecords() : CardUnencryptedRecords();
	await setCards(cardRecords);
}

export async function mergeCards() {
	const mergedCards: Record<string, CardEncrypted> = {};

	for (const [id, card] of Object.entries(cardsState.get())) mergedCards[id] = await encryptToCardEncrypted(card);
	for (const [id, card] of Object.entries((await getRemoteCards()).cards)) mergedCards[id] = card;

	await setRemoteCards(CardEncryptedRecords(mergedCards));
	setLocalCards(CardUnencryptedRecords());

	appDataState.areCardsMerging.set(false);
}

export function resetLocalCards() {
	setLocalCards(CardUnencryptedRecords());
}

export async function resetRemoteCards() {
	await setRemoteCards(CardEncryptedRecords());
}

export async function encryptCards() {
	const cards: Record<string, CardEncrypted> = {};
	for (const [id, card] of Object.entries(cardsState.get())) cards[id] = await encryptToCardEncrypted(card);

	await setCards(CardEncryptedRecords(cards));
}

export async function decryptCards() {
	await setCards(CardUnencryptedRecords(cardsState.get()));
}

async function decryptAndSetCardsState(cardRecords: CardRecords | null | undefined) {
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

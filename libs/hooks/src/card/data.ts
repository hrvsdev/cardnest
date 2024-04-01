import { atom, useAtomValue, useSetAtom } from "jotai";

import { hasCreatedPinAtom, pinAtom } from "../auth";
import { atomWithStorageAuto } from "../utils.ts";

import { decrypt, encrypt, generateKey } from "@libs/utils/src/encryption.ts";
import { genId } from "@libs/utils/src/id.ts";

import { CardData, CardFullProfile, CardRecord } from "@libs/types/src/card";

const KEY = "cardnest/cards";
const SALT = "SOME R1ND0M SAL7";

// HOOKS
export const useCard = (id: string | undefined) => {
	if (!id) return null;
	return useAtomValue(cardsAtom)[id];
};

export const useAddCard = () => useSetAtom(addCardAtom);
export const useUpdateCard = () => useSetAtom(updateCardAtom);
export const useDeleteCard = () => useSetAtom(deleteCardAtom);

export const useSearchCards = (query: string) => {
	const cards = useAtomValue(cardsAtom);
	const lowerQuery = query.trim().toLowerCase();

	if (lowerQuery === "") return Object.values(cards);

	const out: CardData[] = [];

	for (const key in cards) {
		const card = cards[key];

		const toSearch = `${card.data.number} ${card.data.network} ${card.data.issuer}`;

		if (toSearch.toLowerCase().includes(lowerQuery)) {
			out.push(card);
		}
	}

	return out;
};

export const useDeleteAllCards = () => useSetAtom(deleteAllCardsAtom);

export const useChangeOrAddCardsPin = () => useSetAtom(changeOrAddCardsPinAtom);
export const useRemoveCardsPin = () => useSetAtom(removeCardsPinAtom);

// BASE ATOMS
const cardRecordsAtom = atomWithStorageAuto<Record<string, CardRecord>>(KEY, {});

// DERIVED ATOMS
const cardsAtom = atom(async (get) => {
	const hasCreatedPin = await get(hasCreatedPinAtom);
	const pin = get(pinAtom);

	const cards = await get(cardRecordsAtom);
	const out: Record<string, CardData> = {};

	if (hasCreatedPin) {
		if (!pin) throw new Error("No pin found");

		const key = await generateKey(pin, SALT);

		try {
			await Promise.all(
				Object.keys(cards).map(async (id) => {
					const card = cards[id];

					if (!card.encryptedData) throw new Error("Data Error: No encrypted data found");

					const data = await decrypt(card.encryptedData.dataString, key, card.encryptedData.iv);
					const cardData = JSON.parse(data) as CardFullProfile;

					out[id] = { id, data: cardData };
				})
			);
		} catch (e) {
			console.error("Encryption Error: Incorrect PIN", e);
		}
	} else {
		for (const id in cards) {
			const card = cards[id];

			if (!card.plainData) throw new Error("Data Error: No unencrypted data found");

			out[id] = { id, data: card.plainData };
		}
	}

	return out;
});

const addCardAtom = atom(null, async (get, set, card: CardFullProfile) => {
	const hasCreatedPin = await get(hasCreatedPinAtom);
	const pin = get(pinAtom);

	const id = genId();

	const cardToAdd: CardRecord = { id };

	if (hasCreatedPin) {
		if (!pin) throw new Error("Encryption Error: No pin found");

		const key = await generateKey(pin, SALT);
		cardToAdd.encryptedData = await encrypt(JSON.stringify(card), key);
	} else {
		cardToAdd.plainData = card;
	}

	await set(cardRecordsAtom, async (d) => ({ ...(await d), [id]: cardToAdd }));

	return id;
});

const updateCardAtom = atom(null, async (get, set, { id, data }: CardData) => {
	const hasCreatedPin = await get(hasCreatedPinAtom);
	const pin = get(pinAtom);

	const cardToUpdate: CardRecord = { id };

	if (hasCreatedPin) {
		if (!pin) throw new Error("Encryption Error: No pin found");

		const key = await generateKey(pin, SALT);
		cardToUpdate.encryptedData = await encrypt(JSON.stringify(data), key);
	} else {
		cardToUpdate.plainData = data;
	}

	await set(cardRecordsAtom, async (d) => ({ ...(await d), [id]: cardToUpdate }));
});

const deleteCardAtom = atom(null, async (_, set, id: string) => {
	await set(cardRecordsAtom, async (c) => {
		const cards = await c;
		delete cards[id];
		return { ...cards };
	});
});

const deleteAllCardsAtom = atom(null, async (_, set) => {
	await set(cardRecordsAtom, {});
});

const changeOrAddCardsPinAtom = atom(null, async (get, set, newPin: string) => {
	const hasCreatedPin = await get(hasCreatedPinAtom);
	const pin = get(pinAtom);

	const cards = await get(cardRecordsAtom);
	const newCards: Record<string, CardRecord> = {};

	const newKey = await generateKey(newPin, SALT);

	if (hasCreatedPin) {
		if (!pin) throw new Error("Encryption Error: No pin found");

		const key = await generateKey(pin, SALT);

		await Promise.all(
			Object.keys(cards).map(async (id) => {
				const card = cards[id];

				if (!card.encryptedData) throw new Error("Data Error: No encrypted data found");

				const data = await decrypt(card.encryptedData.dataString, key, card.encryptedData.iv);
				const encrypted = await encrypt(data, newKey);

				newCards[id] = { id, encryptedData: encrypted };
			})
		);
	} else {
		for (const id in cards) {
			const card = cards[id];

			if (!card.plainData) throw new Error("Data Error: No unencrypted data found");

			const encrypted = await encrypt(JSON.stringify(card.plainData), newKey);

			newCards[id] = { id, encryptedData: encrypted };
		}
	}

	await set(cardRecordsAtom, newCards);
});

const removeCardsPinAtom = atom(null, async (get, set) => {
	const pin = get(pinAtom);

	const cards = await get(cardRecordsAtom);
	const newCards: Record<string, CardRecord> = {};

	if (!pin) throw new Error("Encryption Error: No pin found");

	const key = await generateKey(pin, SALT);

	try {
		await Promise.all(
			Object.keys(cards).map(async (id) => {
				const card = cards[id];

				if (!card.encryptedData) throw new Error("Data Error: No encrypted data found");

				const data = await decrypt(card.encryptedData.dataString, key, card.encryptedData.iv);

				newCards[id] = { id, plainData: JSON.parse(data) };
			})
		);
	} catch (e) {
		console.error(e);
	}

	await set(cardRecordsAtom, newCards);
});

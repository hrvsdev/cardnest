import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { hasCreatedPinAtom, pinAtom } from "../auth";

import { decrypt, encrypt, generateKey } from "@libs/utils/src/encryption.ts";
import { genId } from "@libs/utils/src/id.ts";
import { getFromLocalStorage } from "@libs/utils/src/local-storage.ts";

import { CardData, CardFullProfile, CardRecord } from "@libs/types/src/card";

const KEY = "cardnest/cards";
const SALT = "SOME R1ND0M SAL7";

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

const cardRecordsAtom = atomWithStorage<Record<string, CardRecord>>(
	KEY,
	getFromLocalStorage(KEY) ?? {}
);

const cardsAtom = atom(async (get) => {
	const hasCreatedPin = get(hasCreatedPinAtom);
	const pin = get(pinAtom);

	const cards = get(cardRecordsAtom);
	const out: Record<string, CardData> = {};

	if (hasCreatedPin) {
		if (!pin) throw new Error("No pin found");

		const key = await generateKey(pin, SALT);

		try {
			await Promise.all(
				Object.keys(cards).map(async (id) => {
					const card = cards[id];

					if (!card.data) throw new Error("Data Error: No encrypted data found");

					const data = await decrypt(card.data.encryptedData, key, card.data.iv);
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

			if (!card.unEncryptedData) throw new Error("Data Error: No unencrypted data found");

			out[id] = { id, data: card.unEncryptedData };
		}
	}

	return out;
});

const addCardAtom = atom(null, async (get, set, card: CardFullProfile) => {
	const hasCreatedPin = get(hasCreatedPinAtom);
	const pin = get(pinAtom);

	const id = genId();

	if (hasCreatedPin) {
		if (!pin) throw new Error("Encryption Error: No pin found");

		const key = await generateKey(pin, SALT);
		const encrypted = await encrypt(JSON.stringify(card), key);

		set(cardRecordsAtom, (d) => ({ ...d, [id]: { id, data: encrypted } }));
	} else {
		set(cardRecordsAtom, (d) => ({ ...d, [id]: { id, unEncryptedData: card } }));
	}

	return id;
});

const updateCardAtom = atom(null, async (get, set, { id, data }: CardData) => {
	const hasCreatedPin = get(hasCreatedPinAtom);
	const pin = get(pinAtom);

	if (hasCreatedPin) {
		try {
			if (!pin) throw new Error("Encryption Error: No pin found");

			const key = await generateKey(pin, SALT);
			const encrypted = await encrypt(JSON.stringify(data), key);

			set(cardRecordsAtom, (cards) => ({ ...cards, [id]: { id, data: encrypted } }));
		} catch (e) {
			console.error(e);
		}
	} else {
		set(cardRecordsAtom, (cards) => ({ ...cards, [id]: { id, unEncryptedData: data } }));
	}
});

const deleteCardAtom = atom(null, (_, set, id: string) => {
	set(cardRecordsAtom, (cards) => {
		delete cards[id];
		return { ...cards };
	});
});

const deleteAllCardsAtom = atom(null, (_, set) => {
	set(cardRecordsAtom, {});
});

const changeOrAddCardsPinAtom = atom(null, async (get, set, newPin: string) => {
	const hasCreatedPin = get(hasCreatedPinAtom);
	const pin = get(pinAtom);

	const cards = get(cardRecordsAtom);
	const newCards: Record<string, CardRecord> = {};

	const newKey = await generateKey(newPin, SALT);

	try {
		if (hasCreatedPin) {
			if (!pin) throw new Error("Encryption Error: No pin found");

			const key = await generateKey(pin, SALT);

			await Promise.all(
				Object.keys(cards).map(async (id) => {
					const card = cards[id];

					if (!card.data) throw new Error("Data Error: No encrypted data found");

					const data = await decrypt(card.data.encryptedData, key, card.data.iv);
					const encrypted = await encrypt(data, newKey);

					newCards[id] = { id, data: encrypted };
				})
			);
		} else {
			for (const id in cards) {
				const card = cards[id];

				if (!card.unEncryptedData) throw new Error("Data Error: No unencrypted data found");

				const encrypted = await encrypt(JSON.stringify(card.unEncryptedData), newKey);

				newCards[id] = { id, data: encrypted };
			}
		}
	} catch (e) {
		console.error(e);
	}

	set(cardRecordsAtom, newCards);
});

const removeCardsPinAtom = atom(null, async (get, set) => {
	const pin = get(pinAtom);

	const cards = get(cardRecordsAtom);
	const newCards: Record<string, CardRecord> = {};

	if (!pin) throw new Error("Encryption Error: No pin found");

	const key = await generateKey(pin, SALT);

	try {
		await Promise.all(
			Object.keys(cards).map(async (id) => {
				const card = cards[id];

				if (!card.data) throw new Error("Data Error: No encrypted data found");

				const data = await decrypt(card.data.encryptedData, key, card.data.iv);

				newCards[id] = { id, unEncryptedData: JSON.parse(data) };
			})
		);
	} catch (e) {
		console.error(e);
	}

	set(cardRecordsAtom, newCards);
});

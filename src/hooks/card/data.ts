import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { keyAtom } from "@hooks/auth";
import { decrypt, encrypt, generateKey } from "@utils/encryption.ts";
import { genId } from "@utils/id.ts";
import { getFromLocalStorage } from "@utils/local-storage.ts";

import { CardData, CardEncryptedData, CardFullProfile } from "@t/card.ts";

const KEY = "cardnest/cards";
const SALT = "SOME R1ND0M SAL7";

const encryptedCardsAtom = atomWithStorage<Record<string, CardEncryptedData>>(
	KEY,
	getFromLocalStorage(KEY) ?? {}
);

const cardsAtom = atom(async (get) => {
	let out: Record<string, CardData> = {};

	const pin = get(keyAtom);
	if (!pin) return out;

	const encrypted = get(encryptedCardsAtom);
	const key = await generateKey(pin, SALT);

	try {
		await Promise.all(
			Object.keys(encrypted).map(async (id) => {
				const card = encrypted[id];
				const data = await decrypt(card.data.encryptedData, key, card.data.iv);
				const cardData = JSON.parse(data) as CardFullProfile;

				out[id] = { id, data: cardData };
			})
		);
	} catch (e) {
		console.error("Failed to decrypt cards");
	}

	return out;
});

const getAllCardsAtom = atom(async (get) => {
	return Object.values(await get(cardsAtom));
});

const addCardAtom = atom(null, async (get, set, card: CardFullProfile) => {
	const pin = get(keyAtom);
	if (!pin) return;

	const id = genId();
	const key = await generateKey(pin, SALT);
	const encrypted = await encrypt(JSON.stringify(card), key);

	set(encryptedCardsAtom, (d) => ({ ...d, [id]: { id, data: encrypted } }));
});

const updateCardAtom = atom(null, async (get, set, { id, data }: CardData) => {
	const pin = get(keyAtom);
	if (!pin) return;

	const key = await generateKey(pin, SALT);
	const encrypted = await encrypt(JSON.stringify(data), key);

	set(encryptedCardsAtom, (cards) => ({ ...cards, [id]: { id, data: encrypted } }));
});

const deleteCardAtom = atom(null, (_, set, id: string) => {
	set(encryptedCardsAtom, (cards) => {
		delete cards[id];
		return { ...cards };
	});
});

export const useAllCards = () => useAtomValue(getAllCardsAtom);
export const useCard = (id: string | undefined) => {
	if (!id) return null;
	return useAtomValue(cardsAtom)[id];
};

export const useAddCard = () => useSetAtom(addCardAtom);
export const useUpdateCard = () => useSetAtom(updateCardAtom);
export const useDeleteCard = () => useSetAtom(deleteCardAtom);

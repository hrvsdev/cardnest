import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { genId } from "@utils/id.ts";

import { CardData, CardFullProfile } from "@t/card.ts";

const cardsAtom = atomWithStorage<Record<string, CardData>>("cardnest/cards", {});

const getAllCardsAtom = atom((get) => {
	return Object.values(get(cardsAtom));
});

const addCardAtom = atom(null, (_, set, card: CardFullProfile) => {
	const id = genId();
	const newCard = { id, data: card };
	set(cardsAtom, (cards) => ({ ...cards, [id]: newCard }));
});

const updateCardAtom = atom(null, (_, set, cardData: CardData) => {
	set(cardsAtom, (cards) => ({ ...cards, [cardData.id]: cardData }));
});

const deleteCardAtom = atom(null, (_, set, id: string) => {
	set(cardsAtom, (cards) => {
		delete cards[id];
		return { ...cards };
	});
});

export const useAllCards = () => useAtomValue(getAllCardsAtom);
export const useCard = (id: string) => {
	return useAtomValue(cardsAtom)[id];
};

export const useAddCard = () => useSetAtom(addCardAtom);
export const useUpdateCard = () => useSetAtom(updateCardAtom);
export const useDeleteCard = () => useSetAtom(deleteCardAtom);

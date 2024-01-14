import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { CardDetails, CardTheme } from "@t/card.ts";

type Meta = {
	theme: CardTheme;
};

type Cards = Array<CardDetails & Meta>;

const cardsAtom = atomWithStorage<Cards>("cardnest/cards", []);

export const useCards = () => useAtom(cardsAtom);
export const useCardsValue = () => useAtomValue(cardsAtom);
export const useSetCards = () => useSetAtom(cardsAtom);

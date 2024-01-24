import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { getFromLocalStorage } from "@utils/local-storage.ts";

type Interactions = {
	hasSkippedPinCreation: boolean;
};

const KEY = "cardnest/interactions";

const defaultValue: Interactions = {
	hasSkippedPinCreation: false
};

const interactionsAtom = atomWithStorage<Interactions>(
	KEY,
	getFromLocalStorage(KEY) ?? defaultValue
);

const hasSkippedPinCreationAtom = atom(
	(get) => get(interactionsAtom).hasSkippedPinCreation,
	(get, set, value: boolean) => {
		set(interactionsAtom, { ...get(interactionsAtom), hasSkippedPinCreation: value });
	}
);

export const useHasSkippedPinCreation = () => useAtom(hasSkippedPinCreationAtom);

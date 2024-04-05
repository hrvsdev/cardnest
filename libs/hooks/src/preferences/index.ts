import { atom, useAtom, useAtomValue } from "jotai";

import { atomWithStorageAuto } from "../utils.ts";

type Preferences = {
	userInterface: {
		maskCardNumber: boolean;
	};
	interactions: {
		hasSkippedPinCreation: boolean;
	};
};

const defaultValue: Preferences = {
	userInterface: {
		maskCardNumber: true
	},
	interactions: {
		hasSkippedPinCreation: false
	}
};

const KEY = "cardnest/preferences";

const preferencesAtom = atomWithStorageAuto<Preferences>(KEY, defaultValue);

const hasSkippedPinCreationAtom = atom(
	async (get) => {
		return (await get(preferencesAtom)).interactions.hasSkippedPinCreation;
	},
	async (get, set, value: boolean) => {
		const preferences = await get(preferencesAtom);
		preferences.interactions.hasSkippedPinCreation = value;
		await set(preferencesAtom, { ...preferences });
	}
);

const maskCardNumberAtom = atom(
	async (get) => {
		return (await get(preferencesAtom)).userInterface.maskCardNumber;
	},
	async (get, set, value: boolean) => {
		const preferences = await get(preferencesAtom);
		preferences.userInterface.maskCardNumber = value;
		await set(preferencesAtom, { ...preferences });
	}
);

export const useHasSkippedPinCreation = () => useAtom(hasSkippedPinCreationAtom);

export const useMaskCardNumber = () => useAtom(maskCardNumberAtom);
export const useMaskCardNumberValue = () => useAtomValue(maskCardNumberAtom);

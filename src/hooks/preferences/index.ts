import { useAtom, useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";

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

const hasSkippedPinCreationAtom = focusAtom(preferencesAtom, (s) => {
	return s.prop("interactions").prop("hasSkippedPinCreation");
});

const maskCardNumberAtom = focusAtom(preferencesAtom, (s) => {
	return s.prop("userInterface").prop("maskCardNumber");
});

export const useHasSkippedPinCreation = () => useAtom(hasSkippedPinCreationAtom);

export const useMaskCardNumber = () => useAtom(maskCardNumberAtom);
export const useMaskCardNumberValue = () => useAtomValue(maskCardNumberAtom);

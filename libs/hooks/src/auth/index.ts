import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { hashPin, verifyPin } from "@libs/utils/src/encryption.ts";
import { getFromLocalStorage } from "@libs/utils/src/local-storage.ts";

type PinData = {
	data: {
		pin: string;
	};
};

const KEY = "cardnest/pin-data";

export const useSetPin = () => useSetAtom(setPinAtom);
export const useRemovePin = () => useSetAtom(removePinAtom);

export const useVerifyPin = () => useSetAtom(verifyPinAtom);
export const useVerifyAndSetPin = () => useSetAtom(verifyAndSetPinAtom);

export const useIsAuthenticatedValue = () => useAtomValue(isAuthenticatedAtom);
export const useHasCreatedPin = () => useAtomValue(hasCreatedPinAtom);

export const pinAtom = atom<string | null>(null);
export const pinDataAtom = atomWithStorage<PinData | null>(KEY, getFromLocalStorage(KEY));

export const isAuthenticatedAtom = atom((get) => Boolean(get(pinAtom)));
export const hasCreatedPinAtom = atom((get) => Boolean(get(pinDataAtom)?.data.pin));

const setPinAtom = atom(null, async (_, set, pin: string) => {
	const hashed = await hashPin(pin);

	set(pinAtom, pin);
	set(pinDataAtom, { data: { pin: hashed } });
});

const verifyPinAtom = atom(null, async (get, _, pin: string) => {
	return pin === get(pinAtom);
});

const verifyAndSetPinAtom = atom(null, async (get, set, pin: string) => {
	const out = false;

	const pinData = get(pinDataAtom);

	if (!pinData?.data.pin) throw new Error("No pin data found");

	try {
		const isCorrect = await verifyPin(pin, pinData.data.pin);
		if (isCorrect) set(pinAtom, pin);
	} catch (e) {
		console.error(e);
	}

	return out;
});

const removePinAtom = atom(null, async (_, set) => {
	set(pinDataAtom, null);
	set(pinAtom, null);
});

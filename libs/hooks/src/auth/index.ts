import { atom, useAtomValue, useSetAtom } from "jotai";

import { atomWithStorageAuto } from "../utils.ts";

import { hashPin, verifyPin } from "@libs/utils/src/encryption.ts";

type PinData = {
	data: {
		pin: string;
	};
};

const KEY = "cardnest/pin-data";

// HOOKS
export const useSetPin = () => useSetAtom(setPinAtom);
export const useRemovePin = () => useSetAtom(removePinAtom);

export const useVerifyPin = () => useSetAtom(verifyPinAtom);
export const useVerifyAndSetPin = () => useSetAtom(verifyAndSetPinAtom);

export const useIsAuthenticatedValue = () => useAtomValue(isAuthenticatedAtom);
export const useHasCreatedPin = () => useAtomValue(hasCreatedPinAtom);

// BASE ATOMS
export const pinAtom = atom<string | null>(null);
export const pinDataAtom = atomWithStorageAuto<PinData | null>(KEY, null);

// DERIVED ATOMS
export const isAuthenticatedAtom = atom((get) => Boolean(get(pinAtom)));
export const hasCreatedPinAtom = atom((get) => Boolean(get(pinDataAtom)?.data.pin));

const setPinAtom = atom(null, (_, set, pin: string) => {
	hashPin(pin).then((hashed) => {
		set(pinAtom, pin);
		set(pinDataAtom, { data: { pin: hashed } });
	});
});

const verifyPinAtom = atom(null, (get, _, pin: string) => {
	return pin === get(pinAtom);
});

const verifyAndSetPinAtom = atom(null, async (get, set, pin: string) => {
	let out = false;

	const pinData = get(pinDataAtom);

	if (!pinData?.data.pin) throw new Error("No pin data found");

	try {
		const isCorrect = await verifyPin(pin, pinData.data.pin);
		if (isCorrect) {
			set(pinAtom, pin);
			out = true;
		}
	} catch (e) {
		console.error(e);
	}

	return out;
});

const removePinAtom = atom(null, (_, set) => {
	set(pinDataAtom, null);
	set(pinAtom, null);
});

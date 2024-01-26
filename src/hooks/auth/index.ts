import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { hashPin, verifyPin } from "@utils/encryption.ts";
import { getFromLocalStorage } from "@utils/local-storage.ts";

type PinData = {
	data: {
		pin: string;
	};
};

const KEY = "cardnest/pin-data";

export const pinAtom = atom<string | null>(null);
const pinDataAtom = atomWithStorage<PinData | null>(KEY, getFromLocalStorage(KEY));

const isAuthenticatedAtom = atom((get) => Boolean(get(pinAtom)));
const hasPinAtom = atom((get) => Boolean(get(pinDataAtom)?.data.pin));

const setPinAtom = atom(null, async (_, set, pin: string) => {
	const hashed = await hashPin(pin);

	set(pinAtom, pin);
	set(pinDataAtom, { data: { pin: hashed } });
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

export const useSetPin = () => useSetAtom(setPinAtom);
export const useVerifyAndSetPin = () => useSetAtom(verifyAndSetPinAtom);
export const useIsAuthenticatedValue = () => useAtomValue(isAuthenticatedAtom);
export const useHasPinValue = () => useAtomValue(hasPinAtom);

import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { hashPin } from "@utils/encryption.ts";

type PinData = {
	data: {
		pin: string;
	};
};

const KEY = "cardnest/pin-data";

export const pinAtom = atom<string | null>(null);
const pinDataAtom = atomWithStorage<PinData | null>(KEY, null);

const isAuthenticatedAtom = atom((get) => Boolean(get(pinAtom)));

const hasPinDataAtom = atom((get) => Boolean(get(pinDataAtom)));

const setPinDataAtom = atom(null, async (_, set, pin: string) => {
	const hashed = await hashPin(pin);
	set(pinDataAtom, { data: { pin: hashed } });
});

export const UseSetPin = () => useSetAtom(pinAtom);
export const UseIsAuthenticatedValue = () => useAtomValue(isAuthenticatedAtom);

export const UseHasPin = () => useAtomValue(hasPinDataAtom);
export const UseSetPinData = () => useSetAtom(setPinDataAtom);

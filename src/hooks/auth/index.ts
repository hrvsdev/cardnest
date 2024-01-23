import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const KEY = "cardnest/hasCreatedPin";

export const hasCreatedPin = atomWithStorage(KEY, false);

export const pinAtom = atom<string | null>(null);

export const isAuthenticatedAtom = atom((get) => Boolean(get(pinAtom)));

export const useHasCreatedPinValue = () => useAtomValue(hasCreatedPin);
export const setHasCreatedPin = () => useSetAtom(hasCreatedPin);

export const UseSetKey = () => useSetAtom(pinAtom);
export const UseIsAuthenticatedValue = () => useAtomValue(isAuthenticatedAtom);

import { atom, useAtomValue, useSetAtom } from "jotai";

export const pinAtom = atom<string | null>(null);

export const isAuthenticatedAtom = atom((get) => Boolean(get(pinAtom)));

export const UseSetKey = () => useSetAtom(pinAtom);
export const UseIsAuthenticatedValue = () => useAtomValue(isAuthenticatedAtom);

import { atom, useAtom, useAtomValue } from "jotai";

const isAuthenticatedAtom = atom(false);

export const isAuthenticated = () => useAtom(isAuthenticatedAtom);
export const isAuthenticatedValue = () => useAtomValue(isAuthenticatedAtom);

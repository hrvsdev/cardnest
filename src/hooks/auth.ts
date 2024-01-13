import { atom, useAtom, useAtomValue } from "jotai";

const isAuthenticatedAtom = atom(false);

export const UseIsAuthenticated = () => useAtom(isAuthenticatedAtom);
export const UseIsAuthenticatedValue = () => useAtomValue(isAuthenticatedAtom);

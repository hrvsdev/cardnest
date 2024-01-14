import { atom, useAtomValue, useSetAtom } from "jotai";

const isAuthenticatedAtom = atom(false);

export const UseIsAuthenticatedValue = () => useAtomValue(isAuthenticatedAtom);
export const UseSetIsAuthenticated = () => useSetAtom(isAuthenticatedAtom);

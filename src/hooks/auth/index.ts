import { atom, useAtomValue, useSetAtom } from "jotai";

const isAuthenticatedAtom = atom(process.env.NODE_ENV === "development");

export const UseIsAuthenticatedValue = () => useAtomValue(isAuthenticatedAtom);
export const UseSetIsAuthenticated = () => useSetAtom(isAuthenticatedAtom);

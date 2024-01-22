import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { getFromLocalStorage } from "@utils/local-storage";

const KEY = "cardnest/key";

export const keyAtom = atomWithStorage<string | null>(KEY, getFromLocalStorage(KEY));

export const isAuthenticatedAtom = atom((get) => Boolean(get(keyAtom)));

export const UseSetKey = () => useSetAtom(keyAtom);
export const UseIsAuthenticatedValue = () => useAtomValue(isAuthenticatedAtom);

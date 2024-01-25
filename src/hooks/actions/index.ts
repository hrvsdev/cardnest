import { atom, useAtomValue, useSetAtom } from "jotai";

type AsyncAction = () => Promise<void>;

type Actions = {
	afterPinCreated: AsyncAction | null;
};

const actionsAtom = atom<Actions>({ afterPinCreated: null });

const afterPinCreatedAtom = atom(
	(get) => get(actionsAtom).afterPinCreated,
	(get, set, action: AsyncAction | null) => {
		set(actionsAtom, { ...get(actionsAtom), afterPinCreated: action });
	}
);

export const useAfterPinCreated = () => useAtomValue(afterPinCreatedAtom);
export const useSetAfterPinCreated = () => useSetAtom(afterPinCreatedAtom);

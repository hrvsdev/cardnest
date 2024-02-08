import { atom, useAtomValue, useSetAtom } from "jotai";
import { focusAtom } from "jotai-optics";

type Action = () => void;
type AsyncAction = () => Promise<void>;

type Actions = {
	afterPinCreated: AsyncAction | null;
	afterPinVerified: Action | null;
};

const actionsAtom = atom<Actions>({ afterPinCreated: null, afterPinVerified: null });

const afterPinCreatedAtom = focusAtom(actionsAtom, (o) => o.prop("afterPinCreated"));
const afterPinVerifiedAtom = focusAtom(actionsAtom, (o) => o.prop("afterPinVerified"));

export const useAfterPinCreated = () => useAtomValue(afterPinCreatedAtom);
export const useSetAfterPinCreated = () => useSetAtom(afterPinCreatedAtom);

export const useAfterPinVerified = () => useAtomValue(afterPinVerifiedAtom);
export const useSetAfterPinVerified = () => useSetAtom(afterPinVerifiedAtom);

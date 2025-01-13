import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { SyncStringStorage } from "jotai/vanilla/utils/atomWithStorage";

const getLocalStorage = (): SyncStringStorage => {
	return localStorage;
};

export const atomWithStorageAuto = <T>(key: string, initialValue: T) => {
	const storage = createJSONStorage<T>(getLocalStorage);
	return atomWithStorage<T>(key, initialValue, storage, { getOnInit: true });
};

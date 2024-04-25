import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { SyncStringStorage } from "jotai/vanilla/utils/atomWithStorage";
import { MMKV } from "react-native-mmkv";

import { isNative } from "@libs/utils/src/platform.ts";

const getMMKVStorage = (): SyncStringStorage => {
	const storage = new MMKV({ id: "cardnest" });
	return {
		getItem: (key) => {
			const value = storage.getString(key);
			return value ? value : null;
		},
		setItem: (key, value) => {
			storage.set(key, value);
		},
		removeItem: (key) => {
			storage.delete(key);
		}
	};
};

const getLocalStorage = (): SyncStringStorage => {
	return localStorage;
};

export const atomWithStorageAuto = <T>(key: string, initialValue: T) => {
	const storage = createJSONStorage<T>(isNative() ? getMMKVStorage : getLocalStorage);
	return atomWithStorage<T>(key, initialValue, storage, { getOnInit: true });
};

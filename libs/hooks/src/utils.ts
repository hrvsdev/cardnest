import AsyncStorage from "@react-native-async-storage/async-storage";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

import { isNative } from "@libs/utils/src/platform.ts";

export const atomWithStorageAuto = <T>(key: string, initialValue: T) => {
	let storage: any;
	if (isNative()) {
		storage = createJSONStorage<T>(() => AsyncStorage);
	} else {
		storage = createJSONStorage<T>(() => localStorage);
	}
	return atomWithStorage<T>(key, initialValue, storage, { getOnInit: true });
};

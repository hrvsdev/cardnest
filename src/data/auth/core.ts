import { observable } from "@legendapp/state";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { synced } from "@legendapp/state/sync";

import { AuthData, PinData } from "@data/auth/types.ts";

export const authData = observable<AuthData>(
	synced({
		initial: {},
		persist: { name: "cardnest/auth", plugin: ObservablePersistLocalStorage }
	})
);

export function setPinData(data: PinData | null) {
	authData.pin.set(data);
}

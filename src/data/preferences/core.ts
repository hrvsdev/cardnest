import { observable } from "@legendapp/state";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { synced } from "@legendapp/state/sync";

import { defaultPreferences } from "@data/preferences/types.ts";

export const preferencesState = observable(
	synced({
		initial: defaultPreferences(),
		persist: { name: "cardnest/preferences", plugin: ObservablePersistLocalStorage }
	})
);

export function setMaskCardNumber(maskCardNumber: boolean) {
	preferencesState.userInterface.maskCardNumber.set(maskCardNumber);
}

export function checkUpdatesAtLaunch(checkUpdatesAtLaunch: boolean) {
	preferencesState.updates.checkAtLaunch.set(checkUpdatesAtLaunch);
}

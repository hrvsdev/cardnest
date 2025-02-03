import { observable } from "@legendapp/state";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { synced } from "@legendapp/state/sync";

import { onValue, remove, set } from "@firebase/database";
import { getReference } from "@firebase/index.ts";

import { AuthData, PasswordData, PinData, RemoteAuthData } from "@data/auth/types.ts";
import { initialUserState } from "@data/user";

import { checkNotNull } from "@utils/conditions.ts";
import { ExtendedError } from "@utils/error.ts";

export const authData = observable<AuthData>(
	synced({
		initial: {},
		persist: { name: "cardnest/auth", plugin: ObservablePersistLocalStorage }
	})
);

export const remoteAuthData = observable<RemoteAuthData | null>(null);

export function onRemoteAuthDataChange(onChange: (data: RemoteAuthData | null) => void) {
	const ref = getReference(getUid(), "auth");
	return onValue(ref, (snapshot) => onChange(snapshot.val()));
}

export function setLocalPasswordData(data: PasswordData | null) {
	authData.password.set(data);
}

export function setLocalPinData(data: PinData | null) {
	authData.pin.set(data);
}

export async function setRemotePasswordData(data: PasswordData) {
	try {
		const ref = getReference(getUid(), "auth/password");
		await set(ref, data);
	} catch (e) {
		throw new ExtendedError("Failed to set password on server", e);
	}
}

export async function removeRemotePasswordData() {
	try {
		const ref = getReference(getUid(), "auth/password");
		await remove(ref);
	} catch (e) {
		throw new ExtendedError("Failed to remove password from server", e);
	}
}

function getUid() {
	return checkNotNull(initialUserState.uid.get(), "User must be signed in to perform auth operations");
}

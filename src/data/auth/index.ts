import { observable, when } from "@legendapp/state";
import { useObserve, useSelector } from "@legendapp/state/react";

import {
	authData,
	onRemoteAuthDataChange,
	remoteAuthData,
	removeRemotePasswordData,
	setLocalPasswordData,
	setLocalPinData,
	setRemotePasswordData
} from "@data/auth/core.ts";
import { AuthState, PasswordData, PinData } from "@data/auth/types.ts";
import { appDataState } from "@data/index.ts";
import { initialUserState, isInitiallySignedIn } from "@data/user";

import { checkNotNull } from "@utils/conditions.ts";
import { decodeKey, decrypt, deriveKey, encodeKey, encrypt, generateKey, generateSalt } from "@utils/crypto.ts";
import { decode, decodeEncryptedData, encode, encodeEncryptedData } from "@utils/encoding.ts";
import { ExtendedError, toastAndLog } from "@utils/error.ts";

export const authState = observable<AuthState>({ dek: null });

export const hasCreatedPassword = observable(() => authData.password.get() != null);
export const hasCreatedPin = observable(() => authData.pin.get() != null);
export const hasEnabledAuth = observable(() => hasCreatedPassword.get() || hasCreatedPin.get());

export const isAuthenticated = observable(() => authState.dek.get() != null);

export const useHasCreatedPassword = () => useSelector(hasCreatedPassword);
export const useHasCreatedPin = () => useSelector(hasCreatedPin);
export const useHasEnabledAuth = () => useSelector(hasEnabledAuth);

export const useIsAuthenticated = () => useSelector(isAuthenticated);

export function useCollectRemoteAuthData() {
	useObserve(initialUserState, async (e) => {
		appDataState.remoteAuth.set(false);
		remoteAuthData.set(null);

		await when(isInitiallySignedIn);

		try {
			e.onCleanup = onRemoteAuthDataChange((data) => {
				remoteAuthData.set(data);
				appDataState.remoteAuth.set(true);
			});
		} catch (e) {
			toastAndLog(e);
		}
	});
}

export async function createAndSetPassword(password: string) {
	const salt = generateSalt();
	const dek = await getOrCreateDek();

	const encryptedDek = await encryptDek(dek, password, salt);
	const data: PasswordData = { salt: encode(salt), encryptedDek: encodeEncryptedData(encryptedDek), modifiedAt: Date.now() };

	authState.dek.set(dek);

	await setRemotePasswordData(data);
	setLocalPasswordData(data);
}

export async function setLocalPassword(password: string) {
	const remotePasswordData = checkNotNull(remoteAuthData.password.get(), "Sign-in with Google first to set password");
	const dek = await decryptDek(remotePasswordData.encryptedDek, password, remotePasswordData.salt);

	authState.dek.set(dek);

	setLocalPasswordData(remotePasswordData);
	setLocalPinData(null);
}

export async function unlockWithPassword(password: string) {
	const passwordData = checkNotNull(authData.password.get(), "Complete sign-in process or update password to unlock app");
	const dek = await decryptDek(passwordData.encryptedDek, password, passwordData.salt);

	authState.dek.set(dek);
}

export async function createAndSetPin(pin: string) {
	const salt = generateSalt();
	const dek = await getOrCreateDek();

	const encryptedDek = await encryptDek(dek, pin, salt);
	const data: PinData = { salt: encode(salt), encryptedDek: encodeEncryptedData(encryptedDek), modifiedAt: Date.now() };

	authState.dek.set(dek);
	setLocalPinData(data);
}

export async function removePin() {
	setLocalPinData(null);
}

export async function verifyPin(pin: string) {
	const pinData = checkNotNull(authData.pin.get(), "Create PIN first to verify");
	await decryptDek(pinData.encryptedDek, pin, pinData.salt);
}

export async function unlockWithPin(pin: string) {
	const pinData = checkNotNull(authData.pin.get(), "Create PIN first to unlock app using PIN");
	const dek = await decryptDek(pinData.encryptedDek, pin, pinData.salt);

	authState.dek.set(dek);
}

export function resetLocalAuthData() {
	authData.set({ password: null, pin: null });
}

export async function resetRemoteAuthData() {
	await removeRemotePasswordData();
}

async function getOrCreateDek(): Promise<CryptoKey> {
	const dek = authState.dek.get();

	if (dek != null) {
		return dek;
	}

	const hasAnyAuthData = hasEnabledAuth.get();

	if (hasAnyAuthData) {
		throw new Error("Refresh and unlock app again to proceed");
	}

	return await generateKey();
}

async function encryptDek(dek: CryptoKey, secret: string, salt: ArrayBuffer): Promise<EncryptedData> {
	const kek = await deriveKey(secret, salt);
	const dekEncoded = await encodeKey(dek);

	return await encrypt(dekEncoded, kek);
}

async function decryptDek(encryptedDek: EncryptedDataEncoded, secret: string, salt: string): Promise<CryptoKey> {
	try {
		const kek = await deriveKey(secret, decode(salt));
		const dekEncoded = await decrypt(decodeEncryptedData(encryptedDek), kek);

		return await decodeKey(dekEncoded);
	} catch (e) {
		throw new ExtendedError("", e);
	}
}

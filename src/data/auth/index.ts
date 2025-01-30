import { observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";

import { authData, setPinData } from "@data/auth/core.ts";
import { AuthState, PinData } from "@data/auth/types.ts";

import { decodeKey, decrypt, deriveKey, encodeKey, encrypt, generateKey, generateSalt } from "@utils/crypto.ts";
import { decode, decodeEncryptedData, encode, encodeEncryptedData } from "@utils/encoding.ts";

export const authState = observable<AuthState>({ dek: null });

export const hasCreatedPin = observable(() => authData.pin.get() != null);
export const hasEnabledAuth = observable(() => hasCreatedPin.get());

export const isAuthenticated = observable(() => authState.dek.get() != null);

export const useHasCreatedPin = () => useSelector(hasCreatedPin);
export const useHasEnabledAuth = () => useSelector(hasEnabledAuth);

export const useIsAuthenticated = () => useSelector(isAuthenticated);

export async function createAndSetPin(pin: string) {
	const salt = generateSalt();
	const dek = await getOrCreateDek();

	const encryptedDek = await encryptDek(dek, pin, salt);
	const data: PinData = { salt: encode(salt), encryptedDek: encodeEncryptedData(encryptedDek), modifiedAt: Date.now() };

	authState.dek.set(dek);
	setPinData(data);
}

export async function removePin() {
	setPinData(null);
}

export async function verifyPin(pin: string) {
	const pinData = authData.pin.get();

	if (pinData == null) {
		throw new Error("Create PIN first to verify");
	}

	await decryptDek(pinData.encryptedDek, pin, pinData.salt);
}

export async function unlockWithPin(pin: string) {
	const pinData = authData.pin.get();

	if (pinData == null) {
		throw new Error("Create PIN first to unlock app using PIN");
	}

	const dek = await decryptDek(pinData.encryptedDek, pin, pinData.salt);
	authState.dek.set(dek);
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
		throw new Error("");
	}
}

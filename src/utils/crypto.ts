import { decode, encode } from "@utils/encoding.ts";

const KEY_SIZE = 256;
const KEY_ITERATION_COUNT = 210000;
const KEY_ALGORITHM = "PBKDF2";
const KEY_HASH = "SHA-512";

const ENCRYPTION_ALGORITHM = "AES-GCM";

export async function deriveKey(password: string, salt: ArrayBuffer): Promise<CryptoKey> {
	const encodedPassword = new TextEncoder().encode(password);

	const algorithm: Pbkdf2Params = {
		name: KEY_ALGORITHM,
		salt: salt,
		iterations: KEY_ITERATION_COUNT,
		hash: KEY_HASH
	};

	const derivedKeyType: AesDerivedKeyParams = { name: ENCRYPTION_ALGORITHM, length: KEY_SIZE };
	const keyUsages: KeyUsage[] = ["encrypt", "decrypt"];

	try {
		const importedKey = await crypto.subtle.importKey("raw", encodedPassword, KEY_ALGORITHM, false, ["deriveKey"]);
		return await crypto.subtle.deriveKey(algorithm, importedKey, derivedKeyType, true, keyUsages);
	} catch (e) {
		throw new Error("Failed to derive key");
	}
}

export async function generateKey(): Promise<CryptoKey> {
	const algorithm: AesKeyGenParams = { name: ENCRYPTION_ALGORITHM, length: KEY_SIZE };
	const keyUsages: KeyUsage[] = ["encrypt", "decrypt"];

	try {
		return await crypto.subtle.generateKey(algorithm, true, keyUsages);
	} catch (e) {
		throw new Error("Failed to generate key");
	}
}

export function generateSalt(): ArrayBuffer {
	return crypto.getRandomValues(new Uint8Array(16)).buffer;
}

export async function encrypt(plainText: string, key: CryptoKey): Promise<EncryptedData> {
	const encodedPlainText = new TextEncoder().encode(plainText);

	const iv = crypto.getRandomValues(new Uint8Array(12));
	const algorithm: AesGcmParams = { name: ENCRYPTION_ALGORITHM, iv };

	try {
		const encryptedData = await crypto.subtle.encrypt(algorithm, key, encodedPlainText);
		return { ciphertext: encryptedData, iv: iv.buffer };
	} catch (e) {
		throw new Error("Failed to encrypt data");
	}
}

export async function decrypt(encryptedData: EncryptedData, key: CryptoKey): Promise<string> {
	const algorithm: AesGcmParams = { name: ENCRYPTION_ALGORITHM, iv: encryptedData.iv };

	try {
		const decryptedData = await crypto.subtle.decrypt(algorithm, key, encryptedData.ciphertext);
		return new TextDecoder().decode(decryptedData);
	} catch (e) {
		throw new Error("Failed to decrypt data");
	}
}

export async function encodeKey(key: CryptoKey): Promise<string> {
	const exportedKey = await crypto.subtle.exportKey("raw", key);
	return encode(exportedKey);
}

export async function decodeKey(encodedKey: string): Promise<CryptoKey> {
	const decodedKey = decode(encodedKey);

	const keyUsages: KeyUsage[] = ["encrypt", "decrypt"];
	return crypto.subtle.importKey("raw", decodedKey, ENCRYPTION_ALGORITHM, true, keyUsages);
}

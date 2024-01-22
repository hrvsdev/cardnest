const crypto = window.crypto;

export async function generateKey(pin: string, salt: string) {
	const encoder = new TextEncoder();
	const encodedPin = encoder.encode(pin);
	const encodedSalt = encoder.encode(salt);

	return await crypto.subtle
		.importKey("raw", encodedPin, { name: "PBKDF2" }, false, ["deriveKey"])
		.then(async (baseKey) => {
			return await crypto.subtle.deriveKey(
				{
					name: "PBKDF2",
					salt: encodedSalt,
					iterations: 100000,
					hash: "SHA-256"
				},
				baseKey,
				{ name: "AES-GCM", length: 256 },
				true,
				["encrypt", "decrypt"]
			);
		});
}

export async function encrypt(data: string, key: CryptoKey) {
	const encoder = new TextEncoder();
	const encodedData = encoder.encode(data);

	const iv = crypto.getRandomValues(new Uint8Array(12));

	return await crypto.subtle
		.encrypt({ name: "AES-GCM", iv: iv }, key, encodedData)
		.then((encryptedData) => {
			return {
				iv: iv,
				encryptedData: encryptedData,
				encryptedDataString: new TextDecoder().decode(encryptedData)
			};
		});
}

export async function decrypt(data: ArrayBuffer, key: CryptoKey, iv: Uint8Array) {
	return await crypto.subtle
		.decrypt({ name: "AES-GCM", iv: iv }, key, data)
		.then((decryptedData) => {
			return new TextDecoder().decode(decryptedData);
		});
}

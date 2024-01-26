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
	const ivString = btoa(String.fromCharCode.apply(null, iv as any));

	const encryptedData = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, encodedData);
	const encryptedDataString = btoa(
		String.fromCharCode.apply(null, new Uint8Array(encryptedData) as any)
	);

	return {
		iv: ivString,
		encryptedData: encryptedDataString
	};
}

export async function decrypt(data: string, key: CryptoKey, iv: string) {
	const ivArray = new Uint8Array(Array.from(atob(iv), (c) => c.charCodeAt(0)));
	const dataArray = new Uint8Array(Array.from(atob(data), (c) => c.charCodeAt(0)));

	const decryptedData = await crypto.subtle.decrypt(
		{ name: "AES-GCM", iv: ivArray },
		key,
		dataArray
	);

	return new TextDecoder().decode(decryptedData);
}

export async function hashPin(pin: string) {
	const encoder = new TextEncoder();
	const encodedPin = encoder.encode(pin);

	const hash = await crypto.subtle.digest("SHA-256", encodedPin);
	const hashArray = Array.from(new Uint8Array(hash));

	return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

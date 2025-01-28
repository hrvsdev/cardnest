export function encode(data: ArrayBuffer): string {
	return btoa(String.fromCharCode(...new Uint8Array(data)));
}

export function decode(data: string): ArrayBuffer {
	return Uint8Array.from(atob(data), (c) => c.charCodeAt(0)).buffer;
}

export function encodeEncryptedData(data: EncryptedData): EncryptedDataEncoded {
	return {
		ciphertext: encode(data.ciphertext),
		iv: encode(data.iv)
	};
}

export function decodeEncryptedData(data: EncryptedDataEncoded): EncryptedData {
	return {
		ciphertext: decode(data.ciphertext),
		iv: decode(data.iv)
	};
}

export function encode(data: ArrayBuffer): string {
	return btoa(String.fromCharCode(...new Uint8Array(data)));
}

export function decode(data: string): ArrayBuffer {
	return Uint8Array.from(atob(data), (c) => c.charCodeAt(0)).buffer;
}

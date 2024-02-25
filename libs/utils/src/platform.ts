export function isNative() {
	return typeof window === "undefined";
}

export function isWeb() {
	return typeof window !== "undefined";
}

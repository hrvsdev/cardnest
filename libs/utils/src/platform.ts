export function isNative() {
	return !window.document
}

export function isWeb() {
	return !!window.document
}

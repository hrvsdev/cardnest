export function c(...cx: Array<string | number | boolean | null | undefined>) {
	return cx.filter(Boolean).join(" ");
}

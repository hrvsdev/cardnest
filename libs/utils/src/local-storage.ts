export const getFromLocalStorage = <T = any>(key: string): T | null => {
	return JSON.parse(localStorage.getItem(key) || "null") ?? null;
};

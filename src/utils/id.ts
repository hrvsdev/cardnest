import { customAlphabet } from "nanoid/non-secure";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const genId = (length: number = 8) => {
	return customAlphabet(CHARS, length)();
};

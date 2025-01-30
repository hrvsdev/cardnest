import { InvalidStateError } from "@utils/error.ts";

export function checkNotNull<T>(value: T | null | undefined, message: string): NonNullable<T> {
	if (value == null) {
		throw new InvalidStateError(message);
	}

	return value;
}

export class ExtendedError extends Error {
	constructor(message?: string, cause?: unknown) {
		super(message, { cause });
		this.name = "ExtendedError";
	}
}

export class InvalidStateError extends ExtendedError {
	constructor(message?: string, cause?: unknown) {
		super(message, cause);
		this.name = "InvalidStateError";
	}
}

export class InvalidArgumentError extends ExtendedError {
	constructor(message?: string, cause?: unknown) {
		super(message, cause);
		this.name = "InvalidArgumentError";
	}
}

export function toast(e: unknown) {
	if (e instanceof Error && e.message && e.message.trim().length > 0) {
		// TODO: Implement toast
		console.log(`Toast: ${e.message}`);
	}
}

export function log(e: unknown) {
	if (e instanceof Error && process.env.NODE_ENV === "development") {
		console.error(e);
	}
}

export function toastAndLog(e: unknown) {
	toast(e);
	log(e);
}

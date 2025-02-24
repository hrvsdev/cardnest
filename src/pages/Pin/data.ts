import { useEffect, useMemo, useRef, useState } from "react";

import { useTimeout } from "@hooks/timeout.ts";

import { PIN_LENGTH } from "@utils/auth.ts";
import { toastAndLog } from "@utils/error.ts";

export function usePinState() {
	const [pin, setPin] = useState("");
	const [hasError, setHasError] = useState(false);
	const [showErrorMessage, setShowErrorMessage] = useState(false);

	const onSubmitRef = useRef<(() => Promise<void>) | undefined>(undefined);

	const withTimeout = useTimeout();

	const hasMaxLength = useMemo(() => pin.length === PIN_LENGTH, [pin]);

	useEffect(() => {
		if (hasMaxLength && onSubmitRef.current) {
			onPinSubmit(onSubmitRef.current);
		}
	}, [hasMaxLength]);

	const setOnSubmit = (onSubmit: () => Promise<void>) => {
		onSubmitRef.current = onSubmit;
	};

	const onPinSubmit = (afterValidation: () => Promise<void>) => {
		afterValidation().catch((e) => {
			toastAndLog(e);
			onError();
		});
	};

	const onKeyClick = (key: string | number) => {
		setShowErrorMessage(false);

		if (pin.length < PIN_LENGTH) {
			setPin((prev) => prev + key);
		}
	};

	const onBackspaceClick = () => {
		setPin((prev) => prev.slice(0, -1));
	};

	const resetPin = () => {
		setPin("");
	};

	const onError = () => {
		setHasError(true);
		setShowErrorMessage(true);

		withTimeout(() => {
			resetPin();
			setHasError(false);
		}, 1000);
	};

	return {
		pin,
		hasError,
		showErrorMessage,
		hasMaxLength,
		setOnSubmit,
		onPinSubmit,
		onKeyClick,
		onBackspaceClick
	};
}

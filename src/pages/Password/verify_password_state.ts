import { useEffect, useRef, useState } from "react";

import { toastAndLog } from "@utils/error.ts";

export function useVerifyPasswordState() {
	const currentPasswordRef = useRef<HTMLInputElement>(null);

	const [currentPasswordValue, setCurrentPasswordValue] = useState("");

	const [isVerifying, setIsVerifying] = useState(false);
	const [isCurrentPasswordIncorrect, setIsCurrentPasswordIncorrect] = useState(false);

	const onPinSubmit = (afterValidation: () => Promise<void>) => {
		if (currentPasswordValue.length < 12 || isCurrentPasswordIncorrect) {
			onCurrentPasswordError();
			return;
		}

		setIsVerifying(true);
		afterValidation().catch((e) => {
			toastAndLog(e);
			onCurrentPasswordError();
		});
	};

	const onCurrentPasswordError = () => {
		currentPasswordRef.current?.focus();
		setIsCurrentPasswordIncorrect(true);
		setIsVerifying(false);
	};

	useEffect(() => {
		currentPasswordRef.current?.focus();
	}, []);

	useEffect(() => {
		if (isCurrentPasswordIncorrect) setIsCurrentPasswordIncorrect(false);
	}, [currentPasswordValue]);

	useEffect(() => {
		if (isCurrentPasswordIncorrect) currentPasswordRef.current?.focus();
	}, [isCurrentPasswordIncorrect]);

	return {
		currentPasswordValue,
		setCurrentPasswordValue,
		currentPasswordRef,
		isVerifying,
		isCurrentPasswordIncorrect,
		onPinSubmit
	};
}

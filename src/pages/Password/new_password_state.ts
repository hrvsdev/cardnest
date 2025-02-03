import { useEffect, useMemo, useRef, useState } from "react";

import { toastAndLog } from "@utils/error.ts";

export function useNewPasswordState() {
	const newPasswordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);

	const [newPasswordValue, setNewPasswordValue] = useState("");
	const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

	const [isCreating, setIsCreating] = useState(false);
	const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
	const [hasNewPasswordSubmitted, setHasNewPasswordSubmitted] = useState(false);

	const requirements = useMemo(() => {
		return [
			{ text: "12 characters or more", isValid: newPasswordValue.length >= 12 },
			{ text: "At least 1 uppercase letter", isValid: /[A-Z]/.test(newPasswordValue) },
			{ text: "At least 1 lowercase letter", isValid: /[a-z]/.test(newPasswordValue) },
			{ text: "At least 1 number", isValid: /[0-9]/.test(newPasswordValue) },
			{ text: "At least 1 special character", isValid: /[^a-zA-Z0-9]/.test(newPasswordValue) }
		];
	}, [newPasswordValue]);

	const doesNewPasswordContainsSpaces = newPasswordValue.includes(" ");
	const isNewPasswordSecure = requirements.every((r) => r.isValid);

	const showRequirements = newPasswordValue.length > 0 && !isNewPasswordSecure;
	const showDoPasswordsMatchInfo = hasNewPasswordSubmitted && confirmPasswordValue.length > 0;

	const doPasswordsMatch = newPasswordValue === confirmPasswordValue;

	const onPinSubmit = (afterValidation: () => Promise<void>) => {
		if (!isNewPasswordSecure) {
			onNewPasswordError();
			return;
		}

		if (!hasNewPasswordSubmitted) {
			setHasNewPasswordSubmitted(true);
			return;
		}

		if (!doPasswordsMatch) {
			confirmPasswordRef.current?.focus();
			return;
		}

		setIsCreating(true);
		afterValidation().catch((e) => {
			toastAndLog(e);
			onNewPasswordError();
		});
	};

	const onNewPasswordError = () => {
		newPasswordRef.current?.focus();
		setIsCreating(false);
	};

	useEffect(() => {
		if (isNewPasswordFocused) setHasNewPasswordSubmitted(false);
	}, [isNewPasswordFocused]);

	useEffect(() => {
		if (hasNewPasswordSubmitted) confirmPasswordRef.current?.focus();
	}, [hasNewPasswordSubmitted]);

	return {
		newPasswordValue,
		setNewPasswordValue,
		confirmPasswordValue,
		setConfirmPasswordValue,
		newPasswordRef,
		confirmPasswordRef,
		isCreating,
		isNewPasswordFocused,
		setIsNewPasswordFocused,
		hasNewPasswordSubmitted,
		requirements,
		doesNewPasswordContainsSpaces,
		isNewPasswordSecure,
		showRequirements,
		showDoPasswordsMatchInfo,
		doPasswordsMatch,
		onPinSubmit
	};
}

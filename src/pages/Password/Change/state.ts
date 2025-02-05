import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useNewPasswordState } from "@pages/Password/new_password_state.ts";
import { useVerifyPasswordState } from "@pages/Password/verify_password_state.ts";

import { createAndSetPassword, verifyPassword } from "@data/auth";

export function useChangePasswordState() {
	const navigate = useNavigate();

	const verificationState = useVerifyPasswordState();
	const creationState = useNewPasswordState();

	const [isVerified, setIsVerified] = useState(false);

	const isNewPasswordEqualToCurrentPassword =
		creationState.newPasswordValue.length > 0 && creationState.newPasswordValue === verificationState.currentPasswordValue;

	const onSubmit = () => {
		if (isVerified) {
			onCreatePassword();
			return;
		}

		verificationState.onPinSubmit(async () => {
			await verifyPassword(verificationState.currentPasswordValue);
			setIsVerified(true);
		});
	};

	const onCreatePassword = () => {
		if (isNewPasswordEqualToCurrentPassword) {
			creationState.newPasswordRef.current?.focus();
			return;
		}

		creationState.onPinSubmit(async () => {
			await createAndSetPassword(creationState.newPasswordValue);
			navigate("/user/security");
		});
	};

	useEffect(() => {
		if (isVerified) creationState.newPasswordRef.current?.focus();
	}, [isVerified]);

	return {
		...verificationState,
		...creationState,
		isVerified,
		isNewPasswordEqualToCurrentPassword,
		onSubmit
	};
}

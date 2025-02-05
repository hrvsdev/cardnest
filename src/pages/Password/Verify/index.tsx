import { FormEvent } from "react";

import { ForgotPasswordBottomSheet } from "@pages/Password/ForgotPasswordBottomSheet.tsx";
import { useVerifyPasswordState } from "@pages/Password/verify_password_state.ts";

import { openBottomSheet } from "@components/BottomSheet/state.ts";
import { Button } from "@components/Button";
import { SubPageRoot } from "@components/Containers";
import { PasswordInput } from "@components/Input/PasswordInput.tsx";
import { PasswordInfo } from "@components/Password/PasswordInfo.tsx";
import { Spacer } from "@components/Spacer";

import { afterPasswordVerified } from "@data/actions";
import { verifyPassword } from "@data/auth";

export function VerifyPassword() {
	const state = useVerifyPasswordState();

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		state.onPinSubmit(async () => {
			await verifyPassword(state.currentPasswordValue);
			await afterPasswordVerified.run();
		});
	};

	const onForgotPassword = () => {
		openBottomSheet(<ForgotPasswordBottomSheet context="VERIFICATION" hasCreatedPin={true} />, () => {
			// Nothing
		});
	};

	return (
		<SubPageRoot title="" actionLabel="Forgot password?" onAction={onForgotPassword}>
			<Spacer size={32} />
			<div>
				<h1 className="text-th-white text-xl font-bold text-center mb-2">Verify your password</h1>

				<p className="text-center">Verify your password to confirm and proceed</p>
			</div>

			<Spacer size={32} />
			<form className="flex flex-col grow" onSubmit={onSubmit}>
				<PasswordInput
					ref={state.currentPasswordRef}
					value={state.currentPasswordValue}
					placeholder="Enter password"
					isLoading={state.isVerifying}
					onChange={(e) => state.setCurrentPasswordValue(e.target.value)}
				/>

				<Spacer size={8} />
				<PasswordInfo text="Entered password is incorrect" type="ERROR" isVisible={state.isCurrentPasswordIncorrect} />

				<Spacer className="grow" />
				<Button title="Continue" type="submit" isLoading={state.isVerifying} />
			</form>
		</SubPageRoot>
	);
}

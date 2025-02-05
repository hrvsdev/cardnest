import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { ForgotPasswordBottomSheet } from "@pages/Password/ForgotPasswordBottomSheet.tsx";
import { useVerifyPasswordState } from "@pages/Password/verify_password_state.ts";

import { openBottomSheet } from "@components/BottomSheet/state.ts";
import { Button } from "@components/Button";
import { SubPageRoot } from "@components/Containers";
import { PasswordInput } from "@components/Input/PasswordInput.tsx";
import { PasswordInfo } from "@components/Password/PasswordInfo.tsx";
import { Spacer } from "@components/Spacer";

import { continueSignInByEnteringPassword } from "@data/user";

export function SignInWithPassword() {
	const navigate = useNavigate();

	const state = useVerifyPasswordState();

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		state.onPinSubmit(async () => {
			await continueSignInByEnteringPassword(state.currentPasswordValue);
			navigate("/user/account");
		});
	};

	const onForgotPassword = () => {
		openBottomSheet(<ForgotPasswordBottomSheet context="SIGN_IN" hasCreatedPin={true} />, () => {
			// Nothing
		});
	};

	return (
		<SubPageRoot title="" actionLabel="Forgot password?" onAction={onForgotPassword}>
			<Spacer size={32} />
			<div>
				<h1 className="text-th-white text-xl font-bold text-center mb-2">Enter your password</h1>

				<p className="text-center">Complete sign-in process using your password</p>
				<p className="text-center">For security reasons, you will have to set-up PIN again.</p>
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

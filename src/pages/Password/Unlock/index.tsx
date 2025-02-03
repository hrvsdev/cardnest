import { FormEvent } from "react";

import { useVerifyPasswordState } from "@pages/Password/verify_password_state.ts";

import { Button } from "@components/Button";
import { SubPageRoot } from "@components/Containers";
import { PasswordInput } from "@components/Input/PasswordInput.tsx";
import { PasswordInfo } from "@components/Password/PasswordInfo.tsx";
import { Spacer } from "@components/Spacer";

import { unlockWithPassword } from "@data/auth";

export function UnlockWithPassword() {
	const state = useVerifyPasswordState();

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		state.onPinSubmit(async () => {
			await unlockWithPassword(state.currentPasswordValue);
		});
	};

	return (
		<SubPageRoot title="">
			<Spacer size={32} />
			<div>
				<h1 className="text-th-white text-xl font-bold text-center mb-2">Unlock CardNest</h1>

				<p className="text-center">Unlock using your password</p>
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

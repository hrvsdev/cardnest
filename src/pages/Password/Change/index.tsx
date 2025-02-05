import { FormEvent } from "react";

import { IconLock, IconLockCheck } from "@tabler/icons-react";

import { useChangePasswordState } from "@pages/Password/Change/state.ts";
import { ForgotPasswordBottomSheet } from "@pages/Password/ForgotPasswordBottomSheet.tsx";

import { openBottomSheet } from "@components/BottomSheet/state.ts";
import { Button } from "@components/Button";
import { SubPageRoot } from "@components/Containers";
import { PasswordInput } from "@components/Input/PasswordInput.tsx";
import { PasswordInfo } from "@components/Password/PasswordInfo.tsx";
import { ShowAnimated, ShowAnimatedFade } from "@components/Show";
import { Spacer } from "@components/Spacer";

export function ChangePassword() {
	const state = useChangePasswordState();

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		state.onSubmit();
	};

	const onForgotPassword = () => {
		openBottomSheet(<ForgotPasswordBottomSheet context="CHANGE" hasCreatedPin={true} />, () => {
			// Nothing
		});
	};

	return (
		<SubPageRoot title="" actionLabel="Forgot password?" onAction={onForgotPassword}>
			<Spacer size={32} />
			<div>
				<h1 className="text-th-white text-xl font-bold text-center mb-2">Change your password</h1>

				<p className="text-center">It will be used to encrypt your data.</p>
				<p className="text-center">
					It never gets stored, so it <b className="text-th-white">can't be recovered</b>.
				</p>
				<p className="text-center">
					If forgotten, all <b className="text-th-white">data will be lost</b> forever.
				</p>
			</div>

			<Spacer size={32} />
			<form className="flex flex-col grow" onSubmit={onSubmit}>
				<PasswordInput
					ref={state.currentPasswordRef}
					value={state.currentPasswordValue}
					placeholder="Enter current password"
					isLoading={state.isVerifying}
					isDisabled={state.isVerified}
					onChange={(e) => state.setCurrentPasswordValue(e.target.value)}
				/>

				<Spacer size={8} />

				<PasswordInfo text="Entered password is incorrect" type="ERROR" isVisible={state.isCurrentPasswordIncorrect} />
				<PasswordInfo text="Entered password has been verified and is correct" type="SUCCESS" isVisible={state.isVerified} />

				<div className="flex flex-col items-center w-full">
					<ShowAnimated when={state.isVerified}>
						<div className="pt-5">
							<PasswordInput
								ref={state.newPasswordRef}
								value={state.newPasswordValue}
								placeholder="Enter new password"
								isDisabled={state.isCreating}
								leftIcon={IconLock}
								onChange={(e) => state.setNewPasswordValue(e.target.value)}
								onFocus={() => state.setIsNewPasswordFocused(true)}
								onBlur={() => state.setIsNewPasswordFocused(false)}
							/>
						</div>
					</ShowAnimated>

					<Spacer size={8} />

					<PasswordInfo
						text="Entered password is equal to current password"
						type="ERROR"
						isVisible={state.isNewPasswordEqualToCurrentPassword}
					/>
					<PasswordInfo
						text="Entered password includes space(s), which is allowed"
						type="WARN"
						isVisible={state.doesNewPasswordContainsSpaces && !state.isNewPasswordEqualToCurrentPassword}
					/>
					<PasswordInfo
						text="Entered password is strong and secure against brute-force attacks"
						type="SUCCESS"
						isVisible={state.isNewPasswordSecure && !state.isNewPasswordEqualToCurrentPassword}
					/>

					<ShowAnimated when={state.hasNewPasswordSubmitted}>
						<div className="pt-5 pb-2">
							<PasswordInput
								ref={state.confirmPasswordRef}
								value={state.confirmPasswordValue}
								placeholder="Confirm password"
								isDisabled={state.isCreating}
								leftIcon={IconLockCheck}
								onChange={(e) => state.setConfirmPasswordValue(e.target.value)}
							/>
						</div>
					</ShowAnimated>

					<ShowAnimatedFade when={state.showDoPasswordsMatchInfo}>
						<PasswordInfo text="Passwords do not match" type="ERROR" isVisible={!state.doPasswordsMatch} />
						<PasswordInfo text="Passwords match" type="SUCCESS" isVisible={state.doPasswordsMatch} />
					</ShowAnimatedFade>

					<ShowAnimatedFade when={state.showRequirements}>
						{state.requirements.map(({ text, isValid }) => (
							<PasswordInfo key={text} text={text} type="ERROR" isVisible={!isValid} />
						))}
						{state.requirements.map(({ text, isValid }) => (
							<PasswordInfo key={text} text={text} type="DONE" isVisible={isValid} />
						))}
					</ShowAnimatedFade>
				</div>

				<Spacer className="grow" />
				<Button title="Continue" type="submit" isLoading={state.isCreating} />
			</form>
		</SubPageRoot>
	);
}

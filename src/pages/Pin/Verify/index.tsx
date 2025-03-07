import { usePinState } from "@pages/Pin/data.ts";
import { ForgotPinBottomSheet } from "@pages/Pin/ForgotPinBottomSheet.tsx";

import { openBottomSheet } from "@components/BottomSheet/state.ts";
import { SubPageRoot } from "@components/Containers";
import { Keypad } from "@components/Pin/Keypad";
import { PinInput } from "@components/Pin/PinInput";
import { Show } from "@components/Show";
import { Spacer } from "@components/Spacer";

import { afterPinVerified } from "@data/actions";
import { useHasCreatedPassword, verifyPin } from "@data/auth";

export function VerifyPinBeforeAction() {
	const hasCreatedPassword = useHasCreatedPassword();

	const state = usePinState();

	state.setOnSubmit(async () => {
		await verifyPin(state.pin);
		await afterPinVerified.run();
	});

	const onForgotPin = () => {
		openBottomSheet(<ForgotPinBottomSheet context="VERIFICATION" hasCreatedPassword={hasCreatedPassword} />, () => {
			// Nothing
		});
	};

	return (
		<SubPageRoot title="" actionLabel="Forgot PIN?" onAction={onForgotPin}>
			<Spacer size={32} />
			<div>
				<h1 className="text-th-white text-xl font-bold text-center mb-2">Verify your PIN</h1>

				<p className="text-center">Verify your PIN to confirm and proceed.</p>
			</div>

			<Spacer size={32} />
			<div className="flex flex-col items-center w-full">
				<PinInput pin={state.pin} hasError={state.hasError} />
				<p className="mt-6 text-th-red text-sm">
					<Show when={state.showErrorMessage}>Entered PIN is incorrect</Show>
				</p>
			</div>

			<Spacer className="grow" />
			<Keypad onKeyClick={state.onKeyClick} onBackspaceClick={state.onBackspaceClick} isDisabled={state.hasMaxLength} />

			<Spacer size={48} />
		</SubPageRoot>
	);
}

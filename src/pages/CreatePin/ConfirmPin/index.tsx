import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { usePinState } from "@pages/CreatePin/data.ts";

import { SubPageRoot } from "@components/Containers";
import { Keypad } from "@components/Pin/Keypad";
import { PinInput } from "@components/Pin/PinInput";
import { Show } from "@components/Show";
import { Spacer } from "@components/Spacer";
import { Toast } from "@components/Toast/state.ts";

import { afterPinCreated } from "@data/actions";
import { createAndSetPin, useHasCreatedPin } from "@data/auth";

import { InvalidStateError } from "@utils/error.ts";

export function ConfirmPin() {
	const navigate = useNavigate();
	const location = useLocation();

	const state = usePinState();
	const isUpdating = useHasCreatedPin();

	const enteredPin = location.state?.pin as string | null;

	const checkIfPinsMatch = () => {
		if (state.pin !== enteredPin) {
			throw new InvalidStateError("");
		}
	};

	state.setOnSubmit(async () => {
		checkIfPinsMatch();
		await createAndSetPin(state.pin);
		await afterPinCreated.run();

		if (isUpdating) {
			Toast.success("PIN has been updated");
		}
	});

	useEffect(() => {
		if (enteredPin == null) navigate("..");
	}, [enteredPin]);

	if (enteredPin == null) return null;

	return (
		<SubPageRoot title="">
			<Spacer size={32} />
			<div>
				<h1 className="text-th-white text-xl font-bold text-center mb-2">Confirm your PIN</h1>

				<p className="text-center">It will be used to unlock the app.</p>
				<p className="text-center">
					It never gets stored, so it <b className="text-th-white">can't be recovered</b>.
				</p>
			</div>

			<Spacer size={32} />
			<div className="flex flex-col items-center w-full">
				<PinInput pin={state.pin} hasError={state.hasError} />
				<p className="mt-6 text-th-red text-sm">
					<Show when={state.showErrorMessage}>PINs do not match</Show>
				</p>
			</div>

			<Spacer className="grow" />
			<Keypad onKeyClick={state.onKeyClick} onBackspaceClick={state.onBackspaceClick} isDisabled={state.hasMaxLength} />

			<Spacer size={48} />
		</SubPageRoot>
	);
}

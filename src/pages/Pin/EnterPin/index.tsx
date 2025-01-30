import { usePinState } from "@pages/CreatePin/data.ts";

import { SubPageRoot } from "@components/Containers";
import { Keypad } from "@components/Pin/Keypad";
import { PinInput } from "@components/Pin/PinInput";
import { Show } from "@components/Show";
import { Spacer } from "@components/Spacer";

import { unlockWithPin } from "@data/auth";

export function UnlockWithPin() {
	const state = usePinState();

	state.setOnSubmit(async () => {
		await unlockWithPin(state.pin);
	});

	return (
		<SubPageRoot title="">
			<Spacer size={32} />
			<div>
				<h1 className="text-th-white text-xl font-bold text-center mb-2">Unlock CardNest</h1>

				<p className="text-center">Unlock using your PIN.</p>
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

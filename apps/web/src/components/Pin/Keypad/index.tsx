import { ReactNode } from "react";

import { BackspaceIcon } from "@heroicons/react/24/outline";

import { PIN_LENGTH } from "@libs/utils/src/auth.ts";
import { c } from "@libs/utils/src/styles.ts";

const KEYPAD_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

type Props = {
	pin: number[];
	setPin: (value: number[]) => void;
	onPinChange: (pinValue: string) => void;
};

export function Keypad({ pin, setPin, onPinChange: onPinChangeEffect }: Props) {
	const isDisabled = pin.length === PIN_LENGTH;

	const onPinChange = (num: number) => {
		if (pin.length === PIN_LENGTH) return;

		const newPin = [...pin, num];

		setPin(newPin);
		onPinChangeEffect(newPin.join(""));
	};

	const backspace = () => {
		if (pin.length > 0) {
			setPin(pin.slice(0, -1));
		}
	};

	return (
		<div className="flex flex-col items-center justify-center flex-1">
			<div className="grid grid-cols-3 items-center justify-center gap-5">
				{KEYPAD_NUMBERS.map((n) => (
					<KeypadButton key={n} label={n} onClick={() => onPinChange(n)} disabled={isDisabled} />
				))}
				<button />
				<KeypadButton label={0} onClick={() => onPinChange(0)} disabled={isDisabled} />
				<KeypadButton
					label={<BackspaceIcon className="w-8" />}
					onClick={backspace}
					disabled={isDisabled}
				/>
			</div>
		</div>
	);
}

type KeypadButtonProps = {
	label: ReactNode;
	onClick: () => void;
	disabled?: boolean;
};

function KeypadButton({ label, onClick, disabled }: KeypadButtonProps) {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={c(
				"flex items-center justify-center w-18 aspect-square border border-th-white/20 bg-th-white/5 transition duration-150 rounded-full font-card text-3xl text-th-white",
				disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-th-white/10 active:scale-95"
			)}
		>
			{label}
		</button>
	);
}

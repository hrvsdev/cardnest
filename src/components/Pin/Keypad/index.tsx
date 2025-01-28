import { ReactNode } from "react";

import { BackspaceIcon } from "@heroicons/react/24/outline";

import { c } from "@utils/styles.ts";

const KEYPAD_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

type Props = {
	onKeyClick: (key: number) => void;
	onBackspaceClick: () => void;
	isDisabled: boolean;
};

export function Keypad({ onKeyClick, onBackspaceClick, isDisabled }: Props) {
	return (
		<div className="center">
			<div className="grid grid-cols-3 items-center justify-center gap-5">
				{KEYPAD_NUMBERS.map((n) => (
					<KeypadButton key={n} label={n} onClick={() => onKeyClick(n)} isDisabled={isDisabled} />
				))}

				<button />

				<KeypadButton label={0} onClick={() => onKeyClick(0)} isDisabled={isDisabled} />
				<KeypadButton label={<BackspaceIcon className="size-[1.875rem]" />} onClick={onBackspaceClick} isDisabled={isDisabled} />
			</div>
		</div>
	);
}

type KeypadButtonProps = {
	label: ReactNode;
	onClick: () => void;
	isDisabled?: boolean;
};

function KeypadButton({ label, onClick, isDisabled }: KeypadButtonProps) {
	return (
		<button
			disabled={isDisabled}
			onClick={onClick}
			children={label}
			className={c(
				"center size-18 border border-th-white/20 bg-th-white/5 rounded-full text-th-white font-card text-3xl transition duration-100",
				isDisabled ? "opacity-50" : "hover:bg-th-white/20 active:bg-th-white/20 active:scale-95"
			)}
		/>
	);
}

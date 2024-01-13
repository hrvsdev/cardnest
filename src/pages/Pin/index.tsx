import { ReactNode, useEffect, useState } from "react";

import { BackspaceIcon } from "@heroicons/react/24/outline";

import styles from "./styles.module.css";

import { c } from "@utils/styles.ts";

const PIN_LENGTH_ARR = [1, 2, 3, 4, 5, 6];

const KEYPAD_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const ACTUAL_PIN = "123456";

export function Pin() {
	const [pin, setPin] = useState<number[]>([]);
	const [isPinIncorrect, setIsPinIncorrect] = useState(false);

	const onPinChange = (num: number) => {
		console.log(num);
		if (pin.length < PIN_LENGTH_ARR.length) {
			setPin([...pin, num]);
		}
	};

	const backspace = () => {
		if (pin.length > 0) {
			setPin(pin.slice(0, -1));
		}
	};

	useEffect(() => {
		const enteredPin = pin.join("");
		if (enteredPin.length === PIN_LENGTH_ARR.length) {
			if (enteredPin === ACTUAL_PIN) {
				console.log("PIN correct!");
			} else {
				setIsPinIncorrect(true);
			}
		}
	}, [pin]);

	useEffect(() => {
		if (isPinIncorrect) {
			setTimeout(() => {
				setPin([]);
				setIsPinIncorrect(false);
			}, 1000);
		}
	}, [isPinIncorrect]);

	return (
		<div className="flex flex-col justify-center items-center py-16 grow">
			<div className="flex flex-col text-th-white/90 items-center justify-center gap-8 flex-1">
				<h1 className="text-2xl font-bold">Enter your current PIN</h1>
				<div
					className={c(
						"grid grid-cols-6 items-center justify-center gap-3",
						isPinIncorrect && styles.shake_anim
					)}
				>
					{PIN_LENGTH_ARR.map((n) => (
						<div
							key={n}
							className={c(
								"w-3 border aspect-square rounded-full transition-colors",
								pin.length >= n && (isPinIncorrect ? "bg-red-500" : "bg-th-white"),
								isPinIncorrect ? "border-red-500" : "border-th-white"
							)}
						/>
					))}
				</div>
			</div>
			<div className="flex flex-col items-center justify-center flex-1">
				<div className="grid grid-cols-3 items-center justify-center gap-5">
					{KEYPAD_NUMBERS.map((n) => (
						<PinKeyboardButton key={n} label={n} onClick={() => onPinChange(n)} />
					))}
					<button />
					<PinKeyboardButton label={0} onClick={() => onPinChange(0)} />
					<PinKeyboardButton label={<BackspaceIcon className="w-8" />} onClick={backspace} />
				</div>
			</div>
		</div>
	);
}

function PinKeyboardButton({ label, onClick }: { label: ReactNode; onClick: () => void }) {
	return (
		<button
			className="flex items-center justify-center w-18 aspect-square border border-th-white/20 bg-th-white/5 hover:bg-th-white/10 active:scale-95 transition duration-150 rounded-full font-card text-3xl text-th-white"
			onClick={onClick}
		>
			{label}
		</button>
	);
}

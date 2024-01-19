import { useEffect, useRef, useState } from "react";

import { Keypad } from "@components/Pin/Keypad";
import { PinInput } from "@components/Pin/PinInput";

import { UseSetIsAuthenticated } from "@hooks/auth";
import { PIN_LENGTH } from "@utils/auth.ts";

const ACTUAL_PIN = "123456";

export function Pin() {
	const [pin, setPin] = useState<number[]>([]);
	const [isPinIncorrect, setIsPinIncorrect] = useState(false);

	const setIsAuthenticated = UseSetIsAuthenticated();

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const checkPin = (pinValue: string) => {
		if (pinValue.length !== PIN_LENGTH) return;
		if (pinValue !== ACTUAL_PIN) {
			setIsPinIncorrect(true);
			timeoutRef.current = setTimeout(() => {
				setPin([]);
				setIsPinIncorrect(false);
			}, 1000);

			return;
		}

		setIsAuthenticated(true);
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	return (
		<div className="flex flex-col justify-center items-center grow">
			<div className="flex flex-col text-th-white/90 items-center justify-center gap-8 flex-1">
				<h1 className="text-2xl font-bold">Enter your current PIN</h1>
				<PinInput pin={pin} isPinIncorrect={isPinIncorrect} />
			</div>
			<Keypad pin={pin} setPin={setPin} onPinChange={checkPin} />
		</div>
	);
}

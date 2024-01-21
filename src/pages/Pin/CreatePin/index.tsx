import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { Keypad } from "@components/Pin/Keypad";
import { PinInput } from "@components/Pin/PinInput";
import { Show } from "@components/Show";

import { PIN_LENGTH } from "@utils/auth.ts";

export function CreatePin() {
	const navigate = useNavigate();

	const [pin, setPin] = useState<number[]>([]);
	const [isPinInvalid, setIsPinInvalid] = useState(false);
	const [isCommonPassword, setIsCommonPassword] = useState(false);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const checkPin = (pinValue: string) => {
		setIsCommonPassword(false);

		if (pinValue.length !== PIN_LENGTH) return;
		if (pinValue === "123456") {
			setIsCommonPassword(true);
			setIsPinInvalid(true);

			timeoutRef.current = setTimeout(() => {
				setPin([]);
				setIsPinInvalid(false);
			}, 1000);

			return;
		}

		navigate("confirm", { state: { enteredPin: pinValue } });
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	return (
		<Fragment>
			<SubPageHeader title="" />
			<PageContainer className="flex flex-col justify-center items-center gap-8">
				<div className="flex flex-col text-th-white/90 items-center justify-center flex-1">
					<h1 className="text-2xl font-bold mb-2">Create a PIN</h1>
					<p className="mb-8 px-6 text-center">
						Please enter a secure 6-digit PIN.
						<br />
						Remember it as no way to recover it.
					</p>
					<PinInput pin={pin} isPinIncorrect={isPinInvalid} />
					<p className="mt-6 px-6 text-center text-th-red text-sm h-5">
						<Show when={isCommonPassword}>Entered PIN is too common to guess</Show>
					</p>
				</div>
				<Keypad pin={pin} setPin={setPin} onPinChange={checkPin} />
			</PageContainer>
		</Fragment>
	);
}

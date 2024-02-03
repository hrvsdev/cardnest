import { Fragment, useEffect, useRef, useState } from "react";

import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { Keypad } from "@components/Pin/Keypad";
import { PinInput } from "@components/Pin/PinInput";
import { Show } from "@components/Show";

import { useAfterPinVerified, useSetAfterPinVerified } from "@hooks/actions";
import { useVerifyPin } from "@hooks/auth";
import { PIN_LENGTH } from "@utils/auth.ts";

export function ConfirmPinBeforeAction() {
	const [pin, setPin] = useState<number[]>([]);
	const [isPinIncorrect, setIsPinIncorrect] = useState(false);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const verifyPin = useVerifyPin();
	const afterPinVerified = useAfterPinVerified();
	const setAfterPinVerified = useSetAfterPinVerified();

	const checkPin = async (pinValue: string) => {
		if (pinValue.length !== PIN_LENGTH) return;

		const isPinCorrect = await verifyPin(pinValue);

		if (!isPinCorrect) {
			setIsPinIncorrect(true);
			timeoutRef.current = setTimeout(() => {
				setPin([]);
				setIsPinIncorrect(false);
			}, 1000);

			return;
		}

		if (afterPinVerified) {
			afterPinVerified();
			setAfterPinVerified(null);
			console.log("DONE !!!!!");
		}
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
					<h1 className="text-2xl font-bold mb-2">Confirm your PIN</h1>
					<p className="mb-8 px-6 text-center">Please enter your pin to proceed.</p>
					<PinInput pin={pin} isPinIncorrect={isPinIncorrect} />
					<p className="mt-6 px-6 text-center text-th-red text-sm h-5">
						<Show when={isPinIncorrect}>Entered PIN is incorrect</Show>
					</p>
				</div>
				<Keypad pin={pin} setPin={setPin} onPinChange={checkPin} />
			</PageContainer>
		</Fragment>
	);
}

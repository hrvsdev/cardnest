import { Fragment, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { Keypad } from "@components/Pin/Keypad";
import { PinInput } from "@components/Pin/PinInput";
import { Show } from "@components/Show";

import { useAfterPinCreated, useSetAfterPinCreated } from "@hooks/actions";
import { useSetPin } from "@hooks/auth";
import { useChangeOrAddCardsPin } from "@hooks/card/data.ts";

import { PIN_LENGTH } from "@utils/auth.ts";

export function ConfirmPin() {
	const location = useLocation();
	const navigate = useNavigate();

	const setAppPin = useSetPin();
	const changeOrAddCardsPin = useChangeOrAddCardsPin();
	const afterPinCreated = useAfterPinCreated();
	const setAfterPinCreated = useSetAfterPinCreated();

	const [pin, setPin] = useState<number[]>([]);
	const [isPinInvalid, setIsPinInvalid] = useState(false);
	const [isPinDifferent, setIsPinDifferent] = useState(false);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const enteredPin: string | undefined = location.state?.enteredPin;

	const checkPin = async (pinValue: string) => {
		setIsPinDifferent(false);

		if (pinValue.length !== PIN_LENGTH) return;
		if (pinValue !== enteredPin) {
			setIsPinDifferent(true);
			setIsPinInvalid(true);

			timeoutRef.current = setTimeout(() => {
				setPin([]);
				setIsPinInvalid(false);
			}, 1000);

			return;
		}

		await changeOrAddCardsPin(pinValue);
		await setAppPin(pinValue);

		if (afterPinCreated) {
			afterPinCreated().then(() => setAfterPinCreated(null));
		} else {
			navigate("/user/security");
		}
	};

	useEffect(() => {
		if (!enteredPin) navigate("/");
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	if (!enteredPin) return null;

	return (
		<Fragment>
			<SubPageHeader title="" backLabel="Create PIN" />
			<PageContainer className="flex flex-col justify-center items-center gap-8">
				<div className="flex flex-col text-th-white/90 items-center justify-center flex-1">
					<h1 className="text-2xl font-bold mb-2">Confirm the PIN</h1>
					<p className="mb-8 px-6 text-center">
						Please confirm the PIN you entered.
						<br />
						Remember it as no way to recover it.
					</p>
					<PinInput pin={pin} isPinIncorrect={isPinInvalid} />
					<p className="mt-6 px-6 text-center text-th-red text-sm h-5">
						<Show when={isPinDifferent}>Both PIN don't match</Show>
					</p>
				</div>
				<Keypad pin={pin} setPin={setPin} onPinChange={checkPin} />
			</PageContainer>
		</Fragment>
	);
}

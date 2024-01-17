import { useRef, useState } from "react";

import { addSpaces, getRandomCardTheme, removeSpaces } from "@utils/card.ts";

import { CardEditorState, CardField, CardFullProfile, PaymentNetwork } from "@t/card.ts";

type CardEditorValue = CardFullProfile & { focused?: CardField };

export const useCardEditor = (init: Partial<CardEditorValue> = {}): CardEditorState => {
	const [number, setNumber] = useState(addSpaces(init.number ?? ""));
	const [expiry, setExpiry] = useState(init.expiry ?? "");
	const [cardholder, setCardholder] = useState(init.cardholder ?? "");
	const [network, setNetwork] = useState(init.network ?? "other");
	const [theme, setTheme] = useState(init.theme ?? getRandomCardTheme());
	const [focused, setFocused] = useState(init.focused);

	const previousNumber = useRef("");

	const setFormattedCardNumber = (value: string) => {
		const filteredValue = value.replace(/\D/g, "").slice(0, 16);
		setNumber(addSpaces(filteredValue));
		fetchAndSetCardNetwork(filteredValue).then();
	};

	const setFormattedExpiry = (value: string) => {
		let filteredValue = value.replace(/\D/g, "").slice(0, 4);

		const FIRST_DIGIT = parseInt(filteredValue[0]);

		if (FIRST_DIGIT > 1) {
			filteredValue = filteredValue.replace(FIRST_DIGIT.toString(), `0${FIRST_DIGIT}`);
		}

		if (expiry.endsWith("/") && value.length === 2) {
			filteredValue = value;
		} else if (filteredValue.length >= 2) {
			filteredValue = `${filteredValue.slice(0, 2)}/${filteredValue.slice(2)}`;
		}

		setExpiry(filteredValue);
	};

	const setFormattedCardholder = (value: string) => {
		const filteredValue = value.replace(/[^a-zA-Z\s.'-]/g, "");
		setCardholder(filteredValue);
	};

	const fetchAndSetCardNetwork = async (cardNumber: string) => {
		const firstSixDigits = removeSpaces(cardNumber.slice(0, 6));

		if (firstSixDigits.length < 6 || previousNumber.current === firstSixDigits) setNetwork("other");

		previousNumber.current = firstSixDigits;

		try {
			const res = await fetch(`https://data.handyapi.com/bin/${firstSixDigits}`);

			const d: { Scheme: string } | undefined = await res.json();
			setNetwork((d?.Scheme || "other").toLowerCase() as PaymentNetwork);
		} catch (e) {
			console.log(e);
		}
	};

	const data = { number, cardholder, expiry, network, theme, focused };

	return {
		data,
		setCardNumber: setFormattedCardNumber,
		setCardholder: setFormattedCardholder,
		setExpiry: setFormattedExpiry,
		setCardNetwork: setNetwork,
		setTheme,
		setFocused
	};
};

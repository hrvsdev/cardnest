import { useEffect, useMemo, useRef, useState } from "react";

import { addSpaces, getRandomCardTheme, removeSpaces } from "@utils/card.ts";

import { CardEditorState, CardField, CardFullProfile, CardTheme, PaymentNetwork } from "@t/card.ts";

type CardEditorValue = CardFullProfile & { focused?: CardField };

export const useCardEditor = (init: Partial<CardEditorValue> = {}): CardEditorState => {
	const [number, setNumber] = useState(addSpaces(init.number ?? ""));
	const [expiry, setExpiry] = useState(init.expiry ?? "");
	const [cardholder, setCardholder] = useState(init.cardholder ?? "");
	const [network, setNetwork] = useState(init.network ?? "other");
	const [theme, setTheme] = useState(init.theme ?? getRandomCardTheme());
	const [focused, setFocused] = useState(init.focused);

	const previousCardNumber = useRef("");

	const setFormattedCardNumber = (value: string) => {
		const filteredValue = value.replace(/\D/g, "");
		setNumber(addSpaces(filteredValue));
	};

	const setFormattedExpiry = (value: string) => {
		let filteredValue = value.replace(/\D/g, "");

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

	const setCardNetwork = (cardNumber: string) => {
		fetchCardNetwork(cardNumber).then(setNetwork);
	};

	const fetchCardNetwork = async (cardNumber: string): Promise<PaymentNetwork> => {
		let out: PaymentNetwork = "other";

		const firstSixDigits = removeSpaces(cardNumber.slice(0, 6));

		if (firstSixDigits.length < 6 || previousCardNumber.current === firstSixDigits) return out;

		previousCardNumber.current = firstSixDigits;

		const res = await fetch(`https://data.handyapi.com/bin/${firstSixDigits}`);
		if (!res.ok) return out;

		const d: { Scheme: string } | undefined = await res.json();
		out = (d?.Scheme || "other").toLowerCase() as PaymentNetwork;

		return out;
	};

	const card = useMemo<CardFullProfile>(() => {
		return {
			cardholder: cardholder.trim(),
			expiry,
			network,
			number: removeSpaces(number),
			theme
		};
	}, [number, expiry, cardholder, network, theme]);

	useEffect(() => {
		setCardNetwork(removeSpaces(number));
	}, [number]);

	return {
		card,
		data: {
			number,
			expiry,
			cardholder,
			network,
			theme,
			focused
		},
		setCardNumber,
		setCardholder: setFormattedCardholder,
		setExpiry: setFormattedExpiry,
		setCardNetwork: setNetwork,
		setTheme,
		setFocused
	};
};

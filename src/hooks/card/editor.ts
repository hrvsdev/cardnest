import { useRef, useState } from "react";

import {
	addSpaces,
	getApproxCardNetwork,
	getRandomCardTheme,
	removeSpaces
} from "@utils/card.ts";

import { CardEditorState, CardField, CardFullProfile } from "@t/card";

type CardEditorValue = CardFullProfile & { focused?: CardField };

export const useCardEditor = (init: Partial<CardEditorValue> = {}): CardEditorState => {
	const [number, setNumber] = useState(addSpaces(init.number ?? ""));
	const [expiry, setExpiry] = useState(init.expiry ?? "");
	const [cardholder, setCardholder] = useState(init.cardholder ?? "");
	const [issuer, setIssuer] = useState(init.issuer ?? "");
	const [network, setNetwork] = useState(init.network ?? "other");

	const [theme, setTheme] = useState(init.theme ?? getRandomCardTheme());
	const [focused, setFocused] = useState<CardField | undefined>();

	const [errors, setErrors] = useState({
		number: "",
		expiry: "",
		cardholder: ""
	});

	const previousNumber = useRef("");

	const setFormattedCardNumber = (value: string) => {
		const filteredValue = value.replace(/\D/g, "").slice(0, 16);

		if (filteredValue.length === 16) setErrors({ ...errors, number: "" });

		setNumber(addSpaces(filteredValue));
		fetchAndSetCardNetwork(filteredValue);
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

		if (filteredValue.length === 5) setErrors({ ...errors, expiry: "" });

		setExpiry(filteredValue);
	};

	const setFormattedCardholder = (value: string) => {
		const filteredValue = value.replace(/[^a-zA-Z\s.'-]/g, "");

		if (filteredValue.length >= 2) setErrors({ ...errors, cardholder: "" });

		setCardholder(filteredValue);
	};

	const fetchAndSetCardNetwork = (cardNumber: string) => {
		const firstSixDigits = removeSpaces(cardNumber.slice(0, 6));

		if (firstSixDigits.length < 6) {
			setNetwork("other");
			return;
		}

		if (previousNumber.current === firstSixDigits) return;

		previousNumber.current = firstSixDigits;

		getApproxCardNetwork(cardNumber).then(setNetwork);
	};

	const onSubmit = (cb: (data: CardFullProfile) => void) => {
		return () => {
			const errors = { number: "", expiry: "", cardholder: "" };

			if (editorState.number.length < 19) {
				errors.number = "Please enter a 16-digit card number";
			}

			if (editorState.expiry.length < 5) {
				errors.expiry = "Please enter a valid  expiry date (MM/YY)";
			}

			if (editorState.cardholder.length < 2) {
				errors.cardholder = "Please enter a cardholder name (min. 2 chars long)";
			}

			setErrors(errors);

			if (Object.values(errors).some((v) => v !== "")) return;

			cb(data);
		};
	};

	const editorState = { number, cardholder, expiry, issuer, network, theme, focused };
	const data = { ...editorState, number: removeSpaces(editorState.number) };

	return {
		data,
		editorState,
		errors,
		onSubmit,
		setCardNumber: setFormattedCardNumber,
		setCardholder: setFormattedCardholder,
		setExpiry: setFormattedExpiry,
		setCardNetwork: setNetwork,
		setCardIssuer: setIssuer,
		setTheme,
		setFocused
	};
};

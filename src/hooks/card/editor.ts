import { useMemo, useState } from "react";

import { InputError } from "@components/Input";

import { Card, CardTheme, PaymentNetwork } from "@data/card/types.ts";

import { addSpaces, defaultCard, removeSpaces } from "@utils/card.ts";

export type CardFocusableField = "number" | "expiry" | "cardholder" | "issuer" | "network";

export type CardErrorsState = {
	number: InputError;
	expiry: InputError;
	cardholder: InputError;
	cvv: InputError;
};

export type CardEditorState = Card & {
	card: Card;
	focused: CardFocusableField | undefined;
	errors: Partial<CardErrorsState>;
	setCardNumber: (cardNumber: string) => void;
	setExpiry: (expiry: string) => void;
	setCardholder: (cardholder: string) => void;
	setCvv: (cvv: string) => void;
	setCardIssuer: (issuer: string) => void;
	setCardNetwork: (network: PaymentNetwork) => void;
	setTheme: (theme: CardTheme) => void;
	setFocused: (focused?: CardFocusableField) => void;
	onSubmit: (cb: (data: Card) => void) => void;
};

export function useCardEditor(init: Card = defaultCard()): CardEditorState {
	const [number, setNumber] = useState(addSpaces(init.number));
	const [expiry, setExpiry] = useState(init.expiry);
	const [cardholder, setCardholder] = useState(init.cardholder);
	const [cvv, setCvv] = useState(init.cvv);
	const [issuer, setIssuer] = useState(init.issuer);

	const [network, setNetwork] = useState(init.network);
	const [theme, setTheme] = useState(init.theme);

	const [focused, setFocused] = useState<CardFocusableField | undefined>();

	const [hasSubmitted, setHasSubmitted] = useState(false);

	const errors = useMemo<Partial<CardErrorsState>>(() => {
		if (!hasSubmitted) return {};
		else return getCardErrors(number, expiry, cardholder, cvv);
	}, [hasSubmitted, number, expiry, cardholder, cvv]);

	const card: Card = { number: removeSpaces(number), expiry, cardholder, cvv, issuer, network, theme };

	const formatAndSetCardNumber = (value: string) => {
		const filteredValue = value.replace(/\D/g, "").slice(0, 16);
		const formattedValue = addSpaces(filteredValue);

		setNumber(formattedValue);
	};

	const formatAndSetExpiry = (value: string) => {
		let filteredValue = value.replace(/\D/g, "").slice(0, 4);

		if (filteredValue.length > 0 && parseInt(filteredValue[0]) > 1) {
			filteredValue = `0${filteredValue}`;
		}

		if (expiry.endsWith("/") && filteredValue.length === 2) {
			filteredValue = value;
		} else if (filteredValue.length >= 2) {
			filteredValue = filteredValue.slice(0, 2) + "/" + filteredValue.slice(2);
		}

		setExpiry(filteredValue);
	};

	const formatAndSetCardholder = (value: string) => {
		setCardholder(value);
	};

	const formatAndSetCvv = (value: string) => {
		const filteredValue = value.replace(/\D/g, "").slice(0, 3);

		setCvv(filteredValue);
	};

	const onSubmit = (next: (data: Card) => void) => {
		setHasSubmitted(true);

		const errors = getCardErrors(number, expiry, cardholder, cvv);
		if (errors.number.hasError || errors.expiry.hasError || errors.cardholder.hasError || errors.cvv.hasError) return;

		next(card);
	};

	return {
		card,
		number,
		expiry,
		cardholder,
		cvv,
		issuer,
		network,
		theme,
		focused,
		errors,
		setCardNumber: formatAndSetCardNumber,
		setExpiry: formatAndSetExpiry,
		setCardholder: formatAndSetCardholder,
		setCvv: formatAndSetCvv,
		setCardIssuer: setIssuer,
		setCardNetwork: setNetwork,
		setTheme,
		setFocused,
		onSubmit
	};
}

const CardNumberError = (hasError: boolean) => ({ hasError, message: "Card number must be exact 16 digits long" });
const ExpiryError = (hasError: boolean) => ({ hasError, message: "Expiry date must be a valid date in MM/YY format" });
const CardholderError = (hasError: boolean) => ({ hasError, message: "Cardholder name must be at least 2 characters long" });
const CvvError = (hasError: boolean) => ({ hasError, message: "CVV must be exact 3 digits long or can be empty" });

function getCardErrors(number: string, expiry: string, cardholder: string, cvv: string): CardErrorsState {
	return {
		number: CardNumberError(number.length !== 19),
		expiry: ExpiryError(expiry.length !== 5),
		cardholder: CardholderError(cardholder.length < 2),
		cvv: CvvError(cvv.length === 0 ? false : cvv.length !== 3)
	};
}

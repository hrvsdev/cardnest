import { useEffect, useMemo, useRef, useState } from "react";

import { getRandomCardTheme, removeSpaces } from "@utils/card.ts";

import { CardField, CardFullProfile, CardTheme, PaymentNetwork } from "@t/card.ts";

type CardEditorState = CardFullProfile & { focused?: CardField };

export const useCardEditor = (initialState: Partial<CardEditorState> = {}) => {
	const [data, setData] = useState<CardEditorState>({
		number: initialState.number ?? "",
		expiry: initialState.expiry ?? "",
		cardholder: initialState.cardholder ?? "",
		network: initialState.network ?? "other",
		theme: initialState.theme ?? getRandomCardTheme()
	});

	const previousCardNumber = useRef("");

	const setCardNumber = (value: string) => {
		const filteredValue = value.replace(/\D/g, "");
		const formattedValue = filteredValue.replace(/(\d{4})/g, "$1 ").trim();
		setData({ ...data, number: formattedValue });
	};

	const setExpiry = (value: string) => {
		let filteredValue = value.replace(/\D/g, "");

		if (data.expiry.endsWith("/") && value.length === 2) {
			filteredValue = value;
		} else if (filteredValue.length >= 2) {
			filteredValue = `${filteredValue.slice(0, 2)}/${filteredValue.slice(2)}`;
		}

		setData({ ...data, expiry: filteredValue });
	};

	const setCardholder = (value: string) => {
		const filteredValue = value.replace(/[^a-zA-Z\s.'-]/g, "");
		setData({ ...data, cardholder: filteredValue });
	};

	const setTheme = (theme: CardTheme) => setData({ ...card, theme });
	const setFocused = (focused?: CardField) => setData({ ...data, focused });
	const setNetwork = (network: PaymentNetwork) => setData({ ...data, network });

	const card = useMemo<CardFullProfile>(() => {
		return {
			cardholder: data.cardholder.trim(),
			expiry: data.expiry,
			network: data.network,
			number: removeSpaces(data.number),
			theme: data.theme
		};
	}, [data.number, data.expiry, data.cardholder, data.network, data.theme]);

	useEffect(() => {
		const firstSixDigits = removeSpaces(data.number).slice(0, 6);

		if (previousCardNumber.current === firstSixDigits) return;

		previousCardNumber.current = firstSixDigits;

		if (data.number.length <= 6) return setData({ ...data, network: "other" });

		fetch(`https://data.handyapi.com/bin/${firstSixDigits}`).then((res) => {
			if (!res.ok) setData({ ...data, network: "other" });
			res.json().then((d: { Scheme: string }) => {
				const network = (d.Scheme || "other").toLowerCase() as PaymentNetwork;
				setData({ ...data, network });
			});
		});
	}, [data.number]);

	return {
		card,
		data,
		setCardNumber,
		setCardholder,
		setExpiry,
		setTheme,
		setFocused,
		setNetwork
	};
};

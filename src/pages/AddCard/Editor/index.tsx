import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { motion, useScroll, useTransform } from "framer-motion";

import { CardNetworkSelect } from "@pages/AddCard/Editor/CardNetwork.tsx";

import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { PageContainer } from "@components/Containers";
import { Input } from "@components/Input";

import { removeSpaces } from "@utils/card.ts";

import { CardDetails, CardElement, CardNetwork } from "@t/card.ts";

export function AddCardEditor() {
	const [cardNumber, setCardNumber] = useState("");
	const [expiry, setExpiry] = useState("");
	const [cardholder, setCardholder] = useState("");
	const [network, setNetwork] = useState<CardNetwork>("other");
	const [focused, setFocused] = useState<CardElement | undefined>(undefined);

	const previousCardNumber = useRef("");

	const onCardInput = (e: ChangeEvent<HTMLInputElement>) => {
		const filteredValue = e.target.value.replace(/\D/g, "");
		const formattedValue = filteredValue.replace(/(\d{4})/g, "$1 ").trim();
		setCardNumber(formattedValue);
	};

	const onExpiryInput = (e: ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;
		let filteredValue = value.replace(/\D/g, "");

		if (expiry.endsWith("/") && value.length === 2) {
			filteredValue = value;
		} else if (filteredValue.length >= 2) {
			filteredValue = `${filteredValue.slice(0, 2)}/${filteredValue.slice(2)}`;
		}

		setExpiry(filteredValue);
	};

	const onCardholderInput = (e: ChangeEvent<HTMLInputElement>) => {
		const filteredValue = e.target.value.replace(/[^a-zA-Z\s.'-]/g, "");
		setCardholder(filteredValue);
	};

	const card: CardDetails = {
		cardholder: cardholder.trim(),
		expiry: expiry,
		network: network,
		number: removeSpaces(cardNumber)
	};

	useEffect(() => {
		const firstSixDigits = removeSpaces(cardNumber).slice(0, 6);

		if (previousCardNumber.current === firstSixDigits) return;

		previousCardNumber.current = firstSixDigits;

		if (cardNumber.length <= 6) return setNetwork("other");

		fetch(`https://data.handyapi.com/bin/${firstSixDigits}`).then((res) => {
			if (!res.ok) setNetwork("other");
			res.json().then((data: { Scheme: string }) => {
				setNetwork(data.Scheme.toLowerCase() as CardNetwork);
			});
		});
	}, [cardNumber]);

	return (
		<Fragment>
			<SubPageHeader title="New Card" />
			<PageContainer className="relative space-y-8">
				<Card color="sky" card={card} usePlaceholders focused={focused} />
				<div className="space-y-6">
					<Input
						label="Card number"
						type="text"
						id="number"
						maxLength={19}
						inputMode="numeric"
						placeholder="Enter card number"
						value={cardNumber}
						onChange={onCardInput}
						onFocus={() => setFocused("number")}
						onBlur={() => setFocused(undefined)}
					/>
					<Input
						label="Expiry date"
						type="text"
						id="expiry"
						maxLength={5}
						inputMode="numeric"
						placeholder="Enter card expiry date"
						value={expiry}
						onChange={onExpiryInput}
						onFocus={() => setFocused("expiry")}
						onBlur={() => setFocused(undefined)}
					/>
					<Input
						label="Cardholder"
						type="text"
						id="cardholder"
						maxLength={30}
						placeholder="Enter cardholder name"
						value={cardholder}
						onChange={onCardholderInput}
						onFocus={() => setFocused("cardholder")}
						onBlur={() => setFocused(undefined)}
					/>

					<CardNetworkSelect selected={network} setSelected={setNetwork} />
				</div>
				<Button label="Save" />
			</PageContainer>
		</Fragment>
	);
}

const HEADER_TOP_OFFSET = 0;
const HEADER_BOTTOM_OFFSET = 16;

const BORDER_INITIAL_OPACITY = 0;
const BORDER_FINAL_OPACITY = 0.1;

const BACKGROUND_INITIAL_COLOR = "#00060C00";
const BACKGROUND_FINAL_COLOR = "#00060CCC";

const inputRange = [HEADER_TOP_OFFSET, HEADER_BOTTOM_OFFSET];
const borderOpacityRange = [BORDER_INITIAL_OPACITY, BORDER_FINAL_OPACITY];
const backgroundRange = [BACKGROUND_INITIAL_COLOR, BACKGROUND_FINAL_COLOR];

function SubPageHeader({ title }: { title: string }) {
	const { scrollY } = useScroll();

	const borderOpacity = useTransform(scrollY, inputRange, borderOpacityRange);
	const background = useTransform(scrollY, inputRange, backgroundRange);

	return (
		<motion.div style={{ background }} className="sticky top-0 z-10 backdrop-blur-md">
			<div className="flex items-center justify-center relative w-full h-12">
				<Link to=".." className="flex items-center gap-1 absolute left-0 h-full px-4 text-th-sky">
					<ChevronLeftIcon strokeWidth={2.5} className="size-4" />
					<span className="text-sm">Back</span>
				</Link>
				<div>{title}</div>
			</div>
			<motion.div style={{ height: 1, opacity: borderOpacity }} className="bg-th-white" />
		</motion.div>
	);
}

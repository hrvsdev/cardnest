import { useMemo } from "react";

import { Amex } from "@components/Logos/Amex.tsx";
import { Diners } from "@components/Logos/Diners.tsx";
import { Discover } from "@components/Logos/Discover.tsx";
import { MasterCard } from "@components/Logos/MasterCard.tsx";
import { Rupay } from "@components/Logos/Rupay.tsx";
import { Visa } from "@components/Logos/Visa.tsx";
import { Show } from "@components/Show";

import { useFormattedCardViewDetails } from "@hooks/card/formatting.ts";

import { cardThemeTailwindClassNames } from "@utils/card.ts";
import { c } from "@utils/styles.ts";

import { CardField, CardFullProfile } from "@t/card";

type Props = {
	card: CardFullProfile;
	usePlaceholders?: boolean;
	focused?: CardField;
	maskCardNumber?: boolean;
};

export function CardPreview({ card, focused, usePlaceholders, maskCardNumber }: Props) {
	const formattedCard = useFormattedCardViewDetails(card, { usePlaceholders, maskCardNumber });
	const CardNetwork = useCardNetworkLogo(card.network);

	const cl = cardThemeTailwindClassNames[card.theme];

	const focusedStyle = (el: CardField) => {
		if (!usePlaceholders) return "";

		const defaultStyle = "transition-opacity duration-300 ease-in-out";
		const inFocusStyle = "opacity-100";
		const outOfFocusStyle = "opacity-55";

		return `${defaultStyle} ${focused === el ? inFocusStyle : outOfFocusStyle}`;
	};

	return (
		<div className={c("w-full aspect-payment-card bg-gradient-to-br rounded-2xl font-card", cl)}>
			<div className="flex flex-col justify-between w-full h-full p-6">
				<div className="flex justify-between">
					<div className={focusedStyle("cardholder")}>
						<p className="tracking-widest text-2xs font-light text-th-white/80 uppercase">
							Cardholder
						</p>
						<p className="tracking-wider text-lg">{formattedCard.cardholder}</p>
					</div>
					<Show when={formattedCard.issuer}>
						<div className={c("text-right", focusedStyle("issuer"))}>
							<p className="tracking-widest text-2xs font-light text-th-white/80 uppercase">
								Issuer
							</p>
							<p className="tracking-wider text-lg">{formattedCard.issuer}</p>
						</div>
					</Show>
				</div>
				<div className={c("tracking-widest text-2xl font-bold", focusedStyle("number"))}>
					{formattedCard.number.split("").map((part, i) => (
						<span key={i} className={c("inline-block text-center", part.trim() ? "w-4" : "w-2")}>
							{part}
						</span>
					))}
				</div>
				<div className="flex justify-between items-end">
					<div className={focusedStyle("expiry")}>
						<p className="tracking-widest text-2xs font-light text-th-white/80 uppercase">
							Valid Thru
						</p>
						<p className="tracking-wider font-medium">
							{formattedCard.expiry.split("").map((part, i) => (
								<span key={i} className="inline-block text-center w-2.5">
									{part}
								</span>
							))}
						</p>
					</div>
					<div className="pb-1.25">
						<CardNetwork />
					</div>
				</div>
			</div>
		</div>
	);
}

export function useCardNetworkLogo(network: string) {
	return useMemo(() => {
		switch (network) {
			case "visa":
				return Visa;
			case "mastercard":
				return MasterCard;
			case "amex":
				return Amex;
			case "discover":
				return Discover;
			case "diners":
				return Diners;
			case "rupay":
				return Rupay;
			default:
				return () => null;
		}
	}, [network]);
}

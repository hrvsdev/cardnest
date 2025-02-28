import { useMemo } from "react";

import { Amex } from "@components/Logos/Amex.tsx";
import { Diners } from "@components/Logos/Diners.tsx";
import { Discover } from "@components/Logos/Discover.tsx";
import { MasterCard } from "@components/Logos/MasterCard.tsx";
import { Rupay } from "@components/Logos/Rupay.tsx";
import { Visa } from "@components/Logos/Visa.tsx";
import { Show } from "@components/Show";

import { Card } from "@data/card/types.ts";

import { CardFocusableField } from "@hooks/card/editor.ts";
import { useFormattedCardViewDetails } from "@hooks/card/formatting.ts";

import { c } from "@utils/styles.ts";

import { getCardTheme } from "@theme/index.ts";

type Props = {
	card: Card;
	usePlaceholders?: boolean;
	focused?: CardFocusableField;
	maskCardNumber?: boolean;
};

export function CardPreview({ card, focused, usePlaceholders, maskCardNumber }: Props) {
	const formattedCard = useFormattedCardViewDetails(card, { usePlaceholders, maskCardNumber });
	const CardNetwork = useCardNetworkLogo(card.network);

	const focusedStyle = (el: CardFocusableField) => {
		if (!usePlaceholders) return "";

		const defaultStyle = "transition-opacity duration-300 ease-in-out";
		const inFocusStyle = "opacity-100";
		const outOfFocusStyle = "opacity-60";

		return `${defaultStyle} ${focused === el ? inFocusStyle : outOfFocusStyle}`;
	};

	const colors = getCardTheme(card.theme);
	const background = `linear-gradient(to bottom right, ${colors.from}, ${colors.to})`;

	return (
		<div style={{ background }} className={c("w-full aspect-payment-card bg-gradient-to-br rounded-2xl font-card")}>
			<div className="flex flex-col justify-between w-full h-full p-[1.125rem] pb-[0.875rem]">
				<div className="flex justify-between">
					<div className={focusedStyle("cardholder")}>
						<p className="text-2xs text-th-white/70 tracking-widest">CARDHOLDER</p>
						<p className="text-lg font-medium text-th-white tracking-wider">{formattedCard.cardholder}</p>
					</div>

					<Show when={formattedCard.issuer}>
						<div className={c("text-right", focusedStyle("issuer"))}>
							<p className="text-2xs text-th-white/70 tracking-widest">ISSUER</p>
							<p className="text-lg font-medium text-th-white tracking-wider">{formattedCard.issuer}</p>
						</div>
					</Show>
				</div>

				<div className={c("text-2xl font-bold text-th-white", focusedStyle("number"))}>
					{formattedCard.number.split("").map((part, i) => (
						<span key={i} className={c("inline-block text-center", part.trim() ? "w-4" : "w-2")}>
							{part}
						</span>
					))}
				</div>

				<div className="flex justify-between items-end">
					<div className={focusedStyle("expiry")}>
						<p className="text-2xs text-th-white/70 tracking-widest">VALID THRU</p>
						<p className="font-bold leading-7 text-th-white">
							{formattedCard.expiry.split("").map((part, i) => (
								<span key={i} className="inline-block text-center w-2.5">
									{part}
								</span>
							))}
						</p>
					</div>

					<div className={c(focusedStyle("network"), "pb-1.5")}>
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

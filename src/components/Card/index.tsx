import { useCallback } from "react";

import { Amex } from "@components/Logos/Amex.tsx";
import { Diners } from "@components/Logos/Diners.tsx";
import { Discover } from "@components/Logos/Discover.tsx";
import { MasterCard } from "@components/Logos/MasterCard.tsx";
import { Rupay } from "@components/Logos/Rupay.tsx";
import { Visa } from "@components/Logos/Visa.tsx";

import { cardColorClassName } from "@utils/card.ts";
import { c } from "@utils/styles.ts";

import { CardColor, CardDetails } from "@t/card";

type Props = {
	color: CardColor;
	card: CardDetails;
};

export function Card({ color, card }: Props) {
	const cl = cardColorClassName[color];

	const formattedCardNumber = card.number.replace(/(.{4})/g, "$1 ");
	const formattedExpiryMonth = card.expiry.month.toString().padStart(2, "0");
	const formattedExpiryYear = card.expiry.year.toString().slice(-2);

	const CardNetwork = useCallback(() => {
		switch (card.network) {
			case "visa":
				return <Visa />;
			case "mastercard":
				return <MasterCard />;
			case "amex":
				return <Amex />;
			case "discover":
				return <Discover />;
			case "diners":
				return <Diners />;
			case "rupay":
				return <Rupay />;
			default:
				return null;
		}
	}, [card.network]);

	return (
		<div className={c("w-full aspect-payment-card bg-gradient-to-br rounded-2xl font-card", cl)}>
			<div className="flex flex-col justify-between w-full h-full p-6">
				<div className="flex justify-between">
					<div>
						<p className="tracking-widest text-2xs font-light text-th-white/80 uppercase">Cardholder</p>
						<p className="tracking-wider text-lg">{card.cardholder}</p>
					</div>
				</div>
				<div className="tracking-widest text-2xl font-bold">{formattedCardNumber}</div>
				<div className="flex justify-between items-end">
					<div>
						<p className="tracking-widest text-2xs font-light text-th-white/80 uppercase">Valid Thru</p>
						<p className="tracking-wider font-medium">
							{formattedExpiryMonth}/{formattedExpiryYear}
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

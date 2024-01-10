import { useCardNetworkLogo, useFormattedCardDetails } from "@hooks/useCard.ts";
import { cardColorClassName } from "@utils/card.ts";
import { c } from "@utils/styles.ts";

import { CardColor, CardDetails, CardElement } from "@t/card";

type Props = {
	color: CardColor;
	card: CardDetails;
	usePlaceholders?: boolean;
	focused?: CardElement;
};

export function Card({ color, card, focused, usePlaceholders = false }: Props) {
	const formattedCard = useFormattedCardDetails(card, { usePlaceholders });
	const CardNetwork = useCardNetworkLogo(card.network);

	const cl = cardColorClassName[color];

	const focusedStyle = (el: CardElement) => {
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

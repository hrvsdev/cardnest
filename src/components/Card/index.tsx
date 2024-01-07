import { useCardNetworkLogo, useFormattedCardDetails } from "@hooks/useCard.ts";
import { cardColorClassName } from "@utils/card.ts";
import { c } from "@utils/styles.ts";

import { CardColor, CardDetails } from "@t/card";

type Props = {
	color: CardColor;
	card: CardDetails;
	usePlaceholders?: boolean;
};

export function Card({ color, card, usePlaceholders = false }: Props) {
	const formattedCard = useFormattedCardDetails(card, { usePlaceholders });
	const CardNetwork = useCardNetworkLogo(card.network);

	const cl = cardColorClassName[color];

	return (
		<div className={c("w-full aspect-payment-card bg-gradient-to-br rounded-2xl font-card", cl)}>
			<div className="flex flex-col justify-between w-full h-full p-6">
				<div className="flex justify-between">
					<div>
						<p className="tracking-widest text-2xs font-light text-th-white/80 uppercase">
							Cardholder
						</p>
						<p className="tracking-wider text-lg">{formattedCard.cardholder}</p>
					</div>
				</div>
				<div className="tracking-widest text-2xl font-bold">{formattedCard.number}</div>
				<div className="flex justify-between items-end">
					<div>
						<p className="tracking-widest text-2xs font-light text-th-white/80 uppercase">
							Valid Thru
						</p>
						<p className="tracking-wider font-medium">{formattedCard.expiry}</p>
					</div>
					<div className="pb-1.25">
						<CardNetwork />
					</div>
				</div>
			</div>
		</div>
	);
}

import { Fragment } from "react";

import { PageContainer } from "@components/Containers";
import { Header } from "@components/Header";
import { Rupay } from "@components/Icons";

import { c } from "@utils/styles.ts";

export function Home() {
	return (
		<Fragment>
			<Header title="Home" />
			<PageContainer className="space-y-4">
				{Object.keys(cardColorClassName).map((color) => (
					<Card key={color} color={color as CardColor} />
				))}
			</PageContainer>
		</Fragment>
	);
}

type CardColor = keyof typeof cardColorClassName;

type Props = {
	color: CardColor;
};

function Card({ color }: Props) {
	const cl = cardColorClassName[color];

	const formattedCardNumber = card.number.replace(/(.{4})/g, "$1 ");

	return (
		<div className={c("w-full aspect-payment-card bg-gradient-to-br rounded-2xl font-card", cl)}>
			<div className="flex flex-col justify-between w-full h-full p-6">
				<div className="flex justify-between">
					<div>
						<p className="tracking-widest text-2xs font-light opacity-80 uppercase">Cardholder</p>
						<p className="tracking-wider text-lg">{card.cardholder}</p>
					</div>
				</div>
				<div className="tracking-widest text-2xl font-bold">{formattedCardNumber}</div>
				<div className="flex justify-between items-end">
					<div>
						<p className="tracking-widest text-2xs font-light opacity-80 uppercase">Expires</p>
						<p className="tracking-wider font-medium">
							{card.expiry.month}/{card.expiry.year}
						</p>
					</div>
					<div className="pb-1.25">
						<Rupay />
					</div>
				</div>
			</div>
		</div>
	);
}

const cardColorClassName = {
	sky: "from-sky-500 to-sky-700"
};

const card = {
	number: "4641060453063779",
	expiry: {
		month: 10,
		year: 2028
	},
	cardholder: "John JM Marston",
	network: "visa"
};

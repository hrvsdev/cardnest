import { Fragment } from "react";

import { PageContainer } from "@components/Containers";
import { Header } from "@components/Header";

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
		<div className={c("w-full aspect-payment-card bg-gradient-to-br rounded-2xl", cl)}>
			<div className="flex flex-col justify-between w-full h-full p-6">
				<div className="flex justify-between">
					<div>
						<p className="tracking-widest text-[10px] font-light opacity-80">CARDHOLDER</p>
						<p className="tracking-wider text-lg">{card.cardholder}</p>
					</div>
				</div>
				<div className="tracking-widest text-xl mt-8">{formattedCardNumber}</div>
				<div className="flex justify-between">
					<div>
						<p className="tracking-widest text-[10px] font-light opacity-80">EXPIRES</p>
						<p className="tracking-wider">
							{card.expiry.month}/{card.expiry.year}
						</p>
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

import { Fragment } from "react";

import { PageContainer } from "@components/Containers";
import { Header } from "@components/Header";
import { AmericanExpress, DinersClub, Discover, MasterCard, Rupay, Visa } from "@components/Icons";

import { c } from "@utils/styles.ts";

export function Home() {
	return (
		<Fragment>
			<Header title="Home" />
			<PageContainer className="space-y-4">
				{cards.map((card, index) => (
					<Card
						key={card.number}
						color={Object.keys(cardColorClassName)[index] as CardColor}
						card={card}
					/>
				))}
			</PageContainer>
		</Fragment>
	);
}

type CardColor = keyof typeof cardColorClassName;

type Card = {
	number: string;
	expiry: {
		month: number;
		year: number;
	};
	cardholder: string;
	network: "visa" | "mastercard" | "amex" | "discover" | "diners" | "rupay";
};

type Props = {
	color: CardColor;
	card: Card;
};

function Card({ color, card }: Props) {
	const cl = cardColorClassName[color];

	const formattedCardNumber = card.number.replace(/(.{4})/g, "$1 ");
	const formattedExpiryMonth = card.expiry.month.toString().padStart(2, "0");
	const formattedExpiryYear = card.expiry.year.toString();

	const CardNetwork = () => {
		switch (card.network) {
			case "visa":
				return <Visa />;
			case "mastercard":
				return <MasterCard />;
			case "amex":
				return <AmericanExpress />;
			case "discover":
				return <Discover />;
			case "diners":
				return <DinersClub />;
			case "rupay":
				return <Rupay />;
			default:
				return null;
		}
	};

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

const cardColorClassName = {
	sky: "from-sky-500 to-sky-700",
	pink: "from-pink-500 to-pink-700",
	red: "from-red-500 to-red-700",
	cyan: "from-cyan-500 to-cyan-700",
	yellow: "from-yellow-500 to-yellow-700",
	blue: "from-blue-500 to-blue-700",
	green: "from-green-500 to-green-700",
	emerald: "from-emerald-500 to-emerald-700",
	fuchsia: "from-fuchsia-500 to-fuchsia-700",
	purple: "from-purple-500 to-purple-700",
	violet: "from-violet-500 to-violet-700",
	indigo: "from-indigo-500 to-indigo-700",
	orange: "from-orange-500 to-orange-700",
	teal: "from-teal-500 to-teal-700",
	rose: "from-rose-500 to-rose-700"
};

const cards: Card[] = [
	{
		number: "4641060453063779",
		expiry: {
			month: 10,
			year: 2028
		},
		cardholder: "John Marston",
		network: "visa"
	},
	{
		number: "6521507140259291",
		expiry: {
			month: 12,
			year: 2028
		},
		cardholder: "Sadie Adler",
		network: "rupay"
	},
	{
		number: "5358542601766168",
		expiry: {
			month: 5,
			year: 2026
		},
		cardholder: "Abigail Roberts",
		network: "mastercard"
	},
	{
		number: "6011000990139424",
		expiry: {
			month: 12,
			year: 2025
		},
		cardholder: "Arthur Morgan",
		network: "discover"
	},
	{
		number: "3056930902590491",
		expiry: {
			month: 2,
			year: 2027
		},
		cardholder: "Karen Jones",
		network: "diners"
	},
	{
		number: "3714496353984317",
		expiry: {
			month: 6,
			year: 2029
		},
		cardholder: "Jack Marston",
		network: "amex"
	}
];

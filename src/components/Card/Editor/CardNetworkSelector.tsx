import { Amex } from "@components/Logos/Amex.tsx";
import { Diners } from "@components/Logos/Diners.tsx";
import { Discover } from "@components/Logos/Discover.tsx";
import { MasterCard } from "@components/Logos/MasterCard.tsx";
import { Other } from "@components/Logos/Other.tsx";
import { Rupay } from "@components/Logos/Rupay.tsx";
import { Visa } from "@components/Logos/Visa.tsx";

import { PaymentNetwork } from "@data/card/types.ts";

import { c } from "@utils/styles.ts";

type Props = {
	selected: PaymentNetwork;
	setSelected: (value: PaymentNetwork) => void;
};

const networks: Array<{ network: PaymentNetwork; logo: typeof Amex; width?: string }> = [
	{ network: "VISA", logo: Visa, width: "3rem" },
	{ network: "MASTERCARD", logo: MasterCard, width: "2.25rem" },
	{ network: "RUPAY", logo: Rupay, width: "4.5rem" },
	{ network: "DISCOVER", logo: Discover, width: "5rem" },
	{ network: "DINERS", logo: Diners, width: "1.75rem" },
	{ network: "AMEX", logo: Amex, width: "4rem" },
	{ network: "OTHER", logo: Other, width: "1.875rem" }
];

export function CardNetworkSelector({ selected, setSelected }: Props) {
	return (
		<div>
			<p className="text-th-white/80 pb-2 pl-2">Card network</p>
			<div className="grid grid-cols-3 gap-2">
				{networks.map((N) => (
					<div
						key={N.network}
						onClick={() => setSelected(N.network)}
						children={<N.logo width={N.width} />}
						className={c(
							"h-12 center bg-th-white hover:bg-opacity-10 rounded-1.5lg border border-th-white cursor-pointer transition-all",
							selected === N.network ? "bg-opacity-10" : "bg-opacity-07 border-opacity-07"
						)}
					/>
				))}
			</div>
		</div>
	);
}

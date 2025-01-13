import { Amex } from "@components/Logos/Amex.tsx";
import { Diners } from "@components/Logos/Diners.tsx";
import { Discover } from "@components/Logos/Discover.tsx";
import { MasterCard } from "@components/Logos/MasterCard.tsx";
import { Other } from "@components/Logos/Other.tsx";
import { Rupay } from "@components/Logos/Rupay.tsx";
import { Visa } from "@components/Logos/Visa.tsx";

import { c } from "@utils/styles.ts";

import { PaymentNetwork } from "@t/card";

type Props = {
	selected: PaymentNetwork;
	setSelected: (value: PaymentNetwork) => void;
};

const networks: Array<{ network: PaymentNetwork; logo: typeof Amex; width?: string }> = [
	{ network: "visa", logo: Visa, width: "3rem" },
	{ network: "mastercard", logo: MasterCard, width: "2.25rem" },
	{ network: "rupay", logo: Rupay, width: "4.5rem" },
	{ network: "discover", logo: Discover, width: "5rem" },
	{ network: "diners", logo: Diners, width: "1.75rem" },
	{ network: "amex", logo: Amex, width: "4rem" },
	{ network: "other", logo: Other, width: "1.875rem" }
];

export function CardNetworkSelect({ selected, setSelected }: Props) {
	return (
		<div className="space-y-2">
			<p className="text-th-white/80 pl-2">Card network</p>
			<div className="grid grid-cols-3 gap-2">
				{networks.map((N) => (
					<div
						key={N.network}
						onClick={() => setSelected(N.network)}
						className={c(
							"flex items-center cursor-pointer justify-center h-12 rounded-xl bg-th-white/5 transition-all hover:bg-th-white/10 border",
							selected === N.network ? "border-th-sky" : "border-th-white/5"
						)}
					>
						<N.logo width={N.width} />
					</div>
				))}
			</div>
		</div>
	);
}

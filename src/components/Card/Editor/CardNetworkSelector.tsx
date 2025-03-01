import { ReactNode } from "react";

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

const networks: Array<{ network: PaymentNetwork; logo: ({ className }: { className?: string }) => ReactNode }> = [
	{ network: "VISA", logo: Visa },
	{ network: "MASTERCARD", logo: MasterCard },
	{ network: "RUPAY", logo: Rupay },
	{ network: "DISCOVER", logo: Discover },
	{ network: "DINERS", logo: Diners },
	{ network: "AMEX", logo: Amex },
	{ network: "OTHER", logo: Other }
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
						children={<N.logo className={N.network === "OTHER" ? "scale-[1.2]" : "scale-[0.85]"} />}
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

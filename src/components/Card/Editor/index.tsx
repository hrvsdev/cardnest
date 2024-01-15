import { Fragment } from "react";

import { CardPreview } from "@components/Card/Preview";
import { CardNetworkSelect } from "@components/Card/Editor/CardNetwork.tsx";
import { CardThemeSelect } from "@components/Card/Editor/CardThemeSelect.tsx";
import { Input } from "@components/Input";

import { CardEditorState } from "@t/card.ts";

type Props = {
	state: CardEditorState;
};

export function CardEditor({ state }: Props) {
	const { card, data, ...methods } = state;
	const { setCardNumber, setExpiry, setCardholder, setCardNetwork, setTheme, setFocused } = methods;

	return (
		<Fragment>
			<CardPreview card={card} usePlaceholders focused={data.focused} />
			<div className="space-y-6">
				<Input
					label="Card number"
					type="text"
					id="number"
					maxLength={19}
					inputMode="numeric"
					placeholder="Enter card number"
					value={data.number}
					onChange={(e) => setCardNumber(e.target.value)}
					onFocus={() => setFocused("number")}
					onBlur={() => setFocused(undefined)}
				/>
				<Input
					label="Expiry date"
					type="text"
					id="expiry"
					maxLength={5}
					inputMode="numeric"
					placeholder="Enter card expiry date"
					value={data.expiry}
					onChange={(e) => setExpiry(e.target.value)}
					onFocus={() => setFocused("expiry")}
					onBlur={() => setFocused(undefined)}
				/>
				<Input
					label="Cardholder"
					type="text"
					id="cardholder"
					maxLength={30}
					placeholder="Enter cardholder name"
					value={data.cardholder}
					onChange={(e) => setCardholder(e.target.value)}
					onFocus={() => setFocused("cardholder")}
					onBlur={() => setFocused(undefined)}
				/>

				<CardNetworkSelect selected={data.network} setSelected={setCardNetwork} />
				<CardThemeSelect theme={data.theme} setTheme={setTheme} />
			</div>
		</Fragment>
	);
}

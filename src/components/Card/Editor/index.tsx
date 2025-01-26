import { Fragment } from "react";

import { CardNetworkSelector } from "@components/Card/Editor/CardNetworkSelector.tsx";
import { CardThemeSelector } from "@components/Card/Editor/CardThemeSelector.tsx";
import { CardPreview } from "@components/Card/Preview";
import { Input } from "@components/Input";

import { CardEditorState } from "@hooks/card/editor.ts";

type Props = {
	state: CardEditorState;
};

export function CardEditor({ state }: Props) {
	return (
		<Fragment>
			<CardPreview card={state.card} usePlaceholders focused={state.focused} />
			<div className="space-y-6">
				<Input
					label="Card number"
					type="text"
					id="number"
					maxLength={19}
					inputMode="numeric"
					placeholder="Enter card number"
					value={state.number}
					error={state.errors.number}
					onChange={(e) => state.setCardNumber(e.target.value)}
					onFocus={() => state.setFocused("number")}
					onBlur={() => state.setFocused(undefined)}
				/>

				<Input
					label="Expiry date"
					type="text"
					id="expiry"
					maxLength={5}
					inputMode="numeric"
					placeholder="Enter card expiry date"
					value={state.expiry}
					error={state.errors.expiry}
					onChange={(e) => state.setExpiry(e.target.value)}
					onFocus={() => state.setFocused("expiry")}
					onBlur={() => state.setFocused(undefined)}
				/>

				<Input
					label="Cardholder"
					type="text"
					id="cardholder"
					maxLength={30}
					placeholder="Enter cardholder name"
					value={state.cardholder}
					error={state.errors.cardholder}
					onChange={(e) => state.setCardholder(e.target.value)}
					onFocus={() => state.setFocused("cardholder")}
					onBlur={() => state.setFocused(undefined)}
				/>

				<Input
					label="CVV"
					type="text"
					id="cvv"
					maxLength={3}
					inputMode="numeric"
					placeholder="Enter card CVV"
					value={state.cvv}
					error={state.errors.cvv}
					onChange={(e) => state.setCvv(e.target.value)}
				/>

				<Input
					label="Card issuer/bank"
					type="text"
					id="issuer"
					maxLength={30}
					placeholder="Enter card issuer/bank"
					value={state.issuer}
					onChange={(e) => state.setCardIssuer(e.target.value)}
					onFocus={() => state.setFocused("issuer")}
					onBlur={() => state.setFocused(undefined)}
				/>

				<CardNetworkSelector selected={state.network} setSelected={state.setCardNetwork} />
				<CardThemeSelector theme={state.theme} setTheme={state.setTheme} />
			</div>
		</Fragment>
	);
}

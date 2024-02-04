import { Fragment } from "react";

import { CardNetworkSelect } from "@components/Card/Editor/CardNetwork.tsx";
import { CardThemeSelect } from "@components/Card/Editor/CardThemeSelect.tsx";
import { CardPreview } from "@components/Card/Preview";
import { Input } from "@components/Input";

import { CardEditorState } from "@t/card.ts";

type Props = {
	state: CardEditorState;
};

export function CardEditor({ state }: Props) {
	const { editorState, data, errors, ...methods } = state;

	return (
		<Fragment>
			<CardPreview card={data} usePlaceholders focused={data.focused} />
			<div className="space-y-6">
				<Input
					label="Card number"
					type="text"
					id="number"
					maxLength={19}
					inputMode="numeric"
					placeholder="Enter card number"
					value={editorState.number}
					error={errors.number}
					onChange={(e) => methods.setCardNumber(e.target.value)}
					onFocus={() => methods.setFocused("number")}
					onBlur={() => methods.setFocused(undefined)}
				/>
				<Input
					label="Expiry date"
					type="text"
					id="expiry"
					maxLength={5}
					inputMode="numeric"
					placeholder="Enter card expiry date"
					value={editorState.expiry}
					error={errors.expiry}
					onChange={(e) => methods.setExpiry(e.target.value)}
					onFocus={() => methods.setFocused("expiry")}
					onBlur={() => methods.setFocused(undefined)}
				/>
				<Input
					label="Cardholder"
					type="text"
					id="cardholder"
					maxLength={30}
					placeholder="Enter cardholder name"
					value={editorState.cardholder}
					error={errors.cardholder}
					onChange={(e) => methods.setCardholder(e.target.value)}
					onFocus={() => methods.setFocused("cardholder")}
					onBlur={() => methods.setFocused(undefined)}
				/>
				<Input
					label="Card issuer/bank"
					type="text"
					id="issuer"
					maxLength={30}
					placeholder="Enter card issuer/bank"
					value={editorState.issuer}
					onChange={(e) => methods.setCardIssuer(e.target.value)}
				/>

				<CardNetworkSelect selected={editorState.network} setSelected={methods.setCardNetwork} />
				<CardThemeSelect theme={editorState.theme} setTheme={methods.setTheme} />
			</div>
		</Fragment>
	);
}

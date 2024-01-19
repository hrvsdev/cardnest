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
	const { editorState, data, ...methods } = state;
	const { setCardNumber, setExpiry, setCardholder, setCardNetwork, setTheme, setFocused } = methods;

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
					value={editorState.expiry}
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
					value={editorState.cardholder}
					onChange={(e) => setCardholder(e.target.value)}
					onFocus={() => setFocused("cardholder")}
					onBlur={() => setFocused(undefined)}
				/>

				<CardNetworkSelect selected={editorState.network} setSelected={setCardNetwork} />
				<CardThemeSelect theme={editorState.theme} setTheme={setTheme} />
			</div>
		</Fragment>
	);
}

import { Fragment } from "react";
import { View } from "react-native";

import { CardNetworkSelect } from "@components/Card/Editor/CardNetwork.tsx";
import { CardPreview } from "@components/Card/Preview";
import { Input } from "@components/Input";

import { CardEditorState } from "@libs/types/src/card";

type Props = {
	state: CardEditorState;
};

export function CardEditor({ state }: Props) {
	const { editorState, data, errors, ...methods } = state;

	return (
		<Fragment>
			<CardPreview card={data} usePlaceholders focused={data.focused} />
			<View style={{ flex: 1, gap: 24 }}>
				<Input
					label="Card number"
					maxLength={19}
					inputMode="numeric"
					placeholder="Enter card number"
					value={editorState.number}
					error={errors.number}
					onChangeText={methods.setCardNumber}
					onFocus={() => methods.setFocused("number")}
					onBlur={() => methods.setFocused(undefined)}
				/>
				<Input
					label="Expiry date"
					maxLength={5}
					inputMode="numeric"
					placeholder="Enter card expiry date"
					value={editorState.expiry}
					error={errors.expiry}
					onChangeText={methods.setExpiry}
					onFocus={() => methods.setFocused("expiry")}
					onBlur={() => methods.setFocused(undefined)}
				/>
				<Input
					label="Cardholder"
					maxLength={30}
					placeholder="Enter cardholder name"
					value={editorState.cardholder}
					error={errors.cardholder}
					onChangeText={methods.setCardholder}
					onFocus={() => methods.setFocused("cardholder")}
					onBlur={() => methods.setFocused(undefined)}
				/>
				<Input
					label="Card issuer/bank"
					maxLength={30}
					placeholder="Enter card issuer/bank"
					value={editorState.issuer}
					onChangeText={methods.setCardIssuer}
					onFocus={() => methods.setFocused("issuer")}
					onBlur={() => methods.setFocused(undefined)}
				/>

				<CardNetworkSelect selected={editorState.network} setSelected={methods.setCardNetwork} />
				{/*<CardThemeSelect theme={editorState.theme} setTheme={methods.setTheme} />*/}
			</View>
		</Fragment>
	);
}

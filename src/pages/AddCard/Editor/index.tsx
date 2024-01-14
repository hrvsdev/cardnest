import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { CardNetworkSelect } from "@pages/AddCard/Editor/CardNetwork.tsx";
import { CardThemeSelect } from "@pages/AddCard/Editor/CardThemeSelect.tsx";

import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { Input } from "@components/Input";

import { useAddCard } from "@hooks/card/data.ts";
import { useCardEditor } from "@hooks/card/editor.ts";

export function AddCardEditor() {
	const navigate = useNavigate();
	const addCard = useAddCard();

	const { card, data, ...methods } = useCardEditor();
	const { setCardNumber, setExpiry, setCardholder, setNetwork, setTheme, setFocused } = methods;

	const saveCard = () => {
		addCard(card);
		navigate("/");
	};

	return (
		<Fragment>
			<SubPageHeader title="New Card" />
			<PageContainer className="relative space-y-8">
				<Card card={card} usePlaceholders focused={data.focused} />
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

					<CardNetworkSelect selected={data.network} setSelected={setNetwork} />
					<CardThemeSelect theme={data.theme} setTheme={setTheme} />
				</div>
				<Button label="Save" onClick={saveCard} />
			</PageContainer>
		</Fragment>
	);
}

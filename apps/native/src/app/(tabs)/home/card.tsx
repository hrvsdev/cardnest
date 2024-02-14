import { View } from "react-native";

import { CardPreview } from "@components/Card/Preview";
import { PageContainer, PageRoot } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { Input } from "@components/Input";

import { CardFullProfile } from "@libs/types/src/card.ts";

const CARD: CardFullProfile = {
	number: "8263 9039 2737 3837",
	cardholder: "Harsh Vyas",
	issuer: "HDFC Bank",
	expiry: "12/30",
	theme: "pink",
	network: "mastercard"
};

export default function Page() {
	return (
		<PageRoot>
			<SubPageHeader title="Card Details" />
			<PageContainer>
				<CardPreview card={CARD} />
				<View style={{ flex: 1, gap: 24, marginTop: 24 }}>
					<Input label="Card number" value={CARD.number} readOnly />
					<Input label="Expriy date" value={CARD.expiry} readOnly />
					<Input label="Cardholder" value={CARD.cardholder} readOnly />
					<Input label="Card issuer/bank" value={CARD.issuer} readOnly />
				</View>
			</PageContainer>
		</PageRoot>
	);
}

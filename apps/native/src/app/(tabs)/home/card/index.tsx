import { View } from "react-native";
import { useRouter } from "expo-router";

import { IconPencil } from "tabler-icons-react-native";

import { Button } from "@components/Button";
import { CopyButton } from "@components/Button/CopyButton.tsx";
import { CardPreview } from "@components/Card/Preview/Preview.tsx";
import { SubPageRoot } from "@components/Containers";
import { Input } from "@components/Input";

import { removeSpaces } from "@libs/utils/src/card.ts";

import { CardFullProfile } from "@libs/types/src/card.ts";

const CARD: CardFullProfile = {
	number: "8263 9039 2737 3837",
	cardholder: "Harsh Vyas",
	issuer: "HDFC Bank",
	expiry: "12/30",
	theme: "pink",
	network: "mastercard"
};

export default function CardViewPage() {
	const router = useRouter();

	const edit = () => {
		router.navigate("/home/card/edit");
	};

	const del = () => {
		router.navigate("/home/card/delete");
	};

	return (
		<SubPageRoot
			title="Card"
			rightButtonLabel="Edit"
			onRightButtonPress={edit}
			rightButtonIcon={IconPencil}
			gap={32}
		>
			<CardPreview card={CARD} />
			<View style={{ flex: 1, gap: 24 }}>
				<Input
					readOnly
					label="Card number"
					value={CARD.number}
					rightIcon={<CopyButton text={removeSpaces(CARD.number)} />}
				/>
				<Input
					readOnly
					label="Expriy date"
					value={CARD.expiry}
					rightIcon={<CopyButton text={CARD.expiry} />}
				/>
				<Input
					readOnly
					label="Cardholder"
					value={CARD.cardholder}
					rightIcon={<CopyButton text={CARD.cardholder} />}
				/>
				<Input
					readOnly
					label="Card issuer/bank"
					value={CARD.issuer}
					rightIcon={<CopyButton text={CARD.issuer} />}
				/>
			</View>

			<Button title="Delete" theme="danger" onPress={del} />
		</SubPageRoot>
	);
}

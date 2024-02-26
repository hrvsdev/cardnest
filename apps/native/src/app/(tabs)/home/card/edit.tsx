import { useRouter } from "expo-router";

import { Button } from "@components/Button";
import { CardEditor } from "@components/Card/Editor";
import { SubPageRoot } from "@components/Containers";

import { useCardEditor } from "@libs/hooks/src/card/editor.ts";

import { CardFullProfile } from "@libs/types/src/card.ts";

const CARD: CardFullProfile = {
	number: "8263903927373837",
	cardholder: "Harsh Vyas",
	issuer: "HDFC Bank",
	expiry: "12/30",
	theme: "pink",
	network: "mastercard"
};

export default function Page() {
	const router = useRouter();

	const save = () => {
		router.navigate("/home/card");
	};

	const editorState = useCardEditor(CARD);

	return (
		<SubPageRoot gap={32} title="Edit Card" rightButtonLabel="Done" onRightButtonPress={save}>
			<CardEditor state={editorState} />
			<Button title="Update" onPress={save} />
		</SubPageRoot>
	);
}

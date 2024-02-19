import { useRouter } from "expo-router";

import { Button } from "@components/Button";
import { CardEditor } from "@components/Card/Editor";
import { PageContainer, PageRoot } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

import { useCardEditor } from "@libs/hooks/src/card/editor.ts";

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
	const router = useRouter();

	const save = () => {
		router.navigate("/home/card");
	};

	const editorState = useCardEditor(CARD);

	return (
		<PageRoot>
			<SubPageHeader title="Edit Card" rightButtonLabel="Done" onRightButtonPress={save} />
			<PageContainer style={{ flex: 1, gap: 32 }}>
				<CardEditor state={editorState} />
				<Button title="Update" onPress={save} />
			</PageContainer>
		</PageRoot>
	);
}

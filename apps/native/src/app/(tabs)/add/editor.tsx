import { useRouter } from "expo-router";

import { Button } from "@components/Button";
import { CardEditor } from "@components/Card/Editor";
import { PageContainer, PageRoot } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

import { useCardEditor } from "@libs/hooks/src/card/editor.ts";

export default function Page() {
	const router = useRouter();

	const save = () => {
		router.navigate("/home/card");
	};

	const editorState = useCardEditor();

	return (
		<PageRoot>
			<SubPageHeader title="New Card" rightButtonLabel="Done" onRightButtonPress={save} />
			<PageContainer style={{ flex: 1, gap: 32 }}>
				<CardEditor state={editorState} />
				<Button title="Save" onPress={save} />
			</PageContainer>
		</PageRoot>
	);
}

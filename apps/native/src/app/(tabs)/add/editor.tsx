import { useRouter } from "expo-router";

import { Button } from "@components/Button";
import { CardEditor } from "@components/Card/Editor";
import { SubPageRoot } from "@components/Containers";

import { useCardEditor } from "@libs/hooks/src/card/editor.ts";

export default function Page() {
	const router = useRouter();

	const save = () => {
		router.navigate("/home/card");
	};

	const editorState = useCardEditor();

	return (
		<SubPageRoot gap={32} title="New Card" rightButtonLabel="Done" onRightButtonPress={save}>
			<CardEditor state={editorState} />
			<Button title="Save" onPress={save} />
		</SubPageRoot>
	);
}
